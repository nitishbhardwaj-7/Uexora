import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { site } from '@/lib/site';
import { getSettings, type SettingsContent } from '@/lib/cms';

/**
 * POST /api/contact — receives the contact form, validates it, applies basic
 * spam protection and emails the enquiry to the division's inbox over SMTP.
 *
 * Spam protection (all three must pass):
 *  - honeypot: the hidden `company` field must be empty
 *  - timing:   the form must have been open for at least MIN_FILL_MS
 *  - rate:     at most RATE.max submissions per IP per RATE.windowMs
 *              (in-memory, so per server instance — see README)
 *
 * SMTP settings come from SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER,
 * SMTP_PASS and MAIL_FROM (see .env.example). Recipients come from the site settings
 * (content/settings.ts, editable in the studio).
 */

export const runtime = 'nodejs';

type Division = 'education' | 'marketing' | 'general';
type Payload = { division: Division; name: string; email: string; phone: string; message: string };
type FieldErrors = Partial<Record<keyof Payload, string>>;

const divisions = (s: SettingsContent): Record<Division, { label: string; to: string }> => ({
  education: { label: 'Uexora Education', to: s.educationEmail || s.email },
  marketing: { label: 'Uexora Marketing Studio', to: s.marketingEmail || s.email },
  general: { label: 'General enquiry', to: s.email },
});

const MAX = { name: 100, email: 200, phone: 40, message: 5000 };
const MIN_FILL_MS = 3000;
const RATE = { max: 5, windowMs: 10 * 60 * 1000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ---------- rate limiting ---------- */

const hits = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE.windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, times] of hits) if (times.every((t) => now - t >= RATE.windowMs)) hits.delete(k);
  }
  return recent.length > RATE.max;
}

function clientKey(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
  return ip.trim();
}

/* ---------- validation ---------- */

const text = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

function validate(body: Record<string, unknown>): { data?: Payload; fields?: FieldErrors } {
  const fields: FieldErrors = {};
  const division = text(body.division) as Division;
  const name = text(body.name);
  const email = text(body.email);
  const phone = text(body.phone);
  const message = text(body.message);

  if (!['education', 'marketing', 'general'].includes(division)) fields.division = 'Choose a division.';
  if (name.length < 2) fields.name = 'Please enter your name.';
  else if (name.length > MAX.name) fields.name = `Keep your name under ${MAX.name} characters.`;
  if (!EMAIL_RE.test(email) || email.length > MAX.email) fields.email = 'Please enter a valid email address.';
  if (phone.length > MAX.phone) fields.phone = 'That phone number looks too long.';
  if (message.length < 10) fields.message = 'Tell us a little more (at least 10 characters).';
  else if (message.length > MAX.message) fields.message = `Keep your message under ${MAX.message} characters.`;

  if (Object.keys(fields).length) return { fields };
  return { data: { division, name, email, phone, message } };
}

/* ---------- SMTP delivery ---------- */

class MailConfigError extends Error {}

function smtpConfig() {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, MAIL_FROM } = process.env;
  const missing = Object.entries({ SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM })
    .filter(([, v]) => !v)
    .map(([k]) => k);
  if (missing.length) throw new MailConfigError(`Missing environment variables: ${missing.join(', ')} (see .env.example)`);
  const port = Number(SMTP_PORT);
  if (!Number.isInteger(port) || port <= 0) throw new MailConfigError(`SMTP_PORT must be a port number, got "${SMTP_PORT}"`);
  // SMTP_SECURE=true means implicit TLS (usually port 465); otherwise STARTTLS is negotiated (587).
  const secure = SMTP_SECURE ? /^(1|true|yes)$/i.test(SMTP_SECURE) : port === 465;
  return { host: SMTP_HOST!, port, secure, auth: { user: SMTP_USER!, pass: SMTP_PASS! }, from: MAIL_FROM! };
}

function renderEmail(data: Payload, settings: SettingsContent) {
  const { label, to } = divisions(settings)[data.division];
  const lines = [
    `Division: ${label}`,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || '-'}`,
    '',
    data.message,
    '',
    `— Sent from the contact form at ${site.url}/contact`,
  ];
  return { to, subject: `${label}: enquiry from ${data.name}`, text: lines.join('\n') };
}

async function deliver(data: Payload, settings: SettingsContent) {
  const { from, ...smtp } = smtpConfig();
  const mail = renderEmail(data, settings);
  const transport = nodemailer.createTransport(smtp);
  // The visitor cannot be the From address (SPF/DMARC would reject it), so they go in Reply-To.
  await transport.sendMail({
    from: { name: `${site.name} website`, address: from },
    to: mail.to,
    replyTo: { name: data.name, address: data.email },
    subject: mail.subject,
    text: mail.text,
  });
}

/* ---------- handler ---------- */

const fail = (status: number, error: string, fields?: FieldErrors) => NextResponse.json({ ok: false, error, fields }, { status });
// Bots get a convincing success so they do not retry.
const pretendOk = () => NextResponse.json({ ok: true });

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail(400, 'We could not read the form. Please try again.');
  }

  if (text(body.company)) return pretendOk();
  const startedAt = Number(body.startedAt);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) return pretendOk();

  const settings = await getSettings();
  if (rateLimited(clientKey(request))) return fail(429, `Too many messages from this connection. Please wait a few minutes, or email ${settings.email} directly.`);

  const { data, fields } = validate(body);
  if (!data) return fail(400, 'Please check the highlighted fields.', fields);

  try {
    await deliver(data, settings);
  } catch (error) {
    const inbox = divisions(settings)[data.division].to;
    if (error instanceof MailConfigError) {
      console.error(`[contact] mail is not configured: ${error.message}`);
      return fail(503, `The contact form is not set up to send email yet. Please email us directly at ${inbox}.`);
    }
    console.error('[contact] delivery failed:', error);
    return fail(502, `We could not send your message right now. Please email us directly at ${inbox}.`);
  }

  return NextResponse.json({ ok: true });
}

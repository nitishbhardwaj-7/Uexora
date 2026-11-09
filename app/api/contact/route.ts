import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { site } from '@/lib/site';
import { getEducation, getMarketing, getSettings, type SettingsContent } from '@/lib/cms';
import { NOT_SURE } from '@/lib/enquiry';
import { EnquiryStoreConfigError, saveEnquiry } from '@/lib/cms/enquiries';

/**
 * POST /api/contact — receives the contact form, validates it, applies basic
 * spam protection, saves the enquiry in Sanity (studio > Enquiries) and emails it
 * to the division's inbox over SMTP. The visitor sees success when at least one of
 * the two worked; each failure is logged.
 *
 * Spam protection (all three must pass):
 *  - honeypot: the hidden `company` field must be empty
 *  - timing:   the form must have been open for at least MIN_FILL_MS
 *  - rate:     at most RATE.max submissions per IP per RATE.windowMs
 *              (in-memory, so per server instance — see README)
 *
 * SMTP settings come from SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER,
 * SMTP_PASS and MAIL_FROM (see .env.example). Recipients come from the site settings
 * (content/settings.ts, editable in the studio). Storing needs SANITY_API_WRITE_TOKEN.
 */

export const runtime = 'nodejs';

type Division = 'education' | 'marketing' | 'general';
type Payload = { division: Division; name: string; email: string; phone: string; course: string; message: string; demo?: boolean };
type FieldErrors = Partial<Record<keyof Payload | 'grade' | 'subject' | 'preferred', string>>;

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

/** The courses (Education) and services (Marketing) a visitor can pick, as on the form. */
async function courseOptions(): Promise<Partial<Record<Division, string[]>>> {
  const [e, m] = await Promise.all([getEducation(), getMarketing()]);
  const titles = (list: { title?: string }[]) => [...list.map((p) => p.title).filter((t): t is string => !!t), NOT_SURE];
  return { education: titles(e.programmes), marketing: titles(m.services) };
}

function validate(body: Record<string, unknown>, courses: Partial<Record<Division, string[]>>): { data?: Payload; fields?: FieldErrors } {
  const fields: FieldErrors = {};
  const division = text(body.division) as Division;
  const name = text(body.name);
  const email = text(body.email);
  const phone = text(body.phone);
  const course = text(body.course);
  const message = text(body.message);

  if (!['education', 'marketing', 'general'].includes(division)) fields.division = 'Choose a division.';
  if (name.length < 2) fields.name = 'Please enter your name.';
  else if (name.length > MAX.name) fields.name = `Keep your name under ${MAX.name} characters.`;
  if (!EMAIL_RE.test(email) || email.length > MAX.email) fields.email = 'Please enter a valid email address.';
  if (phone.replace(/\D/g, '').length < 7) fields.phone = 'Please enter your phone number.';
  else if (phone.length > MAX.phone) fields.phone = 'That phone number looks too long.';
  const allowed = courses[division];
  if (allowed && !allowed.includes(course)) fields.course = division === 'marketing' ? 'Please choose a service.' : 'Please choose a course.';
  if (message.length > MAX.message) fields.message = `Keep your message under ${MAX.message} characters.`;

  if (Object.keys(fields).length) return { fields };
  return { data: { division, name, email, phone, course: allowed ? course : '', message } };
}

/** "2026-11-12T16:30" as the visitor picked it (their own local time), or null if it is not a real date. */
function readPreferred(value: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(value);
  if (!m) return null;
  const [y, mo, d, h, min] = m.slice(1).map(Number);
  const at = new Date(Date.UTC(y, mo - 1, d, h, min));
  return at.getUTCMonth() === mo - 1 && at.getUTCDate() === d ? at : null;
}

/** The Book a Free Demo Class form. Its details go in the enquiry's message, so the studio and email need nothing new. */
function validateDemo(body: Record<string, unknown>, courses: Partial<Record<Division, string[]>>): { data?: Payload; fields?: FieldErrors } {
  const fields: FieldErrors = {};
  const name = text(body.name);
  const grade = text(body.grade);
  const subject = text(body.subject);
  const phone = text(body.phone);
  const email = text(body.email);
  const preferred = readPreferred(text(body.preferred));

  if (name.length < 2) fields.name = 'Please enter your name.';
  else if (name.length > MAX.name) fields.name = `Keep your name under ${MAX.name} characters.`;
  if (!grade) fields.grade = 'Please enter the grade.';
  else if (grade.length > 40) fields.grade = 'Keep the grade under 40 characters.';
  if (!subject) fields.subject = 'Please enter the subject.';
  else if (subject.length > 100) fields.subject = 'Keep the subject under 100 characters.';
  if (phone.replace(/\D/g, '').length < 7) fields.phone = 'Please enter your phone number.';
  else if (phone.length > MAX.phone) fields.phone = 'That phone number looks too long.';
  if (!EMAIL_RE.test(email) || email.length > MAX.email) fields.email = 'Please enter a valid email address.';
  // The time has no time zone, so only one that has passed everywhere is refused here; the form's own minimum is exact.
  if (!preferred) fields.preferred = 'Please choose a date and time.';
  else if (preferred.getTime() < Date.now() - 12 * 3600 * 1000) fields.preferred = 'Please choose a date and time in the future.';

  if (Object.keys(fields).length) return { fields };
  const programme = text(body.programme);
  const within = text(body.course).slice(0, 120);
  const when = preferred!.toLocaleString('en-IN', { timeZone: 'UTC', dateStyle: 'medium', timeStyle: 'short' });
  return {
    data: {
      division: 'education',
      name,
      email,
      phone,
      course: courses.education?.includes(programme) ? programme : '',
      message: ['Free demo class request', ...(within ? [`Programme chosen: ${within}`] : []), `Grade: ${grade}`, `Subject: ${subject}`, `Preferred date and time: ${when}`].join('\n'),
      demo: true,
    },
  };
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
    `Phone: ${data.phone}`,
    ...(data.course ? [`${data.division === 'marketing' ? 'Service' : 'Course'}: ${data.course}`] : []),
    '',
    data.message || '(No message)',
    '',
    `— Sent from the contact form at ${site.url}/contact`,
  ];
  return { to, subject: `${label}: ${data.demo ? 'free demo class request' : 'enquiry'} from ${data.name}`, text: lines.join('\n') };
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

  const options = await courseOptions();
  const { data, fields } = body.type === 'demo' ? validateDemo(body, options) : validate(body, options);
  if (!data) return fail(400, 'Please check the highlighted fields.', fields);

  // 1. Email the division inbox.
  let emailSent = false;
  let mailConfigured = true;
  try {
    await deliver(data, settings);
    emailSent = true;
  } catch (error) {
    if (error instanceof MailConfigError) {
      mailConfigured = false;
      console.error(`[contact] mail is not configured: ${error.message}`);
    } else {
      console.error('[contact] delivery failed:', error);
    }
  }

  // 2. Keep a copy in the studio, recording whether the email went out.
  let stored = false;
  try {
    await saveEnquiry({ ...data, emailSent });
    stored = true;
  } catch (error) {
    if (error instanceof EnquiryStoreConfigError) console.error(`[contact] enquiries are not stored: ${error.message}`);
    else console.error('[contact] could not store the enquiry:', error);
  }

  if (!emailSent && !stored) {
    const inbox = divisions(settings)[data.division].to;
    if (!mailConfigured) return fail(503, `The contact form is not set up yet. Please email us directly at ${inbox}.`);
    return fail(502, `We could not send your message right now. Please email us directly at ${inbox}.`);
  }

  return NextResponse.json({ ok: true });
}

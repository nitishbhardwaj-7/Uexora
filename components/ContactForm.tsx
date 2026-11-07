'use client';

import { useEffect, useRef, useState } from 'react';
import { Arrow } from './ui/Button';
import { NOT_SURE } from '@/lib/enquiry';

type Division = 'education' | 'marketing' | 'general';
type Status = 'idle' | 'sending' | 'sent' | 'error';
type FieldErrors = Partial<Record<'division' | 'name' | 'email' | 'phone' | 'course' | 'message', string>>;
/** The course or service choices per division (the page titles from the studio). */
export type CourseOptions = Partial<Record<Division, string[]>>;

const LABELS: Record<Division, string> = {
  education: 'Uexora Education',
  marketing: 'Uexora Marketing Studio',
  general: 'General enquiry',
};

const errorStyle = { background: '#fbeeee', color: '#7a1f1f' } as const;
const fieldErrorStyle = { color: '#b42318' } as const;

/**
 * Contact form. Posts to `app/api/contact/route.ts`, which validates the fields,
 * applies spam checks (honeypot + fill time + rate limit) and emails the
 * division's inbox (addresses come from the site settings, see lib/cms).
 */
export default function ContactForm({
  initialDivision = 'general',
  initialCourse,
  initialMessage,
  email,
  note = 'We reply by email.',
  courses = {},
}: {
  initialDivision?: Division;
  /** Preselected course or service (one of the options), e.g. from a programme page. */
  initialCourse?: string;
  /** Starting text for the message, e.g. the batch chosen on a programme page. */
  initialMessage?: string;
  /** Fallback address shown in error and success messages. */
  email: string;
  note?: string;
  courses?: CourseOptions;
}) {
  const [division, setDivision] = useState<Division>(initialDivision);
  // Arriving from a division's pages opens that division's form only, with no choice of
  // division; the choice is shown for a general visit (home page, menu).
  const choosing = initialDivision === 'general';
  // Education asks for a course, Marketing for a service; a general enquiry has neither.
  const options = courses[division]?.length ? [...courses[division]!, NOT_SURE] : null;
  const courseLabel = division === 'marketing' ? 'Service you are interested in' : 'Course you are interested in';
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  // Set on the client after mount so the server HTML never carries a timestamp.
  const startedAt = useRef(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const send = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'sending') return;
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus('sending');
    setError(null);
    setFieldErrors({});

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          division,
          name: data.get('name'),
          email: data.get('email'),
          phone: data.get('phone'),
          course: options ? data.get('course') : '',
          message: data.get('message'),
          company: data.get('company'),
          startedAt: startedAt.current,
        }),
      });
      const json = (await res.json().catch(() => null)) as { ok?: boolean; error?: string; fields?: FieldErrors } | null;
      if (res.ok && json?.ok) {
        form.reset();
        setStatus('sent');
        return;
      }
      setFieldErrors(json?.fields ?? {});
      setError(json?.error || `Something went wrong. Please email us directly at ${email}.`);
      setStatus('error');
    } catch {
      setError(`We could not reach the server. Check your connection, or email us directly at ${email}.`);
      setStatus('error');
    }
  };

  const fieldError = (name: keyof FieldErrors) =>
    fieldErrors[name] ? (
      <span className="form__note" role="alert" style={fieldErrorStyle}>
        {fieldErrors[name]}
      </span>
    ) : null;

  return (
    <form id="enquiry-form" className="form" onSubmit={send} noValidate={false}>
      {!choosing ? (
        <p className="form__division">
          <span>Enquiry for</span> <strong>{LABELS[division]}</strong>
        </p>
      ) : (
        <fieldset className="field" style={{ border: 0, padding: 0, margin: 0, minWidth: 0 }}>
          <legend>I&rsquo;m interested in</legend>
          <div className="segmented">
            {(
              [
                ['education', 'Uexora Education'],
                ['marketing', 'Uexora Marketing Studio'],
                ['general', 'Something else'],
              ] as [Division, string][]
            ).map(([value, label]) => (
              <label key={value}>
                <input type="radio" name="division" value={value} checked={division === value} onChange={() => setDivision(value)} />
                {label}
              </label>
            ))}
          </div>
          {fieldError('division')}
        </fieldset>
      )}

      <div className="form__row">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" autoComplete="name" required maxLength={100} placeholder="Your name" aria-invalid={!!fieldErrors.name} />
          {fieldError('name')}
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required maxLength={200} placeholder="you@example.com" aria-invalid={!!fieldErrors.email} />
          {fieldError('email')}
        </div>
      </div>

      <div className={options ? 'form__row' : undefined}>
        <div className="field">
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" required minLength={7} maxLength={40} placeholder="+91" aria-invalid={!!fieldErrors.phone} />
          {fieldError('phone')}
        </div>
        {options ? (
          <div className="field">
            <label htmlFor="course">{courseLabel}</label>
            {/* keyed so switching division clears a choice from the other list */}
            <select
              key={division}
              id="course"
              name="course"
              required
              defaultValue={division === initialDivision && initialCourse && options.includes(initialCourse) ? initialCourse : ''}
              aria-invalid={!!fieldErrors.course}
            >
              <option value="" disabled>
                Choose one
              </option>
              {options.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            {fieldError('course')}
          </div>
        ) : null}
      </div>

      <div className="field">
        <label htmlFor="message">{division === 'marketing' ? 'Tell us about your business and goals' : 'Tell us about the learner and their goals'} (optional)</label>
        <textarea
          id="message"
          name="message"
          maxLength={5000}
          defaultValue={initialMessage}
          placeholder={division === 'marketing' ? 'What does your business do, and what would you like marketing to achieve?' : 'Who is the learner, what are they working towards, and where do they need support?'}
          aria-invalid={!!fieldErrors.message}
        />
        {fieldError('message')}
      </div>

      {/* Honeypot: hidden from people, filled in by bots. Must stay empty. */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form__foot">
        <button type="submit" className="btn btn--blue" disabled={status === 'sending'} aria-busy={status === 'sending'}>
          <span className="btn__label">{status === 'sending' ? 'Sending…' : 'Send message'}</span>
          <span className="btn__icon">
            <Arrow />
          </span>
        </button>
        <span className="form__note">{note}</span>
      </div>

      {status === 'sent' ? (
        <div className="form__success" role="status">
          <strong>Thanks — your message is on its way to {LABELS[division]}.</strong>
          <span>
            {note} If it is urgent, write to us at {email}.
          </span>
        </div>
      ) : null}

      {status === 'error' && error ? (
        <div className="form__success" role="alert" style={errorStyle}>
          <strong>Your message was not sent.</strong>
          <span>{error}</span>
        </div>
      ) : null}
    </form>
  );
}

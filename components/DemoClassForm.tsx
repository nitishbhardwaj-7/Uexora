'use client';

import { useEffect, useRef, useState } from 'react';
import { Arrow } from './ui/Button';

type Status = 'idle' | 'sending' | 'sent' | 'error';
type FieldName = 'name' | 'grade' | 'subject' | 'phone' | 'email' | 'preferred';
type FieldErrors = Partial<Record<FieldName, string>>;

const errorStyle = { background: '#fbeeee', color: '#7a1f1f' } as const;
const fieldErrorStyle = { color: '#b42318' } as const;

/**
 * Book a free demo class. Posts to the contact route (`type: 'demo'`), so it shares that route's
 * spam checks, email to the Education inbox and copy in the studio's Enquiries.
 */
export default function DemoClassForm({ programme, email, note }: { programme?: string; email: string; note: string }) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const startedAt = useRef(0);
  const when = useRef<HTMLInputElement>(null);

  // Set on the client after mount: the server has neither the visitor's clock nor their time zone.
  useEffect(() => {
    startedAt.current = Date.now();
    const now = new Date();
    if (when.current) when.current.min = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
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
          type: 'demo',
          programme,
          name: data.get('name'),
          grade: data.get('grade'),
          subject: data.get('subject'),
          phone: data.get('phone'),
          email: data.get('email'),
          preferred: data.get('preferred'),
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

  const fieldError = (name: FieldName) =>
    fieldErrors[name] ? (
      <span className="form__note" role="alert" style={fieldErrorStyle}>
        {fieldErrors[name]}
      </span>
    ) : null;

  return (
    <form id="demo-form" className="form" onSubmit={send}>
      {programme ? (
        <p className="form__division">
          <span>Demo class for</span> <strong>{programme}</strong>
        </p>
      ) : null}

      <div className="form__row">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" autoComplete="name" required maxLength={100} placeholder="Your name" aria-invalid={!!fieldErrors.name} />
          {fieldError('name')}
        </div>
        <div className="field">
          <label htmlFor="grade">Grade</label>
          <input id="grade" name="grade" type="text" required maxLength={40} placeholder="e.g. Grade 8" aria-invalid={!!fieldErrors.grade} />
          {fieldError('grade')}
        </div>
      </div>

      <div className="form__row">
        <div className="field">
          <label htmlFor="subject">Subject</label>
          <input id="subject" name="subject" type="text" required maxLength={100} placeholder="e.g. Mathematics" aria-invalid={!!fieldErrors.subject} />
          {fieldError('subject')}
        </div>
        <div className="field">
          <label htmlFor="phone">Phone number</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" required minLength={7} maxLength={40} placeholder="+91" aria-invalid={!!fieldErrors.phone} />
          {fieldError('phone')}
        </div>
      </div>

      <div className="form__row">
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required maxLength={200} placeholder="you@example.com" aria-invalid={!!fieldErrors.email} />
          {fieldError('email')}
        </div>
        <div className="field">
          <label htmlFor="preferred">Preferred class date and time</label>
          <input ref={when} id="preferred" name="preferred" type="datetime-local" required aria-invalid={!!fieldErrors.preferred} />
          {fieldError('preferred')}
        </div>
      </div>

      {/* Honeypot: hidden from people, filled in by bots. Must stay empty. */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form__foot">
        <button type="submit" className="btn btn--blue" disabled={status === 'sending'} aria-busy={status === 'sending'}>
          <span className="btn__label">{status === 'sending' ? 'Sending…' : 'Book my free demo class'}</span>
          <span className="btn__icon">
            <Arrow />
          </span>
        </button>
        <span className="form__note">{note}</span>
      </div>

      {status === 'sent' ? (
        <div className="form__success" role="status">
          <strong>Thanks, your demo class request is on its way to our education team.</strong>
          <span>
            {note} If it is urgent, write to us at {email}.
          </span>
        </div>
      ) : null}

      {status === 'error' && error ? (
        <div className="form__success" role="alert" style={errorStyle}>
          <strong>Your request was not sent.</strong>
          <span>{error}</span>
        </div>
      ) : null}
    </form>
  );
}

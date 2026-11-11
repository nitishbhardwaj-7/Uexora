'use client';

import { useEffect, useRef, useState } from 'react';

/** Calling codes offered beside the phone number: India first (the default), then A to Z. */
const CODES: [country: string, code: string][] = [
  ['India', '+91'],
  ['Australia', '+61'],
  ['Bahrain', '+973'],
  ['Bangladesh', '+880'],
  ['Bhutan', '+975'],
  ['Canada', '+1'],
  ['China', '+86'],
  ['France', '+33'],
  ['Germany', '+49'],
  ['Hong Kong', '+852'],
  ['Indonesia', '+62'],
  ['Ireland', '+353'],
  ['Italy', '+39'],
  ['Japan', '+81'],
  ['Kenya', '+254'],
  ['Kuwait', '+965'],
  ['Malaysia', '+60'],
  ['Maldives', '+960'],
  ['Mauritius', '+230'],
  ['Nepal', '+977'],
  ['Netherlands', '+31'],
  ['New Zealand', '+64'],
  ['Nigeria', '+234'],
  ['Oman', '+968'],
  ['Philippines', '+63'],
  ['Qatar', '+974'],
  ['Saudi Arabia', '+966'],
  ['Singapore', '+65'],
  ['South Africa', '+27'],
  ['South Korea', '+82'],
  ['Spain', '+34'],
  ['Sri Lanka', '+94'],
  ['Thailand', '+66'],
  ['United Arab Emirates', '+971'],
  ['United Kingdom', '+44'],
  ['United States', '+1'],
  ['Vietnam', '+84'],
];
const DEFAULT = 'India|+91';

/**
 * The phone number as one value for the enquiry: the chosen calling code and the number. A
 * number typed with its own "+" code is taken as it is.
 */
export function phoneValue(data: FormData) {
  const number = String(data.get('phone') ?? '').trim();
  if (!number || number.startsWith('+')) return number;
  const code = String(data.get('phoneCode') ?? DEFAULT).split('|')[1] || '+91';
  return `${code} ${number.replace(/^0+/, '')}`;
}

/**
 * Phone field with a calling-code picker in front of the number, +91 by default. The picker
 * is a native select laid invisibly over a short "+91" label, so it stays compact while the
 * list itself names each country.
 */
export default function PhoneField({ label, invalid, error }: { label: string; invalid: boolean; error: React.ReactNode }) {
  const [choice, setChoice] = useState(DEFAULT);
  const code = choice.split('|')[1];
  const select = useRef<HTMLSelectElement>(null);
  // After a successful send the form is reset; the code goes back to +91 with it.
  useEffect(() => {
    const form = select.current?.form;
    if (!form) return;
    const back = () => setChoice(DEFAULT);
    form.addEventListener('reset', back);
    return () => form.removeEventListener('reset', back);
  }, []);
  return (
    <div className="field">
      <label htmlFor="phone">{label}</label>
      <div className="phone" data-invalid={invalid || undefined}>
        <span className="phone__code">
          <span aria-hidden="true">{code}</span>
          {/* The value carries the country too, since some codes (+1) are shared. */}
          <select ref={select} name="phoneCode" aria-label="Country calling code" value={choice} onChange={(e) => setChoice(e.target.value)}>
            {CODES.map(([country, c]) => (
              <option key={country} value={`${country}|${c}`}>
                {country} ({c})
              </option>
            ))}
          </select>
        </span>
        <input id="phone" name="phone" type="tel" autoComplete="tel-national" inputMode="tel" required minLength={6} maxLength={30} placeholder="Phone number" aria-invalid={invalid} />
      </div>
      {error}
    </div>
  );
}

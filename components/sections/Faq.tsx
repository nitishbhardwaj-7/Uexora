'use client';

import { useId, useRef, useState } from 'react';
import Monogram from '@/components/brand/Monogram';
import { ArrowLink } from '@/components/ui/Button';

type Item = { q: string; a: string };

/**
 * Questions as an index beside one answer card. Choosing a question (click, or
 * arrow keys) slides the answer into the card; the gold marker on the index moves
 * with it. All answers stay in the markup (inactive panels are hidden, not removed),
 * so search engines and screen readers still get the full content.
 */
export default function Faq({ items, askHref }: { items: Item[]; askHref: string }) {
  const base = useId();
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = items.length;
    let next: number | null = null;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (i + 1) % n;
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (i - 1 + n) % n;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = n - 1;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="qa">
      <div className="qa__index">
        <div className="qa__list" role="tablist" aria-label="Questions" aria-orientation="vertical">
          {items.map((f, i) => (
            <button
              key={f.q}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${base}-t${i}`}
              aria-selected={i === active}
              aria-controls={`${base}-p${i}`}
              tabIndex={i === active ? 0 : -1}
              className={['qa__tab', i === active ? 'is-active' : ''].filter(Boolean).join(' ')}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
            >
              <span className="qa__num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="qa__q">{f.q}</span>
            </button>
          ))}
        </div>
        <div className="qa__ask" data-reveal>
          <ArrowLink href={askHref}>Ask a different question</ArrowLink>
        </div>
      </div>

      <div className="qa__card">
        {items.map((f, i) => (
          <div key={f.q} id={`${base}-p${i}`} role="tabpanel" aria-labelledby={`${base}-t${i}`} hidden={i !== active} className="qa__panel">
            <span className="qa__card-num" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
              <span>/ {String(items.length).padStart(2, '0')}</span>
            </span>
            <h3 className="qa__card-q">{f.q}</h3>
            <p className="qa__card-a">{f.a}</p>
          </div>
        ))}
        <Monogram className="qa__mark" variant="mono" />
      </div>
    </div>
  );
}

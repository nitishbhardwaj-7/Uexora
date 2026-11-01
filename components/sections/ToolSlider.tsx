'use client';

import { useEffect, useRef, useState } from 'react';
import { Chevron } from '@/components/sections/CourseSlider';
import type { Service } from '@/content/types';

type Tool = NonNullable<Service['tools']>['toolCards'][number];

/**
 * The tools a programme works with, as white logo cards in rows that scroll sideways: five
 * columns at a time on wide screens, fewer on smaller ones. Up to twelve tools sit in two rows; a
 * longer list takes three, so that it does not run on too far. The arrows move one column and
 * fade at either end, and hide when everything fits; touch and trackpads scroll it directly,
 * snapping to the columns. The logos are plain images (most are SVG), with the name beneath
 * saying what each one is.
 */
const rowsFor = (n: number) => (n > 12 ? 3 : 2);

export default function ToolSlider({ tools, label }: { tools: Tool[]; label: string }) {
  const track = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => {
      setAtStart(el.scrollLeft <= 2);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const move = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector('li');
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + gap), behavior: smooth ? 'smooth' : 'auto' });
  };

  return (
    <div className="tools" role="region" aria-label={label}>
      <ul ref={track} className="tools__track" style={{ '--cols': Math.ceil(tools.length / rowsFor(tools.length)) } as React.CSSProperties} data-reveal-group data-stagger="0.05">
        {tools.map((t, i) => (
          <li key={t.name + i} className="tools__card">
            <span className="tools__logo">
              {/* The name below says what it is, so the logo itself is not read out. */}
              {t.logo?.src ? <img src={t.logo.src} alt="" width={96} height={96} loading="lazy" decoding="async" draggable={false} /> : null}
            </span>
            <h3 className="tools__name">{t.name}</h3>
            {t.text ? <p className="tools__text">{t.text}</p> : null}
          </li>
        ))}
      </ul>
      <div className={['tools__nav', atStart && atEnd ? 'tools__nav--idle' : ''].filter(Boolean).join(' ')}>
        <button type="button" className="tools__arrow tools__arrow--prev" aria-label="Previous tools" onClick={() => move(-1)} disabled={atStart}>
          <Chevron dir="prev" />
        </button>
        <button type="button" className="tools__arrow tools__arrow--next" aria-label="More tools" onClick={() => move(1)} disabled={atEnd}>
          <Chevron dir="next" />
        </button>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isReducedMotion } from '@/lib/motion';
import type { Service } from '@/content/types';

gsap.registerPlugin(ScrollTrigger);

type Step = NonNullable<Service['journey']>['journeySteps'][number];

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/** Keeps a hyphenated word (e.g. Long-Term) on one line rather than breaking it at the hyphen. */
const keepHyphenated = (t: string) => t.split(/(\S+-\S+)/).map((part, i) => (i % 2 ? <span key={i} className="journey__keep">{part}</span> : part));

/**
 * A programme's stages as numbered circles on one line, each with its card below (on narrower
 * screens the line runs down the left, the cards beside it). The circles and cards rise in as
 * they come into view; then the line fills in step with the scroll, each circle turning gold as
 * the line reaches it, and the card of the stage it has reached takes the warm edge. Across, the
 * line fills while the steps travel from low on the screen to near the top; down the side, it
 * fills to a mark 60% of the way down the screen, so it keeps pace with the reader. Without
 * script, or with reduced motion, the path shows complete.
 */
export default function JourneySteps({ steps }: { steps: Step[] }) {
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = list.current;
    if (!el || isReducedMotion()) return;
    const items = Array.from(el.children) as HTMLElement[];
    const nodes = items.map((it) => it.querySelector<HTMLElement>('.journey__node'));
    const last = items.length - 1;
    const across = window.matchMedia('(min-width: 1000px)');
    let reached = -2;

    const update = () => {
      const vh = window.innerHeight;
      let fills: number[];
      let r: number;
      if (across.matches) {
        const p = clamp01((vh * 0.8 - el.getBoundingClientRect().top) / (vh * 0.5));
        fills = items.slice(0, last).map((_, i) => clamp01(p * last - i));
        r = p > 0 ? Math.min(last, Math.floor(p * last + 0.001)) : -1;
      } else {
        const mark = vh * 0.6;
        const y = nodes.map((n) => {
          const b = n?.getBoundingClientRect();
          return b ? b.top + b.height / 2 : 0;
        });
        fills = y.slice(0, last).map((top, i) => clamp01((mark - top) / (y[i + 1] - top || 1)));
        r = y.filter((c) => c <= mark).length - 1;
      }
      fills.forEach((f, i) => items[i].style.setProperty('--fill', f.toFixed(3)));
      if (r !== reached) {
        reached = r;
        items.forEach((it, i) => {
          it.classList.toggle('is-lit', i <= r);
          it.classList.toggle('is-current', i === r);
        });
      }
    };

    el.classList.add('journey--live');
    const st = ScrollTrigger.create({ trigger: el, start: 'top bottom', end: 'bottom top', onUpdate: update, onRefresh: update });
    update();
    return () => {
      st.kill();
      el.classList.remove('journey--live');
      items.forEach((it) => {
        it.classList.remove('is-lit', 'is-current');
        it.style.removeProperty('--fill');
      });
    };
  }, [steps.length]);

  return (
    <ol ref={list} className="journey" data-reveal style={{ '--n': steps.length } as React.CSSProperties}>
      {steps.map((s, i) => (
        <li key={s.title + i} className="journey__step" style={{ '--i': i } as React.CSSProperties}>
          {/* The line on to the next stage: a hairline, and over it the fill. */}
          {i < steps.length - 1 ? (
            <span className="journey__seg" aria-hidden="true">
              <span className="journey__fill" />
            </span>
          ) : null}
          <span className="journey__node" aria-hidden="true">
            {String(i + 1).padStart(2, '0')}
          </span>
          <div className="journey__card">
            {s.label ? <p className="journey__label">{s.label}</p> : null}
            <h3 className="journey__title">{keepHyphenated(s.title)}</h3>
            {s.text ? <p className="journey__text">{s.text}</p> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

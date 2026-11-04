'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CmsImage from '@/components/ui/CmsImage';
import type { Service } from '@/content/types';

gsap.registerPlugin(ScrollTrigger);

type Platform = NonNullable<Service['platforms']>['platformItems'][number];

/**
 * A programme's platforms as a list beside one photo that stays in view (from 1000px up): the
 * row nearest the middle of the screen is the current one, its line draws across, and the photo
 * crossfades to its own. Narrower, each row carries its photo and nothing dims. Without script
 * the rows all read in full, with the first photo beside them.
 */
export default function PlatformShowcase({ items }: { items: Platform[] }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const rows = Array.from(el.querySelectorAll<HTMLElement>('.platform'));
    const photos = Array.from(el.querySelectorAll<HTMLElement>('.platforms__photo'));
    let current = -1;

    const update = () => {
      const mid = window.innerHeight / 2;
      let next = 0;
      let nearest = Infinity;
      rows.forEach((row, i) => {
        const b = row.getBoundingClientRect();
        const d = Math.abs(b.top + b.height / 2 - mid);
        if (d < nearest) {
          nearest = d;
          next = i;
        }
      });
      if (next === current) return;
      current = next;
      rows.forEach((row, i) => row.classList.toggle('is-current', i === next));
      photos.forEach((photo, i) => photo.classList.toggle('is-current', i === next));
    };

    el.classList.add('platforms--live');
    const st = ScrollTrigger.create({ trigger: el, start: 'top bottom', end: 'bottom top', onUpdate: update, onRefresh: update });
    update();
    return () => {
      st.kill();
      el.classList.remove('platforms--live');
      rows.forEach((row) => row.classList.remove('is-current'));
      photos.forEach((photo) => photo.classList.remove('is-current'));
    };
  }, [items.length]);

  return (
    <div ref={root} className="platforms">
      {/* Only one of the two sets of photos is ever displayed, so each description is read once. */}
      <div className="platforms__stage" data-reveal="mask">
        {items.map((p, i) =>
          p.image ? (
            <figure key={p.name + i} className={['platforms__photo', i === 0 ? 'is-first' : ''].filter(Boolean).join(' ')}>
              <CmsImage src={p.image.src} alt={p.image.alt} fill sizes="(max-width: 999px) 1px, 75vw" quality={82} />
            </figure>
          ) : null,
        )}
      </div>
      <ol className="platforms__list">
        {items.map((p, i) => (
          <li key={p.name + i} className={['platform', p.points?.length ? 'platform--points' : ''].filter(Boolean).join(' ')} data-reveal>
            {p.image ? (
              <figure className="platform__photo">
                <CmsImage src={p.image.src} alt={p.image.alt} fill sizes="(max-width: 999px) 92vw, 1px" quality={82} />
              </figure>
            ) : null}
            <div className="platform__body">
              {p.points?.length ? (
                <span className="platform__num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
              ) : null}
              <h3 className="platform__name">{p.name}</h3>
              {p.text ? <p className="platform__text">{p.text}</p> : null}
              {p.points?.length ? (
                <ul className="platform__points">
                  {p.points.map((point, k) => (
                    <li key={point + k}>{point}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

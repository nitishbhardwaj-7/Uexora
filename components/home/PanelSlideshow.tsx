'use client';

import { useEffect, useRef, useState } from 'react';
import CmsImage from '@/components/ui/CmsImage';
import { isReducedMotion } from '@/lib/motion';

type Photo = { src: string; alt: string };

/**
 * Photos for a home division panel, changing every `interval` ms: the incoming photo fades in
 * over the previous one. `offset` delays the first change so neighbouring panels alternate. Runs only while the panel is on screen and
 * the tab is visible; stays on the first photo under prefers-reduced-motion. Only the visible
 * photo is exposed to assistive technology.
 */
export default function PanelSlideshow({ photos, interval = 4000, offset = 0 }: { photos: Photo[]; interval?: number; offset?: number }) {
  const [{ active, prev }, setShow] = useState<{ active: number; prev: number | null }>({ active: 0, prev: null });
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || photos.length < 2 || isReducedMotion()) return;
    let visible = false;
    let tick: number | undefined;
    let start: number | undefined;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    const step = () => {
      if (!visible || document.hidden) return;
      setShow((s) => ({ prev: s.active, active: (s.active + 1) % photos.length }));
    };
    start = window.setTimeout(() => {
      tick = window.setInterval(step, interval);
    }, offset);
    return () => {
      io.disconnect();
      window.clearTimeout(start);
      window.clearInterval(tick);
    };
  }, [photos.length, interval, offset]);

  return (
    <div ref={root} className="panel-slides">
      {photos.map((p, i) => (
        <div
          key={p.src}
          className={[
            'panel-slides__slide',
            i === active ? 'is-active' : '',
            // the wipe plays on changes only, not for the first photo on page load
            i === active && prev !== null ? 'is-entering' : '',
            i === prev ? 'is-prev' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          aria-hidden={i !== active}
        >
          <CmsImage
            src={p.src}
            alt={p.alt}
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            className="division-panel__photo"
            loading={i === 0 ? undefined : 'lazy'}
          />
        </div>
      ))}
    </div>
  );
}

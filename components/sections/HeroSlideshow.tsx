'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import CmsImage from '@/components/ui/CmsImage';
import { isReducedMotion } from '@/lib/motion';

export type HeroSlide = { src: string; alt: string; label: string; href: string };

/**
 * Photo card for the division landing heroes: the division's programme or service photos
 * crossfade in turn, with a frosted strip naming the one shown (a link to its page).
 * Pauses while hovered or focused and while the tab is hidden; stays on the first photo
 * under prefers-reduced-motion. Only the visible photo is exposed to assistive technology.
 */
export default function HeroSlideshow({ slides, interval = 2000 }: { slides: HeroSlide[]; interval?: number }) {
  const [active, setActive] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    if (slides.length < 2 || isReducedMotion()) return;
    const id = window.setInterval(() => {
      if (paused.current || document.hidden) return;
      setActive((i) => (i + 1) % slides.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [slides.length, interval]);

  if (!slides.length) return null;
  const hold = () => (paused.current = true);
  const release = () => (paused.current = false);

  return (
    <div className="hero-slides" onMouseEnter={hold} onMouseLeave={release} onFocus={hold} onBlur={release}>
      <div className="page-hero__media-inner" data-parallax="0.14">
        {slides.map((s, i) => (
          <div key={s.src} className={['hero-slides__slide', i === active ? 'is-active' : ''].filter(Boolean).join(' ')} aria-hidden={i !== active}>
            {/* The landscape photo is drawn about 900 px wide to fill the 4:5 card's height (plus
                the parallax overscan), so that is the width to ask for, not the card's. Loaded up
                front at low priority so each photo is ready before its turn; small screens, where
                the card is hidden, only ask for the tiniest size. */}
            <CmsImage src={s.src} alt={s.alt} fill sizes="(max-width: 900px) 1px, 900px" quality={82} loading="eager" fetchPriority="low" />
          </div>
        ))}
      </div>
      {/* One caption per photo, stacked and crossfaded with the same class and timing as the
          photos, so name and picture change together. Only the visible one is a working link. */}
      {slides.map((s, i) => (
        <Link
          key={s.href}
          href={s.href}
          className={['hero-slides__caption', i === active ? 'is-active' : ''].filter(Boolean).join(' ')}
          aria-hidden={i !== active}
          tabIndex={i === active ? undefined : -1}
        >
          <span className="hero-slides__label">{s.label}</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      ))}
    </div>
  );
}

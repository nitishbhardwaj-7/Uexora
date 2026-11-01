'use client';

import { useEffect, useRef, useState } from 'react';
import CmsImage from '@/components/ui/CmsImage';
import type { Service } from '@/content/types';

type Slide = NonNullable<Service['courses']>['courseSlides'][number];

const pad = (n: number) => String(n).padStart(2, '0');

function Chevron({ dir }: { dir: 'prev' | 'next' }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d={dir === 'prev' ? 'M10 3.5 5.5 8l4.5 4.5' : 'M6 3.5 10.5 8 6 12.5'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * The courses within a programme as a looping slider: one large landscape card in the centre,
 * with its heading, audience and description over the photo, and its neighbours peeking out,
 * smaller and in shadow, on either side. The arrows, a click on a neighbour, a swipe or the
 * arrow keys move it. Every slide is rendered, so all the text is in the page; only the centre
 * one is exposed to assistive technology. When it comes into view the centre card rises and the
 * neighbours slide out from behind it; without JavaScript or under reduced motion it simply
 * shows finished (see globals.css).
 *
 * It also moves on by itself every AUTOPLAY_MS while it is on screen. Moving it by hand restarts
 * the wait; it holds while keyboard focus is inside it, and the button beside the count pauses
 * it. Under reduced motion it never moves by itself.
 */
const AUTOPLAY_MS = 2000;

export default function CourseSlider({ slides, label }: { slides: Slide[]; label: string }) {
  const n = slides.length;
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [motionOk, setMotionOk] = useState(false);
  const [keyboardIn, setKeyboardIn] = useState(false);
  const [paused, setPaused] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const start = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);

  const wrap = (i: number) => ((i % n) + n) % n;
  const go = (i: number) => setActive(wrap(i));
  const step = (by: number) => setActive((a) => wrap(a + by));

  useEffect(() => {
    const el = root.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const motion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setMotionOk(motion);
    if (motion) el.classList.add('is-armed');
    let done: number | undefined;
    // Plays the entrance the first time it comes into view; keeps track of whether it is on
    // screen, so it only moves by itself while someone can see it.
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (!entry.isIntersecting || el.classList.contains('is-in')) return;
        el.classList.add('is-in');
        done = window.setTimeout(() => el.classList.add('is-done'), 1700);
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(done);
    };
  }, []);

  // Every change, by hand or by itself, starts a fresh wait before the next one.
  const playing = n > 1 && motionOk && inView && !keyboardIn && !paused;
  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % n), AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [playing, active, n]);

  // Hold while keyboard focus is inside (a mouse click on an arrow does not count).
  const onFocus = (e: React.FocusEvent) => {
    if ((e.target as HTMLElement).matches?.(':focus-visible')) setKeyboardIn(true);
  };
  const onBlur = (e: React.FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setKeyboardIn(false);
  };

  // Where a slide sits relative to the centre one, the shorter way round: -3 to 3.
  const posOf = (i: number) => {
    let d = (i - active + n) % n;
    if (d > n / 2) d -= n;
    return Math.max(-3, Math.min(3, d));
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    step(e.key === 'ArrowRight' ? 1 : -1);
  };

  // A horizontal swipe (or mouse drag) moves one slide; a vertical one is left to the page.
  const onPointerDown = (e: React.PointerEvent) => {
    start.current = { x: e.clientX, y: e.clientY };
    swiped.current = false;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const s = start.current;
    start.current = null;
    if (!s) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      swiped.current = true;
      step(dx < 0 ? 1 : -1);
    }
  };

  return (
    <div ref={root} className="cslider" role="region" aria-roledescription="carousel" aria-label={label} onKeyDown={onKey} onFocus={onFocus} onBlur={onBlur}>
      <div className="cslider__stage" onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerCancel={() => (start.current = null)}>
        {slides.map((s, i) => {
          const d = posOf(i);
          return (
            <div
              key={s.title + i}
              className="cslide"
              data-pos={d}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${n}`}
              aria-hidden={d !== 0 ? true : undefined}
              onClick={() => {
                if (!swiped.current && d !== 0) go(i);
              }}
            >
              <figure className="cslide__photo">
                {s.image?.src ? (
                  <CmsImage
                    src={s.image.src}
                    alt={s.image.alt}
                    fill
                    sizes="(max-width: 700px) 84vw, (max-width: 1100px) 80vw, (max-width: 1600px) 70vw, 1120px"
                    quality={82}
                    draggable={false}
                  />
                ) : null}
              </figure>
              <div className="cslide__body">
                <h3 className="cslide__title">{s.title}</h3>
                {s.audience ? <p className="cslide__audience">{s.audience}</p> : null}
                {s.text ? <p className="cslide__text">{s.text}</p> : null}
              </div>
            </div>
          );
        })}
        {n > 1 ? (
          <>
            <button type="button" className="cslider__arrow cslider__arrow--prev" aria-label="Previous programme" onClick={() => step(-1)}>
              <Chevron dir="prev" />
            </button>
            <button type="button" className="cslider__arrow cslider__arrow--next" aria-label="Next programme" onClick={() => step(1)}>
              <Chevron dir="next" />
            </button>
          </>
        ) : null}
      </div>
      {n > 1 ? (
        <div className="cslider__foot">
          <button type="button" className="cslider__play" aria-label={paused ? 'Play the slides' : 'Pause the slides'} onClick={() => setPaused((p) => !p)}>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              {paused ? <path d="M5 3.2v9.6L12.6 8 5 3.2Z" fill="currentColor" /> : <path d="M5 3.5h2v9H5zM9 3.5h2v9H9z" fill="currentColor" />}
            </svg>
          </button>
          {/* Announced only while it is still: a change every two seconds would talk over everything. */}
          <p className="cslider__count" aria-live={playing ? 'off' : 'polite'}>
            <span className="cslider__now">{pad(active + 1)}</span>
            <span className="cslider__of"> / {pad(n)}</span>
            <span className="visually-hidden">: {slides[active].title}</span>
          </p>
          <span className="cslider__bar" style={{ '--p': (active + 1) / n } as React.CSSProperties} aria-hidden="true" />
        </div>
      ) : null}
    </div>
  );
}

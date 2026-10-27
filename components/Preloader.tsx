'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { MONO } from './brand/logo-paths';
import { MONO_IMG } from './brand/Monogram';
import Wordmark from './brand/Wordmark';

const BODY = MONO.base.reduce((a, b) => (a.length > b.length ? a : b));

/** Milliseconds from first paint: the exit starts once the bar and the logo have taken their
 *  colours (keep in sync with the CSS); the CSS-only fade (no script) starts at FALLBACK_AT_MS. */
const EXIT_AT_MS = 3150;
const FLIGHT_MS = 1150;
const FALLBACK_AT_MS = 4200;

/** Where an image's artwork is actually drawn inside its box (object-fit: contain). */
function drawn(img: HTMLImageElement) {
  const r = img.getBoundingClientRect();
  const iw = img.naturalWidth || r.width;
  const ih = img.naturalHeight || r.height;
  const s = Math.min(r.width / iw, r.height / ih);
  return { x: r.left + (r.width - iw * s) / 2, y: r.top + (r.height - ih * s) / 2, w: iw * s, h: ih * s };
}

/**
 * Glides the loader's logo and wordmark onto the home hero's (same artwork), so the hero's
 * own take over without a visible change. Returns no animations when there is no hero to land on.
 */
function fly(el: HTMLElement): Animation[] {
  const pairs = [
    [el.querySelector('.preloader__mark-wrap'), el.querySelector('.preloader__exact'), document.querySelector('.hero__mark')],
    [el.querySelector('.preloader__word'), el.querySelector('.preloader__word-brand'), document.querySelector('.hero__word')],
  ] as [HTMLElement | null, HTMLImageElement | null, HTMLImageElement | null][];
  if (pairs.some(([w, s, t]) => !w || !s || !t || t.getBoundingClientRect().bottom <= 0)) return [];
  return pairs.map(([wrap, src, target], i) => {
    const w = wrap!.getBoundingClientRect();
    const s = drawn(src!);
    const t = drawn(target!);
    const k = t.w / s.w;
    // Scaling about the wrapper's centre, then moving the artwork's centre onto the target's.
    const wx = w.left + w.width / 2;
    const wy = w.top + w.height / 2;
    const dx = t.x + t.w / 2 - (wx + k * (s.x + s.w / 2 - wx));
    const dy = t.y + t.h / 2 - (wy + k * (s.y + s.h / 2 - wy));
    if (i === 0) el.style.setProperty('--pl-k', String(k));
    return wrap!.animate([{ transform: 'none' }, { transform: `translate(${dx}px, ${dy}px) scale(${k})` }], {
      duration: FLIGHT_MS,
      easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
      fill: 'forwards',
    });
  });
}

declare global {
  interface Window {
    __uexoraReady?: boolean;
  }
}

const chrome = () => Array.from(document.body.querySelectorAll<HTMLElement>(':scope > header, :scope > main, :scope > footer'));

function finish() {
  window.__uexoraReady = true;
  document.body.classList.remove('is-loading');
  chrome().forEach((el) => {
    el.inert = false;
    el.removeAttribute('aria-hidden');
  });
  window.__lenis?.start();
  window.dispatchEvent(new CustomEvent('uexora:ready'));
}

/**
 * Brand opening (about 4.3 s) on white: the "U" draws on as an outline in black and white,
 * fills, the swoosh sweeps in and the wordmark rises while the line fills. Once full, the line
 * runs blue to gold and the logo and wordmark take on their colours. Then the white dissolves
 * into the page; on the home page the logo and wordmark glide onto the hero's own (which take
 * over at the end), elsewhere they fade. It plays on every page load.
 *
 * Up to the exit the sequence is CSS keyframes + SMIL in the server-rendered markup, so it
 * starts at first paint without JavaScript; the exit needs measurements, so React runs it.
 */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDone(true);
      finish();
      return;
    }

    // Reveal from the top so the hero entrance plays after the wipe, even on a reload.
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    document.body.classList.add('is-loading');
    chrome().forEach((n) => {
      n.inert = true;
      n.setAttribute('aria-hidden', 'true');
    });
    window.__lenis?.stop();

    // The bar's fill started at first paint, so its clock says how far the opening has got.
    const bar = el.querySelector('.preloader__bar span')?.getAnimations()[0];
    const elapsed = bar ? Number(bar.currentTime ?? 0) : 0;
    let cancelled = false;
    let endTimer: ReturnType<typeof setTimeout> | undefined;
    const end = () => {
      if (cancelled) return;
      setDone(true);
      finish();
    };

    // Scripts arrived after the CSS-only fade began: let it finish and start the page.
    if (elapsed >= FALLBACK_AT_MS) {
      document.body.classList.remove('is-loading');
      window.dispatchEvent(new CustomEvent('uexora:exit'));
      endTimer = setTimeout(end, 800);
      return () => {
        cancelled = true;
        clearTimeout(endTimer);
      };
    }
    el.classList.add('is-js');

    // The page beneath becomes visible as the white dissolves, so the hero entrances that start
    // now are seen; it stays inert until the overlay has gone (finish()). The hero sets its logo
    // to its resting place on 'uexora:exit', so it is measured just after.
    const exitTimer = setTimeout(() => {
      document.body.classList.remove('is-loading');
      window.dispatchEvent(new CustomEvent('uexora:exit'));
      const flights = fly(el);
      el.classList.add('is-leaving');
      if (flights.length) Promise.all(flights.map((a) => a.finished)).then(end, end);
      else {
        el.classList.add('is-fade');
        endTimer = setTimeout(end, FLIGHT_MS);
      }
    }, Math.max(0, EXIT_AT_MS - elapsed));

    return () => {
      cancelled = true;
      clearTimeout(exitTimer);
      if (endTimer) clearTimeout(endTimer);
    };
  }, []);

  if (done) return null;

  return (
    <div ref={root} className="preloader" aria-hidden="true">
      <div className="preloader__inner">
        <div className="preloader__mark-wrap">
          <svg viewBox={`0 0 ${MONO.w} ${MONO.h}`} className="preloader__mark" xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision">
            <defs>
              <linearGradient id="pl-blue" x1="0" y1="0" x2="1" y2="1">
                {/* Monochrome on white: the coloured logo is kept for the hero the loader reveals. */}
                <stop offset="0" stopColor="#3d3d40" />
                <stop offset="0.45" stopColor="#1c1c1f" />
                <stop offset="1" stopColor="#0a0a0c" />
              </linearGradient>
              <linearGradient id="pl-gold" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0" stopColor="#5c5c60" />
                <stop offset="0.5" stopColor="#85858a" />
                <stop offset="1" stopColor="#a9a9ad" />
              </linearGradient>
              {/* The liquid wobble lives only in the masks (the water line and the sweep's edge),
                  so the U and the swoosh keep their exact outlines while they fill. */}
              <filter id="pl-liquid" filterUnits="userSpaceOnUse" x="-400" y="-400" width="2400" height="2400">
                <feTurbulence type="fractalNoise" baseFrequency="0.005 0.009" numOctaves="1" seed="7" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="48" xChannelSelector="R" yChannelSelector="G">
                  <animate attributeName="scale" from="48" to="0" begin="0.5s" dur="1.1s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1" />
                </feDisplacementMap>
              </filter>
              <mask id="pl-fill" maskUnits="userSpaceOnUse" x="0" y="0" width={MONO.w} height={MONO.h}>
                <path className="pl-wave pl-liquid" d="M-300 0 C -50 -70 150 70 400 0 S 850 -70 1100 0 S 1400 40 1600 0 L 1600 1500 L -300 1500 Z" fill="#fff" filter="url(#pl-liquid)" />
              </mask>
              <mask id="pl-sweep" maskUnits="userSpaceOnUse" x="0" y="0" width={MONO.w} height={MONO.h}>
                <circle className="pl-liquid" cx="560" cy="900" r="0" fill="#fff" filter="url(#pl-liquid)">
                  <animate attributeName="r" from="0" to="1400" begin="0.8s" dur="0.9s" fill="freeze" calcMode="spline" keySplines="0.65 0 0.35 1" />
                </circle>
              </mask>
            </defs>
            <path className="pl-outline" d={BODY} pathLength={1} fill="none" stroke="#141416" strokeWidth="5" strokeLinejoin="round" />
            <path d={BODY} fill="url(#pl-blue)" mask="url(#pl-fill)" />
            <g mask="url(#pl-sweep)">
              {MONO.gold.map((d, i) => (
                <path key={i} d={d} fill="url(#pl-gold)" />
              ))}
            </g>
            <circle className="pl-dot" cx={MONO.dot.cx} cy={MONO.dot.cy} r={MONO.dot.r} fill="url(#pl-gold)" />
          </svg>
          <Image className="preloader__exact" src={MONO_IMG.src} width={MONO_IMG.w} height={MONO_IMG.h} alt="" sizes="240px" preload fetchPriority="high" />
        </div>
        <span className="preloader__word">
          <Wordmark className="preloader__word-brand" tone="brand" priority />
          <Wordmark className="preloader__word-light" tone="light" />
        </span>
        <div className="preloader__bar">
          <span />
        </div>
      </div>
    </div>
  );
}

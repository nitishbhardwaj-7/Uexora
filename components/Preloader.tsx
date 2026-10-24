'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { MONO } from './brand/logo-paths';
import { MONO_IMG } from './brand/Monogram';
import Wordmark from './brand/Wordmark';

const BODY = MONO.base.reduce((a, b) => (a.length > b.length ? a : b));

/** Milliseconds (from first paint) at which the overlay starts its exit wipe. Keep in sync with the CSS. */
const EXIT_AT_MS = 2600;
const TOTAL_MS = 3700;

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
 * Brand opening (about 3.7 s): the "U" draws on as a gold outline, fills with blue,
 * the gold swoosh sweeps in, the exact artwork settles, and the overlay wipes upward
 * while the hero's own entrance begins underneath. It plays on every page load.
 *
 * The sequence is CSS keyframes + SMIL in the server-rendered markup, so it starts at
 * first paint without JavaScript. React only waits for the wipe to end.
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

    const wipe = el.getAnimations({ subtree: false }).find((a) => (a as CSSAnimation).animationName === 'pl-wipe');
    const elapsed = wipe ? Number(wipe.currentTime ?? 0) : 0;
    let cancelled = false;
    // As the wipe begins, the page beneath becomes visible so the hero entrances that start
    // now are actually seen; it stays inert until the overlay has gone (finish()).
    const exitTimer = setTimeout(() => {
      document.body.classList.remove('is-loading');
      window.dispatchEvent(new CustomEvent('uexora:exit'));
    }, Math.max(0, EXIT_AT_MS - elapsed));
    const end = () => {
      if (cancelled) return;
      setDone(true);
      finish();
    };
    let endTimer: ReturnType<typeof setTimeout> | undefined;
    if (wipe) wipe.finished.then(end, end);
    else endTimer = setTimeout(end, Math.max(0, TOTAL_MS - elapsed));

    return () => {
      cancelled = true;
      clearTimeout(exitTimer);
      if (endTimer) clearTimeout(endTimer);
    };
  }, []);

  if (done) return null;

  return (
    <div ref={root} className="preloader" aria-hidden="true">
      <div className="preloader__glow" />
      <div className="preloader__inner">
        <div className="preloader__mark-wrap">
          <svg viewBox={`0 0 ${MONO.w} ${MONO.h}`} className="preloader__mark" xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision">
            <defs>
              <linearGradient id="pl-blue" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#2f63ff" />
                <stop offset="0.45" stopColor="#1333b8" />
                <stop offset="1" stopColor="#071a7a" />
              </linearGradient>
              <linearGradient id="pl-gold" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0" stopColor="#d99306" />
                <stop offset="0.5" stopColor="#f6c535" />
                <stop offset="1" stopColor="#ffe58a" />
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
            <path className="pl-outline" d={BODY} pathLength={1} fill="none" stroke="url(#pl-gold)" strokeWidth="5" strokeLinejoin="round" />
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
        <Wordmark className="preloader__word" tone="light" />
        <div className="preloader__bar">
          <span />
        </div>
      </div>
    </div>
  );
}

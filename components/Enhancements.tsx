'use client';

import { useEffect, useState, type ComponentType } from 'react';

type Mods = {
  SmoothScroll: ComponentType;
  ScrollEffects: ComponentType;
  Cursor: ComponentType;
  Spotlight: ComponentType;
};

/**
 * Progressive enhancements (smooth scroll, scroll animations, cursor, card spotlight).
 * Loaded after the page is interactive so their JavaScript stays off the critical path.
 * The page is fully usable without them.
 */
export default function Enhancements() {
  const [mods, setMods] = useState<Mods | null>(null);

  useEffect(() => {
    let cancelled = false;
    const Noop = () => null;
    const pointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const load = async () => {
      const [a, b] = await Promise.all([import('./SmoothScroll'), import('./ScrollEffects')]);
      // Cursor and spotlight only matter with a mouse; never ship them to touch devices.
      const [c, d] = pointer ? await Promise.all([import('./Cursor'), import('./Spotlight')]) : [{ default: Noop }, { default: Noop }];
      if (!cancelled) setMods({ SmoothScroll: a.default, ScrollEffects: b.default, Cursor: c.default, Spotlight: d.default });
    };
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    if (idle) idle(load, { timeout: 1500 });
    else setTimeout(load, 200);
    return () => {
      cancelled = true;
    };
  }, []);

  if (!mods) return null;
  return (
    <>
      <mods.SmoothScroll />
      <mods.ScrollEffects />
      <mods.Cursor />
      <mods.Spotlight />
    </>
  );
}

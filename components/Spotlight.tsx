'use client';

import { useEffect } from 'react';

/**
 * Cursor-tracking spotlight for `.card` and `[data-spotlight]` elements.
 * Writes --mx / --my (pointer position inside the element, in px) so CSS can
 * draw a radial glow and an edge highlight that follow the pointer.
 */
export default function Spotlight() {
  useEffect(() => {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

    let frame = 0;
    let last: { el: HTMLElement; x: number; y: number } | null = null;

    const apply = () => {
      frame = 0;
      if (!last) return;
      const { el, x, y } = last;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${x - r.left}px`);
      el.style.setProperty('--my', `${y - r.top}px`);
    };

    const move = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>('.card, [data-spotlight]');
      if (!el) return;
      last = { el, x: e.clientX, y: e.clientY };
      if (!frame) frame = requestAnimationFrame(apply);
    };

    document.addEventListener('pointermove', move, { passive: true });
    return () => {
      document.removeEventListener('pointermove', move);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}

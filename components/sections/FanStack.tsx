'use client';

import { useEffect, useRef } from 'react';

/**
 * Decorative fan of photos beside the closing call to action. When it scrolls into view it
 * gets .is-in (the centre photo rises and the side photos slide out from behind it);
 * once that has played, .is-done clears the entrance delays so
 * the hover spread responds at once. The start state is only applied when JavaScript runs
 * and motion is allowed (see globals.css), so without either the fan simply shows finished.
 */
export default function FanStack({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-in', 'is-done');
      return;
    }
    let done: number | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.add('is-in');
        done = window.setTimeout(() => el.classList.add('is-done'), 1900);
        io.disconnect();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(done);
    };
  }, []);

  return (
    <div ref={ref} className="pcta__stack" aria-hidden="true">
      {children}
    </div>
  );
}

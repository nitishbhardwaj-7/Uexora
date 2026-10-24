'use client';

import { useLayoutEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { isReducedMotion, motion } from '@/lib/motion';

/**
 * Entrance for a newly navigated page: the incoming content rises and fades in over
 * about half a second. There is no outgoing curtain, so navigation is never slowed,
 * server rendering is untouched and back/forward work as usual. Skipped on the first
 * load (the opening and hero handle that) and under prefers-reduced-motion.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  // Layout phase: the incoming page is hidden before the browser paints it, then rises in.
  useLayoutEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const el = ref.current;
    if (!el || isReducedMotion()) return;
    const tween = gsap.fromTo(el, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: motion.duration.quick, ease: motion.ease.soft, clearProps: 'all' });
    return () => {
      tween.kill();
    };
  }, [pathname]);

  return (
    <div ref={ref} className="page-transition">
      {children}
    </div>
  );
}

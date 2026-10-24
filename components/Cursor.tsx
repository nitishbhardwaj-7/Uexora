'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.32, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.32, ease: 'power3.out' });
    let shown = false;

    const move = (e: MouseEvent) => {
      if (!shown) {
        shown = true;
        el.classList.remove('is-hidden');
      }
      xTo(e.clientX);
      yTo(e.clientY);
      const hover = (e.target as HTMLElement).closest('a, button, [data-cursor]');
      el.classList.toggle('is-hover', !!hover);
    };
    const leave = () => el.classList.add('is-hidden');
    const enter = () => shown && el.classList.remove('is-hidden');

    window.addEventListener('mousemove', move, { passive: true });
    document.documentElement.addEventListener('mouseleave', leave);
    document.documentElement.addEventListener('mouseenter', enter);
    return () => {
      window.removeEventListener('mousemove', move);
      document.documentElement.removeEventListener('mouseleave', leave);
      document.documentElement.removeEventListener('mouseenter', enter);
    };
  }, []);

  return (
    <div ref={ref} className="cursor is-hidden" aria-hidden="true">
      <div className="cursor__ring" />
      <div className="cursor__dot" />
    </div>
  );
}

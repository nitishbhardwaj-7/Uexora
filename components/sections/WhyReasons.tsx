'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isFinePointer, isNarrow, isReducedMotion, motion } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

type Reason = { title: string; text: string };

/**
 * "Why choose us" as a ruled grid that builds itself as it scrolls into view, cell by cell from
 * the top left: the hairlines draw, an orange line runs along the top of the cell and pulls back
 * to its short mark, the numeral rolls up out of a mask, and a navy block wipes across to uncover
 * the words. While scrolling the numerals drift at a different speed per column; on a pointer
 * device a soft gold light follows the cursor across the grid. Without script, or with reduced
 * motion, the grid simply shows complete.
 */
export default function WhyReasons({ items }: { items: Reason[] }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || isReducedMotion()) return;
    const cells = gsap.utils.toArray<HTMLElement>('.xw__cell', el);
    const rows = [...new Set(cells.map((c) => c.offsetTop))];
    const lefts = [...new Set(cells.map((c) => c.offsetLeft))];
    const place = (c: HTMLElement) => ({ row: rows.indexOf(c.offsetTop), col: lefts.indexOf(c.offsetLeft) });
    const { travel, out } = motion.ease;

    const parts = (cell: HTMLElement) => ({
      line: cell.querySelector('.xw__line'),
      vline: cell.querySelector('.xw__vline'),
      rule: cell.querySelector('.xw__rule'),
      roll: cell.querySelector('.xw__num-in'),
      curtain: cell.querySelector('.xw__curtain'),
      words: cell.querySelector('.xw__words'),
    });

    const build = (tl: gsap.core.Timeline, cell: HTMLElement, at: number) => {
      const { line, vline, rule, roll, curtain, words } = parts(cell);
      tl.to(line, { scaleX: 1, duration: 0.9, ease: travel }, at)
        .to(vline, { scaleY: 1, duration: 0.9, ease: travel }, at + 0.1)
        .fromTo(rule, { width: '0%' }, { width: '100%', duration: 0.6, ease: travel }, at + 0.15)
        .to(rule, { width: '2.4rem', duration: 0.8, ease: out, clearProps: 'width' }, at + 0.8)
        .to(roll, { yPercent: 0, duration: motion.duration.base, ease: out }, at + 0.35)
        .fromTo(curtain, { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: 0.45, ease: travel }, at + 0.3)
        .set(words, { autoAlpha: 1 }, at + 0.75)
        .set(curtain, { transformOrigin: 'right center' }, at + 0.75)
        .to(curtain, { scaleX: 0, duration: 0.6, ease: travel }, at + 0.75)
        // From here the hover effects (which use CSS transitions) can take over.
        .call(() => cell.classList.add('is-done'), undefined, at + 1.6);
    };

    const ctx = gsap.context(() => {
      cells.forEach((cell) => {
        const { line, vline, rule, roll, curtain, words } = parts(cell);
        gsap.set(line, { scaleX: 0 });
        gsap.set(vline, { scaleY: 0 });
        gsap.set(rule, { width: 0 });
        gsap.set(roll, { yPercent: 110 });
        gsap.set(curtain, { scaleX: 0 });
        gsap.set(words, { autoAlpha: 0 });
      });

      // Side by side, the whole grid plays as one wave; in a single column each reason waits for its own turn on screen.
      const groups = lefts.length > 1 ? [cells] : cells.map((c) => [c]);
      groups.forEach((group) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: group[0], start: 'top 80%', once: true } });
        group.forEach((cell) => {
          const { row, col } = place(cell);
          build(tl, cell, group.length > 1 ? (row + col) * 0.17 : 0);
        });
      });

      if (!isNarrow()) {
        cells.forEach((cell) => {
          const drift = 12 + place(cell).col * 14;
          gsap.fromTo(
            cell.querySelector('.xw__num'),
            { y: drift },
            { y: -drift, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.6 } }
          );
        });
      }
    }, el);

    // The light that follows the pointer.
    const glow = el.querySelector<HTMLElement>('.xw__glow');
    let off = () => {};
    if (glow && isFinePointer()) {
      const x = gsap.quickTo(glow, 'x', { duration: 0.6, ease: 'power3' });
      const y = gsap.quickTo(glow, 'y', { duration: 0.6, ease: 'power3' });
      const move = (e: PointerEvent) => {
        const b = el.getBoundingClientRect();
        x(e.clientX - b.left);
        y(e.clientY - b.top);
      };
      const show = (e: PointerEvent) => {
        const b = el.getBoundingClientRect();
        gsap.set(glow, { x: e.clientX - b.left, y: e.clientY - b.top });
        gsap.to(glow, { opacity: 1, duration: 0.5, overwrite: 'auto' });
      };
      const hide = () => gsap.to(glow, { opacity: 0, duration: 0.6, overwrite: 'auto' });
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerenter', show);
      el.addEventListener('pointerleave', hide);
      off = () => {
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerenter', show);
        el.removeEventListener('pointerleave', hide);
        gsap.killTweensOf(glow);
      };
    }

    return () => {
      off();
      ctx.revert();
      cells.forEach((c) => c.classList.remove('is-done'));
    };
  }, [items.length]);

  return (
    <div ref={root} className="xw">
      <span className="xw__glow" aria-hidden="true" />
      <ul className="xw__grid">
        {items.map((w, k) => (
          <li key={w.title + k} className="xw__cell">
            <span className="xw__line" aria-hidden="true" />
            <span className="xw__vline" aria-hidden="true" />
            <span className="xw__rail" aria-hidden="true">
              <span className="xw__rule" />
            </span>
            <span className="xw__num" aria-hidden="true">
              <span className="xw__num-in">{String(k + 1).padStart(2, '0')}</span>
            </span>
            <div className="xw__body">
              <div className="xw__words">
                <h3 className="xw__title">{w.title}</h3>
                <p className="xw__text">{w.text}</p>
              </div>
              <span className="xw__curtain" aria-hidden="true" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

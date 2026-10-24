'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { isReducedMotion, motion, rise } from '@/lib/motion';

gsap.registerPlugin(SplitText);

/**
 * Sequenced entrance for a page hero (division and programme/service pages):
 * breadcrumb, headline lines out of masks, lead, buttons, keyword chips, then the
 * photo unmasking from the top while it settles from a slight zoom.
 *
 * On a hard load it starts the moment the opening overlay begins to wipe away; on a
 * client-side navigation it starts at once. Nothing is hidden until the animation is
 * about to run, so server-rendered content stays visible without JavaScript and under
 * prefers-reduced-motion.
 */
export default function PageHeroMotion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || isReducedMotion()) return;
    const q = gsap.utils.selector(el);
    let split: SplitText | null = null;
    let onExit: (() => void) | null = null;

    const ctx = gsap.context(() => {
      const crumbs = q('.page-hero__crumbs');
      const title = q('h1')[0];
      const lead = q('.lead');
      const buttons = q('.btn-row .btn');
      const chips = q('.chip');
      const media = q('.page-hero__media');
      const photo = q('.page-hero__media img');
      const badge = q('.page-hero__media .monogram');

      // On a hard load the overlay wipes upward over 0.9 s and reaches the hero last, so the
      // entrance waits for it; on a client-side navigation there is nothing to wait for.
      // Stage now (synchronously, so nothing static is ever painted), animate when asked.
      try {
        split = new SplitText(title, { type: 'lines', mask: 'lines', linesClass: 'split-line', aria: 'none' });
      } catch {
        split = null;
      }
      const lines = split ? split.lines : [title];
      const dy = rise();
      if (crumbs.length) gsap.set(crumbs, { opacity: 0, y: -8 });
      gsap.set(lines, { yPercent: 110 });
      gsap.set([lead, buttons, chips], { opacity: 0, y: dy });
      // A polygon, not inset(): browsers collapse inset() shorthand when serialising, which
      // leaves GSAP with mismatched values and makes it jump instead of tween.
      if (media.length) gsap.set(media, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' });
      if (photo.length) gsap.set(photo, { scale: 1.08 });
      if (badge.length) gsap.set(badge, { opacity: 0, scale: 0.8 });
      // CSS kept everything staged since first paint; GSAP now holds the same state.
      el.classList.add('is-live');

      const play = (fromOpening = false) => {

        const settled = [media, photo, lead, buttons, chips, crumbs].flat().filter((n): n is HTMLElement => n instanceof Element);
        const tl = gsap.timeline({
          delay: fromOpening ? 0.7 : 0,
          defaults: { ease: motion.ease.out, duration: motion.duration.base },
          // leave no inline styles behind once everything has landed
          onComplete: () =>
            settled.forEach((n) => {
              try {
                gsap.set(n, { clearProps: 'clipPath,scale,opacity,transform' });
              } catch (err) {
                console.warn('[hero] could not clear inline styles on', n.tagName, n.className, err);
              }
            }),
        });
        if (crumbs.length) tl.to(crumbs, { opacity: 1, y: 0, duration: 0.8 }, 0.05);
        tl.to(lines, { yPercent: 0, duration: 1.2, stagger: motion.stagger.lines }, 0.1)
          .to(lead, { opacity: 1, y: 0 }, 0.45)
          .to(buttons, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.6)
          .to(chips, { opacity: 1, y: 0, duration: 0.8, stagger: 0.05 }, 0.75);
        if (media.length) {
          tl.to(media, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 1.4, ease: motion.ease.travel }, 0.2)
            .to(photo, { scale: 1, duration: 2, ease: motion.ease.out }, 0.2)
            .to(badge, { opacity: 1, scale: 1, duration: 0.9 }, 1.1);
        }
      };

      const loaderUp = !window.__uexoraReady && !!document.querySelector('.preloader');
      onExit = () => play(true);
      if (loaderUp) window.addEventListener('uexora:exit', onExit, { once: true });
      else play(false);
    }, el);

    return () => {
      if (onExit) window.removeEventListener('uexora:exit', onExit);
      ctx.revert();
      split?.revert();
      el.classList.remove('is-live');
    };
  }, []);

  return (
    <div ref={root} className="page-hero__motion container page-hero__grid">
      {children}
    </div>
  );
}

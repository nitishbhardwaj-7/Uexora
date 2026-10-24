'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { isNarrow, isReducedMotion, motion } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Declarative scroll motion, re-initialised on every route change.
 *
 *  data-reveal            fade + rise as it scrolls into view (CSS animation, IntersectionObserver)
 *  data-reveal="mask"     image unmasks from the top and settles from a slight zoom (CSS animation)
 *  data-reveal-group      children stagger in
 *  data-split             heading lines slide up out of a mask (split lazily, as the heading approaches)
 *  data-line              a hairline draws across from the left as it enters
 *  data-draw-scroll       SVG strokes draw in step with scroll progress
 *  data-parallax="0.15"   restrained vertical parallax (halved on small screens)
 *  data-draw              SVG glyphs fade in one by one
 *  data-tone="dark|light" section tone; the header adopts the tone of the section under it
 *
 * Nothing is hidden before this runs: elements already on screen are marked visible first,
 * so first paint, search engines and assistive technology always see the full content.
 */
export default function ScrollEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = isReducedMotion();
    const narrow = isNarrow();
    const header = document.querySelector<HTMLElement>('.header');
    const observers: IntersectionObserver[] = [];
    const vh = window.innerHeight;
    const onScreen = (el: Element) => {
      const r = el.getBoundingClientRect();
      return r.top < vh && r.bottom > 0;
    };

    const ctx = gsap.context(() => {
      // Header tone follows sections
      const toned = gsap.utils.toArray<HTMLElement>('[data-tone]:not(.header)');
      toned.forEach((sec) => {
        ScrollTrigger.create({
          trigger: sec,
          start: 'top 42px',
          end: 'bottom 42px',
          onToggle: (self) => {
            if (self.isActive && header) header.dataset.tone = sec.dataset.tone;
          },
        });
      });
      if (header && toned[0]) header.dataset.tone = toned[0].dataset.tone;

      if (reduced) return;

      // Reveals: one IntersectionObserver toggles .is-in; CSS does the animation.
      const revealEls = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-group]'));
      // Elements already on screen have been staged (hidden) since first paint, so they
      // animate in as a short cascade rather than appearing in place.
      let onScreenCount = 0;
      revealEls.forEach((el) => {
        if (!onScreen(el)) return;
        const delay = Math.min(onScreenCount++, 6) * 0.09;
        if (el.hasAttribute('data-reveal-group')) {
          const stagger = parseFloat(el.dataset.stagger || '0.08');
          Array.from(el.children).forEach((child, i) => {
            (child as HTMLElement).style.animationDelay = `${(delay + i * stagger).toFixed(2)}s`;
          });
        } else {
          el.style.animationDelay = `${(delay + parseFloat(el.dataset.revealDelay || '0')).toFixed(2)}s`;
        }
        el.classList.add('is-in');
      });
      document.documentElement.classList.add('reveal-ready');
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target as HTMLElement;
            if (el.hasAttribute('data-reveal-group')) {
              const stagger = parseFloat(el.dataset.stagger || '0.08');
              Array.from(el.children).forEach((child, i) => {
                (child as HTMLElement).style.animationDelay = `${(i * stagger).toFixed(2)}s`;
              });
            } else if (el.dataset.revealDelay) {
              el.style.animationDelay = `${el.dataset.revealDelay}s`;
            }
            el.classList.add('is-in');
            io.unobserve(el);
          });
        },
        { rootMargin: '0px 0px -10% 0px' }
      );
      revealEls.filter((el) => !el.classList.contains('is-in')).forEach((el) => io.observe(el));
      observers.push(io);

      // Hairlines draw across as they enter.
      gsap.utils.toArray<HTMLElement>('[data-line]').forEach((line) => {
        if (onScreen(line)) return;
        gsap.set(line, { scaleX: 0, transformOrigin: 'left center' });
        ScrollTrigger.create({
          trigger: line,
          start: 'top 92%',
          once: true,
          onEnter: () => gsap.to(line, { scaleX: 1, duration: 1.2, ease: motion.ease.travel }),
        });
      });

      // Decorative strokes draw in step with scroll (the arcs behind the programme header).
      gsap.utils.toArray<SVGElement>('[data-draw-scroll]').forEach((svg) => {
        const paths = Array.from(svg.querySelectorAll<SVGPathElement>('path'));
        paths.forEach((p) => {
          const len = p.getTotalLength();
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        });
        gsap.to(paths, {
          strokeDashoffset: 0,
          ease: 'none',
          stagger: 0.08,
          scrollTrigger: { trigger: svg.parentElement || svg, start: 'top 85%', end: 'bottom 35%', scrub: 0.6 },
        });
      });

      // Restrained parallax; half the distance on small screens.
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        const amount = parseFloat(el.dataset.parallax || '0.15') * (narrow ? 0.5 : 1);
        gsap.fromTo(
          el,
          { yPercent: -amount * 100 * 0.5 },
          {
            yPercent: amount * 100 * 0.5,
            ease: 'none',
            scrollTrigger: { trigger: el.parentElement || el, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        );
      });

      gsap.utils.toArray<SVGElement>('[data-draw]').forEach((svg) => {
        const parts = svg.querySelectorAll('path');
        gsap.fromTo(
          parts,
          { opacity: 0, y: 6 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.05,
            scrollTrigger: { trigger: svg, start: 'top 90%', once: true },
          }
        );
      });

      // Headings: those already on screen stay as they are; the rest are split and animated
      // only as they approach, so the work is spread out instead of one long task on load.
      const splitHeadings = gsap.utils.toArray<HTMLElement>('[data-split]');
      const splitOne = (h: HTMLElement) => {
        if (h.classList.contains('is-split')) return;
        h.classList.add('is-split');
        let split: SplitText;
        try {
          split = new SplitText(h, { type: 'lines', mask: 'lines', linesClass: 'split-line', aria: 'none' });
        } catch {
          return;
        }
        gsap.fromTo(
          split.lines,
          { yPercent: 110 },
          { yPercent: 0, duration: 1.2, ease: motion.ease.out, stagger: motion.stagger.lines, delay: parseFloat(h.dataset.splitDelay || '0') }
        );
      };
      const armSplits = () => {
        splitHeadings.forEach((h) => {
          if (onScreen(h)) {
            h.classList.add('is-split');
            return;
          }
          ScrollTrigger.create({ trigger: h, start: 'top 110%', once: true, onEnter: () => splitOne(h) });
        });
        ScrollTrigger.refresh();
      };
      if (document.fonts?.ready) document.fonts.ready.then(armSplits);
      else armSplits();
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    const t = setTimeout(refresh, 400);

    return () => {
      clearTimeout(t);
      window.removeEventListener('load', refresh);
      observers.forEach((o) => o.disconnect());
      document.documentElement.classList.remove('reveal-ready');
      ctx.revert();
    };
  }, [pathname]);

  return null;
}

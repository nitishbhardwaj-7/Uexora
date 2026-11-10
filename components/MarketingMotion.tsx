'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isNarrow, isReducedMotion } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

/**
 * Marketing pages only: a richer, scroll-driven motion layer on top of ScrollEffects.
 * Nothing here reacts to hover, and all of it is skipped under prefers-reduced-motion,
 * so the page reads exactly as written without it.
 *
 *  - Hero depth: as the hero scrolls away its copy lifts off and the photo card sinks back.
 *  - Aurora: soft blue and orange light drifts across the navy sections with the scroll.
 *  - Marquee ([data-mk-track]): rows of service names run in opposite directions, faster and
 *    slanted while the page is scrolled, and turn round when the scroll does.
 *  - Audience cards rise at different speeds; the steps get a timeline that fills with scroll.
 *  (Headings rise word by word: see the marketing branch in ScrollEffects.)
 */
export default function MarketingMotion() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname?.startsWith('/marketing') || isReducedMotion()) return;
    const root = document.querySelector<HTMLElement>('[data-division="marketing"]');
    if (!root) return;
    const narrow = isNarrow();
    const added: HTMLElement[] = [];
    let tick: ((time: number, dt: number) => void) | null = null;
    let onResize: (() => void) | null = null;

    const ctx = gsap.context(() => {
      // Hero depth.
      const hero = root.querySelector<HTMLElement>('.page-hero');
      if (hero) {
        const copy = hero.querySelector('.page-hero__copy');
        const media = hero.querySelector('.page-hero__media');
        const tl = gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.6 } });
        if (copy) tl.to(copy, { yPercent: -14, opacity: 0.15, ease: 'none' }, 0);
        if (media) tl.to(media, { yPercent: 10, scale: 0.88, rotate: -3, ease: 'none' }, 0);
      }

      // Navy sections: soft light drifting across with the scroll. The sections themselves stay
      // full width and still, so no edge ever shows at their sides.
      const dark = Array.from(root.querySelectorAll<HTMLElement>('section[data-tone="dark"]')).filter((s) => !s.classList.contains('page-hero') && !s.parentElement?.closest('section'));
      dark.forEach((sec) => {

        const aurora = document.createElement('span');
        aurora.className = 'mk-aurora';
        aurora.setAttribute('aria-hidden', 'true');
        aurora.innerHTML = '<i class="mk-aurora__a"></i><i class="mk-aurora__b"></i>';
        sec.prepend(aurora);
        added.push(aurora);
        const [a, b] = Array.from(aurora.children) as HTMLElement[];
        const drift = { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: 1.2 };
        gsap.fromTo(a, { xPercent: -25, yPercent: -15 }, { xPercent: 35, yPercent: 25, ease: 'none', scrollTrigger: drift });
        gsap.fromTo(b, { xPercent: 25, yPercent: 20 }, { xPercent: -35, yPercent: -20, ease: 'none', scrollTrigger: { ...drift } });
      });

      // Audience cards: three speeds, so the row settles into line as it reaches the middle.
      if (!narrow) {
        const offsets = [70, 10, 130];
        root.querySelectorAll<HTMLElement>('.audience__cards').forEach((list) => {
          Array.from(list.children).forEach((card, i) => {
            gsap.fromTo(card, { y: offsets[i % 3] }, { y: 0, ease: 'none', scrollTrigger: { trigger: list, start: 'top bottom', end: 'center 55%', scrub: 0.8 } });
          });
        });
      }

      // Steps: a gradient timeline across the top of the row that fills with the scroll.
      if (!narrow) {
        root.querySelectorAll<HTMLElement>('.steps').forEach((list) => {
          const bar = document.createElement('span');
          bar.className = 'mk-timeline';
          bar.setAttribute('aria-hidden', 'true');
          list.prepend(bar);
          added.push(bar);
          gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: list, start: 'top 85%', end: 'bottom 55%', scrub: 0.5 } });
        });
      }

      // Marquee rows.
      const tracks = Array.from(root.querySelectorAll<HTMLElement>('[data-mk-track]'));
      if (tracks.length) {
        const rows = tracks.map((el, i) => ({
          el,
          x: 0,
          dir: i % 2 ? 1 : -1,
          w: 0,
          setX: gsap.quickSetter(el, 'x', 'px') as (v: number) => void,
          setSkew: gsap.quickSetter(el, 'skewX', 'deg') as (v: number) => void,
        }));
        // The outlined row starts part of the way along, so the two rows never show the same name together.
        const measure = () =>
          rows.forEach((r, i) => {
            const first = !r.w;
            r.w = (r.el.firstElementChild as HTMLElement | null)?.offsetWidth || 0;
            if (first && i % 2) r.x = -r.w * 0.37;
          });
        measure();
        document.fonts?.ready.then(measure);
        onResize = measure;
        window.addEventListener('resize', onResize);

        let visible = false;
        const band = tracks[0].closest<HTMLElement>('.mk-marquee') || tracks[0];
        ScrollTrigger.create({ trigger: band, start: 'top bottom', end: 'bottom top', onToggle: (self) => (visible = self.isActive) });

        let lastY = window.scrollY;
        let heading = 1;
        let skew = 0;
        tick = (_time, dt) => {
          const y = window.scrollY;
          const v = window.__lenis?.velocity ?? y - lastY;
          lastY = y;
          if (!visible) return;
          if (v > 0.2) heading = 1;
          else if (v < -0.2) heading = -1;
          const frames = Math.min(dt, 50) / 16.67;
          const speed = frames * (narrow ? 0.7 : 1) * (1.1 + Math.min(Math.abs(v), 50) * 0.32);
          skew += (gsap.utils.clamp(-6, 6, v * 0.22) - skew) * 0.1;
          rows.forEach((r) => {
            if (!r.w) return;
            r.x += r.dir * heading * speed;
            if (r.x <= -r.w) r.x += r.w;
            if (r.x > 0) r.x -= r.w;
            r.setX(r.x);
            r.setSkew(-skew * r.dir);
          });
        };
        gsap.ticker.add(tick);
      }
    }, root);

    const refresh = setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      clearTimeout(refresh);
      if (tick) gsap.ticker.remove(tick);
      if (onResize) window.removeEventListener('resize', onResize);
      ctx.revert();
      added.forEach((n) => n.remove());
    };
  }, [pathname]);

  return null;
}

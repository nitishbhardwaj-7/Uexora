'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

gsap.registerPlugin(ScrollTrigger);

const HEADER_OFFSET = -72;

/** Cancels any scroll still in flight (Lenis keeps easing towards its target after a fast wheel flick). */
function haltMomentum(lenis: Lenis) {
  lenis.scrollTo(lenis.animatedScroll, { immediate: true, force: true });
}

export default function SmoothScroll() {
  const pathname = usePathname();
  const firstPath = useRef(true);
  const fromHistory = useRef(false);

  // After every client-side page change, start the new page at the top (or at the
  // #section the link named). Without this, momentum from a fast scroll on the old page
  // carries on and scrolls the new page down. Back/forward navigation is left alone.
  useEffect(() => {
    if (firstPath.current) {
      firstPath.current = false;
      return;
    }
    const lenis = window.__lenis;
    if (fromHistory.current) {
      fromHistory.current = false;
      if (lenis) haltMomentum(lenis);
      return;
    }
    // ScrollTrigger remembers scroll positions across refreshes and restores them afterwards,
    // which on a client-side page change would pull the new page back down.
    ScrollTrigger.clearScrollMemory();
    const target = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
    const place = () => {
      const l = window.__lenis;
      if (target) {
        if (l) l.scrollTo(target, { offset: HEADER_OFFSET, immediate: true, force: true });
        else target.scrollIntoView();
      } else if (l) l.scrollTo(0, { immediate: true, force: true });
      else window.scrollTo(0, 0);
    };
    // Backstop: if a ScrollTrigger refresh in the first moments still moves the page, put it
    // back, unless the visitor has already started scrolling on their own.
    let userScrolled = false;
    const markUser = () => {
      userScrolled = true;
    };
    const onRefresh = () => {
      if (!userScrolled) place();
    };
    const inputs = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const;
    inputs.forEach((ev) => window.addEventListener(ev, markUser, { passive: true }));
    ScrollTrigger.addEventListener('refresh', onRefresh);
    const stopGuard = window.setTimeout(() => {
      ScrollTrigger.removeEventListener('refresh', onRefresh);
      inputs.forEach((ev) => window.removeEventListener(ev, markUser));
    }, 2500);
    if (lenis) haltMomentum(lenis);
    place();
    // Once more after layout settles (fonts, images), in case anything nudged the position.
    const raf = requestAnimationFrame(() => {
      if (!userScrolled) place();
    });
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(stopGuard);
      ScrollTrigger.removeEventListener('refresh', onRefresh);
      inputs.forEach((ev) => window.removeEventListener(ev, markUser));
    };
  }, [pathname]);

  useEffect(() => {
    const onPopState = () => {
      fromHistory.current = true;
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    window.__lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href]') as HTMLAnchorElement | null;
      if (!a || a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      // A link to another page: stop the old page's momentum before it unmounts.
      if (url.pathname !== location.pathname) {
        haltMomentum(lenis);
        return;
      }
      // In-page anchors go through Lenis so they stay smooth.
      if (!url.hash) return;
      const target = document.querySelector(url.hash);
      if (!target) return;
      e.preventDefault();
      history.pushState(null, '', url.hash);
      lenis.scrollTo(target as HTMLElement, { offset: HEADER_OFFSET });
    };
    // Capture phase, so momentum stops before Next.js handles the link.
    document.addEventListener('click', onClick, true);

    return () => {
      document.removeEventListener('click', onClick, true);
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return null;
}

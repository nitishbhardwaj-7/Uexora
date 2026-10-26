'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/** The main pages, kept ready so moving between them is instant. */
const ROUTES = ['/', '/education', '/marketing', '/contact'];

/**
 * Once the browser is idle, gets the main pages ready ahead of any click. In production the
 * router prefetches them (links only prefetch once they scroll into view, so pages reached from
 * the menu would otherwise wait for a fetch). The dev server does not prefetch, so there each page
 * is requested once in the background instead, which compiles it before the first visit.
 */
export default function PrefetchRoutes() {
  const router = useRouter();

  useEffect(() => {
    const warm = () => {
      for (const href of ROUTES) {
        if (href === window.location.pathname) continue;
        if (process.env.NODE_ENV === 'development') fetch(href, { priority: 'low' } as RequestInit).catch(() => {});
        else router.prefetch(href);
      }
    };
    const ric = window.requestIdleCallback;
    const id = ric ? ric(warm, { timeout: 2500 }) : window.setTimeout(warm, 1500);
    return () => (ric ? window.cancelIdleCallback(id) : window.clearTimeout(id));
  }, [router]);

  return null;
}

/**
 * UEXORA motion language: one set of durations, eases and distances used by every
 * animation on the site, so the whole experience moves with the same rhythm.
 *
 *  - Entrances are quick to start and long to settle (expo / power4 out).
 *  - Nothing bounces; depth comes from masks, scale and small offsets.
 *  - Mobile uses shorter distances and no pointer effects.
 *  - Everything is skipped under prefers-reduced-motion.
 */
export const motion = {
  ease: {
    /** Signature settle for entrances. */
    out: 'expo.out',
    /** Softer settle for secondary elements. */
    soft: 'power3.out',
    /** For masks and lines that travel across. */
    travel: 'power3.inOut',
  },
  duration: {
    quick: 0.6,
    base: 1.1,
    long: 1.6,
  },
  /** Vertical travel for rising elements (px). */
  rise: { desktop: 36, mobile: 22 },
  stagger: { words: 0.06, lines: 0.1, items: 0.08 },
} as const;

export const isReducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const isFinePointer = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
export const isNarrow = () => typeof window !== 'undefined' && window.innerWidth < 900;

/** Rise distance for the current device. */
export const rise = () => (isNarrow() ? motion.rise.mobile : motion.rise.desktop);

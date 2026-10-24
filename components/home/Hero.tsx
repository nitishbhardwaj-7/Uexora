'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Monogram from '@/components/brand/Monogram';
import Wordmark from '@/components/brand/Wordmark';
import Button from '@/components/ui/Button';
import type { HomeContent } from '@/content/home';
import { isFinePointer, isNarrow, isReducedMotion, motion } from '@/lib/motion';

type Props = { content: HomeContent['hero'] };

/**
 * One headline line split into words (server-rendered, so the text is intact for
 * search engines and screen readers). The highlighted word gets its own class.
 */
function Line({ text, highlight }: { text: string; highlight: string }) {
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <>
      {words.map((w, i) => {
        const bare = w.replace(/[^\p{L}\p{N}]/gu, '').toLowerCase();
        const hl = highlight && bare === highlight.toLowerCase();
        return (
          <span key={i}>
            <span className={['hero-word', hl ? 'hero-word--hl' : ''].filter(Boolean).join(' ')}>
              <span className={['hero-word__in', hl ? 'gold' : ''].filter(Boolean).join(' ')}>{w}</span>
            </span>
            {/* the space lives outside the clipping word box, otherwise it is collapsed away */}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        );
      })}
    </>
  );
}

export default function Hero({ content }: Props) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = isReducedMotion();
    const q = gsap.utils.selector(el);

    const ctx = gsap.context(() => {
      const mark = q('.hero__mark-wrap');
      const word = q('.hero__word');
      const words = q('.hero-word__in');
      const hl = q('.hero-word--hl');
      const sub = q('.hero__sub');
      const actions = q('.hero__actions .btn');
      const rings = q('.hero__ring');
      const grid = q('.hero__grid');
      const glows = q('.hero__glow');

      // The hero is painted beneath the opening overlay; it is hidden and choreographed in
      // from the moment the overlay starts to wipe away.
      const hide = () => {
        gsap.set(mark, { clipPath: 'circle(0% at 50% 58%)', scale: 0.92, y: 24 });
        gsap.set(word, { opacity: 0, y: 18 });
        gsap.set(words, { y: 0, yPercent: 115 });
        gsap.set(hl, { '--hl': '0%' });
        gsap.set([sub, actions], { opacity: 0, y: 22 });
        gsap.set(rings, { scale: 0.7, opacity: 0 });
        gsap.set(grid, { opacity: 0 });
        gsap.set(glows, { opacity: 0, scale: 0.9 });
      };

      // After the opening, the overlay wipes upward for 0.9 s; the mark and headline sit in the
      // middle, so the entrance holds briefly and then plays as the overlay clears them.
      // CSS has kept the hero staged (hidden) since first paint; GSAP takes over the same
      // values here, in one synchronous step, so no static frame is ever shown.
      if (!reduced) {
        hide();
        el.classList.add('is-live');
      }

      const play = (fromOpening = false) => {
        if (reduced) return;
        const tl = gsap.timeline({ delay: fromOpening ? 0.45 : 0, defaults: { ease: motion.ease.out, duration: motion.duration.base } });
        tl.to(glows, { opacity: 1, scale: 1, duration: 2.2, ease: motion.ease.soft }, 0)
          .to(grid, { opacity: 1, duration: 2, ease: 'none' }, 0.2)
          .to(mark, { clipPath: 'circle(75% at 50% 58%)', scale: 1, y: 0, duration: 1.4 }, 0.05)
          .to(rings, { scale: 1, opacity: 1, duration: 2.2, stagger: 0.14 }, 0.1)
          .to(word, { opacity: 1, y: 0 }, 0.45)
          .to(words, { yPercent: 0, duration: 1.2, stagger: motion.stagger.words }, 0.55)
          .to(hl, { '--hl': '100%', duration: 0.9, ease: motion.ease.travel }, 1.15)
          .to(sub, { opacity: 1, y: 0, duration: 0.9 }, 1.1)
          .to(actions, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 }, 1.2)
          .add(() => {
            gsap.set(mark, { clearProps: 'clipPath' });
            // idle breathing on the monogram once it has settled
            gsap.to(mark, { y: -10, duration: 3.4, ease: 'sine.inOut', yoyo: true, repeat: -1 });
          }, 1.6);
      };

      if (window.__uexoraReady) play(false);
      else window.addEventListener('uexora:exit', () => play(true), { once: true });
    }, el);

    // Pointer depth (desktop only): the monogram tilts slightly in perspective and the
    // background layers drift the opposite way. Small distances, no rotation of the mark itself.
    let move: ((e: MouseEvent) => void) | null = null;
    if (!reduced && isFinePointer() && !isNarrow()) {
      const tiltX = gsap.quickTo(q('.hero__mark')[0], 'rotateY', { duration: 1.2, ease: 'power3.out' });
      const tiltY = gsap.quickTo(q('.hero__mark')[0], 'rotateX', { duration: 1.2, ease: 'power3.out' });
      gsap.set(q('.hero__mark'), { transformPerspective: 900 });
      move = (e: MouseEvent) => {
        const dx = (e.clientX / window.innerWidth - 0.5) * 2;
        const dy = (e.clientY / window.innerHeight - 0.5) * 2;
        tiltX(dx * 7);
        tiltY(-dy * 5);
        ctx.add(() => {
          gsap.to(q('.hero__glow'), { x: dx * -36, y: dy * -26, duration: 1.6, ease: 'power3.out' });
          gsap.to(q('.hero__ring'), { x: dx * -16, y: dy * -10, duration: 1.4, ease: 'power3.out', stagger: 0.05 });
          gsap.to(q('.hero__grid'), { x: dx * 10, y: dy * 8, duration: 1.8, ease: 'power3.out' });
        });
      };
      el.addEventListener('mousemove', move);
    }

    return () => {
      if (move) el.removeEventListener('mousemove', move);
      ctx.revert();
      el.classList.remove('is-live');
    };
  }, []);

  return (
    <section ref={root} className="hero" data-tone="dark" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__grid" />
        <div className="hero__glow hero__glow--blue" />
        <div className="hero__glow hero__glow--gold" />
        <div className="hero__ring hero__ring--1" />
        <div className="hero__ring hero__ring--2" />
      </div>

      <div className="container hero__inner">
        <div className="hero__mark-wrap">
          <Monogram className="hero__mark" priority />
        </div>
        <Wordmark className="hero__word" tone="light" title="UEXORA" priority />

        <h1 id="hero-title" className="display hero__title">
          {content.lines.map((text, i) => (
            <span key={i} className="line-mask">
              <span className="line">
                <Line text={text} highlight={content.highlight} />
              </span>
              {/* keeps the accessible name "Technology that puts you first" as one sentence */}
              {i < content.lines.length - 1 ? ' ' : ''}
            </span>
          ))}
        </h1>

        <p className="hero__sub">
          {content.sub} <strong>{content.subStrong}</strong>
        </p>

        <div className="btn-row hero__actions">
          <Button href={content.primary.href} variant="light">
            {content.primary.label}
          </Button>
          <Button href={content.secondary.href} variant="gold">
            {content.secondary.label}
          </Button>
        </div>
      </div>
    </section>
  );
}

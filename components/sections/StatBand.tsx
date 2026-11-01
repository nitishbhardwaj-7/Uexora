'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { isReducedMotion } from '@/lib/motion';

type Stat = { value: string; label: string };

/** Splits a figure such as "2,000+" into what comes before the number, the number and what follows. */
function parse(value: string) {
  const m = value.match(/^(\D*?)(\d[\d,]*(?:\.\d+)?)(.*)$/);
  if (!m) return null;
  const [, before, digits, after] = m;
  const decimals = (digits.split('.')[1] || '').length;
  // Grouped as written: Indian style (1,00,000) or thousands (100,000), or not at all.
  const locale = /\d,\d{2},\d{3}/.test(digits) ? 'en-IN' : 'en-US';
  const grouped = digits.includes(',');
  const format = (n: number) => (grouped ? n.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) : n.toFixed(decimals));
  return { before, digits, after, target: parseFloat(digits.replace(/,/g, '')), format };
}

/**
 * Figures in a band under a page hero, side by side with fine rules between them (in rows on
 * phones). As the band comes into view each figure counts up from zero, quick at first and
 * settling on its value, one after another, while the rules draw down and the labels rise in.
 * Each figure is in the page as written (and read out that way), and a hidden copy holds its
 * width so nothing shifts as the count grows; with reduced motion the figures simply show.
 */
export default function StatBand({ items }: { items: Stat[] }) {
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = list.current;
    if (!el || isReducedMotion()) return;
    const parsed = items.map((s) => parse(s.value));
    // The text nodes React rendered, changed in place so React keeps hold of them.
    const nodes = Array.from(el.querySelectorAll('.stats__count')).map((c) => c.firstChild as Text | null);
    const counts = parsed.map(() => ({ n: 0 }));
    const zero = () =>
      nodes.forEach((t, i) => {
        const p = parsed[i];
        if (t && p) t.nodeValue = p.format(0);
      });
    zero();

    const tweens: gsap.core.Tween[] = [];
    let timer: ReturnType<typeof setTimeout> | undefined;
    const start = () => {
      el.classList.add('is-in');
      parsed.forEach((p, i) => {
        const t = nodes[i];
        if (!p || !t) return;
        tweens.push(
          gsap.to(counts[i], {
            n: p.target,
            duration: 2.2,
            ease: 'power4.out',
            delay: i * 0.15,
            onUpdate: () => {
              t.nodeValue = p.format(counts[i].n);
            },
          }),
        );
      });
    };
    // While the opening overlay is still up, wait for the page to show through.
    const onExit = () => {
      timer = setTimeout(start, 600);
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        if (document.body.classList.contains('is-loading')) window.addEventListener('uexora:exit', onExit, { once: true });
        else start();
      },
      { threshold: 0.35 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      window.removeEventListener('uexora:exit', onExit);
      clearTimeout(timer);
      tweens.forEach((t) => t.kill());
      el.classList.remove('is-in');
      nodes.forEach((t, i) => {
        const p = parsed[i];
        if (t && p) t.nodeValue = p.digits;
      });
    };
  }, [items]);

  return (
    <ul ref={list} className="stats" style={{ '--n': items.length } as React.CSSProperties}>
      {items.map((s, i) => {
        const p = parse(s.value);
        return (
          <li key={s.label + i} className="stats__item" style={{ '--i': i } as React.CSSProperties}>
            <p className="stats__num">
              <span className="stats__fig" aria-hidden="true">
                <span className="stats__sizer">{s.value}</span>
                <span className="stats__live">
                  {p ? (
                    <>
                      {p.before}
                      <span className="stats__count">{p.digits}</span>
                      {p.after ? <span className={/[a-z]/i.test(p.after) ? undefined : 'stats__mark'}>{p.after}</span> : null}
                    </>
                  ) : (
                    s.value
                  )}
                </span>
              </span>
              <span className="visually-hidden">{s.value}</span>
            </p>
            <p className="stats__label">{s.label}</p>
          </li>
        );
      })}
    </ul>
  );
}

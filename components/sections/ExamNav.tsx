'use client';

import { useEffect, useState } from 'react';

/**
 * Slim bar that stays under the header from the first exam to the end of the page, so a parent can
 * jump between NEET, JEE Main, JEE Advanced and Olympiad from anywhere below them. The exam being
 * read is underlined, and none is on the sections after the exams. Links are ordinary anchors (the
 * smooth-scroll script handles them).
 */
export default function ExamNav({ items }: { items: { slug: string; name: string }[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = items.map((i) => document.getElementById(i.slug)).filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;
    // The exam whose section crosses a line a third of the way down the screen is the current one.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
          else setActive((now) => (now === e.target.id ? null : now));
        });
      },
      { rootMargin: '-33% 0px -66% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav className="xnav" aria-label="Exams">
      <div className="container xnav__in">
        {items.map((i) => (
          <a key={i.slug} href={`#${i.slug}`} className="xnav__link" aria-current={active === i.slug ? 'true' : undefined}>
            {i.name}
          </a>
        ))}
      </div>
    </nav>
  );
}

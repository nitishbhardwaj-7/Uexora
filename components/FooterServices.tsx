'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Item = { title: string; href: string };
type Row = { key: 'education' | 'marketing'; label: string; href: string; items: Item[] };

/**
 * Footer service marquees. Education scrolls left, Marketing scrolls right; division pages
 * show only their own row. The first copy of each row is real, crawlable links; the second
 * copy only completes the loop, so it is plain text hidden from search engines and screen
 * readers. Under reduced motion the row stands still and can be scrolled.
 */
export default function FooterServices({ education, marketing }: { education: Item[]; marketing: Item[] }) {
  const pathname = usePathname() || '/';
  const rows: Row[] = [
    { key: 'education', label: 'Uexora Education', href: '/education', items: education },
    { key: 'marketing', label: 'Uexora Marketing Studio', href: '/marketing', items: marketing },
  ];
  const visible = pathname.startsWith('/education') ? rows.filter((r) => r.key === 'education') : pathname.startsWith('/marketing') ? rows.filter((r) => r.key === 'marketing') : rows;

  return (
    <div className="fmarquee">
      {visible.map((row) => (
        <nav key={row.key} className={`fmarquee__row fmarquee__row--${row.key}`} aria-label={`${row.label} services`}>
          <Link href={row.href} className="fmarquee__label">
            {row.label}
          </Link>
          <div className="fmarquee__viewport">
            <div className="fmarquee__track" style={{ '--dur': `${Math.max(28, row.items.length * 7)}s` } as React.CSSProperties}>
              <ul className="fmarquee__set">
                {row.items.map((it) => (
                  <li key={it.href}>
                    <Link href={it.href} className="fmarquee__item">
                      {it.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="fmarquee__set fmarquee__set--copy" aria-hidden="true" data-nosnippet>
                {row.items.map((it) => (
                  <li key={it.href}>
                    <span className="fmarquee__item">{it.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      ))}
    </div>
  );
}

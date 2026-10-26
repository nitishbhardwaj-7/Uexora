'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CmsImage from '@/components/ui/CmsImage';

type Item = { title: string; href: string; image?: string };

/* Small decorative photo before each name; the name beside it says what it is. */
function Thumb({ src }: { src?: string }) {
  if (!src) return null;
  return (
    <span className="fmarquee__thumb" aria-hidden="true">
      <CmsImage src={src} alt="" fill sizes="120px" quality={70} loading="lazy" />
    </span>
  );
}
type Row = { key: 'education' | 'marketing'; label: string; href: string; items: Item[] };

/**
 * Footer service marquees. Education scrolls left, Marketing scrolls right; division pages
 * show only their own row. Both copies of a row are links, so whatever is on screen can be
 * clicked; the second copy (which completes the loop) is skipped by keyboard and screen
 * readers and kept out of search snippets. Under reduced motion the row stands still and can be scrolled.
 * With a single row (division pages) each item is a photo card with its name beneath.
 */
export default function FooterServices({ education, marketing }: { education: Item[]; marketing: Item[] }) {
  const pathname = usePathname() || '/';
  const rows: Row[] = [
    { key: 'education', label: 'Uexora Education', href: '/education', items: education },
    { key: 'marketing', label: 'Uexora Marketing Studio', href: '/marketing', items: marketing },
  ];
  const visible = pathname.startsWith('/education') ? rows.filter((r) => r.key === 'education') : pathname.startsWith('/marketing') ? rows.filter((r) => r.key === 'marketing') : rows;

  const cards = visible.length === 1;

  return (
    <div className={['fmarquee', cards ? 'fmarquee--cards' : ''].filter(Boolean).join(' ')}>
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
                    {cards ? (
                      <Link href={it.href} className="fmarquee__card">
                        <span className="fmarquee__card-media" aria-hidden="true">
                          {it.image ? <CmsImage src={it.image} alt="" fill sizes="(max-width: 700px) 60vw, 300px" quality={75} loading="lazy" /> : null}
                        </span>
                        <span className="fmarquee__card-title">{it.title}</span>
                      </Link>
                    ) : (
                      <Link href={it.href} className="fmarquee__item">
                        <Thumb src={it.image} />
                        {it.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
              <ul className="fmarquee__set fmarquee__set--copy" aria-hidden="true" data-nosnippet>
                {row.items.map((it) => (
                  <li key={it.href}>
                    {/* Clickable like the first copy, but skipped by keyboard and screen readers. */}
                    {cards ? (
                      <Link href={it.href} className="fmarquee__card" tabIndex={-1}>
                        <span className="fmarquee__card-media">
                          {it.image ? <CmsImage src={it.image} alt="" fill sizes="(max-width: 700px) 60vw, 300px" quality={75} loading="lazy" /> : null}
                        </span>
                        <span className="fmarquee__card-title">{it.title}</span>
                      </Link>
                    ) : (
                      <Link href={it.href} className="fmarquee__item" tabIndex={-1}>
                        <Thumb src={it.image} />
                        {it.title}
                      </Link>
                    )}
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

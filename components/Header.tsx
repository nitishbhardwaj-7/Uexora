'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './brand/Logo';
import Monogram from './brand/Monogram';
import { nav as baseNav, blogNav, menu } from '@/lib/site';
import { Arrow } from './ui/Button';
import { contactHref } from '@/lib/cms/services';

type Props = { email: string; tagline: string; /** True once the blog has a published post. */ showBlog?: boolean };

export default function Header({ email, tagline, showBlog }: Props) {
  const pathname = usePathname();
  const nav = showBlog ? [...baseNav.slice(0, 3), blogNav, ...baseNav.slice(3)] : baseNav;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close on route change and adopt the tone of the page's first section
  useEffect(() => {
    setOpen(false);
    const first = document.querySelector<HTMLElement>('main [data-tone]');
    const header = document.querySelector<HTMLElement>('.header');
    if (first && header) header.dataset.tone = first.dataset.tone;
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const isCurrent = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <>
      <header className={['header', scrolled ? 'is-scrolled' : '', open ? 'menu-open' : ''].filter(Boolean).join(' ')} data-tone="dark">
        <div className="container header__inner">
          <Logo markOnly />
          <nav className="header__nav" aria-label="Primary">
            <ul className="header__links">
              {nav.slice(0, 3).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} aria-current={isCurrent(item.href) ? 'page' : undefined}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            {/* On a division's pages this opens that division's form; elsewhere the general one. */}
            <Link href={contactHref(pathname)} className="btn btn--gold header__cta">
              <span className="btn__label">Get in touch</span>
              <span className="btn__icon">
                <Arrow />
              </span>
            </Link>
            <button
              type="button"
              className="menu-btn"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="menu-btn__label">{open ? 'Close' : 'Menu'}</span>
              <span className="menu-btn__icon" aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
          </nav>
        </div>
      </header>

      <div id="site-menu" className={['menu', open ? 'is-open' : ''].filter(Boolean).join(' ')} aria-hidden={!open} inert={!open}>
        <div className="container menu__inner">
          <div className="menu__grid">
            <nav className="menu__primary" aria-label="Menu">
              {nav.map((item, i) => (
                <Link key={item.href} href={item.href} className="menu__item" style={{ '--i': i } as React.CSSProperties}>
                  {item.label}
                </Link>
              ))}
            </nav>
            {menu.map((col, c) => (
              <div key={col.heading} className="menu__col menu__item" style={{ '--i': 4 + c * 2 } as React.CSSProperties}>
                <p className="menu__heading">{col.heading}</p>
                <ul>
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
                <Link href={col.href} className="link-arrow">
                  <span>Visit {col.heading.replace('Uexora ', '')}</span>
                  <Arrow />
                </Link>
              </div>
            ))}
          </div>
          <div className="menu__foot menu__item" style={{ '--i': 8 } as React.CSSProperties}>
            <div>
              <Monogram variant="mono" style={{ width: 36, color: 'var(--gold-500)' }} />
            </div>
            <div>
              <a href={`mailto:${email}`}>{email}</a>
              <br />
              {tagline}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

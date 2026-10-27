'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './brand/Logo';
import Monogram from './brand/Monogram';
import { nav as baseNav, blogNav, menu } from '@/lib/site';
import { Arrow } from './ui/Button';
import CmsImage from './ui/CmsImage';
import { contactHref } from '@/lib/cms/services';

type Props = { email: string; tagline: string; /** True once the blog has a published post. */ showBlog?: boolean };

export default function Header({ email, tagline, showBlog }: Props) {
  const pathname = usePathname();
  const nav = showBlog ? [...baseNav.slice(0, 3), blogNav, ...baseNav.slice(3)] : baseNav;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Which division's links are showing in the menu. A short hover pause before switching stops a
  // diagonal move towards the open links from flicking to the other division on the way past.
  const [active, setActive] = useState<string | null>(null);
  const intent = useRef<number | undefined>(undefined);
  const hoverTo = (key: string | null) => {
    window.clearTimeout(intent.current);
    intent.current = window.setTimeout(() => setActive(key), 110);
  };

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
    if (!open) setActive(null);
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
            {/* Education and Marketing open their own links (and photo) on the right when hovered or
                focused; on touch screens a toggle beside each opens them underneath instead. */}
            <nav className="menu__primary" aria-label="Menu" onMouseLeave={() => window.clearTimeout(intent.current)}>
              {nav.map((item, i) => {
                const sub = menu.find((m) => m.href === item.href);
                const on = !!sub && active === item.href;
                return (
                  <div
                    key={item.href}
                    className={['menu__row', on ? 'is-active' : ''].filter(Boolean).join(' ')}
                    onFocus={(e) => {
                      if ((e.target as HTMLElement).closest('.menu__toggle')) return;
                      window.clearTimeout(intent.current);
                      setActive(sub ? item.href : null);
                    }}
                  >
                    <div className="menu__line">
                      <Link href={item.href} className="menu__link menu__item" style={{ '--i': i } as React.CSSProperties} onMouseEnter={() => hoverTo(sub ? item.href : null)}>
                        <span>{item.label}</span>
                        {sub ? (
                          <span className="menu__more" aria-hidden="true">
                            <Arrow />
                          </span>
                        ) : null}
                      </Link>
                      {sub ? (
                        <button
                          type="button"
                          className="menu__toggle menu__item"
                          style={{ '--i': i } as React.CSSProperties}
                          aria-expanded={on}
                          aria-controls={`menu-sub-${i}`}
                          aria-label={`${item.label} links`}
                          onClick={() => setActive(on ? null : item.href)}
                        >
                          <Arrow />
                        </button>
                      ) : null}
                    </div>
                    {sub ? (
                      <div id={`menu-sub-${i}`} className="menu__sub" onMouseEnter={() => hoverTo(item.href)}>
                        <div className="menu__sub-in">
                          <div className="menu__sub-links">
                            <p className="menu__heading" style={{ '--j': 0 } as React.CSSProperties}>
                              {sub.heading}
                            </p>
                            <ul>
                              {sub.links.map((l, j) => (
                                <li key={l.href} style={{ '--j': j + 1 } as React.CSSProperties}>
                                  <Link href={l.href}>{l.label}</Link>
                                </li>
                              ))}
                            </ul>
                            <Link href={sub.href} className="link-arrow menu__visit" style={{ '--j': sub.links.length + 1 } as React.CSSProperties}>
                              <span>Visit {sub.heading.replace('Uexora ', '')}</span>
                              <Arrow />
                            </Link>
                          </div>
                          <figure className="menu__sub-photo" aria-hidden="true">
                            <CmsImage src={sub.image} alt="" fill sizes="(max-width: 1400px) 36vw, 30vw" quality={82} />
                          </figure>
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </nav>
          </div>
          <div className="menu__foot menu__item" style={{ '--i': nav.length + 1 } as React.CSSProperties}>
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

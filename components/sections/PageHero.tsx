import { Fragment } from 'react';
import CmsImage from '@/components/ui/CmsImage';
import Link from 'next/link';
import Monogram from '@/components/brand/Monogram';
import Button from '@/components/ui/Button';
import { becauseYou } from '@/components/ui/BecauseYou';
import PageHeroMotion from '@/components/sections/PageHeroMotion';
import HeroSlideshow, { type HeroSlide } from '@/components/sections/HeroSlideshow';

type Props = {
  eyebrow: string;
  title: string;
  lead: string;
  tone?: 'light' | 'dark';
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  image?: { src: string; alt: string };
  /** Short keywords under the buttons; one with an href links to its page. */
  chips?: (string | { label: string; href?: string })[];
  /** Visible breadcrumb trail above the title (the last item is the current page's parent/kind). */
  crumbs?: { label: string; href?: string }[];
  /** Image-led variant (division landing pages): a full-width photo behind the hero. With an
      `image` as well, that becomes a floating card, with `stat` in a frosted strip on it. */
  background?: { src: string; alt: string };
  stat?: { value: string; label: string; text?: string };
  /** Image-led variant only: photos that take turns in a floating card on the right. */
  slides?: HeroSlide[];
};

export default function PageHero({ eyebrow, title, lead, tone = 'light', primary, secondary, image, chips, crumbs, background, stat, slides }: Props) {
  const dark = tone === 'dark';
  const immersive = !!background;
  return (
    <section
      className={['page-hero', image || immersive ? 'page-hero--full' : '', immersive ? 'page-hero--immersive' : '', immersive && !image && slides?.length ? 'page-hero--slides' : ''].filter(Boolean).join(' ')}
      data-tone={tone}
      aria-labelledby="page-title"
    >
      {immersive ? (
        <>
          <div className="page-hero__bg" data-parallax="0.12">
            {/* Cropped to fill the hero's full height, so it is drawn wider than the viewport:
                ask for a larger file than 100vw or it looks soft. */}
            <CmsImage
              src={background!.src}
              alt={background!.alt}
              fill
              sizes="(max-width: 900px) 100vw, 135vw"
              quality={82}
              preload
              fetchPriority="high"
            />
          </div>
          <div className="page-hero__veil" aria-hidden="true" />
          {/* Graphics over the photo, in the spirit of the home hero: a faint grid, warm and blue
              glows, rings behind the card, and a sweeping line. Shown on the Marketing
              landing only (see globals.css). */}
          <div className="page-hero__decor" aria-hidden="true">
            <div className="page-hero__lines" />
            <div className="page-hero__glow page-hero__glow--gold" />
            <div className="page-hero__glow page-hero__glow--orange" />
            <div className="page-hero__glow page-hero__glow--blue" />
            <div className="page-hero__ring page-hero__ring--1" />
            <div className="page-hero__ring page-hero__ring--2" />
            <svg className="page-hero__sweep" viewBox="0 0 1600 900" preserveAspectRatio="none" fill="none">
              <defs>
                <linearGradient id="hero-sweep" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0" stopColor="#f2bd2b" stopOpacity="0" />
                  <stop offset="0.35" stopColor="#f2bd2b" />
                  <stop offset="0.7" stopColor="#f47a20" />
                  <stop offset="1" stopColor="#2550ea" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M-40 860 C 380 760, 640 520, 980 470 S 1460 330, 1660 60" stroke="url(#hero-sweep)" strokeWidth="3" pathLength="1" />
              <path d="M-40 900 C 420 820, 700 600, 1020 560 S 1480 420, 1660 160" stroke="url(#hero-sweep)" strokeWidth="2" strokeDasharray="0.006 0.012" pathLength="1" opacity="0.7" />
            </svg>
          </div>
        </>
      ) : (
        <Monogram className="page-hero__mark" variant="mono" style={{ color: dark ? '#fff' : 'var(--blue-700)' }} />
      )}
      <PageHeroMotion>
        <div className="page-hero__copy">
          {crumbs?.length ? (
            <nav className="page-hero__crumbs" aria-label="Breadcrumb">
              <ol>
                <li>
                  <Link href="/">Home</Link>
                </li>
                {crumbs.map((c) => (
                  <li key={c.label}>{c.href ? <Link href={c.href}>{c.label}</Link> : <span>{c.label}</span>}</li>
                ))}
              </ol>
            </nav>
          ) : null}
          <h1 id="page-title" className="h1">
            {/* A title with line breaks (a programme's hero title) breaks where it says. */}
            {title.split('\n').map((line, i) => (
              <Fragment key={i}>
                {i ? ' ' : null}
                {i ? <br /> : null}
                {line}
              </Fragment>
            ))}
          </h1>
          <p className="lead">
            {becauseYou(lead)}
          </p>
          <div className="btn-row">
            <Button href={primary.href} variant={dark ? 'gold' : 'blue'}>
              {primary.label}
            </Button>
            {secondary ? (
              <Button href={secondary.href} variant="ghost">
                {secondary.label}
              </Button>
            ) : null}
          </div>
          {chips?.length ? (
            <div className="page-hero__meta">
              {chips.map((c) => {
                const { label, href } = typeof c === 'string' ? { label: c, href: undefined } : c;
                return href ? (
                  <Link key={label} href={href} className="chip chip--link">
                    {label}
                  </Link>
                ) : (
                  <span key={label} className="chip">
                    {label}
                  </span>
                );
              })}
            </div>
          ) : null}
        </div>
        {image ? (
          <div className="page-hero__media">
            <div className="page-hero__media-inner" data-parallax="0.14">
              <CmsImage
                src={image.src}
                alt={image.alt}
                fill
                sizes={immersive ? '(max-width: 900px) 90vw, 36vw' : '(max-width: 900px) 100vw, 80vw'}
                quality={82}
                preload={!immersive}
                fetchPriority={immersive ? undefined : 'high'}
              />
            </div>
            <Monogram />
            {stat ? (
              <div className="page-hero__stat">
                <strong>{stat.value}</strong>
                <span className="page-hero__stat-label">{stat.label}</span>
                {stat.text ? <span className="page-hero__stat-text">{stat.text}</span> : null}
              </div>
            ) : null}
          </div>
        ) : immersive && slides?.length ? (
          <div className="page-hero__media page-hero__media--slides">
            <HeroSlideshow slides={slides} />
          </div>
        ) : null}
      </PageHeroMotion>
    </section>
  );
}

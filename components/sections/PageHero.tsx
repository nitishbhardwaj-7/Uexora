import CmsImage from '@/components/ui/CmsImage';
import Link from 'next/link';
import Monogram from '@/components/brand/Monogram';
import Button from '@/components/ui/Button';
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
  chips?: string[];
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
            {title}
          </h1>
          <p className="lead">
            {lead}
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
              {chips.map((c) => (
                <span key={c} className="chip">
                  {c}
                </span>
              ))}
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

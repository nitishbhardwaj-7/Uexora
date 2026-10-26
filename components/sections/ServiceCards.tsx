import Button from '@/components/ui/Button';
import CmsImage from '@/components/ui/CmsImage';
import FanStack from '@/components/sections/FanStack';
import Highlight from '@/components/ui/Highlight';
import ServiceIndexList from '@/components/sections/ServiceIndexList';
import type { Service } from '@/content/types';
import type { Division } from '@/lib/cms/services';

type Cta = { heading: string; text: string; label: string; href: string };

type Props = {
  id: string;
  division: Division;
  heading: string;
  /** A word from the heading shown in the yellow accent. */
  highlight?: string;
  intro?: string;
  /** Short paragraph to the right of the heading. */
  aside?: string;
  items: Service[];
  tone?: 'light' | 'dark';
  cta?: Cta;
  /** Slug of the service whose page we are on; it is left out of the list. */
  exclude?: string;
  /** Smaller heading, list only (no photo frame), for the "other programmes" block on a service page. */
  compact?: boolean;
};

const Arcs = () => (
  <svg className="prog-arc" viewBox="0 0 520 420" fill="none" aria-hidden="true" data-draw-scroll>
    <path d="M520 20C330 40 180 190 160 420" stroke="currentColor" strokeWidth="1" />
    <path d="M520 86C372 104 258 222 246 420" stroke="currentColor" strokeWidth="1" opacity="0.7" />
    <path d="M520 150C414 166 334 254 328 420" stroke="currentColor" strokeWidth="1" opacity="0.45" />
  </svg>
);

/**
 * Editorial index of programmes / services: a header with a highlighted heading,
 * intro and side note; then numbered rows beside one sticky photo frame that follows
 * the row under the pointer (or the row in the middle of the screen while scrolling).
 * Every row is one link to the service's own page.
 */
export default function ServiceCards({ id, division, heading, highlight, intro, aside, items, tone = 'light', cta, exclude, compact }: Props) {
  const list = exclude ? items.filter((s) => s.slug !== exclude) : items;
  // Three of the division's own photos, fanned beside the closing call to action.
  const photos = list.flatMap((s) => (s.image ? [s.image] : [])).slice(0, 3);

  return (
    <section id={id} className={['section prog', compact ? 'section--tight' : ''].filter(Boolean).join(' ')} data-tone={tone} aria-labelledby={`${id}-title`}>
      <div className="container">
        <header className={['prog-head', compact ? 'prog-head--compact' : ''].filter(Boolean).join(' ')}>
          <div className="prog-head__main">
            <h2 id={`${id}-title`} className={compact ? 'h3' : 'h2 prog-title'} data-split>
              <Highlight text={heading} word={compact ? undefined : highlight} />
            </h2>
            {intro ? (
              <p className="lead" data-reveal>
                {intro}
              </p>
            ) : null}
          </div>
          {aside && !compact ? (
            <div className="prog-head__aside" data-reveal data-reveal-delay="0.15">
              <p>{aside}</p>
            </div>
          ) : null}
          {!compact ? <Arcs /> : null}
        </header>

        <ServiceIndexList division={division} items={list} all={items} compact={compact} />

        {cta && !compact ? (
          <div className="pcta" data-reveal-group data-stagger="0.15">
            <div className="pcta__copy">
              <h3 className="pcta__title">{cta.heading}</h3>
              <p className="pcta__text">{cta.text}</p>
              <div className="pcta__action">
                <Button href={cta.href} variant={tone === 'dark' ? 'gold' : 'blue'}>
                  {cta.label}
                </Button>
              </div>
            </div>
            {photos.length ? (
              <FanStack>
                {photos.map((p, i) => (
                  <span key={p.src} className={`pcta__photo pcta__photo--${i + 1}`}>
                    {/* A landscape photo filling a 4:5 card is drawn about 1.9x the card's width,
                        and the tilt needs some headroom, so ask for that rather than the card size. */}
                    <CmsImage src={p.src} alt="" fill sizes="(max-width: 900px) 90vw, 520px" quality={82} />
                  </span>
                ))}
              </FanStack>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}

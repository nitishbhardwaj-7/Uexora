import CmsImage from '@/components/ui/CmsImage';
import ReviewsPause from '@/components/sections/ReviewsPause';
import type { Review } from '@/lib/cms/reviews';

function Stars({ rating }: { rating: number }) {
  const r = Math.max(1, Math.min(5, Math.round(rating)));
  return (
    <p className="review__stars" role="img" aria-label={`Rated ${r} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" aria-hidden="true" className={i < r ? 'is-on' : undefined}>
          <path d="M10 1.8l2.5 5.2 5.7.8-4.1 4 1 5.6L10 14.7l-5.1 2.7 1-5.6-4.1-4 5.7-.8z" />
        </svg>
      ))}
    </p>
  );
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('');

function Card({ r }: { r: Review }) {
  return (
    <figure>
      <svg className="review__mark" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9.6 5.5C5.9 6.9 3.8 9.9 3.8 14v4.5h6.4v-6.4H7.1c.1-2.7 1.3-4.5 3.5-5.4zM20.2 5.5c-3.7 1.4-5.8 4.4-5.8 8.5v4.5h6.4v-6.4h-3.1c.1-2.7 1.3-4.5 3.5-5.4z" />
      </svg>
      <div className="review__top">
        {r.rating ? <Stars rating={r.rating} /> : <span />}
        {r.programme ? <span className="review__topic">{r.programme}</span> : null}
      </div>
      <blockquote className="review__quote">
        <p>{r.quote}</p>
      </blockquote>
      <figcaption className="review__by">
        <span className="review__avatar" aria-hidden="true">
          {r.photo ? <CmsImage src={r.photo.src} alt="" width={128} height={128} sizes="64px" /> : <span>{initials(r.name)}</span>}
        </span>
        <span className="review__who">
          <span className="review__name">{r.name}</span>
          {r.role ? <span className="review__role">{r.role}</span> : null}
        </span>
      </figcaption>
    </figure>
  );
}

/** One row of the slider: the set repeated so the loop has no gap; the copies are hidden. */
function Row({ reviews, reverse, speed }: { reviews: Review[]; reverse?: boolean; speed: number }) {
  const copies = reviews.length < 5 ? 3 : 2;
  return (
    <div className="reviews-marquee__row" data-reverse={reverse || undefined}>
      <div className="reviews-marquee__track" style={{ '--copies': copies, '--dur': `${reviews.length * speed}s` } as React.CSSProperties}>
        {Array.from({ length: copies }, (_, c) => (
          <ul key={c} className="reviews-marquee__set" aria-hidden={c > 0 || undefined} inert={c > 0 || undefined}>
            {reviews.map((r, i) => (
              <li key={`${r.name}-${i}`} className="review">
                <Card r={r} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

/**
 * Customer reviews on a landing page, from Studio (Reviews). Renders nothing until there is at
 * least one real review, so a page never shows an empty or invented section.
 *
 * Three or more reviews run as a slow, endless slider; six or more fill two rows that drift in
 * opposite directions on wide screens. It pauses on hover, on keyboard focus and with its pause
 * button, and with reduced motion it is a plain sideways scroll.
 */
export default function Reviews({
  id,
  eyebrow,
  heading,
  reviews,
  tone = 'dark',
}: {
  id: string;
  eyebrow: string;
  heading: string;
  reviews: Review[];
  tone?: 'light' | 'dark';
}) {
  if (!reviews.length) return null;
  const slider = reviews.length >= 3;
  const twoRows = reviews.length >= 6;
  // The second row starts halfway through the list, so the two rows never line up.
  const half = Math.ceil(reviews.length / 2);
  const second = [...reviews.slice(half), ...reviews.slice(0, half)];
  const marqueeId = `${id}-marquee`;

  return (
    <section id={id} className="section reviews-section" data-tone={tone} aria-labelledby={`${id}-title`}>
      <div className="container">
        <div className="section-head reviews-head">
          <div>
            <p className="h3" style={{ color: 'var(--fg-muted)' }} data-reveal>
              {eyebrow}
            </p>
            <h2 id={`${id}-title`} className="h2" data-split>
              {heading}
            </h2>
          </div>
          {slider ? <ReviewsPause target={marqueeId} /> : null}
        </div>
        {slider ? null : (
          <ul className="reviews" data-count={reviews.length}>
            {reviews.map((r, i) => (
              <li key={`${r.name}-${i}`} className="review" data-reveal>
                <Card r={r} />
              </li>
            ))}
          </ul>
        )}
      </div>
      {slider ? (
        <div id={marqueeId} className="reviews-marquee" data-reveal>
          <Row reviews={reviews} speed={10} />
          {twoRows ? <Row reviews={second} speed={12} reverse /> : null}
        </div>
      ) : null}
    </section>
  );
}

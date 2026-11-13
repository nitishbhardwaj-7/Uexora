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
      <span className="review__mark" aria-hidden="true">
        “
      </span>
      {r.rating ? <Stars rating={r.rating} /> : null}
      <blockquote className="review__quote">
        <p>{r.quote}</p>
      </blockquote>
      <figcaption className="review__by">
        <span className="review__avatar" aria-hidden="true">
          {r.photo ? <CmsImage src={r.photo.src} alt="" width={112} height={112} sizes="56px" /> : initials(r.name)}
        </span>
        <span className="review__who">
          <span className="review__name">{r.name}</span>
          {r.role || r.programme ? <span className="review__role">{[r.role, r.programme].filter(Boolean).join(' · ')}</span> : null}
          {r.sample ? <span className="review__sample">Sample, shown in development only</span> : null}
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * Customer reviews on a landing page, from Studio (Reviews). Renders nothing until there is at
 * least one real review, so a page never shows an empty or invented section.
 *
 * Three or more reviews run as a slow, endless slider: the set is repeated so the loop has no
 * gap, the copies are hidden from screen readers and the keyboard, and it pauses on hover, on
 * keyboard focus and with its pause button. With reduced motion it is a plain sideways scroll.
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
  // Enough copies that one copy is always wider than the screen, so the loop never shows a gap.
  const copies = slider ? (reviews.length < 5 ? 3 : 2) : 1;
  const trackId = `${id}-track`;

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
          {slider ? <ReviewsPause target={trackId} /> : null}
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
        <div className="reviews-marquee" data-reveal>
          <div
            id={trackId}
            className="reviews-marquee__track"
            style={{ '--copies': copies, '--dur': `${reviews.length * 9}s` } as React.CSSProperties}
          >
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
      ) : null}
    </section>
  );
}

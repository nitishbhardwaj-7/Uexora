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

/**
 * Customer reviews on a landing page, from Studio (Reviews). Renders nothing until there is at
 * least one real review, so a page never shows an empty or invented section.
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
  return (
    <section id={id} className="section reviews-section" data-tone={tone} aria-labelledby={`${id}-title`}>
      <div className="container">
        <div className="section-head">
          <p className="h3" style={{ color: 'var(--fg-muted)' }} data-reveal>
            {eyebrow}
          </p>
          <h2 id={`${id}-title`} className="h2" data-split>
            {heading}
          </h2>
        </div>
        <ul className="reviews" data-count={Math.min(reviews.length, 3)}>
          {reviews.map((r, i) => (
            <li key={`${r.name}-${i}`} className="review" data-reveal>
              <figure>
                <span className="review__mark" aria-hidden="true">
                  “
                </span>
                {r.rating ? <Stars rating={r.rating} /> : null}
                <blockquote className="review__quote">
                  <p>{r.quote}</p>
                </blockquote>
                <figcaption className="review__by">
                  <span className="review__name">{r.name}</span>
                  {r.role || r.programme ? <span className="review__role">{[r.role, r.programme].filter(Boolean).join(' · ')}</span> : null}
                  {r.sample ? <span className="review__sample">Sample, shown in development only</span> : null}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

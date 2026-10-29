import CmsImage from '@/components/ui/CmsImage';
import ApproachIcon from '@/components/sections/ApproachIcon';

type Point = { title: string; subtitle?: string; text?: string; icon?: string; image?: { src: string; alt: string } };

/**
 * "Our Approach to Learning" on programme pages: the points three to a row, each led by an icon
 * badge (or, for a point without an icon, a photo). Every row animates as it scrolls into view:
 * the icons draw themselves stroke by stroke, left to right, and each point's text rises in just
 * after; on hover an icon redraws and its badge lifts.
 */
export default function ApproachGrid({ id, heading, quote, points, tone }: { id: string; heading: string; quote?: string; points: Point[]; tone: 'light' | 'dark' }) {
  const rows: Point[][] = [];
  for (let i = 0; i < points.length; i += 3) rows.push(points.slice(i, i + 3));

  return (
    <section id={id} className="section approach9" data-tone={tone} aria-labelledby={`${id}-title`}>
      <div className="container">
        <div className="approach9__head">
          <h2 id={`${id}-title`} className="h2" data-split>
            {heading}
          </h2>
          {quote ? (
            <p className="lead" data-reveal data-reveal-delay="0.15">
              {quote}
            </p>
          ) : null}
        </div>
        <ol className="approach9__list">
          {rows.map((row, r) =>
            row.map((p, c) => {
              const n = r * 3 + c;
              const num = (
                <span className="approach9__num" aria-hidden="true">
                  {String(n + 1).padStart(2, '0')}
                </span>
              );
              return (
                <li key={p.title + n} className="approach9__item">
                  {p.icon ? (
                    <div className="approach9__top">
                      <span className="approach9__badge" data-reveal data-reveal-delay={String(c * 0.15)} style={{ '--d': `${c * 0.15}s` } as React.CSSProperties}>
                        <ApproachIcon name={p.icon} />
                      </span>
                      {num}
                    </div>
                  ) : p.image ? (
                    <figure className="approach9__photo" data-reveal="mask" data-reveal-delay={String(c * 0.15)}>
                      <CmsImage src={p.image.src} alt={p.image.alt} fill sizes="(max-width: 560px) 92vw, (max-width: 900px) 46vw, 30vw" quality={82} />
                    </figure>
                  ) : null}
                  <div className="approach9__body" data-reveal data-reveal-delay={String(c * 0.15 + 0.25)}>
                    {p.icon ? null : num}
                    <h3 className="approach9__title">{p.title}</h3>
                    {p.subtitle ? <p className="approach9__subtitle">{p.subtitle}</p> : null}
                    {p.text ? <p className="approach9__text">{p.text}</p> : null}
                  </div>
                </li>
              );
            }),
          )}
        </ol>
      </div>
    </section>
  );
}

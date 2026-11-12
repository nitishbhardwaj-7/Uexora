import CmsImage from '@/components/ui/CmsImage';
import ApproachIcon from '@/components/sections/ApproachIcon';

type Point = { title: string; subtitle?: string; text?: string; icon?: string; image?: { src: string; alt: string } };

/**
 * "Our Approach to Learning" on programme pages: the points three to a row, each led by an icon
 * badge (or, for a point without an icon, a photo). Every row animates as it scrolls into view,
 * left to right: each badge turns in, a gold ring traces round it while its icon draws itself
 * stroke by stroke, a gold line runs out to the point's number, which slides in at its end, the
 * badge sends out one soft pulse, and the text rises in. On hover an icon redraws.
 */
/**
 * Every page that shows the section plays it in its own way (see globals.css, "Approach
 * variants"), chosen to suit the page:
 *   stack   (school tuition)        badges drop in like blocks settling, text rises firmly
 *   circuit (AI, coding, robotics)  a signal runs from the number to the badge, which powers on
 *   focus   (AI for professionals)  everything sharpens from a blur, the ring settles inwards
 *   wave    (communication)         badges pop and send out sound waves, lines spread from the centre
 *   wipe    (corporate trainings)   badges slide in, text is wiped on left to right
 *   gentle  (special needs)         slow, soft fades and a calm breathing glow
 *   ring    (marketing strategy)    badge turns in, ring traces round, line runs out to the number
 *   scan    (SEO)                   a gold light sweeps across each badge, text slides in from the left
 *   target  (paid advertising)      rings close in on the badge and lock on, the number lands
 *   flip    (social media)          badges flip round like cards, text tips up like a feed
 *   iris    (website design)        badges open from the centre, text loads top to bottom
 *   spark   (AI marketing)          badges flicker on with a glow, ring and icon draw quickly
 *   orbit   (AEO and GEO)           badges swing in on an arc while their ring spins into place
 */
export type ApproachVariant = 'ring' | 'stack' | 'circuit' | 'focus' | 'wave' | 'wipe' | 'gentle' | 'scan' | 'target' | 'flip' | 'iris' | 'spark' | 'orbit';
const VARIANTS: Record<string, ApproachVariant> = {
  'academic-support-and-school-tuition': 'stack',
  'ai-coding-and-robotics-for-students': 'circuit',
  'ai-for-professionals-and-educators': 'focus',
  'communication-public-speaking-and-confidence-building': 'wave',
  'corporate-trainings': 'wipe',
  'special-needs-students-programme': 'gentle',
  'digital-marketing-strategy': 'ring',
  'search-engine-optimisation': 'scan',
  'paid-advertising-and-lead-generation': 'target',
  'social-media-marketing': 'flip',
  'website-design-and-development': 'iris',
  'ai-powered-marketing-solutions': 'spark',
  'aeo-and-geo': 'orbit',
};
export const approachVariant = (slug: string): ApproachVariant => VARIANTS[slug] || 'ring';

export default function ApproachGrid({ id, heading, quote, points, tone, variant = 'ring' }: { id: string; heading: string; quote?: string; points: Point[]; tone: 'light' | 'dark'; variant?: ApproachVariant }) {
  const rows: Point[][] = [];
  for (let i = 0; i < points.length; i += 3) rows.push(points.slice(i, i + 3));

  return (
    <section id={id} className="section approach9" data-tone={tone} data-variant={variant} aria-labelledby={`${id}-title`}>
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
                <li key={p.title + n} className="approach9__item" style={{ '--d': `${c * 0.15}s` } as React.CSSProperties}>
                  {p.icon ? (
                    <div className="approach9__top">
                      <span className="approach9__badge" data-reveal data-reveal-delay={String(c * 0.15)}>
                        <svg className="approach9__ring" viewBox="0 0 100 100" aria-hidden="true">
                          <circle cx="50" cy="50" r="48" pathLength={1} />
                        </svg>
                        <ApproachIcon name={p.icon} />
                      </span>
                      <span className="approach9__rule" aria-hidden="true" />
                      {num}
                    </div>
                  ) : p.image ? (
                    <figure className="approach9__photo" data-reveal="mask" data-reveal-delay={String(c * 0.15)}>
                      <CmsImage src={p.image.src} alt={p.image.alt} fill sizes="(max-width: 560px) 92vw, (max-width: 900px) 46vw, 30vw" quality={82} />
                    </figure>
                  ) : null}
                  <div className="approach9__body" data-reveal data-reveal-delay={String(c * 0.15 + (p.icon ? 0.55 : 0.25))}>
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

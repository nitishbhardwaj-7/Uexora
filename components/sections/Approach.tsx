import CmsImage from '@/components/ui/CmsImage';
import { ArrowLink } from '@/components/ui/Button';

type Row = { title: string; text: string };
type Props = {
  id: string;
  heading: string;
  paragraphs: string[];
  link?: { label: string; href: string };
  image?: { src: string; alt: string };
  panel?: { kicker?: string; title?: string; text?: string };
  stamp?: string;
  rows?: Row[];
  closing?: string;
  tone?: 'light' | 'dark';
};

/* Simple line icons, drawn in the brand blue; no icon library needed for three glyphs. */
const icons = [
  // analytics
  <svg key="chart" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 20h16" />
    <path d="M7 16v-4" />
    <path d="M12 16V8" />
    <path d="M17 16V5" />
  </svg>,
  // idea
  <svg key="bulb" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M9 18h6" />
    <path d="M10 21h4" />
    <path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1 2V16h5.2v-.2c0-.8.4-1.5 1-2A6 6 0 0 0 12 3Z" />
  </svg>,
  // people
  <svg key="people" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3.5 19.5c.7-3 3-4.8 5.5-4.8s4.8 1.8 5.5 4.8" />
    <path d="M15.5 5.2a3 3 0 0 1 0 5.6" />
    <path d="M17 14.9c1.8.5 3.1 2 3.5 4.6" />
  </svg>,
];

/**
 * Editorial "our approach" section: headline and link over a large photo with a
 * rounded right side, a small statement panel, a stamp and a thin gold curve; on the
 * right, the introduction, three process steps and a closing statement.
 * Motion uses the site's reveal attributes (staged before paint, skipped under reduced motion).
 */
export default function Approach({ id, heading, paragraphs, link, image, panel, stamp, rows = [], closing, tone = 'light' }: Props) {
  const [lead, ...rest] = paragraphs;
  const stampId = `${id}-stamp-circle`;
  return (
    <section id={id} className="section approach" data-tone={tone} aria-labelledby={`${id}-title`}>
      <div className="container approach__grid">
        <div className="approach__left">
          <h2 id={`${id}-title`} className="approach__title" data-split data-split-delay="0.1">
            {heading}
          </h2>
          {link ? (
            <div className="approach__link" data-reveal data-reveal-delay="0.2">
              <ArrowLink href={link.href}>{link.label}</ArrowLink>
            </div>
          ) : null}

          {image ? (
            <div className="approach__media">
              <figure className="approach__photo" data-reveal="mask">
                <CmsImage src={image.src} alt={image.alt} fill sizes="(max-width: 900px) 92vw, 46vw" quality={82} />
              </figure>

              {/* Thin gold line from the panel around the photo, drawn with the scroll. */}
              <svg className="approach__curve" viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden="true" data-draw-scroll>
                <path d="M86 6 C 104 14, 104 44, 88 56 S 52 66, 30 63" vectorEffect="non-scaling-stroke" />
              </svg>
              <span className="approach__dot" aria-hidden="true" data-reveal data-reveal-delay="0.5" />

              {panel?.title ? (
                <div className="approach__panel" data-reveal data-reveal-delay="0.35">
                  {panel.kicker ? <p className="approach__panel-kicker">{panel.kicker}</p> : null}
                  <p className="approach__panel-title">{panel.title}</p>
                  {panel.text ? <p className="approach__panel-text">{panel.text}</p> : null}
                </div>
              ) : null}

              {stamp ? (
                <div className="approach__stamp" aria-hidden="true" data-reveal data-reveal-delay="0.45">
                  <svg viewBox="0 0 120 120">
                    <defs>
                      <path id={stampId} d="M60 60 m -44 0 a 44 44 0 1 1 88 0 a 44 44 0 1 1 -88 0" />
                    </defs>
                    {/* Once round: textLength is just under the circumference (2π × 44 ≈ 276). */}
                    <text>
                      <textPath href={`#${stampId}`} textLength="262" lengthAdjust="spacing">
                        {stamp.toUpperCase()}
                      </textPath>
                    </text>
                    <circle cx="60" cy="60" r="5" />
                  </svg>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="approach__right">
          <div className="approach__intro" data-reveal-group data-stagger="0.12">
            {lead ? <p className="approach__lead">{lead}</p> : null}
            {rest.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {rows.length ? (
            <ol className="approach__rows" data-reveal-group data-stagger="0.14">
              {rows.map((r, i) => (
                <li key={r.title} className="approach__row">
                  <span className="approach__icon">{icons[i % icons.length]}</span>
                  <div>
                    <h3 className="approach__row-title">{r.title}</h3>
                    <p className="approach__row-text">{r.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          ) : null}

          {closing ? (
            <blockquote className="approach__closing" data-reveal data-reveal-delay="0.1">
              {closing}
            </blockquote>
          ) : null}
        </div>
      </div>
    </section>
  );
}

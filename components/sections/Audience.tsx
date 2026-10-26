import CmsImage from '@/components/ui/CmsImage';

type Props = {
  id: string;
  heading: string;
  paragraphs: string[];
  /** Business stages, shown as photo cards in order. */
  stages: string[];
  /** One photo per stage, in the same order; a stage without one shows its name on the page colour. */
  images?: { src: string; alt: string }[];
  tone?: 'light' | 'dark';
};

/**
 * "Who we work with": heading and introduction side by side, then one tall photo card per
 * business stage with the stage named on the photo. Cards unmask in turn as they enter view
 * (the site's data-reveal="mask"); no hover movement.
 */
export default function Audience({ id, heading, paragraphs, stages, images = [], tone = 'light' }: Props) {
  const [lead, ...rest] = paragraphs;
  return (
    <section id={id} className="section audience" data-tone={tone} aria-labelledby={`${id}-title`}>
      <div className="container">
        <div className="audience__head">
          <h2 id={`${id}-title`} className="h2 audience__title" data-split>
            {heading}
          </h2>
          <div className="audience__intro" data-reveal-group data-stagger="0.12">
            {lead ? <p className="audience__lead">{lead}</p> : null}
            {rest.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        <ul className="audience__cards">
          {stages.map((stage, i) => {
            const photo = images[i];
            return (
              <li key={stage} className="audience__card" data-reveal="mask" data-reveal-delay={(i * 0.15).toFixed(2)}>
                {photo ? <CmsImage src={photo.src} alt={photo.alt} fill sizes="(max-width: 900px) 92vw, 34vw" quality={82} /> : null}
                <span className="audience__label">{stage}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

import CmsImage from '@/components/ui/CmsImage';

type Props = {
  id: string;
  heading: string;
  /** First paragraph opens beside the heading; the middle ones sit under the tiles; the last closes the section. */
  paragraphs: string[];
  skills: string[];
  /** One photo per skill, in the same order; a skill without one shows its name on the page colour. */
  images?: { src: string; alt: string }[];
  tone?: 'light' | 'dark';
};

/**
 * "Preparing for more than the classroom": heading beside the opening line, a mosaic of photo
 * tiles naming each skill, then the supporting paragraphs and a closing line. Tiles unmask in a
 * quick stagger as they enter view (the site's data-reveal="mask"); no hover movement.
 */
export default function SkillsMosaic({ id, heading, paragraphs, skills, images = [], tone = 'dark' }: Props) {
  const [lead, ...rest] = paragraphs;
  const closing = rest.length > 1 ? rest[rest.length - 1] : undefined;
  const middle = closing ? rest.slice(0, -1) : rest;

  return (
    <section id={id} className="section skills" data-tone={tone} aria-labelledby={`${id}-title`}>
      <div className="container">
        <div className="skills__head">
          <h2 id={`${id}-title`} className="h2 skills__title" data-split>
            {heading}
          </h2>
          {lead ? (
            <p className="skills__lead" data-reveal data-reveal-delay="0.15">
              {lead}
            </p>
          ) : null}
        </div>

        <ul className="skills__grid">
          {skills.map((skill, i) => {
            const photo = images[i];
            return (
              <li key={skill} className="skills__tile" data-reveal="mask" data-reveal-delay={(i * 0.08).toFixed(2)}>
                {photo ? (
                  <CmsImage src={photo.src} alt={photo.alt} fill sizes="(max-width: 700px) 46vw, (max-width: 1100px) 46vw, 36vw" quality={82} />
                ) : null}
                <span className="skills__name">{skill}</span>
              </li>
            );
          })}
        </ul>

        {middle.length || closing ? (
          <div className="skills__foot">
            {middle.length ? (
              <div className="skills__body" data-reveal-group data-stagger="0.12">
                {middle.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            ) : null}
            {closing ? (
              <p className="skills__closing" data-reveal data-reveal-delay="0.1">
                {closing}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}

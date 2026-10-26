import Monogram from '@/components/brand/Monogram';
import Button from '@/components/ui/Button';
import CmsImage from '@/components/ui/CmsImage';

/* ------------------------------------------------------------------ */
/* Sticky-heading + prose                                              */
/* ------------------------------------------------------------------ */
export function SplitSection({
  id,
  eyebrow,
  heading,
  paragraphs,
  tone = 'light',
  aside,
}: {
  id?: string;
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  tone?: 'light' | 'dark';
  aside?: React.ReactNode;
}) {
  return (
    <section id={id} className="section" data-tone={tone} aria-labelledby={`${id}-title`}>
      <div className="container split">
        <div className="split__aside">
          <h2 id={`${id}-title`} className="h2" data-split>
            {heading}
          </h2>
          {aside}
        </div>
        <div className="split__body" data-reveal-group>
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Numbered card grid                                                  */
/* ------------------------------------------------------------------ */
export function CardGrid({
  id,
  eyebrow,
  heading,
  intro,
  items,
  tone = 'light',
  cta,
}: {
  id: string;
  eyebrow: string;
  heading: string;
  intro?: string;
  items: { title: string; text: string }[];
  tone?: 'light' | 'dark';
  cta?: { heading: string; text: string; label: string; href: string };
}) {
  return (
    <section id={id} className="section" data-tone={tone} aria-labelledby={`${id}-title`}>
      <div className="container">
        <div className="section-head">
          <h2 id={`${id}-title`} className="h2" data-split>
            {heading}
          </h2>
          {intro ? (
            <p className="lead" data-reveal>
              {intro}
            </p>
          ) : null}
        </div>
        <ul className="cards" data-reveal-group data-stagger="0.07">
          {items.map((item, i) => (
            <li key={item.title} className="card">
              <span className="card__num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="h3 card__title">{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
          {cta ? (
            <li className="card card--cta">
              <h3 className="h3">{cta.heading}</h3>
              <p>{cta.text}</p>
              <div>
                <Button href={cta.href} variant={tone === 'dark' ? 'dark' : 'light'}>
                  {cta.label}
                </Button>
              </div>
            </li>
          ) : null}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Statement band with a pull quote                                    */
/* ------------------------------------------------------------------ */
export function Statement({
  id,
  eyebrow,
  quote,
  paragraphs,
  tone = 'dark',
  children,
}: {
  id?: string;
  eyebrow: string;
  quote: string;
  paragraphs: string[];
  tone?: 'light' | 'dark';
  children?: React.ReactNode;
}) {
  return (
    <section id={id} className="section statement" data-tone={tone} aria-label={eyebrow}>
      <Monogram className="statement__mark" variant="mono" style={{ color: tone === 'dark' ? '#fff' : 'var(--blue-700)' }} />
      <div className="container">
        <div className="statement__inner">
          <h2 className="h3 statement__title" data-reveal>
            {eyebrow}
          </h2>
          <p className="statement__quote" data-split>
            {quote}
          </p>
          <div className="statement__text" data-reveal-group>
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Numbered reasons list                                               */
/* ------------------------------------------------------------------ */
export function Reasons({
  id,
  items,
  tone = 'light',
}: {
  id?: string;
  items: { title: string; text: string }[];
  tone?: 'light' | 'dark';
}) {
  return (
    <section id={id} className="section section--flush-top" data-tone={tone}>
      <div className="container">
        <ol className="reasons">
          {items.map((r, i) => (
            <li key={r.title} className="reason" data-reveal>
              <span className="reason__num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h2 className="h3">{r.title}</h2>
              <p>{r.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Process steps                                                       */
/* ------------------------------------------------------------------ */
export function Steps({
  id,
  eyebrow,
  heading,
  intro,
  steps,
  outro,
  tone = 'light',
}: {
  id: string;
  eyebrow: string;
  heading: string;
  intro: string[];
  steps: { title: string; text: string; image?: { src: string; alt: string } }[];
  outro?: string;
  tone?: 'light' | 'dark';
}) {
  return (
    <section id={id} className="section" data-tone={tone} aria-labelledby={`${id}-title`}>
      <div className="container">
        <div className="two-up" style={{ marginBottom: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
          <div className="section-head" style={{ marginBottom: 0 }}>
            <h2 id={`${id}-title`} className="h2" data-split>
              {heading}
            </h2>
          </div>
          <div className="prose" data-reveal-group style={{ alignSelf: 'end' }}>
            {intro.map((p, i) => (
              <p key={i} className={i === 0 ? 'em' : undefined}>
                {p}
              </p>
            ))}
          </div>
        </div>
        {/* .steps--seq: each step builds in turn (rule, accent, number, title, text); --i sets its place in the sequence. */}
        <ol className="steps steps--seq" data-reveal-group>
          {steps.map((s, i) => (
            <li key={s.title} className="step" style={{ '--i': i } as React.CSSProperties}>
              {s.image ? (
                <span className="step__photo">
                  <CmsImage src={s.image.src} alt={s.image.alt} fill sizes="(max-width: 520px) 92vw, (max-width: 900px) 46vw, 24vw" quality={75} />
                </span>
              ) : null}
              <span className="step__num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="h3">{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
        {outro ? (
          <p className="lead" data-reveal style={{ marginTop: 'clamp(2rem, 4vw, 3.5rem)', maxWidth: '44rem' }}>
            {outro}
          </p>
        ) : null}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Why choose us: intro + numbered reasons + closing lines             */
/* ------------------------------------------------------------------ */
export function WhyChoose({
  id,
  eyebrow,
  heading,
  intro,
  items,
  closingHeading,
  closing,
  signoff,
  tone = 'light',
}: {
  id: string;
  eyebrow: string;
  heading: string;
  intro: string[];
  items: { title: string; text: string }[];
  closingHeading: string;
  closing: string[];
  signoff: string;
  tone?: 'light' | 'dark';
}) {
  return (
    <section id={id} className="section" data-tone={tone} aria-labelledby={`${id}-title`}>
      <div className="container">
        <div className="two-up" style={{ marginBottom: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
          <div className="section-head" style={{ marginBottom: 0 }}>
            <p className="h3" style={{ color: 'var(--fg-muted)' }} data-reveal>
              {eyebrow}
            </p>
            <h2 id={`${id}-title`} className="h2" data-split>
              {heading}
            </h2>
          </div>
          <div className="prose" data-reveal-group style={{ alignSelf: 'end' }}>
            {intro.map((p, i) => (
              <p key={i} className={i === 0 ? 'em' : undefined}>
                {p}
              </p>
            ))}
          </div>
        </div>
        <ol className="reasons">
          {items.map((r, i) => (
            <li key={r.title} className="reason" data-reveal>
              <span className="reason__num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="h3">{r.title}</h3>
              <p>{r.text}</p>
            </li>
          ))}
        </ol>
        <div className="why-closing" data-reveal-group>
          <h3 className="h2">{closingHeading}</h3>
          {closing.map((p, i) => (
            <p key={i} className="lead">
              {p}
            </p>
          ))}
          <p className="why-closing__signoff">{signoff}</p>
        </div>
      </div>
    </section>
  );
}

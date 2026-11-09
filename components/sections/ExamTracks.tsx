import Link from 'next/link';
import CmsImage from '@/components/ui/CmsImage';
import { Arrow } from '@/components/ui/Button';
import ExamNav from '@/components/sections/ExamNav';
import WhyReasons from '@/components/sections/WhyReasons';
import type { ExamTrack, Service } from '@/content/types';

/** In-page anchors stay plain links (the smooth-scroll script handles them); pages use Link. */
function Go({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  return href.startsWith('#') ? (
    <a href={href} className={className}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

/**
 * A batch card as one link to the enquiry form, with the batch named so the form can say which
 * one the visitor chose; lands on the form itself. Without a form link it is a plain card.
 */
function BatchLink({ b, enquire, children }: { b: NonNullable<Service['examBatches']>['batchRows'][number]; enquire?: string; children: React.ReactNode }) {
  if (!enquire) return <>{children}</>;
  const batch = [b.ratio, b.name].filter(Boolean).join(' ');
  const href = `${enquire}${enquire.includes('?') ? '&' : '?'}batch=${encodeURIComponent(batch)}#enquiry`;
  return (
    <Link href={href} className="xbatch__link" data-cursor aria-label={`${batch} batch: enquire about this batch`}>
      {children}
    </Link>
  );
}

const Tick = () => (
  <svg className="xbatch__tick" viewBox="0 0 20 20" aria-hidden="true">
    <path d="M4.5 10.5 8.3 14 15.5 6.5" />
  </svg>
);

/**
 * Competitive exam page: a picker of four photo cards ("Choose your exam") that jump to a full
 * section per exam, and a slim exam bar that stays under the header while those sections are on
 * screen. Each exam runs: photo opening, the learning journey beside a photo and a closing call to
 * action. After the exams, once for the whole page: the three batch formats, the approach, then
 * why choose us. Sections alternate dark and cream so the long page keeps its rhythm.
 */
export default function ExamTracks({
  heading,
  text,
  tracks,
  batches,
  approach,
  why,
  enquire,
}: {
  heading: string;
  text?: string;
  tracks: ExamTrack[];
  batches?: Service['examBatches'];
  approach?: Service['examApproach'];
  why?: Service['examWhy'];
  /** The contact form for this programme (division and course set); each batch card links to it. */
  enquire?: string;
}) {
  const list = tracks.filter((t) => t?.slug && t?.title);
  if (!list.length) return null;
  const rows = (batches?.batchRows || []).filter((b) => b?.name);
  const steps = (approach?.approachSteps || []).filter((st) => st?.title);
  const reasons = (why?.whyList || []).filter((w) => w?.title);

  return (
    <div className="xtracks">
      <section id="exams" className="section xpick" data-tone="dark" aria-labelledby="exams-title">
        <div className="container">
          <div className="section-head">
            <h2 id="exams-title" className="h2" data-split>
              {heading}
            </h2>
            {text ? (
              <p className="lead" data-reveal>
                {text}
              </p>
            ) : null}
          </div>
          <ul className="xpick__grid">
            {list.map((t, i) => {
              const photo = t.cardImage || t.image;
              return (
                <li key={t.slug}>
                  <a href={`#${t.slug}`} className="xpick__card">
                    <figure className="xpick__photo" data-reveal="mask" data-reveal-delay={String(i * 0.12)}>
                      {photo ? <CmsImage src={photo.src} alt="" fill sizes="(max-width: 560px) 92vw, (max-width: 1100px) 46vw, 24vw" quality={82} /> : null}
                    </figure>
                    <span className="xpick__body">
                      <span className="xpick__num" aria-hidden="true">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="xpick__name">{t.name}</span>
                      <span className="xpick__tagline">{t.tagline}</span>
                      <span className="xpick__go" aria-hidden="true">
                        <Arrow />
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <div className="xtracks__body">
        <ExamNav items={list.map((t) => ({ slug: t.slug, name: t.name }))} />
        {list.map((t, i) => (
          <Track key={t.slug} t={t} n={i + 1} of={list.length} hasBatches={rows.length > 0} />
        ))}
      </div>

      {/* Once for the whole page: the three batch formats, each with its photo. */}
      {rows.length ? (
        <section id="batches" className="section xshared__batches" data-tone="light" aria-labelledby="batches-title">
          <div className="container">
            <div className="section-head">
              <h2 id="batches-title" className="h2" data-split>
                {batches!.heading}
              </h2>
              {batches!.text ? (
                <p className="lead" data-reveal>
                  {batches!.text}
                </p>
              ) : null}
            </div>
            <ol className="xbatch__list">
              {rows.map((b, k) => (
                <li key={b.name + k} className="xbatch">
                  <BatchLink b={b} enquire={enquire}>
                  {b.image ? (
                    <figure className="xbatch__photo" data-reveal="mask" data-reveal-delay={String(k * 0.14)}>
                      <CmsImage src={b.image.src} alt={b.image.alt} fill sizes="(max-width: 900px) 92vw, 30vw" quality={82} />
                      <span className="xbatch__ratio" aria-hidden="true">
                        {b.ratio}
                      </span>
                    </figure>
                  ) : null}
                  <div className="xbatch__body" data-reveal data-reveal-delay={String(k * 0.14 + 0.2)}>
                    <p className="xbatch__num">{b.number} —</p>
                    <h3 className="xbatch__name">{b.name}</h3>
                    <p className="xbatch__meta">
                      <strong>{b.ratio} Batch</strong> <span>{b.tagline}</span>
                    </p>
                    <p className="xbatch__text">{b.text}</p>
                    <ul className="xbatch__points">
                      {b.points.map((pt) => (
                        <li key={pt}>
                          <Tick />
                          {pt}
                        </li>
                      ))}
                    </ul>
                    {b.bestFor ? (
                      <p className="xbatch__best">
                        <strong>Best for:</strong> {b.bestFor}
                      </p>
                    ) : null}
                    {enquire ? (
                      <span className="xbatch__cta">
                        <span>Enquire about this batch</span>
                        <Arrow />
                      </span>
                    ) : null}
                  </div>
                  </BatchLink>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {/* Once for the whole page: the approach, its photo staying beside the steps as they scroll. */}
      {steps.length ? (
        <section id="exam-approach" className="section xshared__approach" data-tone="dark" aria-labelledby="exam-approach-title">
          <div className="container xapproach">
            <div className="xapproach__aside">
              <h2 id="exam-approach-title" className="h2" data-split>
                {approach!.heading}
              </h2>
              <p className="xapproach__sub" data-reveal>
                {approach!.subheading}
              </p>
              {approach!.image ? (
                <figure className="xapproach__photo" data-reveal="mask" data-reveal-delay="0.1">
                  <CmsImage src={approach!.image.src} alt={approach!.image.alt} fill sizes="(max-width: 900px) 92vw, 38vw" quality={82} />
                </figure>
              ) : null}
            </div>
            <div className="xapproach__main">
              {approach!.text ? (
                <p className="lead" data-reveal>
                  {approach!.text}
                </p>
              ) : null}
              <ol className="xapproach__steps" data-reveal-group data-stagger="0.12">
                {steps.map((st, k) => (
                  <li key={st.title + k}>
                    <span className="xapproach__num" aria-hidden="true">
                      {String(k + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="xapproach__title">{st.title}</h3>
                      <p>{st.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      ) : null}

      {/* Once for the whole page, at the end: why choose us. */}
      {reasons.length ? (
        <section id="why-uexora" className="section xshared__why" data-tone="light" aria-labelledby="why-uexora-title">
          <div className="container">
            <div className="section-head">
              <h2 id="why-uexora-title" className="h2" data-split>
                {why!.heading}
              </h2>
              {why!.subheading ? (
                <p className="lead" data-reveal>
                  {why!.subheading}
                </p>
              ) : null}
            </div>
            <WhyReasons items={reasons} />
          </div>
        </section>
      ) : null}
    </div>
  );
}

function Track({ t, n, of, hasBatches }: { t: ExamTrack; n: number; of: number; hasBatches: boolean }) {
  return (
    <article id={t.slug} className="xtrack" aria-labelledby={`${t.slug}-title`}>
      {/* Opening: the exam's photo across the band, its title and promise on the left. */}
      <header className="xtrack__hero" data-tone="dark">
        <div className="xtrack__hero-bg" aria-hidden="true">
          <div className="xtrack__hero-img" data-parallax="0.12">
            {t.image ? <CmsImage src={t.image.src} alt="" fill sizes="100vw" quality={75} /> : null}
          </div>
        </div>
        <div className="container xtrack__hero-in">
          <p className="xtrack__count" data-reveal>
            {String(n).padStart(2, '0')} <span>/ {String(of).padStart(2, '0')}</span>
          </p>
          <h2 id={`${t.slug}-title`} className="h1 xtrack__title" data-split>
            {t.title}
          </h2>
          <p className="xtrack__tagline" data-reveal data-reveal-delay="0.15">
            {t.tagline}
          </p>
          <div className="xtrack__intro" data-reveal-group data-stagger="0.1">
            {t.intro.map((p, k) => (
              <p key={k}>{p}</p>
            ))}
            {t.tags?.length ? <p className="xtrack__tags">{t.tags.join(' · ')}</p> : null}
          </div>
          {hasBatches ? (
            <div className="btn-row" data-reveal data-reveal-delay="0.3">
              <a href="#batches" className="btn btn--gold">
                <span className="btn__label">See the batches</span>
                <span className="btn__icon">
                  <Arrow />
                </span>
              </a>
            </div>
          ) : null}
        </div>
      </header>

      {/* The learning journey: text beside a photo. */}
      <section className="section xtrack__journey" data-tone="light" aria-label={t.journey.heading}>
        <div className="container xsplit">
          <div className="xsplit__text">
            <h3 className="h2" data-split>
              {t.journey.heading}
            </h3>
            <div className="xsplit__paras" data-reveal-group data-stagger="0.1">
              {t.journey.paragraphs.map((p, k) => (
                <p key={k}>{p}</p>
              ))}
            </div>
            {t.journey.pull ? (
              <p className="xtrack__pull" data-reveal>
                {t.journey.pull}
              </p>
            ) : null}
          </div>
          {t.journey.image ? (
            <figure className="xsplit__photo" data-reveal="mask" data-reveal-delay="0.1">
              <div className="xsplit__photo-in" data-parallax="0.12">
                <CmsImage src={t.journey.image.src} alt={t.journey.image.alt} fill sizes="(max-width: 900px) 92vw, 42vw" quality={82} />
              </div>
            </figure>
          ) : null}
        </div>
      </section>

      {/* Closing call to action over a quiet wash of the exam's photo. */}
      <section className="section xtrack__closing" data-tone="dark" aria-labelledby={`${t.slug}-closing-title`}>
        <div className="xtrack__closing-bg" aria-hidden="true">
          {t.image ? <CmsImage src={t.image.src} alt="" fill sizes="100vw" quality={70} /> : null}
        </div>
        <div className="container xtrack__closing-in">
          <h3 id={`${t.slug}-closing-title`} className="display xtrack__closing-title" data-split>
            {t.closing.heading}
          </h3>
          <div className="xtrack__closing-text" data-reveal-group data-stagger="0.1">
            {t.closing.paragraphs.map((p, k) => (
              <p key={k}>{p}</p>
            ))}
          </div>
          {t.closing.primary || t.closing.secondary ? (
            <div className="btn-row" data-reveal data-reveal-delay="0.2">
              {t.closing.primary ? (
                <Go href={t.closing.primary.href} className="btn btn--gold">
                  <span className="btn__label">{t.closing.primary.label}</span>
                  <span className="btn__icon">
                    <Arrow />
                  </span>
                </Go>
              ) : null}
              {t.closing.secondary ? (
                <Go href={t.closing.secondary.href} className="link-arrow">
                  <span>{t.closing.secondary.label}</span>
                  <Arrow />
                </Go>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>
    </article>
  );
}

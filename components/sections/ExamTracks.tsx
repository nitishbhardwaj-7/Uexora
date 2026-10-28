import Link from 'next/link';
import CmsImage from '@/components/ui/CmsImage';
import { Arrow } from '@/components/ui/Button';
import ExamNav from '@/components/sections/ExamNav';
import type { ExamTrack } from '@/content/types';

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

const Tick = () => (
  <svg className="xbatch__tick" viewBox="0 0 20 20" aria-hidden="true">
    <path d="M4.5 10.5 8.3 14 15.5 6.5" />
  </svg>
);

/**
 * Competitive exam page: a picker of four photo cards ("Choose your exam") that jump to a full
 * section per exam, and a slim exam bar that stays under the header while those sections are on
 * screen. Each exam runs: photo opening, the learning journey beside a photo, the three batches,
 * the approach beside a photo, why choose us (where given), and a closing call to action.
 * Sections alternate dark and cream so the long page keeps its rhythm.
 */
export default function ExamTracks({ heading, text, tracks }: { heading: string; text?: string; tracks: ExamTrack[] }) {
  const list = tracks.filter((t) => t?.slug && t?.title);
  if (!list.length) return null;

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
          <Track key={t.slug} t={t} n={i + 1} of={list.length} />
        ))}
      </div>
    </div>
  );
}

function Track({ t, n, of }: { t: ExamTrack; n: number; of: number }) {
  const batches = (t.batchList || []).filter((b) => b?.name);
  const steps = (t.approach?.trackSteps || []).filter((s) => s?.title);
  const why = (t.why?.whyList || []).filter((w) => w?.title);

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
          {batches.length ? (
            <div className="btn-row" data-reveal data-reveal-delay="0.3">
              <a href={`#${t.slug}-batches`} className="btn btn--gold">
                <span className="btn__label">See the {t.name} batches</span>
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

      {/* The three batches, each with its photo. */}
      {batches.length ? (
        <section id={`${t.slug}-batches`} className="section xtrack__batches" data-tone="dark" aria-labelledby={`${t.slug}-batches-title`}>
          <div className="container">
            <div className="section-head">
              <h3 id={`${t.slug}-batches-title`} className="h2" data-split>
                {t.batchHeading}
              </h3>
            </div>
            <ol className="xbatch__list">
              {batches.map((b, k) => (
                <li key={b.name + k} className="xbatch">
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
                    <h4 className="xbatch__name">{b.name}</h4>
                    <p className="xbatch__meta">
                      <strong>{b.ratio} Batch</strong> <span>{b.tagline}</span>
                    </p>
                    <p className="xbatch__text">{b.text}</p>
                    <ul className="xbatch__points">
                      {b.points.map((p) => (
                        <li key={p}>
                          <Tick />
                          {p}
                        </li>
                      ))}
                    </ul>
                    {b.bestFor ? (
                      <p className="xbatch__best">
                        <strong>Best for:</strong> {b.bestFor}
                      </p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {/* Approach: the photo stays beside the numbered steps as they scroll past. */}
      {steps.length ? (
        <section className="section xtrack__approach" data-tone="light" aria-labelledby={`${t.slug}-approach-title`}>
          <div className="container xapproach">
            <div className="xapproach__aside">
              <h3 id={`${t.slug}-approach-title`} className="h2" data-split>
                {t.approach.heading}
              </h3>
              <p className="xapproach__sub" data-reveal>
                {t.approach.subheading}
              </p>
              {t.approach.image ? (
                <figure className="xapproach__photo" data-reveal="mask" data-reveal-delay="0.1">
                  <CmsImage src={t.approach.image.src} alt={t.approach.image.alt} fill sizes="(max-width: 900px) 92vw, 38vw" quality={82} />
                </figure>
              ) : null}
            </div>
            <div className="xapproach__main">
              {t.approach.text ? (
                <p className="lead" data-reveal>
                  {t.approach.text}
                </p>
              ) : null}
              <ol className="xapproach__steps" data-reveal-group data-stagger="0.12">
                {steps.map((s, k) => (
                  <li key={s.title + k}>
                    <span className="xapproach__num" aria-hidden="true">
                      {String(k + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h4 className="xapproach__title">{s.title}</h4>
                      <p>{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      ) : null}

      {/* Why choose us (not every exam has one). */}
      {why.length ? (
        <section className="section xtrack__why" data-tone="dark" aria-labelledby={`${t.slug}-why-title`}>
          <div className="container">
            <div className="section-head">
              <h3 id={`${t.slug}-why-title`} className="h2" data-split>
                {t.why!.heading}
              </h3>
              {t.why!.subheading ? (
                <p className="lead" data-reveal>
                  {t.why!.subheading}
                </p>
              ) : null}
            </div>
            <ul className="xwhy__list" data-reveal-group data-stagger="0.1">
              {why.map((w, k) => (
                <li key={w.title + k}>
                  <h4 className="xwhy__title">{w.title}</h4>
                  <p>{w.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

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

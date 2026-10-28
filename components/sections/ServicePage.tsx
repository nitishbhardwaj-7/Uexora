import { JsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';
import PageHero from '@/components/sections/PageHero';
import ServiceCards from '@/components/sections/ServiceCards';
import { Statement } from '@/components/sections/Blocks';
import CtaBand from '@/components/sections/CtaBand';
import Faq from '@/components/sections/Faq';
import ProgrammeTabs from '@/components/sections/ProgrammeTabs';
import ApproachGrid from '@/components/sections/ApproachGrid';
import CompareTable from '@/components/sections/CompareTable';
import ExamTracks from '@/components/sections/ExamTracks';
import Monogram from '@/components/brand/Monogram';
import CmsImage from '@/components/ui/CmsImage';
import { ArrowLink } from '@/components/ui/Button';
import { site } from '@/lib/site';
import type { Service } from '@/content/types';
import { divisionMeta, serviceDescription, servicePath, type Division } from '@/lib/cms/services';

type Props = {
  division: Division;
  service: Service;
  all: Service[];
  /** Pull quote and paragraphs from the division's approach / philosophy section. */
  statement: { heading: string; quote: string; paragraphs: string[]; points?: { title: string; subtitle?: string; text?: string; image?: { src: string; alt: string } }[] };
  cta: { heading: string; paragraphs: string[]; signoff?: string; primary: { label: string; href: string }; secondary?: { label: string; href: string } };
};

/**
 * Detail page for one programme (Education) or service (Marketing):
 * hero, who it's for + detail, questions, approach, other items, call to action.
 * Education pages follow the blue theme (dark sections), Marketing the cream theme.
 */
export default function ServicePage({ division, service: s, all, statement, cta }: Props) {
  const meta = divisionMeta[division];
  const dark = division === 'education';
  const heroTone = dark ? 'dark' : 'light';
  const sectionTone = dark ? 'dark' : 'light';
  const altTone = dark ? 'light' : 'dark';
  const url = `${site.url}${servicePath(division, s.slug)}`;
  const contact = `/contact?division=${division}`;
  const unitCap = meta.unit.charAt(0).toUpperCase() + meta.unit.slice(1);
  // Hero carries the one-line promise; the overview opens with the full intro, then audience and
  // detail. A detail paragraph that mostly restates the intro or the audience line (80% or more of
  // its words in common) is left out, so the section never reads the same point twice.
  const intro = s.promise ? s.text : '';
  const wordsOf = (t: string) => new Set(t.toLowerCase().match(/[a-z]+/g) || []);
  const restates = (a: string, b: string) => {
    if (!a || !b) return false;
    const x = wordsOf(a);
    const y = wordsOf(b);
    let common = 0;
    x.forEach((w) => y.has(w) && common++);
    return common / Math.max(1, Math.min(x.size, y.size)) >= 0.8;
  };
  const details = (s.details || []).filter((d) => d && !restates(d, intro) && !restates(d, s.whoFor || ''));
  const overviewPhoto = s.image || s.heroImage;
  const grades = (s.gradeSupport?.stages || []).filter((g) => g?.grades && g?.title);
  const boards = (s.curricula?.boards || []).filter((b) => b?.short);
  const features = (s.offerings?.features || [])
    .filter((f) => f?.title)
    .map((f) => ({ ...f, options: (f.options || []).filter((o) => o?.ratio && o?.title) }));
  const enquire = division === 'education' ? 'Speak with our education team' : 'Discuss your requirements';
  const faqs = s.faqs?.filter((f) => f.q && f.a) || [];
  const imageUrl = s.image ? (s.image.src.startsWith('http') ? s.image.src : `${site.url}${s.image.src}`) : null;

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.title,
    description: serviceDescription(s),
    url,
    serviceType: s.title,
    provider: { '@type': meta.schemaType, name: meta.name, url: `${site.url}${meta.path}`, parentOrganization: { '@type': 'Organization', name: site.legalName, url: site.url } },
    ...(imageUrl ? { image: imageUrl } : {}),
  };

  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: meta.name.replace('Uexora ', ''), path: meta.path },
          { name: s.title, path: servicePath(division, s.slug) },
        ]}
      />
      <JsonLd data={serviceLd} />

      <PageHero
        eyebrow={meta.name}
        title={s.title}
        lead={s.promise || s.text}
        tone={heroTone}
        primary={{ label: enquire, href: contact }}
        secondary={{ label: `All ${meta.units}`, href: meta.listAnchor }}
        background={s.heroImage || s.image}
        chips={s.highlights}
        crumbs={[{ label: meta.name, href: meta.path }, { label: unitCap }]}
      />

      <section id="overview" className="section" data-tone={sectionTone} aria-labelledby="overview-title">
        <div className="container">
          {/* Heading row on top; below it the photo and the text start and end on the same lines. */}
          <div className="overview-head">
            <h2 id="overview-title" className="h2" data-split>
              {division === 'education' ? 'Who it’s for, and what it offers' : 'Who it’s for, and what it covers'}
            </h2>
            <div data-reveal>
              <ArrowLink href={contact}>Ask about this {meta.unit}</ArrowLink>
            </div>
          </div>
          <div className={['split', 'split--overview', overviewPhoto ? '' : 'split--overview-text'].filter(Boolean).join(' ')}>
            {overviewPhoto ? (
              <figure className="split__photo" data-reveal="mask" data-reveal-delay="0.15">
                <div className="split__photo-in" data-parallax="0.15">
                  <CmsImage src={overviewPhoto.src} alt={overviewPhoto.alt} fill sizes="(max-width: 900px) 92vw, 40vw" quality={82} />
                </div>
              </figure>
            ) : null}
            <div className="split__body">
              {/* The intro arrives word by word, sharpening from a soft blur; the rest rises in. */}
              {intro ? (
                <p className="split__lead" data-words data-words-delay="0.1">
                  {intro}
                </p>
              ) : null}
              {s.whoFor ? (
                <p className="split__who" data-reveal data-reveal-delay="0.2">
                  {s.whoFor}
                </p>
              ) : null}
              {details.length ? (
                <div className="split__more" data-reveal-group data-stagger="0.12">
                  {details.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          {/* Support by school stage: one rising step per stage, each a little higher than the last. */}
          {grades.length ? (
            <div className="grades" aria-labelledby="grades-title">
              <div className="grades__head">
                <h3 id="grades-title" className="h3" data-reveal>
                  {s.gradeSupport!.heading}
                </h3>
                {s.gradeSupport!.text ? (
                  <p data-reveal data-reveal-delay="0.1">
                    {s.gradeSupport!.text}
                  </p>
                ) : null}
              </div>
              <ol className="grades__steps" data-reveal-group data-stagger="0.14" style={{ '--n': grades.length } as React.CSSProperties}>
                {grades.map((g, i) => (
                  <li key={g.grades + i} className="grades__step" style={{ '--i': i } as React.CSSProperties}>
                    <p className="grades__range">
                      <span className="grades__label">Grades</span>
                      <span className="grades__num">{g.grades}</span>
                    </p>
                    <h4 className="grades__title">{g.title}</h4>
                    {g.text ? <p className="grades__text">{g.text}</p> : null}
                  </li>
                ))}
              </ol>
            </div>
          ) : null}

          {/* Curricula: a mark for each board (an uploaded logo where the client has one). */}
          {boards.length ? (
            <div className="curricula" aria-labelledby="curricula-title">
              <div className="grades__head">
                <h3 id="curricula-title" className="h3" data-reveal>
                  {s.curricula!.heading}
                </h3>
                {s.curricula!.text ? (
                  <p data-reveal data-reveal-delay="0.1">
                    {s.curricula!.text}
                  </p>
                ) : null}
              </div>
              <ul className="curricula__list" data-reveal-group data-stagger="0.1">
                {boards.map((b, i) => (
                  <li key={b.short + i} className="curricula__item">
                    <span className={['curricula__mark', b.logo ? 'curricula__mark--logo' : ''].filter(Boolean).join(' ')} aria-hidden={b.logo ? undefined : true}>
                      {b.logo ? <CmsImage src={b.logo.src} alt={b.logo.alt || b.name} fill sizes="120px" quality={82} /> : b.short}
                    </span>
                    <span className="curricula__name">{b.name || b.short}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {/* What the programme includes: numbered; a feature with options shows them as tabs. */}
          {features.length ? (
            <div className="offer" aria-labelledby="offer-title">
              <div className="grades__head">
                <h3 id="offer-title" className="h3" data-reveal>
                  {s.offerings!.heading}
                </h3>
              </div>
              <ol className="offer__list" data-reveal-group data-stagger="0.1">
                {features.map((f, i) => (
                  <li key={f.title + i} className={['offer__item', f.options?.length ? 'offer__item--tabs' : ''].filter(Boolean).join(' ')}>
                    {f.image && !f.options?.length ? (
                      <figure className="offer__photo">
                        <CmsImage src={f.image.src} alt={f.image.alt} fill sizes="(max-width: 560px) 92vw, (max-width: 900px) 46vw, 30vw" quality={82} />
                      </figure>
                    ) : null}
                    <span className="offer__num" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h4 className="offer__title">{f.title}</h4>
                    {f.text ? <p className="offer__text">{f.text}</p> : null}
                    {f.options?.length ? <ProgrammeTabs options={f.options} idBase={`offer-${i}`} label={f.title} /> : null}
                  </li>
                ))}
              </ol>
            </div>
          ) : null}
        </div>
      </section>

      {/* Exam tracks (Competitive Exam Preparation): the picker and a section per exam. */}
      {s.tracks?.length ? <ExamTracks heading={s.tracksHeading || 'Choose your exam'} text={s.tracksText} tracks={s.tracks} /> : null}

      {/* With approach points (Education), they replace the quote and paragraphs; a page with its
          own exam tracks carries each exam's approach instead. */}
      {s.tracks?.length ? null : statement.points?.filter((p) => p?.title).length ? (
        <ApproachGrid id="approach" heading={statement.heading} quote={statement.quote} points={statement.points.filter((p) => p?.title)} tone={altTone} />
      ) : (
        <Statement id="approach" eyebrow={statement.heading} quote={statement.quote} paragraphs={statement.paragraphs.slice(0, 2)} tone={altTone} />
      )}

      {s.comparison?.lines?.length ? <CompareTable id="compare" data={s.comparison} tone={sectionTone} /> : null}

      {faqs.length ? (
        <section id="questions" className="section" data-tone={sectionTone} aria-labelledby="faq-title">
          <div className="container">
            <div className="section-head">
              <h2 id="faq-title" className="h2" data-split>
                {s.faqHeading || 'Common questions'}
              </h2>
              <p className="lead" data-reveal>
                Straight answers about this {meta.unit}, in the words we would use in person.
              </p>
            </div>
            <div data-reveal data-reveal-delay="0.1">
              <Faq items={faqs} askHref={contact} />
            </div>
          </div>
        </section>
      ) : null}

      <ServiceCards id={`other-${meta.units}`} division={division} heading={`Other ${meta.units}`} items={all} exclude={s.slug} tone={sectionTone} compact />

      <CtaBand id="next-step" heading={cta.heading} paragraphs={cta.paragraphs} signoff={cta.signoff} primary={cta.primary} secondary={cta.secondary} />
    </>
  );
}

import { JsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';
import PageHero from '@/components/sections/PageHero';
import { Statement } from '@/components/sections/Blocks';
import CtaBand from '@/components/sections/CtaBand';
import Faq from '@/components/sections/Faq';
import ProgrammeTabs from '@/components/sections/ProgrammeTabs';
import ApproachGrid from '@/components/sections/ApproachGrid';
import CompareTable from '@/components/sections/CompareTable';
import ExamTracks from '@/components/sections/ExamTracks';
import CourseSlider from '@/components/sections/CourseSlider';
import ToolSlider from '@/components/sections/ToolSlider';
import JourneySteps from '@/components/sections/JourneySteps';
import PlatformShowcase from '@/components/sections/PlatformShowcase';
import ApproachIcon from '@/components/sections/ApproachIcon';
import Monogram from '@/components/brand/Monogram';
import CmsImage from '@/components/ui/CmsImage';
import { ArrowLink } from '@/components/ui/Button';
import { site } from '@/lib/site';
import type { Service } from '@/content/types';
import { divisionMeta, serviceDescription, servicePath, type Division } from '@/lib/cms/services';

type Props = {
  division: Division;
  service: Service;
  /** Pull quote and paragraphs from the division's approach / philosophy section. */
  statement: { heading: string; quote: string; paragraphs: string[]; points?: { title: string; subtitle?: string; text?: string; icon?: string; image?: { src: string; alt: string } }[] };
  cta: { heading: string; paragraphs: string[]; signoff?: string; primary: { label: string; href: string }; secondary?: { label: string; href: string } };
};

/**
 * Detail page for one programme (Education) or service (Marketing):
 * hero, who it is for + detail, approach, questions, call to action. (The other programmes or
 * services are listed in the footer's sliders, so the page does not repeat them.)
 * Both divisions follow the blue theme: dark sections, with light ones between them.
 */
export default function ServicePage({ division, service: s, statement, cta }: Props) {
  const meta = divisionMeta[division];
  const heroTone = 'dark';
  const sectionTone = 'dark';
  const altTone = 'light';
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
  const pillars = (s.pillars?.pillarItems || []).filter((p) => p?.title);
  const pillarCols = pillars.length % 4 === 0 ? 4 : 3;
  const serves = (s.serves?.serveGroups || []).filter((g) => g?.text);
  const workshops = (s.workshops?.workshopItems || []).filter(Boolean);
  const platforms = (s.platforms?.platformItems || []).filter((p) => p?.name);
  const trainingAreas = platforms.filter((p) => p.points?.length);
  // Platforms with nothing after them end on a light section, so what follows swaps tones to keep them alternating.
  const endsLight = platforms.length && !s.closing?.heading;
  const approachTone = endsLight ? sectionTone : altTone;
  const faqTone = endsLight ? altTone : sectionTone;
  const journey = (s.journey?.journeySteps || []).filter((j) => j?.title);
  const journeyHeading = s.journey?.heading || 'Your Learning Journey';
  // Pillars and the journey are both light, so with pillars the journey waits until after the dark slider.
  const journeyLate = pillars.length > 0;
  const journeySection = journey.length ? (
    <section id="journey" className="section journey-section" data-tone="light" aria-labelledby="journey-title">
      <div className="container">
        <div className="section-head">
          <h2 id="journey-title" className="h2" data-split>
            {journeyHeading}
          </h2>
          {s.journey?.text ? (
            <p className="lead" data-reveal>
              {s.journey.text}
            </p>
          ) : null}
        </div>
        <JourneySteps steps={journey} />
      </div>
    </section>
  ) : null;
  const courses =(s.courses?.courseSlides || []).filter((c) => c?.title);
  const coursesHeading = s.courses?.heading || 'Explore Our Programmes';
  // The hero's second button: to this page's own programmes (the slider, or the exam picker) when
  // it has them. Without them, Education offers a free demo class; Marketing keeps its service list.
  const ownProgrammes = courses.length ? '#courses' : s.tracks?.length ? '#exams' : '';
  const heroSecondary = ownProgrammes
    ? { label: `All ${meta.units}`, href: ownProgrammes }
    : division === 'education'
      ? { label: 'Book a free demo class', href: `/book-demo?programme=${encodeURIComponent(s.title)}` }
      : { label: `All ${meta.units}`, href: meta.listAnchor };
  const tools = (s.tools?.toolCards || []).filter((t) => t?.name);
  const toolsHeading = s.tools?.heading || 'AI Tools Students Explore';
  const enquire = division === 'education' ? 'Speak with our education team' : 'Discuss your requirements';
  // A page's own approach points replace the division's shared ones, along with the line above them.
  const ownApproach = (s.approach?.approachPoints || []).filter((p) => p?.title);
  const approachPoints = ownApproach.length ? ownApproach : (statement.points || []).filter((p) => p?.title);
  const approachQuote = (ownApproach.length && s.approach?.quote) || statement.quote;
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
    // The courses in the slider, as the programme's catalogue.
    ...(courses.length
      ? {
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: coursesHeading,
            itemListElement: courses.map((c) => ({
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: c.title,
                ...(c.text ? { description: c.text } : {}),
                ...(c.audience ? { audience: { '@type': 'Audience', audienceType: c.audience } } : {}),
              },
            })),
          },
        }
      : {}),
    // Or the training areas and their topics (Corporate Trainings).
    ...(!courses.length && trainingAreas.length
      ? {
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: s.platforms!.heading,
            itemListElement: trainingAreas.map((p) => ({
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: p.name, description: p.points!.join(', ') },
            })),
          },
        }
      : {}),
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
        title={s.heroTitle || s.title}
        lead={s.promise || s.text}
        tone={heroTone}
        primary={{ label: enquire, href: contact }}
        secondary={heroSecondary}
        background={s.heroImage || s.image}
        chips={s.highlights}
        crumbs={[{ label: meta.name, href: meta.path }, { label: unitCap }]}
      />

      <section id="overview" className="section" data-tone={sectionTone} aria-labelledby="overview-title">
        <div className="container">
          {/* Heading row on top; below it the photo and the text start and end on the same lines. */}
          <div className="overview-head">
            <h2 id="overview-title" className="h2" data-split>
              {s.overviewHeading || (division === 'education' ? 'Who it is for, and what it offers' : 'Who it is for, and what it covers')}
            </h2>
            <div data-reveal>
              <ArrowLink href={contact}>Ask about this {meta.unit}</ArrowLink>
            </div>
          </div>
          <div className={['split', 'split--overview', overviewPhoto ? '' : 'split--overview-text', overviewPhoto && !s.whoFor && !details.length ? 'split--overview-lone' : ''].filter(Boolean).join(' ')}>
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

          {/* Who the programme can serve (Inclusive Learning): centred rows of four, so an odd count stays symmetrical. */}
          {serves.length ? (
            <div className="serves" aria-labelledby="serves-title">
              <h3 id="serves-title" className="h2 serves__title" data-split>
                {s.serves!.heading}
              </h3>
              <ul className="serves__list">
                {serves.map((g, i) => (
                  <li key={g.text + i} className="serve" data-reveal style={{ '--c': i % 4 } as React.CSSProperties}>
                    <span className="serve__icon">
                      <ApproachIcon name={g.icon || ''} />
                    </span>
                    <p className="serve__text">{g.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

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
              {/* Rises as a staircase once in view: the columns grow in turn, then each stage's text. */}
              <ol className="grades__steps" data-reveal style={{ '--n': grades.length } as React.CSSProperties}>
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
              {/* Each seal's ring draws round in turn once in view, then its name settles in. */}
              <ul className="curricula__list" data-reveal>
                {boards.map((b, i) => (
                  <li key={b.short + i} className="curricula__item" style={{ '--k': i } as React.CSSProperties}>
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

      {/* What the programme teaches (Communication): three across; each pillar's line draws, its
          icon draws on, then its list settles in. */}
      {pillars.length ? (
        <section id="pillars" className="section pillars-section" data-tone="light" aria-labelledby="pillars-title">
          <div className="container">
            <div className="section-head">
              <h2 id="pillars-title" className="h2" data-split>
                {s.pillars!.heading}
              </h2>
              {s.pillars!.text ? (
                <p className="lead" data-reveal>
                  {s.pillars!.text}
                </p>
              ) : null}
            </div>
            <ol className={['pillars', pillarCols === 4 ? 'pillars--four' : ''].filter(Boolean).join(' ')}>
              {pillars.map((p, i) => (
                <li key={p.title + i} className="pillar" data-reveal style={{ '--c': i % pillarCols } as React.CSSProperties}>
                  <div className="pillar__head">
                    <span className="pillar__icon">
                      <ApproachIcon name={p.icon || ''} />
                    </span>
                    <span className="pillar__num" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="pillar__title">{p.title}</h3>
                  <ul className="pillar__list">
                    {(p.points || []).map((point, k) => (
                      <li key={point + k} style={{ '--k': k } as React.CSSProperties}>
                        {point}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {/* The programme's stages (AI for Professionals): numbered circles on a line that fills as
          the page scrolls, a card under each. */}
      {journeyLate ? null : journeySection}

      {/* Exam tracks (Competitive Exam Preparation): the picker and a section per exam. */}
      {s.tracks?.length ? <ExamTracks heading={s.tracksHeading || 'Choose your exam'} text={s.tracksText} tracks={s.tracks} batches={s.examBatches} approach={s.examApproach} why={s.examWhy} enquire={`${contact}&course=${encodeURIComponent(s.title)}`} /> : null}

      {/* Courses within the programme (AI, Coding and Robotics): a slider of large photo cards. */}
      {courses.length ? (
        <section id="courses" className="section courses" data-tone="dark" aria-labelledby="courses-title">
          <div className="container">
            <div className="section-head">
              <h2 id="courses-title" className="h2" data-split>
                {coursesHeading}
              </h2>
              {s.courses?.text ? (
                <p className="lead" data-reveal>
                  {s.courses.text}
                </p>
              ) : null}
            </div>
          </div>
          <CourseSlider slides={courses} label={coursesHeading} demoFor={division === 'education' ? s.title : undefined} enquireFor={division === 'marketing' ? s.title : undefined} />
        </section>
      ) : null}

      {journeyLate ? journeySection : null}

      {/* Where students perform (Communication): a list beside a photo that follows the scroll. */}
      {platforms.length ? (
        <section id="platforms" className="section platforms-section" data-tone="light" aria-labelledby="platforms-title">
          <div className="container">
            <div className="section-head">
              <h2 id="platforms-title" className="h2" data-split>
                {s.platforms!.heading}
              </h2>
              {s.platforms!.text ? (
                <p className="lead" data-reveal>
                  {s.platforms!.text}
                </p>
              ) : null}
            </div>
            <PlatformShowcase items={platforms} />
          </div>
        </section>
      ) : null}

      {/* Workshops (Inclusive Learning): a numbered list beside a photo that stays in view. */}
      {workshops.length ? (
        <section id="workshops" className="section workshops-section" data-tone="light" aria-labelledby="workshops-title">
          <div className="container workshops">
            <div className="workshops__side">
              <h2 id="workshops-title" className="h2" data-split>
                {s.workshops!.heading}
              </h2>
              {s.workshops!.text ? (
                <p className="lead" data-reveal>
                  {s.workshops!.text}
                </p>
              ) : null}
              {s.workshops!.image?.src ? (
                <figure className="workshops__photo" data-reveal="mask">
                  <CmsImage src={s.workshops!.image.src} alt={s.workshops!.image.alt} fill sizes="(max-width: 900px) 92vw, 42vw" quality={82} />
                </figure>
              ) : null}
            </div>
            <ol className="workshops__list">
              {workshops.map((item, i) => (
                <li key={item + i} className="workshop" data-reveal>
                  <span className="workshop__num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="workshop__text">{item}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {/* The tools students work with: logo cards in two rows that scroll sideways. */}
      {tools.length ? (
        <section id="ai-tools" className="section tools-section" data-tone="light" aria-labelledby="tools-title">
          <div className="container">
            <div className="section-head">
              <h2 id="tools-title" className="h2" data-split>
                {toolsHeading}
              </h2>
              {s.tools?.text ? (
                <p className="lead" data-reveal>
                  {s.tools.text}
                </p>
              ) : null}
            </div>
            <ToolSlider tools={tools} label={toolsHeading} />
            {s.tools?.note ? <p className="tools__note">{s.tools.note}</p> : null}
          </div>
        </section>
      ) : null}

      {/* A closing statement (Inclusive Learning), before the approach shared across programmes;
          with a photo (Corporate Trainings) it stands over the photo, full width. */}
      {s.closing?.heading ? (
        <section id="closing" className={['section', s.closing.image?.src ? 'closing-band' : ''].filter(Boolean).join(' ')} data-tone="dark" aria-labelledby="closing-title">
          {s.closing.image?.src ? (
            <figure className="closing-band__photo" data-parallax="0.12">
              <CmsImage src={s.closing.image.src} alt={s.closing.image.alt} fill sizes="100vw" quality={82} />
            </figure>
          ) : null}
          <div className="container">
            <div className="closing">
              <h2 id="closing-title" className="h2" data-split>
                {s.closing.heading}
              </h2>
              {s.closing.text ? (
                <p className="closing__text" data-reveal data-reveal-delay="0.15">
                  {s.closing.text}
                </p>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {/* With approach points (Education), they replace the quote and paragraphs; a page with its
          own exam tracks carries each exam's approach instead. */}
      {s.tracks?.length ? null : approachPoints.length ? (
        <ApproachGrid id="approach" heading={statement.heading} quote={approachQuote} points={approachPoints} tone={approachTone} />
      ) : (
        <Statement id="approach" eyebrow={statement.heading} quote={statement.quote} paragraphs={statement.paragraphs.slice(0, 2)} tone={approachTone} />
      )}

      {s.comparison?.lines?.length ? <CompareTable id="compare" data={s.comparison} tone={sectionTone} /> : null}

      {faqs.length ? (
        <section id="questions" className="section" data-tone={faqTone} aria-labelledby="faq-title">
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


      <CtaBand id="next-step" heading={cta.heading} paragraphs={cta.paragraphs} signoff={cta.signoff} primary={cta.primary} secondary={cta.secondary} />
    </>
  );
}

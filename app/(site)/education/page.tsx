import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import PageHero from '@/components/sections/PageHero';
import StatBand from '@/components/sections/StatBand';
import Approach from '@/components/sections/Approach';
import SkillsMosaic from '@/components/sections/SkillsMosaic';
import { WhyChoose } from '@/components/sections/Blocks';
import ServiceCards from '@/components/sections/ServiceCards';
import CtaBand from '@/components/sections/CtaBand';
import Signpost from '@/components/sections/Signpost';
import Reviews from '@/components/sections/Reviews';
import { getEducation } from '@/lib/cms';
import { getReviews } from '@/lib/cms/reviews';
import { heroSlides } from '@/lib/cms/services';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const e = await getEducation();
  return pageMetadata({ title: e.seo.title, description: e.seo.description, path: '/education' });
}

export default async function EducationPage() {
  const [e, reviews] = await Promise.all([getEducation(), getReviews('education')]);
  const stats = (e.stats || []).filter((s) => s?.value && s?.label);
  return (
    <>
      <BreadcrumbJsonLd crumbs={[{ name: 'Education', path: '/education' }]} />
      <PageHero
        eyebrow={e.eyebrow}
        title={e.title}
        lead={e.lead}
        tone="dark"
        primary={e.hero.primary}
        secondary={e.hero.secondary}
        background={e.hero.background}
        slides={heroSlides('education', e.programmes)}
        chips={e.hero.chipLinks?.length ? e.hero.chipLinks : e.hero.chips}
      />

      {/* Figures under the hero, counting up as they come into view. */}
      {stats.length ? (
        <section id="numbers" className="section stats-section" data-tone="dark" aria-labelledby="numbers-title">
          <div className="container">
            <h2 id="numbers-title" className="visually-hidden">
              Uexora Education in numbers
            </h2>
            <StatBand items={stats} />
          </div>
        </section>
      ) : null}

      <Approach
        id="about"
        tone="dark"
        heading={e.about.heading}
        paragraphs={e.about.paragraphs}
        link={{ label: e.about.link, href: '/education#why-choose-us' }}
        image={e.about.image}
        rows={e.about.rows}
        icons={['book', 'bulb', 'people']}
        closing={e.about.closing}
      />

      <ServiceCards
        id="programmes"
        division="education"
        heading={e.programmesHeading}
        highlight={e.programmesHighlight}
        intro={e.programmesIntro}
        items={e.programmes}
        tone="light"
        cta={e.programmesCta}
      />

      <SkillsMosaic id="beyond" heading={e.beyond.heading} paragraphs={e.beyond.paragraphs} skills={e.beyond.skills} images={e.beyond.skillImages} tone="dark" />

      <Signpost id="choose" division="education" heading={e.choose.heading} intro={e.choose.intro} rows={e.choose.rows} services={e.programmes} tone="light" />

      {/* Real reviews from Studio; hidden until there is one. Heading: DRAFT copy. */}
      <Reviews id="reviews" eyebrow="Reviews" heading="What learners and parents say" reviews={reviews} tone="dark" />

      <WhyChoose
        id="why-choose-us"
        eyebrow={e.why.eyebrow}
        heading={e.why.title}
        intro={e.why.intro}
        items={e.why.reasons}
        closingHeading={e.why.closingHeading}
        closing={e.why.closing}
        signoff={e.why.signoff}
        tone="light"
      />

      <CtaBand
        id="next-step"
        eyebrow={e.eyebrow}
        heading={e.cta.heading}
        paragraphs={e.cta.paragraphs}
        signoff={e.cta.signoff}
        primary={e.cta.primary}
        secondary={e.cta.secondary}
      />
    </>
  );
}

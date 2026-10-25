import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import PageHero from '@/components/sections/PageHero';
import Approach from '@/components/sections/Approach';
import { Statement, WhyChoose } from '@/components/sections/Blocks';
import ServiceCards from '@/components/sections/ServiceCards';
import CtaBand from '@/components/sections/CtaBand';
import Signpost from '@/components/sections/Signpost';
import Faq from '@/components/sections/Faq';
import { getEducation } from '@/lib/cms';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const e = await getEducation();
  return pageMetadata({ title: e.seo.title, description: e.seo.description, path: '/education' });
}

export default async function EducationPage() {
  const e = await getEducation();
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
        chips={e.hero.chips}
      />

      <Approach
        id="about"
        tone="dark"
        heading={e.about.heading}
        paragraphs={e.about.paragraphs}
        link={{ label: e.about.link, href: '/education#why-choose-us' }}
        image={e.about.image}
        pill={e.about.pill}
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
        aside={e.programmesAside}
        items={e.programmes}
        tone="light"
        cta={e.programmesCta}
      />

      <Statement id="approach" eyebrow={e.approach.heading} quote={e.approach.quote} paragraphs={e.approach.paragraphs} tone="light" />

      <section id="beyond" className="section" data-tone="dark" aria-labelledby="beyond-title">
        <div className="container two-up">
          <div className="section-head" style={{ marginBottom: 0 }}>
            <h2 id="beyond-title" className="h2" data-split>
              {e.beyond.heading}
            </h2>
            <div className="chips" data-reveal-group data-stagger="0.05">
              {e.beyond.skills.map((s) => (
                <span key={s} className="chip chip--solid">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="split__body" data-reveal-group>
            {e.beyond.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <Signpost id="choose" division="education" heading={e.choose.heading} intro={e.choose.intro} rows={e.choose.rows} services={e.programmes} tone="light" />

      <section id="questions" className="section section--flush-top" data-tone="light" aria-labelledby="faq-title">
        <div className="container">
          <div className="section-head">
            <h2 id="faq-title" className="h2" data-split>
              Common questions
            </h2>
          </div>
          <div data-reveal>
            <Faq items={e.faqs} askHref="/contact?division=education" />
          </div>
        </div>
      </section>

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

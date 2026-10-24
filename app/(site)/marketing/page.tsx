import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import PageHero from '@/components/sections/PageHero';
import { SplitSection, Statement, Steps, WhyChoose } from '@/components/sections/Blocks';
import ServiceCards from '@/components/sections/ServiceCards';
import CtaBand from '@/components/sections/CtaBand';
import Signpost from '@/components/sections/Signpost';
import Faq from '@/components/sections/Faq';
import { ArrowLink } from '@/components/ui/Button';
import { getMarketing } from '@/lib/cms';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const m = await getMarketing();
  return pageMetadata({ title: m.seo.title, description: m.seo.description, path: '/marketing' });
}

export default async function MarketingPage() {
  const m = await getMarketing();
  return (
    <>
      <BreadcrumbJsonLd crumbs={[{ name: 'Marketing', path: '/marketing' }]} />
      <PageHero
        eyebrow={m.eyebrow}
        title={m.title}
        lead={m.lead}
        tone="light"
        primary={m.hero.primary}
        secondary={m.hero.secondary}
        image={m.hero.image}
        chips={m.hero.chips}
      />

      <SplitSection
        id="about"
        eyebrow="About us"
        heading={m.about.heading}
        paragraphs={m.about.paragraphs}
        tone="light"
        aside={
          <div data-reveal>
            <ArrowLink href="/marketing#why-choose-us">{m.about.link}</ArrowLink>
          </div>
        }
      />

      <ServiceCards
        id="services"
        division="marketing"
        heading={m.servicesHeading}
        highlight={m.servicesHighlight}
        intro={m.servicesIntro}
        aside={m.servicesAside}
        items={m.services}
        tone="light"
        cta={m.servicesCta}
      />

      <Steps id="how-we-work" eyebrow={m.how.heading} heading={m.how.title} intro={m.how.intro} steps={m.how.steps} outro={m.how.outro} tone="light" />

      <SplitSection
        id="who"
        eyebrow={m.who.heading}
        heading={m.who.title}
        paragraphs={m.who.paragraphs}
        tone="light"
        aside={
          <ul className="chips" data-reveal-group data-stagger="0.05" style={{ marginTop: '0.5rem' }}>
            {m.who.stages.map((s) => (
              <li key={s} className="chip">
                {s}
              </li>
            ))}
          </ul>
        }
      />

      <Statement id="philosophy" eyebrow={m.philosophy.heading} quote={m.philosophy.quote} paragraphs={m.philosophy.paragraphs} tone="dark" />

      <Signpost id="choose" division="marketing" heading={m.choose.heading} intro={m.choose.intro} rows={m.choose.rows} services={m.services} tone="light" />

      <section id="questions" className="section section--flush-top" data-tone="light" aria-labelledby="faq-title">
        <div className="container">
          <div className="section-head">
            <h2 id="faq-title" className="h2" data-split>
              Common questions
            </h2>
          </div>
          <div data-reveal>
            <Faq items={m.faqs} askHref="/contact?division=marketing" />
          </div>
        </div>
      </section>

      <WhyChoose
        id="why-choose-us"
        eyebrow={m.why.eyebrow}
        heading={m.why.title}
        intro={m.why.intro}
        items={m.why.reasons}
        closingHeading={m.why.closingHeading}
        closing={m.why.closing}
        signoff={m.why.signoff}
        tone="light"
      />

      <CtaBand
        id="next-step"
        eyebrow={m.eyebrow}
        heading={m.cta.heading}
        paragraphs={m.cta.paragraphs}
        signoff={m.cta.signoff}
        primary={m.cta.primary}
        secondary={m.cta.secondary}
      />
    </>
  );
}

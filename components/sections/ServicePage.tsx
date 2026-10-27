import { JsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';
import PageHero from '@/components/sections/PageHero';
import ServiceCards from '@/components/sections/ServiceCards';
import { Statement } from '@/components/sections/Blocks';
import CtaBand from '@/components/sections/CtaBand';
import Faq from '@/components/sections/Faq';
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
  statement: { heading: string; quote: string; paragraphs: string[] };
  cta: { heading: string; paragraphs: string[]; signoff?: string; primary: { label: string; href: string }; secondary?: { label: string; href: string } };
};

/**
 * Detail page for one programme (Education) or service (Marketing):
 * hero, who it's for + detail, at a glance, questions, approach, other items, call to action.
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
              {division === 'education' ? 'What it offers, and who it’s for' : 'What it covers, and who it’s for'}
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
        </div>
      </section>

      {s.highlights?.length ? (
        <section id="at-a-glance" className="section section--flush-top" data-tone={sectionTone} aria-labelledby="glance-title">
          <div className="container">
            <div className="section-head">
              <h2 id="glance-title" className="h3" data-reveal>
                At a glance
              </h2>
            </div>
            <ol className="reasons reasons--compact">
              {s.highlights.map((h, i) => (
                <li key={h} className="reason reason--compact" data-reveal>
                  <span className="reason__num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="h3">{h}</h3>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      <Statement id="approach" eyebrow={statement.heading} quote={statement.quote} paragraphs={statement.paragraphs.slice(0, 2)} tone={altTone} />

      {faqs.length ? (
        <section id="questions" className="section" data-tone={sectionTone} aria-labelledby="faq-title">
          <div className="container">
            <div className="section-head">
              <h2 id="faq-title" className="h2" data-split>
                Common questions
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

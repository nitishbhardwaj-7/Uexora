import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import ContactForm from '@/components/ContactForm';
import Monogram from '@/components/brand/Monogram';
import { getContact, getSettings } from '@/lib/cms';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const c = await getContact();
  return pageMetadata({ title: c.seo.title, description: c.seo.description, path: '/contact' });
}

/** Contact: the headline, then the direct addresses beside the form. */
export default async function ContactPage({ searchParams }: { searchParams: Promise<{ division?: string }> }) {
  const [c, s, { division }] = await Promise.all([getContact(), getSettings(), searchParams]);
  const initial = division === 'education' || division === 'marketing' ? division : 'general';
  const direct = [
    { label: 'General', value: s.email, href: `mailto:${s.email}` },
    { label: 'Uexora Education', value: s.educationEmail, href: `mailto:${s.educationEmail}` },
    { label: 'Uexora Marketing Studio', value: s.marketingEmail, href: `mailto:${s.marketingEmail}` },
    ...(s.phone ? [{ label: 'Phone', value: s.phone, href: `tel:${s.phone.replace(/\s+/g, '')}` }] : []),
  ];

  return (
    <>
      <BreadcrumbJsonLd crumbs={[{ name: 'Contact', path: '/contact' }]} />

      <section className="page-hero contact-hero" data-tone="light" aria-labelledby="page-title">
        <Monogram className="page-hero__mark" variant="mono" style={{ color: 'var(--blue-700)' }} />
        <div className="container">
          <div className="page-hero__copy contact-hero__copy">
            <h1 id="page-title" className="h1" data-split data-split-delay="0.1">
              {c.title}
            </h1>
            <p className="lead" data-reveal data-reveal-delay="0.2">
              {c.lead}
            </p>
          </div>
        </div>
      </section>

      <section id="enquire" className="section section--flush-top" data-tone="light" aria-labelledby="enquire-title">
        <div className="container contact">
          <aside className="contact__rail" data-reveal>
            <div className="contact__block">
              <h2 className="contact__h">Write directly</h2>
              <ul className="cdirect">
                {direct.map((d) => (
                  <li key={d.label} className="cdirect__row">
                    <span className="cdirect__label">{d.label}</span>
                    <a className="cdirect__value" href={d.href}>
                      {d.value}
                    </a>
                  </li>
                ))}
                <li className="cdirect__row">
                  <span className="cdirect__label">Hours</span>
                  <span className="cdirect__value">{s.hours}</span>
                </li>
              </ul>
            </div>
          </aside>

          <div className="contact__form" data-reveal data-reveal-delay="0.15">
            <h2 id="enquire-title" className="contact__form-title">
              {c.formHeading}
            </h2>
            {/* keyed so moving between contact links (e.g. menu after a division page) starts afresh */}
            <ContactForm key={initial} initialDivision={initial} email={s.email} note={c.formNote} />
          </div>
        </div>
      </section>
    </>
  );
}

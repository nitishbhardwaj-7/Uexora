import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import DemoClassForm from '@/components/DemoClassForm';
import Monogram from '@/components/brand/Monogram';
import { getEducation, getSettings } from '@/lib/cms';
import { pageMetadata } from '@/lib/seo';
import { demoClass } from '@/content/demo';

export const metadata: Metadata = pageMetadata({ title: demoClass.seo.title, description: demoClass.seo.description, path: '/book-demo' });

/** Book a free demo class: laid out like the contact page. A programme page's button names its programme in the link. */
export default async function BookDemoPage({ searchParams }: { searchParams: Promise<{ programme?: string; course?: string }> }) {
  const [s, e, { programme, course }] = await Promise.all([getSettings(), getEducation(), searchParams]);
  // Only a real programme title, and a real course within it (a slide on its page), are taken from the link.
  const found = e.programmes.find((p) => p.title === programme);
  const chosen = found?.title;
  const chosenCourse = found?.courses?.courseSlides?.find((c) => c.title === course)?.title;
  const inbox = s.educationEmail || s.email;

  return (
    <>
      <BreadcrumbJsonLd crumbs={[{ name: demoClass.title, path: '/book-demo' }]} />

      <section id="demo" className="page-hero contact-hero" data-tone="light" aria-labelledby="page-title">
        <Monogram className="page-hero__mark" variant="mono" style={{ color: 'var(--blue-700)' }} />
        <div className="container contact">
          <div className="page-hero__copy contact-hero__copy">
            <h1 id="page-title" className="h1" data-split data-split-delay="0.1">
              {demoClass.title}
            </h1>
            <p className="lead" data-reveal data-reveal-delay="0.2">
              {demoClass.lead}
            </p>
          </div>

          <aside className="contact__rail" data-reveal>
            <div className="contact__block">
              <h2 className="contact__h">Write directly</h2>
              <ul className="cdirect">
                <li className="cdirect__row">
                  <span className="cdirect__label">Uexora Education</span>
                  <a className="cdirect__value" href={`mailto:${inbox}`}>
                    {inbox}
                  </a>
                </li>
                <li className="cdirect__row">
                  <span className="cdirect__label">Hours</span>
                  <span className="cdirect__value">{s.hours}</span>
                </li>
              </ul>
            </div>
          </aside>

          <div className="contact__form" data-reveal data-reveal-delay="0.25">
            <h2 className="contact__form-title">{demoClass.formHeading}</h2>
            <DemoClassForm key={`${chosen}|${chosenCourse}`} programme={chosen} course={chosenCourse} email={inbox} note={demoClass.note} />
          </div>
        </div>
      </section>
    </>
  );
}

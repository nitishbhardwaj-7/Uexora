import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServicePage from '@/components/sections/ServicePage';
import { getEducation } from '@/lib/cms';
import { findService, serviceDescription, servicePath, serviceTitle } from '@/lib/cms/services';
import { pageMetadata } from '@/lib/seo';

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const e = await getEducation();
  return e.programmes.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const d = await getEducation();
  const s = findService(d.programmes, slug);
  if (!s) return {};
  return pageMetadata({
    title: serviceTitle(s, 'education'),
    description: serviceDescription(s),
    path: servicePath('education', slug),
    image: s.image ? { url: s.image.src, alt: s.image.alt } : null,
  });
}

export default async function EducationServicePage({ params }: Params) {
  const { slug } = await params;
  const e = await getEducation();
  const s = findService(e.programmes, slug);
  if (!s) notFound();
  return <ServicePage division="education" service={s} all={e.programmes} statement={e.approach} cta={e.cta} />;
}

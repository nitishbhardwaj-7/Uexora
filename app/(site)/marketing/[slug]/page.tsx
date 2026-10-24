import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServicePage from '@/components/sections/ServicePage';
import { getMarketing } from '@/lib/cms';
import { findService, serviceDescription, servicePath, serviceTitle } from '@/lib/cms/services';
import { pageMetadata } from '@/lib/seo';

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const m = await getMarketing();
  return m.services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const d = await getMarketing();
  const s = findService(d.services, slug);
  if (!s) return {};
  return pageMetadata({
    title: serviceTitle(s, 'marketing'),
    description: serviceDescription(s),
    path: servicePath('marketing', slug),
    image: s.image ? { url: s.image.src, alt: s.image.alt } : null,
  });
}

export default async function MarketingServicePage({ params }: Params) {
  const { slug } = await params;
  const m = await getMarketing();
  const s = findService(m.services, slug);
  if (!s) notFound();
  return <ServicePage division="marketing" service={s} all={m.services} statement={m.philosophy} cta={m.cta} />;
}

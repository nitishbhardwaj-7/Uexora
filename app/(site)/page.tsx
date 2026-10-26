import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import Showcase from '@/components/home/Showcase';
import Divisions from '@/components/home/Divisions';
import Purpose from '@/components/home/Purpose';
import Marquee from '@/components/home/Marquee';
import CtaBand from '@/components/sections/CtaBand';
import { getEducation, getHome, getMarketing } from '@/lib/cms';
import { heroSlides } from '@/lib/cms/services';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const h = await getHome();
  return pageMetadata({ title: h.seo.title, description: h.seo.description, path: '/' });
}

export default async function HomePage() {
  const [h, e, m] = await Promise.all([getHome(), getEducation(), getMarketing()]);
  // Each division panel cycles through that division's programme / service photos.
  const divisionPhotos = {
    education: heroSlides('education', e.programmes).map(({ src, alt }) => ({ src, alt })),
    marketing: heroSlides('marketing', m.services).map(({ src, alt }) => ({ src, alt })),
  };
  return (
    <>
      <Hero content={h.hero} />
      <Showcase content={h.showcase} />
      <Divisions content={h.divisions} photos={divisionPhotos} />
      <Marquee items={h.marquee} tone="dark" />
      <Purpose
        content={h.purpose}
        education={h.purpose.educationImage}
        marketing={h.purpose.marketingImage}
      />
      <CtaBand id="next-step" heading={h.cta.heading} paragraphs={h.cta.paragraphs} primary={h.cta.primary} secondary={h.cta.secondary} />
    </>
  );
}

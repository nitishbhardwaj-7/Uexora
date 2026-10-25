import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import Showcase from '@/components/home/Showcase';
import Divisions from '@/components/home/Divisions';
import Purpose from '@/components/home/Purpose';
import Marquee from '@/components/home/Marquee';
import CtaBand from '@/components/sections/CtaBand';
import { getHome } from '@/lib/cms';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const h = await getHome();
  return pageMetadata({ title: h.seo.title, description: h.seo.description, path: '/' });
}

export default async function HomePage() {
  const h = await getHome();
  return (
    <>
      <Hero content={h.hero} />
      <Showcase content={h.showcase} />
      <Divisions content={h.divisions} />
      <Marquee items={h.marquee} tone="dark" />
      <Purpose
        content={h.purpose}
        education={h.divisions.panels.find((p) => p.key === 'education')?.image}
        marketing={h.divisions.panels.find((p) => p.key === 'marketing')?.image}
      />
      <CtaBand id="next-step" heading={h.cta.heading} paragraphs={h.cta.paragraphs} primary={h.cta.primary} secondary={h.cta.secondary} />
    </>
  );
}

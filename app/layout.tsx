import type { Metadata, Viewport } from 'next';
import { Manrope, Poppins } from 'next/font/google';
import './globals.css';
import { site } from '@/lib/site';
import { getSettings } from '@/lib/cms';

/*
 * Type roles (see the :root variables in globals.css):
 *   headings     --font-heading  Black Mango once its licensed web files are added; Manrope until then
 *   subheadings  --font-sub      Poppins
 *   body         --font-body     Manifold once its licensed web files are added; Manrope until then
 * To switch, put the .woff2 files in app/fonts/, load them with next/font/local here, and point
 * --font-heading / --font-body at their variables.
 */
const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

export const viewport: Viewport = {
  themeColor: '#06103a',
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  const title = 'UEXORA — Technology That Puts You First';
  return {
    metadataBase: new URL(site.url),
    title: { default: title, template: '%s | UEXORA' },
    description: s.description,
    keywords: [
      'Uexora',
      'Uexora Education',
      'Uexora Marketing Studio',
      'academic support',
      'school tuition',
      'JEE preparation',
      'NEET preparation',
      'IELTS',
      'PTE',
      'TOEFL',
      'AI coding robotics for students',
      'public speaking for students',
      'digital marketing agency',
      'SEO',
      'paid advertising',
      'social media marketing',
      'website design and development',
      'AI-powered marketing',
    ],
    authors: [{ name: site.legalName }],
    creator: site.legalName,
    publisher: site.legalName,
    alternates: { canonical: '/' },
    openGraph: { type: 'website', siteName: site.name, locale: 'en_GB', url: '/', title, description: s.description },
    twitter: { card: 'summary_large_image', title, description: s.description },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
    },
  };
}

/** Structured data for the organisation; the contact details and description come from the site settings. */
function structuredData(s: Awaited<ReturnType<typeof getSettings>>) {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    logo: `${site.url}/brand/icon-512.png`,
    slogan: s.tagline,
    description: s.description,
    email: s.email,
    ...(s.phone ? { telephone: s.phone } : {}),
    department: [
      {
        '@type': 'EducationalOrganization',
        name: 'Uexora Education',
        url: `${site.url}/education`,
        description:
          'Academic support and school tuition, competitive exam preparation (JEE, NEET), IELTS/PTE/TOEFL and overseas education guidance, AI, coding and robotics, communication and public speaking, practical skills and inclusive learning support.',
      },
      {
        '@type': 'ProfessionalService',
        name: 'Uexora Marketing Studio',
        url: `${site.url}/marketing`,
        description:
          'Digital marketing strategy, SEO, paid advertising and lead generation, social media marketing, website design and development, and AI-powered marketing solutions.',
      },
    ],
  };
  const website = { '@context': 'https://schema.org', '@type': 'WebSite', name: site.name, url: site.url, inLanguage: 'en' };
  return [organization, website];
}

/**
 * Root layout: document shell only. The site chrome (intro loader, header, footer,
 * scroll effects) lives in app/(site)/layout.tsx so the content studio at /studio
 * renders without it.
 */
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const s = await getSettings();
  return (
    <html lang="en" className={`${manrope.variable} ${poppins.variable}`} suppressHydrationWarning>
      <head>
        {/* Lets CSS stage the hero entrances before hydration; without JavaScript everything stays visible. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {structuredData(s).map((data, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
        ))}
      </head>
      <body>{children}</body>
    </html>
  );
}

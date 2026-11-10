/**
 * Fixed site facts and navigation. Everything an editor may change (contact details,
 * tagline, description, page copy) lives in content/ and is editable in the studio;
 * read it through lib/cms.
 */
/**
 * The public address every canonical link, sitemap entry, share image and structured-data URL is
 * built on. NEXT_PUBLIC_SITE_URL wins when it is set; otherwise, on Vercel, the project's
 * production domain (VERCEL_PROJECT_PRODUCTION_URL, which becomes the custom domain once one is
 * attached), so search engines are never pointed at a domain that does not serve this site.
 */
function siteUrl() {
  const set = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (set) return set.replace(/\/+$/, '');
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel.replace(/^https?:\/\//, '').replace(/\/+$/, '')}`;
  return 'https://uexora.com';
}

export const site = {
  name: 'UEXORA',
  legalName: 'Uexora',
  url: siteUrl(),
};

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Education', href: '/education' },
  { label: 'Marketing', href: '/marketing' },
  { label: 'Contact', href: '/contact' },
];

/** Added to the navigation (before Contact) once the blog has a published post. */
export const blogNav = { label: 'Blog', href: '/blog' };

export const menu = [
  {
    heading: 'Uexora Education',
    href: '/education',
    /** Shown beside the links when Education is hovered in the menu (decorative). */
    image: '/images/sections/purpose-education.jpg',
    /** Crop focus for the landscape frame (the photo is portrait). */
    imagePosition: '50% 30%',
    links: [
      { label: 'About', href: '/education#about' },
      { label: 'What we do', href: '/education#programmes' },
      { label: 'Beyond the classroom', href: '/education#beyond' },
      { label: 'Why choose us', href: '/education#why-choose-us' },
    ],
  },
  {
    heading: 'Uexora Marketing Studio',
    href: '/marketing',
    image: '/images/sections/menu-marketing.jpg',
    imagePosition: '50% 50%',
    links: [
      { label: 'About', href: '/marketing#about' },
      { label: 'What we do', href: '/marketing#services' },
      { label: 'How we work', href: '/marketing#how-we-work' },
      { label: 'Why choose us', href: '/marketing#why-choose-us' },
    ],
  },
];

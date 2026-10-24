/**
 * Fixed site facts and navigation. Everything an editor may change (contact details,
 * tagline, description, page copy) lives in content/ and is editable in the studio;
 * read it through lib/cms.
 */
export const site = {
  name: 'UEXORA',
  legalName: 'Uexora',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://uexora.com',
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
    links: [
      { label: 'About', href: '/education#about' },
      { label: 'What we do', href: '/education#programmes' },
      { label: 'Our approach', href: '/education#approach' },
      { label: 'Why choose us', href: '/education#why-choose-us' },
    ],
  },
  {
    heading: 'Uexora Marketing Studio',
    href: '/marketing',
    links: [
      { label: 'About', href: '/marketing#about' },
      { label: 'What we do', href: '/marketing#services' },
      { label: 'How we work', href: '/marketing#how-we-work' },
      { label: 'Why choose us', href: '/marketing#why-choose-us' },
    ],
  },
];

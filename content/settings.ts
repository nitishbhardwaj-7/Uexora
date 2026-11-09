/**
 * Editable site settings: the fallback (and seed) for the Sanity `siteSettings` document.
 * Brand name, legal name and the public URL stay in lib/site.ts (they are not editable).
 */
export const settings = {
  tagline: 'Technology that puts you first.',
  description:
    'UEXORA brings two divisions together under one belief: your growth matters. Uexora Education supports learners from school tuition to AI and robotics; Uexora Marketing Studio helps businesses build a stronger digital presence.',
  // TODO(client): replace with the real contact details before launch (or edit them in the studio).
  email: 'hello@uexora.com',
  educationEmail: 'education@uexora.com',
  marketingEmail: 'studio@uexora.com',
  phone: '',
  hours: 'Monday to Saturday, 09:00 – 19:00',
  // TODO(client): placeholders (each network's home page) until the real profile links are added in the studio.
  // WhatsApp takes a chat link such as https://wa.me/91XXXXXXXXXX and drives the floating button
  // only; the others are the footer icons. Clear a link to hide its button or icon.
  whatsapp: 'https://www.whatsapp.com/',
  instagram: 'https://www.instagram.com/',
  facebook: 'https://www.facebook.com/',
  linkedin: 'https://www.linkedin.com/',
  youtube: 'https://www.youtube.com/',
  tiktok: 'https://www.tiktok.com/',
  footerStatement: 'Two distinct divisions. One shared belief:',
  footerStatementStrong: 'your growth matters.',
  /** The scrolling strip under the navigation; switched on and off in the studio. */
  announcementOn: true,
  // Placeholder messages (the services already on the site) until real announcements are added.
  announcements: [
    { text: 'School tuition', href: '/education#programmes' },
    { text: 'JEE & NEET preparation', href: '/education#programmes' },
    { text: 'IELTS · PTE · TOEFL', href: '/education#programmes' },
    { text: 'AI, coding & robotics', href: '/education#programmes' },
    { text: 'AI for professionals', href: '/education#programmes' },
    { text: 'Digital marketing that grows your business', href: '/marketing#services' },
  ] as { text: string; href?: string }[],
};

export type SettingsContent = typeof settings;

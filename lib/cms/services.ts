import type { Service } from '@/content/types';

export type Division = 'education' | 'marketing';

/** Fixed wording for each division's service pages (not editable; the content itself is). */
export const divisionMeta: Record<
  Division,
  { name: string; unit: string; units: string; path: string; listAnchor: string; schemaType: 'EducationalOrganization' | 'ProfessionalService' }
> = {
  education: { name: 'Uexora Education', unit: 'programme', units: 'programmes', path: '/education', listAnchor: '/education#programmes', schemaType: 'EducationalOrganization' },
  marketing: { name: 'Uexora Marketing Studio', unit: 'service', units: 'services', path: '/marketing', listAnchor: '/marketing#services', schemaType: 'ProfessionalService' },
};

export const servicePath = (division: Division, slug: string) => `${divisionMeta[division].path}/${slug}`;

export const findService = (list: Service[], slug: string) => list.find((s) => s.slug === slug);

/** Meta description: the editor's text if set, otherwise the intro trimmed to a sentence boundary near 155 characters. */
export function serviceDescription(s: Service): string {
  if (s.seo?.description) return s.seo.description;
  const text = s.text.replace(/\s+/g, ' ').trim();
  if (text.length <= 160) return text;
  const cut = text.slice(0, 160);
  const end = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '), cut.lastIndexOf('? '));
  return end > 60 ? cut.slice(0, end + 1) : cut.slice(0, cut.lastIndexOf(' ')) + '…';
}

export const serviceTitle = (s: Service, division: Division) => s.seo?.title || `${s.title} — ${divisionMeta[division].name}`;

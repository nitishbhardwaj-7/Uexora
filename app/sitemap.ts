import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { getEducation, getMarketing } from '@/lib/cms';
import { servicePath } from '@/lib/cms/services';
import { getPosts, postPath } from '@/lib/cms/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [e, m, posts] = await Promise.all([getEducation(), getMarketing(), getPosts()]);
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: 'weekly' | 'monthly' = 'monthly') => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });
  return [
    page('/', 1, 'weekly'),
    page('/education', 0.9),
    page('/marketing', 0.9),
    ...e.programmes.map((p) => page(servicePath('education', p.slug), 0.7)),
    ...m.services.map((s) => page(servicePath('marketing', s.slug), 0.7)),
    page('/contact', 0.8),
    ...(posts.length ? [page('/blog', 0.7, 'weekly')] : []),
    ...posts.map((p) => ({ url: `${site.url}${postPath(p.slug)}`, lastModified: new Date(p.publishedAt), changeFrequency: 'monthly' as const, priority: 0.6 })),
  ];
}

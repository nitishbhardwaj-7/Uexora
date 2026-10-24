import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { getSettings } from '@/lib/cms';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const s = await getSettings();
  return {
    name: site.name,
    short_name: site.name,
    description: s.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#06103a',
    theme_color: '#06103a',
    icons: [
      { src: '/brand/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/brand/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}

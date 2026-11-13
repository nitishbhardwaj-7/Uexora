import type { ImageLoaderProps } from 'next/image';

/**
 * next/image loader for photos that may come from Sanity. Sanity's CDN resizes and
 * converts them itself (w, q, auto=format), so the Next optimizer never has to proxy a
 * remote host. Local files in /public keep going through the Next optimizer.
 */
export function cmsImageLoader({ src, width, quality }: ImageLoaderProps): string {
  if (src.startsWith('https://cdn.sanity.io/')) {
    const url = new URL(src);
    url.searchParams.set('w', String(width));
    url.searchParams.set('q', String(quality ?? 80));
    url.searchParams.set('auto', 'format');
    url.searchParams.set('fit', 'max');
    return url.toString();
  }
  // Pexels (the dev-only placeholder avatars): its CDN resizes and crops to a square itself.
  if (src.startsWith('https://images.pexels.com/')) {
    const url = new URL(src);
    url.search = '';
    url.searchParams.set('auto', 'compress');
    url.searchParams.set('cs', 'tinysrgb');
    url.searchParams.set('w', String(width));
    url.searchParams.set('h', String(width));
    url.searchParams.set('fit', 'crop');
    return url.toString();
  }
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality ?? 75}`;
}

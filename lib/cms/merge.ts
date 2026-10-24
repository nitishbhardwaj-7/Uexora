import { imageUrl } from './client';

type Rec = Record<string, unknown>;

const isObject = (v: unknown): v is Rec => typeof v === 'object' && v !== null && !Array.isArray(v);

/** A Sanity image value (an uploaded asset plus our `alt` field). */
const isSanityImage = (v: unknown): v is Rec & { asset?: Rec | null; alt?: string } => isObject(v) && 'asset' in v;

/**
 * Lays a Sanity document over the default content from content/:
 *  - every field the editor filled in wins;
 *  - empty fields (null, empty string, empty array, no image) fall back to the default;
 *  - uploaded images become `{ src, alt }` like the local defaults;
 *  - Sanity bookkeeping (`_id`, `_key`, …) is dropped.
 * The result always has the full shape of the default, so components never see holes.
 */
export function overlay<T>(defaults: T, doc: unknown): T {
  if (!isObject(doc) || !isObject(defaults)) return defaults;
  const out: Rec = { ...(defaults as Rec) };
  for (const [key, value] of Object.entries(doc)) {
    if (key.startsWith('_')) continue;
    const base = out[key];
    if (value === null || value === undefined || value === '') continue;

    if (isSanityImage(value)) {
      const src = value.asset ? imageUrl(value as never) : null;
      if (!src) continue;
      const fallback = isObject(base) ? base : {};
      out[key] = { ...fallback, src, alt: typeof value.alt === 'string' && value.alt ? value.alt : (fallback.alt as string) || '' };
      continue;
    }

    if (Array.isArray(value)) {
      if (value.length === 0) continue;
      const baseArr = Array.isArray(base) ? base : [];
      out[key] = value.map((entry, i) => (isObject(entry) ? overlay(isObject(baseArr[i]) ? baseArr[i] : {}, entry) : entry));
      continue;
    }

    if (isObject(value)) {
      out[key] = overlay(isObject(base) ? base : {}, value);
      continue;
    }

    out[key] = value;
  }
  return out as T;
}

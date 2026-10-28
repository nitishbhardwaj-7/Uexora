/**
 * Loads the default content from content/ into the Sanity project as the six
 * singleton documents (blog posts are seeded separately by seed-blog.ts), uploading the local photos as image assets.
 *
 * Run once after creating the project (and again any time you want to reset the
 * studio to the bundled copy):
 *
 *   npm run cms:seed
 *
 * Needs NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and a
 * SANITY_API_WRITE_TOKEN (Editor role) in .env.local. Existing documents are replaced.
 */
import { createReadStream, existsSync } from 'node:fs';
import { basename, join } from 'node:path';
import { createClient } from '@sanity/client';
import { settings } from '../content/settings.ts';
import { home } from '../content/home.ts';
import { education } from '../content/education.ts';
import { marketing } from '../content/marketing.ts';
import { contact } from '../content/contact.ts';
import { blog } from '../content/blog.ts';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !token) {
  console.error('Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local first.');
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: '2026-10-01', useCdn: false });
const publicDir = join(process.cwd(), 'public');

type Rec = Record<string, unknown>;
const isObject = (v: unknown): v is Rec => typeof v === 'object' && v !== null && !Array.isArray(v);

/** Array fields whose entries are objects need a `_type` (and a `_key`) in Sanity. */
const arrayTypes: Record<string, string> = {
  programmes: 'service',
  services: 'service',
  reasons: 'item',
  steps: 'item',
  panels: 'panel',
  faqs: 'faq',
  rows: 'signpost',
  announcements: 'announcement',
  stages: 'gradeStage',
  boards: 'curriculum',
};

const assetCache = new Map<string, string>();

/** Uploads a file from public/ once and returns the asset reference. */
async function uploadImage(src: string): Promise<string | null> {
  if (assetCache.has(src)) return assetCache.get(src)!;
  // Fall back to a JPEG/WebP sibling if the exact file is missing.
  const candidates = [src, src.replace(/\.avif$/, '.jpg'), src.replace(/\.avif$/, '.webp')];
  const file = candidates.map((c) => join(publicDir, c)).find((p) => existsSync(p));
  if (!file) {
    console.warn(`  ! ${src} not found in public/, leaving the image empty (the site keeps its bundled photo).`);
    return null;
  }
  try {
    const asset = await client.assets.upload('image', createReadStream(file), { filename: basename(file) });
    assetCache.set(src, asset._id);
    console.log(`  ↑ ${basename(file)}`);
    return asset._id;
  } catch (err) {
    console.warn(`  ! Could not upload ${basename(file)}: ${(err as Error).message}`);
    return null;
  }
}

/** Converts a default-content object into a Sanity document body. */
async function toSanity(value: unknown, key = ''): Promise<unknown> {
  if (Array.isArray(value)) {
    const out = [];
    for (let i = 0; i < value.length; i++) {
      const entry = await toSanity(value[i], key);
      out.push(isObject(entry) ? { _key: `${key}-${i}`, _type: arrayTypes[key] || 'object', ...entry } : entry);
    }
    return out;
  }
  if (isObject(value)) {
    // { src, alt } → uploaded image
    if (typeof value.src === 'string' && 'alt' in value) {
      const id = await uploadImage(value.src);
      return id ? { _type: 'image', asset: { _type: 'reference', _ref: id }, alt: value.alt } : undefined;
    }
    const out: Rec = {};
    for (const [k, v] of Object.entries(value)) {
      const converted = await toSanity(v, k);
      if (converted !== undefined) out[k] = converted;
    }
    return out;
  }
  return value;
}

const docs: [string, unknown][] = [
  ['siteSettings', settings],
  ['homePage', home],
  ['educationPage', education],
  ['marketingPage', marketing],
  ['contactPage', contact],
  ['blogPage', blog],
];

for (const [type, content] of docs) {
  console.log(`${type}`);
  const body = (await toSanity(content)) as Rec;
  await client.createOrReplace({ _id: type, _type: type, ...body });
  console.log(`  ✓ published`);
}
console.log(`\nDone. Open /studio to edit.`);

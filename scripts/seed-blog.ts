/**
 * Creates the `blogPage` copy in the Sanity project if it is missing, without touching
 * any other document. The first articles are seeded by seed-blog-articles.ts.
 *
 *   npm run cms:seed-blog
 *
 * Needs NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local.
 */
import { createClient } from '@sanity/client';
import { blog } from '../content/blog.ts';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !token) {
  console.error('Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local first.');
  process.exit(1);
}
const client = createClient({ projectId, dataset, token, apiVersion: '2026-10-01', useCdn: false });

await client.createIfNotExists({ _id: 'blogPage', _type: 'blogPage', ...blog });
console.log('blogPage  ✓ (kept if it already existed)');
console.log('\nDone. Articles: node --experimental-strip-types --env-file=.env.local scripts/seed-blog-articles.ts');

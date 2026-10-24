/**
 * Sanity connection settings, shared by the studio, the site and the seed script.
 * Leave the project id unset to run the site from the files in content/ only.
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-10-01';
export const studioBasePath = '/studio';

/** True when a Sanity project is configured; the site then reads content from it. */
export const sanityEnabled = projectId.length > 0;

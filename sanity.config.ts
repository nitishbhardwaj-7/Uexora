import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { apiVersion, dataset, projectId, studioBasePath } from './sanity/env';
import { schemaTypes, singletonTypes } from './sanity/schemaTypes';
import { structure } from './sanity/structure';

const singletonActions = new Set(['publish', 'discardChanges', 'restore', 'unpublish']);
/** Enquiries arrive from the contact form: they can be updated (status, notes) and deleted, never created or duplicated here. */
const enquiryActions = new Set(['publish', 'discardChanges', 'delete']);

export default defineConfig({
  name: 'uexora',
  title: 'UEXORA',
  basePath: studioBasePath,
  projectId: projectId || 'unconfigured',
  dataset,
  schema: {
    types: schemaTypes,
    // Singletons are opened from the sidebar, never created from the "new document" menu.
    templates: (templates) => templates.filter((t) => !singletonTypes.has(t.schemaType) && t.schemaType !== 'enquiry'),
  },
  document: {
    actions: (prev, { schemaType }) => {
      if (singletonTypes.has(schemaType)) return prev.filter(({ action }) => action && singletonActions.has(action));
      if (schemaType === 'enquiry') return prev.filter(({ action }) => action && enquiryActions.has(action));
      return prev;
    },
  },
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
});

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { apiVersion, dataset, projectId, studioBasePath } from './sanity/env';
import { schemaTypes, singletonTypes } from './sanity/schemaTypes';
import { structure } from './sanity/structure';

const singletonActions = new Set(['publish', 'discardChanges', 'restore', 'unpublish']);

export default defineConfig({
  name: 'uexora',
  title: 'UEXORA',
  basePath: studioBasePath,
  projectId: projectId || 'unconfigured',
  dataset,
  schema: {
    types: schemaTypes,
    // Singletons are opened from the sidebar, never created from the "new document" menu.
    templates: (templates) => templates.filter((t) => !singletonTypes.has(t.schemaType)),
  },
  document: {
    actions: (prev, { schemaType }) => (singletonTypes.has(schemaType) ? prev.filter(({ action }) => action && singletonActions.has(action)) : prev),
  },
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
});

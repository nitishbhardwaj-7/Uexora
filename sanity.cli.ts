import { defineCliConfig } from 'sanity/cli';
import { dataset, projectId } from './sanity/env';

/** For `npx sanity ...` commands (e.g. `npx sanity manage`, `npx sanity dataset export`). */
export default defineCliConfig({ api: { projectId, dataset } });

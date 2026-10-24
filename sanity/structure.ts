import type { StructureResolver } from 'sanity/structure';
import { singletons } from './schemaTypes';

/** Studio sidebar: one entry per page plus the site settings, then the blog's posts and categories. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      ...singletons.map((s) => S.listItem().title(s.title).id(s.type).child(S.document().schemaType(s.type).documentId(s.type))),
      S.divider(),
      S.listItem().title('Blog posts').id('posts').child(S.documentTypeList('post').title('Blog posts').defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])),
      S.listItem().title('Blog categories').id('categories').child(S.documentTypeList('category').title('Blog categories')),
    ]);

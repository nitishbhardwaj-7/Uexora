import type { StructureResolver } from 'sanity/structure';
import { singletons } from './schemaTypes';

const newest = [{ field: 'submittedAt', direction: 'desc' as const }];

const byPosition = [{ field: 'order', direction: 'asc' as const }];

/** Studio sidebar: contact form enquiries, one entry per page plus the site settings, the programme and service pages, then the blog. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Enquiries')
        .id('enquiries')
        .child(
          S.list()
            .title('Enquiries')
            .items([
              S.listItem().title('New').id('enquiries-new').child(S.documentList().title('New enquiries').schemaType('enquiry').filter('_type == "enquiry" && status == "new"').defaultOrdering(newest)),
              S.listItem().title('Replied').id('enquiries-replied').child(S.documentList().title('Replied').schemaType('enquiry').filter('_type == "enquiry" && status == "replied"').defaultOrdering(newest)),
              S.listItem().title('All').id('enquiries-all').child(S.documentList().title('All enquiries').schemaType('enquiry').filter('_type == "enquiry"').defaultOrdering(newest)),
            ])
        ),
      S.divider(),
      ...singletons.map((s) => S.listItem().title(s.title).id(s.type).child(S.document().schemaType(s.type).documentId(s.type))),
      S.divider(),
      S.listItem().title('Education programmes').id('programmes').child(S.documentTypeList('programme').title('Education programmes').defaultOrdering(byPosition)),
      S.listItem().title('Marketing services').id('marketing-services').child(S.documentTypeList('marketingService').title('Marketing services').defaultOrdering(byPosition)),
      S.divider(),
      S.listItem().title('Blog posts').id('posts').child(S.documentTypeList('post').title('Blog posts').defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])),
      S.listItem().title('Blog categories').id('categories').child(S.documentTypeList('category').title('Blog categories')),
    ]);

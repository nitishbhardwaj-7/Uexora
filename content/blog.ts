/** Default copy for the blog index (fallback and seed for the Sanity `blogPage` document). Posts themselves live only in Sanity. */
export const blog = {
  seo: {
    title: 'Blog | UEXORA — Learning, Marketing and Technology',
    description: 'Articles from Uexora Education and Uexora Marketing Studio on learning, exam preparation, skills, digital marketing and the technology behind them.',
  },
  title: 'Notes on learning, marketing and the technology behind them.',
  lead: 'Articles from both divisions: practical reading for learners and families, and for businesses building their presence online.',
  emptyTitle: 'The first articles are on their way.',
  emptyText: 'Nothing has been published here yet. In the meantime, the programme and service pages describe what we do.',
  moreHeading: 'More from the blog',
};

export type BlogContent = typeof blog;

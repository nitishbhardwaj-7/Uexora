import { client } from './client';

export type Review = { name: string; role?: string; programme?: string; rating?: number; quote: string; sample?: boolean };

const fetchOpts: { next: { revalidate: number; tags: string[] } } = { next: { revalidate: 600, tags: ['sanity'] } };

/**
 * Reviews for a landing page, from Studio. Only real reviews published with the reviewer's
 * permission are returned; there are no bundled defaults, so a page shows no reviews section
 * until the client has added one.
 *
 * In development only, and only while Studio has none, clearly labelled sample cards stand in
 * so the layout can be seen. They never reach the live site.
 */
export async function getReviews(division: 'education' | 'marketing'): Promise<Review[]> {
  let reviews: Review[] = [];
  if (client) {
    try {
      reviews = await client.fetch<Review[]>(
        `*[_type == "review" && division == $division && permission == true && defined(name) && defined(quote)] | order(coalesce(order, 999) asc, _createdAt desc) { name, role, programme, rating, quote }`,
        { division },
        fetchOpts,
      );
    } catch (err) {
      console.error('[reviews]', err);
    }
  }
  if (!reviews.length && process.env.NODE_ENV === 'development') return SAMPLES[division];
  return reviews;
}

const SAMPLES: Record<'education' | 'marketing', Review[]> = {
  education: [
    { sample: true, name: 'Sample reviewer', role: 'Parent of a Grade 8 student', programme: 'School tuition', rating: 5, quote: 'Sample text: a parent describes the difference the programme made, in their own words. Replace with a real review in Studio.' },
    { sample: true, name: 'Sample reviewer', role: 'NEET student', programme: 'Competitive exam preparation', rating: 5, quote: 'Sample text: a student explains what helped them most while preparing. Replace with a real review in Studio.' },
    { sample: true, name: 'Sample reviewer', role: 'Parent', programme: 'AI, coding and robotics', rating: 4, quote: 'Sample text: a short, specific comment about a project or a change they noticed. Replace with a real review in Studio.' },
  ],
  marketing: [
    { sample: true, name: 'Sample reviewer', role: 'Founder, sample business', programme: 'SEO', rating: 5, quote: 'Sample text: a client describes the problem they had and what changed after working together. Replace with a real review in Studio.' },
    { sample: true, name: 'Sample reviewer', role: 'Marketing lead, sample company', programme: 'Paid advertising', rating: 5, quote: 'Sample text: a specific, believable comment about the working relationship. Replace with a real review in Studio.' },
    { sample: true, name: 'Sample reviewer', role: 'Owner, sample shop', programme: 'Website design', rating: 4, quote: 'Sample text: one or two sentences in the client’s own words. Replace with a real review in Studio.' },
  ],
};

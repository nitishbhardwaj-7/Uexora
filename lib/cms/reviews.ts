import { client, imageUrl } from './client';

export type Review = {
  name: string;
  role?: string;
  programme?: string;
  rating?: number;
  quote: string;
  photo?: { src: string; alt: string };
  sample?: boolean;
};

type RawReview = Omit<Review, 'photo'> & { photo?: { asset?: unknown; alt?: string } | null };

const fetchOpts: { next: { revalidate: number; tags: string[] } } = { next: { revalidate: 600, tags: ['sanity'] } };

/**
 * Reviews for a landing page, from Studio. Only real reviews published with the reviewer's
 * permission are returned; there are no bundled defaults, so a page shows no reviews section
 * until the client has added one.
 *
 * In development only, and only while Studio has none, clearly labelled sample cards stand in
 * so the layout and the slider can be seen. They never reach the live site.
 */
export async function getReviews(division: 'education' | 'marketing'): Promise<Review[]> {
  let reviews: Review[] = [];
  if (client) {
    try {
      const raw = await client.fetch<RawReview[]>(
        `*[_type == "review" && division == $division && permission == true && defined(name) && defined(quote)] | order(coalesce(order, 999) asc, _createdAt desc) { name, role, programme, rating, quote, photo }`,
        { division },
        fetchOpts,
      );
      reviews = raw.map(({ photo, ...r }) => {
        const src = photo?.asset ? imageUrl(photo as never) : null;
        return src ? { ...r, photo: { src, alt: photo?.alt || r.name } } : r;
      });
    } catch (err) {
      console.error('[reviews]', err);
    }
  }
  if (!reviews.length && process.env.NODE_ENV === 'development') return SAMPLES[division];
  return reviews;
}

const sample = (role: string, programme: string, rating: number, quote: string): Review => ({
  sample: true,
  name: 'Sample reviewer',
  role,
  programme,
  rating,
  quote: `Sample text: ${quote} Replace with a real review in Studio.`,
});

const SAMPLES: Record<'education' | 'marketing', Review[]> = {
  education: [
    sample('Parent of a Grade 8 student', 'School tuition', 5, 'a parent describes the difference the programme made, in their own words.'),
    sample('NEET student', 'Competitive exam preparation', 5, 'a student explains what helped them most while preparing.'),
    sample('Parent', 'AI, coding and robotics', 4, 'a short, specific comment about a project or a change they noticed.'),
    sample('IELTS student', 'Overseas education and English', 5, 'what the student needed and how the classes helped.'),
    sample('Teacher', 'AI for professionals and educators', 5, 'one thing the teacher now does differently.'),
    sample('Parent', 'Communication and confidence', 4, 'a change the parent saw at home or at school.'),
  ],
  marketing: [
    sample('Founder, sample business', 'SEO', 5, 'a client describes the problem they had and what changed after working together.'),
    sample('Marketing lead, sample company', 'Paid advertising', 5, 'a specific comment about the working relationship.'),
    sample('Owner, sample shop', 'Website design', 4, 'one or two sentences in the client’s own words.'),
    sample('Director, sample firm', 'Digital marketing strategy', 5, 'what the plan made clear for them.'),
    sample('Co-founder, sample brand', 'Social media marketing', 5, 'how the content and engagement changed.'),
    sample('Head of growth, sample company', 'AI-powered marketing', 4, 'a result or a time saving they noticed.'),
  ],
};

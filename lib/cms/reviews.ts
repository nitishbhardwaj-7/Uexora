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

/*
 * DEVELOPMENT-ONLY PLACEHOLDERS. These are design stand-ins, not customers: the names and words
 * are invented and the faces are Pexels stock photos (pexels.com, free licence) of models, so
 * they must never be published. getReviews() returns them only under `next dev`, and every card
 * carries the placeholder label. Real reviews, with the reviewer's own photo, go in Studio.
 */
const pexels = (path: string) => `https://images.pexels.com/photos/${path}`;
const sample = (name: string, role: string, programme: string, rating: number, photo: string, quote: string): Review => ({
  sample: true,
  name,
  role,
  programme,
  rating,
  quote,
  photo: { src: pexels(photo), alt: '' },
});

const SAMPLES: Record<'education' | 'marketing', Review[]> = {
  education: [
    sample('Ananya R.', 'Parent of a Grade 8 student', 'School tuition', 5, '4584056/pexels-photo-4584056.jpeg', 'The tutors noticed exactly where my daughter was losing marks in maths and worked on those topics first. Her confidence in class has changed completely.'),
    sample('Rohan M.', 'NEET aspirant', 'Competitive exam preparation', 5, '5715795/pexels-photo-5715795.jpeg', 'The weekly mock tests and the review after each one showed me what to fix. I always knew where I stood and what to study next.'),
    sample('Kavya P.', 'Class 10 student', 'AI, coding and robotics', 5, '12631107/pexels-photo-12631107.jpeg', 'I built my first working robot in the third month. Learning the logic behind the code made it much easier to try new ideas on my own.'),
    sample('Meera I.', 'Parent', 'Communication and confidence', 4, '4584552/pexels-photo-4584552.jpeg', 'My son used to avoid speaking in front of people. After the term he volunteered to present at his school assembly.'),
    sample('Daniel O.', 'IELTS student', 'Overseas education and English', 5, '38165826/pexels-photo-38165826/free-photo-of-stylish-portrait-of-a-smiling-young-man.jpeg', 'Clear feedback on every writing task, and speaking practice that felt like the real test. I reached the band I needed on my first attempt.'),
    sample('Emma L.', 'Secondary school teacher', 'AI for professionals and educators', 5, '10260754/pexels-photo-10260754.jpeg', 'Practical from the first session. I now plan lessons and prepare feedback in half the time, and I know where AI should not be used.'),
  ],
  marketing: [
    sample('Arjun K.', 'Founder, retail brand', 'SEO', 5, '33261949/pexels-photo-33261949/free-photo-of-professional-portrait-of-young-man-in-studio.jpeg', 'They found the technical issues holding our pages back and fixed them in order of impact. Enquiries from search have grown month on month.'),
    sample('Sneha V.', 'Marketing lead, healthcare clinic', 'Paid advertising', 5, '29811345/pexels-photo-29811345/free-photo-of-professional-woman-smiling-in-business-attire.jpeg', 'Every rupee is tracked now. The weekly report tells us what worked, what did not and what they are changing next.'),
    sample('Marcus T.', 'Owner, café chain', 'Website design', 5, '7432863/pexels-photo-7432863.jpeg', 'The new site is fast, easy for us to update and finally looks like our brand. Online orders went up in the first month.'),
    sample('Sofia R.', 'Director, consulting firm', 'Digital marketing strategy', 4, '38197025/pexels-photo-38197025/free-photo-of-professional-portrait-of-smiling-woman-in-studio.jpeg', 'A clear plan before any spend: who we are speaking to, which channels to use and what success looks like. It saved us months.'),
    sample('Vikram S.', 'Co-founder, D2C brand', 'Social media marketing', 5, '20319696/pexels-photo-20319696/free-photo-of-portrait-of-a-young-man-with-dark-hair-and-facial-hair.jpeg', 'Consistent content with a purpose. Our community engages more, and we can see which posts bring people to the store.'),
    sample('James W.', 'Head of growth, SaaS company', 'AI-powered marketing', 5, '12311572/pexels-photo-12311572.jpeg', 'The automations they set up cut our reporting time and helped us reply to leads within minutes instead of hours.'),
  ],
};

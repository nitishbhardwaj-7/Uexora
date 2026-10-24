/**
 * Publishes the first two blog articles (one per division) with their categories and
 * Pexels cover photos from public/images/blog (see CREDITS.md there).
 *
 *   node --experimental-strip-types --env-file=.env.local scripts/seed-blog-articles.ts
 *
 * Safe to re-run: every document is created only if it does not exist yet, so edits
 * made in the studio are never overwritten. Delete a post in the studio to re-seed it.
 */
import { createReadStream } from 'node:fs';
import { basename, join } from 'node:path';
import { createClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !token) {
  console.error('Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local first.');
  process.exit(1);
}
const client = createClient({ projectId, dataset, token, apiVersion: '2026-10-01', useCdn: false });

/* ---------- Portable Text helpers ---------- */

let n = 0;
const key = () => `b${(n++).toString(36)}`;
/** A run of text: plain, bold ({ b }), or a link ({ t, href }). */
type Run = string | { b: string } | { t: string; href: string };

function block(style: string, runs: Run[], extra: Record<string, unknown> = {}) {
  const markDefs: { _type: 'link'; _key: string; href: string }[] = [];
  const children = runs.map((r) => {
    if (typeof r === 'string') return { _type: 'span', _key: key(), text: r, marks: [] };
    if ('b' in r) return { _type: 'span', _key: key(), text: r.b, marks: ['strong'] };
    const k = key();
    markDefs.push({ _type: 'link', _key: k, href: r.href });
    return { _type: 'span', _key: key(), text: r.t, marks: [k] };
  });
  return { _type: 'block', _key: key(), style, markDefs, children, ...extra };
}
const p = (...runs: Run[]) => block('normal', runs);
const h2 = (text: string) => block('h2', [text]);
const quote = (text: string) => block('blockquote', [text]);
const bullet = (...runs: Run[]) => block('normal', runs, { listItem: 'bullet', level: 1 });

/* ---------- Categories ---------- */

const categories = [
  { _id: 'category-education', _type: 'category', title: 'Education', slug: { _type: 'slug', current: 'education' }, description: 'Learning, exams and skills, from Uexora Education.' },
  { _id: 'category-marketing', _type: 'category', title: 'Marketing', slug: { _type: 'slug', current: 'marketing' }, description: 'Digital marketing for growing businesses, from Uexora Marketing Studio.' },
];

/* ---------- Articles ---------- */

const education = {
  _id: 'post-plan-exam-revision',
  title: 'How to plan exam revision that holds up until exam day',
  slug: 'plan-exam-revision',
  excerpt:
    'A revision plan only works if it survives a bad week. How to map the syllabus, divide the weeks before an exam, practise under exam conditions and keep adjusting the plan as you go.',
  seo: {
    title: 'How to Plan Exam Revision That Lasts | Uexora Education',
    description: 'A practical guide to planning exam revision: map the syllabus, divide the weeks, practise under exam conditions and keep the plan realistic until exam day.',
  },
  publishedAt: '2026-10-22T09:00:00.000Z',
  category: 'category-education',
  cover: { file: 'study-plan-desk.jpg', alt: 'Overhead view of a student at a wooden desk with a laptop, a desk lamp and stacks of books on either side' },
  body: [
    p(
      'Most revision plans are written in one evening of good intentions and quietly abandoned within a fortnight. The problem is rarely effort. It is that the plan assumes every day will go well. A plan that lasts is built for the weeks that do not.'
    ),
    p('Whether the exam is a school board paper, an entrance exam such as JEE or NEET, or an English test such as IELTS, the same few steps apply.'),

    h2('Start from the syllabus, not the textbook'),
    p(
      'Write down every topic the exam can cover, using the official syllabus or specification as the source. Then mark each one honestly: ',
      { b: 'confident' },
      ', ',
      { b: 'shaky' },
      ' or ',
      { b: 'not yet studied' },
      '. This list is the foundation of the plan. It shows where the time needs to go, and it stops revision drifting towards the topics that already feel comfortable.'
    ),
    p('Then weigh each topic by how much it tends to carry in the paper and how long it takes to learn. A short, high-value topic that is still shaky deserves an early slot.'),

    h2('Divide the time into phases'),
    p('Rather than one long timetable, split the weeks before the exam into three overlapping phases.'),
    bullet({ b: 'Learning.' }, ' Close the gaps: work through the topics marked shaky or not yet studied, a few at a time.'),
    bullet({ b: 'Practice.' }, ' Apply what has been learned to exam-style questions, first topic by topic, then mixed.'),
    bullet({ b: 'Rehearsal.' }, ' Sit full papers under timed conditions, then review every mistake carefully.'),
    p('The closer the exam, the more of each week belongs to practice and rehearsal.'),

    h2('Plan the week, not every hour'),
    p(
      'Hour-by-hour timetables break the first time something unexpected happens. Plan instead what each week should achieve: the topics to cover, the number of practice sets, one review session. Then fit those into the days that are actually available, around school, classes, travel and rest.'
    ),
    p('Leave one slot each week deliberately empty. It absorbs the session that overran or the day that was lost, so a single bad day does not unravel the whole plan.'),

    h2('Make practice look like the exam'),
    p(
      'Reading notes feels productive, but the exam tests recall. Close the book and write out what you remember, answer questions before looking at the solution, and explain a concept aloud as if teaching it. Wherever the explanation falters is the next thing to revise.'
    ),
    p(
      'For full papers, copy the real conditions as closely as you can: the same length of time, no phone, no notes and a clock in view. Managing time in an exam is a skill of its own, and it only improves with practice.'
    ),
    quote('A mistake that has been understood is worth more than a paper that has been finished.'),

    h2('Keep a mistakes log'),
    p(
      'After every practice set, note each question that went wrong and why: a gap in knowledge, a misread question, a careless slip or running out of time. Patterns appear quickly. A run of careless slips calls for a checking routine; a run of timing problems calls for more timed practice, not more reading.'
    ),

    h2('Review the plan every week'),
    p(
      'At the end of each week, compare what was planned with what actually happened, update the topic list and move whatever was missed. The plan is a working document, not a promise, and adjusting it is part of using it well.'
    ),
    p('Protect sleep, meals and some exercise throughout. They are not a reward for finishing revision; they are part of what makes revision stick.'),

    h2('When to ask for help'),
    p(
      'If the same topics stay shaky week after week, or practice scores stop moving, a second pair of eyes helps: a teacher, a tutor or a study group can often see the pattern that is hard to see from inside it.'
    ),
    p(
      'Uexora Education offers ',
      { t: 'competitive exam preparation', href: '/education/competitive-exam-preparation' },
      ' and ',
      { t: 'academic support and school tuition', href: '/education/academic-support-and-school-tuition' },
      '. If you would like to talk through a revision plan, ',
      { t: 'speak with our education team', href: '/contact?division=education' },
      '.'
    ),
  ],
};

const marketing = {
  _id: 'post-seo-or-paid-ads',
  title: 'SEO or paid ads: where should a small business start?',
  slug: 'seo-or-paid-ads-small-business',
  excerpt:
    'Search engine optimisation builds visibility that compounds; paid advertising buys visibility now. How each one works, how to choose between them, and why most small businesses end up using both.',
  seo: {
    title: 'SEO or Paid Ads: Where Should a Small Business Start?',
    description: 'SEO or paid advertising? How each works, what each costs in time and money, and a simple way for a small business to decide where to put its first budget.',
  },
  publishedAt: '2026-10-23T09:00:00.000Z',
  category: 'category-marketing',
  cover: { file: 'small-business-laptop.jpg', alt: 'A small business owner reviewing charts on a laptop at a wooden table beside packed parcels' },
  body: [
    p(
      'It is one of the first questions a growing business asks about marketing: should we invest in SEO or in paid ads? The honest answer is that they do different jobs. Once the difference is clear, the choice, and the order, become much easier.'
    ),

    h2('How SEO works'),
    p(
      'Search engine optimisation is the work of making your website the best answer to the questions your customers type into Google. It covers the technical health of the site, the content on each page, and the signals that show search engines a business can be trusted, such as reviews and links from other websites.'
    ),
    p(
      'Its strength is that it compounds. A page that ranks well can keep bringing visitors for months or years without paying for each visit. Its weakness is time: results usually build over months rather than days, and no one can guarantee a position.'
    ),

    h2('How paid advertising works'),
    p(
      'Paid ads on Google, Meta and other platforms put a business in front of people straight away, and you pay for that attention, usually per click or per thousand views. You decide who sees the ad, where and when, and you can measure what each campaign returns.'
    ),
    p(
      'Its strength is speed and control: a campaign can send visitors the day it goes live, and it is easy to test which message works best. Its weakness is that the traffic stops when the budget does, and in competitive markets clicks can become expensive.'
    ),

    h2('A simple way to decide'),
    bullet({ b: 'You need enquiries this month.' }, ' Start with search ads aimed at people who are already looking for what you offer.'),
    bullet({ b: 'You serve a local area or a specialist niche.' }, ' Start with SEO basics: a complete Google Business Profile and a clear page for every service can go a long way.'),
    bullet({ b: 'You are launching something people do not search for yet.' }, ' Social ads can build awareness in a way search cannot.'),
    bullet({ b: 'You plan to be in business for years.' }, ' Start SEO early, because its returns grow the longer it runs.'),

    h2('Why most businesses end up using both'),
    p(
      'The two work well together. Paid campaigns show quickly which searches and messages lead to enquiries, which tells you which pages are worth building for SEO. As organic visibility grows, ad spend can move towards the searches where ranking is hardest.'
    ),
    p('Both depend on the same foundation: a fast, clear website that turns visitors into enquiries. Neither channel can make up for a site that loses people once they arrive.'),
    quote('Ads rent attention, SEO earns it, and a good website keeps it.'),

    h2('Before spending on either'),
    bullet('Make sure the website loads quickly and works well on a phone.'),
    bullet('Give every service its own page, written in the words your customers use.'),
    bullet('Set up analytics and conversion tracking, so every enquiry can be traced to where it came from.'),
    bullet('Decide what a good result looks like: calls, form enquiries, bookings or sales.'),
    p('With those in place, whichever channel comes first is measured properly from the first day, and the second channel can build on what the first one has learned.'),

    h2('Getting help'),
    p(
      'Uexora Marketing Studio works across ',
      { t: 'search engine optimisation', href: '/marketing/search-engine-optimisation' },
      ', ',
      { t: 'paid advertising and lead generation', href: '/marketing/paid-advertising-and-lead-generation' },
      ' and ',
      { t: 'website design and development', href: '/marketing/website-design-and-development' },
      '. If you would like help deciding where to start, ',
      { t: 'start a conversation', href: '/contact?division=marketing' },
      '.'
    ),
  ],
};

/* ---------- Write ---------- */

for (const c of categories) {
  await client.createIfNotExists(c);
  console.log(`category  ✓ ${c.title}`);
}

for (const a of [education, marketing]) {
  const existing = await client.getDocument(a._id);
  if (existing) {
    console.log(`post      = ${a.title} (already exists, left as it is)`);
    continue;
  }
  const file = join(process.cwd(), 'public', 'images', 'blog', a.cover.file);
  const asset = await client.assets.upload('image', createReadStream(file), { filename: basename(file) });
  await client.create({
    _id: a._id,
    _type: 'post',
    title: a.title,
    slug: { _type: 'slug', current: a.slug },
    excerpt: a.excerpt,
    cover: { _type: 'image', asset: { _type: 'reference', _ref: asset._id }, alt: a.cover.alt },
    publishedAt: a.publishedAt,
    categories: [{ _type: 'reference', _key: key(), _ref: a.category }],
    body: a.body,
    seo: a.seo,
  });
  console.log(`post      ✓ ${a.title}`);
}
console.log('\nDone.');

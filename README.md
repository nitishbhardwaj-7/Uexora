# UEXORA — corporate website

Next.js 16 (App Router) · TypeScript · vanilla CSS · GSAP · Lenis.

Two divisions, one site:

| Route | Page |
| --- | --- |
| `/` | Landing: animated monogram hero, division picker, "Different paths. One purpose." |
| `/education` | Uexora Education: about, what we do (7 programmes), approach, beyond the classroom, why choose us (`#why-choose-us`), next step |
| `/education/<slug>` | One page per programme: intro, who it's for, at a glance, approach, other programmes, next step |
| `/marketing` | Uexora Marketing Studio: about, services (6), how we work, who we work with, philosophy, why choose us (`#why-choose-us`) |
| `/marketing/<slug>` | One page per service, same structure in the cream theme |
| `/contact` | Contact form (`?division=education|marketing` preselects the tab) |
| `/studio` | Content admin (Sanity Studio, embedded; see "Content editing") |

## Run

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm start
```

## Where things live

```
app/                  metadata, icons (favicon.ico, icon.png, apple-icon.png, opengraph-image.png)
  (site)/             the public pages + their layout (header, footer, loader, scroll effects)
  studio/             the embedded content admin (no site chrome)
  api/contact         contact form endpoint · api/revalidate: Sanity publish webhook
  globals.css         the whole design system (tokens, components, sections)
components/
  brand/              Monogram, Wordmark, Tagline, Logo + logo-paths.ts (generated vectors)
  home/               Hero, Divisions, Purpose, Marquee
  sections/           PageHero, CtaBand, Blocks (SplitSection, Statement, Reasons, Steps),
                      ServiceCards (programme/service index), ServicePage (detail page template)
  Preloader.tsx       loading animation (every page load)
  Header.tsx          fixed header + fullscreen menu
  ScrollEffects.tsx   data-reveal / data-split / data-parallax / data-draw / header tone
  SmoothScroll.tsx    Lenis + GSAP ticker, smooth in-page anchors
content/              default copy for every page + site settings (also the seed for the studio)
lib/cms/              reads content from Sanity and lays it over the defaults in content/
lib/site.ts           brand name, public URL, nav, menu (not editable in the studio)
sanity/               studio schema (one document per page + site settings) and sidebar structure
sanity.config.ts      studio configuration · scripts/seed-sanity.ts: loads content/ into the project
public/brand/         PNG exports of the logo (monogram, wordmark, icons)
```

## Logo

Every visible logo is the client's exact artwork, exported pixel-for-pixel from the master `full logo.svg`
into `public/brand/` (`uexora-monogram.png`, `uexora-wordmark.png`, `uexora-wordmark-light.png` with white
letters for dark backgrounds). `Monogram` / `Wordmark` render these by default.

`components/brand/logo-paths.ts` holds traced vector versions used only where a vector is required: the
preloader's draw-on animation (which crossfades to the exact artwork at the end), the single-colour
watermark silhouettes (`variant="mono"`), and the "FOCUSED ON YOU" tagline (original vector glyphs).

Vector hooks (mono variant only): `.mono-base`, `.mono-gold`, `.mono-dot`, `.word-letters`, `.word-x`.

## Page inventory and strategy

| Route | Intent / audience | Primary CTA |
| --- | --- | --- |
| `/` | Brand entry: what Uexora is, choose a division; links to all 13 programme/service pages | Start a conversation |
| `/education` | Division hub: programmes index, approach, "which programme is right for you", questions | Speak with our education team |
| `/education/<slug>` ×7 | One programme each: promise, who it is for, detail, at a glance, approach, questions, related | Speak with our education team |
| `/marketing` | Division hub: services index, how we work, who we work with, "which service fits", questions | Discuss your requirements / Start a conversation |
| `/marketing/<slug>` ×6 | One service each (same anatomy, cream theme) | Discuss your requirements |
| `/contact` | Enquiry form routed by division | Send message |
| `/blog` | Blog index: every published post as a ruled list, category filters (`?category=`); noindex while empty | — |
| `/blog/[slug]` | One article: cover, reading column (Portable Text), author, more posts, call to action | Home call to action |
| `/feed.xml` | RSS 2.0 feed of the blog | — |
| `/studio` | Content admin (noindex, disallowed in robots) | — |

Pages not present (and not invented): about, blog/articles, case studies, testimonials. Sitemap lists the 17 public pages.

## Content and conversion notes

- Source of truth is `content/*.ts` (seeded into the studio). Every programme/service has: `promise` (one benefit-led
  hero line), `text` (intro, also the index row), `whoFor`, `details`, `highlights`, `faqs`, `image`, `seo`.
- Voice: Education is supportive and plain-spoken (students, parents, learners); Marketing is strategic and
  commercially direct (owners, founders, marketing managers). No guarantees of results, admissions or growth.
- Calls to action follow intent: exploring ("Explore the programmes" / "Explore our approach"), comparing ("Find the
  right programme" / "Discuss your requirements"), ready ("Speak with our education team" / "Start a conversation").
  Every CTA leads to `/contact` with the division preselected, or to a section anchor.
- Discovery: the footer lists every programme and service; division pages carry a
  signpost section (visitor situation → programme/service) and three landing-page questions; service pages cross-link
  to their siblings and division.
- Structured data: Organization + WebSite (site), BreadcrumbList (inner pages), Service (programme/service pages).
  FAQ markup is deliberately not emitted (search engines no longer show FAQ rich results for commercial sites).
- Still to confirm with the client (placeholders, not published as facts): contact emails and phone, opening hours,
  reply time for enquiries, and any age groups, formats, durations or credentials for the programmes.

## Blog

Posts live only in Sanity (`post` and `category` documents, plus the `blogPage` copy); there are no bundled
defaults, so without a project the blog is empty. A post is live once it is published and its publish date has
passed, which also allows scheduling. The Blog link appears in the header menu, the footer and the sitemap only
when at least one post is live, and the empty index is `noindex`.

- Schema: `sanity/schemaTypes/blog.ts`. Body is Portable Text (headings, lists, quotes, links, images with
  alt and caption). Queries and types: `lib/cms/blog.ts`; renderer: `components/blog/PostBody.tsx`.
- Each article has `BlogPosting` and breadcrumb JSON-LD, Open Graph `article` dates, and the cover as share image.
- `npm run cms:seed-blog` creates the blog page copy if it is missing. `scripts/seed-blog-articles.ts` publishes
  the first two articles (Education and Marketing categories, Pexels covers credited in
  `public/images/blog/CREDITS.md`); it only creates what does not exist, so studio edits are never overwritten.

## Motion language

Tokens live in `lib/motion.ts` (eases, durations, rise distances, staggers; device helpers). Rules the whole
site follows: entrances start fast and settle long (`expo.out`), masks and lines travel with `power3.inOut`,
nothing bounces, distances halve on small screens, pointer effects exist only for fine pointers, and
everything is skipped under `prefers-reduced-motion` (content is simply visible).
Entrances are staged before the first paint: an inline head script adds `html.js`, and CSS keeps the hero
elements and `data-reveal` items in their hidden start state until the component has taken over with GSAP
(it then adds `.is-live`). A page therefore never renders static and animates afterwards; without JavaScript,
or with reduced motion, nothing is hidden.

- Opening (`components/Preloader.tsx`, ~3.7 s, every page load): the U draws on, fills, the swoosh
  sweeps in, the exact artwork settles, and the overlay wipes up while the hero entrance starts underneath.
- Page heroes (`components/sections/PageHeroMotion.tsx`): breadcrumb, headline lines out of masks, lead, buttons,
  chips, then the photo unmasks and settles; starts as the opening wipes on a hard load, at once on navigation.
- Hero (`components/home/Hero.tsx`): the monogram unmasks through a circular clip and settles; the headline
  rises word by word out of line masks; gold paints across the highlighted word; wordmark, subline and
  buttons follow in sequence; glows, grid and rings resolve. Desktop pointer tilts the mark a few degrees in
  perspective and drifts the background layers the other way.
- Scroll (`components/ScrollEffects.tsx`): `data-reveal` rise, `data-reveal="mask"` image unmask + settle,
  `data-line` hairline draw, `data-draw-scroll` strokes that draw with scroll progress (the arcs behind the
  programme header), restrained `data-parallax`, lazy line splits for headings.
- Programme index: rows reveal in sequence, the active row (hover or scroll position) slides, turns its arrow gold and crossfades the sticky photo; the side hairline draws in.
- Navigation: active link underline, menu overlay with staggered links, `components/PageTransition.tsx`
  rises the incoming page in (no curtain, no delay).
- Questions (`components/sections/Faq.tsx`): an index of questions (vertical tabs with a gold marker that grows along the index line) beside one answer card; the chosen answer slides into the card. All answers stay in the markup (inactive panels are `hidden`). Sits after the approach statement and before the related items.

## Scroll animation attributes

- `data-reveal` — fade + rise once in view (CSS keyframe driven by an IntersectionObserver; items already on screen cascade in on load; `data-reveal-delay="0.2"` optional)
- `data-reveal-group` — children stagger (`data-stagger="0.08"`)
- `data-split` — heading lines slide out of a mask (GSAP SplitText, applied lazily as the heading approaches)

Nothing is hidden before `components/ScrollEffects.tsx` runs: what is already on screen is marked visible
first, so first paint, crawlers and screen readers always see the full content. The enhancement scripts
(Lenis, ScrollTrigger/SplitText, cursor, card spotlight) load after the page is interactive via
`components/Enhancements.tsx`; cursor and spotlight are never shipped to touch devices.
- `data-parallax="0.14"` — vertical parallax
- `data-draw` — SVG paths inside fade in one by one
- `data-tone="dark|light"` — section tone; the header adopts the tone of the section beneath it

## Contact form

`components/ContactForm.tsx` posts JSON to `app/api/contact/route.ts`, which validates the fields, runs
spam checks, then does two things: it emails the enquiry over SMTP with Nodemailer, and it saves it in
Sanity as an `enquiry` document, listed in the studio under **Enquiries** (New / Replied / All). The
visitor sees success when at least one of the two worked; each failure is logged. Recipients come from
the site settings (`content/settings.ts`, or Site settings in the studio; still placeholders, replace
before launch). The visitor's address is set as Reply-To so inbox replies go straight back to them.

**Enquiries in the studio** (`sanity/schemaTypes/enquiry.ts`, `lib/cms/enquiries.ts`): the submitted
details are read-only; the team sets the status (New, Replied, Closed) and can add internal notes.
Enquiries cannot be created or duplicated in the studio. Each id starts with `enquiry.`, which keeps
them out of the public API even though the dataset is public: Sanity only returns dotted ids to signed-in
users and tokens. Saving needs `SANITY_API_WRITE_TOKEN` on the host (server-only).

**Setup:** copy `.env.example` to `.env.local` and fill in `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`,
`SMTP_USER`, `SMTP_PASS` and `MAIL_FROM` (comments in the file cover Google Workspace and Zoho), plus
`SANITY_API_WRITE_TOKEN`. With only the token set, enquiries are stored but not emailed; with neither,
the route answers 503 and the form shows an inline "not set up yet" error with the inbox address.

**Spam protection:** a hidden honeypot field (`company`) must stay empty, the form must have been open
for at least 3 seconds, and each IP gets 5 submissions per 10 minutes. Bots that trip the first two
get a fake success so they stop retrying. The rate limit is an in-memory map, so it is per server
instance and resets on deploy; enough for a brochure site, swap for Upstash/Redis if the site is
ever served from several instances.

**Local test without real credentials:** run a throwaway SMTP sink on port 2525 and point
`.env.local` at it (`SMTP_HOST=127.0.0.1`, `SMTP_PORT=2525`, `SMTP_SECURE=false`, any user/pass):

```bash
node -e "const {SMTPServer}=require('smtp-server');new SMTPServer({authOptional:true,disabledCommands:['STARTTLS'],onAuth(a,_,cb){cb(null,{user:a.username})},onData(s,_,cb){s.pipe(process.stdout);s.on('end',cb)}}).listen(2525,()=>console.log('SMTP sink on 2525'))"
```

Then submit the form at `/contact`; the raw message prints in that terminal.

## Content editing

Every heading, paragraph, list, button label and photo on the four pages, plus the contact details,
can be edited in a Sanity Studio at `/studio`. The site works without it: when no project is
configured it renders the copy in `content/`. When one is configured, each page fetches its Sanity
document and lays it over those defaults field by field (`lib/cms/merge.ts`), so a field left empty
in the studio shows the default and the site never has holes.

**One-time setup (about ten minutes):**

1. Create a free project at <https://www.sanity.io/manage> (or run `npx sanity init` here and choose
   "existing project" when asked). Note the project id; keep the dataset named `production` and
   public.
2. In `.env.local` set `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET=production` and a
   `SANITY_API_WRITE_TOKEN` (Manage > API > Tokens > Editor).
3. Load the current copy and photos into the project:

   ```bash
   npm run cms:seed
   ```

   Re-running it resets the studio to the bundled copy. Remove the write token afterwards if the
   client will not need to reseed.
4. Add the site's URL under Manage > API > CORS origins (with credentials) so the studio can sign in.
5. Instant updates after publishing: generate a random string, set it as
   `SANITY_REVALIDATE_SECRET`, and create a webhook under Manage > API > Webhooks with URL
   `https://<domain>/api/revalidate`, triggers create/update/delete and that secret. Without the
   webhook, changes still appear within ten minutes (`revalidate = 600` in `app/(site)/layout.tsx`).
6. Invite the client under Manage > Members. They sign in at `/studio` with Google, GitHub or email.

**What the studio holds:** Site settings (emails, phone, hours, tagline, description, footer line),
Home page, Education page, Marketing page and Contact page, one document each, grouped by section.
Layout, colours, the logo and the navigation stay in code.

**Programme and service pages:** each entry in the Education "Programmes" and Marketing "Services"
lists has its own page at `/education/<slug>` or `/marketing/<slug>`. The entry holds the page
address (slug), intro, highlights, "who it is for", further paragraphs, questions and answers
(also emitted as FAQPage data), a photo and its own search title/description (a description is
derived from the intro when left empty). The index on each division page is an editorial header
(small heading, highlighted word, intro, side note) plus numbered rows with a quiet call to action
underneath. Each entry ships with a photo from
Unsplash (free licence, see `public/images/services/CREDITS.md`); replace any of them from the studio's
Photo field. The index shows the rows beside one sticky photo frame that follows the hovered row.
Adding an entry in the studio creates its page; changing a slug changes the URL (add a redirect in
`next.config.mjs` if an old URL has been shared). Pages carry BreadcrumbList and Service structured
data and are listed in the sitemap.

**Images** uploaded in the studio are served from `cdn.sanity.io` (allowed in `next.config.mjs`) and
still go through `next/image`. The seed uploads the local photos (JPEG, WebP and AVIF all upload fine).

**Free plan:** 20 editors, 10k documents, 250k API requests a month. The site reads each document
once per render and renders are cached, so usage stays in the hundreds per month.

## SEO & performance notes

- Metadata: every page builds its tags through `lib/seo.ts` (`pageMetadata`): absolute title (39–64 chars),
  description (110–160 chars), canonical, Open Graph and a large Twitter card, always with a share image
  (the page's photo on programme/service pages, otherwise `app/opengraph-image.png`). A page that sets its own
  `openGraph` replaces the layout's, so do not bypass the helper. `metadataBase` comes from `NEXT_PUBLIC_SITE_URL`.
  `robots.ts` (disallows `/api/` and `/studio`), `sitemap.ts` (all 17 pages, canonical URLs only).
  JSON-LD: Organization + WebSite (layout), BreadcrumbList on inner pages, Service + FAQPage on programme/service pages.
- Headings: one H1 per page, no skipped levels (menu column titles are paragraphs, not headings); every image has alt text
  (editable per photo in the studio).
- Content freshness: Sanity reads are cached for 10 minutes and tagged `sanity`; the publish webhook expires the tag and
  re-renders every page, so neither a publish nor a rebuild serves stale content from `.next/cache/fetch-cache`.
- Redirects: `/education/why-choose-us` and `/marketing/why-choose-us` → the `#why-choose-us` sections (308, `next.config.mjs`).
- Headers: nosniff, SAMEORIGIN, referrer policy, permissions policy, HSTS; one-year immutable caching for `/brand/*` and `/images/*`
  (rename a file if you replace it). `poweredByHeader` is off.
- Images go through the Next image optimizer (AVIF/WebP, responsive sizes). Above-the-fold brand images use `preload`.
- The opening is pure CSS/SMIL so it starts at first paint, runs about 3.7 s (the bar fills over 2.2 s, then the overlay wipes away with an eased curve) and plays on every page load.
  Lighthouse always measures a first visit, so it still sets the mobile LCP floor; timings live in
  `components/Preloader.tsx` (`EXIT_AT_MS`, `TOTAL_MS`) and the `pl-*` keyframes in `app/globals.css`.

Measured on a local production build (`next build && next start -p 3100`), Lighthouse 13.5, 2026-10-23,
with the 3.7 s opening on every load. Mobile numbers vary by about ±8 between runs on this machine.
Accessibility, best practices and SEO are 100 and CLS is 0 on every page measured.

| Page | Mobile perf | Desktop perf | Mobile LCP |
| --- | --- | --- | --- |
| `/` | 84 | 98 | 4.0 s |
| `/education` | 89 | 97–99 | 3.4 s |
| `/marketing` | 89–93 | 97 | 3.2 s |
| `/education/competitive-exam-preparation` | 89–91 | 97–99 | 3.3 s |
| `/marketing/search-engine-optimisation` | 88–93 | 95–100 | 3.3 s |
| `/contact` | 88–91 | 97–98 | 2.8 s |

The mobile ceiling is the opening: it covers the page for about 3.7 s on every visit and the hero then
animates in, so the largest paint lands after 3 s and Speed Index stays above 3 s. Everything else (layout
shift, blocking time, image sizing, caching, metadata) is at the top of the scale. A mobile score of 95–100
needs the opening to be skipped or shortened to well under a second; that is a brand decision, not a bug.

Re-run: `npx lighthouse http://localhost:3100/ --preset=desktop --view` (or without the preset for mobile).

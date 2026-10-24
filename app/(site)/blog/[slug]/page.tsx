import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BreadcrumbJsonLd, JsonLd } from '@/components/JsonLd';
import PostBody from '@/components/blog/PostBody';
import PostList from '@/components/blog/PostList';
import CmsImage from '@/components/ui/CmsImage';
import CtaBand from '@/components/sections/CtaBand';
import { ArrowLink } from '@/components/ui/Button';
import { getBlog, getHome } from '@/lib/cms';
import { formatDate, getPost, getPostSlugs, getPosts, postPath } from '@/lib/cms/blog';
import { pageMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = await getPost(slug);
  if (!p) return {};
  return pageMetadata({
    title: p.seo?.title || `${p.title} | UEXORA Blog`,
    description: p.seo?.description || p.excerpt,
    path: postPath(slug),
    image: p.cover ? { url: p.cover.src, alt: p.cover.alt, width: p.cover.width, height: p.cover.height } : null,
    article: { publishedTime: p.publishedAt, modifiedTime: p.updatedAt, authors: [p.author || site.name] },
  });
}

/** One article: title and summary, cover, the body in a reading column, the author, more posts and a call to action. */
export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const [p, b, all, h] = await Promise.all([getPost(slug), getBlog(), getPosts(), getHome()]);
  if (!p) notFound();
  const more = all.filter((x) => x.slug !== p.slug).slice(0, 3);
  const url = `${site.url}${postPath(p.slug)}`;

  return (
    <>
      <BreadcrumbJsonLd crumbs={[{ name: 'Blog', path: '/blog' }, { name: p.title, path: postPath(p.slug) }]} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: p.title,
          description: p.excerpt,
          datePublished: p.publishedAt,
          dateModified: p.updatedAt || p.publishedAt,
          author: { '@type': p.author ? 'Person' : 'Organization', name: p.author || site.legalName },
          publisher: { '@type': 'Organization', name: site.legalName, url: site.url },
          image: p.cover ? [p.cover.src] : undefined,
          mainEntityOfPage: url,
          url,
        }}
      />

      <article>
        <header className="page-hero post-hero" data-tone="light" aria-labelledby="page-title">
          <div className="container">
            <div className="post-hero__copy">
              <nav className="page-hero__crumbs" aria-label="Breadcrumb" data-reveal>
                <ol>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/blog">Blog</Link>
                  </li>
                </ol>
              </nav>
              <h1 id="page-title" className="h1" data-split data-split-delay="0.1">
                {p.title}
              </h1>
              <p className="lead" data-reveal data-reveal-delay="0.2">
                {p.excerpt}
              </p>
              <div className="post-hero__meta" data-reveal data-reveal-delay="0.3">
                <time dateTime={p.publishedAt}>{formatDate(p.publishedAt)}</time>
                <span>{p.readingMinutes} min read</span>
                {p.categories.map((c) => (
                  <Link key={c.slug} href={`/blog?category=${c.slug}`} className="chip">
                    {c.title}
                  </Link>
                ))}
              </div>
            </div>
            {p.cover ? (
              <figure className="post-hero__cover" data-reveal="mask">
                <CmsImage src={p.cover.src} alt={p.cover.alt} fill sizes="(max-width: 900px) 100vw, 1200px" quality={82} preload fetchPriority="high" />
              </figure>
            ) : null}
          </div>
        </header>

        <section className="section section--flush-top" data-tone="light">
          <div className="container post__layout">
            <div className="post__main" data-reveal>
              <PostBody value={p.body} />
              <footer className="post__foot">
                <p className="post__author">
                  <span>Written by</span>
                  <strong>{p.author || site.name}</strong>
                </p>
                <ArrowLink href="/blog">All articles</ArrowLink>
              </footer>
            </div>
          </div>
        </section>
      </article>

      {more.length ? (
        <section id="more" className="section" data-tone="dark" aria-labelledby="more-title">
          <div className="container">
            <div className="section-head">
              <h2 id="more-title" className="h2" data-split>
                {b.moreHeading}
              </h2>
            </div>
            <PostList posts={more} headingLevel="h3" />
          </div>
        </section>
      ) : null}

      <CtaBand id="next-step" heading={h.cta.heading} paragraphs={h.cta.paragraphs} primary={h.cta.primary} secondary={h.cta.secondary} tone={more.length ? 'light' : 'dark'} />
    </>
  );
}

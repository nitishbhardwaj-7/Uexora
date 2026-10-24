import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import Monogram from '@/components/brand/Monogram';
import PostList from '@/components/blog/PostList';
import { ArrowLink } from '@/components/ui/Button';
import { getBlog } from '@/lib/cms';
import { getCategories, getPosts } from '@/lib/cms/blog';
import { pageMetadata } from '@/lib/seo';

type Search = { searchParams: Promise<{ category?: string }> };

export async function generateMetadata({ searchParams }: Search): Promise<Metadata> {
  const [b, posts, { category }] = await Promise.all([getBlog(), getPosts(), searchParams]);
  // A filtered view is a view of the same page: it is not indexed separately.
  return pageMetadata({ title: b.seo.title, description: b.seo.description, path: '/blog', noindex: posts.length === 0 || !!category });
}

/** Blog index: headline, category filters, every live post as a ruled list. */
export default async function BlogPage({ searchParams }: Search) {
  const { category } = await searchParams;
  const [b, all, cats] = await Promise.all([getBlog(), getPosts(), getCategories()]);
  const active = category && cats.find((c) => c.slug === category) ? category : undefined;
  const posts = active ? all.filter((p) => p.categories.some((c) => c.slug === active)) : all;

  return (
    <>
      <BreadcrumbJsonLd crumbs={[{ name: 'Blog', path: '/blog' }]} />

      <section className="page-hero blog-hero" data-tone="light" aria-labelledby="page-title">
        <Monogram className="page-hero__mark" variant="mono" style={{ color: 'var(--blue-700)' }} />
        <div className="container">
          <div className="page-hero__copy blog-hero__copy">
            <h1 id="page-title" className="h1" data-split data-split-delay="0.1">
              {all.length ? b.title : b.emptyTitle}
            </h1>
            <p className="lead" data-reveal data-reveal-delay="0.2">
              {all.length ? b.lead : b.emptyText}
            </p>
            {!all.length ? (
              <div className="btn-row" data-reveal data-reveal-delay="0.3">
                <ArrowLink href="/education#programmes">Education programmes</ArrowLink>
                <ArrowLink href="/marketing#services">Marketing services</ArrowLink>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {all.length ? (
        <section id="articles" className="section section--flush-top" data-tone="light" aria-labelledby="articles-title">
          <div className="container">
            <h2 id="articles-title" className="sr-only">
              Articles
            </h2>
            {cats.length ? (
              <nav className="posts__filters" aria-label="Filter by category" data-reveal>
                <Link href="/blog" className={['posts__filter', !active ? 'is-active' : ''].filter(Boolean).join(' ')} aria-current={!active ? 'true' : undefined}>
                  All <span className="posts__count">{all.length}</span>
                </Link>
                {cats.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/blog?category=${c.slug}`}
                    className={['posts__filter', active === c.slug ? 'is-active' : ''].filter(Boolean).join(' ')}
                    aria-current={active === c.slug ? 'true' : undefined}
                  >
                    {c.title} <span className="posts__count">{c.count}</span>
                  </Link>
                ))}
              </nav>
            ) : null}
            <PostList posts={posts} />
          </div>
        </section>
      ) : null}
    </>
  );
}

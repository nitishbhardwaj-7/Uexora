import Link from 'next/link';
import CmsImage from '@/components/ui/CmsImage';
import { Arrow } from '@/components/ui/Button';
import { formatDate, postPath, type PostSummary } from '@/lib/cms/blog';

/**
 * Posts as a ruled editorial index: date and categories, title and summary, a small
 * cover and an arrow. Rows reveal in sequence; the whole row is the link.
 */
export default function PostList({ posts, headingLevel = 'h2' }: { posts: PostSummary[]; headingLevel?: 'h2' | 'h3' }) {
  const H = headingLevel;
  return (
    <ol className="posts" data-reveal-group data-stagger="0.07">
      {posts.map((p) => (
        <li key={p.slug} className="posts__row">
          <Link href={postPath(p.slug)} className="posts__link" data-cursor>
            <div className="posts__meta">
              <time dateTime={p.publishedAt}>{formatDate(p.publishedAt)}</time>
              {p.categories.length ? <span className="posts__cats">{p.categories.map((c) => c.title).join(' · ')}</span> : null}
              <span className="posts__time">{p.readingMinutes} min read</span>
            </div>
            <div className="posts__body">
              <H className="posts__title">{p.title}</H>
              <p className="posts__excerpt">{p.excerpt}</p>
            </div>
            <div className="posts__thumb" aria-hidden="true">
              {p.cover ? <CmsImage src={p.cover.src} alt="" fill sizes="(max-width: 900px) 40vw, 220px" quality={75} /> : null}
            </div>
            <span className="posts__arrow" aria-hidden="true">
              <Arrow />
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}

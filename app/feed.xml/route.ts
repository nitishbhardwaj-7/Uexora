import { getBlog } from '@/lib/cms';
import { getPosts, postPath } from '@/lib/cms/blog';
import { site } from '@/lib/site';

export const revalidate = 600;

const escape = (s: string) => s.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]!);

/** RSS 2.0 feed of the blog: title, summary and link for every live post, newest first. */
export async function GET() {
  const [b, posts] = await Promise.all([getBlog(), getPosts()]);
  const items = posts
    .map(
      (p) => `    <item>
      <title>${escape(p.title)}</title>
      <link>${site.url}${postPath(p.slug)}</link>
      <guid isPermaLink="true">${site.url}${postPath(p.slug)}</guid>
      <pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>
      <description>${escape(p.excerpt)}</description>${p.categories.map((c) => `\n      <category>${escape(c.title)}</category>`).join('')}
    </item>`
    )
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(`${site.name} Blog`)}</title>
    <link>${site.url}/blog</link>
    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml" />
    <description>${escape(b.seo.description)}</description>
    <language>en-gb</language>
    <lastBuildDate>${(posts[0] ? new Date(posts[0].publishedAt) : new Date()).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, max-age=600' } });
}

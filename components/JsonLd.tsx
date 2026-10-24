import { site } from '@/lib/site';

type Crumb = { name: string; path: string };

/** Server-rendered JSON-LD. Keep claims limited to what the site actually states. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function BreadcrumbJsonLd({ crumbs }: { crumbs: Crumb[] }) {
  const all = [{ name: 'Home', path: '/' }, ...crumbs];
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: all.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: c.name,
          item: `${site.url}${c.path}`,
        })),
      }}
    />
  );
}

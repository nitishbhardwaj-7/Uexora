import Link from 'next/link';
import { PortableText, type PortableTextBlock, type PortableTextComponents } from 'next-sanity';
import CmsImage from '@/components/ui/CmsImage';
import { imageUrl } from '@/lib/cms/client';

type Figure = { _type: 'figure'; asset?: { url?: string; metadata?: { dimensions?: { width: number; height: number } } } | null; alt?: string; caption?: string };

const isExternal = (href: string) => /^https?:\/\//i.test(href);

/** Renders the article's Portable Text with the site's typography; inline images go through the Sanity CDN loader. */
const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="h3">{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
    normal: ({ children }) => <p>{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = (value as { href?: string } | undefined)?.href || '#';
      if (isExternal(href)) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        );
      }
      return <Link href={href}>{children}</Link>;
    },
  },
  types: {
    figure: ({ value }) => {
      const v = value as Figure;
      const src = v.asset ? imageUrl(v as never) : null;
      if (!src) return null;
      const d = v.asset?.metadata?.dimensions;
      return (
        <figure className="prose__figure" data-reveal="mask">
          <CmsImage src={src} alt={v.alt || ''} width={d?.width || 1600} height={d?.height || 1000} sizes="(max-width: 900px) 100vw, 760px" quality={82} />
          {v.caption ? <figcaption>{v.caption}</figcaption> : null}
        </figure>
      );
    },
  },
};

export default function PostBody({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="prose">
      <PortableText value={value} components={components} />
    </div>
  );
}

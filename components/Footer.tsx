import Link from 'next/link';
import Logo from './brand/Logo';
import Wordmark from './brand/Wordmark';
import Tagline from './brand/Tagline';
import FooterServices from './FooterServices';
import ContactLink from './ContactLink';
import { site } from '@/lib/site';
import { getEducation, getMarketing, getSettings } from '@/lib/cms';
import { servicePath } from '@/lib/cms/services';

/**
 * Footer: moving rows of programmes and services (real links; division pages show their own
 * row), then the brand statement, links to both divisions and the contact details.
 */
export default async function Footer({ showBlog }: { showBlog?: boolean }) {
  const [s, e, m] = await Promise.all([getSettings(), getEducation(), getMarketing()]);
  const year = new Date().getFullYear();
  return (
    <footer className="footer" data-tone="dark">
      <FooterServices
        education={e.programmes.map((p) => ({ title: p.title, href: servicePath('education', p.slug), image: p.image?.src }))}
        marketing={m.services.map((p) => ({ title: p.title, href: servicePath('marketing', p.slug), image: p.image?.src }))}
      />
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo markOnly />
            <p>
              {s.footerStatement} <strong style={{ color: 'var(--cream)' }}>{s.footerStatementStrong}</strong>
            </p>
            <Tagline />
          </div>

          <div className="footer__col">
            <p className="footer__heading">Explore</p>
            <ul>
              <li>
                <Link href="/education">Uexora Education</Link>
              </li>
              <li>
                <Link href="/marketing">Uexora Marketing Studio</Link>
              </li>
              {showBlog ? (
                <li>
                  <Link href="/blog">Blog</Link>
                </li>
              ) : null}
              <li>
                <ContactLink>Contact</ContactLink>
              </li>
            </ul>
          </div>

          <div className="footer__col">
            <p className="footer__heading">Contact</p>
            <ul>
              <li>
                <a href={`mailto:${s.email}`}>{s.email}</a>
              </li>
              {s.phone ? (
                <li>
                  <a href={`tel:${s.phone.replace(/\s+/g, '')}`}>{s.phone}</a>
                </li>
              ) : null}
              <li>
                <Link href="/contact?division=education">Education enquiries</Link>
              </li>
              <li>
                <Link href="/contact?division=marketing">Marketing enquiries</Link>
              </li>
            </ul>
            <p>
              <strong>Hours</strong>
              {s.hours}
            </p>
          </div>
        </div>

        {/* Wipes in from the left as it scrolls into view, settles from a slight zoom, then a light sweeps across the letters. */}
        <div className="footer__word" aria-hidden="true" data-reveal="wipe">
          <div className="footer__word-in">
            <Wordmark tone="light" />
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {year} {site.legalName}. All rights reserved.</span>
          <span>{s.tagline}</span>
        </div>
      </div>
    </footer>
  );
}

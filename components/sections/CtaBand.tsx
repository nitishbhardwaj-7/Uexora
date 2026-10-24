import Monogram from '@/components/brand/Monogram';
import Button from '@/components/ui/Button';

type Props = {
  eyebrow?: string;
  heading: string;
  paragraphs?: string[];
  signoff?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  tone?: 'dark' | 'light';
  id?: string;
};

export default function CtaBand({ eyebrow, heading, paragraphs = [], signoff, primary, secondary, tone = 'dark', id }: Props) {
  const dark = tone === 'dark';
  return (
    <section id={id} className={['section cta-band', dark ? '' : 'cta-band--light'].filter(Boolean).join(' ')} data-tone={tone} aria-labelledby={`${id || 'cta'}-title`}>
      <Monogram className="cta-band__mark" variant="mono" style={{ color: dark ? '#fff' : 'var(--blue-700)' }} />
      <div className="container">
        <div className="cta-band__inner">
          <h2 id={`${id || 'cta'}-title`} className="h2" data-split>
            {heading}
          </h2>
          {paragraphs.map((p, i) => (
            <p key={i} className="lead" data-reveal>
              {p}
            </p>
          ))}
          {signoff ? (
            <p className="cta-band__signoff" data-reveal>
              {signoff}
            </p>
          ) : null}
          <div className="btn-row" data-reveal>
            <Button href={primary.href} variant={dark ? 'gold' : 'blue'}>
              {primary.label}
            </Button>
            {secondary ? (
              <Button href={secondary.href} variant="ghost">
                {secondary.label}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

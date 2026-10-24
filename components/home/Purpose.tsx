import Tagline from '@/components/brand/Tagline';
import Button from '@/components/ui/Button';
import type { HomeContent } from '@/content/home';

export default function Purpose({ content }: { content: HomeContent['purpose'] }) {
  return (
    <section className="section purpose" data-tone="light" aria-labelledby="purpose-title">
      <div className="container purpose__grid">
        <div>
          <h2 id="purpose-title" className="display" data-split style={{ marginTop: '1.2rem' }}>
            {content.heading}
          </h2>
          <div className="purpose__tag" data-reveal data-reveal-delay="0.3">
            <div data-draw>
              <Tagline />
            </div>
          </div>
        </div>
        <div className="purpose__text" data-reveal-group>
          {content.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <div className="btn-row" style={{ marginTop: '0.6rem' }}>
            <Button href={content.button.href} variant="blue">
              {content.button.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

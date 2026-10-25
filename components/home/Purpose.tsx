import Tagline from '@/components/brand/Tagline';
import Monogram from '@/components/brand/Monogram';
import Button from '@/components/ui/Button';
import CmsImage from '@/components/ui/CmsImage';
import type { HomeContent } from '@/content/home';

type Photo = { src: string; alt: string };

/**
 * "Different paths. One purpose." The copy sits on the left; on the right the two
 * divisions' photos drift at different depths while two gold lines, one from each,
 * draw in with the scroll and meet at a slowly turning seal, then carry on as one.
 * The photos repeat the division cards above, so the visual is decorative.
 */
export default function Purpose({ content, education, marketing }: { content: HomeContent['purpose']; education?: Photo; marketing?: Photo }) {
  return (
    <section className="section purpose" data-tone="light" aria-labelledby="purpose-title">
      <div className="container purpose__grid">
        <div className="purpose__copy">
          <h2 id="purpose-title" className="display" data-split>
            {content.heading}
          </h2>
          <div className="purpose__tag" data-reveal data-reveal-delay="0.3">
            <div data-draw>
              <Tagline />
            </div>
          </div>
          <div className="purpose__text" data-reveal-group>
            {content.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <div className="btn-row">
              <Button href={content.button.href} variant="blue">
                {content.button.label}
              </Button>
            </div>
          </div>
        </div>

        {education && marketing ? (
          <div className="purpose__visual" aria-hidden="true">
            <figure className="purpose__photo purpose__photo--a" data-reveal="mask">
              <div className="purpose__photo-in" data-parallax="0.22">
                <CmsImage src={education.src} alt="" fill sizes="(max-width: 900px) 60vw, 26vw" quality={75} />
              </div>
              <span className="purpose__chip">Education</span>
            </figure>
            <figure className="purpose__photo purpose__photo--b" data-reveal="mask" data-reveal-delay="0.15">
              <div className="purpose__photo-in" data-parallax="0.1">
                <CmsImage src={marketing.src} alt="" fill sizes="(max-width: 900px) 55vw, 24vw" quality={75} />
              </div>
              <span className="purpose__chip">Marketing</span>
            </figure>

            {/* Two paths drawn with the scroll, meeting at the seal and continuing as one. */}
            <svg className="purpose__paths" viewBox="0 0 600 640" data-draw-scroll>
              <path d="M336 232 C 370 232, 392 218, 426 198" />
              <path d="M528 268 C 530 246, 506 232, 488 214" />
              <path d="M520 92 C 548 64, 566 40, 598 12" />
            </svg>

            <div className="purpose__seal">
              <svg className="purpose__seal-ring" viewBox="0 0 200 200">
                <defs>
                  <path id="purpose-seal-circle" d="M100 100 m -74 0 a 74 74 0 1 1 148 0 a 74 74 0 1 1 -148 0" />
                </defs>
                <text>
                  <textPath href="#purpose-seal-circle" startOffset="0">
                    DIFFERENT PATHS · ONE PURPOSE · DIFFERENT PATHS · ONE PURPOSE ·
                  </textPath>
                </text>
              </svg>
              <Monogram className="purpose__seal-mark" />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

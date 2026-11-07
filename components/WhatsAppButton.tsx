import { ICONS } from './SocialIcons';

/**
 * Floating WhatsApp button, bottom right on every page. It uses the WhatsApp link from the
 * site settings (the same one as the footer icon) and is hidden when that link is empty.
 * It rises in once the page has loaded, sends out soft rings and gives a small nudge every
 * few seconds to draw the eye; under reduced motion it simply sits there.
 */
export default function WhatsAppButton({ href }: { href: string }) {
  return (
    <a className="wa-float" href={href} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp (opens in a new tab)" title="Chat with us on WhatsApp">
      <span className="wa-float__ring" aria-hidden="true" />
      <span className="wa-float__ring wa-float__ring--late" aria-hidden="true" />
      <svg className="wa-float__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path fill="currentColor" d={ICONS.whatsapp.d} />
      </svg>
    </a>
  );
}

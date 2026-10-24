import SiteChrome from '@/components/SiteChrome';
import Monogram from '@/components/brand/Monogram';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <SiteChrome>
      <section className="not-found" data-tone="dark">
        <div className="not-found__inner">
          <Monogram />
          <h1 className="h1">Page not found.</h1>
          <p className="lead">The page you are looking for has moved or never existed.</p>
          <Button href="/" variant="gold">
            Back to home
          </Button>
        </div>
      </section>
    </SiteChrome>
  );
}

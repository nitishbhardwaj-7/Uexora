/** @type {import('next').NextConfig} */

// Long-lived caching for fingerprint-free static assets we control.
// If an image is replaced in place, rename the file (the brand/ and images/ names are referenced in code).
const immutable = 'public, max-age=31536000, immutable';

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Photos uploaded in the content studio are served from Sanity's CDN.
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
    qualities: [70, 75, 82],
    formats: ['image/avif', 'image/webp'],
    // Up to 3200 so full-width hero photos stay sharp on high-density screens.
    deviceSizes: [360, 414, 640, 768, 1024, 1280, 1536, 1920, 2560, 3200],
    imageSizes: [48, 64, 96, 128, 192, 256, 320, 384, 520],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async redirects() {
    return [
      // One canonical host: www redirects to the apex domain.
      { source: '/:path*', has: [{ type: 'host', value: 'www.uexora.com' }], destination: 'https://uexora.com/:path*', permanent: true },
      // "Why choose us" now lives as a section on each division page.
      { source: '/education/why-choose-us', destination: '/education#why-choose-us', permanent: true },
      { source: '/marketing/why-choose-us', destination: '/marketing#why-choose-us', permanent: true },
      // Education programmes renamed or retired; old addresses keep working.
      { source: '/education/english-language-and-overseas-education', destination: '/education/overseas-education-and-english-language', permanent: true },
      { source: '/education/ai-coding-and-robotics', destination: '/education/ai-coding-and-robotics-for-students', permanent: true },
      { source: '/education/communication-public-speaking-and-confidence', destination: '/education/communication-public-speaking-and-confidence-building', permanent: true },
      { source: '/education/inclusive-and-specialised-learning-support', destination: '/education/special-needs-students-programme', permanent: true },
      { source: '/education/practical-skills-and-personal-development', destination: '/education#programmes', permanent: true },
    ];
  },
  async headers() {
    return [
      { source: '/(.*)', headers: securityHeaders },
      { source: '/brand/:path*', headers: [{ key: 'Cache-Control', value: immutable }] },
      { source: '/images/:path*', headers: [{ key: 'Cache-Control', value: immutable }] },
    ];
  },
};

export default nextConfig;

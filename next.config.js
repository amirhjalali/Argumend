/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const isDev = process.env.NODE_ENV === 'development';
const authEntryEnabled = process.env.NEXT_PUBLIC_ENABLE_AUTH === 'true';

// Build Content-Security-Policy header value
const cspDirectives = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' https://images.unsplash.com https://www.google-analytics.com data:",
  "font-src 'self'",
  "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
];
const contentSecurityPolicy = cspDirectives.join('; ');

const embedContentSecurityPolicy = cspDirectives
  .map((directive) =>
    directive.startsWith("frame-ancestors ") ? "frame-ancestors *" : directive
  )
  .join('; ');

const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
];

const discoveryCacheHeaders = [
  {
    key: 'Cache-Control',
    value: 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
  },
];

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone', // Required for Docker deployments
  serverExternalPackages: ['postgres'],
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
    buildActivityPosition: 'bottom-right',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      // Avoid streaming an account-only shell before the page-level redirect.
      // In the default offline experience these URLs belong to local bookmarks.
      ...(!authEntryEnabled
        ? [
            {
              source: '/auth/signin',
              destination: '/saved',
              permanent: false,
            },
            {
              source: '/dashboard',
              destination: '/saved',
              permanent: false,
            },
          ]
        : []),
      // www → non-www canonical redirect
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.argumend.org' }],
        destination: 'https://argumend.org/:path*',
        permanent: true,
      },
      // /explore was a redundant second topic-browser; /topics is canonical.
      // 301 consolidates SEO authority onto /topics.
      {
        source: '/explore',
        destination: '/topics',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      // Stable generated discovery documents should not be revalidated by
      // every browser request; Next's route cache refreshes them daily.
      { source: '/robots.txt', headers: discoveryCacheHeaders },
      { source: '/sitemap.xml', headers: discoveryCacheHeaders },
      { source: '/manifest.webmanifest', headers: discoveryCacheHeaders },
      {
        // Protect normal pages from framing. The dedicated embed widget is
        // intentionally excluded and receives its own policy below.
        source: '/((?!embed/).*)',
        headers: securityHeaders,
      },
      {
        source: '/embed/:path*',
        headers: [
          ...securityHeaders.filter(
            ({ key }) =>
              key !== 'X-Frame-Options' && key !== 'Content-Security-Policy'
          ),
          { key: 'Content-Security-Policy', value: embedContentSecurityPolicy },
        ],
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);

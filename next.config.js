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
  // Crux ledgers are read from disk by lib/argument/ledgerFile.ts (a missing
  // file is an empty ledger, so they cannot be static imports). Flagship topic
  // pages are prerendered, but /topics (dynamic) loads every flagship at
  // request time, so keep the files in the standalone trace or a runtime
  // render silently sees an empty ledger. Keys are picomatch globs matched
  // with `contains`, so '/topics' covers /topics and /topics/[id]. /ai reads
  // the AI maps' ledgers on every request (its ?map=/?since= links make it
  // dynamic), and the revalidated sitemap dates /ai by them, so both need the
  // same files.
  outputFileTracingIncludes: {
    '/topics': ['./data/argument/**/*.json'],
    '/ai': ['./data/argument/**/*.json'],
    '/sitemap.xml': ['./data/argument/**/*.json'],
  },
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
      // ── home + story (ux/home-story, 2026-09-29) ─────────────────────────
      // Home no longer hosts the legacy canvas. `/?topic=:id` (with any
      // `view`) opened it; every map lives at /topics/:id. Next merges the
      // incoming query into the destination, so `view=read` is set here to
      // override a `view=logic-map`, which the legacy topic page would
      // otherwise bounce straight back to `/?topic=` (a redirect loop).
      {
        source: '/',
        has: [{ type: 'query', key: 'topic', value: '(?<id>.*)' }],
        destination: '/topics/:id?view=read',
        permanent: true,
      },
      // The story lives on one page. /how-it-works and /community were
      // folded into /about.
      {
        source: '/how-it-works',
        destination: '/about#read-a-map',
        permanent: true,
      },
      {
        source: '/community',
        destination: '/about#contribute',
        permanent: true,
      },
      // ── end home + story ────────────────────────────────────────────────
      // ── paste flow (2026-09-29) ──────────────────────────────────────────
      // One paste tool at /analyze. /analyze-v2 was the flagged diagnosis
      // page, now a lane of /analyze; /analyses was a public list of saved
      // extractions, which the paste flow no longer makes. 308s.
      // /reply stays until its thread lane is folded into /analyze.
      {
        source: '/analyze-v2',
        destination: '/analyze',
        permanent: true,
      },
      {
        source: '/analyses',
        destination: '/analyze',
        permanent: true,
      },
      // ── end paste flow ───────────────────────────────────────────────────
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

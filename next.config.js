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
      // ── Maps library (2026-09-29) ─────────────────────────────────────
      // /topics is the one library. The category and tag pages duplicated
      // it with different cards and verdict chips; compare ranked unrelated
      // debates against each other. All three are gone. A query string on
      // the old URL (?page=2) is carried over by Next.
      {
        source: '/topics/category/:slug',
        destination: '/topics?category=:slug',
        statusCode: 301,
      },
      {
        source: '/topics/tag/:slug',
        destination: '/topics?q=:slug',
        statusCode: 301,
      },
      {
        source: '/topics/compare',
        destination: '/topics',
        statusCode: 301,
      },
      {
        source: '/topics/compare/:path+',
        destination: '/topics',
        statusCode: 301,
      },
      // ── end maps library ──────────────────────────────────────────────
      // ── home + story (ux/home-story, 2026-09-29) ─────────────────────────
      // Home no longer hosts the legacy canvas. Its links, `/?topic=:id`
      // with any `view`, are redirected by proxy.ts (legacyHomeTopicPath in
      // lib/dynamicRoutePolicy.ts), not here: a rule here would carry the
      // stale `topic`/`view` query onto the map's URL, and it would run
      // before the proxy could drop them. `view=graph|logic-map` goes to
      // the diagram, /topics/:id/map; anything else to /topics/:id.
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
      // ── learn (ux/learn, 2026-09-29) ──────────────────────────────────
      // One /learn hub replaces the separate library indexes; see
      // docs/reviews/2026-09-29-learn.md. Detail pages keep their URLs.
      { source: '/concepts', destination: '/learn#ideas', permanent: true },
      { source: '/guides', destination: '/learn#guides', permanent: true },
      // Two ideas taught retired scoring vocabulary (r4, 2026-10): "Balance
      // and weight" now lives where it is still true, in How maps are made;
      // "Pillars" were a section format the maps no longer name, and every
      // section's point is its crux.
      {
        source: '/concepts/confidence-calibration',
        destination: '/methodology#older-maps',
        permanent: true,
      },
      { source: '/concepts/pillars', destination: '/concepts/cruxes', permanent: true },
      // The library's reading list now lives on /research.
      { source: '/library', destination: '/research#reading', permanent: true },
      { source: '/lessons-from-the-deep', destination: '/blog', permanent: true },
      // The /is verdict pages are retired: each goes to the crux-first
      // question page for the same map. The map is a legacy table built from
      // data/is-claims.ts; lib/learn/isToQuestions.test.ts fails if any entry
      // stops pointing at a real /questions page.
      { source: '/is', destination: '/questions', permanent: true },
      ...Object.entries(require('./lib/learn/isToQuestions.json')).map(
        ([from, to]) => ({
          source: `/is/${from}`,
          destination: `/questions/${to}`,
          permanent: true,
        })
      ),
      // ── end learn ───────────────────────────────────────────────────────
    ];
  },
  async headers() {
    return [
      // Stable generated discovery documents should not be revalidated by
      // every browser request; Next's route cache refreshes them daily.
      { source: '/robots.txt', headers: discoveryCacheHeaders },
      { source: '/sitemap.xml', headers: discoveryCacheHeaders },
      { source: '/manifest.webmanifest', headers: discoveryCacheHeaders },
      // Self-hosted italic faces (app/layout.tsx). Each file name carries the
      // font's upstream version, so a changed font is a new URL.
      {
        source: '/fonts/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
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

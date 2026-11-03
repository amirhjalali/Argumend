/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const fs = require('node:fs');
const path = require('node:path');

const isDev = process.env.NODE_ENV === 'development';

// The image optimizer (/_next/image) needs sharp's libvips shared library in
// the standalone output. Next's file tracer copies it only through a special
// case keyed on sharp's old entry point (sharp/lib/index.js). sharp 0.35 moved
// to dist/index.cjs, so the tracer copies sharp's .node binary but not
// libvips-cpp.*, sharp fails to load at runtime, and Next silently serves
// every image unresized, in its original format. List the libvips files
// explicitly. The path comes from resolving sharp, so a symlinked
// node_modules (as in a worktree checkout) traces the real files.
const sharpLibvipsGlob = (() => {
  try {
    const sharpDir = path.dirname(path.dirname(fs.realpathSync(require.resolve('sharp'))));
    const imgDir = path.join(path.dirname(sharpDir), '@img');
    return `${path.relative(__dirname, imgDir).split(path.sep).join('/')}/sharp-libvips-*/lib/**/*`;
  } catch {
    return null;
  }
})();
const authEntryEnabled = process.env.NEXT_PUBLIC_ENABLE_AUTH === 'true';

// The origin of a cookieless analytics script, when one is configured
// (NEXT_PUBLIC_ANALYTICS_PROVIDER=plausible|umami). Both send their events
// back to the origin that served the script. This repeats the https-only
// check in lib/analyticsConfig.ts, which next.config.js cannot import;
// next.config.test.ts asserts the two agree.
function cookielessAnalyticsOrigin(env = process.env) {
  const provider = (env.NEXT_PUBLIC_ANALYTICS_PROVIDER || '').trim().toLowerCase();
  const src =
    provider === 'plausible'
      ? env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC
      : provider === 'umami'
        ? env.NEXT_PUBLIC_UMAMI_SCRIPT_SRC
        : undefined;
  if (!src || !src.trim()) return null;
  try {
    const url = new URL(src.trim());
    return url.protocol === 'https:' && !url.username && !url.password ? url.origin : null;
  } catch {
    return null;
  }
}
const analyticsOrigin = cookielessAnalyticsOrigin();
const analyticsSource = analyticsOrigin ? ` ${analyticsOrigin}` : '';

// Build Content-Security-Policy header value
// Cloudflare Web Analytics: the proxy injects its beacon script from
// static.cloudflareinsights.com, and the beacon reports to cloudflareinsights.com.
// Google Analytics 4 (Google's CSP guide, "without any Ads features"): gtag.js
// from www.googletagmanager.com; hits go to region-specific hosts such as
// region1.google-analytics.com and region1.analytics.google.com, so the
// wildcards are needed — www.google-analytics.com alone drops most hits.
const cspDirectives = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://static.cloudflareinsights.com${analyticsSource}${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' https://images.unsplash.com https://*.google-analytics.com https://www.googletagmanager.com data:",
  "font-src 'self'",
  `connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://cloudflareinsights.com${analyticsSource}`,
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
    // Every traced route, so the files reach the standalone tree as long as
    // any route is dynamic (see sharpLibvipsGlob above).
    ...(sharpLibvipsGlob ? { '/**': [sharpLibvipsGlob] } : {}),
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
      // and weight" is gone from the maps, so it lands on the guide to reading
      // confidence (How maps are made keeps only a one-line history);
      // "Pillars" were a section format the maps no longer name, and every
      // section's point is its crux.
      {
        source: '/concepts/confidence-calibration',
        destination: '/guides/reading-confidence-like-a-forecaster',
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
      // ── retired maps (one map per question, 2026-10-06) ─────────────────
      // A map merged into another asks the same question, so each of its
      // URLs goes straight to the kept map's: the page, the diagram (the
      // kept page itself when it is a flagship, which has none), the embed,
      // every /questions phrasing (to the kept map's primary question, or
      // its page when it has no question page) and any /is slug whose claim
      // no longer has a legacy map to name. One hop each; the table is
      // data/retiredMaps.json, tested in lib/retiredMaps.test.ts.
      ...Object.entries(require('./data/retiredMaps.json')).flatMap(
        ([from, to]) => [
          { source: `/topics/${from}`, destination: `/topics/${to.into}`, permanent: true },
          { source: `/topics/${from}/map`, destination: to.map, permanent: true },
          { source: `/embed/${from}`, destination: `/embed/${to.into}`, permanent: true },
          ...to.questions.map((slug) => ({
            source: `/questions/${slug}`,
            destination: to.questionsTo,
            permanent: true,
          })),
          ...to.is.map((slug) => ({
            source: `/is/${slug}`,
            destination: to.questionsTo,
            permanent: true,
          })),
        ]
      ),
      // ── end retired maps ────────────────────────────────────────────────
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

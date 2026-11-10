/**
 * Which analytics provider, if any, this build talks to.
 *
 * Every input is a NEXT_PUBLIC_ variable, read by its literal name so Next
 * inlines it into client code at build time. The same function therefore
 * answers on the server (app/layout.tsx, which loads the script) and in the
 * browser (lib/analytics.ts, which decides whether to queue an event). With
 * nothing set, it answers `null` and every analytics call is a no-op.
 *
 * next.config.js cannot import TypeScript, so it repeats the origin logic in
 * `analyticsCspSources()`; next.config.test.ts holds the two together.
 *
 * See docs/ANALYTICS.md for what each provider collects and how to turn one on.
 */

export type AnalyticsProvider = "ga" | "plausible" | "umami";

export type AnalyticsConfig =
  | { provider: "ga"; measurementId: string }
  | { provider: "plausible"; scriptSrc: string; domain?: string }
  | { provider: "umami"; scriptSrc: string; websiteId: string };

export interface AnalyticsEnv {
  NEXT_PUBLIC_ANALYTICS_PROVIDER?: string;
  NEXT_PUBLIC_GA_MEASUREMENT_ID?: string;
  NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC?: string;
  NEXT_PUBLIC_PLAUSIBLE_DOMAIN?: string;
  NEXT_PUBLIC_UMAMI_SCRIPT_SRC?: string;
  NEXT_PUBLIC_UMAMI_WEBSITE_ID?: string;
}

/** Literal reads, so the bundler can inline each one. */
export function readAnalyticsEnv(): AnalyticsEnv {
  return {
    NEXT_PUBLIC_ANALYTICS_PROVIDER: process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER,
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC: process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC,
    NEXT_PUBLIC_PLAUSIBLE_DOMAIN: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
    NEXT_PUBLIC_UMAMI_SCRIPT_SRC: process.env.NEXT_PUBLIC_UMAMI_SCRIPT_SRC,
    NEXT_PUBLIC_UMAMI_WEBSITE_ID: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,
  };
}

// The ID is interpolated into a script URL, so only the shape Google issues
// is accepted: a typo or a pasted quote turns analytics off, not the page.
const GA_ID_RE = /^G-[A-Z0-9]{4,20}$/;
const UMAMI_ID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const DOMAIN_RE = /^[a-z0-9.-]{1,253}$/i;

/** An https script URL, or null. Plain http would be blocked as mixed content. */
export function httpsUrl(value: string | undefined): string | null {
  const raw = value?.trim();
  if (!raw) return null;
  try {
    const url = new URL(raw);
    return url.protocol === "https:" && !url.username && !url.password ? url.href : null;
  } catch {
    return null;
  }
}

export function resolveAnalyticsConfig(env: AnalyticsEnv = readAnalyticsEnv()): AnalyticsConfig | null {
  const requested = env.NEXT_PUBLIC_ANALYTICS_PROVIDER?.trim().toLowerCase() || undefined;
  if (requested === "none" || requested === "off") return null;

  const gaId = env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  // Unset provider + a GA ID is how the site was configured before the
  // provider switch existed; it still means Google Analytics.
  const provider = requested ?? (gaId ? "ga" : undefined);

  if (provider === "ga") {
    return gaId && GA_ID_RE.test(gaId) ? { provider: "ga", measurementId: gaId } : null;
  }
  if (provider === "plausible") {
    const scriptSrc = httpsUrl(env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC);
    if (!scriptSrc) return null;
    const domain = env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN?.trim();
    return {
      provider: "plausible",
      scriptSrc,
      ...(domain && DOMAIN_RE.test(domain) ? { domain } : {}),
    };
  }
  if (provider === "umami") {
    const scriptSrc = httpsUrl(env.NEXT_PUBLIC_UMAMI_SCRIPT_SRC);
    const websiteId = env.NEXT_PUBLIC_UMAMI_WEBSITE_ID?.trim();
    return scriptSrc && websiteId && UMAMI_ID_RE.test(websiteId)
      ? { provider: "umami", scriptSrc, websiteId }
      : null;
  }
  return null;
}

/**
 * Query parameters that may reach an analytics provider in a page URL. All
 * others are dropped: `/topics?q=…` and `/questions?q=…` carry what a visitor
 * typed, and a URL is the one place free text could otherwise slip out.
 */
export const ANALYTICS_URL_PARAMS = [
  "page",
  "category",
  "sort",
  "view",
  "map",
  "since",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "ref",
] as const;

const ALLOWED_PARAMS = new Set<string>(ANALYTICS_URL_PARAMS);

/** The URL with only allow-listed query parameters and no fragment. */
export function sanitizeAnalyticsUrl(href: string): string {
  try {
    const url = new URL(href);
    for (const key of [...url.searchParams.keys()]) {
      if (!ALLOWED_PARAMS.has(key)) url.searchParams.delete(key);
    }
    url.hash = "";
    return url.href;
  } catch {
    return "";
  }
}

/** The path plus allow-listed query, for GA's page_path. */
export function sanitizeAnalyticsPath(pathname: string, search: string): string {
  const url = new URL(`${pathname}${search ? `?${search.replace(/^\?/, "")}` : ""}`, "https://x.invalid");
  const clean = new URL(sanitizeAnalyticsUrl(url.href));
  return `${clean.pathname}${clean.search}`;
}

/**
 * Google Search Console's HTML-tag verification, as Next metadata: the token
 * from Search Console's "HTML tag" method, which Next renders as
 * <meta name="google-site-verification" content="…">. Nothing when unset.
 * Tokens are URL-safe base64; anything else is ignored.
 */
export function siteVerificationMetadata(
  token: string | undefined = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
): { verification: { google: string } } | Record<string, never> {
  const value = token?.trim();
  return value && /^[A-Za-z0-9_-]{10,100}$/.test(value) ? { verification: { google: value } } : {};
}

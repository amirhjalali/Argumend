/**
 * Public report slugs are `REPORT_SLUG_BYTES` random bytes in base64url, which
 * always encodes to exactly `REPORT_SLUG_LENGTH` characters with no padding.
 * The pattern lets the proxy reject malformed `/d/:slug` URLs before React
 * streams, so those 404s are server-rendered instead of falling into Next's
 * client-rendered error shell.
 *
 * This module is imported by the proxy via lib/dynamicRoutePolicy.ts, so it
 * must stay free of Node-only imports; generation lives in publication.ts.
 */
export const REPORT_SLUG_BYTES = 9;
export const REPORT_SLUG_LENGTH = 12;
export const REPORT_SLUG_PATTERN = /^[A-Za-z0-9_-]{12}$/;

export function isReportSlug(value: string): boolean {
  return REPORT_SLUG_PATTERN.test(value);
}

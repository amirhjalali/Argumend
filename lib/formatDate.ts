/**
 * Canonical date formatting.
 *
 * Single source of truth for the two human-readable date shapes the UI uses.
 * Previously a private `formatDate` was re-declared in /blog, /blog/[slug],
 * /blog/category/[category], /blog/tag/[tag], /dashboard, ReadModeView and
 * AnalysisView — seven copies of two formats, split between
 * `toLocaleDateString` and `Intl.DateTimeFormat`, and only one of them guarded
 * against an unparseable input.
 *
 * The locale is pinned to "en-US" on purpose: these strings are rendered on the
 * server and hydrated on the client, so a runtime-dependent locale would
 * produce a hydration mismatch.
 *
 * Invalid input never throws. A bad ISO string comes back unchanged (so the raw
 * value is at least visible/debuggable in the UI); a bad `Date` comes back "".
 *
 * Caveat (pre-existing, deliberately preserved): a *date-only* string such as
 * "2026-01-15" is parsed as UTC midnight but rendered in the host timezone, so
 * it renders as the 14th anywhere behind UTC. Every current caller passes a
 * full timestamp, which is why this has never bitten; prefer full timestamps.
 */

const LONG_OPTIONS: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const SHORT_OPTIONS: Intl.DateTimeFormatOptions = {
  month: "short",
  day: "numeric",
  year: "numeric",
};

function format(
  value: string | Date,
  options: Intl.DateTimeFormatOptions
): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return typeof value === "string" ? value : "";
  }
  return date.toLocaleDateString("en-US", options);
}

/** "January 15, 2026" — article bylines, provenance strips, analysis headers. */
export function formatLongDate(value: string | Date): string {
  return format(value, LONG_OPTIONS);
}

/** "Jan 15, 2026" — dense list rows (dashboard, /analyses). */
export function formatShortDate(value: string | Date): string {
  return format(value, SHORT_OPTIONS);
}

/**
 * Small, pure formatting helpers for the living AI map. No React.
 */
import type { VerificationState } from "@/types/argument";
import type { CruxLedgerStatus } from "@/types/cruxLedger";

/** Short names for the AI maps, used on every card and filter link. */
export const AI_MAP_LABELS: Readonly<Record<string, string>> = {
  "ai-mass-unemployment": "AI and jobs",
  "capitalism-after-ai": "Capitalism and AI",
};

export function mapLabel(topicId: string, fallback: string): string {
  return AI_MAP_LABELS[topicId] ?? fallback;
}

/** The ledger's status words. Movement, not verdict. */
export const STATUS_WORD: Record<CruxLedgerStatus, string> = {
  open: "Open",
  narrowed: "Narrowed",
  resolved: "Resolved",
  unresolvable: "Unresolvable by evidence",
};

/** Text colour per status, matching the crux ledger strip on the map pages. */
export const STATUS_TEXT: Record<CruxLedgerStatus, string> = {
  open: "text-stone-600 dark:text-stone-300",
  narrowed: "text-[#3a6965] dark:text-[#8fc0bb]",
  resolved: "text-[#56736f] dark:text-[#7f9c99]",
  unresolvable: "text-[#8B5A3C] dark:text-[#cfa88a]",
};

/** How far a source's link has been checked, in plain words. */
export const VERIFICATION_LINE: Record<VerificationState, string> = {
  "verified-live": "Link checked live",
  "verified-content": "Checked against the source text",
  "bot-blocked-assumed-live": "The site blocks automated checks; link assumed live",
  unverified: "Not yet verified",
};

const DAY = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const LONG_DAY = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const MONTH = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

function parse(value: string): Date | null {
  const parsed = new Date(`${value.slice(0, 10)}T00:00:00Z`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

/** "Sep 22, 2026" */
export function formatDay(value: string): string {
  const parsed = parse(value);
  return parsed ? DAY.format(parsed) : value;
}

/** "September 22, 2026" */
export function formatLongDay(value: string): string {
  const parsed = parse(value);
  return parsed ? LONG_DAY.format(parsed) : value;
}

/** "Sep 2026" */
export function formatMonth(value: string): string {
  const parsed = parse(value);
  return parsed ? MONTH.format(parsed) : value;
}

/**
 * A source's own date, which may be partial ("2026-04", "2025"). Returns null
 * when absent so callers can drop the clause.
 */
export function formatSourceDate(value: string | undefined): string | null {
  if (!value) return null;
  if (/^\d{4}-\d{2}-\d{2}/.test(value)) return formatDay(value);
  if (/^\d{4}-\d{2}$/.test(value)) return formatMonth(`${value}-01`);
  return value;
}

/** A stable, CSS-safe id fragment. */
export function domId(value: string): string {
  return value.replace(/[^A-Za-z0-9_-]/g, "-");
}

/** Link to the page with the given filters; default values are left out. */
export function aiHref(params: { map?: string; since?: string }): string {
  const search = new URLSearchParams();
  if (params.map) search.set("map", params.map);
  if (params.since) search.set("since", params.since);
  const query = search.toString();
  return query ? `/ai?${query}` : "/ai";
}

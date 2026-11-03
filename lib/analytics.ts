/**
 * Counts-only product events, sent to whichever analytics provider this build
 * is configured for (lib/analyticsConfig.ts): Google Analytics 4, Plausible,
 * or Umami. With none configured, every call returns at once and nothing is
 * stored, queued or sent.
 *
 * What may leave the browser is fixed in two places:
 *
 * 1. The `AnalyticsEvent` union: every event and every parameter it can carry.
 *    No event has a field for pasted text, a search query, a name or an email.
 * 2. `analyticsParams()`, which runs on every event at runtime: a string
 *    parameter must be a short token (a map id, an enum value, a bucket such as
 *    "m"), with no spaces, or it is dropped. A future caller that passes a
 *    sentence by mistake sends nothing instead of the sentence.
 *
 * Page URLs go through `sanitizeAnalyticsUrl()`, which keeps only allow-listed
 * query parameters, so `/topics?q=…` reaches GA as `/topics`.
 *
 * Events fired before the provider is ready (the first render of a page runs
 * its effects before the analytics bootstrap's) wait in a short queue that
 * `flushAnalyticsQueue()` drains. See docs/ANALYTICS.md.
 */

import {
  resolveAnalyticsConfig,
  sanitizeAnalyticsPath,
  sanitizeAnalyticsUrl,
  type AnalyticsConfig,
} from "@/lib/analyticsConfig";

/** Paste lengths: `characterBucket()` in lib/disagreement/labels.ts, the diagnosis lane's buckets. */
export type LengthBucket = "xs" | "s" | "m" | "l" | "xl";
export type PasteResult = "match" | "closest" | "no_match" | "error";
export type SearchSurface = "site_search" | "library" | "questions";
export type ResultsBucket = "0" | "1-5" | "6-20" | "21+";
export type SharePlatform = "native" | "copy" | "x" | "linkedin";
export type ScrollMilestone = 25 | 50 | 75 | 100;
export type TopicKind = "flagship" | "legacy";

export type AnalyticsEvent =
  // ── Topic page funnel (components/analytics/TopicAnalytics.tsx) ──
  | { action: "topic_view"; topicId: string; topicKind: TopicKind }
  | { action: "first_crux_seen"; topicId: string }
  | { action: "crux_open"; topicId: string; cruxIndex: number }
  | { action: "evidence_expand"; topicId: string; cruxIndex: number }
  | { action: "scroll_depth"; topicId: string; percent: ScrollMilestone }
  | { action: "share_click"; platform: SharePlatform }
  // ── Diagram view (/topics/[id]/map) ──
  | { action: "diagram_view"; topicId: string }
  | { action: "node_expand"; topicId: string; nodeId: string }
  // ── Paste tool (/analyze) ──
  | { action: "paste_submit"; contentType: string; lengthBucket: LengthBucket }
  | { action: "paste_result"; result: PasteResult; lengthBucket: LengthBucket }
  // ── Search (header search, /topics, /questions) ──
  | { action: "search_used"; surface: SearchSurface; resultsBucket: ResultsBucket }
  // ── Elsewhere ──
  | { action: "newsletter_signup"; source: string }
  | { action: "cta_click"; ctaName: string; location: string }
  | {
      action: "disagreement_analysis_started";
      contentType: string;
      characterBucket: string;
    }
  | {
      action: "disagreement_analysis_completed";
      diagnosisPattern: string;
      positionCount: number;
      cruxCount: number;
      latencyBucket: string;
    }
  | {
      action: "disagreement_analysis_failed";
      errorCode: string;
    }
  | {
      action: "disagreement_section_opened";
      section: "common-ground" | "position" | "disagreement" | "crux" | "source";
    }
  | {
      action: "disagreement_public_link_created";
      diagnosisPattern: string;
    }
  | {
      action: "disagreement_share_clicked";
      platform: "copy" | "x" | "native";
      surface: "session" | "public";
    }
  | {
      action: "disagreement_feedback_submitted";
      section: string;
      vote?: string;
    }
  | {
      action: "disagreement_analyze_another";
      surface: "session" | "public";
    };

export type AnalyticsParams = Record<string, string | number | boolean>;

/**
 * A string parameter must look like an identifier: letters, digits and
 * `_ - . : /`, at most 64 characters, no spaces. Map ids, enum values, error
 * codes and buckets all pass; a sentence, a query or an email address
 * (`@` is not allowed) does not.
 */
const TOKEN_RE = /^[A-Za-z0-9_.:/-]{1,64}$/;

export function analyticsParams(raw: Record<string, unknown>): AnalyticsParams {
  const params: AnalyticsParams = {};
  for (const [key, value] of Object.entries(raw)) {
    if (typeof value === "string" && TOKEN_RE.test(value)) params[key] = value;
    else if (typeof value === "number" && Number.isFinite(value)) params[key] = value;
    else if (typeof value === "boolean") params[key] = value;
  }
  return params;
}

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

let configOverride: AnalyticsConfig | null | undefined;
let resolved: AnalyticsConfig | null | undefined;

function config(): AnalyticsConfig | null {
  if (configOverride !== undefined) return configOverride;
  if (resolved === undefined) resolved = resolveAnalyticsConfig();
  return resolved;
}

/** Tests only: pretend the build was configured this way (undefined = from env). */
export function setAnalyticsConfigForTesting(next: AnalyticsConfig | null | undefined) {
  configOverride = next;
  queue.length = 0;
}

export function analyticsEnabled(): boolean {
  return typeof window !== "undefined" && config() !== null;
}

// ---------------------------------------------------------------------------
// Delivery
// ---------------------------------------------------------------------------

type Pending =
  | { kind: "event"; name: string; params: AnalyticsParams; href: string }
  | { kind: "page_view"; path: string; href: string; referrer: string };

const QUEUE_LIMIT = 50;
const queue: Pending[] = [];

function deliver(item: Pending, cfg: AnalyticsConfig): boolean {
  const w = window;
  switch (cfg.provider) {
    case "ga": {
      if (typeof w.gtag !== "function") return false;
      if (item.kind === "page_view") {
        w.gtag("event", "page_view", {
          page_path: item.path,
          page_location: item.href,
          ...(item.referrer ? { page_referrer: item.referrer } : {}),
          send_to: cfg.measurementId,
        });
      } else {
        // page_location is set explicitly so GA never falls back to the raw
        // address bar, which can hold a search query.
        w.gtag("event", item.name, { ...item.params, page_location: item.href, send_to: cfg.measurementId });
      }
      return true;
    }
    case "plausible": {
      if (item.kind === "page_view") return true; // the script counts page views itself
      if (typeof w.plausible !== "function") return false;
      w.plausible(item.name, { props: item.params });
      return true;
    }
    case "umami": {
      if (item.kind === "page_view") return true; // the script counts page views itself
      if (typeof w.umami?.track !== "function") return false;
      w.umami.track(item.name, item.params);
      return true;
    }
  }
}

function send(item: Pending) {
  const cfg = config();
  if (!cfg) return;
  if (queue.length === 0 && deliver(item, cfg)) return;
  if (queue.length < QUEUE_LIMIT) queue.push(item);
  flushAnalyticsQueue();
}

/** Deliver queued events once the provider's function exists. Safe to call repeatedly. */
export function flushAnalyticsQueue() {
  const cfg = config();
  if (!cfg || typeof window === "undefined") {
    queue.length = 0;
    return;
  }
  while (queue.length > 0 && deliver(queue[0], cfg)) queue.shift();
}

/** Same-origin referrers are this site's own URLs and get the same treatment. */
function cleanReferrer(): string {
  const ref = typeof document !== "undefined" ? document.referrer : "";
  if (!ref) return "";
  try {
    return new URL(ref).origin === window.location.origin ? sanitizeAnalyticsUrl(ref) : ref;
  } catch {
    return "";
  }
}

export function trackEvent(event: AnalyticsEvent) {
  if (typeof window === "undefined" || !config()) return;
  const { action, ...raw } = event;
  send({
    kind: "event",
    name: action,
    params: analyticsParams(raw),
    href: sanitizeAnalyticsUrl(window.location.href),
  });
}

/**
 * A client-side navigation. GA needs one sent by hand (its config sets
 * send_page_view: false); Plausible and Umami count navigations themselves.
 */
export function trackPageView(pathname: string, search: string) {
  if (typeof window === "undefined" || config()?.provider !== "ga") return;
  send({
    kind: "page_view",
    path: sanitizeAnalyticsPath(pathname, search),
    href: sanitizeAnalyticsUrl(window.location.href),
    referrer: cleanReferrer(),
  });
}

// ---------------------------------------------------------------------------
// Buckets
// ---------------------------------------------------------------------------


export function resultsBucket(count: number): ResultsBucket {
  if (count <= 0) return "0";
  if (count <= 5) return "1-5";
  if (count <= 20) return "6-20";
  return "21+";
}

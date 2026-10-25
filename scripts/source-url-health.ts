export type SourceUrlValidation =
  | { valid: true; normalized: string }
  | { valid: false; reason: string };

const PLACEHOLDER_HOSTS = new Set([
  "example.com",
  "example.org",
  "example.net",
  "localhost",
]);

export function validateSourceUrl(raw: string): SourceUrlValidation {
  if (raw !== raw.trim()) {
    return { valid: false, reason: "leading or trailing whitespace" };
  }
  if (/\s/.test(raw)) {
    return { valid: false, reason: "contains whitespace" };
  }

  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    return { valid: false, reason: "invalid URL" };
  }

  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    return { valid: false, reason: "must use http or https" };
  }
  if (!parsed.hostname || !parsed.hostname.includes(".")) {
    return { valid: false, reason: "invalid hostname" };
  }
  if (parsed.username || parsed.password) {
    return { valid: false, reason: "must not contain credentials" };
  }

  const hostname = parsed.hostname.toLowerCase();
  const placeholder =
    PLACEHOLDER_HOSTS.has(hostname) ||
    hostname.endsWith(".example") ||
    hostname.endsWith(".invalid") ||
    hostname.endsWith(".test");
  if (placeholder) {
    return { valid: false, reason: "placeholder hostname" };
  }

  return { valid: true, normalized: parsed.href };
}

/**
 * Some publishers return HTTP 200 after redirecting a removed page to a
 * clearly labeled not-found route. Keep this deliberately narrow so a generic
 * landing-page redirect remains a manual review rather than a false positive.
 */
export function isKnownSoft404Url(raw: string): boolean {
  try {
    const path = new URL(raw).pathname.toLowerCase().replace(/\/+$/, "");
    return path === "/404" || path === "/page-not-found";
  } catch {
    return false;
  }
}

export type SourceUrlStatus =
  | "OK"
  | "REDIRECTED"
  | "DEAD"
  | "MALFORMED"
  | "BLOCKED"
  | "BOT_WALL"
  | "ERROR";

/**
 * Springer Nature bounces cookie-less clients through idp.nature.com and back
 * to the article with `?error=cookies_not_supported&code=<uuid>` appended.
 * The final URL is not a canonical location, so it must never be reported as
 * a redirect worth canonicalizing.
 */
export function isCookieWallUrl(raw: string): boolean {
  try {
    return new URL(raw).searchParams.get("error") === "cookies_not_supported";
  } catch {
    return false;
  }
}

export type FetchOutcome = {
  /** HTTP status of the final response. */
  code: number;
  /** URL of the final response (after redirects). */
  finalUrl: string;
  redirected: boolean;
  /** The validated, normalized URL that was requested. */
  requestedUrl: string;
};

/**
 * Classify a completed fetch. Pure so the bot-wall rules can be unit tested.
 *
 * Cookie-wall bounces: Nature still serves the real article (HTTP 200) behind
 * the bounce, and serves a 404 for DOIs that do not exist (verified against
 * Crossref and doi.org). So a 2xx behind the wall is "alive but unverifiable
 * by a bot" (BOT_WALL), while a 404/410 behind the wall is still DEAD — the
 * wall must not hide fabricated citations.
 */
export function classifyFetchOutcome(outcome: FetchOutcome): SourceUrlStatus {
  const { code, finalUrl, redirected, requestedUrl } = outcome;
  const notFound = code === 404 || code === 410 || isKnownSoft404Url(finalUrl);
  if (notFound) return "DEAD";
  if (isCookieWallUrl(finalUrl)) return "BOT_WALL";
  if (code === 403 || code === 429) return "BLOCKED";
  if (code >= 400) return "ERROR";
  if (redirected && finalUrl !== requestedUrl) return "REDIRECTED";
  return "OK";
}

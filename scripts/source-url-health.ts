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

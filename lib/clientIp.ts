/**
 * The client address a rate limiter can trust.
 *
 * `x-forwarded-for` is a list the caller can start. A proxy *appends* the peer
 * address it saw; it does not replace what arrived. So the first entry is
 * whatever the client wrote, and keying a rate limit on it lets anyone defeat
 * the limit by rotating a header value. The entry the trusted proxy appended
 * is the **last** one, and that is the one to key on.
 *
 * On Coolify the proxy is Traefik, which appends the peer address to
 * `x-forwarded-for` and also sets `x-real-ip`; both the Dockerfile runner and
 * the nixpacks runner serve behind it. Put another proxy in front and the last
 * entry becomes that proxy's view of Traefik, so `TRUSTED_PROXY_HOPS` must
 * equal the number of proxies that append a value.
 *
 * **argumend.org runs Cloudflare in front of Coolify** — verified 2026-09-22,
 * `curl -sI https://argumend.org/` answering `server: cloudflare` with a
 * `cf-ray`. Two proxies append, so **production must set
 * `TRUSTED_PROXY_HOPS=2`**. The default of 1 below is the safe value for a
 * bare Coolify deployment and is *wrong for argumend.org*; leaving it unset in
 * production keys every limit on Cloudflare's edge address, which lumps
 * unrelated visitors into one bucket. `warnIfHopsUnsetInProduction` says so
 * once per process.
 *
 * **`cf-connecting-ip` is deliberately not read.** Cloudflare sets it, but
 * Traefik does not strip it, so a request that reaches the origin directly —
 * which is possible for anyone who finds the origin address, since the origin
 * is not locked to Cloudflare's ranges — can carry any value the caller likes.
 * Honouring it would reintroduce exactly the bug this module exists to fix. It
 * could only be trusted after proving the request came through Cloudflare
 * (authenticated origin pull, or checking the last `x-forwarded-for` entry
 * against Cloudflare's published ranges), and it would then be redundant:
 * Cloudflare appends the same address to `x-forwarded-for`, which is what
 * hops=2 already reads.
 *
 * With no proxy at all there is no trustworthy header, and both branches below
 * return something the caller controls. That is the same exposure every
 * header-based limiter has; the fix is to run behind a proxy, not to read a
 * different header.
 *
 * Every API route that keys a rate limit on an address now goes through this
 * helper. A new one must too: reading `x-forwarded-for` directly is the bug.
 */

const DEFAULT_TRUSTED_PROXY_HOPS = 1;

let warnedAboutUnsetHops = false;

/**
 * Warns once, on the first address derived in a production process that never
 * configured `TRUSTED_PROXY_HOPS`. A warning and not an error: the wrong hop
 * count degrades rate limiting, it does not break serving, and refusing to
 * boot over it would take the site down for a misconfiguration.
 *
 * It fires on first use rather than at import so that `next build`, which runs
 * with NODE_ENV=production on a machine that has none of the runtime
 * environment, stays quiet.
 */
function warnIfHopsUnsetInProduction(configured: string | undefined): void {
  if (warnedAboutUnsetHops) return;
  if (process.env.NODE_ENV !== "production") return;
  if (configured) return;

  warnedAboutUnsetHops = true;
  console.warn(
    "[argumend:clientIp] TRUSTED_PROXY_HOPS is unset, defaulting to 1. " +
      "argumend.org serves behind Cloudflare in front of Coolify/Traefik, " +
      "where the correct value is 2. At 1 every rate limit keys on " +
      "Cloudflare's edge address instead of the visitor's, so unrelated " +
      'visitors share a bucket. See "Trusted proxy hops" in README.md.',
  );
}

export function trustedProxyHops(): number {
  const configured = process.env.TRUSTED_PROXY_HOPS?.trim();
  warnIfHopsUnsetInProduction(configured);
  if (!configured) return DEFAULT_TRUSTED_PROXY_HOPS;
  const parsed = Number(configured);
  if (!Number.isInteger(parsed) || parsed < 1) return DEFAULT_TRUSTED_PROXY_HOPS;
  return parsed;
}

/**
 * Returns the address `hops` proxies back from the end of `x-forwarded-for`,
 * falling back to `x-real-ip` and then to a constant. Never returns an empty
 * string, so a rate-limit key is always well formed.
 */
export function clientIp(request: { headers: Headers }, hops = trustedProxyHops()): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const entries = (forwarded ?? "")
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);

  if (entries.length > 0) {
    // Clamp: fewer entries than configured hops means the request did not come
    // through the expected chain, and the oldest entry is the best guess.
    const index = Math.max(0, entries.length - hops);
    return entries[index];
  }

  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

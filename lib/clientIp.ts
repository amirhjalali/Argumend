/**
 * The client address a rate limiter can trust.
 *
 * `x-forwarded-for` is a list the caller can start. A proxy *appends* the peer
 * address it saw; it does not replace what arrived. So the first entry is
 * whatever the client wrote, and keying a rate limit on it lets anyone defeat
 * the limit by rotating a header value. The entry the trusted proxy appended
 * is the **last** one, and that is the one to key on.
 *
 * **Deployment assumption: exactly one trusted proxy in front of the app.** On
 * Coolify that is Traefik, which appends the peer address to
 * `x-forwarded-for` and also sets `x-real-ip`; both the Dockerfile runner and
 * the nixpacks runner serve behind it. Put another proxy in front (Cloudflare,
 * say) and the last entry becomes that proxy's view of Traefik, so set
 * `TRUSTED_PROXY_HOPS` to the number of proxies that append a value.
 *
 * With no proxy at all there is no trustworthy header, and both branches below
 * return something the caller controls. That is the same exposure every
 * header-based limiter has; the fix is to run behind a proxy, not to read a
 * different header.
 *
 * Other API routes still read the first entry. They predate this helper and
 * changing them is a separate piece of work; new routes should use it.
 */

const DEFAULT_TRUSTED_PROXY_HOPS = 1;

export function trustedProxyHops(): number {
  const configured = process.env.TRUSTED_PROXY_HOPS?.trim();
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

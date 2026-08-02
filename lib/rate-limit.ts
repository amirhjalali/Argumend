/**
 * Simple in-memory rate limiter with fixed windows.
 *
 * Tracks requests per IP using a Map. Entries are cleaned up
 * periodically (every 100 requests) to prevent unbounded growth.
 *
 * NOTE: This is per-process. In a multi-instance deployment,
 * use Redis or similar for shared state.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

interface RateLimitOptions {
  /** Maximum number of requests allowed within the window */
  maxRequests: number;
  /** Window duration in milliseconds */
  windowMs: number;
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();
let requestCounter = 0;
const MAX_STORE_ENTRIES = 10_000;

/**
 * Clean up expired entries from the store.
 * Called automatically every 100 requests.
 */
function cleanup(): void {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (now >= entry.resetAt) {
      store.delete(key);
    }
  }
}

function makeRoomForNewKey(): void {
  if (store.size < MAX_STORE_ENTRIES) return;

  cleanup();
  if (store.size < MAX_STORE_ENTRIES) return;

  // Map iteration follows insertion order. Evicting the oldest entry keeps an
  // attacker sending unique identifiers from growing process memory forever.
  const oldestKey = store.keys().next().value as string | undefined;
  if (oldestKey !== undefined) store.delete(oldestKey);
}

/**
 * Check rate limit for a given key (typically an IP address).
 *
 * @param key  - Identifier for the client (e.g. IP address)
 * @param opts - maxRequests and windowMs
 * @returns    - { success, remaining, resetAt }
 *
 * @example
 * ```ts
 * const ip = request.headers.get("x-forwarded-for") || "unknown";
 * const limit = rateLimit(ip, { maxRequests: 10, windowMs: 60 * 60 * 1000 });
 * if (!limit.success) {
 *   return NextResponse.json(
 *     { error: "Rate limited" },
 *     { status: 429, headers: { "Retry-After": String(Math.ceil((limit.resetAt - Date.now()) / 1000)) } }
 *   );
 * }
 * ```
 */
export function rateLimit(key: string, opts: RateLimitOptions): RateLimitResult {
  if (!Number.isInteger(opts.maxRequests) || opts.maxRequests < 1) {
    throw new RangeError("maxRequests must be a positive integer");
  }
  if (!Number.isFinite(opts.windowMs) || opts.windowMs <= 0) {
    throw new RangeError("windowMs must be a positive finite number");
  }

  const now = Date.now();

  // Periodic cleanup every 100 requests
  requestCounter++;
  if (requestCounter >= 100) {
    requestCounter = 0;
    cleanup();
  }

  // Build a composite key so different endpoints don't share limits
  const entry = store.get(key);

  if (!entry || now >= entry.resetAt) {
    // First request or window expired — start a fresh window
    if (!entry) makeRoomForNewKey();
    const resetAt = now + opts.windowMs;
    store.set(key, { count: 1, resetAt });
    return { success: true, remaining: opts.maxRequests - 1, resetAt };
  }

  // Window still active
  if (entry.count < opts.maxRequests) {
    entry.count++;
    return {
      success: true,
      remaining: opts.maxRequests - entry.count,
      resetAt: entry.resetAt,
    };
  }

  // Over limit
  return {
    success: false,
    remaining: 0,
    resetAt: entry.resetAt,
  };
}

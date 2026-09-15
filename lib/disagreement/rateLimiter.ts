import { DISAGREEMENT_ANALYZE_RATE_LIMITS } from "./constants";
import { rateLimit } from "@/lib/rate-limit";

/**
 * Rate limiting for the disagreement analyze endpoint (spec §11.3).
 *
 * The MVP deliberately ships the existing per-process in-memory limiter behind
 * a small interface. A shared implementation (one that survives restarts and
 * is consistent across instances) can be dropped in later by implementing
 * `RateLimiter` without touching the route. No Redis, no new dependency.
 *
 * See docs/DISAGREEMENT_LOOP.md, "Rate limiting".
 */

/** One fixed window. `name` namespaces the storage key so windows never collide. */
export interface RateLimitWindow {
  name: string;
  maxRequests: number;
  windowMs: number;
}

export interface RateLimitDecision {
  /** `false` when any configured window is exhausted. */
  allowed: boolean;
  /** Requests left in the tightest window. Never negative. */
  remaining: number;
  /**
   * Epoch milliseconds after which the caller may retry. When several windows
   * are configured this is the latest reset across all of them.
   */
  resetAt: number;
}

export interface RateLimiter {
  /**
   * Record one request for `key` and decide whether it may proceed.
   *
   * Every configured window is consumed on every call, including calls that
   * end up denied. `key` must already be an opaque client identifier (the
   * caller hashes the IP); implementations must never log it.
   */
  check(key: string): Promise<RateLimitDecision>;
}

/**
 * Per-process limiter backed by `lib/rate-limit`'s module-level Map.
 *
 * Counters live in the memory of the Node process that served the request.
 * Every instance of the app keeps its own counters, and a restart clears them.
 * That is the boundary the spec accepts for the closed beta.
 */
export class InMemoryRateLimiter implements RateLimiter {
  private readonly windows: readonly RateLimitWindow[];

  constructor(windows: readonly RateLimitWindow[]) {
    if (windows.length === 0) {
      throw new RangeError("InMemoryRateLimiter needs at least one window");
    }
    this.windows = windows;
  }

  check(key: string): Promise<RateLimitDecision> {
    let allowed = true;
    let remaining = Number.POSITIVE_INFINITY;
    let resetAt = 0;

    for (const window of this.windows) {
      const result = rateLimit(`${window.name}:${key}`, {
        maxRequests: window.maxRequests,
        windowMs: window.windowMs,
      });
      allowed = allowed && result.success;
      remaining = Math.min(remaining, result.remaining);
      resetAt = Math.max(resetAt, result.resetAt);
    }

    return Promise.resolve({ allowed, remaining, resetAt });
  }
}

/** The analyze endpoint's windows, from the spec: 3 per hour and 10 per day. */
export const DISAGREEMENT_ANALYZE_RATE_LIMIT_WINDOWS: readonly RateLimitWindow[] = [
  {
    name: "disagreement-hour",
    maxRequests: DISAGREEMENT_ANALYZE_RATE_LIMITS.perHour,
    windowMs: DISAGREEMENT_ANALYZE_RATE_LIMITS.hourWindowMs,
  },
  {
    name: "disagreement-day",
    maxRequests: DISAGREEMENT_ANALYZE_RATE_LIMITS.perDay,
    windowMs: DISAGREEMENT_ANALYZE_RATE_LIMITS.dayWindowMs,
  },
];

/** Default instance used by the production route. */
export const disagreementAnalyzeRateLimiter: RateLimiter = new InMemoryRateLimiter(
  DISAGREEMENT_ANALYZE_RATE_LIMIT_WINDOWS,
);

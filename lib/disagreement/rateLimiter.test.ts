import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DISAGREEMENT_ANALYZE_RATE_LIMITS } from "./constants";

describe("InMemoryRateLimiter", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-09-14T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  async function load() {
    return import("./rateLimiter");
  }

  it("allows up to the limit and then denies with remaining 0", async () => {
    const { InMemoryRateLimiter } = await load();
    const limiter = new InMemoryRateLimiter([{ name: "t", maxRequests: 2, windowMs: 1_000 }]);

    await expect(limiter.check("a")).resolves.toMatchObject({ allowed: true, remaining: 1 });
    await expect(limiter.check("a")).resolves.toMatchObject({ allowed: true, remaining: 0 });
    await expect(limiter.check("a")).resolves.toMatchObject({ allowed: false, remaining: 0 });
  });

  it("isolates keys from each other", async () => {
    const { InMemoryRateLimiter } = await load();
    const limiter = new InMemoryRateLimiter([{ name: "t", maxRequests: 1, windowMs: 1_000 }]);

    await expect(limiter.check("a")).resolves.toMatchObject({ allowed: true });
    await expect(limiter.check("a")).resolves.toMatchObject({ allowed: false });
    await expect(limiter.check("b")).resolves.toMatchObject({ allowed: true, remaining: 0 });
  });

  it("rolls the window over at resetAt", async () => {
    const { InMemoryRateLimiter } = await load();
    const limiter = new InMemoryRateLimiter([{ name: "t", maxRequests: 1, windowMs: 1_000 }]);

    const first = await limiter.check("a");
    expect(first.resetAt).toBe(Date.now() + 1_000);
    await expect(limiter.check("a")).resolves.toMatchObject({ allowed: false, resetAt: first.resetAt });

    vi.setSystemTime(first.resetAt);
    await expect(limiter.check("a")).resolves.toEqual({
      allowed: true,
      remaining: 0,
      resetAt: first.resetAt + 1_000,
    });
  });

  it("reports the retry point as the latest reset across windows when denied", async () => {
    const { InMemoryRateLimiter } = await load();
    const limiter = new InMemoryRateLimiter([
      { name: "short", maxRequests: 1, windowMs: 1_000 },
      { name: "long", maxRequests: 5, windowMs: 60_000 },
    ]);
    const start = Date.now();

    await limiter.check("a");
    const denied = await limiter.check("a");

    expect(denied.allowed).toBe(false);
    expect(denied.remaining).toBe(0);
    // Matches the pre-interface route, which used Math.max over both windows.
    expect(denied.resetAt).toBe(start + 60_000);
    expect(Math.ceil((denied.resetAt - Date.now()) / 1000)).toBe(60);
  });

  it("consumes every window on every call, including denied ones", async () => {
    const { InMemoryRateLimiter } = await load();
    const limiter = new InMemoryRateLimiter([
      { name: "short", maxRequests: 1, windowMs: 1_000 },
      { name: "long", maxRequests: 3, windowMs: 60_000 },
    ]);

    await limiter.check("a"); // short 1/1, long 1/3
    await limiter.check("a"); // denied by short; long still counted 2/3
    await limiter.check("a"); // denied by short; long 3/3

    vi.setSystemTime(Date.now() + 1_000); // short window rolls over
    const decision = await limiter.check("a");
    expect(decision.allowed).toBe(false);
    expect(decision.remaining).toBe(0);
  });

  it("namespaces windows so two windows with the same key do not share a counter", async () => {
    const { InMemoryRateLimiter } = await load();
    const limiter = new InMemoryRateLimiter([
      { name: "x", maxRequests: 1, windowMs: 1_000 },
      { name: "y", maxRequests: 1, windowMs: 1_000 },
    ]);

    await expect(limiter.check("a")).resolves.toMatchObject({ allowed: true, remaining: 0 });
  });

  it("rejects an empty window list", async () => {
    const { InMemoryRateLimiter } = await load();
    expect(() => new InMemoryRateLimiter([])).toThrow(RangeError);
  });

  it("wires the default instance to the spec's 3/hour and 10/day windows", async () => {
    const { DISAGREEMENT_ANALYZE_RATE_LIMIT_WINDOWS, disagreementAnalyzeRateLimiter } = await load();

    expect(DISAGREEMENT_ANALYZE_RATE_LIMIT_WINDOWS).toEqual([
      { name: "disagreement-hour", maxRequests: 3, windowMs: 60 * 60 * 1000 },
      { name: "disagreement-day", maxRequests: 10, windowMs: 24 * 60 * 60 * 1000 },
    ]);
    expect(DISAGREEMENT_ANALYZE_RATE_LIMITS).toMatchObject({ perHour: 3, perDay: 10 });

    const key = `default-${Math.random()}`;
    for (let i = 0; i < DISAGREEMENT_ANALYZE_RATE_LIMITS.perHour; i += 1) {
      await expect(disagreementAnalyzeRateLimiter.check(key)).resolves.toMatchObject({ allowed: true });
    }
    await expect(disagreementAnalyzeRateLimiter.check(key)).resolves.toMatchObject({
      allowed: false,
      remaining: 0,
    });
  });
});

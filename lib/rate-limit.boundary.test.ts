import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("rate limiter cleanup boundary", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.useFakeTimers();
    vi.setSystemTime(1_000);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("periodically removes expired entries without resetting active windows", async () => {
    const { rateLimit } = await import("./rate-limit");

    expect(rateLimit("expired", { maxRequests: 1, windowMs: 10 }).success).toBe(true);
    expect(rateLimit("active", { maxRequests: 1, windowMs: 1_000 }).success).toBe(true);

    // Bring the module counter to 99 while both windows are still active.
    for (let index = 0; index < 97; index += 1) {
      rateLimit(`filler-${index}`, { maxRequests: 1, windowMs: 1_000 });
    }

    vi.setSystemTime(1_020);
    // Request 100 triggers cleanup: only the 10ms entry has expired.
    rateLimit("cleanup-trigger", { maxRequests: 1, windowMs: 1_000 });

    expect(rateLimit("expired", { maxRequests: 1, windowMs: 10 })).toEqual({
      success: true,
      remaining: 0,
      resetAt: 1_030,
    });
    expect(rateLimit("active", { maxRequests: 1, windowMs: 1_000 })).toEqual({
      success: false,
      remaining: 0,
      resetAt: 2_000,
    });
  });

  it("keeps endpoint-prefixed IPv6 and proxy-derived keys independent", async () => {
    const { rateLimit } = await import("./rate-limit");
    const options = { maxRequests: 1, windowMs: 60_000 };

    expect(rateLimit("analyze:2001:db8::1", options).success).toBe(true);
    expect(rateLimit("analyze:2001:db8::1", options).success).toBe(false);
    expect(rateLimit("judge:2001:db8::1", options).success).toBe(true);
    expect(rateLimit("analyze:unknown", options).success).toBe(true);
  });
});

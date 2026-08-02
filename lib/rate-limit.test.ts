import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("rateLimit", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-31T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("allows requests through the configured limit and reports remaining", async () => {
    const { rateLimit } = await import("./rate-limit");
    const options = { maxRequests: 2, windowMs: 1_000 };

    expect(rateLimit("analyze:client", options)).toMatchObject({
      success: true,
      remaining: 1,
    });
    expect(rateLimit("analyze:client", options)).toMatchObject({
      success: true,
      remaining: 0,
    });
    expect(rateLimit("analyze:client", options)).toMatchObject({
      success: false,
      remaining: 0,
    });
  });

  it("starts a fresh window at the exact reset time", async () => {
    const { rateLimit } = await import("./rate-limit");
    const options = { maxRequests: 1, windowMs: 1_000 };
    const first = rateLimit("judge:client", options);

    vi.setSystemTime(first.resetAt);

    expect(rateLimit("judge:client", options)).toEqual({
      success: true,
      remaining: 0,
      resetAt: first.resetAt + 1_000,
    });
  });

  it("keeps endpoint-prefixed keys independent", async () => {
    const { rateLimit } = await import("./rate-limit");
    const options = { maxRequests: 1, windowMs: 1_000 };

    expect(rateLimit("analyze:client", options).success).toBe(true);
    expect(rateLimit("analyze:client", options).success).toBe(false);
    expect(rateLimit("judge:client", options).success).toBe(true);
  });

  it("evicts the oldest entry instead of growing past the process cap", async () => {
    const { rateLimit } = await import("./rate-limit");
    const options = { maxRequests: 1, windowMs: 60_000 };

    rateLimit("client:oldest", options);
    for (let index = 0; index < 10_000; index += 1) {
      rateLimit(`client:${index}`, options);
    }

    // If the first entry had remained, its second request would be rejected.
    expect(rateLimit("client:oldest", options).success).toBe(true);
  });

  it.each([
    [{ maxRequests: 0, windowMs: 1_000 }, "maxRequests"],
    [{ maxRequests: 1.5, windowMs: 1_000 }, "maxRequests"],
    [{ maxRequests: 1, windowMs: 0 }, "windowMs"],
    [{ maxRequests: 1, windowMs: Number.POSITIVE_INFINITY }, "windowMs"],
  ])("rejects an invalid configuration", async (options, field) => {
    const { rateLimit } = await import("./rate-limit");

    expect(() => rateLimit("client", options)).toThrow(field);
  });
});

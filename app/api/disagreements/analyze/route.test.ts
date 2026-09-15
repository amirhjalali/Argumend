import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { DISAGREEMENT_FEW_SHOT_EXAMPLES } from "@/lib/disagreement/prompts/v1/examples";

vi.mock("@/lib/disagreement/model", async () => {
  const actual = await vi.importActual<typeof import("@/lib/disagreement/model")>(
    "@/lib/disagreement/model",
  );
  return {
    ...actual,
    createDisagreementProvider: () =>
      new actual.FakeDisagreementProvider(DISAGREEMENT_FEW_SHOT_EXAMPLES[1].extraction),
    isDisagreementV2Enabled: () => process.env.ENABLE_DISAGREEMENT_V2 === "true",
    isDisagreementPublishingEnabled: () => false,
  };
});

import { POST } from "./route";
import { createDisagreementAnalyzeHandler } from "@/lib/disagreement/analyzeHandler";
import { DISAGREEMENT_ANALYZE_RATE_LIMITS } from "@/lib/disagreement/constants";
import { hashClientKey } from "@/lib/disagreement/publication";
import type { RateLimitDecision, RateLimiter } from "@/lib/disagreement/rateLimiter";

function stubLimiter(decision: RateLimitDecision) {
  const check = vi.fn(async (_key: string) => decision);
  const limiter: RateLimiter = { check };
  return { limiter, check };
}

const LONG_CONTENT = `${DISAGREEMENT_FEW_SHOT_EXAMPLES[1].source}\n\n${"Context for length. ".repeat(8)}`;

function post(body: unknown, ip = `test-${Math.random()}`) {
  return new NextRequest(new URL("http://localhost/api/disagreements/analyze"), {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

describe("POST /api/disagreements/analyze", () => {
  beforeEach(() => {
    vi.stubEnv("ENABLE_DISAGREEMENT_V2", "true");
    vi.stubEnv("ARGUMEND_DISAGREEMENT_PROVIDER", "fake");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns FEATURE_DISABLED when the flag is off", async () => {
    vi.stubEnv("ENABLE_DISAGREEMENT_V2", "false");
    const response = await POST(post({ content: "x".repeat(200) }));
    expect(response.status).toBe(404);
    expect((await response.json()).code).toBe("FEATURE_DISABLED");
  });

  it("returns CONTENT_TOO_SHORT", async () => {
    const response = await POST(post({ content: "too short" }));
    expect(response.status).toBe(400);
    expect((await response.json()).code).toBe("CONTENT_TOO_SHORT");
  });

  it("returns URL_INGESTION_NOT_AVAILABLE", async () => {
    const response = await POST(post({ content: "https://x.com/someone/status/1" }));
    expect(response.status).toBe(400);
    expect((await response.json()).code).toBe("URL_INGESTION_NOT_AVAILABLE");
  });

  it("returns a diagnosis without a winner field", async () => {
    const source = `${DISAGREEMENT_FEW_SHOT_EXAMPLES[1].source}\n\n${"Context for length. ".repeat(8)}`;
    const response = await POST(post({ content: source, contentType: "conversation" }));
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.report.sourceMode).toBe("source-only");
    expect(data.report.winner).toBeUndefined();
    expect(data.execution.mode).toBe("live");
  });

  describe("rate limiting", () => {
    it("returns the 429 contract from an injected limiter that denies", async () => {
      const resetAt = Date.now() + 4_000;
      const { limiter } = stubLimiter({ allowed: false, remaining: 0, resetAt });
      const handler = createDisagreementAnalyzeHandler({ rateLimiter: limiter });

      const response = await handler(post({ content: LONG_CONTENT }, "203.0.113.7"));

      expect(response.status).toBe(429);
      expect(response.headers.get("Retry-After")).toBe("4");
      expect(response.headers.get("X-RateLimit-Remaining")).toBe("0");
      expect(response.headers.get("x-request-id")).toEqual(expect.any(String));
      expect(response.headers.get("Access-Control-Allow-Origin")).toBeNull();
      const body = await response.json();
      expect(body).toEqual({
        error: "Too many analyses from this network. Try again later.",
        code: "RATE_LIMITED",
        requestId: response.headers.get("x-request-id"),
      });
    });

    it("rounds Retry-After up to whole seconds and echoes the remaining count", async () => {
      const { limiter } = stubLimiter({ allowed: false, remaining: 2, resetAt: Date.now() + 1_500 });
      const handler = createDisagreementAnalyzeHandler({ rateLimiter: limiter });

      const response = await handler(post({ content: LONG_CONTENT }));

      expect(response.headers.get("Retry-After")).toBe("2");
      expect(response.headers.get("X-RateLimit-Remaining")).toBe("2");
    });

    it("checks the limiter before reading the body", async () => {
      const { limiter, check } = stubLimiter({ allowed: false, remaining: 0, resetAt: Date.now() + 1_000 });
      const handler = createDisagreementAnalyzeHandler({ rateLimiter: limiter });
      const malformed = new NextRequest(new URL("http://localhost/api/disagreements/analyze"), {
        method: "POST",
        headers: { "content-type": "application/json", "x-forwarded-for": "203.0.113.8" },
        body: "{not json",
      });

      const response = await handler(malformed);

      expect(check).toHaveBeenCalledTimes(1);
      expect(response.status).toBe(429);
    });

    it("hands the limiter a hashed key derived from the first forwarded IP, never the raw IP", async () => {
      const { limiter, check } = stubLimiter({ allowed: true, remaining: 2, resetAt: Date.now() + 1_000 });
      const handler = createDisagreementAnalyzeHandler({ rateLimiter: limiter });

      await handler(post({ content: LONG_CONTENT }, "203.0.113.9, 10.0.0.1"));

      expect(check).toHaveBeenCalledWith(hashClientKey("203.0.113.9"));
      expect(check.mock.calls[0][0]).not.toContain("203.0.113.9");
    });

    it("lets an allowed decision through to analysis", async () => {
      const { limiter } = stubLimiter({ allowed: true, remaining: 2, resetAt: Date.now() + 1_000 });
      const handler = createDisagreementAnalyzeHandler({ rateLimiter: limiter });

      const response = await handler(post({ content: LONG_CONTENT, contentType: "conversation" }));

      expect(response.status).toBe(200);
      expect(response.headers.get("X-RateLimit-Remaining")).toBeNull();
    });

    it("does not consult the limiter when the feature flag is off", async () => {
      vi.stubEnv("ENABLE_DISAGREEMENT_V2", "false");
      const { limiter, check } = stubLimiter({ allowed: false, remaining: 0, resetAt: Date.now() + 1_000 });
      const handler = createDisagreementAnalyzeHandler({ rateLimiter: limiter });

      const response = await handler(post({ content: LONG_CONTENT }));

      expect(response.status).toBe(404);
      expect(check).not.toHaveBeenCalled();
    });

    it("wires the exported POST to the default limiter with the spec's hourly window", async () => {
      const ip = `203.0.113.${Math.floor(Math.random() * 200)}-${Math.random()}`;

      for (let i = 0; i < DISAGREEMENT_ANALYZE_RATE_LIMITS.perHour; i += 1) {
        const response = await POST(post({ content: LONG_CONTENT, contentType: "conversation" }, ip));
        expect(response.status).toBe(200);
      }

      const limited = await POST(post({ content: LONG_CONTENT, contentType: "conversation" }, ip));
      expect(limited.status).toBe(429);
      expect((await limited.json()).code).toBe("RATE_LIMITED");
      expect(limited.headers.get("X-RateLimit-Remaining")).toBe("0");
      // Retry-After is the later (daily) reset, as before the RateLimiter interface existed.
      const retryAfter = Number(limited.headers.get("Retry-After"));
      expect(retryAfter).toBeGreaterThan(DISAGREEMENT_ANALYZE_RATE_LIMITS.hourWindowMs / 1000);
      expect(retryAfter).toBeLessThanOrEqual(DISAGREEMENT_ANALYZE_RATE_LIMITS.dayWindowMs / 1000);
    });
  });
});

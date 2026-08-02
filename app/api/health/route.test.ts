import { afterEach, describe, expect, it, vi } from "vitest";
import { TOPIC_COUNT } from "@/data/topicIndex";
import { GET } from "./route";
import { HealthResponseSchema } from "./_schema";

describe("GET /api/health", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("reports static-content readiness without probing optional services", async () => {
    vi.stubEnv("ENABLE_LIVE_ANALYZE_API", "false");
    vi.stubEnv("NEXT_PUBLIC_ENABLE_LIVE_ANALYZE_API", "false");
    vi.stubEnv("ENABLE_LIVE_DEBATE_API", "false");
    vi.stubEnv("NEXT_PUBLIC_ENABLE_LIVE_DEBATE_API", "false");
    vi.stubEnv("ENABLE_LIVE_JUDGING_API", "false");
    vi.stubEnv("NEXT_PUBLIC_ENABLE_LIVE_JUDGING_API", "false");

    const response = GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(HealthResponseSchema.safeParse(body).success).toBe(true);
    expect(body).toMatchObject({
      status: "ok",
      ready: true,
      mode: "offline",
      checks: { static_content: "ok" },
      topic_count: TOPIC_COUNT,
    });
  });

  it("reports live-enabled mode without requiring a provider call", async () => {
    vi.stubEnv("ENABLE_LIVE_ANALYZE_API", "true");
    const response = GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.mode).toBe("live-enabled");
  });

  it("does not report backend live mode from public UI flags alone", async () => {
    vi.stubEnv("ENABLE_LIVE_ANALYZE_API", "false");
    vi.stubEnv("ENABLE_LIVE_DEBATE_API", "false");
    vi.stubEnv("ENABLE_LIVE_JUDGING_API", "false");
    vi.stubEnv("NEXT_PUBLIC_ENABLE_LIVE_ANALYZE_API", "true");
    vi.stubEnv("NEXT_PUBLIC_ENABLE_LIVE_DEBATE_API", "true");
    vi.stubEnv("NEXT_PUBLIC_ENABLE_LIVE_JUDGING_API", "true");

    const response = GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.mode).toBe("offline");
  });
});

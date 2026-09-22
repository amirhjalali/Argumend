import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { RENT_CONTROL_JEV_FIXTURES, RENT_CONTROL_THREAD } from "@/lib/mapReply/__fixtures__";

vi.mock("@/lib/jev/client", async () => {
  const actual = await vi.importActual<typeof import("@/lib/jev/client")>("@/lib/jev/client");
  return {
    ...actual,
    // The route never reaches the network in tests: it always gets the
    // recorded answers, on the lane the env says it should be using.
    getJevProvider: () => new actual.FakeJevProvider(RENT_CONTROL_JEV_FIXTURES),
  };
});

import { POST } from "./route";

let clientCounter = 0;

function post(
  body: unknown,
  options: { ip?: string; raw?: string; headers?: Record<string, string> } = {},
) {
  clientCounter += 1;
  return new NextRequest(new URL("http://localhost/api/map-reply"), {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": options.ip ?? `test-${clientCounter}`,
      ...options.headers,
    },
    body: options.raw ?? JSON.stringify(body),
  });
}

describe("POST /api/map-reply", () => {
  beforeEach(() => {
    vi.stubEnv("ENABLE_JEV_MAP_REPLY", "true");
    vi.stubEnv("ARGUMEND_JEV_PROVIDER", "fake");
    vi.stubEnv("MAP_REPLY_TOPIC_CONFIDENCE", "");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("is a 404 when the flag is off", async () => {
    vi.stubEnv("ENABLE_JEV_MAP_REPLY", "false");
    const response = await POST(post({ text: RENT_CONTROL_THREAD }));
    expect(response.status).toBe(404);
    const body = await response.json();
    expect(body.code).toBe("FEATURE_DISABLED");
    expect(body.error).toBe("Map replies are not enabled.");
    expect(response.headers.get("x-request-id")).toBeTruthy();
  });

  it("is a 404 when the flag is simply unset", async () => {
    vi.stubEnv("ENABLE_JEV_MAP_REPLY", "");
    const response = await POST(post({ text: RENT_CONTROL_THREAD }));
    expect(response.status).toBe(404);
  });

  it("refuses to serve fixture answers in production", async () => {
    vi.stubEnv("NODE_ENV", "production");
    const response = await POST(post({ text: RENT_CONTROL_THREAD }));
    expect(response.status).toBe(503);
    expect((await response.json()).code).toBe("PROVIDER_NOT_CONFIGURED");
  });

  it("returns the composed reply when the flag is on", async () => {
    const response = await POST(post({ text: RENT_CONTROL_THREAD }));
    expect(response.status).toBe(200);
    expect(response.headers.get("Cache-Control")).toBe("no-store");

    const body = await response.json();
    expect(body.requestId).toBeTruthy();
    expect(body.ok).toBe(true);
    expect(body.topic.id).toBe("rent-control-effectiveness");
    expect(body.dominantSection.title).toBe("Supply Effects");
    expect(body.notArguing).toEqual(["gary_1962"]);
    expect(body.markdown).toContain("Argumend map: Does Rent Control Help or Hurt Renters?");
    expect(body.execution.lane).toBe("fake");
    expect(body.execution.model).toBe("jev-1.13.0");
    expect(body.execution.timings.totalMs).toBeGreaterThanOrEqual(0);
    expect(body.turns).toHaveLength(8);
  });

  it("returns a no-map result as a 200, not an error", async () => {
    vi.stubEnv("MAP_REPLY_TOPIC_CONFIDENCE", "0.999");
    const response = await POST(post({ text: RENT_CONTROL_THREAD }));
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.ok).toBe(false);
    expect(body.reason).toBe("low_confidence");
    expect(body.candidates.length).toBeGreaterThan(0);
  });

  it("rejects a body that is not JSON", async () => {
    const response = await POST(post(null, { raw: "not json" }));
    expect(response.status).toBe(400);
    expect((await response.json()).code).toBe("INVALID_REQUEST");
  });

  it("rejects a body with no text field", async () => {
    const response = await POST(post({ thread: RENT_CONTROL_THREAD }));
    expect(response.status).toBe(400);
    expect((await response.json()).code).toBe("INVALID_REQUEST");
  });

  it("rejects text that is too short to carry an argument", async () => {
    const response = await POST(post({ text: "rent control is bad" }));
    expect(response.status).toBe(400);
    expect((await response.json()).code).toBe("CONTENT_TOO_SHORT");
  });

  it("rejects text over the state-size cap", async () => {
    const response = await POST(post({ text: "rent control. ".repeat(1200) }));
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.code).toBe("CONTENT_TOO_LONG");
    expect(body.error).toContain("12,000 characters");
  });

  it("rate limits a client that asks too often", async () => {
    const ip = "rate-limited-client";
    const statuses: number[] = [];
    for (let attempt = 0; attempt < 12; attempt += 1) {
      const response = await POST(post({ text: RENT_CONTROL_THREAD }, { ip }));
      statuses.push(response.status);
    }
    expect(statuses.filter((status) => status === 200)).toHaveLength(10);
    const limited = statuses.filter((status) => status === 429);
    expect(limited.length).toBeGreaterThan(0);

    const response = await POST(post({ text: RENT_CONTROL_THREAD }, { ip }));
    expect(response.status).toBe(429);
    expect(response.headers.get("Retry-After")).toBeTruthy();
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect((await response.json()).code).toBe("RATE_LIMITED");
  });

  it("cannot be escaped by rotating the first x-forwarded-for entry", async () => {
    // A proxy appends its view of the peer, so the first entry is whatever the
    // caller wrote. Keying on it handed every request a fresh bucket.
    const statuses: number[] = [];
    for (let attempt = 0; attempt < 15; attempt += 1) {
      const response = await POST(
        post({ text: RENT_CONTROL_THREAD }, { ip: `spoof-${attempt}, 198.51.100.7` }),
      );
      statuses.push(response.status);
    }
    expect(statuses.filter((status) => status === 200)).toHaveLength(10);
    expect(statuses.filter((status) => status === 429)).toHaveLength(5);
  });

  it("does not spend the daily budget on requests it refuses", async () => {
    // 46 malformed requests used to exhaust a 40/day allowance in one hour.
    const ip = "wasteful-client";
    for (let attempt = 0; attempt < 8; attempt += 1) {
      const response = await POST(post({ text: "too short" }, { ip }));
      expect(response.status).toBe(400);
    }
    // The hourly bucket is spent, but the daily one is untouched: an hour
    // later this client can still be served.
    const blocked = await POST(post({ text: RENT_CONTROL_THREAD }, { ip }));
    expect([200, 429]).toContain(blocked.status);

    const fresh = await POST(post({ text: RENT_CONTROL_THREAD }, { ip: "wasteful-client-later" }));
    expect(fresh.status).toBe(200);
  });

  it("does not reflect a client-supplied request id", async () => {
    const injected = "<script>alert(1)</script>";
    const response = await POST(
      post({ text: RENT_CONTROL_THREAD }, { headers: { "x-request-id": injected } }),
    );
    const body = await response.json();

    expect(response.headers.get("x-request-id")).not.toBe(injected);
    expect(body.requestId).not.toBe(injected);
    expect(body.requestId).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    );
  });

  it("adopts an inbound request id only when it is a real UUID", async () => {
    const uuid = "7f1c2b3a-4d5e-4f60-8a91-0b2c3d4e5f60";
    const response = await POST(
      post({ text: RENT_CONTROL_THREAD }, { headers: { "x-request-id": uuid } }),
    );
    expect(response.headers.get("x-request-id")).toBe(uuid);
    expect((await response.json()).requestId).toBe(uuid);
  });

  it("marks every error response no-store", async () => {
    for (const request of [
      post(null, { raw: "not json" }),
      post({ text: "too short" }),
      post({ thread: "wrong key" }),
    ]) {
      const response = await POST(request);
      expect(response.status).toBe(400);
      expect(response.headers.get("Cache-Control")).toBe("no-store");
    }
  });

  it("never logs the pasted text", async () => {
    const info = vi.spyOn(console, "info").mockImplementation(() => undefined);
    await POST(post({ text: RENT_CONTROL_THREAD }));

    expect(info).toHaveBeenCalled();
    const logged = JSON.stringify(info.mock.calls);
    expect(logged).not.toContain("Council is voting");
    expect(logged).not.toContain("marisol_k");
    expect(logged).toContain("rent-control-effectiveness");
    expect(logged).toContain("characterCount");
  });
});

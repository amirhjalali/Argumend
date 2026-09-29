import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

vi.mock("@/lib/rate-limit", () => ({
  rateLimit: vi.fn(() => ({
    success: false,
    remaining: 0,
    resetAt: Date.now() + 4_000,
  })),
}));

import { POST as mapReplyPost } from "./map-reply/route";
import { POST as analyzePost } from "./analyze/route";
import { POST as debatePost } from "./debate/route";
import { POST as debateStreamPost } from "./debate/stream/route";
import { GET as judgeGet, POST as judgePost } from "./judge/route";
import { POST as newsletterPost } from "./newsletter/route";
import {
  DELETE as v1Delete,
  OPTIONS as v1Options,
  PATCH as v1Patch,
  POST as v1Post,
  PUT as v1Put,
} from "./v1/route";
import {
  DELETE as topicsDelete,
  OPTIONS as topicsOptions,
  PATCH as topicsPatch,
  POST as topicsPost,
  PUT as topicsPut,
} from "./v1/topics/route";
import {
  DELETE as topicDelete,
  OPTIONS as topicOptions,
  PATCH as topicPatch,
  POST as topicPost,
  PUT as topicPut,
} from "./v1/topics/[id]/route";

function request(path: string): NextRequest {
  return new NextRequest(new URL(path, "http://localhost"), {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": "contract-client",
    },
    body: "{}",
  });
}

describe("HTTP response contract matrix", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-31T12:00:00Z"));
    // map-reply is flag-gated; without this it answers 404 before it ever
    // reaches the shared rate-limit contract below.
    vi.stubEnv("ENABLE_JEV_MAP_REPLY", "true");
    vi.stubEnv("ARGUMEND_JEV_PROVIDER", "fake");
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllEnvs();
  });

  it.each([
    ["v1 root POST", v1Post],
    ["v1 root PUT", v1Put],
    ["v1 root PATCH", v1Patch],
    ["v1 root DELETE", v1Delete],
    ["v1 topics POST", topicsPost],
    ["v1 topics PUT", topicsPut],
    ["v1 topics PATCH", topicsPatch],
    ["v1 topics DELETE", topicsDelete],
    ["v1 topic POST", topicPost],
    ["v1 topic PUT", topicPut],
    ["v1 topic PATCH", topicPatch],
    ["v1 topic DELETE", topicDelete],
  ])("returns a typed CORS-enabled 405 for %s", async (_label, handler) => {
    const response = handler();

    expect(response.status).toBe(405);
    expect(response.headers.get("Content-Type")).toContain("application/json");
    expect(response.headers.get("Allow")).toBe("GET, HEAD, OPTIONS");
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
    expect(response.headers.get("Access-Control-Allow-Methods")).toBe("GET, OPTIONS");
    await expect(response.json()).resolves.toEqual({
      error: "Method not allowed.",
      code: "METHOD_NOT_ALLOWED",
    });
  });

  it.each([
    ["v1 root", v1Options],
    ["v1 topics", topicsOptions],
    ["v1 topic", topicOptions],
  ])("returns a cacheable CORS preflight for %s", async (_label, handler) => {
    const response = handler();

    expect(response.status).toBe(204);
    expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
    expect(response.headers.get("Access-Control-Allow-Headers")).toBe("Content-Type");
    expect(response.headers.get("Access-Control-Max-Age")).toBe("86400");
    expect(response.headers.get("Cache-Control")).toBe("public, max-age=86400");
    await expect(response.text()).resolves.toBe("");
  });

  it("keeps the internal judge method error typed and non-CORS", async () => {
    const response = judgeGet();

    expect(response.status).toBe(405);
    expect(response.headers.get("Content-Type")).toContain("application/json");
    expect(response.headers.get("Allow")).toBe("POST");
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(response.headers.get("Access-Control-Allow-Origin")).toBeNull();
    await expect(response.json()).resolves.toEqual({
      error: "Listing judgments is not supported",
      code: "METHOD_NOT_ALLOWED",
    });
  });

  it.each([
    ["analyze", analyzePost, "/api/analyze"],
    ["debate", debatePost, "/api/debate"],
    ["debate stream", debateStreamPost, "/api/debate/stream"],
    ["judge", judgePost, "/api/judge"],
    ["newsletter", newsletterPost, "/api/newsletter"],
    ["map reply", mapReplyPost, "/api/map-reply"],
  ])("returns typed, non-CORS rate-limit metadata for %s", async (_label, handler, path) => {
    const response = await handler(request(path));
    const body = await response.json();

    expect(response.status).toBe(429);
    expect(response.headers.get("Content-Type")).toContain("application/json");
    expect(response.headers.get("Retry-After")).toBe("4");
    expect(response.headers.get("Access-Control-Allow-Origin")).toBeNull();

    // Diagnostic keys are allowed, but only these two and only well typed:
    // everything else must reduce to the shared { error } shape.
    const { code, requestId, ...core } = body;
    expect(core).toEqual({
      error: expect.stringMatching(/Rate limited|Too many requests|Too many map replies/),
    });
    if (code !== undefined) expect(code).toBe("RATE_LIMITED");
    if (requestId !== undefined) {
      expect(requestId).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
      );
    }
    expect(JSON.stringify(body)).not.toMatch(/provider|upstream|postgres|secret|stack/i);
  });

  it("keeps the map-reply rate-limit response out of every cache", async () => {
    const response = await mapReplyPost(request("/api/map-reply"));
    expect(response.status).toBe(429);
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(response.headers.get("x-request-id")).toBeTruthy();
  });

  it("keeps the map-reply flag-off response typed and uncacheable", async () => {
    vi.stubEnv("ENABLE_JEV_MAP_REPLY", "false");
    const response = await mapReplyPost(request("/api/map-reply"));

    expect(response.status).toBe(404);
    expect(response.headers.get("Content-Type")).toContain("application/json");
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(response.headers.get("Access-Control-Allow-Origin")).toBeNull();
    const body = await response.json();
    expect(body.error).toBe("Map replies are not enabled.");
    expect(body.code).toBe("FEATURE_DISABLED");
    expect(JSON.stringify(body)).not.toMatch(/provider|upstream|postgres|secret|stack/i);
  });
});

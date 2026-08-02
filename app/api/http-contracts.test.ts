import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

vi.mock("@/lib/rate-limit", () => ({
  rateLimit: vi.fn(() => ({
    success: false,
    remaining: 0,
    resetAt: Date.now() + 4_000,
  })),
}));

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
  });

  afterEach(() => {
    vi.useRealTimers();
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
  ])("returns typed, non-CORS rate-limit metadata for %s", async (_label, handler, path) => {
    const response = await handler(request(path));
    const body = await response.json();

    expect(response.status).toBe(429);
    expect(response.headers.get("Content-Type")).toContain("application/json");
    expect(response.headers.get("Retry-After")).toBe("4");
    expect(response.headers.get("Access-Control-Allow-Origin")).toBeNull();
    expect(body).toEqual({
      error: expect.stringMatching(/Rate limited|Too many requests/),
    });
    expect(JSON.stringify(body)).not.toMatch(/provider|upstream|postgres|secret|stack/i);
  });
});

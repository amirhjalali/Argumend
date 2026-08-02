import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const mocks = vi.hoisted(() => ({
  auth: vi.fn(),
  rateLimit: vi.fn(),
  recordTopicView: vi.fn(),
  getTrendingTopics: vi.fn(),
  isDatabaseConfigured: vi.fn(),
}));

vi.mock("@/lib/auth", () => ({ auth: mocks.auth }));
vi.mock("@/lib/rate-limit", () => ({ rateLimit: mocks.rateLimit }));
vi.mock("@/lib/db/queries", () => ({
  recordTopicView: mocks.recordTopicView,
  getTrendingTopics: mocks.getTrendingTopics,
}));
vi.mock("@/lib/db", () => ({
  isDatabaseConfigured: mocks.isDatabaseConfigured,
}));

import { GET, POST } from "./route";

const postRequest = (body: unknown, ip = "203.0.113.1") =>
  new NextRequest("http://localhost/api/topic-views", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });

const getRequest = (query = "", ip = "203.0.113.1") =>
  new NextRequest(`http://localhost/api/topic-views${query}`, {
    headers: { "x-forwarded-for": ip },
  });

describe("POST /api/topic-views", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.rateLimit.mockReturnValue({
      success: true,
      remaining: 59,
      resetAt: Date.now() + 60_000,
    });
    mocks.auth.mockResolvedValue(null);
    mocks.isDatabaseConfigured.mockReturnValue(true);
    mocks.recordTopicView.mockResolvedValue({ id: "view-1" });
  });

  it("records an anonymous view without requiring a configured database response", async () => {
    const response = await POST(postRequest({ topicId: "ai-risk" }));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true });
    expect(mocks.rateLimit).toHaveBeenCalledWith("topic-views:203.0.113.1", {
      maxRequests: 60,
      windowMs: 60_000,
    });
    expect(mocks.recordTopicView).toHaveBeenCalledWith("ai-risk", undefined);
  });

  it("attaches the authenticated owner when a session is available", async () => {
    mocks.auth.mockResolvedValue({ user: { id: "user-1" } });

    await POST(postRequest({ topicId: "ai-risk" }));

    expect(mocks.recordTopicView).toHaveBeenCalledWith("ai-risk", "user-1");
  });

  it("degrades an auth dependency failure to an anonymous view", async () => {
    mocks.auth.mockRejectedValue(new Error("session database unavailable"));

    const response = await POST(postRequest({ topicId: "ai-risk" }));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true });
    expect(mocks.recordTopicView).toHaveBeenCalledWith("ai-risk", undefined);
  });

  it("swallows an unavailable database write after accepting the view", async () => {
    mocks.recordTopicView.mockRejectedValue(new Error("Database is not available"));

    const response = await POST(postRequest({ topicId: "ai-risk" }));
    await Promise.resolve();

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true });
  });

  it("accepts offline views without touching auth or persistence", async () => {
    mocks.isDatabaseConfigured.mockReturnValue(false);

    const response = await POST(postRequest({ topicId: "ai-risk" }));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true });
    expect(mocks.auth).not.toHaveBeenCalled();
    expect(mocks.recordTopicView).not.toHaveBeenCalled();
  });

  it("silently accepts a rate-limited view without parsing or touching dependencies", async () => {
    mocks.rateLimit.mockReturnValue({
      success: false,
      remaining: 0,
      resetAt: Date.now() + 60_000,
    });

    const response = await POST(postRequest({ topicId: "ai-risk" }));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true });
    expect(mocks.auth).not.toHaveBeenCalled();
    expect(mocks.recordTopicView).not.toHaveBeenCalled();
  });

  it.each([
    ["missing topic id", {}],
    ["empty topic id", { topicId: "" }],
    ["oversized topic id", { topicId: "x".repeat(201) }],
    ["non-string topic id", { topicId: 42 }],
  ])("rejects %s", async (_label, body) => {
    const response = await POST(postRequest(body));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ error: "topicId is required" });
    expect(mocks.auth).not.toHaveBeenCalled();
    expect(mocks.recordTopicView).not.toHaveBeenCalled();
  });

  it("returns a stable malformed-JSON response", async () => {
    const request = new NextRequest("http://localhost/api/topic-views", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{not-json",
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ error: "Invalid request" });
    expect(mocks.auth).not.toHaveBeenCalled();
  });
});

describe("GET /api/topic-views", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.rateLimit.mockReturnValue({
      success: true,
      remaining: 29,
      resetAt: Date.now() + 60_000,
    });
    mocks.getTrendingTopics.mockResolvedValue([
      { topicId: "ai-risk", viewCount: 12 },
    ]);
    mocks.isDatabaseConfigured.mockReturnValue(true);
  });

  it("returns the default ten-topic window", async () => {
    const response = await GET(getRequest());

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      trending: [{ topicId: "ai-risk", viewCount: 12 }],
    });
    expect(mocks.getTrendingTopics).toHaveBeenCalledWith(10);
  });

  it("caps an oversized limit before querying persistence", async () => {
    await GET(getRequest("?limit=500"));

    expect(mocks.getTrendingTopics).toHaveBeenCalledWith(50);
  });

  it.each(["abc", "0", "-1"])("rejects invalid limit %s", async (limit) => {
    const response = await GET(getRequest(`?limit=${limit}`));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ error: "Invalid limit parameter" });
    expect(mocks.getTrendingTopics).not.toHaveBeenCalled();
  });

  it("returns an empty successful shape when persistence is unavailable", async () => {
    mocks.getTrendingTopics.mockRejectedValue(new Error("Database is not available"));
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);

    const response = await GET(getRequest("?limit=5"));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ trending: [] });
    expect(warn).toHaveBeenCalledWith(
      "[topic-views] getTrendingTopics failed: Database is not available",
    );
  });

  it("returns a quiet empty result when persistence is not configured", async () => {
    mocks.isDatabaseConfigured.mockReturnValue(false);
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);

    const response = await GET(getRequest());

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ trending: [] });
    expect(mocks.getTrendingTopics).not.toHaveBeenCalled();
    expect(warn).not.toHaveBeenCalled();
  });

  it("returns a retry window when list reads are rate limited", async () => {
    vi.spyOn(Date, "now").mockReturnValue(1_000);
    mocks.rateLimit.mockReturnValue({
      success: false,
      remaining: 0,
      resetAt: 3_001,
    });

    const response = await GET(getRequest());

    expect(response.status).toBe(429);
    expect(response.headers.get("Retry-After")).toBe("3");
    await expect(response.json()).resolves.toEqual({
      error: "Rate limited. Please try again later.",
    });
    expect(mocks.getTrendingTopics).not.toHaveBeenCalled();
  });
});

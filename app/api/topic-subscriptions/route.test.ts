import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const mocks = vi.hoisted(() => ({
  auth: vi.fn(),
  rateLimit: vi.fn(),
  subscribeTopic: vi.fn(),
  unsubscribeTopic: vi.fn(),
  isSubscribed: vi.fn(),
  getSubscriberCount: vi.fn(),
}));

vi.mock("@/lib/auth", () => ({ auth: mocks.auth }));
vi.mock("@/lib/rate-limit", () => ({ rateLimit: mocks.rateLimit }));
vi.mock("@/lib/db/queries", () => ({
  subscribeTopic: mocks.subscribeTopic,
  unsubscribeTopic: mocks.unsubscribeTopic,
  isSubscribed: mocks.isSubscribed,
  getSubscriberCount: mocks.getSubscriberCount,
}));

import { GET, POST } from "./route";

function getRequest(topicId = "ai-risk"): NextRequest {
  return new NextRequest(
    `http://localhost/api/topic-subscriptions?topicId=${encodeURIComponent(topicId)}`,
  );
}

function postRequest(body: unknown): NextRequest {
  return new NextRequest("http://localhost/api/topic-subscriptions", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("topic subscriptions API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("NEXT_PUBLIC_ENABLE_AUTH", "true");
    mocks.auth.mockResolvedValue({ user: { id: "user-1" } });
    mocks.rateLimit.mockReturnValue({
      success: true,
      remaining: 19,
      resetAt: Date.now() + 60_000,
    });
    mocks.isSubscribed.mockResolvedValue(false);
    mocks.getSubscriberCount.mockResolvedValue(4);
    mocks.subscribeTopic.mockResolvedValue(undefined);
    mocks.unsubscribeTopic.mockResolvedValue(undefined);
  });

  it("stays inert when account features are disabled", async () => {
    vi.stubEnv("NEXT_PUBLIC_ENABLE_AUTH", "false");

    const response = await GET(getRequest());

    expect(response.status).toBe(404);
    expect(await response.json()).toMatchObject({ code: "FEATURE_DISABLED" });
    expect(mocks.auth).not.toHaveBeenCalled();
    expect(mocks.getSubscriberCount).not.toHaveBeenCalled();
  });

  it("returns a typed anonymous state without pretending the user follows", async () => {
    mocks.auth.mockResolvedValueOnce(null);
    mocks.getSubscriberCount.mockResolvedValueOnce(12);

    const response = await GET(getRequest());

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      authenticated: false,
      subscribed: false,
      subscriberCount: 12,
    });
    expect(mocks.isSubscribed).not.toHaveBeenCalled();
  });

  it("returns authenticated follow state", async () => {
    mocks.isSubscribed.mockResolvedValueOnce(true);

    const response = await GET(getRequest());

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      authenticated: true,
      subscribed: true,
      subscriberCount: 4,
    });
  });

  it("requires authentication before mutating", async () => {
    mocks.auth.mockResolvedValueOnce(null);

    const response = await POST(
      postRequest({ topicId: "ai-risk", subscribe: true }),
    );

    expect(response.status).toBe(401);
    expect(await response.json()).toMatchObject({ code: "AUTH_REQUIRED" });
    expect(mocks.subscribeTopic).not.toHaveBeenCalled();
  });

  it("stores the requested state and returns the confirmed count", async () => {
    mocks.getSubscriberCount.mockResolvedValueOnce(5);

    const response = await POST(
      postRequest({ topicId: "ai-risk", subscribe: true }),
    );

    expect(response.status).toBe(200);
    expect(mocks.subscribeTopic).toHaveBeenCalledWith("user-1", "ai-risk");
    expect(await response.json()).toEqual({
      authenticated: true,
      subscribed: true,
      subscriberCount: 5,
    });
  });

  it("classifies malformed JSON as a client error", async () => {
    const request = new NextRequest("http://localhost/api/topic-subscriptions", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{not-json",
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    expect(await response.json()).toMatchObject({ code: "INVALID_JSON" });
    expect(mocks.subscribeTopic).not.toHaveBeenCalled();
  });
});

import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const mocks = vi.hoisted(() => ({
  auth: vi.fn(),
  rateLimit: vi.fn(),
  getSavedTopicIds: vi.fn(),
  saveTopic: vi.fn(),
  unsaveTopic: vi.fn(),
}));

vi.mock("@/lib/auth", () => ({ auth: mocks.auth }));
vi.mock("@/lib/rate-limit", () => ({ rateLimit: mocks.rateLimit }));
vi.mock("@/lib/db/queries", () => ({
  getSavedTopicIds: mocks.getSavedTopicIds,
  saveTopic: mocks.saveTopic,
  unsaveTopic: mocks.unsaveTopic,
}));

import { DELETE, GET, POST } from "./route";

function request(method: "POST" | "DELETE", body: unknown): NextRequest {
  return new NextRequest("http://localhost/api/saved-topics", {
    method,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("saved topics account API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("NEXT_PUBLIC_ENABLE_AUTH", "true");
    mocks.auth.mockResolvedValue({ user: { id: "user-1" } });
    mocks.rateLimit.mockReturnValue({
      success: true,
      remaining: 29,
      resetAt: Date.now() + 60_000,
    });
    mocks.getSavedTopicIds.mockResolvedValue(["ai-risk"]);
    mocks.saveTopic.mockResolvedValue(undefined);
    mocks.unsaveTopic.mockResolvedValue(undefined);
  });

  it("does not initialize auth or persistence while account features are off", async () => {
    vi.stubEnv("NEXT_PUBLIC_ENABLE_AUTH", "false");

    const response = await GET();

    expect(response.status).toBe(404);
    expect(await response.json()).toMatchObject({ code: "FEATURE_DISABLED" });
    expect(mocks.auth).not.toHaveBeenCalled();
    expect(mocks.getSavedTopicIds).not.toHaveBeenCalled();
  });

  it("requires a session for account-backed saves", async () => {
    mocks.auth.mockResolvedValueOnce(null);

    const response = await POST(request("POST", { topicId: "ai-risk" }));

    expect(response.status).toBe(401);
    expect(mocks.saveTopic).not.toHaveBeenCalled();
  });

  it("returns account-backed topic IDs", async () => {
    const response = await GET();

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ topicIds: ["ai-risk"] });
  });

  it("persists and removes a validated topic slug", async () => {
    const saved = await POST(request("POST", { topicId: "ai-risk" }));
    const removed = await DELETE(request("DELETE", { topicId: "ai-risk" }));

    expect(saved.status).toBe(200);
    expect(removed.status).toBe(200);
    expect(mocks.saveTopic).toHaveBeenCalledWith("user-1", "ai-risk");
    expect(mocks.unsaveTopic).toHaveBeenCalledWith("user-1", "ai-risk");
  });

  it("rejects malformed JSON without treating it as a server failure", async () => {
    const malformed = new NextRequest("http://localhost/api/saved-topics", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{not-json",
    });

    const response = await POST(malformed);

    expect(response.status).toBe(400);
    expect(await response.json()).toMatchObject({ code: "INVALID_JSON" });
    expect(mocks.saveTopic).not.toHaveBeenCalled();
  });
});

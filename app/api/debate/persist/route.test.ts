import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const mocks = vi.hoisted(() => ({
  auth: vi.fn(),
  isAuthConfigured: vi.fn(),
  isDatabaseConfigured: vi.fn(),
  saveDebate: vi.fn(),
  saveDebateRound: vi.fn(),
  updateDebateStatus: vi.fn(),
}));

vi.mock("@/lib/auth", () => ({ auth: mocks.auth }));
vi.mock("@/lib/auth-config", () => ({ isAuthConfigured: mocks.isAuthConfigured }));
vi.mock("@/lib/db", () => ({ isDatabaseConfigured: mocks.isDatabaseConfigured }));
vi.mock("@/lib/db/queries", () => ({
  saveDebate: mocks.saveDebate,
  saveDebateRound: mocks.saveDebateRound,
  updateDebateStatus: mocks.updateDebateStatus,
  isDebateOwnershipError: (error: unknown) =>
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "DEBATE_FORBIDDEN",
}));

import { POST } from "./route";

const debateId = "d9428888-122b-41e1-b85c-61cd3cbb3210";

function request(body: unknown): NextRequest {
  return new NextRequest("http://localhost/api/debate/persist", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": `persist-test-${Math.random()}`,
    },
    body: JSON.stringify(body),
  });
}

describe("POST /api/debate/persist", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.isAuthConfigured.mockReturnValue(true);
    mocks.isDatabaseConfigured.mockReturnValue(true);
    mocks.auth.mockResolvedValue({ user: { id: "user-1" } });
    mocks.saveDebate.mockResolvedValue({ id: "debate-1" });
    mocks.saveDebateRound.mockResolvedValue({ id: "round-1" });
    mocks.updateDebateStatus.mockResolvedValue(undefined);
  });

  afterEach(() => vi.restoreAllMocks());

  it("does not invoke authentication when offline auth is unconfigured", async () => {
    mocks.isAuthConfigured.mockReturnValue(false);

    const response = await POST(request({ action: "create" }));

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({ error: "Unauthorized" });
    expect(mocks.auth).not.toHaveBeenCalled();
    expect(mocks.saveDebate).not.toHaveBeenCalled();
  });

  it("returns a safe JSON response when authentication fails", async () => {
    mocks.auth.mockRejectedValueOnce(new Error("private session diagnostic"));
    vi.spyOn(console, "error").mockImplementation(() => {});

    const response = await POST(request({ action: "create" }));

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      error: "Sign-in is temporarily unavailable. Please try again later.",
      code: "AUTH_UNAVAILABLE",
    });
    expect(mocks.saveDebate).not.toHaveBeenCalled();
  });

  it("returns 400 for malformed JSON without trying to persist", async () => {
    const response = await POST(new NextRequest("http://localhost/api/debate/persist", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{not-json",
    }));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "Invalid JSON body",
      code: "INVALID_JSON",
    });
    expect(mocks.saveDebate).not.toHaveBeenCalled();
  });

  it.each([
    {
      action: "create",
      topicTitle: "A disputed claim",
      forModel: "claude",
      againstModel: "gpt-4",
      totalRounds: 3,
    },
    { action: "saveRound", debateId, roundNumber: 1, forContent: "For", againstContent: "Against" },
    { action: "updateStatus", debateId, status: "completed" },
  ])("does not write $action when database persistence is unavailable", async (body) => {
    mocks.isDatabaseConfigured.mockReturnValue(false);

    const response = await POST(request(body));

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      error: "Debate storage is unavailable",
      code: "PERSISTENCE_UNAVAILABLE",
    });
    expect(mocks.saveDebate).not.toHaveBeenCalled();
    expect(mocks.saveDebateRound).not.toHaveBeenCalled();
    expect(mocks.updateDebateStatus).not.toHaveBeenCalled();
  });

  it.each(["not-a-uuid", " ", "d9428888-122b-41e1-b85c-61cd3cbb3210-extra"])(
    "rejects malformed debate id %s before storage",
    async (invalidId) => {
      for (const body of [
        { action: "saveRound", debateId: invalidId, roundNumber: 1, forContent: "For", againstContent: "Against" },
        { action: "updateStatus", debateId: invalidId, status: "completed" },
      ]) {
        const response = await POST(request(body));
        expect(response.status).toBe(400);
      }
      expect(mocks.saveDebateRound).not.toHaveBeenCalled();
      expect(mocks.updateDebateStatus).not.toHaveBeenCalled();
    },
  );

  it("requires an authenticated user", async () => {
    mocks.auth.mockResolvedValueOnce(null);

    const response = await POST(request({ action: "create" }));

    expect(response.status).toBe(401);
    expect(mocks.saveDebate).not.toHaveBeenCalled();
  });

  it("persists the session user as debate owner", async () => {
    const response = await POST(
      request({
        action: "create",
        topicId: "topic-1",
        topicTitle: "A disputed claim",
        forModel: "claude",
        againstModel: "gpt-4",
        totalRounds: 3,
      })
    );

    expect(response.status).toBe(200);
    expect(mocks.saveDebate).toHaveBeenCalledWith({
      userId: "user-1",
      topicId: "topic-1",
      topicTitle: "A disputed claim",
      forModel: "claude",
      againstModel: "gpt-4",
      totalRounds: 3,
    });
  });

  it("passes the session user through ownership-protected round writes", async () => {
    const response = await POST(
      request({
        action: "saveRound",
        debateId,
        roundNumber: 1,
        forContent: "For",
        againstContent: "Against",
      })
    );

    expect(response.status).toBe(200);
    expect(mocks.saveDebateRound).toHaveBeenCalledWith("user-1", {
      debateId,
      roundNumber: 1,
      forContent: "For",
      againstContent: "Against",
    });
  });

  it("accepts only the normalized completed status", async () => {
    const completed = await POST(
      request({
        action: "updateStatus",
        debateId,
        status: "completed",
        winner: "for",
      })
    );
    expect(completed.status).toBe(200);
    expect(mocks.updateDebateStatus).toHaveBeenCalledWith(
      "user-1",
      debateId,
      "completed",
      "for"
    );

    const legacy = await POST(
      request({
        action: "updateStatus",
        debateId,
        status: "complete",
      })
    );
    expect(legacy.status).toBe(400);
  });

  it("returns a typed 403 when the debate is not owned by the user", async () => {
    mocks.saveDebateRound.mockRejectedValueOnce({
      code: "DEBATE_FORBIDDEN",
    });

    const response = await POST(
      request({
        action: "saveRound",
        debateId,
        roundNumber: 1,
        forContent: "For",
        againstContent: "Against",
      })
    );

    expect(response.status).toBe(403);
    expect(await response.json()).toEqual({
      error: "Forbidden",
      code: "DEBATE_FORBIDDEN",
    });
  });
});

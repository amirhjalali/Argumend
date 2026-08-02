import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const mocks = vi.hoisted(() => ({
  auth: vi.fn(),
  saveDebate: vi.fn(),
  saveDebateRound: vi.fn(),
  updateDebateStatus: vi.fn(),
}));

vi.mock("@/lib/auth", () => ({ auth: mocks.auth }));
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
    mocks.auth.mockResolvedValue({ user: { id: "user-1" } });
    mocks.saveDebate.mockResolvedValue({ id: "debate-1" });
    mocks.saveDebateRound.mockResolvedValue({ id: "round-1" });
    mocks.updateDebateStatus.mockResolvedValue(undefined);
  });

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
        debateId: "debate-1",
        roundNumber: 1,
        forContent: "For",
        againstContent: "Against",
      })
    );

    expect(response.status).toBe(200);
    expect(mocks.saveDebateRound).toHaveBeenCalledWith("user-1", {
      debateId: "debate-1",
      roundNumber: 1,
      forContent: "For",
      againstContent: "Against",
    });
  });

  it("accepts only the normalized completed status", async () => {
    const completed = await POST(
      request({
        action: "updateStatus",
        debateId: "debate-1",
        status: "completed",
        winner: "for",
      })
    );
    expect(completed.status).toBe(200);
    expect(mocks.updateDebateStatus).toHaveBeenCalledWith(
      "user-1",
      "debate-1",
      "completed",
      "for"
    );

    const legacy = await POST(
      request({
        action: "updateStatus",
        debateId: "debate-1",
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
        debateId: "someone-elses-debate",
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

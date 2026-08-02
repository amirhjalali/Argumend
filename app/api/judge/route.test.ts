import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { JudgeMethodNotAllowedResponseSchema } from "@/lib/judge/contracts";

const mocks = vi.hoisted(() => ({
  auth: vi.fn(),
  createJudgeCouncil: vi.fn(),
  judgeDebate: vi.fn(),
  judgeContent: vi.fn(),
  saveJudgment: vi.fn(),
}));

vi.mock("@/lib/auth", () => ({ auth: mocks.auth }));

vi.mock("@/lib/judge/council", () => ({
  createJudgeCouncil: mocks.createJudgeCouncil,
}));

vi.mock("@/lib/db/queries", () => ({
  saveJudgment: mocks.saveJudgment,
  listJudgments: vi.fn(async () => []),
}));

import { listJudgments, saveJudgment } from "@/lib/db/queries";
import { GET, POST } from "./route";

function postRequest(body: unknown): NextRequest {
  return new NextRequest(new URL("http://localhost/api/judge"), {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": `test-${Math.random()}`,
    },
    body: JSON.stringify(body),
  });
}

function malformedRequest(): NextRequest {
  return new NextRequest(new URL("http://localhost/api/judge"), {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": `test-malformed-${Math.random()}`,
    },
    body: "{not-json",
  });
}

const liveResult = {
  verdicts: [],
  winner: "draw",
  hasConsensus: true,
  aggregatedScores: {
    for: { average: 5, byDimension: {} },
    against: { average: 5, byDimension: {} },
  },
  disagreements: [],
  manualReviewRecommended: false,
};

describe("POST /api/judge", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.stubEnv("DATABASE_URL", "");
    vi.stubEnv("AUTH_SECRET", "test-auth-secret");
    process.env.ENABLE_LIVE_JUDGING_API = "false";
    process.env.NEXT_PUBLIC_ENABLE_LIVE_JUDGING_API = "false";
    mocks.auth.mockReset();
    mocks.auth.mockResolvedValue({ user: { id: "user-1" } });
    mocks.saveJudgment.mockReset();
    mocks.saveJudgment.mockRejectedValue(new Error("Database is not available"));
    mocks.judgeDebate.mockReset();
    mocks.judgeDebate.mockResolvedValue(liveResult);
    mocks.judgeContent.mockReset();
    mocks.judgeContent.mockResolvedValue(liveResult);
    mocks.createJudgeCouncil.mockReset();
    mocks.createJudgeCouncil.mockReturnValue({
      judgeDebate: mocks.judgeDebate,
      judgeContent: mocks.judgeContent,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it("returns an offline judgment without auth or database persistence", async () => {
    const res = await POST(postRequest({
      type: "debate",
      topic: "Nuclear Energy",
      messages: [
        {
          side: "for",
          round: 1,
          content: "Nuclear energy provides reliable low-carbon electricity.",
        },
        {
          side: "against",
          round: 1,
          content: "Nuclear plants are expensive and slow to build.",
        },
      ],
    }));

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.id).toBeUndefined();
    expect(body.verdicts).toHaveLength(3);
    expect(body.aggregatedScores.for.average).toBeGreaterThan(0);
    expect(body.aggregatedScores.against.average).toBeGreaterThan(0);
    expect(saveJudgment).not.toHaveBeenCalled();
    expect(console.warn).not.toHaveBeenCalled();
  });

  it("returns a stable 400 response for malformed JSON", async () => {
    const res = await POST(malformedRequest());

    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toEqual({
      error: "Invalid JSON",
      code: "INVALID_JSON",
    });
  });

  it.each([
    ["oversized debate messages", [{ side: "for", round: 1, content: "x".repeat(50_001) }]],
    ["excessive debate history", Array.from({ length: 41 }, () => ({ side: "for", round: 1, content: "x" }))],
  ])("rejects %s before judging", async (_label, messages) => {
    const res = await POST(postRequest({ type: "debate", topic: "Bounded input", messages }));

    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toMatchObject({ error: "Invalid request" });
  });

  it("does not authorize live judging from the public UI flag", async () => {
    process.env.NEXT_PUBLIC_ENABLE_LIVE_JUDGING_API = "true";

    const res = await POST(postRequest({
      type: "content",
      content: "Supporters cite lower costs. Critics cite implementation risk.",
    }));

    expect(res.status).toBe(200);
    expect(mocks.auth).not.toHaveBeenCalled();
  });

  it.each([
    [{ type: "debate" }, "Debate type requires messages array"],
    [{ type: "debate", messages: [] }, "Debate type requires messages array"],
    [{ type: "content" }, "Content type requires content field"],
    [{ type: "content", content: "" }, "Content type requires content field"],
  ])("enforces type-specific required content", async (input, error) => {
    const response = await POST(postRequest(input));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ error });
    expect(mocks.auth).not.toHaveBeenCalled();
  });

  it("uses the requested offline content model and content type", async () => {
    const response = await POST(postRequest({
      type: "content",
      content: "Supporters cite evidence. Critics identify uncertainty.",
      contentType: "article",
      judgeModels: ["grok"],
    }));

    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.verdicts).toHaveLength(1);
    expect(body.verdicts[0].model).toBe("grok");
  });

  it.each([
    ["debate", {
      type: "debate",
      topic: "A bounded claim",
      messages: [{ side: "for", round: 1, content: "A supported argument." }],
    }],
    ["content", {
      type: "content",
      content: "A balanced article.",
      contentType: "article",
    }],
  ])("uses the authenticated live council for %s judging", async (kind, input) => {
    process.env.ENABLE_LIVE_JUDGING_API = "true";

    const response = await POST(postRequest(input));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject(liveResult);
    expect(mocks.auth).toHaveBeenCalledOnce();
    expect(mocks.createJudgeCouncil).toHaveBeenCalledOnce();
    if (kind === "debate") {
      expect(mocks.judgeDebate).toHaveBeenCalledWith(
        expect.any(Array),
        "A bounded claim",
      );
    } else {
      expect(mocks.judgeContent).toHaveBeenCalledWith("A balanced article.", "article");
    }
  });

  it("falls back offline when authentication is unavailable without logging secrets", async () => {
    process.env.ENABLE_LIVE_JUDGING_API = "true";
    mocks.auth.mockRejectedValue(new Error("postgres://private:password@db/internal"));

    const response = await POST(postRequest({
      type: "content",
      content: "An offline-safe argument.",
    }));

    expect(response.status).toBe(200);
    expect(mocks.createJudgeCouncil).not.toHaveBeenCalled();
    expect(JSON.stringify(vi.mocked(console.warn).mock.calls)).not.toContain("private:password");
  });

  it("falls back offline when live judging fails without exposing provider text", async () => {
    process.env.ENABLE_LIVE_JUDGING_API = "true";
    mocks.judgeContent.mockRejectedValue(
      new Error("provider body sk-live-secret postgres://private:password@db/internal"),
    );

    const response = await POST(postRequest({
      type: "content",
      content: "An offline fallback argument.",
    }));

    expect(response.status).toBe(200);
    const warnings = JSON.stringify(vi.mocked(console.warn).mock.calls);
    expect(warnings).not.toContain("sk-live-secret");
    expect(warnings).not.toContain("private:password");
  });

  it("returns a saved judgment id when optional persistence succeeds", async () => {
    process.env.DATABASE_URL = "postgres://configured";
    mocks.saveJudgment.mockResolvedValue({ id: "judgment-1" });

    const response = await POST(postRequest({
      type: "content",
      content: "A persistable offline result.",
      debateId: "debate-1",
    }));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({ id: "judgment-1" });
    expect(mocks.saveJudgment).toHaveBeenCalledWith(
      expect.objectContaining({ verdicts: expect.any(Array) }),
      { debateId: "debate-1" },
    );
  });

  it("keeps the judgment available when optional persistence fails", async () => {
    process.env.DATABASE_URL = "postgres://configured";
    mocks.saveJudgment.mockRejectedValue(
      new Error("postgres://private:password@db/internal"),
    );

    const response = await POST(postRequest({
      type: "content",
      content: "A result that should survive persistence failure.",
    }));

    expect(response.status).toBe(200);
    expect((await response.json()).id).toBeUndefined();
    expect(JSON.stringify(vi.mocked(console.warn).mock.calls)).not.toContain("private:password");
  });

  it("rate limits repeated requests from the same client", async () => {
    const input = { type: "content", content: "A short argument." };
    const request = () => new NextRequest(new URL("http://localhost/api/judge"), {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": "fixed-client" },
      body: JSON.stringify(input),
    });

    for (let count = 0; count < 10; count += 1) {
      expect((await POST(request())).status).toBe(200);
    }
    const limited = await POST(request());

    expect(limited.status).toBe(429);
    expect(Number(limited.headers.get("Retry-After"))).toBeGreaterThan(0);
    await expect(limited.json()).resolves.toEqual({
      error: "Rate limited. Please try again later.",
    });
  });
});

describe("GET /api/judge privacy boundary", () => {
  beforeEach(() => vi.clearAllMocks());

  it.each([
    ["anonymous callers", null],
    ["an unrelated signed-in user", { user: { id: "other-user" } }],
  ])("never exposes private debate judgment history to %s", async (_label, session) => {
    mocks.auth.mockResolvedValue(session);
    const response = GET();
    const body = await response.json();

    expect(response.status).toBe(405);
    expect(response.headers.get("Allow")).toBe("POST");
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(() => JudgeMethodNotAllowedResponseSchema.parse(body)).not.toThrow();
    expect(body).toEqual({
      error: "Listing judgments is not supported",
      code: "METHOD_NOT_ALLOWED",
    });
    expect(mocks.auth).not.toHaveBeenCalled();
    expect(listJudgments).not.toHaveBeenCalled();
    expect(JSON.stringify(body)).not.toMatch(/debateId|verdict|reasoning/i);
  });
});

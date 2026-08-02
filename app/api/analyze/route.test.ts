import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { GET, POST } from "./route";
import { listAnalyses, saveAnalysis } from "@/lib/db/queries";
import { extractArgumentsOffline } from "@/lib/analyze/offline";

const { mockAuth, mockExtractArguments, mockLiveJudgeDebate } = vi.hoisted(() => ({
  mockAuth: vi.fn(),
  mockExtractArguments: vi.fn(),
  mockLiveJudgeDebate: vi.fn(),
}));

vi.mock("@/lib/auth", () => ({ auth: mockAuth }));

vi.mock("@/lib/analyze/extractor", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/analyze/extractor")>();
  return { ...actual, extractArguments: mockExtractArguments };
});

vi.mock("@/lib/judge/council", () => ({
  createJudgeCouncil: () => ({ judgeDebate: mockLiveJudgeDebate }),
}));

vi.mock("@/lib/db/queries", () => ({
  saveAnalysis: vi.fn(async () => {
    throw new Error("Database is not available");
  }),
  saveJudgment: vi.fn(async () => {
    throw new Error("Database is not available");
  }),
  listAnalyses: vi.fn(async () => []),
}));

function postRequest(body: unknown): NextRequest {
  return new NextRequest(new URL("http://localhost/api/analyze"), {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": `test-${Math.random()}`,
    },
    body: JSON.stringify(body),
  });
}

function malformedRequest(): NextRequest {
  return new NextRequest(new URL("http://localhost/api/analyze"), {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": `test-malformed-${Math.random()}`,
    },
    body: "{not-json",
  });
}

describe("POST /api/analyze", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.stubEnv("DATABASE_URL", "");
    vi.stubEnv("AUTH_SECRET", "test-auth-secret");
    process.env.ENABLE_LIVE_ANALYZE_API = "false";
    process.env.NEXT_PUBLIC_ENABLE_LIVE_ANALYZE_API = "false";
    process.env.ENABLE_LIVE_JUDGING_API = "false";
    process.env.NEXT_PUBLIC_ENABLE_LIVE_JUDGING_API = "false";
    mockAuth.mockReset();
    mockAuth.mockResolvedValue({ user: { id: "test-user" } });
    mockExtractArguments.mockReset();
    mockLiveJudgeDebate.mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it("returns an offline analysis without auth or database persistence", async () => {
    const res = await POST(postRequest({
      content:
        "Supporters argue nuclear energy provides reliable low-carbon electricity. Critics counter that nuclear projects are slow and expensive.",
      contentType: "article",
    }));

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.id).toBeUndefined();
    expect(typeof body.extracted.topic).toBe("string");
    expect(Array.isArray(body.extracted.positions)).toBe(true);
    expect(typeof body.extracted.summary).toBe("string");
    expect(typeof body.extracted.confidence).toBe("number");
    expect(body.extracted.positions.length >= 2).toBe(true);
    expect(body.execution).toEqual({
      analysis: { requested: "offline", actual: "offline" },
      judging: { requested: "disabled", actual: "disabled" },
    });
    expect(saveAnalysis).not.toHaveBeenCalled();
    expect(console.warn).not.toHaveBeenCalled();
  });

  it("never logs private bound values when analysis persistence fails", async () => {
    vi.stubEnv("DATABASE_URL", "postgres://configured.test/argumend");
    vi.mocked(saveAnalysis).mockRejectedValueOnce(
      new Error(
        'Failed query: insert into "analyses" ("summary") values ($1)\nparams: private submitted argument',
      ),
    );

    const res = await POST(postRequest({
      content: "Supporters make a case. Critics make a countercase.",
    }));

    expect(res.status).toBe(200);
    const logged = JSON.stringify(vi.mocked(console.warn).mock.calls);
    expect(logged).toContain("params: [redacted]");
    expect(logged).not.toContain("private submitted argument");
  });

  it("returns a stable 400 response for malformed JSON", async () => {
    const res = await POST(malformedRequest());

    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toEqual({
      error: "Invalid JSON",
      code: "INVALID_JSON",
    });
  });

  it("records a successful live analysis without a fallback code", async () => {
    process.env.ENABLE_LIVE_ANALYZE_API = "true";
    const liveResult = extractArgumentsOffline(
      "Supporters favor the proposal. Critics oppose the proposal.",
      "freeform",
    );
    mockExtractArguments.mockResolvedValueOnce(liveResult);

    const res = await POST(postRequest({ content: "A two-sided proposal." }));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.execution.analysis).toEqual({
      requested: "live",
      actual: "live",
    });
  });

  it("uses a safe provenance code when live analysis falls back offline", async () => {
    process.env.ENABLE_LIVE_ANALYZE_API = "true";
    mockExtractArguments.mockRejectedValueOnce(
      new Error("secret provider credential failure"),
    );

    const res = await POST(postRequest({
      content: "Supporters favor the proposal. Critics oppose the proposal.",
    }));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.execution.analysis).toEqual({
      requested: "live",
      actual: "offline",
      fallbackCode: "ANALYSIS_PROVIDER_ERROR",
    });
    expect(JSON.stringify(body)).not.toContain("secret provider credential failure");
  });

  it("records live judging fallback separately from analysis mode", async () => {
    process.env.ENABLE_LIVE_JUDGING_API = "true";
    mockLiveJudgeDebate.mockRejectedValueOnce(
      new Error("private judging provider response"),
    );

    const res = await POST(postRequest({
      content:
        "Supporters argue the policy lowers costs. Critics argue implementation creates risk.",
      includeJudging: true,
    }));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.execution.analysis).toEqual({
      requested: "offline",
      actual: "offline",
    });
    expect(body.execution.judging).toEqual({
      requested: "live",
      actual: "offline",
      fallbackCode: "JUDGING_PROVIDER_ERROR",
    });
    expect(body.judgingResult).not.toBeNull();
    expect(JSON.stringify(body)).not.toContain("private judging provider response");
  });

  it("keeps public UI flags from authorizing live backend work", async () => {
    process.env.NEXT_PUBLIC_ENABLE_LIVE_ANALYZE_API = "true";
    process.env.NEXT_PUBLIC_ENABLE_LIVE_JUDGING_API = "true";

    const res = await POST(postRequest({
      content:
        "Supporters argue the policy lowers costs. Critics argue implementation creates risk.",
      includeJudging: true,
    }));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.execution).toEqual({
      analysis: { requested: "offline", actual: "offline" },
      judging: { requested: "offline", actual: "offline" },
    });
    expect(mockAuth).not.toHaveBeenCalled();
    expect(mockExtractArguments).not.toHaveBeenCalled();
    expect(mockLiveJudgeDebate).not.toHaveBeenCalled();
  });

  it("persists derived analysis without passing the raw input", async () => {
    vi.stubEnv("DATABASE_URL", "postgres://configured.test/argumend");
    vi.mocked(saveAnalysis).mockResolvedValueOnce({ id: "analysis-id" } as never);
    const content = "A confidential argument that must not be stored.";

    const res = await POST(postRequest({ content, contentType: "freeform" }));

    expect(res.status).toBe(200);
    expect(saveAnalysis).toHaveBeenCalledTimes(1);
    expect(saveAnalysis).toHaveBeenCalledWith(
      { contentType: "freeform" },
      expect.objectContaining({
        topic: expect.any(String),
        positions: expect.any(Array),
      })
    );
    expect(saveAnalysis).not.toHaveBeenCalledWith(
      expect.objectContaining({ inputContent: content }),
      expect.anything()
    );
  });
});

describe("GET /api/analyze", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("DATABASE_URL", "postgres://configured.test/argumend");
  });

  afterEach(() => vi.unstubAllEnvs());

  it("returns the offline collection fallback without probing the database", async () => {
    vi.stubEnv("DATABASE_URL", "");

    const response = await GET(
      new NextRequest(`http://localhost/api/analyze`, {
        headers: { "x-forwarded-for": `test-list-offline-${Math.random()}` },
      })
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      analyses: [],
      persistence: "unavailable",
    });
    expect(listAnalyses).not.toHaveBeenCalled();
  });

  it("redacts private fields from historical analysis rows", async () => {
    vi.mocked(listAnalyses).mockResolvedValueOnce([
      {
        id: "analysis-id",
        topic: "Public topic",
        summary: "Public summary",
        inputContent: "private source text",
        contentHash: "private-hash",
        userId: "private-owner",
      },
    ] as never);

    const response = await GET(
      new NextRequest(`http://localhost/api/analyze?limit=1`, {
        headers: { "x-forwarded-for": `test-list-${Math.random()}` },
      })
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.analyses).toEqual([
      {
        id: "analysis-id",
        topic: "Public topic",
        summary: "Public summary",
      },
    ]);
    expect(JSON.stringify(body)).not.toContain("private source text");
    expect(JSON.stringify(body)).not.toContain("private-owner");
  });
});

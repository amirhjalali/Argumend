import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "./route";

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

describe("POST /api/analyze", () => {
  beforeEach(() => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    process.env.ENABLE_LIVE_ANALYZE_API = "false";
    process.env.NEXT_PUBLIC_ENABLE_LIVE_ANALYZE_API = "false";
    process.env.ENABLE_LIVE_JUDGING_API = "false";
    process.env.NEXT_PUBLIC_ENABLE_LIVE_JUDGING_API = "false";
  });

  afterEach(() => {
    vi.restoreAllMocks();
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
  });
});

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "./route";

vi.mock("@/lib/db/queries", () => ({
  saveJudgment: vi.fn(async () => {
    throw new Error("Database is not available");
  }),
  listJudgments: vi.fn(async () => []),
}));

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

describe("POST /api/judge", () => {
  beforeEach(() => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    process.env.ENABLE_LIVE_JUDGING_API = "false";
    process.env.NEXT_PUBLIC_ENABLE_LIVE_JUDGING_API = "false";
  });

  afterEach(() => {
    vi.restoreAllMocks();
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
  });
});

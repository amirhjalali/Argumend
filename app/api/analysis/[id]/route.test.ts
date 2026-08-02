import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { GET } from "./route";
import { getAnalysis } from "@/lib/db/queries";
import { isDatabaseConfigured } from "@/lib/db";

vi.mock("@/lib/db/queries", () => ({
  getAnalysis: vi.fn(),
}));

vi.mock("@/lib/db", () => ({
  isDatabaseConfigured: vi.fn(() => true),
  getDb: vi.fn(() => ({
    query: {
      judgments: {
        findFirst: vi.fn(async () => undefined),
      },
    },
  })),
}));

describe("GET /api/analysis/[id]", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(isDatabaseConfigured).mockReturnValue(true);
  });

  it("returns a stable offline response without touching storage", async () => {
    vi.mocked(isDatabaseConfigured).mockReturnValueOnce(false);

    const response = await GET(
      new NextRequest(
        "http://localhost/api/analysis/d9428888-122b-11e1-b85c-61cd3cbb3210",
        { headers: { "x-forwarded-for": `offline-${Math.random()}` } },
      ),
      {
        params: Promise.resolve({
          id: "d9428888-122b-11e1-b85c-61cd3cbb3210",
        }),
      },
    );

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      error: "Saved analysis storage is unavailable",
      code: "PERSISTENCE_UNAVAILABLE",
    });
    expect(getAnalysis).not.toHaveBeenCalled();
  });

  it("redacts raw input and ownership fields from detail JSON", async () => {
    vi.mocked(getAnalysis).mockResolvedValueOnce({
      id: "d9428888-122b-11e1-b85c-61cd3cbb3210",
      topic: "Public topic",
      summary: "Public summary",
      inputContent: "private source text",
      contentHash: "private-hash",
      userId: "private-owner",
    } as never);

    const response = await GET(
      new NextRequest("http://localhost/api/analysis/d9428888-122b-11e1-b85c-61cd3cbb3210", {
        headers: { "x-forwarded-for": `test-detail-${Math.random()}` },
      }),
      { params: Promise.resolve({ id: "d9428888-122b-11e1-b85c-61cd3cbb3210" }) }
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.analysis).toEqual({
      id: "d9428888-122b-11e1-b85c-61cd3cbb3210",
      topic: "Public topic",
      summary: "Public summary",
    });
    expect(JSON.stringify(body)).not.toContain("private source text");
    expect(JSON.stringify(body)).not.toContain("private-owner");
  });
});

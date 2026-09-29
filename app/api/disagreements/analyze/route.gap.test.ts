import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { DISAGREEMENT_FEW_SHOT_EXAMPLES } from "@/lib/disagreement/prompts/v1/examples";
import { GapObservationSchema } from "@/lib/gapMetric/record";

const dbState = vi.hoisted(() => ({
  configured: true,
  inserted: [] as unknown[],
  failInsert: false,
  throwOnGetDb: false,
}));

vi.mock("@/lib/db", () => ({
  isDatabaseConfigured: () => dbState.configured,
  getDb: () => {
    if (dbState.throwOnGetDb) throw new Error("Database is not available");
    return {
      insert: () => ({
        values: (row: unknown) => {
          dbState.inserted.push(row);
          return dbState.failInsert ? Promise.reject(new Error("connection refused")) : Promise.resolve();
        },
      }),
    };
  },
}));

vi.mock("@/lib/disagreement/model", async () => {
  const actual = await vi.importActual<typeof import("@/lib/disagreement/model")>("@/lib/disagreement/model");
  return {
    ...actual,
    createDisagreementProvider: () =>
      new actual.FakeDisagreementProvider(DISAGREEMENT_FEW_SHOT_EXAMPLES[1].extraction),
    isDisagreementV2Enabled: () => process.env.ENABLE_DISAGREEMENT_V2 === "true",
    isDisagreementPublishingEnabled: () => false,
  };
});

import { POST } from "./route";

const SOURCE = `${DISAGREEMENT_FEW_SHOT_EXAMPLES[1].source}\n\n${"Context for length. ".repeat(8)}`;

function post() {
  return new NextRequest(new URL("http://localhost/api/disagreements/analyze"), {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": `gap-${Math.random()}` },
    body: JSON.stringify({ content: SOURCE, contentType: "conversation" }),
  });
}

describe("POST /api/disagreements/analyze gap-metric logging", () => {
  beforeEach(() => {
    vi.stubEnv("ENABLE_DISAGREEMENT_V2", "true");
    vi.stubEnv("ARGUMEND_DISAGREEMENT_PROVIDER", "fake");
    vi.stubEnv("ENABLE_GAP_METRIC_LOGGING", "true");
    Object.assign(dbState, { configured: true, inserted: [], failInsert: false, throwOnGetDb: false });
  });
  afterEach(() => vi.unstubAllEnvs());

  it("writes nothing while the flag is off", async () => {
    vi.stubEnv("ENABLE_GAP_METRIC_LOGGING", "false");
    expect((await POST(post())).status).toBe(200);
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(dbState.inserted).toHaveLength(0);
  });

  it("writes one counts-only analyze-v2 row", async () => {
    expect((await POST(post())).status).toBe(200);
    await vi.waitFor(() => expect(dbState.inserted).toHaveLength(1));
    const row = GapObservationSchema.parse(dbState.inserted[0]);
    expect(row.lane).toBe("analyze-v2");
    expect(row.topicId).toBeNull();
    expect(row.cruxClaimIds).toEqual([]);
    const serialized = JSON.stringify(row).toLowerCase();
    for (const word of SOURCE.split(/\s+/).filter((w) => w.length >= 9)) {
      expect(serialized).not.toContain(word.toLowerCase());
    }
  });

  it("still returns the diagnosis when the insert rejects or the DB is unreachable", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    dbState.failInsert = true;
    expect((await POST(post())).status).toBe(200);
    dbState.throwOnGetDb = true;
    expect((await POST(post())).status).toBe(200);
    await new Promise((resolve) => setTimeout(resolve, 0));
    warn.mockRestore();
  });
});

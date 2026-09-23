import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { RENT_CONTROL_JEV_FIXTURES, RENT_CONTROL_THREAD } from "@/lib/mapReply/__fixtures__";
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

vi.mock("@/lib/jev/client", async () => {
  const actual = await vi.importActual<typeof import("@/lib/jev/client")>("@/lib/jev/client");
  return { ...actual, getJevProvider: () => new actual.FakeJevProvider(RENT_CONTROL_JEV_FIXTURES) };
});

import { POST } from "./route";

let counter = 0;
function post(text: string) {
  counter += 1;
  return new NextRequest(new URL("http://localhost/api/map-reply"), {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": `gap-${counter}` },
    body: JSON.stringify({ text }),
  });
}

async function flush() {
  await new Promise((resolve) => setTimeout(resolve, 0));
}

describe("POST /api/map-reply gap-metric logging", () => {
  beforeEach(() => {
    vi.stubEnv("ENABLE_JEV_MAP_REPLY", "true");
    vi.stubEnv("ARGUMEND_JEV_PROVIDER", "fake");
    vi.stubEnv("MAP_REPLY_TOPIC_CONFIDENCE", "");
    vi.stubEnv("ENABLE_GAP_METRIC_LOGGING", "true");
    Object.assign(dbState, { configured: true, inserted: [], failInsert: false, throwOnGetDb: false });
  });
  afterEach(() => vi.unstubAllEnvs());

  it("writes nothing while the flag is off", async () => {
    vi.stubEnv("ENABLE_GAP_METRIC_LOGGING", "");
    const response = await POST(post(RENT_CONTROL_THREAD));
    expect(response.status).toBe(200);
    expect(dbState.inserted).toHaveLength(0);
  });

  it("writes nothing without a database", async () => {
    dbState.configured = false;
    const response = await POST(post(RENT_CONTROL_THREAD));
    expect(response.status).toBe(200);
    await flush();
    expect(dbState.inserted).toHaveLength(0);
  });

  it("writes one counts-only row that carries none of the paste", async () => {
    const response = await POST(post(RENT_CONTROL_THREAD));
    expect(response.status).toBe(200);
    await vi.waitFor(() => expect(dbState.inserted).toHaveLength(1));
    const row = GapObservationSchema.parse(dbState.inserted[0]);
    expect(row.lane).toBe("map-reply");
    expect(row.topicId).toBe("rent-control-effectiveness");
    expect(row.propositionCount + row.unmatchedCount).toBeGreaterThan(0);
    expect(row.cruxClaimIds).toEqual(["construction-response-test", "supply-timeline-test"]);
    // Crux and topic ids come from the map data, not the paste, and may share
    // words with it; everything else must carry none of the paste.
    const { cruxClaimIds: _ids, topicId: _topic, ...rest } = row;
    const serialized = JSON.stringify(rest).toLowerCase();
    // Speaker handles are reader text; they must not reach the table.
    expect(serialized).not.toContain("gary_1962");
    for (const word of RENT_CONTROL_THREAD.split(/\s+/).filter((w) => w.length >= 9)) {
      expect(serialized).not.toContain(word.toLowerCase());
    }
  });

  it("still serves the reply when the insert rejects", async () => {
    dbState.failInsert = true;
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const response = await POST(post(RENT_CONTROL_THREAD));
    expect(response.status).toBe(200);
    expect((await response.json()).ok).toBe(true);
    await vi.waitFor(() => expect(warn).toHaveBeenCalled());
    warn.mockRestore();
  });

  it("still serves the reply when the database cannot be reached", async () => {
    dbState.throwOnGetDb = true;
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const response = await POST(post(RENT_CONTROL_THREAD));
    expect(response.status).toBe(200);
    await vi.waitFor(() => expect(warn).toHaveBeenCalled());
    expect(dbState.inserted).toHaveLength(0);
    warn.mockRestore();
  });

  it("still serves the reply when the database module cannot load at all", async () => {
    // What a server without a loadable postgres driver does. The route must not
    // import the DB stack at module load (the /api/topic-views 500).
    vi.resetModules();
    vi.doMock("@/lib/db", () => {
      throw new Error("Failed to load external module postgres");
    });
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    try {
      const { POST: freshPost } = await import("./route");
      const response = await freshPost(post(RENT_CONTROL_THREAD));
      expect(response.status).toBe(200);
      expect((await response.json()).ok).toBe(true);
      await vi.waitFor(() => expect(warn).toHaveBeenCalled());
      expect(dbState.inserted).toHaveLength(0);
    } finally {
      warn.mockRestore();
      vi.doUnmock("@/lib/db");
      vi.resetModules();
    }
  });
});

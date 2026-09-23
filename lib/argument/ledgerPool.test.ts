import { describe, expect, it } from "vitest";
import type { CruxLedgerEntry } from "@/types/cruxLedger";
import {
  AI_MAP_TOPIC_IDS,
  DEFAULT_SINCE_DAYS,
  arrivedSince,
  isIsoDay,
  latestMovement,
  ledgerAsOf,
  ledgerChangelog,
  movementSummary,
  noticedDay,
  poolTopCruxes,
  resolveSince,
  shiftDay,
  type PoolMap,
} from "./ledgerPool";
import { argumentTopicIds, loadArgumentTopic } from "./draftTopics";

let seq = 0;
function entry(
  topicId: string,
  claimId: string,
  date: string,
  overrides: Partial<CruxLedgerEntry> = {},
): CruxLedgerEntry {
  seq += 1;
  return {
    id: `${topicId}:${claimId}:${date}:${seq}`,
    topicId,
    claimId,
    date,
    noticedAt: "2026-09-22",
    status: "open",
    evidenceNodeIds: [],
    note: "A dated note.",
    author: { kind: "editorial", curator: "Test editors", basis: "Test basis." },
    createdAt: "2026-09-22T00:00:00Z",
    ...overrides,
  };
}

function map(topicId: string, claimIds: string[], ledger: CruxLedgerEntry[] = []): PoolMap {
  return { topicId, cruxes: claimIds.map((claimId) => ({ claimId })), ledger };
}

const unreviewed = {
  kind: "judgment" as const,
  modelId: "model-x",
  promptVersion: "p1",
  contentHash: "abc",
  validator: "pass" as const,
};

// ---------------------------------------------------------------------------

describe("poolTopCruxes: interleave by per-map rank", () => {
  it("takes every map's #1, then every #2, in map order", () => {
    const pooled = poolTopCruxes([map("a", ["a1", "a2", "a3"]), map("b", ["b1", "b2", "b3"])]);
    expect(pooled.map((c) => c.claimId)).toEqual(["a1", "b1", "a2", "b2", "a3", "b3"]);
    expect(pooled.map((c) => c.mapRank)).toEqual([1, 1, 2, 2, 3, 3]);
  });

  it("caps at 8 by default and at any given limit", () => {
    const five = ["1", "2", "3", "4", "5"];
    const maps = [map("a", five.map((n) => `a${n}`)), map("b", five.map((n) => `b${n}`))];
    const pooled = poolTopCruxes(maps);
    expect(pooled).toHaveLength(8);
    expect(pooled.at(-1)).toMatchObject({ claimId: "b4", mapRank: 4 });
    expect(poolTopCruxes(maps, 3).map((c) => c.claimId)).toEqual(["a1", "b1", "a2"]);
  });

  it("keeps filling from the deeper map when the other runs out", () => {
    const pooled = poolTopCruxes([map("a", ["a1"]), map("b", ["b1", "b2", "b3"])]);
    expect(pooled.map((c) => c.claimId)).toEqual(["a1", "b1", "b2", "b3"]);
  });

  it("never sorts by score: engine order inside a map is the rank", () => {
    // Engine output order is authoritative (e.g. an unresolvable pin at #1
    // above a higher score). The pool only sees ids, so it cannot reorder.
    const pooled = poolTopCruxes([
      { topicId: "a", cruxes: [{ claimId: "pinned", score: 0.1 }, { claimId: "high", score: 0.9 }] as never, ledger: [] },
    ]);
    expect(pooled.map((c) => c.claimId)).toEqual(["pinned", "high"]);
  });

  it("dedupes a repeated claim within a map, and reports distinct counts", () => {
    const pooled = poolTopCruxes([map("a", ["x", "x", "y"])]);
    expect(pooled.map((c) => c.claimId)).toEqual(["x", "y"]);
    expect(pooled.map((c) => c.mapCruxCount)).toEqual([2, 2]);
  });

  it("never dedupes across maps: the same id in two maps is two claims", () => {
    const pooled = poolTopCruxes([map("a", ["shared"]), map("b", ["shared"])]);
    expect(pooled).toEqual([
      { topicId: "a", claimId: "shared", mapRank: 1, mapCruxCount: 1 },
      { topicId: "b", claimId: "shared", mapRank: 1, mapCruxCount: 1 },
    ]);
  });

  it("returns nothing for no maps or empty maps", () => {
    expect(poolTopCruxes([])).toEqual([]);
    expect(poolTopCruxes([map("a", [])])).toEqual([]);
  });
});

// ---------------------------------------------------------------------------

describe("dates", () => {
  it("validates real calendar days only", () => {
    expect(isIsoDay("2026-06-24")).toBe(true);
    expect(isIsoDay("2026-02-30")).toBe(false);
    expect(isIsoDay("2026-6-24")).toBe(false);
    expect(isIsoDay("yesterday")).toBe(false);
  });

  it("shifts across month and year boundaries in UTC", () => {
    expect(shiftDay("2026-09-22", -90)).toBe("2026-06-24");
    expect(shiftDay("2026-01-01", -1)).toBe("2025-12-31");
    expect(shiftDay("2024-02-28", 1)).toBe("2024-02-29");
  });

  it("noticedDay prefers noticedAt and falls back to the write day", () => {
    expect(noticedDay(entry("a", "c", "2025-01-01", { noticedAt: "2026-03-03" }))).toBe("2026-03-03");
    expect(
      noticedDay(entry("a", "c", "2025-01-01", { noticedAt: undefined, createdAt: "2026-04-04T10:00:00Z" })),
    ).toBe("2026-04-04");
  });

  it("as-of is the latest recorded day across public entries only", () => {
    const maps = [
      map("a", [], [entry("a", "c", "2025-01-01", { noticedAt: "2026-05-01", createdAt: "2026-05-01" })]),
      map("b", [], [
        entry("b", "c", "2025-01-01", { noticedAt: "2026-06-01", createdAt: "2026-06-01" }),
        entry("b", "d", "2025-01-01", {
          noticedAt: "2026-09-01",
          createdAt: "2026-09-01",
          author: unreviewed,
        }),
      ]),
    ];
    expect(ledgerAsOf(maps)).toBe("2026-06-01");
    expect(ledgerAsOf([map("a", [])])).toBeNull();
  });

  it("resolveSince defaults to 90 days before as-of and rejects junk or future days", () => {
    expect(DEFAULT_SINCE_DAYS).toBe(90);
    expect(resolveSince(undefined, "2026-09-22")).toBe("2026-06-24");
    expect(resolveSince("2026-01-01", "2026-09-22")).toBe("2026-01-01");
    expect(resolveSince("2026-09-22", "2026-09-22")).toBe("2026-09-22");
    expect(resolveSince("2026-09-23", "2026-09-22")).toBe("2026-06-24");
    expect(resolveSince("2026-02-30", "2026-09-22")).toBe("2026-06-24");
    expect(resolveSince("<script>", "2026-09-22")).toBe("2026-06-24");
  });

  it("resolveSince clamps a day before the floor to the floor, never the default", () => {
    expect(resolveSince("0001-01-01", "2026-09-22", "2023-10-27")).toBe("2023-10-27");
    expect(resolveSince("2023-10-26", "2026-09-22", "2023-10-27")).toBe("2023-10-27");
    expect(resolveSince("2023-10-27", "2026-09-22", "2023-10-27")).toBe("2023-10-27");
    expect(resolveSince("2024-01-01", "2026-09-22", "2023-10-27")).toBe("2024-01-01");
    expect(resolveSince(undefined, "2026-09-22", "2026-08-01")).toBe("2026-06-24");
  });
});

// ---------------------------------------------------------------------------

describe("arrivedSince: window boundaries and grouping", () => {
  const since = "2026-06-24";
  const until = "2026-09-22";

  it("includes both window edges and excludes the day either side", () => {
    const maps = [
      map("a", [], [
        entry("a", "before", "2026-06-23"),
        entry("a", "first-day", "2026-06-24"),
        entry("a", "last-day", "2026-09-22", { createdAt: "2026-09-22T00:00:00Z" }),
      ]),
    ];
    expect(arrivedSince(maps, since, until).map((g) => g.claimId)).toEqual(["last-day", "first-day"]);
    expect(arrivedSince(maps, since, "2026-09-21").map((g) => g.claimId)).toEqual(["first-day"]);
  });

  it("filters on the source date, not on when the map noticed it", () => {
    const maps = [
      map("a", [], [
        // A 2025 paper noticed inside the window has not "arrived" in it.
        entry("a", "old-source", "2025-04-01", { noticedAt: "2026-09-01" }),
      ]),
    ];
    expect(arrivedSince(maps, since, until)).toEqual([]);
  });

  it("groups by claim within a map, newest entry first, groups newest first", () => {
    const maps = [
      map("a", [], [
        entry("a", "c1", "2026-07-01"),
        entry("a", "c1", "2026-09-01"),
        entry("a", "c2", "2026-08-01"),
      ]),
      map("b", [], [entry("b", "c1", "2026-08-15")]),
    ];
    const groups = arrivedSince(maps, since, until);
    expect(groups.map((g) => `${g.topicId}/${g.claimId}`)).toEqual(["a/c1", "b/c1", "a/c2"]);
    expect(groups[0].entries.map((e) => e.date)).toEqual(["2026-09-01", "2026-07-01"]);
  });

  it("breaks date ties by map order, then claim id", () => {
    const maps = [
      map("b", [], [entry("b", "z", "2026-08-01")]),
      map("a", [], [entry("a", "y", "2026-08-01"), entry("a", "x", "2026-08-01")]),
    ];
    expect(arrivedSince(maps, since, until).map((g) => `${g.topicId}/${g.claimId}`)).toEqual([
      "b/z",
      "a/x",
      "a/y",
    ]);
  });

  it("leaves out unreviewed judgment entries and superseded entries", () => {
    const correction = entry("a", "c1", "2026-08-02", { note: "Corrected." });
    const maps = [
      map("a", [], [
        entry("a", "c1", "2026-08-01", { supersededBy: correction.id }),
        correction,
        entry("a", "c2", "2026-08-03", { author: unreviewed }),
        entry("a", "c3", "2026-08-04", { author: { ...unreviewed, reviewedBy: "Editor" } }),
      ]),
    ];
    const groups = arrivedSince(maps, since, until);
    expect(groups.map((g) => g.claimId)).toEqual(["c3", "c1"]);
    expect(groups[1].entries.map((e) => e.note)).toEqual(["Corrected."]);
  });

  it("keeps an entry whose only correction is unreviewed", () => {
    const proposal = entry("a", "c1", "2026-08-02", { author: unreviewed });
    const maps = [map("a", [], [entry("a", "c1", "2026-08-01", { supersededBy: proposal.id }), proposal])];
    expect(arrivedSince(maps, since, until)[0].entries.map((e) => e.date)).toEqual(["2026-08-01"]);
  });
});

// ---------------------------------------------------------------------------

describe("latestMovement", () => {
  it("is the latest in-force public entry for the claim", () => {
    const m = map("a", [], [
      entry("a", "c", "2026-01-01", { status: "open" }),
      entry("a", "c", "2026-03-01", { status: "narrowed", resolutionKind: "existing-evidence" }),
      entry("a", "c", "2026-05-01", { author: unreviewed }),
      entry("a", "other", "2026-06-01"),
    ]);
    expect(latestMovement(m, "c")?.date).toBe("2026-03-01");
    expect(latestMovement(m, "missing")).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------

describe("movementSummary", () => {
  it("counts claims (not entries) by their newest in-window status and lists the still ones", () => {
    const maps = [
      map(
        "a",
        ["c1", "c2", "c3"],
        [
          entry("a", "c1", "2026-07-01", { status: "open" }),
          entry("a", "c1", "2026-08-01", { status: "narrowed", resolutionKind: "existing-evidence" }),
          entry("a", "c2", "2025-01-01"),
          // tracked because it has a public entry, though not an emitted crux
          entry("a", "c9", "2026-08-05", { status: "open" }),
        ],
      ),
      map(
        "b",
        ["d1"],
        [entry("b", "d1", "2026-07-10", { status: "unresolvable", resolutionKind: "value-difference" })],
      ),
    ];
    const summary = movementSummary(maps, "2026-06-24", "2026-09-22");
    expect(summary.tracked).toBe(5);
    expect(summary.moved).toEqual({ open: 1, narrowed: 1, resolved: 0, unresolvable: 1 });
    expect(summary.still).toEqual([
      { topicId: "a", claimId: "c2", lastDate: "2025-01-01" },
      { topicId: "a", claimId: "c3", lastDate: null },
    ]);
  });

  it("ignores unreviewed proposals, so a claim with only a proposal is still", () => {
    const maps = [map("a", ["c1"], [entry("a", "c1", "2026-08-01", { author: unreviewed })])];
    const summary = movementSummary(maps, "2026-06-24", "2026-09-22");
    expect(summary.tracked).toBe(1);
    expect(summary.moved).toEqual({ open: 0, narrowed: 0, resolved: 0, unresolvable: 0 });
    expect(summary.still).toEqual([{ topicId: "a", claimId: "c1", lastDate: null }]);
  });
});

// ---------------------------------------------------------------------------

describe("ledgerChangelog", () => {
  it("orders newest-noticed first, then write time, then source date", () => {
    const maps = [
      map("a", [], [
        entry("a", "c", "2026-01-01", { noticedAt: "2026-02-01", createdAt: "2026-02-01" }),
        entry("a", "c", "2025-05-01", { noticedAt: "2026-09-01", createdAt: "2026-09-01T08:00:00Z" }),
        entry("a", "c", "2026-08-01", { noticedAt: "2026-09-01", createdAt: "2026-09-01T09:00:00Z" }),
      ]),
      map("b", [], [
        entry("b", "c", "2026-07-01", { noticedAt: "2026-09-01", createdAt: "2026-09-01T09:00:00Z" }),
      ]),
    ];
    const log = ledgerChangelog(maps);
    expect(log.map((i) => `${i.topicId}:${i.entry.date}`)).toEqual([
      "a:2026-08-01",
      "b:2026-07-01",
      "a:2025-05-01",
      "a:2026-01-01",
    ]);
  });

  it("falls back to the write day when noticedAt is absent", () => {
    const maps = [
      map("a", [], [
        entry("a", "c", "2026-01-01", { noticedAt: undefined, createdAt: "2026-08-01" }),
        entry("a", "c", "2026-01-02", { noticedAt: "2026-07-01", createdAt: "2026-07-01" }),
      ]),
    ];
    expect(ledgerChangelog(maps).map((i) => i.entry.date)).toEqual(["2026-01-01", "2026-01-02"]);
  });

  it("keeps superseded entries and names their public correction", () => {
    const correction = entry("a", "c", "2026-08-02", { note: "Corrected." });
    const original = entry("a", "c", "2026-08-01", { supersededBy: correction.id });
    const log = ledgerChangelog([map("a", [], [original, correction])]);
    expect(log).toHaveLength(2);
    const struck = log.find((i) => i.entry.id === original.id);
    expect(struck?.correctedBy?.id).toBe(correction.id);
    expect(log.find((i) => i.entry.id === correction.id)?.correctedBy).toBeUndefined();
  });

  it("does not strike an entry whose correction is an unreviewed proposal", () => {
    const proposal = entry("a", "c", "2026-08-02", { author: unreviewed });
    const original = entry("a", "c", "2026-08-01", { supersededBy: proposal.id });
    const log = ledgerChangelog([map("a", [], [original, proposal])]);
    expect(log).toHaveLength(1);
    expect(log[0].correctedBy).toBeUndefined();
  });

  it("excludes unreviewed judgment entries and includes reviewed ones", () => {
    const log = ledgerChangelog([
      map("a", [], [
        entry("a", "c", "2026-08-01", { author: unreviewed }),
        entry("a", "c", "2026-08-02", { author: { ...unreviewed, reviewedBy: "Editor" } }),
      ]),
    ]);
    expect(log.map((i) => i.entry.date)).toEqual(["2026-08-02"]);
  });
});

// ---------------------------------------------------------------------------

describe("real AI maps", () => {
  const maps: PoolMap[] = AI_MAP_TOPIC_IDS.map((id) => {
    const topic = loadArgumentTopic(id);
    if (!topic) throw new Error(`AI map ${id} is not registered`);
    return { topicId: id, cruxes: topic.cruxes, ledger: topic.ledger };
  });

  it("names only registered maps, and not the unregistered Covid ledger", () => {
    for (const id of AI_MAP_TOPIC_IDS) expect(argumentTopicIds).toContain(id);
    expect(AI_MAP_TOPIC_IDS).not.toContain("covid-what-ended");
  });

  it("pools 5–8 cruxes, alternating maps", () => {
    const pooled = poolTopCruxes(maps);
    expect(pooled.length).toBeGreaterThanOrEqual(5);
    expect(pooled.length).toBeLessThanOrEqual(8);
    expect(pooled[0].topicId).toBe(AI_MAP_TOPIC_IDS[0]);
    expect(pooled[1].topicId).toBe(AI_MAP_TOPIC_IDS[1]);
  });

  it("has an as-of date, something arrived in the default window, and a descending changelog", () => {
    const asOf = ledgerAsOf(maps);
    expect(asOf).not.toBeNull();
    const since = resolveSince(undefined, asOf!);
    expect(arrivedSince(maps, since, asOf!).length).toBeGreaterThan(0);
    const log = ledgerChangelog(maps);
    for (let i = 1; i < log.length; i += 1) {
      expect(noticedDay(log[i - 1].entry) >= noticedDay(log[i].entry)).toBe(true);
    }
  });
});

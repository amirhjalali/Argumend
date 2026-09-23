import { describe, expect, it } from "vitest";
import {
  GAP_MIN_N,
  aggregateGapByWeek,
  isoWeekOf,
  isoWeeksBetween,
  quartiles,
  type GapAggregateRow,
} from "./aggregate";

function row(overrides: Partial<GapAggregateRow> = {}): GapAggregateRow {
  return {
    lane: "map-reply",
    topicId: "rent-control-effectiveness",
    propositionCount: 4,
    talkingPastCount: 1,
    definitionalCount: 1,
    undisputedCount: 0,
    contestedCount: 2,
    unmatchedCount: 1,
    promptVersion: "map-reply-v1.0.0",
    observedOn: "2026-09-22",
    ...overrides,
  };
}

/** n rows whose gaps are 0/4, 1/4, 2/4, ... cycling. */
function rows(n: number, overrides: Partial<GapAggregateRow> = {}): GapAggregateRow[] {
  return Array.from({ length: n }, (_, i) => {
    const gap = i % 5; // 0..4 of 4 propositions
    return row({ talkingPastCount: gap, definitionalCount: 0, contestedCount: 4 - gap, ...overrides });
  });
}

describe("isoWeekOf", () => {
  it("follows ISO-8601, including year boundaries", () => {
    expect(isoWeekOf("2026-09-22")).toBe("2026-W39");
    expect(isoWeekOf("2026-01-01")).toBe("2026-W01");
    expect(isoWeekOf("2027-01-01")).toBe("2026-W53");
    expect(isoWeekOf("2024-12-30")).toBe("2025-W01");
  });

  it("lists every week in a range", () => {
    expect(isoWeeksBetween("2026-09-14", "2026-10-04")).toEqual(["2026-W38", "2026-W39", "2026-W40"]);
  });
});

describe("quartiles", () => {
  it("uses linear interpolation", () => {
    expect(quartiles([1, 2, 3, 4])).toEqual({ median: 2.5, q1: 1.75, q3: 3.25, iqr: 1.5 });
    expect(quartiles([])).toBeNull();
  });
});

describe("aggregateGapByWeek", () => {
  it("returns nothing for no rows", () => {
    expect(aggregateGapByWeek([])).toEqual([]);
  });

  it("reports median, IQR and n once a week clears the floor", () => {
    const [cell] = aggregateGapByWeek(rows(GAP_MIN_N));
    expect(cell.isoWeek).toBe("2026-W39");
    expect(cell.n).toBe(GAP_MIN_N);
    expect(cell.status).toBe("ok");
    expect(cell.gap).toEqual({ median: 0.5, q1: 0.25, q3: 0.75, iqr: 0.5 });
    expect(cell.contestedShare?.median).toBe(0.5);
    expect(cell.medianUnmatched).toBe(1);
  });

  it("suppresses the estimate below the floor but still reports n", () => {
    const [cell] = aggregateGapByWeek(rows(GAP_MIN_N - 1));
    expect(cell.status).toBe("insufficient");
    expect(cell.n).toBe(GAP_MIN_N - 1);
    expect(cell.gap).toBeNull();
    expect(cell.contestedShare).toBeNull();
  });

  it("does not count replies with nothing to divide by toward n", () => {
    const [cell] = aggregateGapByWeek([
      ...rows(GAP_MIN_N - 1),
      row({ propositionCount: 0, talkingPastCount: 0, definitionalCount: 0, contestedCount: 0, unmatchedCount: 6 }),
    ]);
    expect(cell.n).toBe(GAP_MIN_N - 1);
    expect(cell.emptyCount).toBe(1);
    expect(cell.status).toBe("insufficient");
  });

  it("uses the median, so one outlier cannot own the week", () => {
    const outlier = row({ propositionCount: 40, talkingPastCount: 40, definitionalCount: 0, contestedCount: 0 });
    const [cell] = aggregateGapByWeek([...rows(GAP_MIN_N, { talkingPastCount: 0, contestedCount: 4 }), outlier]);
    expect(cell.gap?.median).toBe(0);
  });

  it("separates lanes and prompt versions", () => {
    const cells = aggregateGapByWeek([
      ...rows(3),
      ...rows(2, { lane: "analyze-v2", topicId: null, promptVersion: "1.2.0" }),
      ...rows(1, { promptVersion: "map-reply-v1.1.0" }),
    ]);
    expect(cells.map((c) => [c.lane, c.promptVersion, c.n])).toEqual([
      ["analyze-v2", "1.2.0", 2],
      ["map-reply", "map-reply-v1.0.0", 3],
      ["map-reply", "map-reply-v1.1.0", 1],
    ]);
  });

  it("fills empty weeks in a range with n = 0", () => {
    const cells = aggregateGapByWeek(
      [...rows(2, { observedOn: "2026-09-15" }), ...rows(2, { observedOn: "2026-09-29" })],
      { range: { fromDay: "2026-09-14", toDay: "2026-10-04" } },
    );
    expect(cells.map((c) => [c.isoWeek, c.n, c.status])).toEqual([
      ["2026-W38", 2, "insufficient"],
      ["2026-W39", 0, "insufficient"],
      ["2026-W40", 2, "insufficient"],
    ]);
    expect(cells[1].medianUnmatched).toBeNull();
  });

  it("groups by topic on request", () => {
    const cells = aggregateGapByWeek([...rows(2), ...rows(1, { topicId: "nuclear-energy-safety" })], { byTopic: true });
    expect(cells.map((c) => [c.topicId, c.n])).toEqual([
      ["nuclear-energy-safety", 1],
      ["rent-control-effectiveness", 2],
    ]);
  });

  it("honours a custom floor", () => {
    expect(aggregateGapByWeek(rows(3), { minN: 3 })[0].status).toBe("ok");
  });
});

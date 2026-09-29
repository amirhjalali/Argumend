/**
 * Weekly aggregation of gap observations (spec §3.3). Pure: rows in, table out.
 *
 * Medians and IQR, never means — one long paste would otherwise own the week.
 * A cell with fewer than `GAP_MIN_N` measurable replies reports n and nothing
 * else ("insufficient"): an estimate from a handful of replies is noise that
 * reads like a number. Each prompt version is its own segment, because the
 * label distribution is a model artifact as much as a reader artifact.
 */
import { contestedShareOf, gapOf, type GapLane, type GapObservation } from "./record";

/** §3.3: a topic-week with n < 20 renders as "insufficient", not estimated. */
export const GAP_MIN_N = 20;

export type GapAggregateRow = Pick<
  GapObservation,
  | "lane"
  | "topicId"
  | "propositionCount"
  | "talkingPastCount"
  | "definitionalCount"
  | "undisputedCount"
  | "contestedCount"
  | "unmatchedCount"
  | "promptVersion"
  | "observedOn"
>;

export interface Quartiles {
  median: number;
  q1: number;
  q3: number;
  iqr: number;
}

export interface GapWeekCell {
  isoWeek: string;
  lane: GapLane;
  promptVersion: string;
  /** Present only when grouping by topic. */
  topicId?: string | null;
  /** Replies with at least one classified proposition. */
  n: number;
  /** Replies logged but with nothing to divide by (every proposition unmatched). */
  emptyCount: number;
  /** Median unmatched count: a rising value is a map-coverage bug (§3.4). */
  medianUnmatched: number | null;
  status: "ok" | "insufficient";
  gap: Quartiles | null;
  /** Goodhart guardrail (§3.4), suppressed under the same rule as the gap. */
  contestedShare: Quartiles | null;
}

/** Linear-interpolated quantile on sorted data (type 7, the R/NumPy default). */
export function quantile(sorted: number[], q: number): number {
  if (sorted.length === 0) throw new Error("quantile of empty set");
  const pos = (sorted.length - 1) * q;
  const lo = Math.floor(pos);
  const hi = Math.ceil(pos);
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (pos - lo);
}

export function quartiles(values: number[]): Quartiles | null {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const q1 = quantile(sorted, 0.25);
  const q3 = quantile(sorted, 0.75);
  return { median: quantile(sorted, 0.5), q1, q3, iqr: q3 - q1 };
}

/** ISO-8601 week of a YYYY-MM-DD day, e.g. "2026-W39". */
export function isoWeekOf(day: string): string {
  const date = new Date(`${day}T00:00:00Z`);
  const weekday = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - weekday);
  const year = date.getUTCFullYear();
  const yearStart = Date.UTC(year, 0, 1);
  const week = Math.ceil(((date.getTime() - yearStart) / 86_400_000 + 1) / 7);
  return `${year}-W${String(week).padStart(2, "0")}`;
}

/** Every ISO week touched by [fromDay, toDay], so an empty week still gets a row. */
export function isoWeeksBetween(fromDay: string, toDay: string): string[] {
  const weeks: string[] = [];
  const cursor = new Date(`${fromDay}T00:00:00Z`);
  const end = new Date(`${toDay}T00:00:00Z`);
  while (cursor <= end) {
    const week = isoWeekOf(cursor.toISOString().slice(0, 10));
    if (weeks[weeks.length - 1] !== week) weeks.push(week);
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return weeks;
}

export interface AggregateOptions {
  minN?: number;
  byTopic?: boolean;
  /** Fill every week in the range for every lane/prompt segment seen, n = 0 when silent. */
  range?: { fromDay: string; toDay: string };
}

export function aggregateGapByWeek(rows: GapAggregateRow[], options: AggregateOptions = {}): GapWeekCell[] {
  const minN = options.minN ?? GAP_MIN_N;
  const groups = new Map<string, { key: Omit<GapWeekCell, "n" | "emptyCount" | "medianUnmatched" | "status" | "gap" | "contestedShare">; rows: GapAggregateRow[] }>();

  const keyOf = (isoWeek: string, lane: GapLane, promptVersion: string, topicId: string | null | undefined) =>
    JSON.stringify([isoWeek, lane, promptVersion, options.byTopic ? topicId ?? null : undefined]);

  for (const row of rows) {
    const isoWeek = isoWeekOf(row.observedOn);
    const key = keyOf(isoWeek, row.lane, row.promptVersion, row.topicId);
    let group = groups.get(key);
    if (!group) {
      group = {
        key: {
          isoWeek,
          lane: row.lane,
          promptVersion: row.promptVersion,
          ...(options.byTopic ? { topicId: row.topicId ?? null } : {}),
        },
        rows: [],
      };
      groups.set(key, group);
    }
    group.rows.push(row);
  }

  if (options.range) {
    const seen = [...groups.values()].map((g) => g.key);
    for (const week of isoWeeksBetween(options.range.fromDay, options.range.toDay)) {
      for (const segment of seen) {
        const key = keyOf(week, segment.lane, segment.promptVersion, segment.topicId);
        if (!groups.has(key)) groups.set(key, { key: { ...segment, isoWeek: week }, rows: [] });
      }
    }
  }

  const cells: GapWeekCell[] = [];
  for (const { key, rows: groupRows } of groups.values()) {
    const gaps: number[] = [];
    const contested: number[] = [];
    let emptyCount = 0;
    for (const row of groupRows) {
      const gap = gapOf(row);
      const share = contestedShareOf(row);
      if (gap === null || share === null) {
        emptyCount += 1;
        continue;
      }
      gaps.push(gap);
      contested.push(share);
    }
    const n = gaps.length;
    const sufficient = n >= minN;
    const unmatched = quartiles(groupRows.map((row) => row.unmatchedCount));
    cells.push({
      ...key,
      n,
      emptyCount,
      medianUnmatched: unmatched ? unmatched.median : null,
      status: sufficient ? "ok" : "insufficient",
      gap: sufficient ? quartiles(gaps) : null,
      contestedShare: sufficient ? quartiles(contested) : null,
    });
  }

  return cells.sort(
    (a, b) =>
      a.isoWeek.localeCompare(b.isoWeek) ||
      a.lane.localeCompare(b.lane) ||
      a.promptVersion.localeCompare(b.promptVersion) ||
      String(a.topicId ?? "").localeCompare(String(b.topicId ?? "")),
  );
}

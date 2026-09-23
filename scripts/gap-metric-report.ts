/**
 * Internal-only weekly report for the north-star gap metric (docs/GAP_METRIC.md).
 * Prints median gap, IQR and n per ISO week, lane and prompt version. There is
 * no public display of this number (spec §4); this script is the dashboard.
 *
 *   DATABASE_URL=postgres://... npx tsx scripts/gap-metric-report.ts [--weeks 12] [--by-topic]
 *
 * Reads `.env.local` like drizzle.config.ts. Read-only: it never writes.
 */
import { config } from "dotenv";
import { gte } from "drizzle-orm";
import { aggregateGapByWeek, GAP_MIN_N, type GapWeekCell } from "../lib/gapMetric/aggregate";

config({ path: ".env.local" });

function argValue(name: string): string | undefined {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function fmt(value: number | undefined): string {
  return value === undefined ? "" : value.toFixed(2);
}

export function formatGapTable(cells: GapWeekCell[], byTopic: boolean): string {
  const header = ["week", "lane", "prompt", ...(byTopic ? ["topic"] : []), "n", "empty", "gap median", "gap IQR", "contested median", "unmatched median"];
  const lines = cells.map((cell) => [
    cell.isoWeek,
    cell.lane,
    cell.promptVersion,
    ...(byTopic ? [cell.topicId ?? "-"] : []),
    String(cell.n),
    String(cell.emptyCount),
    cell.gap ? fmt(cell.gap.median) : "insufficient",
    cell.gap ? `${fmt(cell.gap.q1)}–${fmt(cell.gap.q3)}` : "",
    cell.contestedShare ? fmt(cell.contestedShare.median) : "",
    cell.medianUnmatched === null ? "" : fmt(cell.medianUnmatched),
  ]);
  const widths = header.map((h, i) => Math.max(h.length, ...lines.map((l) => l[i].length)));
  const render = (row: string[]) => row.map((c, i) => c.padEnd(widths[i])).join("  ");
  return [render(header), render(widths.map((w) => "-".repeat(w))), ...lines.map(render)].join("\n");
}

async function main() {
  if (!process.env.DATABASE_URL?.trim()) {
    console.log(
      [
        "gap-metric-report: DATABASE_URL is not set, so there is nothing to read.",
        "",
        "To produce the weekly table:",
        "  1. Point DATABASE_URL at the production (or a restored) Postgres, in .env.local or the shell.",
        "  2. Make sure migration drizzle/0003_gap_observations.sql has been applied (bun run db:migrate).",
        "  3. Rows only exist where the server ran with ENABLE_GAP_METRIC_LOGGING=true.",
        "  4. Run: npx tsx scripts/gap-metric-report.ts [--weeks 12] [--by-topic]",
        "",
        `Cells with n < ${GAP_MIN_N} print "insufficient" instead of a median (spec §3.3).`,
      ].join("\n"),
    );
    return;
  }

  const weeks = Number(argValue("--weeks") ?? 12);
  const byTopic = process.argv.includes("--by-topic");
  const today = new Date();
  const from = new Date(today.getTime() - weeks * 7 * 86_400_000);
  const fromDay = from.toISOString().slice(0, 10);
  const toDay = today.toISOString().slice(0, 10);

  const { getDb } = await import("../lib/db");
  const { gapObservations } = await import("../lib/db/schema");
  const db = getDb();
  const rows = await db
    .select({
      lane: gapObservations.lane,
      topicId: gapObservations.topicId,
      propositionCount: gapObservations.propositionCount,
      talkingPastCount: gapObservations.talkingPastCount,
      definitionalCount: gapObservations.definitionalCount,
      undisputedCount: gapObservations.undisputedCount,
      contestedCount: gapObservations.contestedCount,
      unmatchedCount: gapObservations.unmatchedCount,
      promptVersion: gapObservations.promptVersion,
      observedOn: gapObservations.observedOn,
    })
    .from(gapObservations)
    .where(gte(gapObservations.observedOn, fromDay));

  const cells = aggregateGapByWeek(rows, { byTopic, range: { fromDay, toDay } });
  console.log(`Gap metric, ${fromDay} to ${toDay} — internal only, our readers' gap, not public discourse.`);
  console.log(`${rows.length} observations. Floor: n >= ${GAP_MIN_N}.\n`);
  console.log(cells.length ? formatGapTable(cells, byTopic) : "No observations in range.");
  process.exit(0);
}

if (process.argv[1]?.endsWith("gap-metric-report.ts")) {
  main().catch((error) => {
    console.error("gap-metric-report failed:", error instanceof Error ? error.message : error);
    process.exit(1);
  });
}

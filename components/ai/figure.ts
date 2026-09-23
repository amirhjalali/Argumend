/**
 * Layout for the "when did it move" figure: one column per month from the
 * first dated entry to the as-of month, entries stacked in their source
 * month. Long empty stretches outside the window collapse into one marked
 * break so a single early source cannot squeeze the recent months flat.
 * Pure, so the page test can pin it.
 */
import type { CruxLedgerStatus } from "@/types/cruxLedger";

export interface FigureEntry {
  id: string;
  date: string;
  status: CruxLedgerStatus;
}

export type FigureColumn =
  | {
      kind: "month";
      /** YYYY-MM */
      month: string;
      entries: Array<FigureEntry & { inWindow: boolean }>;
      /** Any day of the month is inside [since, asOf]. */
      inWindow: boolean;
    }
  | { kind: "gap"; from: string; to: string; months: number };

function monthOf(day: string): string {
  return day.slice(0, 7);
}

function nextMonth(month: string): string {
  const [year, m] = month.split("-").map(Number);
  return m === 12 ? `${year + 1}-01` : `${year}-${String(m + 1).padStart(2, "0")}`;
}

/** Last calendar day of a YYYY-MM month. */
function monthEnd(month: string): string {
  const [year, m] = month.split("-").map(Number);
  return new Date(Date.UTC(year, m, 0)).toISOString().slice(0, 10);
}

export function figureColumns(
  entries: readonly FigureEntry[],
  since: string,
  asOf: string,
  minGap = 4,
): FigureColumn[] {
  if (entries.length === 0) return [];
  const sorted = [...entries].sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
  const first = monthOf(sorted[0].date);
  const last = monthOf(asOf) > monthOf(sorted.at(-1)!.date) ? monthOf(asOf) : monthOf(sorted.at(-1)!.date);

  const months: Extract<FigureColumn, { kind: "month" }>[] = [];
  for (let month = first; month <= last; month = nextMonth(month)) {
    const inMonth = sorted.filter((entry) => monthOf(entry.date) === month);
    months.push({
      kind: "month",
      month,
      entries: inMonth.map((entry) => ({
        ...entry,
        inWindow: entry.date >= since && entry.date <= asOf,
      })),
      inWindow: monthEnd(month) >= since && `${month}-01` <= asOf,
    });
  }

  const columns: FigureColumn[] = [];
  let run: typeof months = [];
  const flush = () => {
    if (run.length >= minGap) {
      columns.push({ kind: "gap", from: run[0].month, to: run.at(-1)!.month, months: run.length });
    } else {
      columns.push(...run);
    }
    run = [];
  };
  for (const column of months) {
    if (column.entries.length === 0 && !column.inWindow) {
      run.push(column);
    } else {
      flush();
      columns.push(column);
    }
  }
  flush();
  return columns;
}

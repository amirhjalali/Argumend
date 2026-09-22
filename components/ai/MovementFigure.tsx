/**
 * When the AI argument moved: every public, in-force ledger entry as a mark
 * in the month of its source, stacked. The months inside the reader's window
 * sit on a faint band; marks outside it are drawn quieter. Server-rendered
 * HTML (no chart library, no client JS), so the marks keep their size at
 * any width instead of shrinking with a scaled SVG.
 */
import { LedgerMark } from "./LedgerMark";
import { figureColumns, type FigureEntry } from "./figure";
import { STATUS_WORD, formatDay } from "./format";

const MONTH_INITIAL = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

export function MovementFigure({
  entries,
  since,
  asOf,
}: {
  entries: FigureEntry[];
  since: string;
  asOf: string;
}) {
  const columns = figureColumns(entries, since, asOf);
  if (columns.length === 0) return null;
  const inWindowCount = entries.filter((e) => e.date >= since && e.date <= asOf).length;
  const statuses = [...new Set(entries.map((e) => e.status))];

  return (
    <figure className="mt-10" aria-labelledby="movement-figure-caption">
      <div
        className="flex items-end"
        role="img"
        aria-label={`${entries.length} dated entries by the month of their source; ${inWindowCount} fall between ${formatDay(since)} and ${formatDay(asOf)}.`}
      >
        {columns.map((column, index) => {
          if (column.kind === "gap") {
            return (
              <div
                key={`gap-${column.from}`}
                className="flex w-5 shrink-0 flex-col items-center sm:w-7"
                title={`${column.months} months with no dated entries`}
              >
                <span className="relative mb-[-1px] block h-3 w-full">
                  <span className="absolute left-1/2 top-0 h-3 -translate-x-[3px] rotate-[20deg] border-l border-stone-400 dark:border-stone-500" />
                  <span className="absolute left-1/2 top-0 h-3 translate-x-[2px] rotate-[20deg] border-l border-stone-400 dark:border-stone-500" />
                </span>
                <span className="h-5" />
              </div>
            );
          }
          const [year, month] = column.month.split("-");
          const monthIndex = Number(month) - 1;
          const previous = columns[index - 1];
          const showYear = monthIndex === 0 || previous === undefined || previous.kind === "gap";
          return (
            <div key={column.month} className="flex min-w-0 flex-1 flex-col items-center">
              <div
                className={`flex w-full flex-col-reverse items-center gap-[3px] pb-1.5 pt-2 ${
                  column.inWindow ? "bg-[#3a6965]/[0.11] dark:bg-[#8fc0bb]/[0.13]" : ""
                }`}
              >
                {column.entries.map((entry) => (
                  <LedgerMark
                    key={entry.id}
                    status={entry.status}
                    size={10}
                    className={entry.inWindow ? "" : "opacity-60"}
                  />
                ))}
              </div>
              <div className="h-px w-full bg-stone-300 dark:bg-stone-600" />
              <span className="mt-1 h-5 text-center text-[10px] leading-none text-muted dark:text-stone-400">
                <span aria-hidden="true" className="block tabular-nums">
                  {MONTH_INITIAL[monthIndex]}
                </span>
                {showYear && (
                  <span aria-hidden="true" className="mt-0.5 block whitespace-nowrap tabular-nums">
                    {year}
                  </span>
                )}
              </span>
            </div>
          );
        })}
      </div>
      <figcaption
        id="movement-figure-caption"
        className="mt-6 max-w-[34rem] text-[13px] leading-relaxed text-muted dark:text-stone-400"
      >
        Each mark is one dated entry in the maps&rsquo; ledgers, placed in the month of its
        source. The shaded months are the window below.{" "}
        <span className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
          {statuses.map((status) => (
            <span key={status} className="inline-flex items-center gap-1.5">
              <LedgerMark status={status} size={9} />
              {STATUS_WORD[status]}
            </span>
          ))}
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * The changelog: every public ledger entry across the AI maps, newest
 * recorded first, grouped by the day the map recorded it. A superseded entry
 * stays, struck through, with a link to the entry that corrects it:
 * corrections never delete.
 */
import type { ChangelogItem } from "@/lib/argument/ledgerPool";
import { noticedDay } from "@/lib/argument/ledgerPool";
import { STATUS_TEXT, STATUS_WORD, domId, formatDay, formatLongDay } from "./format";
import { cruxQuestion, type IndexedMap } from "./types";

export function changelogAnchor(entryId: string): string {
  return `log-${domId(entryId)}`;
}

/** Rows shown before the rest folds behind a disclosure. */
export const CHANGELOG_OPEN_ROWS = 8;

type DayGroup = { day: string; items: ChangelogItem[] };

function groupByDay(items: ChangelogItem[]): DayGroup[] {
  const days: DayGroup[] = [];
  for (const item of items) {
    const day = noticedDay(item.entry);
    const last = days.at(-1);
    if (last?.day === day) last.items.push(item);
    else days.push({ day, items: [item] });
  }
  return days;
}

export function Changelog({
  items,
  mapsById,
}: {
  items: ChangelogItem[];
  mapsById: Map<string, IndexedMap>;
}) {
  const counts = new Map<string, number>();
  for (const item of items) {
    const day = noticedDay(item.entry);
    counts.set(day, (counts.get(day) ?? 0) + 1);
  }
  const open = groupByDay(items.slice(0, CHANGELOG_OPEN_ROWS));
  const folded = groupByDay(items.slice(CHANGELOG_OPEN_ROWS));
  const lastOpenDay = open.at(-1)?.day;

  const renderDay = ({ day, items: dayItems }: DayGroup, continued: boolean) => (
    <section key={day} aria-label={`Recorded ${formatLongDay(day)}`}>
      {!continued && (
        <h3 className="flex items-baseline gap-3 border-b border-divider pb-2">
          <span className="font-serif text-[1.125rem] text-stone-900 dark:text-stone-100">
            Recorded <time dateTime={day}>{formatLongDay(day)}</time>
          </span>
          <span className="text-[12px] text-muted dark:text-stone-400">
            {counts.get(day)} {counts.get(day) === 1 ? "entry" : "entries"}
          </span>
        </h3>
      )}
      <ol className="divide-y divide-divider/60">
        {dayItems.map((item) => {
          const map = mapsById.get(item.topicId);
          if (!map) return null;
          return <ChangelogRow key={item.entry.id} item={item} map={map} />;
        })}
      </ol>
    </section>
  );

  return (
    <div data-testid="ai-changelog">
      <div className="space-y-10">{open.map((group) => renderDay(group, false))}</div>
      {folded.length > 0 && (
        <details className="group/log mt-2 border-t border-divider/60">
          <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-2 rounded pt-3 text-[13px] font-medium text-stone-700 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep dark:text-stone-300 dark:hover:text-stone-100 dark:focus-visible:ring-[#6fa39e] [&::-webkit-details-marker]:hidden">
            <span
              aria-hidden="true"
              className="inline-block text-[12px] transition-transform group-open/log:rotate-90 motion-reduce:transition-none"
            >
              ›
            </span>
            <span className="group-open/log:hidden">
              Show the other {items.length - CHANGELOG_OPEN_ROWS} entries
            </span>
            <span className="hidden group-open/log:inline">
              The other {items.length - CHANGELOG_OPEN_ROWS} entries
            </span>
          </summary>
          <div className="space-y-10">
            {folded.map((group, index) => renderDay(group, index === 0 && group.day === lastOpenDay))}
          </div>
        </details>
      )}
    </div>
  );
}

function ChangelogRow({ item, map }: { item: ChangelogItem; map: IndexedMap }) {
  const { entry, correctedBy } = item;
  const struck = correctedBy !== undefined;
  return (
    <li
      id={changelogAnchor(entry.id)}
      data-testid="ai-changelog-entry"
      data-date={entry.date}
      data-noticed={noticedDay(entry)}
      data-superseded={struck ? "true" : undefined}
      className="scroll-mt-6 py-4"
    >
      <p className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 text-[12px] leading-snug">
        <span className="tabular-nums text-stone-700 dark:text-stone-300">
          Source dated <time dateTime={entry.date}>{formatDay(entry.date)}</time>
        </span>
        <span className="text-muted dark:text-stone-400">{map.label}</span>
        <span className={`font-serif text-[14.5px] italic ${STATUS_TEXT[entry.status]}`}>
          {STATUS_WORD[entry.status]}
        </span>
      </p>
      <p className="mt-1 font-serif text-[1.0625rem] leading-snug text-stone-900 dark:text-stone-100">
        {cruxQuestion(map, entry.claimId)}
      </p>
      <p
        className={`mt-1 text-[14px] leading-relaxed ${
          struck
            ? "text-muted line-through decoration-stone-400/80 dark:text-stone-500"
            : "text-stone-700 dark:text-stone-300"
        }`}
      >
        {struck && <span className="sr-only">Superseded: </span>}
        {entry.note}
      </p>
      {correctedBy && (
        <p className="mt-1 text-[12px] text-muted dark:text-stone-400">
          Corrected by{" "}
          <a
            href={`#${changelogAnchor(correctedBy.id)}`}
            className="font-medium text-stone-700 underline underline-offset-2 dark:text-stone-300"
          >
            the entry dated {formatDay(correctedBy.date)}
          </a>
          .
        </p>
      )}
    </li>
  );
}

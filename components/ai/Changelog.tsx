/**
 * The changelog: every public ledger entry across the AI maps, newest
 * recorded first, grouped by the day the map recorded it, folded by default.
 * A superseded entry stays, struck through, with a link to the entry that
 * corrects it: corrections never delete.
 */
import type { ChangelogItem } from "@/lib/argument/ledgerPool";
import { noticedDay } from "@/lib/argument/ledgerPool";
import { STATUS_TEXT, STATUS_WORD, domId, formatDay, formatLongDay } from "./format";
import { cruxQuestion, type IndexedMap } from "./types";

export function changelogAnchor(entryId: string): string {
  return `log-${domId(entryId)}`;
}

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

/**
 * Starts folded: the section above already shows every in-window note, so
 * the closed summary says how many entries there are and when the latest was
 * recorded, and the full record is one tap away.
 */
export function Changelog({
  items,
  mapsById,
}: {
  items: ChangelogItem[];
  mapsById: Map<string, IndexedMap>;
}) {
  if (items.length === 0) {
    return (
      <p data-testid="ai-changelog" className="text-[14px] text-muted dark:text-stone-400">
        No ledger entry has been published yet.
      </p>
    );
  }
  const latest = noticedDay(items[0].entry);

  return (
    <details data-testid="ai-changelog" className="group/log border-t border-divider">
      <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-2 rounded pt-1 text-[13.5px] font-medium text-stone-700 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus dark:text-stone-300 dark:hover:text-stone-100 [&::-webkit-details-marker]:hidden">
        <span
          aria-hidden="true"
          className="inline-block text-[12px] transition-transform group-open/log:rotate-90 motion-reduce:transition-none"
        >
          ›
        </span>
        <span>
          {items.length} {items.length === 1 ? "entry" : "entries"}, the latest recorded{" "}
          <time dateTime={latest}>{formatLongDay(latest)}</time>
        </span>
      </summary>
      <div className="mt-4 space-y-10">
        {groupByDay(items).map(({ day, items: dayItems }) => (
          <section key={day} aria-label={`Recorded ${formatLongDay(day)}`}>
            <h3 className="flex items-baseline gap-3 border-b border-divider pb-2">
              <span className="font-serif text-[1.125rem] text-stone-900 dark:text-stone-100">
                Recorded <time dateTime={day}>{formatLongDay(day)}</time>
              </span>
              <span className="text-[12px] text-muted dark:text-stone-400">
                {dayItems.length} {dayItems.length === 1 ? "entry" : "entries"}
              </span>
            </h3>
            <ol className="divide-y divide-divider/60">
              {dayItems.map((item) => {
                const map = mapsById.get(item.topicId);
                if (!map) return null;
                return <ChangelogRow key={item.entry.id} item={item} map={map} />;
              })}
            </ol>
          </section>
        ))}
      </div>
    </details>
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
            ? "text-muted line-through decoration-stone-400/80 dark:text-stone-400"
            : "text-stone-700 dark:text-stone-300"
        }`}
      >
        {struck && <span className="sr-only">Superseded: </span>}
        {entry.note}
      </p>
      {correctedBy && (
        <p className="mt-1 text-[12px] leading-snug text-muted dark:text-stone-400">
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

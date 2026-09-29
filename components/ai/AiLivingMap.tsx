/**
 * The living AI map: the AI argument across the AI maps on one page, and
 * what has moved. Spec: docs/plans/2026-09-22-crux-ledger-and-living-ai-map-spec.md §2.
 *
 * Server component, zero client JS. Every control is a link (`?map=`,
 * `?since=`), so the page is shareable at any state and needs no hydration.
 * No percentages, no scores, no winner: cards are interleaved by each map's
 * own rank, and the movement summary counts claims, not confidence.
 */
import Link from "next/link";
import { ARGUMENT_TOPICS_FIRST_PUBLISHED } from "@/lib/site";
import { publicLedgerEntries } from "@/lib/argument/ledger";
import {
  DEFAULT_SINCE_DAYS,
  arrivedSince,
  ledgerAsOf,
  ledgerChangelog,
  movementSummary,
  noticedDay,
  poolTopCruxes,
  resolveSince,
  shiftDay,
  type PoolMap,
} from "@/lib/argument/ledgerPool";
import { ArrivedGroupView } from "./ArrivedSince";
import { Changelog } from "./Changelog";
import { CRUX_SHEET } from "@/components/topic/cruxPrimitives";
import { CruxCard } from "./CruxCard";
import { MovementFigure } from "./MovementFigure";
import { aiHref, formatDay, formatLongDay, mapLabel } from "./format";
import { cruxQuestion, type AiMapSource, type IndexedMap } from "./types";

export interface AiLivingMapProps {
  maps: AiMapSource[];
  /** Raw `?map=` value; ignored unless it names one of `maps`. */
  mapParam?: string;
  /** Raw `?since=` value; ignored unless it is a real day on or before as-of. */
  sinceParam?: string;
}

/** Crux cards on /ai: the lower half of the spec's 5–8, so the page stays one brief. */
const CRUX_CARDS = 6;

const WINDOW_CHOICES = [
  { days: 30, label: "30 days" },
  { days: DEFAULT_SINCE_DAYS, label: "90 days" },
  { days: 365, label: "A year" },
] as const;

export function AiLivingMap({ maps, mapParam, sinceParam }: AiLivingMapProps) {
  const indexed: IndexedMap[] = maps.map((map) => ({
    ...map,
    label: mapLabel(map.topicId, map.title),
    nodesById: new Map(map.graph.nodes.map((node) => [node.id, node])),
  }));
  const mapsById = new Map(indexed.map((map) => [map.topicId, map]));
  const selected = mapParam !== undefined ? mapsById.get(mapParam) : undefined;
  const shown = selected ? [selected] : indexed;
  const pool: PoolMap[] = shown;

  // The as-of day and the default window come from every AI map, so the
  // filter changes what is shown, never the dates the page is anchored to.
  const asOf = ledgerAsOf(indexed) ?? ARGUMENT_TOPICS_FIRST_PUBLISHED;
  const figureEntries = pool.flatMap((map) =>
    publicLedgerEntries(map.ledger).map((entry) => ({ id: entry.id, date: entry.date, status: entry.status })),
  );
  const earliest = figureEntries.reduce<string | null>(
    (min, entry) => (min === null || entry.date < min ? entry.date : min),
    null,
  );
  const since = resolveSince(sinceParam, asOf, earliest ?? undefined);
  const defaultSince = resolveSince(undefined, asOf);
  const sinceForLinks = since === defaultSince ? undefined : since;
  const mapForLinks = selected?.topicId;

  const cruxes = poolTopCruxes(pool, CRUX_CARDS);
  const arrived = arrivedSince(pool, since, asOf);
  const summary = movementSummary(pool, since, asOf);
  const changelog = ledgerChangelog(pool);
  const noticedDays = new Set(arrived.flatMap((group) => group.entries.map(noticedDay)));
  const sharedNoticedDay = noticedDays.size === 1 ? [...noticedDays][0] : null;
  const movedCount =
    summary.moved.open + summary.moved.narrowed + summary.moved.resolved + summary.moved.unresolvable;

  return (
    // app/ai/page.tsx wraps this in AppShell, which owns <main id="main-content">
    // and the site navigation; this column only keeps the reading measure.
    <div className="mx-auto max-w-[44rem] px-4 pb-24 pt-8 sm:px-6 sm:pt-12 lg:px-8">

      {/* ---------------- 1. What this page is ---------------- */}
      <header>
        <p className="label-caps">
          A living map, as of <time dateTime={asOf}>{formatLongDay(asOf)}</time>
        </p>
        <h1 className="mt-3 text-balance font-serif text-[2.6rem] leading-[1.04] tracking-[-0.018em] text-stone-900 dark:text-stone-50 sm:text-[3.6rem]">
          The AI argument, on one page
        </h1>
        <p className="mt-6 max-w-[36rem] font-serif text-[1.25rem] leading-[1.55] text-stone-800 dark:text-stone-200 sm:text-[1.375rem]">
          What the fight over AI and work turns on right now, what would settle each question,
          and the dated evidence that has moved it. It does not score the sides.
        </p>
        <p className="mt-4 max-w-[36rem] text-[14px] leading-relaxed text-secondary dark:text-stone-400">
          Drawn from {indexed.length === 2 ? "two" : indexed.length} maps:{" "}
          {indexed.map((map, index) => (
            <span key={map.topicId}>
              {index > 0 && (index === indexed.length - 1 ? " and " : ", ")}
              <Link
                href={`/topics/${map.topicId}`}
                className="py-3.5 text-stone-800 underline decoration-stone-400/60 underline-offset-[3px] hover:decoration-stone-700 dark:text-stone-200 dark:decoration-stone-500"
              >
                {map.title}
              </Link>
            </span>
          ))}
          . Each map ranks its own cruxes and ranks are never compared across maps, so the
          cards alternate: each map&rsquo;s first question, then each map&rsquo;s second.
        </p>

        <nav aria-label="Show cruxes from" className="mt-6 flex flex-wrap gap-2">
          <FilterLink href={aiHref({ since: sinceForLinks })} current={!selected}>
            Both maps
          </FilterLink>
          {indexed.map((map) => (
            <FilterLink
              key={map.topicId}
              href={aiHref({ map: map.topicId, since: sinceForLinks })}
              current={selected?.topicId === map.topicId}
            >
              {map.label}
            </FilterLink>
          ))}
        </nav>
      </header>

      {/* ---------------- 2. Top cruxes now ---------------- */}
      <section aria-labelledby="cruxes-now" className="mt-14 sm:mt-16">
        <SectionHeading id="cruxes-now">What it turns on now</SectionHeading>
        <p className="mt-2 max-w-[36rem] text-[14px] leading-relaxed text-secondary dark:text-stone-400">
          A crux is a question where an answer would move whole positions. These are the
          maps&rsquo; top cruxes today, with what each map says would settle them.
        </p>
        {/* The map pages' crux sheet: one ruled card, a crimson margin rule. */}
        <ol className={`mt-7 ${CRUX_SHEET}`}>
          {cruxes.map((crux) => {
            const map = mapsById.get(crux.topicId);
            if (!map) return null;
            return (
              <CruxCard
                key={`${crux.topicId}/${crux.claimId}`}
                crux={crux}
                map={map}
                since={since}
                mapDrawnOn={ARGUMENT_TOPICS_FIRST_PUBLISHED}
              />
            );
          })}
        </ol>
      </section>

      {/* ---------------- 3. What has moved since ---------------- */}
      {/* Filtered by each source's own date; when the map recorded it is the changelog's job. */}
      <section aria-labelledby="moved-since" className="mt-20">
        <SectionHeading id="moved-since">
          What has moved since <time dateTime={since}>{formatLongDay(since)}</time>
        </SectionHeading>
        <p className="mt-2 max-w-[36rem] text-[14px] leading-relaxed text-secondary dark:text-stone-400">
          Sources dated {formatDay(since)} to {formatDay(asOf)}, by their own date, and what
          each did to the question it bears on
          {sharedNoticedDay ? `. All were added to the map on ${formatDay(sharedNoticedDay)}.` : "."}{" "}
          Open an entry&rsquo;s sources to read the findings.
        </p>
        <nav aria-label="Show what has moved since" className="mt-5 flex flex-wrap items-center gap-2 text-[13px]">
          {WINDOW_CHOICES.map((choice) => {
            const day = shiftDay(asOf, -choice.days);
            return (
              <FilterLink
                key={choice.days}
                href={aiHref({ map: mapForLinks, since: day === defaultSince ? undefined : day })}
                current={since === day}
              >
                {choice.label}
              </FilterLink>
            );
          })}
          {earliest && (
            <FilterLink href={aiHref({ map: mapForLinks, since: earliest })} current={since === earliest}>
              Everything
            </FilterLink>
          )}
        </nav>

        {arrived.length > 0 ? (
          <ol className="mt-5 divide-y divide-divider">
            {arrived.map((group) => {
              const map = mapsById.get(group.topicId);
              if (!map) return null;
              return (
                <ArrivedGroupView
                  key={`${group.topicId}/${group.claimId}`}
                  group={group}
                  map={map}
                  showNoticed={sharedNoticedDay === null}
                />
              );
            })}
          </ol>
        ) : (
          <p className="mt-8 font-serif text-[1.125rem] leading-relaxed italic text-muted dark:text-stone-400">
            No source dated in this window has been recorded. Widen the window to see earlier
            movement.
          </p>
        )}
      </section>

      {/* ---------------- 4. Movement summary ---------------- */}
      <section aria-labelledby="movement" className="mt-20">
        <SectionHeading id="movement">How much moved</SectionHeading>
        <MovementFigure entries={figureEntries} since={since} asOf={asOf} />
        <div className="mt-8 max-w-[36rem] space-y-4 font-serif text-[1.1875rem] leading-[1.6] text-stone-800 dark:text-stone-200">
          <p
            data-testid="ai-movement-summary"
            className="font-serif text-[1.25rem] leading-[1.6] text-stone-800 dark:text-stone-200"
          >
            Between {formatDay(since)} and {formatDay(asOf)},{" "}
            {movedCount === 0 ? (
              <>none of the {countWords(summary.tracked)} questions these maps track recorded a dated source.</>
            ) : (
              <>
                {countWords(movedCount)} of the {countWords(summary.tracked)} questions these maps track
                recorded a dated source. {summaryClauses(summary.moved)}
              </>
            )}
          </p>
          {summary.still.length > 0 && (
            <div>
              <p className="font-serif text-[1.0625rem] leading-[1.6] text-stone-700 dark:text-stone-300">
                {summary.still.length === 1
                  ? "One question recorded nothing in this window:"
                  : `${capitalize(countWords(summary.still.length))} questions recorded nothing in this window:`}
              </p>
              <ul className="mt-3 space-y-3 border-l border-stone-300 pl-4 dark:border-stone-600">
                {summary.still.map((item) => {
                  const map = mapsById.get(item.topicId);
                  if (!map) return null;
                  return (
                    <li key={`${item.topicId}/${item.claimId}`}>
                      <p className="text-[1.0625rem] leading-snug text-stone-800 dark:text-stone-200">
                        {cruxQuestion(map, item.claimId)}
                      </p>
                      <p className="mt-0.5 font-sans text-[12.5px] leading-snug text-muted dark:text-stone-400">
                        {map.label}. No movement recorded since{" "}
                        {formatDay(item.lastDate ?? ARGUMENT_TOPICS_FIRST_PUBLISHED)}
                        {item.lastDate ? "." : ", when the map was drawn."}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* ---------------- 5. Changelog ---------------- */}
      <section aria-labelledby="changelog" className="mt-20">
        <SectionHeading id="changelog">Changelog</SectionHeading>
        <p className="mt-2 max-w-[36rem] text-[14px] leading-relaxed text-secondary dark:text-stone-400">
          Every published ledger entry{selected ? ` on ${selected.label}` : " across both maps"},
          newest recorded first, grouped by the day the map recorded it. A corrected entry
          stays, struck through, and names its correction.
        </p>
        <div className="mt-8">
          <Changelog items={changelog} mapsById={mapsById} />
        </div>
      </section>

      <div className="mt-20 border-t border-divider pt-6 text-[12.5px] leading-relaxed text-muted dark:text-stone-400">
        <p className="max-w-[36rem] text-[12.5px] leading-relaxed text-muted dark:text-stone-400">
          Entries are written by Argumend&rsquo;s editors. A model may propose an entry, but it
          stays off this page until an editor reviews it. Each entry keeps two dates: the
          source&rsquo;s own, and the day the map recorded it.
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="scroll-mt-6 text-balance font-serif text-[1.875rem] leading-[1.15] tracking-[-0.01em] text-stone-900 dark:text-stone-50 sm:text-[2.125rem]"
    >
      {children}
    </h2>
  );
}

function FilterLink({
  href,
  current,
  children,
}: {
  href: string;
  current: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      scroll={false}
      aria-current={current ? "page" : undefined}
      className={`inline-flex min-h-11 items-center rounded-full border px-3.5 text-[13px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus ${
        current
          ? "border-stone-800 bg-stone-800 text-[#f7f4ee] dark:border-stone-200 dark:bg-stone-200 dark:text-stone-900"
          : "border-stone-300 text-stone-700 hover:border-stone-500 hover:text-stone-900 dark:border-stone-600 dark:text-stone-300 dark:hover:border-stone-400 dark:hover:text-stone-100"
      }`}
    >
      {children}
    </Link>
  );
}

const WORDS = [
  "no", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
  "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen",
  "nineteen", "twenty",
];

function countWords(n: number): string {
  return WORDS[n] ?? String(n);
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * "Three narrowed. Five stay open. None met its stated condition." The lead
 * sentence already says each recorded a source; an open entry may carry only
 * the editors' source record, so "added evidence" would overstate it.
 */
function summaryClauses(moved: Record<"open" | "narrowed" | "resolved" | "unresolvable", number>): string {
  const n = (count: number) => (count === 0 ? "None" : capitalize(countWords(count)));
  const clauses = [
    `${n(moved.narrowed)} narrowed.`,
    `${n(moved.open)} ${moved.open === 1 || moved.open === 0 ? "stays" : "stay"} open.`,
    moved.resolved === 0
      ? "None met its stated condition."
      : `${n(moved.resolved)} met ${moved.resolved === 1 ? "its" : "their"} stated condition.`,
  ];
  if (moved.unresolvable > 0) {
    clauses.push(
      `${n(moved.unresolvable)} ${moved.unresolvable === 1 ? "was" : "were"} recorded as a standing disagreement that evidence cannot settle.`,
    );
  }
  return clauses.join(" ");
}

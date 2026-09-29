/**
 * One pooled crux on the living AI map, drawn as an entry on the map pages'
 * crux sheet (components/argument/DebateView.tsx): crimson margin numeral,
 * the question, what would settle it, and the movement strip. /ai adds the map
 * it belongs to and its rank inside that map (never a rank across maps).
 * Renders the sheet's <li>; the parent supplies <ol className={CRUX_SHEET}>.
 */
import Link from "next/link";
import { claimMovement } from "@/lib/argument/ledger";
import type { PooledCrux } from "@/lib/argument/ledgerPool";
import { CruxMovementTrack } from "@/components/argument/CruxMovement";
import {
  ENTRY_COLUMN,
  ENTRY_GRID,
  MARGIN_RULE,
  SettleAnswer,
  settleMode,
  type SettleMode,
} from "@/components/topic/cruxPrimitives";
import { domId, formatDay } from "./format";
import { claimOf, cruxQuestion, type IndexedMap } from "./types";

const ORDINAL = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth"];
const CARDINAL = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

export function CruxCard({
  crux,
  map,
  since,
  mapDrawnOn,
}: {
  crux: PooledCrux;
  map: IndexedMap;
  since: string;
  /** When the map was drawn: the "since" for a crux with no ledger entry. */
  mapDrawnOn: string;
}) {
  const claim = claimOf(map, crux.claimId);
  const question = cruxQuestion(map, crux.claimId);
  const movement = claimMovement(map.ledger, crux.claimId);
  const latest = movement.at(-1)?.entry;
  const status = latest?.status;
  const isResolved = status === "resolved";
  // Same rules as the map page's crux sheet: a resolved entry outranks an
  // authored value fork, and an unresolvable entry names its kind of fork.
  const mode: SettleMode = claim ? settleMode(claim, status) : "unstated";
  const kind =
    status === "unresolvable"
      ? (latest?.resolutionKind ?? claim?.resolution?.kind)
      : claim?.resolution?.kind;
  const quiet = latest === undefined || latest.date < since;
  const rankWord = ORDINAL[crux.mapRank - 1] ?? `number ${crux.mapRank}`;
  const countWord = CARDINAL[crux.mapCruxCount - 1] ?? String(crux.mapCruxCount);
  const headingId = `crux-${domId(crux.topicId)}-${domId(crux.claimId)}`;

  return (
    <li
      aria-labelledby={headingId}
      data-testid="ai-crux-card"
      data-topic={crux.topicId}
      className={MARGIN_RULE}
    >
      <div className={`${ENTRY_GRID} py-5 pr-4 sm:py-6`}>
        {/* The margin numeral is the crux's rank inside its own map, never a
            rank across maps, so the sheet reads 1, 1, 2, 2 as the maps interleave. */}
        <span
          aria-hidden="true"
          className="row-span-4 pr-3 text-right font-serif text-[1.875rem] leading-[1.6rem] text-[#a23b3b] dark:text-[#d27070] sm:pr-4 sm:text-[2.125rem] sm:leading-[1.75rem]"
        >
          {crux.mapRank}
        </span>
        <p className={`${ENTRY_COLUMN} mb-1.5 text-[12.5px] leading-snug text-muted dark:text-stone-400`}>
          <Link
            href={`/topics/${crux.topicId}#cruxes`}
            className="font-medium text-stone-800 underline decoration-stone-400/60 underline-offset-[3px] hover:decoration-stone-700 dark:text-stone-200 dark:decoration-stone-500 dark:hover:decoration-stone-200"
          >
            {map.label}
          </Link>
          , {rankWord} of its {countWord} cruxes
        </p>
        <h3
          id={headingId}
          className={`${ENTRY_COLUMN} text-pretty font-serif text-[1.1875rem] font-medium leading-[1.35] sm:text-[1.3125rem] ${
            isResolved ? "text-stone-600 dark:text-stone-400" : "text-stone-900 dark:text-stone-100"
          }`}
        >
          {question}
        </h3>
        <p className={ENTRY_COLUMN}>
          <SettleAnswer
            mode={mode}
            kind={kind}
            condition={claim?.resolution?.condition}
            resolved={isResolved}
          />
        </p>
        {(movement.length > 0 || quiet) && (
          <div className={`${ENTRY_COLUMN} mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-2`}>
            <CruxMovementTrack movement={movement} />
            {quiet && (
              <p className="text-xs italic leading-snug text-muted dark:text-stone-400">
                No movement recorded since {formatDay(latest?.date ?? mapDrawnOn)}
                {latest ? "." : ", when the map was drawn."}
              </p>
            )}
          </div>
        )}
      </div>
    </li>
  );
}

/**
 * One pooled crux on the living AI map: the question, the map it belongs to
 * and its rank inside that map (never a rank across maps), what would settle
 * it, the ledger's status word, and the movement strip.
 */
import Link from "next/link";
import { claimMovement } from "@/lib/argument/ledger";
import type { PooledCrux } from "@/lib/argument/ledgerPool";
import { CruxMovementTrack, standingLineFor } from "@/components/argument/CruxMovement";
import { STATUS_TEXT, STATUS_WORD, domId, formatDay } from "./format";
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
  const standing = status === "unresolvable" || claim?.resolution?.kind === "value-difference";
  const standingLine = standingLineFor(latest?.resolutionKind ?? claim?.resolution?.kind);
  const quiet = latest === undefined || latest.date < since;
  const rankWord = ORDINAL[crux.mapRank - 1] ?? `number ${crux.mapRank}`;
  const countWord = CARDINAL[crux.mapCruxCount - 1] ?? String(crux.mapCruxCount);
  const headingId = `crux-${domId(crux.topicId)}-${domId(crux.claimId)}`;

  return (
    <article
      aria-labelledby={headingId}
      data-testid="ai-crux-card"
      data-topic={crux.topicId}
      className="relative rounded-md border border-divider/70 bg-[var(--bg-panel)] py-5 pl-5 pr-4 shadow-[0_1px_0_rgb(var(--border-divider-rgb)/0.6)] sm:py-6 sm:pl-7 sm:pr-6"
    >
      <span
        aria-hidden="true"
        className="absolute bottom-5 left-0 top-5 w-[3px] rounded-r-sm bg-[#a23b3b] dark:bg-[#e06a6a] sm:bottom-6 sm:top-6"
      />
      <p className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-[12.5px] leading-snug">
        <span className="text-muted dark:text-stone-400">
          <Link
            href={`/topics/${crux.topicId}#cruxes`}
            className="font-medium text-stone-800 underline decoration-stone-400/60 underline-offset-[3px] hover:decoration-stone-700 dark:text-stone-200 dark:decoration-stone-500 dark:hover:decoration-stone-200"
          >
            {map.label}
          </Link>
          , {rankWord} of its {countWord} cruxes
        </span>
        {status && (
          <span className={`font-serif text-[16px] italic ${STATUS_TEXT[status]}`}>
            {STATUS_WORD[status]}
          </span>
        )}
      </p>

      <h3
        id={headingId}
        className={`mt-2.5 text-balance font-serif text-[1.375rem] leading-[1.25] sm:text-[1.5rem] ${
          status === "resolved"
            ? "text-stone-600 dark:text-stone-400"
            : "text-stone-900 dark:text-stone-50"
        }`}
      >
        {question}
      </h3>

      <p className="mt-3 font-serif text-[1.0625rem] leading-[1.55] text-stone-700 dark:text-stone-300">
        <span className="font-sans text-[12.5px] font-semibold text-stone-800 dark:text-stone-200">
          What would settle it:
        </span>{" "}
        {standing ? (
          <span className="italic text-[#8B5A3C] dark:text-[#cfa88a]">{standingLine}</span>
        ) : (
          sentence(claim?.resolution?.condition ?? "not yet specified")
        )}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-divider/60 pt-3.5">
        {movement.length > 0 && <CruxMovementTrack movement={movement} />}
        {quiet && (
          <p className="text-xs leading-snug italic text-muted dark:text-stone-400">
            No movement recorded since {formatDay(latest?.date ?? mapDrawnOn)}
            {latest ? "." : ", when the map was drawn."}
          </p>
        )}
      </div>
    </article>
  );
}

/** The engine's conditions are phrases; close them as a sentence. */
function sentence(text: string): string {
  const trimmed = text.trim();
  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

/**
 * The crux sheet's primitives: one ruled card with hairline rules between
 * entries, a single crimson margin rule and crimson numerals in the margin.
 * Shared by every topic page (components/topic/TopicPage.tsx) and by the
 * living AI map at /ai (components/ai/CruxCard.tsx). Server-safe: no hooks.
 */
import type { ArgumentNode, Claim, ResolutionKind } from "@/types/argument";
import type { CruxResult } from "@/lib/crux";
import type { CruxLedgerEntry, CruxLedgerStatus } from "@/types/cruxLedger";
import { claimMovement } from "@/lib/argument/ledger";
import { numberWord, type SettleMode } from "@/lib/topicPage/model";
import { standingLineFor } from "@/components/argument/CruxMovement";

export type { SettleMode } from "@/lib/topicPage/model";

/** The crux sheet: one ruled card, hairline rules between entries. Shared with /ai. */
export const CRUX_SHEET =
  "surface-card overflow-hidden !rounded-lg divide-y divide-stone-200/90 dark:divide-[#3d3a36]";
/** Numeral gutter | entry. The margin rule sits on the column boundary. */
export const ENTRY_GRID = "grid grid-cols-[2.5rem_minmax(0,1fr)] sm:grid-cols-[3.75rem_minmax(0,1fr)]";
/** A summary row in the entry column, right of the margin rule. */
export const ENTRY_COLUMN = "col-start-2 min-w-0 pl-4 sm:pl-5";
/**
 * The margin rule, drawn per entry so the list stays `ol > li`. It starts a
 * pixel high to bridge each divider, so the rule reads as one line that the
 * horizontal rules cross, as on ledger paper.
 */
export const MARGIN_RULE =
  "relative before:pointer-events-none before:absolute before:-top-px before:bottom-0 before:left-[2.5rem] before:z-10 before:border-l before:border-[#a23b3b]/45 before:content-[''] dark:before:border-[#c45c5c]/55 sm:before:left-[3.75rem]";
/** The crimson margin numeral. */
export const MARGIN_NUMERAL =
  "row-span-4 pr-3 text-right font-serif text-[1.875rem] leading-[1.6rem] text-[#a23b3b] dark:text-[#d27070] sm:pr-4 sm:text-[2.125rem] sm:leading-[1.75rem]";

export function settleMode(claim: Claim, latestStatus?: CruxLedgerStatus): SettleMode {
  const kind = claim.resolution?.kind;
  if (latestStatus === "unresolvable") return "standing";
  // A resolved entry outranks the authored kind: "nothing settles it" under a
  // "Resolved" track would contradict the ledger.
  if (kind === "value-difference" && latestStatus !== "resolved") return "standing";
  if (!claim.resolution?.condition) return "unstated";
  if (kind === "definitional-choice" || kind === "authority-allocation") return "agreement";
  return "evidence";
}

/**
 * One sentence that sorts the list by how each question could close:
 * "Four could be settled by evidence, and one not at all." Counts only;
 * it never says which way any of them will go.
 */
export function settleTally(
  cruxes: CruxResult[],
  nodesById: Map<string, ArgumentNode>,
  ledger: CruxLedgerEntry[],
): string {
  const counts: Record<SettleMode, number> = { evidence: 0, agreement: 0, standing: 0, unstated: 0 };
  for (const crux of cruxes) {
    const claim = nodesById.get(crux.claimId);
    if (claim?.type !== "claim") continue;
    const latest = claimMovement(ledger, crux.claimId).at(-1)?.entry.status;
    counts[settleMode(claim, latest)] += 1;
  }
  // Clauses start lower-case; only the sentence's first word is capitalized.
  // "Standing" says "not by evidence", never "not at all": a definitional
  // fork the ledger calls unresolvable can still close by stipulation.
  const clauses: string[] = [];
  const count = (n: number) => numberWord(n).toLowerCase();
  if (counts.evidence) clauses.push(`${count(counts.evidence)} could be settled by evidence`);
  if (counts.agreement) {
    clauses.push(
      `${count(counts.agreement)}${clauses.length ? "" : " could be settled"} by agreeing on terms`,
    );
  }
  if (counts.standing) {
    clauses.push(
      clauses.length
        ? `${count(counts.standing)} not by evidence at all`
        : `${count(counts.standing)} cannot be settled by evidence`,
    );
  }
  if (counts.unstated) {
    clauses.push(`${count(counts.unstated)} ${counts.unstated === 1 ? "has" : "have"} no stated test yet`);
  }
  if (clauses.length === 0) return "";
  const last = clauses.pop()!;
  const sentence = clauses.length ? `${clauses.join(", ")}, and ${last}` : last;
  return `${sentence[0].toUpperCase()}${sentence.slice(1)}.`;
}

/** Capitalize a lower-case authored fragment and close it with a period. */
export function asSentence(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return trimmed;
  const capped = trimmed[0].toUpperCase() + trimmed.slice(1);
  return /[.!?…]$/.test(capped) ? capped : `${capped}.`;
}

/**
 * The card's lead: the status and the test in one read. Teal when something
 * could settle it, brown with the engine's standing line when nothing does.
 * Summary content, so phrasing elements only.
 */
export function SettleAnswer({
  mode,
  kind,
  condition,
  resolved,
  label: labelOverride,
}: {
  mode: SettleMode;
  kind?: ResolutionKind;
  condition?: string;
  resolved: boolean;
  label?: string;
}) {
  if (mode === "standing") {
    return (
      <span className="mt-3 block" data-settle="standing">
        <span className="label-caps block text-[#8B5A3C] dark:text-[#cfa88a]">
          {labelOverride ?? "What would settle it"}
        </span>
        <span className="mt-1 block font-serif text-[1.0625rem] italic leading-[1.5] text-[#7a4e34] dark:text-[#d9b89d] sm:text-[1.1875rem]">
          {standingLineFor(kind)}
        </span>
      </span>
    );
  }
  const label =
    labelOverride ??
    (resolved
      ? "What settled it"
      : kind === "future-observable"
        ? "What would settle it, in time"
        : "What would settle it");
  return (
    <span className="mt-3 block" data-settle={mode}>
      <span
        className={`label-caps block ${
          resolved ? "text-[#56736f] dark:text-[#7f9c99]" : "text-[#3a6965] dark:text-[#8fc0bb]"
        }`}
      >
        {label}
      </span>
      <span
        className={`mt-1 block font-serif text-[1.0625rem] leading-[1.5] sm:text-[1.1875rem] ${
          mode === "unstated"
            ? "italic text-muted dark:text-stone-400"
            : resolved
              ? "text-stone-600 dark:text-stone-400"
              : "text-stone-800 dark:text-stone-200"
        }`}
      >
        {condition ? asSentence(condition) : "Not yet specified."}
      </span>
    </span>
  );
}

/** A paragraph with a run-in italic lead, as in a book, instead of a label row. */
export function RunIn({
  lead,
  emphasis = false,
  children,
}: {
  lead: string;
  emphasis?: boolean;
  children: React.ReactNode;
}) {
  return (
    <p
      className={
        emphasis
          ? "font-serif text-[1.0625rem] leading-[1.55] text-stone-800 dark:text-stone-200 sm:text-[1.125rem]"
          : "font-serif text-[1rem] leading-[1.6] text-secondary dark:text-stone-300"
      }
    >
      <em className="font-medium text-stone-900 dark:text-stone-100">{lead}</em> {children}
    </p>
  );
}

/** A small uppercase label over a block of detail. */
export function DetailBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="text-[11px] font-medium uppercase tracking-wider text-muted dark:text-stone-400">
        {label}
      </h4>
      <div className="mt-1 text-sm leading-relaxed text-secondary dark:text-stone-300">
        {children}
      </div>
    </div>
  );
}

/** The one disclosure style used inside crux entries and position cards. */
export const INLINE_SUMMARY =
  "-mx-1 inline-flex min-h-11 w-[calc(100%+0.5rem)] cursor-pointer list-none items-center justify-between gap-2 rounded px-1 text-[0.8125rem] font-medium text-muted hover:text-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus dark:text-stone-400 dark:hover:text-stone-200 [&::-webkit-details-marker]:hidden";

/** An external source link with a 44px hit area (sources are what sceptics tap). */
export const SOURCE_LINK =
  "inline-flex min-h-11 items-center py-2 font-medium text-secondary dark:text-stone-300 link-underline";

/**
 * The one topic-page model. Both map shapes render through the same template
 * (components/topic/TopicPage.tsx): new-model ArgumentGraph maps via
 * components/argument/DebateView.tsx, legacy pillar maps via
 * lib/topicPage/legacy.ts + components/ReadModeView.tsx. The order is fixed by
 * the template, so the two can no longer drift apart:
 *
 *   question → hook → what both sides agree on → the crux sheet → positions →
 *   one-tap reflection → actions → folds → related maps.
 *
 * Plain data only. The views add React slots (evidence, movement tracks) on
 * top of these records; see `CruxEntryView` in the template.
 */
import type { ResolutionKind } from "@/types/argument";

/**
 * How a crux could close, which is the status a reader needs first.
 *  - evidence:  a test exists (now, or once the future arrives)
 *  - agreement: it closes when the sides agree on terms or on who decides
 *  - standing:  nothing closes it; a value fork, or a ledger that says so
 *  - unstated:  the map has not written a condition down yet
 */
export type SettleMode = "evidence" | "agreement" | "standing" | "unstated";

/** The engine's line for a crux no evidence can settle (docs/CRUX_ENGINE.md). */
export const STANDING_DISAGREEMENT_LINE =
  "Nothing does — this is a standing value disagreement; the map holds both horns.";

/**
 * The standing line for the kind of fork. A value fork keeps the engine's
 * exact line; a definitional or who-decides fork says what it turns on, so a
 * definition question is not mislabelled as a clash of values.
 */
export function standingLineFor(kind?: ResolutionKind): string {
  if (kind === "definitional-choice") {
    return "Nothing does — this turns on a choice of definition; the map holds both readings.";
  }
  if (kind === "authority-allocation") {
    return "Nothing does — this turns on who should decide; the map holds both answers.";
  }
  return STANDING_DISAGREEMENT_LINE;
}

/**
 * Lead for the authored condition when the card already answers "nothing
 * does". Shared by flagship (DebateView) and legacy (lib/topicPage/legacy.ts)
 * maps so a standing crux reads the same on both.
 */
export const STANDING_CONDITION_LEAD: Record<ResolutionKind, string> = {
  "value-difference": "What it turns on.",
  "definitional-choice": "What could close it instead.",
  "authority-allocation": "What could close it instead.",
  "existing-evidence": "The condition the map records.",
  "future-observable": "The condition the map records.",
};

export interface TopicHook {
  text: string;
  /** A short definitional note under the hook (flagship `contextNote`). */
  note?: string;
  /** The hook's source, shown as a small link. Never a confidence chip. */
  source?: { label: string; url?: string };
}

export interface SettleView {
  mode: SettleMode;
  kind?: ResolutionKind;
  condition?: string;
  resolved: boolean;
  /** Overrides the computed "What would settle it" label. */
  label?: string;
  /** One muted line under the condition (legacy: how testable it is). */
  note?: string;
}

/** A paragraph with an italic run-in lead ("What each answer changes."). */
export interface RunInText {
  lead: string;
  text: string;
  emphasis?: boolean;
}

export interface CruxEntryData {
  /** DOM anchor, unique on the page (`crux-…`). */
  anchor: string;
  /** The question as the map words it. */
  question: string;
  /** Short label for the "On this page" rail and the reflection chips. */
  shortLabel: string;
  /** A small line above the question (legacy: the pillar it belongs to). */
  kicker?: string;
  settle: SettleView;
  /** The claim is a hidden assumption nobody states out loud. */
  implicit?: boolean;
  /** Folded prose, in order. */
  runIns: RunInText[];
  /**
   * What would change each side's mind, with the lead-in naming that side
   * ("Someone who says yes would change their mind if…").
   */
  flips?: { supporter: string; skeptic: string; supporterLead: string; skepticLead: string };
  /**
   * The strongest card on each side of this crux, one per side, the
   * supporting side first. Both sides or neither: one side's card alone
   * reads as that side ahead. No weights or scores.
   */
  strongest?: readonly [StrongestCard, StrongestCard];
}

/** One evidence card as the reflection shows it: its side, words and source. */
export interface StrongestCard {
  side: "for" | "against";
  /** The side as the crux's evidence block names it ("Points to yes on…"). */
  sideLabel: string;
  title: string;
  source?: string;
  sourceUrl?: string;
}

/**
 * The strongest card on each side, given each side's cards strongest first,
 * or undefined unless both sides have one.
 */
export function strongestPair(
  forCard: Omit<StrongestCard, "side"> | undefined,
  againstCard: Omit<StrongestCard, "side"> | undefined,
): readonly [StrongestCard, StrongestCard] | undefined {
  if (!forCard || !againstCard) return undefined;
  return [
    { ...forCard, side: "for" },
    { ...againstCard, side: "against" },
  ];
}

export interface PositionCardData {
  id: string;
  label: string;
  /** One sentence, shown unfolded. */
  summary: string;
  /** Border accent, a design-system colour. */
  accent: string;
  /** The full case, folded under "Read the full case". */
  full: RunInText[];
  /** Muted closing line inside the fold ("Held by: …"). */
  heldBy?: string;
  /** An illustrative related voice, inside the fold. */
  voice?: { name: string; affiliation: string; line: string };
}

export interface RelatedMap {
  id: string;
  title: string;
}

export interface TopicPageData {
  id: string;
  kind: "flagship" | "legacy";
  /** H1: the question, or a legacy title as authored. */
  title: string;
  /** Breadcrumb label for this page. */
  crumb: string;
  /** A one-line qualifier under the H1 ("Scope: …" or "The claim: …"). */
  subtitle?: { lead: string; text: string };
  /** ISO date the map was last reviewed; omitted when the data has none. */
  reviewedOn?: string;
  sourceCount: number;
  hook?: TopicHook;
  /** Heading for the agreement block (depends on how many sides there are). */
  agreementHeading: string;
  /** 0–3 things every side already accepts. Empty: the block is omitted. */
  agreement: string[];
  /** The paragraph that opens the crux sheet (flagship tldr / simple case). */
  cruxLede?: string;
  /** "Four could be settled by evidence, and one not at all." */
  cruxTally?: string;
  positionsHeading: string;
  positionsNote?: string;
  positions: PositionCardData[];
  related: RelatedMap[];
  /**
   * The map's /questions page, when it has one: the question in a reader's
   * words, led by its first crux. Linked quietly from the footer.
   */
  questionPage?: { href: string; question: string };
  /** The legacy diagram route, when this map has one. */
  diagramHref?: string;
  /** Whether /embed serves this map. */
  embeddable: boolean;
}

const NUMBER_WORDS = ["None", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];

/** "Three", "Four", … — falls back to digits past ten. */
export function numberWord(n: number): string {
  return NUMBER_WORDS[n] ?? String(n);
}

/** "This turns on three questions" — never a hardcoded count. */
export function cruxSheetHeading(count: number): string {
  return `This turns on ${numberWord(count).toLowerCase()} ${count === 1 ? "question" : "questions"}`;
}

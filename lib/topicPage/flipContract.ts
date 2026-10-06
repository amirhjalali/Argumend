/**
 * The "what would change their mind" contract (round-6 live review, High).
 *
 * Each legacy crux carries two flips, `falsification.supporter_flip` and
 * `falsification.skeptic_flip`, shown under "What would change the mind of
 * someone who says yes / no…" on the topic page, in the diagram detail, in
 * the paste result and in its copied summary. A flip is a conditional: it
 * names a new observation and what it would do to that side's case. It never
 * tells one side what to think about the evidence that already exists, and
 * it never says which side that evidence favours. Before this contract the
 * skeptic flip lectured ("A skeptic … should weigh that … so the burden is
 * on …") on 387 of 432 cruxes while the supporter flip got a fair
 * conditional: an implied winner on almost every older map.
 *
 * The rules are mechanical, so a test can hold every map to them:
 *
 *  - conditional: the flip opens "If …", the same form for both sides;
 *  - lecture:     it says "should" ("should weigh / update / concede…",
 *                 "the rationale should be dropped"): a flip says "would";
 *  - side-should: it names a side and says what that side should do;
 *  - burden:      it assigns the burden of proof;
 *  - asserted:    it asserts how the evidence has come out ("which it
 *                 consistently has", "has repeatedly failed", "the evidence
 *                 shows", "already", "demonstrably");
 *  - verdict:     it names a winner (the ledger's verdict-language list);
 *  - thin:        it is too short to name an observation;
 *  - dashes:      it piles up more than two em dashes;
 *  - symmetry:    one side's flip is more than 2.5 times the other's length.
 *
 * Pure: no data imports, so the test and any audit script share it.
 */
import { findVerdictLanguage } from "@/lib/argument/ledger";

export const FLIP_THRESHOLDS = {
  /** Shorter than this cannot name an observation and its consequence. */
  minChars: 60,
  /** More em dashes than this is a pile-up. */
  maxDashes: 2,
  /** The longer flip on a crux may be at most this many times the shorter. */
  maxLengthRatio: 2.5,
} as const;

const SIDE =
  "(?:skeptics?|supporters?|proponents?|critics?|opponents?|advocates?|defenders?|believers?|doubters?|sceptics?)";

const LECTURE =
  /\bshould\s+(?:\w+\s+)?(?:weigh|update|accept|concede|recogni[sz]e|acknowledge|admit|grant|note|notice|consider|soften|reckon|take seriously|change (?:their|his|her) minds?)\b/i;

const SIDE_SHOULD = new RegExp(`\\b${SIDE}\\b[^.;:]*\\bshould\\b`, "i");

const BURDEN = /\bburden (?:of proof )?(?:is|lies|falls|rests|shifts|sits)\b|\bthe burden\b/i;

/** Phrasings that assert how the existing evidence has come out. */
const ASSERTED: { label: string; pattern: RegExp }[] = [
  { label: "which it has", pattern: /\bwhich (?:it|they) (?:consistently|repeatedly|largely|so far|still)?\s*(?:has|have|does|do)\b/i },
  { label: "has repeatedly failed / held", pattern: /\bha(?:s|ve) (?:repeatedly|consistently) (?:failed|held)\b/i },
  { label: "keeps holding up", pattern: /\b(?:keeps?|kept) (?:holding up|failing|appearing|showing up)\b/i },
  {
    label: "the evidence shows",
    pattern: /\bthe (?:evidence|data|record|research|literature|science) (?:already |clearly )?(?:shows?|demonstrates?|confirms?|proves?)\b/i,
  },
  // "already-diseased arteries" is a description, not a claim about the debate.
  { label: "already", pattern: /\balready\b(?!-)/i },
  {
    label: "has been shown",
    pattern: /\bha(?:s|ve) (?:now )?(?:been )?(?:proven|shown|established|confirmed|falsified|debunked)\b/i,
  },
  { label: "demonstrably", pattern: /\bdemonstrabl[ey]\b/i },
  { label: "the strongest argument", pattern: /\b(?:is|was|remains) the (?:strongest|best) (?:argument|evidence|case)\b/i },
  { label: "in fact", pattern: /\bin fact\b/i },
];

/**
 * Ledger verdict labels that cannot name a winner inside a flip: the flip is
 * hypothetical by contract ("If a trial proved…"), and "the heaviest losers"
 * (gamblers) or "the claim that meritocracy is a myth" (a map's own claim) are
 * the topic's vocabulary, not a verdict.
 */
const HYPOTHETICAL_SAFE = new Set(["proven / disproven", "loser", "myth"]);

export type FlipRule =
  | "conditional"
  | "lecture"
  | "side-should"
  | "burden"
  | "asserted"
  | "verdict"
  | "thin"
  | "dashes"
  | "symmetry";

export interface FlipProblem {
  rule: FlipRule;
  detail: string;
}

/** Problems with one flip, read on its own. */
export function flipProblems(flip: string): FlipProblem[] {
  const problems: FlipProblem[] = [];
  const text = flip.trim();
  if (text.length < FLIP_THRESHOLDS.minChars) {
    problems.push({ rule: "thin", detail: `${text.length} chars` });
  }
  if (!/^If\b/.test(text)) {
    problems.push({ rule: "conditional", detail: `opens "${text.split(/\s+/).slice(0, 3).join(" ")}"` });
  }
  const lecture = text.match(LECTURE);
  if (lecture) problems.push({ rule: "lecture", detail: `"${lecture[0]}"` });
  // Any other "should" still tells the reader what to conclude ("the
  // rationale should be dropped"); a flip says what would happen, "would".
  else if (/\bshould\b/i.test(text)) problems.push({ rule: "lecture", detail: `"should"` });
  const sideShould = text.match(SIDE_SHOULD);
  if (sideShould) problems.push({ rule: "side-should", detail: `"${sideShould[0].slice(0, 60)}"` });
  const burden = text.match(BURDEN);
  if (burden) problems.push({ rule: "burden", detail: `"${burden[0]}"` });
  for (const { label, pattern } of ASSERTED) {
    if (pattern.test(text)) problems.push({ rule: "asserted", detail: label });
  }
  for (const label of findVerdictLanguage(text)) {
    if (!HYPOTHETICAL_SAFE.has(label)) problems.push({ rule: "verdict", detail: label });
  }
  const dashes = (text.match(/—/g) ?? []).length;
  if (dashes > FLIP_THRESHOLDS.maxDashes) problems.push({ rule: "dashes", detail: `${dashes} em dashes` });
  return problems;
}

/** The two flips on one crux should be comparable in length. */
export function flipSymmetryProblem(supporter: string, skeptic: string): FlipProblem | null {
  const a = supporter.trim().length;
  const b = skeptic.trim().length;
  if (a === 0 || b === 0) return null;
  const ratio = Math.max(a, b) / Math.min(a, b);
  return ratio > FLIP_THRESHOLDS.maxLengthRatio
    ? { rule: "symmetry", detail: `${a} vs ${b} chars (${ratio.toFixed(1)}x)` }
    : null;
}

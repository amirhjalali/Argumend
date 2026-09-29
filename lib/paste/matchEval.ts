/**
 * Scoring for the paste-matching eval (data/evals/paste-matching/*.json).
 *
 * The map lane's promise is "no map, rather than the wrong map", so the eval
 * keeps the costly error apart from the cheap ones. For a paste with a right
 * answer, the lane can name one of the right maps (correct), name a near
 * sibling of it (sibling), name something unrelated (wrong), or name nothing
 * (miss). For a paste no map covers, naming anything is a false positive.
 *
 * Pure: it scores answers it is handed, so the vitest and any measurement
 * script share one definition of every number in the report.
 */

export interface PasteEvalCase {
  id: string;
  form: "conversation" | "article" | "rant" | "reply" | "short";
  text: string;
  /** Maps that are a right answer, best first. Empty: no map should be named. */
  expected: string[];
  /** Near siblings: fair to show beside the answer, not the answer itself. */
  related: string[];
  note?: string;
}

export interface PasteEvalSet {
  version: number;
  set: string;
  description: string;
  cases: PasteEvalCase[];
}

/** What the lane did with one paste. */
export interface PasteEvalAnswer {
  /** The map named as this paste's map, or null. */
  named: string | null;
  /** Every map the answer shows, named one first, at most three. */
  shown: string[];
}

export type PasteEvalOutcome =
  | "correct"
  | "sibling"
  | "wrong"
  | "miss"
  | "rejected"
  | "false-positive";

export interface PasteEvalRow {
  id: string;
  form: PasteEvalCase["form"];
  outcome: PasteEvalOutcome;
  named: string | null;
  shown: string[];
  expected: string[];
  /** A right map is somewhere in what the answer shows. */
  inShown: boolean;
}

export interface PasteEvalSummary {
  cases: number;
  positives: number;
  negatives: number;
  correct: number;
  sibling: number;
  wrong: number;
  miss: number;
  rejected: number;
  falsePositives: number;
  /** correct / positives: the right map named, out of every paste that has one. */
  top1: number;
  /** correct / positives that named a map: how often a named map is right. */
  precisionWhenNamed: number;
  /** wrong / positives. */
  wrongRate: number;
  /** (wrong + sibling) / positives. */
  wrongOrSiblingRate: number;
  /** miss / positives. */
  missRate: number;
  /** A right map among the (up to three) maps the answer shows, out of positives. */
  top3: number;
}

export function scoreCase(testCase: PasteEvalCase, answer: PasteEvalAnswer): PasteEvalRow {
  const expected = new Set(testCase.expected);
  const related = new Set(testCase.related);
  const inShown = answer.shown.some((id) => expected.has(id));
  let outcome: PasteEvalOutcome;
  if (expected.size === 0) {
    outcome = answer.named ? "false-positive" : "rejected";
  } else if (!answer.named) {
    outcome = "miss";
  } else if (expected.has(answer.named)) {
    outcome = "correct";
  } else if (related.has(answer.named)) {
    outcome = "sibling";
  } else {
    outcome = "wrong";
  }
  return {
    id: testCase.id,
    form: testCase.form,
    outcome,
    named: answer.named,
    shown: answer.shown,
    expected: testCase.expected,
    inShown,
  };
}

function ratio(numerator: number, denominator: number): number {
  return denominator === 0 ? 0 : numerator / denominator;
}

export function summarize(rows: readonly PasteEvalRow[]): PasteEvalSummary {
  const count = (outcome: PasteEvalOutcome) => rows.filter((row) => row.outcome === outcome).length;
  const positives = rows.filter((row) => row.expected.length > 0);
  const correct = count("correct");
  const sibling = count("sibling");
  const wrong = count("wrong");
  const miss = count("miss");
  const named = correct + sibling + wrong;
  return {
    cases: rows.length,
    positives: positives.length,
    negatives: rows.length - positives.length,
    correct,
    sibling,
    wrong,
    miss,
    rejected: count("rejected"),
    falsePositives: count("false-positive"),
    top1: ratio(correct, positives.length),
    precisionWhenNamed: ratio(correct, named),
    wrongRate: ratio(wrong, positives.length),
    wrongOrSiblingRate: ratio(wrong + sibling, positives.length),
    missRate: ratio(miss, positives.length),
    top3: ratio(positives.filter((row) => row.inShown).length, positives.length),
  };
}

const percent = (value: number) => `${(value * 100).toFixed(1)}%`;

/** One plain-text block for a report or a failing test's message. */
export function formatSummary(label: string, summary: PasteEvalSummary): string {
  return [
    `${label}: ${summary.cases} pastes (${summary.positives} with a map, ${summary.negatives} without)`,
    `  right map named (top-1)      ${summary.correct}/${summary.positives}  ${percent(summary.top1)}`,
    `  named map is right           ${percent(summary.precisionWhenNamed)}`,
    `  sibling named instead        ${summary.sibling}  ${percent(summary.sibling / (summary.positives || 1))}`,
    `  wrong map named              ${summary.wrong}  ${percent(summary.wrongRate)}`,
    `  no map named (miss)          ${summary.miss}  ${percent(summary.missRate)}`,
    `  right map among those shown  ${percent(summary.top3)}`,
    `  negatives named as a map     ${summary.falsePositives}/${summary.negatives}`,
  ].join("\n");
}

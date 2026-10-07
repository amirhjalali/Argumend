/**
 * The "What would settle it" contract (round-3 review, issue 4).
 *
 * A settle line names an observation: a data series, a study design, a
 * record that would move informed people on either side. The failures this
 * catches are mechanical, so a test can find them on every map:
 *
 *  - restates:      the line repeats the crux question instead of naming an
 *                   observation ("The core dispute is whether…", "If X… If not…");
 *  - antecedent:    the line opens on a word that points at something the
 *                   reader cannot see ("The same…", "This…");
 *  - duplicate:     two cruxes on one map share a settle line;
 *  - thin:          empty, or too short to name an observation;
 *  - status:        the testability note contradicts the line: a historical
 *                   counterfactual marked as a runnable or already-run test;
 *  - verdict:       the line says one side is right.
 *
 * Pure: no data imports, so the test and the audit script share it.
 * Thresholds are calibrated on the 432 legacy settle lines (see the test).
 */

/** Words too common in this corpus to say anything about a line's content. */
const STOP = new Set([
  "about", "above", "after", "again", "against", "also", "because", "been", "before", "being",
  "between", "both", "could", "does", "each", "either", "even", "from", "have", "into", "just",
  "less", "more", "most", "much", "only", "other", "over", "same", "should", "some", "such",
  "than", "that", "their", "them", "then", "there", "these", "they", "this", "those", "through",
  "under", "very", "were", "what", "when", "where", "whether", "which", "while", "will", "with",
  "within", "would", "your",
]);

/**
 * Content-word stems (first five letters of words of four letters or more),
 * as in the flagship contract, so "program" and "programs" count once.
 */
export function stems(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .split(/[^a-z]+/)
      .filter((word) => word.length >= 4 && !STOP.has(word))
      .map((word) => word.slice(0, 5)),
  );
}

/** Shared stems over the smaller set: 1 when one line is inside the other. */
export function overlap(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let shared = 0;
  for (const stem of a) if (b.has(stem)) shared += 1;
  return shared / Math.min(a.size, b.size);
}

/** Share of the question's stems the settle line repeats. */
export function echo(line: Set<string>, question: Set<string>): number {
  if (question.size === 0) return 0;
  let shared = 0;
  for (const stem of question) if (line.has(stem)) shared += 1;
  return shared / question.size;
}

export const SETTLE_THRESHOLDS = {
  /** A line shorter than this cannot name an observation. */
  minChars: 40,
  /** …nor one with fewer content words than this. */
  minStems: 5,
  /** Two cruxes on a map whose lines share this much are one test twice. */
  duplicate: 0.6,
  /**
   * A line that repeats this share of the crux question's content words is
   * the question again. The question is short (≤ ~110 chars), so a real test
   * that names the same subject still adds its own observation words; a
   * restatement keeps nearly all of them.
   */
  echo: 0.75,
} as const;

/** Openers that point at text the reader of one crux card cannot see. */
const ANTECEDENT = /^(?:the same|same|this|that|these|those|it|such|both|either|here)\b/i;

/**
 * Framings that state the dispute rather than a test: "The core dispute is
 * whether…", "Whether X turns on…", "If X… If not…". Each one was read in
 * the corpus before it was listed here.
 */
const RESTATEMENT_FRAMES: { label: string; pattern: RegExp }[] = [
  { label: "opens on 'Whether'", pattern: /^whether\b/i },
  { label: "asks the question again", pattern: /\?\s*$|^[^.]{0,200}\?(?:\s|$)/ },
  {
    label: "sets out to decide whether, without naming what to observe",
    pattern: /^(?:determin|decid|establish|assess|calculat|measur|estimat|evaluat|test|quantif)\w*\s+(?:\w+ly\s+)?whether\b/i,
  },
  {
    label: "says the crux is whether",
    pattern: /\bthe (?:crux|question|dispute|issue|disagreement|debate) (?:here )?is whether\b/i,
  },
  {
    label: "names the dispute instead of a test",
    pattern:
      /^(?:the\s+)?(?:core|central|key|real|crux|fundamental|underlying|load-bearing|decisive|critical|pivotal|empirical|live)?\s*(?:empirical\s+)?(?:question|dispute|issue|debate|disagreement|crux|test|question at stake)(?:\s*:|\s+(?:is|here is|comes down to|turns on|hinges on|reduces to|centers on|centres on)\b)/i,
  },
  {
    label: "says what the case hinges on instead of what would show it",
    pattern: /^(?:the\s+)?(?:\w+\s+){0,6}?(?:hinges on|turns on|comes down to|depends on|rests on) whether\b/i,
  },
  {
    label: "if-yes / if-no restatement",
    pattern: /\bif (?:the answer is )?(?:yes|no)[,.;]|\bif not,|\bif so,/i,
  },
];

/**
 * Lines that open on a study design ("Compare like-for-like projects…") may
 * share the question's subject words and still name an observation, so the
 * echo rule does not apply to them (the framing rules still do).
 */
const DESIGN_OPENER =
  /^(?:compare|measure|track|run|survey|count|follow|randomi[sz]e|audit|record|publish|release|split|rebuild|decompose|pool|replicate|sequence)\b(?!\s+(?:\w+ly\s+)?whether)/i;

/**
 * A question about a past that did not happen: no test can be run, only
 * evidence that narrows it. Kept to the grammar of a historical
 * counterfactual ("Did X cause Y, or would Y have happened anyway?") and to
 * lines that call themselves one. Causal estimates against a modelled
 * baseline ("what emissions would have been without the tax") are runnable
 * on existing data and are not caught.
 */
const COUNTERFACTUAL_LINE = /\b(?:fundamentally|essentially|inherently|purely) a counterfactual\b|\bcounterfactual (?:question|history)\b/i;
const COUNTERFACTUAL_QUESTION =
  /^(?:did\b[^?]*\bor would\b[^?]*\bhave\b[^?]*\banyway\b|would (?:earlier|an earlier|a later|a different)\b[^?]*\bhave\b)/i;

/**
 * Verdict words: a settle line describes a test, never who won. A line that
 * calls something "proof", says a result "proves" or "proven", or that
 * "this preserves / confirms" a side states the answer instead of the test
 * (round 9: the moon-landing and free-will lines did).
 */
const VERDICT =
  /vindicat\w*|\bproof\b|\bprov(?:es?|en)\b|\bthis (?:preserves|proves|confirms|settles|shows)\b|\b(?:empirically )?refuted\b|\brefutes?\b|\bthe case (?:for [\w-]+ )?(?:is|would be) (?:strong|vindicated|weak|settled)\b|\b(?:skeptics?|supporters?|proponents?|critics?|opponents?|advocates?) (?:are|were|would be) (?:right|wrong|correct)\b|\b(?:wins?|won) the (?:debate|argument)\b|\b(?:case|camp|side|view|story) (?:is|was|are|were) (?:right|wrong|correct|mistaken)\b/i;

/**
 * Questions that are about values by their own words: no observation can
 * settle them, so a runnable-test status is wrong. Kept narrow on purpose;
 * "worth" and "justify" questions mix a measurable part with a weighing and
 * are left to the editor.
 */
const VALUE_QUESTION =
  /\b(?:moral weight|moral obligations?|basic human right|right to exclude|morally (?:right|wrong|permissible|required))\b/i;

export type SettleStatus = "verified" | "theoretical" | "impossible" | "standing";

export interface SettleLineInput {
  /** The line as the page renders it under "What would settle it". */
  line: string;
  /** The crux question the reader sees above it. */
  question: string;
  status: SettleStatus;
}

export interface SettleProblem {
  rule: "thin" | "antecedent" | "restates" | "duplicate" | "status" | "verdict";
  detail: string;
}

/** Problems with one line, read on its own. */
export function settleLineProblems({ line, question, status }: SettleLineInput): SettleProblem[] {
  const problems: SettleProblem[] = [];
  const text = line.trim();
  const own = stems(text);
  if (text.length < SETTLE_THRESHOLDS.minChars || own.size < SETTLE_THRESHOLDS.minStems) {
    problems.push({ rule: "thin", detail: `${text.length} chars, ${own.size} content words` });
  }
  if (ANTECEDENT.test(text)) {
    problems.push({ rule: "antecedent", detail: `opens "${text.split(/\s+/).slice(0, 2).join(" ")}"` });
  }
  const repeated = echo(own, stems(question));
  if (repeated >= SETTLE_THRESHOLDS.echo && !DESIGN_OPENER.test(text)) {
    problems.push({ rule: "restates", detail: `repeats ${Math.round(repeated * 100)}% of the question` });
  }
  for (const { label, pattern } of RESTATEMENT_FRAMES) {
    if (pattern.test(text)) problems.push({ rule: "restates", detail: label });
  }
  if (
    (status === "verified" || status === "theoretical") &&
    (COUNTERFACTUAL_LINE.test(text) || COUNTERFACTUAL_QUESTION.test(question.trim()))
  ) {
    problems.push({ rule: "status", detail: `a counterfactual marked "${status}"` });
  }
  if ((status === "verified" || status === "theoretical") && VALUE_QUESTION.test(question)) {
    problems.push({ rule: "status", detail: `a value question marked "${status}"` });
  }
  if (VERDICT.test(text)) problems.push({ rule: "verdict", detail: "names a side as right" });
  return problems;
}

/** Pairs of cruxes on one map whose settle lines are the same test. */
export function duplicateSettleLines(lines: string[]): [number, number, number][] {
  const sets = lines.map((line) => stems(line));
  const pairs: [number, number, number][] = [];
  for (let i = 0; i < sets.length; i += 1) {
    for (let j = i + 1; j < sets.length; j += 1) {
      const score = overlap(sets[i], sets[j]);
      if (score >= SETTLE_THRESHOLDS.duplicate) pairs.push([i, j, score]);
    }
  }
  return pairs;
}

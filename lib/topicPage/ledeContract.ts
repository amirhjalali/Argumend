/**
 * The opening contract (round-6 review, issue A).
 *
 * A legacy map opens on two lines the reader meets before any crux: the
 * lede under the title (the map's `keystone_fact.statement`, rendered as the
 * page hook) and the summary above the crux sheet (its `simple_case`, joined,
 * rendered as the crux-sheet lede). Both are the site speaking, not a side,
 * so both must leave every crux open. The failures this catches are
 * mechanical, so a test can find them on every map:
 *
 *  - poll:    an expert-poll, consensus or agreement percentage ("~82%
 *             against"), or a head-count of experts ("one of roughly 40");
 *  - verdict: phrasing that closes the question or dismisses one side's
 *             crux ("economists broadly judge it…", "no longer really about
 *             safety", "reliably lowers rents", "the crash didn't arrive");
 *  - answers: a sentence that asserts an answer to one of the map's own
 *             listed crux questions (content-word overlap with the question
 *             plus an assertive verb, and no framing of it as open).
 *
 * Pure: no data imports, so the test and any audit script share it.
 * Calibrated on the 110 legacy maps that carry these fields (see the test).
 */
import { echo, stems } from "./settleContract";

export type LedeField = "lede" | "summary";

export interface LedeProblem {
  rule: "poll" | "verdict" | "answers";
  detail: string;
}

/**
 * Sentences of a paragraph. Splits at . ! ? followed by a capital or a
 * digit, never after a one-letter initial or a common abbreviation.
 */
export function sentences(text: string): string[] {
  const out: string[] = [];
  const boundary = /([.!?])(["”’)]?)\s+(?=["“‘(]?[A-Z0-9])/g;
  const abbreviation = /(?:\b[A-Z]|\b(?:vs|etc|e\.g|i\.e|Dr|Mr|Mrs|Ms|St|No|Inc|Jr|Sr|Co|Corp|Gov|Sen|Rep|approx|U\.S|U\.K|U\.N|al))$/;
  let start = 0;
  let match: RegExpExecArray | null;
  while ((match = boundary.exec(text)) !== null) {
    const end = match.index + match[1].length + match[2].length;
    if (match[1] === "." && abbreviation.test(text.slice(start, match.index))) continue;
    out.push(text.slice(start, end).trim());
    start = end;
  }
  const rest = text.slice(start).trim();
  if (rest) out.push(rest);
  return out;
}

/**
 * Poll and consensus figures. A share of experts, economists, scientists or
 * a panel ("82% of economists", "a panel… came down ~82% against"), a
 * head-count of them ("one of roughly 40", "97% consensus"), or a percentage
 * attached to agreement words.
 */
const POLL: { label: string; pattern: RegExp }[] = [
  {
    label: "a share of experts",
    pattern:
      /\d+(?:\.\d+)?\s?%\s+(?:of\s+)?(?:\w+\s+){0,3}?(?:economists|experts|scientists|researchers|physicians|doctors|climatologists|historians|scholars|panel(?:ists)?|respondents)\b/i,
  },
  {
    label: "a panel's vote",
    pattern: /\b(?:panel|survey|poll)\b[^.]{0,80}?\b(?:came down|voted|agreed|disagreed|sided)\b[^.]{0,20}?\d+\s?%/i,
  },
  {
    label: "a percentage of agreement",
    pattern: /\d+\s?%\s+(?:consensus|agree(?:ment|d|s)?|against|in favou?r|disagree(?:ment|d|s)?)\b|\b(?:consensus|agreement)\s+(?:of|at)\s+(?:about\s+|roughly\s+|~)?\d+\s?%/i,
  },
  {
    label: "an expert survey's percentage",
    pattern:
      /\b(?:survey|poll|panel)\b[^.]{0,120}?\b(?:economists|experts|scientists|researchers|philosophers|physicians|doctors)\b[^.]*?\d+(?:\.\d+)?\s?%|\b(?:economists|experts|scientists|researchers|philosophers)\b[^.]{0,80}?\b(?:survey|poll|panel)\b[^.]*?\d+(?:\.\d+)?\s?%/i,
  },
  {
    label: "a head-count of experts",
    pattern:
      /\b(?:one|two|three|\d+)\s+(?:of|out of|in)\s+(?:roughly\s+|about\s+|some\s+|nearly\s+|~)?\d+\s+(?:\w+\s+)?(?:economists|experts|scientists|panel(?:ists)?|members|respondents)?\s*(?:agree|agreeing|dissent|dissenting|disagree|disagreeing)\b/i,
  },
];

/**
 * Verdict phrasing: the opening says which way a question came out, or that
 * one side's question is not the real one. Each pattern was read against the
 * corpus before it was listed here.
 */
const VERDICT: { label: string; pattern: RegExp }[] = [
  { label: "says experts judge it", pattern: /\b(?:broadly|generally|largely|overwhelmingly)\s+(?:judge|agree|conclude|find|reject|accept)\b|\bjudge it\b/i },
  { label: "says the debate is no longer about one side's question", pattern: /\bno longer (?:really )?(?:about|a (?:question|debate) (?:of|about))\b|\bisn'?t really about\b|\bnot really about\b/i },
  { label: "names the real fight against one side", pattern: /\bnot \w+,? is the real (?:fight|debate|question)\b|,\s*not [\w\s-]{1,30},\s*(?:is|was) the real\b/i },
  { label: "says a disputed effect is reliable", pattern: /\breliably (?:lowers?|raises?|reduces?|increases?|improves?|worsens?|cuts?|helps?|hurts?|works?|fails?|causes?)\b/i },
  { label: "says a predicted outcome did not happen", pattern: /\b(?:didn'?t|did not|never) (?:arrive|happen|materiali[sz]e|come)\b/i },
  { label: "calls a question settled", pattern: /\b(?:is|are|was|were|now|largely|unusually|essentially|effectively|long been)\s+settled\b|\bsettled (?:science|question|fact)\b/i },
  { label: "calls a claim debunked", pattern: /\bdebunk(?:ed|s)?\b/i },
  { label: "says the evidence shows", pattern: /\bthe (?:evidence|data|research|science|literature) (?:clearly |now |consistently |overwhelmingly )?(?:shows|proves|demonstrates|confirms|is clear)\b/i },
  { label: "claims a consensus", pattern: /\bconsensus\b/i },
  {
    label: "answers in parentheses",
    pattern: /\((?:yes|no|(?:it|they|this|that)\s+(?:\w+ly\s+)?(?:does|do|did|is|are|can|was|were|will|has|have|isn'?t|aren'?t|doesn'?t|don'?t|didn'?t|can'?t|cannot|won'?t)\b[^)]{0,40})\)/i,
  },
  { label: "says the honest debate isn't the question", pattern: /\b(?:honest|real|serious) (?:debate|question|fight) (?:isn'?t|is not)\b/i },
  {
    label: "corrects the reader",
    pattern:
      /\b(?:most |many )?(?:people|americans|shoppers|buyers) (?:routinely )?(?:assume|picture|blame|believe|imagine|guess)\b|\b(?:the (?:exact )?)?opposite of what\b|\b(?:roughly|close to|nearly|essentially|basically) a free lunch\b|\b(?:the|a) myth\b|\bmyth-correcting\b|\bthe popular (?:story|verdict|claim|belief)\b|\bcounterintuitive\b|\bsurprising (?:truth|finding)\b|\bthe real surprise\b|\bthe (?:headline|big) fear\b|\b(?:found|says|finds) the opposite\b/i,
  },
  {
    label: "gives the site's own answer",
    pattern: /\bthe (?:honest|careful|more careful) (?:position|takeaway|lesson|answer|verdict|conclusion|counterpoint|truth)\b/i,
  },
  {
    label: "dismisses one question for another",
    pattern:
      /\b(?:isn'?t|is not|aren'?t|are not|is (?:overwhelmingly|largely|mostly) not)\b[^.;:?]{3,140}?(?:;|:|—|–)\s*(?:it'?s|it is|they'?re|they are)\b|\b(?:isn'?t|is not) the \w+[^.;:?]{0,60}?\bbut\b/i,
  },
  {
    label: "declares a winner",
    pattern: /\b(?:demonstrably|decisively|unambiguous(?:ly)?|indisputabl[ey]|undeniabl[ey]|beyond (?:doubt|dispute))\b|\bevidence (?:does not|doesn'?t) support\b/i,
  },
];

/**
 * Words that frame a sentence as the open question rather than an answer:
 * a sentence that names the dispute, hedges, or reports one side's view is
 * not the site asserting an answer. Nor is one that reports what both sides
 * already accept (the map's common ground): agreement is not a verdict.
 */
const OPEN_FRAME =
  /\bwhether\b|\?|\b(?:debate|dispute|disagree\w*|contested|fight|argue[sd]?|arguments?|critics?|supporters?|proponents?|opponents?|skeptics?|advocates?|unclear|uncertain|unknown|open question|turns on|hinges on|depends on|may|might|could|if|both sides|both camps|neither side)\b/i;

/**
 * Verbs that make a sentence a claim about the world's answer: causal and
 * evidential verbs in the present or past, as a crux answer would use.
 */
const ASSERTIVE =
  /\b(?:lowers?|lowered|raises?|raised|reduces?|reduced|increases?|increased|shrinks?|shrank|cuts?|causes?|caused|prevents?|prevented|works?|worked|fails?|failed|outweighs?|improves?|improved|worsens?|worsened|drives?|drove|beats?|shows?|showed|shown|found|finds|proves?|proved|avoids?|avoided|succeeded|succeeds|forces?|forced|keeps?|kept|deepens?|is|are|was|were|does|do|did)\b/i;

export const LEDE_THRESHOLDS = {
  /**
   * A sentence that repeats this share of a crux question's content words
   * is about that crux; with an assertive verb and no open framing it is
   * answering it.
   */
  cruxEcho: 0.5,
  /** …and at least this many of the question's content words. */
  minShared: 3,
} as const;

export interface LedeInput {
  field: LedeField;
  text: string;
  /** The crux questions the page lists under it. */
  cruxQuestions: string[];
}

/** Problems with one lede or summary, read against its own map's cruxes. */
export function ledeProblems({ text, cruxQuestions }: LedeInput): LedeProblem[] {
  const problems: LedeProblem[] = [];
  for (const { label, pattern } of POLL) {
    const hit = text.match(pattern);
    if (hit) problems.push({ rule: "poll", detail: `${label}: "${hit[0]}"` });
  }
  for (const { label, pattern } of VERDICT) {
    const hit = text.match(pattern);
    if (hit) problems.push({ rule: "verdict", detail: `${label}: "${hit[0]}"` });
  }
  const questions = cruxQuestions.map((question) => ({ question, set: stems(question) }));
  for (const sentence of sentences(text)) {
    if (OPEN_FRAME.test(sentence) || !ASSERTIVE.test(sentence)) continue;
    const own = stems(sentence);
    for (const { question, set } of questions) {
      const share = echo(own, set);
      const shared = Math.round(share * set.size);
      if (share >= LEDE_THRESHOLDS.cruxEcho && shared >= LEDE_THRESHOLDS.minShared) {
        problems.push({
          rule: "answers",
          detail: `${Math.round(share * 100)}% of "${question}" in "${sentence}"`,
        });
      }
    }
  }
  return problems;
}

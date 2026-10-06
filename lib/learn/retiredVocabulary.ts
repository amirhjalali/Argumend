/**
 * The product's retired scoring vocabulary, as phrases (r3 review issue #9).
 *
 * The 2026-09-29 overhaul retired side scores, card scores, "pillars",
 * verdicts and the judge council from the interface. Copy guards (Learn in
 * lib/learn/vocabulary.guard.test.ts, /about in app/storyPages.test.tsx)
 * fail if any reachable copy brings them back.
 *
 * The patterns are phrases, not bare words: "weight", "score", "verdict" and
 * "winner" all have honest uses ("weighing evidence", "a Brier score", "the
 * map won't give you a verdict"), and a fallacy may well be named after one.
 */
export const RETIRED_VOCABULARY: { name: string; pattern: RegExp }[] = [
  { name: "pillars", pattern: /\bpillars?\b/i },
  { name: "balance and weight", pattern: /\bbalance\s*(and|&)\s*weight\b|\bbalance from weight\b/i },
  {
    name: "a score for evidence, a side or a card",
    pattern: /\b(balance|weight|evidence|confidence|card|strength|reliability|replicability|directness|independence) scores?\b/i,
  },
  { name: "the 0–40 card score", pattern: /\bout of 40\b|\b\d+\s*\/\s*40\b|score of 40\b|scored (from )?0\s*(to|-|–)\s*10\b/i },
  { name: "the balance formula", pattern: /\b(for|against)Strength\b/ },
  {
    name: "the old card words",
    pattern: /\bEstablished, Strong\b|\brated (Established|Strong|Contested|Thin)\b/,
  },
  {
    name: "the judge council",
    pattern: /\bjudg(e|ing) council\b|\bcouncil of (AI )?judges\b|\bfour-judge\b|\bmulti-(model|judge) (judg|council)|\bAI judges?\b/i,
  },
  { name: "verdicts as a feature", pattern: /\bverdict (matrix|card|panel)\b|\bthe map'?s verdict\b|\bAI verdicts?\b/i },
  {
    name: "the old crux status trio",
    pattern: /\bverified\b[^.]{0,80}\btheoretical\b[^.]{0,80}\bimpossible\b/i,
  },
  { name: "links to retired idea pages", pattern: /\/concepts\/(pillars|confidence-calibration)\b/ },
];

/** Every retired term `text` uses, as "name ("match")". */
export function retiredTermsIn(text: string): string[] {
  const hits: string[] = [];
  for (const { name, pattern } of RETIRED_VOCABULARY) {
    const match = text.match(pattern);
    if (match) hits.push(`${name} ("${match[0]}")`);
  }
  return hits;
}

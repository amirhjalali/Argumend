import type { DisagreementReportV1, DisagreementType } from "@/types/disagreement";
import type { EpistemicType } from "@/types/argument";
import type { DebateGroundTruth } from "./renderDebate";

/**
 * Scores what a source-only diagnosis recovered against the map it was rendered
 * from.
 *
 * These are signals for a human reviewer, not a verdict. Lexical overlap can
 * only show that the recovered crux talks about the same subject matter as the
 * map's crux; whether it is the same question is a judgement the founder
 * checkpoint makes. Nothing here should be reported as accuracy.
 */

export interface MapRecoveryScore {
  id: string;
  /** Positions found, against the number the map carries. */
  recoveredPositionCount: number;
  truthPositionCount: number;
  /** True when a map with more than two positions was not flattened to two. */
  preservedMultiplePositions: boolean;
  /** True when the diagnosis invented more positions than the map holds. */
  overProducedPositions: boolean;
  /** Best content-word overlap between a recovered crux and a map crux, 0..1. */
  cruxLexicalOverlap: number;
  bestCruxPairing?: { recovered: string; truth: string };
  /** Whether the top recovered crux type is compatible with the map's crux. */
  cruxTypeCompatible: boolean;
  recoveredCruxType?: DisagreementType;
  truthCruxEpistemicType?: EpistemicType;
  groundingCoverage: number;
  pattern: string;
  warnings: string[];
}

const STOP_WORDS = new Set([
  "the", "a", "an", "and", "or", "but", "if", "then", "than", "that", "this", "those", "these",
  "is", "are", "was", "were", "be", "been", "being", "to", "of", "in", "on", "for", "with", "as",
  "by", "at", "from", "it", "its", "not", "no", "do", "does", "did", "will", "would", "can",
  "could", "should", "may", "might", "must", "have", "has", "had", "what", "which", "who", "whom",
  "how", "why", "when", "where", "whether", "true", "about", "more", "most", "some", "any", "all",
  "there", "their", "they", "them", "we", "you", "i", "he", "she", "his", "her", "our", "your",
]);

export function contentWords(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 2 && !STOP_WORDS.has(word))
      // Fold simple plurals so "wages"/"wage" and "workers"/"worker" align.
      .map((word) => (word.length > 4 && word.endsWith("s") && !word.endsWith("ss") ? word.slice(0, -1) : word)),
  );
}

/**
 * Overlap relative to the shorter text. A crux question is usually far shorter
 * than the map claim it corresponds to, so Jaccard would understate a genuine
 * match purely because the claim carries more qualifying detail.
 */
export function overlapRatio(a: string, b: string): number {
  const left = contentWords(a);
  const right = contentWords(b);
  if (left.size === 0 || right.size === 0) return 0;
  let shared = 0;
  for (const word of left) {
    if (right.has(word)) shared += 1;
  }
  return shared / Math.min(left.size, right.size);
}

const COMPATIBLE_TYPES: Record<EpistemicType, DisagreementType[]> = {
  // A map claim about the world is recovered as either a fact or a cause
  // dispute depending on how the speakers framed it; both are faithful.
  empirical: ["empirical", "causal"],
  predictive: ["predictive", "causal"],
  normative: ["normative", "priority"],
  definitional: ["definitional"],
  procedural: ["procedural", "priority"],
};

export function scoreMapRecovery(input: {
  report: DisagreementReportV1;
  truth: DebateGroundTruth;
}): MapRecoveryScore {
  const { report, truth } = input;
  const recoveredCruxQuestions = report.cruxes.map((crux) => crux.question);

  let cruxLexicalOverlap = 0;
  let bestCruxPairing: { recovered: string; truth: string } | undefined;
  // Track which pair won so the type check below describes the same comparison
  // the overlap number describes, rather than silently scoring a different pair.
  let bestRecoveredIndex = 0;
  let bestTruthIndex = 0;
  recoveredCruxQuestions.forEach((recovered, recoveredIndex) => {
    truth.cruxStatements.forEach((truthStatement, truthIndex) => {
      const score = overlapRatio(recovered, truthStatement);
      if (score > cruxLexicalOverlap) {
        cruxLexicalOverlap = score;
        bestCruxPairing = { recovered, truth: truthStatement };
        bestRecoveredIndex = recoveredIndex;
        bestTruthIndex = truthIndex;
      }
    });
  });

  const recoveredCruxType = report.cruxes[bestRecoveredIndex]?.type;
  const truthCruxEpistemicType = truth.cruxEpistemicTypes[bestTruthIndex];
  const cruxTypeCompatible = Boolean(
    recoveredCruxType &&
      truthCruxEpistemicType &&
      COMPATIBLE_TYPES[truthCruxEpistemicType].includes(recoveredCruxType),
  );

  return {
    id: truth.topicId,
    recoveredPositionCount: report.positions.length,
    truthPositionCount: truth.positionCount,
    preservedMultiplePositions: truth.positionCount <= 2 || report.positions.length > 2,
    overProducedPositions: report.positions.length > truth.positionCount,
    cruxLexicalOverlap: Number(cruxLexicalOverlap.toFixed(3)),
    bestCruxPairing,
    cruxTypeCompatible,
    recoveredCruxType,
    truthCruxEpistemicType,
    groundingCoverage: report.quality.groundingCoverage,
    pattern: report.diagnosis.pattern,
    warnings: report.quality.warnings,
  };
}

export function summarizeRecovery(scores: MapRecoveryScore[]): {
  count: number;
  meanCruxOverlap: number;
  meanGroundingCoverage: number;
  preservedMultiplePositions: number;
  overProducedPositions: number;
  cruxTypeCompatible: number;
} {
  const count = scores.length;
  const mean = (pick: (score: MapRecoveryScore) => number) =>
    count === 0 ? 0 : Number((scores.reduce((sum, score) => sum + pick(score), 0) / count).toFixed(3));

  return {
    count,
    meanCruxOverlap: mean((score) => score.cruxLexicalOverlap),
    meanGroundingCoverage: mean((score) => score.groundingCoverage),
    preservedMultiplePositions: scores.filter((score) => score.preservedMultiplePositions).length,
    overProducedPositions: scores.filter((score) => score.overProducedPositions).length,
    cruxTypeCompatible: scores.filter((score) => score.cruxTypeCompatible).length,
  };
}

/**
 * Judge Scoring Rubric
 *
 * Defines the evaluation criteria and scoring system
 * used by the AI judge council to assess debates.
 */

import type { LLMModel } from "@/types/logic";

/**
 * A single dimension of the scoring rubric
 */
export interface RubricDimension {
  /** Unique identifier for this dimension */
  id: string;
  /** Display name */
  name: string;
  /** Description of what this dimension measures */
  description: string;
  /** Weight in final score calculation (0-1, sum should equal 1) */
  weight: number;
  /** Scoring guidelines for each level */
  guidelines: {
    low: string; // 1-3
    medium: string; // 4-6
    high: string; // 7-10
  };
}

/**
 * Score for a single dimension from a single judge
 */
export interface DimensionScore {
  /** ID of the rubric dimension */
  dimensionId: string;
  /** Score from 1-10 */
  score: number;
  /** Judge's reasoning for this score */
  reasoning: string;
  /** Specific examples from the text that support this score */
  examples?: string[];
}

/**
 * Complete score from a single judge for one side
 */
export interface JudgeScore {
  /** Which side this score is for */
  side: "for" | "against";
  /** Scores for each dimension */
  dimensions: DimensionScore[];
  /** Weighted total score (calculated from dimensions) */
  totalScore: number;
  /** Overall assessment summary */
  summary: string;
  /** Judge's confidence in their assessment (0-1) */
  confidence: number;
}

/**
 * Complete verdict from a single judge
 */
export interface JudgeVerdict {
  /** ID of the judge agent */
  judgeId: string;
  /** Display name of the judge */
  judgeName: string;
  /** Model used by this judge */
  model: LLMModel;
  /** Scores for the "for" side */
  forScore: JudgeScore;
  /** Scores for the "against" side */
  againstScore: JudgeScore;
  /** Which side the judge thinks won */
  winner: "for" | "against" | "draw";
  /** Overall reasoning for the verdict */
  overallReasoning: string;
  /** Time taken for this judge to evaluate */
  latencyMs?: number;
}

/**
 * Aggregated result from all judges
 */
export interface JudgingResult {
  /** Individual verdicts from each judge */
  verdicts: JudgeVerdict[];
  /** Consensus winner (if any) */
  winner: "for" | "against" | "draw" | null;
  /** Whether judges reached consensus */
  hasConsensus: boolean;
  /** Aggregated scores for each side */
  aggregatedScores: {
    for: {
      average: number;
      byDimension: Record<string, number>;
    };
    against: {
      average: number;
      byDimension: Record<string, number>;
    };
  };
  /** Dimensions with high disagreement (>3 point spread) */
  disagreements: {
    dimensionId: string;
    dimensionName: string;
    spread: number;
    scores: { judgeId: string; score: number }[];
  }[];
  /** Whether manual review is recommended */
  flaggedForReview: boolean;
  /** Timestamp of the judgment */
  timestamp: number;
}

/**
 * The default scoring rubric for debate evaluation
 */
export const DEFAULT_RUBRIC: RubricDimension[] = [
  {
    id: "logical-validity",
    name: "Logical Validity",
    description: "Sound reasoning without fallacies, valid argument structure",
    weight: 0.25,
    guidelines: {
      low: "Contains multiple logical fallacies, non-sequiturs, or contradictory claims",
      medium: "Generally sound logic with minor fallacies or weak connections",
      high: "Rigorous logical structure, valid inferences, no significant fallacies",
    },
  },
  {
    id: "evidence-quality",
    name: "Evidence Quality",
    description: "Claims supported with credible sources and data",
    weight: 0.25,
    guidelines: {
      low: "Unsupported claims, appeals to authority without evidence, anecdotal only",
      medium: "Some evidence provided but incomplete or not fully relevant",
      high: "Strong evidence from credible sources, data-driven, well-cited",
    },
  },
  {
    id: "rebuttal-strength",
    name: "Rebuttal Strength",
    description: "Effectively addresses and refutes opponent's arguments",
    weight: 0.2,
    guidelines: {
      low: "Ignores opponent's points or uses strawman arguments",
      medium: "Addresses some points but misses key arguments or rebuttals are weak",
      high: "Directly engages with and effectively counters opponent's strongest points",
    },
  },
  {
    id: "crux-identification",
    name: "Crux Identification",
    description: "Identifies and focuses on core disagreements",
    weight: 0.15,
    guidelines: {
      low: "Focuses on peripheral issues, misses the core disagreement",
      medium: "Partially identifies cruxes but doesn't fully explore them",
      high: "Clearly articulates the fundamental disagreement and why it matters",
    },
  },
  {
    id: "clarity",
    name: "Clarity",
    description: "Well-structured, understandable presentation",
    weight: 0.15,
    guidelines: {
      low: "Disorganized, unclear, or difficult to follow",
      medium: "Generally understandable but could be better organized",
      high: "Crystal clear structure, easy to follow, precise language",
    },
  },
];

/**
 * Calculate weighted total score from dimension scores
 */
export function calculateTotalScore(
  dimensions: DimensionScore[],
  rubric: RubricDimension[] = DEFAULT_RUBRIC
): number {
  let total = 0;
  let totalWeight = 0;

  for (const dim of dimensions) {
    const rubricDim = rubric.find((r) => r.id === dim.dimensionId);
    if (rubricDim) {
      total += dim.score * rubricDim.weight;
      totalWeight += rubricDim.weight;
    }
  }

  // Normalize to 10-point scale if weights don't sum to 1
  return totalWeight > 0 ? (total / totalWeight) * 10 : 0;
}

/**
 * Check if there's significant disagreement on a dimension
 */
export function hasSignificantDisagreement(scores: number[]): boolean {
  if (scores.length < 2) return false;
  const max = Math.max(...scores);
  const min = Math.min(...scores);
  return max - min > 3;
}

/**
 * Determine winner based on scores
 */
export function determineWinner(
  forScore: number,
  againstScore: number,
  threshold: number = 0.5
): "for" | "against" | "draw" {
  const diff = forScore - againstScore;
  if (Math.abs(diff) < threshold) return "draw";
  return diff > 0 ? "for" : "against";
}

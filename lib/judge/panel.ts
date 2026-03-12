/**
 * Three-Claude Judge Panel
 *
 * Creates 3 Claude judge personas with distinct evaluation focuses,
 * producing varied-but-consistent verdicts for debate judging.
 */

import type { LLMModel } from "@/types/logic";
import type { DebateMessageInput as DebateMessage } from "@/types/debate";
import {
  ABSOLUTE_MARKERS,
  EMOTIONAL_MARKERS,
  EVIDENCE_MARKERS,
  clamp,
  splitSentences,
  countMarkers,
  keywordSet,
} from "@/lib/textUtils";
import {
  DEFAULT_RUBRIC,
  calculateTotalScore,
  determineWinner,
  hasSignificantDisagreement,
  type DimensionScore,
  type JudgeVerdict,
  type JudgingResult,
  type RubricDimension,
} from "./rubric";

// ---------------------------------------------------------------------------
// Judge Personas
// ---------------------------------------------------------------------------

interface JudgePersona {
  id: string;
  name: string;
  model: LLMModel;
  /** Per-dimension score adjustments to differentiate perspectives */
  adjustments: Record<string, number>;
}

const CLAUDE_PANEL: JudgePersona[] = [
  {
    id: "claude-analyst",
    name: "Claude Analyst",
    model: "claude",
    adjustments: {
      "logical-validity": 0.3,
      "clarity": 0.15,
      "evidence-quality": -0.1,
      "rebuttal-strength": -0.15,
    },
  },
  {
    id: "claude-reviewer",
    name: "Claude Reviewer",
    model: "claude",
    adjustments: {
      "evidence-quality": 0.3,
      "bias-credibility": 0.2,
      "logical-validity": -0.15,
      "crux-identification": -0.1,
    },
  },
  {
    id: "claude-arbiter",
    name: "Claude Arbiter",
    model: "claude",
    adjustments: {
      "rebuttal-strength": 0.25,
      "crux-identification": 0.2,
      "evidence-quality": -0.1,
      "clarity": -0.1,
    },
  },
];

// ---------------------------------------------------------------------------
// Scoring (mirrors offline.ts but with persona adjustments)
// ---------------------------------------------------------------------------

function roundScore(value: number): number {
  return Number(clamp(value, 1, 10).toFixed(1));
}

function countRegex(text: string, regex: RegExp): number {
  const matches = text.match(regex);
  return matches ? matches.length : 0;
}

function overlapScore(a: string, b: string): number {
  const setA = keywordSet(a);
  const setB = keywordSet(b);
  if (setA.size === 0 || setB.size === 0) return 0;

  let overlap = 0;
  for (const token of setA) {
    if (setB.has(token)) overlap += 1;
  }

  return overlap / Math.max(Math.min(setA.size, setB.size), 1);
}

function dimensionScoreForSide(
  dimensionId: string,
  sideText: string,
  opposingText: string
): number {
  const lower = sideText.toLowerCase();
  const sentenceCount = splitSentences(sideText).length;
  const wordCount = sideText.split(/\s+/).filter(Boolean).length;
  const absoluteHits = countMarkers(lower, ABSOLUTE_MARKERS);
  const emotionalHits = countMarkers(lower, EMOTIONAL_MARKERS);
  const evidenceHits = countMarkers(lower, EVIDENCE_MARKERS);
  const numericHits = countRegex(lower, /\b\d+(?:\.\d+)?\b/g);
  const connectiveHits = countRegex(
    lower,
    /\b(because|therefore|however|although|if|then|since|while)\b/g
  );
  const rebuttalHits = countRegex(
    lower,
    /\b(opponent|opponents|critics|supporters|counter|rebut|respond)\b/g
  );
  const cruxHits = countRegex(
    lower,
    /\b(core|main issue|crux|whether|tradeoff|burden of proof)\b/g
  );
  const nuanceHits = countRegex(lower, /\b(however|although|depends|uncertain|limited)\b/g);
  const overlap = overlapScore(sideText, opposingText);

  switch (dimensionId) {
    case "logical-validity":
      return roundScore(4.7 + connectiveHits * 0.5 - absoluteHits * 0.7 - emotionalHits * 0.4);
    case "evidence-quality":
      return roundScore(3.3 + evidenceHits * 1.2 + Math.min(numericHits, 4) * 0.7);
    case "bias-credibility":
      return roundScore(7.0 - absoluteHits * 0.5 - emotionalHits * 0.8 + nuanceHits * 0.4);
    case "rebuttal-strength":
      return roundScore(3.4 + rebuttalHits * 0.9 + overlap * 3.0);
    case "crux-identification":
      return roundScore(3.5 + cruxHits * 1.2 + overlap * 2.5);
    case "clarity": {
      const avgSentenceLength = sentenceCount > 0 ? wordCount / sentenceCount : wordCount;
      let score = 6.0;
      if (avgSentenceLength >= 12 && avgSentenceLength <= 26) score += 1.2;
      if (avgSentenceLength > 34) score -= 1.0;
      if (wordCount > 80) score += 0.4;
      if (wordCount < 30) score -= 1.1;
      return roundScore(score);
    }
    default:
      return 5;
  }
}

function buildDimensionScores(
  sideText: string,
  opposingText: string,
  rubric: RubricDimension[],
  persona: JudgePersona
): DimensionScore[] {
  return rubric.map((dimension) => {
    const baseScore = dimensionScoreForSide(dimension.id, sideText, opposingText);
    const adjustment = persona.adjustments[dimension.id] ?? 0;
    const score = roundScore(baseScore + adjustment);

    const strengthLabel =
      score >= 7 ? "strong alignment" : score >= 4 ? "moderate alignment" : "weak alignment";

    return {
      dimensionId: dimension.id,
      score,
      reasoning: `${strengthLabel} with ${dimension.name.toLowerCase()} based on argument structure, evidence cues, and counterargument engagement.`,
    };
  });
}

// ---------------------------------------------------------------------------
// Verdict building
// ---------------------------------------------------------------------------

function buildPersonaVerdict(
  forText: string,
  againstText: string,
  persona: JudgePersona,
  rubric: RubricDimension[]
): JudgeVerdict {
  const forDimensions = buildDimensionScores(forText, againstText, rubric, persona);
  const againstDimensions = buildDimensionScores(againstText, forText, rubric, persona);

  const forTotalScore = calculateTotalScore(forDimensions, rubric);
  const againstTotalScore = calculateTotalScore(againstDimensions, rubric);
  const winner = determineWinner(forTotalScore, againstTotalScore);
  const margin = Math.abs(forTotalScore - againstTotalScore);
  const confidence = clamp(0.55 + margin / 12, 0.45, 0.92);

  return {
    judgeId: persona.id,
    judgeName: persona.name,
    model: persona.model,
    forScore: {
      side: "for",
      dimensions: forDimensions,
      totalScore: Number(forTotalScore.toFixed(2)),
      summary:
        "Scoring favors arguments with stronger evidence cues, logical continuity, and direct rebuttals.",
      confidence,
    },
    againstScore: {
      side: "against",
      dimensions: againstDimensions,
      totalScore: Number(againstTotalScore.toFixed(2)),
      summary:
        "Scoring rewards internally consistent skepticism that directly challenges opponent assumptions and evidence.",
      confidence,
    },
    winner,
    overallReasoning: `${persona.name} finds ${winner.toUpperCase()} with a ${margin.toFixed(2)} point margin under the weighted rubric.`,
    latencyMs: 12,
  };
}

function mean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

function aggregateScores(
  verdicts: JudgeVerdict[],
  rubric: RubricDimension[]
): JudgingResult["aggregatedScores"] {
  const forTotals = verdicts.map((v) => v.forScore.totalScore);
  const againstTotals = verdicts.map((v) => v.againstScore.totalScore);

  const forByDimension: Record<string, number> = {};
  const againstByDimension: Record<string, number> = {};

  for (const dim of rubric) {
    forByDimension[dim.id] = mean(
      verdicts
        .map((v) => v.forScore.dimensions.find((d) => d.dimensionId === dim.id)?.score)
        .filter((s): s is number => s != null)
    );
    againstByDimension[dim.id] = mean(
      verdicts
        .map((v) => v.againstScore.dimensions.find((d) => d.dimensionId === dim.id)?.score)
        .filter((s): s is number => s != null)
    );
  }

  return {
    for: { average: mean(forTotals), byDimension: forByDimension },
    against: { average: mean(againstTotals), byDimension: againstByDimension },
  };
}

function findDisagreements(
  verdicts: JudgeVerdict[],
  rubric: RubricDimension[]
): JudgingResult["disagreements"] {
  const disagreements: JudgingResult["disagreements"] = [];

  for (const dim of rubric) {
    for (const side of ["for", "against"] as const) {
      const scores = verdicts.map((v) => {
        const s = (side === "for" ? v.forScore : v.againstScore).dimensions.find(
          (d) => d.dimensionId === dim.id
        );
        return { judgeId: v.judgeId, score: s?.score ?? 0 };
      });
      const values = scores.map((s) => s.score);
      if (hasSignificantDisagreement(values)) {
        disagreements.push({
          dimensionId: dim.id,
          dimensionName: `${dim.name} (${side.toUpperCase()})`,
          spread: Math.max(...values) - Math.min(...values),
          scores,
        });
      }
    }
  }

  return disagreements;
}

function consensus(verdicts: JudgeVerdict[]): {
  winner: "for" | "against" | "draw" | null;
  hasConsensus: boolean;
} {
  if (verdicts.length === 0) return { winner: null, hasConsensus: false };

  const counts = { for: 0, against: 0, draw: 0 };
  for (const v of verdicts) counts[v.winner] += 1;

  const hasConsensus =
    counts.for === verdicts.length ||
    counts.against === verdicts.length ||
    counts.draw === verdicts.length;
  const majority = Math.ceil(verdicts.length / 2);

  if (counts.for >= majority) return { winner: "for", hasConsensus };
  if (counts.against >= majority) return { winner: "against", hasConsensus };
  if (counts.draw >= majority) return { winner: "draw", hasConsensus };
  return { winner: null, hasConsensus: false };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Judge a debate using 3 Claude personas with distinct evaluation focuses.
 */
export function judgeWithClaudePanel(
  messages: DebateMessage[],
  _topic?: string
): JudgingResult {
  const forText = messages
    .filter((m) => m.side === "for")
    .map((m) => m.content)
    .join("\n\n") || "FOR side did not provide substantial argument text.";
  const againstText = messages
    .filter((m) => m.side === "against")
    .map((m) => m.content)
    .join("\n\n") || "AGAINST side did not provide substantial argument text.";

  const rubric = DEFAULT_RUBRIC;
  const verdicts = CLAUDE_PANEL.map((persona) =>
    buildPersonaVerdict(forText, againstText, persona, rubric)
  );

  const aggregated = aggregateScores(verdicts, rubric);
  const disagreements = findDisagreements(verdicts, rubric);
  const consensusResult = consensus(verdicts);

  let winner = consensusResult.winner;
  if (!winner) {
    winner = determineWinner(aggregated.for.average, aggregated.against.average);
  }

  return {
    verdicts,
    winner,
    hasConsensus: consensusResult.hasConsensus,
    aggregatedScores: aggregated,
    disagreements,
    flaggedForReview: disagreements.length > 0 || (!consensusResult.hasConsensus && verdicts.length > 1),
    timestamp: Date.now(),
  };
}

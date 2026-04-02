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

/**
 * Generate dimension-specific reasoning based on the dimension ID,
 * the computed score, and actual textual metrics from the side's arguments.
 */
function dimensionReasoning(
  dimensionId: string,
  score: number,
  sideText: string,
  opposingText: string
): string {
  const lower = sideText.toLowerCase();
  const sentenceCount = splitSentences(sideText).length;
  const wordCount = sideText.split(/\s+/).filter(Boolean).length;
  const connectiveHits = countRegex(
    lower,
    /\b(because|therefore|however|although|if|then|since|while)\b/g
  );
  const absoluteHits = countMarkers(lower, ABSOLUTE_MARKERS);
  const evidenceHits = countMarkers(lower, EVIDENCE_MARKERS);
  const numericHits = countRegex(lower, /\b\d+(?:\.\d+)?\b/g);
  const emotionalHits = countMarkers(lower, EMOTIONAL_MARKERS);
  const nuanceHits = countRegex(lower, /\b(however|although|depends|uncertain|limited)\b/g);
  const rebuttalHits = countRegex(
    lower,
    /\b(opponent|opponents|critics|supporters|counter|rebut|respond)\b/g
  );
  const cruxHits = countRegex(
    lower,
    /\b(core|main issue|crux|whether|tradeoff|burden of proof)\b/g
  );
  const overlap = overlapScore(sideText, opposingText);

  switch (dimensionId) {
    case "logical-validity": {
      const connNote =
        connectiveHits >= 4
          ? `Uses ${connectiveHits} logical connectives (because, therefore, etc.), building clear inferential chains.`
          : connectiveHits >= 2
            ? `${connectiveHits} logical connectives provide moderate inferential structure.`
            : "Few logical connectives, leaving inferential links implicit.";
      const absNote =
        absoluteHits >= 3
          ? ` Undermined by ${absoluteHits} absolute claims (always, never, etc.) that overextend the reasoning.`
          : absoluteHits >= 1
            ? ` ${absoluteHits} absolute claim${absoluteHits > 1 ? "s" : ""} slightly weaken${absoluteHits === 1 ? "s" : ""} otherwise sound logic.`
            : " No absolute claims detected, keeping the logical structure disciplined.";
      const sentNote =
        sentenceCount >= 6
          ? ` Across ${sentenceCount} sentences the argument sustains a coherent thread.`
          : ` Only ${sentenceCount} sentence${sentenceCount !== 1 ? "s" : ""} limits the depth of logical development.`;
      return `${connNote}${absNote}${sentNote}`;
    }

    case "evidence-quality": {
      const evNote =
        evidenceHits >= 4
          ? `${evidenceHits} evidence markers (study, data, research, etc.) ground the argument in external support.`
          : evidenceHits >= 2
            ? `${evidenceHits} evidence references provide partial empirical grounding.`
            : "Sparse evidence markers — claims rest largely on assertion rather than cited support.";
      const numNote =
        numericHits >= 3
          ? ` Bolstered by ${numericHits} numerical data points adding specificity.`
          : numericHits >= 1
            ? ` ${numericHits} numerical reference${numericHits > 1 ? "s add" : " adds"} limited quantitative weight.`
            : " No numerical data provided, reducing the specificity of claims.";
      return `${evNote}${numNote}`;
    }

    case "bias-credibility": {
      const emNote =
        emotionalHits >= 3
          ? `${emotionalHits} emotionally loaded terms (outrageous, disaster, etc.) compromise objectivity.`
          : emotionalHits >= 1
            ? `${emotionalHits} emotional term${emotionalHits > 1 ? "s" : ""} introduce${emotionalHits === 1 ? "s" : ""} mild bias but ${emotionalHits === 1 ? "does" : "do"} not dominate the tone.`
            : "No emotionally loaded language detected, maintaining a measured tone.";
      const hedgeNote =
        nuanceHits >= 3
          ? ` Strengthened by ${nuanceHits} hedging or nuance phrases (however, depends, uncertain), signaling intellectual honesty.`
          : nuanceHits >= 1
            ? ` ${nuanceHits} hedging phrase${nuanceHits > 1 ? "s" : ""} show${nuanceHits === 1 ? "s" : ""} some acknowledgment of limitations.`
            : " No hedging or concessions observed — the argument could benefit from acknowledging uncertainty.";
      const absNote =
        absoluteHits >= 2
          ? ` ${absoluteHits} absolute assertions suggest overconfidence in claims.`
          : "";
      return `${emNote}${hedgeNote}${absNote}`;
    }

    case "rebuttal-strength": {
      const rebNote =
        rebuttalHits >= 3
          ? `${rebuttalHits} direct engagement terms (opponent, counter, rebut, etc.) show active engagement with the other side.`
          : rebuttalHits >= 1
            ? `${rebuttalHits} rebuttal reference${rebuttalHits > 1 ? "s" : ""} — limited direct engagement with opposing arguments.`
            : "No explicit rebuttal language — the argument does not directly address opposing points.";
      const overlapNote =
        overlap >= 0.3
          ? ` High keyword overlap (${(overlap * 100).toFixed(0)}%) with opposing text indicates the argument engages with the same substantive territory.`
          : overlap >= 0.1
            ? ` Moderate keyword overlap (${(overlap * 100).toFixed(0)}%) suggests partial engagement with opposing claims.`
            : " Low keyword overlap with opposing text — the two sides may be talking past each other.";
      return `${rebNote}${overlapNote}`;
    }

    case "crux-identification": {
      const cruxNote =
        cruxHits >= 3
          ? `${cruxHits} crux-framing terms (core, tradeoff, burden of proof, etc.) indicate strong identification of the central disagreement.`
          : cruxHits >= 1
            ? `${cruxHits} crux-framing term${cruxHits > 1 ? "s" : ""} — the argument partially identifies key tradeoffs.`
            : "No explicit crux-framing language — the argument does not clearly articulate what the core disagreement is.";
      const overlapNote =
        overlap >= 0.25
          ? ` Shared vocabulary with the opposing side (${(overlap * 100).toFixed(0)}% overlap) suggests both sides are contesting the same ground.`
          : " Limited shared vocabulary with the opposing side reduces the sense of direct contestation.";
      return `${cruxNote}${overlapNote}`;
    }

    case "clarity": {
      const avgSentenceLength = sentenceCount > 0 ? wordCount / sentenceCount : wordCount;
      const lenNote =
        avgSentenceLength >= 12 && avgSentenceLength <= 26
          ? `Average sentence length of ${avgSentenceLength.toFixed(0)} words sits in the readable range.`
          : avgSentenceLength > 34
            ? `Average sentence length of ${avgSentenceLength.toFixed(0)} words is long, reducing readability.`
            : avgSentenceLength < 12 && sentenceCount > 1
              ? `Average sentence length of ${avgSentenceLength.toFixed(0)} words is quite terse.`
              : `Average sentence length of ${avgSentenceLength.toFixed(0)} words.`;
      const volNote =
        wordCount >= 80
          ? ` At ${wordCount} words the argument has room to develop ideas fully.`
          : wordCount >= 30
            ? ` ${wordCount} words provides modest space for structured argumentation.`
            : ` Only ${wordCount} words — too brief for well-organized exposition.`;
      const structNote =
        sentenceCount >= 6
          ? ` ${sentenceCount} sentences create a multi-step structure that aids comprehension.`
          : ` ${sentenceCount} sentence${sentenceCount !== 1 ? "s" : ""} limits the structural organization.`;
      return `${lenNote}${volNote}${structNote}`;
    }

    default:
      return `Score of ${score}/10 on this dimension.`;
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

    return {
      dimensionId: dimension.id,
      score,
      reasoning: dimensionReasoning(dimension.id, score, sideText, opposingText),
    };
  });
}

// ---------------------------------------------------------------------------
// Verdict building
// ---------------------------------------------------------------------------

/**
 * Build a side summary that highlights the strongest and weakest scoring
 * dimensions rather than using one-size-fits-all copy.
 */
function buildSideSummary(
  dimensions: DimensionScore[],
  rubric: RubricDimension[],
  side: "for" | "against"
): string {
  const sorted = [...dimensions].sort((a, b) => b.score - a.score);
  const best = sorted[0];
  const worst = sorted[sorted.length - 1];

  const bestName =
    rubric.find((r) => r.id === best.dimensionId)?.name.toLowerCase() ?? best.dimensionId;
  const worstName =
    rubric.find((r) => r.id === worst.dimensionId)?.name.toLowerCase() ?? worst.dimensionId;

  const sideLabel = side === "for" ? "FOR" : "AGAINST";

  if (best.score - worst.score < 1) {
    return `${sideLabel} side scores are tightly clustered — no single dimension dominates, with ${bestName} (${best.score}) marginally ahead.`;
  }

  return `${sideLabel} side is strongest on ${bestName} (${best.score}) and weakest on ${worstName} (${worst.score}), creating the scoring profile.`;
}

/**
 * Build overall reasoning that names the dimensions driving the verdict
 * instead of a bare score margin.
 */
function buildOverallReasoning(
  forDimensions: DimensionScore[],
  againstDimensions: DimensionScore[],
  rubric: RubricDimension[],
  persona: JudgePersona,
  winner: "for" | "against" | "draw",
  margin: number
): string {
  // Find the dimension with the largest score gap between sides
  const gaps: { dimId: string; dimName: string; gap: number; favorsSide: "for" | "against" }[] = [];

  for (const dim of rubric) {
    const forScore = forDimensions.find((d) => d.dimensionId === dim.id)?.score ?? 0;
    const againstScore = againstDimensions.find((d) => d.dimensionId === dim.id)?.score ?? 0;
    const gap = forScore - againstScore;
    gaps.push({
      dimId: dim.id,
      dimName: dim.name.toLowerCase(),
      gap: Math.abs(gap),
      favorsSide: gap >= 0 ? "for" : "against",
    });
  }

  gaps.sort((a, b) => b.gap - a.gap);
  const top = gaps.slice(0, 2).filter((g) => g.gap > 0.2);

  if (winner === "draw") {
    if (top.length >= 2) {
      return `${persona.name} rules a DRAW (${margin.toFixed(2)}-point margin). The sides trade advantages: FOR edges on ${top[0].dimName} while AGAINST leads on ${gaps.find((g) => g.favorsSide === "against")?.dimName ?? top[1].dimName}, resulting in near-parity.`;
    }
    return `${persona.name} rules a DRAW — scores are within ${margin.toFixed(2)} points with no single dimension creating decisive separation.`;
  }

  const driverNotes = top
    .filter((g) => g.favorsSide === winner)
    .map((g) => g.dimName);

  const driverText =
    driverNotes.length >= 2
      ? `driven primarily by advantages in ${driverNotes[0]} and ${driverNotes[1]}`
      : driverNotes.length === 1
        ? `driven primarily by an advantage in ${driverNotes[0]}`
        : "with no single dominant dimension";

  return `${persona.name} finds for ${winner.toUpperCase()} by a ${margin.toFixed(2)}-point margin, ${driverText} under the weighted rubric.`;
}

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
      summary: buildSideSummary(forDimensions, rubric, "for"),
      confidence,
    },
    againstScore: {
      side: "against",
      dimensions: againstDimensions,
      totalScore: Number(againstTotalScore.toFixed(2)),
      summary: buildSideSummary(againstDimensions, rubric, "against"),
      confidence,
    },
    winner,
    overallReasoning: buildOverallReasoning(
      forDimensions,
      againstDimensions,
      rubric,
      persona,
      winner,
      margin
    ),
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

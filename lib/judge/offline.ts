import type { LLMModel } from "@/types/logic";
import { extractArgumentsOffline } from "@/lib/analyze/offline";
import {
  ABSOLUTE_MARKERS,
  EMOTIONAL_MARKERS,
  EVIDENCE_MARKERS,
  clamp,
  normalize,
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
import type { DebateMessageInput as DebateMessage } from "@/types/debate";

const DEFAULT_MODELS: LLMModel[] = ["claude", "gpt-4", "gemini"];
type ContentTypeForAnalysis = "transcript" | "article" | "freeform";

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

function firstExample(text: string): string | undefined {
  const sentence = splitSentences(text)[0];
  if (!sentence) return undefined;
  return sentence.slice(0, 180);
}

function buildDimensionScores(
  sideText: string,
  opposingText: string,
  rubric: RubricDimension[]
): DimensionScore[] {
  return rubric.map((dimension) => {
    const score = dimensionScoreForSide(dimension.id, sideText, opposingText);
    const example = firstExample(sideText);
    const strengthLabel =
      score >= 7 ? "strong alignment" : score >= 4 ? "moderate alignment" : "weak alignment";

    return {
      dimensionId: dimension.id,
      score,
      reasoning: `${strengthLabel} with ${dimension.name.toLowerCase()} based on argument structure, evidence cues, and counterargument engagement.`,
      examples: example ? [example] : undefined,
    };
  });
}

function modelDisplayName(model: LLMModel): string {
  switch (model) {
    case "claude":
      return "Claude";
    case "gpt-4":
      return "GPT-4";
    case "gemini":
      return "Gemini";
    case "grok":
      return "Grok";
    default:
      return "Model";
  }
}

function modelAdjustment(model: LLMModel, dimensionId: string): number {
  if (model === "claude" && (dimensionId === "clarity" || dimensionId === "crux-identification")) {
    return 0.2;
  }
  if (model === "gpt-4" && (dimensionId === "logical-validity" || dimensionId === "evidence-quality")) {
    return 0.2;
  }
  if (model === "gemini" && dimensionId === "rebuttal-strength") {
    return 0.2;
  }
  if (model === "grok" && dimensionId === "bias-credibility") {
    return 0.2;
  }
  return 0;
}

function applyModelCalibration(
  dimensions: DimensionScore[],
  model: LLMModel
): DimensionScore[] {
  return dimensions.map((dimension) => ({
    ...dimension,
    score: roundScore(dimension.score + modelAdjustment(model, dimension.dimensionId)),
  }));
}

function mean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function aggregateScores(
  verdicts: JudgeVerdict[],
  rubric: RubricDimension[]
): JudgingResult["aggregatedScores"] {
  const forTotals = verdicts.map((verdict) => verdict.forScore.totalScore);
  const againstTotals = verdicts.map((verdict) => verdict.againstScore.totalScore);

  const forByDimension: Record<string, number> = {};
  const againstByDimension: Record<string, number> = {};

  for (const dimension of rubric) {
    forByDimension[dimension.id] = mean(
      verdicts
        .map((verdict) =>
          verdict.forScore.dimensions.find((score) => score.dimensionId === dimension.id)?.score
        )
        .filter((score): score is number => score != null)
    );

    againstByDimension[dimension.id] = mean(
      verdicts
        .map((verdict) =>
          verdict.againstScore.dimensions.find((score) => score.dimensionId === dimension.id)?.score
        )
        .filter((score): score is number => score != null)
    );
  }

  return {
    for: {
      average: mean(forTotals),
      byDimension: forByDimension,
    },
    against: {
      average: mean(againstTotals),
      byDimension: againstByDimension,
    },
  };
}

function findDisagreements(
  verdicts: JudgeVerdict[],
  rubric: RubricDimension[]
): JudgingResult["disagreements"] {
  const disagreements: JudgingResult["disagreements"] = [];

  for (const dimension of rubric) {
    const forScores = verdicts.map((verdict) => ({
      judgeId: verdict.judgeId,
      score:
        verdict.forScore.dimensions.find((item) => item.dimensionId === dimension.id)?.score ?? 0,
    }));
    const againstScores = verdicts.map((verdict) => ({
      judgeId: verdict.judgeId,
      score:
        verdict.againstScore.dimensions.find((item) => item.dimensionId === dimension.id)?.score ??
        0,
    }));

    const forValues = forScores.map((item) => item.score);
    if (hasSignificantDisagreement(forValues)) {
      disagreements.push({
        dimensionId: dimension.id,
        dimensionName: `${dimension.name} (FOR)`,
        spread: Math.max(...forValues) - Math.min(...forValues),
        scores: forScores,
      });
    }

    const againstValues = againstScores.map((item) => item.score);
    if (hasSignificantDisagreement(againstValues)) {
      disagreements.push({
        dimensionId: dimension.id,
        dimensionName: `${dimension.name} (AGAINST)`,
        spread: Math.max(...againstValues) - Math.min(...againstValues),
        scores: againstScores,
      });
    }
  }

  return disagreements;
}

function consensus(verdicts: JudgeVerdict[]): { winner: "for" | "against" | "draw" | null; hasConsensus: boolean } {
  if (verdicts.length === 0) {
    return { winner: null, hasConsensus: false };
  }

  const counts = { for: 0, against: 0, draw: 0 };
  for (const verdict of verdicts) {
    counts[verdict.winner] += 1;
  }

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

function buildVerdicts(
  forText: string,
  againstText: string,
  models: LLMModel[],
  rubric: RubricDimension[]
): JudgeVerdict[] {
  return models.map((model, index) => {
    const forDimensions = applyModelCalibration(
      buildDimensionScores(forText, againstText, rubric),
      model
    );
    const againstDimensions = applyModelCalibration(
      buildDimensionScores(againstText, forText, rubric),
      model
    );

    const forTotalScore = calculateTotalScore(forDimensions, rubric);
    const againstTotalScore = calculateTotalScore(againstDimensions, rubric);
    const winner = determineWinner(forTotalScore, againstTotalScore);
    const margin = Math.abs(forTotalScore - againstTotalScore);
    const confidence = clamp(0.55 + margin / 12, 0.45, 0.92);

    return {
      judgeId: `offline-${model}`,
      judgeName: `${modelDisplayName(model)} Programmatic Judge`,
      model,
      forScore: {
        side: "for",
        dimensions: forDimensions,
        totalScore: Number(forTotalScore.toFixed(2)),
        summary: "Programmatic scoring favors arguments with stronger evidence cues, logical continuity, and direct rebuttals.",
        confidence,
      },
      againstScore: {
        side: "against",
        dimensions: againstDimensions,
        totalScore: Number(againstTotalScore.toFixed(2)),
        summary: "Programmatic scoring rewards internally consistent skepticism that directly challenges opponent assumptions and evidence.",
        confidence,
      },
      winner,
      overallReasoning: `Computed winner is ${winner.toUpperCase()} with a ${margin.toFixed(2)} point margin under the weighted rubric.`,
      latencyMs: 18 + index * 6,
    };
  });
}

function buildOfflineJudgingResult(
  forText: string,
  againstText: string,
  models: LLMModel[],
  rubric: RubricDimension[] = DEFAULT_RUBRIC
): JudgingResult {
  const verdicts = buildVerdicts(forText, againstText, models, rubric);
  const aggregatedScores = aggregateScores(verdicts, rubric);
  const disagreements = findDisagreements(verdicts, rubric);
  const consensusResult = consensus(verdicts);

  let winner = consensusResult.winner;
  if (!winner) {
    winner = determineWinner(
      aggregatedScores.for.average,
      aggregatedScores.against.average
    );
  }

  return {
    verdicts,
    winner,
    hasConsensus: consensusResult.hasConsensus,
    aggregatedScores,
    disagreements,
    flaggedForReview: disagreements.length > 0 || (!consensusResult.hasConsensus && verdicts.length > 1),
    timestamp: Date.now(),
  };
}

function textBySideFromMessages(messages: DebateMessage[]): { forText: string; againstText: string } {
  const forText = messages
    .filter((message) => message.side === "for")
    .map((message) => message.content)
    .join("\n\n");
  const againstText = messages
    .filter((message) => message.side === "against")
    .map((message) => message.content)
    .join("\n\n");

  return {
    forText: forText || "FOR side did not provide substantial argument text.",
    againstText: againstText || "AGAINST side did not provide substantial argument text.",
  };
}

export function judgeDebateOffline(
  messages: DebateMessage[],
  _topic?: string,
  judgeModels: LLMModel[] = DEFAULT_MODELS
): JudgingResult {
  const models = judgeModels.length > 0 ? judgeModels : DEFAULT_MODELS;
  const { forText, againstText } = textBySideFromMessages(messages);
  return buildOfflineJudgingResult(forText, againstText, models);
}

export function judgeContentOffline(
  content: string,
  contentType: ContentTypeForAnalysis = "freeform",
  judgeModels: LLMModel[] = DEFAULT_MODELS
): JudgingResult {
  const models = judgeModels.length > 0 ? judgeModels : DEFAULT_MODELS;
  const extracted = extractArgumentsOffline(content, contentType);
  const forText = extracted.positions
    .filter((position) => position.side === "for")
    .flatMap((position) => position.arguments.map((argument) => argument.claim))
    .join("\n");
  const againstText = extracted.positions
    .filter((position) => position.side === "against")
    .flatMap((position) => position.arguments.map((argument) => argument.claim))
    .join("\n");

  return buildOfflineJudgingResult(
    forText || "FOR side did not provide substantial argument text.",
    againstText || "AGAINST side did not provide substantial argument text.",
    models
  );
}

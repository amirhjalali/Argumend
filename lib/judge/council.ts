/**
 * Judge Council
 *
 * Coordinates multiple AI judges to evaluate debates
 * and aggregates their scores into a final verdict.
 */

import type { AgentConfig } from "@/lib/agents/types";
import { DEFAULT_JUDGE_AGENTS } from "@/lib/agents/types";
import { executeAgent } from "@/lib/agents/executor";
import {
  DEFAULT_RUBRIC,
  calculateTotalScore,
  hasSignificantDisagreement,
  determineWinner,
  type RubricDimension,
  type JudgeScore,
  type JudgeVerdict,
  type JudgingResult,
  type DimensionScore,
} from "./rubric";
import {
  buildJudgeSystemPrompt,
  buildJudgeDebatePrompt,
  buildJudgeContentPrompt,
  parseJudgeResponse,
  type ParsedJudgeResponse,
} from "./prompts";
import type { LLMModel } from "@/types/logic";

/**
 * Configuration for the judge council
 */
export interface JudgeCouncilConfig {
  /** List of judge agents to use */
  judges?: AgentConfig[];
  /** Scoring rubric to use */
  rubric?: RubricDimension[];
  /** Minimum number of judges required for valid result */
  minJudges?: number;
  /** Threshold for declaring a draw (score difference) */
  drawThreshold?: number;
}

/**
 * Message format for debate input
 */
export interface DebateMessage {
  side: "for" | "against";
  content: string;
  round: number;
}

/**
 * Convert parsed response to JudgeScore
 */
function toJudgeScore(
  parsed: ParsedJudgeResponse["forScore"] | ParsedJudgeResponse["againstScore"],
  side: "for" | "against",
  rubric: RubricDimension[]
): JudgeScore {
  const dimensions: DimensionScore[] = parsed.dimensions.map((d) => ({
    dimensionId: d.dimensionId,
    score: d.score,
    reasoning: d.reasoning,
    examples: d.examples,
  }));

  return {
    side,
    dimensions,
    totalScore: calculateTotalScore(dimensions, rubric),
    summary: parsed.summary,
    confidence: parsed.confidence,
  };
}

/**
 * Create a verdict from a parsed judge response
 */
function createVerdict(
  judgeId: string,
  judgeName: string,
  model: LLMModel,
  parsed: ParsedJudgeResponse,
  rubric: RubricDimension[],
  latencyMs?: number
): JudgeVerdict {
  const forScore = toJudgeScore(parsed.forScore, "for", rubric);
  const againstScore = toJudgeScore(parsed.againstScore, "against", rubric);

  return {
    judgeId,
    judgeName,
    model,
    forScore,
    againstScore,
    winner: parsed.winner,
    overallReasoning: parsed.overallReasoning,
    latencyMs,
  };
}

/**
 * Aggregate scores from multiple verdicts
 */
function aggregateScores(
  verdicts: JudgeVerdict[],
  rubric: RubricDimension[]
): JudgingResult["aggregatedScores"] {
  const forDimensions: Record<string, number[]> = {};
  const againstDimensions: Record<string, number[]> = {};
  const forTotals: number[] = [];
  const againstTotals: number[] = [];

  // Initialize dimension buckets
  for (const dim of rubric) {
    forDimensions[dim.id] = [];
    againstDimensions[dim.id] = [];
  }

  // Collect scores
  for (const verdict of verdicts) {
    forTotals.push(verdict.forScore.totalScore);
    againstTotals.push(verdict.againstScore.totalScore);

    for (const dim of verdict.forScore.dimensions) {
      if (forDimensions[dim.dimensionId]) {
        forDimensions[dim.dimensionId].push(dim.score);
      }
    }
    for (const dim of verdict.againstScore.dimensions) {
      if (againstDimensions[dim.dimensionId]) {
        againstDimensions[dim.dimensionId].push(dim.score);
      }
    }
  }

  // Calculate averages
  const avg = (arr: number[]) =>
    arr.length > 0 ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

  const forByDimension: Record<string, number> = {};
  const againstByDimension: Record<string, number> = {};

  for (const dim of rubric) {
    forByDimension[dim.id] = avg(forDimensions[dim.id]);
    againstByDimension[dim.id] = avg(againstDimensions[dim.id]);
  }

  return {
    for: {
      average: avg(forTotals),
      byDimension: forByDimension,
    },
    against: {
      average: avg(againstTotals),
      byDimension: againstByDimension,
    },
  };
}

/**
 * Find disagreements between judges
 */
function findDisagreements(
  verdicts: JudgeVerdict[],
  rubric: RubricDimension[]
): JudgingResult["disagreements"] {
  const disagreements: JudgingResult["disagreements"] = [];

  for (const dim of rubric) {
    // Collect all scores for this dimension (both sides combined for simplicity,
    // or we could check each side separately)
    const forScores: { judgeId: string; score: number }[] = [];
    const againstScores: { judgeId: string; score: number }[] = [];

    for (const verdict of verdicts) {
      const forDim = verdict.forScore.dimensions.find(
        (d) => d.dimensionId === dim.id
      );
      const againstDim = verdict.againstScore.dimensions.find(
        (d) => d.dimensionId === dim.id
      );

      if (forDim) {
        forScores.push({ judgeId: verdict.judgeId, score: forDim.score });
      }
      if (againstDim) {
        againstScores.push({ judgeId: verdict.judgeId, score: againstDim.score });
      }
    }

    // Check for disagreement in FOR scores
    const forScoreValues = forScores.map((s) => s.score);
    if (hasSignificantDisagreement(forScoreValues)) {
      const spread = Math.max(...forScoreValues) - Math.min(...forScoreValues);
      disagreements.push({
        dimensionId: dim.id,
        dimensionName: `${dim.name} (FOR)`,
        spread,
        scores: forScores,
      });
    }

    // Check for disagreement in AGAINST scores
    const againstScoreValues = againstScores.map((s) => s.score);
    if (hasSignificantDisagreement(againstScoreValues)) {
      const spread = Math.max(...againstScoreValues) - Math.min(...againstScoreValues);
      disagreements.push({
        dimensionId: dim.id,
        dimensionName: `${dim.name} (AGAINST)`,
        spread,
        scores: againstScores,
      });
    }
  }

  return disagreements;
}

/**
 * Determine consensus winner
 */
function determineConsensusWinner(
  verdicts: JudgeVerdict[]
): { winner: "for" | "against" | "draw" | null; hasConsensus: boolean } {
  if (verdicts.length === 0) {
    return { winner: null, hasConsensus: false };
  }

  const winnerCounts = { for: 0, against: 0, draw: 0 };
  for (const verdict of verdicts) {
    winnerCounts[verdict.winner]++;
  }

  const majorityThreshold = Math.ceil(verdicts.length / 2);

  // Check for unanimous consensus
  const hasConsensus =
    winnerCounts.for === verdicts.length ||
    winnerCounts.against === verdicts.length ||
    winnerCounts.draw === verdicts.length;

  // Determine winner by majority
  if (winnerCounts.for >= majorityThreshold) {
    return { winner: "for", hasConsensus };
  } else if (winnerCounts.against >= majorityThreshold) {
    return { winner: "against", hasConsensus };
  } else if (winnerCounts.draw >= majorityThreshold) {
    return { winner: "draw", hasConsensus };
  }

  // No clear majority - use aggregate scores
  return { winner: null, hasConsensus: false };
}

/**
 * Judge Council class
 *
 * Coordinates multiple AI judges to evaluate debates and content.
 */
export class JudgeCouncil {
  private judges: AgentConfig[];
  private rubric: RubricDimension[];
  private minJudges: number;
  private drawThreshold: number;

  constructor(config: JudgeCouncilConfig = {}) {
    this.judges = config.judges || DEFAULT_JUDGE_AGENTS;
    this.rubric = config.rubric || DEFAULT_RUBRIC;
    this.minJudges = config.minJudges || 1;
    this.drawThreshold = config.drawThreshold || 0.5;
  }

  /**
   * Judge a debate between two sides
   */
  async judgeDebate(
    messages: DebateMessage[],
    topic?: string
  ): Promise<JudgingResult> {
    const systemPrompt = buildJudgeSystemPrompt(this.rubric);
    const userPrompt = buildJudgeDebatePrompt(messages, topic);

    return this.executeJudgment(systemPrompt, userPrompt);
  }

  /**
   * Judge free-form content (transcript, article, etc.)
   */
  async judgeContent(
    content: string,
    contentType: "transcript" | "article" | "freeform" = "freeform"
  ): Promise<JudgingResult> {
    const systemPrompt = buildJudgeSystemPrompt(this.rubric);
    const userPrompt = buildJudgeContentPrompt(content, contentType);

    return this.executeJudgment(systemPrompt, userPrompt);
  }

  /**
   * Execute judgment with all judges in parallel
   */
  private async executeJudgment(
    systemPrompt: string,
    userPrompt: string
  ): Promise<JudgingResult> {
    // Execute all judges in parallel
    const startTime = Date.now();
    const judgePromises = this.judges.map(async (judge) => {
      const judgeStartTime = Date.now();
      const response = await executeAgent({
        agent: judge,
        systemPrompt,
        userPrompt,
      });

      if (response.error) {
        console.error(`Judge ${judge.id} failed:`, response.error);
        return null;
      }

      const parsed = parseJudgeResponse(response.content);
      if (!parsed) {
        console.error(`Judge ${judge.id} returned invalid response`);
        return null;
      }

      return createVerdict(
        judge.id,
        judge.name,
        judge.model || "claude",
        parsed,
        this.rubric,
        Date.now() - judgeStartTime
      );
    });

    const results = await Promise.all(judgePromises);
    const verdicts = results.filter((v): v is JudgeVerdict => v !== null);

    // Track which judges failed
    const failedJudges = this.judges
      .filter((_, i) => results[i] === null)
      .map((j) => j.id);

    if (failedJudges.length > 0) {
      console.warn(
        `Judges failed: ${failedJudges.join(", ")}. ${verdicts.length}/${this.judges.length} returned valid verdicts.`
      );
    }

    // Check minimum judges requirement
    if (verdicts.length < this.minJudges) {
      console.warn(
        `Only ${verdicts.length} judges returned valid verdicts (minimum: ${this.minJudges})`
      );
    }

    // Aggregate results
    const aggregatedScores = aggregateScores(verdicts, this.rubric);
    const disagreements = findDisagreements(verdicts, this.rubric);
    const { winner: consensusWinner, hasConsensus } = determineConsensusWinner(verdicts);

    // Determine final winner
    let winner = consensusWinner;
    if (!winner && verdicts.length > 0) {
      // Fall back to aggregate score comparison
      winner = determineWinner(
        aggregatedScores.for.average,
        aggregatedScores.against.average,
        this.drawThreshold
      );
    }

    // Flag for review if there are significant disagreements or no consensus
    const flaggedForReview = disagreements.length > 0 || (!hasConsensus && verdicts.length > 1);

    return {
      verdicts,
      winner,
      hasConsensus,
      aggregatedScores,
      disagreements,
      flaggedForReview:
        flaggedForReview || failedJudges.length > 0,
      timestamp: Date.now(),
      ...(failedJudges.length > 0 && {
        degraded: true,
        failedJudges,
      }),
    } as JudgingResult;
  }

  /**
   * Add a judge to the council
   */
  addJudge(judge: AgentConfig): void {
    this.judges.push(judge);
  }

  /**
   * Remove a judge from the council
   */
  removeJudge(judgeId: string): void {
    this.judges = this.judges.filter((j) => j.id !== judgeId);
  }

  /**
   * Get current judge configuration
   */
  getJudges(): AgentConfig[] {
    return [...this.judges];
  }
}

/**
 * Create a default judge council instance
 */
export function createJudgeCouncil(config?: JudgeCouncilConfig): JudgeCouncil {
  return new JudgeCouncil(config);
}

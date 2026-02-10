import { eq, desc } from "drizzle-orm";
import { db } from "./index";
import {
  analyses,
  debates,
  debateRounds,
  judgments,
  judgeVerdicts,
} from "./schema";
import type { ExtractedArguments } from "@/lib/analyze/extractor";
import type { JudgingResult } from "@/lib/judge/rubric";

// ============================================================================
// Analyses
// ============================================================================

export async function saveAnalysis(
  input: {
    contentHash?: string;
    contentType: string;
    inputContent?: string;
  },
  result: ExtractedArguments
) {
  const [row] = await db
    .insert(analyses)
    .values({
      contentHash: input.contentHash,
      contentType: input.contentType,
      topic: result.topic,
      summary: result.summary,
      positions: result.positions,
      cruxes: result.identifiedCruxes,
      fallacies: result.potentialFallacies,
      confidence: result.confidence,
      inputContent: input.inputContent?.slice(0, 50_000),
      detectedBiases: result.detectedBiases ?? [],
      forStrength: result.forStrength,
      againstStrength: result.againstStrength,
    })
    .returning();
  return row;
}

export async function getAnalysis(id: string) {
  return db.query.analyses.findFirst({
    where: eq(analyses.id, id),
  });
}

export async function listAnalyses(limit = 20) {
  return db.query.analyses.findMany({
    orderBy: desc(analyses.createdAt),
    limit,
  });
}

// ============================================================================
// Debates
// ============================================================================

export async function saveDebate(input: {
  topicId?: string;
  topicTitle: string;
  forModel: string;
  againstModel: string;
  totalRounds?: number;
}) {
  const [row] = await db
    .insert(debates)
    .values({
      topicId: input.topicId,
      topicTitle: input.topicTitle,
      forModel: input.forModel,
      againstModel: input.againstModel,
      totalRounds: input.totalRounds ?? 3,
    })
    .returning();
  return row;
}

export async function updateDebateStatus(
  id: string,
  status: string,
  winner?: string
) {
  await db
    .update(debates)
    .set({ status, winner, updatedAt: new Date() })
    .where(eq(debates.id, id));
}

export async function saveDebateRound(input: {
  debateId: string;
  roundNumber: number;
  forContent: string;
  againstContent: string;
}) {
  const [row] = await db.insert(debateRounds).values(input).returning();
  return row;
}

export async function getDebate(id: string) {
  return db.query.debates.findFirst({
    where: eq(debates.id, id),
    with: { rounds: true },
  });
}

export async function listDebates(limit = 20) {
  return db.query.debates.findMany({
    orderBy: desc(debates.createdAt),
    limit,
  });
}

// ============================================================================
// Judgments
// ============================================================================

export async function saveJudgment(
  result: JudgingResult,
  link: { debateId?: string; analysisId?: string }
) {
  // Insert the judgment
  const [judgment] = await db
    .insert(judgments)
    .values({
      debateId: link.debateId,
      analysisId: link.analysisId,
      winner: result.winner,
      hasConsensus: result.hasConsensus,
      flaggedForReview: result.flaggedForReview,
      aggregatedScores: result.aggregatedScores,
      disagreements: result.disagreements,
    })
    .returning();

  // Insert individual verdicts
  if (result.verdicts.length > 0) {
    await db.insert(judgeVerdicts).values(
      result.verdicts.map((v) => ({
        judgmentId: judgment.id,
        judgeId: v.judgeId,
        judgeName: v.judgeName,
        model: v.model,
        forScore: v.forScore,
        againstScore: v.againstScore,
        winner: v.winner,
        overallReasoning: v.overallReasoning,
        latencyMs: v.latencyMs,
      }))
    );
  }

  return judgment;
}

export async function getJudgment(id: string) {
  return db.query.judgments.findFirst({
    where: eq(judgments.id, id),
    with: { verdicts: true },
  });
}

export async function listJudgments(limit = 20) {
  return db.query.judgments.findMany({
    orderBy: desc(judgments.createdAt),
    limit,
    with: { verdicts: true },
  });
}

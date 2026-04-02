import { eq, desc, and, gte, sql, count } from "drizzle-orm";
import { getDb } from "./index";
import {
  analyses,
  debates,
  debateRounds,
  judgments,
  judgeVerdicts,
  savedTopics,
  topicViews,
  topicSubscriptions,
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
  const [row] = await getDb()
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
  return getDb().query.analyses.findFirst({
    where: eq(analyses.id, id),
  });
}

export async function listAnalyses(limit = 20) {
  return getDb().query.analyses.findMany({
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
  const [row] = await getDb()
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
  await getDb()
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
  const [row] = await getDb().insert(debateRounds).values(input).returning();
  return row;
}

export async function getDebate(id: string) {
  return getDb().query.debates.findFirst({
    where: eq(debates.id, id),
    with: { rounds: true },
  });
}

export async function listDebates(limit = 20) {
  return getDb().query.debates.findMany({
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
  const [judgment] = await getDb()
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
    await getDb().insert(judgeVerdicts).values(
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
  return getDb().query.judgments.findFirst({
    where: eq(judgments.id, id),
    with: { verdicts: true },
  });
}

export async function listJudgments(limit = 20) {
  return getDb().query.judgments.findMany({
    orderBy: desc(judgments.createdAt),
    limit,
    with: { verdicts: true },
  });
}

// ============================================================================
// Saved Topics
// ============================================================================

export async function getSavedTopicIds(userId: string) {
  const rows = await getDb().query.savedTopics.findMany({
    where: eq(savedTopics.userId, userId),
    orderBy: desc(savedTopics.savedAt),
  });
  return rows.map((r) => r.topicId);
}

export async function saveTopic(userId: string, topicId: string) {
  const [row] = await getDb()
    .insert(savedTopics)
    .values({ userId, topicId })
    .onConflictDoNothing()
    .returning();
  return row;
}

export async function unsaveTopic(userId: string, topicId: string) {
  await getDb()
    .delete(savedTopics)
    .where(
      and(eq(savedTopics.userId, userId), eq(savedTopics.topicId, topicId))
    );
}

export async function listUserDebates(userId: string, limit = 20) {
  return getDb().query.debates.findMany({
    where: eq(debates.userId, userId),
    orderBy: desc(debates.createdAt),
    limit,
  });
}

// ============================================================================
// Topic Views
// ============================================================================

export async function recordTopicView(topicId: string, userId?: string) {
  const [row] = await getDb()
    .insert(topicViews)
    .values({ topicId, userId: userId ?? null })
    .returning();
  return row;
}

export async function getTrendingTopics(limit = 10) {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const rows = await getDb()
    .select({
      topicId: topicViews.topicId,
      viewCount: count(topicViews.id),
    })
    .from(topicViews)
    .where(gte(topicViews.viewedAt, sevenDaysAgo))
    .groupBy(topicViews.topicId)
    .orderBy(sql`count(${topicViews.id}) desc`)
    .limit(limit);

  return rows;
}

// ============================================================================
// Topic Subscriptions
// ============================================================================

export async function subscribeTopic(userId: string, topicId: string) {
  const [row] = await getDb()
    .insert(topicSubscriptions)
    .values({ userId, topicId })
    .onConflictDoNothing()
    .returning();
  return row;
}

export async function unsubscribeTopic(userId: string, topicId: string) {
  await getDb()
    .delete(topicSubscriptions)
    .where(
      and(
        eq(topicSubscriptions.userId, userId),
        eq(topicSubscriptions.topicId, topicId)
      )
    );
}

export async function isSubscribed(userId: string, topicId: string) {
  const row = await getDb().query.topicSubscriptions.findFirst({
    where: and(
      eq(topicSubscriptions.userId, userId),
      eq(topicSubscriptions.topicId, topicId)
    ),
  });
  return !!row;
}

export async function getSubscriberCount(topicId: string) {
  const [result] = await getDb()
    .select({ count: count(topicSubscriptions.id) })
    .from(topicSubscriptions)
    .where(eq(topicSubscriptions.topicId, topicId));
  return result?.count ?? 0;
}

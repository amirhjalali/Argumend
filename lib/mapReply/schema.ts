import { z } from "zod";
import type { MapReplyResult } from "./types";

const Count = z.number().int().nonnegative();
const Probability = z.number().min(0).max(1);
const Probabilities = z.record(z.string(), Probability);
const HttpUrl = z.url().refine((value) => /^https?:\/\//i.test(value));
const TopicId = z.string().regex(/^[A-Za-z0-9_-]+$/);

const TopicChoice = z.object({
  choice: z.string(), confidence: Probability, probabilities: Probabilities, threshold: Probability,
});

const common = {
  thread: z.object({
    turnCount: Count, substantiveCount: Count, unprobedCount: Count, wordCount: Count,
    characterCount: Count, hasSpeakerLabels: z.boolean(), speakers: z.array(z.string()), truncated: z.boolean(),
  }),
  thresholds: z.object({
    topicConfidence: Probability, sectionConfidence: Probability, fallacy: Probability,
    factual: Probability, threadSignal: Probability, cruxTouched: Probability,
  }),
  candidates: z.array(z.object({
    id: TopicId, title: z.string(), metaClaim: z.string(), score: z.number().nonnegative(),
  })),
  markdown: z.string(),
  execution: z.object({
    version: z.string(), lane: z.enum(["http", "fake"]), model: z.string(), requests: Count, retries: Count,
    redactions: z.object({ emails: Count, phones: Count, handles: Count }),
    usage: z.object({ inputTokens: Count, outputTokens: Count }),
    timings: z.object({
      parseMs: z.number().nonnegative(), prefilterMs: z.number().nonnegative(), topicMs: z.number().nonnegative(),
      turnsMs: z.number().nonnegative(), threadMs: z.number().nonnegative(), cruxMs: z.number().nonnegative(),
      totalMs: z.number().nonnegative(),
    }),
  }),
};

/** Validate every field consumed by the result views before mounting them. */
export const MapReplyResultSchema: z.ZodType<MapReplyResult> = z.discriminatedUnion("ok", [
  z.object({
    ...common,
    ok: z.literal(true),
    topic: z.object({
      id: TopicId, title: z.string(), metaClaim: z.string(),
      path: z.string().regex(/^\/topics\/[A-Za-z0-9_-]+$/), url: HttpUrl,
    }),
    topicChoice: TopicChoice,
    sectionCounts: z.array(z.object({ id: z.string(), title: z.string(), count: Count, tentative: Count })),
    dominantSection: z.object({
      id: z.string(), title: z.string(), summary: z.string(), count: Count, tentative: z.boolean(),
      cruxId: z.string(), cruxTitle: z.string(), cruxDescription: z.string(),
    }).nullable(),
    turns: z.array(z.object({
      index: Count, speaker: z.string(), text: z.string(), wordCount: Count, section: z.string(),
      sectionTitle: z.string().nullable(), sectionConfidence: Probability, sectionProbabilities: Probabilities,
      placement: z.enum(["confident", "tentative", "none"]), stance: z.string(), stanceConfidence: Probability,
      stanceProbabilities: Probabilities, fallacy: Probability, factual: Probability, notAnArgument: z.boolean(),
    })),
    unplacedCount: Count,
    notArguing: z.array(z.string()),
    notArguingInProbedTurns: z.array(z.string()),
    pattern: z.object({ pattern: z.string(), label: z.string(), confidence: Probability, probabilities: Probabilities }),
    signals: z.object({
      empiricalLever: Probability, valueResidual: Probability, talkingPast: Probability,
      definitional: Probability, threshold: Probability,
    }),
    cruxes: z.array(z.object({
      pillarId: z.string(), pillarTitle: z.string(), cruxId: z.string(), cruxTitle: z.string(),
      cruxDescription: z.string(), touched: Probability, touchedThreshold: Probability, isDominantSection: z.boolean(),
    })),
    evidence: z.array(z.object({
      id: z.string(), title: z.string(), description: z.string(), side: z.enum(["for", "against"]),
      score: z.number().min(0).max(40), source: z.string().optional(), sourceUrl: HttpUrl.optional(),
    })),
  }),
  z.object({
    ...common,
    ok: z.literal(false),
    reason: z.enum(["no_turns", "no_candidates", "low_confidence", "map_unavailable"]),
    message: z.string(),
    topicChoice: TopicChoice.nullable(),
  }),
]);

export const MapReplyErrorResponseSchema = z.object({
  error: z.string().optional(),
  code: z.enum([
    "FEATURE_DISABLED", "PROVIDER_NOT_CONFIGURED", "INVALID_REQUEST", "CONTENT_TOO_SHORT",
    "CONTENT_TOO_LONG", "RATE_LIMITED", "SPEND_LIMIT_REACHED", "PROVIDER_TIMEOUT",
    "PROVIDER_UNAVAILABLE", "INTERNAL_ERROR",
  ]).optional().catch(undefined),
  requestId: z.string().optional(),
});

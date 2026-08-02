import { z } from "zod";
import { ExtractedArgumentsSchema } from "./extractor";
import type { JudgingResult } from "@/lib/judge/rubric";

const LLMModelSchema = z.enum(["claude", "gpt-4", "gpt-5", "gemini", "grok"]);
const WinnerSchema = z.enum(["for", "against", "draw"]);

const DimensionScoreSchema = z.object({
  dimensionId: z.string().min(1),
  score: z.number().finite(),
  reasoning: z.string(),
  examples: z.array(z.string()).optional(),
});

const JudgeScoreSchema = z.object({
  side: z.enum(["for", "against"]),
  dimensions: z.array(DimensionScoreSchema),
  totalScore: z.number().finite(),
  summary: z.string(),
  confidence: z.number().finite().min(0).max(1),
});

const JudgeVerdictSchema = z.object({
  judgeId: z.string().min(1),
  judgeName: z.string().min(1),
  model: LLMModelSchema,
  forScore: JudgeScoreSchema,
  againstScore: JudgeScoreSchema,
  winner: WinnerSchema,
  overallReasoning: z.string(),
  latencyMs: z.number().finite().nonnegative().optional(),
});

const AggregatedSideSchema = z.object({
  average: z.number().finite(),
  byDimension: z.record(z.string(), z.number().finite()),
});

export const JudgingResultSchema: z.ZodType<JudgingResult> = z.object({
  verdicts: z.array(JudgeVerdictSchema),
  winner: WinnerSchema.nullable(),
  hasConsensus: z.boolean(),
  aggregatedScores: z.object({
    for: AggregatedSideSchema,
    against: AggregatedSideSchema,
  }),
  disagreements: z.array(
    z.object({
      dimensionId: z.string().min(1),
      dimensionName: z.string(),
      spread: z.number().finite(),
      scores: z.array(
        z.object({
          judgeId: z.string().min(1),
          score: z.number().finite(),
        }),
      ),
    }),
  ),
  flaggedForReview: z.boolean(),
  timestamp: z.number().finite(),
});

export const AnalyzeFallbackCodeSchema = z.enum([
  "ANALYSIS_AUTH_UNAVAILABLE",
  "ANALYSIS_PROVIDER_ERROR",
  "JUDGING_AUTH_UNAVAILABLE",
  "JUDGING_PROVIDER_ERROR",
  "JUDGING_NO_ARGUMENTS",
]);

const AnalysisExecutionSchema = z.object({
  requested: z.enum(["offline", "live"]),
  actual: z.enum(["offline", "live"]),
  fallbackCode: AnalyzeFallbackCodeSchema.optional(),
});

const JudgingExecutionSchema = z.object({
  requested: z.enum(["disabled", "offline", "live"]),
  actual: z.enum(["disabled", "skipped", "offline", "live"]),
  fallbackCode: AnalyzeFallbackCodeSchema.optional(),
});

export const AnalyzeExecutionSchema = z.object({
  analysis: AnalysisExecutionSchema,
  judging: JudgingExecutionSchema,
});

export const AnalyzeSuccessResponseSchema = z.object({
  id: z.string().min(1).optional(),
  extracted: ExtractedArgumentsSchema,
  judgingResult: JudgingResultSchema.nullable(),
  judgmentId: z.string().min(1).optional(),
  execution: AnalyzeExecutionSchema,
});

export type AnalyzeExecution = z.infer<typeof AnalyzeExecutionSchema>;
export type AnalyzeSuccessResponse = z.infer<typeof AnalyzeSuccessResponseSchema>;

export const INVALID_ANALYZE_RESPONSE_MESSAGE =
  "The analysis service returned an invalid response. Please try again.";
export const INVALID_JUDGING_RESPONSE_MESSAGE =
  "The judging service returned an invalid response. Please try again.";

export function parseJudgingResult(input: unknown): JudgingResult {
  const parsed = JudgingResultSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error(INVALID_JUDGING_RESPONSE_MESSAGE);
  }
  return parsed.data;
}

export function parseAnalyzeSuccessResponse(input: unknown): AnalyzeSuccessResponse {
  const parsed = AnalyzeSuccessResponseSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error(INVALID_ANALYZE_RESPONSE_MESSAGE);
  }
  return parsed.data;
}

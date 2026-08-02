import { z } from "zod";
import {
  TopicCategorySchema,
  TopicSchema,
  TopicStatusSchema,
  VerdictSchema,
} from "@/lib/schemas/topic";

export const DEFAULT_TOPIC_LIMIT = 50;
export const MAX_TOPIC_LIMIT = 100;

const PositiveIntegerStringSchema = z
  .string()
  .regex(/^\d+$/, "Expected a base-10 integer.")
  .transform(Number)
  .pipe(z.number().int().safe().positive());

const NonnegativeIntegerStringSchema = z
  .string()
  .regex(/^\d+$/, "Expected a non-negative base-10 integer.")
  .transform(Number)
  .pipe(z.number().int().safe().nonnegative());

/** Typed query boundary for the public topic-list endpoint. */
export const TopicListQuerySchema = z.object({
  category: TopicCategorySchema.optional(),
  status: TopicStatusSchema.optional(),
  limit: PositiveIntegerStringSchema.pipe(
    z.number().max(MAX_TOPIC_LIMIT, `Maximum limit is ${MAX_TOPIC_LIMIT}.`),
  ).optional(),
  offset: NonnegativeIntegerStringSchema.optional(),
});

export const TopicIdParamSchema = z
  .string()
  .min(1)
  .max(100)
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Expected a lowercase kebab-case topic id.",
  );

export const CONFIDENCE_SCORE_DEPRECATION =
  "Deprecated compatibility alias of balance. Use balance together with weight and verdict.";

export const PublicTopicSummarySchema = z.object({
  id: z.string(),
  title: z.string(),
  meta_claim: z.string(),
  category: TopicCategorySchema,
  status: TopicStatusSchema,
  balance: z.number().min(0).max(100),
  weight: z.number().min(0).max(100),
  verdict: VerdictSchema,
  confidence_score: z
    .number()
    .min(0)
    .max(100)
    .describe(CONFIDENCE_SCORE_DEPRECATION),
  pillarCount: z.number().int().nonnegative(),
  evidenceCount: z.number().int().nonnegative(),
  tags: z.array(z.string()),
  url: z.string().url(),
});

export const PublicTopicDetailSchema = TopicSchema.extend({
  confidence_score: z
    .number()
    .min(0)
    .max(100)
    .describe(CONFIDENCE_SCORE_DEPRECATION),
  url: z.string().url(),
});

const DeprecatedFieldsSchema = z.object({
  confidence_score: z.literal(CONFIDENCE_SCORE_DEPRECATION),
});

export const TopicListResponseSchema = z.object({
  count: z.number().int().nonnegative(),
  total: z.number().int().nonnegative(),
  limit: z.number().int().positive(),
  offset: z.number().int().nonnegative(),
  topics: z.array(PublicTopicSummarySchema),
  deprecated_fields: DeprecatedFieldsSchema,
});

export const TopicDetailResponseSchema = z.object({
  topic: PublicTopicDetailSchema,
  deprecated_fields: DeprecatedFieldsSchema,
});

export const DEPRECATED_TOPIC_FIELDS = {
  confidence_score: CONFIDENCE_SCORE_DEPRECATION,
} as const;

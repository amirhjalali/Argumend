import { z } from "zod";

export const DebateModelSchema = z.enum([
  "claude",
  "gpt-4",
  "gpt-5",
  "gemini",
  "grok",
]);

export const MAX_DEBATE_CONTEXT_MESSAGES = 40;
export const MAX_DEBATE_MESSAGE_CHARACTERS = 50_000;
export const MAX_DEBATE_PILLARS = 20;
export const MAX_DEBATE_PILLAR_TITLE_CHARACTERS = 500;

export const DebateMessageInputSchema = z.object({
  id: z.string().max(200).optional(),
  side: z.enum(["for", "against"]),
  content: z.string().min(1).max(MAX_DEBATE_MESSAGE_CHARACTERS),
  round: z.number().int().min(1).max(20),
  model: z.string().max(50).optional(),
  role: z.string().max(50).optional(),
});

export const DebatePillarSchema = z.object({
  title: z.string().min(1).max(MAX_DEBATE_PILLAR_TITLE_CHARACTERS),
  skepticPremise: z.string().min(1).max(MAX_DEBATE_MESSAGE_CHARACTERS),
  proponentRebuttal: z.string().min(1).max(MAX_DEBATE_MESSAGE_CHARACTERS),
});

export const DebateTurnRequestSchema = z.object({
  topic: z.string().min(1).max(500),
  topicId: z.string().min(1).max(200),
  side: z.enum(["for", "against"]),
  model: DebateModelSchema,
  round: z.number().int().min(1).max(20),
  previousMessages: z.array(DebateMessageInputSchema).max(MAX_DEBATE_CONTEXT_MESSAGES),
  pillars: z.array(DebatePillarSchema).max(MAX_DEBATE_PILLARS).optional(),
});

export const DebateFallbackCodeSchema = z.enum([
  "AUTH_REQUIRED",
  "PROVIDER_ERROR",
]);

export const DebateTurnExecutionSchema = z
  .object({
    requested: z.enum(["programmatic", "live"]),
    actual: z.enum(["programmatic", "live"]),
    requestedModel: DebateModelSchema,
    // Programmatic generation is not performed by the selected provider model.
    // Keeping this nullable prevents a fallback from being mislabeled as live.
    actualModel: DebateModelSchema.nullable(),
    fallbackCode: DebateFallbackCodeSchema.optional(),
  })
  .superRefine((execution, context) => {
    if (execution.actual === "programmatic" && execution.actualModel !== null) {
      context.addIssue({
        code: "custom",
        path: ["actualModel"],
        message: "Programmatic execution cannot claim a provider model",
      });
    }
    if (execution.actual === "live" && execution.actualModel === null) {
      context.addIssue({
        code: "custom",
        path: ["actualModel"],
        message: "Live execution must identify its provider model",
      });
    }
    const isFallback = execution.requested === "live" && execution.actual === "programmatic";
    if (isFallback !== Boolean(execution.fallbackCode)) {
      context.addIssue({
        code: "custom",
        path: ["fallbackCode"],
        message: "Fallback codes are required only for live-to-programmatic fallback",
      });
    }
  });

export const DebateTurnSuccessSchema = z.object({
  argument: z.string().min(1),
  execution: DebateTurnExecutionSchema,
});

export const DebateApiErrorSchema = z.object({
  error: z.string(),
  code: z.string().optional(),
});

export const DebateStreamEventSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("token"),
    token: z.string(),
  }).strict(),
  z.object({
    // A provider can fail after yielding partial output. Clients must discard
    // those partial live tokens before accepting a programmatic replacement.
    type: z.literal("replace"),
  }).strict(),
  z.object({
    type: z.literal("complete"),
    execution: DebateTurnExecutionSchema,
  }).strict(),
  z.object({
    type: z.literal("error"),
    code: z.literal("DEBATE_GENERATION_FAILED"),
    message: z.string(),
  }).strict(),
]);

export type DebateModel = z.infer<typeof DebateModelSchema>;
export type DebateTurnRequest = z.infer<typeof DebateTurnRequestSchema>;
export type DebateTurnExecution = z.infer<typeof DebateTurnExecutionSchema>;
export type DebateTurnSuccess = z.infer<typeof DebateTurnSuccessSchema>;
export type DebateStreamEvent = z.infer<typeof DebateStreamEventSchema>;

export const DEBATE_GENERATION_ERROR_MESSAGE =
  "This debate turn could not be generated. Please try again.";
export const INVALID_DEBATE_RESPONSE_MESSAGE =
  "The debate service returned an invalid response. Please try again.";

export function parseDebateTurnSuccess(input: unknown): DebateTurnSuccess {
  const parsed = DebateTurnSuccessSchema.safeParse(input);
  if (!parsed.success) throw new Error(INVALID_DEBATE_RESPONSE_MESSAGE);
  return parsed.data;
}

export function parseDebateStreamEvent(input: unknown): DebateStreamEvent {
  const parsed = DebateStreamEventSchema.safeParse(input);
  if (!parsed.success) throw new Error(INVALID_DEBATE_RESPONSE_MESSAGE);
  return parsed.data;
}

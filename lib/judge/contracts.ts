import { z } from "zod";

export const JudgeMethodNotAllowedResponseSchema = z
  .object({
    error: z.literal("Listing judgments is not supported"),
    code: z.literal("METHOD_NOT_ALLOWED"),
  })
  .strict();

export type JudgeMethodNotAllowedResponse = z.infer<
  typeof JudgeMethodNotAllowedResponseSchema
>;

import { z } from "zod";

export const ApiEndpointSchema = z.object({
  method: z.literal("GET"),
  path: z.string().startsWith("/api/v1"),
  description: z.string().min(1),
  query: z.record(z.string(), z.unknown()).optional(),
  example: z.string().url(),
});

export const ApiIndexResponseSchema = z.object({
  name: z.string().min(1),
  version: z.literal("1"),
  description: z.string().min(1),
  documentation: z.string().url(),
  website: z.string().url(),
  topic_count: z.number().int().nonnegative(),
  base_url: z.string().url(),
  endpoints: z.array(ApiEndpointSchema).min(1),
  error_contract: z.object({
    status: z.literal(400),
    shape: z.literal("{ error, code, issues? }"),
    cache_control: z.literal("no-store"),
  }),
  license: z.string().min(1),
});

export const ApiErrorResponseSchema = z.object({
  error: z.string().min(1),
  code: z.string().regex(/^[A-Z][A-Z0-9_]*$/),
  issues: z
    .array(
      z.object({
        field: z.string().min(1),
        message: z.string().min(1),
      }),
    )
    .optional(),
  topics_url: z.string().url().optional(),
});

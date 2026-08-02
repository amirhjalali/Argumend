import { z } from "zod";

export const TopicSubscriptionRequestSchema = z.object({
  topicId: z
    .string()
    .trim()
    .min(1, "topicId is required")
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "topicId must be a topic slug"),
  subscribe: z.boolean(),
});

export const TopicSubscriptionStatusSchema = z.object({
  authenticated: z.boolean(),
  subscribed: z.boolean(),
  subscriberCount: z.number().int().nonnegative(),
});

export const TopicSubscriptionErrorSchema = z.object({
  error: z.string(),
  code: z.string().optional(),
});

export type TopicSubscriptionStatus = z.infer<
  typeof TopicSubscriptionStatusSchema
>;

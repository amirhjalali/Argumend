import { z } from "zod";

export const HealthResponseSchema = z.object({
  status: z.enum(["ok", "degraded"]),
  ready: z.boolean(),
  mode: z.enum(["offline", "live-enabled"]),
  checks: z.object({
    static_content: z.enum(["ok", "unavailable"]),
  }),
  /** Every map on the site, the number the home page and the paste box give (data/topicIndex.ts MAP_COUNT). */
  map_count: z.number().int().nonnegative(),
  /** The older pillar maps alone, the ones /api/v1/topics lists. */
  topic_count: z.number().int().nonnegative(),
  uptime_seconds: z.number().int().nonnegative(),
  timestamp: z.string().datetime(),
});

export type HealthResponse = z.infer<typeof HealthResponseSchema>;

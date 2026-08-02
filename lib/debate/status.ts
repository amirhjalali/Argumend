import { z } from "zod";

/** Stable persistence states shared by the API, queries, and dashboard. */
export const DebatePersistenceStatusSchema = z.enum([
  "in_progress",
  "completed",
  "failed",
  "cancelled",
]);

export type DebatePersistenceStatus = z.infer<
  typeof DebatePersistenceStatusSchema
>;

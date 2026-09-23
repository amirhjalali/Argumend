/**
 * Fire-and-forget gap logging. Off unless `ENABLE_GAP_METRIC_LOGGING=true`,
 * a no-op without `DATABASE_URL`, and it never throws or rejects into the
 * caller: a broken metric must never fail a reader's request.
 */
import { getDb, isDatabaseConfigured } from "@/lib/db";
import { gapObservations } from "@/lib/db/schema";
import { sanitizeServerLog } from "@/lib/sanitizeServerLog";
import { GapObservationSchema, type GapObservation } from "./record";

export function isGapMetricLoggingEnabled(): boolean {
  return process.env.ENABLE_GAP_METRIC_LOGGING === "true";
}

/**
 * Derive and store one gap record. `derive` runs inside the guard, so a
 * derivation bug is swallowed with the rest. Returns the insert promise for
 * tests; callers do not await it.
 */
export function logGapObservation(derive: () => GapObservation | null): Promise<void> {
  if (!isGapMetricLoggingEnabled() || !isDatabaseConfigured()) return Promise.resolve();
  try {
    const candidate = derive();
    if (!candidate) return Promise.resolve();
    // Strict parse: an unexpected key or a non-id string is refused, not stored.
    const parsed = GapObservationSchema.safeParse(candidate);
    if (!parsed.success) {
      console.warn("[argumend:gap-metric] record refused by schema");
      return Promise.resolve();
    }
    const db = getDb();
    return Promise.resolve(db.insert(gapObservations).values(parsed.data))
      .then(() => undefined)
      .catch((error: unknown) => {
        console.warn(`[argumend:gap-metric] insert failed: ${sanitizeServerLog(error)}`);
      });
  } catch (error) {
    console.warn(`[argumend:gap-metric] skipped: ${sanitizeServerLog(error)}`);
    return Promise.resolve();
  }
}

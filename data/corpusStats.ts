import { CONTENT_LAST_UPDATED } from "@/lib/site";

/**
 * Lightweight snapshot for public discovery surfaces.
 * `corpusStats.test.ts` recomputes these values from the full topic corpus so
 * this boundary fails CI instead of silently drifting when evidence changes.
 */
export interface EvidenceCitationStats {
  readonly withUrl: number;
  readonly total: number;
  readonly reviewedAt: string;
}

export const evidenceCitationStats: EvidenceCitationStats = Object.freeze({
  withUrl: 1551,
  total: 1567,
  reviewedAt: CONTENT_LAST_UPDATED,
});

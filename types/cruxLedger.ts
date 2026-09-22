/**
 * Crux ledger (docs/plans/2026-09-22-crux-ledger-and-living-ai-map-spec.md §1).
 *
 * An append-only record, per (topic, claim), of how a crux has moved: what
 * narrowed it, what met its resolution condition, or why nothing can. Cruxes
 * are computed, so the ledger keys on the CLAIM id and survives the claim
 * dropping out of and back into the top 5.
 *
 * The ledger never asserts settledness. It records dated movement and lets
 * the reader see how much of it there was.
 */
import type { ResolutionKind } from "@/types/argument";

/** Deliberately not a verdict scale. See the status table in spec §1.1. */
export type CruxLedgerStatus = "open" | "narrowed" | "resolved" | "unresolvable";

export interface CruxLedgerEntry {
  /** `${topicId}:${claimId}:${date}:${seq}`, seq a positive integer. */
  id: string;
  topicId: string;
  /** Must resolve to a CLAIM in the topic's graph. */
  claimId: string;
  /**
   * ISO date (YYYY-MM-DD) the movement is dated to: the source's own date,
   * not the day we wrote the entry.
   */
  date: string;
  /**
   * ISO date (YYYY-MM-DD) we picked the source up. Distinct from `date` so a
   * 2024 paper noticed in 2026 is honest about both the world and the map
   * (spec open question 1, resolved: `date` = source date, `noticedAt` =
   * ingest date).
   */
  noticedAt?: string;
  status: CruxLedgerStatus;
  /** Required unless status = "open". */
  resolutionKind?: ResolutionKind;
  /** EVIDENCE nodes in the same graph that moved it; [] for editorial-only. */
  evidenceNodeIds: string[];
  /** <=240 chars, plain language, no verdict language. */
  note: string;
  author: LedgerAuthor;
  /** Corrections never delete; they supersede. Id of the correcting entry. */
  supersededBy?: string;
  /** ISO date or date-time the entry was written. */
  createdAt: string;
}

export type LedgerAuthor =
  | { kind: "editorial"; curator: string; basis: string }
  | {
      kind: "judgment";
      modelId: string;
      promptVersion: string;
      contentHash: string;
      validator: "pass" | "pass-with-warnings";
      /** Absent = review-queue only: invisible to the engine and the public page. */
      reviewedBy?: string;
    };

/** On-disk shape of `data/argument/<topicId>.ledger.json`. */
export interface CruxLedgerFile {
  topicId: string;
  entries: CruxLedgerEntry[];
}

/**
 * Latest non-superseded public status per claim id (spec §1.3). Claims with
 * no public entry are absent, which the engine treats exactly like "open".
 */
export type LedgerStatusByClaim = Readonly<Record<string, CruxLedgerStatus>>;

/**
 * Crux ledger: public projection (spec §1.2) and ledgerStatus (spec §1.3).
 *
 * Split out of `ledger.ts` so client components can read a ledger without
 * shipping zod: `ledger.ts` holds the schema and validator and re-exports
 * everything here, so server code keeps importing from `@/lib/argument/ledger`.
 * Client code (anything reached from a "use client" module, such as the crux
 * primitives the diagram's detail panel and phone list use) imports from this
 * file. Keep it free of zod and of `ledger.ts`.
 */
import type { CruxLedgerEntry, CruxLedgerStatus, LedgerStatusByClaim } from "@/types/cruxLedger";

/**
 * Whether an entry may be seen by the engine and the public page. A judgment
 * entry with no `reviewedBy` lives in the review queue only; this is the
 * whole gate that keeps model drift from moving a public ledger.
 */
export function isPublicEntry(entry: CruxLedgerEntry): boolean {
  return entry.author.kind === "editorial" || entry.author.reviewedBy !== undefined;
}

/** Chronological order: movement date, then seq, then write time, then id. */
export function compareLedgerEntries(a: CruxLedgerEntry, b: CruxLedgerEntry): number {
  return (
    a.date.localeCompare(b.date) ||
    entrySeq(a) - entrySeq(b) ||
    a.createdAt.localeCompare(b.createdAt) ||
    a.id.localeCompare(b.id)
  );
}

function entrySeq(entry: CruxLedgerEntry): number {
  const seq = Number(entry.id.slice(entry.id.lastIndexOf(":") + 1));
  return Number.isFinite(seq) ? seq : 0;
}

/**
 * Public entries that are still in force, chronological. An entry counts as
 * superseded only when the correcting entry is itself public: an unreviewed
 * model proposal cannot retire a published entry.
 */
export function publicLedgerEntries(entries: readonly CruxLedgerEntry[]): CruxLedgerEntry[] {
  const publicEntries = entries.filter(isPublicEntry);
  const publicIds = new Set(publicEntries.map((entry) => entry.id));
  return publicEntries
    .filter((entry) => entry.supersededBy === undefined || !publicIds.has(entry.supersededBy))
    .sort(compareLedgerEntries);
}

/** The latest in-force public entry for one claim (used by the validator). */
export function currentPublicEntry(
  entries: readonly CruxLedgerEntry[],
  claimId: string,
): CruxLedgerEntry | undefined {
  return publicLedgerEntries(entries)
    .filter((entry) => entry.claimId === claimId)
    .at(-1);
}

/**
 * The latest non-superseded public entry per claim — what `identifyCruxes`
 * consumes as its `ledgerStatus` option (spec §1.3; the entry carries the
 * date and note a narrowed card cites). Claims with no public entry are
 * absent; absent means today's behavior exactly. Unreviewed judgment entries
 * never appear here, so they cannot move the ranking.
 */
export function currentLedgerEntries(
  entries: readonly CruxLedgerEntry[],
): Readonly<Record<string, CruxLedgerEntry>> {
  const current: Record<string, CruxLedgerEntry> = {};
  for (const entry of publicLedgerEntries(entries)) {
    // Chronological order, so the last write per claim is the latest.
    current[entry.claimId] = entry;
  }
  return current;
}

/** The status of `currentLedgerEntries` per claim. */
export function ledgerStatus(entries: readonly CruxLedgerEntry[]): LedgerStatusByClaim {
  const status: Record<string, CruxLedgerStatus> = {};
  for (const [claimId, entry] of Object.entries(currentLedgerEntries(entries))) {
    status[claimId] = entry.status;
  }
  return status;
}

export interface CruxMovementEntry {
  entry: CruxLedgerEntry;
  /** Dates of the public entries this one corrects, when it supersedes any. */
  corrects: string[];
}

/** The public, chronological movement history for one claim. */
export function claimMovement(
  entries: readonly CruxLedgerEntry[],
  claimId: string,
): CruxMovementEntry[] {
  const all = entries.filter(isPublicEntry);
  return publicLedgerEntries(entries)
    .filter((entry) => entry.claimId === claimId)
    .map((entry) => ({
      entry,
      corrects: all
        .filter((candidate) => candidate.supersededBy === entry.id)
        .map((candidate) => candidate.date)
        .sort(),
    }));
}

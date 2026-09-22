/**
 * Disk loader for crux ledgers: `data/argument/<topicId>.ledger.json`.
 *
 * Server-only (reads the filesystem). A missing file is an empty ledger — the
 * ledger is additive, and a topic nobody has written movement for renders
 * exactly as it did before ledgers existed. A file that exists but fails the
 * schema or the graph checks is a build-stopping defect, the same policy
 * `loadArgumentTopic` applies to the graph itself: silently dropping a
 * published ledger would make the map claim nothing moved.
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import type { ArgumentGraph } from "@/types/argument";
import type { CruxLedgerEntry } from "@/types/cruxLedger";
import { parseCruxLedger } from "./ledger";

export const LEDGER_DIR = path.join("data", "argument");

export function ledgerPath(topicId: string, root: string = process.cwd()): string {
  return path.join(root, LEDGER_DIR, `${topicId}.ledger.json`);
}

/** Returns the file's text, or null when it does not exist. */
export type LedgerReader = (topicId: string) => string | null;

export const readLedgerFromDisk: LedgerReader = (topicId) => {
  try {
    return readFileSync(ledgerPath(topicId), "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
};

/**
 * Every validated entry for the topic, including review-queue entries. Use
 * `publicLedgerEntries` / `ledgerStatus` before showing or ranking anything.
 */
export function loadCruxLedger(
  topicId: string,
  graph: ArgumentGraph,
  read: LedgerReader = readLedgerFromDisk,
): CruxLedgerEntry[] {
  const text = read(topicId);
  if (text === null) return [];

  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch (error) {
    throw new Error(
      `Crux ledger "${topicId}" is not valid JSON: ${(error as Error).message}`,
    );
  }

  if (
    typeof raw === "object" &&
    raw !== null &&
    "topicId" in raw &&
    (raw as { topicId: unknown }).topicId !== topicId
  ) {
    throw new Error(
      `Crux ledger file for "${topicId}" declares topicId "${String((raw as { topicId: unknown }).topicId)}".`,
    );
  }

  const parsed = parseCruxLedger(raw, graph);
  if (!parsed.ok) {
    throw new Error(
      `Crux ledger "${topicId}" failed validation (${parsed.errors.length} errors): ${parsed.errors.slice(0, 5).join("; ")}`,
    );
  }
  return parsed.ledger.entries;
}

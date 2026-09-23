/**
 * Crux ledger: schema, validator, and public projection.
 *
 * Contract: docs/plans/2026-09-22-crux-ledger-and-living-ai-map-spec.md §1.
 * This module is pure (no fs) so the page, the tests, and later the review
 * queue can share it; `ledgerFile.ts` does the disk read.
 *
 * Two layers, mirroring `lib/schemas/argument.ts` + `validate.ts`:
 *   1. `CruxLedgerFileSchema` checks shape alone (field types, id format,
 *      note length, per-status requirements that need no graph).
 *   2. `validateCruxLedger` checks the ledger against its graph (claim and
 *      evidence ids resolve, supersession is well-formed, a current
 *      `resolved` entry is matched by the claim's graph status) and against
 *      the "no verdict language" rule.
 */
import { z } from "zod";
import type { ArgumentGraph, ClaimStatus, ResolutionKind } from "@/types/argument";
import type {
  CruxLedgerEntry,
  CruxLedgerFile,
  CruxLedgerStatus,
  LedgerStatusByClaim,
} from "@/types/cruxLedger";

export const LEDGER_NOTE_MAX_CHARS = 240;

/**
 * Resolution kinds under which evidence cannot settle a crux (spec §1.1): a
 * value fork, a definitional fork, or a who-decides fork.
 */
export const UNRESOLVABLE_KINDS: readonly ResolutionKind[] = [
  "value-difference",
  "definitional-choice",
  "authority-allocation",
];

/**
 * Unresolvable kinds that can never back a `resolved` entry (spec §1.1): a
 * value or definitional fork is not settled by a condition being met.
 * `authority-allocation` is absent on purpose; who decides can be decided.
 */
export const NEVER_RESOLVED_KINDS: readonly ResolutionKind[] = [
  "value-difference",
  "definitional-choice",
];

/**
 * Graph statuses that count as "the claim's status was updated" when a
 * ledger says `resolved` (spec §1.3 rule 1: `broadly_accepted`/`superseded`;
 * `uncontested` is the stronger form of the same move).
 */
const RESOLVED_GRAPH_STATUSES: readonly ClaimStatus[] = [
  "broadly_accepted",
  "uncontested",
  "superseded",
];

/**
 * Who a verdict is usually about: a side of the fight, named generically.
 * Topic-specific position names are not caught; that is an accepted gap.
 */
const SIDE =
  "(?:sides?|camps?|skeptics?|sceptics?|optimists?|pessimists?|proponents?|opponents?|critics?|doomers?|boosters?|alarmists?|believers?|deniers?)";

/** The whole fight, as opposed to one sub-claim or one crux question. */
const FIGHT = "(?:debate|argument|dispute|controversy|science|matter)";

/**
 * The "no verdict language" check on public notes. Deliberately small and
 * defensible rather than clever: each pattern is a phrase whose job is to
 * declare a side the winner or the fight closed, which is the one thing the
 * ledger must not do (it records movement; the reader judges).
 *
 * "Settled", "resolved", and "wins" alone are NOT on the list: the ledger's
 * own vocabulary needs them ("a sub-claim settled", "the timing question is
 * resolved"), and "productivity wins" is ordinary prose. What is on it is
 * those words aimed at a side ("skeptics win", "a victory for the
 * optimists") or at the whole fight ("the debate is settled", "settles the
 * argument", "settled science"). Heuristic by design: false negatives are
 * accepted; false positives on ordinary descriptive prose are not.
 */
export const VERDICT_LANGUAGE_PATTERNS: ReadonlyArray<{ label: string; pattern: RegExp }> = [
  { label: "proven / disproven", pattern: /\b(dis)?prov(en|es|ed)\b/i },
  { label: "debunked", pattern: /\bdebunk(ed|s|ing)?\b/i },
  {
    label: "winner / won the argument",
    pattern: new RegExp(
      `\\b(winners?|(win|wins|won|winning) (the|this) ${FIGHT}|winning (side|camp|argument|position|case)|(wins|won|carries|carried) the day)\\b`,
      "i",
    ),
  },
  {
    label: "a side won or was right",
    pattern: new RegExp(
      `\\b${SIDE} (win|wins|won|prevail|prevails|prevailed|(is|are|was|were|have been|had been) (right|wrong|correct|mistaken))\\b`,
      "i",
    ),
  },
  { label: "victory for a side", pattern: new RegExp(`\\b(win|victory) for (the )?${SIDE}\\b`, "i") },
  { label: "vindicated", pattern: /\bvindicat(e|es|ed|ing|ion)\b/i },
  { label: "right / wrong all along", pattern: /\b(right|wrong) all along\b/i },
  {
    label: "the fight is settled",
    pattern: new RegExp(
      `\\b(${FIGHT} (is|was|has been|are|were) (now )?(settled|resolved|over|closed)|settle[sd]? (the|this) ${FIGHT}|settled (science|fact))\\b`,
      "i",
    ),
  },
  {
    label: "indisputable",
    pattern: /\b(irrefutabl[ey]|indisputabl[ey]|incontrovertibl[ey]|undeniabl[ey]|definitively)\b/i,
  },
  { label: "loser", pattern: /\blosers?\b/i },
  { label: "settled once and for all", pattern: /\bonce and for all\b/i },
  { label: "case closed", pattern: /\bcase (is )?closed\b/i },
  { label: "beyond doubt", pattern: /\bbeyond (any |all |reasonable )?doubt\b/i },
  { label: "conclusively", pattern: /\bconclusively\b/i },
  { label: "myth", pattern: /\bmyths?\b/i },
];

export function findVerdictLanguage(text: string): string[] {
  return VERDICT_LANGUAGE_PATTERNS.filter(({ pattern }) => pattern.test(text)).map(
    ({ label }) => label,
  );
}

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const ISO_DATE_TIME_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d{1,9})?)?(Z|[+-]\d{2}:\d{2})$/;

/** A real calendar date, YYYY-MM-DD (2026-02-30 is rejected). */
function isCalendarDate(value: string): boolean {
  if (!ISO_DATE_RE.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

const IsoDateSchema = z
  .string()
  .refine(isCalendarDate, "must be an ISO calendar date (YYYY-MM-DD)");

const IsoDateOrDateTimeSchema = z
  .string()
  .refine(
    (value) =>
      isCalendarDate(value) ||
      (ISO_DATE_TIME_RE.test(value) &&
        isCalendarDate(value.slice(0, 10)) &&
        !Number.isNaN(Date.parse(value))),
    "must be an ISO date or date-time",
  );

const NonEmptyStringSchema = z.string().trim().min(1);

const ResolutionKindSchema = z.enum([
  "existing-evidence",
  "future-observable",
  "definitional-choice",
  "value-difference",
  "authority-allocation",
]);

const LedgerAuthorSchema = z.discriminatedUnion("kind", [
  z
    .object({
      kind: z.literal("editorial"),
      curator: NonEmptyStringSchema,
      basis: NonEmptyStringSchema,
    })
    .strict(),
  z
    .object({
      kind: z.literal("judgment"),
      modelId: NonEmptyStringSchema,
      promptVersion: NonEmptyStringSchema,
      contentHash: NonEmptyStringSchema,
      validator: z.enum(["pass", "pass-with-warnings"]),
      reviewedBy: NonEmptyStringSchema.optional(),
    })
    .strict(),
]);

export const CruxLedgerEntrySchema = z
  .object({
    id: NonEmptyStringSchema,
    topicId: NonEmptyStringSchema,
    claimId: NonEmptyStringSchema,
    date: IsoDateSchema,
    noticedAt: IsoDateSchema.optional(),
    status: z.enum(["open", "narrowed", "resolved", "unresolvable"]),
    resolutionKind: ResolutionKindSchema.optional(),
    evidenceNodeIds: z.array(NonEmptyStringSchema),
    note: NonEmptyStringSchema.max(
      LEDGER_NOTE_MAX_CHARS,
      `note must be at most ${LEDGER_NOTE_MAX_CHARS} characters`,
    ),
    author: LedgerAuthorSchema,
    supersededBy: NonEmptyStringSchema.optional(),
    createdAt: IsoDateOrDateTimeSchema,
  })
  .strict()
  .superRefine((entry, ctx) => {
    const issue = (message: string, path: string) =>
      ctx.addIssue({ code: "custom", message, path: [path] });

    const expectedPrefix = `${entry.topicId}:${entry.claimId}:${entry.date}:`;
    const seq = entry.id.startsWith(expectedPrefix) ? entry.id.slice(expectedPrefix.length) : "";
    if (!/^[1-9]\d*$/.test(seq)) {
      issue(
        `id must be "${expectedPrefix}<seq>" with seq a positive integer (topicId:claimId:date:seq)`,
        "id",
      );
    }

    if (new Set(entry.evidenceNodeIds).size !== entry.evidenceNodeIds.length) {
      issue("evidenceNodeIds must not repeat an id", "evidenceNodeIds");
    }

    if (entry.noticedAt !== undefined && entry.noticedAt < entry.date) {
      issue("noticedAt (when we picked the source up) cannot precede date (the source's date)", "noticedAt");
    }

    // The latest-dated entry sets the claim's status, so a typo'd future date
    // would pin it there. Nothing can be dated after the day it was written.
    const writtenOn = entry.createdAt.slice(0, 10);
    if (entry.date > writtenOn) {
      issue("date (the source's date) cannot be after createdAt (when the entry was written)", "date");
    }
    if (entry.noticedAt !== undefined && entry.noticedAt > writtenOn) {
      issue("noticedAt cannot be after createdAt (when the entry was written)", "noticedAt");
    }

    if (entry.supersededBy !== undefined && entry.supersededBy === entry.id) {
      issue("an entry cannot supersede itself", "supersededBy");
    }

    // ---- The §1.1 status table ----
    if (entry.status !== "open" && entry.resolutionKind === undefined) {
      issue(`resolutionKind is required when status is "${entry.status}"`, "resolutionKind");
    }

    if (entry.status === "narrowed") {
      const hasEditorialBasis =
        entry.author.kind === "editorial" && entry.author.basis.trim().length > 0;
      if (entry.evidenceNodeIds.length === 0 && !hasEditorialBasis) {
        issue(
          "narrowed requires at least one evidenceNodeId or an editorial basis naming the narrowing",
          "evidenceNodeIds",
        );
      }
    }

    if (entry.status === "resolved" && entry.evidenceNodeIds.length === 0) {
      issue("resolved requires at least one evidenceNodeId", "evidenceNodeIds");
    }

    if (
      entry.status === "unresolvable" &&
      entry.resolutionKind !== undefined &&
      !UNRESOLVABLE_KINDS.includes(entry.resolutionKind)
    ) {
      issue(
        `unresolvable requires resolutionKind in {${UNRESOLVABLE_KINDS.join(", ")}}`,
        "resolutionKind",
      );
    }

    // ---- §1.2 who may write ----
    if (
      entry.author.kind === "judgment" &&
      (entry.status === "resolved" || entry.status === "unresolvable")
    ) {
      issue(
        `a judgment (model) author may only propose open or narrowed; "${entry.status}" must be written by an editorial author`,
        "status",
      );
    }
  });

export const CruxLedgerFileSchema = z
  .object({
    topicId: NonEmptyStringSchema,
    entries: z.array(CruxLedgerEntrySchema),
  })
  .strict();

// ---------------------------------------------------------------------------
// Graph-aware validation
// ---------------------------------------------------------------------------

export interface LedgerIssue {
  rule: string;
  severity: "error" | "warning";
  entryId?: string;
  message: string;
}

export function validateCruxLedger(ledger: CruxLedgerFile, graph: ArgumentGraph): LedgerIssue[] {
  const issues: LedgerIssue[] = [];
  const nodesById = new Map(graph.nodes.map((node) => [node.id, node]));
  const entriesById = new Map<string, CruxLedgerEntry>();

  if (ledger.topicId !== graph.topicId) {
    issues.push({
      rule: "ledger-topic-matches-graph",
      severity: "error",
      message: `Ledger topicId "${ledger.topicId}" does not match graph topicId "${graph.topicId}".`,
    });
  }

  for (const entry of ledger.entries) {
    if (entriesById.has(entry.id)) {
      issues.push({
        rule: "entry-id-unique",
        severity: "error",
        entryId: entry.id,
        message: `Duplicate ledger entry id "${entry.id}".`,
      });
    }
    entriesById.set(entry.id, entry);
  }

  for (const entry of ledger.entries) {
    if (entry.topicId !== ledger.topicId) {
      issues.push({
        rule: "entry-topic-matches-ledger",
        severity: "error",
        entryId: entry.id,
        message: `Entry topicId "${entry.topicId}" does not match ledger topicId "${ledger.topicId}".`,
      });
    }

    const claim = nodesById.get(entry.claimId);
    if (claim?.type !== "claim") {
      issues.push({
        rule: "claim-resolves",
        severity: "error",
        entryId: entry.id,
        message:
          claim === undefined
            ? `claimId "${entry.claimId}" does not exist in the graph.`
            : `claimId "${entry.claimId}" is a ${claim.type.toUpperCase()}, not a CLAIM.`,
      });
    }

    for (const evidenceId of entry.evidenceNodeIds) {
      const node = nodesById.get(evidenceId);
      if (node?.type !== "evidence") {
        issues.push({
          rule: "evidence-resolves",
          severity: "error",
          entryId: entry.id,
          message:
            node === undefined
              ? `evidenceNodeId "${evidenceId}" does not exist in the graph.`
              : `evidenceNodeId "${evidenceId}" is a ${node.type.toUpperCase()}, not EVIDENCE.`,
        });
      }
    }

    if (entry.supersededBy !== undefined && entry.supersededBy !== entry.id) {
      const correction = entriesById.get(entry.supersededBy);
      if (correction === undefined) {
        issues.push({
          rule: "superseded-by-resolves",
          severity: "error",
          entryId: entry.id,
          message: `supersededBy "${entry.supersededBy}" is not an entry in this ledger.`,
        });
      } else if (correction.claimId !== entry.claimId) {
        // Otherwise one claim's history silently vanishes and turns up as a
        // "correction" on another claim's card.
        issues.push({
          rule: "superseded-by-same-claim",
          severity: "error",
          entryId: entry.id,
          message: `supersededBy "${entry.supersededBy}" is an entry for claim "${correction.claimId}", not "${entry.claimId}"; a correction must be about the same claim.`,
        });
      }
    }

    const verdictWords = findVerdictLanguage(entry.note);
    if (verdictWords.length > 0) {
      issues.push({
        rule: "note-no-verdict-language",
        severity: "error",
        entryId: entry.id,
        message: `note uses verdict language (${verdictWords.join(", ")}); describe the movement, not a winner.`,
      });
    }

    if (entry.author.kind === "judgment" && entry.author.reviewedBy === undefined) {
      issues.push({
        rule: "judgment-unreviewed",
        severity: "warning",
        entryId: entry.id,
        message: "Unreviewed judgment entry: held in the review queue, hidden from the engine and the public page.",
      });
    }
  }

  // §1.1: `resolved` means the stated condition was met. A value or
  // definitional fork has no condition evidence can meet, so neither kind can
  // be resolved. `authority-allocation` can: a court or legislature can
  // settle who decides.
  for (const entry of ledger.entries) {
    if (
      entry.status === "resolved" &&
      entry.resolutionKind !== undefined &&
      NEVER_RESOLVED_KINDS.includes(entry.resolutionKind)
    ) {
      issues.push({
        rule: "resolved-kind-not-resolvable",
        severity: "error",
        entryId: entry.id,
        message: `resolved cannot carry resolutionKind "${entry.resolutionKind}": a value or definitional fork is never met by a condition. Use "unresolvable", or a resolvable kind if evidence settled it.`,
      });
    }
  }

  issues.push(...reopenIssues(ledger.entries));

  const cycleAt = firstSupersessionCycle(ledger.entries, entriesById);
  if (cycleAt !== undefined) {
    issues.push({
      rule: "supersession-acyclic",
      severity: "error",
      entryId: cycleAt,
      message: `supersededBy chain starting at "${cycleAt}" loops back on itself.`,
    });
  }

  // A public `resolved` must be matched by the graph edit (spec §2.2): the
  // claim's status moves off contested/unresolved in the same change.
  const statusByClaim = ledgerStatus(ledger.entries);
  for (const [claimId, status] of Object.entries(statusByClaim)) {
    if (status !== "resolved") continue;
    const claim = nodesById.get(claimId);
    if (claim?.type === "claim" && !RESOLVED_GRAPH_STATUSES.includes(claim.status)) {
      issues.push({
        rule: "resolved-claim-status-updated",
        severity: "error",
        entryId: currentPublicEntry(ledger.entries, claimId)?.id,
        message: `Claim "${claimId}" is resolved in the ledger but still "${claim.status}" in the graph; update its status (${RESOLVED_GRAPH_STATUSES.join(" / ")}) in the same change.`,
      });
    }
  }

  return issues;
}

/** Statuses that close a claim; only an editorial author may move it off one. */
const CLOSED_STATUSES: readonly CruxLedgerStatus[] = ["resolved", "unresolvable"];

/**
 * §1.2: leaving `resolved` or `unresolvable` is an editorial act. For each
 * entry still in force (public or queued), find the claim's in-force public
 * entry just before it; if that entry closed the claim and this one moves it
 * to a different status, the author must be editorial. A queued model
 * proposal to reopen is flagged too, so it never reaches review looking valid.
 */
function reopenIssues(entries: readonly CruxLedgerEntry[]): LedgerIssue[] {
  const issues: LedgerIssue[] = [];
  const inForcePublic = publicLedgerEntries(entries);
  const publicIds = new Set(entries.filter(isPublicEntry).map((entry) => entry.id));
  const candidates = entries
    .filter((entry) => entry.supersededBy === undefined || !publicIds.has(entry.supersededBy))
    .sort(compareLedgerEntries);

  for (const entry of candidates) {
    if (entry.author.kind === "editorial") continue;
    const previous = inForcePublic
      .filter(
        (candidate) =>
          candidate.claimId === entry.claimId &&
          candidate.id !== entry.id &&
          compareLedgerEntries(candidate, entry) < 0,
      )
      .at(-1);
    if (
      previous !== undefined &&
      CLOSED_STATUSES.includes(previous.status) &&
      previous.status !== entry.status
    ) {
      issues.push({
        rule: "reopen-requires-editorial",
        severity: "error",
        entryId: entry.id,
        message: `Claim "${entry.claimId}" is ${previous.status} as of ${previous.date}; moving it to "${entry.status}" must be written by an editorial author.`,
      });
    }
  }
  return issues;
}

function firstSupersessionCycle(
  entries: CruxLedgerEntry[],
  entriesById: Map<string, CruxLedgerEntry>,
): string | undefined {
  for (const start of entries) {
    const seen = new Set<string>([start.id]);
    let next = start.supersededBy;
    while (next !== undefined) {
      if (seen.has(next)) return start.id;
      seen.add(next);
      next = entriesById.get(next)?.supersededBy;
    }
  }
  return undefined;
}

// ---------------------------------------------------------------------------
// Parse = schema + graph validation
// ---------------------------------------------------------------------------

export type ParseCruxLedgerResult =
  | { ok: true; ledger: CruxLedgerFile; warnings: LedgerIssue[] }
  | { ok: false; errors: string[] };

export function parseCruxLedger(input: unknown, graph: ArgumentGraph): ParseCruxLedgerResult {
  const result = CruxLedgerFileSchema.safeParse(input);
  if (!result.success) {
    return {
      ok: false,
      errors: result.error.issues.map((issue) => {
        const path = issue.path.length > 0 ? `${issue.path.join(".")}: ` : "";
        return `${path}${issue.message}`;
      }),
    };
  }

  const ledger = result.data as CruxLedgerFile;
  const issues = validateCruxLedger(ledger, graph);
  const errors = issues.filter((issue) => issue.severity === "error");
  if (errors.length > 0) {
    return {
      ok: false,
      errors: errors.map((issue) =>
        issue.entryId ? `${issue.entryId}: [${issue.rule}] ${issue.message}` : `[${issue.rule}] ${issue.message}`,
      ),
    };
  }
  return { ok: true, ledger, warnings: issues.filter((issue) => issue.severity === "warning") };
}

// ---------------------------------------------------------------------------
// Public projection (spec §1.2) and ledgerStatus (spec §1.3)
// ---------------------------------------------------------------------------

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

function currentPublicEntry(
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

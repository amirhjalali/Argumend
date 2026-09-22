import { describe, expect, it } from "vitest";
import type { CruxLedgerEntry, CruxLedgerFile } from "@/types/cruxLedger";
import type { ResolutionKind } from "@/types/argument";
import { workedExampleGraph } from "./fixtures";
import {
  CruxLedgerEntrySchema,
  LEDGER_NOTE_MAX_CHARS,
  UNRESOLVABLE_KINDS,
  claimMovement,
  findVerdictLanguage,
  isPublicEntry,
  ledgerStatus,
  parseCruxLedger,
  publicLedgerEntries,
  validateCruxLedger,
} from "./ledger";

// Worked example graph: topicId "ai-jobs"; contested claims c1–c4, broadly
// accepted c5/c6; evidence e1–e3; position p1; inference i1.
const graph = workedExampleGraph();
const TOPIC = "ai-jobs";

const editorial = { kind: "editorial" as const, curator: "Argumend editors", basis: "Map baseline" };
const reviewedJudgment = {
  kind: "judgment" as const,
  modelId: "model-x",
  promptVersion: "ledger-v1",
  contentHash: "sha256:abc",
  validator: "pass" as const,
  reviewedBy: "Argumend editors",
};
const unreviewedJudgment = { ...reviewedJudgment, reviewedBy: undefined };

function entry(overrides: Partial<CruxLedgerEntry> = {}): CruxLedgerEntry {
  const claimId = overrides.claimId ?? "c2";
  const date = overrides.date ?? "2026-01-15";
  const base: CruxLedgerEntry = {
    id: `${TOPIC}:${claimId}:${date}:1`,
    topicId: TOPIC,
    claimId,
    date,
    status: "open",
    evidenceNodeIds: [],
    note: "Attribution still rests on occupation-level declines.",
    author: editorial,
    createdAt: "2026-09-22",
  };
  const merged = { ...base, ...overrides };
  if (overrides.id === undefined) merged.id = `${TOPIC}:${merged.claimId}:${merged.date}:1`;
  // Drop explicit undefineds so the strict schema sees absent keys.
  return JSON.parse(JSON.stringify(merged)) as CruxLedgerEntry;
}

function ledger(...entries: CruxLedgerEntry[]): CruxLedgerFile {
  return { topicId: TOPIC, entries };
}

function schemaErrors(value: unknown): string[] {
  const result = CruxLedgerEntrySchema.safeParse(value);
  return result.success ? [] : result.error.issues.map((issue) => issue.message);
}

function rules(file: CruxLedgerFile, severity: "error" | "warning" = "error"): string[] {
  return validateCruxLedger(file, graph)
    .filter((issue) => issue.severity === severity)
    .map((issue) => issue.rule);
}

function parses(file: unknown): boolean {
  return parseCruxLedger(file, graph).ok;
}

describe("crux ledger schema: shape", () => {
  it("accepts a minimal open entry", () => {
    expect(schemaErrors(entry())).toEqual([]);
    expect(parses(ledger(entry()))).toBe(true);
  });

  it("enforces the id format topicId:claimId:date:seq", () => {
    expect(schemaErrors(entry({ id: `${TOPIC}:c2:2026-01-15:2` }))).toEqual([]);
    expect(schemaErrors(entry({ id: `${TOPIC}:c2:2026-01-15:12` }))).toEqual([]);
    for (const bad of [
      `${TOPIC}:c2:2026-01-15`,
      `${TOPIC}:c2:2026-01-15:0`,
      `${TOPIC}:c2:2026-01-15:01`,
      `${TOPIC}:c2:2026-01-15:a`,
      `${TOPIC}:c3:2026-01-15:1`,
      `other:c2:2026-01-15:1`,
      `${TOPIC}:c2:2026-01-16:1`,
    ]) {
      expect(schemaErrors(entry({ id: bad })).join(" "), bad).toMatch(/id must be/);
    }
  });

  it("requires real ISO calendar dates for date and noticedAt", () => {
    for (const bad of ["2026-02-30", "2026-09", "2026/09/01", "Sep 1 2026", "2026-13-01"]) {
      expect(schemaErrors({ ...entry(), date: bad }).length, bad).toBeGreaterThan(0);
      expect(schemaErrors(entry({ noticedAt: bad })).length, bad).toBeGreaterThan(0);
    }
  });

  it("accepts noticedAt on or after the source date, rejects it before", () => {
    expect(schemaErrors(entry({ noticedAt: "2026-01-15" }))).toEqual([]);
    expect(schemaErrors(entry({ noticedAt: "2026-09-22" }))).toEqual([]);
    expect(schemaErrors(entry({ noticedAt: "2025-12-31" })).join(" ")).toMatch(/cannot precede/);
  });

  it("rejects a date or noticedAt after the day the entry was written", () => {
    expect(schemaErrors(entry({ date: "2026-09-22" }))).toEqual([]);
    expect(schemaErrors(entry({ date: "2062-09-22" })).join(" ")).toMatch(/date .* cannot be after createdAt/);
    expect(schemaErrors(entry({ noticedAt: "2026-09-23" })).join(" ")).toMatch(
      /noticedAt cannot be after createdAt/,
    );
  });

  it("accepts createdAt as an ISO date or zoned date-time only", () => {
    expect(schemaErrors(entry({ createdAt: "2026-09-22T00:00:00Z" }))).toEqual([]);
    expect(schemaErrors(entry({ createdAt: "2026-09-22T10:30:00.000+02:00" }))).toEqual([]);
    expect(schemaErrors(entry({ createdAt: "2026-09-22T10:30:00" })).length).toBeGreaterThan(0);
    expect(schemaErrors(entry({ createdAt: "yesterday" })).length).toBeGreaterThan(0);
  });

  it(`caps the note at ${LEDGER_NOTE_MAX_CHARS} characters and forbids an empty one`, () => {
    expect(schemaErrors(entry({ note: "x".repeat(LEDGER_NOTE_MAX_CHARS) }))).toEqual([]);
    expect(schemaErrors(entry({ note: "x".repeat(LEDGER_NOTE_MAX_CHARS + 1) })).join(" ")).toMatch(
      /at most 240/,
    );
    expect(schemaErrors(entry({ note: "   " })).length).toBeGreaterThan(0);
  });

  it("is strict about unknown keys and repeated evidence ids", () => {
    expect(schemaErrors({ ...entry(), verdict: "yes" }).length).toBeGreaterThan(0);
    expect(schemaErrors({ ...entry(), author: { ...editorial, extra: 1 } }).length).toBeGreaterThan(0);
    expect(schemaErrors(entry({ evidenceNodeIds: ["e1", "e1"] })).join(" ")).toMatch(/repeat/);
    expect(parses({ topicId: TOPIC, entries: [], note: "x" })).toBe(false);
  });

  it("requires basis and curator on editorial authors", () => {
    expect(schemaErrors(entry({ author: { ...editorial, basis: "" } })).length).toBeGreaterThan(0);
    expect(schemaErrors(entry({ author: { ...editorial, curator: " " } })).length).toBeGreaterThan(0);
  });
});

describe("crux ledger schema: the §1.1 status table", () => {
  describe("open", () => {
    it("needs nothing beyond the note, with or without evidence", () => {
      expect(schemaErrors(entry({ status: "open" }))).toEqual([]);
      expect(schemaErrors(entry({ status: "open", evidenceNodeIds: ["e1"] }))).toEqual([]);
    });
  });

  describe("narrowed", () => {
    it("requires a resolutionKind", () => {
      expect(schemaErrors(entry({ status: "narrowed", evidenceNodeIds: ["e2"] })).join(" ")).toMatch(
        /resolutionKind is required/,
      );
    });

    it("passes with evidence", () => {
      expect(
        schemaErrors(
          entry({ status: "narrowed", resolutionKind: "existing-evidence", evidenceNodeIds: ["e2"] }),
        ),
      ).toEqual([]);
    });

    it("passes editorial-only when the basis names the narrowing", () => {
      expect(
        schemaErrors(entry({ status: "narrowed", resolutionKind: "existing-evidence", evidenceNodeIds: [] })),
      ).toEqual([]);
    });

    it("fails for a model proposal with neither evidence nor editorial basis", () => {
      expect(
        schemaErrors(
          entry({
            status: "narrowed",
            resolutionKind: "existing-evidence",
            evidenceNodeIds: [],
            author: reviewedJudgment,
          }),
        ).join(" "),
      ).toMatch(/narrowed requires/);
      expect(
        schemaErrors(
          entry({
            status: "narrowed",
            resolutionKind: "existing-evidence",
            evidenceNodeIds: ["e2"],
            author: reviewedJudgment,
          }),
        ),
      ).toEqual([]);
    });
  });

  describe("resolved", () => {
    const resolved = (overrides: Partial<CruxLedgerEntry> = {}) =>
      entry({
        claimId: "c5",
        status: "resolved",
        resolutionKind: "existing-evidence",
        evidenceNodeIds: ["e2"],
        ...overrides,
      });

    it("passes with resolutionKind, evidence, and the claim's graph status updated", () => {
      expect(schemaErrors(resolved())).toEqual([]);
      expect(rules(ledger(resolved()))).toEqual([]);
    });

    it("requires at least one evidence node", () => {
      expect(schemaErrors(resolved({ evidenceNodeIds: [] })).join(" ")).toMatch(
        /resolved requires at least one evidenceNodeId/,
      );
    });

    it("requires a resolutionKind", () => {
      expect(schemaErrors(resolved({ resolutionKind: undefined })).join(" ")).toMatch(
        /resolutionKind is required/,
      );
    });

    it("fails when the claim is still contested in the graph", () => {
      expect(rules(ledger(resolved({ claimId: "c2" })))).toEqual(["resolved-claim-status-updated"]);
    });

    it("only checks the graph against the current entry, not a superseded one", () => {
      const wrong = resolved({ claimId: "c2", supersededBy: `${TOPIC}:c2:2026-01-15:2` });
      const correction = entry({ id: `${TOPIC}:c2:2026-01-15:2`, note: "Corrected: the panel was retracted." });
      expect(rules(ledger(wrong, correction))).toEqual([]);
    });
  });

  describe("unresolvable", () => {
    it.each(UNRESOLVABLE_KINDS)("passes with resolutionKind %s", (kind) => {
      expect(schemaErrors(entry({ claimId: "c3", status: "unresolvable", resolutionKind: kind }))).toEqual([]);
    });

    it.each(["existing-evidence", "future-observable"] as ResolutionKind[])(
      "fails with evidentiary resolutionKind %s",
      (kind) => {
        expect(
          schemaErrors(entry({ claimId: "c3", status: "unresolvable", resolutionKind: kind })).join(" "),
        ).toMatch(/unresolvable requires resolutionKind in/);
      },
    );

    it("fails without a resolutionKind", () => {
      expect(schemaErrors(entry({ claimId: "c3", status: "unresolvable" })).join(" ")).toMatch(
        /resolutionKind is required/,
      );
    });
  });
});

describe("crux ledger: §1.2 who may write", () => {
  it("rejects resolved and unresolvable from a model author, reviewed or not", () => {
    for (const author of [reviewedJudgment, unreviewedJudgment]) {
      expect(
        schemaErrors(
          entry({ claimId: "c3", status: "unresolvable", resolutionKind: "definitional-choice", author }),
        ).join(" "),
      ).toMatch(/may only propose open or narrowed/);
      expect(
        schemaErrors(
          entry({
            claimId: "c5",
            status: "resolved",
            resolutionKind: "existing-evidence",
            evidenceNodeIds: ["e2"],
            author,
          }),
        ).join(" "),
      ).toMatch(/may only propose open or narrowed/);
    }
  });

  it("accepts an unreviewed model proposal but flags it as queue-only", () => {
    const proposal = entry({ author: unreviewedJudgment });
    expect(parses(ledger(proposal))).toBe(true);
    expect(rules(ledger(proposal), "warning")).toEqual(["judgment-unreviewed"]);
    expect(isPublicEntry(proposal)).toBe(false);
    expect(isPublicEntry(entry({ author: reviewedJudgment }))).toBe(true);
    expect(isPublicEntry(entry())).toBe(true);
  });
});

describe("crux ledger: graph references", () => {
  it("requires claimId to resolve to a CLAIM", () => {
    expect(rules(ledger(entry({ claimId: "c-missing" })))).toEqual(["claim-resolves"]);
    expect(rules(ledger(entry({ claimId: "e1" })))).toEqual(["claim-resolves"]);
    expect(rules(ledger(entry({ claimId: "p1" })))).toEqual(["claim-resolves"]);
  });

  it("requires every evidenceNodeId to resolve to EVIDENCE in the same graph", () => {
    expect(rules(ledger(entry({ evidenceNodeIds: ["e1", "e3"] })))).toEqual([]);
    expect(rules(ledger(entry({ evidenceNodeIds: ["e-missing"] })))).toEqual(["evidence-resolves"]);
    expect(rules(ledger(entry({ evidenceNodeIds: ["c1"] })))).toEqual(["evidence-resolves"]);
  });

  it("requires ledger, entry, and graph topic ids to agree", () => {
    expect(rules({ topicId: "other", entries: [] })).toEqual(["ledger-topic-matches-graph"]);
    const foreign = entry({ topicId: "other", id: "other:c2:2026-01-15:1" });
    expect(rules(ledger(foreign))).toEqual(["entry-topic-matches-ledger"]);
  });

  it("rejects duplicate entry ids", () => {
    expect(rules(ledger(entry(), entry()))).toEqual(["entry-id-unique"]);
  });
});

describe("crux ledger: supersession", () => {
  const first = entry({ date: "2026-01-15", supersededBy: `${TOPIC}:c2:2026-01-15:2` });
  const correction = entry({ id: `${TOPIC}:c2:2026-01-15:2`, note: "Corrected date and source." });

  it("accepts a correction that supersedes an existing entry", () => {
    expect(rules(ledger(first, correction))).toEqual([]);
  });

  it("requires supersededBy to point to an entry in the ledger", () => {
    expect(rules(ledger(first))).toEqual(["superseded-by-resolves"]);
  });

  it("rejects a correction about a different claim", () => {
    const otherClaim = entry({ claimId: "c3" });
    const misdirected = { ...first, supersededBy: otherClaim.id };
    expect(rules(ledger(misdirected, otherClaim))).toEqual(["superseded-by-same-claim"]);
  });

  it("rejects self-supersession and cycles", () => {
    expect(schemaErrors(entry({ supersededBy: `${TOPIC}:c2:2026-01-15:1` })).join(" ")).toMatch(
      /supersede itself/,
    );
    const loopBack = { ...correction, supersededBy: first.id };
    expect(rules(ledger(first, loopBack))).toContain("supersession-acyclic");
  });
});

describe("crux ledger: no verdict language", () => {
  it.each([
    "The 2025 panel proved the displacement case.",
    "This disproves the automation-panic camp.",
    "The Klarna story is debunked.",
    "Optimists are the clear winner here.",
    "Economists won the argument in 2025.",
    "Skeptics were the losers of this round.",
    "Settled once and for all by payroll data.",
    "Case closed on attribution.",
    "Shown beyond reasonable doubt.",
    "The data conclusively favor the pessimists.",
    "The retraining myth persists.",
    // A side named as the winner, or as right all along.
    "The skeptics win this round.",
    "Optimists won on the timing question.",
    "The pessimists were right about entry-level roles.",
    "Critics were wrong about the wage data.",
    "A clear victory for the skeptics.",
    "A win for the optimists' case.",
    "The payroll series vindicates the displacement camp.",
    "Economists who warned early were right all along.",
    "The winning side here is the adoption-lag camp.",
    "The firm panel carries the day.",
    // The whole fight declared closed.
    "The debate is settled by the 2025 panel.",
    "With this panel the argument is now over.",
    "The Census data settles the debate.",
    "This is settled science.",
    "The science is settled on timing.",
    "The panel is indisputable on attribution.",
    "It definitively rules out the lag story.",
  ])("rejects %j", (note) => {
    expect(findVerdictLanguage(note).length).toBeGreaterThan(0);
    expect(rules(ledger(entry({ note })))).toEqual(["note-no-verdict-language"]);
  });

  it.each([
    "A sub-claim settled: half the postings decline predates ChatGPT.",
    "The timing question is resolved; attribution is not.",
    "Firms report productivity wins without cutting headcount.",
    "Wage data improved; the approved retraining budget did not change.",
    // The ledger's own vocabulary, aimed at a sub-claim, stays usable.
    "Productivity wins at two firms did not change their hiring plans.",
    "The prevailing wage series was revised in March.",
    "Critics note the panel covers only large firms.",
    "Skeptics point to the 2025 panel; optimists point to the lag.",
    "Once the timing sub-claim settled, attribution became the live question.",
    "The sampling dispute over one survey was resolved by a re-weighting.",
    "The Census data settles when the decline began, not why.",
  ])("allows ordinary descriptive prose %j", (note) => {
    expect(findVerdictLanguage(note)).toEqual([]);
    expect(rules(ledger(entry({ note })))).toEqual([]);
  });
});

describe("parseCruxLedger", () => {
  it("returns the ledger and warnings on success, messages with entry ids on failure", () => {
    const ok = parseCruxLedger(ledger(entry()), graph);
    expect(ok).toEqual({ ok: true, ledger: ledger(entry()), warnings: [] });

    const bad = parseCruxLedger(ledger(entry({ claimId: "c-missing" })), graph);
    expect(bad.ok).toBe(false);
    if (!bad.ok) expect(bad.errors[0]).toMatch(/^ai-jobs:c-missing:2026-01-15:1: \[claim-resolves\]/);

    const shape = parseCruxLedger({ topicId: TOPIC, entries: [{ id: "x" }] }, graph);
    expect(shape.ok).toBe(false);
  });
});

describe("public projection and ledgerStatus", () => {
  const open = entry({ date: "2025-03-01", note: "Nothing has moved it." });
  const narrowed = entry({
    date: "2025-09-01",
    status: "narrowed",
    resolutionKind: "existing-evidence",
    evidenceNodeIds: ["e2"],
  });
  const laterSameDay = entry({
    id: `${TOPIC}:c2:2025-09-01:2`,
    date: "2025-09-01",
    note: "Reopened the same day after a correction to the panel.",
  });
  const proposal = entry({
    date: "2026-06-01",
    status: "narrowed",
    resolutionKind: "existing-evidence",
    evidenceNodeIds: ["e1"],
    author: unreviewedJudgment,
  });
  const valueFork = entry({ claimId: "c3", status: "unresolvable", resolutionKind: "definitional-choice" });

  it("orders by date then seq, whatever the array order", () => {
    expect(publicLedgerEntries([laterSameDay, valueFork, narrowed, open]).map((e) => e.id)).toEqual([
      open.id,
      narrowed.id,
      laterSameDay.id,
      valueFork.id,
    ]);
    expect(ledgerStatus([laterSameDay, narrowed, open])).toEqual({ c2: "open" });
    expect(ledgerStatus([narrowed, open])).toEqual({ c2: "narrowed" });
  });

  it("never lets an unreviewed model proposal move the public status", () => {
    expect(ledgerStatus([open, proposal])).toEqual({ c2: "open" });
    expect(publicLedgerEntries([open, proposal])).toEqual([open]);
    const reviewed = { ...proposal, author: reviewedJudgment };
    expect(ledgerStatus([open, reviewed])).toEqual({ c2: "narrowed" });
  });

  it("drops superseded entries, but only when the correction is itself public", () => {
    const retracted = { ...narrowed, supersededBy: laterSameDay.id };
    expect(ledgerStatus([open, retracted, laterSameDay])).toEqual({ c2: "open" });
    expect(publicLedgerEntries([open, retracted, laterSameDay]).map((e) => e.id)).toEqual([
      open.id,
      laterSameDay.id,
    ]);

    const queuedCorrection = { ...laterSameDay, author: unreviewedJudgment };
    expect(publicLedgerEntries([open, retracted, queuedCorrection]).map((e) => e.id)).toEqual([
      open.id,
      narrowed.id,
    ]);
  });

  it("is empty for an empty ledger (absent means today's behavior)", () => {
    expect(ledgerStatus([])).toEqual({});
    expect(publicLedgerEntries([])).toEqual([]);
  });

  it("claimMovement returns one claim's public history and what each entry corrects", () => {
    const retracted = { ...narrowed, supersededBy: laterSameDay.id };
    const movement = claimMovement([valueFork, retracted, laterSameDay, open, proposal], "c2");
    expect(movement.map((m) => m.entry.id)).toEqual([open.id, laterSameDay.id]);
    expect(movement[1].corrects).toEqual(["2025-09-01"]);
    expect(claimMovement([valueFork], "c2")).toEqual([]);
  });
});

import { describe, expect, it } from "vitest";
import path from "node:path";
import { workedExampleGraph } from "./fixtures";
import { ledgerPath, loadCruxLedger, readLedgerFromDisk } from "./ledgerFile";
import { loadArgumentTopic } from "./draftTopics";

const graph = workedExampleGraph(); // topicId "ai-jobs"

const validFile = {
  topicId: "ai-jobs",
  entries: [
    {
      id: "ai-jobs:c2:2025-04-10:1",
      topicId: "ai-jobs",
      claimId: "c2",
      date: "2025-04-10",
      noticedAt: "2026-09-22",
      status: "narrowed",
      resolutionKind: "existing-evidence",
      evidenceNodeIds: ["e2"],
      note: "Nearly half the postings decline predates ChatGPT, so at most part of the drop can be AI.",
      author: { kind: "editorial", curator: "Argumend editors", basis: "Indeed pre-ChatGPT timing" },
      createdAt: "2026-09-22T00:00:00Z",
    },
  ],
};

const reader = (text: string | null) => () => text;

describe("crux ledger loader", () => {
  it("resolves data/argument/<topicId>.ledger.json under the project root", () => {
    expect(ledgerPath("ai-mass-unemployment", "/repo")).toBe(
      path.join("/repo", "data", "argument", "ai-mass-unemployment.ledger.json"),
    );
  });

  it("treats a missing file as an empty ledger", () => {
    expect(loadCruxLedger("ai-jobs", graph, reader(null))).toEqual([]);
    expect(readLedgerFromDisk("no-such-topic-ledger")).toBeNull();
  });

  it("returns validated entries from a valid file", () => {
    const entries = loadCruxLedger("ai-jobs", graph, reader(JSON.stringify(validFile)));
    expect(entries).toHaveLength(1);
    expect(entries[0]).toMatchObject({ claimId: "c2", status: "narrowed", noticedAt: "2026-09-22" });
  });

  it("fails loudly on malformed JSON", () => {
    expect(() => loadCruxLedger("ai-jobs", graph, reader("{ not json"))).toThrow(/not valid JSON/);
  });

  it("fails loudly when the file declares another topic", () => {
    const text = JSON.stringify({ ...validFile, topicId: "capitalism-after-ai" });
    expect(() => loadCruxLedger("ai-jobs", graph, reader(text))).toThrow(/declares topicId/);
  });

  it("fails loudly when an entry does not validate against the graph", () => {
    const broken = structuredClone(validFile);
    broken.entries[0].evidenceNodeIds = ["e-not-in-graph"];
    expect(() => loadCruxLedger("ai-jobs", graph, reader(JSON.stringify(broken)))).toThrow(
      /failed validation.*evidence-resolves/,
    );
  });

  it("keeps review-queue entries in the loaded ledger (projection happens at render)", () => {
    const withProposal = structuredClone(validFile) as { topicId: string; entries: Record<string, unknown>[] };
    withProposal.entries.push({
      ...validFile.entries[0],
      id: "ai-jobs:c2:2025-04-10:2",
      author: {
        kind: "judgment",
        modelId: "model-x",
        promptVersion: "ledger-v1",
        contentHash: "sha256:abc",
        validator: "pass",
      },
    });
    expect(loadCruxLedger("ai-jobs", graph, reader(JSON.stringify(withProposal)))).toHaveLength(2);
  });
});

describe("loadArgumentTopic + ledger", () => {
  it("loads an empty ledger for a flagship with no ledger file, without touching the cache", () => {
    const topic = loadArgumentTopic("capitalism-after-ai", { readLedger: () => null });
    expect(topic?.ledger).toEqual([]);
    expect(loadArgumentTopic("capitalism-after-ai")).not.toBe(topic);
  });

  it("validates a supplied ledger against the flagship graph", () => {
    const topicId = "capitalism-after-ai";
    const bad = JSON.stringify({
      topicId,
      entries: [
        {
          id: `${topicId}:c-not-a-claim:2026-01-01:1`,
          topicId,
          claimId: "c-not-a-claim",
          date: "2026-01-01",
          status: "open",
          evidenceNodeIds: [],
          note: "Nothing has moved it.",
          author: { kind: "editorial", curator: "Argumend editors", basis: "baseline" },
          createdAt: "2026-09-22",
        },
      ],
    });
    expect(() => loadArgumentTopic(topicId, { readLedger: () => bad })).toThrow(/claim-resolves/);
  });
});

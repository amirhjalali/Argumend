/**
 * REQUIRED regression (crux-ledger spec §1.3 rule 4, §4 week 1): the ledger
 * is additive. With an empty ledger, `identifyCruxes` output for every
 * flagship map is byte-for-byte what it was before ledgers existed.
 *
 * `__fixtures__/flagship-cruxes.baseline.json` was captured from the engine
 * on the commit before any ledger code landed. If a deliberate GRAPH edit
 * changes a flagship's ranking, regenerate it with
 *   UPDATE_CRUX_BASELINE=1 bunx vitest run lib/crux/ledgerRegression.test.ts
 * and review the diff in the same PR. A ledger change must never require it.
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { argumentTopicIds, loadArgumentTopic } from "@/lib/argument/draftTopics";
import { ledgerStatus } from "@/lib/argument/ledger";
import { identifyCruxes } from "./rank";

const BASELINE_PATH = path.join(__dirname, "__fixtures__", "flagship-cruxes.baseline.json");

if (process.env.UPDATE_CRUX_BASELINE === "1") {
  const fresh: Record<string, unknown> = {};
  for (const id of [...argumentTopicIds].sort()) {
    fresh[id] = identifyCruxes(loadArgumentTopic(id, { readLedger: () => null })!.graph);
  }
  writeFileSync(BASELINE_PATH, `${JSON.stringify(fresh, null, 2)}\n`);
}

const baseline = JSON.parse(readFileSync(BASELINE_PATH, "utf8")) as Record<string, unknown>;

describe("empty crux ledger reproduces today's ranking byte-for-byte", () => {
  it("has a baseline for exactly the flagship maps", () => {
    expect(Object.keys(baseline).sort()).toEqual([...argumentTopicIds].sort());
  });

  for (const topicId of argumentTopicIds) {
    it(`${topicId}`, () => {
      const topic = loadArgumentTopic(topicId, { readLedger: () => null });
      expect(topic).not.toBeNull();
      expect(topic!.ledger).toEqual([]);

      const expected = JSON.stringify(baseline[topicId]);
      // Through the loader, with an empty ledger file.
      expect(JSON.stringify(topic!.cruxes)).toBe(expected);
      // Through the engine, with the empty ledger's status map supplied.
      const emptyStatus = ledgerStatus(topic!.ledger);
      expect(emptyStatus).toEqual({});
      expect(JSON.stringify(identifyCruxes(topic!.graph, { ledgerStatus: emptyStatus }))).toBe(expected);
      // And with no option at all.
      expect(JSON.stringify(identifyCruxes(topic!.graph))).toBe(expected);
    });
  }

  it("week 1: a published ledger on disk does not feed the ranking yet", () => {
    for (const topicId of argumentTopicIds) {
      const topic = loadArgumentTopic(topicId);
      expect(JSON.stringify(topic!.cruxes)).toBe(JSON.stringify(baseline[topicId]));
    }
  });

  it("week 1: a non-empty ledger does not feed the ranking yet", () => {
    for (const topicId of argumentTopicIds) {
      const topClaim = (baseline[topicId] as Array<{ claimId: string }>)[0].claimId;
      const file = {
        topicId,
        entries: [
          {
            id: `${topicId}:${topClaim}:2025-06-01:1`,
            topicId,
            claimId: topClaim,
            date: "2025-06-01",
            status: "narrowed",
            resolutionKind: "existing-evidence",
            evidenceNodeIds: [],
            note: "A scope limit was accepted by both sides.",
            author: { kind: "editorial", curator: "Test", basis: "Regression fixture" },
            createdAt: "2026-09-22",
          },
        ],
      };
      const topic = loadArgumentTopic(topicId, { readLedger: () => JSON.stringify(file) });
      expect(ledgerStatus(topic!.ledger)).toEqual({ [topClaim]: "narrowed" });
      expect(JSON.stringify(topic!.cruxes)).toBe(JSON.stringify(baseline[topicId]));
    }
  });
});

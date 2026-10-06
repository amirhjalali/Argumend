/**
 * "What would settle it" over every map (round-3 review, issue 4).
 *
 * Legacy maps: the line lib/topicPage/legacy.ts renders (the crux's authored
 * `settle.condition`, else its `description`). Flagship maps: each emitted
 * crux's `resolution.condition`. The rules and thresholds are in
 * ./settleContract.ts; the lines still to rewrite are listed, with their
 * rules, in ./settleContract.allowlist.ts, so the debt stays visible and a
 * fixed line must leave the list.
 */
import { describe, expect, it } from "vitest";
import { topics } from "@/data/topics";
import { argumentTopicIds } from "@/lib/argument/topicIds";
import { loadArgumentTopic } from "@/lib/argument/draftTopics";
import { findVerdictLanguage } from "@/lib/argument/ledger";
import { legacyTopicPage } from "./legacy";
import {
  duplicateSettleLines,
  settleLineProblems,
  type SettleProblem,
  type SettleStatus,
} from "./settleContract";
import { SETTLE_ALLOWLIST } from "./settleContract.allowlist";

interface Audited {
  key: string;
  line: string;
  problems: SettleProblem[];
}

function withDuplicates(rows: Audited[]): Audited[] {
  for (const [a, b, score] of duplicateSettleLines(rows.map((row) => row.line))) {
    rows[a].problems.push({ rule: "duplicate", detail: `with ${rows[b].key} (${score.toFixed(2)})` });
    rows[b].problems.push({ rule: "duplicate", detail: `with ${rows[a].key} (${score.toFixed(2)})` });
  }
  return rows;
}

function auditLegacy(): Audited[] {
  return topics.flatMap((topic) => {
    const { cruxes } = legacyTopicPage(topic);
    return withDuplicates(
      cruxes.map((crux, index) => {
        const pillar = topic.pillars[index];
        const status: SettleStatus =
          crux.settle.mode === "standing" ? "standing" : pillar.crux.verification_status;
        const line = crux.settle.condition ?? "";
        return {
          key: `${topic.id}/${pillar.id}`,
          line,
          problems: settleLineProblems({ line, question: crux.question, status }),
        };
      }),
    );
  });
}

function auditFlagship(): Audited[] {
  return argumentTopicIds.flatMap((topicId) => {
    const topic = loadArgumentTopic(topicId)!;
    const nodes = new Map(topic.graph.nodes.map((node) => [node.id, node]));
    return withDuplicates(
      topic.cruxes.flatMap((crux) => {
        const claim = nodes.get(crux.claimId);
        if (claim?.type !== "claim" || !claim.resolution) return [];
        const note = topic.meta.cruxNotes?.[crux.claimId];
        const question = note?.question ?? claim.summary ?? claim.statement;
        const kind = claim.resolution.kind;
        const status: SettleStatus =
          kind === "existing-evidence" ? "verified" : kind === "future-observable" ? "theoretical" : "standing";
        const line = claim.resolution.condition;
        return [
          {
            key: `${topicId}/${crux.claimId}`,
            line,
            problems: settleLineProblems({ line, question, status }),
          },
        ];
      }),
    );
  });
}

const describeProblems = (rows: Audited[]) =>
  rows.map((row) => `${row.key}: ${row.problems.map((p) => `${p.rule} (${p.detail})`).join("; ")}\n  "${row.line}"`);

describe("settle-line contract", () => {
  it("catches the lines the round-3 review named, and passes a real test", () => {
    // nuclear-weapons-abolition crux 1, before: a 1945–91 counterfactual
    // marked as a runnable test, restated as "the core dispute is whether".
    const longPeace = settleLineProblems({
      line: "The core dispute is whether nuclear weapons caused the Long Peace or merely coincided with it. This is fundamentally a counterfactual question: would the US and Soviet Union have fought a major war between 1945 and 1991 absent nuclear weapons? If the answer is yes, nuclear deterrence has prevented the deadliest wars in human history. If no, nuclear weapons are an unnecessary existential risk.",
      question: "Did nuclear weapons cause the Long Peace, or would the superpowers have avoided war anyway?",
      status: "theoretical",
    }).map((p) => p.rule);
    expect(longPeace).toContain("restates");
    expect(longPeace).toContain("status");

    // vaccine-mandates crux 2, before: the dispute again, opening "Whether".
    expect(
      settleLineProblems({
        line: "Whether a mandate is ethically justified by the harm principle turns on a measurable quantity: how much a vaccinated person's reduced infectiousness lowers risk to others, and for how long.",
        question: "Does a given vaccine reduce spread to others enough, and for long enough, to justify compulsion?",
        status: "verified",
      }).map((p) => p.rule),
    ).toContain("restates");

    // A line that names a study design passes even though it shares the
    // question's subject words (scott-cost-disease, crux 4).
    expect(
      settleLineProblems({
        line: "Compare like-for-like projects (e.g., bored subway tunnels of similar geology and length) across countries, controlling for wages and ground conditions. A persistent multiple isolates institutional/process cost from physical cost.",
        question: "Do US projects cost more than comparable ones abroad after wages and ground conditions are controlled for?",
        status: "verified",
      }),
    ).toEqual([]);

    expect(settleLineProblems({ line: "The same data.", question: "Is it?", status: "verified" }).map((p) => p.rule)).toEqual(
      expect.arrayContaining(["thin", "antecedent"]),
    );
  });

  it("holds every flagship settle condition to the contract, with no exceptions", () => {
    const failing = auditFlagship().filter((row) => row.problems.length > 0);
    expect(describeProblems(failing)).toEqual([]);
  });

  it("holds every legacy settle line to the contract, except the listed debt", () => {
    const rows = auditLegacy();
    const failing = rows.filter((row) => row.problems.length > 0);
    const unlisted = failing.filter((row) => !(row.key in SETTLE_ALLOWLIST));
    expect(describeProblems(unlisted)).toEqual([]);
  });

  it("drops a line from the allowlist once it passes (the list only shrinks)", () => {
    const failingKeys = new Set(auditLegacy().filter((row) => row.problems.length > 0).map((row) => row.key));
    const stale = Object.keys(SETTLE_ALLOWLIST).filter((key) => !failingKeys.has(key));
    expect(stale).toEqual([]);
  });

  it("never names a side as right in an authored settle line", () => {
    for (const topic of topics) {
      for (const pillar of topic.pillars) {
        const line = pillar.crux.settle?.condition;
        if (!line) continue;
        expect(findVerdictLanguage(line), `${topic.id}/${pillar.id}`).toEqual([]);
      }
    }
  });

  it("marks a crux nothing empirical settles as impossible to test, and says why", () => {
    for (const topic of topics) {
      for (const pillar of topic.pillars) {
        if (!pillar.crux.settle?.kind) continue;
        expect(pillar.crux.verification_status, `${topic.id}/${pillar.id}`).toBe("impossible");
        expect(pillar.crux.settle.condition.trim().length, `${topic.id}/${pillar.id}`).toBeGreaterThan(40);
      }
    }
  });
});

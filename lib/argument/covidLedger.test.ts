/**
 * The Covid crux ledger: proof-of-format for the crux ledger
 * (docs/research/2026-09-22-covid-crux-retrospective.md).
 *
 * The graph is a draft that must NOT ship as a page (founder decision), so it
 * is deliberately absent from lib/argument/topicIds.ts and draftTopics.ts.
 * This test is what keeps the pair honest: the graph passes the v1.1 schema
 * and validator, and the ledger passes the schema and graph checks in
 * lib/argument/ledger.ts, with the statuses the fact-checked retrospective
 * gives.
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { parseArgumentGraph } from "@/lib/schemas/argument";
import { validateArgumentGraph } from "./validate";
import { ledgerStatus, parseCruxLedger } from "./ledger";
import { loadCruxLedger } from "./ledgerFile";
import { argumentTopicIds } from "./topicIds";
import type { ArgumentGraph } from "@/types/argument";

const TOPIC = "covid-what-ended";
const root = process.cwd();
const graphPath = path.join(root, "data", "topics", "drafts", `${TOPIC}.draft.json`);
const ledgerFilePath = path.join(root, "data", "argument", `${TOPIC}.ledger.json`);

function loadGraph(): ArgumentGraph {
  const parsed = parseArgumentGraph(JSON.parse(readFileSync(graphPath, "utf8")));
  if (!parsed.ok) throw new Error(`graph failed schema: ${parsed.errors.join("; ")}`);
  return parsed.graph;
}

const rawLedger = JSON.parse(readFileSync(ledgerFilePath, "utf8"));

describe("Covid crux ledger (covid-what-ended)", () => {
  const graph = loadGraph();

  it("the draft graph passes every validator rule (warnings allowed)", () => {
    const errors = validateArgumentGraph(graph).filter((issue) => issue.severity === "error");
    expect(errors).toEqual([]);
  });

  it("has one claim per retrospective row, three positions and at least ten evidence nodes", () => {
    const count = (type: string) => graph.nodes.filter((node) => node.type === type).length;
    expect(count("claim")).toBe(15);
    expect(count("position")).toBe(3);
    expect(count("evidence")).toBeGreaterThanOrEqual(10);
  });

  it("the ledger validates against the graph, with no warnings", () => {
    const parsed = parseCruxLedger(rawLedger, graph);
    if (!parsed.ok) throw new Error(parsed.errors.join("\n"));
    expect(parsed.warnings).toEqual([]);
    expect(loadCruxLedger(TOPIC, graph, () => readFileSync(ledgerFilePath, "utf8"))).toHaveLength(
      rawLedger.entries.length,
    );
  });

  it("gives every claim at least one dated entry", () => {
    const claimIds = graph.nodes.filter((node) => node.type === "claim").map((node) => node.id);
    const covered = new Set(rawLedger.entries.map((entry: { claimId: string }) => entry.claimId));
    expect(claimIds.filter((id) => !covered.has(id))).toEqual([]);
  });

  it("ends each claim at the status the fact-checked retrospective gives", () => {
    expect(ledgerStatus(rawLedger.entries)).toEqual({
      "c-airborne-room-scale": "resolved", // row 1
      "c-vaccines-cut-severe-disease": "resolved", // row 2
      "c-transmission-justifies-coercion": "narrowed", // row 3
      "c-mandates-raise-uptake": "narrowed", // row 4
      "c-school-closures-net-cost": "narrowed", // row 5
      "c-lockdowns-reduced-total-deaths": "open", // row 6
      "c-community-masking-reduced-transmission": "open", // row 7, policy level
      "c-origin-natural-spillover": "open", // row 8
      "c-early-dismissals-reputational": "narrowed", // row 9
      "c-prior-infection-comparable": "resolved", // row 10
      "c-fatality-steep-age-gradient": "resolved", // row 11
      "c-access-conditioned-on-vaccination": "unresolvable", // row 12
      "c-broad-restrictions-right-tradeoff": "unresolvable", // row 13
      "c-conduct-reduced-later-compliance": "narrowed", // row 14
      "c-gof-risk-outweighs-benefit": "open", // row 15
    });
  });

  it("is not registered as a shipping topic", () => {
    expect(argumentTopicIds).not.toContain(TOPIC);
  });
});

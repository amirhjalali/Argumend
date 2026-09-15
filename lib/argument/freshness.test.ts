import { describe, expect, it } from "vitest";
import { identifyCruxes } from "@/lib/crux";
import type { ArgumentGraph, Evidence } from "@/types/argument";
import type { ArgumentReviewManifest } from "@/types/argumentReview";
import { workedExampleGraph } from "./fixtures";
import { diagnoseArgumentFreshness, type FreshnessMetadata } from "./freshness";

const TODAY = "2026-09-14";

function manifest(overrides: Partial<ArgumentReviewManifest> = {}): ArgumentReviewManifest {
  return {
    topicId: "ai-jobs",
    manifestVersion: 1,
    owner: "founder",
    cadence: "fast-moving-statistics",
    lastFullReview: "2026-08-12",
    lastHeadlineCheck: "2026-08-12",
    nextHeadlineCheckDue: "2026-09-11",
    nextFullReviewDue: "2026-11-10",
    fastMovingNodes: [{ id: "e1", why: "Stanford/ADP is an ongoing series." }],
    triggerEvents: ["A new Stanford/ADP release."],
    correctionLog: [],
    ...overrides,
  };
}

function withEvidenceDates(
  graph: ArgumentGraph,
  nodeId: string,
  dates: { publishedAt?: string; verifiedAt?: string }
): ArgumentGraph {
  return {
    ...graph,
    nodes: graph.nodes.map((node) =>
      node.id === nodeId && node.type === "evidence"
        ? ({ ...node, source: { ...node.source, ...dates } } satisfies Evidence)
        : node
    ),
  };
}

function run(options: {
  graph?: ArgumentGraph;
  manifest?: ArgumentReviewManifest;
  meta?: FreshnessMetadata;
  today?: string;
} = {}) {
  const graph = options.graph ?? workedExampleGraph();
  return diagnoseArgumentFreshness({
    graph,
    manifest: options.manifest ?? manifest(),
    meta: options.meta ?? {},
    cruxes: identifyCruxes(graph),
    today: options.today ?? TODAY,
  });
}

describe("diagnoseArgumentFreshness", () => {
  it("reports evidence nodes missing publishedAt and verifiedAt, ignoring superseded ones", () => {
    const base = run();
    expect(base.errors).toEqual([]);
    expect(base.evidenceDates.evidenceCount).toBe(3);
    expect(base.evidenceDates.missingPublishedAt).toEqual(["e1", "e2", "e3"]);
    expect(base.evidenceDates.missingVerifiedAt).toEqual(["e1", "e2", "e3"]);

    let graph = withEvidenceDates(workedExampleGraph(), "e1", {
      publishedAt: "2025-08-26",
      verifiedAt: "2026-08-11",
    });
    graph = {
      ...graph,
      nodes: graph.nodes.map((node) =>
        node.id === "e3" && node.type === "evidence"
          ? ({ ...node, status: "superseded" } satisfies Evidence)
          : node
      ),
    };
    const dated = run({ graph });
    expect(dated.evidenceDates.evidenceCount).toBe(2);
    expect(dated.evidenceDates.missingPublishedAt).toEqual(["e2"]);
    expect(dated.evidenceDates.missingVerifiedAt).toEqual(["e2"]);
    expect(dated.warnings).toContain("1/2 evidence nodes lack source.publishedAt");
  });

  it("flags fast-moving nodes past the headline-check cadence from the latest known-good date", () => {
    const overdue = run();
    expect(overdue.fastMoving).toEqual([
      { nodeId: "e1", referenceDate: "2026-08-12", dueDate: "2026-09-11", daysOverdue: 3 },
    ]);
    expect(overdue.warnings).toContain(
      "1/1 fast-moving evidence nodes past their headline-check due date"
    );

    const inWindow = run({ today: "2026-09-01" });
    expect(inWindow.fastMoving[0].daysOverdue).toBe(0);

    const reverified = run({
      graph: withEvidenceDates(workedExampleGraph(), "e1", { verifiedAt: "2026-09-01T00:00:00Z" }),
    });
    expect(reverified.fastMoving[0]).toMatchObject({
      referenceDate: "2026-09-01",
      dueDate: "2026-10-01",
      daysOverdue: 0,
    });
  });

  it("uses the seven-day window for the ongoing-war cadence", () => {
    const report = run({
      manifest: manifest({
        cadence: "ongoing-war",
        nextHeadlineCheckDue: "2026-08-19",
        nextFullReviewDue: "2026-09-11",
      }),
    });
    expect(report.fastMoving[0]).toMatchObject({ dueDate: "2026-08-19", daysOverdue: 26 });
    expect(report.review).toMatchObject({
      fullReviewOverdueDays: 3,
      headlineCheckOverdueDays: 26,
    });
  });

  it("reports manifest and full-review lateness as warnings, never errors", () => {
    const report = run();
    expect(report.review).toMatchObject({
      cadence: "fast-moving-statistics",
      fullReviewOverdueDays: 0,
      headlineCheckOverdueDays: 3,
    });
    expect(report.warnings).toContain(
      "headline check overdue by 3 day(s) (due 2026-09-11, cadence fast-moving-statistics)"
    );
    expect(report.errors).toEqual([]);
  });

  it("treats unknown or non-evidence fast-moving ids and unknown correction nodes as hard errors", () => {
    const report = run({
      manifest: manifest({
        fastMovingNodes: [
          { id: "e-missing", why: "typo" },
          { id: "c1", why: "a claim, not evidence" },
        ],
        correctionLog: [
          {
            date: "2026-09-01",
            origin: "adversarial-review",
            summary: "test",
            factualChanges: [],
            topologyChanges: [],
            cruxOrderMoved: false,
            nodeIds: ["e-gone"],
          },
        ],
      }),
    });
    expect(report.errors.map((error) => error.code).sort()).toEqual([
      "correction-node-unknown",
      "fast-moving-node-not-evidence",
      "fast-moving-node-unknown",
    ]);
    expect(report.fastMoving).toEqual([]);
  });

  it("checks metadata keys against node types and current crux ranking", () => {
    const cruxes = identifyCruxes(workedExampleGraph());
    const ranked = new Set(cruxes.map((crux) => crux.claimId));
    const unrankedClaim = workedExampleGraph().nodes.find(
      (node) => node.type === "claim" && !ranked.has(node.id)
    );
    expect(unrankedClaim).toBeDefined();

    const report = run({
      meta: {
        advocates: {
          p1: { name: "x", affiliation: "y", line: "z" },
          c1: { name: "wrong", affiliation: "type", line: "" },
        },
        cruxNotes: {
          "no-such-node": { fight: "a", soWhat: "b" },
          [unrankedClaim!.id]: { fight: "a", soWhat: "b" },
        },
      },
    });

    expect(report.metadataKeys.unmatched).toEqual([
      { field: "advocates", key: "c1", reason: "targets a claim, not a position" },
      { field: "cruxNotes", key: "no-such-node", reason: "does not match any graph node" },
    ]);
    expect(report.errors.filter((error) => error.code === "metadata-key-unmatched")).toHaveLength(2);
    expect(report.metadataKeys.notesForNonCruxClaims).toEqual([unrankedClaim!.id]);
  });

  it("audits top-crux disclosures: note fields, resolution, evidence quota, and gap disclosure", () => {
    const bare = run();
    const c2 = bare.topCruxes.find((crux) => crux.claimId === "c2");
    const c3 = bare.topCruxes.find((crux) => crux.claimId === "c3");
    expect(c2, "worked example must rank c2").toBeDefined();
    expect(c3, "worked example must rank c3").toBeDefined();

    expect(c2).toMatchObject({
      epistemicType: "empirical",
      hasQuestion: false,
      hasFight: false,
      hasSoWhat: false,
      hasResolution: false,
      directEvidence: { supporting: 0, challenging: 0, qualifying: 1 },
      evidenceQuota: "gap",
      gapDisclosure: "missing",
    });
    expect(c2!.issues).toContain("no resolution condition");
    expect(c2!.issues.some((issue) => issue.includes("does not disclose the gap"))).toBe(true);

    expect(c3).toMatchObject({
      epistemicType: "definitional",
      evidenceQuota: "exempt",
      gapDisclosure: "not-needed",
    });
    expect(c3!.issues).not.toContainEqual(expect.stringContaining("one-sided"));

    const disclosed = run({
      meta: {
        cruxNotes: {
          c2: {
            question: "Did AI cause the decline?",
            fight: "Nobody has firm-level data; this map has not found decisive evidence either way.",
            soWhat: "It decides whether the displacement mechanism is real.",
          },
        },
      },
    });
    const disclosedC2 = disclosed.topCruxes.find((crux) => crux.claimId === "c2");
    expect(disclosedC2).toMatchObject({
      hasQuestion: true,
      hasFight: true,
      hasSoWhat: true,
      evidenceQuota: "gap",
      gapDisclosure: "disclosed",
    });
    expect(disclosedC2!.issues).toEqual(["no resolution condition"]);
    expect(disclosed.warnings).toContain(
      `crux #${disclosedC2!.rank} c2 (empirical): no resolution condition`
    );
  });

  it("does not count superseded evidence toward the quota", () => {
    const graph = workedExampleGraph();
    const supersededE3: ArgumentGraph = {
      ...graph,
      nodes: graph.nodes.map((node) =>
        node.id === "e3" && node.type === "evidence"
          ? ({ ...node, status: "superseded" } satisfies Evidence)
          : node
      ),
    };
    const report = run({ graph: supersededE3 });
    const c2 = report.topCruxes.find((crux) => crux.claimId === "c2");
    expect(c2?.directEvidence).toEqual({ supporting: 0, challenging: 0, qualifying: 0 });
  });
});

import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import { DebateView } from "./DebateView";
import { identifyCruxes } from "@/lib/crux";
import { workedExampleGraph, baseNode, evidence } from "@/lib/argument/fixtures";
import { loadArgumentTopic } from "@/lib/argument/draftTopics";
import type { ArgumentGraph, Claim, Evidence } from "@/types/argument";

const EPISTEMIC_LABELS: Record<Claim["epistemicType"], string> = {
  empirical: "Empirical",
  predictive: "Predictive",
  normative: "Values",
  definitional: "Definitional",
  procedural: "Who decides",
};

const STATUS_LABELS: Record<Claim["status"], string> = {
  uncontested: "Uncontested",
  broadly_accepted: "Broadly accepted",
  contested: "Contested",
  unresolved: "Unresolved",
  superseded: "Superseded",
};

afterEach(() => {
  cleanup();
});

function enrichedWorkedExampleGraph(): ArgumentGraph {
  const graph = workedExampleGraph();
  const valueClaim: Claim = {
    ...baseNode(
      "c-value-disagreement",
      "claim",
      "Protecting occupational identity matters even if aggregate employment recovers",
    ),
    type: "claim",
    epistemicType: "normative",
    status: "unresolved",
    statusBasis: "reasonable positions assign different weight to work as identity",
    resolution: {
      kind: "value-difference",
      condition: "The dispute turns on how much weight to give occupational identity.",
    },
    cruxOverride: "pin",
    overrideBasis: "exercises DebateView's value-difference resolution copy",
  };
  const challengingEvidence: Evidence = {
    ...evidence(
      "e4",
      "A Brookings review finds AI exposure is not the same thing as job loss",
      "Brookings",
    ),
    unverifiedFlags: ["needs replication against 2026 occupation cells"],
  };

  return {
    ...graph,
    nodes: graph.nodes
      .map((node) => {
        if (node.id === "c4" && node.type === "claim") {
          return {
            ...node,
            cruxOverride: "pin" as const,
            overrideBasis: "exercises implicit crux rendering",
          };
        }
        if (node.id === "e2" && node.type === "evidence") {
          return {
            ...node,
            source: {
              ...node.source,
              interest: "job-listings platform",
            },
          };
        }
        if (node.id === "e3" && node.type === "evidence") {
          return {
            ...node,
            source: {
              ...node.source,
              interest: "company promoting its own AI deployment",
            },
          };
        }
        return node;
      })
      .concat(valueClaim, challengingEvidence),
    edges: graph.edges.concat({
      id: "edge-e4-c2",
      from: "e4",
      to: "c2",
      type: "evidences",
      polarity: "challenging",
    }),
  };
}

function expectedStats(graph: ArgumentGraph, cruxCount: number): string {
  const positions = graph.nodes.filter((node) => node.type === "position");
  const claims = graph.nodes.filter((node) => node.type === "claim");
  const evidenceNodes = graph.nodes.filter((node) => node.type === "evidence");
  const contested = claims.filter(
    (claim) => claim.status === "contested" || claim.status === "unresolved",
  );

  return `${positions.length} positions · ${claims.length} claims · ${evidenceNodes.length} pieces of evidence · ${contested.length} open disputes · ${cruxCount} cruxes`;
}

describe("DebateView", () => {
  it("renders the worked-example overview, positions, crux chips, evidence, scope notes, and summary affordances", () => {
    const graph = enrichedWorkedExampleGraph();
    const cruxes = identifyCruxes(graph);
    const claimById = new Map(
      graph.nodes
        .filter((node): node is Claim => node.type === "claim")
        .map((claim) => [claim.id, claim]),
    );

    const view = render(
      <DebateView title="Fallback title" graph={graph} cruxes={cruxes} />,
    );

    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
      graph.question.statement,
    );
    expect(screen.getByText(expectedStats(graph, cruxes.length))).not.toBeNull();

    const positionsSection = screen.getByLabelText("Positions");
    const positionHeadings = within(positionsSection).getAllByRole("heading", {
      level: 3,
    });
    expect(positionHeadings.map((heading) => heading.textContent)).toEqual([
      "Displacement-now",
      "Automation-panic redux",
    ]);
    const positions = graph.nodes
      .filter((node) => node.type === "position")
      .sort((a, b) => a.displayRank - b.displayRank);
    for (const [index, position] of positions.entries()) {
      const card = positionHeadings[index].closest("div");
      expect(card?.textContent).toContain(position.label);
      expect(card?.textContent).toContain(position.statement);
      expect(card?.textContent).toContain(position.constituency);
    }

    const cruxSummaries = [
      ...screen
        .getByLabelText("Cruxes")
        .querySelectorAll<HTMLElement>("ol > li > details > summary"),
    ];
    expect(cruxSummaries.length).toBe(cruxes.length);
    for (const [index, summary] of cruxSummaries.entries()) {
      const claim = claimById.get(cruxes[index].claimId);
      expect(claim).toBeDefined();
      expect(within(summary).getByText(EPISTEMIC_LABELS[claim!.epistemicType])).not.toBeNull();
      expect(within(summary).getByText(STATUS_LABELS[claim!.status])).not.toBeNull();
      if (claim!.implicit) {
        expect(within(summary).getByText("Hidden assumption")).not.toBeNull();
      }
    }

    expect(screen.getByText(/standing value disagreement/).textContent).toContain(
      "Nothing, by evidence alone",
    );
    expect(screen.getAllByText(/Supports:/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Challenges:/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Qualifies:/).length).toBeGreaterThan(0);
    expect(view.container.textContent).toContain("Stanford/ADP");
    expect(screen.getByText("Interest note: job-listings platform")).not.toBeNull();
    expect(
      screen.getByText("Unverified: needs replication against 2026 occupation cells"),
    ).not.toBeNull();
    expect(
      screen.getByText(
        "Scope note: Klarna's 700-agents figure measures workload equivalence, not eliminated positions",
      ),
    ).not.toBeNull();

    const summaries = [...view.container.querySelectorAll("summary")];
    expect(summaries.length).toBeGreaterThan(0);
    for (const summary of summaries) {
      expect(summary.closest("details")).not.toBeNull();
      expect(summary.getAttribute("role")).toBeNull();
      expect(summary.hasAttribute("tabindex")).toBe(false);
      expect(summary.getAttribute("aria-hidden")).toBeNull();
      expect(summary.className).toMatch(/\bp-(4|3\.5)\b/);
    }
  });

  it("static-renders the full flagship graph with many claim summaries", () => {
    const topic = loadArgumentTopic("ai-mass-unemployment");
    expect(topic).not.toBeNull();

    const view = render(
      <DebateView
        title={topic!.meta.title}
        graph={topic!.graph}
        cruxes={topic!.cruxes}
      />,
    );

    expect(view.container.querySelectorAll("summary").length).toBeGreaterThanOrEqual(40);
  });
});

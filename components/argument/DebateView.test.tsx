import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import { DebateView } from "./DebateView";
import { identifyCruxes } from "@/lib/crux";
import { workedExampleGraph, baseNode, evidence } from "@/lib/argument/fixtures";
import { loadArgumentTopic } from "@/lib/argument/draftTopics";
import type { ArgumentTopicMeta } from "@/lib/argument/draftTopics";
import type { ArgumentGraph, Claim, Evidence } from "@/types/argument";

afterEach(() => {
  cleanup();
});

const TEST_META: ArgumentTopicMeta = {
  id: "worked-example",
  title: "Fallback title",
  tagline: "Test tagline",
  hook: "If you are in the test cohort, this page is about your pipeline.",
  tldr: "This is two fights in a trench coat: attribution and definitions.",
  highlights: [
    {
      fact: "−16%",
      context: "Relative decline in the test cohort.",
      source: "Test source",
    },
  ],
  takeaways: [
    "The decline is real; the attribution is the fight.",
    "Headline numbers rarely mean what they seem.",
  ],
};

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

describe("DebateView", () => {
  it("leads with hook and tldr instead of inventory, renders camps, numbers, cruxes, evidence, and disclosure affordances", () => {
    const graph = enrichedWorkedExampleGraph();
    const cruxes = identifyCruxes(graph);
    const claimById = new Map(
      graph.nodes
        .filter((node): node is Claim => node.type === "claim")
        .map((claim) => [claim.id, claim]),
    );

    const view = render(
      <DebateView meta={TEST_META} graph={graph} cruxes={cruxes} />,
    );

    // Layer 1 leads with the question, the identity hook, and the payoff card —
    // and the inventory stats bar is gone by design (product critique 2026-08-11).
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
      graph.question.statement,
    );
    expect(screen.getByText(TEST_META.hook)).not.toBeNull();
    expect(screen.getByText(TEST_META.tldr)).not.toBeNull();
    expect(view.container.textContent).not.toContain("pieces of evidence ·");

    const positionsSection = screen.getByLabelText("Positions");
    const positionHeadings = within(positionsSection).getAllByRole("heading", {
      level: 3,
    });
    const positions = graph.nodes
      .filter((node) => node.type === "position")
      .sort((a, b) => a.displayRank - b.displayRank);
    expect(positionHeadings.map((heading) => heading.textContent)).toEqual(
      positions.map((position) => position.label),
    );
    for (const [index, position] of positions.entries()) {
      const card = positionHeadings[index].closest("div");
      // Statement and constituency stay reachable (inside the expand) even
      // when a one-line summary leads the card.
      expect(card?.textContent).toContain(position.statement);
      expect(card?.textContent).toContain(position.constituency);
    }

    // Steal-able numbers render from meta.highlights.
    const numbersSection = screen.getByLabelText("Key numbers");
    expect(within(numbersSection).getByText("−16%")).not.toBeNull();
    expect(within(numbersSection).getByText("Test source")).not.toBeNull();

    // Crux headlines carry at most the two meaningful chips — never the
    // epistemic/status tag soup the critique flagged.
    const cruxSummaries = [
      ...screen
        .getByLabelText("Cruxes")
        .querySelectorAll<HTMLElement>("ol > li > details > summary"),
    ];
    expect(cruxSummaries.length).toBe(cruxes.length);
    for (const [index, summary] of cruxSummaries.entries()) {
      const claim = claimById.get(cruxes[index].claimId);
      expect(claim).toBeDefined();
      expect(within(summary).queryByText("Empirical")).toBeNull();
      expect(within(summary).queryByText("Contested")).toBeNull();
      if (claim!.implicit) {
        expect(
          within(summary).getByText(/Hidden assumption/),
        ).not.toBeNull();
      }
    }

    // Value-difference cruxes render the honest "nothing settles this" copy.
    expect(screen.getByText(/standing value disagreement/).textContent).toContain(
      "Nothing, by evidence alone",
    );

    // Evidence keeps full provenance: polarity, source, flagged interests
    // (behind the ⚑ affordance), unverified flags, and scope limits.
    expect(screen.getAllByText(/Supports:/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Challenges:/).length).toBeGreaterThan(0);
    expect(view.container.textContent).toContain("Stanford/ADP");
    expect(screen.getAllByText("⚑ interest").length).toBeGreaterThan(0);
    expect(screen.getByText("job-listings platform")).not.toBeNull();
    expect(
      screen.getByText("Unverified: needs replication against 2026 occupation cells"),
    ).not.toBeNull();
    expect(
      screen.getByText(
        /But note: Klarna's 700-agents figure measures workload equivalence/,
      ),
    ).not.toBeNull();

    // Payoff block renders every takeaway.
    const takeawaysSection = screen.getByLabelText("Takeaways");
    for (const takeaway of TEST_META.takeaways) {
      expect(within(takeawaysSection).getByText(takeaway)).not.toBeNull();
    }

    // Researcher mode wraps the remaining claims behind one disclosure.
    const researcherSection = screen.getByLabelText("All claims");
    expect(
      within(researcherSection).getByText(/Researcher mode/),
    ).not.toBeNull();

    // Native details/summary disclosure stays keyboard-reachable with
    // touch-friendly padding.
    const summaries = [...view.container.querySelectorAll("summary")];
    expect(summaries.length).toBeGreaterThan(0);
    for (const summary of summaries) {
      expect(summary.closest("details")).not.toBeNull();
      expect(summary.getAttribute("role")).toBeNull();
      expect(summary.getAttribute("aria-hidden")).toBeNull();
    }
    // Top-level crux/researcher summaries keep the 44px-friendly padding.
    const paddedSummaries = summaries.filter((summary) =>
      /\bp-(4|3\.5)\b/.test(summary.className),
    );
    expect(paddedSummaries.length).toBeGreaterThan(0);
  });

  it("static-renders the full flagship graph with many claim summaries", () => {
    const topic = loadArgumentTopic("ai-mass-unemployment");
    expect(topic).not.toBeNull();

    const view = render(
      <DebateView
        meta={topic!.meta}
        graph={topic!.graph}
        cruxes={topic!.cruxes}
      />,
    );

    expect(view.container.querySelectorAll("summary").length).toBeGreaterThanOrEqual(40);
    // The redesigned flagship leads with its hook, not inventory.
    expect(view.container.textContent).toContain("Both numbers are real.");
  });
});

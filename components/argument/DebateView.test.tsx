import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { DebateView } from "./DebateView";
import { identifyCruxes } from "@/lib/crux";
import { workedExampleGraph, baseNode, evidence } from "@/lib/argument/fixtures";
import {
  argumentTopicIds,
  loadArgumentTopic,
} from "@/lib/argument/draftTopics";
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
  advocates: {
    p1: {
      name: "Test Researcher",
      affiliation: "Test Institute",
      line: "illustrates the displacement argument.",
    },
  },
  shareCard: {
    left: { value: "4.2%", label: "Current test value" },
    right: { value: "−16%", label: "Comparison test value" },
    line: "Both values are part of the same comparison.",
    attribution: "Test dataset — argumend.org",
  },
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
    source: {
      title: "Brookings test review",
      institution: "Brookings",
      publishedAt: "2026-04-03",
      url: "https://example.com/brookings-test-review",
      kind: "institutional",
      verification: "verified-live",
    },
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
    const main = screen.getByRole("main");
    expect(main.id).toBe("main-content");
    expect(within(main).getByRole("heading", { level: 1 }).textContent).toBe(
      TEST_META.title,
    );
    expect(screen.getByText(graph.question.statement)).not.toBeNull();
    expect(screen.getByText("Reviewed Aug 12, 2026")).not.toBeNull();
    expect(
      screen.getByRole("link", { name: "Argumend home" }).getAttribute("href"),
    ).toBe("/");
    expect(
      screen.getAllByRole("link", { name: "Explore topics" })[0].getAttribute("href"),
    ).toBe("/topics");
    const cruxJump = screen.getByRole("link", {
      name: "Jump to the five crux questions ↓",
    });
    expect(cruxJump.getAttribute("href")).toBe("#cruxes");
    expect(screen.getByLabelText("Cruxes").id).toBe("cruxes");
    expect(screen.getByText(TEST_META.hook)).not.toBeNull();
    expect(screen.getByText(TEST_META.tldr)).not.toBeNull();
    expect(view.container.textContent).not.toContain("pieces of evidence ·");

    // The screenshot card remains understandable as a labeled landmark and
    // associates each value with its label through native description-list
    // semantics instead of visual proximity alone.
    const shareCard = screen.getByRole("complementary", {
      name: "Key comparison",
    });
    expect(shareCard.querySelectorAll("dl")).toHaveLength(1);
    expect(shareCard.querySelectorAll("dt")).toHaveLength(2);
    expect(shareCard.querySelectorAll("dd")).toHaveLength(2);

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
    expect(positionsSection.textContent).toContain(
      "inclusion does not mean they endorse every claim in that camp",
    );
    expect(within(positionsSection).getByText("Related voice:")).not.toBeNull();

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

    // A value-difference resolution is rendered once, without a generated
    // preamble that repeats what the authored condition already says.
    const valueResolution =
      "The dispute turns on how much weight to give occupational identity.";
    expect(view.container.textContent?.split(valueResolution)).toHaveLength(2);
    expect(view.container.textContent).not.toContain(
      "nothing, by evidence alone — this is a values fight",
    );

    // Evidence sits behind a second tap, not in the default crux view.
    expect(screen.getAllByText(/Show the evidence and the exact claim/).length).toBe(
      cruxes.length,
    );

    // Evidence keeps full provenance: polarity, source, flagged interests
    // (behind the ⚑ affordance), unverified flags, and scope limits.
    expect(screen.getAllByText(/Supports:/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Challenges:/).length).toBeGreaterThan(0);
    expect(view.container.textContent).toContain("Stanford/ADP");
    const namedSource = screen.getByRole("link", {
      name: "Open source from Brookings test review (opens in a new tab)",
    });
    expect(namedSource.textContent).toBe("Brookings test review ↗");
    const publicationDate = screen.getByText("Apr 3, 2026");
    expect(publicationDate.closest("span")?.textContent).toBe(
      "Published Apr 3, 2026",
    );
    expect(screen.getAllByText("Source interest").length).toBeGreaterThan(0);
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

    const relatedMaps = screen.getByRole("navigation", {
      name: "Related debate maps",
    });
    expect(within(relatedMaps).getAllByRole("link")).toHaveLength(3);
    expect(within(relatedMaps).getByRole("link", { name: "Browse all topics →" }))
      .not.toBeNull();

    // Native details/summary disclosure stays keyboard-reachable with
    // touch-friendly padding.
    const summaries = [...view.container.querySelectorAll("summary")];
    expect(summaries.length).toBeGreaterThan(0);
    for (const summary of summaries) {
      expect(summary.closest("details")).not.toBeNull();
      expect(summary.getAttribute("role")).toBeNull();
      expect(summary.getAttribute("aria-hidden")).toBeNull();
      expect(summary.className).toContain("focus-visible:ring-2");
    }

    // Compact disclosures need an explicit 44px target; top-level cards get
    // the same minimum through their generous padding.
    for (const label of ["Show the evidence and the exact claim", "Source interest"]) {
      for (const text of screen.getAllByText(label)) {
        expect(text.closest("summary")?.className).toContain("min-h-11");
      }
    }

    // Summary headings establish h2 → h3 → h4 hierarchy for claim detail
    // blocks, and source-interest disclosures no longer put <details> inside
    // an invalid phrasing-only <span> wrapper.
    expect(
      within(screen.getByLabelText("Cruxes")).getAllByRole("heading", {
        level: 3,
      }),
    ).toHaveLength(cruxes.length);
    expect(view.container.querySelectorAll("span > details")).toHaveLength(0);

    const externalSources = [
      ...view.container.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]'),
    ];
    for (const source of externalSources) {
      expect(source.getAttribute("aria-label")).toMatch(
        /^Open source from .+ \(opens in a new tab\)$/,
      );
    }
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

describe("DebateView registry contract", () => {
  for (const topicId of argumentTopicIds) {
    it(`server-renders ${topicId} independently with valid metadata references`, () => {
      const topic = loadArgumentTopic(topicId);
      expect(topic, `${topicId} must be loadable`).not.toBeNull();

      const { meta, graph, cruxes } = topic!;
      const nodesById = new Map(graph.nodes.map((node) => [node.id, node]));
      const cruxClaimIds = new Set(cruxes.map((crux) => crux.claimId));

      expect(meta.id).toBe(topicId);
      expect(graph.topicId).toBe(topicId);
      expect(cruxes.length).toBeGreaterThanOrEqual(3);
      expect(cruxes.length).toBeLessThanOrEqual(5);

      for (const crux of cruxes) {
        const claim = nodesById.get(crux.claimId);
        expect(claim?.type, `${topicId}: crux ${crux.claimId}`).toBe("claim");
        if (claim?.type === "claim") {
          expect(claim.status).not.toBe("superseded");
        }
      }

      for (const positionId of Object.keys(meta.advocates ?? {})) {
        expect(
          nodesById.get(positionId)?.type,
          `${topicId}: advocate key ${positionId}`,
        ).toBe("position");
      }

      for (const claimId of Object.keys(meta.cruxNotes ?? {})) {
        expect(
          nodesById.get(claimId)?.type,
          `${topicId}: crux note key ${claimId}`,
        ).toBe("claim");
        expect(
          cruxClaimIds.has(claimId),
          `${topicId}: crux note ${claimId} must describe a rendered crux`,
        ).toBe(true);
      }

      const html = renderToStaticMarkup(
        <DebateView meta={meta} graph={graph} cruxes={cruxes} />,
      );
      const staticContainer = document.createElement("div");
      staticContainer.innerHTML = html;
      const staticText = staticContainer.textContent ?? "";

      expect(staticText).toContain(graph.question.statement);
      expect(staticText).toContain(meta.hook);
      expect(staticText).toContain(meta.tldr);
      expect(staticContainer.querySelector("main")?.id).toBe("main-content");
      expect(staticContainer.querySelector("h1")?.textContent?.trim()).toBe(meta.title);
      expect(staticText).toContain(`Scope: ${graph.question.statement}`);
      expect(staticText).toContain("Reviewed Aug 12, 2026");
      expect(html).not.toMatch(
        /\b(?:src|href|alt|class|aria-label)="(?:undefined|null)"/i,
      );
      const emptyContentElements = [
        ...staticContainer.querySelectorAll("h1, h2, h3, h4, p, summary"),
      ].filter((element) => element.textContent?.trim().length === 0);
      expect(emptyContentElements).toHaveLength(0);

      const missingResolutionCount = cruxes.filter((crux) => {
        const node = nodesById.get(crux.claimId);
        return node?.type === "claim" && !node.resolution;
      }).length;
      expect(staticText.match(/not yet specified\./g)?.length ?? 0).toBe(
        missingResolutionCount,
      );
      expect(html).not.toContain("<script");

      const detailCount = html.match(/<details(?:\s|>)/g)?.length ?? 0;
      const summaryCount = html.match(/<summary(?:\s|>)/g)?.length ?? 0;
      expect(detailCount).toBeGreaterThan(0);
      expect(summaryCount).toBe(detailCount);
      expect(html).not.toMatch(/<summary[^>]+(?:role|tabindex)=/);

      const positionDisclosures = [
        ...staticContainer.querySelectorAll("summary"),
      ].filter((summary) => summary.textContent?.includes("Read the full case"));
      expect(positionDisclosures.length).toBe(4);
      for (const summary of positionDisclosures) {
        expect(summary.className).toContain("min-h-11");
        expect(summary.className).toContain("focus-visible:ring-2");
      }

      const externalSources = [
        ...staticContainer.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]'),
      ];
      expect(externalSources.length).toBeGreaterThan(0);
      for (const source of externalSources) {
        expect(source.getAttribute("aria-label")).toMatch(
          /^Open source from .+ \(opens in a new tab\)$/,
        );
      }
    });
  }

  it("keeps the AI-exposed explainer scoped to the AI employment topic", () => {
    const explainer = "“AI-exposed” means jobs whose everyday tasks overlap";

    for (const topicId of argumentTopicIds) {
      const topic = loadArgumentTopic(topicId);
      expect(topic).not.toBeNull();
      const html = renderToStaticMarkup(
        <DebateView
          meta={topic!.meta}
          graph={topic!.graph}
          cruxes={topic!.cruxes}
        />,
      );

      if (topicId === "ai-mass-unemployment") {
        expect(html).toContain(explainer);
      } else {
        expect(html).not.toContain(explainer);
      }
    }
  });
});

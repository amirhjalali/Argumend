import "@/test/setup-dom";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, within } from "@testing-library/react";
import { DebateView } from "@/components/argument/DebateView";
import { ReadModeView } from "@/components/ReadModeView";
import { loadArgumentTopic } from "@/lib/argument/draftTopics";
import { isPublicEntry } from "@/lib/argument/ledger";
import { loadTopicById } from "@/data/topicLoader";

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

/** True when `a` comes before `b` in document order. */
function before(a: Element, b: Element): boolean {
  return Boolean(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING);
}

function expectCruxFirstOrder(container: HTMLElement, { agreement }: { agreement: boolean }) {
  const h1 = container.querySelector("h1")!;
  const agreementBlock = container.querySelector("#agreement");
  const cruxes = container.querySelector("#cruxes")!;
  const positions = container.querySelector("#positions")!;
  const reflection = container.querySelector("#reflect")!;
  const researcher = container.querySelector("details#researcher")!;

  expect(h1).not.toBeNull();
  expect(cruxes).not.toBeNull();
  expect(positions).not.toBeNull();
  if (agreement) {
    expect(agreementBlock).not.toBeNull();
    expect(before(h1, agreementBlock!)).toBe(true);
    expect(before(agreementBlock!, cruxes)).toBe(true);
  } else {
    expect(agreementBlock).toBeNull();
  }
  expect(before(h1, cruxes)).toBe(true);
  expect(before(cruxes, positions)).toBe(true);
  expect(before(positions, reflection)).toBe(true);
  expect(before(reflection, researcher)).toBe(true);
  // Every crux entry leads with what would settle it.
  const entries = cruxes.querySelectorAll("[data-crux-sheet] > li");
  expect(entries.length).toBeGreaterThan(0);
  for (const entry of entries) {
    expect(entry.querySelector("summary [data-settle]")).not.toBeNull();
  }
}

/** Scoreboard framing that must never reach a topic page, folds included. */
const SCOREBOARD = /\bpts\b|\/100|\bWinner\b|Established|\bverdict\b/i;

async function renderLegacy(id: string) {
  const topic = (await loadTopicById(id))!;
  expect(topic, id).not.toBeNull();
  return { topic, view: render(<ReadModeView topic={topic} />) };
}

describe("one crux-first template for every map", () => {
  it("renders a flagship map as agreement → crux sheet → positions", () => {
    const topic = loadArgumentTopic("ai-mass-unemployment")!;
    const view = render(
      <DebateView
        meta={topic.meta}
        graph={topic.graph}
        cruxes={topic.cruxes}
        ledger={topic.ledger.filter(isPublicEntry)}
      />,
    );
    expectCruxFirstOrder(view.container, { agreement: true });
    expect(view.container.querySelector("[data-topic-kind]")?.getAttribute("data-topic-kind")).toBe(
      "flagship",
    );
    // The −16% appears once (the hook) before the positions; the share card
    // and chart moved into "The numbers".
    const positions = view.container.querySelector("#positions")!;
    const beforePositions = [...view.container.querySelectorAll("article *")]
      .filter((el) => el.children.length === 0 && before(el, positions))
      .map((el) => el.textContent ?? "")
      .join(" ");
    expect(beforePositions.match(/16%/g)?.length ?? 0).toBe(1);
    // Flagship maps can't be embedded yet, so Embed is not offered.
    expect(within(view.container).queryByRole("button", { name: /embed/i })).toBeNull();
    expect(within(view.container).getAllByRole("button", { name: /save topic/i }).length).toBeGreaterThan(0);
  });

  it("renders a legacy map with falsification data in the same order, with no scoreboard", async () => {
    const { topic, view } = await renderLegacy("nuclear-energy-safety");
    expectCruxFirstOrder(view.container, { agreement: true });
    expect(view.container.querySelector("[data-topic-kind]")?.getAttribute("data-topic-kind")).toBe(
      "legacy",
    );
    const text = view.container.textContent ?? "";
    expect(text).not.toMatch(SCOREBOARD);
    expect(text).not.toContain("REQUIRES AUTHORING");
    // The pillar texts are printed once each (no synoptic table duplicate).
    for (const pillar of topic.pillars) {
      expect(text.split(pillar.proponent_rebuttal)).toHaveLength(2);
      expect(text.split(pillar.skeptic_premise)).toHaveLength(2);
    }
    // No per-card score bars, no Read/Map toggle, no floating canvas CTA.
    expect(view.container.querySelector('[role="meter"], [role="progressbar"]')).toBeNull();
    expect(view.container.querySelector('a[href^="/?topic="]')).toBeNull();
    const diagram = within(view.container).getByRole("link", { name: "See it as a diagram →" });
    expect(diagram.getAttribute("href")).toBe("/topics/nuclear-energy-safety/map");
  });

  it("renders a legacy map without falsification data cleanly, with no scoreboard", async () => {
    const { topic, view } = await renderLegacy("epstein-files");
    expectCruxFirstOrder(view.container, { agreement: false });
    const text = view.container.textContent ?? "";
    expect(text).not.toMatch(SCOREBOARD);
    expect(text).not.toContain("REQUIRES AUTHORING");
    const questions = [...view.container.querySelectorAll("#cruxes [data-crux-sheet] > li h3 > span:first-child")].map((h) =>
      h.textContent?.trim(),
    );
    expect(questions).toEqual(topic.pillars.map((p) => p.crux.title));
  });

  it("gives every source link inside a crux fold a 44px hit area", async () => {
    const { view } = await renderLegacy("nuclear-energy-safety");
    const links = view.container.querySelectorAll<HTMLAnchorElement>('#cruxes a[target="_blank"]');
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link.className).toContain("min-h-11");
      expect(link.getAttribute("aria-label")).toMatch(/^Open source from .+ \(opens in a new tab\)$/);
    }

    const topic = loadArgumentTopic("capitalism-after-ai")!;
    const flagship = render(
      <DebateView meta={topic.meta} graph={topic.graph} cruxes={topic.cruxes} />,
    );
    const flagshipLinks = flagship.container.querySelectorAll<HTMLAnchorElement>(
      '#cruxes a[target="_blank"]',
    );
    expect(flagshipLinks.length).toBeGreaterThan(0);
    for (const link of flagshipLinks) expect(link.className).toContain("min-h-11");
  });
});

describe("the one-tap reflection", () => {
  it("offers the crux questions, stores the answer locally, and never grades it", async () => {
    const { view } = await renderLegacy("nuclear-energy-safety");
    const reflection = view.container.querySelector<HTMLElement>("#reflect")!;
    const scope = within(reflection);
    expect(scope.getByRole("heading", { name: "Which question would change your mind?" })).toBeTruthy();

    const options = scope.getAllByRole("button", { pressed: false });
    // One per crux, plus "None of these would".
    expect(options).toHaveLength(3);
    fireEvent.click(options[1]);

    const stored = JSON.parse(
      window.localStorage.getItem("argumend-crux-reflection-nuclear-energy-safety")!,
    );
    expect(stored.choice).toBe("crux-climate-effectiveness");
    expect(scope.getByText(/Did this map change what you thought the argument was about\?/)).toBeTruthy();

    fireEvent.click(scope.getByRole("button", { name: "A little" }));
    expect(
      JSON.parse(window.localStorage.getItem("argumend-crux-reflection-nuclear-energy-safety")!)
        .changed,
    ).toBe("somewhat");

    const text = reflection.textContent ?? "";
    expect(text).not.toMatch(/%|readers|not alone|further than|\blean\b/i);
  });
});

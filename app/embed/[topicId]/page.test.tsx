import "@/test/setup-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { loadTopicById } from "@/data/topicLoader";
import { argumentTopicIds } from "@/lib/argument/topicIds";
import { loadArgumentTopic } from "@/lib/argument/draftTopics";
import { topicSummaries } from "@/data/topicIndex";

vi.mock("next/link", () => ({
  default: ({ children, href, prefetch: _prefetch, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; prefetch?: boolean }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

import EmbedPage, { generateMetadata, generateStaticParams } from "./page";
import { embedTopicIds, fromArgumentTopic, loadEmbedModel, type EmbedModel } from "./_model";
import { asSentence } from "@/components/topic/cruxPrimitives";

/**
 * Nothing on a widget that travels to other sites may score the sides. The
 * words are checked against the widget's own chrome (the rendered text with
 * the map's authored sentences taken out, since a map may well say
 * "marginal" or "verdict" about its subject), and the old widget's exact
 * readouts against everything.
 */
const SCOREBOARD = /verdict|margin|winner|scores came out|leaned toward|balance|weight|\/100|\bpts\b|%/i;
const OLD_READOUTS = /Scores (came out|leaned toward)|(Balance|Weight) \d+\/100|Margin\s*\d/;

function chromeOf(text: string, model: EmbedModel): string {
  const authored = [
    model.title,
    model.subtitle?.text,
    ...model.agreement,
    model.crux?.question,
    model.crux?.settle.condition,
    model.crux?.settle.condition ? asSentence(model.crux.settle.condition) : undefined,
  ].filter((part): part is string => Boolean(part));
  return authored.reduce((rest, part) => rest.split(part).join(" "), text);
}

function expectNoScoreboard(text: string, model: EmbedModel) {
  expect(chromeOf(text, model), model.id).not.toMatch(SCOREBOARD);
  expect(text, model.id).not.toMatch(OLD_READOUTS);
}

async function renderEmbed(topicId: string) {
  const element = await EmbedPage({ params: Promise.resolve({ topicId }) });
  return render(element);
}

afterEach(cleanup);

describe("embed widget: an older (pillar) map", () => {
  it("shows the question, the common ground, the first crux and what would settle it", async () => {
    const topic = (await loadTopicById("nuclear-energy-safety"))!;
    const view = await renderEmbed("nuclear-energy-safety");
    const text = view.container.textContent ?? "";

    expect(view.getByRole("heading", { level: 1 }).textContent).toBe(
      topic.question ?? topic.title,
    );
    expect(view.getByRole("heading", { name: "What both sides already agree on" })).toBeTruthy();
    expect(text).toContain(topic.pillars[0].crux.falsification!.common_ground!);
    expect(view.getByRole("heading", { name: "The question it turns on" })).toBeTruthy();
    // The first crux as the map page words it: the authored question, else
    // the live disagreement.
    expect(text).toContain(
      topic.pillars[0].crux.question ?? topic.pillars[0].crux.falsification!.live_disagreement!,
    );
    expect(text).toContain("What would settle it");
    expect(text).toContain(topic.pillars[0].crux.description);

    const link = view.getByRole("link", { name: /Read the whole map on Argumend/ });
    expect(link.getAttribute("href")).toBe("https://argumend.org/topics/nuclear-energy-safety");
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toContain("noopener");
    expectNoScoreboard(text, (await loadEmbedModel("nuclear-energy-safety"))!);
  });

  it("falls back to the crux test on maps without falsification data, with no agreement block", async () => {
    const topic = (await loadTopicById("epstein-files"))!;
    expect(topic.pillars.some((pillar) => pillar.crux.falsification)).toBe(false);
    const view = await renderEmbed("epstein-files");
    const text = view.container.textContent ?? "";

    expect(view.queryByRole("heading", { name: /agree/ })).toBeNull();
    // The authored crux question when there is one, else the crux test's title.
    expect(text).toContain(topic.pillars[0].crux.question ?? topic.pillars[0].crux.title);
    expect(text).toContain(topic.pillars[0].crux.description);
    expectNoScoreboard(text, (await loadEmbedModel("epstein-files"))!);
  });
});

describe("embed widget: a new-model map", () => {
  it("renders instead of 404ing, with the map page's first crux", async () => {
    const topic = loadArgumentTopic("ai-mass-unemployment")!;
    const model = fromArgumentTopic(topic);
    const view = await renderEmbed("ai-mass-unemployment");
    const text = view.container.textContent ?? "";

    expect(view.getByRole("heading", { level: 1 }).textContent).toBe(topic.meta.title);
    expect(view.getByRole("heading", { name: "What all four camps already accept" })).toBeTruthy();
    expect(model.agreement.length).toBeGreaterThan(0);
    for (const fact of model.agreement) expect(text).toContain(fact);

    const first = topic.graph.nodes.find((node) => node.id === topic.cruxes[0].claimId)!;
    expect(first.type).toBe("claim");
    expect(model.crux?.question).toBe(
      topic.meta.cruxNotes?.[first.id]?.question ?? first.summary ?? first.statement,
    );
    expect(text).toContain(model.crux!.question);
    expect(view.container.querySelector("[data-settle]")).not.toBeNull();
    expect(text).toMatch(/What (would settle|settled) it/);
    expect(view.getByRole("link", { name: /Read the whole map on Argumend/ }).getAttribute("href")).toBe(
      "https://argumend.org/topics/ai-mass-unemployment",
    );
    expectNoScoreboard(text, model);
  });

  it("keeps a map's authored agreement to claims the map still grades as agreed", () => {
    for (const id of argumentTopicIds) {
      const topic = loadArgumentTopic(id)!;
      const model = fromArgumentTopic(topic);
      expect(model.agreement.length).toBeLessThanOrEqual(3);
      for (const fact of model.agreement) {
        const claim = topic.graph.nodes.find((node) => node.statement === fact);
        expect(claim?.type).toBe("claim");
        if (claim?.type === "claim") {
          expect(["uncontested", "broadly_accepted"]).toContain(claim.status);
        }
      }
    }
  });
});

describe("embed widget: every map", () => {
  it("prerenders the older maps and the new-model ones", () => {
    const ids = generateStaticParams().map(({ topicId }) => topicId);
    expect(ids).toEqual(embedTopicIds());
    for (const id of argumentTopicIds) expect(ids).toContain(id);
    expect(ids).toHaveLength(topicSummaries.length + argumentTopicIds.length);
  });

  it("never renders a verdict, a margin, a score or a winner", async () => {
    for (const topicId of embedTopicIds()) {
      const view = await renderEmbed(topicId);
      const text = view.container.textContent ?? "";
      expectNoScoreboard(text, (await loadEmbedModel(topicId))!);
      expect(view.getAllByRole("heading", { level: 1 }), topicId).toHaveLength(1);
      expect(view.getByRole("link", { name: /Read the whole map/ }), topicId).toBeTruthy();
      cleanup();
    }
  }, 60_000);

  it("titles new-model embeds from the lightweight index and 404s unknown ids", async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ topicId: "capitalism-after-ai" }) });
    expect(metadata.title).toBe("Can capitalism survive AI? — Embed");
    expect(metadata.robots).toEqual({ index: false, follow: false });
    await expect(renderEmbed("definitely-missing")).rejects.toThrow();
  });
});

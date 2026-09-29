import { beforeAll, describe, expect, it } from "vitest";
import { loadTopicById } from "@/data/topicLoader";
import { firstSentence, legacyTopicPage } from "@/lib/topicPage/legacy";
import type { Topic } from "@/lib/schemas/topic";
import { buildDiagram, childrenOf, type DiagramModel } from "./model";

let topic: Topic;
let diagram: DiagramModel;

beforeAll(async () => {
  topic = (await loadTopicById("nuclear-energy-safety"))!;
  diagram = buildDiagram(topic);
});

describe("buildDiagram: the page's story as a tree", () => {
  it("roots the tree in the page's question", () => {
    const [root] = diagram.nodes;
    expect(root.kind).toBe("question");
    expect(root.label).toBe(legacyTopicPage(topic).page.title);
    expect(root.label).toBe(topic.question ?? topic.title);
  });

  it("gives one branch per crux, labelled with the crux question the page shows", () => {
    const { cruxes } = legacyTopicPage(topic);
    const branches = childrenOf(diagram, "question");
    expect(branches.map((n) => n.kind)).toEqual(cruxes.map(() => "crux"));
    expect(branches.map((n) => n.label)).toEqual(cruxes.map((c) => c.question));
    expect(branches.map((n) => (n.kind === "crux" ? n.number : 0))).toEqual(
      cruxes.map((_, i) => i + 1),
    );
  });

  it("puts supporters then skeptics under each crux, quoting that pillar's case", () => {
    topic.pillars.forEach((pillar, i) => {
      const crux = childrenOf(diagram, "question")[i];
      const sides = childrenOf(diagram, crux.id);
      expect(sides.map((s) => (s.kind === "side" ? s.heading : ""))).toEqual(["Says yes", "Says no"]);
      const [supporters, skeptics] = sides;
      if (supporters.kind !== "side" || skeptics.kind !== "side") throw new Error("not sides");
      expect(supporters.text).toBe(pillar.proponent_rebuttal);
      expect(skeptics.text).toBe(pillar.skeptic_premise);
      expect(supporters.label).toBe(firstSentence(pillar.proponent_rebuttal));
      expect(supporters.lead).toBe(pillar.title);
    });
  });

  it("hangs each evidence card under the side it supports, by its title", () => {
    const { cruxes } = legacyTopicPage(topic);
    cruxes.forEach((crux) => {
      const [supporters, skeptics] = childrenOf(diagram, crux.anchor);
      const titles = (sideId: string) => childrenOf(diagram, sideId).map((n) => n.label);
      expect(titles(supporters.id)).toEqual(crux.evidence.filter((e) => e.side === "for").map((e) => e.title));
      expect(titles(skeptics.id)).toEqual(crux.evidence.filter((e) => e.side === "against").map((e) => e.title));
    });
  });

  it("lists nodes in reading order, each after its parent, with unique ids", () => {
    const seen = new Set<string>();
    for (const node of diagram.nodes) {
      if (node.kind !== "question") expect(seen.has(node.parentId)).toBe(true);
      expect(seen.has(node.id)).toBe(false);
      seen.add(node.id);
    }
  });

  it("carries no placeholders, photos or scores", () => {
    const json = JSON.stringify(diagram);
    expect(json).not.toMatch(/Skeptic Thesis|Proponent Thesis|Leaf node|Meta Claim|Foundational Pillar/);
    expect(json).not.toMatch(/imageUrl|image_url|unsplash|"score"|"weight"|"balance"|\/40/);
  });
});

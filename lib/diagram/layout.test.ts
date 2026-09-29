import { beforeAll, describe, expect, it } from "vitest";
import { topicSummaries } from "@/data/topicIndex";
import { loadTopicById } from "@/data/topicLoader";
import { buildDiagram, type DiagramModel } from "./model";
import {
  FIT_VIEW,
  MIN_CLEARANCE,
  boxesCollide,
  findCollisions,
  fitZoom,
  layoutDiagram,
  type Box,
} from "./layout";

/**
 * Every map's diagram, laid out at desktop size: no two boxes touch.
 *
 * Before 2026-09-29 the canvas placed nodes on the fly as they were expanded
 * and nudged them down when they collided. Fully expanded, each of the six
 * maps measured had overlapping boxes, 14 to 41 pairs per map
 * (docs/reviews/2026-09-29-r2-diagram.md). The layout is now computed up front
 * from fixed box sizes, and this file holds it to that for all 156 maps.
 */

/** The canvas at 1440×900, as measured: the window minus the header and the intro. */
const CANVAS_1440 = { width: 1440, height: 679 };

/**
 * Below this the whole-tree view stops being readable (15px text under 7px).
 * Today's floor is 0.51, on the four five-crux maps; the median map opens at
 * about 0.82.
 */
const READABLE_FIT = 0.45;

let diagrams: DiagramModel[] = [];

beforeAll(async () => {
  const topics = await Promise.all(topicSummaries.map((t) => loadTopicById(t.id)));
  diagrams = topics.map((topic, i) => {
    if (!topic) throw new Error(`no topic module for ${topicSummaries[i].id}`);
    return buildDiagram(topic);
  });
}, 60_000);

describe("diagram layout, every map", () => {
  it("covers every map that has a diagram route", () => {
    expect(diagrams.length).toBe(topicSummaries.length);
    expect(diagrams.length).toBeGreaterThanOrEqual(156);
  });

  it("has no overlapping boxes on any map", () => {
    const failures = diagrams.flatMap((d) =>
      findCollisions(layoutDiagram(d)).map((pair) => `${d.topicId}: ${pair}`),
    );
    expect(failures).toEqual([]);
  });

  it("places every node, inside the tree's bounds", () => {
    for (const d of diagrams) {
      const { boxes, bounds } = layoutDiagram(d);
      expect(boxes.size, d.topicId).toBe(d.nodes.length);
      for (const [id, box] of boxes) {
        expect(box.x, `${d.topicId} ${id}`).toBeGreaterThanOrEqual(bounds.x);
        expect(box.y, `${d.topicId} ${id}`).toBeGreaterThanOrEqual(bounds.y);
        expect(box.x + box.width, `${d.topicId} ${id}`).toBeLessThanOrEqual(bounds.x + bounds.width);
        expect(box.y + box.height, `${d.topicId} ${id}`).toBeLessThanOrEqual(bounds.y + bounds.height);
      }
    }
  });

  it("draws every child below its parent, so edges run down the page", () => {
    for (const d of diagrams) {
      const { boxes } = layoutDiagram(d);
      for (const node of d.nodes) {
        if (node.kind === "question") continue;
        const parent = boxes.get(node.parentId)!;
        const child = boxes.get(node.id)!;
        expect(child.y, `${d.topicId} ${node.id}`).toBeGreaterThan(parent.y + parent.height);
      }
    }
  });

  it("fits the whole tree in a 1440-wide canvas at a readable zoom", () => {
    const tooSmall = diagrams
      .map((d) => ({ id: d.topicId, zoom: fitZoom(layoutDiagram(d).bounds, CANVAS_1440, FIT_VIEW) }))
      .filter(({ zoom }) => zoom < READABLE_FIT);
    expect(tooSmall).toEqual([]);
  });
});

describe("boxesCollide", () => {
  const box = (x: number, y: number): Box => ({ x, y, width: 100, height: 50 });

  it("flags overlaps and near-misses closer than the clearance", () => {
    expect(boxesCollide(box(0, 0), box(50, 25))).toBe(true);
    expect(boxesCollide(box(0, 0), box(100 + MIN_CLEARANCE - 1, 0))).toBe(true);
  });

  it("passes boxes that keep the clearance on either axis", () => {
    expect(boxesCollide(box(0, 0), box(100 + MIN_CLEARANCE, 0))).toBe(false);
    expect(boxesCollide(box(0, 0), box(0, 50 + MIN_CLEARANCE))).toBe(false);
  });
});

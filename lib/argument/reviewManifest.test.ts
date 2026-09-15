import { readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { ARGUMENT_TOPICS_FIRST_PUBLISHED } from "@/lib/site";
import { loadArgumentTopic } from "./draftTopics";
import {
  MANIFEST_DIR,
  REVIEW_CADENCES,
  addDays,
  daysBetween,
  isIsoDate,
  loadArgumentReviewManifest,
  parseArgumentReviewManifest,
  reviewManifestPath,
} from "./reviewManifest";
import { argumentTopicIds } from "./topicIds";

const VALID_MANIFEST = {
  topicId: "example-map",
  manifestVersion: 1,
  owner: "founder",
  cadence: "ongoing-war",
  lastFullReview: "2026-08-12",
  lastHeadlineCheck: "2026-08-12",
  nextHeadlineCheckDue: "2026-08-19",
  nextFullReviewDue: "2026-09-11",
  fastMovingNodes: [{ id: "e-one", why: "weekly series" }],
  triggerEvents: ["a ceasefire"],
  correctionLog: [],
};

describe("review manifest schema", () => {
  it("accepts a well-formed manifest", () => {
    const parsed = parseArgumentReviewManifest(VALID_MANIFEST);
    expect(parsed.ok).toBe(true);
  });

  it("rejects due dates later than the cadence allows", () => {
    const parsed = parseArgumentReviewManifest({
      ...VALID_MANIFEST,
      nextHeadlineCheckDue: "2026-08-20",
    });
    expect(parsed.ok).toBe(false);
    if (!parsed.ok) {
      expect(parsed.errors.join("\n")).toMatch(/nextHeadlineCheckDue must be no later than 2026-08-19/);
    }
  });

  it("allows a due date pulled earlier than the cadence", () => {
    const parsed = parseArgumentReviewManifest({
      ...VALID_MANIFEST,
      nextFullReviewDue: "2026-08-20",
    });
    expect(parsed.ok).toBe(true);
  });

  it("rejects impossible or malformed calendar dates", () => {
    expect(parseArgumentReviewManifest({ ...VALID_MANIFEST, lastFullReview: "2026-02-30" }).ok).toBe(false);
    expect(parseArgumentReviewManifest({ ...VALID_MANIFEST, lastFullReview: "12/08/2026" }).ok).toBe(false);
    expect(isIsoDate("2024-02-29")).toBe(true);
    expect(isIsoDate("2026-02-29")).toBe(false);
  });

  it("rejects a headline check that precedes the full review", () => {
    expect(
      parseArgumentReviewManifest({ ...VALID_MANIFEST, lastHeadlineCheck: "2026-08-01" }).ok
    ).toBe(false);
  });

  it("rejects duplicate fast-moving ids, unknown keys, and out-of-order corrections", () => {
    expect(
      parseArgumentReviewManifest({
        ...VALID_MANIFEST,
        fastMovingNodes: [
          { id: "e-one", why: "a" },
          { id: "e-one", why: "b" },
        ],
      }).ok
    ).toBe(false);
    expect(parseArgumentReviewManifest({ ...VALID_MANIFEST, extra: true }).ok).toBe(false);
    expect(
      parseArgumentReviewManifest({
        ...VALID_MANIFEST,
        correctionLog: [
          {
            date: "2026-09-02",
            origin: "editorial",
            summary: "later",
            factualChanges: [],
            topologyChanges: [],
            cruxOrderMoved: false,
          },
          {
            date: "2026-09-01",
            origin: "editorial",
            summary: "earlier",
            factualChanges: [],
            topologyChanges: [],
            cruxOrderMoved: false,
          },
        ],
      }).ok
    ).toBe(false);
  });

  it("does date arithmetic in UTC calendar days", () => {
    expect(addDays("2026-08-12", 30)).toBe("2026-09-11");
    expect(addDays("2026-08-12", 90)).toBe("2026-11-10");
    expect(daysBetween("2026-09-11", "2026-09-14")).toBe(3);
    expect(daysBetween("2026-09-14", "2026-09-11")).toBe(-3);
  });
});

describe("review manifest loader", () => {
  it("reports a missing manifest without throwing", () => {
    const result = loadArgumentReviewManifest("no-such-map");
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toBe("missing");
  });

  it("refuses non-slug ids so the path cannot escape the manifest directory", () => {
    expect(() => reviewManifestPath("../secrets")).toThrow(/non-slug/);
    expect(() => reviewManifestPath("Us-Israel")).toThrow(/non-slug/);
  });
});

describe("flagship review manifests", () => {
  it("exist, validate, and match the registered topic for every ArgumentGraph", () => {
    for (const topicId of argumentTopicIds) {
      const result = loadArgumentReviewManifest(topicId);
      expect(result.ok, `${topicId}: ${result.ok ? "" : result.errors.join("; ")}`).toBe(true);
      if (!result.ok) continue;
      expect(result.manifest.topicId).toBe(topicId);
      expect(result.manifest.owner.trim().length).toBeGreaterThan(0);
      expect(result.manifest.fastMovingNodes.length).toBeGreaterThan(0);
      expect(result.manifest.triggerEvents.length).toBeGreaterThan(0);
    }
  });

  it("has no orphan manifest files for unregistered topics", () => {
    const files = readdirSync(path.resolve(process.cwd(), MANIFEST_DIR)).filter((name) =>
      name.endsWith(".manifest.json")
    );
    const registered = new Set(argumentTopicIds);
    for (const file of files) {
      const topicId = file.replace(/\.manifest\.json$/, "");
      expect(registered.has(topicId), `orphan manifest ${file}`).toBe(true);
    }
    expect(files.length).toBe(argumentTopicIds.length);
  });

  it("references only evidence nodes that exist in the graph", () => {
    for (const topicId of argumentTopicIds) {
      const result = loadArgumentReviewManifest(topicId);
      const topic = loadArgumentTopic(topicId);
      expect(result.ok).toBe(true);
      expect(topic).not.toBeNull();
      if (!result.ok || topic === null) continue;

      const nodesById = new Map(topic.graph.nodes.map((node) => [node.id, node]));
      for (const { id, why } of result.manifest.fastMovingNodes) {
        expect(nodesById.get(id)?.type, `${topicId}: fast-moving ${id}`).toBe("evidence");
        expect(why.trim().length, `${topicId}: fast-moving ${id} needs reasoning`).toBeGreaterThan(20);
      }
      for (const entry of result.manifest.correctionLog) {
        for (const nodeId of entry.nodeIds ?? []) {
          expect(nodesById.has(nodeId), `${topicId}: correction node ${nodeId}`).toBe(true);
        }
      }
    }
  });

  it("carries honest, cadence-consistent dates", () => {
    for (const topicId of argumentTopicIds) {
      const result = loadArgumentReviewManifest(topicId);
      expect(result.ok).toBe(true);
      if (!result.ok) continue;
      const { manifest } = result;
      const cadence = REVIEW_CADENCES[manifest.cadence];

      for (const date of [
        manifest.lastFullReview,
        manifest.lastHeadlineCheck,
        manifest.nextHeadlineCheckDue,
        manifest.nextFullReviewDue,
      ]) {
        expect(isIsoDate(date), `${topicId}: ${date}`).toBe(true);
      }
      expect(manifest.lastFullReview >= ARGUMENT_TOPICS_FIRST_PUBLISHED).toBe(true);
      expect(manifest.lastHeadlineCheck >= manifest.lastFullReview).toBe(true);
      expect(manifest.nextHeadlineCheckDue).toBe(
        addDays(manifest.lastHeadlineCheck, cadence.headlineCheckDays)
      );
      expect(manifest.nextFullReviewDue).toBe(addDays(manifest.lastFullReview, cadence.fullReviewDays));
    }
  });

  it("assigns the ongoing-war cadence to the U.S.-Israel map", () => {
    const result = loadArgumentReviewManifest("us-israel-support");
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.manifest.cadence).toBe("ongoing-war");
  });
});

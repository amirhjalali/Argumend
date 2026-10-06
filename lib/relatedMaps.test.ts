import { beforeAll, describe, expect, it } from "vitest";
import { topicSummaries } from "@/data/topicIndex";
import { argumentTopicIds } from "@/lib/argument/topicIds";
import { buildMapIndex, type MapDocument, type MapIndex } from "@/lib/paste/mapIndex";
import { loadMapDocuments } from "@/lib/paste/mapDocuments";
import { getMapIndex } from "@/lib/paste/maps";
import { getRelatedMaps, mapCategory, rankRelatedMaps, RELATED_MAPS } from "./relatedMaps";

/**
 * "Keep exploring" used to be the first three maps of the same category in
 * corpus order, so the nuclear-power map offered sports betting, daylight
 * saving time and universal healthcare. Related now means nearest subject,
 * read from the maps' own words, then the same category.
 */

let index: MapIndex;
let documents: MapDocument[];

beforeAll(async () => {
  index = await getMapIndex();
  documents = await loadMapDocuments();
}, 60_000);

const ENERGY_AND_NUCLEAR = new Set([
  "nuclear-renaissance-smr",
  "ev-environmental-impact",
  "carbon-capture-viability",
  "hydrogen-economy-viability",
  "ai-energy-water-footprint",
  "climate-change",
  "geoengineering-climate",
]);

const allIds = () => [...topicSummaries.map((topic) => topic.id), ...argumentTopicIds];

describe("related maps", () => {
  it("gives the nuclear-power map its energy and nuclear neighbours", async () => {
    const related = await getRelatedMaps("nuclear-energy-safety");
    expect(related).toHaveLength(RELATED_MAPS.count);
    // The other nuclear-power map is the nearest subject on the site.
    expect(related[0].id).toBe("nuclear-renaissance-smr");
    for (const map of related) expect(ENERGY_AND_NUCLEAR.has(map.id), map.id).toBe(true);
    // The old corpus-order picks.
    for (const old of ["universal-healthcare", "gun-control-effectiveness", "sports-betting-legalization"]) {
      expect(related.map((map) => map.id)).not.toContain(old);
    }
  });

  it("gives the flagship maps neighbours on their own subject", async () => {
    const jobs = (await getRelatedMaps("ai-mass-unemployment")).map((map) => map.id);
    expect(jobs.some((id) => id.startsWith("ai-") || id === "universal-basic-income")).toBe(true);
    expect(jobs).not.toContain("us-israel-support");
    const israel = (await getRelatedMaps("us-israel-support")).map((map) => map.id);
    expect(israel.some((id) => /iran|israel|gaza|weapons|ukraine|taiwan/.test(id))).toBe(true);
    expect(israel).not.toContain("ai-mass-unemployment");
  });

  it("never relates a map to itself, never repeats one, and fills every list", () => {
    for (const id of allIds()) {
      const related = rankRelatedMaps(index, id, mapCategory);
      const ids = related.map((map) => map.id);
      expect(ids, id).not.toContain(id);
      expect(new Set(ids).size, id).toBe(ids.length);
      expect(ids.length, id).toBe(RELATED_MAPS.count);
      for (const map of related) expect(map.title.trim(), map.id).not.toBe("");
    }
  });

  it("is deterministic: the same text gives the same lists, whatever order the maps load in", () => {
    const reversed = buildMapIndex([...documents].reverse());
    for (const id of allIds()) {
      const first = rankRelatedMaps(index, id, mapCategory).map((map) => map.id);
      expect(rankRelatedMaps(index, id, mapCategory).map((map) => map.id), id).toEqual(first);
      expect(rankRelatedMaps(reversed, id, mapCategory).map((map) => map.id), id).toEqual(first);
    }
  });

  it("returns nothing for a map the index does not have", async () => {
    expect(await getRelatedMaps("no-such-map")).toEqual([]);
  });
});

describe("rankRelatedMaps ordering", () => {
  const doc = (id: string, words: string): MapDocument => ({
    id,
    title: id,
    claim: words,
    kind: "map",
    fields: { name: [id], claim: [words], body: [], evidence: [] },
  });
  const tiny = buildMapIndex([
    doc("reactor-a", "reactor uranium meltdown waste grid"),
    doc("reactor-b", "reactor uranium meltdown waste cost"),
    doc("grid-shelf", "grid tariff voters ballot"),
    doc("grid-other", "grid tariff wind turbine"),
    doc("unrelated", "poetry sonnet meter rhyme"),
  ]);
  const shelves: Record<string, string> = {
    "reactor-a": "energy",
    "reactor-b": "science",
    "grid-shelf": "energy",
    "grid-other": "science",
    unrelated: "energy",
  };
  const categoryOf = (id: string) => shelves[id];

  it("puts a sibling first even from another category", () => {
    expect(rankRelatedMaps(tiny, "reactor-a", categoryOf, 1)[0]).toMatchObject({
      id: "reactor-b",
      sibling: true,
    });
  });

  it("breaks a near tie toward the same category", () => {
    const ranked = rankRelatedMaps(tiny, "reactor-a", categoryOf, 4).map((map) => map.id);
    // grid-shelf and grid-other share the same one word with reactor-a;
    // grid-shelf sits on reactor-a's shelf.
    expect(ranked.indexOf("grid-shelf")).toBeLessThan(ranked.indexOf("grid-other"));
  });
});

import { beforeAll, describe, expect, it } from "vitest";
import { topicSummaries } from "@/data/topicIndex";
import { argumentTopicIds } from "@/lib/argument/topicIds";
import { buildMapIndex, type MapDocument, type MapIndex } from "@/lib/paste/mapIndex";
import { loadMapDocuments } from "@/lib/paste/mapDocuments";
import { getMapIndex } from "@/lib/paste/maps";
import { getRelatedMaps, rankRelatedMaps, RELATED_MAPS } from "./relatedMaps";

/**
 * "Keep exploring" used to be the first three maps of the same category in
 * corpus order, so the nuclear-power map offered sports betting, daylight
 * saving time and universal healthcare. Related means a nearby subject,
 * rather than filling three slots from a broad category.
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
const tagsById = new Map(topicSummaries.map((topic) => [topic.id, topic.tags]));
const tagsOf = (id: string) => tagsById.get(id) ?? [];

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

  it("connects road pricing to transport instead of unrelated policy maps", async () => {
    const related = (await getRelatedMaps("congestion-pricing")).map((map) => map.id);
    expect(related).toContain("self-driving-car-safety");
    const transportNeighbours = new Set([
      "self-driving-car-safety", "ev-environmental-impact", "remote-work-permanence",
      "return-to-office-productivity", "housing-affordability-crisis",
    ]);
    for (const id of related) expect(transportNeighbours.has(id), id).toBe(true);
    // The tags use "transport" and "transportation", so inflections matter.
    expect((await getRelatedMaps("self-driving-car-safety")).map((map) => map.id))
      .toContain("congestion-pricing");
  });

  it("keeps housing neighbours without padding the list with debt and estate tax", async () => {
    const related = (await getRelatedMaps("rent-control-effectiveness")).map((map) => map.id);
    expect(related).toContain("housing-affordability-crisis");
    expect(related).toContain("global-housing-bubble");
    expect(related).not.toContain("estate-inheritance-tax");
    expect(related).not.toContain("student-debt-forgiveness");
  });

  it("never relates a map to itself or repeats one, and respects the list limit", () => {
    for (const id of allIds()) {
      const related = rankRelatedMaps(index, id, RELATED_MAPS.count, tagsOf);
      const ids = related.map((map) => map.id);
      expect(ids, id).not.toContain(id);
      expect(new Set(ids).size, id).toBe(ids.length);
      expect(ids.length, id).toBeLessThanOrEqual(RELATED_MAPS.count);
      for (const map of related) expect(map.title.trim(), map.id).not.toBe("");
    }
  });

  it("is deterministic: the same text gives the same lists, whatever order the maps load in", () => {
    const reversed = buildMapIndex([...documents].reverse());
    for (const id of allIds()) {
      const first = rankRelatedMaps(index, id, RELATED_MAPS.count, tagsOf).map((map) => map.id);
      expect(rankRelatedMaps(index, id, RELATED_MAPS.count, tagsOf).map((map) => map.id), id).toEqual(first);
      expect(rankRelatedMaps(reversed, id, RELATED_MAPS.count, tagsOf).map((map) => map.id), id).toEqual(first);
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

  it("puts a sibling first", () => {
    expect(rankRelatedMaps(tiny, "reactor-a", 1)[0]).toMatchObject({
      id: "reactor-b",
      sibling: true,
    });
  });

  it("leaves an isolated map without fabricated neighbours", () => {
    expect(rankRelatedMaps(tiny, "unrelated")).toEqual([]);
  });

  it("does not treat broad category tags as a subject connection", () => {
    expect(rankRelatedMaps(index, "congestion-pricing", 3, () => ["policy"]))
      .toEqual([]);
  });

  it("does not let a shared tag join maps with no textual connection", () => {
    expect(rankRelatedMaps(tiny, "unrelated", 3, () => ["transport"]))
      .toEqual([]);
  });
});

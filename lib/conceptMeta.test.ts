import { describe, it, expect } from "vitest";
import { BookOpen } from "lucide-react";
import { concepts } from "@/data/concepts";
import {
  conceptStages,
  conceptStageOrder,
  getConceptStage,
  getConceptIcon,
  groupConceptsByStage,
} from "./conceptMeta";

describe("conceptMeta", () => {
  it("maps every concept to a stage without hitting the framing fallback", () => {
    // The fallback would silently file an unmapped concept under "framing", so
    // assert the mapping is explicit: only concepts we deliberately placed in
    // framing may land there.
    const framing = concepts.filter((c) => getConceptStage(c.id).id === "framing");
    expect(framing.map((c) => c.id).sort()).toEqual(["pillars", "steel-manning"]);

    for (const concept of concepts) {
      expect(Object.values(conceptStages)).toContainEqual(getConceptStage(concept.id));
    }
  });

  it("falls back to framing and BookOpen for an unknown id", () => {
    expect(getConceptStage("not-a-concept").id).toBe("framing");
    expect(getConceptIcon("not-a-concept")).toBe(BookOpen);
  });

  it("gives every concept a distinct, non-fallback icon", () => {
    const icons = concepts.map((c) => getConceptIcon(c.id));
    expect(new Set(icons).size).toBe(concepts.length);
    expect(icons).not.toContain(BookOpen);
  });

  it("groups the full list into all stages with no duplicates or omissions", () => {
    const groups = groupConceptsByStage(concepts);
    expect(groups).toHaveLength(conceptStageOrder.length);

    const total = groups.reduce((sum, g) => sum + g.items.length, 0);
    expect(total).toBe(concepts.length);

    const seenIds = new Set(groups.flatMap((g) => g.items.map((c) => c.id)));
    expect(seenIds.size).toBe(concepts.length);
  });

  it("orders groups by conceptStageOrder and numbers stages sequentially", () => {
    const groups = groupConceptsByStage(concepts);
    expect(groups.map((g) => g.stage.id)).toEqual([...conceptStageOrder]);
    expect(groups.map((g) => g.stage.numeral)).toEqual(["I", "II", "III"]);
  });

  it("omits stages with no matching concepts", () => {
    const groups = groupConceptsByStage(concepts.filter((c) => c.id === "cruxes"));
    expect(groups).toHaveLength(1);
    expect(groups[0]!.stage.id).toBe("testing");
  });

  it("keeps stage ids self-consistent and gives each stage a distinct color chip", () => {
    for (const id of conceptStageOrder) {
      expect(conceptStages[id].id).toBe(id);
    }
    const chips = conceptStageOrder.map((id) => conceptStages[id].chip);
    expect(new Set(chips).size).toBe(conceptStageOrder.length);
  });
});

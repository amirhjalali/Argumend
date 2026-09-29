import { describe, expect, it } from "vitest";
import { DISAGREEMENT_EXAMPLE_SOURCE } from "@/lib/disagreement/constants";
import { findMaps } from "./maps";
import { buildPasteSummary, withoutNames } from "./summary";

describe("withoutNames", () => {
  it("replaces whole participant labels, longest first, and leaves other words alone", () => {
    expect(withoutNames("Ann Lee and Ann disagree; Annette does not.", ["Ann", "Ann Lee"])).toBe(
      "one participant and one participant disagree; Annette does not.",
    );
  });

  it("treats labels as text, not patterns", () => {
    expect(withoutNames("user.1 said so", ["user.1"])).toBe("one participant said so");
    expect(withoutNames("userx1 said so", ["user.1"])).toBe("userx1 said so");
  });
});

describe("buildPasteSummary", () => {
  it("names the map and its crux, links the crux, and carries no scores", async () => {
    const maps = await findMaps(DISAGREEMENT_EXAMPLE_SOURCE);
    const summary = buildPasteSummary({ maps, report: null });

    expect(summary).toContain("It is already mapped: Immigration and Wages.");
    expect(summary).toContain("What would change a supporter's mind:");
    expect(summary).toContain(
      "https://argumend.org/topics/immigration-wage-impact#crux-wage-elasticity-immigration",
    );
    expect(summary).not.toMatch(/\d+\s*\/\s*40|score/i);
  });
});

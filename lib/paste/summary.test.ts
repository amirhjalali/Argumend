import { beforeAll, describe, expect, it } from "vitest";
import { DISAGREEMENT_EXAMPLE_SOURCE } from "@/lib/disagreement/constants";
import { findMaps, getMapIndex } from "./maps";
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
  beforeAll(() => getMapIndex(), 60_000);

  it("names the map and its crux, links the crux, and carries no scores", async () => {
    const maps = await findMaps(DISAGREEMENT_EXAMPLE_SOURCE);
    const summary = buildPasteSummary({ maps, report: null });

    // Named by the map's question, as its page heading is; sides by the answer.
    expect(summary).toContain(
      "A map to explore: Does large-scale immigration significantly cut low-skilled native wages?",
    );
    expect(summary).not.toContain("Immigration and Wages");
    expect(summary).not.toContain(maps.match!.claim);
    expect(summary).toContain("Questions to explore together");
    expect(summary).toContain("What would make each of us think again?");
    expect(summary).toContain("What would change the mind of someone who says yes to the map’s question");
    expect(summary).toContain(
      "https://argumend.org/topics/immigration-wage-impact#crux-labor-market-economics",
    );
    expect(summary).not.toMatch(/\d+\s*\/\s*40|score/i);
  });

  it("keeps the flagship question's geographic and time scope", async () => {
    const maps = await findMaps("Will AI cause mass unemployment in the U.S. within the next 15 years?");
    expect(maps.match?.kind).toBe("flagship");
    const summary = buildPasteSummary({ maps, report: null });
    expect(summary).toContain("Scope: Will AI cause mass unemployment in the U.S. within the next 15 years?");
  });
});

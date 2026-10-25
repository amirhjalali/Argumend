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

  it("keeps a borrowed card's evidence link without duplicating an already linked question", async () => {
    const maps = await findMaps("Platforms want it both ways. They curate and algorithmically promote content like a publisher but claim they're just a neutral bulletin board when someone sues. Strip their immunity and watch how fast they moderate.");
    const match = maps.match!;
    const borrowed = match.cards.find((card) => card.crux?.href !== match.crux?.href)!;
    const origin = borrowed.crux!;
    const summary = buildPasteSummary({ maps, report: null });
    expect(summary).toContain(`Related evidence: ${origin.question} https://argumend.org${origin.href}`);
    expect(summary).toContain(`Read the evidence: https://argumend.org${match.crux!.href}`);
    expect(summary).not.toContain("Both sides' best evidence:");
    const sharedOrigin = buildPasteSummary({ maps: {
      ...maps, match: { ...match, cards: [borrowed, { ...borrowed, id: "another-card" }] },
    }, report: null });
    expect(sharedOrigin.split(`https://argumend.org${origin.href}`)).toHaveLength(2);
    const alreadyLinked = buildPasteSummary({ maps: {
      ...maps, match: { ...match, alsoCrux: origin },
    }, report: null });
    expect(alreadyLinked.split(`https://argumend.org${origin.href}`)).toHaveLength(2);
  });

  it("keeps the flagship question's geographic and time scope", async () => {
    const maps = await findMaps("Will AI cause mass unemployment in the U.S. within the next 15 years?");
    expect(maps.match?.kind).toBe("flagship");
    const summary = buildPasteSummary({ maps, report: null });
    expect(summary).toContain("Scope: Will AI cause mass unemployment in the U.S. within the next 15 years?");
  });
});

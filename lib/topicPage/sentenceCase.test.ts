import { describe, expect, it } from "vitest";
import { topics } from "@/data/topics";
import { cardTitler } from "./legacy";
import { isTitleCase, namesIn, sentenceCaseTitle } from "./sentenceCase";

describe("sentenceCaseTitle", () => {
  it("lowers Title-Cased common words and keeps the first word", () => {
    expect(sentenceCaseTitle("Nuclear Among Safest Energy Per TWh")).toBe(
      "Nuclear among safest energy per TWh",
    );
    expect(sentenceCaseTitle("New Nuclear Has Massive Cost Overruns")).toBe(
      "New nuclear has massive cost overruns",
    );
  });

  it("keeps acronyms, words with digits and mixed-case names", () => {
    expect(sentenceCaseTitle("Solar/Wind Have Lower Standalone LCOE")).toBe(
      "Solar/wind have lower standalone LCOE",
    );
    expect(sentenceCaseTitle("ByteDance Internal CCP Committee Influenced Content Decisions")).toBe(
      "ByteDance internal CCP committee influenced content decisions",
    );
    expect(sentenceCaseTitle("Grid Emitted ~8x More CO2 Than Field Crops")).toBe(
      "Grid emitted ~8x more CO2 than field crops",
    );
  });

  it("keeps a short label before a colon, and the first word after it", () => {
    expect(sentenceCaseTitle("Cengiz et al.: Minimum Wage Hikes Don't Shrink Low-Wage Jobs")).toBe(
      "Cengiz et al.: Minimum wage hikes don't shrink low-wage jobs",
    );
    expect(sentenceCaseTitle("Oxford Study: Vegan Diets Have ~75% Less Environmental Impact")).toBe(
      "Oxford Study: Vegan diets have ~75% less environmental impact",
    );
  });

  it("keeps quotations as written", () => {
    expect(sentenceCaseTitle("Chronobiology: DST Imposes Chronic 'Social Jet Lag' That Never Resolves")).toBe(
      "Chronobiology: DST imposes chronic 'Social Jet Lag' that never resolves",
    );
    expect(
      sentenceCaseTitle("Front Line Barely Moved for Months; Russian Spring Offensive 'Underwhelming'"),
    ).toBe("Front line barely moved for months; Russian spring offensive 'Underwhelming'");
  });

  it("keeps a name followed by et al., and lowers a mid-title article", () => {
    expect(sentenceCaseTitle("Review Of Smith et al. Finds Large Effects")).toBe(
      "Review of Smith et al. finds large effects",
    );
    expect(sentenceCaseTitle("Autonomy Is Software — A Ban May Be Unverifiable")).toBe(
      "Autonomy is software — a ban may be unverifiable",
    );
  });

  it("treats the rest of a hyphenated first word like any other word", () => {
    expect(sentenceCaseTitle("Problem-Gambling Helpline Calls Surged 121%")).toBe(
      "Problem-gambling helpline calls surged 121%",
    );
  });

  it("leaves a title that is not Title Case alone, names and all", () => {
    const title = "Two distinct lineages in Wuhan suggest multiple spillover events";
    expect(isTitleCase(title)).toBe(false);
    expect(sentenceCaseTitle(title)).toBe(title);
  });

  it("keeps the names the map's own prose capitalises", () => {
    const names = namesIn(
      [
        "Kenneth Starr and Alan Dershowitz negotiated the deal. Researchers in France and Germany disagreed.",
        "The Congressional Research Service flagged the harms, and research on harms continued.",
      ],
      ["Doleac & Sanders (2015), Review of Economics and Statistics"],
    );
    expect(sentenceCaseTitle("Defense Team Included Starr, Dershowitz, and Other Lawyers", names)).toBe(
      "Defense team included Starr, Dershowitz, and other lawyers",
    );
    expect(sentenceCaseTitle("Congressional Research Service Flags Documented Harms", names)).toBe(
      "Congressional Research Service flags documented harms",
    );
    // "Research" alone is lowercase in the prose, so it is lowered.
    expect(sentenceCaseTitle("New Research Flags Harms", names)).toBe("New research flags harms");
    expect(sentenceCaseTitle("Evening Daylight Cut Robberies ~7% — Doleac & Sanders 2015", names)).toBe(
      "Evening daylight cut robberies ~7% — Doleac & Sanders 2015",
    );
  });
});

describe("every older map's card titles", () => {
  const all = topics.flatMap((topic) => {
    const titled = cardTitler(topic);
    return [...topic.pillars.flatMap((p) => p.evidence ?? []), ...(topic.evidence ?? [])].map((e) => ({
      topic: topic.id,
      before: e.title.replace(/\.$/, ""),
      after: titled(e.title),
    }));
  });

  it("only ever lowers letters: no word is added, dropped or capitalised", () => {
    expect(all.length).toBeGreaterThan(1000);
    for (const { before, after } of all) {
      expect(after.length, before).toBe(before.length);
      for (let i = 0; i < before.length; i += 1) {
        if (before[i] !== after[i]) expect(after[i], before).toBe(before[i].toLowerCase());
      }
    }
  });

  it("leaves no card title in Title Case except names, labels and quotations", () => {
    const stillTitled = all.filter(({ after }) => isTitleCase(after));
    // Each of these is a name ("Cambridge Declaration on Consciousness"), a
    // label before a colon or a quotation; a handful, never the norm.
    expect(stillTitled.length).toBeLessThan(all.length * 0.03);
  });

  it("keeps the names reviewers checked", () => {
    const after = (topic: string, start: string) =>
      all.find((t) => t.topic === topic && t.before.startsWith(start))?.after;
    expect(after("minimum-wage-effects", "Cengiz et al.")).toBe(
      "Cengiz et al.: Minimum wage hikes don't shrink low-wage jobs",
    );
    expect(after("nuclear-energy-safety", "France Decarbonized")).toBe(
      "France decarbonized its grid rapidly via nuclear",
    );
    expect(after("epstein-files", "Epstein’s Defense Team")).toBe(
      "Epstein’s defense team included Starr, Dershowitz, and other elite lawyers",
    );
    expect(after("daylight-saving-time-abolition", "Heart Attacks Rose")).toBe(
      "Heart attacks rose 25% the Monday after spring forward (Open Heart 2014)",
    );
    expect(after("cryptocurrency-regulation", "Post-Gensler SEC")).toMatch(/^Post-Gensler SEC shifted/);
    expect(after("student-debt-forgiveness", "Supreme Court Struck Down")).toContain(
      "Biden's broad cancellation plan in Biden v. Nebraska",
    );
    expect(after("nuclear-renaissance-smr", "Russia's Akademik Lomonosov")).toContain(
      "Akademik Lomonosov",
    );
    expect(after("rent-control-effectiveness", "NYC Rent Stabilization Serves")).toContain(
      "Black and Hispanic households",
    );
  });
});

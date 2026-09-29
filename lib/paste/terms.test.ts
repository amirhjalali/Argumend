import { describe, expect, it } from "vitest";
import { pasteTerms, porterStem, termPairs } from "./terms";

describe("porterStem", () => {
  it("matches the reference outputs of Porter (1980)", () => {
    const reference: Record<string, string> = {
      caresses: "caress", ponies: "poni", cats: "cat", agreed: "agre", plastered: "plaster",
      motoring: "motor", conflated: "conflat", hopping: "hop", falling: "fall", filing: "file",
      happy: "happi", relational: "relat", conditional: "condit", generalization: "gener",
      hopeful: "hope", goodness: "good", allowance: "allow", adjustment: "adjust", rate: "rate",
      cease: "ceas", controll: "control", electrical: "electr", adoption: "adopt",
    };
    for (const [word, stem] of Object.entries(reference)) expect(porterStem(word), word).toBe(stem);
  });

  it("folds the variants readers and maps use for the same thing", () => {
    expect(porterStem("vaping")).toBe(porterStem("vapes"));
    expect(porterStem("mining")).toBe(porterStem("mines"));
    expect(porterStem("immigrants")).toBe(porterStem("immigration"));
    expect(porterStem("police")).not.toBe(porterStem("policy"));
  });
});

describe("pasteTerms", () => {
  it("spells out common abbreviations, singular or plural", () => {
    expect(pasteTerms("SMRs")).toEqual(pasteTerms("small modular reactors"));
    expect(pasteTerms("EVs and an EV")).toEqual([...pasteTerms("electric vehicles"), ...pasteTerms("electric vehicles")]);
    expect(pasteTerms("UBI")).toEqual(pasteTerms("universal basic income"));
  });

  it("drops filler and the vocabulary of arguing itself", () => {
    expect(pasteTerms("Honestly this is exhausting. Can we just agree to disagree?")).toEqual(["exhaust"]);
    expect(pasteTerms("lol ok, that's nonsense")).toEqual([]);
  });

  it("keeps 'wrongful', which a map about wrongful convictions needs", () => {
    expect(pasteTerms("wrongful executions")).toEqual(["wrong", "execut"]);
  });
});

describe("termPairs", () => {
  it("pairs adjacent terms, skipping a word repeated in place", () => {
    expect(termPairs(["data", "center", "center", "power"])).toEqual(["data_center", "center_power"]);
  });
});

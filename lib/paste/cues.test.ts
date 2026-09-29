import { describe, expect, it } from "vitest";
import { MAX_SENTENCE, readCues } from "./cues";
import { ASSISTED_LIVING_PASTE } from "./testPastes";

describe("readCues", () => {
  it("quotes the reader's own sentences for a checkable claim and a value word", () => {
    const cues = readCues(ASSISTED_LIVING_PASTE);
    expect(cues.map((cue) => cue.kind)).toEqual(["fact", "value"]);
    const [fact, value] = cues;
    // The sentence with the most cue words wins, and the speaker label goes.
    expect(fact.sentence).toBe("Aides cost more than the facility and you work remotely, you can't be there all day.");
    expect(fact.words).toEqual(["cost", "more than"]);
    expect(value.sentence).toBe("Assisted living is the responsible choice.");
    expect(value.words).toEqual(["responsible"]);
  });

  it("finds a disputed word in quotation marks or a 'counts as'", () => {
    expect(readCues("He says she is “fine” on her own. I say she is not.")[0]).toMatchObject({
      kind: "word",
      words: ["“fine”"],
    });
    expect(readCues("Does a part-time job counts as working?")[0].kind).toBe("word");
  });

  it("never takes a sentence's full stop into a number", () => {
    expect(readCues("Prices rose in 2020.")[0].words).toEqual(["2020"]);
  });

  it("finds nothing in text without cue words, and is the same every time", () => {
    expect(readCues("Pineapple on pizza is great. It is an abomination.")).toEqual([]);
    expect(readCues(ASSISTED_LIVING_PASTE)).toEqual(readCues(ASSISTED_LIVING_PASTE));
  });

  it("cuts a long sentence at a word", () => {
    const long = `We should ${"really ".repeat(60)}go.`;
    const [cue] = readCues(long);
    expect(cue.sentence.length).toBeLessThanOrEqual(MAX_SENTENCE + 1);
    expect(cue.sentence.endsWith("…")).toBe(true);
  });
});

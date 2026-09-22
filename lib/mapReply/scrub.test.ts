import { describe, expect, it } from "vitest";
import { parseThread } from "./parse";
import { scrubText, scrubThread } from "./scrub";
import { RENT_CONTROL_THREAD } from "./__fixtures__/rentControlThread";

describe("scrubText", () => {
  it("replaces email addresses", () => {
    const { text, redactions } = scrubText("Mail me at jo.smith+city@example.co.uk about the cap.");
    expect(text).toBe("Mail me at [email] about the cap.");
    expect(redactions.emails).toBe(1);
  });

  it("replaces @handles but leaves email local parts alone", () => {
    const { text, redactions } = scrubText("@marisol_k is wrong, ask jo@example.com instead.");
    expect(text).toBe("[handle] is wrong, ask [email] instead.");
    expect(redactions.handles).toBe(1);
    expect(redactions.emails).toBe(1);
  });

  it("replaces plausible phone numbers", () => {
    const { text, redactions } = scrubText("Call the office on +1 (415) 555-0132 before Tuesday.");
    expect(text).toContain("[phone]");
    expect(text).not.toContain("555");
    expect(redactions.phones).toBe(1);
  });

  it("leaves years, percentages and money alone", () => {
    const source =
      "San Francisco lost 15% of its units after the 1994 expansion, and rents rose 5.1% by 2019.";
    const { text, redactions } = scrubText(source);
    expect(text).toBe(source);
    expect(redactions.phones).toBe(0);
  });

  it("counts nothing when there is nothing to redact", () => {
    const { text, redactions } = scrubText(RENT_CONTROL_THREAD);
    expect(text).toBe(RENT_CONTROL_THREAD);
    expect(redactions).toEqual({ emails: 0, phones: 0, handles: 0 });
  });
});

describe("scrubThread", () => {
  it("renames every speaker and keeps a map back to the real name", () => {
    const scrubbed = scrubThread(parseThread(RENT_CONTROL_THREAD));

    expect(scrubbed.aliasBySpeaker).toEqual({
      marisol_k: "Speaker 1",
      dtown_renter: "Speaker 2",
      hn_throwaway: "Speaker 3",
      buildmorehomes: "Speaker 4",
      gary_1962: "Speaker 5",
    });
    expect(scrubbed.speakerByAlias["Speaker 5"]).toBe("gary_1962");
    expect(scrubbed.transcript.startsWith("Speaker 1: Council is voting")).toBe(true);
    for (const speaker of Object.keys(scrubbed.aliasBySpeaker)) {
      expect(scrubbed.transcript).not.toContain(speaker);
    }
  });

  it("masks a speaker's own name where it appears inside another turn", () => {
    const scrubbed = scrubThread(
      parseThread(
        [
          "marisol_k: Every economist on the planet says rent control destroys the housing supply.",
          "dtown_renter: marisol_k is quoting half a paper and ignoring the displacement result entirely.",
        ].join("\n"),
      ),
    );
    expect(scrubbed.turns[1].text.startsWith("Speaker 1 is quoting")).toBe(true);
    expect(scrubbed.transcript).not.toContain("marisol_k");
  });

  it("aggregates redaction counts across turns", () => {
    const scrubbed = scrubThread(
      parseThread(
        [
          "alice: Reach me on jo@example.com if the council changes the exemption rule again.",
          "bob: Or call +44 20 7946 0958 and ask them yourself, since @alice never answers.",
        ].join("\n"),
      ),
    );
    expect(scrubbed.redactions.emails).toBe(1);
    expect(scrubbed.redactions.phones).toBe(1);
    expect(scrubbed.redactions.handles).toBe(1);
    expect(scrubbed.transcript).not.toContain("example.com");
    expect(scrubbed.transcript).not.toContain("7946");
  });

  it("indexes turns so a chunk can look up its scrubbed text", () => {
    const parsed = parseThread(RENT_CONTROL_THREAD);
    const scrubbed = scrubThread(parsed);
    expect(scrubbed.byIndex.size).toBe(parsed.turns.length);
    expect(scrubbed.byIndex.get(7)?.alias).toBe("Speaker 5");
  });
});

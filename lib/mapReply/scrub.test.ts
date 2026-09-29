import { describe, expect, it } from "vitest";
import { parseThread } from "./parse";
import { maskableSpeakerNames, scrubText, scrubThread } from "./scrub";
import { RENT_CONTROL_THREAD } from "./__fixtures__/rentControlThread";

describe("scrubText: emails", () => {
  it("replaces email addresses", () => {
    const { text, redactions } = scrubText("Mail me at jo.smith+city@example.co.uk about the cap.");
    expect(text).toBe("Mail me at [email] about the cap.");
    expect(redactions.emails).toBe(1);
  });

  it("replaces an address with a non-Latin local part", () => {
    expect(scrubText("write to josé@example.com today").text).toBe("write to [email] today");
    expect(scrubText("пишите на дмитрий@почта.рф").text).toBe("пишите на [email]");
  });
});

describe("scrubText: handles", () => {
  it("replaces @handles but leaves email local parts alone", () => {
    const { text, redactions } = scrubText("@marisol_k is wrong, ask jo@example.com instead.");
    expect(text).toBe("[handle] is wrong, ask [email] instead.");
    expect(redactions.handles).toBe(1);
    expect(redactions.emails).toBe(1);
  });

  it("replaces accented and Cyrillic handles whole", () => {
    // The ASCII-only rule left the tail behind: "[handle]é_muñoz".
    expect(scrubText("ask @josé_muñoz about it").text).toBe("ask [handle] about it");
    expect(scrubText("ask @Дмитрий about it").text).toBe("ask [handle] about it");
    expect(scrubText("ask @josé_muñoz about it").text).not.toContain("muñoz");
  });

  it("replaces a fullwidth ＠ handle", () => {
    expect(scrubText("ask ＠marisol_k about it").text).toBe("ask [handle] about it");
  });
});

describe("scrubText: phone numbers", () => {
  it.each([
    ["+1 (415) 555-0132", "Call the office on +1 (415) 555-0132 before Tuesday."],
    ["+44 20 7946 0958", "Ring +44 20 7946 0958 and ask them yourself."],
    ["+1-415-555-0132", "Try +1-415-555-0132 in the morning."],
    ["(415) 555-0132", "Try (415) 555-0132 in the morning."],
    ["415-555-0132", "Try 415-555-0132 in the morning."],
    ["0800.123.4567", "The hotline is 0800.123.4567 all week."],
    ["4155550132", "The hotline is 4155550132 all week."],
  ])("redacts %s", (number, sentence) => {
    const { text, redactions } = scrubText(sentence);
    expect(text).toContain("[phone]");
    expect(text).not.toContain(number);
    expect(redactions.phones).toBe(1);
  });

  it.each([
    ["a run of years", "Compare 2019 2020 2021 and the trend is obvious."],
    ["a row of unit counts", "Permits went 12000 34000 56000 across the three years."],
    ["percentages", "San Francisco lost 15% of its units and rents rose 5.1% citywide."],
    ["a single year", "The 1994 expansion is the one everyone cites."],
    ["dollar figures", "It cost $200,000 up front and $1.5 million over ten years."],
    ["a cost range", "Econometric analysis runs $200K-500K depending on scope."],
    ["an ISO date", "The vote is on 2026-09-17 at the council chamber."],
    ["a citation", "American Economic Review, 109(9): 3365-94 (2019) says otherwise."],
    ["a version string", "We are still on 10.15.7 for the build machines."],
    ["a large round number", "The city has 1200000 residents and 40000 controlled units."],
  ])("leaves %s untouched", (_label, sentence) => {
    const { text, redactions } = scrubText(sentence);
    expect(text).toBe(sentence);
    expect(redactions.phones).toBe(0);
  });

  it("does not let a phone run on into the number after it", () => {
    const { text } = scrubText("Ring +44 20 7946 0958 then compare 2019 2020 2021.");
    expect(text).toBe("Ring [phone] then compare 2019 2020 2021.");
  });

  it("counts nothing when there is nothing to redact", () => {
    const { text, redactions } = scrubText(RENT_CONTROL_THREAD);
    expect(text).toBe(RENT_CONTROL_THREAD);
    expect(redactions).toEqual({ emails: 0, phones: 0, handles: 0 });
  });
});

describe("maskableSpeakerNames", () => {
  it("refuses role labels and names that are ordinary words", () => {
    const body = "The Host country sets the rules. Will we ever agree? Mark my words.";
    expect(maskableSpeakerNames(["Host", "Guest", "Chair", "Will", "Mark", "Grant", "Rose"], body)).toEqual(
      [],
    );
  });

  it("accepts handle-shaped names", () => {
    expect(
      maskableSpeakerNames(["marisol_k", "gary_1962", "Piers Morgan"], "a thread about rent"),
    ).toEqual(["marisol_k", "gary_1962", "Piers Morgan"]);
  });

  it("refuses a short plain name the thread itself uses as a word", () => {
    expect(maskableSpeakerNames(["Bridge"], "the bridge collapsed last winter")).toEqual([]);
    expect(maskableSpeakerNames(["Bridge"], "nobody mentioned that structure")).toEqual(["Bridge"]);
  });

  it("accepts a long plain screen name even when it appears lowercase", () => {
    expect(maskableSpeakerNames(["buildmorehomes"], "buildmorehomes is right here")).toEqual([
      "buildmorehomes",
    ]);
  });

  it("refuses anything under four characters", () => {
    expect(maskableSpeakerNames(["jo", "ann"], "jo and ann said so")).toEqual([]);
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

  it("masks a handle inside another turn", () => {
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

  it("does not rewrite ordinary words when speakers are called Host and Guest", () => {
    const scrubbed = scrubThread(
      parseThread(
        [
          "Host: The host country sets the rules, and every guest has to live with them somehow.",
          "Guest: That is exactly the assumption I want to question, because rules are not neutral here.",
        ].join("\n"),
      ),
    );
    expect(scrubbed.turns[0].text).toBe(
      "The host country sets the rules, and every guest has to live with them somehow.",
    );
    expect(scrubbed.turns[1].text).toContain("rules are not neutral");
    // The labels themselves are still renamed, which is what privacy requires.
    expect(scrubbed.transcript.startsWith("Speaker 1: The host country")).toBe(true);
    expect(scrubbed.aliasBySpeaker).toEqual({ Host: "Speaker 1", Guest: "Speaker 2" });
  });

  it("does not lose a future tense to a speaker called Will", () => {
    const scrubbed = scrubThread(
      parseThread(
        [
          "Will: I think the council will vote it down and then nothing changes for another year.",
          "Dana: That will not happen, because three members already said they support the cap.",
        ].join("\n"),
      ),
    );
    expect(scrubbed.turns[0].text).toContain("the council will vote it down");
    expect(scrubbed.turns[1].text).toContain("That will not happen");
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

  it("keeps the numbers the thread is arguing about", () => {
    const scrubbed = scrubThread(parseThread(RENT_CONTROL_THREAD));
    expect(scrubbed.transcript).toContain("15%");
    expect(scrubbed.transcript).toContain("1994");
    expect(scrubbed.transcript).toContain("22%");
    expect(scrubbed.transcript).toContain("2035");
    expect(scrubbed.transcript).not.toContain("[phone]");
  });
});

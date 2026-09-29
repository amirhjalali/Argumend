import { describe, expect, it } from "vitest";
import { isAnnotationLabel, isSpeakerLabel, parseThread, renderTranscript } from "./parse";
import { RENT_CONTROL_THREAD } from "./__fixtures__/rentControlThread";

describe("parseThread", () => {
  it("reads the rent-control thread as eight substantive turns", () => {
    const parsed = parseThread(RENT_CONTROL_THREAD);
    expect(parsed.hasSpeakerLabels).toBe(true);
    expect(parsed.turns).toHaveLength(8);
    expect(parsed.substantive).toHaveLength(8);
    expect(parsed.speakers).toEqual([
      "marisol_k",
      "dtown_renter",
      "hn_throwaway",
      "buildmorehomes",
      "gary_1962",
    ]);
    expect(parsed.turns[0].text.startsWith("Council is voting")).toBe(true);
  });

  it("merges consecutive turns by the same speaker", () => {
    const parsed = parseThread(
      [
        "alice: The first point is that the supply argument depends entirely on policy design here.",
        "alice: And the second point is that exemptions for new construction change the picture.",
        "bob: I do not think either of those points survives contact with the actual data set.",
      ].join("\n"),
    );
    expect(parsed.turns).toHaveLength(2);
    expect(parsed.turns[0].speaker).toBe("alice");
    expect(parsed.turns[0].text).toContain("first point");
    expect(parsed.turns[0].text).toContain("second point");
  });

  it("folds continuation lines into the turn above them", () => {
    const parsed = parseThread(
      [
        "alice: The supply argument depends entirely on how the policy is designed in practice.",
        "It also depends on whether vacancy decontrol exists.",
        "bob: That is not what the San Francisco natural experiment actually measured at all.",
      ].join("\n"),
    );
    expect(parsed.turns).toHaveLength(2);
    expect(parsed.turns[0].text).toContain("vacancy decontrol");
  });

  it("reads markdown bullets with a bold name", () => {
    const parsed = parseThread(
      [
        "- **marisol_k:** Every economist on the planet says rent control destroys housing supply here.",
        "- **dtown_renter:** A cap means I do not get pushed out to the suburbs, which is the whole point.",
      ].join("\n"),
    );
    expect(parsed.hasSpeakerLabels).toBe(true);
    expect(parsed.speakers).toEqual(["marisol_k", "dtown_renter"]);
    expect(parsed.turns[0].text.startsWith("Every economist")).toBe(true);
  });

  it("strips quote markers", () => {
    const parsed = parseThread(
      [
        "> alice: The supply argument depends entirely on how the policy is designed in practice.",
        "> bob: That is not what the San Francisco natural experiment actually measured at all.",
      ].join("\n"),
    );
    expect(parsed.speakers).toEqual(["alice", "bob"]);
  });

  it("falls back to paragraphs when nothing is attributed", () => {
    const parsed = parseThread(
      [
        "Rent control reduces the supply of rental housing over the long run, and every serious study shows it.",
        "",
        "That claim ignores the tenants who are not displaced, which is the entire point of the policy in practice.",
      ].join("\n"),
    );
    expect(parsed.hasSpeakerLabels).toBe(false);
    expect(parsed.turns).toHaveLength(2);
    expect(parsed.speakers).toEqual(["Paragraph 1", "Paragraph 2"]);
  });

  it("does not treat a single stray label as a speaker thread", () => {
    const parsed = parseThread(
      "Note: this is one paragraph of prose about rent control that happens to contain a colon somewhere in it.",
    );
    expect(parsed.hasSpeakerLabels).toBe(false);
    expect(parsed.turns).toHaveLength(1);
  });

  it("does not mistake a clock or a sentence for a speaker", () => {
    expect(isSpeakerLabel("marisol_k")).toBe(true);
    expect(isSpeakerLabel("Piers Morgan")).toBe(true);
    expect(isSpeakerLabel("Econ 101 also says my rent going up")).toBe(false);
    expect(isSpeakerLabel("And so it goes.")).toBe(false);
    expect(isSpeakerLabel("")).toBe(false);

    const parsed = parseThread(
      [
        "At 10:30 we voted on the cap and the council chamber was completely full of angry renters.",
        "",
        "At 11:45 the vote failed by one, which nobody in the room had expected to happen at all.",
      ].join("\n"),
    );
    expect(parsed.hasSpeakerLabels).toBe(false);
  });

  it("drops turns under the word floor from the substantive list but keeps them in the thread", () => {
    const parsed = parseThread(
      [
        "alice: The supply argument depends entirely on how the policy is designed in practice, every time.",
        "bob: lol",
        "carol: That is not what the San Francisco natural experiment actually measured at all, though.",
      ].join("\n"),
    );
    expect(parsed.turns).toHaveLength(3);
    expect(parsed.substantive.map((turn) => turn.speaker)).toEqual(["alice", "carol"]);
  });

  it("caps the number of probed turns and says so", () => {
    const line = (index: number) =>
      `user${index}: This is a long enough sentence about rent control policy to count as a real argument turn.`;
    const parsed = parseThread(
      Array.from({ length: 60 }, (_unused, index) => line(index)).join("\n"),
      { maxSubstantiveTurns: 16 },
    );
    expect(parsed.turns).toHaveLength(60);
    expect(parsed.substantive).toHaveLength(16);
    expect(parsed.truncated).toBe(true);
  });

  it("truncates an over-long turn rather than dropping it", () => {
    const parsed = parseThread(
      [
        `alice: ${"rent ".repeat(600)}`,
        "bob: That is not what the San Francisco natural experiment actually measured at all, though.",
      ].join("\n"),
      { maxTurnCharacters: 100 },
    );
    expect(parsed.turns[0].text.length).toBeLessThanOrEqual(101);
    expect(parsed.turns[0].text.length).toBeGreaterThan(90);
    expect(parsed.turns[0].text.endsWith("…")).toBe(true);
  });

  it("folds a single author's Edit and Update into their own post", () => {
    // These look exactly like speaker lines. Treating them as speakers turned
    // one Reddit post into a conversation between Unattributed, Edit and Update.
    const post = [
      "I have lived in this building for nine years and the cap is the only reason I am still here.",
      "",
      "Edit: to be clear, I am not saying construction does not matter, only that it is slower than people claim.",
      "",
      "Update: the council postponed the vote to next Tuesday, so there is still time to write in.",
    ].join("\n");

    const parsed = parseThread(post);
    expect(parsed.hasSpeakerLabels).toBe(false);
    expect(parsed.speakers).toEqual(["Paragraph 1"]);
    expect(parsed.turns).toHaveLength(1);
    expect(parsed.turns[0].text).toContain("nine years");
    expect(parsed.turns[0].text).toContain("Edit: to be clear");
    expect(parsed.turns[0].text).toContain("Update: the council postponed");
  });

  it("folds an annotation into the speaker above it in a real thread", () => {
    const parsed = parseThread(
      [
        "alice: The supply argument depends entirely on how the policy is designed in practice.",
        "Edit: I should have said vacancy decontrol, which is the part that actually matters here.",
        "bob: That is not what the San Francisco natural experiment actually measured at all.",
      ].join("\n"),
    );
    expect(parsed.speakers).toEqual(["alice", "bob"]);
    expect(parsed.turns[0].text).toContain("vacancy decontrol");
  });

  it("knows which labels are annotations", () => {
    for (const label of ["Edit", "edit 2", "Update", "ETA", "TL;DR", "tldr", "Note", "Source", "PS", "P.S."]) {
      expect(isAnnotationLabel(label)).toBe(true);
      expect(isSpeakerLabel(label)).toBe(false);
    }
    for (const label of ["marisol_k", "Piers Morgan", "Editor Jane"]) {
      expect(isAnnotationLabel(label)).toBe(false);
    }
  });

  it("returns nothing for empty input", () => {
    const parsed = parseThread("   \n  \n ");
    expect(parsed.turns).toHaveLength(0);
    expect(parsed.substantive).toHaveLength(0);
  });
});

describe("renderTranscript", () => {
  it("renders speaker lines and truncates at the cap", () => {
    const parsed = parseThread(RENT_CONTROL_THREAD);
    expect(renderTranscript(parsed.turns).startsWith("marisol_k: Council is voting")).toBe(true);
    expect(renderTranscript(parsed.turns, 40)).toHaveLength(41);
  });
});

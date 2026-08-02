import { describe, expect, it } from "vitest";
import { topics } from "@/data/topics";
import type { Topic } from "@/types/logic";
import { generateOfflineDebate } from "./offline";

const topic = topics.find((candidate) => candidate.id === "nuclear-energy-safety");

if (!topic) {
  throw new Error("Expected nuclear-energy-safety fixture to exist");
}

describe("generateOfflineDebate", () => {
  it("builds deterministic, alternating turns with the requested models", () => {
    const first = generateOfflineDebate(topic, "claude", "gpt-5", 2);
    const second = generateOfflineDebate(topic, "claude", "gpt-5", 2);

    expect(first).toEqual(second);
    expect(first).toHaveLength(4);
    expect(first.map(({ id, side, model, round }) => ({ id, side, model, round }))).toEqual([
      { id: "offline-for-1", side: "for", model: "claude", round: 1 },
      { id: "offline-against-1", side: "against", model: "gpt-5", round: 1 },
      { id: "offline-for-2", side: "for", model: "claude", round: 2 },
      { id: "offline-against-2", side: "against", model: "gpt-5", round: 2 },
    ]);
    expect(first[0].content).toContain("Opening FOR position");
    expect(first[1].content).toContain("Opening AGAINST position");
    expect(first[2].content).toContain("FOR rebuttal (Round 2)");
    expect(first[3].content).toContain("AGAINST rebuttal (Round 2)");
  });

  it("grounds each side in relevant mapped evidence", () => {
    const messages = generateOfflineDebate(topic, "claude", "gemini", 2);
    const supportingTitle = topic.pillars
      .flatMap((pillar) => pillar.evidence ?? [])
      .find((evidence) => evidence.side === "for")?.title;
    const opposingTitle = topic.pillars
      .flatMap((pillar) => pillar.evidence ?? [])
      .find((evidence) => evidence.side === "against")?.title;

    expect(supportingTitle).toBeTruthy();
    expect(opposingTitle).toBeTruthy();
    expect(messages[0].content).toContain(supportingTitle);
    expect(messages[1].content).toContain(opposingTitle);
  });

  it("uses explicit fallback reasoning when a side has no evidence", () => {
    const topicWithoutEvidence: Topic = {
      ...topic,
      pillars: topic.pillars.map((pillar) => ({ ...pillar, evidence: [] })),
    };

    const [forTurn, againstTurn] = generateOfflineDebate(
      topicWithoutEvidence,
      "claude",
      "gpt-4",
      2,
    );

    expect(forTurn.content).toContain("strongest proponent arguments in the map");
    expect(againstTurn.content).toContain("unresolved objections highlighted");
  });

  it.each([
    { rounds: 1, expectedTurns: 4, label: "raises values below two" },
    { rounds: 2.9, expectedTurns: 4, label: "floors fractional values" },
    { rounds: 99, expectedTurns: 10, label: "caps values above five" },
    { rounds: Number.NaN, expectedTurns: 6, label: "defaults non-finite values" },
    { rounds: Number.POSITIVE_INFINITY, expectedTurns: 6, label: "defaults infinity" },
  ])("$label", ({ rounds, expectedTurns }) => {
    expect(generateOfflineDebate(topic, "claude", "grok", rounds)).toHaveLength(expectedTurns);
  });
});

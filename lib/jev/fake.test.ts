import { describe, expect, it } from "vitest";
import { FakeJevProvider, synthesizeJevAnswer } from "./fake";
import type { JevQuestionSet } from "./types";

const QUESTIONS: JevQuestionSet = {
  section: {
    type: "choice",
    instructions: "Which section?",
    criteria: { "supply-effects": "Supply", "incumbent-vs-newcomer": "Incumbents", none: "Not an argument" },
  },
  fallacy: { type: "noul", instructions: "Fallacy?" },
};

describe("FakeJevProvider", () => {
  it("replays recorded answers for a label", async () => {
    const provider = new FakeJevProvider({
      "turns-0": {
        model: "jev-1.13.0",
        answers: { section: { type: "choice", choice: "supply-effects", confidence: 0.81 } },
        usage: { input_tokens: 1234, output_tokens: 0 },
      },
    });

    const result = await provider.systemOne({}, QUESTIONS, { label: "turns-0" });
    expect(result.answers.section.choice).toBe("supply-effects");
    expect(result.answers.section.confidence).toBe(0.81);
    expect(result.model).toBe("jev-1.13.0");
    expect(result.usage.input_tokens).toBe(1234);
    expect(provider.recordedLabels).toEqual(["turns-0"]);
  });

  it("synthesizes anything the fixture does not cover, without touching the network", async () => {
    const provider = new FakeJevProvider({
      "turns-0": {
        model: "jev-1.13.0",
        answers: { section: { type: "choice", choice: "supply-effects", confidence: 0.81 } },
        usage: { input_tokens: 1, output_tokens: 0 },
      },
    });

    const result = await provider.systemOne({}, QUESTIONS, { label: "turns-0" });
    expect(typeof result.answers.fallacy.noul).toBe("number");
  });

  it("is deterministic: the same question id always gets the same answer", async () => {
    const provider = new FakeJevProvider();
    const first = await provider.systemOne({ a: 1 }, QUESTIONS, { label: "thread" });
    const second = await provider.systemOne({ a: 2 }, QUESTIONS, { label: "thread" });
    expect(second).toEqual({ ...first, latencyMs: second.latencyMs });
  });

  it("never synthesizes \"none\" when a real option exists", () => {
    for (let index = 0; index < 50; index += 1) {
      const answer = synthesizeJevAnswer(`section_${index}`, QUESTIONS.section, "turns-0");
      expect(answer.choice).not.toBe("none");
    }
  });

  it("produces probabilities that sum to one", () => {
    const answer = synthesizeJevAnswer("section_0", QUESTIONS.section, "turns-0");
    const total = Object.values(answer.probabilities ?? {}).reduce((sum, value) => sum + value, 0);
    expect(total).toBeCloseTo(1, 2);
  });

  it("respects an aborted signal", async () => {
    const controller = new AbortController();
    controller.abort();
    await expect(
      new FakeJevProvider().systemOne({}, QUESTIONS, { signal: controller.signal }),
    ).rejects.toThrow(/Aborted/);
  });
});

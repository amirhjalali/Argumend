import { describe, expect, it } from "vitest";
import { topicSummaries } from "@/data/topicIndex";
import { loadTopicById } from "@/data/topicLoader";
import { buildTopicFaqPage, faqAnswerText } from "./faqStructuredData";

type FaqEntry = { name: string; acceptedAnswer: { text: string } };

describe("faqAnswerText", () => {
  it("drops a context that is only the question restated", () => {
    expect(
      faqAnswerText(
        "Can we ensure that a superintelligent system's goals remain aligned with human flourishing, or is misalignment inevitable?",
      ),
    ).toBeNull();
    expect(faqAnswerText("Is it A? Or is it B?")).toBeNull();
  });

  it("keeps the declarative context and cuts the closing question", () => {
    expect(
      faqAnswerText(
        "Studies find a 25% spike the Monday after. The autumn shows a drop. Is it a burden — or a blip?",
      ),
    ).toBe("Studies find a 25% spike the Monday after. The autumn shows a drop.");
  });

  it("keeps a context with no question as written", () => {
    const text = "Haircuts are just as labor-intensive as teaching, yet their real prices barely moved.";
    expect(faqAnswerText(text)).toBe(text);
  });

  it("does not split at abbreviations followed by lowercase", () => {
    expect(faqAnswerText("When Washington, D.C. began, pay fell. Would it help?")).toBe(
      "When Washington, D.C. began, pay fell.",
    );
  });
});

describe("buildTopicFaqPage", () => {
  it("returns null when no question has an answer", () => {
    expect(buildTopicFaqPage(undefined)).toBeNull();
    expect(buildTopicFaqPage([{ title: "Will it?", content: "Will it, or won't it?" }])).toBeNull();
  });

  it("never answers a question with a question, across every map", async () => {
    let answered = 0;
    for (const summary of topicSummaries) {
      const topic = await loadTopicById(summary.id);
      const faq = buildTopicFaqPage(topic?.questions);
      if (!faq) continue;
      const entries = faq.mainEntity as FaqEntry[];
      for (const entry of entries) {
        answered += 1;
        const text = entry.acceptedAnswer.text;
        expect(text, `${summary.id}: ${entry.name}`).not.toMatch(/\?["”’')\]]*$/);
        // A verbatim span of the visible context, so the markup matches the page.
        const source = topic!.questions!.find((q) => q.title === entry.name)!;
        expect(source.content).toContain(text);
      }
    }
    expect(answered).toBeGreaterThan(0);
  });

  it("drops ai-risk's restated questions instead of answering them with themselves", async () => {
    const topic = await loadTopicById("ai-risk");
    const faq = buildTopicFaqPage(topic?.questions);
    const names = ((faq?.mainEntity as FaqEntry[] | undefined) ?? []).map((entry) => entry.name);
    expect(names).not.toContain("Will AGI pursue human values?");
  });
});

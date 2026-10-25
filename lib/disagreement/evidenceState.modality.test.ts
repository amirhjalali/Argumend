import { describe, expect, it } from "vitest";
import { deriveEvidenceState } from "./evidenceState";

function classify(source: string, quote = source) {
  return deriveEvidenceState({
    claim: {
      id: "c-invoices",
      statement: "Forty percent of invoices were late.",
      epistemicType: "empirical",
      groundingQuotes: [{ quote }],
    },
    relations: [],
    source,
  });
}

describe("evidence assertion modality", () => {
  it.each([
    "Did the audit find that 40 percent of invoices were late?",
    "Does the study show that 40 percent of invoices were late?",
    "Could the study show that 40 percent of invoices were late?",
    "Did an audit find that 40 percent of invoices were late?",
    "According to which study were 40 percent of invoices late?",
    "If the audit finds that 40 percent of invoices were late, we will reconsider.",
    "If an audit finds that 40 percent of invoices were late, we will reconsider.",
    "Suppose the study shows that 40 percent of invoices were late.",
  ])("does not count a question or hypothetical as supplied evidence: %s", (source) => {
    expect(classify(source)).toBe("no-evidence-provided");
  });

  it("keeps a question's modal lead-in when the grounded quote starts inside it", () => {
    const source = "Ana: Did the study show that 40 percent of invoices were late?";
    expect(classify(source, "the study show that 40 percent of invoices were late")).toBe("no-evidence-provided");
  });

  it.each([
    "The audit found that 40 percent of invoices were late. Should we reconsider?",
    "Why ignore the audit, which found that 40 percent of invoices were late?",
    "Did you read the audit, which found that 40 percent of invoices were late?",
    "Could you read the audit, which found that 40 percent of invoices were late?",
    "Did the study show late invoices? The audit found that 40 percent were late.",
    "We need evidence before deciding. The audit found that 40 percent of invoices were late.",
    "If the study shows late invoices, reconsider. The audit found that 40 percent were late.",
  ])("retains an asserted finding even when a separate or enclosing question is present: %s", (source) => {
    expect(classify(source)).toBe("asserted-in-source");
  });
});

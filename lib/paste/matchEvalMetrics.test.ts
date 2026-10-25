import { describe, expect, it } from "vitest";
import { scoreCase, summarize, type PasteEvalCase } from "./matchEval";

describe("matching measurement", () => {
  it("counts uncovered false positives in named precision and unnamed lists in offered negatives", () => {
    const caseFor = (id: string, expected: string[]): PasteEvalCase => ({
      id, expected, related: [], text: "example", form: "short",
    });
    const summary = summarize([
      scoreCase(caseFor("right", ["map-a"]), { named: "map-a", shown: ["map-a"] }),
      scoreCase(caseFor("uncovered-named", []), { named: "map-b", shown: ["map-b"] }),
      scoreCase(caseFor("uncovered-closest", []), { named: null, shown: ["map-c"] }),
      scoreCase(caseFor("uncovered-none", []), { named: null, shown: [] }),
    ]);
    expect(summary.precisionWhenNamed).toBe(0.5);
    expect(summary.top1).toBe(1);
    expect(summary.falsePositives).toBe(1);
    expect(summary.negativesOffered).toBe(2);
  });
});

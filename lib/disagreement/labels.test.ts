import { describe, expect, it } from "vitest";
import { deriveResolvability } from "./diagnosis";
import { resolvabilitySentence } from "./labels";

describe("resolvability language", () => {
  it.each(["source-audit", "authority-allocation", "future-observable"] as const)(
    "does not recast an uncertain %s question as a value dispute",
    (resolutionKind) => {
      const band = deriveResolvability({ resolutionKind, confidence: "low", groundingCoverage: 1 });
      expect(band).toBe("low");
      expect(resolvabilitySentence(band)).not.toMatch(/rests on values|value (?:conflict|dispute)/i);
    },
  );
});

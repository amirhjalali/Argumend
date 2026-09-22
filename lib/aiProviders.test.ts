import { describe, expect, it } from "vitest";
import {
  AI_PROVIDERS,
  ALL_AI_PROVIDER_IDS,
  ANALYZE_JUDGING_PROVIDER_IDS,
  ANALYZE_SOURCE_PROVIDER_IDS,
  DIAGNOSIS_PROVIDER_IDS,
  MAP_REPLY_PROVIDER_IDS,
  analyzeSourceBadge,
  buildConsentLine,
  buildMapReplyConsentLine,
  formatProviderList,
  providerDisclosure,
  providers,
} from "./aiProviders";

describe("AI provider registry", () => {
  it("keys every provider by its own id", () => {
    for (const [key, provider] of Object.entries(AI_PROVIDERS)) {
      expect(provider.id).toBe(key);
    }
  });

  it("lists every registered provider exactly once in the stable order", () => {
    expect([...ALL_AI_PROVIDER_IDS].sort()).toEqual(
      Object.keys(AI_PROVIDERS).sort(),
    );
    expect(new Set(ALL_AI_PROVIDER_IDS).size).toBe(ALL_AI_PROVIDER_IDS.length);
  });

  it("gives every provider a visitor-facing name, a region, and a policy link", () => {
    for (const provider of Object.values(AI_PROVIDERS)) {
      expect(provider.name.trim().length).toBeGreaterThan(0);
      expect(provider.processingRegion.trim().length).toBeGreaterThan(0);
      expect(provider.privacyUrl).toMatch(/^https:\/\//);
    }
  });

  it("resolves lane rosters to real providers", () => {
    for (const ids of [
      DIAGNOSIS_PROVIDER_IDS,
      MAP_REPLY_PROVIDER_IDS,
      ANALYZE_SOURCE_PROVIDER_IDS,
      ANALYZE_JUDGING_PROVIDER_IDS,
    ]) {
      expect(ids.length).toBeGreaterThan(0);
      expect(providers(ids).every(Boolean)).toBe(true);
    }
  });
});

describe("formatProviderList", () => {
  it("formats one, two, and three or more names", () => {
    expect(formatProviderList(["anthropic"])).toBe("Anthropic");
    expect(formatProviderList(["typesafe", "anthropic"])).toBe(
      "TypeSafe AI or Anthropic",
    );
    expect(formatProviderList(["anthropic", "openai", "google"])).toBe(
      "Anthropic, OpenAI, or Google",
    );
  });

  it("supports an 'and' conjunction for prose that needs it", () => {
    expect(formatProviderList(["typesafe", "anthropic"], "and")).toBe(
      "TypeSafe AI and Anthropic",
    );
  });

  it("returns an empty string for an empty roster", () => {
    expect(formatProviderList([])).toBe("");
  });
});

describe("providerDisclosure", () => {
  it("names the providers and the shared processing region", () => {
    expect(providerDisclosure(DIAGNOSIS_PROVIDER_IDS)).toBe(
      "TypeSafe AI or Anthropic, processed in the United States",
    );
  });

  it("refuses to flatten providers that process in different regions", () => {
    const original = AI_PROVIDERS.openai.processingRegion;
    AI_PROVIDERS.openai.processingRegion = "the European Union";
    try {
      expect(() => providerDisclosure(["anthropic", "openai"])).toThrow(
        /one shared processing region/,
      );
    } finally {
      AI_PROVIDERS.openai.processingRegion = original;
    }
  });
});

describe("buildConsentLine", () => {
  const line = buildConsentLine();

  it("is the approved disclosure sentence for the diagnosis lane", () => {
    expect(line.text).toBe(
      "By analyzing, you agree that this text is sent to our AI provider " +
        "(TypeSafe AI or Anthropic, processed in the United States) and is not stored. " +
        "Don't paste private information about other people.",
    );
  });

  it("splits around the linked phrase without changing a character", () => {
    expect(`${line.before}${line.linkText}${line.after}`).toBe(line.text);
    expect(line.linkText).toBe("our AI provider");
  });

  it("tracks the roster it is given, so a new lane cannot silently under-disclose", () => {
    expect(buildConsentLine(["anthropic"]).text).toContain(
      "(Anthropic, processed in the United States)",
    );
  });
});

describe("buildMapReplyConsentLine", () => {
  const line = buildMapReplyConsentLine();

  it("is the approved disclosure sentence for the map-reply lane", () => {
    expect(line.text).toBe(
      "By submitting, you agree that this text is sent to TypeSafe AI " +
        "(processed in the United States) and is not stored. " +
        "Identifiers are removed first. " +
        "Don't paste private information about other people. Privacy.",
    );
  });

  it("splits around the linked phrase without changing a character", () => {
    expect(`${line.before}${line.linkText}${line.after}`).toBe(line.text);
    expect(line.linkText).toBe("Privacy");
  });

  it("claims the redaction the analyze lanes cannot claim, and only there", () => {
    expect(line.text).toContain("Identifiers are removed first.");
    expect(buildConsentLine().text).not.toContain("Identifiers are removed");
    expect(analyzeSourceBadge()).not.toContain("Identifiers are removed");
  });

  it("names one provider outright rather than hedging behind a disjunction", () => {
    expect(MAP_REPLY_PROVIDER_IDS).toEqual(["typesafe"]);
    expect(line.text).toContain("TypeSafe AI (processed in the United States)");
    expect(line.text).not.toContain("our AI provider");
  });

  it("tracks the roster it is given, so a second lane cannot silently under-disclose", () => {
    expect(buildMapReplyConsentLine(["typesafe", "anthropic"]).text).toContain(
      "TypeSafe AI or Anthropic (processed in the United States)",
    );
  });
});

describe("analyzeSourceBadge", () => {
  it("names the provider instead of saying 'the configured AI provider'", () => {
    expect(analyzeSourceBadge()).toBe(
      "Source text isn’t stored; live mode sends it to Anthropic, processed in the United States",
    );
    expect(analyzeSourceBadge()).not.toContain("configured AI provider");
  });
});

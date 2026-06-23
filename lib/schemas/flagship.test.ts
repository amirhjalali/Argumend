import { describe, it, expect } from "vitest";
import { CruxSchema, TopicSchema, confidenceTier } from "./topic";
import { topics } from "@/data/topics";

describe("confidenceTier", () => {
  it("maps percentages to the right tier (boundaries inclusive at the low edge)", () => {
    expect(confidenceTier(100)).toBe("Established");
    expect(confidenceTier(90)).toBe("Established");
    expect(confidenceTier(89)).toBe("Strong");
    expect(confidenceTier(75)).toBe("Strong");
    expect(confidenceTier(74)).toBe("Contested");
    expect(confidenceTier(50)).toBe("Contested");
    expect(confidenceTier(49)).toBe("Thin");
    expect(confidenceTier(0)).toBe("Thin");
  });
});

const baseCrux = {
  id: "c1",
  title: "A test",
  description: "desc",
  methodology: "method",
  verification_status: "verified" as const,
  cost_to_verify: "$0",
};

describe("CruxSchema.falsification (additive, optional)", () => {
  it("accepts a crux with no falsification (backward compatible)", () => {
    expect(CruxSchema.safeParse(baseCrux).success).toBe(true);
  });

  it("accepts a crux with a full falsification block", () => {
    const result = CruxSchema.safeParse({
      ...baseCrux,
      falsification: {
        supporter_flip: "a",
        skeptic_flip: "b",
        common_ground: "c",
        live_disagreement: "d",
      },
    });
    expect(result.success).toBe(true);
  });

  it("rejects a falsification block missing the required flips", () => {
    const result = CruxSchema.safeParse({
      ...baseCrux,
      falsification: { common_ground: "c" },
    });
    expect(result.success).toBe(false);
  });
});

const minimalTopic = {
  id: "t",
  title: "T",
  meta_claim: "m",
  confidence_score: 80,
  status: "contested" as const,
  category: "policy" as const,
  pillars: [],
};

describe("TopicSchema flagship fields (additive, optional)", () => {
  it("accepts keystone_fact + simple_case", () => {
    const result = TopicSchema.safeParse({
      ...minimalTopic,
      keystone_fact: {
        statement: "s",
        confidence: 90,
        source: "src",
        sourceUrl: "https://example.com",
      },
      simple_case: ["one", "two", "three"],
    });
    expect(result.success).toBe(true);
  });

  it("rejects a keystone_fact with confidence out of range", () => {
    const result = TopicSchema.safeParse({
      ...minimalTopic,
      keystone_fact: { statement: "s", confidence: 140, source: "src" },
    });
    expect(result.success).toBe(false);
  });
});

// Topics that have adopted the full flagship pattern. Each must carry a keystone
// fact, a simple case, and falsification on every pillar crux.
const FLAGSHIP_TOPIC_IDS = [
  "nuclear-energy-safety",
  "rent-control-effectiveness",
  "death-penalty-deterrence",
  "gmo-crops-safety",
  "climate-change",
  "vaccine-mandates",
  "consciousness-ai-systems",
  "ai-risk",
  "lab-leak-theory",
  "fluoride-water-supplies",
  "universal-healthcare",
  "drug-decriminalization",
  "ev-environmental-impact",
  "minimum-wage-effects",
  "organic-food-health",
  "gun-control-effectiveness",
  "psychedelics-mental-health",
  "veganism-environmental-impact",
  "ultra-processed-food",
  "factory-farming-ban",
  "sugar-tax-effectiveness",
  "school-phone-bans",
  "social-media-mental-health",
];

describe.each(FLAGSHIP_TOPIC_IDS)("flagship content integrity: %s", (id) => {
  const topic = topics.find((t) => t.id === id);

  it("exists", () => {
    expect(topic).toBeDefined();
  });

  it("has a keystone fact with a valid confidence and a source", () => {
    const k = topic?.keystone_fact;
    expect(k).toBeDefined();
    expect(k!.statement.length).toBeGreaterThan(20);
    expect(k!.confidence).toBeGreaterThanOrEqual(0);
    expect(k!.confidence).toBeLessThanOrEqual(100);
    expect(k!.source.length).toBeGreaterThan(0);
  });

  it("has a multi-sentence simple case", () => {
    expect(topic?.simple_case?.length).toBeGreaterThanOrEqual(2);
  });

  it("has falsification (supporter + skeptic flips) on every pillar crux", () => {
    expect(topic!.pillars.length).toBeGreaterThan(0);
    for (const pillar of topic!.pillars) {
      const f = pillar.crux.falsification;
      expect(f, `pillar ${pillar.id} missing falsification`).toBeDefined();
      expect(f!.supporter_flip.length).toBeGreaterThan(0);
      expect(f!.skeptic_flip.length).toBeGreaterThan(0);
    }
  });
});

import { describe, it, expect } from "vitest";
import { topics } from "./topics";
import { TopicSchema } from "@/lib/schemas/topic";

describe("topics data integrity", () => {
  it("has at least one topic", () => {
    expect(topics.length).toBeGreaterThan(0);
  });

  it("all topics have unique IDs", () => {
    const ids = topics.map((t) => t.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("all topics have valid confidence scores (0-100)", () => {
    topics.forEach((topic) => {
      expect(topic.confidence_score).toBeGreaterThanOrEqual(0);
      expect(topic.confidence_score).toBeLessThanOrEqual(100);
    });
  });

  it("all topics have at least one pillar", () => {
    topics.forEach((topic) => {
      expect(topic.pillars.length).toBeGreaterThan(0);
    });
  });

  it("all pillars have unique IDs within their topic", () => {
    topics.forEach((topic) => {
      const pillarIds = topic.pillars.map((p) => p.id);
      const uniquePillarIds = new Set(pillarIds);
      expect(uniquePillarIds.size).toBe(pillarIds.length);
    });
  });

  it("all pillars have a crux", () => {
    topics.forEach((topic) => {
      topic.pillars.forEach((pillar) => {
        expect(pillar.crux).toBeDefined();
        expect(pillar.crux.title).toBeTruthy();
        expect(pillar.crux.methodology).toBeTruthy();
      });
    });
  });

  it("all topics pass Zod validation", () => {
    topics.forEach((topic) => {
      const result = TopicSchema.safeParse(topic);
      if (!result.success) {
        console.error(`Topic "${topic.id}" failed validation:`, result.error);
      }
      expect(result.success).toBe(true);
    });
  });

  it("topics have valid status values", () => {
    const validStatuses = ["settled", "contested", "highly_speculative"];
    topics.forEach((topic) => {
      expect(validStatuses).toContain(topic.status);
    });
  });

  it("evidence items have valid side values", () => {
    topics.forEach((topic) => {
      topic.pillars.forEach((pillar) => {
        if (pillar.evidence) {
          pillar.evidence.forEach((ev) => {
            expect(["for", "against"]).toContain(ev.side);
          });
        }
      });
    });
  });

  it("evidence weight values are within 0-10 range", () => {
    topics.forEach((topic) => {
      topic.pillars.forEach((pillar) => {
        if (pillar.evidence) {
          pillar.evidence.forEach((ev) => {
            const weights = [
              ev.weight.sourceReliability,
              ev.weight.independence,
              ev.weight.replicability,
              ev.weight.directness,
            ];
            weights.forEach((w) => {
              expect(w).toBeGreaterThanOrEqual(0);
              expect(w).toBeLessThanOrEqual(10);
            });
          });
        }
      });
    });
  });

  // Citation-coverage ratchet (Citation Moat sprint, 2026-06-16).
  // The sprint web-verified primary-source URLs onto evidence items, lifting
  // overall coverage from 56% to 98%. This test locks that in: if a future
  // change strips sourceUrls (or adds unsourced evidence) and drops overall
  // coverage below the ratchet, CI fails. Mirrors scripts/citation-coverage.ts.
  const CITATION_URL_RE = /^https?:\/\/\S+\.\S+/;
  const COVERAGE_RATCHET = 0.95; // current is ~0.98; never let it fall below 95%.

  it(`maintains >=${COVERAGE_RATCHET * 100}% evidence citation coverage (ratchet)`, () => {
    const evidence = topics.flatMap((t) => t.pillars.flatMap((p) => p.evidence ?? []));
    const withUrl = evidence.filter(
      (e) => typeof e.sourceUrl === "string" && CITATION_URL_RE.test(e.sourceUrl),
    ).length;
    const coverage = evidence.length === 0 ? 0 : withUrl / evidence.length;
    expect(
      coverage,
      `Citation coverage ${(coverage * 100).toFixed(1)}% (${withUrl}/${evidence.length}) ` +
        `fell below the ${COVERAGE_RATCHET * 100}% ratchet. Backfill sourceUrls on new/edited evidence.`,
    ).toBeGreaterThanOrEqual(COVERAGE_RATCHET);
  });
});

describe("specific topics", () => {
  it("moon-landing topic exists and is settled", () => {
    const moonLanding = topics.find((t) => t.id === "moon-landing");
    expect(moonLanding).toBeDefined();
    expect(moonLanding?.status).toBe("settled");
    expect(moonLanding?.confidence_score).toBeGreaterThanOrEqual(90);
  });

  it("simulation-hypothesis topic exists", () => {
    const simHypothesis = topics.find((t) => t.id === "simulation-hypothesis");
    expect(simHypothesis).toBeDefined();
  });

  it("ai-risk topic exists", () => {
    const aiRisk = topics.find((t) => t.id === "ai-risk");
    expect(aiRisk).toBeDefined();
  });
});

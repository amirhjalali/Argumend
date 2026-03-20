import { describe, it, expect } from "vitest";
import {
  topics,
  CROSS_CATEGORY_CLUSTERS,
  getCrossCategoryRelated,
} from "./topics";
import { computeConfidenceScore } from "@/lib/schemas/topic";

// ============================================================================
// Cross-Category Clusters
// ============================================================================

describe("cross-category clusters", () => {
  const topicIds = new Set(topics.map((t) => t.id));

  it("every topic key in CROSS_CATEGORY_CLUSTERS exists in the topics array", () => {
    Object.keys(CROSS_CATEGORY_CLUSTERS).forEach((key) => {
      expect(topicIds.has(key)).toBe(true);
    });
  });

  it("every cluster has exactly 4 related topic IDs", () => {
    Object.entries(CROSS_CATEGORY_CLUSTERS).forEach(([key, related]) => {
      expect(related.length).toBe(4);
    });
  });

  it("all related topic IDs in clusters exist in the topics array (except known gaps)", () => {
    // covid-origins is referenced but aliased as lab-leak-theory in the topics array
    const knownAliases = new Set(["covid-origins"]);
    Object.entries(CROSS_CATEGORY_CLUSTERS).forEach(([key, related]) => {
      related.forEach((relatedId) => {
        if (!knownAliases.has(relatedId)) {
          expect(topicIds.has(relatedId)).toBe(true);
        }
      });
    });
  });

  it("no cluster references itself", () => {
    Object.entries(CROSS_CATEGORY_CLUSTERS).forEach(([key, related]) => {
      expect(related).not.toContain(key);
    });
  });

  it("getCrossCategoryRelated returns topics from different categories", () => {
    // Find a topic that has cross-category clusters defined
    const topicId = Object.keys(CROSS_CATEGORY_CLUSTERS)[0];
    const topic = topics.find((t) => t.id === topicId)!;
    const related = getCrossCategoryRelated(topicId, topic.category);

    related.forEach((r) => {
      expect(r.category).not.toBe(topic.category);
    });
  });

  it("getCrossCategoryRelated returns up to limit topics", () => {
    const topicId = Object.keys(CROSS_CATEGORY_CLUSTERS)[0];
    const topic = topics.find((t) => t.id === topicId)!;

    const related2 = getCrossCategoryRelated(topicId, topic.category, 2);
    expect(related2.length).toBeLessThanOrEqual(2);

    const related1 = getCrossCategoryRelated(topicId, topic.category, 1);
    expect(related1.length).toBeLessThanOrEqual(1);
  });

  it("getCrossCategoryRelated returns empty array for unknown topic", () => {
    const related = getCrossCategoryRelated("nonexistent-topic-xyz", "policy");
    expect(related).toEqual([]);
  });

  it("getCrossCategoryRelated returns valid Topic objects", () => {
    const topicId = Object.keys(CROSS_CATEGORY_CLUSTERS)[0];
    const topic = topics.find((t) => t.id === topicId)!;
    const related = getCrossCategoryRelated(topicId, topic.category);

    related.forEach((r) => {
      expect(r).toHaveProperty("id");
      expect(r).toHaveProperty("title");
      expect(r).toHaveProperty("pillars");
      expect(r).toHaveProperty("category");
    });
  });
});

// ============================================================================
// Topic Content Quality
// ============================================================================

describe("topic content quality", () => {
  it("all topics have at least 2 pillars", () => {
    topics.forEach((topic) => {
      expect(topic.pillars.length).toBeGreaterThanOrEqual(2);
    });
  });

  it("most pillars have evidence", () => {
    let totalPillars = 0;
    let pillarsWithEvidence = 0;

    topics.forEach((topic) => {
      topic.pillars.forEach((pillar) => {
        totalPillars++;
        if (pillar.evidence && pillar.evidence.length > 0) {
          pillarsWithEvidence++;
        }
      });
    });

    // The vast majority of pillars should have evidence
    const ratio = pillarsWithEvidence / totalPillars;
    expect(ratio).toBeGreaterThan(0.85);
  });

  it("pillars with 2+ evidence items usually include both for and against", () => {
    let pillarsWithMultiple = 0;
    let pillarsWithBothSides = 0;

    topics.forEach((topic) => {
      topic.pillars.forEach((pillar) => {
        if (pillar.evidence && pillar.evidence.length >= 2) {
          pillarsWithMultiple++;
          const forEvidence = pillar.evidence.filter((e) => e.side === "for");
          const againstEvidence = pillar.evidence.filter((e) => e.side === "against");
          if (forEvidence.length >= 1 && againstEvidence.length >= 1) {
            pillarsWithBothSides++;
          }
        }
      });
    });

    // Most pillars with multiple evidence items should have both sides
    const ratio = pillarsWithBothSides / pillarsWithMultiple;
    expect(ratio).toBeGreaterThan(0.85);
  });

  it("all evidence weights are within 1-10 (not 0)", () => {
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
              expect(w).toBeGreaterThanOrEqual(1);
              expect(w).toBeLessThanOrEqual(10);
            });
          });
        }
      });
    });
  });

  it("all cruxes have non-empty methodology", () => {
    topics.forEach((topic) => {
      topic.pillars.forEach((pillar) => {
        expect(pillar.crux.methodology.trim().length).toBeGreaterThan(0);
      });
    });
  });

  it("all cruxes have non-empty title", () => {
    topics.forEach((topic) => {
      topic.pillars.forEach((pillar) => {
        expect(pillar.crux.title.trim().length).toBeGreaterThan(0);
      });
    });
  });

  it("all cruxes have non-empty description", () => {
    topics.forEach((topic) => {
      topic.pillars.forEach((pillar) => {
        expect(pillar.crux.description.trim().length).toBeGreaterThan(0);
      });
    });
  });

  it("at least half of topics have questions", () => {
    const withQuestions = topics.filter(
      (t) => t.questions && t.questions.length > 0
    );
    expect(withQuestions.length).toBeGreaterThan(topics.length / 2);
  });

  it("topics with questions have valid question objects", () => {
    topics.forEach((topic) => {
      if (topic.questions && topic.questions.length > 0) {
        topic.questions.forEach((q) => {
          expect(q.id).toBeTruthy();
          expect(q.title.trim().length).toBeGreaterThan(0);
          expect(q.content.trim().length).toBeGreaterThan(0);
        });
      }
    });
  });

  it("at least half of topics have references", () => {
    const withRefs = topics.filter(
      (t) => t.references && t.references.length > 0
    );
    expect(withRefs.length).toBeGreaterThan(topics.length / 2);
  });

  it("all references have valid URLs", () => {
    topics.forEach((topic) => {
      if (topic.references) {
        topic.references.forEach((ref) => {
          expect(ref.url).toBeTruthy();
          // URL should start with http:// or https://
          expect(ref.url).toMatch(/^https?:\/\//);
        });
      }
    });
  });

  it("confidence scores match computed values for contested topics", () => {
    topics
      .filter((t) => t.status !== "settled")
      .forEach((topic) => {
        const computed = computeConfidenceScore(topic.pillars);
        expect(topic.confidence_score).toBe(computed);
      });
  });

  it("all topic IDs follow slug format (lowercase, hyphens)", () => {
    const slugPattern = /^[a-z0-9]+(-[a-z0-9]+)*$/;
    topics.forEach((topic) => {
      expect(topic.id).toMatch(slugPattern);
    });
  });

  it("all topics have non-empty meta_claim", () => {
    topics.forEach((topic) => {
      expect(topic.meta_claim.trim().length).toBeGreaterThan(0);
    });
  });

  it("all topics have a valid category", () => {
    const validCategories = ["policy", "technology", "science", "economics", "philosophy"];
    topics.forEach((topic) => {
      expect(validCategories).toContain(topic.category);
    });
  });
});

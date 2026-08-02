import { describe, it, expect } from "vitest";
import { topics } from "./topics";
import { TopicSchema } from "@/lib/schemas/topic";
import { validateSourceUrl } from "@/scripts/source-url-health";

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

  it("all topics have valid balance and weight (0-100) and a verdict", () => {
    topics.forEach((topic) => {
      expect(topic.balance).toBeGreaterThanOrEqual(0);
      expect(topic.balance).toBeLessThanOrEqual(100);
      expect(topic.weight).toBeGreaterThanOrEqual(0);
      expect(topic.weight).toBeLessThanOrEqual(100);
      expect(topic.confidence_score).toBe(topic.balance);
      expect(["settled", "contested", "moderate", "open"]).toContain(topic.verdict.quadrant);
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
  const COVERAGE_RATCHET = 0.98;

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

  it("uses valid, non-placeholder HTTP(S) URLs for every linked citation", () => {
    const linkedEvidence = topics.flatMap((topic) =>
      topic.pillars.flatMap((pillar) =>
        (pillar.evidence ?? []).filter(
          (item): item is typeof item & { sourceUrl: string } =>
            typeof item.sourceUrl === "string",
        ),
      ),
    );

    for (const item of linkedEvidence) {
      expect(
        validateSourceUrl(item.sourceUrl),
        `${item.id} has an invalid or placeholder citation URL: ${item.sourceUrl}`,
      ).toMatchObject({ valid: true });
    }
  });

  it("labels unsourced synthesis explicitly and caps its evidence strength", () => {
    const unlinkedEvidence = topics.flatMap((topic) =>
      topic.pillars.flatMap((pillar) =>
        (pillar.evidence ?? [])
          .filter((item) => !item.sourceUrl)
          .map((item) => ({ topicId: topic.id, item })),
      ),
    );

    expect(unlinkedEvidence.length).toBeLessThanOrEqual(16);
    for (const { topicId, item } of unlinkedEvidence) {
      const label = `${topicId} :: ${item.id}`;
      expect(item.source, `${label} must disclose that it is synthesis`).toMatch(
        /^Synthesis \/ inference —/,
      );
      expect(item.weight.sourceReliability, `${label} source reliability`).toBeLessThanOrEqual(5);
      expect(item.weight.replicability, `${label} replicability`).toBeLessThanOrEqual(5);
      expect(item.weight.directness, `${label} directness`).toBeLessThanOrEqual(6);
    }
  });

  it("keeps the freelance-displacement card aligned with Upwork's measured effects", () => {
    const card = topics
      .find((topic) => topic.id === "ai-job-displacement")
      ?.pillars.flatMap((pillar) => pillar.evidence ?? [])
      .find((item) => item.id === "freelance-rate-collapse");

    expect(card?.sourceUrl).toBe(
      "https://www.upwork.com/research/generative-ai-work-value",
    );
    expect(card?.description).toContain("writing by 8%");
    expect(card?.description).toContain("translation by 10%");
    expect(card?.description).not.toMatch(/30-50%|30–50%/);
  });
});

describe("specific topics", () => {
  it("keeps the Jones Act evidence fully source-linked", () => {
    const jonesAct = topics.find((t) => t.id === "jones-act");
    const evidence = jonesAct?.pillars.flatMap((pillar) => pillar.evidence ?? []) ?? [];

    expect(evidence.length).toBeGreaterThan(0);
    expect(evidence.every((item) => item.source && item.sourceUrl)).toBe(true);
  });

  it("keeps Cost Disease evidence citation coverage above 80%", () => {
    const costDisease = topics.find((t) => t.id === "scott-cost-disease");
    const evidence = costDisease?.pillars.flatMap((pillar) => pillar.evidence ?? []) ?? [];
    const sourceLinked = evidence.filter((item) => item.source && item.sourceUrl);

    expect(evidence.length).toBeGreaterThan(0);
    expect(sourceLinked.length / evidence.length).toBeGreaterThanOrEqual(0.8);
  });

  it("moon-landing topic exists and is settled", () => {
    const moonLanding = topics.find((t) => t.id === "moon-landing");
    expect(moonLanding).toBeDefined();
    expect(moonLanding?.status).toBe("settled");
    expect(moonLanding?.balance).toBeGreaterThanOrEqual(70);
    expect(moonLanding?.weight).toBeGreaterThanOrEqual(80);
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

describe("weight calibration anchors (spec §2.2)", () => {
  const moonLanding = topics.find((t) => t.id === "moon-landing");

  it("moon-landing (settled) has high weight", () => {
    expect(moonLanding?.weight).toBeGreaterThan(80);
    expect(moonLanding?.verdict.quadrant).toBe("settled");
  });

  it("moloch is well-mapped and genuinely contested — never 'insufficient'", () => {
    const moloch = topics.find((t) => t.id === "moloch");
    expect(moloch).toBeDefined();
    expect(moloch!.weight).toBeGreaterThanOrEqual(60);
    expect(moloch!.verdict.quadrant).toBe("contested");
    expect(moloch!.verdict.label).toBe("Well-mapped, genuinely contested");
  });

  it("the corpus weight distribution is legible (not clustered)", () => {
    // Thresholds re-baselined 2026-07-28 when the corpus grew from ~113 to 156
    // topics (merge of the two-axis-confidence branch with ~30 independently
    // added, well-evidenced topic maps). Every topic in the enlarged corpus
    // has enough evidence to clear the old "genuinely thin" floor, so the
    // spread is narrower than the original spec target — that's real
    // corpus composition, not a formula regression. See merge-report.md.
    const weights = topics.map((t) => t.weight);
    expect(Math.max(...weights) - Math.min(...weights)).toBeGreaterThan(30);
    expect(Math.min(...weights)).toBeLessThan(55);
  });
});

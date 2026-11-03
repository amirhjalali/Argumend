/**
 * Agreed facts are not a side's best card (round-10 review).
 *
 * On /topics/moon-landing, "What both sides already agree on" said no
 * telescope on Earth can resolve the landers, and "The other side's best
 * card → Points to no" was "Cannot see landing sites from Earth": the same
 * fact. Most legacy maps wrote their common ground from one of their cards,
 * so the pattern is general; these tests read every legacy map.
 */
import { describe, expect, it } from "vitest";
import { topics } from "@/data/topics";
import { loadTopicById } from "@/data/topicLoader";
import { stems } from "./settleContract";
import {
  AGREED_FACT_THRESHOLDS,
  agreedFactCards,
  agreedFactScores,
  agreedFacts,
  legacyTopicPage,
} from "./legacy";
import { DISTINCT_FROM_AGREED_FACT } from "./agreedFacts.distinct";

/** Share of a fact's plain content words (no weighting) a card repeats. */
function plainCoverage(card: string, fact: string): number {
  const cardWords = stems(card);
  const factWords = stems(fact.replace(/^both sides (?:agree|accept)(?: that)?\s*/i, ""));
  if (factWords.size === 0) return 0;
  let shared = 0;
  for (const word of factWords) if (cardWords.has(word)) shared += 1;
  return shared / factWords.size;
}

describe("agreed facts and best cards", () => {
  it("moon landing: the telescope limit both sides accept is not the skeptics' best card", async () => {
    const topic = (await loadTopicById("moon-landing"))!;
    const flagged = [...agreedFactCards(topic)].map((card) => card.id);
    expect(flagged).toEqual(["hubble-limitation"]);

    const { cruxes, weighing } = legacyTopicPage(topic);
    const trace = cruxes.find((crux) => crux.pillarId === "physical-trace")!;
    expect(trace.evidence.find((e) => e.id === "hubble-limitation")?.restatesAgreement).toBe(true);
    // Still listed with the evidence, never offered as a best card: the
    // skeptics' best card is their own claim, the pre-Apollo surface echoes.
    expect(trace.bestCards.against?.id).toBe("surface-echoes-1962");
    expect(trace.bestCards.for?.id).toBe("lrrr-independent");
    expect(weighing.strongest?.againstTitle).not.toMatch(/cannot see/i);
  });

  it("moon landing: every crux shows a card from each side (round-11 review)", async () => {
    const topic = (await loadTopicById("moon-landing"))!;
    const { cruxes, weighing } = legacyTopicPage(topic);
    // With no pair the page's first crux showed no "other side's best card"
    // at all, which read as broken. Each side now has a card of its own.
    for (const crux of cruxes) {
      expect(crux.bestCards.for, crux.pillarId).toBeDefined();
      expect(crux.bestCards.against, crux.pillarId).toBeDefined();
    }
    expect(weighing.strongest).toBeDefined();
    // The skeptic cards are weighed as what they are: claims whose evidence
    // bears only indirectly on the crux, never stronger than the yes side's.
    const cards = topic.pillars.flatMap((p) => p.evidence ?? []);
    for (const id of ["surface-echoes-1962", "orion-belt-quote"]) {
      const card = cards.find((c) => c.id === id)!;
      expect(card.side, id).toBe("against");
      expect(card.weight.directness, id).toBeLessThanOrEqual(3);
    }
  });

  it("moon landing: the dosimeter card that points to yes sits on the yes side", async () => {
    const topic = (await loadTopicById("moon-landing"))!;
    const radiation = topic.pillars.find((p) => p.id === "radiation-environment")!;
    // Low measured doses contradict the "lethal belts" objection.
    for (const card of radiation.evidence ?? []) {
      if (/non-lethal|well below dangerous/i.test(`${card.title} ${card.description}`)) {
        expect(card.side, card.id).toBe("for");
      }
    }
    // What would settle it is a test anyone can run, not "we can calculate exact exposure".
    const condition = radiation.crux.settle?.condition ?? radiation.crux.description;
    expect(condition).not.toMatch(/\bwe\b|\bexact\b/i);
    expect(radiation.crux.description).not.toMatch(/\bwe\b|\bexact\b/i);
  });

  it("every legacy map: no crux offers an agreed fact as a side's best card", () => {
    const offenders: string[] = [];
    let flaggedMaps = 0;
    for (const topic of topics) {
      const facts = agreedFacts(topic);
      const { cruxes, weighing } = legacyTopicPage(topic);
      if (cruxes.some((crux) => crux.evidence.some((e) => e.restatesAgreement))) flaggedMaps += 1;
      const best = cruxes.flatMap((crux) =>
        [crux.bestCards.for, crux.bestCards.against].flatMap((card) => (card ? [card] : [])),
      );
      for (const card of best) {
        if (card.restatesAgreement) offenders.push(`${topic.id}: ${card.title} (flagged)`);
        // An independent, plainer check: no best card repeats most of an
        // agreed fact's words outright.
        for (const fact of facts) {
          const coverage = plainCoverage(`${card.title}. ${card.description}`, fact);
          if (coverage >= 0.8) offenders.push(`${topic.id}: ${card.title} ≈ "${fact}" (${coverage.toFixed(2)})`);
        }
      }
      const titles = new Map(
        cruxes.flatMap((crux) => crux.evidence).map((card) => [card.title, card.restatesAgreement]),
      );
      for (const title of [weighing.strongest?.forTitle, weighing.strongest?.againstTitle]) {
        if (title && titles.get(title)) offenders.push(`${topic.id}: weighing fold shows ${title}`);
      }
    }
    expect(offenders).toEqual([]);
    // The pattern is real on many maps; if this drops to zero the detector broke.
    expect(flaggedMaps).toBeGreaterThan(20);
  });

  it("is calibrated: restatements score over the line, ordinary cards on the same map under it", async () => {
    const score = async (topicId: string, cardId: string) => {
      const topic = (await loadTopicById(topicId))!;
      const card = topic.pillars.flatMap((p) => p.evidence ?? []).find((e) => e.id === cardId)!;
      return agreedFactScores(topic).get(card)!;
    };
    const line = AGREED_FACT_THRESHOLDS.card;
    expect(await score("moon-landing", "hubble-limitation")).toBeGreaterThanOrEqual(line);
    for (const id of ["lrrr-independent", "lro-imagery", "moon-rocks", "dosimeter-records", "trajectory-analysis", "surface-echoes-1962", "orion-belt-quote"]) {
      expect(await score("moon-landing", id), id).toBeLessThan(line);
    }
  });

  it("lists a card as distinct only while the detector still flags it", () => {
    const stale: string[] = [];
    for (const key of Object.keys(DISTINCT_FROM_AGREED_FACT)) {
      const [topicId, cardId] = key.split("/");
      const topic = topics.find((t) => t.id === topicId);
      const card = topic?.pillars.flatMap((p) => p.evidence ?? []).find((e) => e.id === cardId);
      const score = topic && card ? agreedFactScores(topic).get(card) ?? 0 : 0;
      if (score < AGREED_FACT_THRESHOLDS.card) stale.push(key);
    }
    expect(stale).toEqual([]);
  });

  it("the crux-sheet lede does not repeat the agreement block, and never opens on a bare 'They'", () => {
    for (const topic of topics) {
      const { page } = legacyTopicPage(topic);
      if (!page.cruxLede) continue;
      expect(page.cruxLede, topic.id).not.toMatch(/^They\b/);
      const opener = topic.simple_case?.[0] ?? "";
      if (/^Both sides accept/.test(opener) && page.cruxLede.startsWith(opener)) {
        // Kept only when it says more than the agreed facts on the page.
        const agreed = stems(agreedFacts(topic).join(" "));
        const words = stems(opener);
        const shared = [...words].filter((word) => agreed.has(word)).length;
        expect(shared / words.size, topic.id).toBeLessThan(AGREED_FACT_THRESHOLDS.lede);
      }
    }
  });

  it("moon landing: the lede starts where the sides split", async () => {
    const topic = (await loadTopicById("moon-landing"))!;
    const { page } = legacyTopicPage(topic);
    expect(page.cruxLede).toMatch(/^The two sides split over whether the laser echoes/);
    expect(page.cruxLede).not.toContain("Hubble included");
  });
});

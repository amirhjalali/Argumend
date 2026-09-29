import { describe, expect, it } from "vitest";
import { loadTopicById } from "@/data/topicLoader";
import { topicSummaries } from "@/data/topicIndex";
import { withoutFalsification } from "@/test/fixtures/legacyTopics";
import { countSources, firstSentence, legacyTopicPage } from "./legacy";

describe("firstSentence", () => {
  it("returns the first sentence verbatim", () => {
    expect(firstSentence("One thing. Another thing.")).toBe("One thing.");
    expect(firstSentence("No full stop at all")).toBe("No full stop at all");
    expect(firstSentence("Is it? Yes.")).toBe("Is it?");
  });

  it("does not split after abbreviations or inside figures", () => {
    expect(
      firstSentence(
        "Per TWh generated, nuclear causes ~0.03 deaths vs. 24.6 for coal. Fukushima is next.",
      ),
    ).toBe("Per TWh generated, nuclear causes ~0.03 deaths vs. 24.6 for coal.");
    expect(firstSentence("The U.S. Senate voted. Then it did not.")).toBe(
      "The U.S. Senate voted.",
    );
  });
});

describe("legacyTopicPage", () => {
  it("builds a crux-first page from a map with falsification data, using only its own text", async () => {
    const topic = (await loadTopicById("nuclear-energy-safety"))!;
    const { page, cruxes, weighing } = legacyTopicPage(topic, [
      { id: "climate-change", title: "Climate Change" },
    ]);

    expect(page.kind).toBe("legacy");
    // One name per map: the h1 is the map's authored question, and the
    // breadcrumb says the same (it truncates on one line), not the old label.
    expect(page.title).toBe(topic.question ?? topic.title);
    expect(page.crumb).toBe(page.title);
    // A question headline states the claim, so the "The claim:" line is
    // dropped; label-titled maps keep it.
    expect(page.subtitle).toEqual(
      topic.question ? undefined : { lead: "The claim", text: topic.meta_claim },
    );
    expect(page.hook?.text).toBe(topic.keystone_fact!.statement);
    expect(page.hook?.source?.url).toBe(topic.keystone_fact!.sourceUrl);
    expect(page.sourceCount).toBe(countSources(topic));
    expect(page.reviewedOn).toBe(topic.last_updated);
    expect(page.cruxLede).toBe(topic.simple_case!.join(" "));
    expect(page.diagramHref).toBe(`/topics/${topic.id}/map`);
    expect(page.embeddable).toBe(true);

    // What both sides agree on is each crux's common ground, verbatim.
    expect(page.agreement).toEqual(
      topic.pillars.map((p) => p.crux.falsification!.common_ground!),
    );

    // One crux per pillar; the heading is the authored crux question, else the
    // live disagreement. Under an authored question the live disagreement
    // reads in the fold instead.
    expect(cruxes).toHaveLength(topic.pillars.length);
    for (const [index, crux] of cruxes.entries()) {
      const pillar = topic.pillars[index];
      const live = pillar.crux.falsification!.live_disagreement!;
      expect(crux.question).toBe(pillar.crux.question ?? live);
      expect(crux.kicker).toBe(pillar.title);
      expect(crux.settle.condition).toBe(pillar.crux.description);
      expect(crux.flips).toEqual({
        supporter: pillar.crux.falsification!.supporter_flip,
        skeptic: pillar.crux.falsification!.skeptic_flip,
        // "Yes" to the map's question, said in full: the crux question just
        // above may be worded the other way round.
        supporterLead: "Someone who says yes to the map’s question would change their mind if…",
        skepticLead: "Someone who says no to the map’s question would change their mind if…",
      });
      // Common ground already shown up top is not repeated in the fold.
      expect(crux.runIns).toEqual(
        pillar.crux.question ? [{ lead: "Where the fight is.", text: live }] : [],
      );
      expect(crux.evidence.map((e) => e.id).sort()).toEqual(
        (pillar.evidence ?? []).map((e) => e.id).sort(),
      );
    }

    // Two position cards built from the pillar texts, each shown once.
    // Named by their answer to the question the reader sees, not "Supporters"
    // of a claim the page no longer shows.
    expect(page.positions.map((p) => p.label)).toEqual(["Says yes", "Says no"]);
    expect(page.positions[0].full.map((f) => f.text)).toEqual(
      topic.pillars.map((p) => p.proponent_rebuttal),
    );
    expect(page.positions[1].full.map((f) => f.text)).toEqual(
      topic.pillars.map((p) => p.skeptic_premise),
    );
    expect(topic.pillars[0].proponent_rebuttal.startsWith(page.positions[0].summary)).toBe(true);

    // The evidence reading is words only.
    expect(weighing.label).toBe(topic.verdict.label);
    expect(JSON.stringify(weighing)).not.toMatch(/\/100|\bpts\b/);
  });

  it("renders a map without falsification data from what it has", async () => {
    // Every shipped map now has falsification data, so the fallback runs on a
    // fixture: a real map with the blocks (and its keystone fact) taken out.
    const topic = {
      ...withoutFalsification((await loadTopicById("epstein-files"))!),
      keystone_fact: undefined,
    };
    expect(topic.pillars.every((p) => !p.crux.falsification)).toBe(true);
    const { page, cruxes } = legacyTopicPage(topic);

    expect(page.agreement).toEqual([]);
    expect(page.hook).toBeUndefined();
    // The heading is the authored crux question, else the crux title.
    expect(cruxes.map((c) => c.question)).toEqual(
      topic.pillars.map((p) => p.crux.question ?? p.crux.title),
    );
    // With no crux questions either, the crux title is the heading.
    const bare = legacyTopicPage({
      ...topic,
      pillars: topic.pillars.map((p) => ({ ...p, crux: { ...p.crux, question: undefined } })),
    });
    expect(bare.cruxes.map((c) => c.question)).toEqual(topic.pillars.map((p) => p.crux.title));
    for (const crux of cruxes) {
      expect(crux.flips).toBeUndefined();
      expect(crux.runIns).toEqual([]);
      expect(crux.settle.condition!.length).toBeGreaterThan(0);
    }
  });

  it("gives every pillar of every legacy map the agreement and mind-change lines", async () => {
    // "What both sides already agree on" and "A supporter / a skeptic changes
    // their mind if…" are the heart of the page; no map ships without them.
    const missing: string[] = [];
    for (const summary of topicSummaries) {
      const topic = (await loadTopicById(summary.id))!;
      for (const pillar of topic.pillars) {
        const f = pillar.crux.falsification;
        const fields = [f?.supporter_flip, f?.skeptic_flip, f?.common_ground, f?.live_disagreement];
        if (!fields.every((text) => typeof text === "string" && text.trim().length > 0)) {
          missing.push(`${summary.id}/${pillar.id}`);
        }
      }
      const { page, cruxes } = legacyTopicPage(topic);
      expect(page.agreement.length, summary.id).toBeGreaterThan(0);
      for (const crux of cruxes) expect(crux.flips, `${summary.id}/${crux.anchor}`).toBeDefined();
    }
    expect(missing).toEqual([]);
  }, 30_000);

  it("never emits placeholder or invented copy across the whole library", async () => {
    for (const summary of topicSummaries) {
      const topic = (await loadTopicById(summary.id))!;
      const { page, cruxes } = legacyTopicPage(topic);
      const text = JSON.stringify({ page, cruxes });
      expect(text, summary.id).not.toMatch(/REQUIRES AUTHORING|\[TODO\]|:null\b|"undefined"/);
      expect(page.agreement.length, summary.id).toBeLessThanOrEqual(3);
      expect(cruxes.length, summary.id).toBe(topic.pillars.length);
      for (const crux of cruxes) {
        expect(crux.question.trim().length, `${summary.id}/${crux.anchor}`).toBeGreaterThan(0);
      }
      expect(new Set(cruxes.map((c) => c.anchor)).size, summary.id).toBe(cruxes.length);
    }
  }, 30_000);
});

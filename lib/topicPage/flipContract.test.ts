/**
 * "What would change their mind" over every legacy map (round-6 live review).
 *
 * The two flips on a crux (`falsification.supporter_flip` / `skeptic_flip`)
 * render under "What would change the mind of someone who says yes / no to
 * the map's question" on the topic page, in the diagram detail, in the paste
 * result and in its copied summary. Each must be a fair conditional ("If …,
 * …") naming new evidence, the same form for both sides, and never a lecture
 * to one side about evidence it supposedly ignores. Rules and thresholds:
 * ./flipContract.ts. No allowlist: every map passes.
 */
import { describe, expect, it } from "vitest";
import { topics } from "@/data/topics";
import { pillarMapDocument } from "@/lib/paste/mapDocuments";
import { ANSWER_SIDES, CLAIM_SIDES } from "@/lib/mapNaming";
import { flipProblems, flipSymmetryProblem, type FlipRule } from "./flipContract";
import { legacyTopicPage } from "./legacy";

const rules = (text: string): FlipRule[] => flipProblems(text).map((p) => p.rule);

function audit(): string[] {
  const failing: string[] = [];
  for (const topic of topics) {
    for (const pillar of topic.pillars) {
      const f = pillar.crux.falsification;
      if (!f) continue;
      const key = `${topic.id}/${pillar.id}`;
      const problems = [
        ...flipProblems(f.supporter_flip).map((p) => `supporter ${p.rule} (${p.detail})`),
        ...flipProblems(f.skeptic_flip).map((p) => `skeptic ${p.rule} (${p.detail})`),
      ];
      const symmetry = flipSymmetryProblem(f.supporter_flip, f.skeptic_flip);
      if (symmetry) problems.push(`symmetry (${symmetry.detail})`);
      if (problems.length > 0) failing.push(`${key}: ${problems.join("; ")}`);
    }
  }
  return failing;
}

describe("mind-change (flip) contract", () => {
  it("catches the lines the round-6 review named", () => {
    // minimum-wage-effects/employment-effects, before: a lecture with an
    // asserted outcome and a burden.
    const jobs = rules(
      "A skeptic predicting big job losses should weigh that the textbook prediction has repeatedly failed to appear in modern studies of moderate increases (near-zero elasticity across Cengiz et al.'s 138 cases) — so the burden is on showing why a given increase is large enough to break that pattern.",
    );
    expect(jobs).toEqual(expect.arrayContaining(["conditional", "lecture", "side-should", "asserted", "burden"]));

    // nuclear-energy-safety/safety-record, before.
    const nuclear = rules(
      "A skeptic focused on catastrophe should update toward 'safe enough' as passive-safety designs accumulate decades of operating experience with no major release, and as the deaths-per-TWh gap over fossil fuels keeps holding up under independent re-analysis — which it consistently has.",
    );
    expect(nuclear).toEqual(expect.arrayContaining(["conditional", "lecture", "side-should", "asserted"]));

    // pfas, before: "already falsified".
    expect(
      rules(
        "If designs that fix temporality keep finding immune effects, 'it's all reverse causation' is already falsified for several endpoints.",
      ),
    ).toContain("asserted");

    // The evidence is said to point one way.
    expect(rules("If the evidence shows a clear effect at scale, the objection would lose its footing.")).toContain(
      "asserted",
    );
    expect(rules("If a new trial agreed, the claim would be vindicated and the case closed.")).toContain("verdict");
    expect(rules("If a large trial found no effect, the rationale should be dropped entirely.")).toContain("lecture");
  });

  it("passes a fair conditional on either side", () => {
    expect(
      rules(
        "If larger trials that hold weight constant, as Sutton 2018 did, also found better insulin sensitivity and blood pressure, a timing effect beyond weight loss would be hard to deny.",
      ),
    ).toEqual([]);
    expect(
      rules(
        "If prospective studies showed microplastics are passively deposited in already-diseased arteries without accelerating plaque, the 'comparable to lead' alarm would deflate.",
      ),
    ).toEqual([]);
    expect(flipSymmetryProblem("x".repeat(100), "y".repeat(250))).toBeNull();
    expect(flipSymmetryProblem("x".repeat(100), "y".repeat(260))?.rule).toBe("symmetry");
  });

  it("holds both flips on every legacy crux to the contract, with no exceptions", () => {
    expect(audit()).toEqual([]);
  });

  it("renders each flip as a whole sentence under a heading, not as the end of one", () => {
    // The lead-ins are headings; the flip under them opens "If …" on its own.
    for (const words of [ANSWER_SIDES, CLAIM_SIDES]) {
      for (const lead of [words.yesChangesMind, words.noChangesMind]) {
        expect(lead).toMatch(/^What would change /);
        expect(lead).not.toMatch(/\bif…?$/);
      }
    }
    for (const topic of topics) {
      for (const crux of legacyTopicPage(topic).cruxes) {
        if (!crux.flips) continue;
        expect(crux.flips.supporter, crux.anchor).toMatch(/^If\b/);
        expect(crux.flips.skeptic, crux.anchor).toMatch(/^If\b/);
      }
    }
  });

  it("keeps mind-change text out of the paste index", () => {
    // Flips describe hypothetical evidence; their generic vocabulary (wages,
    // jobs, studies) pulls unrelated maps level with the right one.
    for (const topic of topics) {
      const indexed = Object.values(pillarMapDocument(topic).fields).flat().join("\n");
      for (const pillar of topic.pillars) {
        const f = pillar.crux.falsification;
        if (!f) continue;
        expect(indexed.includes(f.supporter_flip), `${topic.id}/${pillar.id} supporter`).toBe(false);
        expect(indexed.includes(f.skeptic_flip), `${topic.id}/${pillar.id} skeptic`).toBe(false);
      }
    }
  });
});

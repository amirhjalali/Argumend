import { describe, expect, it } from "vitest";
import { loadTopicById } from "@/data/topicLoader";
import { legacyTopicPage } from "./legacy";

// Pillars whose two side texts were once filed backwards: the "Supporters"
// card (proponent_rebuttal) argued against the map's meta_claim and the
// "Skeptics" card (skeptic_premise) argued for it. Each row pins the opening
// of the text the Supporters card used to show — it must now open the
// Skeptics card instead, so an edit cannot silently flip the pillar back.
// Round 2 side audit, 2026-09-29 (docs/reviews/2026-09-29-r2-side-audit.md).
const WRONG_SIDE_OPENINGS: [id: string, pillar: number, opening: string][] = [
  // The six maps a reviewer flagged.
  ["obesity-personal-responsibility", 0, "The food environment is not a neutral marketplace of free choice"],
  ["obesity-personal-responsibility", 1, "The biological case is far stronger than 'genetics set a range.'"],
  ["obesity-personal-responsibility", 2, "The success of GLP-1 drugs is the strongest evidence that obesity"],
  ["immigration-national-identity", 0, "The wage suppression evidence is contested."],
  ["immigration-national-identity", 1, "Putnam himself noted that his diversity-trust findings"],
  ["immigration-national-identity", 2, "Democratic opinion polls on immigration are heavily influenced"],
  ["nuclear-weapons-abolition", 1, "The 'knowledge cannot be abolished' argument proves too much"],
  ["nuclear-weapons-abolition", 2, "The humanitarian consequences of nuclear weapons use are so severe"],
  ["alternatives-to-democracy", 1, "Citizens' assemblies are advisory bodies"],
  ["transgender-athletes-sports", 2, "The open category model is not exclusion"],
  ["masculinity-crisis", 2, "The 'both sides fail' framing creates a false equivalence"],
  // Found by the same audit's scan of every legacy map.
  // Decided by the founder's go-ahead after round 3: the flips and both evidence
  // cards already treated "CBDCs threaten dollar power" as the claim's side.
  ["central-bank-digital-currency", 2, "The de-dollarization narrative is vastly overstated."],
  ["facial-recognition-policing", 0, "The bias is real but largely an artifact of weak algorithms"],
  ["facial-recognition-policing", 1, "Every documented wrongful arrest is a failure of police procedure"],
  ["alcohol-no-safe-level", 0, "A statistically detectable relative-risk increase is not the same"],
  ["alcohol-no-safe-level", 1, "The strongest bias-corrected observational meta-analysis"],
  ["alcohol-no-safe-level", 2, "Even in a meta-analysis built by the leading abstainer-bias critics"],
  ["us-national-debt-crisis", 0, "Japan has maintained gross debt-to-GDP above 200%"],
  ["us-national-debt-crisis", 1, "Nominal interest payments are misleading without context"],
  ["tipping-culture", 0, "The $2.13 figure is real but misleading"],
  ["tipping-culture", 1, "The weak tip-quality correlation is real but proves less"],
  ["dark-matter-vs-mond", 1, "These are genuine successes for dark matter, but relativistic extensions"],
  ["adhd-overdiagnosis", 0, "Rising diagnosis rates are exactly what improving recognition"],
  ["adhd-overdiagnosis", 1, "Lacking a single blood test does not make a disorder invalid"],
  ["adhd-overdiagnosis", 2, "The asymmetry runs the other way"],
  ["seed-oils-health", 0, "The omega-6 to omega-3 ratio hypothesis sounds intuitive"],
  ["seed-oils-health", 1, "The oxidation concern is legitimate for improperly handled oils"],
  ["seed-oils-health", 2, "Ecological correlations between seed oil consumption"],
  ["generative-ai-art-copyright", 0, "Copyright never granted a right to control all learning"],
  ["generative-ai-art-copyright", 1, "Copyright protects against substitution of specific works"],
  ["generative-ai-art-copyright", 2, "The leading generative-AI rulings cut the other way"],
  ["open-weight-ai-models", 2, "Democratization is a genuine good, but it is not unconditional"],
  ["open-weight-ai-models", 3, "The fact that China releases capable open weights"],
  ["declining-birth-rates", 0, "The 'doom loop' framing confuses a challenging transition"],
  ["congressional-term-limits", 0, "High re-election rates can reflect satisfied constituents"],
  ["congressional-term-limits", 1, "The best natural experiment — 15 states that adopted"],
  ["return-to-office-productivity", 1, "The serendipity argument is the most romanticized"],
  ["ai-deepfakes-truth-collapse", 0, "The liar's dividend concern is real but overstated"],
  ["ai-deepfakes-truth-collapse", 1, "The detection pessimism overstates the case."],
  ["occupational-licensing-reform", 0, "The 'no quality benefit' finding is real for low-stakes trades"],
  ["occupational-licensing-reform", 1, "Mobility frictions are a design flaw"],
  ["privacy-vs-convenience", 0, "The 'resistance is futile' framing overstates"],
  ["privacy-vs-convenience", 1, "The surveillance picture is more nuanced"],
  ["privacy-vs-convenience", 2, "The 'privacy is dead' narrative confuses"],
  ["rent-control-effectiveness", 0, "The supply-reduction narrative overstates the evidence"],
  ["rent-control-effectiveness", 1, "The 'insider vs outsider' framing fundamentally mischaracterizes"],
  ["rent-control-effectiveness", 2, "Supply-side solutions are correct in the long run"],
  ["autonomous-weapons-ban", 0, "Existing international humanitarian law already assigns responsibility"],
  // Round 3, finishing the audit's suspects list.
  ["encryption-backdoors", 1, "The 'going dark' threat has been demonstrably overstated"],
  ["section-230-reform", 0, "Section 230's exceptions already preserve liability"],
  ["section-230-reform", 2, "Removing 230 would not primarily punish Big Tech"],
  ["us-national-debt-crisis", 2, "Reports of the dollar's demise have been greatly exaggerated"],
  ["congressional-term-limits", 2, "The bar is far higher than popularity suggests."],
  ["facial-recognition-policing", 2, "A governance gap is an argument for governance, not abolition."],
  ["ai-deepfakes-truth-collapse", 2, "The transition challenge is real but the trajectory is positive."],
];

// Crux flips that once pointed the wrong way. supporter_flip is what would
// change the mind of someone who agrees with the map's meta_claim;
// skeptic_flip is what someone who disagrees should weigh. Each row pins the
// opening the flip used to have — it must be gone — and the flip must now
// address its own side. Round 3, 2026-09-29.
const FIXED_FLIPS: [id: string, pillar: number, side: "supporter" | "skeptic", oldOpening: string][] = [
  // Rewritten.
  ["adhd-overdiagnosis", 2, "skeptic", "A skeptic worried about over-labeling"],
  ["open-weight-ai-models", 3, "skeptic", "A skeptic who treats foreign availability as decisive"],
  ["occupational-licensing-reform", 0, "skeptic", "A skeptic confident licensing is pure rent-seeking"],
  ["congressional-term-limits", 1, "supporter", "If post-limit data showed term-limited legislatures held"],
  ["facial-recognition-policing", 1, "supporter", "A supporter of restriction should update if a representative case-file audit found that wrongful arrests persist"],
  ["encryption-backdoors", 2, "supporter", "A skeptic of containability"],
  // Swapped between the two fields.
  ["dark-matter-vs-mond", 0, "supporter", "A MOND supporter"],
  ["dark-matter-vs-mond", 0, "skeptic", "A dark-matter skeptic of MOND"],
  ["open-weight-ai-models", 1, "supporter", "A supporter of the irreversibility claim"],
  ["open-weight-ai-models", 1, "skeptic", "Someone arguing irreversibility is overstated"],
  ["return-to-office-productivity", 0, "supporter", "A remote-work supporter"],
  ["return-to-office-productivity", 0, "skeptic", "An RTO supporter"],
  ["return-to-office-productivity", 2, "supporter", "Someone who believes RTO mandates are mostly a cover"],
  ["return-to-office-productivity", 2, "skeptic", "Someone who takes companies' productivity rationale"],
  ["ai-content-labeling", 0, "supporter", "If a new generation of watermarks"],
  ["ai-content-labeling", 0, "skeptic", "A skeptic confident watermarks work"],
  ["ai-content-labeling", 1, "supporter", "A supporter who fears chilling effects"],
  ["ai-content-labeling", 1, "skeptic", "A skeptic who thinks labeling is harmless"],
  ["central-bank-digital-currency", 1, "supporter", "If a controlled multi-country comparison"],
  ["central-bank-digital-currency", 1, "skeptic", "A skeptic who points to M-Pesa"],
  ["simulation-hypothesis", 2, "supporter", "A supporter who reads physics as 'computational' should treat the proposal as testable"],
  ["simulation-hypothesis", 2, "skeptic", "A skeptic should weigh that the cited 'computational' features"],
  ["encryption-backdoors", 0, "supporter", "A skeptic of secure backdoors"],
  ["encryption-backdoors", 0, "skeptic", "A proponent should weigh"],
  ["encryption-backdoors", 1, "supporter", "A skeptic of mandated access"],
  ["encryption-backdoors", 1, "skeptic", "A proponent should weigh"],
  ["encryption-backdoors", 2, "skeptic", "A proponent should weigh"],
  ["section-230-reform", 1, "supporter", "A supporter of the 'collateral damage' worry"],
  ["section-230-reform", 1, "skeptic", "A skeptic of the over-removal worry"],
  ["section-230-reform", 2, "supporter", "A supporter of the 'repeal entrenches incumbents' argument"],
  ["section-230-reform", 2, "skeptic", "A skeptic should weigh that defending even meritless suits"],
  ["us-national-debt-crisis", 2, "supporter", "A supporter who counts on enduring dollar privilege"],
  ["us-national-debt-crisis", 2, "skeptic", "A skeptic forecasting de-dollarization"],
  ["congressional-term-limits", 2, "supporter", "If a term-limits amendment cleared"],
  ["congressional-term-limits", 2, "skeptic", "A skeptic who assumes overwhelming public support"],
  ["facial-recognition-policing", 2, "supporter", "A supporter of regulation-not-ban"],
  ["facial-recognition-policing", 2, "skeptic", "A skeptic favoring hard restriction"],
  ["ai-deepfakes-truth-collapse", 2, "supporter", "If adoption tracking showed C2PA stalling"],
  ["ai-deepfakes-truth-collapse", 2, "skeptic", "A skeptic who thinks the transition is hopeless"],
];

const ADDRESSES: Record<"supporter" | "skeptic", RegExp> = {
  supporter: /^An? (?:[\w-]+ )?supporter\b/,
  skeptic: /^A skeptic\b/,
};

describe("legacy crux flips address their own side", () => {
  it.each(FIXED_FLIPS)("%s pillar %i %s flip", async (id, pillar, side, oldOpening) => {
    const topic = await loadTopicById(id);
    expect(topic, id).not.toBeNull();
    const flip = legacyTopicPage(topic!).cruxes[pillar].flips![side];

    expect(flip.startsWith(oldOpening)).toBe(false);
    expect(flip).toMatch(ADDRESSES[side]);
  });
});

describe("legacy position cards file each side's text on its own side", () => {
  it.each(WRONG_SIDE_OPENINGS)("%s pillar %i", async (id, pillar, opening) => {
    const topic = await loadTopicById(id);
    expect(topic, id).not.toBeNull();
    const cards = legacyTopicPage(topic!).page.positions;
    const supporters = cards.find((c) => c.id === "supporters")!;
    const skeptics = cards.find((c) => c.id === "skeptics")!;

    expect(supporters.full[pillar].text.startsWith(opening)).toBe(false);
    expect(skeptics.full[pillar].text.startsWith(opening)).toBe(true);
  });
});

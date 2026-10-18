import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { MAP_COUNT } from "@/data/topicIndex";
import { EXAMPLE_ANALYSIS_TEXT } from "@/lib/constants";
import { DISAGREEMENT_EXAMPLE_SOURCE } from "@/lib/disagreement/constants";
import type { Pillar } from "@/lib/schemas/topic";
import { EXPECTED_MAP_COUNT } from "./mapDocuments";
import type { RankedMap } from "./mapIndex";
import { decideMatch, findMaps, getMapIndex, MAP_MATCH, pickPillars } from "./maps";
import { ASSISTED_LIVING_PASTE, LEGACY_NUCLEAR_EXAMPLE, NUCLEAR_PASTE } from "./testPastes";

/**
 * A ranking with the given scores. Every word of the paste is scored, so
 * coverage follows `ceiling`. Unless `exclusive` says otherwise, the maps
 * share no words, so the lead on the words where two maps differ is the plain
 * ratio of their scores.
 */
function ranking(scores: number[], ceiling = 100, exclusive?: (a: string, b: string) => number) {
  const ranked: RankedMap[] = scores.map((score, index) => ({
    id: `map-${index}`,
    title: `Map ${index}`,
    claim: "A claim.",
    score,
    wordScore: score,
    wordsMatched: 3,
  }));
  const byId = new Map(ranked.map((map) => [map.id, map.score]));
  const exclusiveLead =
    exclusive ?? ((a: string, b: string) => (byId.get(a) ?? 0) / (byId.get(b) ?? 1));
  return { ranked, ceiling, exclusiveLead };
}

const noSiblings = () => false;
/** map-0 and map-1 are siblings (the two nuclear-power maps, say). */
const zeroAndOne = (a: string, b: string) =>
  a !== b && [a, b].every((id) => id === "map-0" || id === "map-1");

function pillar(id: string, text: string): Pillar {
  return {
    id,
    title: text,
    short_summary: "",
    icon_name: "Target",
    skeptic_premise: "",
    proponent_rebuttal: "",
    crux: {
      id: `crux-${id}`,
      title: "",
      description: "",
      methodology: "",
      verification_status: "theoretical",
      cost_to_verify: "",
    },
  };
}

describe("decideMatch", () => {
  it("names the top map when it leads the best map on a different subject", () => {
    const decision = decideMatch(ranking([40, 20, 12, 10]), noSiblings);
    expect(decision.named?.id).toBe("map-0");
    expect(decision.lead).toBe(2);
  });

  it("refuses a top map whose lead comes from the words it shares with the rival", () => {
    // 40 against 25 overall, but on the words where the two differ, 1.5 to 1.
    const decision = decideMatch(ranking([40, 25, 10], 100, () => 1.5), noSiblings);
    expect(decision.named).toBeNull();
    expect(decision.exclusiveLead).toBe(1.5);
    // The same scores, the rival's words all shared with the top map: named.
    expect(decideMatch(ranking([40, 25, 10], 100, () => Infinity), noSiblings).named?.id).toBe("map-0");
  });

  it("never names a near tie, however the words split", () => {
    expect(decideMatch(ranking([30, 25, 10], 100, () => Infinity), noSiblings).named).toBeNull();
  });

  it("refuses a top map that barely leads, and offers the closest maps instead", () => {
    const decision = decideMatch(ranking([26.5, 26.4, 26.1, 22.6, 21, 20]), noSiblings);
    expect(decision.named).toBeNull();
    expect(decision.closest.map((map) => map.id)).toEqual(["map-0", "map-1", "map-2"]);
  });

  it("does not count a sibling against the top map, and shows it as closely related", () => {
    // The live-site failure: two nuclear maps close together, the rest well behind.
    const scores = [24, 23, 11, 10];
    expect(decideMatch(ranking(scores), noSiblings).named).toBeNull();
    const decision = decideMatch(ranking(scores), zeroAndOne);
    expect(decision.named?.id).toBe("map-0");
    expect(decision.related.map((map) => map.id)).toEqual(["map-1"]);
    expect(decision.rival?.id).toBe("map-2");
  });

  it("uses word coverage to resolve a tiny sibling phrase-bonus tie", () => {
    const tied = ranking([40, 39.8, 10]);
    tied.ranked[0].wordScore = 30;
    tied.ranked[1].wordScore = 35;
    expect(decideMatch(tied, zeroAndOne).named?.id).toBe("map-1");
    expect(decideMatch(tied, noSiblings).named).toBeNull();
    const separated = ranking([40, 37, 10]);
    separated.ranked[0].wordScore = 30;
    separated.ranked[1].wordScore = 35;
    expect(decideMatch(separated, zeroAndOne).named?.id).toBe("map-0");
    tied.ranked[1].wordScore = 31;
    expect(decideMatch(tied, zeroAndOne).named?.id).toBe("map-0");
  });

  it("does not overturn a specific sibling name preference with the word-coverage tie rule", () => {
    const tied = ranking([40, 39.8, 39.6, 10]);
    tied.ranked[0].wordScore = 30;
    tied.ranked[1].wordScore = 32;
    tied.ranked[2].wordScore = 35;
    const names = (id: string) => id === "map-1"
      ? new Set(["generic", "specific", "name"])
      : new Set(["generic"]);
    const siblings = (a: string, b: string) => [a, b].every((id) => id !== "map-3");
    expect(decideMatch(tied, siblings, names, undefined, undefined, undefined, "map-2").named?.id).toBe("map-1");
  });

  it("uses an article's opening to distinguish close siblings without overriding a clear full-text lead", () => {
    const close = ranking([40, 37, 10]);
    expect(decideMatch(close, zeroAndOne, undefined, undefined, undefined, undefined, "map-1").named?.id).toBe("map-1");
    expect(decideMatch(ranking([40, 20, 10]), zeroAndOne, undefined, undefined, undefined, undefined, "map-1").named?.id).toBe("map-0");
    expect(decideMatch(close, noSiblings, undefined, undefined, undefined, undefined, "map-1").named).toBeNull();
  });

  it("needs enough of the paste behind the map: a score floor, or a share of its words", () => {
    const low = MAP_MATCH.minScore - 2;
    expect(low).toBeGreaterThanOrEqual(MAP_MATCH.minShortScore);
    // Leads clearly, but a low score on a long paste: not named.
    expect(decideMatch(ranking([low, 3], 100), noSiblings).named).toBeNull();
    // The same score on a short paste it mostly accounts for: named.
    expect(decideMatch(ranking([low, 3], low / MAP_MATCH.minCoverage), noSiblings).named?.id).toBe("map-0");
  });

  it("names a short paste's map when the paste uses a rare word only that map's name has", () => {
    // 5.25 against 2.84, coverage 0.27: the microplastics paste of r9 review #2.
    const scores = [5.25, 2.84];
    const ownZero = (id: string) => id === "map-0";
    expect(decideMatch(ranking(scores, 19.4, () => 1.85), noSiblings).named).toBeNull();
    expect(decideMatch(ranking(scores, 19.4, () => 1.85), noSiblings, undefined, undefined, ownZero).named?.id).toBe("map-0");
    // Never on a near tie, and never under the short-paste score.
    expect(decideMatch(ranking([5.25, 4.5], 19.4), noSiblings, undefined, undefined, ownZero).named).toBeNull();
    const tiny = MAP_MATCH.minShortScore - 1;
    expect(decideMatch(ranking([tiny, 1], 19.4), noSiblings, undefined, undefined, ownZero).named).toBeNull();
  });

  it("lists a map on another subject only when the paste uses a telling word of its name", () => {
    const sharesName = (id: string) => id !== "map-1";
    const beside = decideMatch(ranking([40, 25, 22], 100, () => Infinity), noSiblings, undefined, undefined, undefined, sharesName);
    expect(beside.named?.id).toBe("map-0");
    expect(beside.closest.map((map) => map.id)).toEqual(["map-2"]);
    const instead = decideMatch(ranking([26.5, 26.4, 26.1, 22.6]), noSiblings, undefined, undefined, undefined, sharesName);
    expect(instead.closest.map((map) => map.id)).toEqual(["map-0", "map-2", "map-3"]);
  });

  it("never names a map on one borrowed word, however much of a short paste it covers", () => {
    const tiny = MAP_MATCH.minShortScore - 1;
    expect(decideMatch(ranking([tiny, 1], tiny), noSiblings).named).toBeNull();
  });

  it("names nothing and lists nothing when the best overlap is a word or two", () => {
    const decision = decideMatch(ranking([4, 3, 2], 100), noSiblings);
    expect(decision.named).toBeNull();
    expect(decision.closest).toEqual([]);
  });

  it("lists nothing when the overlap is a thin slice of a long text", () => {
    // Scores high on raw words, but the maps account for a tenth of the paste.
    const decision = decideMatch(ranking([20, 19.5, 19], 200), noSiblings);
    expect(decision.named).toBeNull();
    expect(decision.coverage).toBeLessThan(MAP_MATCH.closestCoverage);
    expect(decision.closest).toEqual([]);
  });

  it("lists nothing when one map stood clear but had too little behind it to be named", () => {
    // Clear of every other subject, too thin to name: listing it would name it anyway.
    const decision = decideMatch(ranking([11, 5], 40), noSiblings);
    expect(decision.named).toBeNull();
    expect(decision.lead).toBeGreaterThanOrEqual(MAP_MATCH.minLead);
    expect(decision.closest).toEqual([]);
  });

  it("names nothing, and lists nothing, when the clear winner is off its subject", () => {
    const offZero = (id: string) => id === "map-0";
    const decision = decideMatch(ranking([40, 20, 12, 10]), noSiblings, undefined, offZero);
    expect(decision.named).toBeNull();
    expect(decision.closest).toEqual([]);
    expect(decision.top?.id).toBe("map-0");
    // Another map being off its subject changes nothing.
    expect(decideMatch(ranking([40, 20, 12, 10]), noSiblings, undefined, (id) => id === "map-1").named?.id).toBe("map-0");
  });

  it("does not let a ruled-out rival block an eligible leader", () => {
    const decision = decideMatch(ranking([26, 25, 12, 10]), noSiblings, undefined, (id) => id === "map-1");
    expect(decision.named?.id).toBe("map-0");
    expect(decision.rival?.id).toBe("map-2");
    expect(decision.closest.map((map) => map.id)).not.toContain("map-1");
  });

  it("cannot switch a matched leader to a sibling ruled out by its subject", () => {
    const decision = decideMatch(
      ranking([40, 35, 10]), (a, b) => [a, b].every((id) => ["map-0", "map-1"].includes(id)),
      (id) => new Set(id === "map-1" ? ["school", "test"] : []),
      (id) => id === "map-1",
    );
    expect(decision.named?.id).toBe("map-0");
    expect(decision.related).toEqual([]);
  });

  it("does not use an off-subject leader to justify weaker closest maps", () => {
    const decision = decideMatch(ranking([26, 25, 20]), noSiblings, undefined, (id) => id === "map-0");
    expect(decision.named).toBeNull();
    expect(decision.closest).toEqual([]);
  });

  it("keeps an independently qualified original finalist when an ambiguous leader is off subject", () => {
    const decision = decideMatch(
      ranking([26, 25, 20]), noSiblings,
      (id) => new Set(id === "map-1" ? ["vaccine"] : []),
      (id) => id === "map-0",
    );
    expect(decision.named).toBeNull();
    expect(decision.closest.map((map) => map.id)).toEqual(["map-1"]);
  });

  it("does not look beyond the original finalists after rejecting their subjects", () => {
    const decision = decideMatch(
      ranking([26, 25, 24, 23]), noSiblings, () => new Set(["subject"]),
      (id) => id !== "map-3",
    );
    expect(decision.closest).toEqual([]);
  });

  it.each([
    { scores: [8, 7, 6], ceiling: 10, sharesName: true },
    { scores: [26, 25, 20], ceiling: 200, sharesName: true },
    { scores: [26, 25, 20], ceiling: 100, sharesName: false },
  ])("requires the finalist's own score, coverage and telling subject word: %j", ({ scores, ceiling, sharesName }) => {
    const decision = decideMatch(
      ranking(scores, ceiling), noSiblings, () => new Set(["subject"]),
      (id) => id === "map-0", undefined, () => sharesName,
    );
    expect(decision.named).toBeNull();
    expect(decision.closest).toEqual([]);
  });

  it("does not backfill a filtered closest candidate with a weaker map", () => {
    const decision = decideMatch(ranking([26, 25, 20, 19]), noSiblings, undefined, (id) => id === "map-1");
    expect(decision.closest.map((map) => map.id)).toEqual(["map-0", "map-2"]);
  });

  it("never shows more than three maps", () => {
    const decision = decideMatch(ranking([60, 55, 50, 30, 29, 28]), (a, b) => a !== b && [a, b].every((id) => ["map-0", "map-1", "map-2"].includes(id)));
    expect(1 + decision.related.length + decision.closest.length).toBeLessThanOrEqual(MAP_MATCH.maxMaps);
  });

  it("is empty for an empty ranking", () => {
    expect(decideMatch({ ranked: [], ceiling: 0, exclusiveLead: () => 0 }, noSiblings).named).toBeNull();
  });
});

describe("pickPillars", () => {
  const pillars = [
    pillar("a", "Labor market wages elasticity"),
    pillar("b", "Fiscal cost taxes welfare budget"),
  ];
  // Every word as rare as any other across the maps.
  const flatIdf = () => 3;
  const ids = (text: string) => pickPillars(pillars, text, flatIdf).map((picked) => picked.id);

  it("opens at the map's lead crux when the paste says nothing that tells the cruxes apart", () => {
    expect(ids("the weather was lovely today")).toEqual(["a"]);
  });

  it("shows the one crux the paste is about when it clearly leads", () => {
    expect(ids("the fiscal cost: taxes, welfare and the budget")).toEqual(["b"]);
    expect(ids("labor market elasticity and wages")).toEqual(["a"]);
  });

  it("shows the two leaders, best first, when neither clearly leads", () => {
    expect(ids("wages and the budget")).toEqual(["a", "b"]);
    // A tie keeps the map's order.
    expect(ids("the budget and wages")).toEqual(["a", "b"]);
  });

  it("does not let a long crux win on raw word counts", () => {
    const long = pillar(
      "long",
      "Rent control supply construction landlords developers buildings units market economists returns conversion",
    );
    const short = pillar("short", "Displacement of families from neighborhoods");
    // The long crux shares two words, the short one two rarer, closer ones.
    const picked = pickPillars([long, short], "rent control keeps families in their neighborhoods", flatIdf);
    expect(picked[0]?.id).toBe("short");
  });
});

describe("findMaps", () => {
  it("opens the rent-control map for a rent-control paste, not the broader housing map", async () => {
    // The standalone smoke test's paste. Both maps discuss rent control and
    // score close; the paste uses the rent-control map's own name words and
    // none that only the housing map's name has.
    const result = await findMaps(
      "Rent control protects tenants from being priced out. Economists answer that it reduces supply and landlords stop maintaining buildings.",
    );
    expect(result.match?.id).toBe("rent-control-effectiveness");
    expect(result.related.map((map) => map.id)).toContain("housing-affordability-crisis");
  });

  it("keeps a nuclear-power article on the nuclear map although it mentions small modular reactors", async () => {
    for (const text of [EXAMPLE_ANALYSIS_TEXT, LEGACY_NUCLEAR_EXAMPLE]) {
      const result = await findMaps(text);
      expect(result.match?.id).toBe("nuclear-energy-safety");
    }
  });

  // The first paste in a process reads every map to build the index.
  beforeAll(() => getMapIndex(), 60_000);

  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => {
        throw new Error("no network");
      }),
    );
  });
  afterEach(() => vi.unstubAllGlobals());

  it("searches the pillar maps and the flagship maps", async () => {
    const result = await findMaps(DISAGREEMENT_EXAMPLE_SOURCE);
    expect(result.reading.mapsSearched).toBe(EXPECTED_MAP_COUNT);
    expect(EXPECTED_MAP_COUNT).toBeGreaterThan(150);
    // The count the home page and the health probe give (r9 review #15).
    expect(EXPECTED_MAP_COUNT).toBe(MAP_COUNT);
  });

  it("returns at most three maps and never repeats the match as a closest map", async () => {
    for (const text of [DISAGREEMENT_EXAMPLE_SOURCE, EXAMPLE_ANALYSIS_TEXT]) {
      const result = await findMaps(text);
      const ids = [
        result.match?.id,
        ...result.related.map((map) => map.id),
        ...result.closest.map((map) => map.id),
      ].filter(Boolean);
      expect(ids.length).toBeLessThanOrEqual(MAP_MATCH.maxMaps);
      expect(new Set(ids).size).toBe(ids.length);
    }
    expect(fetch).not.toHaveBeenCalled();
  });

  it("copies the crux and cards from the map, and links the crux anchor", async () => {
    const result = await findMaps(DISAGREEMENT_EXAMPLE_SOURCE);
    const match = result.match;
    expect(match?.id).toBe("immigration-wage-impact");
    // Worded as the topic page words it: the pillar's authored crux question.
    expect(match?.crux?.question).toMatch(/^Does immigration barely move the wages of directly competing workers/);
    expect(match?.crux?.href).toBe("/topics/immigration-wage-impact#crux-labor-market-economics");
    expect(match?.cards.length).toBe(2);
  });

  it("shows a card on each side when the crux's own evidence is one-sided", async () => {
    // r9 live review #7: the Section 230 paste's crux has only "yes" cards,
    // and was shown two of them under "The strongest card on each side".
    const result = await findMaps(
      "Platforms want it both ways. They curate and algorithmically promote content like a publisher but claim they're just a neutral bulletin board when someone sues. Strip their immunity and watch how fast they moderate.",
    );
    expect(result.match?.id).toBe("section-230-reform");
    expect(new Set(result.match?.cards.map((card) => card.side))).toEqual(new Set(["for", "against"]));
  });

  it("offers no AI-education map for a choice between human and online piano lessons", async () => {
    const result = await findMaps("My parents want us to send our child to a private piano teacher. I prefer an online course because it is cheaper and easier to fit around school.");
    expect(result.match).toBeNull();
    expect(result.closest).toEqual([]);
  });

  it.each([
    {
      subject: "streaming access",
      id: "net-neutrality",
      text: "My broadband company wants to charge streaming sites for faster access to customers. I think providers should deliver all lawful traffic equally. Otherwise small websites cannot compete with the video service the ISP owns.",
    },
    {
      subject: "paid internet fast lanes",
      id: "net-neutrality",
      text: "My ISP says it needs paid fast lanes for websites to fund better networks. I worry it will slow competing video streams and favor its own services.",
    },
    {
      subject: "hair-braiding licenses",
      id: "occupational-licensing-reform",
      text: "You should not need hundreds of hours of beauty school and a government license just to braid hair. Salon owners say those rules protect customers; opponents say they keep new competitors out.",
    },
    {
      subject: "job licensing requirements",
      id: "occupational-licensing-reform",
      text: "States should reduce job licensing requirements for barbers and hair braiders. Training can protect customers, but expensive classes and fees may exclude people who already know the trade.",
    },
    {
      subject: "drug possession penalties",
      id: "drug-decriminalization",
      text: "Should people go to prison for possessing small amounts of heroin? I think treatment is better than punishment. My friend worries that dropping criminal penalties will encourage open drug use.",
    },
    {
      subject: "policing and mental-health calls",
      id: "police-reform",
      text: "We should send mental-health teams instead of armed police to crisis calls. My neighbor says trained officers are still needed when a situation turns violent, but I think the police budget should fund social services.",
    },
  ])("finds the map for everyday wording about $subject", async ({ id, text }) => {
    const result = await findMaps(text);
    expect(result.match?.id).toBe(id);
    expect(result.closest).toEqual([]);
  });

  it.each([
    ["wedding hairstyles", "My sister wants me to braid her hair for a wedding. I prefer loose curls because braids pull too tightly."],
    ["a billing dispute", "My internet provider overcharged me for last month. I think they should refund the difference. They say the promotional price expired."],
    ["a theme-park queue", "We need to book the fast lane pass at the theme park. I think it is unfair if people pay extra to skip the queue."],
    ["haircut prices", "Salons in our town are charging too much for haircuts. My friend says we should cut our own hair instead."],
  ])("offers no policy map for %s", async (_, text) => {
    const result = await findMaps(text);
    expect(result.match).toBeNull();
    expect(result.closest).toEqual([]);
  });

  it.each([
    "Schools should use AI tutors to close achievement gaps. Critics worry students will rely on generated answers instead of learning to think.",
    "ChatGPT can give each student individual feedback, but teachers worry that it makes cheating and cognitive offloading too easy.",
    "Should schools use large language models for tutoring and feedback? Some say every child could get a personal tutor. Others worry they undermine independent thinking and academic integrity.",
    "Khanmigo could give students individual tutoring and help disadvantaged children catch up. Critics worry it gives away answers and undermines learning.",
  ])("keeps actual AI-education disagreements on their map: %s", async (text) => {
    expect((await findMaps(text)).match?.id).toBe("ai-in-education");
  });

  it.each([
    ["academic-integrity", "My daughter uses ChatGPT to write her essays. I say she is skipping the thinking that school is meant to teach, but her teacher says the tool can help her learn if she explains each revision."],
    ["academic-integrity", "My son has ChatGPT write every homework essay. His teacher says AI feedback helps him learn, but I worry he will never be able to write without it."],
    ["learning-outcomes", "AI tutors could finally give low-income students the personal help wealthy families pay for. Others worry these tools will reach rich schools first and widen achievement gaps."],
    ["teacher-role-implementation", "Schools are buying AI tools to reduce teacher workloads. I worry districts will use the savings to replace teachers rather than let them spend more time with students."],
  ])("opens the relevant AI-education crux, %s: %s", async (pillarId, text) => {
    const result = await findMaps(text);
    expect(result.match?.id).toBe("ai-in-education");
    expect(result.match?.crux?.href).toBe(`/topics/ai-in-education#crux-${pillarId}`);
    expect(result.match?.alsoCrux).toBeUndefined();
  });

  it.each([
    "Will automation and chatbots take office jobs faster than workers can retrain? Some people expect mass unemployment, while others expect new kinds of work.",
    "Could large language models cause mass unemployment by automating office jobs? Some expect falling demand for junior workers. Others expect higher productivity to create new jobs and expand output.",
  ])("keeps AI-employment arguments on their map: %s", async (text) => {
    expect((await findMaps(text)).match?.id).toBe("ai-mass-unemployment");
  });

  it("still offers the AI-employment map for a broader hiring question about language models", async () => {
    const result = await findMaps("Could large language models reduce hiring for junior office workers? The dispute is whether productivity leads firms to hire fewer people or expand output.");
    expect([result.match?.id, ...result.closest.map((map) => map.id)]).toContain("ai-mass-unemployment");
  });

  it("offers no closest maps for a family argument no map covers", async () => {
    const result = await findMaps(ASSISTED_LIVING_PASTE);
    expect(result.status).toBe("none");
    expect(result.match).toBeNull();
    expect(result.closest).toEqual([]);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("still names the nuclear map for the live-site nuclear paste", async () => {
    const result = await findMaps(NUCLEAR_PASTE);
    expect(result.status).toBe("matched");
    expect(result.match?.id).toBe("nuclear-energy-safety");
  });

  it("does not name the artificial-wombs map for an abortion argument, but does for artificial wombs", async () => {
    const abortion = await findMaps(
      "A: Life begins at conception and abortion ends a human life. B: A woman has the right to decide what happens to her own body. A: Rights don't include ending someone else's life.",
    );
    expect(abortion.match).toBeNull();
    expect(abortion.closest.map((map) => map.id)).not.toContain("artificial-reproduction-ethics");
    const wombs = await findMaps(
      "If artificial wombs can carry a fetus from 22 weeks, viability no longer depends on the mother's body, and the abortion debate changes.",
    );
    expect(wombs.match?.id).toBe("artificial-reproduction-ethics");
  });

  it.each([
    "Landlords may raise rent only 5% each year.",
    "We should prevent steep annual rent hikes. Families cannot stay in their apartments if landlords double the rent, but owners say they need to cover rising costs.",
  ])("retains a rent-limit paraphrase without the words rent control: %s", async (text) => {
    expect((await findMaps(text)).match?.id).toBe("rent-control-effectiveness");
  });

  it("keeps personal rent-increase advice separate from rent-limit policy", async () => {
    const result = await findMaps(
      "My landlord raised the rent by thirty percent. I cannot afford the new price and have to move. Can I get my deposit back?",
    );
    expect(result.status).toBe("none");
    expect(result.closest).toEqual([]);
  });

  it("does not offer phone maps for a school-uniform policy dispute", async () => {
    const result = await findMaps("Should schools make kids wear uniforms? It stops the brand-name competition and bullying over clothes, but it costs parents more and kids hate them.");
    expect(result.status).toBe("none");
    expect(result.closest).toEqual([]);
  });

  it.each([
    ["surrogacy", "My sister wants to hire a surrogate to carry her baby. I think paying someone for pregnancy exploits women with less money, but she says consenting adults should be free to make that choice."],
    ["school start times", "Our teenager is exhausted when school starts at 7:20. I want classes to begin later so students can sleep, but the district says buses and after-school sports make that impossible."],
    ["a family pregnancy decision", "My partner wants another baby, but I worry pregnancy will damage my health and we cannot afford childcare. He thinks the choice should be ours rather than dictated by money."],
    ["a school bus schedule", "The district wants children at the bus stop before dawn. Parents want a later start so students can sleep, but coaches say it would mean cutting after-school sports."],
  ])("offers no health or college-policy map for %s", async (_, text) => {
    const result = await findMaps(text);
    expect(result.status).toBe("none");
    expect(result.match).toBeNull();
    expect(result.closest).toEqual([]);
  });

  it.each([
    ["holiday rentals", "Our town should ban short-term holiday rentals. Every apartment that becomes an Airbnb leaves one fewer home for local residents. Hosts say tourists support restaurants and that owners have the right to rent their property."],
    ["bus timetables", "Parents want school buses to arrive later so children can sleep. The district says changing the timetable would disrupt after-school activities."],
  ])("does not promote a nearby map after exclusions for %s", async (_, text) => {
    const result = await findMaps(text);
    expect(result.status).toBe("none");
    expect(result.closest).toEqual([]);
  });

  it.each([
    ["homeschooling-effectiveness", "Home education lets parents adapt lessons to each child, but children might miss learning alongside classmates in school."],
    ["global-housing-bubble", "House prices are far above local wages and buyers are borrowing more than they can repay. If mortgage rates stay high, could the property bubble burst?"],
    ["declining-birth-rates", "People are having fewer children because housing and childcare cost so much. Should the government pay families to have babies, or should we accept a smaller population?"],
  ])("retains the covered subject after exclusions: %s", async (id, text) => {
    const result = await findMaps(text);
    expect([result.match?.id, ...result.closest.map((map) => map.id)]).toContain(id);
  });

  it("does not suggest space exploration through an invented cost-government phrase", async () => {
    const result = await findMaps(
      "People are having fewer children because housing and childcare cost so much. Should the government pay families to have babies, or should we accept a smaller population?",
    );
    expect(result.match?.id).toBe("declining-birth-rates");
    expect(result.closest).toEqual([]);
  });

  it.each([
    ["fluoride-water-supplies", "Our town wants to stop adding fluoride to drinking water because children swallow it. Dentists say it prevents cavities and people can already use toothpaste."],
    ["rfk-health-policy", "RFK says the childhood vaccine schedule has not been properly tested. Doctors say changing established recommendations puts children at risk. The disagreement is whether his MAHA agenda improves public health."],
    ["rfk-health-policy", "Removing every member of the vaccine advisory committee will free it from pharmaceutical industry influence. Doctors say replacing the panel with vaccine skeptics will undermine public trust."],
    ["student-debt-forgiveness", "The government should cancel student loans because graduates cannot afford homes or start families. My brother says taxpayers who skipped college should not have to pay off someone else's debt."],
    ["affirmative-action-meritocracy", "Universities should consider race in admissions to offset unequal opportunities. My colleague says applicants should be judged on their own merit rather than their racial background."],
    ["standardized-testing-debate", "Universities should bring back the SAT because test scores predict academic performance. Critics say standardized tests favor wealthy families who can afford expensive preparation."],
  ])("retains the covered subject for %s", async (id, text) => {
    const result = await findMaps(text);
    expect(result.match?.id).toBe(id);
    expect(result.closest).toEqual([]);
  });

  it.each([
    "Our school should require routine childhood vaccines to protect vulnerable children. Another parent says the government cannot force a medical procedure on their child.",
    "Schools should require routine childhood immunizations before children can attend classes. Parents say their medical choices are private and the state should not be allowed to impose vaccination.",
  ])("offers the vaccine-requirements map without unrelated childhood-health maps: %s", async (text) => {
    const result = await findMaps(text);
    expect([result.match?.id, ...result.closest.map((map) => map.id)].filter(Boolean)).toEqual(["vaccine-mandates"]);
    expect(result.related).toEqual([]);
  });

  it("retains artificial reproduction and charging road vehicles without their exact map names", async () => {
    const reproduction = await findMaps(
      "An ectogenesis device could let premature babies grow outside the body. Is that technology safe enough to use in a neonatal unit?",
    );
    expect(reproduction.match?.id).toBe("artificial-reproduction-ethics");
    const roadCharge = await findMaps(
      "It should cost drivers money to bring a car into the center of the city. Charging vehicles at the busiest times could pay for faster buses.",
    );
    expect(roadCharge.match?.id).toBe("congestion-pricing");
  });

  it.each([
    "Our city should charge drivers to enter downtown during rush hour. It would cut gridlock and pay for buses. My neighbor says it just prices working people off roads they already paid for.",
    "The city should charge people for driving downtown at peak times. The money would improve public transportation. Critics say commuters without a bus alternative would be unfairly punished.",
    "Drivers should pay an entry fee to get into the city center. It would keep the streets moving and fund reliable buses, but outer neighborhoods have few alternatives.",
    "Charging motorists to enter busy central streets will ease gridlock. My colleague thinks it will hurt small shops because customers will go elsewhere.",
  ])("finds congestion pricing when the charge is described through drivers: %s", async (text) => {
    const result = await findMaps(text);
    expect(result.match?.id).toBe("congestion-pricing");
    expect(result.match?.crux?.href).toMatch(/^\/topics\/congestion-pricing#crux-/);
    expect(result.closest).toEqual([]);
  });

  it.each([
    "Public transit should be free. Charging bus fares punishes poor riders while drivers get subsidized roads. The city says eliminating fares would leave no money for reliable service and that frequency matters more than price.",
    "The delivery company wants to charge drivers for parcels that go missing. Drivers say they should not have to pay for customers making false claims, while the company says it needs to recover the cost.",
    "Drivers should pay a fee for renewing their license every year instead of every five years. I think the paperwork is pointless, but my friend says regular vision checks keep everyone safer.",
  ])("does not treat unrelated fares or driver charges as congestion pricing: %s", async (text) => {
    const result = await findMaps(text);
    expect([result.match?.id, ...result.related.map((map) => map.id), ...result.closest.map((map) => map.id)])
      .not.toContain("congestion-pricing");
  });

  it.each([
    "Lab-grown diamonds avoid blood diamonds and exploited workers, so they are the ethical choice. But mined diamonds support livelihoods in Botswana and the conflict certification scheme has reduced abuses.",
    "Are lab diamonds really greener? Growing them takes enormous amounts of electricity, often from coal, while extracting natural stones tears up land. We need to compare their full carbon footprint rather than just advertising claims.",
    "Buying a mined diamond helps support Botswana's economy. If everyone buys factory-grown stones instead, what happens to the people whose livelihoods depend on diamond exports?",
    "A: I want a lab-grown diamond because I do not want my ring to finance wars or child labor. B: The Kimberley Process certifies mined diamonds, and lab-grown stones can be produced with coal power.",
    "The diamond industry says factory-made stones are sustainable. Is that true when production happens on dirty grids in China and India, or is mining still worse because it destroys land and water?",
  ])("retains the actual diamond ethics question: %s", async (text) => {
    expect((await findMaps(text)).match?.id).toBe("lab-diamonds-ethics");
  });

  it("keeps a factory-reactor article on SMRs when nuclear power is background context", async () => {
    const result = await findMaps(
      "Small modular reactors are supposed to be built on an assembly line and shipped to old coal sites. NuScale cancelled its Idaho project after the cost per megawatt-hour rose sharply. Without hundreds of orders, a factory cannot deliver the promised savings.\n\n" +
      "Nuclear energy supplies reliable low-carbon electricity, but the question here is whether these small reactors will be cheaper than the large plants, not whether nuclear power in general helps climate goals.",
    );
    expect(result.match?.id).toBe("nuclear-renaissance-smr");
  });

  it("names nothing for text with no words in common with any map", async () => {
    const result = await findMaps("Honestly this is exhausting. Can we just agree to disagree?");
    expect(result.status).toBe("none");
    expect(result.match).toBeNull();
    expect(result.closest).toEqual([]);
  });
});

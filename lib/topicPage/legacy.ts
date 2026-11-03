/**
 * Legacy pillar map (lib/schemas/topic.ts) → the one topic-page model.
 *
 * Deliberately NOT lib/argument/adapter.ts: that migration adapter drops the
 * falsification block and emits "[REQUIRES AUTHORING]" placeholder claims.
 * This one only rearranges text the map already has. It never writes a
 * sentence of its own about the topic:
 *
 *  - the crux "question" is the pillar's `live_disagreement` (where the real
 *    fight is), or the crux's own title when a map has no falsification data;
 *  - "what would settle it" is the crux test's description;
 *  - "what both sides agree on" is each crux's `common_ground`;
 *  - the two position cards quote the pillar texts, each shown once.
 *
 * Pure: no React, no data imports, so the page and its tests share it.
 */
import type { Evidence, Pillar, Topic } from "@/lib/schemas/topic";
import { calculateEvidenceScore } from "@/lib/evidenceMetrics";
import { mapDisplayTitle, sideWords, type SideWords } from "@/lib/mapNaming";
import { namesIn, sentenceCaseTitle, type MapNames } from "./sentenceCase";
import { stems } from "./settleContract";
import { DISTINCT_FROM_AGREED_FACT, DISTINCT_SUMMARY_FROM_AGREED_FACT } from "./agreedFacts.distinct";
import {
  STANDING_CONDITION_LEAD,
  type CruxEntryData,
  type PositionCardData,
  type RelatedMap,
  type TopicPageData,
} from "./model";

export interface LegacyEvidenceItem {
  id: string;
  side: "for" | "against";
  title: string;
  description: string;
  source?: string;
  sourceUrl?: string;
  /**
   * The card states a fact both sides already agree on (one of the map's
   * `common_ground` lines). It stays in the evidence list, but it is never
   * offered as a side's best card: the other side does not dispute it.
   */
  restatesAgreement?: boolean;
}

export interface LegacyCrux extends CruxEntryData {
  pillarId: string;
  /** This pillar's evidence, strongest first on each side. No scores. */
  evidence: LegacyEvidenceItem[];
  /**
   * The strongest card on each side that is not an agreed fact, for "The
   * other side's best card". Either can be missing; the reflection then shows
   * neither (never one side alone).
   */
  bestCards: { for?: LegacyEvidenceItem; against?: LegacyEvidenceItem };
  /**
   * The crux's test, for the fold and for Researcher mode. The map's
   * `cost_to_verify` is not carried: it is an unsourced estimate.
   */
  test: {
    title: string;
    methodology: string;
  };
}

/**
 * The "How the evidence weighs" fold. No reading of where the cards tip
 * ("evidence still divided") and no ranking word: one strong card from each
 * side, or nothing, never one side alone.
 */
export interface LegacyWeighing {
  strongest?: { forTitle: string; againstTitle: string };
}

export interface LegacyTopicPage {
  page: TopicPageData;
  cruxes: LegacyCrux[];
  weighing: LegacyWeighing;
  references: { title: string; url: string }[];
}

/** How testable the map says each crux is (glossary: "What Would Settle It"). */
const TESTABILITY: Record<Pillar["crux"]["verification_status"], string> = {
  verified: "A test that can be run on evidence that exists.",
  theoretical: "A proposed test; the result is not established on this map.",
  impossible: "A test that is practically impossible to run today.",
};

const MAX_AGREEMENT = 3;

/** Capitalised, with a closing full stop (as cruxPrimitives' asSentence; this module stays React-free). */
function asSentence(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return trimmed;
  const capped = trimmed[0].toUpperCase() + trimmed.slice(1);
  return /[.!?…]$/.test(capped) ? capped : `${capped}.`;
}

// Accent colours from the design system: rust names the proponent side and
// brown the skeptic, as everywhere else on the site.
const SUPPORTER_ACCENT = "#C4613C";
const SKEPTIC_ACCENT = "#8B5A3C";

const ABBREVIATION = /(?:\b[A-Z]|\b(?:vs|v|et al|etc|e\.g|i\.e|Dr|Mr|Mrs|Ms|St|No|Inc|Jr|Sr|Co|Corp|Gov|Sen|Rep|approx|U\.S|U\.K|U\.N))$/;

/**
 * The first sentence of an authored paragraph, verbatim. Splits only at a
 * full stop followed by a capitalised word, and never after an abbreviation
 * ("U.S.", "vs.", "Dr."), so a figure like "~0.03 deaths vs. 24.6" survives.
 */
export function firstSentence(text: string): string {
  const trimmed = text.trim();
  const boundary = /([.!?])(["”’')]?)\s+(?=["“‘(]?[A-Z0-9])/g;
  let match: RegExpExecArray | null;
  while ((match = boundary.exec(trimmed)) !== null) {
    const end = match.index + match[1].length + match[2].length;
    const before = trimmed.slice(0, match.index);
    if (match[1] === "." && ABBREVIATION.test(before)) continue;
    return trimmed.slice(0, end);
  }
  return trimmed;
}

/** Count distinct cited sources across references and every evidence card. */
export function countSources(topic: Topic): number {
  const seen = new Set<string>();
  for (const ref of topic.references ?? []) {
    seen.add((ref.url ?? ref.title).toLowerCase());
  }
  for (const ev of [...topic.pillars.flatMap((p) => p.evidence ?? []), ...(topic.evidence ?? [])]) {
    const key = ev.sourceUrl ?? ev.source;
    if (key) seen.add(key.toLowerCase());
  }
  return seen.size;
}

function byWeight(a: Evidence, b: Evidence): number {
  return calculateEvidenceScore(b.weight) - calculateEvidenceScore(a.weight);
}

/**
 * The map's names, read from its prose and its source lines (never its
 * titles): a name the map capitalises keeps its capital in a card title.
 */
function topicNames(topic: Topic): MapNames {
  const evidence = [...topic.pillars.flatMap((p) => p.evidence ?? []), ...(topic.evidence ?? [])];
  const prose = [
    topic.meta_claim,
    topic.question ?? "",
    ...(topic.simple_case ?? []),
    topic.keystone_fact?.statement ?? "",
    ...topic.pillars.flatMap((p) => {
      const f = p.crux.falsification;
      return [
        p.short_summary,
        p.skeptic_premise,
        p.proponent_rebuttal,
        p.crux.question ?? "",
        p.crux.description,
        p.crux.methodology,
        f?.live_disagreement ?? "",
        f?.common_ground ?? "",
        f?.supporter_flip ?? "",
        f?.skeptic_flip ?? "",
      ];
    }),
    ...evidence.flatMap((e) => [e.description, e.reasoning ?? ""]),
    ...(topic.questions ?? []).map((q) => q.content),
  ];
  const sources = [topic.keystone_fact?.source ?? "", ...evidence.map((e) => e.source ?? "")];
  return namesIn(prose, sources);
}

/**
 * The map's card titles as every surface shows them (crux rows, the other
 * side's best card, the diagram, the paste result): sentence case, without a
 * closing full stop. See lib/topicPage/sentenceCase.ts.
 */
export function cardTitler(topic: Topic): (title: string) => string {
  const names = topicNames(topic);
  return (title) => sentenceCaseTitle(title.replace(/\.$/, ""), names);
}

// ---------------------------------------------------------------------------
// Agreed facts the cards repeat
// ---------------------------------------------------------------------------

/** The framing that opens an agreed fact ("Both sides agree that…"); not part of the fact. */
export const AGREEMENT_FRAME =
  /^both (?:sides|camps|cases)(?:['’])?(?: own figures)? (?:agree|accept|concede)s?(?: that)?\s*/i;

export const AGREED_FACT_THRESHOLDS = {
  /**
   * A card restates an agreed fact when the card carries this share of the
   * fact's words, each weighted by how rare it is among the map's own cards.
   * Most maps wrote their common ground from a card, so the shared words of
   * a real restatement are the card's distinctive ones ("Hubble", "19.8"),
   * while a card that only shares the topic's vocabulary ("tuition",
   * "loans") stays under the line. Calibrated on the legacy maps in
   * ./agreedFacts.test.ts.
   */
  card: 0.5,
  /**
   * An opening "Both sides accept…" paragraph of the simple case is dropped
   * from the crux-sheet lede when this share of its words is in the agreed
   * facts the page already lists (most maps open the simple case that way).
   */
  lede: 0.6,
  /**
   * A side's summary sentence restates an agreed fact when this share of its
   * own words (weighted by rarity, as for cards) is in one of the map's
   * agreed facts or in a card that restates one. Measured from the sentence's
   * side, since a summary is one short sentence and a fact is longer.
   * Calibrated on the legacy maps in ./positionSummaries.test.ts: the
   * restatements score 0.46 to 0.80 ("The headline averages hide enormous
   * variance."); the closest own-side openings under the line score 0.45.
   */
  summary: 0.46,
} as const;

/** Content-word stems plus figures ("19.8", "2035"), without the agreement framing. */
export function factTerms(text: string): Set<string> {
  const terms = stems(text.replace(AGREEMENT_FRAME, ""));
  for (const figure of text.match(/\d+(?:[.,]\d+)?/g) ?? []) {
    if (figure.length >= 2) terms.add(`#${figure}`);
  }
  return terms;
}

/** Every agreed fact on the map: each crux's common ground, in pillar order. */
export function agreedFacts(topic: Topic): string[] {
  return topic.pillars.flatMap((pillar) => {
    const ground = pillar.crux.falsification?.common_ground?.trim();
    return ground ? [ground] : [];
  });
}

/** Each card's terms, and how rare a term is among the map's cards (inverse document frequency). */
function cardVocabulary(topic: Topic) {
  const cards = topic.pillars.flatMap((p) => p.evidence ?? []);
  const terms = cards.map((card) => factTerms(`${card.title}. ${card.description}`));
  const frequency = new Map<string, number>();
  for (const set of terms) for (const term of set) frequency.set(term, (frequency.get(term) ?? 0) + 1);
  const rarity = (term: string) => Math.log((cards.length + 1) / ((frequency.get(term) ?? 0) + 1)) + 1;
  return { cards, terms, rarity };
}

/**
 * How much of an agreed fact a card carries (0–1), with each of the fact's
 * words weighted by its rarity among the map's cards (inverse document
 * frequency), so the map's shared vocabulary counts for little.
 */
export function agreedFactScores(topic: Topic): Map<Evidence, number> {
  const { cards, terms, rarity } = cardVocabulary(topic);
  const facts = agreedFacts(topic).map(factTerms);
  const scores = new Map<Evidence, number>();
  cards.forEach((card, index) => {
    let best = 0;
    for (const fact of facts) {
      let carried = 0;
      let total = 0;
      for (const term of fact) {
        total += rarity(term);
        if (terms[index].has(term)) carried += rarity(term);
      }
      if (total > 0) best = Math.max(best, carried / total);
    }
    scores.set(card, best);
  });
  return scores;
}

/**
 * The cards that restate an agreed fact (see AGREED_FACT_THRESHOLDS.card),
 * less the ones a reader checked and found distinct (./agreedFacts.distinct.ts).
 */
export function agreedFactCards(topic: Topic): Set<Evidence> {
  const cards = new Set<Evidence>();
  for (const [card, score] of agreedFactScores(topic)) {
    if (score < AGREED_FACT_THRESHOLDS.card) continue;
    if (DISTINCT_FROM_AGREED_FACT[`${topic.id}/${card.id}`]) continue;
    cards.add(card);
  }
  return cards;
}

/**
 * How much of a sentence an agreed fact already says (0–1): the share of
 * the sentence's words, weighted by rarity among the map's cards, found in
 * one of the map's agreed facts or in a card that restates one.
 */
export function agreedShareOfSentence(topic: Topic): (sentence: string) => number {
  const { rarity } = cardVocabulary(topic);
  const agreed = [
    ...agreedFacts(topic),
    ...[...agreedFactCards(topic)].map((card) => `${card.title}. ${card.description}`),
  ].map(factTerms);
  return (sentence) => {
    const terms = factTerms(sentence);
    let best = 0;
    for (const fact of agreed) {
      let shared = 0;
      let total = 0;
      for (const term of terms) {
        total += rarity(term);
        if (fact.has(term)) shared += rarity(term);
      }
      if (total > 0) best = Math.max(best, shared / total);
    }
    return best;
  };
}

/**
 * The paragraph above the crux sheet: the map's simple case, without an
 * opening "Both sides accept…" paragraph that only repeats the agreed facts
 * listed just above it. The next paragraph's "They split over…" then names
 * who "they" are. Otherwise the map's words, verbatim.
 */
function cruxLedeFor(topic: Topic, facts: string[]): string | undefined {
  const paragraphs = topic.simple_case ?? [];
  if (paragraphs.length === 0) return undefined;
  const agreed = stems(facts.join(" "));
  const repeatsAgreement = (paragraph: string) => {
    if (!AGREEMENT_FRAME.test(paragraph)) return false;
    const words = stems(paragraph);
    let shared = 0;
    for (const word of words) if (agreed.has(word)) shared += 1;
    return words.size > 0 && shared / words.size >= AGREED_FACT_THRESHOLDS.lede;
  };
  if (facts.length === 0 || !repeatsAgreement(paragraphs[0])) return paragraphs.join(" ");
  const rest = paragraphs.slice(1);
  if (rest.length === 0) return undefined;
  rest[0] = rest[0].replace(/^They\b/, "The two sides");
  return rest.join(" ");
}

function evidenceItems(
  evidence: Evidence[] | undefined,
  titled: (title: string) => string,
  agreed: ReadonlySet<Evidence>,
): LegacyEvidenceItem[] {
  const all = evidence ?? [];
  const ordered = [
    ...all.filter((e) => e.side === "for").sort(byWeight),
    ...all.filter((e) => e.side === "against").sort(byWeight),
  ];
  return ordered.map((e) => ({
    id: e.id,
    side: e.side,
    title: titled(e.title),
    description: e.description,
    source: e.source,
    sourceUrl: e.sourceUrl,
    ...(agreed.has(e) ? { restatesAgreement: true } : {}),
  }));
}

/**
 * Whether a card may stand as a side's card: not one that restates an agreed
 * fact, which the other side does not dispute. Every surface that picks a
 * card for a side uses this (the topic page's best cards here, the paste
 * result's "Points to" cards in lib/paste/maps.ts). There is no fallback: a
 * side whose only cards are agreed facts shows no card.
 */
export function canStandForSide(item: LegacyEvidenceItem): boolean {
  return !item.restatesAgreement;
}

/** A side's strongest card that is not an agreed fact (the list is strongest first). */
function bestCard(items: LegacyEvidenceItem[], side: "for" | "against"): LegacyEvidenceItem | undefined {
  return items.find((item) => item.side === side && canStandForSide(item));
}

function weighing(
  topic: Topic,
  titled: (title: string) => string,
  agreed: ReadonlySet<Evidence>,
): LegacyWeighing {
  const all = topic.pillars.flatMap((p) => p.evidence ?? []).filter((e) => !agreed.has(e));
  const top = (side: "for" | "against") => all.filter((e) => e.side === side).sort(byWeight)[0];
  const forCard = top("for");
  const againstCard = top("against");
  if (!forCard || !againstCard) return {};
  return { strongest: { forTitle: titled(forCard.title), againstTitle: titled(againstCard.title) } };
}

/** The pillar field that holds each side's case: the yes side's is the rebuttal, the no side's the premise. */
export const SIDE_TEXT = {
  supporters: "proponent_rebuttal",
  skeptics: "skeptic_premise",
} as const satisfies Record<string, keyof Pillar>;

/** A paragraph's sentences, split as `firstSentence` splits. */
function sentencesOf(text: string): string[] {
  const sentences: string[] = [];
  let rest = text.trim();
  while (rest) {
    const sentence = firstSentence(rest);
    sentences.push(sentence);
    rest = rest.slice(sentence.length).trim();
  }
  return sentences;
}

/** A sentence that leans on the one before it ("This inverts…", "But…") cannot stand alone. */
const LEANS_ON_PREVIOUS = /^(?:this|that|these|those|it|its|they|their|such|but|and|so|yet|or|nor|here|instead|still|even so|however|moreover|indeed)\b/i;

/**
 * A side's one-sentence summary, drawn only from that side's own case (the
 * pillar texts its position card folds). Never the other side's text, and
 * never an agreed fact: a sentence that restates the map's common ground
 * (AGREED_FACT_THRESHOLDS.summary) is not the side's case. Tried in order:
 * each pillar's opening sentence, then each pillar's later sentences that
 * stand alone. When every sentence is an agreed fact, the first pillar's
 * opening stays, as before.
 */
function positionSummary(
  topic: Topic,
  side: keyof typeof SIDE_TEXT,
  agreedShare: (sentence: string) => number = agreedShareOfSentence(topic),
): string {
  const texts = topic.pillars.map((pillar) => ({
    key: `${topic.id}/${pillar.id}/${side}`,
    sentences: sentencesOf(pillar[SIDE_TEXT[side]]),
  }));
  const openings = texts.map(({ key, sentences }) => ({ key, sentence: sentences[0] ?? "", opening: true }));
  const later = texts.flatMap(({ key, sentences }) =>
    sentences.slice(1).map((sentence) => ({ key, sentence, opening: false })),
  );
  const own = [...openings, ...later].find(
    ({ key, sentence, opening }) =>
      sentence !== "" &&
      (opening || !LEANS_ON_PREVIOUS.test(sentence)) &&
      (agreedShare(sentence) < AGREED_FACT_THRESHOLDS.summary ||
        (opening && DISTINCT_SUMMARY_FROM_AGREED_FACT[key] !== undefined)),
  );
  return (own ?? openings[0])?.sentence ?? "";
}

function positionCards(topic: Topic, words: SideWords): PositionCardData[] {
  const { pillars } = topic;
  if (pillars.length === 0) return [];
  const agreedShare = agreedShareOfSentence(topic);
  return [
    {
      id: "supporters",
      label: words.yes,
      summary: positionSummary(topic, "supporters", agreedShare),
      accent: SUPPORTER_ACCENT,
      full: pillars.map((p) => ({ lead: `${p.title}.`, text: p[SIDE_TEXT.supporters] })),
    },
    {
      id: "skeptics",
      label: words.no,
      summary: positionSummary(topic, "skeptics", agreedShare),
      accent: SKEPTIC_ACCENT,
      full: pillars.map((p) => ({ lead: `${p.title}.`, text: p[SIDE_TEXT.skeptics] })),
    },
  ];
}

export function legacyTopicPage(topic: Topic, related: RelatedMap[] = []): LegacyTopicPage {
  // Sides are named by the answer to the question the reader sees ("Says
  // yes" / "Says no"); a map without a question keeps "Supporters" / "Skeptics".
  const words = sideWords(topic);
  const titled = cardTitler(topic);
  // What both sides already agree on: each crux's common ground, in pillar
  // order, deduplicated. Any beyond the first three stay inside their crux.
  const agreement: string[] = [];
  for (const pillar of topic.pillars) {
    const ground = pillar.crux.falsification?.common_ground?.trim();
    if (ground && !agreement.includes(ground) && agreement.length < MAX_AGREEMENT) {
      agreement.push(ground);
    }
  }

  // Cards that only restate one of those facts are never a side's best card.
  const agreedCards = agreedFactCards(topic);

  const cruxes: LegacyCrux[] = topic.pillars.map((pillar) => {
    const crux = pillar.crux;
    const f = crux.falsification;
    const live = f?.live_disagreement?.trim();
    const ground = f?.common_ground?.trim();
    const authored = crux.question?.trim();
    const liveRunIn = authored && live ? [{ lead: "Where the fight is.", text: live }] : [];
    // The authored settle line when the map has one; older maps fall back to
    // the crux description (the contract test lists the ones still to fix).
    const condition = crux.settle?.condition ?? crux.description;
    const standingKind = crux.settle?.kind;
    const settle: CruxEntryData["settle"] = standingKind
      ? // Nothing empirical settles it: the flagship's standing line, and the
        // condition says what it turns on, as on the flagship maps.
        { mode: "standing", kind: standingKind, condition, resolved: false, label: "What would settle it" }
      : {
          mode: "evidence",
          condition,
          resolved: false,
          label: "What would settle it",
          note: TESTABILITY[crux.verification_status],
        };
    const standingRunIn = standingKind
      ? [{ lead: STANDING_CONDITION_LEAD[standingKind], text: asSentence(condition) }]
      : [];
    const question = authored || live || crux.title;
    const evidence = evidenceItems(pillar.evidence, titled, agreedCards);
    return {
      anchor: `crux-${pillar.id}`,
      pillarId: pillar.id,
      question,
      // The question is the crux's one name, as on the flagship maps: the
      // pillar title stays in Researcher mode, not above the question.
      shortLabel: question,
      settle,
      runIns: [
        ...liveRunIn,
        ...standingRunIn,
        ...(ground && !agreement.includes(ground) ? [{ lead: "Both agree.", text: ground }] : []),
      ],
      flips: f
        ? {
            supporter: f.supporter_flip,
            skeptic: f.skeptic_flip,
            supporterLead: words.yesChangesMind,
            skepticLead: words.noChangesMind,
          }
        : undefined,
      evidence,
      bestCards: { for: bestCard(evidence, "for"), against: bestCard(evidence, "against") },
      test: {
        title: crux.title,
        methodology: crux.methodology,
      },
    };
  });

  const page: TopicPageData = {
    id: topic.id,
    kind: "legacy",
    title: mapDisplayTitle(topic),
    // The same name as the H1 (the breadcrumb truncates it on one line):
    // two names for one map read as two maps.
    crumb: mapDisplayTitle(topic),
    // A question headline already states the claim; repeating it as "The
    // claim: …" underneath reads as an echo. Label-titled maps keep it.
    subtitle: topic.question?.trim() ? undefined : { lead: "The claim", text: topic.meta_claim },
    reviewedOn: topic.last_updated,
    sourceCount: countSources(topic),
    hook: topic.keystone_fact
      ? {
          text: topic.keystone_fact.statement,
          source: { label: topic.keystone_fact.source, url: topic.keystone_fact.sourceUrl },
        }
      : undefined,
    agreementHeading: "What both sides already agree on",
    agreement,
    cruxLede: cruxLedeFor(topic, agreedFacts(topic)),
    positionsHeading: "The two sides",
    positions: positionCards(topic, words),
    related,
    diagramHref: topic.pillars.length > 0 ? `/topics/${topic.id}/map` : undefined,
    embeddable: true,
  };

  return {
    page,
    cruxes,
    weighing: weighing(topic, titled, agreedCards),
    references: topic.references ?? [],
  };
}

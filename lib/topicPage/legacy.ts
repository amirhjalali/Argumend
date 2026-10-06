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
import type { Evidence, Pillar, Topic, Verdict } from "@/lib/schemas/topic";
import { calculateEvidenceScore } from "@/lib/evidenceMetrics";
import { mapDisplayTitle, sideWords, type SideWords } from "@/lib/mapNaming";
import type {
  CruxEntryData,
  PositionCardData,
  RelatedMap,
  TopicPageData,
} from "./model";

export interface LegacyEvidenceItem {
  id: string;
  side: "for" | "against";
  title: string;
  description: string;
  source?: string;
  sourceUrl?: string;
}

export interface LegacyCrux extends CruxEntryData {
  pillarId: string;
  /** This pillar's evidence, strongest first on each side. No scores. */
  evidence: LegacyEvidenceItem[];
  /** The crux's test, for the fold and for Researcher mode. */
  test: {
    title: string;
    methodology: string;
    cost: string;
  };
}

export interface LegacyWeighing {
  /** "Well-mapped, evidence still divided" — words, never a number. */
  label: string;
  fragile: boolean;
  /** The heaviest card on each side, or nothing: never one side alone. */
  heaviest?: { forTitle: string; againstTitle: string };
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
  theoretical: "A test no one has run yet.",
  impossible: "A test that is practically impossible to run today.",
};

const MAX_AGREEMENT = 3;

// Accent colours from the design system: rust names the proponent side and
// brown the skeptic, as everywhere else on the site.
const SUPPORTER_ACCENT = "#C4613C";
const SKEPTIC_ACCENT = "#8B5A3C";

const ABBREVIATION = /(?:\b[A-Z]|\b(?:vs|etc|e\.g|i\.e|Dr|Mr|Mrs|Ms|St|No|Inc|Jr|Sr|Co|Corp|Gov|Sen|Rep|approx|U\.S|U\.K|U\.N))$/;

/**
 * The first sentence of an authored paragraph, verbatim. Splits only at a
 * full stop followed by a capitalised word, and never after an abbreviation
 * ("U.S.", "vs.", "Dr."), so a figure like "~0.03 deaths vs. 24.6" survives.
 */
export function firstSentence(text: string): string {
  const trimmed = text.trim();
  const boundary = /([.!?])(["”’)]?)\s+(?=["“‘(]?[A-Z0-9])/g;
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

function evidenceItems(evidence: Evidence[] | undefined): LegacyEvidenceItem[] {
  const all = evidence ?? [];
  const ordered = [
    ...all.filter((e) => e.side === "for").sort(byWeight),
    ...all.filter((e) => e.side === "against").sort(byWeight),
  ];
  return ordered.map((e) => ({
    id: e.id,
    side: e.side,
    title: e.title.replace(/\.$/, ""),
    description: e.description,
    source: e.source,
    sourceUrl: e.sourceUrl,
  }));
}

function heaviest(topic: Topic): LegacyWeighing["heaviest"] {
  const all = topic.pillars.flatMap((p) => p.evidence ?? []);
  const top = (side: "for" | "against") => all.filter((e) => e.side === side).sort(byWeight)[0];
  const forCard = top("for");
  const againstCard = top("against");
  if (!forCard || !againstCard) return undefined;
  return {
    forTitle: forCard.title.replace(/\.$/, ""),
    againstTitle: againstCard.title.replace(/\.$/, ""),
  };
}

function weighing(verdict: Verdict, topic: Topic): LegacyWeighing {
  return { label: verdict.label, fragile: Boolean(verdict.fragile), heaviest: heaviest(topic) };
}

function positionCards(pillars: Pillar[], words: SideWords): PositionCardData[] {
  if (pillars.length === 0) return [];
  return [
    {
      id: "supporters",
      label: words.yes,
      summary: firstSentence(pillars[0].proponent_rebuttal),
      accent: SUPPORTER_ACCENT,
      full: pillars.map((p) => ({ lead: `${p.title}.`, text: p.proponent_rebuttal })),
    },
    {
      id: "skeptics",
      label: words.no,
      summary: firstSentence(pillars[0].skeptic_premise),
      accent: SKEPTIC_ACCENT,
      full: pillars.map((p) => ({ lead: `${p.title}.`, text: p.skeptic_premise })),
    },
  ];
}

export function legacyTopicPage(topic: Topic, related: RelatedMap[] = []): LegacyTopicPage {
  // Sides are named by the answer to the question the reader sees ("Says
  // yes" / "Says no"); a map without a question keeps "Supporters" / "Skeptics".
  const words = sideWords(topic);
  // What both sides already agree on: each crux's common ground, in pillar
  // order, deduplicated. Any beyond the first three stay inside their crux.
  const agreement: string[] = [];
  for (const pillar of topic.pillars) {
    const ground = pillar.crux.falsification?.common_ground?.trim();
    if (ground && !agreement.includes(ground) && agreement.length < MAX_AGREEMENT) {
      agreement.push(ground);
    }
  }

  const cruxes: LegacyCrux[] = topic.pillars.map((pillar) => {
    const crux = pillar.crux;
    const f = crux.falsification;
    const live = f?.live_disagreement?.trim();
    const ground = f?.common_ground?.trim();
    const authored = crux.question?.trim();
    const liveRunIn = authored && live ? [{ lead: "Where the fight is.", text: live }] : [];
    return {
      anchor: `crux-${pillar.id}`,
      pillarId: pillar.id,
      question: authored || live || crux.title,
      shortLabel: pillar.title,
      kicker: pillar.title,
      settle: {
        mode: "evidence",
        condition: crux.description,
        resolved: false,
        label: "What would settle it",
        note: TESTABILITY[crux.verification_status],
      },
      runIns: [
        ...liveRunIn,
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
      evidence: evidenceItems(pillar.evidence),
      test: {
        title: crux.title,
        methodology: crux.methodology,
        cost: crux.cost_to_verify,
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
    cruxLede: topic.simple_case?.length ? topic.simple_case.join(" ") : undefined,
    positionsHeading: "The two sides",
    positions: positionCards(topic.pillars, words),
    related,
    diagramHref: topic.pillars.length > 0 ? `/topics/${topic.id}/map` : undefined,
    embeddable: true,
  };

  return {
    page,
    cruxes,
    weighing: weighing(topic.verdict, topic),
    references: topic.references ?? [],
  };
}

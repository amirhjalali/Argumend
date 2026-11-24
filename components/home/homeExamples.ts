/**
 * Server-only preview data for the homepage's interactive live-crux explorer
 * and curated illustrated gallery.
 *
 * Imports ONLY the three individually selected topic files (never the full
 * `data/topics` barrel) plus lightweight summaries (`data/topicIndex`) and
 * hero metadata (`data/generatedMedia`) so home stays fast and passes every
 * bundle-boundary test.
 */
import { fourDayWorkWeekData } from "@/data/topics/four-day-work-week";
import { privacyVsConvenienceData } from "@/data/topics/privacy-vs-convenience";
import { congestionPricingData } from "@/data/topics/congestion-pricing";
import { topicSummaries } from "@/data/topicIndex";
import { getGeneratedMedia } from "@/data/generatedMedia";

export interface InteractiveCruxExample {
  readonly id: string;
  readonly shortLabel: string;
  readonly category: string;
  readonly title: string;
  readonly href: string;
  readonly cruxHref: string;
  readonly heroSrc: string | null;
  readonly heroAlt: string;
  readonly agreedGround: string;
  readonly cruxQuestion: string;
  readonly settleCondition: string;
  readonly supporterFlip: string;
  readonly skepticFlip: string;
}

export interface GalleryMapCard {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly href: string;
  readonly firstCrux: string;
  readonly heroSrc: string | null;
  readonly heroAlt: string;
}

const PREVIEW_SPECS = [
  { data: fourDayWorkWeekData, shortLabel: "Four-Day Week", category: "Economics" },
  { data: privacyVsConvenienceData, shortLabel: "Digital Privacy", category: "Technology" },
  { data: congestionPricingData, shortLabel: "Congestion Pricing", category: "Policy" },
] as const;

export function loadInteractiveExamples(): InteractiveCruxExample[] {
  return PREVIEW_SPECS.map(({ data, shortLabel, category }) => {
    const pillar = data.pillars[0];
    const crux = pillar.crux;
    const media = getGeneratedMedia("topic", data.id);
    return {
      id: data.id,
      shortLabel,
      category,
      title: data.question ?? data.title,
      href: `/topics/${data.id}`,
      cruxHref: `/topics/${data.id}#crux-${crux.id}`,
      heroSrc: media?.hero.src ?? null,
      heroAlt: media?.hero.alt ?? data.title,
      agreedGround: crux.falsification.common_ground,
      cruxQuestion: crux.question,
      settleCondition: crux.settle.condition,
      supporterFlip: crux.falsification.supporter_flip,
      skepticFlip: crux.falsification.skeptic_flip,
    };
  });
}

const GALLERY_IDS = [
  "four-day-work-week",
  "privacy-vs-convenience",
  "nuclear-energy-safety",
  "rent-control-effectiveness",
  "ai-risk",
  "glp1-weight-loss-drugs",
] as const;

const CATEGORY_LABELS: Record<string, string> = {
  policy: "Policy",
  technology: "Technology",
  science: "Science",
  economics: "Economics",
  philosophy: "Philosophy",
};

export function loadGalleryMaps(): GalleryMapCard[] {
  const byId = new Map(topicSummaries.map((topic) => [topic.id, topic]));
  return GALLERY_IDS.flatMap((id) => {
    const topic = byId.get(id);
    if (!topic) return [];
    const media = getGeneratedMedia("topic", id);
    return [
      {
        id: topic.id,
        title: topic.question ?? topic.title,
        category: CATEGORY_LABELS[topic.category] ?? topic.category,
        href: `/topics/${topic.id}`,
        firstCrux: topic.firstCrux ?? topic.meta_claim,
        heroSrc: media?.hero.src ?? null,
        heroAlt: media?.hero.alt ?? topic.title,
      },
    ];
  });
}

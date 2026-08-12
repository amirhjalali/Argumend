import {
  articleSummaries,
  blogCategoryToSlug,
  blogTagToSlug,
  getArticleSummaryCategories,
  getArticleSummaryTags,
} from "@/data/blogIndex";
import { isClaims } from "@/data/is-claims";
import { CATEGORY_ORDER, topicSummaries } from "@/data/topicIndex";
import { argumentTopicIds } from "@/lib/argument/topicIds";
import { isAnalysisId } from "@/lib/analysisId";
import { getAllQuestionVariations } from "@/lib/questions";

// These compact catalogs intentionally live apart from the prose-heavy source
// modules. Drift tests compare them with each page's static params.
export const GUIDE_ROUTE_IDS = [
  "triangulation",
  "understanding-bias",
  "evidence-hierarchy",
  "how-to-read-an-argument-map",
  "running-your-first-analysis",
  "evaluating-source-credibility",
  "crux-test",
  "bayesian-thinking",
  "argument-audit",
  "steelmanning-practice",
  "cognitive-bias-field-guide",
  "weighing-conflicting-evidence",
  "reading-confidence-like-a-forecaster",
  "correlation-and-causation",
  "spotting-manufactured-doubt",
] as const;

export const CONCEPT_ROUTE_SLUGS = [
  "steel-manning",
  "cruxes",
  "evidence-weighting",
  "confidence-calibration",
  "fallacies",
  "pillars",
] as const;

export const FALLACY_ROUTE_SLUGS = [
  "ad-hominem",
  "straw-man",
  "false-dilemma",
  "slippery-slope",
  "appeal-to-authority",
  "appeal-to-emotion",
  "hasty-generalization",
  "circular-reasoning",
  "false-cause",
  "bandwagon",
  "no-true-scotsman",
  "whataboutism",
  "motte-and-bailey",
  "gish-gallop",
  "survivorship-bias",
  "cherry-picking",
  "moving-the-goalposts",
  "appeal-to-nature",
  "equivocation",
  "sunk-cost",
  "appeal-to-ignorance",
  "red-herring",
] as const;

export const WORKSHEET_ROUTE_IDS = [
  "argument-map-template",
  "steel-man-challenge",
  "evidence-evaluation-rubric",
  "crux-finder",
] as const;

const topicIds = new Set(topicSummaries.map((topic) => topic.id));
// New-model (ArgumentGraph) topics render via DebateView on /topics/:id ONLY.
// Kept separate from topicIds: embed/compare routes serve legacy topics alone,
// so argument ids must not leak into their allowlists.
const debateTopicIds = new Set(argumentTopicIds);
const topicCategories = new Set<string>(CATEGORY_ORDER);
const topicTags = new Set(
  topicSummaries.flatMap((topic) =>
    (topic.tags ?? []).map((tag) =>
      tag.toLowerCase().trim().replace(/\s+/g, "-").replace(/-+/g, "-"),
    ),
  ),
);
const articleSlugs = new Set(articleSummaries.map((article) => article.slug));
const blogCategories = new Set(
  getArticleSummaryCategories().map(blogCategoryToSlug),
);
const blogTags = new Set(getArticleSummaryTags().map(blogTagToSlug));
const guideIds = new Set<string>(GUIDE_ROUTE_IDS);
const conceptSlugs = new Set<string>(CONCEPT_ROUTE_SLUGS);
const fallacySlugs = new Set<string>(FALLACY_ROUTE_SLUGS);
const questionSlugs = new Set(
  getAllQuestionVariations(topicSummaries).map((variation) => variation.slug),
);
const isClaimSlugs = new Set(isClaims.map((claim) => claim.slug));
const worksheetIds = new Set<string>(WORKSHEET_ROUTE_IDS);

const RESERVED_TOPIC_SEGMENTS = new Set(["category", "compare", "tag"]);
const RESERVED_BLOG_SEGMENTS = new Set(["category", "tag"]);

function pathnameSegments(pathname: string): string[] | null {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  try {
    return normalized.split("/").slice(1).map(decodeURIComponent);
  } catch {
    return null;
  }
}

/**
 * Returns true only for known user-facing dynamic URLs that can be rejected
 * without loading page data. The proxy rewrites these to the global named 404
 * before React starts streaming, preserving a truthful status and SSR markup.
 */
export function shouldServeNamedNotFound(pathname: string): boolean {
  const segments = pathnameSegments(pathname);
  if (!segments) return true;

  if (segments.length === 2 && segments[0] === "topics") {
    return (
      !RESERVED_TOPIC_SEGMENTS.has(segments[1]) &&
      !topicIds.has(segments[1]) &&
      !debateTopicIds.has(segments[1])
    );
  }
  if (
    segments.length === 3 &&
    segments[0] === "topics" &&
    segments[1] === "category"
  ) {
    return !topicCategories.has(segments[2]);
  }
  if (
    segments.length === 3 &&
    segments[0] === "topics" &&
    segments[1] === "tag"
  ) {
    return !topicTags.has(segments[2]);
  }
  if (
    segments.length === 5 &&
    segments[0] === "topics" &&
    segments[1] === "compare" &&
    segments[3] === "vs"
  ) {
    const [, , id1, , id2] = segments;
    return id1 === id2 || !topicIds.has(id1) || !topicIds.has(id2);
  }

  if (segments.length === 2 && segments[0] === "blog") {
    return !RESERVED_BLOG_SEGMENTS.has(segments[1]) && !articleSlugs.has(segments[1]);
  }
  if (
    segments.length === 3 &&
    segments[0] === "blog" &&
    segments[1] === "category"
  ) {
    return !blogCategories.has(segments[2]);
  }
  if (
    segments.length === 3 &&
    segments[0] === "blog" &&
    segments[1] === "tag"
  ) {
    return !blogTags.has(segments[2]);
  }

  if (segments.length === 2 && segments[0] === "guides") {
    return !guideIds.has(segments[1]);
  }
  if (segments.length === 2 && segments[0] === "concepts") {
    return !conceptSlugs.has(segments[1]);
  }
  if (segments.length === 2 && segments[0] === "fallacies") {
    return !fallacySlugs.has(segments[1]);
  }
  if (segments.length === 2 && segments[0] === "questions") {
    return !questionSlugs.has(segments[1]);
  }
  if (segments.length === 2 && segments[0] === "is") {
    return !isClaimSlugs.has(segments[1]);
  }
  if (
    segments.length === 3 &&
    segments[0] === "for-educators" &&
    segments[1] === "worksheets"
  ) {
    return !worksheetIds.has(segments[2]);
  }
  if (segments.length === 2 && segments[0] === "embed") {
    return !topicIds.has(segments[1]);
  }
  if (segments.length === 2 && segments[0] === "analysis") {
    return !isAnalysisId(segments[1]);
  }

  return false;
}

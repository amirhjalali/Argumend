import { describe, expect, it } from "vitest";
import { articles } from "./blog";
import { concepts } from "./concepts";
import { fallacies } from "./fallacies";
import { glossaryPageTerms } from "./glossaryPageTerms";
import { guides } from "./guides";
import { topicSummaries } from "./topicIndex";

const knownStaticRoutes = new Set([
  "/how-it-works",
  "/methodology",
  "/topics",
]);

const knownRoutes = new Set([
  ...knownStaticRoutes,
  ...articles.map((article) => `/blog/${article.slug}`),
  ...concepts.map((concept) => `/concepts/${concept.id}`),
  ...fallacies.map((fallacy) => `/fallacies/${fallacy.slug}`),
  ...guides.map((guide) => `/guides/${guide.id}`),
  ...topicSummaries.map((topic) => `/topics/${topic.id}`),
]);

describe("reference-surface internal links", () => {
  it("keeps every glossary data link pointed at a real route", () => {
    const internalLinks = glossaryPageTerms.flatMap((term) =>
      [term.exampleHref, term.learnMoreHref].filter(
        (href): href is string => Boolean(href?.startsWith("/")),
      ),
    );

    expect(internalLinks.filter((href) => !knownRoutes.has(href))).toEqual([]);
  });

  it("keeps concept and fallacy relationships resolvable", () => {
    const conceptIds = new Set(concepts.map((concept) => concept.id));
    const fallacyIds = new Set(fallacies.map((fallacy) => fallacy.slug));
    const topicIds = new Set(topicSummaries.map((topic) => topic.id));

    expect(
      concepts.flatMap((concept) =>
        concept.relatedConcepts.filter((id) => !conceptIds.has(id)),
      ),
    ).toEqual([]);
    expect(
      concepts.flatMap((concept) =>
        concept.topicExamples.filter((id) => !topicIds.has(id)),
      ),
    ).toEqual([]);
    expect(
      fallacies.flatMap((fallacy) =>
        (fallacy.relatedFallacies ?? []).filter((id) => !fallacyIds.has(id)),
      ),
    ).toEqual([]);
    expect(
      fallacies.flatMap((fallacy) =>
        (fallacy.relatedTopicIds ?? []).filter((id) => !topicIds.has(id)),
      ),
    ).toEqual([]);
  });
});

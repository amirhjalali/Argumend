import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { concepts } from "@/data/concepts";
import { fallacies } from "@/data/fallacies";
import { guides } from "@/data/guides";
import { topicSummaries } from "@/data/topicIndex";
import {
  CONCEPT_ROUTE_SLUGS,
  FALLACY_ROUTE_SLUGS,
  GUIDE_ROUTE_IDS,
  WORKSHEET_ROUTE_IDS,
  shouldServeNamedNotFound,
} from "@/lib/dynamicRoutePolicy";
import { generateStaticParams as generateWorksheetParams } from "@/app/for-educators/worksheets/[id]/page";
import { proxy } from "@/proxy";

const invalidDynamicRoutes = [
  "/topics/definitely-missing",
  "/topics/category/definitely-missing",
  "/topics/tag/definitely-missing",
  "/topics/compare/definitely-missing/vs/also-missing",
  "/blog/definitely-missing",
  "/blog/category/definitely-missing",
  "/blog/tag/definitely-missing",
  "/guides/definitely-missing",
  "/concepts/definitely-missing",
  "/fallacies/definitely-missing",
  "/questions/definitely-missing",
  "/is/definitely-missing",
  "/for-educators/worksheets/definitely-missing",
  "/embed/definitely-missing",
  "/analysis/definitely-missing",
] as const;

const validDynamicRoutes = [
  "/topics/climate-change",
  // New-model (ArgumentGraph) topic — served by DebateView, must clear the proxy.
  "/topics/ai-mass-unemployment",
  "/topics/category/science",
  "/topics/tag/policy",
  "/topics/compare/climate-change/vs/nuclear-energy-safety",
  "/blog/why-steel-manning-makes-you-smarter",
  "/blog/category/critical-thinking",
  "/blog/tag/critical-thinking",
  "/guides/triangulation",
  "/concepts/steel-manning",
  "/fallacies/straw-man",
  "/questions/is-nuclear-energy-safe",
  "/is/climate-change-real",
  "/for-educators/worksheets/argument-map-template",
  "/embed/climate-change",
  "/analysis/123e4567-e89b-12d3-a456-426614174000",
] as const;

describe("early dynamic-route 404 policy", () => {
  it.each(invalidDynamicRoutes)("rejects %s before App Router streaming", (pathname) => {
    expect(shouldServeNamedNotFound(pathname)).toBe(true);
  });

  it.each(validDynamicRoutes)("passes through valid route %s", (pathname) => {
    expect(shouldServeNamedNotFound(pathname)).toBe(false);
  });

  it.each([
    "/",
    "/topics",
    "/topics/compare",
    "/blog",
    "/api/analysis/not-a-uuid",
    "/api/auth/session",
    "/_next/static/chunk.js",
    "/icon.png",
    "/topics/ai-mass-unemployment-hero.jpg",
    "/topics/capitalism-after-ai-hero.jpg",
    "/blog/editorial-illustration.webp",
  ])("does not intercept unrelated route %s", (pathname) => {
    expect(shouldServeNamedNotFound(pathname)).toBe(false);
  });

  it.each([
    "/analysis/definitely-missing.jpg",
    "/guides/definitely-missing.json",
    "/concepts/definitely-missing.png",
    "/for-educators/worksheets/definitely-missing.webp",
  ])("does not let dotted dynamic ids bypass the named 404: %s", (pathname) => {
    expect(shouldServeNamedNotFound(pathname)).toBe(true);
  });

  it("rejects same-topic comparisons while allowing arbitrary distinct known pairs", () => {
    expect(
      shouldServeNamedNotFound(
        "/topics/compare/climate-change/vs/climate-change",
      ),
    ).toBe(true);
    expect(
      shouldServeNamedNotFound(
        "/topics/compare/climate-change/vs/free-will",
      ),
    ).toBe(false);
  });

  it("preserves the public URL query while rewriting to a truthful 404", () => {
    const response = proxy(
      new NextRequest(
        "https://argumend.org/topics/definitely-missing?ref=shared-link",
      ),
    );

    expect(response.status).toBe(404);
    const rewritten = new URL(response.headers.get("x-middleware-rewrite")!);
    expect(rewritten.pathname).toBe("/__argumend-dynamic-not-found__");
    expect(rewritten.search).toBe("?ref=shared-link");
  });

  it("returns normal pass-through for valid content", () => {
    const response = proxy(
      new NextRequest("https://argumend.org/topics/climate-change?view=read"),
    );
    expect(response.status).toBe(200);
    expect(response.headers.get("x-middleware-next")).toBe("1");
    expect(response.headers.has("x-middleware-rewrite")).toBe(false);
  });
});

describe("compact proxy catalogs", () => {
  it("keeps the topic-tag pass-through fixture backed by the live index", () => {
    expect(
      topicSummaries.some((topic) =>
        (topic.tags ?? []).some(
          (tag) =>
            tag.toLowerCase().trim().replace(/\s+/g, "-").replace(/-+/g, "-") ===
            "policy",
        ),
      ),
    ).toBe(true);
  });

  it("stays aligned with the prose-heavy guide catalog", () => {
    expect([...GUIDE_ROUTE_IDS].sort()).toEqual(guides.map((guide) => guide.id).sort());
  });

  it("stays aligned with the concept and fallacy catalogs", () => {
    expect([...CONCEPT_ROUTE_SLUGS].sort()).toEqual(
      concepts.map((concept) => concept.id).sort(),
    );
    expect([...FALLACY_ROUTE_SLUGS].sort()).toEqual(
      fallacies.map((fallacy) => fallacy.slug).sort(),
    );
  });

  it("stays aligned with every educator worksheet", () => {
    expect([...WORKSHEET_ROUTE_IDS].sort()).toEqual(
      generateWorksheetParams().map(({ id }) => id).sort(),
    );
  });
});

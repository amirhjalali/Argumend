import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { concepts } from "@/data/concepts";
import { fallacies } from "@/data/fallacies";
import { guides } from "@/data/guides";
import {
  CONCEPT_ROUTE_SLUGS,
  FALLACY_ROUTE_SLUGS,
  GUIDE_ROUTE_IDS,
  WORKSHEET_ROUTE_IDS,
  legacyHomeTopicPath,
  shouldServeNamedNotFound,
} from "@/lib/dynamicRoutePolicy";
import { generateStaticParams as generateWorksheetParams } from "@/app/for-educators/worksheets/[id]/page";
import { config as proxyConfig, proxy } from "@/proxy";

const invalidDynamicRoutes = [
  "/topics/definitely-missing",
  "/topics/definitely-missing/map",
  // New-model maps have no diagram; their page is the outline.
  "/topics/ai-mass-unemployment/map",
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
  "/topics/climate-change/map",
  // New-model (ArgumentGraph) topic — served by DebateView, must clear the proxy.
  "/topics/ai-mass-unemployment",
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
  // New-model maps embed too (they used to 404 here).
  "/embed/ai-mass-unemployment",
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

  it("no longer reserves the retired library sub-routes (they are 301s now)", () => {
    // next.config.js redirects /topics/{category,tag,compare}/* before the
    // proxy runs; a bare segment that slips past is not a topic, so 404.
    expect(shouldServeNamedNotFound("/topics/category")).toBe(true);
    expect(shouldServeNamedNotFound("/topics/tag")).toBe(true);
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

describe("legacy home-canvas links (/?topic=)", () => {
  const path = (query: string) => legacyHomeTopicPath(new URLSearchParams(query));

  it("sends the canvas's Map views of a legacy map to its diagram", () => {
    expect(path("topic=nuclear-energy-safety&view=logic-map")).toBe("/topics/nuclear-energy-safety/map");
    expect(path("topic=nuclear-energy-safety&view=graph")).toBe("/topics/nuclear-energy-safety/map");
  });

  it("sends every other view to the map's page, without topic/view", () => {
    expect(path("topic=nuclear-energy-safety")).toBe("/topics/nuclear-energy-safety");
    expect(path("topic=nuclear-energy-safety&view=scales")).toBe("/topics/nuclear-energy-safety");
    expect(path("topic=nuclear-energy-safety&view=read")).toBe("/topics/nuclear-energy-safety");
  });

  it("never sends a new-model map to a diagram it does not have", () => {
    expect(path("topic=ai-mass-unemployment&view=logic-map")).toBe("/topics/ai-mass-unemployment");
  });

  it("sends empty and unknown ids to the library", () => {
    expect(path("topic=")).toBe("/topics");
    expect(path("topic=definitely-missing&view=graph")).toBe("/topics");
  });

  it("keeps unrelated parameters", () => {
    expect(path("topic=climate-change&view=graph&utm_source=x")).toBe(
      "/topics/climate-change/map?utm_source=x",
    );
  });

  it("ignores home requests without a topic", () => {
    expect(path("")).toBeNull();
    expect(path("view=graph")).toBeNull();
  });

  it("redirects once from the proxy, with a 308", () => {
    const response = proxy(
      new NextRequest("https://argumend.org/?topic=climate-change&view=logic-map&ref=x"),
    );
    expect(response.status).toBe(308);
    expect(response.headers.get("location")).toBe(
      "https://argumend.org/topics/climate-change/map?ref=x",
    );
    // The destination passes straight through: no chain, no loop.
    const next = proxy(new NextRequest("https://argumend.org/topics/climate-change/map?ref=x"));
    expect(next.headers.get("x-middleware-next")).toBe("1");
  });

  it("only runs on home requests that carry ?topic=", () => {
    expect(proxyConfig.matcher).toContainEqual({
      source: "/",
      has: [{ type: "query", key: "topic" }],
    });
    const response = proxy(new NextRequest("https://argumend.org/?ref=x"));
    expect(response.headers.get("x-middleware-next")).toBe("1");
  });
});

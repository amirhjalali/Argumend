import { describe, expect, it, vi } from "vitest";

// Page modules are loaded for their metadata only. A page that would 404 or
// redirect from generateMetadata must fail the test, not end it quietly.
vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
  redirect: (url: string) => {
    throw new Error(`NEXT_REDIRECT ${url}`);
  },
  permanentRedirect: (url: string) => {
    throw new Error(`NEXT_REDIRECT ${url}`);
  },
  useRouter: () => ({}),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

import type { Metadata } from "next";
import { createRequire } from "node:module";
import { articleSummaries } from "@/data/blogIndex";
import { shouldServeNamedNotFound } from "@/lib/dynamicRoutePolicy";
import { getAllQuestionVariations, getPrimaryQuestionVariations } from "@/lib/questions";
import { topicSummaries } from "@/data/topicIndex";
import { argumentTopicIds } from "@/lib/argument/topicIds";
import {
  ARGUMENT_TOPICS_LAST_UPDATED,
  CONTENT_LAST_UPDATED,
  LEGAL_LAST_UPDATED,
} from "@/lib/site";
import { aiPageAsOf } from "./ai/loadAiMaps";
import sitemap from "./sitemap";

const require = createRequire(import.meta.url);
const { pathToRegexp } = require("next/dist/compiled/path-to-regexp") as {
  pathToRegexp: (path: string) => RegExp;
};
const nextConfig = require("../next.config.js") as {
  redirects: () => Promise<Array<{ source: string; has?: unknown[] }>>;
};

type RouteModule = {
  metadata?: Metadata;
  generateMetadata?: (props: {
    params: Promise<Record<string, string>>;
    searchParams: Promise<Record<string, string>>;
  }) => Promise<Metadata>;
};

// The root layout (next/font) cannot load outside Next; its canonical is the
// home page, which is what a page without its own canonical would inherit.
const ROOT_CANONICAL = "https://argumend.org";
const routeModules = import.meta.glob<RouteModule>([
  "/app/**/page.tsx",
  "/app/**/layout.tsx",
  "!/app/layout.tsx",
  "!/app/api/**",
  "!/app/auth/**",
  "!/app/dashboard/**",
]);

/** The app/ files that serve a pathname: its page and the layouts above it, outermost first. */
function routeFor(pathname: string): { files: string[]; params: Record<string, string> } | null {
  const pages = Object.keys(routeModules)
    .filter((file) => file.endsWith("/page.tsx"))
    .map((file) => {
      const route = file.replace(/^\/app/, "").replace(/\/page\.tsx$/, "") || "/";
      const names: string[] = [];
      const pattern = route.replace(/\[([^\]]+)\]/g, (_match, name: string) => {
        names.push(name);
        return "([^/]+)";
      });
      return { file, route, names, regex: new RegExp(`^${pattern}$`) };
    })
    // Static segments win over dynamic ones, as in the App Router.
    .sort((a, b) => a.names.length - b.names.length);
  const page = pages.find(({ regex }) => regex.test(pathname));
  if (!page) return null;
  const values = pathname.match(page.regex)!.slice(1);
  const params = Object.fromEntries(page.names.map((name, i) => [name, decodeURIComponent(values[i])]));
  const segments = page.route.split("/").filter(Boolean);
  const layouts = segments
    .map((_, i) => `/app/${segments.slice(0, i + 1).join("/")}/layout.tsx`)
    .filter((file) => file in routeModules);
  return { files: [...layouts, page.file], params };
}

/** robots and canonical as Next would resolve them: the deepest segment that sets one wins. */
async function resolvedIndexing(pathname: string) {
  const route = routeFor(pathname);
  if (!route) throw new Error(`no app route serves ${pathname}`);
  let robots: Metadata["robots"];
  let canonical: unknown = ROOT_CANONICAL;
  for (const file of route.files) {
    const mod = await routeModules[file]();
    const metadata = mod.generateMetadata
      ? await mod.generateMetadata({
          params: Promise.resolve(route.params),
          searchParams: Promise.resolve({}),
        })
      : mod.metadata;
    if (!metadata) continue;
    if ("robots" in metadata) robots = metadata.robots;
    if ("alternates" in metadata) canonical = metadata.alternates?.canonical ?? null;
  }
  return { robots, canonical };
}

/**
 * The sitemap lists every indexable page the site links to, and only those:
 * each URL is served by a real route, at its canonical address, with no
 * redirect, no early 404 and no noindex in front of it.
 */
describe("sitemap", () => {
  const entries = sitemap();
  const urls = entries.map(({ url }) => url);

  it("contains only unique canonical-origin URLs", () => {
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls.every((url) => url.startsWith("https://argumend.org"))).toBe(
      true,
    );
  });

  it("uses clean canonical URL shapes", () => {
    for (const rawUrl of urls) {
      const url = new URL(rawUrl);
      expect(url.search).toBe("");
      expect(url.hash).toBe("");
      if (url.pathname !== "/") expect(url.pathname.endsWith("/")).toBe(false);
    }
  });

  it("excludes private, account, and embeddable utility surfaces", () => {
    expect(
      urls.some((url) =>
        ["/api/", "/dashboard", "/saved", "/auth/", "/embed/", "/analyses"].some(
          (segment) => url.includes(segment),
        ),
      ),
    ).toBe(false);
  });

  it("includes the core discovery surfaces", () => {
    expect(urls).toEqual(
      expect.arrayContaining([
        "https://argumend.org",
        "https://argumend.org/topics",
        "https://argumend.org/analyze",
        "https://argumend.org/ai",
        "https://argumend.org/about",
      ]),
    );
  });

  it("includes the learn, story and teaching pages", () => {
    expect(urls).toEqual(
      expect.arrayContaining(
        [
          "/learn",
          "/methodology",
          "/blog",
          "/glossary",
          "/faq",
          "/fallacies",
          "/for-educators",
          "/research",
          "/perspectives",
          "/questions",
          "/guides/crux-test",
          "/concepts/cruxes",
          "/fallacies/straw-man",
          "/for-educators/worksheets/crux-finder",
        ].map((path) => `https://argumend.org${path}`),
      ),
    );
  });

  it("lists every blog post, dated by its own publishedAt", () => {
    for (const article of articleSummaries) {
      const matching = entries.filter((entry) => entry.url === `https://argumend.org/blog/${article.slug}`);
      expect(matching, article.slug).toHaveLength(1);
      expect(new Date(matching[0].lastModified as Date).toISOString().slice(0, 10)).toBe(
        article.publishedAt.slice(0, 10),
      );
    }
  });

  it("lists each map's primary question page, and no other phrasing", () => {
    const primaries = new Set(getPrimaryQuestionVariations(topicSummaries).map((v) => v.slug));
    for (const slug of primaries) expect(urls).toContain(`https://argumend.org/questions/${slug}`);
    for (const variation of getAllQuestionVariations(topicSummaries)) {
      if (!primaries.has(variation.slug)) {
        expect(urls).not.toContain(`https://argumend.org/questions/${variation.slug}`);
      }
    }
  });

  it("never dates an entry by the build: every lastModified is a fixed day", () => {
    for (const entry of entries) {
      const date = new Date(entry.lastModified as Date);
      expect(date.getUTCHours() + date.getUTCMinutes() + date.getUTCSeconds(), entry.url).toBe(0);
    }
  });

  it("lists no URL that redirects", async () => {
    const rules = (await nextConfig.redirects()).filter((rule) => !rule.has);
    const patterns = rules.map((rule) => ({ source: rule.source, regex: pathToRegexp(rule.source) }));
    for (const url of urls) {
      const { pathname } = new URL(url);
      const hit = patterns.find(({ regex }) => regex.test(pathname));
      expect(hit?.source, `${pathname} redirects`).toBeUndefined();
    }
  });

  it("lists no URL the proxy answers with a 404", () => {
    for (const url of urls) {
      const { pathname } = new URL(url);
      expect(shouldServeNamedNotFound(pathname), pathname).toBe(false);
    }
  });

  it("lists only indexable pages at their own canonical URL", async () => {
    for (const url of urls) {
      const { pathname } = new URL(url);
      const { robots, canonical } = await resolvedIndexing(pathname);
      const index = typeof robots === "object" && robots !== null ? robots.index : undefined;
      expect(index, `${pathname} is noindex`).not.toBe(false);
      expect(String(canonical), `${pathname} canonical`).toBe(url);
    }
  }, 60_000);

  it("lists /ai once, dated by the latest recorded ledger entry", () => {
    const matching = entries.filter((entry) => entry.url === "https://argumend.org/ai");
    expect(matching).toHaveLength(1);
    expect(new Date(matching[0].lastModified as string | Date).getTime()).toBe(
      new Date(`${aiPageAsOf()}T00:00:00Z`).getTime(),
    );
  });

  it("advertises the legal pages so a policy cannot be unfindable", () => {
    const expected = new Date(`${LEGAL_LAST_UPDATED}T00:00:00Z`).getTime();

    for (const path of ["/privacy", "/terms"]) {
      const matching = entries.filter(
        (entry) => entry.url === `https://argumend.org${path}`,
      );
      expect(matching, `expected one sitemap entry for ${path}`).toHaveLength(1);
      expect(matching[0].changeFrequency).toBe("yearly");
      expect(matching[0].priority).toBe(0.3);
      expect(
        new Date(matching[0].lastModified as string | Date).getTime(),
      ).toBe(expected);
    }
  });

  it("excludes retired, redirected and noindex routes", () => {
    const excludedPrefixes = [
      "/is",
      // Folded into /topics (301s in next.config.js, "maps library").
      "/topics/compare",
      "/topics/category",
      "/topics/tag",
      "/community",
      "/library",
      "/how-it-works",
      "/lessons-from-the-deep",
      // Tag pages are noindex; the diagram view is noindex.
      "/blog/tag",
      // Behind NEXT_PUBLIC_ENABLE_JEV_MAP_REPLY and noindex while flagged.
      "/reply",
      // Behind NEXT_PUBLIC_ENABLE_STUDY, noindex, Prolific participants only.
      "/study",
      "/saved",
      "/d/",
      "/analysis",
    ];
    expect(urls.filter((url) => url.endsWith("/map"))).toEqual([]);
    // The old index pages redirect to /learn; their detail pages stay.
    expect(urls).not.toContain("https://argumend.org/guides");
    expect(urls).not.toContain("https://argumend.org/concepts");
    for (const prefix of excludedPrefixes) {
      const offending = urls.filter((url) =>
        new URL(url).pathname.startsWith(prefix),
      );
      expect(offending, `expected no sitemap entries for ${prefix}`).toEqual(
        [],
      );
    }
  });

  it("covers every lightweight topic index entry", () => {
    for (const topic of topicSummaries) {
      expect(urls).toContain(`https://argumend.org/topics/${topic.id}`);
    }
  });

  it("covers every registered ArgumentGraph map as a high-priority topic", () => {
    const expectedLastModified = new Date(
      `${ARGUMENT_TOPICS_LAST_UPDATED}T00:00:00Z`,
    ).getTime();

    for (const id of argumentTopicIds) {
      const url = `https://argumend.org/topics/${id}`;
      const matchingEntries = entries.filter((entry) => entry.url === url);

      expect(matchingEntries).toHaveLength(1);
      expect(matchingEntries[0].priority).toBe(0.9);
      expect(matchingEntries[0].changeFrequency).toBe("weekly");
      expect(
        new Date(matchingEntries[0].lastModified as string | Date).getTime(),
      ).toBe(expectedLastModified);
    }
  });

  it("publishes the current corpus revision date for topic records", () => {
    const expected = new Date(`${CONTENT_LAST_UPDATED}T00:00:00Z`).getTime();
    const topicUrls = new Set(
      topicSummaries.map((topic) =>
        `https://argumend.org/topics/${topic.id}`,
      ),
    );
    const topicEntries = entries.filter((entry) => topicUrls.has(entry.url));

    expect(topicEntries).toHaveLength(topicSummaries.length);
    for (const entry of topicEntries) {
      expect(new Date(entry.lastModified as string | Date).getTime()).toBe(
        expected,
      );
    }
  });
});

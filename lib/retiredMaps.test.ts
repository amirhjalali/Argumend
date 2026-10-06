import { createRequire } from "node:module";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import retiredMaps from "@/data/retiredMaps.json";
import { isClaims } from "@/data/is-claims";
import { topicSummaries } from "@/data/topicIndex";
import { hasTopicLoader } from "@/data/topicLoader";
import { argumentTopicIds } from "@/lib/argument/topicIds";
import { getAllQuestionVariations, getPrimaryQuestionSlug } from "@/lib/questions";
import isToQuestions from "@/lib/learn/isToQuestions.json";

/**
 * One map per question: a map merged into another is retired, and every URL
 * it had goes to the kept map in one hop (data/retiredMaps.json, wired into
 * next.config.js). CLAUDE.md, "One Map per Question".
 */

interface RetiredMap {
  into: string;
  map: string;
  questionsTo: string;
  questions: string[];
  is: string[];
}

const require = createRequire(import.meta.url);
const nextConfig = require("../next.config.js") as {
  redirects: () => Promise<Array<{ source: string; destination: string; permanent?: boolean }>>;
};

const table = retiredMaps as Record<string, RetiredMap>;
const entries = Object.entries(table);
const liveQuestionSlugs = new Set(getAllQuestionVariations(topicSummaries).map((v) => v.slug));

describe("retired maps", () => {
  it("are gone from the library, the loader and the catalogues", () => {
    expect(entries.length).toBeGreaterThan(0);
    for (const [from] of entries) {
      expect(hasTopicLoader(from), from).toBe(false);
      expect(topicSummaries.some((t) => t.id === from), from).toBe(false);
      expect(argumentTopicIds.includes(from), from).toBe(false);
      expect(existsSync(join(process.cwd(), "data", "topics", `${from}.ts`)), from).toBe(false);
      expect(isClaims.some((claim) => claim.topicId === from), from).toBe(false);
    }
  });

  it("each go to a live map, and to its own pages", () => {
    for (const [from, to] of entries) {
      const legacy = topicSummaries.some((t) => t.id === to.into);
      const flagship = argumentTopicIds.includes(to.into);
      expect(legacy || flagship, `${from} → ${to.into}`).toBe(true);
      expect(table[to.into], `${to.into} is itself retired`).toBeUndefined();
      // Flagships have no diagram and no /questions page: both go to the page.
      expect(to.map).toBe(legacy ? `/topics/${to.into}/map` : `/topics/${to.into}`);
      const primary = getPrimaryQuestionSlug(to.into);
      expect(to.questionsTo).toBe(primary ? `/questions/${primary}` : `/topics/${to.into}`);
    }
  });

  it("free their question slugs (no live page shadowed by a redirect)", () => {
    for (const [from, to] of entries) {
      for (const slug of to.questions) {
        expect(liveQuestionSlugs.has(slug), `${from}: /questions/${slug}`).toBe(false);
      }
      for (const slug of to.is) {
        expect(Object.hasOwn(isToQuestions, slug), `${from}: /is/${slug}`).toBe(false);
      }
    }
  });

  it("redirect every old URL permanently, in one hop", async () => {
    const redirects = await nextConfig.redirects();
    const bySource = new Map(redirects.map((rule) => [rule.source, rule]));
    for (const [from, to] of entries) {
      const expected: Array<[string, string]> = [
        [`/topics/${from}`, `/topics/${to.into}`],
        [`/topics/${from}/map`, to.map],
        [`/embed/${from}`, `/embed/${to.into}`],
        ...to.questions.map((slug): [string, string] => [`/questions/${slug}`, to.questionsTo]),
        ...to.is.map((slug): [string, string] => [`/is/${slug}`, to.questionsTo]),
      ];
      for (const [source, destination] of expected) {
        expect(bySource.get(source), source).toEqual({ source, destination, permanent: true });
        // No chains: the destination is not itself redirected.
        expect(bySource.has(destination), `${source} → ${destination} chains`).toBe(false);
      }
    }
    // Retargeted /is claims land on the kept map's primary question directly.
    for (const rule of redirects) {
      for (const [from] of entries) {
        expect(rule.destination.includes(`/${from}`), `${rule.source} → ${rule.destination}`).toBe(false);
      }
    }
  });

  it("are not named by any eval as a right answer", () => {
    const evalFiles = [
      "data/evals/paste-matching/pastes.json",
      "data/evals/paste-matching/holdout.json",
      "data/evals/paste-matching/cruxes.json",
      "data/evals/site-search/queries.json",
      "data/evals/site-search/holdout.json",
    ];
    for (const file of evalFiles) {
      const text = readFileSync(join(process.cwd(), file), "utf8");
      for (const [from] of entries) {
        expect(text.includes(`"${from}"`), `${file} names ${from}`).toBe(false);
      }
    }
  });
});

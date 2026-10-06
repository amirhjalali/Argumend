import { describe, expect, it } from "vitest";
import devSet from "@/data/evals/site-search/queries.json";
import holdoutSet from "@/data/evals/site-search/holdout.json";
import { topicSummaries } from "@/data/topicIndex";
import { buildSearchItems } from "@/components/SearchModal";
import { filterLibrary } from "@/app/topics/_query";
import { argumentTopicIds } from "@/lib/argument/topicIds";
import { mapDisplayTitle } from "@/lib/mapNaming";
import { searchQuestions } from "@/lib/questionSearch";
import { getAllQuestionVariations } from "@/lib/questions";
import { createSiteSearch } from "@/lib/siteSearch";

/**
 * The site-search eval (data/evals/site-search) as a regression gate, on
 * every box a reader can search maps from:
 *
 *   palette   — the header search / ⌘K (components/SearchModal.tsx), Maps group
 *   library   — the maps library, /topics?q= (app/topics/_query.ts)
 *   questions — the questions index, /questions?q= (lib/questionSearch.ts);
 *               only queries whose map has a question page count here
 *
 * top-1: the first map shown is a right one. top-3: a right one is among the
 * first three. Two sets: `dev` (queries.json, what the ranking was tuned on)
 * and `holdout` (holdout.json, scored once after tuning; synonyms the maps
 * don't use live here). Floors sit a little under the scores measured on
 * 2026-10-06. Before that round (top-1 / top-3, dev then holdout): header
 * search 92/96 and 87/90; library 34/38 and 33/33; questions 52/52 and
 * 36/36. The library and questions boxes matched the whole query as one
 * substring, so "is nuclear power safe" found nothing in either.
 *
 * no-map cases (r6 review #4, 2026-10-06): subjects no map covers, where a
 * box may list at most `maxMaps` maps. Before that round's change "abortion"
 * listed 8 maps (abort~about) and "gay marriage" 9 (gai~gain); after, none.
 */

interface EvalCase {
  query: string;
  /** Right first answers; empty for a subject no map covers (kind "no-map"). */
  expected: string[];
  /** For a no-map case: the most maps a box may list. */
  maxMaps?: number;
  kind: string;
}

const SETS = {
  dev: (devSet as { cases: EvalCase[] }).cases,
  holdout: (holdoutSet as { cases: EvalCase[] }).cases,
};
type SetName = keyof typeof SETS;

type Surface = "palette" | "library" | "questions";

const FLOORS: Record<SetName, Record<Surface, { top1: number; top3: number }>> = {
  // Measured 100% / 100% on all three.
  dev: {
    palette: { top1: 0.94, top3: 0.98 },
    library: { top1: 0.94, top3: 0.98 },
    questions: { top1: 0.94, top3: 0.98 },
  },
  // Measured 90/90, 90/90, 84/84: the misses are synonyms no map uses
  // ("global warming", "assault weapons", "robotaxis").
  holdout: {
    palette: { top1: 0.85, top3: 0.85 },
    library: { top1: 0.85, top3: 0.85 },
    questions: { top1: 0.8, top3: 0.8 },
  },
};

/**
 * No-map cases allowed over their `maxMaps`. Dev: none. Holdout, scored once
 * after the change: 2 of 5 over on the palette and library ("should we keep
 * the monarchy" lists 2–3 maps that share "keep"; "is abortion murder" lists
 * the death-penalty map), 1 of 5 on questions. Left as measured, not tuned.
 */
const NO_MAP_OVER: Record<SetName, number> = { dev: 0, holdout: 2 };

// Header search: the same list and ranking the modal builds; maps only, since
// the Maps group is shown first.
const paletteSearch = createSiteSearch(buildSearchItems());
function palette(query: string): string[] {
  return paletteSearch(query)
    .filter((item) => item.type === "map" || item.type === "topic")
    .map((item) => item.href.replace(/^\/topics\//, ""));
}

function library(query: string): string[] {
  return filterLibrary({ category: "all", search: query, sort: "mixed" }).map((entry) => entry.id);
}

// The list app/questions/page.tsx hands its search box.
const questionItems = getAllQuestionVariations(topicSummaries).map((variation) => {
  const topic = topicSummaries.find((t) => t.id === variation.topicId)!;
  return {
    slug: variation.slug,
    question: variation.question,
    topicTitle: mapDisplayTitle(topic),
    topicId: variation.topicId,
  };
});
const topicsWithQuestions = new Set(questionItems.map((item) => item.topicId));
function questions(query: string): string[] {
  return searchQuestions(questionItems, query).map((item) => item.topicId);
}

const RUNNERS: Record<Surface, (query: string) => string[]> = { palette, library, questions };

interface Row {
  query: string;
  expected: string[];
  shown: string[];
  top1: boolean;
  top3: boolean;
}

const isNoMap = (testCase: EvalCase) => testCase.expected.length === 0;

function run(set: SetName, surface: Surface): Row[] {
  return SETS[set]
    .filter((testCase) => !isNoMap(testCase))
    .filter(
      (testCase) =>
        surface !== "questions" || testCase.expected.some((id) => topicsWithQuestions.has(id)),
    )
    .map((testCase) => {
      const shown = RUNNERS[surface](testCase.query).slice(0, 3);
      return {
        query: testCase.query,
        expected: testCase.expected,
        shown,
        top1: shown.length > 0 && testCase.expected.includes(shown[0]),
        top3: shown.some((id) => testCase.expected.includes(id)),
      };
    });
}

function report(label: string, rows: Row[]) {
  const top1 = rows.filter((row) => row.top1).length / rows.length;
  const top3 = rows.filter((row) => row.top3).length / rows.length;
  const misses = rows
    .filter((row) => !row.top1)
    .map(
      (row) =>
        `  ${row.top3 ? "top3" : "MISS"} “${row.query}” → ${row.shown.join(", ") || "(nothing)"} (want ${row.expected[0]})`,
    );
  const text = [
    `${label}: top-1 ${(top1 * 100).toFixed(0)}%  top-3 ${(top3 * 100).toFixed(0)}%  (n=${rows.length})`,
    ...misses,
  ].join("\n");
  return { top1, top3, text };
}

describe("the site-search eval set", () => {
  it("is big enough and labelled with maps that exist", () => {
    const all = [...SETS.dev, ...SETS.holdout];
    expect(SETS.dev.length).toBeGreaterThanOrEqual(40);
    expect(new Set(all.map((testCase) => testCase.query)).size).toBe(all.length);
    const known = new Set([...topicSummaries.map((t) => t.id), ...argumentTopicIds]);
    for (const testCase of all) {
      if (isNoMap(testCase)) {
        expect(testCase.kind, testCase.query).toBe("no-map");
        expect(testCase.maxMaps, testCase.query).toBeGreaterThanOrEqual(0);
      }
      for (const id of testCase.expected) expect(known.has(id), `${testCase.query}: ${id}`).toBe(true);
    }
    expect(SETS.dev.filter(isNoMap).length).toBeGreaterThanOrEqual(3);
  });

  const cells = (Object.keys(SETS) as SetName[]).flatMap((set) =>
    (["palette", "library", "questions"] as Surface[]).map((surface) => [set, surface] as const),
  );

  /**
   * A subject no map covers lists no map, or a few at most: not "abortion"
   * finding the nuclear-deterrence map, nor a sentence about a family
   * argument finding seventeen maps that share a word with it. Every map the
   * box lists counts here, not only the first three.
   */
  it.each(cells)("lists no map, or a few, for subjects no map covers (%s, %s)", (set, surface) => {
    const over = SETS[set]
      .filter(isNoMap)
      .map((testCase) => ({ testCase, shown: RUNNERS[surface](testCase.query) }))
      .filter(({ testCase, shown }) => shown.length > (testCase.maxMaps ?? 0))
      .map(({ testCase, shown }) => `  “${testCase.query}” → ${shown.length} maps (at most ${testCase.maxMaps ?? 0}): ${shown.slice(0, 5).join(", ")}`);
    console.info(`${set} / ${surface}: no-map cases over their limit ${over.length}\n${over.join("\n")}`);
    expect(over.length, over.join("\n")).toBeLessThanOrEqual(NO_MAP_OVER[set]);
  });

  it.each(cells)("holds the %s floors on the %s search", (set, surface) => {
    const { top1, top3, text } = report(`${set} / ${surface}`, run(set, surface));
    console.info(text);
    expect(top1, text).toBeGreaterThanOrEqual(FLOORS[set][surface].top1);
    expect(top3, text).toBeGreaterThanOrEqual(FLOORS[set][surface].top3);
  });
});

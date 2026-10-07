/**
 * Regenerate the lightweight map summaries the client lists read:
 *
 *  - data/topicSummaries.json from data/topics.ts (the older pillar maps)
 *  - data/argumentTopicSummaries.json from the new-model (ArgumentGraph) maps
 *
 * Each summary carries the map's first crux question (`firstCrux`), whether
 * nothing empirical settles it (`firstCruxStanding`, its settle kind), and how
 * many questions the map turns on, so the library can show what a map turns
 * on without loading the map itself.
 *
 * And words to search it by that its names do not use (`keywords`): the
 * map's most distinctive evidence words ("Medicare", "Deere", "marijuana"),
 * which the site search reads at the weight of a tag (lib/siteSearch.ts), and
 * its `aliases`, the names of maps merged into it.
 *
 * Usage: npx tsx scripts/regen-summaries.ts
 */

import { topics } from "../data/topics";
import { argumentTopicIds } from "../lib/argument/topicIds";
import { loadHomeCrux } from "../components/home/homeModel";
import { STOPWORDS } from "../lib/mapReply/prefilter";
import { porterStem } from "../lib/paste/stem";
import { getTopicQuestionPhrasings } from "../lib/questions";
import type { Topic } from "../lib/schemas/topic";
import { writeFileSync } from "fs";
import { join } from "path";

/** Evidence words per map, at most this many. */
const KEYWORDS_PER_MAP = 15;
/** A word counts as distinctive when at most this many maps use it anywhere. */
const KEYWORD_MAX_MAPS = 3;

/** Lowercase words of four letters or more, stopwords out, each with its stem. */
function keywordWords(text: string): { word: string; stem: string }[] {
  return (text.toLowerCase().replace(/[‘’']/g, "").match(/[a-z][a-z0-9]{3,}/g) ?? [])
    .filter((word) => !STOPWORDS.has(word))
    .map((word) => ({ word, stem: porterStem(word) }));
}

/**
 * Each map's most distinctive evidence words: from its evidence titles
 * (counted twice), descriptions and sources, the words at most
 * `KEYWORD_MAX_MAPS` maps use anywhere in their text, by how often the map's
 * evidence uses them times how rare they are, leaving out words its names,
 * claim and tags already hold. Spelled as the map most often spells them.
 */
function evidenceKeywords(all: readonly Topic[]): Map<string, string[]> {
  const perMap = all.map((topic) => {
    const evidence = [...(topic.evidence ?? []), ...topic.pillars.flatMap((pillar) => pillar.evidence ?? [])];
    const words = keywordWords(
      evidence.flatMap((item) => [item.title, item.title, item.description, item.source ?? ""]).join(" "),
    );
    const named = new Set(
      keywordWords(
        [topic.title, topic.question ?? "", topic.meta_claim, topic.id.replace(/-/g, " "),
          ...(topic.tags ?? []), ...(topic.aliases ?? []), ...getTopicQuestionPhrasings(topic.id)].join(" "),
      ).map(({ stem }) => stem),
    );
    // Every word of the map, field names included (they are in every map, so never rare).
    const everything = new Set(keywordWords(JSON.stringify(topic)).map(({ stem }) => stem));
    return { id: topic.id, words, named, everything };
  });
  const mapsWith = new Map<string, number>();
  for (const { everything } of perMap) {
    for (const stem of everything) mapsWith.set(stem, (mapsWith.get(stem) ?? 0) + 1);
  }
  const rarity = (stem: string) => Math.log(all.length / (mapsWith.get(stem) ?? 1));
  return new Map(
    perMap.map(({ id, words, named }) => {
      const counts = new Map<string, number>();
      const spellings = new Map<string, Map<string, number>>();
      for (const { word, stem } of words) {
        if (named.has(stem) || (mapsWith.get(stem) ?? 0) > KEYWORD_MAX_MAPS) continue;
        counts.set(stem, (counts.get(stem) ?? 0) + 1);
        const forms = spellings.get(stem) ?? new Map<string, number>();
        forms.set(word, (forms.get(word) ?? 0) + 1);
        spellings.set(stem, forms);
      }
      const picked = [...counts]
        .sort((a, b) => b[1] * rarity(b[0]) - a[1] * rarity(a[0]) || a[0].localeCompare(b[0]))
        .slice(0, KEYWORDS_PER_MAP)
        .map(([stem]) => [...spellings.get(stem)!].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0][0]);
      return [id, picked];
    }),
  );
}

const keywords = evidenceKeywords(topics);

const summaries = topics.map((t) => {
  // The same text the map page heads its first crux with
  // (lib/topicPage/legacy.ts): the authored question, else the live
  // disagreement, else the crux title.
  const crux = t.pillars[0]?.crux;
  const firstCrux =
    crux?.question?.trim() || crux?.falsification?.live_disagreement?.trim() || crux?.title;
  return {
    id: t.id,
    title: t.title,
    ...(t.question ? { question: t.question } : {}),
    meta_claim: t.meta_claim,
    confidence_score: t.confidence_score,
    balance: t.balance,
    weight: t.weight,
    verdict: t.verdict,
    status: t.status,
    category: t.category,
    pillarCount: t.pillars.length,
    evidenceCount: t.pillars.reduce(
      (sum, p) => sum + (p.evidence?.length ?? 0),
      0
    ),
    ...(firstCrux ? { firstCrux } : {}),
    ...(crux?.settle?.kind ? { firstCruxStanding: crux.settle.kind } : {}),
    tags: t.tags ?? [],
    ...(t.aliases?.length ? { aliases: t.aliases } : {}),
    // One string, not a list: the summaries ship to the client.
    ...(keywords.get(t.id)?.length ? { keywords: keywords.get(t.id)!.join(" ") } : {}),
    ...(t.addedAt ? { addedAt: t.addedAt } : {}),
  };
});

const outPath = join(__dirname, "../data/topicSummaries.json");
writeFileSync(outPath, JSON.stringify(summaries, null, 2) + "\n");
console.log(`Wrote ${summaries.length} topic summaries to ${outPath}`);

// The new-model maps: crux #1 as the map page ranks and words it
// (components/argument/DebateView.tsx, via the home page's model).
const argumentSummaries = argumentTopicIds.flatMap((id) => {
  const crux = loadHomeCrux(id);
  return crux ? [{ id, firstCrux: crux.question, cruxCount: crux.cruxCount }] : [];
});

const argumentOutPath = join(__dirname, "../data/argumentTopicSummaries.json");
writeFileSync(argumentOutPath, JSON.stringify(argumentSummaries, null, 2) + "\n");
console.log(`Wrote ${argumentSummaries.length} new-model map summaries to ${argumentOutPath}`);

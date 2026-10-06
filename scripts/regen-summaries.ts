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
 * Usage: npx tsx scripts/regen-summaries.ts
 */

import { topics } from "../data/topics";
import { argumentTopicIds } from "../lib/argument/topicIds";
import { loadHomeCrux } from "../components/home/homeModel";
import { writeFileSync } from "fs";
import { join } from "path";

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

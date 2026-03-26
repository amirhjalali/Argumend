/**
 * Regenerate topicSummaries.json from topics.ts
 *
 * Usage: npx tsx scripts/regen-summaries.ts
 */

import { topics } from "../data/topics";
import { writeFileSync } from "fs";
import { join } from "path";

const summaries = topics.map((t) => ({
  id: t.id,
  title: t.title,
  meta_claim: t.meta_claim,
  confidence_score: t.confidence_score,
  status: t.status,
  category: t.category,
  pillarCount: t.pillars.length,
  evidenceCount: t.pillars.reduce(
    (sum, p) => sum + (p.evidence?.length ?? 0),
    0
  ),
}));

const outPath = join(__dirname, "../data/topicSummaries.json");
writeFileSync(outPath, JSON.stringify(summaries, null, 2) + "\n");
console.log(`Wrote ${summaries.length} topic summaries to ${outPath}`);

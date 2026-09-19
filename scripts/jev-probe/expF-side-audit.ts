// Experiment F: audit every evidence card's `side` label against Jev's for/against judgment.
// Flags cards where Jev disagrees with the library label at or above a confidence threshold, for human review.
//   bun scripts/jev-probe/expF-side-audit.ts [confidenceThreshold=0.9]
import { writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { topics } from "@/data/topics";
import { jev, type Question } from "./jev";
import { fmt, mean, pool } from "./util";

const HERE = dirname(fileURLToPath(import.meta.url));
const THRESHOLD = Number(process.argv[2] ?? 0.9);

interface Card { topic: string; topicId: string; pillar: string; id: string; title: string; description: string; source: string; side: string }
const cards: Card[] = [];
for (const t of topics) for (const p of t.pillars) for (const e of p.evidence ?? []) {
  if (!e.side) continue;
  cards.push({ topic: t.title, topicId: t.id, pillar: p.id, id: e.id, title: e.title, description: e.description, source: e.source ?? "", side: e.side });
}
const questions: Record<string, Question> = {
  side: {
    type: "choice",
    instructions: "Does this piece of evidence, as described, support or cut against `topic_claim`?",
    criteria: { for: "It supports the topic claim", against: "It weighs against the topic claim" },
  },
};
console.log(`Experiment F: ${cards.length} evidence cards across ${topics.length} topics.`);
const t0 = Date.now();
const results = await pool(cards, 8, async (c) => {
  const t = topics.find((x) => x.id === c.topicId)!;
  try {
    const r = await jev({ topic_claim: t.meta_claim, evidence: { title: c.title, description: c.description, source: c.source } }, questions);
    return { c, choice: r.answers.side.choice!, confidence: r.answers.side.confidence ?? 0, retries: r.retries };
  } catch (e) {
    return { c, choice: "error", confidence: 0, retries: 0, err: String(e) };
  }
});
const ok = results.filter((r) => r.choice !== "error");
const agree = ok.filter((r) => r.choice === r.c.side).length;
const flagged = ok.filter((r) => r.choice !== r.c.side && r.confidence >= THRESHOLD).sort((a, b) => b.confidence - a.confidence);
const lowConf = ok.filter((r) => r.confidence < 0.5).length;
console.log(`${ok.length}/${results.length} scored in ${fmt((Date.now() - t0) / 1000, 1)} s; retries ${results.reduce((s, r) => s + r.retries, 0)}; mean confidence ${fmt(mean(ok.map((r) => r.confidence)))}`);
console.log(`agree with library label: ${agree}/${ok.length} = ${fmt((100 * agree) / ok.length, 1)}%`);
console.log(`disagree at confidence >= ${THRESHOLD}: ${flagged.length}   |   low-confidence (< 0.5) cards: ${lowConf}`);
for (const f of flagged.slice(0, 25)) console.log(`  ${fmt(f.confidence)}  [${f.c.topicId} / ${f.c.pillar}] library=${f.c.side} jev=${f.choice}  ${f.c.title.slice(0, 90)}`);
writeFileSync(`${HERE}/expF.results.json`, JSON.stringify({ threshold: THRESHOLD, total: ok.length, agree, flagged: flagged.map((f) => ({ ...f.c, jev: f.choice, confidence: f.confidence })) }, null, 1));

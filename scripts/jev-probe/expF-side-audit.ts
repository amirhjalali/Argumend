// Experiment F: audit every evidence card's `side` label against Jev's for/against judgment.
// Flags cards where Jev disagrees with the library label at or above a confidence threshold, for human review,
// and reports per-topic agreement so a whole-map convention error (labels written against the section's skeptic
// framing rather than the meta claim) shows up as a low-agreement topic rather than as scattered single flags.
//   bun scripts/jev-probe/expF-side-audit.ts [confidenceThreshold=0.9]
import { writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { topics } from "@/data/topics";
import { jev, type Question } from "./jev";
import { fmt, mean, pool } from "./util";

const HERE = dirname(fileURLToPath(import.meta.url));
const THRESHOLD = Number(process.argv[2] ?? 0.9);
/** Topics below this agreement rate are candidates for a whole-map convention error. */
const TOPIC_ALERT = 0.75;

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

// Per-topic agreement. A map whose labels follow the wrong convention shows up here as a block,
// not as the scattered single flags the >= threshold list gives.
interface TopicStat { topicId: string; topic: string; cards: number; agree: number; rate: number; flagged: number }
const byTopic = new Map<string, TopicStat>();
for (const r of ok) {
  let s = byTopic.get(r.c.topicId);
  if (!s) { s = { topicId: r.c.topicId, topic: r.c.topic, cards: 0, agree: 0, rate: 0, flagged: 0 }; byTopic.set(r.c.topicId, s); }
  s.cards += 1;
  if (r.choice === r.c.side) s.agree += 1;
  else if (r.confidence >= THRESHOLD) s.flagged += 1;
}
const topicStats = [...byTopic.values()];
for (const s of topicStats) s.rate = s.agree / s.cards;
topicStats.sort((a, b) => a.rate - b.rate || b.cards - a.cards);
const alerts = topicStats.filter((s) => s.rate < TOPIC_ALERT);
console.log(`\nper-topic agreement: ${topicStats.length} topics; ${alerts.length} below ${fmt(100 * TOPIC_ALERT, 0)}% (whole-map convention candidates)`);
for (const s of topicStats.filter((x) => x.rate < 0.9)) {
  const mark = s.rate < TOPIC_ALERT ? "!!" : "  ";
  console.log(`  ${mark} ${fmt(100 * s.rate, 1).padStart(5)}%  ${String(s.agree).padStart(3)}/${String(s.cards).padEnd(3)} agree, ${String(s.flagged).padStart(2)} flagged  ${s.topicId}`);
}

writeFileSync(
  `${HERE}/expF.results.json`,
  JSON.stringify(
    {
      threshold: THRESHOLD,
      total: ok.length,
      agree,
      topics: topicStats,
      flagged: flagged.map((f) => ({ ...f.c, jev: f.choice, confidence: f.confidence })),
      all: ok.map((r) => ({ ...r.c, jev: r.choice, confidence: r.confidence })),
    },
    null,
    1
  )
);

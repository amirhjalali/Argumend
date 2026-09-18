// Experiment B: can Jev route an online comment to the right place on an Argumend map?
// For sampled pillars, the first sentences of the pillar's skeptic premise and proponent rebuttal are
// treated as two "comments". Ground truth: which pillar they came from (Choice over that topic's pillars)
// and which side wrote them (skeptic vs proponent).
import { writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
const HERE = dirname(fileURLToPath(import.meta.url));
import { topics } from "@/data/topics";
import { jev, type Question } from "./jev";
import { fmt, mean, pool, sample } from "./util";

const N = Number(process.argv[2] ?? 150);

function firstSentences(text: string, n = 2): string {
  // Split on sentence enders followed by whitespace and a capital letter, so "$1.5B" and "3% in 2015" stay intact.
  const parts = text.split(/(?<=[.!?])\s+(?=[A-Z"'(])/);
  return parts.slice(0, n).join(" ").trim();
}

interface Probe { topic: string; claim: string; pillars: { id: string; title: string; summary: string }[]; pillarId: string; stance: "skeptic" | "proponent"; comment: string }
const probes: Probe[] = [];
for (const t of topics) {
  if (t.pillars.length < 3) continue;
  const pillars = t.pillars.map((p) => ({ id: p.id, title: p.title, summary: p.short_summary }));
  for (const p of t.pillars) {
    probes.push({ topic: t.title, claim: t.meta_claim, pillars, pillarId: p.id, stance: "skeptic", comment: firstSentences(p.skeptic_premise) });
    probes.push({ topic: t.title, claim: t.meta_claim, pillars, pillarId: p.id, stance: "proponent", comment: firstSentences(p.proponent_rebuttal) });
  }
}
const items = sample(probes, N);
console.log(`Experiment B: ${items.length} of ${probes.length} comments (pillar x stance), seeded sample. Mean options per topic: ${fmt(mean(items.map((i) => i.pillars.length)), 1)}`);

const t0 = Date.now();
const results = await pool(items, 6, async (it) => {
  const state = { topic_claim: it.claim, comment: it.comment, map_sections: Object.fromEntries(it.pillars.map((p) => [p.id, { title: p.title, summary: p.summary }])) };
  const questions: Record<string, Question> = {
    section: {
      type: "choice",
      instructions: "`comment` was posted in an online discussion of `topic_claim`. Which section of the argument map in `map_sections` is it arguing about?",
      criteria: Object.fromEntries(it.pillars.map((p) => [p.id, `${p.title}: ${p.summary}`])),
    },
    stance: {
      type: "choice",
      instructions: "Is the author of `comment` arguing for `topic_claim` or against it?",
      criteria: { proponent: "Argues for the topic claim", skeptic: "Argues against the topic claim" },
    },
  };
  try {
    return { it, r: await jev(state, questions) };
  } catch (e) {
    return { it, r: null, err: String(e) };
  }
});
const ok = results.filter((x) => x.r);
console.log(`${ok.length}/${results.length} succeeded in ${fmt((Date.now() - t0) / 1000, 1)} s wall, mean latency ${Math.round(mean(ok.map((x) => x.r!.ms)))} ms`);
const secHits = ok.filter((x) => x.r!.answers.section.choice === x.it.pillarId).length;
const stanceHits = ok.filter((x) => x.r!.answers.stance.choice === x.it.stance).length;
const chance = mean(ok.map((x) => 1 / x.it.pillars.length));
console.log(`section routing accuracy: ${secHits}/${ok.length} = ${fmt((100 * secHits) / ok.length, 1)}%   (chance ${fmt(100 * chance, 0)}%)`);
console.log(`stance accuracy:          ${stanceHits}/${ok.length} = ${fmt((100 * stanceHits) / ok.length, 1)}%`);
const both = ok.filter((x) => x.r!.answers.section.choice === x.it.pillarId && x.r!.answers.stance.choice === x.it.stance).length;
console.log(`both right:               ${both}/${ok.length} = ${fmt((100 * both) / ok.length, 1)}%`);
const hi = ok.filter((x) => (x.r!.answers.section.confidence ?? 0) >= 0.7);
console.log(`section when confidence >= 0.7 (${hi.length}): ${fmt((100 * hi.filter((x) => x.r!.answers.section.choice === x.it.pillarId).length) / Math.max(1, hi.length), 1)}%`);
const misses = ok.filter((x) => x.r!.answers.section.choice !== x.it.pillarId).slice(0, 6);
for (const m of misses) console.log(`  miss: [${m.it.topic}] "${m.it.comment.slice(0, 110)}..." -> ${m.r!.answers.section.choice} (truth ${m.it.pillarId}, conf ${fmt(m.r!.answers.section.confidence ?? 0)})`);
writeFileSync(`${HERE}/expB.results.json`, JSON.stringify(ok.map((x) => ({ topic: x.it.topic, comment: x.it.comment, truth: x.it.pillarId, jev: x.r!.answers.section.choice, conf: x.r!.answers.section.confidence, stance: x.it.stance, jevStance: x.r!.answers.stance.choice })), null, 1));

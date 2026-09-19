// Experiment A: can Jev reproduce Argumend's four-dimension evidence weighting?
// Ground truth: human-authored weight {sourceReliability, independence, replicability, directness} (0-10)
// and `side` on 1,567 evidence items across the topic library. The human `reasoning` field is withheld.
import { writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
const HERE = dirname(fileURLToPath(import.meta.url));
import { topics } from "@/data/topics";
import { calculateEvidenceScore } from "@/lib/evidenceMetrics";
import { jev, type Question } from "./jev";
import { fmt, mean, pool, sample, spearman } from "./util";

const N = Number(process.argv[2] ?? 240);

interface Item {
  topic: string; claim: string; pillar: string; title: string; description: string; source: string;
  side: "for" | "against"; weight: { sourceReliability: number; independence: number; replicability: number; directness: number };
}
const all: Item[] = [];
for (const t of topics) for (const p of t.pillars) for (const e of p.evidence ?? []) {
  if (!e.weight || !e.side) continue;
  all.push({ topic: t.title, claim: t.meta_claim, pillar: p.title, title: e.title, description: e.description, source: e.source ?? "", side: e.side as "for" | "against", weight: e.weight });
}
const items = sample(all, N);
console.log(`Experiment A: ${items.length} of ${all.length} evidence items, seeded sample.`);

// Five levels per dimension, mapped onto the library's 0-10 scale by rank correlation, not by value.
const LEVELS = {
  sourceReliability: [
    "Anonymous, self-published, or an advocacy source with no method disclosed",
    "Partisan or trade source, or journalism with no primary data",
    "Reputable journalism, government summary, or a single non-peer-reviewed study",
    "Peer-reviewed study, official statistics, or court record",
    "Meta-analysis, systematic review, or primary official data of the highest standard",
  ],
  independence: [
    "Produced by a party with a direct stake in the conclusion",
    "Produced by a sympathetic party or funded by an interested one",
    "Mixed: some interest, some distance",
    "Largely independent of the parties to the dispute",
    "Fully independent, adversarial, or court-appointed",
  ],
  replicability: [
    "A single anecdote or one-off event that cannot be checked",
    "One study or dataset, not yet replicated",
    "Replicated at least once, or a stable public dataset",
    "Replicated several times across settings",
    "Robust across many replications, datasets, or years",
  ],
  directness: [
    "Only tangentially related to the claim it is used for",
    "Bears on a related or proxy question",
    "Bears on the claim but through inference or extrapolation",
    "Directly measures a component of the claim",
    "Directly measures the very thing the claim asserts",
  ],
} as const;

const questions: Record<string, Question> = {
  side: {
    type: "choice",
    instructions: "Does this piece of evidence, as described, support or cut against `topic_claim`?",
    criteria: { for: "It supports the topic claim", against: "It weighs against the topic claim" },
  },
  ...Object.fromEntries(
    Object.entries(LEVELS).map(([dim, levels]) => [dim, { type: "score", instructions: `Rate the ${dim === "sourceReliability" ? "reliability of the source" : dim === "independence" ? "independence of the source from the parties to the dispute" : dim === "replicability" ? "replicability of the finding" : "directness with which the evidence bears on the topic claim"} for \`evidence\`.`, criteria: [...levels] }]),
  ),
};

const t0 = Date.now();
const results = await pool(items, 6, async (it) => {
  const state = { topic_claim: it.claim, pillar: it.pillar, evidence: { title: it.title, description: it.description, source: it.source } };
  try {
    const r = await jev(state, questions);
    return { it, r };
  } catch (e) {
    return { it, r: null, err: String(e) };
  }
});
const ok = results.filter((x) => x.r);
const wall = (Date.now() - t0) / 1000;
console.log(`${ok.length}/${results.length} succeeded in ${fmt(wall, 1)} s wall, mean latency ${Math.round(mean(ok.map((x) => x.r!.ms)))} ms, ${ok.reduce((s, x) => s + x.r!.usage.input_tokens, 0)} input tokens`);

const sideHits = ok.filter((x) => x.r!.answers.side.choice === x.it.side).length;
console.log(`side (for/against) accuracy: ${sideHits}/${ok.length} = ${fmt((100 * sideHits) / ok.length, 1)}%`);
const confident = ok.filter((x) => (x.r!.answers.side.confidence ?? 0) >= 0.8);
const confHits = confident.filter((x) => x.r!.answers.side.choice === x.it.side).length;
console.log(`  when confidence >= 0.8 (${confident.length} items): ${fmt((100 * confHits) / Math.max(1, confident.length), 1)}%`);

for (const dim of Object.keys(LEVELS) as (keyof typeof LEVELS)[]) {
  const human = ok.map((x) => x.it.weight[dim]);
  const model = ok.map((x) => x.r!.answers[dim].score!);
  console.log(`${dim.padEnd(18)} spearman ${fmt(spearman(human, model))}   human mean ${fmt(mean(human), 1)}/10   jev mean ${fmt(mean(model), 2)}/4`);
}
const humanTotal = ok.map((x) => calculateEvidenceScore(x.it.weight));
const modelTotal = ok.map((x) => (Object.keys(LEVELS) as (keyof typeof LEVELS)[]).reduce((s, d) => s + x.r!.answers[d].score!, 0));
console.log(`composite score      spearman ${fmt(spearman(humanTotal, modelTotal))}`);

writeFileSync(`${HERE}/expA.results.json`, JSON.stringify(ok.map((x) => ({ topic: x.it.topic, title: x.it.title, side: x.it.side, jevSide: x.r!.answers.side.choice, sideConf: x.r!.answers.side.confidence, human: x.it.weight, jev: Object.fromEntries((Object.keys(LEVELS) as string[]).map((d) => [d, x.r!.answers[d].score])) })), null, 1));

// Experiment D: does Jev's holistic read of a topic agree with the verdict Argumend computes from evidence weights?
// Ground truth: verdict.quadrant (settled / moderate / contested) and the direction in verdict.label, over all topics.
import { topics } from "@/data/topics";
import { jev, type Question } from "./jev";
import { fmt, mean, pool } from "./util";

const items = topics.filter((t) => t.verdict && t.simple_case && t.pillars.length);
console.log(`Experiment D: ${items.length} topics.`);

function direction(label: string): "claim" | "counterclaim" | "balanced" {
  if (/favors the claim|toward the claim/i.test(label)) return "claim";
  if (/counterclaim/i.test(label)) return "counterclaim";
  return "balanced";
}

const questions: Record<string, Question> = {
  settledness: {
    type: "choice",
    instructions: "Given the strongest simple case for each side in `simple_case_for` and `simple_case_against`, and the keystone fact, how settled is `claim` on the evidence?",
    criteria: {
      contested: "Genuinely contested: strong evidence and serious arguments on both sides",
      moderate: "Leans one way on the evidence but with real remaining dispute",
      settled: "The evidence strongly favors one side; the other side's case is weak",
    },
  },
  direction: {
    type: "choice",
    instructions: "On the evidence presented, which way does the balance tilt on `claim`?",
    criteria: { claim: "Toward the claim being true", balanced: "Roughly balanced", counterclaim: "Toward the claim being false" },
  },
};

const t0 = Date.now();
const results = await pool(items, 6, async (t) => {
  const simple = Array.isArray(t.simple_case) ? t.simple_case : [];
  const state = { claim: t.meta_claim, simple_case_for: simple[0] ?? "", simple_case_against: simple[1] ?? "", keystone_fact: t.keystone_fact?.statement ?? "" };
  try {
    return { t, r: await jev(state, questions) };
  } catch {
    return { t, r: null };
  }
});
const ok = results.filter((x) => x.r);
console.log(`${ok.length}/${results.length} in ${fmt((Date.now() - t0) / 1000, 1)} s, mean latency ${Math.round(mean(ok.map((x) => x.r!.ms)))} ms`);
const qHits = ok.filter((x) => x.r!.answers.settledness.choice === x.t.verdict.quadrant).length;
console.log(`settledness (3-way) agreement: ${qHits}/${ok.length} = ${fmt((100 * qHits) / ok.length, 1)}%`);
const conf: Record<string, Record<string, number>> = {};
for (const q of ["contested", "moderate", "settled"]) conf[q] = { contested: 0, moderate: 0, settled: 0 };
for (const x of ok) conf[x.t.verdict.quadrant][x.r!.answers.settledness.choice!]++;
console.log("  confusion (rows = Argumend verdict, cols = Jev): " + JSON.stringify(conf));
const dirItems = ok.filter((x) => x.t.verdict.quadrant !== "contested");
const dHits = dirItems.filter((x) => x.r!.answers.direction.choice === direction(x.t.verdict.label)).length;
console.log(`direction agreement on non-contested topics: ${dHits}/${dirItems.length} = ${fmt((100 * dHits) / Math.max(1, dirItems.length), 1)}%`);
const settledWrongWay = ok.filter((x) => x.t.verdict.quadrant === "settled" && x.r!.answers.direction.choice !== direction(x.t.verdict.label));
for (const x of settledWrongWay) console.log(`  settled but Jev disagrees on direction: ${x.t.id}: Argumend=${direction(x.t.verdict.label)} Jev=${x.r!.answers.direction.choice} (${fmt(x.r!.answers.direction.confidence ?? 0)})`);

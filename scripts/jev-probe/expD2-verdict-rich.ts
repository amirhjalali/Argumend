// Experiment D2: same as D but with the whole map summary as state (pillar summaries + evidence titles per side).
import { topics } from "@/data/topics";
import { jev, type Question } from "./jev";
import { fmt, mean, pool } from "./util";

const items = topics.filter((t) => t.verdict && t.pillars.length && t.pillars.every((p) => p.evidence));
console.log(`Experiment D2: ${items.length} topics, rich state.`);
const questions: Record<string, Question> = {
  settledness: {
    type: "choice",
    instructions: "Given the argument map in `sections`, with each section's summary and the evidence listed for and against, how settled is `claim` on the evidence?",
    criteria: {
      contested: "Genuinely contested: strong evidence and serious arguments on both sides",
      moderate: "Leans one way on the evidence but with real remaining dispute",
      settled: "The evidence strongly favors one side; the other side's case is weak",
    },
  },
  direction: {
    type: "choice",
    instructions: "On the evidence in `sections`, which way does the balance tilt on `claim`?",
    criteria: { claim: "Toward the claim being true", balanced: "Roughly balanced", counterclaim: "Toward the claim being false" },
  },
};
function direction(label: string) { return /favors the claim|toward the claim/i.test(label) ? "claim" : /counterclaim/i.test(label) ? "counterclaim" : "balanced"; }
const results = await pool(items, 6, async (t) => {
  const state = { claim: t.meta_claim, sections: t.pillars.map((p) => ({ title: p.title, summary: p.short_summary, evidence_for: (p.evidence ?? []).filter((e) => e.side === "for").map((e) => e.title), evidence_against: (p.evidence ?? []).filter((e) => e.side === "against").map((e) => e.title) })) };
  try { return { t, r: await jev(state, questions) }; } catch { return { t, r: null }; }
});
const ok = results.filter((x) => x.r);
console.log(`${ok.length}/${results.length}, mean latency ${Math.round(mean(ok.map((x) => x.r!.ms)))} ms, mean input tokens ${Math.round(mean(ok.map((x) => x.r!.usage.input_tokens)))}`);
const qHits = ok.filter((x) => x.r!.answers.settledness.choice === x.t.verdict.quadrant).length;
console.log(`settledness agreement: ${qHits}/${ok.length} = ${fmt((100 * qHits) / ok.length, 1)}%`);
const conf: Record<string, Record<string, number>> = {};
for (const q of ["contested", "moderate", "settled"]) conf[q] = { contested: 0, moderate: 0, settled: 0 };
for (const x of ok) conf[x.t.verdict.quadrant][x.r!.answers.settledness.choice!]++;
console.log("  confusion: " + JSON.stringify(conf));
const nc = ok.filter((x) => x.t.verdict.quadrant !== "contested");
console.log(`direction agreement on non-contested: ${nc.filter((x) => x.r!.answers.direction.choice === direction(x.t.verdict.label)).length}/${nc.length}`);
const settled = ok.filter((x) => x.t.verdict.quadrant === "settled");
console.log(`direction agreement on settled only: ${settled.filter((x) => x.r!.answers.direction.choice === direction(x.t.verdict.label)).length}/${settled.length}`);

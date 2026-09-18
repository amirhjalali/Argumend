// Round 1: diagnosis pattern classification on the five human-eval-kit items.
// Ground truth = "Spec pattern it should produce" in each kit file.
import { jev, pct, type JevResponse, type Question } from "./jev";

import { kitSource } from "./kit";
const ITEMS = [
  { id: "01-recycling-rejections", expected: ["single-empirical-crux"], acceptable: ["causal-model-split"] },
  { id: "02-bequest-reserve-or-cohort", expected: ["priority-tradeoff"], acceptable: ["value-conflict"] },
  { id: "03-creek-cleanup-success", expected: ["definition-mismatch"], acceptable: [] },
  { id: "04-dog-park-hours", expected: ["mixed-disagreement"], acceptable: ["single-empirical-crux"] },
  { id: "05-choir-december-concert", expected: ["mostly-common-ground"], acceptable: [] },
];

const PATTERN_CRITERIA: Record<string, string> = {
  "mostly-common-ground": "The parties agree on nearly everything; what looks like a dispute is a small residual or a misunderstanding.",
  "single-empirical-crux": "One question of fact or evidence, if settled, would resolve the dispute; the parties would accept the answer.",
  "causal-model-split": "They agree on the facts but disagree about what causes what.",
  "forecast-split": "They disagree mainly about what will happen in the future.",
  "definition-mismatch": "They mean different things by a key word, so they are partly talking past each other.",
  "value-conflict": "They disagree about what matters or what is right, and no evidence would change that.",
  "priority-tradeoff": "They share values but rank competing goods differently under a constraint such as money or time.",
  "trust-split": "They disagree mainly about which sources, people, or institutions can be believed.",
  "mixed-disagreement": "Two or more distinct disagreements of different kinds are stacked together, for example an empirical one and a value one.",
  "not-a-disagreement": "The parties are not actually disagreeing with each other.",
};

const questions: Record<string, Question> = {
  pattern: {
    type: "choice",
    instructions:
      "This is a written disagreement between two or more people. Which pattern best describes the structure of the disagreement as a whole?",
    criteria: PATTERN_CRITERIA,
  },
  genuine: {
    type: "noul",
    instructions: "Do the parties genuinely disagree about something, rather than mostly agreeing?",
  },
  empirical_lever: {
    type: "noul",
    instructions:
      "Is there a specific factual or evidential question such that at least one party says, or clearly implies, they would change their position if it were answered?",
  },
  value_residual: {
    type: "noul",
    instructions:
      "Does at least one party hold a position on values or priorities that they indicate no factual evidence would change?",
  },
  definitional: {
    type: "noul",
    instructions: "Are the parties using a key term to mean different things, so that part of the dispute is about the word rather than the world?",
  },
};

const REPEATS = 5;
let totalMs = 0;
let calls = 0;
let correct = 0;
let acceptableHits = 0;

for (const item of ITEMS) {
  const text = kitSource(item.id);
  const runs: JevResponse[] = [];
  for (let i = 0; i < REPEATS; i++) {
    const r = await jev(text, questions);
    runs.push(r);
    totalMs += r.ms;
    calls++;
  }
  const patterns = runs.map((r) => r.answers.pattern.choice!);
  const distinct = new Set(patterns);
  const modal = [...distinct].sort((a, b) => patterns.filter((p) => p === b).length - patterns.filter((p) => p === a).length)[0];
  const hit = item.expected.includes(modal);
  const acc = item.acceptable.includes(modal);
  if (hit) correct++;
  if (acc) acceptableHits++;
  const r0 = runs[0];
  const top3 = Object.entries(r0.answers.pattern.probabilities!)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([k, v]) => `${k} ${pct(v)}`)
    .join(", ");
  console.log(`\n### ${item.id}  expected=${item.expected[0]}  acceptable=${item.acceptable.join("|") || "-"}`);
  console.log(`  modal=${modal}  ${hit ? "CORRECT" : acc ? "ACCEPTABLE" : "WRONG"}  identical across ${REPEATS} runs: ${distinct.size === 1 ? "yes" : "NO (" + [...distinct].join(", ") + ")"}`);
  console.log(`  run1 top3: ${top3}   confidence ${pct(r0.answers.pattern.confidence)}`);
  const nouls = ["genuine", "empirical_lever", "value_residual", "definitional"]
    .map((k) => `${k}=${runs.map((r) => pct(r.answers[k].noul)).join("/")}`)
    .join("  ");
  console.log(`  nouls (5 runs): ${nouls}`);
  console.log(`  latency ms: ${runs.map((r) => r.ms).join(", ")}   input_tokens=${r0.usage.input_tokens}`);
}

console.log(`\n== Round 1 summary: ${correct}/${ITEMS.length} modal pattern exactly expected, +${acceptableHits} acceptable. ${calls} calls, mean ${Math.round(totalMs / calls)} ms.`);

// Round 2: crux contestedness + crux selection on the three flagship transcripts.
// Candidates mix the deterministic engine's top-3 cruxes, the sonnet runs' primary cruxes from
// docs/reviews/2026-09-15-crux-repeatability.md, and one deliberately uncontested distractor.
import { readFileSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { jev, pct, type JevResponse, type Question } from "./jev";

const DIR = dirname(fileURLToPath(import.meta.url));

interface Candidate { label: string; statement: string; kind: "engine" | "sonnet" | "distractor" | "main-question" }

const MAPS: { id: string; question: string; candidates: Candidate[] }[] = [
  {
    id: "ai-mass-unemployment",
    question: "Will AI cause mass unemployment in the U.S. within the next 15 years?",
    candidates: [
      { kind: "engine", label: "E1 firms cut headcount", statement: "Firms facing improved AI capability respond primarily by reducing hiring and headcount growth rather than by expanding output or redesigning jobs to use the freed-up capacity." },
      { kind: "engine", label: "E2 targeted workforce programs work", statement: "Better-designed, targeted, employer-linked, long-horizon workforce programs can meaningfully improve displaced workers' earnings and employment, even though generic short retraining programs mostly do not." },
      { kind: "engine", label: "E3 retrain/relocate cheaply", statement: "Workers displaced from automated tasks can retrain and relocate into newly created tasks at a cost and delay small relative to the productivity gains." },
      { kind: "sonnet", label: "S1 AI vs macro explains early-career decline", statement: "The recent early-career employment decline in AI-exposed occupations is caused by AI adoption rather than by interest rates, the post-2021 tech correction, or offshoring." },
      { kind: "sonnet", label: "S2 what counts as mass unemployment", statement: "'Mass unemployment' should be defined by headline U-3 unemployment reaching crisis levels, rather than by concentrated wage stagnation and downgrading in specific cohorts while aggregates look normal." },
      { kind: "sonnet", label: "S3 empirical vs governance question", statement: "Whether AI produces mass unemployment is an empirical question that evidence about exposure and capability can settle, rather than a governance question about who decides deployment and who bears the costs." },
      { kind: "distractor", label: "D uncontested: decline happened", statement: "Employment among early-career workers in AI-exposed occupations has declined since 2022." },
    ],
  },
  {
    id: "capitalism-after-ai",
    question: "Can market capitalism survive advanced AI in recognizable form?",
    candidates: [
      { kind: "engine", label: "E1 ownership stays concentrated", statement: "Ownership and control of frontier AI models, compute, and the data that trains them will remain concentrated in a small number of firms and individuals rather than diffusing broadly over the next decade." },
      { kind: "engine", label: "E2 displaced workers re-enter fast enough", statement: "Workers displaced from AI-exposed tasks will be able to re-enter higher-productivity complementary jobs at a pace that avoids sustained aggregate underemployment, as occurred in prior automation waves." },
      { kind: "engine", label: "E3 survival depends on definition", statement: "Whether capitalism has 'survived' AI depends on which criterion is used: private ownership and market allocation persisting, or labor remaining the primary channel through which households obtain purchasing power." },
      { kind: "sonnet", label: "S1 redistributive economy still capitalism", statement: "A heavily redistributive market economy with UBI, AI taxes, and public compute still counts as capitalism." },
      { kind: "sonnet", label: "S2 automation absorbed vs labor share shrinks", statement: "Advanced-AI-driven task automation will be absorbed through complementary job creation rather than structurally shrinking labor's share of income." },
      { kind: "main-question", label: "M main question restated", statement: "Capitalism survives advanced AI in recognizable form because private ownership, profit-seeking firms, and price-mediated markets persist while institutions adapt around the edges." },
      { kind: "distractor", label: "D uncontested: AI automates tasks", statement: "Advanced AI will automate a large number of tasks currently performed by human workers." },
    ],
  },
  {
    id: "us-israel-support",
    question: "Should the United States substantially reduce its military and diplomatic support for Israel?",
    candidates: [
      { kind: "engine", label: "E1 regional stability depends on alliance", statement: "Regional stability against Iran-aligned threats depends on maintaining the current structure of U.S.-Israel military alliance and support." },
      { kind: "engine", label: "E2 death toll ~71-73k but uncertain (flagged uncontested)", statement: "The reported direct-death total in Gaza had converged near 71,000–73,000 by mid-2026, but the true scale and composition of Palestinian deaths remain uncertain because identification, undercount, indirect mortality, and combatant-versus-civilian classification are unresolved." },
      { kind: "engine", label: "E3 near half of killed were combatants", statement: "A substantial share, potentially close to half, of Palestinians killed in the Gaza war have been Hamas or allied combatants." },
      { kind: "sonnet", label: "S1 IHL compliance", statement: "Israel's conduct of the Gaza war complies with U.S. and international humanitarian-law standards that condition U.S. arms transfers." },
      { kind: "sonnet", label: "S2 legal review is followed", statement: "U.S. arms transfers to Israel currently receive the transparency, congressional notification, and legal review that the governing authorities require." },
      { kind: "main-question", label: "M main question restated", statement: "The United States should substantially cut its military and diplomatic support for Israel." },
      { kind: "distractor", label: "D uncontested: $3.8B MOU", statement: "The United States provides Israel roughly $3.8 billion per year in military financing under a ten-year memorandum of understanding." },
    ],
  },
];

const REPEATS = 3;
for (const map of MAPS) {
  const transcript = readFileSync(`${DIR}/${map.id}.transcript.txt`, "utf8");
  const state = {
    main_question: map.question,
    transcript,
    candidates: Object.fromEntries(map.candidates.map((c, i) => [`c${i}`, c.statement])),
  };
  const questions: Record<string, Question> = {};
  map.candidates.forEach((c, i) => {
    questions[`contested_c${i}`] = {
      type: "noul",
      instructions: `Do the speakers in \`transcript\` actually disagree with one another about whether the claim in \`candidates.c${i}\` is true? Answer yes only if at least one speaker asserts it and at least one speaker disputes or contradicts it, explicitly or by clear implication.`,
      criteria: { true: "Speakers take opposing sides on this claim", false: "Nobody disputes it, or nobody discusses it; it is common ground or background" },
    };
    questions[`pivotal_c${i}`] = {
      type: "noul",
      instructions: `If the claim in \`candidates.c${i}\` were conclusively settled one way or the other, would at least one speaker in \`transcript\` have to change their answer to \`main_question\`?`,
    };
  });
  questions.best_crux = {
    type: "choice",
    instructions:
      "Among the candidate claims, which one is the crux of this debate: the claim that the speakers genuinely disagree about AND whose resolution would most change their answers to `main_question`? Prefer a claim that would settle the dispute over one that merely restates it.",
    criteria: Object.fromEntries(map.candidates.map((c, i) => [`c${i}`, c.statement])),
  };

  const runs: JevResponse[] = [];
  for (let i = 0; i < REPEATS; i++) runs.push(await jev(state, questions));
  const r0 = runs[0];
  console.log(`\n### ${map.id}  (${r0.usage.input_tokens} input tokens, latency ${runs.map((r) => r.ms).join("/")} ms)`);
  console.log(`  ${"candidate".padEnd(58)} contested(3 runs)      pivotal(3 runs)        best_crux prob`);
  map.candidates.forEach((c, i) => {
    const con = runs.map((r) => pct(r.answers[`contested_c${i}`].noul)).join(" ");
    const piv = runs.map((r) => pct(r.answers[`pivotal_c${i}`].noul)).join(" ");
    const bp = pct(r0.answers.best_crux.probabilities![`c${i}`]);
    console.log(`  ${c.label.padEnd(58)} ${con}   ${piv}   ${bp}`);
  });
  const picks = runs.map((r) => map.candidates[Number(r.answers.best_crux.choice!.slice(1))].label);
  console.log(`  best_crux picks: ${picks.join(" | ")}   confidence ${pct(r0.answers.best_crux.confidence)}   stable: ${new Set(picks).size === 1 ? "yes" : "NO"}`);
}

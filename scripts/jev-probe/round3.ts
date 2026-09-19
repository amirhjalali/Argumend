// Round 3: the "judge bot" idea. Can Jev say who is right in an online argument, fast and stably?
// Three cases: (a) a real contested policy dispute, (b) a factual dispute where one side is plainly wrong,
// (c) a dispute where the loud side is wrong but sounds confident.
import { jev, pct, type JevResponse, type Question } from "./jev";

import { kitSource } from "./kit";

const CASES: { id: string; text: string; note: string }[] = [
  {
    id: "immigration-wages (contested)",
    note: "genuinely contested among economists; a good judge should NOT be confident",
    text: `Alex: Immigration is destroying wages for working-class Americans.
Blair: That's complete nonsense. Immigrants grow the economy and create jobs.
Alex: The labor-supply effect hits the people who compete with new arrivals.
Blair: Complementarity and extra demand more than offset that.`,
  },
  {
    id: "vaccines-autism (one side plainly wrong)",
    note: "B is right; a judge should be confident for B",
    text: `A: The MMR vaccine causes autism, the 1998 Lancet study proved it and they covered it up.
B: That study was retracted for fraud, the author lost his license, and dozens of studies with millions of children found no link.
A: Those studies were funded by pharma. Ask any parent who watched their kid change after the shot.
B: Correlation with the age autism is usually diagnosed isn't causation. The retraction wasn't a cover-up, it was a fraud finding.`,
  },
  {
    id: "confident-but-wrong (loud side wrong)",
    note: "A sounds confident but is wrong: the Great Wall is not visible from orbit with the naked eye",
    text: `A: Everyone knows the Great Wall of China is the only man-made structure visible from space. It's in every textbook, astronauts confirm it.
B: I don't think that's right? It's very long but only a few meters wide. I read astronauts said they couldn't see it.
A: You read wrong. NASA has photos. Stop repeating internet myths.
B: I mean I could be mistaken but I'm fairly sure Chinese astronaut Yang Liwei said he couldn't see it.`,
  },
  {
    id: "dog-park (mixed, from the eval kit)",
    note: "value dispute, no correct answer; judge should not pick a winner confidently",
    text: kitSource("04-dog-park-hours"),
  },
];

const questions: Record<string, Question> = {
  better_supported: {
    type: "choice",
    instructions:
      "Considering only what is written in this exchange, whose position is better supported by the reasons and evidence they actually give?",
    criteria: {
      first_speaker: "The first speaker's position is better supported by what is written",
      second_speaker: "The second speaker's position is better supported by what is written",
      neither: "Neither side gives materially better support; it is a wash or a values dispute",
    },
  },
  factually_correct: {
    type: "choice",
    instructions:
      "Using your own knowledge of the world, which speaker's central factual claim is actually correct?",
    criteria: {
      first_speaker: "The first speaker's central factual claim is correct",
      second_speaker: "The second speaker's central factual claim is correct",
      unsettled: "The central question is genuinely unsettled among experts or is not a factual question",
    },
  },
  is_factual_dispute: {
    type: "noul",
    instructions: "Is the core of this dispute a question of fact that evidence could in principle settle, as opposed to a dispute about values or priorities?",
  },
  first_uses_fallacy: {
    type: "noul",
    instructions: "Does the first speaker rely on a recognizable reasoning fallacy, such as appeal to popularity, ad hominem, anecdote as proof, or motive attack on evidence?",
  },
  second_uses_fallacy: {
    type: "noul",
    instructions: "Does the second speaker rely on a recognizable reasoning fallacy, such as appeal to popularity, ad hominem, anecdote as proof, or motive attack on evidence?",
  },
  needs_reasoning_model: {
    type: "noul",
    instructions: "Would a fair verdict on this exchange require careful multi-step reasoning or checking specific evidence, rather than a quick judgment?",
  },
};

const REPEATS = 3;
for (const c of CASES) {
  const runs: JevResponse[] = [];
  for (let i = 0; i < REPEATS; i++) runs.push(await jev(c.text, questions));
  const r = runs[0];
  const bs = r.answers.better_supported;
  const fc = r.answers.factually_correct;
  console.log(`\n### ${c.id}\n  note: ${c.note}`);
  console.log(`  better_supported: ${bs.choice} (${pct(bs.confidence)})  probs ${Object.entries(bs.probabilities!).map(([k, v]) => `${k}=${pct(v)}`).join(" ")}`);
  console.log(`  factually_correct: ${fc.choice} (${pct(fc.confidence)})  probs ${Object.entries(fc.probabilities!).map(([k, v]) => `${k}=${pct(v)}`).join(" ")}`);
  for (const k of ["is_factual_dispute", "first_uses_fallacy", "second_uses_fallacy", "needs_reasoning_model"])
    console.log(`  ${k}: ${runs.map((x) => pct(x.answers[k].noul)).join(" / ")}`);
  console.log(`  stable choices across ${REPEATS} runs: ${new Set(runs.map((x) => x.answers.better_supported.choice + "|" + x.answers.factually_correct.choice)).size === 1 ? "yes" : "NO"}   latency ms: ${runs.map((x) => x.ms).join(", ")}`);
}

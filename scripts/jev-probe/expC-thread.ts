// Experiment C: the demo. A realistic online thread about rent control is run through Jev
// (route each comment to the Argumend map, stance, fallacy flags, claim contestedness, thread pattern),
// then Argumend's map supplies the crux and the weighted evidence. Prints the composed "bot reply".
import { writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
const HERE = dirname(fileURLToPath(import.meta.url));
import { topics } from "@/data/topics";
import { calculateEvidenceScore } from "@/lib/evidenceMetrics";
import { jev, pct, type Question } from "./jev";

const topic = topics.find((t) => t.id === "rent-control-effectiveness")!;

// Fictional thread, written to look like a city subreddit. Names are invented.
const THREAD = [
  { user: "marisol_k", text: "Council is voting on a 3% rent cap Tuesday. Every economist on the planet says rent control destroys housing supply. This is econ 101, people." },
  { user: "dtown_renter", text: "Econ 101 also says my rent going up 22% in one year is 'the market clearing'. I've lived here 9 years. A cap means I don't get pushed out to the suburbs. That is the whole point." },
  { user: "marisol_k", text: "And then nobody builds anything and in 10 years there are fewer apartments for everyone. San Francisco literally lost 15% of its rent-controlled units after the 1994 expansion. Look it up." },
  { user: "hn_throwaway", text: "The SF study also found the policy did exactly what it was meant to do: tenants in covered buildings were far less likely to be displaced. You're citing half the paper." },
  { user: "buildmorehomes", text: "Both of you are arguing about the wrong thing. The cap exempts buildings under 15 years old, so the construction argument doesn't apply. The real question is whether it slows conversions of the older stock." },
  { user: "marisol_k", text: "Exemptions get removed the second a council changes. Landlords know that. Nobody with money is going to trust it." },
  { user: "dtown_renter", text: "Then fund upzoning AND cap rents. Vienna does both and it works. Auckland's upzoning took years to move rents. People need help before 2035." },
  { user: "gary_1962", text: "Typical renter entitlement. If you can't afford the city, move. Landlords have rights too." },
];

const sections = Object.fromEntries(topic.pillars.map((p) => [p.id, { title: p.title, summary: p.short_summary }]));
const transcript = THREAD.map((c) => `${c.user}: ${c.text}`).join("\n");

// One request for the per-comment questions, one for the thread-level questions.
const perComment: Record<string, Question> = {};
THREAD.forEach((c, i) => {
  perComment[`section_${i}`] = {
    type: "choice",
    instructions: `Which section of the argument map in \`sections\` is comment \`thread[${i}]\` mainly arguing about? Pick "none" if it is not making an argument about the topic at all.`,
    criteria: { ...Object.fromEntries(topic.pillars.map((p) => [p.id, `${p.title}: ${p.short_summary}`])), none: "Not an argument about the topic: an insult, a personal attack, or off-topic" },
  };
  perComment[`stance_${i}`] = {
    type: "choice",
    instructions: `Is the author of \`thread[${i}]\` arguing that rent caps are a bad policy or a good one?`,
    criteria: { against_caps: "Argues against rent caps", for_caps: "Argues for rent caps", neither: "Neither, or reframes the question" },
  };
  perComment[`fallacy_${i}`] = {
    type: "noul",
    instructions: `Does \`thread[${i}]\` rely mainly on a reasoning fallacy (appeal to authority without evidence, ad hominem, overgeneralization, motive attack, cherry-picking) rather than on a substantive point?`,
  };
  perComment[`factual_${i}`] = {
    type: "noul",
    instructions: `Does \`thread[${i}]\` make a checkable factual claim, as opposed to a value statement or a prediction?`,
  };
});

const CLAIMS = {
  c0: "Nearly all economists hold that rent control reduces housing supply.",
  c1: "Rent control in San Francisco caused roughly a 15% reduction in rent-controlled rental units.",
  c2: "Rent control in San Francisco reduced displacement of covered tenants.",
  c3: "A cap that exempts newer buildings has little effect on new construction.",
  c4: "Landlords will not trust a new-construction exemption because councils can remove it later.",
  c5: "Upzoning takes many years to lower rents.",
  c6: "Incumbent tenants' protection from displacement matters more than the cost to future renters.",
};
const threadLevel: Record<string, Question> = {
  pattern: {
    type: "choice",
    instructions: "Which pattern best describes the disagreement in `thread` as a whole?",
    criteria: {
      "single-empirical-crux": "One factual question, if settled, would resolve it",
      "causal-model-split": "They agree on facts but disagree on what causes what",
      "forecast-split": "They disagree mainly about what will happen",
      "definition-mismatch": "They mean different things by a key term",
      "value-conflict": "They disagree about what matters, and evidence would not change that",
      "priority-tradeoff": "They share values but rank competing goods differently under a constraint",
      "mixed-disagreement": "Two or more distinct disagreements of different kinds are stacked together",
      "mostly-common-ground": "They mostly agree",
    },
  },
  empirical_lever: { type: "noul", instructions: "Is there a factual question such that at least one participant says or clearly implies they would change position if it were answered?" },
  value_residual: { type: "noul", instructions: "Does at least one participant hold a values position that no factual evidence would change?" },
  talking_past: { type: "noul", instructions: "Are at least two participants arguing about different sections of the map while believing they are arguing about the same thing?" },
};
for (const id of Object.keys(CLAIMS)) {
  threadLevel[`contested_${id}`] = {
    type: "noul",
    instructions: `Do participants in \`thread\` actually disagree with one another about whether \`claims.${id}\` is true?`,
    criteria: { true: "At least one asserts it and at least one disputes it", false: "Nobody disputes it, or nobody discusses it" },
  };
}

const t0 = performance.now();
const [rc, rt] = await Promise.all([jev({ sections, thread: THREAD.map((c) => c.text) }, perComment), jev({ thread: transcript, claims: CLAIMS }, threadLevel)]);
const wall = Math.round(performance.now() - t0);

console.log(`\nThread: ${THREAD.length} comments. Two Jev requests in parallel, ${wall} ms wall (${rc.ms} + ${rt.ms} ms), ${rc.usage.input_tokens + rt.usage.input_tokens} input tokens.\n`);
console.log("PER COMMENT");
THREAD.forEach((c, i) => {
  const s = rc.answers[`section_${i}`];
  const st = rc.answers[`stance_${i}`];
  console.log(`  ${c.user.padEnd(15)} -> ${String(s.choice).padEnd(24)} ${pct(s.confidence)}  stance ${String(st.choice).padEnd(12)} fallacy ${pct(rc.answers[`fallacy_${i}`].noul)}  factual ${pct(rc.answers[`factual_${i}`].noul)}`);
});
console.log("\nTHREAD");
console.log(`  pattern: ${rt.answers.pattern.choice} (${pct(rt.answers.pattern.confidence)})   top: ${Object.entries(rt.answers.pattern.probabilities!).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([k, v]) => `${k} ${pct(v)}`).join(", ")}`);
for (const k of ["empirical_lever", "value_residual", "talking_past"]) console.log(`  ${k}: ${pct(rt.answers[k].noul)}`);
console.log("\nCLAIM CONTESTEDNESS (in this thread)");
for (const [id, claim] of Object.entries(CLAIMS)) console.log(`  ${pct(rt.answers[`contested_${id}`].noul)}  ${claim}`);

// Compose the reply from Jev's routing plus Argumend's map. Nothing here is generated text.
// "Not an argument" is composed from the probes rather than trusted to one Choice: an explicit "none",
// or a high fallacy score with almost no checkable content.
const notArgument = (i: number) =>
  rc.answers[`section_${i}`].choice === "none" || (rc.answers[`fallacy_${i}`].noul! >= 0.8 && rc.answers[`factual_${i}`].noul! <= 0.2);
const counts: Record<string, number> = {};
THREAD.forEach((_, i) => { const k = notArgument(i) ? "none" : rc.answers[`section_${i}`].choice!; counts[k] = (counts[k] ?? 0) + 1; });
const mainSection = Object.entries(counts).filter(([k]) => k !== "none").sort((a, b) => b[1] - a[1])[0][0];
const pillar = topic.pillars.find((p) => p.id === mainSection)!;
const ranked = [...(pillar.evidence ?? [])].sort((a, b) => calculateEvidenceScore(b.weight) - calculateEvidenceScore(a.weight));
const strongestFor = ranked.find((e) => e.side === "for")!;
const strongestAgainst = ranked.find((e) => e.side === "against")!;
const offTopic = THREAD.filter((_, i) => notArgument(i)).map((c) => c.user);
const contestedRanked = Object.entries(CLAIMS).map(([id, c]) => [c, rt.answers[`contested_${id}`].noul!] as const).sort((a, b) => b[1] - a[1]);
const disputed = contestedRanked.filter(([, p]) => p >= 0.45);
const undisputed = contestedRanked.filter(([, p]) => p < 0.25);
const reply = [
  `**Argumend map: ${topic.title}**`,
  `Most of this thread (${counts[mainSection]} of ${THREAD.length} comments) is arguing about **${pillar.title}**.${offTopic.length ? ` ${offTopic.join(", ")} did not make an argument about the topic.` : ""}${rt.answers.talking_past.noul! >= 0.5 ? " Some of you are arguing about different sections of the map while thinking you disagree." : ""}`,
  ``,
  `**The crux for this section:** ${pillar.crux.title}. ${pillar.crux.description}`,
  ``,
  `**Strongest evidence on each side, weighted on source reliability, independence, replicability, and directness (0 to 40):**`,
  `- For the claim that caps hurt supply (${calculateEvidenceScore(strongestFor.weight)}/40): ${strongestFor.title}. ${strongestFor.source}`,
  `- Against (${calculateEvidenceScore(strongestAgainst.weight)}/40): ${strongestAgainst.title}. ${strongestAgainst.source}`,
  ``,
  disputed.length
    ? `**Closest to a real disagreement:** ${disputed.map(([c, p]) => `${c} (${pct(p).trim()} contested)`).join(" | ")}`
    : `**Nobody in this thread disputes a single factual claim.** The disagreement is about what matters, not what is true.`,
  `**Nobody here disputes:** ${undisputed.map(([c]) => c).join(" | ")}`,
  ``,
  `Full map: argumend.org/topics/${topic.id}`,
].join("\n");
console.log("\nCOMPOSED REPLY\n" + reply);
writeFileSync(`${HERE}/expC.results.json`, JSON.stringify({ wall, perComment: rc, threadLevel: rt, reply }, null, 1));

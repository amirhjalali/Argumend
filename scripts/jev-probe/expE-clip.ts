// Experiment E: a real TV debate clip through the same pipeline as the rent-control thread.
// Input: a diarized JSON ({turns:[{speaker,text}], claims:[{id,by,claim}]}) produced upstream (claims and
// speaker labels come from a language model; Jev only routes, types, and gates). Output: per-turn routing,
// thread-level pattern, claim contestedness, and the composed map reply.
//   bun scripts/jev-probe/expE-clip.ts <topicId> <diarized.json> [label]
import { readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { topics } from "@/data/topics";
import { calculateEvidenceScore } from "@/lib/evidenceMetrics";
import { jev, pct, type Question } from "./jev";

const HERE = dirname(fileURLToPath(import.meta.url));
const [topicId, jsonPath, label = "clip"] = process.argv.slice(2);
const found = topics.find((t) => t.id === topicId);
if (!found || !jsonPath) throw new Error("usage: expE-clip.ts <topicId> <diarized.json> [label]");
const topic = found;

interface Turn { speaker: string; text: string }
interface Claim { id: string; by: string; claim: string }
const data = JSON.parse(readFileSync(jsonPath, "utf8")) as { turns: Turn[]; claims: Claim[] };
// Merge consecutive turns by the same speaker and drop tiny interjections so each turn carries an argument.
const turns: Turn[] = [];
for (const t of data.turns) {
  const last = turns[turns.length - 1];
  if (last && last.speaker === t.speaker) last.text += " " + t.text;
  else turns.push({ ...t });
}
const substantive = turns.filter((t) => t.text.split(/\s+/).length >= 12);

const sections = Object.fromEntries(topic.pillars.map((p) => [p.id, { title: p.title, summary: p.short_summary }]));
const transcript = turns.map((t) => `${t.speaker}: ${t.text}`).join("\n");
const claims = Object.fromEntries(data.claims.map((c) => [c.id, c.claim]));

// Per-turn questions reference a local index within a chunk of turns, so each request carries only the
// turns it asks about (a 114-turn debate in one state made every answer drift to the same value).
function turnQuestions(localIndex: number): Record<string, Question> {
  const ref = `\`turns.t${localIndex}\``;
  return {
    section: {
      type: "choice",
      instructions: `Which section of the argument map in \`sections\` is the turn ${ref} mainly arguing about? Pick "none" if it is not making an argument about the topic (a question from the host, an insult, or off-topic).`,
      criteria: { ...Object.fromEntries(topic.pillars.map((p) => [p.id, `${p.title}: ${p.short_summary}`])), none: "Not an argument about the topic" },
    },
    stance: {
      type: "choice",
      instructions: `Is the speaker of ${ref} arguing for \`topic_claim\`, against it, or neither?`,
      criteria: { for: "Argues for the topic claim", against: "Argues against the topic claim", neither: "Neither: asks a question, reframes, or is off-topic" },
    },
    fallacy: { type: "noul", instructions: `Does ${ref} rely mainly on a reasoning fallacy (ad hominem, motive attack, overgeneralization, appeal to popularity, strawman, anecdote as proof) rather than a substantive point?` },
    factual: { type: "noul", instructions: `Does ${ref} make a checkable factual claim, as opposed to a value statement, a question, or a prediction?` },
  };
}

const threadLevel: Record<string, Question> = {
  pattern: {
    type: "choice",
    instructions: "Which pattern best describes the disagreement in `transcript` as a whole?",
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
  talking_past: { type: "noul", instructions: "Are at least two participants arguing about different questions while believing they are arguing about the same one?" },
  definitional: { type: "noul", instructions: "Are participants using a key term (for example assimilation, culture, cheating, fairness) to mean different things?" },
};
for (const id of Object.keys(claims)) {
  threadLevel[`contested_${id}`] = {
    type: "noul",
    instructions: `Do participants in \`transcript\` actually disagree with one another about whether \`claims.${id}\` is true?`,
    criteria: { true: "At least one asserts it and at least one disputes it", false: "Nobody disputes it, or nobody discusses it" },
  };
  threadLevel[`fact_or_value_${id}`] = {
    type: "choice",
    instructions: `Is \`claims.${id}\` a claim about facts that evidence could in principle settle, or a claim about values?`,
    criteria: { fact: "A factual or causal claim evidence could settle", value: "A claim about what matters or what is right", mixed: "Both, or depends on a definition" },
  };
}

const t0 = performance.now();
// Per-turn questions are chunked (15 turns per request) so a long debate does not become one giant call.
const CHUNK = 8;
const chunks: number[][] = [];
for (let i = 0; i < substantive.length; i += CHUNK) chunks.push(substantive.slice(i, i + CHUNK).map((_, j) => i + j));
const [rcs, rt] = await Promise.all([
  Promise.all(chunks.map(async (idx) => {
    const turnsState = Object.fromEntries(idx.map((i, j) => [`t${j}`, `${substantive[i].speaker}: ${substantive[i].text}`]));
    const qs: Record<string, Question> = {};
    idx.forEach((i, j) => { for (const [k, q] of Object.entries(turnQuestions(j))) qs[`${k}_${i}`] = q; });
    return jev({ topic_claim: topic.meta_claim, sections, turns: turnsState }, qs);
  })),
  jev({ topic_claim: topic.meta_claim, transcript, claims }, threadLevel),
]);
const rc = { answers: Object.assign({}, ...rcs.map((r) => r.answers)), ms: Math.max(...rcs.map((r) => r.ms)), usage: { input_tokens: rcs.reduce((s, r) => s + r.usage.input_tokens, 0), output_tokens: 0 } };
const wall = Math.round(performance.now() - t0);

console.log(`\n${label}: ${turns.length} turns (${substantive.length} substantive), ${transcript.split(/\s+/).length} words. ${chunks.length + 1} Jev requests in parallel, ${wall} ms wall (${rc.ms} + ${rt.ms} ms), ${rc.usage.input_tokens + rt.usage.input_tokens} input tokens.\n`);
console.log("PER TURN");
substantive.forEach((t, i) => {
  const s = rc.answers[`section_${i}`];
  console.log(`  ${t.speaker.padEnd(14)} -> ${String(s.choice).padEnd(28)} ${pct(s.confidence)}  stance ${String(rc.answers[`stance_${i}`].choice).padEnd(8)} fallacy ${pct(rc.answers[`fallacy_${i}`].noul)}  factual ${pct(rc.answers[`factual_${i}`].noul)}   "${t.text.slice(0, 70)}..."`);
});
console.log("\nCLIP");
console.log(`  pattern: ${rt.answers.pattern.choice} (${pct(rt.answers.pattern.confidence)})   top: ${Object.entries(rt.answers.pattern.probabilities!).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([k, v]) => `${k} ${pct(v)}`).join(", ")}`);
for (const k of ["empirical_lever", "value_residual", "talking_past", "definitional"]) console.log(`  ${k}: ${pct(rt.answers[k].noul)}`);
console.log("\nCLAIMS (contested in this clip / fact or value)");
for (const c of data.claims) console.log(`  ${pct(rt.answers[`contested_${c.id}`].noul)}  ${String(rt.answers[`fact_or_value_${c.id}`].choice).padEnd(6)} [${c.by}] ${c.claim}`);

// Composed reply: map sentences chosen by numbers.
const notArgument = (i: number) => rc.answers[`section_${i}`].choice === "none" || (rc.answers[`fallacy_${i}`].noul! >= 0.8 && rc.answers[`factual_${i}`].noul! <= 0.2);
const counts: Record<string, number> = {};
substantive.forEach((_, i) => { const k = notArgument(i) ? "none" : rc.answers[`section_${i}`].choice!; counts[k] = (counts[k] ?? 0) + 1; });
const mainSection = Object.entries(counts).filter(([k]) => k !== "none").sort((a, b) => b[1] - a[1])[0]?.[0];
const pillar = topic.pillars.find((p) => p.id === mainSection);
const ranked = [...(pillar?.evidence ?? [])].sort((a, b) => calculateEvidenceScore(b.weight) - calculateEvidenceScore(a.weight));
// If a section's evidence is all on one side, show its two strongest items and label the side of each.
const strongestFor = ranked.find((e) => e.side === "for") ?? ranked[0];
const strongestAgainst = ranked.find((e) => e.side === "against" && e !== strongestFor) ?? ranked.find((e) => e !== strongestFor);
const sideLabel = (e: { side: string }) => (e.side === "for" ? "For" : "Against");
const contestedRanked = data.claims.map((c) => ({ c, p: rt.answers[`contested_${c.id}`].noul!, kind: rt.answers[`fact_or_value_${c.id}`].choice })).sort((a, b) => b.p - a.p);
const disputed = contestedRanked.filter((x) => x.p >= 0.45);
const undisputed = contestedRanked.filter((x) => x.p < 0.25);
const reply = [
  `**Argumend map: ${topic.title}**`,
  pillar ? `Most of this clip (${counts[mainSection!]} of ${substantive.length} substantive turns) is arguing about **${pillar.title}**.${rt.answers.talking_past.noul! >= 0.5 ? " The participants are partly arguing about different questions." : ""}${rt.answers.definitional.noul! >= 0.5 ? " They are also using a key term to mean different things." : ""}` : "No section of the map received most of the argument.",
  ``,
  pillar ? `**The crux for this section:** ${pillar.crux.title}. ${pillar.crux.description}` : "",
  ``,
  strongestFor && strongestAgainst ? `**Strongest evidence in this section** (weighted on source reliability, independence, replicability, directness, out of 40):\n- ${sideLabel(strongestFor)} the topic claim (${calculateEvidenceScore(strongestFor.weight)}/40): ${strongestFor.title}. ${strongestFor.source ?? ""}\n- ${sideLabel(strongestAgainst)} the topic claim (${calculateEvidenceScore(strongestAgainst.weight)}/40): ${strongestAgainst.title}. ${strongestAgainst.source ?? ""}` : "",
  ``,
  disputed.length ? `**What they actually disagree about:** ${disputed.map((x) => `${x.c.claim} (${pct(x.p).trim()} contested, ${x.kind})`).join(" | ")}` : `**Nobody in this clip disputes a single factual claim.**`,
  undisputed.length ? `**Nobody disputes:** ${undisputed.map((x) => x.c.claim).join(" | ")}` : "",
  ``,
  `Full map: argumend.org/topics/${topic.id}`,
].filter((l) => l !== undefined).join("\n");
console.log("\nCOMPOSED REPLY\n" + reply);
writeFileSync(`${HERE}/expE.${label}.results.json`, JSON.stringify({ wall, perTurn: rc, threadLevel: rt, reply, substantive }, null, 1));

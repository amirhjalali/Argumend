/**
 * Contestedness gate: ask Jev, per crux candidate, whether the rendered
 * transcript's speakers actually argue about it, then re-rank the three
 * flagship maps with those numbers as `contestednessOverrides`.
 *
 *     export TYPESAFE_API_KEY=...
 *     bun scripts/jev-probe/crux-contestedness.ts            # 3 runs, cached
 *     bun scripts/jev-probe/crux-contestedness.ts --runs 1 --refresh
 *
 * Two Nouls per claim. "Contested" is the round-2 question verbatim, so the
 * numbers stay comparable with docs/reviews/2026-09-16-jev-typesafe-probe.md.
 * "Present" exists because that review found Jev scores "nobody disputes it"
 * and "nobody mentions it" the same, and the renderer only voices a couple of
 * claims per speaker — so most candidates are genuinely absent from the text.
 * A claim judged absent gets no override at all (lib/crux/contestedness.ts).
 *
 * The renderer speaks claim statements verbatim, which gives this probe a free
 * gold label for presence: substring containment. The script scores the
 * presence Noul against it.
 *
 * Batches are capped at 8 claims per request with only those claims in the
 * state: the clip probe found that a long transcript plus hundreds of
 * questions collapses every answer to the transcript mean.
 *
 * Results cache to crux-contestedness.results.json (gitignored).
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { identifyCruxes, computeCruxSignals, contestednessOverridesFrom, DEFAULT_CANDIDACY_FLOOR, DEFAULT_PRESENCE_FLOOR, type ContestednessProbe, type ContestednessProvider, type CruxResult } from "@/lib/crux";
import { renderDebateFromGraph } from "@/lib/disagreement/corpus/renderDebate";
import { argumentTopicIds, loadArgumentTopic } from "@/lib/argument/draftTopics";
import type { ArgumentGraph, Claim } from "@/types/argument";
import { jev, pct, type Question } from "./jev";
import { pool } from "./util";

const DIR = dirname(fileURLToPath(import.meta.url));
const CACHE_PATH = `${DIR}/crux-contestedness.results.json`;
const BATCH_SIZE = 8;
const CONCURRENCY = 4;
/**
 * Pinned, not `jev-latest`: an alias moves without notice and these numbers
 * are thresholded. The model the API actually answered with is recorded in
 * the cache and printed, so a silent server-side change is visible.
 */
const MODEL = "jev-1.13.0";

const args = process.argv.slice(2);
const RUNS = Number(args[args.indexOf("--runs") + 1]) || 3;
const REFRESH = args.includes("--refresh");

interface ProbeMeta {
  requests: number;
  inputTokens: number;
  latenciesMs: number[];
  retries: number;
  /** Model ids the API reported answering with (should be exactly [MODEL]). */
  modelsReturned: string[];
}

interface RunRecord {
  probes: Record<string, ContestednessProbe>;
  meta: ProbeMeta;
}

interface TopicRecord {
  stateHash: string;
  /** The model id requested; a cache written against another version is discarded. */
  model: string;
  question: string;
  runs: RunRecord[];
}

type Cache = Record<string, TopicRecord>;

const CONTESTED_INSTRUCTION = (key: string) =>
  `Do the speakers in \`transcript\` actually disagree with one another about whether the claim in \`claims.${key}\` is true? Answer yes only if at least one speaker asserts it and at least one speaker disputes or contradicts it, explicitly or by clear implication.`;

const PRESENT_INSTRUCTION = (key: string) =>
  `Is the claim in \`claims.${key}\` discussed in \`transcript\` at all? Answer yes if any speaker states it, assumes it, or argues about it, in their own words or in different words.`;

/**
 * The live lane. Implements the engine-side interface, so everything below it
 * (override derivation, re-ranking) is exercised offline in the unit tests
 * with no API key.
 */
function jevProvider(meta: ProbeMeta): ContestednessProvider {
  return {
    async probe(request) {
      const batches: Array<Array<{ id: string; statement: string }>> = [];
      for (let i = 0; i < request.claims.length; i += BATCH_SIZE) {
        batches.push([...request.claims.slice(i, i + BATCH_SIZE)]);
      }

      const answered = await pool(batches, CONCURRENCY, async (batch) => {
        const keyed = batch.map((claim, index) => ({ key: `c${index}`, claim }));
        const state = {
          main_question: request.question ?? "",
          transcript: request.source,
          claims: Object.fromEntries(keyed.map(({ key, claim }) => [key, claim.statement])),
        };
        const questions: Record<string, Question> = {};
        for (const { key } of keyed) {
          questions[`contested_${key}`] = {
            type: "noul",
            instructions: CONTESTED_INSTRUCTION(key),
            criteria: {
              true: "Speakers take opposing sides on this claim",
              false: "Nobody disputes it, or nobody discusses it; it is common ground or background",
            },
          };
          questions[`present_${key}`] = {
            type: "noul",
            instructions: PRESENT_INSTRUCTION(key),
            criteria: {
              true: "Some speaker states, assumes, or argues about this claim",
              false: "The transcript never raises this claim, in any words",
            },
          };
        }

        const response = await jev(state, questions, { model: MODEL });
        meta.requests += 1;
        meta.inputTokens += response.usage.input_tokens;
        meta.latenciesMs.push(response.ms);
        meta.retries += response.retries;
        if (!meta.modelsReturned.includes(response.model)) meta.modelsReturned.push(response.model);

        const out: Record<string, ContestednessProbe> = {};
        for (const { key, claim } of keyed) {
          out[claim.id] = {
            contested: response.answers[`contested_${key}`]?.noul ?? 0,
            present: response.answers[`present_${key}`]?.noul ?? 0,
          };
        }
        return out;
      });

      return Object.assign({}, ...answered) as Record<string, ContestednessProbe>;
    },
  };
}

function candidateClaims(graph: ArgumentGraph): Claim[] {
  return computeCruxSignals(graph).signals.map((signal) => signal.claim);
}

/** Whitespace-normalised containment: the renderer speaks statements verbatim. */
function spokenVerbatim(transcript: string, statement: string): boolean {
  const normalize = (value: string) => value.trim().replace(/\s+/g, " ");
  return normalize(transcript).includes(normalize(statement));
}

function hashState(source: string, claims: Claim[]): string {
  return createHash("sha256")
    .update(source)
    .update(claims.map((claim) => `${claim.id}:${claim.statement}`).join("\n"))
    .digest("hex")
    .slice(0, 16);
}

function loadCache(): Cache {
  if (REFRESH || !existsSync(CACHE_PATH)) return {};
  try {
    return JSON.parse(readFileSync(CACHE_PATH, "utf8")) as Cache;
  } catch {
    return {};
  }
}

function fmtIds(results: CruxResult[]): string[] {
  return results.map((result) => result.claimId);
}

function movement(before: string[], after: string[]): string {
  const lines: string[] = [];
  for (const id of before) {
    const from = before.indexOf(id) + 1;
    const to = after.indexOf(id) + 1;
    if (to === 0) lines.push(`    ${id}: #${from} -> OUT`);
    else if (to !== from) lines.push(`    ${id}: #${from} -> #${to}`);
  }
  for (const id of after) {
    if (!before.includes(id)) lines.push(`    ${id}: IN at #${after.indexOf(id) + 1}`);
  }
  return lines.length > 0 ? lines.join("\n") : "    (no change)";
}

function mean(values: number[]): number {
  return values.reduce((sum, value) => sum + value, 0) / Math.max(1, values.length);
}

async function main() {
  const cache = loadCache();
  const totals: ProbeMeta = { requests: 0, inputTokens: 0, latenciesMs: [], retries: 0, modelsReturned: [] };

  for (const topicId of argumentTopicIds) {
    const topic = loadArgumentTopic(topicId);
    if (!topic) continue;
    const graph = topic.graph;
    const debate = renderDebateFromGraph(graph);
    const claims = candidateClaims(graph);
    const stateHash = hashState(debate.source, claims);
    const question = graph.question.statement;

    const existing = cache[topicId];
    const record: TopicRecord =
      existing && existing.stateHash === stateHash && existing.model === MODEL
        ? existing
        : { stateHash, model: MODEL, question, runs: [] };

    while (record.runs.length < RUNS) {
      const meta: ProbeMeta = { requests: 0, inputTokens: 0, latenciesMs: [], retries: 0, modelsReturned: [] };
      const probes = await jevProvider(meta).probe({
        source: debate.source,
        question,
        claims: claims.map((claim) => ({ id: claim.id, statement: claim.statement })),
      });
      record.runs.push({ probes, meta });
      cache[topicId] = record;
      writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
      process.stderr.write(`  ${topicId}: run ${record.runs.length}/${RUNS} done (${meta.requests} requests)\n`);
    }
    cache[topicId] = record;

    const runs = record.runs.slice(0, RUNS);
    for (const run of runs) {
      totals.requests += run.meta.requests;
      totals.inputTokens += run.meta.inputTokens;
      totals.latenciesMs.push(...run.meta.latenciesMs);
      totals.retries += run.meta.retries;
      for (const model of run.meta.modelsReturned) {
        if (!totals.modelsReturned.includes(model)) totals.modelsReturned.push(model);
      }
    }

    const before = identifyCruxes(graph);
    const beforeIds = fmtIds(before);
    const derivations = runs.map((run) => contestednessOverridesFrom(run.probes));
    const afterPerRun = derivations.map((derivation) =>
      fmtIds(identifyCruxes(graph, { contestednessOverrides: derivation.overrides })),
    );

    console.log(`\n\n================ ${topicId} ================`);
    const modelsSeen = [...new Set(runs.flatMap((run) => run.meta.modelsReturned))];
    const retriesSeen = runs.reduce((sum, run) => sum + run.meta.retries, 0);
    console.log(
      `transcript ${debate.source.length} chars · ${claims.length} crux candidates · ` +
        `${Math.ceil(claims.length / BATCH_SIZE)} requests/run · ${runs.length} runs · ` +
        `requested ${MODEL}, answered by ${modelsSeen.join("/") || "?"} · ${retriesSeen} retries`,
    );

    // Presence: the Noul against verbatim ground truth.
    const verbatim = new Map(claims.map((claim) => [claim.id, spokenVerbatim(debate.source, claim.statement)]));
    const presentMeans = new Map(
      claims.map((claim) => [
        claim.id,
        mean(runs.map((run) => run.probes[claim.id]?.present ?? 0)),
      ]),
    );
    let tp = 0;
    let fp = 0;
    let tn = 0;
    let fn = 0;
    for (const claim of claims) {
      const said = verbatim.get(claim.id) === true;
      const judged = (presentMeans.get(claim.id) ?? 0) >= DEFAULT_PRESENCE_FLOOR;
      if (said && judged) tp += 1;
      else if (!said && judged) fp += 1;
      else if (!said && !judged) tn += 1;
      else fn += 1;
    }
    const spokenCount = claims.filter((claim) => verbatim.get(claim.id)).length;
    console.log(
      `presence: ${spokenCount}/${claims.length} candidates are actually spoken in the transcript; ` +
        `Noul >= ${DEFAULT_PRESENCE_FLOOR} agrees on ${tp + tn}/${claims.length} ` +
        `(spoken+judged-present ${tp}, unspoken+judged-present ${fp}, unspoken+judged-absent ${tn}, spoken+judged-absent ${fn})`,
    );
    const withheld = derivations[0].absentClaimIds;
    console.log(`withheld overrides (run 1, present < ${DEFAULT_PRESENCE_FLOOR}): ${withheld.length} of ${claims.length}`);

    console.log(`\n  ${"claim".padEnd(46)} ${"spoken".padEnd(7)} contested(runs)        present(runs)         gate`);
    for (const claim of claims) {
      const contestedCells = runs.map((run) => pct(run.probes[claim.id]?.contested)).join(" ");
      const presentCells = runs.map((run) => pct(run.probes[claim.id]?.present)).join(" ");
      const override = derivations[0].overrides[claim.id];
      const gate =
        override === undefined
          ? "withheld (absent)"
          : override < DEFAULT_CANDIDACY_FLOOR
            ? `DROPPED (< ${DEFAULT_CANDIDACY_FLOOR})`
            : "kept";
      const marker = beforeIds.includes(claim.id) ? "*" : " ";
      console.log(
        `${marker} ${claim.id.slice(0, 45).padEnd(46)} ${(verbatim.get(claim.id) ? "yes" : "no").padEnd(7)} ${contestedCells}   ${presentCells}   ${gate}`,
      );
    }
    console.log("  (* = in the current top-5)");

    console.log(`\n  top-5 before:`);
    before.forEach((result, index) =>
      console.log(`    ${index + 1}. ${result.claimId}  score=${result.score} C=${result.contestedness}`),
    );
    const afterRun1 = identifyCruxes(graph, { contestednessOverrides: derivations[0].overrides });
    console.log(`  top-5 after (run 1):`);
    afterRun1.forEach((result, index) =>
      console.log(
        `    ${index + 1}. ${result.claimId}  score=${result.score} C=${result.contestedness}` +
          (result.contestednessOverride === undefined ? "  (no override)" : `  probe=${result.contestednessOverride}`),
      ),
    );
    console.log(`  movement:\n${movement(beforeIds, afterPerRun[0])}`);

    const stable = afterPerRun.every((ids) => ids.join(",") === afterPerRun[0].join(","));
    console.log(`\n  stability over ${runs.length} runs: top-5 identical: ${stable ? "yes" : "NO"}`);
    if (!stable) afterPerRun.forEach((ids, index) => console.log(`    run ${index + 1}: ${ids.join(", ")}`));
    const spreads = claims.map((claim) => {
      const values = runs.map((run) => run.probes[claim.id]?.contested ?? 0);
      return { id: claim.id, spread: Math.max(...values) - Math.min(...values) };
    });
    spreads.sort((a, b) => b.spread - a.spread);
    console.log(
      `  contested spread across runs: max ${spreads[0].spread.toFixed(3)} (${spreads[0].id}), ` +
        `mean ${mean(spreads.map((item) => item.spread)).toFixed(3)}`,
    );
    const gateFlips = claims.filter((claim) => {
      const decisions = derivations.map((derivation) => {
        const value = derivation.overrides[claim.id];
        return value === undefined ? "withheld" : value < DEFAULT_CANDIDACY_FLOOR ? "dropped" : "kept";
      });
      return new Set(decisions).size > 1;
    });
    console.log(`  gate decisions that differ across runs: ${gateFlips.length === 0 ? "none" : gateFlips.map((c) => c.id).join(", ")}`);

    // Offline sensitivity: the two thresholds are policy, not measurement, so
    // replay run 1 under the alternatives rather than defending one number.
    console.log(`\n  sensitivity (run 1, no new calls):`);
    const variants: Array<{ label: string; presenceFloor: number; candidacyFloor: number }> = [
      { label: `presence ${DEFAULT_PRESENCE_FLOOR} / floor ${DEFAULT_CANDIDACY_FLOOR} (default)`, presenceFloor: DEFAULT_PRESENCE_FLOOR, candidacyFloor: DEFAULT_CANDIDACY_FLOOR },
      { label: "presence 0.90 / floor 0.25 (strict presence)", presenceFloor: 0.9, candidacyFloor: 0.25 },
      { label: "presence 0.00 / floor 0.25 (no presence gate)", presenceFloor: 0, candidacyFloor: 0.25 },
      { label: "presence 0.50 / floor 0.15", presenceFloor: DEFAULT_PRESENCE_FLOOR, candidacyFloor: 0.15 },
      { label: "presence 0.50 / floor 0.35", presenceFloor: DEFAULT_PRESENCE_FLOOR, candidacyFloor: 0.35 },
    ];
    for (const variant of variants) {
      const derived = contestednessOverridesFrom(runs[0].probes, { presenceFloor: variant.presenceFloor });
      const overridden = Object.keys(derived.overrides).length;
      const dropped = Object.values(derived.overrides).filter((value) => value < variant.candidacyFloor).length;
      const ids = fmtIds(
        identifyCruxes(graph, {
          contestednessOverrides: derived.overrides,
          candidacyFloor: variant.candidacyFloor,
        }),
      );
      console.log(`    ${variant.label.padEnd(46)} overridden ${String(overridden).padStart(2)}, dropped ${String(dropped).padStart(2)} -> ${ids.join(", ")}`);
    }
  }

  writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
  const latencies = totals.latenciesMs.slice().sort((a, b) => a - b);
  console.log(
    `\n\ntotals: model requested ${MODEL}, answered by ${totals.modelsReturned.join("/") || "?"}, ` +
      `${totals.requests} requests, ${totals.inputTokens} input tokens, ${totals.retries} retries, ` +
      `latency min/median/max ${latencies[0]}/${latencies[Math.floor(latencies.length / 2)]}/${latencies[latencies.length - 1]} ms`,
  );
  console.log(`cache: ${CACHE_PATH}`);
}

await main();

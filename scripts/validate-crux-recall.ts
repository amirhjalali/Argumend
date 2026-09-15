/**
 * Pre-registered crux-engine validation per docs/CRUX_ENGINE.md "Validation & acceptance".
 *
 * Runs identifyCruxes over each flagship draft map and scores Recall@5 / Recall@10
 * against the human-identified disagreement propositions encoded in
 * data/evals/crux-recall/flagship-propositions.json, plus the hard gate:
 * zero background/uncontested claims in any top-5.
 *
 * Also reports the Spearman rank-correlation sanity check pre-registered in
 * docs/research/2026-08-11-crux-proposals/proposal-c-content-grounded.md §6.
 * It is printed only; the pre-registration calls it "a sanity check, not a gate"
 * and names no threshold, so it never affects the exit code.
 *
 * Usage: node_modules/.bin/tsx scripts/validate-crux-recall.ts [--levers a,b|off]
 * Exits 1 on hard-gate failure, a named-test failure, or a primary recall threshold miss.
 *
 * `--levers` switches the off-by-default engine levers in lib/crux/flags.ts for
 * this run only: `a` = redundancy overlap over claims only, `b` = position-aware
 * reach, `off` = pin both off regardless of the environment. Without the flag
 * the levers follow the CRUX_LEVER_* environment variables, which default off,
 * so a bare run is the unchanged pre-registered validation.
 */
import { readFileSync } from "node:fs";
import { parseArgumentGraph } from "@/lib/schemas/argument";
import { validateArgumentGraph } from "@/lib/argument/validate";
import {
  CRUX_LEVERS_OFF,
  anyCruxLeverOn,
  identifyCruxes,
  resolveCruxLeverFlags,
  type CruxLeverFlags,
} from "@/lib/crux";
import type { ArgumentGraph, Claim } from "@/types/argument";

export interface Proposition {
  id: string;
  statement: string;
  epistemicType: string;
  claimIds: string[];
  mapping: "authored" | "derived" | "unmapped";
  provenance: string;
}

export interface NamedTest {
  id: string;
  description: string;
  /** Single-claim form (named tests 2-4). */
  claimId?: string;
  /** Multi-claim form (named test 1): every listed claim must satisfy withinTopK. */
  claimIds?: string[];
  /** -1 means "appears in the ranked output at all". */
  withinTopK: number;
}

export interface TopicSpec {
  draft: string;
  set: "primary" | "secondary";
  propositions: Proposition[];
  namedTests: NamedTest[];
}

export interface GroundTruth {
  version: number;
  description: string;
  primaryRecallTargets: { recallAt5: number; recallAt10: number };
  topics: Record<string, TopicSpec>;
}

export const GROUND_TRUTH_PATH = "data/evals/crux-recall/flagship-propositions.json";
/**
 * Size of the scored ranking. Recall is scored on its top-5 / top-10 windows; the
 * extra five slots exist only so near-misses are visible. Note that the redundancy
 * penalty in lib/crux/rank.ts makes the final order depend on the limit, so ranks
 * quoted from this list are "rank within the top-15 ranking", not absolute ranks.
 */
export const RANK_LIMIT = 15;
/** Window the recall metrics actually score against. */
export const SCORED_WINDOW = 10;
/** Background claims that must never appear in a top-5 (hard gate). */
const BACKGROUND_STATUSES = new Set(["uncontested", "broadly_accepted"]);

function loadGraph(path: string): ArgumentGraph {
  const raw = JSON.parse(readFileSync(path, "utf8"));
  const parsed = parseArgumentGraph(raw);
  if (!parsed.ok) {
    throw new Error(`${path}: schema parse failed (${parsed.errors.length} errors)`);
  }
  const issues = validateArgumentGraph(parsed.graph);
  const errors = issues.filter((issue) => issue.severity === "error");
  if (errors.length > 0) {
    throw new Error(`${path}: ${errors.length} validation error(s): ${errors[0]?.message}`);
  }
  return parsed.graph;
}

function claimOf(graph: ArgumentGraph, id: string): Claim | undefined {
  const node = graph.nodes.find((candidate) => candidate.id === id);
  return node?.type === "claim" ? node : undefined;
}

/** 1-based rank of `id` in `rankedIds`, or 0 when absent. */
export function rankOf(rankedIds: readonly string[], id: string): number {
  return rankedIds.indexOf(id) + 1;
}

export interface ClaimRank {
  claimId: string;
  /** 1-based rank in the scored top-15 ranking, 0 if outside it. */
  rank: number;
  /** 1-based rank in the unbounded ranking (every selectable candidate), 0 if never ranked. */
  unboundedRank: number;
}

export interface Miss {
  id: string;
  claims: ClaimRank[];
}

export interface NamedTestResult {
  id: string;
  pass: boolean;
  claims: ClaimRank[];
}

export interface SpearmanReport {
  /** Number of propositions entering the correlation (mapped ones only). */
  n: number;
  /** Spearman's rho, or null when fewer than two propositions or a constant ranking. */
  rho: number | null;
  pairs: Array<{ id: string; humanRank: number; engineRank: number }>;
}

export interface TopicOutcome {
  topicId: string;
  set: "primary" | "secondary";
  rankedIds: string[];
  unboundedRankedIds: string[];
  mappedPropositions: number;
  recoveredAt5: number;
  recoveredAt10: number;
  misses: Miss[];
  hardGateViolations: string[];
  namedTestResults: NamedTestResult[];
  spearman: SpearmanReport;
}

export function namedTestClaimIds(test: NamedTest): string[] {
  if (test.claimIds !== undefined && test.claimIds.length > 0) return test.claimIds;
  return test.claimId !== undefined ? [test.claimId] : [];
}

/**
 * A named test passes only if every listed claim is ranked and, unless withinTopK
 * is -1, sits at or above that cutoff in the scored ranking.
 */
export function evaluateNamedTest(
  test: NamedTest,
  rankedIds: readonly string[],
  unboundedRankedIds: readonly string[] = rankedIds,
): NamedTestResult {
  const claims = namedTestClaimIds(test).map((claimId) => ({
    claimId,
    rank: rankOf(rankedIds, claimId),
    unboundedRank: rankOf(unboundedRankedIds, claimId),
  }));
  const pass =
    claims.length > 0 &&
    claims.every(({ rank }) =>
      test.withinTopK === -1 ? rank > 0 : rank > 0 && rank <= test.withinTopK,
    );
  return { id: test.id, pass, claims };
}

/** Fractional ranks (1-based, ties get the average rank), as Spearman's rho requires. */
export function fractionalRanks(values: readonly number[]): number[] {
  const order = values
    .map((value, index) => ({ value, index }))
    .sort((a, b) => a.value - b.value);
  const ranks = new Array<number>(values.length).fill(0);
  let i = 0;
  while (i < order.length) {
    let j = i;
    while (j + 1 < order.length && order[j + 1]!.value === order[i]!.value) j += 1;
    const averageRank = (i + 1 + (j + 1)) / 2;
    for (let k = i; k <= j; k += 1) ranks[order[k]!.index] = averageRank;
    i = j + 1;
  }
  return ranks;
}

/**
 * Spearman's rank correlation: Pearson correlation of the fractional ranks. Returns
 * null when fewer than two pairs are given or either ranking is constant.
 */
export function spearman(a: readonly number[], b: readonly number[]): number | null {
  if (a.length !== b.length) throw new Error("spearman: rankings differ in length");
  const n = a.length;
  if (n < 2) return null;
  const ra = fractionalRanks(a);
  const rb = fractionalRanks(b);
  const meanA = ra.reduce((sum, v) => sum + v, 0) / n;
  const meanB = rb.reduce((sum, v) => sum + v, 0) / n;
  let cov = 0;
  let varA = 0;
  let varB = 0;
  for (let k = 0; k < n; k += 1) {
    const da = ra[k]! - meanA;
    const db = rb[k]! - meanB;
    cov += da * db;
    varA += da * da;
    varB += db * db;
  }
  if (varA === 0 || varB === 0) return null;
  return cov / Math.sqrt(varA * varB);
}

/**
 * Spearman sanity check as pre-registered in proposal C §6: "Rank correlation
 * (Spearman) vs. human importance ranking — sanity check, not a gate."
 *
 * The pre-registration names neither a threshold nor a source for the human
 * importance ranking, and no such ranking exists in the repo. The most literal
 * input available is the order in which the corpus authors listed the propositions
 * (the pre-registered "end-of-report lists"), preserved as `propositions` order in
 * the ground-truth file; that order is used here as the human importance ranking,
 * with each proposition's list position as its rank. This is an assumption, not
 * something the corpus states. The engine side is the proposition's best-ranked
 * mapped claim in the unbounded ranking (every selectable candidate ranked, so no
 * cutoff ties). A proposition none of whose claims is ever ranked is placed in a
 * shared last rank. Only mapped propositions enter the correlation.
 */
export function spearmanReport(
  propositions: readonly Proposition[],
  unboundedRankedIds: readonly string[],
): SpearmanReport {
  const unrankedSlot = unboundedRankedIds.length + 1;
  const pairs: SpearmanReport["pairs"] = [];
  propositions.forEach((proposition, index) => {
    if (proposition.claimIds.length === 0) return;
    const ranks = proposition.claimIds
      .map((id) => rankOf(unboundedRankedIds, id))
      .filter((rank) => rank > 0);
    const engineRank = ranks.length > 0 ? Math.min(...ranks) : unrankedSlot;
    pairs.push({ id: proposition.id, humanRank: index + 1, engineRank });
  });
  const rho = spearman(
    pairs.map((pair) => pair.humanRank),
    pairs.map((pair) => pair.engineRank),
  );
  return { n: pairs.length, rho, pairs };
}

export function scoreGraph(
  topicId: string,
  spec: TopicSpec,
  graph: ArgumentGraph,
  levers?: Partial<CruxLeverFlags>,
): TopicOutcome {
  const rankedIds = identifyCruxes(graph, { limit: RANK_LIMIT, levers }).map((result) => result.claimId);
  const claimCount = graph.nodes.filter((node) => node.type === "claim").length;
  const unboundedRankedIds = identifyCruxes(graph, {
    limit: Math.max(RANK_LIMIT, claimCount),
    levers,
  }).map((result) => result.claimId);
  const top5 = new Set(rankedIds.slice(0, 5));
  const top10 = new Set(rankedIds.slice(0, SCORED_WINDOW));

  const mapped = spec.propositions.filter((p) => p.claimIds.length > 0);
  let recoveredAt5 = 0;
  let recoveredAt10 = 0;
  const misses: Miss[] = [];
  for (const proposition of mapped) {
    if (proposition.claimIds.some((id) => top5.has(id))) recoveredAt5 += 1;
    else if (proposition.claimIds.some((id) => top10.has(id))) recoveredAt10 += 1;
    else {
      misses.push({
        id: proposition.id,
        claims: proposition.claimIds.map((claimId) => ({
          claimId,
          rank: rankOf(rankedIds, claimId),
          unboundedRank: rankOf(unboundedRankedIds, claimId),
        })),
      });
    }
  }

  const hardGateViolations: string[] = [];
  for (const id of top5) {
    const claim = claimOf(graph, id);
    if (claim && BACKGROUND_STATUSES.has(claim.status)) {
      hardGateViolations.push(`${id} (${claim.status})`);
    }
  }

  const namedTestResults = spec.namedTests.map((test) =>
    evaluateNamedTest(test, rankedIds, unboundedRankedIds),
  );

  return {
    topicId,
    set: spec.set,
    rankedIds,
    unboundedRankedIds,
    mappedPropositions: mapped.length,
    recoveredAt5,
    recoveredAt10,
    misses,
    hardGateViolations,
    namedTestResults,
    spearman: spearmanReport(spec.propositions, unboundedRankedIds),
  };
}

function scoreTopic(
  topicId: string,
  spec: TopicSpec,
  levers?: Partial<CruxLeverFlags>,
): TopicOutcome {
  return scoreGraph(topicId, spec, loadGraph(spec.draft), levers);
}

/**
 * `--levers a,b` turns the named engine levers on and the unnamed ones off;
 * `--levers off` (or `none`) pins both off. No flag: undefined, so the levers
 * follow the environment.
 */
export function parseLeverArgs(argv: readonly string[]): Partial<CruxLeverFlags> | undefined {
  const index = argv.indexOf("--levers");
  if (index === -1) return undefined;
  const raw = (argv[index + 1] ?? "").trim().toLowerCase();
  if (raw === "" || raw === "off" || raw === "none") {
    return { redundancyClaimsOnly: false, positionAwareReach: false };
  }
  const names = new Set(raw.split(",").map((name) => name.trim()).filter(Boolean));
  for (const name of names) {
    if (name !== "a" && name !== "b") {
      throw new Error(`--levers: unknown lever "${name}" (expected a, b, or off)`);
    }
  }
  return { redundancyClaimsOnly: names.has("a"), positionAwareReach: names.has("b") };
}

export function describeLevers(flags: CruxLeverFlags): string {
  return [
    `A redundancy-claims-only=${flags.redundancyClaimsOnly ? "on" : "off"}`,
    `B position-aware-reach=${flags.positionAwareReach ? "on" : "off"}`,
  ].join(", ");
}

/** Human-readable rank of one claim, truthful about which ranking the number comes from. */
export function describeClaimRank(claim: ClaimRank, unboundedTotal: number): string {
  if (claim.rank > 0) return `${claim.claimId} at rank ${claim.rank} of the top-${RANK_LIMIT}`;
  if (claim.unboundedRank > 0) {
    return `${claim.claimId} outside the top-${RANK_LIMIT} (rank ${claim.unboundedRank} of ${unboundedTotal} in the unbounded ranking)`;
  }
  return `${claim.claimId} never ranked (not a crux candidate)`;
}

export function describeMiss(miss: Miss, unboundedTotal: number): string {
  const detail = miss.claims.map((claim) => describeClaimRank(claim, unboundedTotal)).join("; ");
  return `MISS ${miss.id}: no mapped claim in the scored top-${SCORED_WINDOW}: ${detail}`;
}

export function loadGroundTruth(path: string = GROUND_TRUTH_PATH): GroundTruth {
  return JSON.parse(readFileSync(path, "utf8")) as GroundTruth;
}

function main(): void {
  const truth = loadGroundTruth();
  const leverArgs = parseLeverArgs(process.argv.slice(2));
  const levers = resolveCruxLeverFlags(leverArgs ?? {});
  const outcomes: TopicOutcome[] = [];
  for (const [topicId, spec] of Object.entries(truth.topics)) {
    try {
      outcomes.push(scoreTopic(topicId, spec, leverArgs));
    } catch (error) {
      console.error(`FAIL ${topicId}: ${error instanceof Error ? error.message : error}`);
      process.exit(1);
    }
  }

  let failed = false;

  console.log("=== Crux-engine pre-registered validation ===\n");
  // Printed only when a lever is on, so the default run's output is unchanged.
  if (anyCruxLeverOn({ ...CRUX_LEVERS_OFF, ...levers, projectionSkipUncontested: false })) {
    console.log(`Engine levers (off-by-default, lib/crux/flags.ts): ${describeLevers(levers)}\n`);
  }
  for (const outcome of outcomes) {
    const unboundedTotal = outcome.unboundedRankedIds.length;
    console.log(
      `${outcome.topicId} [${outcome.set}] — ${outcome.mappedPropositions} mapped propositions`,
    );
    console.log(
      `  Recall@5: ${outcome.recoveredAt5}/${outcome.mappedPropositions}  Recall@10(+misses beyond): ${outcome.recoveredAt10}/${outcome.mappedPropositions}`,
    );
    for (const miss of outcome.misses) {
      console.log(`  ${describeMiss(miss, unboundedTotal)}`);
    }
    if (outcome.hardGateViolations.length > 0) {
      failed = true;
      console.log(`  HARD GATE VIOLATION — background claims in top-5: ${outcome.hardGateViolations.join(", ")}`);
    } else {
      console.log("  Hard gate (no uncontested/broadly_accepted claims in top-5): PASS");
    }
    for (const test of outcome.namedTestResults) {
      const ranks = test.claims
        .map((claim) => describeClaimRank(claim, unboundedTotal))
        .join("; ");
      console.log(`  Named test ${test.id}: ${test.pass ? "PASS" : "FAIL"} (${ranks})`);
      if (!test.pass) failed = true;
    }
    const { spearman: report } = outcome;
    const rhoText = report.rho === null ? "undefined" : report.rho.toFixed(3);
    console.log(
      `  Spearman rho (sanity check, not a gate; no pre-registered threshold): ${rhoText} over ${report.n} mapped propositions`,
    );
    console.log(
      `    human importance = pre-registered list order (assumed; see script comment); engine rank = best mapped claim in the unbounded ranking`,
    );
    console.log(
      `    pairs: ${report.pairs.map((pair) => `${pair.id} human ${pair.humanRank} / engine ${pair.engineRank}`).join(", ")}`,
    );
    console.log();
  }

  const primary = outcomes.filter((outcome) => outcome.set === "primary");
  const pooledMapped = primary.reduce((sum, outcome) => sum + outcome.mappedPropositions, 0);
  const pooledAt5 = primary.reduce((sum, outcome) => sum + outcome.recoveredAt5, 0);
  const pooledAt10 = primary.reduce((sum, outcome) => sum + outcome.recoveredAt10, 0);
  const recall5 = pooledMapped === 0 ? 0 : pooledAt5 / pooledMapped;
  const recall10 = pooledMapped === 0 ? 0 : (pooledAt5 + pooledAt10) / pooledMapped;

  console.log("=== Pooled primary recall ===");
  console.log(
    `  Recall@5:  ${pooledAt5}/${pooledMapped} = ${recall5.toFixed(3)}  (target >= ${truth.primaryRecallTargets.recallAt5})`,
  );
  console.log(
    `  Recall@10: ${pooledAt5 + pooledAt10}/${pooledMapped} = ${recall10.toFixed(3)}  (target >= ${truth.primaryRecallTargets.recallAt10})`,
  );

  if (recall5 < truth.primaryRecallTargets.recallAt5) {
    failed = true;
    console.log("  RECALL@5 BELOW PRE-REGISTERED THRESHOLD");
  }
  if (recall10 < truth.primaryRecallTargets.recallAt10) {
    failed = true;
    console.log("  RECALL@10 BELOW PRE-REGISTERED THRESHOLD");
  }

  console.log(failed ? "\nRESULT: FAIL" : "\nRESULT: PASS");
  process.exit(failed ? 1 : 0);
}

// Run only when invoked directly (tsx sets argv[1] to the script path); the test
// file imports the helpers above without triggering a run.
if (process.argv[1]?.endsWith("validate-crux-recall.ts")) {
  main();
}

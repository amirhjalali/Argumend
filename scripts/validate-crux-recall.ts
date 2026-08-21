/**
 * Pre-registered crux-engine validation per docs/CRUX_ENGINE.md "Validation & acceptance".
 *
 * Runs identifyCruxes over each flagship draft map and scores Recall@5 / Recall@10
 * against the human-identified disagreement propositions encoded in
 * data/evals/crux-recall/flagship-propositions.json, plus the hard gate:
 * zero background/uncontested claims in any top-5.
 *
 * Usage: node_modules/.bin/tsx scripts/validate-crux-recall.ts
 * Exits 1 on hard-gate failure or a primary recall threshold miss.
 */
import { readFileSync } from "node:fs";
import { parseArgumentGraph } from "@/lib/schemas/argument";
import { validateArgumentGraph } from "@/lib/argument/validate";
import { identifyCruxes } from "@/lib/crux";
import type { ArgumentGraph, Claim } from "@/types/argument";

interface Proposition {
  id: string;
  statement: string;
  epistemicType: string;
  claimIds: string[];
  mapping: "authored" | "derived" | "unmapped";
  provenance: string;
}

interface NamedTest {
  id: string;
  description: string;
  claimId: string;
  withinTopK: number;
}

interface TopicSpec {
  draft: string;
  set: "primary" | "secondary";
  propositions: Proposition[];
  namedTests: NamedTest[];
}

interface GroundTruth {
  version: number;
  description: string;
  primaryRecallTargets: { recallAt5: number; recallAt10: number };
  topics: Record<string, TopicSpec>;
}

const GROUND_TRUTH_PATH = "data/evals/crux-recall/flagship-propositions.json";
const RANK_LIMIT = 15;
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

interface TopicOutcome {
  topicId: string;
  set: "primary" | "secondary";
  rankedIds: string[];
  mappedPropositions: number;
  recoveredAt5: number;
  recoveredAt10: number;
  misses: Array<{ id: string; claimIds: string[] }>;
  hardGateViolations: string[];
  namedTestResults: Array<{ id: string; pass: boolean; rank: number }>;
}

function scoreTopic(topicId: string, spec: TopicSpec): TopicOutcome {
  const graph = loadGraph(spec.draft);
  const ranked = identifyCruxes(graph, { limit: RANK_LIMIT });
  const rankedIds = ranked.map((result) => result.claimId);
  const top5 = new Set(rankedIds.slice(0, 5));
  const top10 = new Set(rankedIds.slice(0, 10));

  const mapped = spec.propositions.filter((p) => p.claimIds.length > 0);
  let recoveredAt5 = 0;
  let recoveredAt10 = 0;
  const misses: Array<{ id: string; claimIds: string[] }> = [];
  for (const proposition of mapped) {
    if (proposition.claimIds.some((id) => top5.has(id))) recoveredAt5 += 1;
    else if (proposition.claimIds.some((id) => top10.has(id))) recoveredAt10 += 1;
    else misses.push({ id: proposition.id, claimIds: proposition.claimIds });
  }

  const hardGateViolations: string[] = [];
  for (const id of top5) {
    const claim = claimOf(graph, id);
    if (claim && BACKGROUND_STATUSES.has(claim.status)) {
      hardGateViolations.push(`${id} (${claim.status})`);
    }
  }

  const namedTestResults = spec.namedTests.map((test) => {
    const rank = rankedIds.indexOf(test.claimId) + 1;
    const pass =
      test.withinTopK === -1 ? rank > 0 : rank > 0 && rank <= test.withinTopK;
    return { id: test.id, pass, rank };
  });

  return {
    topicId,
    set: spec.set,
    rankedIds,
    mappedPropositions: mapped.length,
    recoveredAt5,
    recoveredAt10,
    misses,
    hardGateViolations,
    namedTestResults,
  };
}

function main(): void {
  const truth: GroundTruth = JSON.parse(readFileSync(GROUND_TRUTH_PATH, "utf8"));
  const outcomes: TopicOutcome[] = [];
  for (const [topicId, spec] of Object.entries(truth.topics)) {
    try {
      outcomes.push(scoreTopic(topicId, spec));
    } catch (error) {
      console.error(`FAIL ${topicId}: ${error instanceof Error ? error.message : error}`);
      process.exit(1);
    }
  }

  let failed = false;

  console.log("=== Crux-engine pre-registered validation ===\n");
  for (const outcome of outcomes) {
    console.log(
      `${outcome.topicId} [${outcome.set}] — ${outcome.mappedPropositions} mapped propositions`,
    );
    console.log(
      `  Recall@5: ${outcome.recoveredAt5}/${outcome.mappedPropositions}  Recall@10(+misses beyond): ${outcome.recoveredAt10}/${outcome.mappedPropositions}`,
    );
    for (const miss of outcome.misses) {
      console.log(`  MISS ${miss.id}: none of [${miss.claimIds.join(", ")}] in top-${RANK_LIMIT}`);
    }
    if (outcome.hardGateViolations.length > 0) {
      failed = true;
      console.log(`  HARD GATE VIOLATION — background claims in top-5: ${outcome.hardGateViolations.join(", ")}`);
    } else {
      console.log("  Hard gate (no uncontested/broadly_accepted claims in top-5): PASS");
    }
    for (const test of outcome.namedTestResults) {
      console.log(`  Named test ${test.id}: ${test.pass ? "PASS" : "FAIL"} (rank ${test.rank})`);
      if (!test.pass) failed = true;
    }
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

main();

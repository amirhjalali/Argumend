/**
 * Runs the disagreement diagnosis loop over the topic maps this repo already
 * carries, using a locally authenticated CLI rather than an API key.
 *
 * Each flagship map is rendered as a debate transcript, analyzed source-only,
 * and scored against the map it came from. Reports land in .eval-runs/ for the
 * founder checkpoint review; nothing is persisted to the database and no source
 * text leaves the machine except to the local CLI.
 *
 *   tsx scripts/disagreement/run-corpus.ts                  # fake provider, no model
 *   tsx scripts/disagreement/run-corpus.ts --provider cli   # claude CLI on the subscription
 *   tsx scripts/disagreement/run-corpus.ts --provider cli --only capitalism-after-ai
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { analyzeDisagreement } from "@/lib/disagreement/analyze";
import { scoreMapRecovery, summarizeRecovery, type MapRecoveryScore } from "@/lib/disagreement/corpus/recovery";
import { renderDebateFromGraph, type RenderedDebate } from "@/lib/disagreement/corpus/renderDebate";
import { CliDisagreementProvider, type DisagreementCliKind } from "@/lib/disagreement/model/cli";
import { FakeDisagreementProvider } from "@/lib/disagreement/model/fake";
import type { DisagreementModelProvider } from "@/lib/disagreement/model/provider";
import { argumentTopicIds, loadArgumentTopic } from "@/lib/argument/draftTopics";
import { adaptTopicToArgumentGraph } from "@/lib/argument/adapter";
import { topics } from "@/data/topics";
import type { ArgumentGraph } from "@/types/argument";

const OUTPUT_ROOT = ".eval-runs";

interface Options {
  provider: "fake" | "cli";
  cliKind: DisagreementCliKind;
  model: string;
  only?: string;
  /** Dense maps can outrun the default; raise rather than lose the run. */
  timeoutMs?: number;
  /**
   * Widen the corpus to the legacy three-pillar topics through the documented
   * adapter. Their ground truth is weaker — the adapter rewrites a declarative
   * meta-claim into a question and flags its own output for editorial review —
   * so treat their recovery scores as indicative, not as a bar to clear.
   */
  includeLegacy: boolean;
  limit?: number;
}

function parseArgs(argv: string[]): Options {
  const options: Options = {
    provider: "fake",
    cliKind: process.env.ARGUMEND_DISAGREEMENT_CLI === "codex" ? "codex" : "claude",
    model: process.env.ARGUMEND_DISAGREEMENT_MODEL?.trim() || "sonnet",
    includeLegacy: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--provider") options.provider = argv[++index] === "cli" ? "cli" : "fake";
    else if (arg === "--cli") options.cliKind = argv[++index] === "codex" ? "codex" : "claude";
    else if (arg === "--model") options.model = argv[++index];
    else if (arg === "--only") options.only = argv[++index];
    else if (arg === "--timeout") options.timeoutMs = Number(argv[++index]) * 1000;
    else if (arg === "--include-legacy") options.includeLegacy = true;
    else if (arg === "--limit") options.limit = Number(argv[++index]);
  }
  return options;
}

function loadGraphs(options: Options): ArgumentGraph[] {
  const graphs: ArgumentGraph[] = argumentTopicIds
    .map((id) => loadArgumentTopic(id))
    .filter((topic): topic is NonNullable<typeof topic> => Boolean(topic))
    .map((topic) => topic.graph);

  if (options.includeLegacy) {
    for (const topic of topics) {
      // A legacy topic that already has a curated map must not be rendered
      // twice; the curated version is the better ground truth.
      if (graphs.some((graph) => graph.topicId === topic.id)) continue;
      try {
        graphs.push(adaptTopicToArgumentGraph(topic).graph);
      } catch {
        // A topic the adapter cannot express is skipped, not fatal.
      }
    }
  }

  const filtered = options.only ? graphs.filter((graph) => graph.topicId === options.only) : graphs;
  return options.limit ? filtered.slice(0, options.limit) : filtered;
}

function createProvider(options: Options, id: string): DisagreementModelProvider {
  if (options.provider === "fake") return new FakeDisagreementProvider();
  return new CliDisagreementProvider(`corpus-${id}`, {
    kind: options.cliKind,
    model: options.model,
    timeoutMs: options.timeoutMs,
  });
}

function formatScore(score: MapRecoveryScore): string {
  return [
    score.id.padEnd(24),
    `pattern=${score.pattern}`.padEnd(30),
    `pos=${score.recoveredPositionCount}/${score.truthPositionCount}`.padEnd(10),
    `cruxOverlap=${score.cruxLexicalOverlap.toFixed(2)}`.padEnd(18),
    `typeOk=${score.cruxTypeCompatible ? "yes" : "no"}`.padEnd(11),
    `grounding=${score.groundingCoverage.toFixed(2)}`,
  ].join(" ");
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const graphs = loadGraphs(options);
  if (graphs.length === 0) {
    throw new Error("No ArgumentGraph drafts matched. Nothing to run.");
  }

  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const outputDir = join(OUTPUT_ROOT, `corpus-${stamp}`);
  mkdirSync(outputDir, { recursive: true });

  console.log(
    `Running ${graphs.length} map(s) through the diagnosis loop ` +
      `[provider=${options.provider}${options.provider === "cli" ? `:${options.cliKind}/${options.model}` : ""}]`,
  );

  const scores: MapRecoveryScore[] = [];
  const failures: Array<{ id: string; error: string }> = [];

  for (const graph of graphs) {
    let debate: RenderedDebate;
    try {
      debate = renderDebateFromGraph(graph);
    } catch (error) {
      failures.push({ id: graph.topicId, error: `render: ${(error as Error).message}` });
      continue;
    }

    const started = Date.now();
    try {
      const bundle = await analyzeDisagreement({
        content: debate.source,
        contentType: debate.contentType,
        requestId: `corpus-${debate.id}`,
        provider: createProvider(options, debate.id),
      });
      const score = scoreMapRecovery({ report: bundle.report, truth: debate.truth });
      scores.push(score);
      console.log(`${formatScore(score)}  (${Math.round((Date.now() - started) / 1000)}s)`);

      writeFileSync(
        join(outputDir, `${debate.id}.json`),
        JSON.stringify(
          {
            id: debate.id,
            truth: debate.truth,
            source: debate.source,
            report: bundle.report,
            graph: bundle.graph,
            execution: bundle.execution,
            recovery: score,
          },
          null,
          2,
        ),
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      failures.push({ id: debate.id, error: message });
      console.error(`FAIL ${debate.id}: ${message}`);
      // Keep the transcript that failed. Without it the failure cannot be
      // reproduced or judged, which is the whole point of an offline run.
      writeFileSync(
        join(outputDir, `${debate.id}.failed.json`),
        JSON.stringify({ id: debate.id, truth: debate.truth, source: debate.source, error: message }, null, 2),
      );
    }
  }

  const summary = summarizeRecovery(scores);
  writeFileSync(
    join(outputDir, "summary.json"),
    JSON.stringify({ ranAt: new Date().toISOString(), options, summary, scores, failures }, null, 2),
  );

  console.log("");
  console.log(`analyzed        ${summary.count}/${graphs.length}`);
  console.log(`mean cruxOverlap        ${summary.meanCruxOverlap}  (lexical signal, not accuracy)`);
  console.log(`mean groundingCoverage  ${summary.meanGroundingCoverage}`);
  console.log(`kept >2 positions       ${summary.preservedMultiplePositions}/${summary.count}`);
  console.log(`invented extra positions ${summary.overProducedPositions}/${summary.count}`);
  console.log(`crux type compatible    ${summary.cruxTypeCompatible}/${summary.count}`);
  console.log(`\nreports: ${outputDir}`);

  if (failures.length > 0) process.exit(1);
}

void main();

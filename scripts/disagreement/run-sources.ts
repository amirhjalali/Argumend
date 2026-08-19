/**
 * Runs the diagnosis loop over hand-written argument texts rather than
 * transcripts generated from our own maps.
 *
 * The map-recovery harness (run-corpus.ts) answers "can the pipeline recover a
 * structure we already know is there". It cannot answer "is a diagnosis of a
 * real argument any good", because the input came from the same maps used to
 * grade it. This runner closes that gap: the eval fixtures are authored as text
 * a person would actually paste — group chats, forum threads, op-eds — so the
 * reports it produces are the material the founder checkpoint reviews.
 *
 * There is no answer key here by design. The output is reports to read, not a
 * score to clear.
 *
 *   tsx scripts/disagreement/run-sources.ts --provider cli --concurrency 6
 *   tsx scripts/disagreement/run-sources.ts --provider cli --limit 5
 */
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { analyzeDisagreement } from "@/lib/disagreement/analyze";
import { CliDisagreementProvider, type DisagreementCliKind } from "@/lib/disagreement/model/cli";
import { FakeDisagreementProvider } from "@/lib/disagreement/model/fake";
import type { DisagreementModelProvider } from "@/lib/disagreement/model/provider";
import { DISAGREEMENT_FEW_SHOT_EXAMPLES } from "@/lib/disagreement/prompts/v1/examples";
import type { DisagreementContentType } from "@/types/disagreement";

const FIXTURE_DIR = "data/evals/disagreement";
const OUTPUT_ROOT = ".eval-runs";

interface SourceCase {
  id: string;
  contentType: DisagreementContentType;
  source: string;
}

interface Options {
  provider: "fake" | "cli";
  cliKind: DisagreementCliKind;
  model: string;
  concurrency: number;
  limit?: number;
  only?: string;
  timeoutMs?: number;
  /** Include the prompt's own few-shot sources. Off by default: the model has
   *  seen them as examples, so a diagnosis of them proves little. */
  includeExamples: boolean;
}

function parseArgs(argv: string[]): Options {
  const options: Options = {
    provider: "fake",
    cliKind: process.env.ARGUMEND_DISAGREEMENT_CLI === "codex" ? "codex" : "claude",
    model: process.env.ARGUMEND_DISAGREEMENT_MODEL?.trim() || "sonnet",
    concurrency: 4,
    includeExamples: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--provider") options.provider = argv[++index] === "cli" ? "cli" : "fake";
    else if (arg === "--cli") options.cliKind = argv[++index] === "codex" ? "codex" : "claude";
    else if (arg === "--model") options.model = argv[++index];
    else if (arg === "--concurrency") options.concurrency = Math.max(1, Number(argv[++index]));
    else if (arg === "--limit") options.limit = Number(argv[++index]);
    else if (arg === "--only") options.only = argv[++index];
    else if (arg === "--timeout") options.timeoutMs = Number(argv[++index]) * 1000;
    else if (arg === "--include-examples") options.includeExamples = true;
  }
  return options;
}

function loadSources(options: Options): SourceCase[] {
  const cases: SourceCase[] = readdirSync(FIXTURE_DIR)
    .filter((name) => name.endsWith(".json"))
    .map((name) => {
      const fixture = JSON.parse(readFileSync(join(FIXTURE_DIR, name), "utf8")) as SourceCase;
      return { id: fixture.id, contentType: fixture.contentType, source: fixture.source };
    });

  if (options.includeExamples) {
    for (const example of DISAGREEMENT_FEW_SHOT_EXAMPLES) {
      cases.push({ id: `example-${example.name}`, contentType: example.contentType, source: example.source });
    }
  }

  const filtered = options.only ? cases.filter((item) => item.id === options.only) : cases;
  return options.limit ? filtered.slice(0, options.limit) : filtered;
}

function createProvider(options: Options, id: string): DisagreementModelProvider {
  if (options.provider === "fake") return new FakeDisagreementProvider();
  return new CliDisagreementProvider(`sources-${id}`, {
    kind: options.cliKind,
    model: options.model,
    timeoutMs: options.timeoutMs,
  });
}

interface Row {
  id: string;
  pattern: string;
  positions: number;
  commonGround: number;
  disagreements: number;
  cruxes: number;
  groundingCoverage: number;
  seconds: number;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const cases = loadSources(options);
  if (cases.length === 0) throw new Error("No source fixtures matched. Nothing to run.");

  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const outputDir = join(OUTPUT_ROOT, `sources-${stamp}`);
  mkdirSync(outputDir, { recursive: true });

  console.log(
    `Diagnosing ${cases.length} authored source(s) ` +
      `[provider=${options.provider}${options.provider === "cli" ? `:${options.cliKind}/${options.model}` : ""}]`,
  );

  const rows: Row[] = [];
  const failures: Array<{ id: string; error: string }> = [];

  async function runOne(item: SourceCase): Promise<void> {
    const started = Date.now();
    try {
      const bundle = await analyzeDisagreement({
        content: item.source,
        contentType: item.contentType,
        requestId: `sources-${item.id}`,
        provider: createProvider(options, item.id),
      });
      const report = bundle.report;
      const row: Row = {
        id: item.id,
        pattern: report.diagnosis.pattern,
        positions: report.positions.length,
        commonGround: report.commonGround.length,
        disagreements: report.disagreements.length,
        cruxes: report.cruxes.length,
        groundingCoverage: report.quality.groundingCoverage,
        seconds: Math.round((Date.now() - started) / 1000),
      };
      rows.push(row);
      console.log(
        [
          row.id.padEnd(34),
          `pattern=${row.pattern}`.padEnd(30),
          `pos=${row.positions}`.padEnd(7),
          `cg=${row.commonGround}`.padEnd(6),
          `dis=${row.disagreements}`.padEnd(7),
          `crux=${row.cruxes}`.padEnd(8),
          `grounding=${row.groundingCoverage.toFixed(2)}`,
          `(${row.seconds}s)`,
        ].join(" "),
      );

      writeFileSync(
        join(outputDir, `${item.id}.json`),
        JSON.stringify(
          { id: item.id, source: item.source, report, graph: bundle.graph, execution: bundle.execution },
          null,
          2,
        ),
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      failures.push({ id: item.id, error: message });
      console.error(`FAIL ${item.id}: ${message}`);
      writeFileSync(
        join(outputDir, `${item.id}.failed.json`),
        JSON.stringify({ id: item.id, source: item.source, error: message }, null, 2),
      );
    }
  }

  const queue = [...cases];
  const workers = Array.from({ length: Math.min(options.concurrency, queue.length) }, async () => {
    for (let next = queue.shift(); next; next = queue.shift()) {
      await runOne(next);
    }
  });
  await Promise.all(workers);

  const withCrux = rows.filter((row) => row.cruxes > 0).length;
  const meanGrounding =
    rows.length === 0 ? 0 : Number((rows.reduce((sum, row) => sum + row.groundingCoverage, 0) / rows.length).toFixed(3));

  writeFileSync(
    join(outputDir, "summary.json"),
    JSON.stringify({ ranAt: new Date().toISOString(), options, rows, failures }, null, 2),
  );

  console.log("");
  console.log(`diagnosed              ${rows.length}/${cases.length}`);
  console.log(`produced a crux        ${withCrux}/${rows.length}`);
  console.log(`mean groundingCoverage ${meanGrounding}`);
  console.log(`\nreports for review: ${outputDir}`);
  console.log("These have no answer key. Read them; do not score them.");

  if (failures.length > 0) process.exit(1);
}

void main();

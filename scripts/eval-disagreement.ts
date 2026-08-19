import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { analyzeDisagreement } from "../lib/disagreement/analyze";
import { createDisagreementProvider } from "../lib/disagreement/model";
import { FakeDisagreementProvider } from "../lib/disagreement/model/fake";
import { DISAGREEMENT_FEW_SHOT_EXAMPLES } from "../lib/disagreement/prompts/v1/examples";
import type { RawDisagreementExtractionV1 } from "../types/disagreement";

interface Fixture {
  id: string;
  contentType: "conversation" | "article" | "freeform";
  source: string;
  allowedPatterns: string[];
  expectCrux: boolean;
  minPositions: number;
  maxPositions: number;
  extraction?: RawDisagreementExtractionV1;
}

const MIN_FILE_FIXTURES = 24;
const LIVE = process.env.DISAGREEMENT_LIVE_EVAL === "true";

function pad(source: string): string {
  if (source.replace(/\s+/g, "").length >= 120) return source;
  return `${source}\n\n${"Additional context for length. ".repeat(8)}`;
}

function builtinFixtures(): Fixture[] {
  return DISAGREEMENT_FEW_SHOT_EXAMPLES.map((example) => ({
    id: example.name,
    contentType: example.contentType,
    source: pad(example.source),
    allowedPatterns:
      example.name === "one-sided-article" || example.name === "insufficient-context"
        ? ["not-a-disagreement", "insufficient-context"]
        : [
            "mostly-common-ground",
            "single-empirical-crux",
            "causal-model-split",
            "forecast-split",
            "definition-mismatch",
            "value-conflict",
            "priority-tradeoff",
            "trust-split",
            "mixed-disagreement",
          ],
    expectCrux: example.extraction.positions.length >= 2,
    minPositions: example.extraction.positions.length,
    maxPositions: example.extraction.positions.length,
    extraction: example.extraction,
  }));
}

function fileFixtures(): Fixture[] {
  const dir = join(process.cwd(), "data/evals/disagreement");
  const fixtures = readdirSync(dir)
    .filter((name) => name.endsWith(".json"))
    .map((name) => JSON.parse(readFileSync(join(dir, name), "utf8")) as Fixture);
  if (fixtures.length < MIN_FILE_FIXTURES) {
    throw new Error(
      `Expected at least ${MIN_FILE_FIXTURES} fixtures in data/evals/disagreement, found ${fixtures.length}.`,
    );
  }
  return fixtures;
}

interface FixtureResult {
  id: string;
  pattern: string;
  errors: string[];
}

async function runFixture(fixture: Fixture): Promise<FixtureResult> {
  const provider = LIVE
    ? createDisagreementProvider(`eval-${fixture.id}`)
    : new FakeDisagreementProvider(fixture.extraction);
  const result = await analyzeDisagreement({
    content: fixture.source,
    contentType: fixture.contentType,
    requestId: `eval-${fixture.id}`,
    provider,
  });
  const errors: string[] = [];
  if (!fixture.allowedPatterns.includes(result.report.diagnosis.pattern)) {
    errors.push(`pattern ${result.report.diagnosis.pattern}`);
  }
  if (result.report.positions.length < fixture.minPositions || result.report.positions.length > fixture.maxPositions) {
    errors.push(`positions ${result.report.positions.length}`);
  }
  if (fixture.expectCrux && result.report.cruxes.length === 0 && result.report.positions.length >= 2) {
    errors.push("missing crux");
  }
  if (result.report.provenance.independentlyVerified) {
    errors.push("claimed independent verification");
  }
  if ("winner" in result.report) errors.push("winner field");
  return { id: fixture.id, pattern: result.report.diagnosis.pattern, errors };
}

async function main() {
  if (LIVE && !process.env.ANTHROPIC_API_KEY && process.env.ARGUMEND_DISAGREEMENT_PROVIDER !== "fake") {
    throw new Error("Live eval requires ANTHROPIC_API_KEY and ARGUMEND_DISAGREEMENT_MODEL to be set.");
  }

  const fixtures = [...builtinFixtures(), ...fileFixtures()];
  const results: FixtureResult[] = [];
  for (const fixture of fixtures) {
    try {
      results.push(await runFixture(fixture));
    } catch (error) {
      results.push({
        id: fixture.id,
        pattern: "(error)",
        errors: [error instanceof Error ? error.message : String(error)],
      });
    }
  }

  let failed = 0;
  for (const result of results) {
    if (result.errors.length > 0) {
      failed += 1;
      console.error(`FAIL ${result.id}: ${result.errors.join(", ")}`);
    } else {
      console.log(`PASS ${result.id} (${result.pattern})`);
    }
  }

  if (LIVE) {
    const dir = join(process.cwd(), ".eval-runs");
    mkdirSync(dir, { recursive: true });
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    const artifact = join(dir, `disagreement-live-${stamp}.json`);
    writeFileSync(
      artifact,
      JSON.stringify(
        {
          mode: "live",
          model: process.env.ARGUMEND_DISAGREEMENT_MODEL ?? null,
          ranAt: new Date().toISOString(),
          passed: results.length - failed,
          total: results.length,
          results,
        },
        null,
        2,
      ),
    );
    console.log(`Live eval artifact: ${artifact}`);
  }

  console.log(`${fixtures.length - failed}/${fixtures.length} passed`);
  if (failed > 0) process.exit(1);
}

void main();

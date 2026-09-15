/**
 * Evidence runner for projection filter C (CRUX_PROJECTION_SKIP_UNCONTESTED).
 *
 * Reports which cruxes the disagreement report would present with the filter
 * on versus off. It changes nothing: the flag stays off in serving code, and
 * this script sets it only on the "on" pass of each comparison.
 *
 * Two inputs:
 *  - The fake-provider fixtures (the prompt's few-shot examples plus
 *    data/evals/disagreement/*.json), run through the full pipeline twice.
 *  - A `.eval-runs/sources-*` directory of live reports. Those files hold the
 *    report and the argument graph but not the raw extraction, so the
 *    extraction is rebuilt from the two (the graph encodes `disputedBy` as
 *    claim status, stances as claim-to-position edges, and relations as
 *    claim-to-claim edges) and pushed through the real projection. The
 *    flag-off pass must reproduce the stored crux list exactly; the script
 *    reports any file where it does not, and that file's diff is not evidence.
 *
 * `--loose` adds a sensitivity pass that is NOT a flag and not implemented in
 * the projection: it re-runs the live replay with every claim's opposing
 * stances rewritten as supporting in the extraction handed to the projection,
 * while the graph (and so the engine ranking) stays exactly as stored. Under
 * that transform the filter's "undisputed" test reduces to "no participant
 * disputes it and no claim contradicts it", which shows what the filter would
 * do if an opposing stance were not taken as evidence of dispute.
 *
 * Usage:
 *   tsx scripts/crux-lever-projection-diff.ts [--run .eval-runs/sources-<stamp>] [--skip-fixtures] [--skip-live] [--loose]
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { CRUX_LEVER_ENV_VARS } from "@/lib/crux";
import { validateArgumentGraph } from "@/lib/argument/validate";
import { parseArgumentGraph } from "@/lib/schemas/argument";
import { analyzeDisagreement } from "@/lib/disagreement/analyze";
import { FakeDisagreementProvider } from "@/lib/disagreement/model/fake";
import { projectDisagreementReport } from "@/lib/disagreement/projectReport";
import { DISAGREEMENT_FEW_SHOT_EXAMPLES } from "@/lib/disagreement/prompts/v1/examples";
import { normalizeSourceText } from "@/lib/disagreement/source";
import type { ArgumentGraph, Claim } from "@/types/argument";
import type {
  DisagreementAnalysisBundleV1,
  DisagreementContentType,
  DisagreementReportV1,
  RawDisagreementExtractionV1,
} from "@/types/disagreement";

const FIXTURE_DIR = "data/evals/disagreement";
const DEFAULT_RUN = ".eval-runs/sources-2026-09-15T02-22-03-636Z";
const SKIP_PREFIX = "Projection skipped engine crux";

interface Options {
  run: string;
  fixtures: boolean;
  live: boolean;
  loose: boolean;
}

function parseArgs(argv: string[]): Options {
  const options: Options = { run: DEFAULT_RUN, fixtures: true, live: true, loose: false };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--run") options.run = argv[++index] ?? DEFAULT_RUN;
    else if (arg === "--skip-fixtures") options.fixtures = false;
    else if (arg === "--skip-live") options.live = false;
    else if (arg === "--loose") options.loose = true;
  }
  return options;
}

interface CruxView {
  claimId: string;
  question: string;
}

interface DiffRow {
  id: string;
  before: CruxView[];
  after: CruxView[];
  skipped: string[];
  /** Live only: the flag-off replay matched the stored report's crux list. */
  faithful?: boolean;
  /** Live only: the current attestation rule kept fewer common-ground items than the stored report. */
  commonGroundDropped?: number;
}

function views(report: DisagreementReportV1): CruxView[] {
  return report.cruxes.map((crux) => ({ claimId: crux.claimId, question: crux.question }));
}

function skippedWarnings(report: DisagreementReportV1): string[] {
  return report.quality.warnings
    .filter((warning) => warning.startsWith(SKIP_PREFIX))
    .map((warning) => warning.slice(SKIP_PREFIX.length).trim());
}

// ---------------------------------------------------------------- fixtures

interface Fixture {
  id: string;
  contentType: DisagreementContentType;
  source: string;
  extraction?: RawDisagreementExtractionV1;
}

/** Same padding scripts/eval-disagreement.ts applies to the short few-shot sources. */
function pad(source: string): string {
  if (source.replace(/\s+/g, "").length >= 120) return source;
  return `${source}\n\n${"Additional context for length. ".repeat(8)}`;
}

function loadFixtures(): Fixture[] {
  const builtin: Fixture[] = DISAGREEMENT_FEW_SHOT_EXAMPLES.map((example) => ({
    id: example.name,
    contentType: example.contentType,
    source: pad(example.source),
    extraction: example.extraction,
  }));
  const files: Fixture[] = readdirSync(join(process.cwd(), FIXTURE_DIR))
    .filter((name) => name.endsWith(".json"))
    .map((name) => JSON.parse(readFileSync(join(process.cwd(), FIXTURE_DIR, name), "utf8")) as Fixture);
  return [...builtin, ...files];
}

async function withFlag<T>(on: boolean, run: () => Promise<T>): Promise<T> {
  const name = CRUX_LEVER_ENV_VARS.projectionSkipUncontested;
  const previous = process.env[name];
  if (on) process.env[name] = "true";
  else Reflect.deleteProperty(process.env, name);
  try {
    return await run();
  } finally {
    if (previous === undefined) Reflect.deleteProperty(process.env, name);
    else process.env[name] = previous;
  }
}

async function runFixture(fixture: Fixture, on: boolean): Promise<DisagreementAnalysisBundleV1> {
  return withFlag(on, () =>
    analyzeDisagreement({
      content: fixture.source,
      contentType: fixture.contentType,
      requestId: `lever-c-${fixture.id}`,
      provider: new FakeDisagreementProvider(fixture.extraction),
    }),
  );
}

async function diffFixtures(): Promise<DiffRow[]> {
  const rows: DiffRow[] = [];
  for (const fixture of loadFixtures()) {
    const before = await runFixture(fixture, false);
    const after = await runFixture(fixture, true);
    rows.push({
      id: fixture.id,
      before: views(before.report),
      after: views(after.report),
      skipped: skippedWarnings(after.report),
    });
  }
  return rows;
}

// ---------------------------------------------------------------- live replay

interface StoredRun {
  id: string;
  source: string;
  report: DisagreementReportV1;
  graph: ArgumentGraph;
  execution: { provider: string; model: string };
}

type RawClaim = RawDisagreementExtractionV1["claims"][number];

function quotesOf(grounding: Array<{ quote: string; participantId?: string }>) {
  return grounding.map((ref) => ({ quote: ref.quote, participantId: ref.participantId }));
}

/**
 * Rebuilds the raw extraction the projection consumed, from what the run
 * stored. Fields the projection never reads for crux selection (accepted-by
 * lists, claim quotes, stakes) are left empty; `disputedBy` is recovered from
 * the claim's graph status, which buildArgumentGraph derives from it alone.
 */
export function extractionFromStored(stored: StoredRun): RawDisagreementExtractionV1 {
  const { report, graph } = stored;
  const positionIds = new Set(graph.nodes.filter((node) => node.type === "position").map((node) => node.id));
  const claims: RawClaim[] = graph.nodes
    .filter((node): node is Claim => node.type === "claim")
    .map((node) => ({
      id: node.id,
      statement: node.statement,
      participantIds: node.attributedTo ?? [],
      epistemicType: node.epistemicType as RawClaim["epistemicType"],
      explicitness: node.implicit ? "inferred" : "explicit",
      stanceByPosition: graph.edges
        .filter(
          (edge) =>
            edge.from === node.id && positionIds.has(edge.to) && (edge.type === "supports" || edge.type === "opposes"),
        )
        .map((edge) => ({ positionId: edge.to, relation: edge.type as "supports" | "opposes" })),
      acceptedByParticipantIds: [],
      disputedByParticipantIds: node.status === "contested" ? ["recorded-in-graph-status"] : [],
      confidence: "medium",
      resolution: node.resolution as RawClaim["resolution"],
      groundingQuotes: [],
    }));
  const claimIds = new Set(claims.map((claim) => claim.id));
  return {
    mainQuestion: report.question,
    participants: report.participants,
    positions: report.positions.map((position) => ({
      id: position.id,
      label: position.label,
      participantIds: position.participantIds,
      thesis: position.thesis,
      steelman: position.steelman,
      explicitness: position.explicitness,
      confidence: position.confidence,
      groundingQuotes: quotesOf(position.grounding),
    })),
    claims,
    claimRelations: graph.edges
      .filter((edge) => claimIds.has(edge.from) && claimIds.has(edge.to))
      .map((edge) => ({
        fromClaimId: edge.from,
        toClaimId: edge.to,
        type: edge.type as RawDisagreementExtractionV1["claimRelations"][number]["type"],
      })),
    commonGroundCandidates: report.commonGround.map((item) => ({
      statement: item.statement,
      participantIds: item.participantIds,
      basis: item.basis,
      confidence: item.confidence,
      groundingQuotes: quotesOf(item.grounding),
    })),
    disagreementCandidates: report.disagreements.map((item) => ({
      id: item.id,
      question: item.question,
      type: item.type,
      summary: item.summary,
      claimIds: item.relatedClaimIds,
      participantStances: item.participantStances,
      resolutionCondition: item.resolutionCondition,
      confidence: item.confidence,
      groundingQuotes: quotesOf(item.grounding),
    })),
    caveats: [],
  };
}

function loadRun(dir: string): StoredRun[] {
  return readdirSync(dir)
    .filter((name) => name.endsWith(".json") && name !== "summary.json" && !name.endsWith(".failed.json"))
    .sort()
    .map((name) => JSON.parse(readFileSync(join(dir, name), "utf8")) as StoredRun);
}

/** Sensitivity transform for `--loose`; see the file comment. The graph is untouched. */
function neutraliseOpposingStances(extraction: RawDisagreementExtractionV1): RawDisagreementExtractionV1 {
  return {
    ...extraction,
    claims: extraction.claims.map((claim) => ({
      ...claim,
      stanceByPosition: claim.stanceByPosition.map((stance) => ({ ...stance, relation: "supports" as const })),
    })),
  };
}

function replay(stored: StoredRun, on: boolean, loose = false): DisagreementReportV1 {
  const parsed = parseArgumentGraph(stored.graph);
  const graph = parsed.ok ? parsed.graph : stored.graph;
  const graphValid =
    parsed.ok && validateArgumentGraph(graph).every((issue) => issue.severity !== "error");
  const extraction = extractionFromStored(stored);
  return projectDisagreementReport({
    extraction: loose ? neutraliseOpposingStances(extraction) : extraction,
    graph,
    graphValid,
    source: normalizeSourceText(stored.source),
    provider: stored.execution.provider,
    model: stored.execution.model,
    cruxFlags: { projectionSkipUncontested: on },
  });
}

function diffLive(dir: string, loose: boolean): DiffRow[] {
  return loadRun(dir).map((stored) => {
    // The faithfulness check always uses the untransformed extraction.
    const before = replay(stored, false);
    const after = replay(stored, true, loose);
    const storedIds = stored.report.cruxes.map((crux) => crux.claimId);
    const replayedIds = before.cruxes.map((crux) => crux.claimId);
    return {
      id: stored.id,
      before: views(before),
      after: views(after),
      skipped: skippedWarnings(after),
      faithful: JSON.stringify(storedIds) === JSON.stringify(replayedIds),
      commonGroundDropped: Math.max(0, stored.report.commonGround.length - before.commonGround.length),
    };
  });
}

// ---------------------------------------------------------------- output

function cell(view: CruxView | undefined): string {
  if (!view) return "(none)";
  return `\`${view.claimId}\` "${view.question.replace(/\|/g, "\\|")}"`;
}

function printTable(title: string, rows: DiffRow[], live: boolean): void {
  const changedPrimary = rows.filter((row) => row.before[0]?.claimId !== row.after[0]?.claimId);
  const changedAny = rows.filter((row) => JSON.stringify(row.before) !== JSON.stringify(row.after));
  const unfaithful = rows.filter((row) => row.faithful === false);
  const cgDropped = rows.filter((row) => (row.commonGroundDropped ?? 0) > 0);
  console.log(`\n### ${title}\n`);
  console.log(
    `${rows.length} reports; primary crux changed in ${changedPrimary.length}; any presented crux changed in ${changedAny.length}` +
      (live
        ? `; flag-off replay mismatched the stored report's crux list in ${unfaithful.length}` +
          `; current common-ground attestation kept fewer items than the stored report in ${cgDropped.length}`
        : ""),
  );
  console.log("");
  console.log(`| Report | Primary crux (off) | Primary crux (on) | Other changes | Skipped (reason) |${live ? " Replay faithful |" : ""}`);
  console.log(`|---|---|---|---|---|${live ? "---|" : ""}`);
  for (const row of rows) {
    if (JSON.stringify(row.before) === JSON.stringify(row.after) && row.skipped.length === 0) continue;
    const otherChanges =
      row.before.slice(1).map((view) => view.claimId).join(", ") === row.after.slice(1).map((view) => view.claimId).join(", ")
        ? "none"
        : `off: ${row.before.slice(1).map((view) => view.claimId).join(", ") || "-"}; on: ${row.after.slice(1).map((view) => view.claimId).join(", ") || "-"}`;
    console.log(
      `| ${row.id} | ${cell(row.before[0])} | ${row.before[0]?.claimId === row.after[0]?.claimId ? "unchanged" : cell(row.after[0])} | ${otherChanges} | ${row.skipped.map((s) => s.replace(/\|/g, "\\|")).join("; ") || "none"} |` +
        (live ? ` ${row.faithful ? "yes" : "NO"} |` : ""),
    );
  }
  if (live && unfaithful.length > 0) {
    console.log(`\nUnfaithful replays (diff not evidence): ${unfaithful.map((row) => row.id).join(", ")}`);
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.fixtures) {
    printTable("Fake-provider fixtures (few-shot examples + data/evals/disagreement)", await diffFixtures(), false);
  }
  if (options.live) {
    printTable(`Live reports replayed from ${options.run}`, diffLive(options.run, false), true);
    if (options.loose) {
      printTable(
        `SENSITIVITY (not a flag): same replay with opposing stances neutralised in the extraction only, from ${options.run}`,
        diffLive(options.run, true),
        true,
      );
    }
  }
}

void main();

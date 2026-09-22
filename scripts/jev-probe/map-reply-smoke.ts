/**
 * Live smoke test for the map-reply pipeline.
 *
 * Runs `lib/mapReply` against the real TypeSafe API on the experiment C
 * rent-control thread, and on a real debate clip if one is on disk. Prints the
 * composed reply, the per-stage timings, and the token usage.
 *
 *   export TYPESAFE_API_KEY=...
 *   bun scripts/jev-probe/map-reply-smoke.ts
 *   bun scripts/jev-probe/map-reply-smoke.ts --clip path/to/diarized.json
 *   bun scripts/jev-probe/map-reply-smoke.ts --record     # refresh the test fixture
 *
 * `--record` writes `lib/mapReply/__fixtures__/rentControl.jev.json`, the
 * recorded answers behind the markdown snapshot test. Re-record whenever a
 * question's wording changes, and read the diff: it is the only place in the
 * test suite where the model's real judgement is pinned.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { HttpJevProvider } from "@/lib/jev/client";
import type {
  JevCallOptions,
  JevProvider,
  JevQuestionSet,
  JevResponse,
  JevResult,
} from "@/lib/jev/types";
import { MAP_REPLY_LIMITS } from "@/lib/mapReply/constants";
import { runMapReply } from "@/lib/mapReply/pipeline";
import { formatPercent } from "@/lib/mapReply/render";
import type { MapReplyResult } from "@/lib/mapReply/types";
import { RENT_CONTROL_THREAD } from "@/lib/mapReply/__fixtures__/rentControlThread";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(HERE, "..", "..");

const args = process.argv.slice(2);
const record = args.includes("--record");
const clipFlag = args.indexOf("--clip");
const clipArg = clipFlag >= 0 ? args[clipFlag + 1] : undefined;

if (!process.env.TYPESAFE_API_KEY) {
  console.error(
    "TYPESAFE_API_KEY is not set. Export it first; it is never read from anywhere else.",
  );
  process.exit(1);
}

/** Wraps the live provider so a run can be saved as a fixture. */
class RecordingJevProvider implements JevProvider {
  readonly lane: JevProvider["lane"];
  readonly recorded: Record<string, JevResponse> = {};

  constructor(private readonly inner: JevProvider) {
    this.lane = inner.lane;
  }

  async systemOne(
    state: unknown,
    questions: JevQuestionSet,
    options?: JevCallOptions,
  ): Promise<JevResult> {
    const result = await this.inner.systemOne(state, questions, options);
    if (options?.label) {
      this.recorded[options.label] = {
        model: result.model,
        answers: result.answers,
        usage: result.usage,
      };
    }
    return result;
  }
}

interface DiarizedTurn {
  speaker: string;
  text: string;
}

/** Accepts a diarized JSON or an expE results file; both carry speaker turns. */
function readClip(path: string): string | null {
  if (!existsSync(path)) return null;
  const parsed = JSON.parse(readFileSync(path, "utf8")) as {
    turns?: DiarizedTurn[];
    substantive?: DiarizedTurn[];
  };
  const turns = parsed.turns ?? parsed.substantive;
  if (!turns?.length) return null;
  const text = turns.map((turn) => `${turn.speaker}: ${turn.text}`).join("\n");
  return text.length > MAP_REPLY_LIMITS.maxCharacters
    ? text.slice(0, MAP_REPLY_LIMITS.maxCharacters)
    : text;
}

function findClip(): { label: string; text: string } | null {
  const candidates = [
    clipArg,
    resolve(REPO, "scripts/jev-probe/clips/piers-immigration.diarized.json"),
    resolve(REPO, "scripts/jev-probe/expE.piers-immigration.results.json"),
  ].filter((path): path is string => Boolean(path));

  for (const path of candidates) {
    const text = readClip(path);
    if (text) return { label: path, text };
  }
  return null;
}

function report(name: string, text: string, result: MapReplyResult): void {
  const { execution, thread } = result;
  console.log(`\n${"=".repeat(78)}\n${name}`);
  console.log(
    `  input ${text.length} chars, ${thread.turnCount} turns (${thread.substantiveCount} substantive, ${thread.wordCount} words)`,
  );
  console.log(
    `  lane ${execution.lane}  model ${execution.model}  requests ${execution.requests}  retries ${execution.retries}  tokens ${execution.usage.inputTokens} in / ${execution.usage.outputTokens} out`,
  );
  console.log(
    `  redactions ${JSON.stringify(execution.redactions)}  timings ${JSON.stringify(execution.timings)}`,
  );

  if (!result.ok) {
    console.log(`  NO MAP (${result.reason}): ${result.message}`);
    console.log(
      `  candidates: ${result.candidates.map((candidate) => candidate.id).join(", ") || "none"}`,
    );
    console.log(`\n${result.markdown}`);
    return;
  }

  console.log(
    `  map ${result.topic.id} at ${formatPercent(result.topicChoice.confidence)} (threshold ${formatPercent(result.topicChoice.threshold)})`,
  );
  console.log("\n  PER TURN");
  for (const turn of result.turns) {
    console.log(
      `    ${turn.speaker.padEnd(15)} -> ${String(turn.section).padEnd(26)} ${formatPercent(turn.sectionConfidence).padStart(4)}  stance ${turn.stance.padEnd(8)} fallacy ${formatPercent(turn.fallacy).padStart(4)}  factual ${formatPercent(turn.factual).padStart(4)}${turn.notAnArgument ? "  [not an argument]" : ""}`,
    );
  }
  console.log("\n  THREAD");
  console.log(
    `    pattern ${result.pattern.pattern} (${formatPercent(result.pattern.confidence)})  empirical_lever ${formatPercent(result.signals.empiricalLever)}  value_residual ${formatPercent(result.signals.valueResidual)}  talking_past ${formatPercent(result.signals.talkingPast)}  definitional ${formatPercent(result.signals.definitional)}`,
  );
  console.log("\n  CRUX TOUCH");
  for (const crux of result.cruxes) {
    console.log(
      `    ${formatPercent(crux.touched).padStart(4)}  ${crux.cruxTitle}${crux.isDominantSection ? "  (dominant section)" : ""}`,
    );
  }
  console.log(`\n  COMPOSED REPLY\n\n${result.markdown}\n`);
}

const provider = new RecordingJevProvider(
  new HttpJevProvider({ apiKey: process.env.TYPESAFE_API_KEY }),
);

const rentControl = await runMapReply({ text: RENT_CONTROL_THREAD, provider });
report("expC rent-control thread", RENT_CONTROL_THREAD, rentControl);

if (record) {
  const path = resolve(REPO, "lib/mapReply/__fixtures__/rentControl.jev.json");
  writeFileSync(path, `${JSON.stringify(provider.recorded, null, 1)}\n`);
  console.log(`Recorded ${Object.keys(provider.recorded).length} labels to ${path}`);
}

const clip = findClip();
if (clip) {
  const clipProvider = new HttpJevProvider({ apiKey: process.env.TYPESAFE_API_KEY });
  const clipResult = await runMapReply({ text: clip.text, provider: clipProvider });
  report(`clip: ${clip.label}`, clip.text, clipResult);
} else {
  console.log(
    "\nNo clip transcript on disk. See scripts/jev-probe/CLIPS.md for how to produce one, then pass --clip <path>.",
  );
}

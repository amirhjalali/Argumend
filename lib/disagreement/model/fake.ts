import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { DISAGREEMENT_FEW_SHOT_EXAMPLES } from "@/lib/disagreement/prompts/v1/examples";
import { normalizeSourceText } from "@/lib/disagreement/source";
import type { RawDisagreementExtractionV1 } from "@/types/disagreement";
import type {
  DisagreementExtractRequest,
  DisagreementExtractResult,
  DisagreementModelProvider,
} from "./provider";

/**
 * Directory of eval fixtures, relative to the project root. Each file is the
 * same JSON shape `scripts/eval-disagreement.ts` reads (`source` plus an
 * optional canned `extraction`). That script runs its main on import, so its
 * loader cannot be shared; this loader reads the same files the same way.
 */
const FIXTURE_DIR = "data/evals/disagreement";

interface SourceFixture {
  source?: unknown;
  extraction?: RawDisagreementExtractionV1;
}

function clone<T>(value: T): T {
  return structuredClone(value);
}

/** The pipeline normalizes the source before the provider sees it; match on that form. */
function fixtureKey(source: string): string {
  return normalizeSourceText(source).trim();
}

let fixtureIndex: Map<string, RawDisagreementExtractionV1> | null = null;

function loadFixtureIndex(): Map<string, RawDisagreementExtractionV1> {
  if (fixtureIndex) return fixtureIndex;
  const index = new Map<string, RawDisagreementExtractionV1>();
  const dir = join(process.cwd(), FIXTURE_DIR);
  let names: string[] = [];
  try {
    names = readdirSync(dir).filter((name) => name.endsWith(".json"));
  } catch {
    // No fixture directory (e.g. a trimmed deployment): keyword fallback only.
  }
  for (const name of names) {
    try {
      const fixture = JSON.parse(readFileSync(join(dir, name), "utf8")) as SourceFixture;
      if (typeof fixture.source === "string" && fixture.extraction) {
        index.set(fixtureKey(fixture.source), fixture.extraction);
      }
    } catch {
      // A malformed fixture is the eval script's problem to report, not ours.
    }
  }
  fixtureIndex = index;
  return index;
}

function pickFixture(content: string): RawDisagreementExtractionV1 {
  const exact = loadFixtureIndex().get(fixtureKey(content));
  if (exact) {
    return clone(exact);
  }
  const lower = content.toLowerCase();
  if (lower.includes("ignore previous") || lower.includes("ignore all previous")) {
    return clone(DISAGREEMENT_FEW_SHOT_EXAMPLES[5].extraction);
  }
  if (lower.includes("uninsured")) {
    return clone(DISAGREEMENT_FEW_SHOT_EXAMPLES[0].extraction);
  }
  if (lower.includes("immigration") && lower.includes("wage")) {
    return clone(DISAGREEMENT_FEW_SHOT_EXAMPLES[1].extraction);
  }
  if (lower.includes("capitalism")) {
    return clone(DISAGREEMENT_FEW_SHOT_EXAMPLES[2].extraction);
  }
  if (lower.includes("false negative") || lower.includes("false positive")) {
    return clone(DISAGREEMENT_FEW_SHOT_EXAMPLES[3].extraction);
  }
  if (lower.includes("bike lane") || lower.includes("oak street")) {
    return clone(DISAGREEMENT_FEW_SHOT_EXAMPLES[4].extraction);
  }
  if (content.trim().split(/\s+/).length < 20) {
    return clone(DISAGREEMENT_FEW_SHOT_EXAMPLES[5].extraction);
  }
  return clone(DISAGREEMENT_FEW_SHOT_EXAMPLES[5].extraction);
}

export class FakeDisagreementProvider implements DisagreementModelProvider {
  constructor(private readonly extraction?: RawDisagreementExtractionV1) {}

  async extract(
    request: DisagreementExtractRequest,
    options: { signal?: AbortSignal } = {},
  ): Promise<DisagreementExtractResult> {
    if (options.signal?.aborted) {
      throw new DOMException("Aborted", "AbortError");
    }
    const started = Date.now();
    return {
      data: this.extraction ? clone(this.extraction) : pickFixture(request.content),
      meta: {
        provider: "fake",
        model: "fake-disagreement-v1",
        latencyMs: Math.max(1, Date.now() - started),
      },
    };
  }
}

import { DISAGREEMENT_FEW_SHOT_EXAMPLES } from "@/lib/disagreement/prompts/v1/examples";
import type { RawDisagreementExtractionV1 } from "@/types/disagreement";
import type {
  DisagreementExtractRequest,
  DisagreementExtractResult,
  DisagreementModelProvider,
} from "./provider";

function clone<T>(value: T): T {
  return structuredClone(value);
}

function pickFixture(content: string): RawDisagreementExtractionV1 {
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

import type {
  DisagreementAnalysisBundleV1,
  DisagreementContentType,
  RawDisagreementExtractionV1,
} from "@/types/disagreement";
import {
  RawDisagreementExtractionSchema,
  parseRawDisagreementExtraction,
} from "@/lib/schemas/disagreement";
import { issuePaths } from "./model/cli";
import { DisagreementError } from "./errors";
import { buildArgumentGraph } from "./buildGraph";
import type { DisagreementModelProvider } from "./model/provider";
import { normalizeExtraction } from "./normalize";
import { projectDisagreementReport } from "./projectReport";
import { validateAnalyzeRequest } from "./source";

export async function analyzeDisagreement(input: {
  content: string;
  contentType?: DisagreementContentType;
  requestId: string;
  provider: DisagreementModelProvider;
  signal?: AbortSignal;
}): Promise<DisagreementAnalysisBundleV1> {
  const request = validateAnalyzeRequest({
    content: input.content,
    contentType: input.contentType,
    requestId: input.requestId,
  });

  const extracted = await input.provider.extract(request, { signal: input.signal });
  const parsed = parseRawDisagreementExtraction(extracted.data);

  // A structurally invalid payload is unusable. Dangling references are not:
  // §10.3 of the spec says to drop them and warn, and normalizeExtraction does
  // exactly that. Failing here would discard a whole extraction for a problem
  // the very next step exists to repair.
  if (!parsed.success && parsed.error) {
    throw new DisagreementError(
      "MODEL_SCHEMA_INVALID",
      input.requestId,
      `Extraction failed schema validation at: ${issuePaths({ issues: parsed.error.issues }).join(", ") || "unknown"}`,
    );
  }

  const structural = parsed.success
    ? parsed.data
    : (RawDisagreementExtractionSchema.parse(extracted.data) as RawDisagreementExtractionV1);
  const normalized = normalizeExtraction(structural);
  const graphResult = buildArgumentGraph(normalized.extraction);
  const report = projectDisagreementReport({
    extraction: normalized.extraction,
    graph: graphResult.graph,
    graphValid: graphResult.valid,
    source: request.content,
    provider: extracted.meta.provider,
    model: extracted.meta.model,
    extraWarnings: [...normalized.warnings, ...graphResult.warnings],
  });

  return {
    report,
    graph: graphResult.graph,
    execution: {
      mode: "live",
      provider: extracted.meta.provider,
      model: extracted.meta.model,
      promptVersion: report.provenance.promptVersion,
      latencyMs: extracted.meta.latencyMs,
      inputCharacters: request.content.length,
      outputTokens: extracted.meta.outputTokens,
    },
  };
}

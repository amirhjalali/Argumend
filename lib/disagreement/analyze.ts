import type { DisagreementAnalysisBundleV1, DisagreementContentType } from "@/types/disagreement";
import { parseRawDisagreementExtraction } from "@/lib/schemas/disagreement";
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
  if (!parsed.success) {
    throw new DisagreementError("MODEL_SCHEMA_INVALID", input.requestId);
  }

  const normalized = normalizeExtraction(parsed.data);
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

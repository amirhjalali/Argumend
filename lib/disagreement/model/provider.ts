import type {
  DisagreementContentType,
  RawDisagreementExtractionV1,
} from "@/types/disagreement";

export interface DisagreementExtractRequest {
  content: string;
  contentType: DisagreementContentType;
}

export interface DisagreementExtractMeta {
  provider: string;
  model: string;
  latencyMs: number;
  outputTokens?: number;
}

export interface DisagreementExtractResult {
  data: RawDisagreementExtractionV1;
  meta: DisagreementExtractMeta;
}

export interface DisagreementModelProvider {
  extract(
    request: DisagreementExtractRequest,
    options: { signal?: AbortSignal },
  ): Promise<DisagreementExtractResult>;
}

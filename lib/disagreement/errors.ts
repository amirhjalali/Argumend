import type { DisagreementErrorCode } from "@/types/disagreement";

const STATUS_BY_CODE: Record<DisagreementErrorCode, number> = {
  FEATURE_DISABLED: 404,
  INVALID_REQUEST: 400,
  CONTENT_TOO_SHORT: 400,
  CONTENT_TOO_LONG: 400,
  URL_INGESTION_NOT_AVAILABLE: 400,
  RATE_LIMITED: 429,
  MODEL_TIMEOUT: 504,
  MODEL_UNAVAILABLE: 503,
  MODEL_SCHEMA_INVALID: 502,
  INSUFFICIENT_ARGUMENT_STRUCTURE: 422,
  INTERNAL_ERROR: 500,
};

const MESSAGE_BY_CODE: Record<DisagreementErrorCode, string> = {
  FEATURE_DISABLED: "Disagreement diagnosis is not enabled.",
  INVALID_REQUEST: "The request could not be understood.",
  CONTENT_TOO_SHORT: "Paste a longer excerpt so Argumend can find the structure.",
  CONTENT_TOO_LONG: "That text is too long. Paste up to 20,000 characters.",
  URL_INGESTION_NOT_AVAILABLE:
    "Paste the relevant text for now. Direct link analysis is coming later.",
  RATE_LIMITED: "Too many analyses from this network. Try again later.",
  MODEL_TIMEOUT: "The analysis timed out. Please try again.",
  MODEL_UNAVAILABLE: "The analysis service is temporarily unavailable.",
  MODEL_SCHEMA_INVALID: "The model returned an unusable analysis. Please try again.",
  INSUFFICIENT_ARGUMENT_STRUCTURE:
    "Argumend could not extract a reliable disagreement from this text.",
  INTERNAL_ERROR: "Something went wrong while building the diagnosis.",
};

export class DisagreementError extends Error {
  readonly code: DisagreementErrorCode;
  readonly status: number;
  readonly requestId: string;

  constructor(code: DisagreementErrorCode, requestId: string, message?: string) {
    super(message ?? MESSAGE_BY_CODE[code]);
    this.name = "DisagreementError";
    this.code = code;
    this.status = STATUS_BY_CODE[code];
    this.requestId = requestId;
  }
}

export function isDisagreementError(error: unknown): error is DisagreementError {
  return error instanceof DisagreementError;
}

export function disagreementUserMessage(code: DisagreementErrorCode): string {
  return MESSAGE_BY_CODE[code];
}

export function disagreementStatus(code: DisagreementErrorCode): number {
  return STATUS_BY_CODE[code];
}

export function createRequestId(): string {
  return crypto.randomUUID();
}

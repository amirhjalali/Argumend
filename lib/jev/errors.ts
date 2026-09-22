export type JevErrorCode =
  | "JEV_NOT_CONFIGURED"
  | "JEV_TIMEOUT"
  | "JEV_UNAVAILABLE"
  | "JEV_BAD_RESPONSE"
  | "JEV_BUDGET_EXCEEDED"
  | "JEV_REQUEST_FAILED";

const MESSAGE_BY_CODE: Record<JevErrorCode, string> = {
  JEV_NOT_CONFIGURED: "The Jev provider is not configured.",
  JEV_TIMEOUT: "The Jev request timed out.",
  JEV_UNAVAILABLE: "Jev is temporarily unavailable.",
  JEV_BAD_RESPONSE: "Jev returned an unusable response.",
  JEV_BUDGET_EXCEEDED: "The daily Jev token ceiling for this process has been reached.",
  JEV_REQUEST_FAILED: "The Jev request was rejected.",
};

export class JevError extends Error {
  readonly code: JevErrorCode;
  /** The upstream HTTP status, when the failure came from a response. */
  readonly status?: number;

  constructor(code: JevErrorCode, message?: string, status?: number) {
    super(message ?? MESSAGE_BY_CODE[code]);
    this.name = "JevError";
    this.code = code;
    this.status = status;
  }
}

export function isJevError(error: unknown): error is JevError {
  return error instanceof JevError;
}

export function jevErrorMessage(code: JevErrorCode): string {
  return MESSAGE_BY_CODE[code];
}

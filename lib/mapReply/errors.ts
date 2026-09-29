import { isJevError } from "@/lib/jev/errors";

export type MapReplyErrorCode =
  | "FEATURE_DISABLED"
  | "PROVIDER_NOT_CONFIGURED"
  | "INVALID_REQUEST"
  | "CONTENT_TOO_SHORT"
  | "CONTENT_TOO_LONG"
  | "RATE_LIMITED"
  | "SPEND_LIMIT_REACHED"
  | "PROVIDER_TIMEOUT"
  | "PROVIDER_UNAVAILABLE"
  | "INTERNAL_ERROR";

const STATUS_BY_CODE: Record<MapReplyErrorCode, number> = {
  FEATURE_DISABLED: 404,
  PROVIDER_NOT_CONFIGURED: 503,
  INVALID_REQUEST: 400,
  CONTENT_TOO_SHORT: 400,
  CONTENT_TOO_LONG: 400,
  RATE_LIMITED: 429,
  SPEND_LIMIT_REACHED: 503,
  PROVIDER_TIMEOUT: 504,
  PROVIDER_UNAVAILABLE: 503,
  INTERNAL_ERROR: 500,
};

const MESSAGE_BY_CODE: Record<MapReplyErrorCode, string> = {
  FEATURE_DISABLED: "Map replies are not enabled.",
  PROVIDER_NOT_CONFIGURED: "Map replies are enabled but no model provider is configured.",
  INVALID_REQUEST: "The request could not be understood.",
  CONTENT_TOO_SHORT: "Paste a longer exchange so Argumend can route it to a map.",
  CONTENT_TOO_LONG: "That text is too long. Paste up to 12,000 characters.",
  RATE_LIMITED: "Too many map replies from this network. Try again later.",
  SPEND_LIMIT_REACHED: "The daily model budget for map replies has been reached.",
  PROVIDER_TIMEOUT: "The map reply timed out. Please try again.",
  PROVIDER_UNAVAILABLE: "The map reply service is temporarily unavailable.",
  INTERNAL_ERROR: "Something went wrong while building the map reply.",
};

export class MapReplyError extends Error {
  readonly code: MapReplyErrorCode;
  readonly status: number;

  constructor(code: MapReplyErrorCode, message?: string) {
    super(message ?? MESSAGE_BY_CODE[code]);
    this.name = "MapReplyError";
    this.code = code;
    this.status = STATUS_BY_CODE[code];
  }
}

export function isMapReplyError(error: unknown): error is MapReplyError {
  return error instanceof MapReplyError;
}

export function mapReplyUserMessage(code: MapReplyErrorCode): string {
  return MESSAGE_BY_CODE[code];
}

export function mapReplyStatus(code: MapReplyErrorCode): number {
  return STATUS_BY_CODE[code];
}

/** Translate a transport failure into the route's own vocabulary. */
export function toMapReplyError(error: unknown): MapReplyError {
  if (isMapReplyError(error)) return error;
  if (isJevError(error)) {
    if (error.code === "JEV_TIMEOUT") return new MapReplyError("PROVIDER_TIMEOUT");
    if (error.code === "JEV_NOT_CONFIGURED") return new MapReplyError("PROVIDER_NOT_CONFIGURED");
    if (error.code === "JEV_BUDGET_EXCEEDED") return new MapReplyError("SPEND_LIMIT_REACHED");
    return new MapReplyError("PROVIDER_UNAVAILABLE");
  }
  if (error instanceof DOMException && error.name === "AbortError") {
    return new MapReplyError("PROVIDER_TIMEOUT");
  }
  if (error instanceof Error && error.name === "TimeoutError") {
    return new MapReplyError("PROVIDER_TIMEOUT");
  }
  return new MapReplyError("INTERNAL_ERROR");
}

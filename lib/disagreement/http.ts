import { NextResponse } from "next/server";
import { disagreementUserMessage, isDisagreementError } from "./errors";
import { sanitizeServerLog } from "@/lib/sanitizeServerLog";
import type { DisagreementErrorCode } from "@/types/disagreement";

export function disagreementJsonError(
  code: DisagreementErrorCode,
  requestId: string,
  status: number,
  extra?: Record<string, string>,
) {
  return NextResponse.json(
    {
      error: disagreementUserMessage(code),
      code,
      requestId,
      ...extra,
    },
    {
      status,
      headers: { "x-request-id": requestId },
    },
  );
}

export function handleDisagreementError(error: unknown, requestId: string) {
  if (isDisagreementError(error)) {
    return disagreementJsonError(error.code, requestId, error.status);
  }
  console.error("[argumend:disagreement]", {
    requestId,
    code: "INTERNAL_ERROR",
    message: sanitizeServerLog(error),
  });
  return disagreementJsonError("INTERNAL_ERROR", requestId, 500);
}

export function logDisagreementEvent(input: {
  requestId: string;
  code?: string;
  provider?: string;
  model?: string;
  promptVersion?: string;
  latencyMs?: number;
  characterCount?: number;
  droppedQuotes?: number;
}) {
  console.info("[argumend:disagreement]", input);
}

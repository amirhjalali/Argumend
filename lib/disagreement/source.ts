import { DISAGREEMENT_LIMITS } from "./constants";
import { DisagreementError } from "./errors";
import type { DisagreementContentType } from "@/types/disagreement";

const URL_ONLY = /^(https?:\/\/\S+)$/i;

export function normalizeSourceText(raw: string): string {
  return raw
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/\u0000/g, "")
    .replace(/[\u0001-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
}

export function countNonWhitespace(text: string): number {
  return text.replace(/\s+/g, "").length;
}

export function validateAnalyzeRequest(input: {
  content: unknown;
  contentType: unknown;
  requestId: string;
}): { content: string; contentType: DisagreementContentType } {
  const contentType = input.contentType ?? "freeform";
  if (
    contentType !== "conversation" &&
    contentType !== "article" &&
    contentType !== "freeform"
  ) {
    throw new DisagreementError("INVALID_REQUEST", input.requestId);
  }
  if (typeof input.content !== "string") {
    throw new DisagreementError("INVALID_REQUEST", input.requestId);
  }

  const content = normalizeSourceText(input.content);
  const trimmed = content.trim();
  if (URL_ONLY.test(trimmed)) {
    throw new DisagreementError("URL_INGESTION_NOT_AVAILABLE", input.requestId);
  }

  const visible = countNonWhitespace(content);
  if (visible < DISAGREEMENT_LIMITS.minSourceCharacters) {
    throw new DisagreementError("CONTENT_TOO_SHORT", input.requestId);
  }
  if (content.length > DISAGREEMENT_LIMITS.maxSourceCharacters) {
    throw new DisagreementError("CONTENT_TOO_LONG", input.requestId);
  }

  return { content, contentType };
}

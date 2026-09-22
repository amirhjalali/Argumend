/**
 * HTTP-shaped helpers for the map-reply route, kept out of the route file so
 * they can be unit tested. (A Next.js route module may only export handlers,
 * so anything worth asserting on directly has to live here.)
 */
import { NextResponse } from "next/server";
import { MAP_REPLY_LIMITS } from "./constants";
import type { MapReplyError } from "./errors";

/** RFC 4122, any version. Anything else is a client-supplied string, not an id. */
const REQUEST_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * An inbound `x-request-id` is only adopted when it is a well-formed UUID.
 * Otherwise it is a client-controlled string that would be reflected into the
 * response headers, the response body and the server log — three places worth
 * keeping free of whatever a caller feels like sending.
 */
export function resolveRequestId(inbound: string | null | undefined): string {
  const candidate = inbound?.trim();
  return candidate && REQUEST_ID.test(candidate) ? candidate : crypto.randomUUID();
}

/**
 * Whether a declared `Content-Length` is already past the point of reading.
 * Generous against the character limit, because JSON escaping and multi-byte
 * UTF-8 both inflate the wire size of a legitimate paste; an absent or
 * unparseable header simply defers to the character check after parsing.
 */
export function exceedsDeclaredBodySize(
  contentLength: string | null | undefined,
  limit: number = MAP_REPLY_LIMITS.maxRequestBytes,
): boolean {
  if (contentLength === null || contentLength === undefined) return false;
  const declared = Number(contentLength);
  if (!Number.isFinite(declared)) return false;
  return declared > limit;
}

/** Every error response: typed body, request id, and never cached. */
export function mapReplyJsonError(
  requestId: string,
  error: MapReplyError,
  extraHeaders?: Record<string, string>,
) {
  return NextResponse.json(
    { error: error.message, code: error.code, requestId },
    {
      status: error.status,
      headers: {
        "x-request-id": requestId,
        "Cache-Control": "no-store",
        ...extraHeaders,
      },
    },
  );
}

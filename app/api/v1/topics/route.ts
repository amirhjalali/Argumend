/**
 * GET /api/v1/topics — public, read-only list of analyzed topics.
 *
 * Returns lightweight summaries (from the static topic index, ~17KB) rather
 * than full topic graphs. No database is touched. Because the handler reads
 * query params it renders per-request, but responses are CDN-cached via the
 * Cache-Control header (keyed on the full URL, so each filter combination
 * caches independently).
 *
 * Query params:
 *   ?category=  policy|technology|science|economics|philosophy
 *   ?status=    settled|contested|highly_speculative
 *   ?limit=     integer 1..100 (default 50)
 *   ?offset=    non-negative integer (default 0)
 *
 * Malformed filters or pagination values return 400 with a typed error body.
 * Response: { count, total, limit, offset, topics: [...] }
 *   count = items in this page; total = items matching the filters.
 */

import type { NextRequest } from "next/server";
import { topicSummaries, type TopicSummary } from "@/data/topicIndex";
import { apiJson, corsPreflight, methodNotAllowed, SITE_URL } from "../_shared/http";
import {
  DEFAULT_TOPIC_LIMIT,
  DEPRECATED_TOPIC_FIELDS,
  TopicListQuerySchema,
  TopicListResponseSchema,
} from "./_schemas";
import { ApiErrorResponseSchema } from "../_schemas";

/** Public shape for a single topic in the list — summary fields + canonical url. */
function toApiTopic(t: TopicSummary) {
  return {
    id: t.id,
    title: t.title,
    meta_claim: t.meta_claim,
    category: t.category,
    status: t.status,
    balance: t.balance,
    weight: t.weight,
    verdict: t.verdict,
    // Deprecated compatibility alias. It is intentionally derived from the
    // canonical balance field rather than read as an independent score.
    confidence_score: t.balance,
    pillarCount: t.pillarCount,
    evidenceCount: t.evidenceCount,
    tags: t.tags,
    url: `${SITE_URL}/topics/${t.id}`,
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const parsedQuery = TopicListQuerySchema.safeParse({
    category: searchParams.get("category") ?? undefined,
    status: searchParams.get("status") ?? undefined,
    limit: searchParams.get("limit") ?? undefined,
    offset: searchParams.get("offset") ?? undefined,
  });

  if (!parsedQuery.success) {
    const error = ApiErrorResponseSchema.parse({
      error: "Invalid query parameters.",
      code: "INVALID_QUERY",
      issues: parsedQuery.error.issues.map((issue) => ({
        field: String(issue.path[0] ?? "query"),
        message: issue.message,
      })),
    });
    return apiJson(error, { status: 400, cache: false });
  }

  let results = topicSummaries;

  if (parsedQuery.data.category) {
    results = results.filter((t) => t.category === parsedQuery.data.category);
  }

  if (parsedQuery.data.status) {
    results = results.filter((t) => t.status === parsedQuery.data.status);
  }

  const total = results.length;

  const limit = parsedQuery.data.limit ?? DEFAULT_TOPIC_LIMIT;
  const offset = parsedQuery.data.offset ?? 0;

  const page = results.slice(offset, offset + limit);

  const response = TopicListResponseSchema.parse({
    count: page.length,
    total,
    limit,
    offset,
    topics: page.map(toApiTopic),
    deprecated_fields: DEPRECATED_TOPIC_FIELDS,
  });

  return apiJson(response);
}

export function OPTIONS() {
  return corsPreflight();
}

export const POST = methodNotAllowed;
export const PUT = methodNotAllowed;
export const PATCH = methodNotAllowed;
export const DELETE = methodNotAllowed;

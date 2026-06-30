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
 *   ?limit=     1..100 (default 50)
 *   ?offset=    >= 0   (default 0)
 *
 * Response: { count, total, limit, offset, topics: [...] }
 *   count = items in this page; total = items matching the filters.
 */

import type { NextRequest } from "next/server";
import { topicSummaries, type TopicSummary } from "@/data/topicIndex";
import { TopicCategorySchema, TopicStatusSchema } from "@/lib/schemas/topic";
import { apiJson, clampInt, corsPreflight, SITE_URL } from "../_shared/http";

const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 100;

/** Public shape for a single topic in the list — summary fields + canonical url. */
function toApiTopic(t: TopicSummary) {
  return {
    id: t.id,
    title: t.title,
    meta_claim: t.meta_claim,
    category: t.category,
    status: t.status,
    confidence_score: t.confidence_score,
    pillarCount: t.pillarCount,
    evidenceCount: t.evidenceCount,
    tags: t.tags,
    url: `${SITE_URL}/topics/${t.id}`,
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  let results = topicSummaries;

  // Optional category filter — reject unknown values with a helpful 400.
  const categoryParam = searchParams.get("category");
  if (categoryParam) {
    const parsed = TopicCategorySchema.safeParse(categoryParam);
    if (!parsed.success) {
      return apiJson(
        {
          error: `Invalid category "${categoryParam}". Expected one of: ${TopicCategorySchema.options.join(", ")}.`,
        },
        { status: 400, cache: false }
      );
    }
    results = results.filter((t) => t.category === parsed.data);
  }

  // Optional status filter.
  const statusParam = searchParams.get("status");
  if (statusParam) {
    const parsed = TopicStatusSchema.safeParse(statusParam);
    if (!parsed.success) {
      return apiJson(
        {
          error: `Invalid status "${statusParam}". Expected one of: ${TopicStatusSchema.options.join(", ")}.`,
        },
        { status: 400, cache: false }
      );
    }
    results = results.filter((t) => t.status === parsed.data);
  }

  const total = results.length;

  const limit = clampInt(searchParams.get("limit"), DEFAULT_LIMIT, 1, MAX_LIMIT);
  const offset = clampInt(
    searchParams.get("offset"),
    0,
    0,
    Number.MAX_SAFE_INTEGER
  );

  const page = results.slice(offset, offset + limit);

  return apiJson({
    count: page.length,
    total,
    limit,
    offset,
    topics: page.map(toApiTopic),
  });
}

export function OPTIONS() {
  return corsPreflight();
}

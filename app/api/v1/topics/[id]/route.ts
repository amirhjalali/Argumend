/**
 * GET /api/v1/topics/[id] — public, read-only full topic object.
 *
 * Returns the complete analysis (pillars, evidence, cruxes, references, …) for
 * a single topic from the static dataset. No database is touched. The known
 * topic ids are prerendered at build via generateStaticParams and revalidated
 * daily; unknown ids fall through to a JSON 404 (dynamicParams = true).
 *
 * Response: { topic: { ...Topic, url } } | 404 { error, url }
 */

import { loadTopicById } from "@/data/topicLoader";
import { topicSummaries } from "@/data/topicIndex";
import { apiJson, corsPreflight, methodNotAllowed, SITE_URL } from "../../_shared/http";
import {
  DEPRECATED_TOPIC_FIELDS,
  TopicIdParamSchema,
  TopicDetailResponseSchema,
} from "../_schemas";
import { ApiErrorResponseSchema } from "../../_schemas";

// Prerender from static data, refresh at most once a day.
export const revalidate = 86400;
export const dynamicParams = true;

/** Prerender every known topic id at build time (from the lightweight index). */
export function generateStaticParams() {
  return topicSummaries.map((t) => ({ id: t.id }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const parsedId = TopicIdParamSchema.safeParse(id);

  if (!parsedId.success) {
    const error = ApiErrorResponseSchema.parse({
      error: "Invalid topic id.",
      code: "INVALID_TOPIC_ID",
      issues: [{ field: "id", message: parsedId.error.issues[0].message }],
    });
    return apiJson(error, { status: 400, cache: false });
  }

  const topic = await loadTopicById(parsedId.data);

  if (!topic) {
    const error = ApiErrorResponseSchema.parse({
      error: `Topic "${parsedId.data}" not found.`,
      code: "TOPIC_NOT_FOUND",
      topics_url: `${SITE_URL}/api/v1/topics`,
    });
    return apiJson(error, { status: 404, cache: false });
  }

  const response = TopicDetailResponseSchema.parse({
    topic: {
      ...topic,
      // Deprecated compatibility alias; balance is the canonical value.
      confidence_score: topic.balance,
      url: `${SITE_URL}/topics/${topic.id}`,
    },
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

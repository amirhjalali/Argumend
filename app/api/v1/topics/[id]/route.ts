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

import { topics } from "@/data/topics";
import { topicSummaries } from "@/data/topicIndex";
import { apiJson, corsPreflight, SITE_URL } from "../../_shared/http";

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
  const topic = topics.find((t) => t.id === id);

  if (!topic) {
    return apiJson(
      {
        error: `Topic "${id}" not found.`,
        topics_url: `${SITE_URL}/api/v1/topics`,
      },
      { status: 404, cache: false }
    );
  }

  return apiJson({
    topic: { ...topic, url: `${SITE_URL}/topics/${topic.id}` },
  });
}

export function OPTIONS() {
  return corsPreflight();
}

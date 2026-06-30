/**
 * GET /api/v1 — self-describing index for the public Argumend API.
 *
 * A tiny static JSON document listing the available endpoints, their query
 * params, and example usage, so developers can discover the API by hitting
 * its root. No database, no request data — fully static, revalidated daily.
 */

import { TOPIC_COUNT } from "@/data/topicIndex";
import { TopicCategorySchema, TopicStatusSchema } from "@/lib/schemas/topic";
import { apiJson, corsPreflight, SITE_URL } from "./_shared/http";

export const revalidate = 86400;

export function GET() {
  return apiJson({
    name: "Argumend Public API",
    version: "1",
    description:
      "Read-only access to Argumend's analyzed debate topics — positions, evidence, cruxes, and confidence scores. Free, no API key, CORS-enabled.",
    documentation: `${SITE_URL}/about`,
    topic_count: TOPIC_COUNT,
    base_url: `${SITE_URL}/api/v1`,
    endpoints: [
      {
        method: "GET",
        path: "/api/v1/topics",
        description: "List topic summaries.",
        query: {
          category: TopicCategorySchema.options,
          status: TopicStatusSchema.options,
          limit: "1–100 (default 50)",
          offset: ">= 0 (default 0)",
        },
        example: `${SITE_URL}/api/v1/topics?category=science&limit=10`,
      },
      {
        method: "GET",
        path: "/api/v1/topics/{id}",
        description: "Fetch the full analysis for a single topic by id.",
        example: `${SITE_URL}/api/v1/topics/nuclear-energy-safety`,
      },
    ],
    license:
      "Topic content is provided for non-commercial and editorial use; please attribute argumend.org.",
  });
}

export function OPTIONS() {
  return corsPreflight();
}

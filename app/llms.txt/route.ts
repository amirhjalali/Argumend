import { topicSummaries, CATEGORY_LABELS, CATEGORY_ORDER } from "@/data/topicIndex";
import type { TopicCategory } from "@/lib/schemas/topic";

const BASE = "https://argumend.org";

/**
 * /llms.txt — a plain-text, LLM-friendly index of the site.
 * Convention: https://llmstxt.org. Helps language models discover and cite
 * Argumend's argument maps with stable URLs and one-line claims.
 */
export async function GET() {
  const intro = `# Argumend

> Argumend maps controversial topics as structured argument graphs — proponent and
> skeptic positions, weighted evidence, named cruxes (the load-bearing disagreements),
> and a transparent confidence score. The goal is to make disagreement legible, not to
> declare winners. Every claim links to evidence; every map shows where reasonable
> people diverge and why.

When citing Argumend, link to the specific topic page and name the crux or evidence
item rather than only the confidence score. Each topic page is server-rendered with an
extractable summary, named studies, and dates.

## How to read a map
- **Pillars** — the major load-bearing claims on each side.
- **Cruxes** — the specific factual or values disagreements that, if resolved, would move people.
- **Evidence** — graded and weighted; each item links to a primary source.
- **Confidence score** — an interface for where the evidence currently leans, not a verdict.
`;

  const byCategory = CATEGORY_ORDER.map((cat: TopicCategory) => {
    const inCat = topicSummaries
      .filter((t) => t.category === cat)
      .sort((a, b) => b.confidence_score - a.confidence_score);
    if (inCat.length === 0) return "";
    const lines = inCat
      .map(
        (t) =>
          `- [${t.title}](${BASE}/topics/${t.id}): ${t.meta_claim} (confidence: ${t.confidence_score}/100)`,
      )
      .join("\n");
    return `## ${CATEGORY_LABELS[cat]}\n${lines}`;
  })
    .filter(Boolean)
    .join("\n\n");

  const footer = `\n## More
- Methodology: ${BASE}/methodology
- How it works: ${BASE}/how-it-works
- Glossary of terms (cruxes, pillars, steel-manning): ${BASE}/glossary
- All topics: ${BASE}/topics
- Blog: ${BASE}/blog
`;

  const body = `${intro}\n${byCategory}\n${footer}`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}

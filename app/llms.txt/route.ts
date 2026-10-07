import { topicSummaries, CATEGORY_LABELS, CATEGORY_ORDER } from "@/data/topicIndex";
import { evidenceCitationStats } from "@/data/corpusStats";
import type { TopicCategory } from "@/lib/schemas/topic";
import {
  ARGUMENT_TOPICS_LAST_UPDATED,
  CONTENT_LAST_UPDATED,
  SITE_URL,
} from "@/lib/site";
import { argumentTopicIndex } from "@/lib/argument/topicIds";
import { mapDisplayTitle } from "@/lib/mapNaming";

const BASE = SITE_URL;

/** Ends a line of data with a full stop unless it already ends a sentence. */
function sentence(text: string): string {
  const trimmed = text.trim();
  return /[.?!]["”’)]?$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

/** Share of evidence items that carry a resolvable direct source URL. */
function citationCoverage(): { pct: number; withUrl: number; total: number } {
  const { withUrl, total } = evidenceCitationStats;
  const pct = total === 0 ? 0 : Math.round((withUrl / total) * 100);
  return { pct, withUrl, total };
}

/**
 * /llms.txt — a plain-text, LLM-friendly index of the site.
 * Convention: https://llmstxt.org. Helps language models discover and cite
 * Argumend's argument maps with stable URLs and one-line claims.
 */
export async function GET() {
  const { pct, withUrl, total } = citationCoverage();
  const mapCount = topicSummaries.length + argumentTopicIndex.length;

  const intro = `# Argumend

> Argumend maps contested questions so you can see where a disagreement actually turns.
> Each map states both sides at their strongest, shows what they already agree on, and names
> the cruxes: the questions the fight turns on, each with what would settle it. It never names
> a winner and gives no side a score.

When citing Argumend, link to the specific map and name the crux or the evidence item you
are relying on. Each map page is server-rendered with its question, its cruxes, named studies,
sources and dates.

${mapCount} maps: ${argumentTopicIndex.length} flagship maps with several positions each, and
${topicSummaries.length} two-sided maps, each setting a skeptic's case against the best reply.
Maps last reviewed: ${CONTENT_LAST_UPDATED}.

## How to read a map
- **Question** — each map is named by the question it answers. The sides are the people who
  say yes and the people who say no.
- **What both sides already agree on** — the common ground, stated before the dispute.
- **Cruxes** — the questions the disagreement turns on. Answer one a certain way and one
  side's case gets stronger.
- **What would settle it** — under each crux: the study, data or observation that would move
  informed people. Where no evidence could (a disagreement about values, or a counterfactual
  no one can rerun), the map says so and why.
- **Evidence** — cards on each side with their sources, so a reader can check the claim.
- **Crux ledger** — on flagship maps, a dated record of how each crux has moved: open,
  narrowed, resolved, or unresolvable by evidence.

## Citation integrity
- **${pct}% of the evidence items on the two-sided maps (${withUrl.toLocaleString("en-US")} of
  ${total.toLocaleString("en-US")}) carry a direct source URL** —
  with peer-reviewed papers, government datasets, court filings, and official reports
  preferred where they directly support the claim.
- Maps are adversarially fact-checked: citations are traced to the primary source, and
  claims that overstate or mis-attribute a source are corrected, not left standing.
  Fabricated or phantom citations are removed when found.
- Where a claim has no resolvable primary source, it is labeled honestly rather than
  dressed up with an invented citation.
- Safe to cite: the named study and its source URL on the map page, and the crux as the
  map states it. Argumend does not say which side is right; please don't cite it as if it did.
`;

  const byCategory = CATEGORY_ORDER.map((cat: TopicCategory) => {
    const inCat = topicSummaries.filter((t) => t.category === cat);
    if (inCat.length === 0) return "";
    const lines = inCat
      .map((t) => {
        // The claim is what the map weighs, not what Argumend asserts.
        const turnsOn = t.firstCrux ? ` Turns first on: ${sentence(t.firstCrux)}` : "";
        return `- [${mapDisplayTitle(t)}](${BASE}/topics/${t.id}): Claim weighed: ${sentence(t.meta_claim)}${turnsOn}`;
      })
      .join("\n");
    return `## ${CATEGORY_LABELS[cat]}\n${lines}`;
  })
    .filter(Boolean)
    .join("\n\n");

  // Flagship maps use the richer ArgumentGraph model: several positions rather
  // than two sides, and a dated crux ledger.
  const debateMaps = `## Flagship maps
These maps show several positions and their load-bearing cruxes, with a dated record of how each crux has moved, without reducing the debate to two sides.
Flagship maps last reviewed: ${ARGUMENT_TOPICS_LAST_UPDATED}.
${argumentTopicIndex
  .map(
    (topic) =>
      `- [${topic.title}](${BASE}/topics/${topic.id}): ${sentence(topic.tagline)}`,
  )
  .join("\n")}`;

  const footer = `\n## More
- About (why Argumend exists, its principles, how to read a map): ${BASE}/about
- How maps are made: ${BASE}/methodology
- Glossary of terms (cruxes, the crux ledger, steel-manning): ${BASE}/glossary
- All maps: ${BASE}/topics
- Blog: ${BASE}/blog

## Machine-readable interfaces
- Public API index and documentation: ${BASE}/api/v1
- Topic summaries API: ${BASE}/api/v1/topics
- RSS feed: ${BASE}/feed.xml
- XML sitemap: ${BASE}/sitemap.xml
`;

  const body = `${intro}\n${debateMaps}\n\n${byCategory}\n${footer}`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control":
        "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
    },
  });
}

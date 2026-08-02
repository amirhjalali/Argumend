import { topicSummaries, CATEGORY_LABELS, CATEGORY_ORDER } from "@/data/topicIndex";
import { evidenceCitationStats } from "@/data/corpusStats";
import type { TopicCategory } from "@/lib/schemas/topic";
import { CONTENT_LAST_UPDATED, SITE_URL } from "@/lib/site";

const BASE = SITE_URL;

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

  const intro = `# Argumend

> Argumend maps controversial topics as structured argument graphs — proponent and
> skeptic positions, weighted evidence, named cruxes (the load-bearing disagreements),
> and transparent balance and weight scores. The goal is to make disagreement legible, not to
> declare winners. Claims connect to evidence where available; every map shows where reasonable
> people diverge and why.

When citing Argumend, link to the specific topic page and name the crux or evidence
item rather than only its aggregate scores. Each topic page is server-rendered with an
extractable summary, named studies, and dates.

Corpus last reviewed: ${CONTENT_LAST_UPDATED}.

## How to read a map
- **Pillars** — the major load-bearing claims on each side.
- **Cruxes** — the specific factual or values disagreements that, if resolved, would move people.
- **Evidence** — graded and weighted; source links are provided where resolvable.
- **Balance** — which side the weighted evidence favors: 50 is even, above 50 favors the claim, and below 50 favors the counterclaim.
- **Weight** — how much evidence bears on the question, combining evidential mass, source quality, and crux resolvability.
- **Verdict** — a two-axis label derived from balance and weight; a strong lean with little evidence remains an open question.

## Citation integrity
- **${pct}% of evidence items (${withUrl}/${total}) carry a direct source URL** —
  with peer-reviewed papers, government datasets, court filings, and official reports
  preferred where they directly support the claim.
- Maps are adversarially fact-checked: citations are traced to the primary source, and
  claims that overstate or mis-attribute a source are corrected or down-weighted, not
  left standing. Fabricated or phantom citations are removed when found.
- Where a claim has no resolvable primary source, it is labeled honestly and given low
  evidence weight rather than dressed up with an invented citation.
- Each evidence item's \`weight\` is graded on four axes (source reliability, independence,
  replicability, directness), so an LLM can prefer the best-supported claims.
- Safe to cite: prefer the named study and its source URL on the topic page over the
  aggregate balance or verdict alone.
`;

  const byCategory = CATEGORY_ORDER.map((cat: TopicCategory) => {
    const inCat = topicSummaries
      .filter((t) => t.category === cat)
      .sort((a, b) => b.weight - a.weight);
    if (inCat.length === 0) return "";
    const lines = inCat
      .map(
        (t) =>
          `- [${t.title}](${BASE}/topics/${t.id}): ${t.meta_claim} (balance: ${t.balance}/100; weight: ${t.weight}/100; verdict: ${t.verdict.label})`,
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

## Machine-readable interfaces
- Public API index and documentation: ${BASE}/api/v1
- Topic summaries API: ${BASE}/api/v1/topics
- RSS feed: ${BASE}/feed.xml
- XML sitemap: ${BASE}/sitemap.xml
`;

  const body = `${intro}\n${byCategory}\n${footer}`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control":
        "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
    },
  });
}

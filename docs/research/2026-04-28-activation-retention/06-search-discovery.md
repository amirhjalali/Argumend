# Search and Discovery Within Argumend

**Date:** 2026-04-28
**Analyst:** Research agent 06/10, activation-retention swarm
**Scope:** Search bar, filters, related-topics, algorithmic feed, programmatic SEO landing pages, navigation taxonomy

## 1. Current discovery audit

Argumend already has more discovery surfaces than I expected — the question is whether they form a system or a pile.

**The two listing pages.** There are two near-identical topic indexes:
- `/explore` (`app/explore/page.tsx:84-481`) — header, stats bar (109 topics, 5 categories, ~700 evidence items), category pill row, status pill row (`settled` / `contested` / `highly_speculative`), debounced search input (300ms; `app/explore/page.tsx:94-100`), sort dropdown (`Most Evidence`, `Highest Confidence`, `Lowest Confidence`, `A-Z`; `app/explore/page.tsx:63-68`), 3-column responsive grid of topic cards.
- `/topics` (`app/topics/page.tsx`) — same data source (`topicSummaries` from `data/topicIndex.ts`), category filter, search filter, four sort options including `By category`. Branded as the "topics index"; the sidebar links it as "Explore Topics" (`components/Sidebar.tsx:39`) and links `/explore` as "Explore Map" (`components/Sidebar.tsx:41`). **They are functionally redundant.** Casual users land on whichever the nav points them at and have no way to know they're seeing the same dataset twice.

**The Cmd-K modal.** `components/SearchModal.tsx` is the strongest discovery surface on the site. It indexes topics, blog articles, concepts, and 10 hard-coded static pages (`SearchModal.tsx:48-119`); searches title + meta_claim + tags via plain `String.includes()` on tokenized lowercase terms (`SearchModal.tsx:137-141`); groups results by type (`SearchModal.tsx:277-289`); supports keyboard navigation, focus trap, and a global `Cmd-K` listener (`components/TopBar.tsx:25-33`). When the input is empty it shows five hard-coded "Popular Topics" (`SearchModal.tsx:125-131`).

**The topic detail discovery rail.** Each `/topics/[id]` page — `app/topics/[id]/TopicDetailView.tsx` and `TopicPageClient.tsx` — surfaces (a) same-category related topics and (b) cross-category related topics derived from `CROSS_CATEGORY_CLUSTERS` in `data/topics.ts:446-584`. This is **86 hand-curated edges** between ~70 of the 109 topics (each entry maps a topic ID to 3-4 thematic cousins). The other ~40 topics have no cluster entry and rely on the same-category fallback.

**Programmatic SEO surfaces already shipped.** Argumend has more programmatic SEO than its size warrants — this is one of the genuine bright spots:
- `/topics/compare/[id1]/vs/[id2]` — 20 hard-coded comparison pairs in `app/topics/compare/comparisonPairs.ts:1-25`. Statically generated, in the sitemap.
- `/questions/[slug]` — hand-crafted question variations like "Is nuclear energy safe?" mapped to topic IDs (`lib/questions.ts:30-...`, 530 lines, 2-3 question variations per topic). Listed in `app/sitemap.ts:115-126`.
- `/is/[slug]` — "Is [claim] true?" pages (`data/is-claims.ts`, 88 lines). Sitemap-included.
- `/glossary`, `/concepts/[slug]`, `/blog/category/[name]`, `/blog/tag/[slug]` — all in the sitemap (`app/sitemap.ts:138-278`).

**What does not exist.**
- No `/topics/category/[name]` landing pages — categories are filter pills, not standalone URLs. Google can't index "policy debates on Argumend" as a discrete page.
- No `/topics/by-status/[status]` (settled/contested/speculative).
- No `/topics/with-fallacy/[fallacy]` — Argumend's most distinctive signal versus Kialo, completely uncrawlable.
- No `/topics/by-judge-verdict/[verdict]` — even though the multi-model judge council is in the data model.
- No tag system at all (see §2).
- No "trending" or "recently added" feed anywhere on the site.
- No "for you" personalization.
- No saved-search / search-alert primitive.

**Headline finding:** discovery is *organized around the existing 109 topics* but not around the *user's question*. Someone landing on `/explore` with "I want to know what to think about AI safety" sees a grid sorted by evidence count, with no signal that ai-risk, ai-superintelligence-timeline, ai-deepfakes-truth-collapse, ai-content-labeling, ai-job-displacement, ai-regulation, ai-replacing-doctors, eacc-vs-tech-regulation, and consciousness-ai-systems are all shards of the same conversation.

## 2. Topic taxonomy audit

The topic schema lives in `lib/schemas/topic.ts:125-138`:

```ts
export const TopicSchema = z.object({
  id: z.string(),
  title: z.string(),
  meta_claim: z.string(),
  confidence_score: z.number().min(0).max(100),
  status: TopicStatusSchema,        // settled | contested | highly_speculative
  category: TopicCategorySchema,    // policy | technology | science | economics | philosophy
  pillars: z.array(PillarSchema),
  evidence: z.array(EvidenceSchema).optional(),
  imageUrl: z.string().url().optional(),
  references: z.array(ReferenceSchema).optional(),
  questions: z.array(QuestionSchema).optional(),
});
```

What's actually populated and useful for discovery:

| Field | Populated | Discovery utility |
|---|---|---|
| `id` | 109/109 | URL slug, primary key |
| `title` | 109/109 | Search index, card heading |
| `meta_claim` | 109/109 | Full-text search, snippet |
| `confidence_score` | 109/109 | Sort, filter, faceted browse |
| `status` | 109/109 | Filter pill (3 values) |
| `category` | 109/109 | Filter pill (5 values — too few) |
| `pillars[].title`, `.short_summary` | yes | Not currently indexed for search |
| `pillars[].evidence[].title/description` | yes | Not currently indexed for search |
| `pillars[].crux.title` | yes | Crucial signal, not indexed |
| `imageUrl` | sparse | Card thumbnail |
| `questions` | partial via `lib/questions.ts` | Programmatic SEO |
| `references` | partial | Could power "topics citing X" |

**What's missing — and missing badly enough that adding it should precede any search rebuild:**

1. **No tags.** There is no `tags: string[]` field. Categories are five enums. A topic like `gun-control-effectiveness` is `category: "policy"` and that's it. The cross-category clusters in `data/topics.ts:446-584` are a *workaround for the missing tag system* — somebody hand-coded "criminal justice cluster," "energy & environment cluster," "AI governance cluster" as adjacency lists because there was no tag taxonomy to generate them. Add `tags: z.array(z.string())` to `TopicSchema` and the entire CROSS_CATEGORY_CLUSTERS object becomes a `WHERE 'criminal-justice' = ANY(tags)` query.
2. **No fallacies field at the topic level.** Fallacies are visualized in `RichNode` rendering but there is no top-level `topic.fallaciesPresent: string[]` for filtering.
3. **No judge verdict.** The multi-model judging system (`lib/judge/`) produces verdicts but they aren't denormalized into the topic. There is no `topic.judgeConsensus: "for" | "against" | "split" | "uncertain"` to filter on.
4. **No `addedAt` / `updatedAt` timestamp.** The sitemap fakes dates with `topicBaseDate.getTime() + index * 24*60*60*1000` (`app/sitemap.ts:73-82`). There is no real "recently added" sort because the data has no timeline.
5. **No `viewCount` / `engagementScore` / `controversyScore`.** Analytics live in Plausible/PostHog (probably) but nothing flows back into the topic record. No "trending" surface possible.
6. **No keywords / aliases.** "Climate change" topic has no alias for "global warming." Search queries that don't lexically match the title fail.

**Recommended schema additions** (additive, non-breaking):

```ts
tags: z.array(z.string()).default([]),           // ["criminal-justice", "us", "2026"]
fallaciesPresent: z.array(z.string()).default([]),
judgeConsensus: z.enum(["for", "against", "split", "uncertain"]).optional(),
addedAt: z.string().datetime(),
updatedAt: z.string().datetime(),
aliases: z.array(z.string()).default([]),       // "global warming" -> "climate-change"
viewCount: z.number().default(0),                // denormalized from analytics
controversyIndex: z.number().min(0).max(1).optional(), // |confidence - 50| inverted
```

These six fields unlock §4-§7 below.

## 3. Search-bar implementation options

For 109-300 topics, indexing the title + meta_claim + every pillar's title and short_summary + every evidence item's title produces roughly **2,000-4,000 short documents at well under 5MB raw text**. That's the regime where client-side fuzzy search dominates.

**(a) Client-side fuzzy search — recommend for now.** Three serious contenders in 2026:

- **Fuse.js** — the default; tiny (≈9KB gzipped), excellent typo tolerance, but its O(n·m) Bitap algorithm slows past ~5000 documents ([byby.dev](https://byby.dev/js-search-libraries), [Fuse.js benchmarking](https://dev.to/koushikmaratha/a-deep-dive-into-fusejs-advanced-use-cases-and-benchmarking-357p)).
- **MiniSearch** — inverted-index full-text search with prefix/fuzzy matching; faster than Fuse on >1k docs, ~6KB gzipped, supports field weights and BM25-ish scoring ([Luca Ongaro — MiniSearch](https://lucaongaro.eu/blog/2019/01/30/minisearch-client-side-fulltext-search-engine.html)).
- **Orama** / **FlexSearch** — both faster ceilings; FlexSearch has the highest raw throughput; Orama adds vector search and a hosted tier ([pkgpulse: Fuse vs FlexSearch vs Orama 2026](https://www.pkgpulse.com/blog/fusejs-vs-flexsearch-vs-orama-client-side-search-2026)).

**Recommended: MiniSearch.** Inverted index gives correct relevance ranking out of the box, and the SearchModal already does substring matching badly — a real ranked search replaces it without rewriting the UI. Skeleton:

```ts
// lib/search/index.ts
import MiniSearch from "minisearch";
import { topics } from "@/data/topics";

const docs = topics.flatMap((t) => [
  {
    id: t.id,
    type: "topic",
    title: t.title,
    metaClaim: t.meta_claim,
    pillars: t.pillars.map((p) => `${p.title} ${p.short_summary}`).join(" "),
    cruxes: t.pillars.map((p) => p.crux.title).join(" "),
    category: t.category,
    status: t.status,
    href: `/topics/${t.id}`,
  },
]);

export const miniSearch = new MiniSearch({
  fields: ["title", "metaClaim", "pillars", "cruxes", "category"],
  storeFields: ["title", "metaClaim", "category", "status", "href"],
  searchOptions: {
    boost: { title: 3, cruxes: 2, metaClaim: 1.5, pillars: 1, category: 0.5 },
    prefix: true,
    fuzzy: 0.2,
  },
});

docs.forEach((d) => miniSearch.add(d));
```

This is a one-day build that improves on `SearchModal.tsx:137-141`'s `String.includes()` immediately. The full topics import is ~500KB but only the server route or a lazy-loaded chunk needs it; for the modal, build a smaller "search index" JSON at build time (similar to `data/topicSummaries.json`) including pillar/crux text — call it `data/searchIndex.json`. Estimated 80-150KB gzipped.

**(b) Postgres full-text search via Drizzle — plan for ~500 topics.** When the dataset crosses ~500 topics or starts including UGC analyses, push to Postgres `tsvector` with a GIN index:

```sql
ALTER TABLE topics ADD COLUMN search_tsv tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', title), 'A') ||
    setweight(to_tsvector('english', meta_claim), 'B') ||
    setweight(to_tsvector('english', pillars_text), 'C')
  ) STORED;
CREATE INDEX topics_search_idx ON topics USING GIN (search_tsv);
```

Drizzle has no first-class tsvector helper but raw SQL via `sql\`\`` works fine. The cutover is invisible to the modal — same query interface, same result shape. Until Argumend has UGC or >500 topics, **doing this is premature.**

**(c) Hosted (Algolia / Typesense / Meilisearch).** Skip for now. $20-100/mo for search-as-a-service is a poor trade against the zero-cost client-side option at this scale, and it adds a third datastore to keep in sync.

**(d) Vector search (pgvector + embeddings).** Only adds value once you want **semantic** search ("debates about whether AI is dangerous" matches `ai-risk` even though the title doesn't contain those words) or related-topic suggestions (§5). 2026 benchmarks show pgvector with pgvectorscale hitting 471 QPS at 99% recall on 50M vectors, 28x lower p95 latency than Pinecone's storage tier ([Tiger Data: pgvector vs Pinecone](https://www.tigerdata.com/blog/pgvector-vs-pinecone), [Geetopadesha: Vector Search 2026](https://geetopadesha.com/vector-search-in-2026-pinecone-vs-supabase-pgvector-performance-test/)). At 109 topics the cost of OpenAI text-embedding-3-small is **~$0.02 one-time**. The infra is already in place — Argumend uses Postgres via Drizzle.

**Hybrid recommendation:** ship MiniSearch now (lexical), add pgvector embeddings for related-topic suggestions in §5, and only later combine both with Reciprocal Rank Fusion — the documented 2026 pattern that lifts retrieval precision from ~62% pure-vector to ~84% hybrid ([dev.to: Hybrid Search RAG with pgvector + tsvector](https://dev.to/lpossamai/building-hybrid-search-for-rag-combining-pgvector-and-full-text-search-with-reciprocal-rank-fusion-6nk)).

## 4. Filter / facet patterns

Existing filters: category (5), status (3), sort (4 options). Already on `/explore` and `/topics`. The schema additions in §2 unlock the rest.

**Facets that should exist, ordered by signal-per-effort:**

1. **Tags** (after the tag field is added). Multi-select OR within tag, AND across facets. `tags: ["ai", "regulation"]` matches topics tagged with either AI or regulation.
2. **Judge verdict** — `consensus-for | consensus-against | split | uncertain`. This is the most distinctive Argumend signal Kialo doesn't have; surfacing it is free differentiation.
3. **Confidence range** slider — 0-100, dual handle. "Show me debates the evidence has resolved (>80%)" vs "Show me genuinely open questions (40-60%)."
4. **Evidence count** — minimum 4, 8, 16. Filters out under-developed topics.
5. **Fallacy presence** — multi-select from a fixed taxonomy (ad hominem, straw man, appeal to authority, etc.). Differentiator vs Kialo, hooks into education.
6. **Date added** — last 7/30/90 days. Requires `addedAt`.

**UX sketch.** Replace the current pill rows on `/explore` with a left sidebar (desktop) / bottom sheet (mobile) faceted browser. Anchor the count next to each facet value. Clicking a facet updates the URL query string (`?tags=ai,regulation&verdict=split&confidence=40-60`) so the state is shareable and SEO-routable. This is the same pattern Algolia's React InstantSearch uses; the [stereobooster/facets](https://github.com/stereobooster/facets) library is a 5KB primitive that does exactly this for client-side data.

```
+--------------------+ +-----------------------------+
| Categories         | | 47 topics matching          |
| □ Policy (38)      | | [Sort: Most evidence ▼]     |
| □ Technology (24)  | |                             |
| □ Science (15)     | | [topic card] [topic card]   |
|                    | | [topic card] [topic card]   |
| Verdict            | |                             |
| □ Consensus for    | |                             |
| □ Consensus against| |                             |
| □ Split (32)       | |                             |
| □ Uncertain (12)   | |                             |
|                    | |                             |
| Confidence         | |                             |
| [====|====] 30-70  | |                             |
|                    | |                             |
| Tags               | |                             |
| □ ai (9)           | |                             |
| □ criminal-justice | |                             |
| □ ...              | |                             |
+--------------------+ +-----------------------------+
```

## 5. Related-topics suggestions

Today: `CROSS_CATEGORY_CLUSTERS` (`data/topics.ts:446-584`) is option (a) — manual editorial linking. It's **good while it lasts** and bad in the limit:
- 86 entries cover ~70/109 topics. New topics ship without related-topic edges until somebody hand-edits the cluster map.
- Every batch of 10 new topics from cycle-2 adds a manual maintenance task.
- Edges are unidirectional in the data — `data/topics.ts:592-602` walks one way, the inverse needs a separate pass.

**Options:**

| Option | Quality | Cost | Scales? |
|---|---|---|---|
| (a) Manual editorial | High when fresh | Author-time per topic | No — breaks at 200+ |
| (b) Tag-overlap | Mediocre | Free if tags exist | Yes |
| (c) Embedding similarity (pgvector) | Good | ~$0.02 one-time + ~$1/mo storage | Yes to ~1M docs |
| (d) Co-view collaborative filtering | Best | Requires real traffic | Eventually yes |

**Recommend (c) pgvector embeddings now.** Concrete plan:

1. For each topic, build a representation string: `${title}\n${meta_claim}\n${pillars.map(p => p.title + " " + p.short_summary).join("\n")}`.
2. Generate `text-embedding-3-small` (1536-dim) embeddings — 109 topics × ~$0.0001 each = $0.01 one-time. Cache as `topic.embedding` in the DB or as a JSON file.
3. Store in a `topics.embedding vector(1536)` column with a `CREATE INDEX ... USING hnsw (embedding vector_cosine_ops)` index.
4. On the topic detail page, query `SELECT id, title FROM topics WHERE id != $current ORDER BY embedding <=> $currentEmbedding LIMIT 6`.
5. Fall back to `CROSS_CATEGORY_CLUSTERS` for the few human-curated picks an editor wants pinned.

This handles the 40 topics that have no cluster entry today, scales to 500-1000 topics for free, and **runs offline-mode safe** if the embeddings live in the same JSON-on-disk pattern Argumend already uses for `data/topicSummaries.json`. Once traffic is real, switch on (d) co-view CF as a re-ranker over (c)'s candidates.

## 6. Algorithmic feed / homepage curation

Today: the homepage hero shows a single hard-coded `featuredTopicId = "gun-control-effectiveness"` (`data/topicIndex.ts:56`) plus a manually-written `featuredReason` string (`data/topicIndex.ts:59-60`). The recent commits `641403d` and `545ba76` rewired the homepage to a `FeaturedTopicHero` + topic grid. There's a `TrendingTopics` component (`components/TrendingTopics.tsx`) imported into the sidebar — but it pulls from `topicSummaries`, which has no view data, so "trending" is whatever sort the component picks.

**Graduated rollout, by traffic level:**

1. **Now (no-traffic baseline) — Editor's picks + diversity.**
   Manual `featuredTopicId` rotates **weekly via cron** (already half-built — the comment at `data/topicIndex.ts:55` says "Rotate this ID weekly"). Below the hero, show 9 cards: 3 highest-confidence, 3 most-contested (|confidence - 50| smallest), 3 newest. Three different "moods" so a returning user always sees something different from yesterday's grid.
2. **At ~5K MAU — Trending (real).** Once Plausible/PostHog/GA4 events flow back to the DB (write a nightly cron that populates `topics.viewCount` and `topics.viewVelocity`), surface a "This week" rail with topics ranked by `view_velocity = views_last_7d / max(1, views_prev_7d)`. The Hacker News ranking formula `(upvotes - 1) / (age_hours + 2)^1.8` translated to views is a known good baseline.
3. **At ~50K MAU + auth adoption — "For you."** Once a user has `saved_topics`/`topic_views` history (tables already exist per CLAUDE.md), recommend by user-embedding mean × topic-embedding cosine. Cold-start fallback: editor's picks.

**Anti-pattern to avoid:** showing the same hero topic to every visitor for weeks (current state). Returning users see the same homepage and bounce. Even **deterministic per-day rotation** (`featuredTopicId = topics[hash(date) % topics.length]`) is better than static, costs nothing, and makes daily revisits feel productive.

## 7. Programmatic SEO landing pages

Argumend has more programmatic SEO than its current size warrants — the question is which next pages are worth the effort.

**Effort vs upside:**

| Pattern | Pages produced | Effort | SEO upside |
|---|---|---|---|
| `/topics/category/[name]` | 5 | XS — already have data | Med (low-volume queries, "policy debates") |
| `/topics/by-status/[status]` | 3 | XS | Low ("settled debates" is not a real query) |
| `/topics/with-fallacy/[fallacy-name]` | 10-20 | S after fallacy field | **High** — long tail "examples of straw man fallacy" is a known SEO gold mine |
| `/topics/by-judge-verdict/[verdict]` | 4 | S after `judgeConsensus` field | Med — ranks for "AI consensus" type queries |
| `/topics/tag/[tag]` | 30-80 | M after tag field | **High** — this is the biggest single SEO unlock |
| `/compare/[a]/vs/[b]` | 109×109 / 2 = ~5,900 max, 20 today | M | **High** but Google scaled-content-abuse risk if templated naively |
| `/is/[slug]` | 88 today, expandable | S | High — "Is X true" matches voice search patterns |
| `/questions/[slug]` | hundreds | M, partly built | High — already in sitemap |

**The fallacy hub is the highest-leverage missing piece.** Search "examples of ad hominem" — the SERP is clogged with thin Wikipedia-tier articles. A page at `/fallacies/ad-hominem` listing **every Argumend topic where this fallacy was detected, with the actual quote and the topic context** is uniquely defensible content because (a) Argumend's fallacy detection is automated and per-topic, (b) the linked topic provides genuine editorial context, satisfying Google's March 2024 scaled-content-abuse helpfulness criterion ([Metaflow: Programmatic SEO 2026](https://metaflow.life/blog/what-is-programmatic-seo)), and (c) competitors physically can't produce these pages without copying Argumend's analysis.

**Programmatic comparison pages.** Today's 20 hand-picked pairs (`comparisonPairs.ts`) are good. Going from 20 to 200 by auto-generating "natural" pairs (top-N most-related per topic via embedding similarity) is straightforward but **must include unique editorial framing** per Google's 2026 enforcement on scaled-content abuse: each comparison page needs a generated-but-not-templated narrative paragraph explaining what makes the pair interesting. Otherwise Google deindexes the lot. The 2026 threshold from the search results is "data-driven generation + genuine editorial enrichment" ([Zumeirah: Programmatic SEO 2026](https://zumeirah.com/programmatic-seo-in-2026/), [Metaflow](https://metaflow.life/blog/what-is-programmatic-seo)). Zapier's 800K landing pages do this; thin programmatic clones don't rank.

**Recommend, in order:**
1. `/topics/category/[slug]` — five pages, one afternoon, immediate sitemap win.
2. `/topics/tag/[slug]` — depends on tag field; ship after schema migration.
3. `/fallacies/[slug]` — flagship programmatic hub; depends on `fallaciesPresent` field and a fallacy taxonomy (~20 entries). Differentiated content vs every existing fallacy explainer.
4. Expand `/compare/[a]/vs/[b]` from 20 to 100-200 with embedding-driven pair selection + unique LLM-generated framing paragraphs (cached and editor-reviewed).

## 8. Navigation IA

Today's primary nav (`components/Sidebar.tsx:33-43`) is **already too crowded** — 9 PRIMARY_NAV entries plus an 11-entry collapsible LEARN_NAV. The TopBar (`components/TopBar.tsx`) carries Analyze, How It Works, Search, Contribute. Total surface: ~22 destinations.

The redundancy in the nav itself — "Explore Topics" (`/topics`) and "Explore Map" (`/explore`) as separate entries — is a tell that the IA was layered on without a hard call about which page is canonical.

**Recommended redesign, do it now:**

```
TopBar (right):    [Analyze] [Search ⌘K] [Sign in]
Sidebar primary:
  Home
  Topics ▼          (collapses to: All, By category, By verdict, By tag, Compare)
  Analyze text
  Dashboard         (only if signed in)
Sidebar secondary (collapsed by default):
  Learn ▼           (Blog, Guides, Concepts, Glossary, Methodology, How it works)
  Community ▼       (Educators, Research, Library, Lessons from the deep)
  About
```

Net: **4 visible primary entries instead of 9**, every "type of thing" (category / verdict / tag / comparison) lives under Topics where users expect it, the rest is collapsed but discoverable. Kialo's nav is similarly tight (Browse / About / Login / Sign Up) — visible navigation real estate is too valuable to spend on links a first-time user doesn't need.

**When does it crack?** At ~300 topics, the "Topics" submenu needs progressive disclosure (a "Browse" link to a richer index page). At ~500, the navigation can't ship every category as a top-level link; every IA dollar goes into search and recommendation instead.

## 9. Search analytics — the no-results-funnel

Every search query that returns zero results is a **content-gap signal**, prioritized for cycle-2 topic selection. Three layers to instrument:

**(a) On-site search analytics.** Wire the `SearchModal` (`components/SearchModal.tsx:241-292`) to fire a Plausible custom event on every search:

```ts
// On every settled query, inside the `groups` useMemo
useEffect(() => {
  if (!query.trim() || query.length < 3) return;
  const handle = setTimeout(() => {
    window.plausible?.("Search", {
      props: { query: query.toLowerCase(), resultCount: flatResults.length },
    });
  }, 600); // dwell time threshold
  return () => clearTimeout(handle);
}, [query, flatResults.length]);
```

A Plausible Goal "Search → resultCount=0" surfaces the no-results queries directly. PostHog version is identical (`posthog.capture("search", {...})`). The 600ms dwell debounce avoids logging every keystroke — this is the documented pattern for site-search instrumentation in 2026 (PostHog's docs call it the "search dwell event").

**(b) Google Search Console.** Already running — the Performance > Queries tab lists every search query that drove an impression, including queries the site **almost ranks for but doesn't have a page about**. Filter for queries with >100 impressions and CTR <2% and zero clicks: those are queries Google believes Argumend should answer but the site doesn't yet have a satisfying landing page for. This is the same playbook Zapier uses to seed its 800K programmatic pages — they don't guess long-tail keywords, they read GSC ([Indexcraft: Programmatic SEO 2026](https://indexcraft.in/blog/technical/programmatic-seo-guide)).

**(c) The cycle-2 feedback loop.** Drop a nightly Vercel cron that pulls (a) Plausible no-results queries and (b) GSC high-impression-low-CTR queries into `topic_gaps.csv`. The cycle-2 topic-selection routine reads this file as one of its prioritization signals: a query that 47 different visitors typed and got nothing for is a **higher-value topic to add than the swarm's current guesses**.

This closes the loop: the user's failed search becomes tomorrow's topic.

## Final summary

**Recommended search stack:**
- **Now:** MiniSearch over a build-time `searchIndex.json` (~150KB) replacing the current `String.includes()` in `SearchModal.tsx`. Add field weights (title × 3, crux × 2, meta_claim × 1.5) and prefix + light fuzzy matching. One-day build.
- **Schema migration first:** add `tags`, `fallaciesPresent`, `judgeConsensus`, `addedAt`, `aliases`, `viewCount` to `TopicSchema` (`lib/schemas/topic.ts`). The hand-curated `CROSS_CATEGORY_CLUSTERS` becomes a `tags` query; the missing facets become real.
- **Then:** pgvector embeddings (~$0.02 one-time) for related-topic suggestions, replacing the manual cluster map.
- **Eventually:** hybrid `tsvector + pgvector` with Reciprocal Rank Fusion when the dataset crosses ~500 topics or includes UGC.

**Three next-step actions to ship, in order:**
1. **Migrate the topic schema** — add `tags`, `fallaciesPresent`, `judgeConsensus`, `addedAt`, `aliases`. Backfill `tags` from `CROSS_CATEGORY_CLUSTERS`. (~half-day.)
2. **Replace SearchModal's matcher with MiniSearch** + ship `/topics/category/[slug]` and `/topics/tag/[slug]` as programmatic SEO landing pages. (~one day.)
3. **Wire Plausible search-event instrumentation** with no-results goal, and a nightly Vercel cron that combines no-results + GSC low-CTR queries into a `topic_gaps.csv` consumed by cycle-2. (~half-day.) This is the single highest-leverage change because it makes future topic selection data-driven instead of guesswork.

## Sources

- [byby.dev — Top 6 JavaScript Search Libraries](https://byby.dev/js-search-libraries)
- [pkgpulse — Fuse.js vs FlexSearch vs Orama 2026](https://www.pkgpulse.com/blog/fusejs-vs-flexsearch-vs-orama-client-side-search-2026)
- [Luca Ongaro — MiniSearch design](https://lucaongaro.eu/blog/2019/01/30/minisearch-client-side-fulltext-search-engine.html)
- [stereobooster/facets on GitHub](https://github.com/stereobooster/facets)
- [Fuse.js advanced benchmarking](https://dev.to/koushikmaratha/a-deep-dive-into-fusejs-advanced-use-cases-and-benchmarking-357p)
- [npm-compare — fuse.js vs flexsearch vs minisearch](https://npm-compare.com/elasticlunr,flexsearch,fuse.js,minisearch)
- [Tiger Data — pgvector vs Pinecone](https://www.tigerdata.com/blog/pgvector-vs-pinecone)
- [Geetopadesha — Vector Search 2026: Pinecone vs Supabase pgvector](https://geetopadesha.com/vector-search-in-2026-pinecone-vs-supabase-pgvector-performance-test/)
- [pgvector on GitHub](https://github.com/pgvector/pgvector)
- [Encore — You probably don't need a vector database](https://encore.dev/blog/you-probably-dont-need-a-vector-database)
- [dev.to — Hybrid Search RAG with pgvector + tsvector + RRF](https://dev.to/lpossamai/building-hybrid-search-for-rag-combining-pgvector-and-full-text-search-with-reciprocal-rank-fusion-6nk)
- [Metaflow — Programmatic SEO 2026: scaled content abuse](https://metaflow.life/blog/what-is-programmatic-seo)
- [Zumeirah — Programmatic SEO in 2026](https://zumeirah.com/programmatic-seo-in-2026/)
- [Indexcraft — Programmatic SEO Guide 2026](https://indexcraft.in/blog/technical/programmatic-seo-guide)
- [Monaqo — What is Programmatic SEO 2026 Guide](https://monaqo.in/what-is-programmatic-seo-and-how-it-works-2026-guide/)
- [Argumend — `app/explore/page.tsx`](https://github.com/amirhjalali/Argumend/blob/main/app/explore/page.tsx)
- [Argumend — `app/topics/page.tsx`](https://github.com/amirhjalali/Argumend/blob/main/app/topics/page.tsx)
- [Argumend — `components/SearchModal.tsx`](https://github.com/amirhjalali/Argumend/blob/main/components/SearchModal.tsx)
- [Argumend — `lib/schemas/topic.ts`](https://github.com/amirhjalali/Argumend/blob/main/lib/schemas/topic.ts)
- [Argumend — `data/topics.ts` cross-category clusters](https://github.com/amirhjalali/Argumend/blob/main/data/topics.ts)
- [Argumend — `app/sitemap.ts`](https://github.com/amirhjalali/Argumend/blob/main/app/sitemap.ts)

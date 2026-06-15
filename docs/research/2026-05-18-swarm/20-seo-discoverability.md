# SEO & Discoverability Audit — Argumend

_Date: 2026-05-19 · Scope: argumend.org, 109 topic pages, 2026 search landscape_

## TL;DR

- **Argumend's on-page SEO is unusually strong for a solo project** (rich `ClaimReview` + `FAQPage` + `Article` + `BreadcrumbList` JSON-LD, canonical tags, proper sitemap, ~70ms TTFB, no `noindex` leak). The technical floor is not the bottleneck.
- **In 2026, "ranking" is a losing frame.** With ~58–68% zero-click searches, AI Overviews triggering on 99.9% of informational queries, and a 38% organic-click drop on AIO-triggered queries, the realistic prize for a small site is **LLM citations** (ChatGPT/Claude/Perplexity/AI Mode), not blue-link rank-1.
- **The real gap is off-site authority + extractability.** Argumend is invisible for any non-branded query (Wikipedia, ProCon/Britannica, Kialo dominate). Two high-leverage bets: (1) reshape page intros so the first 60 words are LLM-citable, and (2) seed 5–10 high-quality backlinks from LessWrong/Substack/HN that LLM retrievers already trust.

---

## 1. The 2026 SEO landscape (what actually matters now)

- **Zero-click is the default.** 58.5–68% of Google searches end without a click; 83% of AI-Overview-triggered queries end click-free. ([SEJ field study](https://www.searchenginejournal.com/ai-overviews-cut-organic-clicks-38-field-study-finds/573145/), [DigitalApplied stats](https://www.digitalapplied.com/blog/zero-click-search-statistics-2026-complete-data))
- **AI Overviews appear on >25% of queries and ~100% of informational ones** — and informational is exactly what Argumend serves.
- **Google AI Mode** (the conversational tab) is at ~100M users with a 93% zero-click rate ([Nobori](https://nobori.ai/blog/google-ai-mode-zero-click-rate-100m-users-2026)). Traditional SERP traffic for publishers fell ~38% YoY.
- **The new "rank" is being cited in the generated answer.** LLMs use RAG over chunks scored on factual density, freshness, schema, and entity coherence — not pure PageRank. ([Citation algorithm explainer](https://upgrowth.in/citation-algorithm-chatgpt-perplexity-gemini-ai-overviews-2026/))
- **`llms.txt` is not yet a real SEO lever.** ~10% adoption, but no major LLM provider commits to reading it; GPTBot/ClaudeBot/PerplexityBot crawl HTML directly. Useful as a dev-experience signal, neutral as SEO. ([SE Ranking](https://seranking.com/blog/llms-txt/), [Codersera May-2026 guide](https://codersera.com/blog/llms-txt-complete-guide-2026/))

## 2. Argumend's realistic ranking potential

**Competitors and their moats:**

| Site | Moat | DR/Authority |
|---|---|---|
| Wikipedia | Editorial mass, oldest backlink profile in the world | ~94+ |
| ProCon.org (Britannica) | Pro/con format, Library-of-Congress archived, school librarian whitelists | ~85+ via Britannica |
| Kialo | 18k+ debates, 720k claims, established since 2017 | ~70+ |
| Mainstream news (NYT/Vox/Atlantic) | Domain age, news freshness boost | 90+ |

Argumend is a 2025-launched site with no real backlink profile. A `site:argumend.org` query returns only the homepage, `/resources`, and `/concepts/steel-manning` — meaning **Google has indexed but is not surfacing the 109 topic pages in any meaningful position.** It is not on page 1 (or visibly page 2–3) for canonical queries like "universal basic income arguments" or "nuclear energy safety pros and cons" — those SERPs are owned by Wikipedia, ProCon, World Nuclear Association, JustEnergy, GreenAmerica.

**Verdict:** Competing head-on for "X pros and cons" is a multi-year, ~$100k+ link-building project. **Don't.** Instead:

1. Target **long-tail/format queries** Wikipedia and ProCon don't optimize for: "what would change my mind on X", "strongest argument against X", "crux of the X debate", "steel-man case for X".
2. Optimize for **LLM citation**, where domain authority matters less than chunk-level extractability.
3. Build authority **off-site** via communities (LessWrong, Substack, HN) where backlinks are realistically obtainable.

## 3. LLM-citation optimization (the new game)

Research consensus on what gets cited ([Surfer](https://surferseo.com/blog/llm-citations/), [Pixelmojo GEO](https://www.pixelmojo.io/blogs/geo-playbook-get-cited-chatgpt-perplexity-claude), [Yotpo](https://www.yotpo.com/blog/chatgpt-seo-geo-tips/), [Marketer's Choice](https://marketerschoice.com/llm-retrieval-and-ai-citations/)):

1. **First-60-words rule.** The top 30% of a page accounts for ~44% of LLM citations. Argumend's topic pages currently open with the H1 + a one-sentence claim + visualization — no extractable prose paragraph. **Fix:** after the H1, add a 60-word self-contained TL;DR with the headline finding, key number, and date.
2. **FAQ schema works.** Argumend already ships `FAQPage` JSON-LD with crux questions — keep this, and ensure the visible HTML answers are 40–80 words (currently they're one-liners that under-deliver for extraction).
3. **Numbers, dates, named studies.** LLMs preferentially cite chunks with citable specifics. Argumend's static topic data needs at least one stat per pillar with year + source name.
4. **Freshness.** AI retrieval discards stale chunks. Add visible `lastReviewed` dates and refresh quarterly. Update `sitemap.ts` to use real `lastModified` rather than the hard-coded staggered March 2026 dates currently emitted.
5. **Comparison tables.** "X vs Y" tables are heavily cited. Argumend already has `/topics/compare` — expand to 30+ pairs and add proper `<table>` markup (not flex divs) so chunks survive HTML→text extraction.
6. **`llms.txt` — ship it anyway.** Currently 404s. Low cost, useful as a developer/AI-agent signal, no downside. Mirror the sitemap with a one-line description per topic.

## 4. Ten target keywords + page recommendations

Selected based on (a) search volume, (b) feasibility against entrenched sites, (c) match to Argumend's "steel-man + crux" framing.

| # | Topic | Primary keyword (high-vol, hard) | Long-tail keyword (winnable) | Specific fix |
|---|---|---|---|---|
| 1 | `ai-risk` | "ai existential risk" | "strongest argument against ai doom" | Open with 60-word steel-man of skeptic view; FAQ "what would convince an AI skeptic?" |
| 2 | `universal-basic-income` | "universal basic income pros cons" | "ubi employment effect meta-analysis 2026" | Lead with the AEI 2026 meta-analysis number; cite by name |
| 3 | `nuclear-energy-safety` | "is nuclear energy safe" | "deaths per twh nuclear vs coal" | Add Our World in Data deaths/TWh table; link source |
| 4 | `minimum-wage-effects` | "minimum wage pros cons" | "card krueger seattle minimum wage" | Name the studies (Card-Krueger, Seattle MW Study, CBO 2021); cite |
| 5 | `rent-control-effectiveness` | "does rent control work" | "rent control st paul stockholm evidence" | Lead with city-level natural experiments; comparison table |
| 6 | `gun-control-effectiveness` | "gun control statistics" | "australia buyback nz christchurch effect size" | Steel-man both sides with specific country/event studies |
| 7 | `glp1-weight-loss-drugs` | "ozempic risks" | "glp-1 long term side effects evidence 2026" | Recent + medical = LLM gold; refresh quarterly |
| 8 | `social-media-mental-health` | "social media teen mental health" | "haidt twenge anxious generation critique" | Map Haidt vs Odgers debate explicitly; cruxes are the differentiator |
| 9 | `degrowth-economics` | "degrowth vs green growth" | "decoupling gdp emissions evidence" | Less covered by ProCon; high LLM-citation potential |
| 10 | `psychedelics-mental-health` | "psilocybin depression" | "compass pathways phase 3 psilocybin results" | Trial-level specifics; FDA timeline as freshness anchor |

For all ten:
- **Title pattern:** `<Claim> — Steel-Manned Arguments & Cruxes | Argumend` (currently `Topic — Argument Analysis`; under-optimized for click-through and keyword match).
- **H1:** Match the user's query phrasing, not the internal claim phrasing. E.g. `ai-risk` H1 is currently "Existential Risk from AGI" — also add a visible subtitle "Is AI an existential risk? The strongest case on each side."
- **Add a 60-word TL;DR paragraph** above the React Flow canvas. Server-render it.
- **Internal linking:** every topic page should link to 5–8 related topics (currently appears minimal). Use the comparison pairs as anchor text.

## 5. Page-level + technical fixes

**Already good (don't break):**
- ClaimReview + FAQPage + Article + BreadcrumbList JSON-LD on topic pages
- Canonical tags, OG/Twitter cards
- Robots.txt clean (disallows only `/api/`, `/auth/`, `/dashboard`, `/embed/`)
- Cloudflare TTFB ~70ms; HTML payload 70–180KB; HSTS + CSP headers
- Sitemap.xml lists all 109 topics with priority 0.8

**Fix:**
1. **Sitemap `lastModified` is hard-coded** in `app/sitemap.ts` (March 2026 + index*day). Wire to real content update timestamps so Google's freshness signal works.
2. **Add `llms.txt`** at root with topic list + 1-line summaries. ~30 minutes of work.
3. **Server-render the 60-word TL;DR.** React Flow canvas is client-only — make sure text-heavy content is in initial HTML for LLM crawlers (which don't execute JS reliably; GPTBot in particular is JS-poor).
4. **Increase visible word count per topic.** Sample `ai-risk` shows ~1146 words including chrome. Aim for 800+ words of substantive prose per topic page (steel-man paragraphs for each pillar, expanded crux explanations) — currently the graph carries the load but graph text is hard to extract.
5. **Article schema → `ScholarlyArticle`** where applicable, and add `citation` properties pointing to real sources for evidence nodes. This is the highest-ROI schema upgrade for LLM trust signals.
6. **Core Web Vitals:** TTFB is excellent. Verify LCP on topic pages with React Flow — likely culprit is the canvas mount. Defer canvas init until after first paint of the prose TL;DR.
7. **Image alt text** for OG images — `/api/og/{topic}` exists but check it's referenced with descriptive alt.

## 6. Off-site / backlink strategy

Realistic for a solo founder, ranked by ROI:

1. **LessWrong cross-posts** (highest leverage). LW is already a top citation source for Claude/ChatGPT on rationality + AI topics. Post one well-edited essay per quarter that *links* to an Argumend topic page as the canonical map. Don't drop links naked — write a real post (e.g. "What would change my mind about AGI doom: the 7 cruxes" → link to `/topics/ai-risk`).
2. **Substack mentions.** Target ~20 mid-size Substacks (Astral Codex Ten readership, Marginal Revolution adjacent, Noah Smith, Maxim Lott). Offer the topic page as a "view both sides" companion link. ACX-style audiences love this format.
3. **Hacker News.** A "Show HN: Argumend — visual argument maps for controversial topics" with a good demo screenshot is plausible front-page. One shot per major version. Already has a redesigned hero per recent commits — pick a strong topic (AI risk or UBI) as the demo.
4. **Wikipedia external links.** Hard but high-DR. The "External links" section of pages like UBI, AI safety, Nuclear power policy occasionally accepts non-commercial educational tools. Risk: removal. Don't be the one to add it; let an editor.
5. **Reddit (r/slatestarcodex, r/changemyview, r/PoliticalDiscussion, r/rational).** CMV in particular maps naturally onto Argumend's crux framing. Don't spam — answer questions and link when genuinely useful.
6. **Educator outreach.** ProCon's moat is school-librarian whitelists. Argumend's `/for-educators` page exists; pitch ~50 critical-thinking / debate teachers for backlinks from class resource pages. Slow but durable.
7. **Avoid:** paid links, generic SEO directory submissions, guest posts on low-DR content farms. Net-negative in 2026.

Realistic 12-month target: **20–30 quality dofollow backlinks from DR 50+ sites** would meaningfully shift LLM retrieval ranking and put long-tail queries within reach.

## 7. Open questions

1. **Google Search Console data?** None visible from outside. Without GSC impressions/CTR, all recommendations are extrapolations. Highest-ROI next step: connect GSC and Bing Webmaster, log a 30-day baseline.
2. **AI traffic measurement.** Argumend currently has GA4 only. Add a referrer breakdown filter for `chatgpt.com`, `perplexity.ai`, `claude.ai`, `gemini.google.com`, `copilot.microsoft.com` to actually measure LLM-citation impact. Without this, "are we getting cited?" is unanswerable.
3. **Indexation status.** `site:argumend.org` returns only ~3 results. Is Google de-prioritizing (thin content / duplicate concern) or just slow-crawling a young site? Submit topics to URL Inspection one-by-one for a sample of 10 to test.
4. **Is the JS-heavy React Flow canvas hurting indexability?** Worth a Mobile-Friendly + Rendered HTML test in GSC. If LLM crawlers see a near-empty body, the schema is doing all the work — fragile.
5. **Brand-voice tradeoff.** The 2026-04-29 anonymous-brand-voice research arc favors low-author-footprint content. This conflicts with E-E-A-T author signals LLMs reward. Pick one consciously.
6. **Topic-page→user-action funnel.** Even if SEO works, what's the conversion goal? Newsletter? Saved topics? Without a CRO goal, ranking traffic is vanity.

---

**Sources:**
- [Search Engine Journal — AI Overviews cut clicks 38%](https://www.searchenginejournal.com/ai-overviews-cut-organic-clicks-38-field-study-finds/573145/)
- [DigitalApplied — Zero-Click Statistics 2026](https://www.digitalapplied.com/blog/zero-click-search-statistics-2026-complete-data)
- [Nobori — AI Mode 93% zero-click](https://nobori.ai/blog/google-ai-mode-zero-click-rate-100m-users-2026)
- [upGrowth — AI Citation Algorithm 2026](https://upgrowth.in/citation-algorithm-chatgpt-perplexity-gemini-ai-overviews-2026/)
- [SE Ranking — Why llms.txt doesn't work yet](https://seranking.com/blog/llms-txt/)
- [Codersera — llms.txt May-2026 guide](https://codersera.com/blog/llms-txt-complete-guide-2026/)
- [Surfer — 7 tips to get cited by LLMs](https://surferseo.com/blog/llm-citations/)
- [Pixelmojo — GEO playbook](https://www.pixelmojo.io/blogs/geo-playbook-get-cited-chatgpt-perplexity-claude)
- [Yotpo — ChatGPT SEO/GEO 2026](https://www.yotpo.com/blog/chatgpt-seo-geo-tips/)
- [Wikipedia — ProCon.org](https://en.wikipedia.org/wiki/ProCon.org)
- [Wikipedia — Kialo](https://en.wikipedia.org/wiki/Kialo)
- Inspected files: `/Users/amirhjalali/argumend/app/sitemap.ts`, `/Users/amirhjalali/argumend/app/robots.ts`, live HTML of `https://argumend.org/topics/ai-risk` (1146 words, 7 schema types, all canonical/OG tags present), `https://argumend.org/sitemap.xml` (109 topic URLs), `https://argumend.org/llms.txt` (404).

# Product Pruning Audit

Count check: 30 listed routes + homepage = 31 summary rows. API route groups are audited separately under `/api`.

## 1. Summary Table

| Route | Classification | Risk |
|---|---:|---|
| `/` homepage | CORE | high |
| `/__route-error-qa` | REMOVE | low |
| `/about` | CORE | low |
| `/analyses` | MERGE → `/analyze` | medium |
| `/analysis/[id]` | HIDDEN | medium |
| `/analyze` | CORE | high |
| `/api` | CORE mixed; see API groups | high |
| `/auth/signin` | HIDDEN | low |
| `/blog` | HIDDEN | medium |
| `/community` | HIDDEN | low |
| `/concepts` | MERGE → `/about` | medium |
| `/dashboard` | HIDDEN | low |
| `/embed/[topicId]` | HIDDEN | low |
| `/fallacies` | MERGE → `/analyze` contextual results | medium |
| `/faq` | MERGE → `/about` | low |
| `/feed.xml` | HIDDEN | low |
| `/for-educators` | HIDDEN | low |
| `/glossary` | MERGE → topic/about contextual definitions | medium |
| `/guides` | HIDDEN | medium |
| `/how-it-works` | MERGE → `/about` | low |
| `/is` | MERGE → `/topics` + topic pages | medium |
| `/lessons-from-the-deep` | HIDDEN | low |
| `/library` | MERGE → `/topics` + topic pages | medium |
| `/llms.txt` | HIDDEN | low |
| `/methodology` | MERGE → `/about` | medium |
| `/perspectives` | HIDDEN | low |
| `/questions` | MERGE → topic pages | medium |
| `/research` | HIDDEN | low |
| `/route-error-qa` | REMOVE | low |
| `/saved` | CORE | medium |
| `/topics` | CORE; hide `/topics/compare` subfeature | high |

## 2. Per-Route Details

### `/` Homepage

| field | content |
|---|---|
| Purpose | Interactive landing and argument exploration shell; hero, topic grid, Analyze CTA, and mobile/desktop argument-map entry live in `components/HomeClient.tsx`. |
| Inbound links | `TopBar`, `Sidebar`, `Footer`, not-found/error pages, sign-in guest CTA. |
| In main nav? | TopBar yes, Sidebar yes, Footer yes. |
| Mobile at 390px | works; mobile swaps desktop React Flow for `MobileArgumentList`. |
| Tests | `app/page.semantic.test.tsx`, `components/HomeClient.test.tsx`, `components/FeaturedTopicHero.test.tsx`. |
| Classification | CORE |
| Reasoning | Founder-approved homepage, argument exploration, and full-map visualization all converge here. |
| Risk of change | high; hiding/removing breaks primary product entry and graph exploration. |

### `/__route-error-qa`

| field | content |
|---|---|
| Purpose | UNCLEAR; empty directory, no `page.tsx`, no route handler. |
| Inbound links | none from `rg route-error-qa`. |
| In main nav? | no. |
| Mobile at 390px | not UI. |
| Tests | none. |
| Classification | REMOVE |
| Reasoning | Truly dead by source: empty directory, no inbound links, no tests. |
| Risk of change | low; deleting empty directory should not affect runtime. |

### `/about`

| field | content |
|---|---|
| Purpose | Explains Argumend’s mission, principles, balance/weight model, and philosophy. |
| Inbound links | `lib/nav.ts`, `SearchModal`, `auth/signin`, `Footer`. |
| In main nav? | Sidebar yes, Footer yes; proposed TopBar target yes. |
| Mobile at 390px | works; responsive text and `px-4`. |
| Tests | `app/staticMetadata.test.ts`, public metadata coverage. |
| Classification | CORE |
| Reasoning | Navigation target requires About; it can absorb How it works, Methodology, FAQ, Concepts summary. |
| Risk of change | low if kept and promoted; medium if overloaded without careful IA. |

### `/analyses`

| field | content |
|---|---|
| Purpose | DB-backed archive of recent saved analyses with CTA back to Analyze. |
| Inbound links | `lib/nav.ts`, error page back link, internal `/analysis/${id}` links. |
| In main nav? | Sidebar yes, Footer no. |
| Mobile at 390px | works; single-column archive cards. |
| Tests | `app/analyses/page.test.tsx`, `app/api/analyze/route.test.ts`. |
| Classification | MERGE → `/analyze` |
| Reasoning | “Recent Analyses” is a redundant public concept; if needed, it belongs as contextual history on Analyze, not as nav surface. |
| Risk of change | medium; DB-backed installs and shared archive expectations may rely on it. |

### `/analysis/[id]`

| field | content |
|---|---|
| Purpose | DB-backed single analysis report with extracted positions, cruxes, fallacies, confidence, and optional judgment. |
| Inbound links | `/analyses` links to `/analysis/${analysis.id}`; Analyze result share link constructs `/analysis/${id}`. |
| In main nav? | no. |
| Mobile at 390px | works; responsive report cards. |
| Tests | API coverage in `app/api/analysis/[id]/route.test.ts`; no direct page test found. |
| Classification | HIDDEN |
| Reasoning | Preserve as share/support route for Analyze, but do not expose as default browsing. |
| Risk of change | medium; removing breaks existing shared analysis URLs. |

### `/analyze`

| field | content |
|---|---|
| Purpose | Paste/upload text, extract positions/evidence/cruxes, optionally run programmatic/live judging, and show results. |
| Inbound links | `TopBar`, `Sidebar`, `HeroAnalyze`, `/analyses`, `/methodology`, not-found. |
| In main nav? | TopBar yes, Sidebar yes, Footer no. |
| Mobile at 390px | works; single-column form, responsive controls. |
| Tests | `app/analyze/page.test.tsx`, `components/HeroAnalyze.test.tsx`, `app/api/analyze/route.test.ts`. |
| Classification | CORE |
| Reasoning | Founder-approved Analyze route; directly supports “represent disagreement better than a general AI.” |
| Risk of change | high; core funnel and API dependency. |

### `/api`

| field | content |
|---|---|
| Purpose | Mixed API surface for analyze, public topic data, debate/judge/auth/account features, embeds/social images, health, newsletter, and integrations. |
| Inbound links | client fetches from Analyze, Save/Subscribe buttons, Newsletter, TrendingTopics, ShareToMoltbook; metadata uses OG/API URLs. |
| In main nav? | no. |
| Mobile at 390px | not UI. |
| Tests | broad `app/api/*/*.test.ts` coverage. |
| Classification | CORE mixed; see groups below |
| Reasoning | Some API groups are core; many support hidden or deprecated UI. |
| Risk of change | high; route-by-route pruning required. |

API group classifications:

| API group | Purpose | Classification | Risk |
|---|---|---:|---|
| `/api/analyze` | Analyze text and list persisted analyses. | CORE for POST; MERGE list behavior into Analyze | high |
| `/api/analysis/[id]` | Fetch one saved analysis. | HIDDEN | medium |
| `/api/v1`, `/api/v1/topics`, `/api/v1/topics/[id]` | Public read-only topic API. | CORE | medium |
| `/api/og`, `/api/og/[id]` | Social card generation. | CORE | medium |
| `/api/debate`, `/api/debate/stream`, `/api/debate/persist` | AI-vs-AI/programmatic debate generation and persistence. | HIDDEN | medium |
| `/api/judge` | Standalone debate/content judging. | HIDDEN | medium |
| `/api/auth/[...nextauth]` | NextAuth handlers. | HIDDEN | low |
| `/api/saved-topics` | Account-backed saved topics. | HIDDEN | low |
| `/api/topic-subscriptions` | Topic follows/subscriptions. | HIDDEN | low |
| `/api/topic-views` | View tracking and trending topics. | HIDDEN | low |
| `/api/newsletter` | Newsletter signup. | HIDDEN | low |
| `/api/moltbook` | External Moltbook sharing. | HIDDEN | low |
| `/api/verdict-card/[topicId]` | Mock verdict social card. | HIDDEN | low |
| `/api/health` | Offline-safe readiness probe. | HIDDEN | low |

### `/auth/signin`

| field | content |
|---|---|
| Purpose | Optional Google sign-in; redirects to `/saved` when auth flag is off. |
| Inbound links | `UserMenu`, `lib/auth.ts`, dashboard redirect. |
| In main nav? | TopBar optional via UserMenu when auth enabled. |
| Mobile at 390px | works; centered max-width card. |
| Tests | `app/auth/signin/page.test.tsx`, `components/UserMenu.test.tsx`, `lib/auth*.test.ts`. |
| Classification | HIDDEN |
| Reasoning | Pre-decided hidden: authentication and sign-in. |
| Risk of change | low; already gated by `NEXT_PUBLIC_ENABLE_AUTH`. |

### `/blog`

| field | content |
|---|---|
| Purpose | Blog index plus article/category/tag subroutes for essays and updates. |
| Inbound links | `lib/nav.ts`, `SearchModal`, `Footer`, sitemap, RSS/feed links. |
| In main nav? | Sidebar yes, Footer yes. |
| Mobile at 390px | works; responsive article cards. |
| Tests | `app/blog/page.test.tsx`, category/tag tests, `[slug]/client.test.tsx`. |
| Classification | HIDDEN |
| Reasoning | Content marketing/education surface, not part of the focused product promise. Preserve for SEO/history but de-link from default flows. |
| Risk of change | medium; sitemap/RSS and existing indexed articles rely on it. |

### `/community`

| field | content |
|---|---|
| Purpose | Community principles and contribution prompts, mostly routing users to GitHub. |
| Inbound links | `lib/nav.ts`, `SearchModal`, FAQ text link. |
| In main nav? | Sidebar yes, Footer yes. |
| Mobile at 390px | works. |
| Tests | metadata/static tests only; no page-specific test found. |
| Classification | HIDDEN |
| Reasoning | Pre-decided immature contribution systems should be hidden. |
| Risk of change | low; external contribution link can remain on About if needed. |

### `/concepts`

| field | content |
|---|---|
| Purpose | Index/detail pages for argument-mapping concepts grouped by method stage. |
| Inbound links | `lib/nav.ts`, `SearchModal`, fallacies/library pages, concept detail related links. |
| In main nav? | Sidebar yes, Footer yes. |
| Mobile at 390px | works; responsive grids. |
| Tests | `app/concepts/[slug]/page.test.ts`, `lib/conceptMeta.test.ts`, nav/touch tests. |
| Classification | MERGE → `/about` |
| Reasoning | Overlaps with Glossary, Methodology, How it works, and Guides. Keep content, but fold key definitions into About and contextual topic help. |
| Risk of change | medium; sitemap indexes concept detail pages. |

### `/dashboard`

| field | content |
|---|---|
| Purpose | Auth-only account dashboard for saved topics and recent debate activity; redirects to `/saved` when auth is disabled. |
| Inbound links | `lib/nav.ts` only when auth enabled. |
| In main nav? | Sidebar yes only with auth flag; Footer no. |
| Mobile at 390px | works; responsive saved-topic grid, but auth-only. |
| Tests | `lib/nav.test.ts` auth gating; no direct page test found. |
| Classification | HIDDEN |
| Reasoning | Pre-decided account dashboard hidden; local `/saved` is the core saved-topic route. |
| Risk of change | low; already feature-gated. |

### `/embed/[topicId]`

| field | content |
|---|---|
| Purpose | Compact noindex iframe widget showing topic title, balance/weight, top arguments, and backlink. |
| Inbound links | `EmbedButton` generates iframe `/embed/${topicId}`. |
| In main nav? | no. |
| Mobile at 390px | works; max 600px, single-column below `sm`. |
| Tests | `app/embed/[topicId]/layout.test.tsx`, `components/EmbedButton.test.tsx`. |
| Classification | HIDDEN |
| Reasoning | Useful support capability, but not a default public flow. |
| Risk of change | low; leave serving for existing embeds. |

### `/fallacies`

| field | content |
|---|---|
| Purpose | Logical fallacy field guide with detail pages and related topics. |
| Inbound links | `lib/nav.ts`, fallacy detail links, links from `/concepts/fallacies` and guide references. |
| In main nav? | Sidebar yes, Footer no. |
| Mobile at 390px | works. |
| Tests | `app/fallacies/[slug]/page.test.ts`, `lib/fallacyMeta.test.ts`. |
| Classification | MERGE → `/analyze` contextual results |
| Reasoning | Fallacy detection belongs inside Analyze output and topic explanations, not as a standalone hub. |
| Risk of change | medium; sitemap indexes hub and detail pages. |

### `/faq`

| field | content |
|---|---|
| Purpose | Accordion of common questions from `data/faqs`. |
| Inbound links | `lib/nav.ts`, Footer, FAQ internal links to Community. |
| In main nav? | Sidebar meta yes, Footer yes. |
| Mobile at 390px | works. |
| Tests | metadata/sitemap coverage; no direct page test found. |
| Classification | MERGE → `/about` |
| Reasoning | FAQ is support copy; target nav has About, so this should be absorbed there or linked contextually. |
| Risk of change | low. |

### `/feed.xml`

| field | content |
|---|---|
| Purpose | RSS feed for blog articles and topic pages. |
| Inbound links | `app/layout.tsx` feed link; `/blog` has RSS link; `llms.txt` mentions it. |
| In main nav? | no. |
| Mobile at 390px | not UI. |
| Tests | `app/feed.xml/route.test.ts`. |
| Classification | HIDDEN |
| Reasoning | Preserve machine/subscriber surface, but no visible navigation. |
| Risk of change | low. |

### `/for-educators`

| field | content |
|---|---|
| Purpose | Educator landing page with classroom activities, topic recommendations, and printable worksheets. |
| Inbound links | `lib/nav.ts`, Guides CTA, Topic page contextual educator link. |
| In main nav? | Sidebar yes, Footer yes. |
| Mobile at 390px | works. |
| Tests | worksheet page tests, print button tests, `lib/learningResourceTouchTargets.test.ts`. |
| Classification | HIDDEN |
| Reasoning | Pre-decided worksheets hidden; education package is secondary to core product. |
| Risk of change | low for nav hiding; medium if noindex/removal due worksheet URLs. |

### `/glossary`

| field | content |
|---|---|
| Purpose | Definitions for argument-mapping and reasoning terms with examples/learn-more links. |
| Inbound links | `lib/nav.ts`, `llms.txt`, sitemap, internal glossary metadata links. |
| In main nav? | Sidebar yes, Footer yes. |
| Mobile at 390px | works. |
| Tests | `lib/glossaryMeta.test.ts`, sitemap coverage. |
| Classification | MERGE → topic/about contextual definitions |
| Reasoning | Overlaps Concepts and Methodology; definitions should appear inline where terms are used. |
| Risk of change | medium; indexed and referenced by `llms.txt`. |

### `/guides`

| field | content |
|---|---|
| Purpose | Curriculum-style guide index and guide detail pages. |
| Inbound links | `lib/nav.ts`, blog related reading, library CTA, not-found links. |
| In main nav? | Sidebar yes, Footer yes. |
| Mobile at 390px | works. |
| Tests | `app/guides/[id]/page.test.ts`, `lib/guideMeta.test.ts`, touch target tests. |
| Classification | HIDDEN |
| Reasoning | Valuable support content, but too much surface for the narrowed product promise. |
| Risk of change | medium; sitemap and blog related-reading use guide URLs. |

### `/how-it-works`

| field | content |
|---|---|
| Purpose | Explains map nodes, interaction steps, evidence scoring, and crux concept. |
| Inbound links | `TopBar`, `lib/nav.ts`, For Educators CTA, `llms.txt`. |
| In main nav? | TopBar yes, Sidebar yes, Footer yes. |
| Mobile at 390px | works. |
| Tests | metadata/sitemap only; no direct page test found. |
| Classification | MERGE → `/about` |
| Reasoning | This is About-method copy under the proposed Explore · Analyze · About navigation. |
| Risk of change | low if redirected/de-linked carefully. |

### `/is`

| field | content |
|---|---|
| Purpose | “Is it true?” claim-answer hub and detail pages derived from topic data. |
| Inbound links | `lib/nav.ts`, Footer, `/questions` overlap links, sitemap/canonical tests. |
| In main nav? | Sidebar yes, Footer yes. |
| Mobile at 390px | works. |
| Tests | `app/is/IsHubClient.test.tsx`, `lib/mainLandmark.test.ts`, canonical/sitemap tests. |
| Classification | MERGE → `/topics` + topic pages |
| Reasoning | Same underlying idea as Questions and Topics: topic-derived answers with balance/weight. Keep as SEO aliases only if needed, but remove as product concept. |
| Risk of change | medium; canonical/sitemap tests intentionally include `/is`. |

### `/lessons-from-the-deep`

| field | content |
|---|---|
| Purpose | Experimental page about Argumend’s external Moltbook agent/persona activity and selected exchanges. |
| Inbound links | `lib/nav.ts`, sitemap. |
| In main nav? | Sidebar yes, Footer no. |
| Mobile at 390px | works. |
| Tests | `app/lessons-from-the-deep/page.boundary.test.ts`, `ExchangeCard.test.tsx`. |
| Classification | HIDDEN |
| Reasoning | External/community experiment, not part of the focused disagreement-mapping product. |
| Risk of change | low. |

### `/library`

| field | content |
|---|---|
| Purpose | Reference/resource library plus high-confidence topic table. |
| Inbound links | `lib/nav.ts`, `SearchModal`, Footer, glossary/concepts/guides CTAs. |
| In main nav? | Sidebar yes, Footer yes. |
| Mobile at 390px | mostly works; table may be tighter than ideal at 390px. |
| Tests | `app/library/page.test.tsx`, `lib/libraryMeta.test.ts`. |
| Classification | MERGE → `/topics` + topic pages |
| Reasoning | Topic recommendations belong in Explore; resources belong contextually on topic/About pages. |
| Risk of change | medium; sitemap and search index reference it. |

### `/llms.txt`

| field | content |
|---|---|
| Purpose | Plain-text AI/LLM discovery file listing topic maps, reading guidance, and machine-readable interfaces. |
| Inbound links | no visible href; route self-contained and tested. |
| In main nav? | no. |
| Mobile at 390px | not UI. |
| Tests | `app/llms.txt/route.test.ts`. |
| Classification | HIDDEN |
| Reasoning | Supports machine discovery; keep serving, no visible product surface. |
| Risk of change | low. |

### `/methodology`

| field | content |
|---|---|
| Purpose | Explains model/process methodology: extraction, steel-manning, judging, evidence weighting, balance/weight. |
| Inbound links | `lib/nav.ts`, topic pages, questions/is footers, Analyze CTA. |
| In main nav? | Sidebar yes, Footer yes. |
| Mobile at 390px | works. |
| Tests | sitemap/public metadata coverage; no direct page test found. |
| Classification | MERGE → `/about` |
| Reasoning | Methodology is important trust content, but should be contextual/About, not a main route. |
| Risk of change | medium; many content pages link to it. |

### `/perspectives`

| field | content |
|---|---|
| Purpose | Standalone animated perspective-taking scroll story. |
| Inbound links | `lib/nav.ts`, Footer, `SearchModal`, sitemap. |
| In main nav? | Sidebar yes, Footer yes. |
| Mobile at 390px | untested guess; responsive classes exist, but animation-heavy page. |
| Tests | `lib/perspectiveMeta.test.ts`, `app/visualAssets.test.ts`. |
| Classification | HIDDEN |
| Reasoning | Pre-decided standalone Perspective tools hidden. |
| Risk of change | low. |

### `/questions`

| field | content |
|---|---|
| Purpose | Question hub and detail pages generated from topic variations with arguments, evidence, cruxes, and related questions. |
| Inbound links | `lib/nav.ts`, Footer, QuestionsSearch, question detail related links, sitemap/canonical tests. |
| In main nav? | Sidebar yes, Footer yes. |
| Mobile at 390px | works; explicit touch-target tests. |
| Tests | `QuestionsSearch.test.tsx`, `questionsTouchTargets.test.ts`, `mainLandmark.test.ts`, canonical tests. |
| Classification | MERGE → topic pages |
| Reasoning | Questions, Is, and Topics are the same corpus repackaged. Topic pages should own answer variants and crux questions. |
| Risk of change | medium; sitemap and canonical tests intentionally include question URLs. |

### `/research`

| field | content |
|---|---|
| Purpose | Research/citation page explaining the evidence basis with inline citations and references. |
| Inbound links | `lib/nav.ts`, sitemap. |
| In main nav? | Sidebar yes, Footer yes. |
| Mobile at 390px | works. |
| Tests | no direct page test found. |
| Classification | HIDDEN |
| Reasoning | Trust-support content, but not a navigation target; preserve and link contextually from About/topic evidence. |
| Risk of change | low. |

### `/route-error-qa`

| field | content |
|---|---|
| Purpose | UNCLEAR; empty directory, no `page.tsx`, no route handler. |
| Inbound links | none from `rg route-error-qa`. |
| In main nav? | no. |
| Mobile at 390px | not UI. |
| Tests | none. |
| Classification | REMOVE |
| Reasoning | Truly dead by source. |
| Risk of change | low. |

### `/saved`

| field | content |
|---|---|
| Purpose | Local browser-saved/bookmarked topics, no account required. |
| Inbound links | `lib/nav.ts`, dashboard auth-off redirect, RouteErrorState tests, SaveTopic flows. |
| In main nav? | Sidebar yes, Footer yes. |
| Mobile at 390px | works; responsive grid and localStorage fallback states. |
| Tests | `app/saved/SavedClient.test.tsx`, `components/SaveTopicButton.test.tsx`. |
| Classification | CORE |
| Reasoning | Founder-approved local saved/bookmarked topics. |
| Risk of change | medium; core local persistence UX. |

### `/topics`

| field | content |
|---|---|
| Purpose | Topic browsing, topic detail pages, category/tag pages, and comparison subroutes. |
| Inbound links | `TopBar` no direct, `Sidebar`, `Footer`, HomeClient, SearchModal, most content pages, sitemap, API URLs. |
| In main nav? | Sidebar yes, Footer yes. |
| Mobile at 390px | works; topic pages default to read mode and homepage canvas swaps to mobile list. |
| Tests | `app/topics/page.test.tsx`, category/tag tests, compare tests, topic import boundary tests. |
| Classification | CORE |
| Reasoning | Founder-approved topic browsing, topic pages, evidence, cruxes, argument exploration. Subfeature `/topics/compare` should be HIDDEN as pre-decided advanced comparison. |
| Risk of change | high; primary corpus and exploration surface. |

## 3. Nav-Link Inventory

Current TopBar:
- `/` logo
- `/analyze`
- `/how-it-works`
- Search button opens modal
- GitHub external “Contribute”
- optional auth UserMenu → `/auth/signin`

Current Sidebar from `lib/nav.ts`:
- Primary: `/`, `/dashboard` auth-only, `/analyze`, `/analyses`, `/saved`, `/topics`, `/topics/compare`, `/is`, `/how-it-works`, `/about`
- Learn: `/blog`, `/research`, `/guides`, `/fallacies`, `/concepts`, `/perspectives`, `/library`, `/questions`, `/lessons-from-the-deep`, `/community`, `/for-educators`, `/methodology`, `/glossary`
- Meta: `/faq`
- Topic buttons route to homepage graph state `/?topic=...&view=logic-map`; “View all” → `/topics`

Current Footer:
- Explore: `/topics`, `/is`, `/saved`, `/questions`, `/blog`, `/guides`, `/library`
- Learn: `/research`, `/concepts`, `/how-it-works`, `/methodology`, `/for-educators`, `/glossary`
- About: `/about`, `/community`, `/faq`, `/perspectives`
- Newsletter form → `/api/newsletter`
- GitHub external

Proposed Explore · Analyze · About mapping:
- Explore → `/topics`
- Analyze → `/analyze`
- About → `/about`
- Search remains icon/action, not a nav route.
- Saved remains contextual/accountless utility, likely visible as bookmark icon or under Explore.
- Full-map visualization remains contextual from homepage/topic links.
- Hide/de-link: `/analyses`, `/dashboard`, `/topics/compare`, `/is`, `/blog`, `/research`, `/guides`, `/fallacies`, `/concepts`, `/perspectives`, `/library`, `/questions`, `/lessons-from-the-deep`, `/community`, `/for-educators`, `/methodology`, `/glossary`, `/faq`, auth entry unless enabled.

## 4. Feature-Flag Inventory

From `lib/constants.ts`:

| Flag | Default | Gates |
|---|---:|---|
| `FEATURES.LIVE_HERO_CANVAS` | `true` | Homepage hero mini React Flow preview, additionally gated to non-mobile in `HomeClient`. |
| `DEBATE.ENABLE_LIVE_API` | `process.env.NEXT_PUBLIC_ENABLE_LIVE_DEBATE_API === "true"`; default false unless env set | Client-side debate live API availability constants. |
| `DEBATE.ENABLE_LIVE_JUDGING` | `process.env.NEXT_PUBLIC_ENABLE_LIVE_JUDGING_API === "true"`; default false unless env set | Client-side judging availability constants. |

Related env gates found outside `lib/constants.ts`:
- `NEXT_PUBLIC_ENABLE_AUTH`: TopBar/UserMenu, Sidebar dashboard visibility, sign-in/dashboard redirects, account-backed save/follow APIs.
- `ENABLE_LIVE_ANALYZE_API`: server-side live analyze provider use.
- `NEXT_PUBLIC_ENABLE_LIVE_ANALYZE_API`: Analyze page UI messaging.
- `ENABLE_LIVE_DEBATE_API`: server-side live debate use.
- `ENABLE_LIVE_JUDGING_API`: server-side live judging use.
- Public live flags do not authorize backend live work; tests explicitly guard this.

## 5. Overlap / Consolidation Proposals

The same underlying idea is repeated as multiple public concepts:

| Cluster | Routes | Consolidation |
|---|---|---|
| Topic-derived answers | `/topics`, `/questions`, `/is`, `/library` topic table | Keep `/topics` as Explore. Fold question phrasing, “is it true” answers, and high-confidence lists into topic cards/pages. |
| Argument-method education | `/concepts`, `/glossary`, `/how-it-works`, `/methodology`, `/research` | Make `/about` the visible trust/method page; show definitions inline on topic/analyze pages. |
| Learning/content marketing | `/blog`, `/guides`, `/for-educators`, worksheets | Hide from nav; preserve code/URLs initially. |
| Advanced/experimental tools | `/topics/compare`, `/perspectives`, `/lessons-from-the-deep`, Moltbook API | Hide from nav/default flows. |
| Account/social systems | `/auth/signin`, `/dashboard`, topic subscriptions, account saved API | Keep behind existing auth flag; default to local `/saved`. |
| Judging/debate experiences | `/api/debate*`, `/api/judge`, verdict-card image route, topic AI debate sections | Hide as standalone experiences; keep only contextual Analyze output if needed. |

## 6. Low-Risk Changes First

1. Remove empty directories `app/route-error-qa` and `app/__route-error-qa`.
2. Change `lib/nav.ts` visible nav to Explore `/topics`, Analyze `/analyze`, About `/about`, with `/saved` as contextual utility.
3. Remove `/how-it-works` and GitHub “Contribute” from TopBar default actions; keep Search.
4. De-link hidden Learn routes from Sidebar/Footer without deleting code.
5. Hide `/topics/compare` from Sidebar while keeping routes/tests serving.
6. Hide `/analyses` from Sidebar; add any necessary “recent analyses” affordance inside `/analyze` later.
7. Hide auth/dashboard entry unless `NEXT_PUBLIC_ENABLE_AUTH === "true"`; this mostly already exists.
8. Remove Footer links to `/community`, `/perspectives`, `/for-educators`, `/library`, `/questions`, `/is`, `/blog`, `/guides`, `/research`, `/concepts`, `/methodology`, `/glossary`, `/faq`.
9. Keep sitemap changes separate from nav pruning; many hidden routes are currently indexed and tested, so noindex/removal should be a second pass.
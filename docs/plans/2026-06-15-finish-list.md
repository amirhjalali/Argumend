# Argumend — Finish List (loop goal)

Date: 2026-06-15
Purpose: an ordered, autonomously-completable backlog for a long-running loop. Each item is independently shippable with a concrete done-criterion. Built from the 5 UI/UX audits, the 49-item recommended-vs-shipped table, `2026-05-19-comprehensive-plan.md`, and the improve-argumend cycle.

## Loop rules (apply to every item)
- **Verify before marking done:** `./node_modules/.bin/tsc --noEmit` clean + `vitest run` 206+ pass + changed route returns 200 on dev server. Evidence before claiming done.
- **Never break offline mode** — app must run with no DB/keys. Use `getDb()`, degrade gracefully.
- **Palette:** parchment `#f4f1eb`, text `#3d3a36`, teal `#4f7b77`, CTA rust `#C4613C`. NEVER amber/orange. Serif EB Garamond headings, sans body.
- **Commit cadence:** one commit per item (or per tight group), conventional-commit message. Branch off main; don't push unless asked.
- **Order matters:** Track B-schema unblocks Track D. Do tiers top-to-bottom; parallelize within a tier.

---

## PROGRESS LOG (loop state — read this first on each wake)
- Branch: `ui-improvements-2026-06`. Commits through Tier 2 on this branch (see git log).
- DONE: Tiers 0-2, Tier 3 (3.2/3.3), Tier 4 (4.1-4.5). PENDING: 3.1 (mobile decision - USER), 3.4 (RF code-split), 4.6 (nav/redirect), Tier 5 (content), Tier 6 (verification), Tier 7 (distribution drafts). NEXT: 3.4 + 4.6, then Tier 5 content.
- Dev server: `bun dev` on :3001 (may need restart). Verify each item: tsc + vitest (206) + route 200.

## TIER 0 — Land what's already done
- [x] **0.1 Commit the shipped batch** — done (`42578a2`).

## TIER 1 — Finish the cheap, high-confidence UI/trust backlog (no decisions needed)
- [x] **1.1 Provenance strip on Read Mode** — add `last_updated`/`analyzed_at` (+ `methodology_version`) to `lib/schemas/topic.ts` (optional, backfilled default), render "Analyzed [date] · Methodology v[x] · N sources" under the Read-Mode header. *Done: field in schema + visible strip + tests green.* (audit 4 C2 — top trust gap)
- [x] **1.2 Surface evidence grading + bottom-line in Read Mode** — short verdict-synthesis paragraph under the claim; render `ControversyMeter` (already built) inline; expose the 4-axis weight bars on strongest evidence. *Done: renders on a topic read page.* (audit 4 H1+H3)
- [x] **1.3 Bring engagement components into Read Mode** — mount `VerdictVoting`, Related Topics, `SaveTopicButton` ("ping me if confidence shifts" copy) at end of `ReadModeView`; swap bare reference links for `CitationCard`. *Done: components render, no dead-end.* (audit 4 H4/M2)
- [x] **1.4 Sticky pillar TOC + reading-progress bar** on Read Mode (anchors already exist). *Done: TOC jumps to pillars; progress bar tracks scroll.* (audit 4 H2)
- [x] **1.5 Fix Save button (localStorage-first)** — un-break the disabled/opacity-50 `SaveTopicButton`; persist saved topics locally; show on read + dashboard. *Done: can save/unsave without auth.* (gap #32)
- [x] **1.6 Inline glossary `<dfn>`/tooltip** for pillar / crux / verification-status / steel-man on first use. *Done: hover defs in both views.* (gap, audit 4 M5)
- [x] **1.7 Quiet edges + canvas a11y polish** — set edge `animated:false` under `prefers-reduced-motion`; confirm `aria-expanded` on all expanders (done for nodes — verify). *Done: reduced-motion has no marching-ants.* (audit 2)
- [x] **1.8 Mobile touch-target sweep** on topic detail (breadcrumb, Print, share/save chips, related-topic links → ≥44px); add `inputmode/autocomplete/enterkeyhint` to email inputs; `active:` variants on cards. *Done: targets ≥44px.* (audit 3 #4/#5)

## TIER 2 — The big builds
- [x] **2.1 Live mini-canvas hero (Experiment 01)** — new `HeroMiniCanvas` (constrained ~240px React Flow, zoom/pan/drag off, auto-expands root→pillars over ~2.5s then freezes), SSR/mobile poster fallback, behind a flag for A/B. Swap into `HomeClient` hero. *Done: animates on `/`, mobile gets poster, tsc+tests green.* (research: "largest single conversion lever")
- [x] **2.2 Topic schema migration** — add `tags`, `addedAt`, `aliases`, optional `fallaciesPresent` to `lib/schemas/topic.ts` + `buildTopic`; backfill across 109 topics; add to `topicSummaries.json` generation. *Done: fields present + typed + tests green.* (UNBLOCKS Tier 4)
- [x] **2.3 Real search (MiniSearch)** — replace `String.includes()` in `SearchModal` with a ranked index (title/claim/tags/aliases); build `searchIndex.json` at build time. *Done: ranked results, typo tolerance, 109 topics.* (gap #37)
- [x] **2.4 Collapse the triple-confidence redundancy** in `TopicDetailView` (merge KeyTakeaways+QuickStats; one verdict display). *Done: no 3× confidence number.* (audit 4 / gap #47)

## TIER 3 — Mobile strategy (NEEDS a decision: accordion-canonical vs touch-native graph)
- [ ] **3.1 [decide] Mobile graph direction** — pick: (a) make the accordion canonical + re-shoot OG/README around the reading view, or (b) build a touch-native mobile graph. Then:
- [x] **3.2 Mobile mini-graph preview** atop `MobileArgumentList` (static SVG snapshot) — safe under either choice. *Done: preview renders on phone.* (gap #21)
- [x] **3.3 Tablet (768–1023px) touch tuning** — `touch-action:none` on `.react-flow__pane/__node`; MapLegend starts collapsed below `lg`; responsive node widths. *Done: canvas usable on iPad portrait.* (audit 3 #2)
- [ ] **3.4 Code-split React Flow off the mobile bundle** (`next/dynamic` like sibling views). *Done: ~80KB off phone sessions.* (gap, audit 3 #3)

## TIER 4 — Programmatic SEO/AEO (depends on 2.2)
- [x] **4.1 `/fallacies/[slug]` hub** — the "highest-leverage SEO play"; one page per fallacy with examples + linked topics. *Done: pages render + in sitemap + schema.* (gap #40)
- [x] **4.2 `/topics/category/[slug]` landing pages.** *Done: 5 category pages + sitemap.* (gap #38)
- [x] **4.3 `/topics/tag/[slug]` landing pages** (uses 2.2 tags). *Done: tag pages + sitemap.* (gap #39)
- [x] **4.4 Per-topic RSS items** — add 109 topics to `feed.xml` (ACX/LW run on RSS). *Done: feed validates with topic items.* (gap #33)
- [x] **4.5 ClaimReview/DefinedTerm/LearningResource schema** verification + `dateModified` dynamic on topic pages. *Done: rich-results test passes.* (improve-argumend B)
- [ ] **4.6 Resolve `/explore` vs `/topics` redundancy** — pick one canonical index, 301 the other, slim nav 9→~5. *Done: one index, redirects in place.* (gap #41/#44)

## TIER 5 — Content production (token-heavy; parallelize)
- [ ] **5.1 New topics on trending controversies** — build 5–10 from `docs/research/2026-04-28-current-controversies/` (Iran-Israel, open-weight AI reg, China-Taiwan, tariffs, Ukraine terms, housing/zoning, geoengineering, RFK health, DOGE cuts, AI-2027). Follow `data/topics/us-iran-conflict.ts` format exactly; register in `data/topics.ts`; regenerate summaries. *Done per topic: passes topic schema tests, renders, in sitemap.*
- [x] **5.2 Logical-fallacy explainer blog posts** — one per major fallacy (ad hominem, straw man, false dilemma, slippery slope, appeal to authority, etc.), ~2000 words, SEO-optimized, internal links to topics. *Done: in `data/blog.ts`, passes blog tests, in sitemap.*
- [ ] **5.3 "Both sides" case-study posts** for the 10 most-trafficked topics. *Done: published, linked from topic pages.*
- [x] **5.4 Expand glossary + FAQs** (AEO queries) — add terms/Q&A to `data/faqs.ts` + glossary page. *Done: FAQPage schema valid.*

## TIER 6 — Continuous verification sweeps (token-heavy, on-thesis; from plan §6)
- [ ] **6.1 Primary-source verification pass** — for each topic, trace every evidence claim to its primary source; flag link-rot / retractions / mis-cites into `docs/reviews/<topic>.md`. (makes maps LLM-citable)
- [ ] **6.2 Adversarial map review** — per topic, an agent argues each side's strongest case, flags weak claims, proposes missing cruxes/evidence; output prioritized critique to `docs/reviews/`. Founder triages.
- [ ] **6.3 Confidence-score audit** — re-derive each topic's computed confidence from its evidence; flag scores that don't match the evidence weight. *Done: discrepancy report.*

## TIER 7 — Distribution drafts (token-bound staging; founder approves/sends)
- [ ] **7.1 LessWrong launch essay DRAFT** on AI consciousness, anchored to the live map, ACX register, epistemic-status preamble, anonymous/institutional voice. *Done: draft in `docs/drafts/` for founder edit.* (NOT auto-published)
- [ ] **7.2 Gatekeeper DM drafts** — custom per gatekeeper (Scott, Zvi, Liron, habryka), each referencing their work + a gift-mapped version of one of their posts. *Done: drafts in `docs/drafts/`.*
- [ ] **7.3 Grant application drafts** — tailored drafts for Manifund + ACX Grants (+ FLF, SFF stubs), current metrics filled. *Done: drafts in `docs/drafts/`.*
- [ ] **7.4 Multi-format packaging for the launch topic** — Twitter/Bluesky thread, NotebookLM audio script, 60s short script, share-card variants. *Done: assets in `docs/drafts/`.*

---

## Decision points to resolve before/within the loop
1. **3.1 Mobile graph direction** (accordion-canonical vs touch-native) — strategic.
2. **Content volume** for Tier 5 (how many topics/posts) — set a target.
3. **Tier 7 voice** — confirmed anonymous/institutional (see `launch-decisions-2026-06`); drafts only, never auto-send.

## Conflicts already flagged (don't ship contradictions)
- Hero experiments 01/02/03/04 are mutually exclusive — only 2.1 (mini-canvas) is in scope.
- Map-as-banner (exp 09) is **superseded** by Read Mode — skip.
- Onboarding: ship a single one-line hint, NOT a multi-step tour.

# Argumend — Remaining high-value work (fresh audit, 2026-06-30, after 6 campaign cycles)

Read-only re-audit by a dedicated reviewer agent. The product is in genuinely good shape; **content
(blog/guides/FAQ/glossary/is-claims) is abundant — STOP adding content, it's low marginal value now.**
Remaining value clusters: (a) one perf leak on the SEO money pages, (b) a few HALF-LANDED
consolidations from the rapid cycles, (c) two founder-owned structural bets (A, E) that each have a
safe autonomous slice. No hard "broken" P0; one P0-to-verify (auth env).

Prioritized (highest leverage first). A=autonomous, F=founder-owned.

1. **[A · M · perf] Stop client-bundling the full topic corpus on `/topics/[id]`.** `ReadModeView.tsx:20`
   and `TopicPageClient.tsx:4` (`"use client"`) import `{ topics, getCrossCategoryRelated }` from
   `@/data/topics` (~150 files / 4.5MB source) → the whole corpus ships as client JS on the PRIMARY SEO
   pages / default read view. Server already resolved the topic. Pass `topic`+related as props; drop the
   import. → **handled in cycle 7 (perf7 agent).**
2. **[A · M · P1 regression] Category/status color SOT only half-landed.** 5+ pages still define local
   conflicting maps with emerald (science=green, settled-status=green → reintroduces the "green=true"
   verdict signal Bet C killed) and no dark variants: `app/dashboard/page.tsx:32`,
   `app/saved/SavedClient.tsx:28`, `app/topics/tag/[slug]/page.tsx:55`,
   `app/topics/category/[slug]/page.tsx:36`, `app/topics/compare/[id1]/vs/[id2]/ComparisonView.tsx:48`
   (+`CompareIndexView.tsx:63`). Migrate to `lib/categoryColors.ts`; extend the guard test to grep the
   whole repo for local category/status color maps.
3. **[F · P0-to-verify] Auth dead-ends live.** Disabled "Sign in" (`UserMenu.tsx:9`) + Subscribe bell
   (`SubscribeButton.tsx:12`) render site-wide; "Dashboard" (`Sidebar.tsx:36`) bounces logged-out users
   to a Google sign-in wall and duplicates the working no-auth `/saved`. **Verify AUTH_GOOGLE_ID/SECRET
   in prod or it may throw.** Founder call (does auth ship?). Safe interim: drop the disabled controls,
   repoint Dashboard→/saved.
4. **[A · S · SEO] Remove ClaimReview JSON-LD from topic pages** (`app/topics/[id]/page.tsx:114-136`).
   Contradicts cycle 4's deliberate no-ClaimReview decision (Google restricts it to vetted
   fact-checkers; misuse risk on ~150 pages). Article+FAQPage already cover the page.
5. **[A · S · honesty] Drop the undeliverable promise** "Save … to get pinged if its confidence score
   shifts" (`ReadModeView.tsx:456`). No notification sender exists; scores are static; Save is
   localStorage-only. Let the newsletter block below carry conversion honestly.
6. **[A-slice · S/M · Bet A] Preserve topic+view in the URL** instead of `history.replaceState({}, "", "/")`
   (`HomeClient.tsx:145`); append `?view=graph` to graph-view share links (`TopicDetailView.tsx:1045,1056`,
   `ShareVerdictCard.tsx:93`). Founder core: what "Map" means (canvas vs TopicDetailView scroll page) +
   collapsing the 3 topic renderings.
7. **[A · M · WCAG-AA] Finish the contrast pass.** Bare `text-stone-400` (~2.2:1) remains on ~9 page
   templates (fallacies, concepts/[slug], blog & topics category/tag eyebrows) + `ControversyMeter.tsx`,
   `research/page.tsx`, `dashboard`, `EvidenceNode.tsx:142`, `DebateView.tsx:358`, `VerdictVoting.tsx:233`.
   Mechanical swap to `text-muted`.
8. **[A-slice · M · Bet E] One nav config.** Sidebar + Footer are two divergent hardcoded arrays
   (/questions unreachable from sidebar; groupings disagree). Extract `lib/nav.ts` (every route once),
   derive both; default the Learn accordion open on desktop (`Sidebar.tsx:81`). Founder core: the 12-item
   Learn card-sort.
9. **[A · S · a11y] MobileArgumentList still uses the incomplete tablist anti-pattern**
   (`MobileArgumentList.tsx:312-335`) — mirror ViewToggle (`role="group"` + `aria-pressed`).
10. **[A · S · SEO] Delete `public/robots.txt`** — it conflicts with `app/robots.ts` (static one blocks
    `/analyze`, which is in the sitemap → Search Console error; doesn't block /dashboard,/embed).
    `app/robots.ts` is the source of truth.
11. **[A · S · cleanup batch]** delete dead `components/TopicExplorer.tsx` (1106 lines, 0 imports, filters
    already lifted); `timeRequired` → ISO-8601 `PT12M` (`guides/[id]/page.tsx:110`); OG image hardcodes
    "50 Topics" → ~150 (`opengraph-image.tsx:69`); add noindex to `/analysis/[id]`; `useModalAccessibility`
    restore focus to trigger on close; off-palette `yellow-*` in `JudgingResults.tsx:405`.

**Diminishing returns (do NOT spend cycles):** more blog/guide/FAQ/glossary/is-claim content; canvas dark
mode; legend SOT core; markdown; reduced-motion; /api/v1; TOC/anchors; blogIndex split; security — all
verified essentially done.

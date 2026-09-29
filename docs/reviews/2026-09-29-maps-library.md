# Maps library: /topics without the scoreboard, and an embed without a verdict (2026-09-29)

Branch `ux/maps-library`, on `ux/site-overhaul-2026-09-29` (shell foundation, topic template and
home/story merged in). Evaluation it answers: `scratchpad/findings/2-topics.md` F3, F6 (/topics sorts
and filters, category/tag cards, compare), F7 (the /ai link), F9.

## What changed

**/topics is a library, not a league table.** (`app/topics/TopicsPageClient.tsx`, `app/topics/_query.ts`,
`app/topics/page.tsx`)

- Removed the orders "Most settled", "Most contested", "Strongest for", "Strongest against", the
  evidence-balance range and the status filter (and the "Filters" disclosure that held them). What is left:
  search, the category tabs, and a neutral order: mixed categories (default), by category, A–Z. Old URLs
  with `?sort=balance-desc`, `?min=`, `?max=` or `?status=` still load; the unknown values are dropped and the
  URL is rewritten clean. There is no "Recently added": no topic carries an `addedAt` date.
- Rows show the status in words, muted stone: "Evidence largely converges / still divided / still thin".
  No chips, percentages or colours on the rows.
- **Start here** pins the three new-model maps, titled as their questions, from the lightweight
  `argumentTopicIndex` (the same registry SearchModal uses; /topics no longer parses three graphs per
  request). Under it, one quiet link to `/ai`. Under a category, a search or the saved filter, the maps join the
  list itself instead, first, with a "Debate map" chip, and each sits on a shelf (`DEBATE_MAP_CATEGORY`:
  AI unemployment under Technology, capitalism under Economics, U.S.–Israel under Policy; typed by the
  registry, so a new map without a shelf fails the type check).
- Search matches titles, claims, taglines, aliases and tags, and reads hyphens as spaces, so `?q=public-health`
  (the old tag URL) finds what it used to. `?q=` seeds the box on the server. Search result pages are
  `noindex, follow`.
- **Saved on this device (n)** appears only when this browser has saved maps the library can list (read from
  `useSavedTopicIds`; flagship ids count). It narrows the list; it never goes into the URL.
- Header is `PageHeader` + `PageContainer` (title "Maps", matching the nav); `TextAction` for the /ai link and
  "Clear all filters"; `Chip` for the "Debate map" kind label. On a 390px phone the first map question is on the
  first screen.

**Category, tag and compare pages are gone.** All four are 301s in one commented "maps library" block in
`next.config.js`:

| Old URL | Now |
|---|---|
| `/topics/category/:slug` | `/topics?category=:slug` (query such as `?page=2` carried over) |
| `/topics/tag/:slug` | `/topics?q=:slug` |
| `/topics/compare` | `/topics` |
| `/topics/compare/:a/vs/:b` (any depth) | `/topics` |

They were linked from nowhere but the sitemap (grep found no other in-app links, and none in `public/` or
`data/`). Removed from `app/sitemap.ts`, the proxy matcher (`proxy.ts`), the early-404 policy
(`lib/dynamicRoutePolicy.ts`, which no longer reserves those segments) and the guard-test file lists.

**The embed shows what a map is for.** (`app/embed/[topicId]/page.tsx`, new `_model.ts`)

- Before: "VERDICT · Scores came out even · Margin 0.2", a Balance/Weight /100 readout, three For and three
  Against snippets, no crux; new-model maps 404'd.
- Now, in the map page's order: the question (older maps add "The claim: …" under their label title), what
  the sides already agree on, **the question it turns on** (the first crux on the map page) with **what would
  settle it** (the page's own `SettleAnswer`: teal test, "in time" for future observables, brown standing line
  when nothing can), then "Read the whole map on Argumend →" (new tab) and "N questions in all". No verdict,
  margin, balance, score or winner on any map.
- It reads the topic page's model rather than a second adapter: older maps through `legacyTopicPage`
  (`lib/topicPage/legacy.ts`), new-model maps through `loadArgumentTopic`'s ledger-aware crux ranking, the
  authored `agreementClaims` and `settleMode`, the same way `DebateView` builds the page.
- New-model maps render and prerender, the proxy lets them through, and the Embed action is back on their pages
  (`DebateView` sets `embeddable: true`).
- Same contract: URL `/embed/:id`, the snippet from `EmbedButton` (width 100%, height 400) is unchanged, framing
  headers unchanged. There was no `?theme=` parameter; the widget follows the viewer's colour scheme.
- Size, measured on all 159 maps: at 600px wide the tallest is 594px (median 543px); at 390px, 610px (median
  583px). A 400px iframe shows the question, the agreement and the start of the crux, and scrolls for the rest.
  To get there: older maps show two agreement lines (every one already speaks for both sides), new-model maps
  their authored set of up to three; long texts clamp at two to three lines.
- The not-found state is a plain header plus a `TextAction` to the maps.

## Removed files

- `app/topics/category/[slug]/{page.tsx,_config.ts,page.test.ts}`
- `app/topics/tag/[slug]/{page.tsx,_config.ts,page.test.ts}`
- `app/topics/compare/{page.tsx,page.test.ts,CompareIndexView.tsx,CompareIndexView.test.tsx,_config.ts,comparisonPairs.ts}`
- `app/topics/compare/[id1]/vs/[id2]/{page.tsx,page.test.ts,ComparisonView.tsx,ComparisonView.test.tsx}`
- `lib/taxonomyLabels.ts` and its test (only the tag page used it)
- The embed's inline `VerdictBanner` and `ArgumentCard`; the route no longer imports `getMockVerdict` or
  `BalanceWeightReadout` (both still used elsewhere: `/api/verdict-card`, `/is/[slug]`, `/questions/[slug]`).

## Tests

- `app/topics/page.test.tsx` (rewritten): only neutral orders, no slider/"Evidence balance"/"Most settled";
  old scoreboard params dropped; Start here pins every registered map as a question plus the /ai link; the
  maps join a filtered list first; search by title/tagline/alias and `?q=` tag slugs; the saved filter's
  appearance, count and narrowing (and that it stays out of the URL); order and pagination; search pages noindex.
- `app/embed/[topicId]/page.test.tsx` (new): legacy with and without falsification data, a new-model map, the
  authored agreement staying within "agreed" claims, prerender params, and a sweep of **every** map asserting no
  verdict/margin/score/winner in the widget's chrome and none of the old readouts anywhere.
- `next.config.test.ts`: the four 301s. `lib/dynamicRoutePolicy.test.ts`: `/embed/ai-mass-unemployment` passes.
  `app/sitemap.test.ts`: no `/topics/category`, `/topics/tag` or `/topics/compare` entries.
- `components/topic/TopicPage.test.tsx`: flagship pages now offer Embed.

## For the founder

- The h1 is now "Maps" (the nav's word); the `<title>` is still "Explore Topics — 150+ Controversial Issues
  Analyzed". Left for the copy/SEO pass.
- The mixed default still deals each category's maps fullest-evidenced first (by `weight`, how much a map has
  gathered, never which side it favours). A–Z is one tap away if even that reads as ranking.
- The legacy embed's "what would settle it" is the pillar's test, as on the page; for some maps the test
  settles the pillar more than the live disagreement shown above it (nuclear: deaths-per-TWh vs. how to weigh
  tail risk). That is the topic template's data gap (a) — authored crux questions — not an embed choice.

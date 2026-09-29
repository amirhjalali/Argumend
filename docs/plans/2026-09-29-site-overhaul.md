# Site overhaul (2026-09-29)

Founder, 2026-09-29: "need a full evaluation of the argumend site. some pages suck not sure how they
look in mobile but overall the website is very far from the vision and is not consistent or easy to
understand. … just go hard on making the website an amazing to use experience."

Integration branch `ux/site-overhaul-2026-09-29`, stacked on `north-star/ledger-v1` (local, unpushed).
Driver: Opus 5.5. Nothing is pushed without the founder's OK.

## Evaluation

Five reviewers, 47 routes captured at 390 and 1440, interaction shots, a code audit of every
`page.tsx`, and a curl check of production. Reports: `docs/reviews/2026-09-29-site-review/`
(`1-vision-shell`, `2-topics`, `3-paste-tools`, `4-content`, `5-design-system`; `0-brief` is the
shared rubric). Founder-facing summary: https://claude.ai/artifact/KqxDSyVBxX1Y4GnkRuUqzo

Headline: the newest pages (`/ai`, flagship maps, `/reply`) already read like the north star, but
everything a visitor reaches first contradicts them — home's CTA opens the legacy scoreboard canvas,
every paste link lands on the one tool that still scores sides (the only one live in production),
and About/methodology/FAQ describe an AI judge council that does not run. Nothing is shared at the
component level: 6 page frames, 12 header styles, 14 button styles, 36 card recipes, 7 widths; the
header scrolls away (`overflow-x: hidden`); `/is` and `/questions` (~390 SEO pages) have no nav.
Phones: no horizontal overflow anywhere; the problem is length (crux 4–5 screens down).

## Target

```
Header (every route, sticky)   Maps · Paste an argument · Learn · About   [search] [theme]
Maps               /topics      one crux-first template for all maps
Paste an argument  /analyze     one flow: diagnosis (if a lane is on) + the map it belongs to
Learn              /learn       ideas · guides · fallacies · glossary · essays · teachers
About              /about       why · principles · reading a map · how maps are made
```

## Driver decisions (logged, reversible)

1. Primary nav = Maps · Paste an argument · Learn · About, from `lib/nav.ts` only. Saved leaves the
   primary nav. The sidebar is retired as navigation (it listed data-file rows 1–8 and duplicated the
   top bar). One theme icon button instead of the three-button toggle.
2. `/ai` stays out of nav and home until the founder has read the ledgers (09-22 decision #10).
3. Brand CTA = rust-600 → rust-700 gradient (the palette note in memory), one radius (`rounded-lg`),
   via `components/ui/Button` and `.btn-primary`.
4. Paste: one flow at `/analyze`. Judging and side scores are removed from every paste surface. With
   no AI lane configured (production today) the result is the offline map match
   (`lib/mapReply/prefilter.ts`); with `ENABLE_DISAGREEMENT_V2` + a provider, the six-box diagnosis
   sits above it. `/analyze-v2`, `/analyses` → `/analyze`. `/reply` output describes turns, never
   named people.
5. The React Flow canvas leaves home; it survives as a diagram view per topic without the Scales and
   Debate tabs. `/?topic=X` redirects to the topic.
6. Topic pages converge on one crux-first template (question → what both sides agree on → cruxes with
   what would settle them → positions → reflection → actions; scores folded). Legacy data gaps (46 maps
   without falsification blocks, ~330 pillars without a crux question) are rendered gracefully, not
   invented.
7. Content consolidates under `/learn` with one article and one index template; every move gets a
   301; nothing indexed is deleted without a target. `/is/*` → `/questions/*`; `/library` →
   `/research`; `/lessons-from-the-deep` → `/blog`; `/how-it-works`, `/community` → `/about`.
8. Copy follows one voice: sentence case, "map" not "debate map", no scores/winners/"settled"/judges,
   no mission-speak.

## Waves

- **Wave 1** (foundation, copy): `ux/shell-foundation` — one shell, nav, sticky fix, every route in
  the shell, `components/ui` primitives, search without lean labels, dead code removed.
  `ux/copy-sweep` — data-file copy (FAQ, guides, blog, research, concepts, glossary).
- **Wave 2** (page sweeps, parallel, on top of wave 1): home + story pages; topic template + embed;
  paste flow; learn hub + content templates; topics periphery + remaining pages onto primitives.
- **Wave 3**: re-capture all routes, independent review per branch, fixes, then vitest / tsc / lint /
  `bun run build` from the main checkout.

## Founder decisions (open)

- `/ai` in nav and on home.
- Turn on the diagnosis lane in production (`ENABLE_DISAGREEMENT_V2` + provider key).
- Legacy map authoring (falsification blocks for 46 maps; one crux question per pillar).
- Push / PR.

## Outcome (2026-09-29, ~08:00 UTC)

Nine branches merged into `ux/site-overhaul-2026-09-29` (first-parent: copy-sweep, shell-foundation,
topic-template, home-story, paste-flow, maps-library, learn, fixups-1, polish), plus a citation fix
and CLAUDE.md updates. 402 files, +18.8k / −31.3k (net ~12.5k lines removed). Every branch had
screenshots before/after; an independent code review ran on the first five merges and its findings
(one blocker: diagram blank on phones) were fixed in `fixups-1`. Reports per branch:
`docs/reviews/2026-09-29-{copy-sweep,topic-template,home-story,paste-flow,maps-library,learn,fixups-1,polish}.md`.

Verified on the final tip: `bunx vitest run`, `bunx tsc --noEmit`, `bun run lint`, `bun run build`
(main checkout), standalone server with production flags (all AI lanes off): 866 internal paths
crawled, no broken links, every retired URL resolves in one hop.

Phone page heights at 390 (before → after): home 5,626 → 3,945; nuclear map 9,558 → 4,701;
climate map 12,838 → 5,203; glossary 20,868 → 4,984; /questions 12,158 → 4,294; FAQ 7,821 → 2,778.
First crux on topic pages: ~4–5 phone screens → 1.5–2. Small tap targets on the flagship map 60 → 2.

## Open for the founder (ranked)

1. **Push / PR.** Everything is local. The branch sits on `north-star/ledger-v1` (itself unpushed,
   on PR #7 → PR #6). Deploy prerequisites from those PRs still apply (`TRUSTED_PROXY_HOPS=2`).
2. **`/ai` exposure.** Not in nav or on home, per the 09-22 note; the maps-library pass added one
   quiet link under "Start here" on `/topics`. Keep, remove, or promote to nav.
3. **Diagnosis lane in production** (`ENABLE_DISAGREEMENT_V2` + provider key). Off = the paste tool
   gives the offline map match only. The "Did this change what you thought you were arguing about?"
   answer is not recorded (the gap-metric schema doesn't accept it).
4. **Legacy map authoring.** 110 legacy titles are labels, not questions; legacy crux headings are
   long `live_disagreement` sentences (median ~236 chars); 46 maps have no falsification block (no
   agreement, hook or mind-change lines). The template renders what exists; this is writing work.
5. **Sitemap.** Learn/content routes are still out of the sitemap (08-21 pruning). Recommendation in
   `docs/reviews/2026-09-29-learn.md`: add `/learn`, concepts, guides, fallacies, glossary,
   research, for-educators, perspectives, blog, and primary `/questions/*`.
6. **Blog titles** remain Title Case (search titles); 18 authored question texts use "verdict",
   "winner" or "settled" (listed in `docs/reviews/2026-09-29-fixups-1.md`).
7. **Server code with no UI** (candidates to delete): `api/debate`, `api/judge`, `api/verdict-card`,
   `lib/judge`, `lib/debate/offline`, mock debate/verdict data, `BalanceWeightReadout`.
8. **Match thresholds** for the paste map lane (15, 1.5×, 8) come from ~15 test pastes; re-check on
   real ones. Rows saved by the retired analyzer are still served by `GET /api/analysis/[id]` when a DB
   is connected — delete or keep.
9. **Diagram route** (`/topics/[id]/map`) still has placeholder nodes, stock photos, "/40" badges and
   some overlap at 1440 — it is noindexed and linked quietly; needs its own pass or removal.

## Round 2 (2026-09-29, 19:20–21:35 UTC, branch `ux/round2-2026-09-29`, not deployed)

Founder: "can we do some more rounds of improvement here? have some extra tokens to burn for the next
7 hours". Off `main` f9e9db9; 16 first-parent merges/commits, 326 files, +10.5k / −5.0k. Reports:
`docs/reviews/2026-09-29-r2-*.md`.

- **Map questions** (all 156 legacy maps): `topic.question` headlines (h1, lists, `<title>`) and a short
  `crux.question` on every pillar (≈ 430 cruxes; median heading 188–240 → ~90–96 chars). The echoed
  "The claim:" line is dropped under a question headline. A test enforces format on every map.
- **Agreement and mind-change lines** for the 46 maps that had none (140 pillars), grounded in each
  map's own text; every legacy map now has them on every pillar.
- **Side audit:** 47 pillars in 23 maps had their side texts filed backwards (the argument for the
  claim filed as "skeptic"); moved verbatim and pinned by a regression test. Two self-contradicting
  figures fixed; neutrality pass on five sensitive maps. Open: see the audit report's suspect list.
- **Paste matching:** rebuilt index + decision rule, eval set of 153 labelled pastes
  (`data/evals/paste-matching/`): right map named 51% → 86%, wrong map 11.6% → 1.2%, off-topic named
  0; siblings shown as "Closely related". Mind-change lines are kept out of the index.
- **Accessibility / dark mode:** axe clean on 32 routes × 390/1440 × light/dark (42 violating nodes
  → 0); one theme-aware focus ring (`ring-focus`) passing 3:1 everywhere, guarded by a test; live
  announcements for paste results.
- **Performance:** Lighthouse mobile 84–87 → 89–93 on nine pages, LCP −0.5 to −1.1 s (upright fonts
  only preloaded, a 36 KB phone background, home and diagram bundles trimmed).
- **Diagram view** rebuilt from the topic page's model (question → crux questions → sides →
  evidence), no overlaps on any map, fitted on load (74–94% zoom), keyboard operable; old canvas code
  and the katex packages removed.
- **E2E:** 30+ Playwright tests (phone and desktop) in a new CI job.
- **Links to a crux** now open that crux's fold.

Verified on the final tip: vitest 3,003, tsc, lint, `bun run build`, e2e 32 passed / 2 skipped against
the standalone server, link crawl 866 paths with none broken, the live-site nuclear paste now matches.

Open from round 2: `immigration-national-identity` supporters' text says "progressives want
demographic change" (an unsupported motive claim; left as that side's voice for the founder);
`/questions` ships ~8 KB of unused client code; the flagship's closed "Researcher mode" fold is 161 KB
of markup; `/topics` renders client-side; warming the paste index at boot.

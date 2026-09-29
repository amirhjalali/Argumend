# Ledger-v1 run: handoff (2026-09-22 21:20 → 2026-09-23 01:20 UTC)

Branch `north-star/ledger-v1`, stacked on `north-star-2026-09-22` (PR #7) → `jev-program` (PR #6).
**Local only; nothing pushed.** Driver: Opus 5.5. Planner: Fable. At most 5 agents at once; no
`claude -p` CLI-lane runs. Every code branch had an independent reviewer; design-push and
color-signals were reviewed after merge (findings merged). ~25 first-parent merges,
~395 files, +14.0k / −2.6k. Final state: `bunx vitest run` 242 files / 2866 tests green,
`tsc --noEmit` clean, lint clean, `bun run build` from the main checkout green, standalone server
smoke-tested (/, /ai, both AI maps, /topics, /sitemap.xml → 200).

## 1. What the run produced

The crux ledger exists end to end. A typed, validated, append-only ledger per map
(`data/argument/*.ledger.json`) is consumed by the crux engine at candidacy and selection only
(score formula unchanged; an empty ledger reproduces today's ranking byte-for-byte, frozen in a
baseline test) and rendered as a dated "How this has moved" timeline on redesigned crux cards.
The two AI maps carry hand-authored, web-sourced ledgers (every entry re-checked against its source
by a second agent). A Covid ledger (36 entries over an unregistered 15-claim draft graph) proves the
format with real `resolved` and `unresolvable` rows. `/ai` pools the AI cruxes, shows what has moved
since a date, and folds a changelog — zero client JS, in the sitemap, not in nav.

Alongside: a site-wide design push. Verdict-first panels neutralised, dark mode repaired, home
rebuilt around "What would change your mind?", `/topics` as a calm grouped list, `/analyze-v2` and
`/reply` read as one document, colour now carries meaning (no green/red truth signals; crimson =
cruxes; stone status chips; one rust fill per page on rust-600), judge council never names a
winner. A launch post + five social drafts are in `docs/drafts/2026-09-22-crux-ledger-launch.md`.

## 2. What merged (in order)

| Branch | What it does | Review |
|---|---|---|
| covid-factcheck | Covid retrospective: all 15 rows cited; 12 corrected; 4 overstated rows → narrowed | docs |
| ledger-code | `types/cruxLedger.ts`, Zod schema + validator, disk loader, movement strip, empty-ledger regression | 6 fixes (corrections could never render; cross-claim supersede; verdict-word check; contrast; future dates) |
| ledger-capitalism-after-ai | 7 entries, 5 cruxes | content-reviewed |
| ledger-ai-mass-unemployment | 16 entries + 10 evidence nodes / 11 edges | content-reviewed; baseline regenerated (top 5 unchanged) |
| covid-ledger | `covid-what-ended` draft (unregistered) + ledger; 3 legacy node-text fixes | validator rules later tightened |
| design-push | Audit + first fixes (tokens, ~90 dropped Tailwind classes, serif prose, home hero) | review-design: 7 dark-mode regressions, 2 more dropped classes, VerdictVoting copy |
| rank-ledger-status | Spec §1.3 rules in `identifyCruxes` | 3 fixes (resolved drops now reported; unresolvable guarantees membership without reordering) |
| ai-living-map | `/ai` | 6 fixes; length 11.8k → 7.1k px mobile |
| home-library | Home in four beats; `/topics` list, mixed default order | layout-jump + contrast fixes; driver calls applied |
| crux-card-design | One ruled sheet, "What would settle it" first, tally, timeline, `standingLineFor`, `/ai` link on AI maps; ReadModeView order; cruxNotes de-verdicted + guarded | 6 fixes |
| paste-lanes-design | `/analyze-v2` + `/reply` | fold "turn by turn" on phones; no network lanes used |
| review-ledgers | Every entry of all three ledgers checked against its source | many corrections (below) |
| color-signals | Colour carries meaning; tokens `text-accent-text`, `text-crux-text`, `--rust-text-rgb`; CTAs rust-600 | post-merge review (see §6) |
| ledger-rules | `resolved` never with value/definitional kind; leaving resolved/unresolvable is editorial-only | — |
| final-qa | 60 page loads, 155 links OK, no hydration warnings; /how-it-works heading | findings in §4 |
| quick-wins | Judge council: no winner; one newsletter signup; one theme toggle per viewport | — |
| launch-post-draft | Docs only | facts updated after ledger review |

Net effect on the live AI maps: top-5 order and scores unchanged; cards show ledger status and
dated movement.

## 3. Decisions the driver made under your delegation ("I think you can decide on this yourself")

- **Ledger semantics:** `date` = source date + `noticedAt` = when recorded; `resolved` never before a
  future-observable horizon; model authors never write `resolved`/`unresolvable`; `resolved` may not
  carry value/definitional kinds; reopening a closed crux is editorial-only; corrections retire an
  entry only if public; curator prints as "Argumend editors".
- **Ranking:** unresolvable guarantees membership, doesn't jump the queue.
- **`/ai`:** sitemap yes, nav no, quiet link from the two AI maps; "What has moved since" (source
  date); six cards; changelog folded; standing line varies by fork kind (value / definition / who decides).
- **Content:** mass-unemployment definition crux → unresolvable/definitional (matches capitalism);
  Stanford figure kept at 16% but labelled "relative to less-exposed peers" everywhere, chart
  endpoint Sep '25; FRED labor share 93.446 (−19.4); Census "2% of AI-using firms"; cruxNotes
  softened ("is right on the mechanism" → "gains its mechanism", etc.).
- **Design:** legacy verdict panel/meter neutralised; vote reads "Where do you land, for now?";
  crimson reserved for cruxes (contested → stone; FalsificationCrux neutral paper + crimson rule);
  filled CTAs rust-600 site-wide (white 5.0:1 vs 4.1:1); Analyze is an ordinary nav item; newsletter
  Subscribe in ink; `/topics` mixed default order; dead mini-canvas removed; judge council shows
  "where the judges' reasoning concentrated" instead of a winner.

## 4. Decisions still yours (ranked)

**Cohesion / north star**
1. **Shell seam (biggest QA finding).** Flagship topic pages and `/ai` have only a thin
   home/explore row; the rest of the site has sidebar + top bar. *Rec:* put flagship + `/ai` inside
   the AppShell (or deliberately move the whole site to the lighter shell) — one decision, one pass.
2. **Crux styles:** `/ai` now matches the topic sheet; the home page's worked-example block is the last different one. *Rec:* align it too.
3. **Legacy scoreboard framing** on ~150 legacy topics: "Established · 97%", "SCIENCE, BROADLY
   SETTLED", the vote with per-option percentages, `/faq` "confidence scores", dashboard
   "Winner: …". *Rec:* a legacy-wide pass (remove percentages; status words only).
4. Should `narrowed` clear "evidence-starved" when the entry cites no graph evidence? *Rec:* no.
5. Register `covid-what-ended` as a page? *Rec:* not yet (meta-level positions; ranking there is
   layout-driven).

**Ledger content (editorial)**
6. 16% (Nov 2025, firm-controlled) vs 19% (Aug 2026 update, descriptive) as the flagship headline.
   Currently 16%, correctly labelled.
7. `c-targeted-programs-can-help` narrowed on generic WIOA training — keep or → open?
8. Capitalism ownership `2026-04-13` narrowed while evidence points to more concentration — keep or → open?
9. Hosseini–Lichtinger date unverified (SSRN blocked); Covid "Unresolvable since Feb 1905"
   (Jacobson) if the Covid map ever renders the track.

**Launch**
10. Link `/ai` from home? *Rec:* yes, after you read the ledgers.
11. Launch post: name Anthropic's CEO as the 10–20% forecast source? Meta description is ~270 chars
    (search cuts ~155). Entries were all recorded 2026-09-22 and back-dated — don't imply tracking since 2023.

**Design**
12. "Settled" is stone on status chips, teal on the verdict chip — pick one.
13. Philosophy category colour is crux crimson.
14. Dark-mode rust text 4.29:1 (just under AA) vs a non-tangerine dark rust token; dark rust
    `#d4805f` near terracotta — your eye.
15. Unresolvable marks use brown (the skeptic colour) — swap to stone?
16. Crimson on error / char-limit text in `/reply`; Tailwind `red-*` error states site-wide vs
    `accent.error`.
17. `DebateView` `POSITION_ACCENTS` cycles positions through teal/rust/brown/crimson.

**Schema (week 2+)**
18. A "stopped mattering" resolution kind, causal/value/trust epistemic types; unreviewed model
    proposals failing the build → warnings once the week-4 queue exists; surface
    `droppedByLedgerIds` anywhere?

## 5. Risks and follow-ups

- **Back-dating:** all AI ledger entries recorded 2026-09-22; dates are the sources' dates.
- **Crux-recall harness** named test 3 (offshoring in top 10) now rank 15 after the new evidence;
  the harness was red before and after.
- **Memory/palette:** CTA fills moved rust-500 → rust-600; project memory still says rust-500.
- **`/d/[slug]`** not live-rendered (needs a DB). `/analyze-v2` consent line names "TypeSafe AI or
  Anthropic" even in the fake lane (`lib/aiProviders.ts`).
- **Fake-lane copy** on `/analyze-v2` is clumsy (`lib/disagreement/projectReport.ts` + fixtures).
- **Ops:** the disk filled at ~22:40 UTC (ENOSPC) with five worktrees each holding `.next` and
  `node_modules`; freed by deleting build caches. Builds inside worktrees fail at the standalone copy
  step (extra lockfile → wrong root); build from the main checkout.
- PR #6 prerequisites unchanged: `TRUSTED_PROXY_HOPS=2` in Coolify at deploy.

## 6. Late items (merged at wrap-up)

- **color-signals post-merge review:** no functional regressions (rust-600 sweep one-to-one,
  progress bars untouched, tokens compile, OG route 200, nav active state clear). Fixed the missed
  consent-line link; the driver then moved the remaining 24 `dark:text-deep-light` uses (3.71:1)
  to `text-accent-text` (7.82:1). Open: the Technology *category* chip is stone like the status
  chips; "contested" can appear twice on a card (verdict chip + status chip).
- **qa-fixes:** /how-it-works describes today's topic pages; `/api/topic-views` returns an empty
  list (200) when the DB stack can't load; the flagship block only shows under "all" on /topics;
  breadcrumb separators never start a line; "A hidden assumption:" wording.
- **quick-wins:** the judge council shows where the judges' reasoning concentrated, never a winner
  (`ShareVerdictCard` not yet checked); one newsletter signup per topic page (topic signups now
  count as "footer"); one theme toggle per viewport.
- **ai-crux-style:** `/ai` uses the topic-page crux sheet (numerals are per-map ranks: 1, 1, 2, 2…).
  QA item 2 is now down to two styles (sheet vs the home page's worked-example block).
- **Final verification (00:58 UTC):** 242 files / 2866 tests, tsc, lint green; `bun run build` from
  the main checkout green; standalone server returns 200 for /, /ai, both AI maps, /topics,
  /topics?category=science, /how-it-works, /api/topic-views, /sitemap.xml, /api/og/…; the AI map
  page carries the /ai link.

## 7. How to review

Screenshots (before/after, 390/1280–1440, light/dark) under `docs/reviews/2026-09-22-*`:
design-audit, ledger-strip, crux-card, ai-living-map, home-library, paste-lanes, color-signals,
final-qa. Reports: `docs/reviews/2026-09-22-design-audit.md`, the three
`docs/research/2026-09-22-*-ledger-sources.md`, the fact-checked Covid retrospective, and
`docs/drafts/2026-09-22-crux-ledger-launch.md`.

```bash
git checkout north-star/ledger-v1
bunx vitest run && bunx tsc --noEmit && bun run lint   # plain `bun test` hangs in this repo
bun run build                                           # from the main checkout, not a worktree
bun dev   # /, /topics, /topics/ai-mass-unemployment, /topics/capitalism-after-ai, /ai
ENABLE_DISAGREEMENT_V2=true ARGUMEND_DISAGREEMENT_PROVIDER=fake bun dev   # /analyze-v2 on fixtures
git log --first-parent --oneline 8c4fbac..north-star/ledger-v1
```

## 8. Draft branches for comparison (not merged)

- **`north-star/legacy-scoreboard`** (5 commits on acf5833, tests/tsc/lint green): answers §4 item 3.
  Legacy topic pages drop percentages ("This fact: Established", no "· 97%"); headers describe the
  evidence ("evidence largely converges / still divided / still thin"); the vote keeps voting and
  the map comparison but hides crowd percentages ("You're not alone — readers land all over this
  one."); FAQ "confidence scores" → "How does the map weigh evidence?"; dashboard "Winner: …" →
  "Completed". Data fields untouched. Deliberately left: the verdict readout wording from
  `getVerdict` ("Settled — evidence strongly favors the claim"), the vote's 57/100 balance line,
  "Settled" enum labels elsewhere. Screenshots: `docs/reviews/2026-09-22-legacy-scoreboard/` on
  that branch. To take it: `git merge north-star/legacy-scoreboard`.
- **`north-star/shell-seam`** (1 commit `9cf4f8f` on acf5833, tests/tsc/lint green; build not run):
  answers §4 item 1. Flagship topic pages and `/ai` render inside AppShell; their thin
  "Argumend home · Explore topics" row is gone and their inner `<main>` became a `<div>` (one main
  landmark). No added client JS on `/ai`. Trade-off: at 1440 the sidebar opens by default (~260px)
  beside the reading column; on phones it adds only the top bar. Scrolling moves into AppShell's
  pane (verify `#cruxes` jump links). Smallest follow-up if you want focus: start the sidebar
  collapsed on these routes. First-screen screenshots in `docs/reviews/2026-09-22-shell-seam/` on
  that branch. Reverts as one unit. To take it: `git merge north-star/shell-seam`.

## 9. Wave 4 (01:10–02:00 UTC, after "go ahead and merge those drafts")

Merged: `north-star/legacy-scoreboard` and `north-star/shell-seam` (both drafts above);
**verdict-wording** (readouts say "Evidence largely converges on the claim / still divided / still
thin"; chips "Converges / Divided"; share cards, embeds and highlights say where scores leaned,
never who won; enum keys unchanged; `data/topicSummaries.json` regenerated, labels only);
**shell-polish** (AppShell move reviewed: one `<main>`, skip link, anchors, no hydration warnings,
static generation OK; reading routes start with the desktop sidebar collapsed).

Not merged, ready for your call:
- **`north-star/capitalism-evidence`**: 7 web-verified evidence nodes + 10 edges for
  capitalism-after-ai; every ledger entry now cites graph evidence. It changes the flagship top 5 on
  a 0.007 margin (open-models 0.552 enters, wage-channel 0.545 drops to 6th and its crux note is
  removed). Options: accept, pin wage-channel via `cruxOverride`, or revisit polarities.
- **design-cleanup** landed just after the stop and is merged: one `text-error-text` token for all error states (light #ab4a40 is close to crux crimson — founder call), Philosophy plum / Technology slate category hues, settled verdict chip in stone ink, home crux block on the flagship sheet (home now imports constants from `components/argument/DebateView.tsx`; move them to a shared module if the home bundle grows). No production build was run after this merge.

Also merged at wrap: **copy-cleanup** (glossary/concepts on the two-axis model; low-weight rows off
crimson; blog passages quoting the old verdict mechanics) and **gap-metric** (counts-only logging
behind `ENABLE_GAP_METRIC_LOGGING`, default off; `gap_observations` has no text column; migration
`drizzle/0003_gap_observations.sql` NOT applied — first confirm whether prod uses `db:push` or
`db:migrate`; reviewer made the DB import lazy so the paste routes can't 500 on a driver failure).
Gap-metric questions: per-topic default report? use `signals.talkingPast` for the talking-past rule?
allow-list model ids? `replyId`/`createdAt` deviations OK?

Final state at 02:02 UTC: 248 files / 2911 tests, tsc, lint green. Run `bun run build` from the main checkout before any deploy.

New open items: TopBar `sticky` never sticks because `html, body { overflow-x: hidden }` (use
`clip`, then add ~64px scroll-margin); legacy sidebar pops in after hydration; blog/glossary passages
still use "settled" (listed in the verdict-wording report); editorial "settled" pin maps (e.g.
moon-landing) now read "Evidence largely converges on the claim".

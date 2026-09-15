# Merge brief: PR #4, sprint 2026-09-14/15

Branch `sprint-2026-09-14` off `main` @ 0bc2fc5. 44 commits locally; the PR
(https://github.com/amirhjalali/Argumend/pull/4) holds the first 40 (head b5ddb1a).
The last four (3b847eb, 3548b18, 9808368, 184e46a) are committed but not pushed. Footprint:
250 files, +13,771 / -881; roughly 60% of that is docs and evidence, the rest is
`lib/disagreement`, `components/disagreement`, `lib/crux`, dark-mode class edits across
`app/` and `components/`, and eight `data/topics` citation fixes.

Primary sources: the commit messages (`git log main..HEAD`), `.work/HANDOFF.md` from
"Sprint 2026-09-14/15" to the end, and the PR body. This brief only condenses them.

---

## 1. Decisions required before or at merge

| # | Decision | Commit | Default now | Flipping it does | Evidence | Recommendation |
|---|---|---|---|---|---|---|
| D1 | **Crux projection filter C** (`CRUX_PROJECTION_SKIP_UNCONTESTED`) | b8686a6, re-scored in 3b847eb | **Off.** Flags-off output byte-identical to pre-sprint. | Skips presenting a crux that is explicit common ground or that no position disputes; takes the next engine-ranked crux and warns. Changes the primary crux in 4 of 40 sonnet reports, some presented crux in 12 of 52 (8 better, 3 same, 1 worse, and the 1 worse is fixed by 9808368). Engine order untouched. | `docs/reviews/2026-09-15-crux-levers-evidence.md`, `docs/reviews/2026-09-15-crux-filter-c-rescoring.md` | **Turn on** (set the env var to `true` in production). Read the 8 diffs first; add the note to `docs/CRUX_ENGINE.md` that the presented list is no longer the engine's literal top 3. Levers A and B: **keep off** (A regresses named test 3). |
| D2 | **Heuristic evidence-state rule** | 97d0fc1 | **In.** `lib/disagreement/evidenceState.ts` labels an empirical crux claim asserted-in-source / no-evidence-provided / not-independently-checked by a conservative keyword rule. | Reverting keeps the new sixth box (371b2f0) but it can only ever say "not independently checked". Revert recipe is in the commit message; note the import has moved to `lib/disagreement/projectReport.ts:33` (the message says :27). | Commit message; `lib/disagreement/evidenceState.test.ts`; four fixture tests in `projectReport.test.ts` | **Keep**, but this is a product rule the spec (§6.6) never defined. If you would rather define the rule yourself, revert now; it is a 5-line change. |
| D3 | **Retry-After semantics** on `/api/disagreements/analyze` | 6fea793 | **Preserved.** `Retry-After` uses the later of the hourly and daily window resets (`lib/disagreement/rateLimiter.ts:74`), so exhausting only the hourly window can advertise up to 24 h. | Fixing it is a one-line change to report the reset of the window that actually denied; tests in `app/api/disagreements/analyze/route.test.ts` pin the current math and would need updating. | Commit message; handoff decision 3 | **Not a merge blocker.** Fix in a follow-up, not in this PR, so the "HTTP behaviour byte-identical" claim of 6fea793 stays true. |
| D4 | **Review-manifest overdue dates and "dated snapshot" copy** | 71aba81 | Manifests record last full review 2026-08-12 for all three flagship maps. As of 2026-09-14 the Israel map's 7-day headline check is 26 days overdue; all three 30-day checks are overdue. Public copy is unchanged; the diagnostic only warns. | Nothing in the merge changes what readers see. The decision is whether to (a) do the reviews, (b) change public copy to "dated snapshot", or (c) accept the warning. | `lib/argument/reviewManifest.ts`, `docs/ARGUMENT_AUTHORING_CHECKLIST.md`, `bun run freshness:argument` | **Merge as-is**; decide (a)/(b) separately. The fast-moving node list per map is a judgement call listed per node in each manifest. |
| D5 | **FAQ closed-card background in light mode** | 99a8a8f (surfaced by 66d9fe6) | Closed FAQ cards are now translucent white (`bg-card/70`, `app/faq/page.tsx`). Before, the class never compiled and the cards were transparent. | Only visible light-mode change in the whole dark-mode work; every other light-mode text colour and element count matches `main`. | `docs/reviews/2026-09-15-light-mode-regression-check.md` | **Sign off** unless you preferred the transparent look; then change the one class. |
| D6 | **Spearman "human ranking" assumption** | ee9cb3b | The crux-recall harness uses pre-registered list order as the human importance ranking, because no such ranking exists in the repo. Printed only, never a gate. | Replacing it needs a human ranking to be authored. | `docs/reviews/2026-09-14-crux-recall-diagnosis.md`, `scripts/validate-crux-recall.ts` | **Confirm or replace later**; no merge impact. |
| D7 | **Crux-recall memo decisions** (six items) | b8db60c | Nothing changed in the engine. Gate still fails honestly (Recall@5 0.100). | Validation design, three `derived` mapping revisions, five `opposes` edges, two engine levers (now measurable via D1's flags A/B). | `docs/reviews/2026-09-14-crux-recall-diagnosis.md` | **Not a merge decision.** Read after merge. |
| D8 | **Served model for the V2 lane** | 7563d1e, fbccbae (docs) | Sonnet. | Opus passes the rubric hard gate that sonnet fails on 3 of 40; higher on 8 of 9 paired sources; ~30% slower. Crux selection not better in either. | `docs/reviews/2026-09-15-v2-checkpoint-evidence/README.md` | **Not a merge decision**; config change when you choose. |

Also flagged in commit messages, no decision needed but worth knowing:

- 9808368 leaves one known defect: the per-disagreement resolvability band still maps
  priority/procedural/trust to existing-evidence, the same bug one level up from the one it fixed.
- 559580e: a well-formed `/d/<slug>` absent from the database still hits Next's client-rendered
  error shell (same as `/analysis/<uuid>`). Deliberate; only malformed slugs are server-rendered.
- 3548b18: crux repeatability over five identical sonnet runs was 1 to 2 of 5 on two maps. The
  human evaluation's "crux is central" threshold would measure the run, not the product, until
  extraction variance is reduced or disclosed. Affects the PR 9 gate, not this merge.

---

## 2. Commit map

Oldest first within each group. Risk: **none** = docs or config with no runtime effect;
**low** = code with pinned tests and no output change; **review** = changes what a reader sees.

### (a) Pure fixes, no behaviour choice

| Hash | What | Risk |
|---|---|---|
| 38e031a | URL checker classifies Nature cookie-wall bounces (2xx = bot wall, 404 = dead); two dead links moved to live hosts | low |
| 6450386 | Six fabricated Nature DOIs replaced with verified real papers; claim text corrected to what the papers say (6 topics in `data/topics/`) | review (content) |
| ee9cb3b | Crux-recall harness: truthful miss ranks, spec named test 1 added (fails honestly), Spearman implemented literally; engine untouched | low |
| ad46046 | Fake provider returns the matching eval fixture for a submitted source; keyword fallback unchanged | low |
| 559580e | `/d/[slug]` 404 server-rendered for malformed slugs (proxy matcher + shape check) | low |
| d5f73de | Flagship ids 404 on `/embed` and `/topics/compare` made explicit and pinned; no in-site link reaches them | low |
| 0e1a17e | Blog "Analysis" category title-cased in the data (8 posts); slug unchanged | low |
| a4ea615 | Duplicate React key on crux branches fixed; six-box report render-verified (doc) | low |
| f643462 | Top bar and footer newsletter card readable in dark mode (first two non-compiling opacity sites) | low |
| 99a8a8f | 81 non-compiling `dark:*-[var(--x)]/N` sites replaced with registered rgb tokens; ratchet test | review (D5) |
| f009db6 | Crux crimson and deep teal text reach AA in dark mode; `crux.light` raised, `deep.bright` added | low |
| 1b392a2 | Measured dark-mode sweep of 49 routes; markdown prose, verdict chips, topic cards, read-mode eyebrows fixed (24 files) | low |
| b2735c6 | Dark variant for every bare `text-deep` site (136 + 62 hovers); `skeptic.bright`; third ratchet (56 files) | low |
| 66d9fe6 | `card` colour token kept out of Tailwind's shadow-colour scale (light-mode card shadows had turned white) | low |

### (b) New capability behind flags, or docs only

| Hash | What | Risk |
|---|---|---|
| 6fea793 | `RateLimiter` interface + `InMemoryRateLimiter`; route body moved to `createDisagreementAnalyzeHandler`; HTTP byte-identical | low (D3) |
| b8db60c | Memo: why the crux-recall gate fails; six founder decisions; no engine change | none (D7) |
| 71aba81 | Per-map review manifests, `freshness:argument` diagnostic, authoring checklist | none (D4) |
| 6c34a2a | Checkpoint evidence: three blind scoring reports of 46 live reports + README | none |
| fbccbae | Blind opus-vs-sonnet on the three flagship maps | none (D8) |
| 7563d1e | Blind opus-vs-sonnet on 12 authored sources | none (D8) |
| 86aa7a0 | Browser render sweep, 47 routes x 2 widths, 8 ranked findings | none |
| 371b2f0 | Evidence-state box (spec §6.6) rendered inside the crux panel; dead `CruxSection.tsx` deleted | review (new UI) |
| b8686a6 | Levers A, B and filter C behind off-by-default flags; flags-off output byte-identical; harness `--levers`; replay script | low (D1) |
| f6bfcc0 | 12-person human evaluation kit for the PR 9 gate (`docs/research/`) | none |
| b5ddb1a | Distribution drafts refreshed around the diagnosis product (`docs/drafts/`, old files kept) | none |
| 3b847eb | Blind re-scoring of the 12 reports filter C changes (unpushed) | none (D1) |
| 3548b18 | Crux repeatability over five sonnet runs; essay gets its live example (unpushed) | none |

### (c) Behaviour changes that alter output

| Hash | What | Risk |
|---|---|---|
| 00eb409 | Positions with zero claims give `insufficient-context` instead of `mixed-disagreement`; "Why…" questions no longer silently drop every crux; participant ids deduped. Fixtures added: `extreme-brevity-no-reasons`, `why-question-crux-survives`. More honest because the old output invented a disagreement pattern with no claims behind it and lost cruxes without telling the reader. | review |
| 85265fd | Projection pass 2: headline type follows the primary crux (the value-presented-as-empirical hard-fail mechanism); placeholder resolution text gone; `mostly-common-ground` requires the moderate/high band; `single-empirical-crux` can fire; ungrounded common ground dropped, ungrounded explicit positions relabelled inferred; no participant-less stakes; corpus renderer emits contesting lines; CLI provenance records the resolved model id. Fixtures changed: `different-questions`, `nested-quotes-conversation`, `overdetermined-argument`, `same-conclusion-different-reasons`. More honest because each change removes a claim the report made that its own data contradicted. | review |
| 97d0fc1 | Projection pass 3: crux branches state the condition and its negation; quote offsets documented against normalised text (CRLF test); stake ledger stops quote-marking paraphrases; zero-position reports lose the false preamble and UNKNOWN label. Plus the flagged evidence-state rule. No fixture JSON changed; `projectReport.test.ts` and `analyze.test.ts` expectations updated. | review (D2) |
| 9808368 | A crux that borrows a disagreement's question now borrows its resolution kind and condition, so a weighing question no longer shows an evidence check with "high" resolvability. Replay: 18-19 of 40 sonnet and 10 of 12 opus stored reports change only in crux resolution text/kind; ids, questions, order and primaries byte-equal. Unpushed. | review |

### (d) Tooling, tests, ratchets, handoff

| Hash | What | Risk |
|---|---|---|
| fece065 | 15 golden fixtures (38 to 53), every spec §16.1 category covered; no existing fixture changed | none |
| ca0d4e9 | eslint ignores `.claude/worktrees/**` and `.playwright-mcp/**` | none |
| 72744de | vitest excludes agent worktrees (a worktree had doubled the suite) | none |
| 87e90eb | Founder handoff for the sprint | none |
| 677b8c8 | Model-comparison key in the evidence README; handoff addendum 1 | none |
| 718350d | Handoff records the clean production build | none |
| 52d34b1 | Handoff addendum 2 | none |
| 6faadff | Handoff addendum 3 | none |
| 1834463 | Dark-mode verification report reflects the markdown fix; duplicate test block dropped | none |
| 0c777cc | Handoff addendum 4 | none |
| 17fb901 | Handoff verification line reflects the clean build at commit 34 | none |
| 06bddd0 | Handoff addendum 5 | none |
| 184e46a | Handoff addendum 6 (commits 39-43, PR #4, repeatability); unpushed | none |

Count: 14 + 13 + 4 + 13 = 44.

---

## 3. What was verified and how

**Gates per range** (tsc, eslint `--max-warnings=0`, vitest, fixture eval), from commit messages
and the handoff:

| Range | Full vitest | Eval | Build |
|---|---|---|---|
| Commits 1-12 (6fea793 to 87e90eb) | 216 files / 2321 tests | 64/64 | not run |
| Commits 13-19 (to d5f73de) | 218 files / 2362 | 64/64 | clean `next build` on the 19-commit tree |
| Commits 20-34 (to 0c777cc) | 2419 | 64/64 | clean `next build` on 0c777cc |
| Commits 35-40 (to b5ddb1a) | scoped runs only (lib/crux + lib/disagreement + scripts 278; tailwind compile proof) | 64/64 | **CI on the PR**: lint, typecheck, `test:ci`, `build`, `smoke:standalone` all passed on b5ddb1a (2026-09-15 22:25 UTC) |
| Commits 41-44 (unpushed) | scoped: `lib/disagreement` 218 | 64/64 | **none**; 9808368 changes `projectReport.ts` and has not been through a full suite or a build. The other three are docs. |

**Browser verifications** (all with the `fake` provider, no API key, dev server, no sign-in):

- Render sweep, 47 routes x 2 widths: no overflow, broken images, or hydration text; all 294
  sitemap URLs 200. `docs/reviews/2026-09-15-render-sweep.md`.
- V2 six-box report on three fixtures, desktop and mobile, light and dark: quotes verbatim, no
  winner/score/percentage, disclaimers present, stake ledger attributes correctly, console
  clean. `docs/reviews/2026-09-15-v2-report-render-verification.md`. Note this ran before
  97d0fc1 and 9808368; the sixth box was verified in 371b2f0's own browser check.
- Dark-mode contrast sweep, 49 routes, each text node composited against its real background,
  before/after ratios. `docs/reviews/2026-09-15-dark-mode-verification.md`.
- Light-mode regression check, 15 routes, pixel diff + computed-style diff against `main`:
  one regression found and fixed (66d9fe6); no text-colour change anywhere.
  `docs/reviews/2026-09-15-light-mode-regression-check.md`.

**Other checks**: `check-source-urls` DEAD 0 of 1662 (64 Nature URLs "unverifiable, bot wall");
`validate-crux-recall` exits 1 by design; `freshness:argument` warns on the overdue manifests.

**Not verified** (say so before relying on any of it):

- Signed-in states, saved topics, subscriptions, anything behind Google OAuth.
- A real database: `/d/[slug]` with an existing published report, report publication, the
  `analyses` tables. The 404 fix was checked only for malformed slugs.
- The `anthropic` provider lane and the production environment. Every live report in the
  evidence came from the subscription `cli` lane; the served lane was not exercised.
- Filter C **on** in a browser. Its effect was measured by replaying stored JSON, not rendered.
- The evidence-state rule against live reports: it was written after the 46-report run, so no
  reviewer has scored its labels. Tests only.
- Full vitest and `next build` on the final tree (commit 44). Last full build is CI at commit 40.
- The remaining dark-mode design-judgement items listed in the verification doc (opacity-faded
  numerals, "No." card numbers, vote buttons that also fail in light mode, inline hex numerals on
  methodology/perspectives).
- The `docs/drafts/` content has placeholders and eight `[VERIFY]` items; nothing there is
  ready to send.

---

## 4. Suggested merge strategy

**Merge as one PR, do not split.** The dark-mode commits build on each other (tokens in 99a8a8f,
used by f009db6, 1b392a2, b2735c6, then corrected by 66d9fe6), the three projection passes and
9808368 change the same fixtures in sequence, and the evidence docs cite the code state they
scored. Splitting by group would produce intermediate states that are worse than either end.

**Before merging**, in this order:

1. Push the four local commits (3b847eb, 3548b18, 9808368, 184e46a) so CI runs on the real head. Do not
   merge until that run is green; 9808368 has only had scoped tests.
2. Decide D1 (filter C) and D2 (evidence-state rule). Neither needs a code change to merge as-is;
   D1 is an env var in production, D2 is a small revert if you want it.
3. Sign off D5 (FAQ card) by looking at `/faq` in light mode once.

**Merge commit, not squash.** The 44 messages are the only place several decisions and revert
recipes are written down (97d0fc1, 6fea793, 71aba81, 6450386). A squash would lose them into one
blob. If you want a tidier history, squash only group (d) (the twelve handoff/config commits),
but that is cosmetic. Group (d) is thirteen commits, so that squash is the only one worth doing.

**Commits worth reading in full** (everything else is summarised accurately by its subject line):

1. **85265fd**, projection pass 2. It is the fix for the rubric hard-fail and it changes four
   fixtures. Its message explains each change against the reviewer finding it answers.
2. **97d0fc1**, projection pass 3. Carries the flagged evidence-state rule and its revert recipe.
3. **b8686a6**, crux levers. Explains why A and B stay off and what filter C actually does,
   which is the one decision that changes the product's most-criticised box.

Optional fourth: **6450386**, because it rewrites six claims in public topic pages and you
should know what the corrected claims now say.

---

## 5. Follow-ups the sprint queued but did not do

Deduplicated across the five handoff addenda and the commit "left/flagged" notes.

**V2 diagnosis quality**

- Per-disagreement resolvability band maps priority/procedural/trust to existing-evidence
  (same defect 9808368 fixed one level down). Flagged in 9808368's message.
- Crux quality remains the #1 reviewer finding beyond what filter C fixes: restatement cases
  and model-wired "opposes" cruxes are untouched. `docs/reviews/2026-09-15-crux-levers-evidence.md`.
- Extraction variance: a prompt-determinism or modal-claim-set consensus step, or a disclosure
  in the report, before the human study's crux threshold means anything.
  `docs/reviews/2026-09-15-crux-repeatability.md`.
- Crux-recall memo's six decisions (validation design, `derived` mappings, five `opposes` edges,
  engine levers). `docs/reviews/2026-09-14-crux-recall-diagnosis.md`.
- Three copy nits recorded in `docs/reviews/2026-09-15-v2-report-render-verification.md`.
- Evidence-state labels have never been scored by a reviewer against live reports (D2).

**Runs not completed**

- Legacy corpus run (159 maps) and a full opus sources run. Read the cost note in the handoff
  first: the `cli` lane re-sends a ~40k-token prompt per subprocess; cache the system prompt on
  the `anthropic` lane before any run over ~30 cases. `.work/HANDOFF.md`, "Cost note".
- The 12-person human evaluation study itself (kit is ready, recruiting is yours).
  `docs/research/2026-09-15-v2-human-evaluation-kit/README.md`.

**Product and infra**

- Retry-After from the denying window, not the later one (D3). `lib/disagreement/rateLimiter.ts`.
- Well-formed `/d/<slug>` absent from the database still client-renders the error shell
  (559580e). Same for `/analysis/<uuid>`.
- Flagship map reviews are overdue; decide reviews vs "dated snapshot" copy (D4).
  `lib/argument/reviewManifest.ts`.
- `ARGUMENT_TOPICS_LAST_UPDATED` semantics untouched (carried debt, per the north-star).

**Dark mode, design judgement**

- Opacity-faded numerals, "No." card numbers, the vote buttons (fail in light mode too), inline
  hex numerals on methodology/perspectives. `docs/reviews/2026-09-15-dark-mode-verification.md`.

**Docs and distribution**

- `docs/drafts/*-2026-09.md`: placeholders for a live run of the worked example, eight `[VERIFY]`
  items in the DMs, dollar figures the repo does not support. `docs/drafts/README.md`.
- `docs/CRUX_ENGINE.md` needs the note that the presented crux list is filtered if D1 is turned on.

---
Addendum (orchestrator, 20:10 EDT): after this brief was drafted, the full gate set ran on the final
tree at 44 commits: vitest 233 files / 2456 tests, tsc, eslint --max-warnings=0, fixture eval 64/64,
and a clean `next build`, all exit 0. CI on PR #4 will re-run on push of the remaining commits.

# Round 4: flagship AI-jobs content fixes (r3 fresh review, issue 10)

Branch `r4/flagship-fixes`, off `ux/round4-2026-09-29` (27a0fbc).

## What changed

**Settle conditions** (`data/topics/drafts/ai-mass-unemployment.draft.json`, `resolution.condition`,
which `DebateView` passes to `SettleAnswer`). They are based only on the map's own claims, evidence
nodes and ledger notes. No new sources or figures were added.

| Crux | Before | After | Grounding |
|---|---|---|---|
| 2. Could retraining work if done seriously? | Evaluation of a well-funded, AI-displacement-specific workforce program at national scale. | Randomized evaluations of well-funded, employer-linked programs for AI-displaced workers that follow earnings for years, at national scale and in a slack labor market as well as a tight one. | WIA Gold Standard and WorkAdvance (randomized, 30 months / 10 years); Hyman WIOA (matched, tight-market years); ledger note "Still open: returns in a slack labor market, at displacement scale" |
| 3. Can displaced workers move on without lasting damage? | Well-funded, targeted retraining programs evaluated at national AI-displacement scale show earnings and reemployment outcomes comparable to pre-displacement work. | Realized costs for workers actually displaced by AI: time out of work, and earnings years later against their earlier pay, above all in the clerical jobs with the least capacity to adapt. | Brookings displacement data (earnings 25% lower in year 10); Manning–Aguirre index ("does not observe realized reemployment costs"; 6.1M low-capacity, mostly clerical); ledger "The cost question now centers on that group" |
| 5. Is a degree still a shield? | The same reemployment earnings and duration data; this claim and its rival reading resolve together. | Reemployment earnings and time out of work for displaced credentialed workers in highly AI-exposed jobs, against displaced workers in less-exposed jobs; the rival reading, that credentials cushion these workers, turns on the same data. | The rival claim `c-cushioned-by-credentials` states this condition in full; ledger basis "reemployment earnings and duration data, is still unmet" |

`lib/crux/__fixtures__/flagship-cruxes.baseline.json` was regenerated. Only those three
`Resolution:` lines changed. Scores and ranks are the same.

**Ledger dates** (`components/argument/CruxMovement.tsx`). The dates themselves are unchanged. Only
the labels changed:
- The open ledger now starts with "Evidence from Feb 2025 to Sep 2026 · recorded Sep 22, 2026". Each
  part stays on one line at 390px.
- The footer now shows only the author ("Recorded by Argumend editors.").
- Row dates read "Evidence dated …" to screen readers. The collapsed track's start date reads
  "Evidence from …", replacing "Record starts …".
- A per-row ingest date reads "Recorded …" instead of "Added to the map …". When the row also names an
  editorial author, the two merge into "Recorded … by …".

**Repeated "Open"**: this was a rendering problem, not bad data. Each entry added evidence without
moving the crux, but every one was labelled "Open", so it looked like the crux had reopened. A second
consecutive open entry now reads "Still open". Crux 1 (two in a row) and crux 5 (four in a row) are
the flagship cases.

## Checks

- `bunx tsc --noEmit` clean; `bunx vitest run` 251 files / 3075 tests pass; `bun run lint` clean.
- New contract test in `lib/argument/flagshipContracts.test.tsx`. It fails when, on any flagship map:
  - a settle line starts "The same";
  - two cruxes share a settle condition, either exactly or as a near-duplicate (content-word stem
    overlap of 0.6 or more).

  It pins the old crux 2/3 pair at 0.78 overlap, so the old pair would fail. With the old data, the
  test fails.
- New CruxMovement tests: the dates line, one mention of the recording date, the "Evidence from" track
  label, and "Still open".
- Checked in the browser at `/topics/capitalism-after-ai`: all five ledgers read correctly, including
  one "Open, Still open" pair. Checked at `/ai`: the tracks read "Evidence from …", and cruxes 3 and 5
  no longer share one retraining test.
- Screenshots are in `scratchpad/round2/flagship-fixes/` at 390 and 1440, for cruxes 2, 3 and 5 plus
  crux 1 at 1440. The "before" set is from argumend.org, which still serves the old text. The "after"
  set is from the local dev server.

## Left alone

- On `/ai`, which mixes both maps, the new crux 3 test (realized costs, clerical group) sits next to
  capitalism-after-ai's reallocation test (re-employment time, earnings recovery, aggregate
  underemployment). They overlap in subject but not in wording (stem overlap about 0.3). The
  questions really are neighbours across the two maps.
- Ledger `author.basis` strings mention "the resolution condition". They are not rendered, and they
  still hold true.

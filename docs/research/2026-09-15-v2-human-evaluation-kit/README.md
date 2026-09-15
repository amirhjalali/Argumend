# V2 human evaluation kit (2026-09-15)

The V2 spec (`docs/plans/2026-08-18-argumend-v2-disagreement-diagnosis-spec.md`) makes
V2 the default `/analyze` only after a 12-person human evaluation passes six release
thresholds (§16.4, checkpoint "After PR 8" in §22). Neither that study nor the earlier
"After PR 5" checkpoint (founder tests the page with five real disagreements) has been run.
This kit contains everything except the participants. Recruit, pilot with two, run twelve,
fill the results template, decide.

## What this study decides

**PR 9 (release switch) is gated on this study.** A pass means V2 moves to `/analyze` with the
legacy page at `/analyze/legacy`. A fail means the next cycle goes to the shared failure the
study exposes, not to more features. The blind reviewer evidence in
`docs/reviews/2026-09-15-v2-checkpoint-evidence/README.md` already says the crux box is the weak
one (primary crux not load-bearing in 12 of 17 and 12 of 23 reports), so the protocol probes it
directly: participants name their own crux before they see the report.

The same five disagreements double as the PR 5 checkpoint material (see the last section).

## Release thresholds (spec §16.4, verbatim)

> Before making V2 the default Analyze experience, test at least 12 people using real disagreements.
> For each report ask:
> Did Argumend represent each position accurately?
> Did it identify the actual disagreement?
> Was the primary crux genuinely load-bearing?
> Did the report reveal something useful or surprising?
> Did any wording feel politically or morally tilted?
> Would you share this report?
> What did you think Argumend had independently verified?

| # | Threshold (verbatim) | At n = 12 | Kit question | Coding rule |
|---|---|---|---|---|
| T1 | At least 80% rate position representation Accurate or Mostly accurate. | 10 or more of 12 | Q1 | `scoring-sheet.md` rule T1 |
| T2 | At least 75% identify the selected crux as genuinely central. | 9 or more of 12 | Q3 + pre-report crux | rule T2 |
| T3 | Fewer than 10% mistakenly believe source-only mode independently fact-checked the claims after readi[ng the report] | 1 or fewer of 12 | Q7 + Q7b | rule T3 |
| T4 | No repeated material straw-man pattern. | zero repeats | Q1 corrections + Q5 | rule T4 |
| T5 | At least half say the report revealed a distinction they had not initially articulated. | 6 or more of 12 | Q4 + pre-report summary | rule T5 |
| T6 | At least one-third say they would plausibly share a strong report. | 4 or more of 12 | Q6 | rule T6 |

The spec of record clips the T3 line at "after readi"; the kit reads it as "after reading the
report" and asks the question after the report and before the debrief.

**Pass/fail rule.** All six must pass on the twelve primary readings. There is no partial
credit and no averaging across thresholds. The spec's own words: "These are product gates,
not analytics targets to game." A near miss on one threshold is a fail plus a diagnosis, not a
rounding decision. After any change to the product, re-run with at least six fresh participants
(the north star's P1 step 6); do not re-score the same twelve.

Denominator: the twelve primary readings, one per participant, always on a phone. Secondary
readings (the second, shorter report each participant sees) are supplementary evidence and
feed T4's pattern check, the key-match diagnostic, and the defect log. They are never used to
rescue a threshold.

## Time and cost

| Item | Estimate |
|---|---|
| Pilot | 2 sessions, 30 min each, plus 1 hour to adjust the kit |
| Sessions | 12 x 30 min moderated, remote or in person |
| Coding | 15 min per session (fill the scoring sheet while it is fresh) |
| Scheduling and recruiting | 3 to 4 hours spread over the recruiting week |
| Synthesis | 2 hours to fill `results-template.md` and write the decision |
| Moderator total | about 16 hours over two weeks |
| Incentive | 14 gift cards (12 + pilot) at 30 USD or local equivalent: 420 USD |
| Model cost | about 30 live analyses; negligible at spec §11.3 limits |

Calendar: one week to recruit and pilot, one week to run. Do not stretch beyond three weeks; the
build under test should not change mid-study.

## Run order

1. **Freeze the build under test.** Record the commit, the provider lane, and the model id in
   the results template. Use the lane that will ship (`anthropic`), never `fake`, and note that the
   `cli` lane is refused in production. Use the same model for all fourteen sessions. The
   checkpoint evidence shows opus passes the rubric hard gate where sonnet fails; whichever is the
   release candidate is the one to test.
2. **Precondition on known defects.** Defects 2, 3 and 4 in the checkpoint README (type
   mismatch, count-driven pattern, placeholder resolution text) are mechanical fixes. Either land
   them before the pilot or accept that the study will measure them. Do not run twelve people
   against a build with a known placeholder-text bug and call the result a product gate.
3. **Stand up a phone-reachable URL** with `ENABLE_DISAGREEMENT_V2=true`: a preview deployment on
   Coolify, or a tunnel to local dev. Confirm `/analyze-v2` loads at 390 px, that the rate limit
   allows three analyses per session, and that a live error shows the typed error, not a fallback.
4. **Dry-run each of the five disagreements yourself** once on a phone. Confirm the report
   generates, note the hero headline and primary crux, and compare to `disagreements/answer-keys.md`.
   If a source produces `insufficient-context` or an invented second position, fix the source text
   (not the product) before the pilot. Record what you saw; the crux can change between runs
   (checkpoint evidence: different primary crux on all three flagship maps between two sonnet runs).
5. **Recruit** with `recruiting.md`. Screen out anyone who knows the project. Aim for 14 confirmed.
6. **Pilot** two sessions with `pilot-run.md`. Adjust timing and wording. Pilot data never enters the twelve.
7. **Run twelve** sessions with `protocol.md`, one scoring sheet each, coded the same day.
8. **Fill `results-template.md`.** Pass/fail per threshold, key-match table, verbatims, defects tagged.
9. **Decide** and record the decision at the bottom of the results file. A pass unblocks PR 9. A
   fail names the shared failure and the six-person re-run condition.

## PR 5 checkpoint with the same material

The spec's "After PR 5" checkpoint asks the founder to test the page with five real disagreements
before adding persistence. Use the five sources in `disagreements/`. On a phone at 390 px, for each:

> Is the payoff visible before methodology?
> Does the page feel like a product rather than a research report?
> Is the primary crux memorable?
> Is the caveat visible without killing curiosity?
> Is the share object worth sharing?

Record yes/no plus one line each in the "PR 5 checkpoint" section of `results-template.md`. If
the answer to "is the primary crux memorable" is no on three or more of the five, the 12-person
study will fail T2; fix first.

## Files

| File | Purpose |
|---|---|
| `README.md` | this page: gate, thresholds, cost, run order |
| `protocol.md` | the 30-minute session script |
| `recruiting.md` | screener, two recruiting messages, incentive, scheduling |
| `disagreements/01..05-*.md` | five sources, one per category, with expected pattern |
| `disagreements/answer-keys.md` | sealed cruxes and red flags; moderator only |
| `disagreements/sourcing-real-disagreements.md` | swapping in real public exchanges |
| `scoring-sheet.md` | one per participant; every threshold mapped to a question and a rule |
| `results-template.md` | aggregate table, verbatims, defects tagged to the checkpoint list |
| `pilot-run.md` | the two-person pilot and what to adjust from it |

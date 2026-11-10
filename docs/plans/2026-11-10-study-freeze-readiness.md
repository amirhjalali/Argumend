# Study freeze readiness, 10 Nov 2026

For the pre-registered study in `docs/plans/2026-11-03-study-plan.md`.

**Verdict: not ready to freeze yet.** The chatbot and article texts and the measures now match the
three maps. Three things still stand between here and the freeze: a word count in a browser, an
update of the plan's stale lines, and the founder's open decisions. Nothing has been run or spent.

## What was checked

- The plan's "Stimuli" and "Freeze" rules.
- The three maps as they stand on `landing/2026-11-10` (HEAD `a6591829`, no uncommitted edits):

  | map | sha256 of `data/topics/<id>.ts` |
  |---|---|
  | `gun-control-effectiveness` | `465d97b42ffad7d43ab1a083ca05ebc339faea32bc77a25594d429af768bb0d7` |
  | `immigration-border-crisis` | `418894eefed9691202caec0434f4b498e615fd30606e3ee85865dd3b482cc551` |
  | `transgender-athletes-sports` | `ffddc72facf7777a44d6b84ffb83ea0ace9d89734d7313a42d6b69c05a6f5e4b` |

- Every statement and number in the six texts in `data/study/stimuli.ts`, read against those files.
- The five statements and four crux options per topic in `data/study/instruments.ts`.
- Map history: since the last study sync (`18ee1f87`, 3 Nov) only the trans map changed, and only
  in wording (five lines, `480722a9`). The trans rewrite is finished: four cruxes, 13 cards.
- What arm (a) shows with every fold closed, from a server render of the page (no browser).
- Prolific's pricing page, loaded 10 Nov 2026. The plan's power arithmetic, recomputed; it holds.

Not checked: the maps against their own sources. This pass checks the texts against the maps.

## What changed

`data/study/instruments.ts`: nothing. The questions match the maps' questions, each right answer
still paraphrases the map's first crux, and each distractor is still a fact the map records both
sides as accepting.

`data/study/stimuli.ts`, statements that did not match the map:

| topic | text | was | now, as the map has it |
|---|---|---|---|
| guns | both | 90% of people who survive an attempt do not later die by suicide | "most people"; the map gives no figure |
| guns | both | RAND's top rating for safe-storage laws is for youth gun suicides | top rating is for self-inflicted gun injuries and deaths among young people |
| guns | chatbot | RAND rates licensing as inconclusive | limited for licensing, inconclusive for assault-weapon bans |
| guns | both | 74% of mass shooters' guns were obtained legally | in 74% of mass shootings in one database, 1982 to 2019 |
| border | article | asylum granted in 14% of cases decided on the merits | 14% of all decisions, counting cases abandoned, withdrawn or never adjudicated |
| border | chatbot | desert deaths "peaked at about 890" | Border Patrol counted 895 in fiscal 2022 |
| border | both | "at least 170" citizens held "in the early months" | more than 170 in the first nine months |
| border | both | the 2024 fall came after "stepped-up enforcement by Mexico" | CBP credited the June 2024 rule; Mexico's enforcement is a disputed factor |
| border | article | 5.5% is "the lowest TRAC has recorded"; one paragraph mixed two measures | "an all-time low"; the 14% count and TRAC's grant rate are now kept apart |
| trans | both | Air Force runners' testosterone was at female levels "for the whole period" | removed; the map does not say it |
| trans | article | SRY is "a gene on the Y chromosome" | removed; the map does not explain the test |

Two of these had slipped past the number test: "90" matched the map's `confidence: 90`, and "890"
matched digits inside a source URL.

Also in `stimuli.ts`:

- **Length targets** re-estimated on the current maps and page: 818, 752 and 805 words (were 758,
  690 and 664; the trans figure predated its fourth crux).
- **Texts lengthened** with facts already in the maps, so each sits inside the ±15% band and would
  stay inside it if a browser counts 8% more than the estimate. Now: guns 857 and 884 words,
  border 729 and 800, trans 780 and 816 (chatbot, article).
- **Cited cards** (`sourceIds`) completed; several cards the texts used were not listed.
- **`MAPS_CHECKED`** records the three hashes above.

`data/study/stimuli.test.ts`:

- The number test now matches whole numbers against the map's prose only.
- A new test fails when a study map file changes, and says what to do.
- A new test refuses a card id listed twice.

`npx vitest run data/study lib/study`: 5 files, 72 tests, all pass. Nothing broader was run.

## Still open

1. **Browser word count.** The plan requires arm (a) counted at 390px and 1440px inside `/study`.
   Today's targets are server-render estimates. If a browser count differs, change
   `ARM_A_VISIBLE_WORDS` and re-run the test.
2. **The plan has stale lines** (not edited here): trans is "three cruxes, ten cards" and "being
   rewritten now"; texts "run 582–724 words"; targets "758 and 690 … 664"; the guns "both sides
   agree" block is said to include the 74% fact, but the closed page shows three agreed facts and
   that one is inside the fourth crux.
3. **Arm (a) still has exits.** The plan says the page is shown without its "Keep exploring" links.
   With no related maps it still shows "Keep exploring: Browse all maps", "Also asked as", "See it
   as a diagram", "How this map was made", the breadcrumb, and Share and Embed. They open in a new
   tab. Decide whether to strip them; that is a change in `components/`.
4. **Any further edit to the three maps** breaks the new hash test. The fix is to re-read the
   texts, not to update the hash blindly.
5. **The six texts changed today.** Someone should read them once before the freeze. The plan's
   outside quality rating would cover it.
6. **Founder decisions from the plan**: withhold the sponsor until debrief; outside rating or a
   real chatbot answer; publish whatever the result; ethics review.
7. **Unknown until the pilot**: median time (the texts are about 100 words longer) and the
   pre–post correlation.
8. **Not checked**: tax at Prolific's checkout; the completion link's host; `/privacy` does not
   mention the study; `.env.example` has no study variables.

## Cost

Prolific's pricing page (prolific.com/pricing, loaded 10 Nov 2026): the platform fee is "usually
42.8% for corporate customers" and 33.3% for academic or non-profit ones; recommended pay is
$12.00 an hour, minimum $8.00. It lists no extra charge for screeners and does not mention tax.
Unchanged since 3 Nov.

Per participant: $2.40 (12 minutes at $12 an hour) plus 42.8% = **$3.43**.

Assumptions are the plan's: two-sided α 0.05, pre–post correlation 0.6, 15% excluded. "Detects"
is the effect each contrast finds 80% of the time. H1 needs both contrasts, so its chance of
success at a true d = 0.20 is the "both" column.

| | recruits | analysable per arm | cost | detects (d) | both contrasts at d = 0.20 | "no better than" test at ±0.20 |
|---|---|---|---|---|---|---|
| pilot alone | 90 (45 per party) | 25 | **$308** | 0.63 | 5% | cannot |
| main, 80% per contrast only | 900 (450 per party) | 255 | $3,084 | 0.20 | 70% | 76% |
| **main, smallest defensible** | 1,116 (558 per party) | 316 | **$3,825** | 0.18 | 80% | 87% |
| main, as planned | 1,200 (600 per party) | 340 | $4,113 | 0.17 | 84% | 89% |
| main, if pilot shows ρ below 0.4 | 1,350 (675 per party) | 382 | $4,627 | 0.19 at ρ = 0.4 | | |

- **The pilot alone costs $308** and can detect nothing realistic. It is a feasibility check, as
  the plan says. It will place the correlation within about ±0.15.
- **The smallest defensible main study is 1,116 people, $3,825.** That is the smallest size at
  which H1 as written has an 80% chance when the true effect is d = 0.20. It saves $288 on the
  plan and gives up about three points of power. The plan's 1,200 is the better buy.
- **900 people ($3,084) is not enough for H1 as written.** Each contrast has 80% power, but both
  succeed together only 70% of the time, and a true tie would be called a tie only 76% of the time.
  The likeliest result of a smaller study is "inconclusive".
- **Totals with the pilot:** $4,133 (smallest defensible) or $4,421 (as planned). Both are under
  the $5,500 ceiling.
- **What the ceiling covers on top of the plan:** a pay rise up to a 14-minute median ($4,798 for
  the main study), or 450 per arm ($4,935 with the pilot). Not both. A 15-minute median puts the
  total about $25 over the ceiling once the pilot is topped up to match.

## Steps left for the founder, in order

1. Decide the four open calls in "Still open", item 6.
2. Approve the budget: $5,500 ceiling, $4,421 expected.
3. Read the six texts in `data/study/stimuli.ts`, or send them to an outside rater.
4. Have arm (a) counted in a browser and the plan's stale lines fixed, then merge.
5. Prolific account: create a researcher account; use a display name other than "Argumend" if the sponsor is withheld.
6. Funding: add $310 for the pilot now; add $4,113 for the main study after the pilot.
7. Coolify variables: `NEXT_PUBLIC_ENABLE_STUDY=true`, `ENABLE_STUDY_RESPONSES=true`, `STUDY_PID_SECRET` (`openssl rand -hex 32`, kept somewhere safe), `STUDY_COMPLETION_CODE` from Prolific (`STUDY_SCREENOUT_CODE` is optional), `TRUSTED_PROXY_HOPS=2`; then rebuild.
8. Migration: `bun run db:migrate` against production (applies `drizzle/0004_study.sql`).
9. Test run: open `https://argumend.org/study?PROLIFIC_PID=<24 hex>&STUDY_ID=<24 hex>&SESSION_ID=<24 hex>`, finish it once per arm if you can, check `npx tsx scripts/study-report.ts --health`, delete the test rows, turn both flags off.
10. Freeze: record the commit hash and the three map hashes in the plan, upload the plan to OSF or AsPredicted, and edit none of the three maps until the main study closes.
11. Pilot: turn the flags on; two Prolific listings (Democrats, Republicans), 45 each, $2.40, 12 minutes, URL parameters on, manual approval.
12. After the pilot: read `--health`, the median time and the correlation; change pay or N only as the plan allows, and log it.
13. Main study: two listings, 600 each; watch `--health` only.
14. Close, run `npx tsx scripts/study-report.ts --study <id> --out <dir>`, apply the decision rules as written, publish.
15. Afterwards: delete the study tables within two years and add the study to `/privacy`.

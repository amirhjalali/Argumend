# Does an Argumend map close the perception gap? A pre-registered study

Status: **draft pre-registration, 3 Nov 2026.** Not yet run. Freeze it (see "What the founder
must do") before the pilot, and record every later change in the deviations log at the end.

Code: `/study` (behind `NEXT_PUBLIC_ENABLE_STUDY`), `POST /api/study/assign` and
`POST /api/study/response` (behind `ENABLE_STUDY_RESPONSES`), `lib/study/`, `data/study/`,
`components/study/`, `scripts/study-report.ts`, migration `drizzle/0004_study.sql`.

## Why

Argumend's goal is to close the gap between how much people think they disagree and how much they
actually do (`docs/plans/2026-09-22-north-star.md`). We have never measured whether the product
does that. The only user test (10 Aug 2026, a handful of the founder's contacts, the nuclear map on
phones) was muted, and confounded topic heat with an older page design
(`docs/research/2026-08-10-north-star-baseline.md`). The gap metric logs paste-tool outputs, not
readers (`docs/GAP_METRIC.md`), and its lanes are off. Fifteen rounds have improved inputs we
score ourselves. This study measures an outcome, against the two things a reader could use
instead: a chatbot asked for "both sides", and a news explainer.

The question it answers: **after reading one Argumend topic page, do people misjudge the other
party less than after reading a good chatbot answer or a good explainer built from the same facts?**

## Design

Randomized, between-subjects, three arms, one reading per participant:

| arm | what the participant reads | where it lives |
|---|---|---|
| (a) map | the real topic page, rendered by the same component as `/topics/[id]` (`ReadModeView`), without its "Keep exploring" links | `app/study/page.tsx` |
| (b) chatbot | a "give me both sides of X" answer, written the way a capable general chatbot answers: framing line, bolded pro and con bullets, "key points of contention", a hedged bottom line, an offer to go deeper | `data/study/stimuli.ts` |
| (c) article | a neutral news explainer: news peg first, background, attributed claims from each side, no verdict | `data/study/stimuli.ts` |

Topic is crossed with arm (3 × 3 = 9 cells). Each participant gets one topic and one arm.

### Topics, and why these three

| map | why |
|---|---|
| `gun-control-effectiveness` | Classic party-sorted issue. The map has two cruxes with settle tests, eight cards on both sides, and an unusually clean "both sides agree" block (the US rate is far higher; 393 million guns; 74% of mass shooters bought legally). |
| `immigration-border-crisis` | Party-sorted, current (encounters peaked in FY2023 and fell after 2023–2025 restrictions), three cruxes, ten cards, three common-ground facts. |
| `transgender-athletes-sports` | Among the most tribal issues of 2025–26, three cruxes, ten cards, recent policy (World Athletics 2023, NCAA Feb 2025, IOC Mar 2026). The perception-gap item set has room for real misperception here. |

Not chosen: `ai-mass-unemployment`. It is the flagship and a strong map, but worry about AI and
jobs is not sorted by party the way these three are, and the perception gap is measured between
parties. Running it would also mix two page templates (it is an ArgumentGraph map, rendered by
`DebateView`) into arm (a). It is the obvious second study if this one finds anything.

All three are legacy-template maps, so arm (a) is one template throughout. Their pages were read
on 3 Nov 2026; a map edit before launch changes the stimulus (see "Freeze").

### Randomization

Server-side, in `POST /api/study/assign` (`lib/study/assignment.ts`). The stratum is one Prolific
study × one party. Within it, a new participant goes to the least-filled of the nine cells, ties
broken uniformly at random. Cells stay within one participant of each other inside every stratum
(tested over 900 draws). Counts include people who started and did not finish, so drop-out is
measured per arm rather than hidden. The client sends only the Prolific ids and the party answer;
it cannot request a cell, and the response route refuses any cell other than the stored one. A
returning participant gets their first cell. Known limit: two requests that read the counts at
the same instant can land in the same cell, which costs a cell or two of balance and nothing else.

### Procedure (about 12 minutes)

1. Consent (`components/study/copy.ts`). Decline → nothing stored, asked to return the study.
2. Party: strong / not very strong Democrat, independent closer to Democrats, the same three for
   Republicans, or "closer to neither". "Neither" is screened out before anything is stored.
3. Server assigns topic × arm.
4. Before reading, three screens: attitude and perceived disagreement; the five statements; charity.
5. Reading. The Continue button unlocks after 60 visible seconds in every arm. Arm (a) links open
   in a new tab, so following a source does not leave the study.
6. After reading, four screens: the same three blocks again (with the attention check inside the
   statements), then crux identification, fairness, learning and prior exposure.
7. Submit, debrief (which arm, who ran it, why that was held back), Prolific completion redirect.

## Measures

Exact wording is in `components/study/StudyFlow.tsx` and `data/study/instruments.ts`. Every
answer is a choice or a whole number; there is no free text anywhere.

| measure | when | scale |
|---|---|---|
| Party and strength | start | 6 categories + "neither" (screened out) |
| Attitude on the map's own question ("Where do you stand?") | before, after | 1 definitely no … 6 definitely yes |
| Perceived disagreement ("How far apart are Democrats and Republicans on this question?") | before, after | 0 mostly agree … 10 completely disagree |
| Perception-gap block: 5 statements per topic. For each, own agreement, and "what percentage of the [other party] taking this study do you think agree?" | before, after | own: 1–4, no midpoint; estimate: 0–100 |
| Charity toward the other party on this topic: how reasonable, how well-informed, how far in good faith | before, after | three 0–10 items, averaged |
| Crux identification: "Which of these, if answered clearly, would do the most to change people's minds?" Four options, shuffled per participant | after only | 1 of 4 |
| Attention check: an instructed item inside the statements ("please choose Disagree") | after | pass/fail |
| Fairness to both sides; how much they learned | after | 0–10 each |
| Prior use of an argument-mapping site such as argumend.org | after | yes / no / not sure |
| Visible seconds on the reading screen; total seconds; disclosures opened (arm a) | automatic | integers |
| Phone or computer (viewport under 640px) | automatic | 2 categories |

**The statements** (written for the study; their "actual" agreement is never asserted, it is
computed from the sample). Each set mixes items one party is stereotyped to reject with items both
are likely to accept, which is where perception gaps have been found before:

- Guns: most gun owners are responsible and law-abiding; safe-storage laws are reasonable; the US
  has a worse gun-violence problem than other wealthy countries; people have a right to own a gun to
  protect their families; some gun laws could reduce deaths without taking guns from law-abiding owners.
- Immigration: properly controlled immigration is good for the country; the US needs to control
  who crosses its southern border; most immigrants come to work and make a better life; asylum
  cases should be decided in months, not years; people facing real persecution should be able to
  seek asylum.
- Transgender athletes: transgender people deserve dignity and respect; fair competition for female
  athletes matters; the health and social benefits of sport should be open to everyone; Olympic and
  school rules need not be the same; male puberty gives advantages hormone therapy does not fully remove.

**Why "of the [other party] taking this study"**: the benchmark is computed from this sample, so
the question asks about this sample. Asking about "Republicans in general" and scoring against
Prolific Republicans would build an error into the outcome.

**Why crux identification is asked after reading only**: asking it before would hand every
participant the four candidate questions and turn the reading into a search for them, which
helps whichever arm makes the answer easiest to find. Randomization makes the arms comparable
without a baseline.

**How the crux item is scored**: the right answer paraphrases the map's first crux; the three
distractors paraphrase facts the map records both sides as accepting (`mapRef` in
`data/study/instruments.ts`). A question everyone already agrees on cannot be what would change
minds. No arm shows the right option word for word (tested).

## Hypotheses

- **H1 (primary).** The perception gap after reading, adjusted for the gap before, is smaller in arm
  (a) than in arm (b), and smaller in arm (a) than in arm (c).
- **H2 (secondary).** More participants in arm (a) pick the crux than in (b), and than in (c).
- **H3 (secondary).** Charity toward the other party after reading, adjusted for before, is higher in
  arm (a) than in (b), and than in (c).

Exploratory, labelled as such wherever reported: perceived disagreement (0–10), signed gap (do
people underestimate the other side's agreement?), attitude change, fairness and learning ratings,
reading time and disclosures opened, arm × topic and arm × party interactions, phone vs computer.

## Primary outcome

**Perception gap**, per participant and phase: the mean over the topic's five statements of
|estimate − actual|, in percentage points, where *actual* is the share of the **other** party's
analysable participants on the same topic who agreed (3 or 4) **before** reading, pooled across
arms. Pre-reading answers are the benchmark because post answers may have been moved by the arm.
Sensitivity check: the same with the post-reading benchmark.

Implemented in `lib/study/analysis.ts` (`actualShares`, `perceptionGap`) and tested on hand-worked
examples.

## Analysis plan

- **H1 model.** OLS: post gap ~ arm (map = reference) + pre gap + topic + party + device, HC2 robust
  standard errors. The two contrasts are the arm coefficients (chatbot − map, article − map;
  positive favours the map).
- **H1 decision.** Supported only if **both** contrasts favour the map with two-sided p < 0.05. That
  is an intersection-union test: requiring both controls the error rate at 0.05 with no correction.
- **Equivalence.** "The map is no better than X" needs a TOST: the 90% interval of the standardized
  contrast inside ±0.20 SD. A non-significant result alone means "not shown", not "no difference".
- **H2.** Linear probability model, crux correct (0/1) ~ arm + topic + party + device, HC2 SEs (no
  pre score; asked once).
- **H3.** As H1, with the post charity index and its pre score.
- **Multiple comparisons.** H1 is its own family (IUT, above). The four secondary contrasts (H2 × 2,
  H3 × 2) are Holm-adjusted together. Exploratory analyses get no correction and no claims.
- **Effect sizes.** Every contrast is also reported in SD units of its post outcome, pooled over arms.
- **Pilot.** Analysed for feasibility only, never pooled with the main study (`--study <id>`).
- `npx tsx scripts/study-report.ts` runs all of this and writes `study-responses.csv` (one row
  per analysed participant: hash, cell, gap scores, every answer) and `study-arms.csv` (one row
  per arm). It was run end to end on synthetic data in which the map arm truly shrinks the gap
  (supported), only beats the article (not supported), and matches both (equivalence with enough n).

## Power and sample size

We found no published estimate for this kind of stimulus and did not look one up for this plan, so
the effect size is not a prediction. It is the **smallest effect worth building a product on**:
d = 0.20 on the post gap, for each contrast.

Assumptions: two-sided α = 0.05; ANCOVA with a pre–post correlation of ρ = 0.6 (to be checked in
the pilot), so the effective effect is 0.20 / √(1 − 0.36) = 0.25; each contrast powered at 0.90 so
that both succeed together with probability about 0.83 (bivariate normal, the two contrasts sharing
arm (a), correlation 0.5).

**Analysable per arm: 337** (2 × (1.960 + 1.282)² / 0.25²). Allowing 15% exclusions:
**recruit 400 per arm, 1,200 in the main study**, plus a pilot of 90.

Power per contrast with 340 analysable per arm:

| true d | ρ = 0.4 | ρ = 0.6 | ρ = 0.8 |
|---|---|---|---|
| 0.10 | 0.30 | 0.37 | 0.58 |
| 0.15 | 0.57 | 0.69 | 0.90 |
| 0.20 | 0.81 | 0.90 | 0.99 |
| 0.25 | 0.94 | 0.98 | 1.00 |

Minimum detectable effect at 80% per contrast: d = 0.17 (ρ = 0.6). For H2, with 35% picking the crux
in a comparison arm (chance is 25%), the 80% MDE is about 45.5% in arm (a). For H3, with ρ = 0.7,
d = 0.15. If the pilot shows ρ below 0.4, the main study needs about 450 per arm for the same power;
that change is decided from the pilot's ρ alone, before any main-study data, and logged.

## Exclusions (pre-registered; nothing else is excluded)

1. Failed the attention check (any answer other than "Disagree").
2. Total time under 4 minutes (240 s). The reading screen alone takes at least 60 s and there are
   about 35 answers.
3. A different instrument version (`version` ≠ `study-v1`).
4. Duplicates cannot occur: one stored response per pseudonym (database unique index); the first
   is kept.
5. "Closer to neither party" never enters the data.

Prior exposure to Argumend is **not** an exclusion; a sensitivity analysis drops "yes".

## Stopping rule

Fixed N. No look at any outcome until data collection for the main study is closed.

- Pilot first (n = 90, 10 per cell). It checks: median time, attention-failure rate, pre–post ρ,
  technical errors, drop-out by arm. It cannot change hypotheses or outcomes.
- During the main study the only allowed view is `scripts/study-report.ts --health`: counts,
  drop-out, exclusions and timing per arm. It computes no outcome.
- Pause (not stop) for: a bug in assignment or storage; attention failure above 25%; drop-out in
  one arm more than 10 points above the others. Fix, log, resume; never on outcome grounds.
- If analysable n falls below 300 in any arm, one top-up batch to 340, decided from `--health` alone.

## Decision rules (written before any data)

Read in order; the first that applies is the decision.

1. **Harm guardrail, whatever else happens.** If arm (a) lowers charity relative to either
   comparison (Holm-adjusted p < 0.05), or moves attitudes in a consistent direction relative to
   both comparisons (|d| ≥ 0.15, p < 0.05, in either party), the map is persuading or hardening,
   not mending. Stop promoting the maps until we know why. This applies even if H1 succeeds.
2. **H1 supported, and the map beats the chatbot by d ≥ 0.10.** The static map does something a good
   chatbot answer does not. Keep the maps; next, a distribution test (does anyone choose to read
   one?) and the same study on the AI map.
3. **The map is equivalent to the chatbot (TOST) or loses to it.** **The static maps aren't the
   product.** A capable chatbot already does this job. Stop broad content rounds. Product effort
   goes to what a chatbot cannot do (the paste tool on a real thread, a maintained crux ledger,
   provenance a reader can check), each tested this way before it is scaled.
4. **The map does not beat the article.** Same conclusion as 3, more strongly: the format does not
   beat a plain explainer. Stop content rounds and rethink the page itself.
5. **Anything else (inconclusive).** We could not show the maps beat a chatbot answer. Treat it as
   "not shown", not as permission to continue: no content round is justified by this study. A
   larger re-run is decided before looking at the secondary outcomes.

H2 cannot rescue a failed H1. A map that teaches its own framing (H2) without changing how people
see the other side (H1) has not done the thing the north star asks for.

We publish the result whichever way it comes out; the debrief tells participants so.

## Stimuli

Arm (a) is the topic page as it stands at the freeze, all folds closed at first, with everything
the site offers (cards, tests, "Read the full case", the one-tap reflection). Arms (b) and (c) are
in `data/study/stimuli.ts`, written for this study to these rules (all tested in
`data/study/stimuli.test.ts`):

- **Only facts already in the map.** Every number in every text appears in the map file; each text
  lists the evidence cards and cruxes it draws on (`sourceIds`), and each id must exist on the map.
- **No direct quotations**, because the map's quotes were not re-checked against their sources for
  this study; the texts paraphrase.
- **No winner.** Neither text says which side is right.
- **Length.** Within ±15% of what arm (a) shows before anything is expanded, measured inside
  `/study` on 3 Nov 2026 (570, 592 and 664 words for guns, immigration and trans athletes; that
  count includes the page's labels and its repeated crux questions). The texts run 508–610 words.
- **Labelled internally by arm.** The participant is never told which kind of text they got until
  the debrief.

## Threats to validity

- **Who wrote the comparison arms.** The team that makes arm (a) wrote arms (b) and (c). A weak
  comparison is the most likely way for this study to flatter us. Mitigations: same facts; the
  chatbot text copies the shape of a capable chatbot answer, including a "key points of contention"
  list that partly names the crux; the fairness and learning ratings act as quality checks (if (b)
  or (c) rate far below (a), suspect the texts before crediting the map). Founder decision below:
  have someone outside the project rate the three texts for quality before launch, or replace (b)
  with a real chatbot answer (more realistic, but it would bring in facts the map lacks).
- **Demand effects.** The same questions before and after invite consistency, and a pre-test
  signals what the study is about. Both apply equally to all arms; the comparison is between arms.
  The sponsor is held back until the debrief so that knowing "this is Argumend's study" does not
  push arm (a) answers.
- **The map has more to read.** Lengths are matched on what is visible unexpanded; arm (a) can be
  opened up further, and the forced 60 seconds does not equalize reading. That is the product, but
  it means a win could be "more information" rather than "better format". Reading time and
  disclosures opened are reported per arm; any dose analysis is exploratory and not causal.
- **Arm (a) rehearses the crux item.** The page's own reflection asks "Which question would change
  your mind?" over the map's cruxes. That helps H2 by construction, which is one reason H2 is secondary.
- **The crux item is scored against the map's own analysis.** "Correct" means "agrees with the
  map". Another analyst might name a different crux.
- **Novelty.** A new format can hold attention once. One reading, measured minutes later, says
  nothing about durability or repeat use.
- **Measurement.** The benchmark is this sample's other party, not the country. Prolific partisans
  are more online and more educated than partisans at large. Results generalize to "people like
  Prolific partisans".
- **We chose the statements.** The gap depends on which statements are asked. They are fixed at the
  freeze; the analysis cannot pick among them.
- **Three maps, chosen for heat and strength.** They are among our better maps. Weaker maps would
  likely do worse; a success here is not a success for the library.
- **Bots and inattentive participants.** There is no free text to screen. The instructed item and the
  time floor catch some; the pilot's failure rate sets expectations.

## Recruitment and cost

Prolific, US residents 18+, fluent in English. Balance by party with Prolific's political-affiliation
screener: run the study twice, one listing for Democrats and one for Republicans, 600 each in the
main study (45 each in the pilot). Republican places may fill more slowly; check the eligible-audience
count Prolific shows during setup. Each listing is its own randomization stratum.

Prolific's pricing page (loaded 3 Nov 2026, prolific.com/pricing) states a recommended minimum of
$12.00 per hour, an absolute minimum of $8.00, and a platform fee of 33.3% for academic and non-profit
accounts and "usually 42.8%" for corporate ones. Argumend would pay the corporate rate unless it runs
the study with an academic partner. It lists no extra charge for screeners.

| | participants | pay at $2.40 (12 min at $12/h) | with 42.8% fee |
|---|---|---|---|
| pilot | 90 | $216 | $308 |
| main | 1,200 | $2,880 | $4,113 |
| **total** | 1,290 | $3,096 | **$4,421** |

Budget to approve: **$5,500**, which leaves about 20% for a top-up batch or a pay rise if the pilot
median runs longer than 12 minutes (pay must track the real median). Any tax Prolific adds at
checkout was not checked. Everyone who completes is paid, including those who fail the attention
check; they are excluded from analysis, not from payment.

## Consent and ethics

- Consent text: `components/study/copy.ts` (`CONSENT_POINTS`), shown before any question. It
  describes the task, the three topics and their charge, what is kept, how long, how to withdraw,
  and that participation is voluntary. Contact is through Prolific's messaging, which keeps the
  researcher's and participant's identities apart.
- **Withheld at consent:** that Argumend runs the study, and which kind of text the participant
  got. Both are disclosed in the debrief, which also says the chatbot and article texts were written
  by the research team, not by a chatbot or a news outlet. This is deception by omission at minimal
  risk; it is the founder's call (below).
- Risk: the topics are charged, and the transgender-athletes topic may be personal for some
  participants. The texts are the map's own steel-manned material and name no winner.
- Ethics review: Argumend is not an institution with an IRB. If the result will be published
  beyond the blog, get an independent review (or an exemption determination) before the pilot. The
  plan does not claim one exists.
- Pre-registration: upload this file, frozen, to OSF or AsPredicted before the main study. The
  timestamp is what makes it a pre-registration.

## Data handling

- **Minimal.** Stored: party, strength, topic, arm, every answer as integers, the crux option id,
  times, opens, device class, the day. Not stored: name, email, IP, user agent, the Prolific session
  id, any text (there is none), any timestamp finer than a day.
- **Pseudonymous.** The Prolific id is replaced by HMAC-SHA256 with `STUDY_PID_SECRET` before
  anything is written; the raw id is never stored or logged. The same secret lets us find a row to
  delete when a participant withdraws, and match Prolific's export for approvals
  (`--check-pids`). Lose the secret and both become impossible; leak it and the pseudonyms can be
  reversed by anyone holding Prolific ids.
- **Enforced** by a strict Zod schema (unknown keys refused, every value bounded), Postgres `CHECK`
  constraints, and no text, json or timestamp column (`lib/study/schema.test.ts` inspects both the
  Drizzle tables and the migration).
- **Google Analytics never sees `/study`.** Its URL carries the Prolific id, so `GAPageView` skips
  it (`components/GAPageView.test.tsx`). The gtag script still loads site-wide when configured, but
  sends no hit on this page.
- **Not under our control:** the first request's URL, Prolific id included, can appear in Cloudflare
  and Coolify access logs, whose retention is not set by this code.
- **Retention:** until the analysis is finished, at most two years (stated in the consent). No
  deletion job exists; deleting the tables is a manual step the founder owns.
- `/privacy` does not mention the study yet. If the study runs, add a short section (founder, with
  the legal review already pending in `docs/PRIVACY_AND_CONSENT.md`).

## Running it

Environment variables (all off or empty by default; none are in `.env.example`):

| variable | where | what |
|---|---|---|
| `NEXT_PUBLIC_ENABLE_STUDY=true` | build | renders `/study`; 404 otherwise. Read at build time: set it, then rebuild. |
| `ENABLE_STUDY_RESPONSES=true` | runtime | opens the two `/api/study/*` routes; 404 otherwise. Independent of the page flag. |
| `STUDY_PID_SECRET` | runtime | 32+ random characters (`openssl rand -hex 32`). Required whenever `DATABASE_URL` is set; without it the routes answer 503 rather than store unpseudonymized data. Store it somewhere it will outlive the study. |
| `STUDY_COMPLETION_CODE` | runtime | the completion code from Prolific's setup page. Returned only by the server after a stored response. |
| `STUDY_SCREENOUT_CODE` | runtime, optional | a second code for "closer to neither"; without it they are asked to return the study. |
| `DATABASE_URL` | runtime | existing. Without it the study is a dry run: assignment is random and nothing is stored, with a warning in the log. |

For `.env.example` (the founder is editing it, so these were not added): the first two as
`=false`, the three study secrets and codes as empty, with a pointer to this section.

Also required in production for the rate limit to key on real visitors: `TRUSTED_PROXY_HOPS=2`
(`lib/clientIp.ts`). The study's limit is 120 requests a minute per address, generous on purpose.

Study URL to give Prolific: `https://argumend.org/study`, with Prolific's URL-parameters option
selected so that it appends `PROLIFIC_PID`, `STUDY_ID` and `SESSION_ID` (check the preview link it
generates). A visit without valid ids sees only "open only to participants invited through
Prolific". The completion URL is built as `https://app.prolific.com/submissions/complete?cc=<code>`
(`lib/study/config.ts`); confirm that host against the link Prolific shows during setup (older
documentation uses `app.prolific.co`).

Commands: `bun run db:migrate` (applies `drizzle/0004_study.sql`); `npx tsx scripts/study-report.ts --health`
during collection; `npx tsx scripts/study-report.ts --study <id> --out <dir>` after it closes.

## What the founder must do

1. **Decide** the open calls: withhold the sponsor until debrief (default yes); outside quality
   rating of the three texts, or a real chatbot answer in arm (b) (default: outside rating, keep the
   written text); publish regardless (default yes, and the debrief already promises it); an
   independent ethics review if the result will be published.
2. **Approve the budget**: $5,500 ceiling.
3. **Prolific**: create a researcher account (a display name that is not "Argumend", if the sponsor is
   withheld), add funds, create the pilot listings (Democrat, Republican; 45 each), then the main
   ones (600 each), with the URL above and manual approval.
4. **Deploy**: set the variables above in Coolify, rebuild (the page flag is build-time), run the
   migration, open `/study` with a test id to check the flow end to end, then turn the flags off
   again until launch.
5. **Freeze**: no edits to the three maps between the pilot and the end of the main study (an edit
   changes arm (a)); upload this file to OSF or AsPredicted; note the commit hash here.
6. **Run**: pilot → read `--health` and the pilot's ρ → adjust N only as the plan allows, log it →
   main study → close → full report → apply the decision rules as written.
7. **Afterwards**: delete the tables when the analysis is done (within two years at most), and add the
   study to `/privacy` if it ran.

## Deviations log

| date | change | why | before or after seeing outcome data |
|---|---|---|---|
| | | | |

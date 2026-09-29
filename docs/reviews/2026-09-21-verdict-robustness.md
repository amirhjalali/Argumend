# Verdict robustness: how much of "Settled" rests on one evidence card

**Date:** 2026-09-21 · **Branch:** `jev/verdict-robustness` · **Status:** implemented, awaiting founder review

## The problem

`getVerdict(balance, weight)` calls a map **settled** when `weight >= 65` and
`|balance − 50| >= 20`. `balance` is a score-weighted share:
`forScore / (forScore + againstScore)` over the 0–40 evidence scores. Every
evidence card carries a `side` of `"for"` or `"against"`, assigned by a human
or model judgement about what the source bears on.

Two independent adjudication passes over the library disagreed about those
judgements. Twenty-two `side` corrections changed five topics' quadrants, two
of them on a single card's margin, and six further quadrant flips were within
reach of defensible single-card calls. That is the whole problem in one
sentence: **the quantity we publish a strong public claim from moves further
on one judgement call than the threshold that licenses the claim.**

Measured across all 156 topics (`scripts/verdict-sensitivity.ts`):

| card count | topics | median one-card balance swing | max |
| --- | ---: | ---: | ---: |
| ≤ 7 | 34 | 34 | 48 |
| 8–11 | 59 | 27 | 32 |
| 12–15 | 50 | 19 | 22 |
| ≥ 16 | 13 | 13 | 15 |

The settled threshold is a 20-point gap. On the library's median map (9 cards)
one card moves the balance by 25 points. The gap the claim rests on is
smaller than the error bar on the measurement.

Two numbers make it concrete:

- **10 of the 13 settled topics lose "settled" if any one card is relabelled.**
  Only `climate-change`, `animal-consciousness-rights` and
  `affirmative-action-meritocracy` survive on their evidence, and each of those
  survives by exactly two flips — none by three. (Of the ten, nine are demoted
  below; the tenth, `moon-landing`, keeps the word on the editorial pin and
  carries the fragility flag.)
- **50 of the 90 contested topics are one card away from "settled".** The
  boundary is not a boundary; it is a coin the library is sitting on.
- `lab-grown-meat-adoption` (5 cards) has a one-card balance range of **30–78**.
  A single relabel takes that map from "strongly favors the counterclaim" to
  "strongly favors the claim". It is spared only because its weight (49) keeps
  it out of the settled half of the matrix entirely.

## What is measured

`lib/verdictSensitivity.ts`, pure and deterministic:

- **`quadrant`** — the quadrant under the authored labels.
- **`flipsToChange`** — the fewest simultaneous `side` flips that land the map
  in a different quadrant. Computed exhaustively over every subset up to
  `MAX_FLIP_SEARCH` (4); `null` means no subset that small changes it.
- **`oneCardBalanceRange`** — `{min, max, span}` over the balance readings
  reachable by flipping any single card, including the current reading.

The search is cheap because of one property worth stating: **`computeWeight`
never reads `side`.** It is a composite of evidential mass, average score and
crux resolvability — all side-blind. A flip therefore moves `balance` alone and
leaves `weight` fixed, so "the quadrant after a flip" is a function of one
number, and the exhaustive subset walk is over a scalar. It also means
`flipsToChange` is exactly `null` (not merely "not found") for every moderate
and open map: those quadrants are set by weight alone, so no relabelling of any
size can move them. 53 of the 156 topics are in that position.

`buildTopic`'s settled balance floor is respected: where a topic authored
`status: "settled"` publishes a balance above the one its cards compute, the
flip search keeps the floor, so it never reports a flip the published number
would not show.

## The rule

Implemented as `applyVerdictRobustness` in `lib/schemas/topic.ts`, thresholds in
`VERDICT_ROBUSTNESS` (`lib/constants.ts`):

> A map **earns** the word **settled** only when `flipsToChange >= 2` (no single
> card relabel can take it away) **and** it carries at least **8** evidence
> cards. A map that fails either test is demoted to `moderate` with the lean
> label alone (`getLeanLabel`, e.g. "Clearly favors the claim"), and
> `verdict.fragile` is set.
>
> **The editorial pin.** A topic authored `status: "settled"` keeps the settled
> quadrant and label anyway — an editor asserting the question is settled in the
> world outranks a shallow map — but `verdict.fragile` is still set and
> `verdict.pinnedByStatus` records that the word rests on the editor rather than
> on the cards. The pin changes what is displayed, never what is disclosed. Only
> `status: "settled"` pins; no other authored status changes anything, and the
> pin can only keep a settled reading, never create one.

This mirrors how the crux engine treats `cruxOverride: "pin"`: the editorial
judgement wins the display, and the override is recorded so the reader and the
next reviewer can both see that it was used.

Four properties were deliberate:

1. **`balance` and `weight` are published unchanged.** Only the quadrant word
   and label are guarded. The reader still sees the same numbers and can still
   see the tilt; what is withheld is the claim that the tilt is settled.
2. **It never strengthens a reading.** `contested` and `open` are untouched, and
   the guard's only two outcomes are "demote" and "keep, but flag". Nothing here
   can turn a weaker quadrant into a stronger one.
3. **It is honest about itself.** Every flagged verdict — demoted *or* pinned —
   carries `fragile: true`, and every surface that shows the label shows one
   line under it: *"One evidence card could change this reading."* A silent
   demotion would trade one misleading display for another; a silent pin would
   be worse, since it would keep the strong claim and drop the caveat.
4. **The pin cannot manufacture a claim.** It applies only where the computed
   quadrant was already `settled` and only demotion was on the table. An
   authored-settled topic whose map reads `contested` stays `contested`.

### Why N = 8

The card minimum is **non-binding today** — all 13 settled maps already have 8
or more cards, so every demotion below comes from the flip test alone. It earns
its place as a floor against a case the flip test does not catch, and 8 is where
the data puts the floor:

- **Below 8 cards, one card can cross the entire contested band.** Going from
  "settled favors the claim" (balance ≥ 70) to "settled favors the counterclaim"
  (≤ 30) is a 40-point move. In the ≤ 7 bucket the maximum observed one-card
  swing is 48 — wider than the band. At 8+ cards the maximum observed is 32,
  which cannot cross it. 8 is the smallest count in this library at which no
  single card can carry a map from one settled side to the other.
- **The flip test alone would admit thin, lopsided maps.** A 5-card map with
  every card on one side reads balance 100 and needs two flips to fall below
  the line — it passes the flip test while resting on five judgements. The card
  minimum is what stops "settled" from being cheap to buy with few cards.
- **Eleven maps are already in position to need it.** Eleven topics have fewer
  than 8 cards and weight ≥ 65, and ten of those eleven are one card from
  settled today. The next relabel on any of them puts a 6- or 7-card map into
  the settled half.

8 is also where the authoring template starts. The two modal card counts are
8 and 12 — 41 topics each — which is four cards per pillar on a two- and a
three-pillar map. The 34 maps below 8 are short of that template rather than
built to a different one, so the minimum penalises no map built to spec.

## Alternatives considered

**Widen the settled threshold (`SETTLED_D` 20 → 30).** Blunter and mis-targeted.
It would strip the word from 11 of the 13 rather than 10 — including
`affirmative-action-meritocracy` (balance 78), which is one of only three maps
that actually survives a single relabel. And it still measures the wrong thing:
a 5-card map at balance 85 would sail through a 30-point threshold while resting
on one card. A threshold on the statistic cannot substitute for a measurement of
the statistic's stability. Rejected.

**Card-count minimum only.** Demotes zero of the 13 settled topics, since all of
them already clear 8 cards. It addresses nothing on its own. Kept as the second
half of the rule, not as the rule. Rejected alone.

**Bootstrap over the card weights.** Resample or perturb the 0–10 sub-scores and
report how often the quadrant survives. It is the more general instrument, and
worth revisiting. Three reasons not to lead with it: it needs a noise model for
the sub-scores that nobody has calibrated (and an uncalibrated one would launder
a guess into a number); it is not deterministic without a fixed seed, which
makes the published verdict a function of an RNG; and it models the wrong error.
The two reviews did not disagree about whether a source scored 7 or 8 on
independence — they disagreed about which *side* the card was on. That error is
categorical, and `flipsToChange` measures it directly. Rejected for now, noted
as a future refinement for sub-score sensitivity.

**Leave it.** Ten of thirteen settled verdicts rest on one judgement call, and
five topics changed quadrant on a single adjudication pass. "Settled — evidence
strongly favors the counterclaim" on `trump-tariffs` or `immigration-wage-impact`
is among the strongest things this site says, and it is currently one relabel
deep. Rejected.

## Effect on the library

### On the committed data (main)

156 topics. **13 settled before → 4 after: 3 earned, 1 pinned, 9 demoted.**

Demoted to `moderate` + fragile — every one of them on a single flip:

| topic | cards | balance | weight | before | after | flips | one-card range |
| --- | ---: | ---: | ---: | --- | --- | ---: | --- |
| `drug-decriminalization` | 8 | 75 | 65 | settled | moderate | 1 | 62–89 |
| `immigration-wage-impact` | 8 | 21 | 65 | settled | moderate | 1 | 8–35 |
| `jones-act` | 18 | 73 | 77 | settled | moderate | 1 | 67–80 |
| `meritocracy-myth` | 12 | 70 | 76 | settled | moderate | 1 | 59–79 |
| `nuclear-weapons-abolition` | 10 | 30 | 70 | settled | moderate | 1 | 19–41 |
| `student-debt-forgiveness` | 10 | 70 | 71 | settled | moderate | 1 | 59–81 |
| `trump-tariffs` | 16 | 29 | 78 | settled | moderate | 1 | 22–36 |
| `universal-basic-income` | 14 | 70 | 73 | settled | moderate | 1 | 61–78 |
| `universal-healthcare` | 9 | 71 | 76 | settled | moderate | 1 | 58–82 |

Kept on the editorial pin — settled label, `fragile` and `pinnedByStatus` set:

| topic | cards | balance | weight | before | after | flips | one-card range |
| --- | ---: | ---: | ---: | --- | --- | ---: | --- |
| `moon-landing` | 8 | 76 | 82 | settled | settled (pinned) | 1 | 61–88 |

Earning settled on their own evidence: `affirmative-action-meritocracy`
(14 cards, balance 78, 2 flips), `animal-consciousness-rights` (11, 81, 2),
`climate-change` (12, 85, 2) — the last of which is the other
`status: "settled"` topic and needs no pin.

`flipsToChange` distribution, all 156 topics: **1** → 60 · **2** → 35 ·
**3** → 7 · **4** → 1 · **>4 (unmovable)** → 53.
Among the 13 settled-before topics: **1** → 10 · **2** → 3.

### On the corrected side labels (`jev-program`)

Measured with `--overlay` against that branch's 17 changed topic files, without
touching anything in `data/`. The adjudication adds four settled verdicts, and
the guard splits them:

| topic | cards | balance | flips | outcome |
| --- | ---: | ---: | ---: | --- |
| `us-iran-conflict` | 12 | 23 | 1 | **demoted** → moderate, fragile |
| `doge-federal-cuts` | 16 | 25 | 1 | **demoted** → moderate, fragile |
| `obesity-personal-responsibility` | 12 | 18 | 2 | survives as settled |
| `scott-cost-disease` | 16 | 85 | 3 | survives as settled |

Library-wide on the corrected data: **17 settled before → 6 after: 5 earned,
1 pinned, 11 demoted** (the 9 above plus `us-iran-conflict` and
`doge-federal-cuts`). `flipsToChange` among the 17 settled-before:
**1** → 12 · **2** → 4 · **3** → 1. The pinned topic is `moon-landing` in both
runs; the adjudication does not touch its map.

`data/topicSummaries.json` on this branch was regenerated against main's data
and must be regenerated again once the corrected labels merge.

## Open questions

1. **`moon-landing` is pinned, and the map is still the real problem.** Its map
   is 8 cards — three "for" plus one steelmanned "against" per pillar, two
   pillars — which puts balance at 76, six points over the line. Relabelling
   either "against" card drops it to 61. On its own evidence the map cannot
   carry "settled", and the first version of this work demoted it, which would
   have had the site read "Clearly favors the claim" about the moon landing.

   **What shipped is the editorial pin** (option (b), done in the open): the
   authored `status: "settled"` keeps the quadrant and the settled label, and
   the verdict is still marked `fragile`, so the page shows "Settled — evidence
   strongly favors the claim" with "One evidence card could change this reading"
   directly beneath it, and `pinnedByStatus` names the topic in the summaries
   and in the tables above. It is the only pinned topic in the library.

   This resolves the display and does not resolve the underlying gap. The pin is
   a promise, not a fix: **deepening the map to 12+ cards is still the right
   answer** for the site's flagship topic, and it is the only thing that will
   clear the `fragile` flag. The pin should be read as a standing to-do with a
   name attached, and the count of pinned topics is a number to drive to zero —
   if it grows, the guard is being routed around rather than satisfied.

   One knock-on, now resolved: the topic-page banner renders the authored
   `status` pill directly under the verdict label. Under the demotion that read
   "Clearly favors the claim" / **Settled**, a visible contradiction. Under the
   pin the two agree, because the pill and the quadrant now come from the same
   editorial assertion — which is the honest reason they agree, and the reason
   the fragility line has to stay.
2. **Should `contested` get a symmetric guard?** 50 of 90 contested topics are
   one card from settled. "Contested" is the humbler claim so it is less
   dangerous to publish, but it is no better measured, and the reader is not
   told. Deliberately out of scope here.
3. **The authoring template is part of the cause.** A two-pillar map with three
   "for" and one "against" per pillar can only land near balance 75 — right on
   the settled line — and gives every "against" card a sixth of the total mass.
   The structural fix is deeper maps or per-pillar balance aggregation, not a
   threshold.
4. **`MAX_FLIP_SEARCH = 4`** is enough to classify every topic that can move at
   all (the 53 `>4` results are all moderate/open, where the answer is exactly
   `null`). If the quadrant logic ever becomes balance-sensitive below
   `HIGH_WEIGHT`, the cap will need revisiting.
5. **Is `fragile` the right thing to persist?** It is currently derived at build
   time and stored on the verdict, alongside `pinnedByStatus`. The underlying
   `flipsToChange` and `oneCardBalanceRange` are not stored; anything that wants
   them recomputes via `topicVerdictSensitivity`. If a surface ever wants to
   show "2 cards from changing", that decision gets revisited.
6. **Should a pinned verdict read differently from a demoted one?** Both show
   the same line today. A pinned map is making a stronger claim on thinner
   evidence, so there is an argument for naming the pin to the reader
   ("settled by editorial judgement; the map is still shallow") rather than
   only in the data. Held back because the extra words compete with the verdict
   itself, and one pinned topic is not enough signal to design against.

## Reproducing

```bash
bun --bun tsx scripts/verdict-sensitivity.ts                 # full table + summary
bun --bun tsx scripts/verdict-sensitivity.ts --changed-only  # just the demotions
bun --bun tsx scripts/verdict-sensitivity.ts --markdown      # the tables above
```

## Appendix — full before/after table, all 156 topics

| topic | cards | balance | weight | before | after | flips | one-card range | fragile | pinned |
| --- | ---: | ---: | ---: | --- | --- | ---: | --- | --- | --- |
| `adhd-overdiagnosis` | 7 | 59 | 69 | contested | contested | 1 | 42–73 (31) |  |  |
| `affirmative-action-meritocracy` | 14 | 78 | 77 | settled | settled | 2 | 70–87 (17) |  |  |
| `ai-2027` | 21 | 54 | 77 | contested | contested | 4 | 48–60 (12) |  |  |
| `ai-content-labeling` | 8 | 63 | 56 | moderate | moderate | >4 | 47–78 (31) |  |  |
| `ai-deepfakes-truth-collapse` | 7 | 72 | 61 | moderate | moderate | >4 | 55–86 (31) |  |  |
| `ai-energy-water-footprint` | 8 | 55 | 69 | contested | contested | 2 | 38–69 (31) |  |  |
| `ai-in-education` | 10 | 45 | 64 | moderate | moderate | >4 | 34–58 (24) |  |  |
| `ai-job-displacement` | 17 | 51 | 77 | contested | contested | 3 | 45–58 (13) |  |  |
| `ai-regulation` | 12 | 59 | 75 | contested | contested | 2 | 50–68 (18) |  |  |
| `ai-replacing-doctors` | 15 | 44 | 74 | contested | contested | 2 | 37–52 (15) |  |  |
| `ai-risk` | 12 | 59 | 70 | contested | contested | 2 | 48–68 (20) |  |  |
| `ai-superintelligence-timeline` | 12 | 60 | 67 | contested | contested | 2 | 50–68 (18) |  |  |
| `ai-therapy-chatbots` | 12 | 39 | 73 | contested | contested | 1 | 30–49 (19) |  |  |
| `ai-white-collar-displacement` | 19 | 46 | 76 | contested | contested | 3 | 40–52 (12) |  |  |
| `alcohol-no-safe-level` | 7 | 59 | 71 | contested | contested | 1 | 44–74 (30) |  |  |
| `alternatives-to-democracy` | 6 | 49 | 61 | moderate | moderate | >4 | 32–67 (35) |  |  |
| `animal-consciousness-rights` | 11 | 81 | 71 | settled | settled | 2 | 72–91 (19) |  |  |
| `artificial-reproduction-ethics` | 9 | 69 | 66 | contested | contested | 1 | 57–80 (23) |  |  |
| `assisted-dying-euthanasia` | 7 | 59 | 63 | moderate | moderate | >4 | 42–75 (33) |  |  |
| `autonomous-weapons-ban` | 7 | 59 | 59 | moderate | moderate | >4 | 43–74 (31) |  |  |
| `big-tech-antitrust` | 8 | 65 | 60 | moderate | moderate | >4 | 48–78 (30) |  |  |
| `billionaire-wealth` | 8 | 68 | 59 | moderate | moderate | >4 | 51–80 (29) |  |  |
| `cancel-culture` | 8 | 64 | 53 | moderate | moderate | >4 | 50–81 (31) |  |  |
| `carbon-capture-viability` | 14 | 42 | 73 | contested | contested | 2 | 34–50 (16) |  |  |
| `carbon-tax-effectiveness` | 8 | 63 | 72 | contested | contested | 1 | 49–76 (27) |  |  |
| `central-bank-digital-currency` | 7 | 43 | 61 | moderate | moderate | >4 | 28–58 (30) |  |  |
| `children-smartphone-age` | 7 | 72 | 58 | moderate | moderate | >4 | 56–88 (32) |  |  |
| `china-taiwan-invasion` | 12 | 47 | 67 | contested | contested | 2 | 37–57 (20) |  |  |
| `climate-change` | 12 | 85 | 83 | settled | settled | 2 | 75–91 (16) |  |  |
| `college-value-proposition` | 8 | 61 | 64 | moderate | moderate | >4 | 47–76 (29) |  |  |
| `congestion-pricing` | 6 | 53 | 65 | contested | contested | 1 | 33–70 (37) |  |  |
| `congressional-term-limits` | 8 | 33 | 71 | contested | contested | 1 | 19–48 (29) |  |  |
| `consciousness-ai-systems` | 12 | 31 | 63 | moderate | moderate | >4 | 23–41 (18) |  |  |
| `consciousness-hard-problem` | 10 | 69 | 67 | contested | contested | 1 | 57–79 (22) |  |  |
| `cryptocurrency-regulation` | 15 | 47 | 75 | contested | contested | 3 | 40–55 (15) |  |  |
| `cryptocurrency-value` | 7 | 54 | 66 | contested | contested | 1 | 37–71 (34) |  |  |
| `dark-matter-vs-mond` | 7 | 46 | 72 | contested | contested | 1 | 30–62 (32) |  |  |
| `daylight-saving-time-abolition` | 12 | 69 | 73 | contested | contested | 1 | 60–78 (18) |  |  |
| `de-extinction-species` | 12 | 36 | 73 | contested | contested | 1 | 28–47 (19) |  |  |
| `death-penalty-deterrence` | 8 | 22 | 56 | moderate | moderate | >4 | 14–41 (27) |  |  |
| `declining-birth-rates` | 7 | 59 | 64 | moderate | moderate | >4 | 43–75 (32) |  |  |
| `degrowth-economics` | 12 | 58 | 71 | contested | contested | 2 | 49–68 (19) |  |  |
| `doge-federal-cuts` | 16 | 31 | 78 | contested | contested | 1 | 24–38 (14) |  |  |
| `drug-decriminalization` | 8 | 75 | 65 | settled | moderate | 1 | 62–89 (27) | **yes** |  |
| `eacc-vs-tech-regulation` | 14 | 63 | 74 | contested | contested | 1 | 56–71 (15) |  |  |
| `effective-altruism` | 7 | 57 | 65 | contested | contested | 1 | 40–73 (33) |  |  |
| `electoral-college-reform` | 5 | 68 | 58 | moderate | moderate | >4 | 44–87 (43) |  |  |
| `encryption-backdoors` | 8 | 35 | 63 | moderate | moderate | >4 | 23–50 (27) |  |  |
| `epstein-files` | 12 | 61 | 76 | contested | contested | 1 | 52–71 (19) |  |  |
| `estate-inheritance-tax` | 8 | 70 | 64 | moderate | moderate | >4 | 54–84 (30) |  |  |
| `ev-environmental-impact` | 8 | 62 | 71 | contested | contested | 1 | 48–75 (27) |  |  |
| `facial-recognition-policing` | 8 | 51 | 73 | contested | contested | 2 | 35–65 (30) |  |  |
| `factory-farming-ban` | 8 | 66 | 60 | moderate | moderate | >4 | 51–78 (27) |  |  |
| `fluoride-water-supplies` | 12 | 33 | 72 | contested | contested | 1 | 24–43 (19) |  |  |
| `foreign-aid-effectiveness` | 8 | 40 | 66 | contested | contested | 1 | 26–54 (28) |  |  |
| `four-day-work-week` | 9 | 57 | 62 | moderate | moderate | >4 | 45–69 (24) |  |  |
| `free-will` | 12 | 48 | 64 | moderate | moderate | >4 | 38–58 (20) |  |  |
| `gain-of-function-research-ban` | 7 | 58 | 62 | moderate | moderate | >4 | 42–74 (32) |  |  |
| `gender-affirming-care-minors` | 10 | 37 | 66 | contested | contested | 1 | 27–49 (22) |  |  |
| `gene-editing-embryos` | 8 | 49 | 60 | moderate | moderate | >4 | 35–63 (28) |  |  |
| `generative-ai-art-copyright` | 9 | 65 | 67 | contested | contested | 1 | 52–78 (26) |  |  |
| `geoengineering-climate` | 7 | 30 | 64 | moderate | moderate | >4 | 14–45 (31) |  |  |
| `gig-economy-regulation` | 5 | 67 | 54 | moderate | moderate | >4 | 44–84 (40) |  |  |
| `global-housing-bubble` | 12 | 68 | 73 | contested | contested | 1 | 58–77 (19) |  |  |
| `global-water-crisis` | 12 | 67 | 74 | contested | contested | 1 | 58–76 (18) |  |  |
| `glp1-weight-loss-drugs` | 15 | 48 | 77 | contested | contested | 3 | 41–55 (14) |  |  |
| `gmo-crops-safety` | 9 | 47 | 76 | contested | contested | 2 | 34–59 (25) |  |  |
| `government-platform-bans` | 8 | 63 | 68 | contested | contested | 1 | 48–76 (28) |  |  |
| `gun-control-effectiveness` | 8 | 54 | 68 | contested | contested | 2 | 38–69 (31) |  |  |
| `homeschooling-effectiveness` | 8 | 53 | 50 | moderate | moderate | >4 | 40–72 (32) |  |  |
| `housing-affordability-crisis` | 12 | 66 | 73 | contested | contested | 1 | 57–76 (19) |  |  |
| `hydrogen-economy-viability` | 12 | 39 | 75 | contested | contested | 1 | 30–48 (18) |  |  |
| `immigration-border-crisis` | 10 | 40 | 69 | contested | contested | 1 | 29–51 (22) |  |  |
| `immigration-national-identity` | 6 | 49 | 61 | moderate | moderate | >4 | 31–67 (36) |  |  |
| `immigration-wage-impact` | 8 | 21 | 65 | settled | moderate | 1 | 8–35 (27) | **yes** |  |
| `inflation-monetary-policy` | 12 | 40 | 81 | contested | contested | 2 | 31–49 (18) |  |  |
| `intermittent-fasting-efficacy` | 12 | 41 | 78 | contested | contested | 2 | 33–51 (18) |  |  |
| `iran-war-justification` | 12 | 50 | 70 | contested | contested | 2 | 39–61 (22) |  |  |
| `jones-act` | 18 | 73 | 77 | settled | moderate | 1 | 67–80 (13) | **yes** |  |
| `lab-diamonds-ethics` | 12 | 60 | 69 | contested | contested | 1 | 50–70 (20) |  |  |
| `lab-grown-meat-adoption` | 5 | 54 | 49 | moderate | moderate | >4 | 30–78 (48) |  |  |
| `lab-leak-theory` | 21 | 64 | 69 | contested | contested | 1 | 58–71 (13) |  |  |
| `lithium-mining-ev-impact` | 14 | 44 | 79 | contested | contested | 2 | 37–52 (15) |  |  |
| `loneliness-epidemic` | 12 | 57 | 72 | contested | contested | 2 | 48–66 (18) |  |  |
| `longevity-anti-aging` | 8 | 61 | 62 | moderate | moderate | >4 | 48–76 (28) |  |  |
| `longevity-science` | 12 | 65 | 73 | contested | contested | 1 | 55–74 (19) |  |  |
| `mandatory-voting` | 7 | 76 | 53 | moderate | moderate | >4 | 57–90 (33) |  |  |
| `masculinity-crisis` | 10 | 59 | 70 | contested | contested | 1 | 48–70 (22) |  |  |
| `meaning-without-religion` | 6 | 66 | 56 | moderate | moderate | >4 | 47–88 (41) |  |  |
| `media-bias-democracy` | 8 | 79 | 62 | moderate | moderate | >4 | 62–91 (29) |  |  |
| `meritocracy-myth` | 12 | 70 | 76 | settled | moderate | 1 | 59–79 (20) | **yes** |  |
| `microplastics-health-crisis` | 12 | 66 | 72 | contested | contested | 1 | 57–75 (18) |  |  |
| `minimum-wage-effects` | 8 | 61 | 63 | moderate | moderate | >4 | 47–75 (28) |  |  |
| `minneapolis-shooting` | 4 | 86 | 49 | moderate | moderate | >4 | 55–100 (45) |  |  |
| `modern-monetary-theory` | 8 | 47 | 65 | contested | contested | 2 | 32–62 (30) |  |  |
| `moloch` | 18 | 46 | 72 | contested | contested | 3 | 40–53 (13) |  |  |
| `moon-landing` | 8 | 76 | 82 | settled | settled | 1 | 61–88 (27) | **yes** | **pin** |
| `net-neutrality` | 7 | 57 | 67 | contested | contested | 1 | 39–73 (34) |  |  |
| `nuclear-energy-safety` | 8 | 54 | 76 | contested | contested | 2 | 39–66 (27) |  |  |
| `nuclear-fusion-timeline` | 9 | 47 | 59 | moderate | moderate | >4 | 33–62 (29) |  |  |
| `nuclear-proliferation-new-arms-race` | 10 | 60 | 71 | contested | contested | 1 | 49–71 (22) |  |  |
| `nuclear-renaissance-smr` | 12 | 46 | 66 | contested | contested | 2 | 36–57 (21) |  |  |
| `nuclear-weapons-abolition` | 10 | 30 | 70 | settled | moderate | 1 | 19–41 (22) | **yes** |  |
| `obesity-personal-responsibility` | 12 | 31 | 72 | contested | contested | 1 | 21–41 (20) |  |  |
| `occupational-licensing-reform` | 8 | 64 | 73 | contested | contested | 1 | 50–76 (26) |  |  |
| `open-borders` | 8 | 62 | 57 | moderate | moderate | >4 | 47–75 (28) |  |  |
| `open-weight-ai-models` | 17 | 51 | 75 | contested | contested | 3 | 44–59 (15) |  |  |
| `organic-food-health` | 8 | 61 | 61 | moderate | moderate | >4 | 48–75 (27) |  |  |
| `pandemic-preparedness` | 14 | 57 | 75 | contested | contested | 2 | 49–65 (16) |  |  |
| `pfas-forever-chemicals` | 12 | 68 | 70 | contested | contested | 1 | 58–78 (20) |  |  |
| `police-reform` | 8 | 79 | 58 | moderate | moderate | >4 | 64–91 (27) |  |  |
| `privacy-vs-convenience` | 12 | 51 | 73 | contested | contested | 2 | 42–61 (19) |  |  |
| `psychedelic-therapy-hype` | 8 | 45 | 64 | moderate | moderate | >4 | 32–60 (28) |  |  |
| `psychedelics-mental-health` | 5 | 74 | 52 | moderate | moderate | >4 | 53–100 (47) |  |  |
| `remote-work-permanence` | 8 | 58 | 57 | moderate | moderate | >4 | 45–74 (29) |  |  |
| `rent-control-effectiveness` | 12 | 58 | 70 | contested | contested | 2 | 48–68 (20) |  |  |
| `reparations-slavery` | 8 | 78 | 61 | moderate | moderate | >4 | 62–90 (28) |  |  |
| `return-to-office-productivity` | 12 | 36 | 64 | moderate | moderate | >4 | 27–46 (19) |  |  |
| `rfk-health-policy` | 16 | 44 | 72 | contested | contested | 2 | 37–52 (15) |  |  |
| `right-to-repair` | 7 | 77 | 55 | moderate | moderate | >4 | 58–91 (33) |  |  |
| `school-phone-bans` | 12 | 66 | 71 | contested | contested | 1 | 57–75 (18) |  |  |
| `scott-cost-disease` | 16 | 67 | 81 | contested | contested | 1 | 60–74 (14) |  |  |
| `second-amendment-individual-right` | 8 | 52 | 69 | contested | contested | 2 | 37–65 (28) |  |  |
| `section-230-reform` | 7 | 42 | 61 | moderate | moderate | >4 | 25–59 (34) |  |  |
| `seed-oils-health` | 12 | 46 | 66 | contested | contested | 2 | 37–57 (20) |  |  |
| `self-driving-car-safety` | 7 | 43 | 67 | contested | contested | 1 | 28–58 (30) |  |  |
| `sex-work-decriminalization` | 8 | 69 | 70 | contested | contested | 1 | 54–81 (27) |  |  |
| `simulation-hypothesis` | 12 | 51 | 64 | moderate | moderate | >4 | 41–60 (19) |  |  |
| `social-media-age-limits` | 8 | 59 | 56 | moderate | moderate | >4 | 44–73 (29) |  |  |
| `social-media-elections` | 10 | 69 | 70 | contested | contested | 1 | 58–80 (22) |  |  |
| `social-media-mental-health` | 8 | 47 | 60 | moderate | moderate | >4 | 33–62 (29) |  |  |
| `social-security-retirement-age` | 7 | 43 | 72 | contested | contested | 1 | 27–59 (32) |  |  |
| `space-colonization-feasibility` | 5 | 55 | 53 | moderate | moderate | >4 | 33–79 (46) |  |  |
| `space-exploration-value` | 8 | 61 | 55 | moderate | moderate | >4 | 45–75 (30) |  |  |
| `sports-betting-legalization` | 12 | 47 | 69 | contested | contested | 2 | 38–57 (19) |  |  |
| `ssri-antidepressant-efficacy` | 7 | 58 | 71 | contested | contested | 1 | 42–74 (32) |  |  |
| `standardized-testing-debate` | 5 | 62 | 56 | moderate | moderate | >4 | 40–83 (43) |  |  |
| `student-debt-forgiveness` | 10 | 70 | 71 | settled | moderate | 1 | 59–81 (22) | **yes** |  |
| `sugar-tax-effectiveness` | 12 | 69 | 72 | contested | contested | 1 | 59–78 (19) |  |  |
| `surveillance-public-safety` | 5 | 19 | 50 | moderate | moderate | >4 | 0–43 (43) |  |  |
| `tiktok-ban` | 19 | 53 | 80 | contested | contested | 3 | 47–59 (12) |  |  |
| `tiktok-brain-rot` | 12 | 63 | 65 | contested | contested | 1 | 53–74 (21) |  |  |
| `tipping-culture` | 12 | 57 | 81 | contested | contested | 2 | 47–66 (19) |  |  |
| `transgender-athletes-sports` | 8 | 36 | 66 | contested | contested | 1 | 22–50 (28) |  |  |
| `trump-tariffs` | 16 | 29 | 78 | settled | moderate | 1 | 22–36 (14) | **yes** |  |
| `ukraine-peace-terms` | 16 | 38 | 71 | contested | contested | 2 | 31–45 (14) |  |  |
| `ultra-processed-food` | 10 | 62 | 66 | contested | contested | 1 | 51–73 (22) |  |  |
| `universal-basic-income` | 14 | 70 | 73 | settled | moderate | 1 | 61–78 (17) | **yes** |  |
| `universal-healthcare` | 9 | 71 | 76 | settled | moderate | 1 | 58–82 (24) | **yes** |  |
| `us-iran-conflict` | 12 | 48 | 76 | contested | contested | 2 | 39–58 (19) |  |  |
| `us-national-debt-crisis` | 12 | 59 | 83 | contested | contested | 2 | 49–68 (19) |  |  |
| `vaccine-mandates` | 9 | 59 | 73 | contested | contested | 1 | 47–71 (24) |  |  |
| `vaping-harm-reduction` | 6 | 52 | 65 | contested | contested | 2 | 32–69 (37) |  |  |
| `veganism-environmental-impact` | 5 | 63 | 64 | moderate | moderate | >4 | 41–83 (42) |  |  |
| `vertical-farming-viability` | 12 | 38 | 71 | contested | contested | 1 | 29–47 (18) |  |  |
| `wealth-tax` | 8 | 48 | 66 | contested | contested | 2 | 35–63 (28) |  |  |

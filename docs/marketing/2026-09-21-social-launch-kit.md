# Social launch kit — Argumend X account, first two weeks

Companion to `docs/marketing/2026-09-17-jev-post-social-kit.md`, which governs tone and carries the
"do not claim" list. That list applies to everything here as well.

Every number in the 30 posts below is computed from the published map data, not written from memory.
Regenerate or re-check any of them with:

```bash
bun run scripts/marketing/social-candidates.ts <topic-id>
```

The script filters to `verdict.quadrant === "contested"`, picks the pillar whose *weaker* side carries
the strongest evidence (so neither quoted card is a straw man), and scores each card with
`lib/evidenceMetrics.calculateEvidenceScore` — the 0-40 sum of source reliability, independence,
replicability and directness.

Corpus figures used below, all from `data/topics.ts` as of 2026-09-21: **156 maps, 432 pillars/cruxes,
1,567 evidence cards** (1,551 with a source URL), of which 90 maps sit in the `contested` quadrant
(27 policy, 24 science, 19 technology, 16 economics, 4 philosophy).

---

## 1. Account setup

### Handle candidates to check

In preference order. Check each on X, and also check that the same string is free on Bluesky and
Threads before committing, because the handle goes in the bio of the founder account too.

| Rank | Handle | Note |
| --- | --- | --- |
| 1 | `@argumend` | First choice. Already the first suggestion in the 2026-09-17 kit. |
| 2 | `@argumendorg` | Matches the canonical domain `argumend.org`. |
| 3 | `@argumend_org` | Underscore variant; only if the above two are taken. |
| 4 | `@argumendmaps` | Says what the product is. Reads well in a reply. |
| 5 | `@readargumend` | Last resort — "read" mis-frames an interactive canvas. |

Also register the two nearest typos (`@argumend` vs `@arguemend`) as defensive holds if X allows it,
and reserve the same handle on Bluesky and Threads on day one whether or not you post there.

### Bio (under 160 characters)

```
Maps of hard disagreements. Every topic has a crux, weighted evidence on both sides, and no winner. 156 maps, 1,567 sources scored 0-40. argumend.org
```

149 characters. It states the brand rule verbatim and the two numbers that back it. Do not add
"AI-powered" — the differentiator is the discipline, not the model.

Location field: leave blank. Birthday: leave blank. Profile link: `https://argumend.org`.

**Alternate, if you want the Jev angle in the bio during launch week only:**

```
Maps of hard disagreements: a crux, weighted evidence on both sides, no winner. 156 maps, 1,567 sources. Pinned: what a mute model found. argumend.org
```

150 characters. Revert to the primary bio after the pinned thread rotates out. Note the wording:
"pinned: what a mute model found" describes the write-up. Do not write anything that implies the
reply bot is live in a community, which the 2026-09-17 "do not claim" list rules out.

### Link

`https://argumend.org` in the profile link field.

In posts, always link the specific map (`https://argumend.org/topics/<id>`), never the home page. A
reply that lands someone on the home page makes them search; a reply that lands them on the map they
were arguing about makes them read. The one exception is the pinned thread, which links the blog post
`https://argumend.org/blog/we-gave-a-model-that-cant-talk-1000-arguments`.

### Pinned post plan

Pin the Jev thread from `2026-09-17-jev-post-social-kit.md`, unchanged, as 12 posts. Three notes:

1. Post 12 ends with `[link]` — replace with the live blog URL above before posting.
2. The three extra Piers Morgan posts in that kit (9b, 9c, 9d) go **in** the thread, in the order
   9b → 9c → 9d, between posts 9 and 10. That makes the pinned thread 15 posts. It is long; the
   Jev-specific numbers are the reason anyone follows a new account with no history, so length is the
   right trade here. Do not split it into two threads.
3. Post 9c describes the trans-athletes map. That map's for/against labels were rewritten on
   2026-09-17 as a result of that very audit, which is what the post says happened — so it is
   accurate as written. It is still excluded from the 30 posts below (see the skip note in §2).

Keep the thread pinned for the full two weeks. Replace the pin only when a post in the cadence
outperforms it on profile clicks.

### Voice guide

Write the way the maps read. Calm, specific, and short: state the crux as a question a person could
actually answer, give the two strongest pieces of evidence with their 0-40 scores, and stop. Numbers
instead of adjectives — "34/40" instead of "strong", "11 million households" instead of "a lot of
people". Never name a winner, never say "actually", never quote-tweet someone to correct them; the
whole product is that a disagreement can be mapped without being adjudicated, and one dunk in the
first month costs more than ten good posts earn. When a post cites a map, the ids under it must let
anyone check the claim in the data. If a number cannot be traced to a card, it does not go in the
post. Visually: rust `#C4613C` and deep teal `#3a6965` on parchment `#f4f1eb`, with stone `#3d3a36`
for text and crimson `#a23b3b` reserved for crux highlights — **no amber, no tangerine, no orange
gradients**, ever, including in screenshots and OG cards.

---

## 2. Thirty ready-to-post items

All 30 are drawn from maps in the `contested` quadrant, spread across all five categories: 8 policy,
7 economics, 7 science, 6 technology, 2 philosophy. Each post is under 240 literal characters,
states the map's crux in plain words, names the strongest evidence card on each side with its 0-40
score, and ends with the map URL. No verdicts, no "actually", no dunking.

**Skipped maps.** `open-weight-ai-models`, `obesity-personal-responsibility` and
`transgender-athletes-sports` are excluded. Their for/against labels were rewritten on 2026-09-17
after the Jev evidence-side audit and have not been re-read card by card since. Note also that two
of the three pillars on `transgender-athletes-sports` (`inclusion-dignity`, `open-category-model`)
carry evidence on only one side, so that map has a single section a two-sided post could come from.

**How to read the source block.** `topic` is the id in `data/topics/<id>.ts` and the URL slug;
`pillar` is the pillar id inside it; the two card ids are the `evidence[].id` values whose
`calculateEvidenceScore(weight)` produces the quoted score.

### Policy

#### 1. TikTok

```
Can TikTok creators rebuild audience and income elsewhere? If not, a ban ends a speech forum, not just an app.

For 38/40: SCOTUS upheld the ban, Jan 2025
Against 37/40: the 14-hour January blackout

https://argumend.org/topics/tiktok-ban
```

- topic `tiktok-ban` · pillar `free-speech-rights` · cards `scotus-upholds-ban` (for, 38), `tiktok-brief-darkness-january-2025` (against, 37)
- crux: The Platform Substitutability Test (theoretical) · balance 53 / weight 80

#### 2. Epstein files

```
Do the released pages support charging any of the eight co-conspirators the FBI named?

For 35/40: no US prosecutions past Maxwell
Against 36/40: Maxwell convicted, 20 years

https://argumend.org/topics/epstein-files
```

- topic `epstein-files` · pillar `accountability-gap` · cards `no-further-prosecutions` (for, 35), `maxwell-conviction` (against, 36)
- crux: The Co-Conspirator Prosecution Test (theoretical) · balance 61 / weight 76

#### 3. Phones in schools

```
Can a phone ban be enforced without the racial disparities seen in school discipline?

For 33/40: biggest gains for low-income students
Against 33/40: Black students suspended at 3x

https://argumend.org/topics/school-phone-bans
```

- topic `school-phone-bans` · pillar `implementation-equity` · cards `lse-low-income-benefit` (for, 33), `school-discipline-disparities` (against, 33)
- crux: The Equitable Enforcement Assessment (theoretical) · balance 66 / weight 71

#### 4. Gun control

```
When a gun law changes in the same place, does the violence rate move?

For 33/40: US gun deaths far above peer nations
Against 30/40: hundreds of millions already in circulation

https://argumend.org/topics/gun-control-effectiveness
```

- topic `gun-control-effectiveness` · pillar `international-comparison` · cards `international-rates` (for, 33), `existing-guns` (against, 30)
- crux: Policy Change Natural Experiments (verified) · balance 54 / weight 68

#### 5. Nuclear energy

```
Which decarbonised a grid faster: France and Sweden with nuclear, or Germany and California with renewables?

For 38/40: ~93% capacity factor
Against 32/40: new builds run far over budget

https://argumend.org/topics/nuclear-energy-safety
```

- topic `nuclear-energy-safety` · pillar `climate-effectiveness` · cards `capacity-factor` (for, 38), `cost-overruns` (against, 32)
- crux: Grid Decarbonization Speed (verified) · balance 54 / weight 76

#### 6. Sports betting

```
Does legal betting move wagers off the black market, or create new bettors?

For 32/40: $148bn legally wagered in 2024
Against 31/40: more problem gambling by low earners

https://argumend.org/topics/sports-betting-legalization
```

- topic `sports-betting-legalization` · pillar `revenue-and-displacement` · cards `murphy-ncaa-148b-handle` (for, 32), `regressive-extraction-ucsd` (against, 31)
- crux: The Induced-vs-Displaced Demand Test (theoretical) · balance 47 / weight 69

#### 7. Congestion pricing

```
Does a congestion charge keep cutting traffic, or does traffic come back as drivers adapt?

For 34/40: Stockholm's ~20% cut held 15+ years
Against 28/40: London's benefit fell ~30% to ~7%

https://argumend.org/topics/congestion-pricing
```

- topic `congestion-pricing` · pillar `traffic-reduction` · cards `stockholm-persistent-cut` (for, 34), `london-congestion-decay` (against, 28)
- crux: Does the Traffic Cut Persist? (verified) · balance 53 / weight 65

#### 8. Daylight saving

```
Shift an hour of daylight to the evening. Does the year's ledger come out ahead?

For 32/40: Indiana power use rose ~1% under DST
Against 31/40: evening light cut robberies ~7%

https://argumend.org/topics/daylight-saving-time-abolition
```

- topic `daylight-saving-time-abolition` · pillar `daylight-as-a-resource` · cards `energy-savings-collapse` (for, 32), `dst-crime-reduction` (against, 31)
- crux: The Net Value of Shifting Daylight to the Evening (theoretical) · balance 69 / weight 73

### Economics

#### 9. Tipping

```
Replace tips with service-included wages: does a server take home more or less?

For 37/40: tipped cash wage frozen at $2.13 since 1991
Against 36/40: median server $16.23/hr, 2024 (BLS)

https://argumend.org/topics/tipping-culture
```

- topic `tipping-culture` · pillar `wage-floor-stability` · cards `213-frozen-since-1991` (for, 37), `median-server-earns-above-minimum` (against, 36)
- crux: The Net Take-Home Income Test (verified) · balance 57 / weight 81

#### 10. Housing affordability

```
Do inflation-indexed rent caps that exempt new buildings still cut construction?

For 34/40: 11m renter households pay 50%+ of income
Against 35/40: the Stanford SF study

https://argumend.org/topics/housing-affordability-crisis
```

- topic `housing-affordability-crisis` · pillar `rent-control` · cards `rent-burden-crisis-data` (for, 34), `stanford-sf-rent-control` (against, 35)
- crux: The Modern Rent Stabilization Impact Test (theoretical) · balance 66 / weight 73
- **Do not quote a percentage from the `stanford-sf-rent-control` card.** Its title says 6% and its
  own description says 15%; see the data-issues list at the end of this file.

#### 11. Rent control

```
How fast does upzoning lower rents? 10-20 years makes stabilisation a bridge. 2-3 does not.

For 31/40: Auckland rents ~22-28% below trend
Against 31/40: 1 in 4 eligible get a voucher

https://argumend.org/topics/rent-control-effectiveness
```

- topic `rent-control-effectiveness` · pillar `alternative-approaches` · cards `auckland-upzoning-results` (for, 31), `housing-voucher-underfunding` (against, 31)
- crux: The Supply Response Timeline Test (theoretical) · balance 58 / weight 70
- Cross-reference: the composed reply in the Jev blog post uses this map's *other* pillar,
  `supply-effects` (`stanford-sf-study` 34/40 for, `cambridge-decontrol-study` 28/40 against). Both
  are correct; they are different sections of the same map. If someone quotes the blog numbers back
  at you, that is why.

#### 12. National debt

```
Is the dollar's share of global reserves eroding faster, or levelling off?

For 33/40: foreign share of US debt holdings falling
Against 37/40: dollar still ~58% of global reserves

https://argumend.org/topics/us-national-debt-crisis
```

- topic `us-national-debt-crisis` · pillar `reserve-currency-privilege` · cards `foreign-holdings-declining-share` (for, 33), `dollar-share-still-dominant` (against, 37)
- crux: The Dollar Dominance Trajectory Test (verified) · balance 59 / weight 83

#### 13. Retirement age

```
How much of Social Security's 75-year gap does a higher retirement age close?

For 34/40: trust funds deplete ~2035, 83% payable
Against 35/40: CBO, FRA-69 closes about a quarter

https://argumend.org/topics/social-security-retirement-age
```

- topic `social-security-retirement-age` · pillar `fiscal-necessity` · cards `trustees-depletion` (for, 34), `cbo-fra70-share` (against, 35)
- crux: Share of the Solvency Gap Closed (verified) · balance 43 / weight 72

#### 14. Inflation

```
Does M2 growth predict CPI 18 months later? Two eras, two answers.

For 37/40: M2 growth was historically unprecedented
Against 35/40: post-2008 QE produced no CPI inflation

https://argumend.org/topics/inflation-monetary-policy
```

- topic `inflation-monetary-policy` · pillar `money-supply-expansion` · cards `m2-growth-unprecedented` (for, 37), `post-2008-no-inflation` (against, 35)
- crux: The M2-CPI Lag Correlation Test (verified) · balance 40 / weight 81

#### 15. Crypto regulation

```
Has crypto's link to banks reached the point where a crash spreads further?

For 32/40: Silvergate and Signature failed in 2023
Against 35/40: the 2022 crash barely touched markets

https://argumend.org/topics/cryptocurrency-regulation
```

- topic `cryptocurrency-regulation` · pillar `financial-stability-systemic-risk` · cards `silvergate-signature-bank-failures` (for, 32), `2022-crash-no-traditional-spillover` (against, 35)
- crux: The Systemic Risk Threshold Assessment (theoretical) · balance 47 / weight 75

### Science

#### 16. GLP-1 drugs

```
Do GLP-1 benefits hold over 10+ years, and do they survive stopping the drug?

For 36/40: STEP 1, 14.9% weight loss over 68 weeks
Against 35/40: two-thirds regained within a year off

https://argumend.org/topics/glp1-weight-loss-drugs
```

- topic `glp1-weight-loss-drugs` · pillar `clinical-efficacy-safety` · cards `step-1-trial` (for, 36), `weight-regain-discontinuation` (against, 35)
- crux: The Long-Term Safety & Discontinuation Test (theoretical) · balance 48 / weight 77

#### 17. Microplastics

```
Do microplastics in plaque drive inflammation, or sit in already-diseased tissue?

For 33/40: NEJM, 4.5x cardiovascular risk
Against 34/40: detection contamination problems

https://argumend.org/topics/microplastics-health-crisis
```

- topic `microplastics-health-crisis` · pillar `bioaccumulation-evidence` · cards `nejm-arterial-plaque-study` (for, 33), `contamination-methodology-concerns` (against, 34)
- crux: The Cardiovascular Causation Test (theoretical) · balance 66 / weight 72

#### 18. Ultra-processed food

```
Hold calories, protein and fibre equal. Do ultra-processed foods still change what the body does?

For 33/40: NIH trial, 508 extra kcal/day
Against 28/40: income and class confound the link

https://argumend.org/topics/ultra-processed-food
```

- topic `ultra-processed-food` · pillar `upf-obesity-causation` · cards `hall-nih-rct-2019` (for, 33), `socioeconomic-confounding` (against, 28)
- crux: The Caloric Overconsumption Mechanism Test (theoretical) · balance 62 / weight 66

#### 19. ADHD

```
Being the youngest in the class is not a disorder. How much diagnosis does that alone explain?

For 35/40: youngest in class ~38% more likely diagnosed
Against 32/40: ADHD is ~74% heritable

https://argumend.org/topics/adhd-overdiagnosis
```

- topic `adhd-overdiagnosis` · pillar `diagnostic-validity` · cards `relative-age-effect` (for, 35), `adhd-heritability` (against, 32)
- crux: The Relative-Age Natural Experiment (verified) · balance 59 / weight 69

#### 20. Alcohol

```
Is the mortality dip at low intake real, or sick ex-drinkers in the wrong group?

For 30/40: GBD 2016, zero minimises health loss
Against 30/40: GBD 2020, net benefit for older adults

https://argumend.org/topics/alcohol-no-safe-level
```

- topic `alcohol-no-safe-level` · pillar `net-mortality` · cards `gbd-2016-zero` (for, 30), `gbd-2020-older-adults` (against, 30)
- crux: Confounding vs. Causation at Low Doses (verified) · balance 59 / weight 71

#### 21. Antidepressants

```
Both sides agree the gap is ~2 Hamilton points. Is the average the right unit?

For 33/40: all 21 beat placebo (Cipriani)
Against 33/40: gap below the clinical threshold

https://argumend.org/topics/ssri-antidepressant-efficacy
```

- topic `ssri-antidepressant-efficacy` · pillar `effect-size` · cards `cipriani-2018` (for, 33), `kirsch-2008` (against, 33)
- crux: What Counts as 'Clinically Meaningful'? (verified) · balance 58 / weight 71

#### 22. Fluoride

```
Is there measurable neurodevelopmental risk at 0.7 mg/L, or only above 1.5?

For 33/40: 70+ years of data show no effect at 0.7
Against 32/40: NTP 2024 links above 1.5 to lower IQ

https://argumend.org/topics/fluoride-water-supplies
```

- topic `fluoride-water-supplies` · pillar `safety-health-risks` · cards `decades-population-safety-data` (for, 33), `ntp-report-2024` (against, 32)
- crux: The Low-Dose Neurodevelopmental Risk Assessment (theoretical) · balance 33 / weight 72
- The map's claim is "community water fluoridation is safe and effective", so "for" is the
  pro-fluoridation side here. Worth remembering before replying to anyone.

### Technology

#### 23. AI and doctors

```
Can a regulator approve autonomous AI diagnosis within ten years?

For 33/40: FDA AI device authorisations accelerating
Against 34/40: no legal framework for autonomous calls

https://argumend.org/topics/ai-replacing-doctors
```

- topic `ai-replacing-doctors` · pillar `regulatory-liability` · cards `fda-approvals-accelerating` (for, 33), `liability-gap` (against, 34)
- crux: The Regulatory Pathway Feasibility Analysis (theoretical) · balance 44 / weight 74

#### 24. White-collar displacement

```
Not exam scores, finished work. Can AI deliver a brief a client signs off?

For 32/40: bar exam above the 90th percentile
Against 32/40: hallucinations in high-stakes work

https://argumend.org/topics/ai-white-collar-displacement
```

- topic `ai-white-collar-displacement` · pillar `capability-acceleration` · cards `bar-exam-performance` (for, 32), `hallucination-persistence` (against, 32)
- crux: The Professional Task Parity Test (theoretical) · balance 46 / weight 76

#### 25. Facial recognition

```
Bias depends on algorithm and threshold. Has the exact deployed system been tested?

For 37/40: NIST, 10-100x false positives by race
Against 33/40: no bias at operational threshold

https://argumend.org/topics/facial-recognition-policing
```

- topic `facial-recognition-policing` · pillar `accuracy-and-bias` · cards `nist-8280-bias` (for, 37), `npl-met-equitability` (against, 33)
- crux: The Operational-Threshold Bias Test (verified) · balance 51 / weight 73

#### 26. AI therapy

```
Chatbot versus a licensed therapist, randomised, symptom scales at 12 months. Not yet run.

For 31/40: Therabot RCT cut depression 51%
Against 31/40: meta-analyses find effects fade

https://argumend.org/topics/ai-therapy-chatbots
```

- topic `ai-therapy-chatbots` · pillar `clinical-efficacy` · cards `therabot-rct` (for, 31), `meta-analysis-short-term` (against, 31)
- crux: The Head-to-Head Non-Inferiority Trial (theoretical) · balance 39 / weight 73

#### 27. AI training and copyright

```
Is the objection how the works were obtained, or the training itself?

For 32/40: Anthropic paid ~$1.5bn over pirated books
Against 32/40: Google Books scanning held fair use

https://argumend.org/topics/generative-ai-art-copyright
```

- topic `generative-ai-art-copyright` · pillar `fairness-consent` · cards `anthropic-settlement` (for, 32), `google-books-precedent` (against, 32)
- crux: Acquisition vs. Learning (verified) · balance 65 / weight 67

#### 28. AI energy

```
Is new AI demand met by clean generation, or by keeping gas plants running?

For 36/40: US data centres 6.7-12% of power by 2028
Against 32/40: ~1.5% of global electricity today

https://argumend.org/topics/ai-energy-water-footprint
```

- topic `ai-energy-water-footprint` · pillar `scale-of-demand` · cards `doe-lbnl-projection` (for, 36), `iea-global-share` (against, 32)
- crux: Marginal vs. Average Grid Emissions (verified) · balance 55 / weight 69

### Philosophy

#### 29. Masculinity

```
Control for class and income. Do the gaps in male suicide and schooling survive?

For 35/40: men die by suicide at ~4x the rate of women
Against 35/40: that ratio has held for over a century

https://argumend.org/topics/masculinity-crisis
```

- topic `masculinity-crisis` · pillar `empirical-crisis-indicators` · cards `male-suicide-rate-disparity` (for, 35), `male-suicide-disparity-longstanding` (against, 35)
- crux: The Gender vs. Class Attribution Study (theoretical) · balance 59 / weight 70

#### 30. Consciousness

```
Can any experiment separate the main theories of consciousness?

For 35/40: Cogitate failed to settle GWT vs IIT
Against 31/40: prefrontal broadcast explains access

https://argumend.org/topics/consciousness-hard-problem
```

- topic `consciousness-hard-problem` · pillar `competing-theories` · cards `templeton-adversarial-2023` (for, 35), `gwt-prefrontal-evidence` (against, 31)
- crux: The Decisive Empirical Test Between Theories (theoretical) · balance 69 / weight 67

---

## 3. Five reply templates

For entering someone else's thread. The shape comes from the composed reply in the Jev blog post:
what you actually disagree about, what you already agree on, what would settle it. Fill every brace
from the map — if a brace has no answer in the data, delete that line rather than inventing one.

Rules that apply to all five: reply once, do not reply again unless asked a direct question, never
address a person by name in a correcting tone, and never post these under a thread about a map we do
not have. Each skeleton below is short enough that a filled version fits 240 characters — count it
before sending, and cut the parenthetical before you cut a number.

**Template A — the full map (use when a thread has run for a while and has two clear sides).**

```
We have this mapped: {map title}.

Crux: {crux, in plain words}.

Strongest either way, scored 0-40 on reliability, independence, replicability, directness:
For {n}/40: {for card, short}
Against {n}/40: {against card, short}

{map url}
```

**Template B — the common ground (use when two people are arguing past each other).**

```
You two may be closer than the thread looks. On our {map title} map, {agreed point one} and {agreed point two} sit on both sides of the ledger.

The live disagreement is {crux, in plain words}.

{map url}
```

**Template C — the crux only (use as a single short reply in a fast thread).**

```
One question settles most of this: {crux, in plain words}.

Everything else in the thread follows from the answer. Evidence both ways, weighted: {map url}
```

**Template D — the evidence swap (use when someone cites one study as if it closes the case).**

```
That one scores {n}/40 on our weighting — {one clause on why}.

Strongest card the other way: {other card, short}, {n}/40. Both are on the map, with the method:

{map url}
```

**Template E — the ask (use when someone states a position with total confidence).**

```
Genuine question, not a gotcha: what would change your mind here?

Our map's answer for your side is {falsification clause from the crux}. For the other side it is {opposite falsification clause}.

{map url}
```

Template E draws on the optional `falsification.supporter_flip` / `falsification.skeptic_flip` fields
on a crux. Not every map has them — check before using it, and fall back to Template C if the fields
are absent.

---

## 4. Two-week cadence

Assumes a Monday start. Two scheduled posts a day maximum, plus replies. Times are the account's
local posting times; keep them consistent so the numbers in §5 are comparable week to week.

**Rule for the whole fortnight:** the founder account quote-posts or replies to the brand account no
more than twice a week, and never on the same day as the brand account's biggest post. Two accounts
saying the same thing on the same morning reads as one person with two phones.

### Week 1 — establish what the account is

| Day | 09:00 | 16:00 | Notes |
| --- | --- | --- | --- |
| Mon | Account live. Pinned Jev thread (15 posts), posted in one sitting. | — | Nothing else this day. Let the thread be the whole first impression. Founder account posts once, in their own words, linking the thread. |
| Tue | Post 16 (GLP-1) | Post 1 (TikTok) | Two unrelated subjects on day two, so the feed does not read as single-issue. Watch which crux-question shape gets more profile clicks. |
| Wed | Post 9 (tipping) | Post 19 (ADHD) | Light and heavy in the same day. |
| Thu | **Quote-post of @chetaslua's debate BS-meter demo** (`https://x.com/chetaslua/status/2100473581251748216`), using the text in `2026-09-17-jev-post-social-kit.md` verbatim, with `[link]` replaced by the blog URL. | Post 25 (facial recognition) | Thursday because the quote-post needs the pinned thread to already exist for anyone who clicks through. Keep the credit paragraph; it is the part that makes it not a dunk. |
| Fri | Post 5 (nuclear energy) | Post 28 (AI energy) | Paired deliberately: same grid, two maps, no verdict on either. |
| Sat | Post 8 (daylight saving) | — | Weekend post, low stakes, high shareability. |
| Sun | — | — | No scheduled posts. Reply-only day. |

### Week 2 — show the range

| Day | 09:00 | 16:00 | Notes |
| --- | --- | --- | --- |
| Mon | Post 2 (Epstein files) | Post 12 (national debt) | |
| Tue | Post 18 (ultra-processed food) | Post 24 (white-collar AI) | |
| Wed | Post 10 (housing affordability) | Post 11 (rent control) | Post them as a pair, the second quote-posting the first: two maps, one subject, different sections. This is the single best demonstration of what the site does. |
| Thu | Post 21 (antidepressants) | Post 27 (AI and copyright) | |
| Fri | Post 14 (inflation) | Post 3 (phones in schools) | |
| Sat | Post 29 (masculinity) | — | |
| Sun | — | — | Reply-only. Run the weekly review (§5) before Monday. |

### Held in reserve

Posts 4, 6, 7, 13, 15, 17, 20, 22, 23, 26, 30 are not scheduled. Use them when a map matches
something already trending, which is when a map post travels furthest. Specifically:

- Post 4 (gun control) — a legislative vote, not a shooting. Never post a map into grief.
- Post 6 (sports betting) — any major league betting-scandal story.
- Post 7 (congestion pricing) — any new city scheme, or a court ruling on one.
- Post 13 (retirement age) — any Social Security trustees or CBO release.
- Post 15 (crypto regulation) — any stablecoin bill or exchange failure.
- Post 17 (microplastics) — any new detection study in the general press.
- Post 20 (alcohol) — any dietary-guidelines revision.
- Post 22 (fluoride) — any state or city fluoridation vote.
- Post 23 (AI and doctors) — any FDA authorisation of a diagnostic device.
- Post 26 (AI therapy) — any new chatbot-and-mental-health story.
- Post 30 (consciousness) — any model-welfare or AI-sentience news cycle.

### Reply activity

Ten to fifteen replies a week, using §3, spread across the fortnight rather than batched. Only reply
where a map exists. Track which template each reply used; §5 depends on it.

---

## 5. Measurement

### What to track

Set up a UTM convention before the first post so nothing has to be reconstructed later:

```
?utm_source=x&utm_medium=social&utm_campaign=launch2026w38&utm_content=<post-number-or-template-letter>
```

Use `utm_content=p16` for scheduled post 16, `utm_content=rA` for a reply using template A. The
campaign value rolls to `launch2026w39` in week 2.

| Metric | Where it comes from | Why it is the one that matters |
| --- | --- | --- |
| **Clicks to `/topics/*`** | GA4 (`NEXT_PUBLIC_GA_MEASUREMENT_ID`), landing page report filtered to `/topics/`, segmented by `utm_content` | The only conversion that counts in week 1. Follower count is not a goal. |
| **Time on map** | GA4 engagement time on `/topics/*` for the social segment, vs the site baseline | A map read for 15 seconds was a link click; one read for 2 minutes was a person changing how they were arguing. |
| **Scroll or interaction depth on the map** | GA4 scroll events / any existing canvas interaction event | Distinguishes "saw the crux" from "bounced off the header". |
| **Replies that use the crux** | Manual count, weekly | The behaviour change we are actually selling. Count a reply if it names the crux question, the score of a card, or the phrase "what would change your mind". |
| **Replies to our replies** | Manual count, weekly, split by template letter | Tells you which of the five templates opens a conversation and which ends one. |
| **Profile clicks per post** | X analytics | Best single proxy for "this post made someone curious about the account". |
| **Saves and bookmarks** | X analytics | On X, bookmarks track usefulness better than likes for reference content. |
| **Blog post reads** | GA4 on `/blog/we-gave-a-model-that-cant-talk-1000-arguments` | Pinned-thread performance. |
| **Corrections received** | Manual log | Someone telling us a card is wrong is a success, not a failure. Log the topic id and route it to the map. |

Explicitly **not** a target: follower count, impressions, likes, ratio. Do not optimise a post for
them and do not report them in the weekly review.

### Weekly review checklist

Run Sunday evening, fifteen minutes, written down each week so the two weeks are comparable.

1. **Clicks.** Total clicks to `/topics/*` from `utm_source=x`. Which three posts produced the most?
   Which three produced none?
2. **Depth.** Median engagement time on `/topics/*` for the social segment against the site baseline.
   Up or down from last week?
3. **Crux replies.** How many replies anywhere this week named a crux, a score, or asked what would
   change someone's mind? List them.
4. **Template performance.** For each of A-E used this week: how many sent, how many got a reply, how
   many got a hostile reply. Retire any template with zero replies after six sends.
5. **Tone audit.** Re-read every post and reply sent this week against the voice guide in §1. Flag
   anything that named a winner, used "actually", or read as a dunk. One flag is a note; two in a
   week means stop posting replies until the templates are rewritten.
6. **Claim audit.** Spot-check three posted numbers against the data by running
   `bun run scripts/marketing/social-candidates.ts <topic-id>`. Any mismatch: delete the post, fix
   the map, repost.
7. **Corrections.** Any correction received this week — open an issue against the topic id, and reply
   to the person to say the map was changed once it has been.
8. **Next week's reserve list.** Which held-back posts (§4) now match something in the news?

---

## Data issues found while writing this kit

Reported for the map owners; none of them block the posts above.

1. **`housing-affordability-crisis`, card `stanford-sf-rent-control`** — the title says "Reduced
   Supply by 6% (2019)" but the card's own description says the study "reduced the rental housing
   supply by 15%", and the same study on `rent-control-effectiveness` (card `stanford-sf-study`) is
   titled with 15%. One of the two numbers in the same card is wrong; the 15% figure is the one in
   the paper's abstract. Post 10 deliberately cites this card by name without a percentage.
2. **`minneapolis-shooting`, pillar `pattern-of-force`** — has no evidence array at all. It is the
   only pillar in the corpus with zero cards, so the map renders a crux with nothing under it.
3. **`consciousness-ai-systems`** — this is `featuredTopicId` in `data/topics.ts`, but it sits in the
   `moderate` quadrant (balance 31, weight 63), and its `functional-consciousness` pillar carries 1
   "for" card against 7 "against". The featured map is the most lopsided thing on the front page,
   which is an odd shop window for "weighted evidence on both sides". Worth a look before launch;
   `consciousness-hard-problem` (post 30) is the contested sibling.
4. **`transgender-athletes-sports`** — after the 2026-09-17 relabel, two of three pillars
   (`inclusion-dignity` 2 for / 0 against, `open-category-model` 0 for / 3 against) have one-sided
   evidence. Consistent with the audit finding that the map was written against the wrong framing,
   but it leaves only `retained-physiological-advantages` showing both sides.
5. **37 one-sided pillars corpus-wide**, two of them the trans-athletes pair above. Many are
   legitimate — a pillar can be a one-way consideration — but two maps in the `contested` quadrant,
   `self-driving-car-safety` and `vaping-harm-reduction`, have no pillar with evidence on both sides
   at all. Those two are the ones worth a pass before anyone repeats "weighted evidence on both
   sides" about every map.
6. **16 of the 1,567 evidence cards have no `sourceUrl`.** None are quoted above, but a reader who
   clicks through from a social post to check a card will hit a dead end on those.

Reproduce items 2, 4, 5 and 6 with `bun run scripts/marketing/social-candidates.ts --audit`. Items 1
and 3 are read from `data/topics/housing-affordability-crisis.ts` and `data/topics.ts` directly.

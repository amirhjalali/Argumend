# Wiring Jev's contestedness Noul into the crux engine (2026-09-21)

**What this is.** `docs/reviews/2026-09-16-jev-typesafe-probe.md` round 2 found that Jev's "do the
speakers actually disagree about this claim" Noul separated the seven hand-picked candidates on the
three flagship maps cleanly, and scored the Gaza death-toll sentence — the claim four of five sonnet
runs put in front of the reader — at 7%. This is the follow-up the review asked for: a real engine
input, measured over **every** crux candidate on those maps rather than seven, three runs, with the
model pinned.

**What shipped.** Three things, all off or inert by default.

1. `identifyCruxes(graph, { contestednessOverrides, candidacyFloor })` — crux engine v1.2. With no
   override map the output is unchanged; the flagship top-5s are pinned by a regression test.
   `identifyCruxesWithDiagnostics` additionally reports what the floor removed.
2. `scripts/jev-probe/crux-contestedness.ts` — the live probe, batched 8 claims per request, cached,
   with an offline sensitivity sweep.
3. A projection gate in `lib/disagreement/projectReport.ts` behind `CRUX_PROJECTION_JEV_GATE`.

**Nothing is turned on**, and the projection flag is inert even if set: the only caller of the
projection (`lib/disagreement/analyze.ts`) never supplies `contestedness`, and the flag by itself
sends nothing anywhere. Every number below is decision support.

> **Revised 2026-09-21 after review.** The first version of the rule had no `min`, and because the
> balance modulator never falls below `0.5 × statusWeight`, a high probe *raised* C — on
> ai-mass-unemployment a 0.98 lifted a claim from rank 13 into the served top-5, which is a model
> nominating a crux. The rule below is the clamped one and every table was re-measured against it on
> a fresh three-run pass. Six other review findings (override validation, gate diagnostics, a missing
> answer read as a zero, cache keying, docs) are fixed in the same commits.

## The combination rule

```
C'(n) = min(statusWeight(n.status) × probe(n), C(n))        when a probe value exists
C (n) = statusWeight(n.status) × (0.5 + 0.5·balance(n))     otherwise, unchanged
```

with two gates around it:

- **Candidacy floor.** `probe(n) < 0.25` removes `n` from candidacy entirely — it cannot occupy a
  slot, inherit scoping reach, or act as a redundancy comparison. `cruxOverride: "pin"` is exempt.
- **Presence.** A probe that also reports the claim is not discussed in the source (`present < 0.5`)
  supplies **no override at all**; the claim keeps its balance-derived C. Silence is not a zero.

Why this shape:

- **The `min` makes it a veto.** Without it the override is two-directional and the probe can move a
  claim up the served list, which is the one thing `docs/CRUX_ENGINE.md` says a model must never do.
  With it, an override can demote a claim, or remove it, and nothing else.
- **The status prefactor survives, so the probe cannot widen candidacy either.** An `uncontested`
  claim has `statusWeight = 0` and stays at C = 0 however confident the probe is; candidacy is still
  status / `implicit` / pin.
- **It replaces the balance modulator rather than multiplying it.** Balance (min/max of weighted
  support-vs-opposition inflow) is a *structural proxy* for "the source argues about this". The
  probe measures the same quantity directly from the text, so it substitutes for the proxy. Both
  live on the same 0..1 scale under the same prefactor, which is what lets probed and unprobed
  claims be ranked in one list.
- **The floor mirrors the projection filter's intent inside the engine.** Merely lowering C moves a
  claim a few places; the review's complaint was that an undisputed claim appears at all.

### Alternatives rejected

| Rule | Why not |
|---|---|
| `C' = statusWeight × probe`, unclamped (the first version, and the reviewer's finding) | Two-directional. The balance term never drops below `0.5 × statusWeight`, so every probe above that raises C; measured on ai-mass-unemployment, overriding `c-decline-caused-by-ai` to 0.98 took it from rank 13 (C 0.571) into the served top-5, displacing a claim the probe never spoke about. A model that can put a claim in front of the reader is nominating a crux. |
| `C' = statusWeight × balanceTerm × probe` | Uniformly deflates: a 0.98 probe still caps C below today's value, so probed maps rank systematically lower than unprobed ones and mixed lists become incomparable. (The `min` form deflates too, but only down to the value the claim already had, so an unprobed claim and a confidently-contested probed claim sit at the same C rather than the probed one being pushed under it.) |
| `C' = statusWeight × max(balanceTerm, probe)` | Cannot veto. `balanceTerm ≥ 0.5` always, so the 0.06 on the death-toll claim changes nothing — the one outcome the exercise exists to produce. |
| `C' = statusWeight × (w·probe + (1−w)·balanceTerm)` | At w = 0.5 a 0.07 probe lands at 0.29, which is neither a veto nor a no-op, and it adds a third constant to tune with no evidence to tune it on. |
| `C' = probe` (drop the status prefactor) | Lets a model promote a claim the editors marked uncontested. Straight violation of the model's "never derived from edge counts / never model-derived" rule. |
| Probe as a multiplicative boost on the whole score, like `I(n)` | Conflates contestedness with reach, discrimination and tractability, and makes the 0.30 weight meaningless. |
| Ask Jev for the crux and rank by that | Forbidden by the spec, and round 2 showed the best-crux Choice picks claims its own contested Noul scores at 9%. |
| Demote-only (no candidacy floor) | Kept as the founder's option — see open question 2. It is one argument (`candidacyFloor: 0`) away. |

### Two consequences worth knowing before reading the tables

**A veto-only gate is purely subtractive, so the claims that rise are the ones it could not
measure.** Since no probed claim can gain, a vacated slot goes to the highest-scoring claim with no
override — and in this harness that means a claim the probe says is not in the transcript. Three of
the five after-gate cruxes on the Israel map, two of five on ai-mass and one of five on capitalism
are withheld claims that rose without being measured. This is an artifact of the *map-recovery*
setting, where the rendered transcript carries only a fraction of the map; the "no presence gate"
row of the sensitivity table below is the production-equivalent condition, where every candidate
has a value, and there the lists are clean. It is the strongest argument that the gate belongs on
the paste lane rather than on the flagship maps.

**Dropping a claim from candidacy is not local.** `c-bomb-pause-no-durable-shift` ranks where it
does partly because it gates `c-aid-buys-leverage` (scoping bonus S = 1.0, and it inherits that
claim's reach). Push `c-aid-buys-leverage` from 0.26 to 0.24 and `c-bomb-pause` loses both — base
score 0.721 → 0.560 — and the list reorders around a claim that never moved. Measured, not inferred:

```
aid-buys-leverage = 0.26 → bomb-pause: base 0.7212  R 0.181  S 1.000  gates=[c-aid-buys-leverage]
aid-buys-leverage = 0.24 → bomb-pause: base 0.5598  R 0.124  S 0.000  gates=[]
```

`identifyCruxesWithDiagnostics` now returns `droppedByFloorIds` for exactly this reason, and the
gate claim's card says "Gates: none; removed from candidacy by the contestedness probe:
c-aid-buys-leverage" rather than a bare "Gates: none", which would have been a false statement
about the graph.

## Method

For each flagship map: render the transcript with `renderDebateFromGraph` (the same bytes the
repeatability review used), take every crux candidate from `computeCruxSignals`, and ask Jev two
Nouls per claim in batches of **8 claims per request with only that batch in the state** — the clip
probe's lesson about state size. The contested question is round 2's wording verbatim, so the
numbers stay comparable. The second Noul asks whether the claim is discussed in the transcript at
all.

Model **pinned to `jev-1.13.0`**, not the `jev-latest` alias; the API answered `jev-1.13.0` on all
36 requests, and the returned id is stored per run in the cache. `scripts/jev-probe/jev.ts` now
takes `{ maxAttempts, model }` and honours `Retry-After`.

| map | candidates | transcript | requests/run |
|---|---|---|---|
| ai-mass-unemployment | 31 | 4,058 chars | 4 |
| capitalism-after-ai | 26 | 4,750 chars | 4 |
| us-israel-support | 26 | 3,838 chars | 4 |

## Before and after, per map

Probe values are run 1 of the pinned pass; the three-run values are in the stability section.

### us-israel-support — the death-toll claim

| # | before | score | C | probe | after the gate | score | probe |
|---|---|---|---|---|---|---|---|
| 1 | c-regional-stability-depends-on-alliance | 0.807 | 0.857 | **0.67** | c-regional-stability-depends-on-alliance | 0.742 | 0.67 |
| 2 | **c-gaza-death-toll-uncertain** | 0.770 | 0.5 | **0.05** | c-bomb-pause-no-durable-shift | 0.595 | *withheld* |
| 3 | c-casualty-figures-mostly-combatants | 0.614 | 0.813 | **0.11** | c-alliance-obligations-override-complicity | 0.584 | 0.89 (capped at 0.8) |
| 4 | c-alliance-obligations-override-complicity | 0.560 | 0.8 | **0.89** | c-nsm20-evasion | 0.542 | *withheld* |
| 5 | c-aid-buys-leverage | 0.556 | 0.5 | **0.28** | c-entanglement-risk | 0.438 | *withheld* |

**The death-toll claim lands nowhere.** At 0.05 contested and 0.99 present it is below the floor, so
it leaves candidacy; it does not appear at any rank, under any of the five sensitivity settings, in
any of the nine runs measured across three passes. Its companion
`c-casualty-figures-mostly-combatants` (0.11) goes with it, as do `c-arms-transfer-review-threshold-gap`
(0.05), `c-review-process-should-match-other-states` (0.09), `c-vetoes-damage-credibility` (0.13) and
`c-aid-hasnt-bought-compliance` (0.20).

But under the clamp three of the five slots then go to claims the probe never measured
(`c-bomb-pause-no-durable-shift`, `c-nsm20-evasion`, `c-entanglement-risk` — all at 0.06–0.11
contested but 8–33% present, so withheld). That is the subtractive artifact above, not a judgment
about those claims. Remove the presence gate, which is what the production paste lane looks like
because the probe reads the same text the extraction read, and the list becomes
`c-regional-stability-depends-on-alliance · c-alliance-obligations-override-complicity ·
c-aid-buys-leverage · c-complicity-overrides-alliance · c-aid-preserves-access` — the map's actual
fight, with the death-toll claim still gone.

### capitalism-after-ai

| # | before | score | C | probe | after the gate | score | probe |
|---|---|---|---|---|---|---|---|
| 1 | c-ai-ownership-stays-concentrated | 0.828 | 0.688 | **0.15** | c-reallocation-keeps-pace | 0.807 | 0.90 (capped at 0.734) |
| 2 | c-reallocation-keeps-pace | 0.750 | 0.734 | **0.90** | c-wage-channel-loses-primacy | 0.604 | 0.77 |
| 3 | c-survival-definition-contested | 0.715 | 0.5 | **0.14** | c-open-models-lower-entry-barriers | 0.536 | *withheld* |
| 4 | c-demand-collapse-without-recycling | 0.606 | 0.875 | **0.31** | c-capital-owners-recycle-demand | 0.465 | 0.73 (capped at 0.5) |
| 5 | c-wage-channel-loses-primacy | 0.590 | 0.875 | **0.77** | c-task-automation-lowers-labor-share | 0.462 | 0.93 (capped at 0.5) |

Two of the top three are gated out, and both are uncomfortable losses: the map's **implicit**
ownership-concentration assumption (0.15) and its **definitional** crux, "whether capitalism has
survived depends on which criterion you use" (0.14). `c-demand-collapse-without-recycling` survives
the gate but falls out of the five on score alone, C dropping 0.875 → 0.31. Three of the incoming
five are capped by the clamp — the probe reads them as strongly contested (0.73–0.93) but their own
balance-derived C was lower, and under a veto-only rule that is where they stay.

### ai-mass-unemployment

| # | before | score | C | probe | after the gate | score |
|---|---|---|---|---|---|---|
| 1 | c-firms-cut-hiring-not-output | 0.782 | 0.606 | **0.42** | c-firms-cut-hiring-not-output | 0.777 |
| 2 | c-targeted-programs-can-help | 0.770 | 0.5 | **0.08** | c-displaced-workers-can-retrain-costlessly | 0.750 |
| 3 | c-displaced-workers-can-retrain-costlessly | 0.750 | 0.5 | **0.72** | c-insider-forecasts-discounted *(withheld)* | 0.706 |
| 4 | c-mass-unemployment-definition-strict | 0.664 | 0.5 | **0.26** | c-reliability-is-the-threshold *(withheld)* | 0.701 |
| 5 | c-credential-pathway-narrows | 0.565 | 0.833 | **0.24** | c-mass-unemployment-definition-strict | 0.595 |

`c-targeted-programs-can-help` (0.08, spoken, 0.99 present) is the clearest win: an engine #2 that
the probe says nobody in the transcript argues about. `c-credential-pathway-narrows` (0.24) goes
too, though it is not in the transcript at all — see the presence section. The definitional crux
survives this pass at 0.26, one point above the floor, and is dropped in the other two runs. Two
withheld claims fill #3 and #4.

The **unclamped** version promoted `c-decline-caused-by-ai` (0.98, the map's headline dispute, which
the engine ranks 13th of 31) to #4. That is a better-looking list, and it is exactly the promotion
the clamp forbids. If the founder wants the probe to be able to surface a claim like that, the
honest fix is the *ranking* — that claim sits at 13 on reach and discrimination, not on
contestedness — not letting a model's number push it up.

## Stability over three runs (and over three passes)

| map | top-5 across the 3 runs of the clamped pass | the claim that moves it |
|---|---|---|
| ai-mass-unemployment | 4 of 5 fixed; slot 5 alternates | `c-mass-unemployment-definition-strict` at **0.26 / 0.17 / 0.18** — above the floor once, below it twice |
| capitalism-after-ai | 4 of 5 fixed; slot 4 alternates | `c-ai-task-generality-breaks-analogy`, presence **0.52 / 0.46 / 0.46** — withheld once, overridden twice |
| us-israel-support | 4 of 5 fixed (runs 1 and 3 identical) | `c-aid-buys-leverage` at **0.28 / 0.23 / 0.25** — straddling the floor |

Across all 83 candidates × 3 runs the contested value moves by **mean 0.022, median 0.010, p90
0.050, max 0.090**. The values are stable; the *decisions* are not, because in all three maps the
claim that flips the list is one sitting within a few points of a threshold. Every instability
observed in this work is a threshold-crossing, never a genuine change of opinion.

Three passes have now been run: `jev-latest` (which resolved to `jev-1.13.0`), pinned `jev-1.13.0`
before the clamp, and pinned `jev-1.13.0` after it, for nine runs in total. The death-toll claim
measured 0.05–0.07 in all nine. `c-mass-unemployment-definition-strict` measured 0.29, 0.22, 0.26,
0.18, 0.25, 0.22, 0.26, 0.17, 0.18 — a 0.12 range straddling the floor, on a claim that is one of
`docs/CRUX_ENGINE.md`'s named acceptance tests.

## Not present vs not contested

The renderer voices two claims per speaker plus the ranked cruxes, so most candidates are simply
absent from the transcript. Because it speaks statements verbatim, substring containment gives a
lower bound on presence to score the Noul against.

| map | candidates | spoken verbatim | Noul ≥ 0.5 agrees | spoken but judged absent | unspoken but judged present | overrides withheld |
|---|---|---|---|---|---|---|
| ai-mass-unemployment | 31 | 11 | 25/31 | 0 | 6 | 14 |
| capitalism-after-ai | 26 | 10 | 19/26 | 0 | 7 | 8 |
| us-israel-support | 26 | 10 | 21/26 | 0 | 5 | 11 |
| **total** | **83** | **31** | **65/83** | **0** | **18** | **33** |

**Zero false negatives in 31/31.** Every claim actually spoken was judged present, most at 0.97–0.99.
The 18 "unspoken but present" are not obviously errors: containment is a lower bound, and several are
claims whose negation is spoken (`c-alliance-obligations-override-complicity`, 0.93 present, is the
direct contrary of a spoken line) or whose content is paraphrased. The leniency does have a cost:
`c-credential-pathway-narrows` is not in the transcript, scores 0.80 present and 0.24 contested, and
is therefore *dropped* on the strength of a claim the text never makes. Raising the presence floor to
0.90 keeps it in the ai-mass top-5.

**What withholding buys and costs.** The presence gate is what keeps `c-insider-forecasts-discounted`
(0.05 contested, 0.08 present), `c-reliability-is-the-threshold` (0.06 / 0.13),
`c-bomb-pause-no-durable-shift` (0.06 / 0.08) and `c-nsm20-evasion` (0.11 / 0.13) in the ranking —
and under the veto-only clamp they then rise into the slots the gate vacated, because nothing
probed can rise past them. Six of the fifteen after-gate positions across the three maps are
claims of this kind. That is the honest behaviour for a *map-recovery* harness, where the transcript
is a lossy rendering of a much larger map and absence says nothing about a claim. It is also why
these three maps are the wrong place to judge the gate: in the production paste lane the probe reads
the same text the extraction read, so every candidate has a value and nothing is unmeasured. The
`presence 0.00` row of the sensitivity table is that condition, and it is the cleanest output in
this document on all three maps.

## The distribution problem

Round 2's clean separation (≤ 0.21 vs ≥ 0.76) came from seven hand-picked candidates. Over all 83 it
does not hold:

```
contested decile histogram, run 1, all 83 candidates
0.0-0.1  ########################### 27
0.1-0.2  ################ 16
0.2-0.3  ######### 9
0.3-0.4  ######## 8
0.4-0.5  ## 2
0.5-0.6  ## 2
0.6-0.7  ###### 6
0.7-0.8  ###### 6
0.8-0.9  ### 3
0.9-1.0  #### 4
```

The widest empty band is **0.42–0.53**, nowhere near any usable floor — and it was 0.76–0.87 in the
previous pass, so the gap itself moves. At 0.25 the threshold cuts through the densest part of the
distribution: **7 of 83 candidates come within ±0.03 of it in some run, 13 within ±0.05** — against
a measured p90 run-to-run spread of 0.05. Roughly one candidate in six is inside the noise band of
the threshold, and on all three maps one of those claims decides what the reader sees.

### Sensitivity (offline replay of run 1, no extra calls)

| setting | claims dropped (ai-mass / cap / israel) | effect on the presented five |
|---|---|---|
| presence 0.50 / floor 0.25 (default) | 5 / 6 / 7 | the tables above |
| presence 0.90 / floor 0.25 | 4 / 3 / 6 | ai-mass: `c-credential-pathway-narrows` returns at #5, the definitional crux leaves. capitalism: `c-ai-task-generality-breaks-analogy` replaces `c-capital-owners-recycle-demand`. israel: `c-casualty-figures-mostly-civilian` replaces `c-entanglement-risk` |
| **presence 0.00 / floor 0.25** (production-equivalent) | 16 / 14 / 18 | **every unmeasured claim disappears from all three lists** — see below |
| presence 0.50 / floor 0.15 | 1 / 2 / 5 | ai-mass: same five, #1 and #2 swap. capitalism: `c-ai-ownership-stays-concentrated` (0.15) survives and returns at #4. israel: `c-aid-hasnt-bought-compliance` (0.20) replaces `c-entanglement-risk` |
| presence 0.50 / floor 0.35 | 9 / 9 / 9 | ai-mass: `c-no-remaining-comparative-advantage` replaces the definitional crux. capitalism: unchanged. israel: `c-nsm20-lawful-application` replaces `c-bomb-pause-no-durable-shift` |

The `presence 0.00` row is the one to read. It is the condition the paste lane actually satisfies —
every candidate measured, nothing withheld — and it produces:

- **ai-mass**: firms-cut-hiring (0.42) · displaced-retrain (0.72) · mass-unemployment-definition
  (0.26) · no-remaining-comparative-advantage (0.60) · reinstatement-will-continue (0.79)
- **capitalism**: reallocation-keeps-pace (0.90) · wage-channel (0.77) · reinstatement-will-recur
  (0.90) · task-automation-lowers-labor-share (0.93) · capital-owners-recycle-demand (0.73)
- **israel**: regional-stability (0.67) · alliance-obligations (0.89) · aid-buys-leverage (0.28) ·
  complicity-overrides-alliance (0.89) · aid-preserves-access (0.60)

Fifteen slots, fifteen measured claims, the lowest at 0.26, the death-toll claim and both casualty
claims gone. That is what the gate looks like when the probe can see everything it is judging.

### What the probe does to each epistemic type

| epistemicType | n | median | min | max | below 0.25 |
|---|---|---|---|---|---|
| definitional | 4 | 0.34 | 0.14 | 0.53 | 1/4 |
| empirical | 26 | 0.15 | 0.03 | 0.98 | 18/26 |
| normative | 12 | 0.20 | 0.05 | 0.89 | 7/12 |
| predictive | 34 | 0.31 | 0.04 | 0.93 | 16/34 |
| procedural | 7 | 0.09 | 0.04 | 0.38 | 6/7 |

The four definitional claims score 0.14, 0.26, 0.34 and 0.53, all at 0.98–0.99 present — the probe
can see them and mostly says the speakers do not argue about them. That is arguably right as a
description and wrong as a crux judgment: a definitional crux is precisely the case where people
*use* different definitions without ever disputing one. The two lowest are
`c-survival-definition-contested` (0.14, gated out, was the #3 crux on its map) and
`c-mass-unemployment-definition-strict` (0.26 here, 0.17–0.29 across nine runs, so gated out in most
of them).

The same objection applies to implicit assumptions, which `docs/CRUX_ENGINE.md` admits to candidacy
specifically because the balance term cannot see them; the 7 implicit candidates score 0.05, 0.15,
0.28, 0.42, 0.67, 0.72, 0.90, and the 0.15 — `c-ai-ownership-stays-concentrated` — was the #1 crux
on its map. **The probe reintroduces the blind spot the ×1.15 implicit boost exists to compensate,
with a sharper edge.**

## Cost and latency

Per pass: 36 requests (12 per run over the three maps), **98,484 input tokens**, 0 retries, 0
unanswered claims, latency min/median/max **142 / 168 / 392 ms**. A run over one map at concurrency
4 is 4 requests, about 11k tokens, inside half a second of wall time. Three passes have now been
run; on the rate observed in the September 17 at-scale probe (~900k input tokens for under four
cents) all three together cost about a cent.

The API status page reported intermittent instability on the day of this run; the client's six-attempt
backoff and the new `Retry-After` handling were not exercised, since every request succeeded first
time.

## Open questions for the founder

1. **Is a definitional crux "contested"?** The gate removes `c-survival-definition-contested`
   (0.14, the #3 crux on its map), usually `c-mass-unemployment-definition-strict` (0.17–0.29 over
   nine runs), and one implicit assumption that was a #1 crux (`c-ai-ownership-stays-concentrated`
   0.15). The whole point of the scoping-propagation and implicit-boost machinery is that those two
   classes do not look disputed on the surface. Either the wording of the Noul changes for them, or
   they are exempted from the floor the way pins are, or the platform accepts losing them. This is
   the decision; everything else is tuning.
2. **Floor margin, and veto vs demote.** Run-to-run spread is p90 0.05 / max 0.09, and 13 of 83
   candidates sit within 0.05 of the floor, so **a bare 0.25 threshold is inside the noise** — and
   on every one of the three maps the claim that changes the presented list is a claim within a few
   points of it. The margin I shipped is none: the default is a plain 0.25 comparison, kept because
   the gate is off and because it is the widest gap in round 2's hand-picked set. The defensible
   options are: (a) demote only — `candidacyFloor: 0`, letting the C term do the work, which loses
   the "it must not appear at all" guarantee; (b) a hysteresis band — drop below 0.15, keep above
   0.25, demote in between, which would have made every list in this document stable; (c) require
   two runs to agree before dropping, at a cost that is already negligible. My recommendation is (b)
   plus (c) if the gate ever ships on.
3. **Cascades.** Removing a claim from candidacy removes the scoping credit of the claims that gate
   it — a two-point move on a claim outside the top-5 reordered the Israel list. It is no longer
   silent (`droppedByFloorIds`, and the gate's card names the removed claim), but it still happens.
   Should the floor instead apply at presentation only (as the projection gate does), leaving
   candidacy and the scoping graph intact? That is the cleanest answer to this and to question 1, at
   the cost of letting a gated claim keep inflating its gate's rank.
4. **Where should this run at all?** Under the veto-only clamp the gate is purely subtractive, so on
   the flagship maps the vacated slots go to claims the probe could not see — six of fifteen
   after-gate positions. The lists are clean only under the production-equivalent condition where
   every candidate is measured. That argues the gate belongs on the paste lane, not on the topic
   library, and that the flagship maps are a diagnostic rather than a target.
5. **Third-party egress.** Every probe posts the source text to TypeSafe. Today that is a script:
   `CRUX_PROJECTION_JEV_GATE` sends nothing anywhere by itself, and no production caller supplies
   `contestedness`, so the flag is inert. Turning the gate on for real means sending user pastes to
   a third party, which the v2 spec and the September 16 review both flagged as a founder decision.
6. **Judgment-as-data.** `docs/CRUX_ENGINE.md` requires every model output to be stored with content
   hash, model version and validator result. Probe values are currently a gitignored cache. If the
   gate ships, do the overrides belong in the topic drafts as reviewed data (stable, auditable,
   re-probed on explicit migration), rather than being recomputed live?
7. **Two levers or one?** The engine-level override and the projection gate now both exist and are
   deliberately independent. The engine version re-scores and can reorder; the projection version
   only hides. Keeping both means two things to reason about; the measurement above argues the
   projection version is the safer one to ship first.
8. **Outputs are not bit-pinned even on a pinned version.** `jev-1.13.0` answered identically to
   `jev-latest` on model id but not on values: across the three passes the same question on the
   same bytes ranged 0.17-0.29 (`c-mass-unemployment-definition-strict`), and the September 17
   addendum measured score wobble up to 0.28 on a 0-4 scale. Pinning the version is necessary and
   not sufficient; any threshold needs the margin in question 2.

## Reproducing

```
export TYPESAFE_API_KEY=...                       # .env.local, never committed
bun scripts/jev-probe/crux-contestedness.ts       # 3 runs, cached, prints every table above
bun scripts/jev-probe/crux-contestedness.ts --refresh --runs 3
```

Cache: `scripts/jev-probe/crux-contestedness.results.json` (gitignored), keyed by a hash of the
transcript plus candidate statements and by model id, with the model the API answered with recorded
per run.

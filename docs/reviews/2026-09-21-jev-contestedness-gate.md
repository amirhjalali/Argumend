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
2. `scripts/jev-probe/crux-contestedness.ts` — the live probe, batched 8 claims per request, cached,
   with an offline sensitivity sweep.
3. A projection gate in `lib/disagreement/projectReport.ts` behind `CRUX_PROJECTION_JEV_GATE`.

**Nothing is turned on.** Every number below is decision support.

## The combination rule

```
C'(n) = statusWeight(n.status) × probe(n)          when a probe value exists
C (n) = statusWeight(n.status) × (0.5 + 0.5·balance(n))     otherwise, unchanged
```

with two gates around it:

- **Candidacy floor.** `probe(n) < 0.25` removes `n` from candidacy entirely — it cannot occupy a
  slot, inherit scoping reach, or act as a redundancy comparison. `cruxOverride: "pin"` is exempt.
- **Presence.** A probe that also reports the claim is not discussed in the source (`present < 0.5`)
  supplies **no override at all**; the claim keeps its balance-derived C. Silence is not a zero.

Why this shape:

- **The status prefactor survives, so the probe can veto but never nominate.** `docs/CRUX_ENGINE.md`
  makes editorial `status` the primary term and forbids manufacturing contestedness. An
  `uncontested` claim has `statusWeight = 0` and stays at C = 0 however confident the probe is;
  candidacy is still status / `implicit` / pin. The probe only ever lowers.
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
| `C' = statusWeight × balanceTerm × probe` | Uniformly deflates: a 0.98 probe still caps C below today's value, so probed maps rank systematically lower than unprobed ones and mixed lists become incomparable. |
| `C' = statusWeight × max(balanceTerm, probe)` | Cannot veto. `balanceTerm ≥ 0.5` always, so the 0.06 on the death-toll claim changes nothing — the one outcome the exercise exists to produce. |
| `C' = statusWeight × (w·probe + (1−w)·balanceTerm)` | At w = 0.5 a 0.07 probe lands at 0.29, which is neither a veto nor a no-op, and it adds a third constant to tune with no evidence to tune it on. |
| `C' = probe` (drop the status prefactor) | Lets a model promote a claim the editors marked uncontested. Straight violation of the model's "never derived from edge counts / never model-derived" rule. |
| Probe as a multiplicative boost on the whole score, like `I(n)` | Conflates contestedness with reach, discrimination and tractability, and makes the 0.30 weight meaningless. |
| Ask Jev for the crux and rank by that | Forbidden by the spec, and round 2 showed the best-crux Choice picks claims its own contested Noul scores at 9%. |
| Demote-only (no candidacy floor) | Kept as the founder's option — see open question 2. It is one argument (`candidacyFloor: 0`) away. |

### One consequence worth knowing before reading the tables

Dropping a claim from candidacy is not local. `c-bomb-pause-no-durable-shift` on the Israel map
ranks #3 *only* because it gates `c-aid-buys-leverage` (scoping bonus S = 1.0, and it inherits that
claim's reach). Push `c-aid-buys-leverage` from 0.26 to 0.24 and `c-bomb-pause` loses both — base
score 0.721 → 0.560 — and leaves the top-5, replaced by a claim that never moved at all. Measured,
not inferred:

```
aid-buys-leverage = 0.26 → bomb-pause: base 0.7212  R 0.181  S 1.000  gates=[c-aid-buys-leverage]  → #3
aid-buys-leverage = 0.24 → bomb-pause: base 0.5598  R 0.124  S 0.000  gates=[]                     → out
```

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

| # | before | score | C | probe | after the gate | score |
|---|---|---|---|---|---|---|
| 1 | c-regional-stability-depends-on-alliance | 0.807 | 0.857 | **0.73** | c-regional-stability-depends-on-alliance | 0.763 |
| 2 | **c-gaza-death-toll-uncertain** | 0.770 | 0.5 | **0.06** | c-alliance-obligations-override-complicity | 0.605 |
| 3 | c-casualty-figures-mostly-combatants | 0.614 | 0.813 | **0.11** | c-bomb-pause-no-durable-shift *(withheld)* | 0.595 |
| 4 | c-alliance-obligations-override-complicity | 0.560 | 0.8 | **0.88** | c-complicity-overrides-alliance | 0.575 |
| 5 | c-aid-buys-leverage | 0.556 | 0.5 | **0.26** | c-aid-preserves-access | 0.499 |

**The death-toll claim lands nowhere.** At 0.06 contested and 0.99 present it is below the floor, so
it leaves candidacy; it does not appear at any rank, under any of the five sensitivity settings, in
any of the six runs. Its companion `c-casualty-figures-mostly-combatants` (0.11) goes with it. What
replaces them is the map's actual moral fight — the two sides of alliance-obligations vs complicity,
which the probe scores 0.88 and 0.87 — plus one artifact, `c-bomb-pause-no-durable-shift`, which is
*withheld* (0.06 contested but only 0.09 present) and rises on its gating credit alone.

### capitalism-after-ai

| # | before | score | C | probe | after the gate | score |
|---|---|---|---|---|---|---|
| 1 | c-ai-ownership-stays-concentrated | 0.828 | 0.688 | **0.14** | c-reallocation-keeps-pace | 0.864 |
| 2 | c-reallocation-keeps-pace | 0.750 | 0.734 | **0.90** | c-task-automation-lowers-labor-share | 0.686 |
| 3 | c-survival-definition-contested | 0.715 | 0.5 | **0.12** | c-reinstatement-will-recur | 0.590 |
| 4 | c-demand-collapse-without-recycling | 0.606 | 0.875 | **0.35** | c-wage-channel-loses-primacy | 0.522 |
| 5 | c-wage-channel-loses-primacy | 0.590 | 0.875 | **0.76** | c-capital-owners-recycle-demand | 0.520 |

Two of the top three are gated out, and both are uncomfortable losses: the map's **implicit**
ownership-concentration assumption (0.14) and its **definitional** crux, "whether capitalism has
survived depends on which criterion you use" (0.12). `c-demand-collapse-without-recycling` survives
the gate but falls out of the five on score alone, C dropping 0.875 → 0.35.

### ai-mass-unemployment

| # | before | score | C | probe | after the gate | score |
|---|---|---|---|---|---|---|
| 1 | c-firms-cut-hiring-not-output | 0.782 | 0.606 | **0.45** | c-displaced-workers-can-retrain-costlessly | 0.816 |
| 2 | c-targeted-programs-can-help | 0.770 | 0.5 | **0.09** | c-firms-cut-hiring-not-output | 0.787 |
| 3 | c-displaced-workers-can-retrain-costlessly | 0.750 | 0.5 | **0.69** | c-insider-forecasts-discounted *(withheld)* | 0.681 |
| 4 | c-mass-unemployment-definition-strict | 0.664 | 0.5 | **0.18** | c-decline-caused-by-ai | 0.622 |
| 5 | c-credential-pathway-narrows | 0.565 | 0.833 | **0.20** | c-reinstatement-will-continue | 0.494 |

`c-decline-caused-by-ai` at 0.98 is the map's own headline dispute — "is the decline caused by AI or
by the tech cycle" — and the engine ranked it 13th of 31 when asked for the full list; the gate
promotes it to #4. Against that, the definitional crux "what counts as mass unemployment"
(0.18) is gated out, and `c-insider-forecasts-discounted` enters at #3 while being invisible to the
probe (0.05 contested, 0.09 present, so withheld and left at its graph-derived C of 0.5).

## Stability over three runs (and over two passes)

| map | top-5 identical across the 3 pinned runs | gate decisions that differ |
|---|---|---|
| ai-mass-unemployment | yes | `c-mass-unemployment-definition-strict` (0.18 / 0.25 / 0.22) |
| capitalism-after-ai | same set; #4 and #5 swap in run 2 | `c-ai-task-generality-breaks-analogy` (presence 0.46 / 0.47 / 0.51) |
| us-israel-support | yes | none |

Across all 83 candidates × 3 runs: run-to-run spread of the contested value **mean 0.020, median
0.010, p90 0.050, max 0.090**. Discrete gate decisions are far less stable than that sounds, because
the population sits right on top of the threshold — see below.

An earlier pass of the same 3 runs was made through the `jev-latest` alias (which resolved to the
same `jev-1.13.0`), giving six runs in total. The presented set was identical in 6/6 for
ai-mass-unemployment and capitalism-after-ai. For us-israel-support it was identical in 5/6: in one
run `c-aid-buys-leverage` measured 0.24 instead of 0.26–0.28, crossed the floor, and — through the
gating cascade above — swapped #3 for a different claim. **One claim moving two points changed the
presented crux list, and it was not even a claim in the list.**

The capitalism #4/#5 swap is a 0.002 score tie (0.522 vs 0.520 in run 1, 0.525 vs 0.524 in run 2).

## Not present vs not contested

The renderer voices two claims per speaker plus the ranked cruxes, so most candidates are simply
absent from the transcript. Because it speaks statements verbatim, substring containment gives a
lower bound on presence to score the Noul against.

| map | candidates | spoken verbatim | Noul ≥ 0.5 agrees | spoken but judged absent | unspoken but judged present | overrides withheld |
|---|---|---|---|---|---|---|
| ai-mass-unemployment | 31 | 11 | 24/31 | 0 | 7 | 13 |
| capitalism-after-ai | 26 | 10 | 19/26 | 0 | 7 | 9 |
| us-israel-support | 26 | 10 | 21/26 | 0 | 5 | 11 |
| **total** | **83** | **31** | **64/83** | **0** | **19** | **33** |

**Zero false negatives in 31/31.** Every claim actually spoken was judged present, most at 0.97–0.99.
The 19 "unspoken but present" are not obviously errors: containment is a lower bound, and several are
claims whose negation is spoken (`c-alliance-obligations-override-complicity`, 0.92 present, is the
direct contrary of a spoken line) or whose content is paraphrased. The leniency does have a cost:
`c-credential-pathway-narrows` is not in the transcript, scores 0.79 present and 0.22 contested, and
is therefore *dropped* on the strength of a claim the text never makes. Raising the presence floor to
0.90 keeps it in the ai-mass top-5.

**What withholding buys and costs.** Compare the default with treating absence as a zero (`presence
0.00` below): the presence gate is what keeps `c-insider-forecasts-discounted` (0.05 contested, 0.09
present) and `c-bomb-pause-no-durable-shift` (0.06 / 0.09) in the ranking, and both then rise into
slots the gate vacated. That is the honest behaviour for a *map-recovery* harness, where the
transcript is a lossy rendering of a much larger map and absence says nothing about the claim. In the
production paste lane the probe would read the same text the extraction read, so a claim absent from
the source cannot exist, and the presence Noul becomes a cheap sanity check rather than a load-bearing
rule.

## The distribution problem

Round 2's clean separation (≤ 0.21 vs ≥ 0.76) came from seven hand-picked candidates. Over all 83 it
does not hold:

```
contested decile histogram, run 1, all 83 candidates
0.0-0.1  ########################## 26
0.1-0.2  ################# 17
0.2-0.3  ########### 11
0.3-0.4  ###### 6
0.4-0.5  ## 2
0.5-0.6  ### 3
0.6-0.7  ##### 5
0.7-0.8  ###### 6
0.8-0.9  ### 3
0.9-1.0  #### 4
```

The widest empty band is **0.76–0.87**, nowhere near any usable floor. At 0.25 the threshold cuts
through the densest part of the distribution: **8 of 83 candidates come within ±0.03 of it in some
run, 14 within ±0.05** — against a measured p90 run-to-run spread of 0.05. Roughly one candidate in
six is inside the noise band of the threshold.

### Sensitivity (offline replay of run 1, no extra calls)

| setting | ai-mass top-5 | capitalism top-5 | israel top-5 |
|---|---|---|---|
| presence 0.50 / floor 0.25 (default) | baseline above | baseline above | baseline above |
| presence 0.90 / floor 0.25 | `c-credential-pathway-narrows` returns at #4, `c-insider-forecasts-discounted` leaves | unchanged | unchanged |
| presence 0.00 / floor 0.25 | `c-no-remaining-comparative-advantage` replaces `c-insider-forecasts-discounted` | unchanged | `c-conditioning-unlikely-to-durably-shift-policy` replaces `c-bomb-pause-no-durable-shift` |
| presence 0.50 / floor 0.15 | unchanged (1 claim dropped instead of 6) | unchanged | `c-aid-hasnt-bought-compliance` replaces `c-aid-preserves-access` |
| presence 0.50 / floor 0.35 | unchanged (10 dropped) | unchanged | `c-conditioning-…` replaces `c-bomb-pause-…` |

Capitalism is insensitive to both thresholds; Israel moves under three of the four alternatives.

### What the probe does to each epistemic type

| epistemicType | n | median | min | max | below 0.25 |
|---|---|---|---|---|---|
| definitional | 4 | 0.29 | 0.12 | 0.55 | 2/4 |
| empirical | 26 | 0.17 | 0.04 | 0.98 | 18/26 |
| normative | 12 | 0.23 | 0.05 | 0.88 | 7/12 |
| predictive | 34 | 0.34 | 0.04 | 0.92 | 16/34 |
| procedural | 7 | 0.09 | 0.04 | 0.34 | 6/7 |

Both gated definitional claims are present at 0.98–0.99 — the probe can see them, and says the
speakers do not argue about them. That is arguably right as a description and wrong as a crux
judgment: a definitional crux is precisely the case where people *use* different definitions without
ever disputing one. The same objection applies to implicit assumptions, which `docs/CRUX_ENGINE.md`
admits to candidacy specifically because the balance term cannot see them; of the 7 implicit
candidates the probe scores 0.05, 0.14, 0.26, 0.45, 0.69, 0.73, 0.90, and the 0.14 —
`c-ai-ownership-stays-concentrated` — was the #1 crux on its map. **The probe reintroduces the
blind spot the ×1.15 implicit boost exists to compensate, with a sharper edge.**

## Cost and latency

36 requests (12 per full 3-map pass), **98,484 input tokens**, 0 retries, latency min/median/max
**117 / 161 / 376 ms**. A full pass over one map at concurrency 4 is 4 requests, about 11k tokens,
and lands inside half a second of wall time. On the rate observed in the September 17 at-scale run
(~900k input tokens for under four cents) the whole exercise cost well under half a cent.

The API status page reported intermittent instability on the day of this run; the client's six-attempt
backoff and the new `Retry-After` handling were not exercised, since every request succeeded first
time.

## Open questions for the founder

1. **Is a definitional crux "contested"?** The gate removes both flagship definitional cruxes
   (`c-survival-definition-contested` 0.12, `c-mass-unemployment-definition-strict` 0.18–0.25) and
   one implicit assumption that was a #1 crux (`c-ai-ownership-stays-concentrated` 0.14). The whole
   point of the scoping-propagation and implicit-boost machinery is that those two classes do not
   look disputed on the surface. Either the wording of the Noul has to change for them, or they must
   be exempted from the floor the way pins are, or the platform accepts losing them. This is the
   decision; everything else is tuning.
2. **Floor margin, and veto vs demote.** Run-to-run spread is p90 0.05 / max 0.09, and 14 of 83
   candidates sit within 0.05 of the floor, so **a bare 0.25 threshold is inside the noise**. I kept
   0.25 as the default (it is the widest gap in round 2's hand-picked set and the gate is off), but
   the defensible options are: (a) demote only — set `candidacyFloor: 0` and let the C term do the
   work, which loses the "it must not appear at all" guarantee; (b) a hysteresis band — drop below
   0.15, keep above 0.25, demote in between; (c) require two runs to agree before dropping, which
   doubles a cost that is already negligible. My recommendation is (b) plus (c) if the gate ever
   ships on.
3. **Cascades.** Removing a claim from candidacy silently removes the scoping credit of the claims
   that gate it — a two-point move on a claim outside the top-5 reordered the Israel top-5. Should
   the floor instead apply at presentation only (as the projection gate does), leaving candidacy and
   the scoping graph intact? That is the cleanest answer to both this and question 1, at the cost of
   letting a gated claim keep inflating its gate's rank.
4. **Third-party egress.** Every probe posts the source text to TypeSafe. Today that is a script.
   Turning the gate on in the paste lane sends user pastes to a third party, which the v2 spec and
   the September 16 review both flagged as a founder decision, not an engineering one.
5. **Judgment-as-data.** `docs/CRUX_ENGINE.md` requires every model output to be stored with content
   hash, model version and validator result. Probe values are currently a gitignored cache. If the
   gate ships, do the overrides belong in the topic drafts as reviewed data (stable, auditable,
   re-probed on explicit migration), rather than being recomputed live?
6. **Two levers or one?** The engine-level override and the projection gate now both exist and are
   deliberately independent. The engine version re-scores and can reorder; the projection version
   only hides. Keeping both means two things to reason about; the measurement above argues the
   projection version is the safer one to ship first.
7. **Outputs are not bit-pinned even on a pinned version.** `jev-1.13.0` answered identically to
   `jev-latest` on model id but not on values: the same question moved up to 0.11 between passes
   (`c-mass-unemployment-definition-strict`, 0.29 → 0.18), and the September 17 addendum measured
   score wobble up to 0.28 on a 0-4 scale. Pinning the version is necessary and not sufficient; any
   threshold needs the margin in question 2.

## Reproducing

```
export TYPESAFE_API_KEY=...                       # .env.local, never committed
bun scripts/jev-probe/crux-contestedness.ts       # 3 runs, cached, prints every table above
bun scripts/jev-probe/crux-contestedness.ts --refresh --runs 3
```

Cache: `scripts/jev-probe/crux-contestedness.results.json` (gitignored), keyed by a hash of the
transcript plus candidate statements and by model id, with the model the API answered with recorded
per run.

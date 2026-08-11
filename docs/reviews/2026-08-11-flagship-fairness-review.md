# Fairness Review — flagship graph `ai-mass-unemployment.draft.json` (Opus, 2026-08-11)

Four-direction attack + 5 factual spot checks on the 101-node draft. Full review text in the session record; this file preserves the verdict, the spot-check catches, and the complete fix list (applied same day — see the follow-up commit).

## Verdict

**Structurally tilted against `p-displacement-now`, rhetorically tilted toward it.** Topology: dampening edges land 16-to-3 against displacement; all four `limits_scope` edges point at displacement/policy evidence, zero at skeptic findings; 7 of 10 undercuts hit displacement inferences; report g's five complacency-strengthening additions were all imported while its two displacement-strengthening additions (IMF Cazzaniga, Goldman Briggs-Kodnani) were both dropped. Prose: a `broadly_accepted` grade on a self-defended confound rebuttal (`c-rates-dont-fully-explain` rests on the same team's follow-up note); the Challenger figure kept its alarming denominator with no limits_scope; the optimist hidden assumption stated as a strawman ("without prohibitive cost") while the pessimist one is stated fairly; the pessimist mechanism dressed as an RCT-derived conclusion with a burden-shifting warrant.

Middle positions: wiring counts pass (§5.4) but wage-collapse runs 7 supporting claims on 3 evidence nodes with its central quantitative result (Acemoglu-Restrepo wage-structure decomposition) absent, and institutional has zero inferences and an unevidenced foundational claim while 10% of all graph evidence hangs off an inert uncontested claim.

Weights, notably, are NOT tilted — skeptic evidence averages higher (28.4/40 vs ~26/40) and the two lowest weights are both displacement-side. Statuses are mostly evenhanded; the §3 split rule and normative/procedural pairs are clean.

## Factual spot checks — drift caught (fixed per item 12)

1. `e-metr-p50-p80-gap` / `c-p50-p80-reliability-gap`: "roughly an order of magnitude" is true for 1 of 3 corpus data points (10.3×, 5.3×, 5.6×) and the highest-capability model was dropped. → "roughly five- to tenfold", all three points.
2. `e-ilo-gender-brief-2026`: the 9.6%/3.5% figure belongs to the 2025 ILO-NASK index, not the 2026 gender brief — two publications merged under one Source.
3. `e-offshore-capacity-growth`: $38B is the 2024 figure (node said 2023); the contact-center growth record (1.62M→1.68M) — the datum showing offshore support employment growing through the AI period — was trimmed.
4. `c-aggregate-unemployment-normal`: "participation near historical norms" hides the 62.3%→61.5% decline the corpus itself flags; no macro EVIDENCE node exists anywhere in the graph.
5. Selective retention: Challenger's 2025 comparator (5% of cuts), OSWorld's 54.8% partial score, and METR's faster recent doubling times (130.8/88.6 days) each dropped in the direction that helped one side.

16 evidence nodes verified verbatim-clean.

## Fix list (12 items, applied)

1. `limits_scope` claim on the Challenger figure + 2025 comparator in finding → panic-redux
2. `c-rates-dont-fully-explain` → contested; interest+weight on both Stanford nodes → panic-redux
3. First skeptic-side `limits_scope` edges (postings≠hires → Indeed; 2024-snapshot → BTOS) → displacement
4. Add IMF Cazzaniga + Goldman Briggs-Kodnani evidence (report g's dropped displacement items) → displacement
5. Add Hampole et al. challenging the firms-cut-hiring assumption; strike the warrant's burden-shift clause → panic-redux
6. Add Strada employer survey challenging early-career decline; discharge the §5.5 warning; weight SignalFire → panic-redux
7. Add WGA/SAG-AFTRA/ILA primary-document evidence to the bargaining-rights claim → institutional
8. Add Acemoglu-Restrepo wage-structure claim+evidence (NBER w28920) → wage-collapse
9. Fix `edge-064` sign (care-adjustment claim opposes institutional, supports panic-redux) → error fix
10. Populate weight on 5 unweighted load-bearing skeptic nodes → panic-redux
11. Eight missing balancing edges (offshoring opposes causal claim; reinstatement contradicts pair; middle positions attack outward; definitional crux qualifies BOTH directions; retraining rebuttal wired to the assumption it rebuts) + steelman the optimist assumption's wording → mixed
12. All five drift corrections + a BLS macro EVIDENCE node → accuracy

Net: near-even on the headline axis, net lift to the two middle positions (where the map was thinnest). Highest-value single item: #3 — until a skeptic finding carries a `limits_scope`, the model's most distinctive mechanism reads as a one-sided weapon.

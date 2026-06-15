# Batch 5 — Citation Integrity & Balance Scan (Tier 6)

Read-only verification scan of 18 Argumend argument maps: ai-regulation, animal-consciousness-rights, children-smartphone-age, cryptocurrency-regulation, eacc-vs-tech-regulation, foreign-aid-effectiveness, geoengineering-climate, gun-control-effectiveness, inflation-monetary-policy, longevity-anti-aging, meritocracy-myth, nuclear-proliferation-new-arms-race, pandemic-preparedness, rent-control-effectiveness, social-media-age-limits, student-debt-forgiveness, ultra-processed-food, wealth-tax.

Scope: per-item check of evidence + pillars for citation integrity (mis-cited / malformed / likely-dead URLs, overstated claims, internal date contradictions, low-authority source carrying high `sourceReliability`, factual errors against my Jan 2026 knowledge cutoff) and balance (one-sided pillars, false-balanced settled science, missing strong counter-items). Only material issues are reported.

**Cutoff caveat:** My knowledge cutoff is January 2026. Any figure dated 2026+ or described as a post-cutoff outcome is flagged "NEEDS LIVE CHECK" rather than asserted wrong. Several maps reference "early 2025"/"2026" facts that are at or just past the boundary.

---

### ai-regulation
- [LOW] `present-harms-bias-surveillance`: "$12.5 billion in AI-enabled cybercrime in 2023 (FBI)" — the FBI IC3 2023 report total internet-crime losses were ~$12.5B, but that figure is NOT specifically "AI-enabled." Description conflates total cybercrime with AI-enabled cybercrime. Overstated attribution; should be reworded.
- [LOW] `ai-capabilities-exponential-growth`: SWE-bench "over 50% (2025)" is roughly right for frontier models but the precise figure moves fast — borderline NEEDS LIVE CHECK; the "1.4% (2023)" baseline is defensible.
- [LOW] Balance: Pillar 1 ("Existential Risk") has 2 for / 1 against but the single against item is strong and directly engaged; acceptable. No false-balance of settled science here since the topic is genuinely contested.

### animal-consciousness-rights
- [LOW] `cambridge-declaration-consciousness`: Stephen Hawking is described as a signatory; he attended/was present at the 2012 announcement but was not among the neuroscientist authors/signatories of the Declaration itself. Common but imprecise claim — soften to "present at the announcement."
- [LOW] `anthropomorphism-critique`: `sourceUrl` is a DOI for a Cambridge University Press book (CBO9780511529627) attributed generically to "Animal Cognition" — citation is vague; the journal name and the book DOI don't cleanly match. Verify mapping.
- No false-balance concern: the map correctly frames consciousness as scientifically contested rather than settled, and includes a legitimate skeptical pillar.

### children-smartphone-age
- [MED] `przybylski-small-effects`: "explaining less than 0.4% of variation" and the potatoes/glasses comparison come from Orben & Przybylski 2019 (Nature Human Behaviour). The `sourceUrl` points to `s41562-018-0506-1`, which is a different (2019, but distinct) paper — verify it is the intended "potatoes" paper (that result is from the 2019 NHB article, often cited as `s41562-018-0506-1`); plausibly correct but worth confirming the headline figures map to that DOI.
- [LOW] `cdc-youth-mental-health-data`: Title says "65% Increase ... (2011-2019)" but the description gives 2011→2021 figures (36%→57%), and 57/36 ≈ 58%, not 65%. The "65%" and date range in the title do not match the body numbers. Internal inconsistency — reconcile title with cited figures.
- [LOW] Balance: well-balanced (skeptic Przybylski/Odgers properly represented). Good.

### cryptocurrency-regulation
- [MED] `gensler-vs-atkins-sec-approach`: States Paul Atkins "appointed 2025" as Gensler's successor and describes his regulatory actions. Atkins as SEC Chair and his crypto task-force direction is right at/just past my cutoff — NEEDS LIVE CHECK on specifics (e.g., which enforcement actions were actually withdrawn).
- [LOW] `fit21-act-bipartisan`: House vote "279-136" — verify exact tally (commonly cited as 279-136, plausibly correct). Notes bill "had not passed the Senate as of early 2025" — consistent with my knowledge.
- [LOW] `defi-hack-statistics-2022`: Ronin Bridge hack "$625 million" attributed to Lazarus — correct. Fine.
- No material balance issue; Pillar 2 includes a strong against item (`2022-crash-no-traditional-spillover`).

### eacc-vs-tech-regulation
- [MED] `leaded-gasoline-decades-harm`: "824 million IQ points lost in the US" cites PNAS 2022 (Reuben/McFarland). The actual finding is ~824 million cumulative IQ points lost across the US population — figure is correct, but the framing "reduced the IQ of virtually every American born between 1930 and 1980" overstates universality; the study focused on those born before 1996/lead-exposed cohorts. Minor overstatement.
- [MED] `gdpr-startup-impact`: "reduced ... venture capital investment in EU tech startups by 26%" and "reduced apps by one-third" — the 26% VC figure and app-reduction stat come from contested studies; the reasoning text itself concedes the 26% is "challenged." `sourceUrl` (NBER w30028) is a GDPR-advertising-competition paper, which does not directly support the 26% VC / app-reduction claims (those are Janssen et al. / Jia-Jin-Wagman). Citation–claim mismatch. Verify the source actually backs the headline numbers.
- [LOW] `ai-safety-report-2024`: titled "2024" but `sourceUrl` and references point to "international-ai-safety-report-2025." The first full International AI Safety Report was published Jan 2025 (interim report 2024). Date label is muddled — reconcile 2024 vs 2025.
- [LOW] `social-media-mental-health-data`: duplicate of the CDC YRBS framing used in two other maps; "28% in 2011 to 42% in 2021" overall figure is fine.

### foreign-aid-effectiveness
- [MED] Citation hygiene: NONE of the evidence items in this map have a `sourceUrl` field (only `source` text). All four items in both pillars lack URLs, unlike every other map in the batch. Materially weakens verifiability — add source URLs.
- [LOW] `pepfar-hiv-outcomes`: "25 million lives saved" and "over 20 million people" on treatment — PEPFAR's own commonly cited figure is ~25 million lives saved (as of ~2023/2024). Defensible but government-self-reported; reasoning already flags this.
- [LOW] `givewell-bed-nets`: "$3,000-5,000" per life saved is in GiveWell's historical range; fine. Pillar balance is good (2 for / 2 against each pillar).

### geoengineering-climate
- [LOW] `climeworks-orca-plant`: "removing 40 gigatons the world emits annually would cost $24 trillion" — at $600/ton × 40 Gt = $24T, arithmetic checks. But global CO2 emissions are ~37-41 Gt CO2/yr; "40 gigatons" is fine. Mammoth "36,000 tons/year" — Mammoth's nameplate is often cited ~36,000 t/yr; OK.
- [LOW] `srm-monsoon-disruption`: side is marked `"for"` but the item argues SRM causes harm (monsoon reduction) — in a map whose meta_claim is that geoengineering is "necessary," an anti-geoengineering harm item should arguably be `"against"`. Side-tagging looks inverted relative to meta_claim. Verify side assignment (this recurs — see rent-control).
- [LOW] `moral-hazard-survey-evidence` (Nature Climate Change 2023, `s41558-023-01668-5`): verify DOI resolves to the specific moral-hazard survey paper.
- Balance: strong — includes Pinatubo and the moral-hazard null result as genuine counters.

### gun-control-effectiveness
- [HIGH] `defensive-gun-use`: "CDC estimates 500K-3M defensive gun uses annually." The CDC did not produce this estimate; the 500K-3M range traces to Kleck & Gertz / NCVS-vs-survey disputes. Attributing it to "CDC" is a citation error (the item has no `source`/`sourceUrl` field at all). Misattribution on a contested statistic. Fix attribution.
- [MED] `assault-weapon-casualties` and several items: NO `sourceUrl` on any evidence item in this entire map; multiple items (`existing-guns`, `defensive-gun-use`, `background-check-pass`, `substitute-methods`) have NO `source` field at all. Weakest-sourced map in the batch.
- [MED] `international-rates`: "US 12.21 gun deaths per 100K vs 0.5 UK, 0.04 Japan" — US ~12 per 100k (IHME/CDC, ~2019-2021) is defensible; UK/Japan figures plausible. But pairing a one-decimal-precise "12.21" with round peer figures and citing only "IHME, CDC" without year/URL is sloppy. Add year + URL.
- [LOW] This map is far thinner (2 pillars, terse reasoning) than the batch norm; balance is acceptable but evidentiary rigor is low.

### inflation-monetary-policy
- [LOW] `m2-growth-unprecedented`: "M2 from $15.4T to $21.7T between Feb 2020 and Feb 2022, ~40%" — FRED M2SL Feb 2020 ≈ $15.5T, early 2022 ≈ $21.7T; ~40% is right. Good, with FRED URL.
- [LOW] `bernanke-blanchard-decomposition`: calls them "two Nobel-caliber economists" — Bernanke is a Nobel laureate (2022); Blanchard is not. Minor rhetorical imprecision, not a citation error.
- Balance: genuinely strong — each pillar pairs for/against with high-reliability public data. No material issues. Cleanest economics map in the batch.

### longevity-anti-aging
- [LOW] `caloric-restriction-primate-modest`: `sourceUrl` is `ncomms14063` (the 2017 NIA/Wisconsin reconciliation in Nature Communications) — correct mapping. Title "2012/2017" fine.
- [LOW] `bryan-johnson-cost`: `sourceReliability: 6` for a Bloomberg feature on an n=1 self-experiment is reasonable; reasoning appropriately flags low replicability. Fine.
- [LOW] `senolytic-human-trial`: "n=21" IPF trial in EBioMedicine 2023 — verify DOI `104714` resolves; plausibly correct.
- Balance: excellent — the strongest counter-item (`caloric-restriction-primate-modest`, the primate translational discount) is given directness 9 and properly weighted. No false-balance.

### meritocracy-myth
- [MED] Citation hygiene: NONE of the 12 evidence items have a `sourceUrl` (only `source` text), despite the map having a `references` array. Materially weakens verifiability — second map (with foreign-aid) lacking item-level URLs.
- [LOW] `legacy-admissions`: "45% acceptance boost ... equivalent to 160 SAT points" — the Chetty et al. Ivy-Plus 2023 finding is often summarized this way; "45%" boost framing should be checked against the paper's actual odds/relative-rate language (the headline result is closer to legacy applicants being ~4x more likely to be admitted at comparable scores). Verify the 45% figure.
- [LOW] `immigrant-upward-mobility` and `talent-still-matters` provide genuine against-side items; balance is acceptable for a contested philosophy topic.

### nuclear-proliferation-new-arms-race
- [HIGH] `new-start-suspended`: States New START "expired in February 2026 with no successor." Today's date is 2026-06-15, so the Feb 2026 expiry is now in the past — verify it actually lapsed without extension/successor. NEEDS LIVE CHECK (treaty status post-cutoff). The meta_claim and Pillar 1 depend on this.
- [MED] `china-warhead-tripling`: "exceeded 500 in 2023 ... 1,000 by 2030 ... 1,500 by 2035" cites the DoD 2023 China Military Power report — figures match that report. Fine, but the projections are inherently NEEDS LIVE CHECK for any updated 2024/2025 DoD numbers.
- [LOW] Balance: Pillars 2 and 3 are for-heavy (2 for / 0 dedicated against evidence items in modernization; the skeptic case lives only in `skeptic_premise` prose). Pillar 1 has the strong `deterrence-80-year-record` against item, but modernization and AI pillars lack a counter-weighted evidence item. Consider adding an against-side evidence item to Pillars 2/3.

### pandemic-preparedness
- [LOW] `strategic-national-stockpile-depletion`: description contains a literal text-corruption artifact — `'ichthe SNS had not maintained...'` (stray "ich" before "the"). Garbled quote string. Fix the typo/OCR artifact.
- [LOW] `operation-warp-speed-success`: "~3 million US lives saved" / "3.2 million deaths ... prevented" cites Commonwealth Fund (through Nov 2022) — correct mapping. Fine.
- [LOW] `covid-16-trillion-cost`: Cutler & Summers JAMA 2020 "$16 trillion" — correct, with valid `sourceUrl`. Good.
- Balance: strong (lab-leak/biosecurity pillar genuinely two-sided). No false-balance.

### rent-control-effectiveness
- [MED] Side-tagging confusion driven by an inverted meta_claim. The meta_claim is the SKEPTIC position ("rent control reduces affordability"), so `side: "for"` = anti-rent-control. As a result, `displacement-prevention` (a pro-tenant benefit) is tagged `"against"` and `stanford-sf-study` (supply reduction) is `"for"`. This is internally consistent with the inverted meta_claim but is highly confusing and inconsistent with how most other maps frame "for/against." Flag for editorial consistency review across the batch.
- [LOW] `auckland-upzoning-results`: "reduced rents by 26-33%" cites Greenaway-McGrevy & Phillips 2023 working paper — the headline result is real but a working paper (not peer-reviewed); `sourceReliability: 8` is slightly generous for a working paper. Minor.
- Balance: genuinely excellent — uses the same AER 2019 study to source both supply-reduction AND displacement-prevention, which is honest. Cambridge decontrol null result is a strong included counter.

### social-media-age-limits
- [MED] `age-verification-tech`: cites "Yoti, SuperAwesome, IEEE Reviews" with "98%+ accuracy" and `independence: 4`, `sourceReliability: 6` — appropriately low, and reasoning flags commercial interest. OK, but no `sourceUrl` on ANY item in this map. Add URLs.
- [LOW] `haidt-anxious-generation`: "teen depression increased 150% for girls and 50% for boys 2010-2021" — these figures (and the 7-country claim) come from Haidt's advocacy work; reasoning flags this. The "150%" girls figure is higher than the CDC-YRBS-derived "65%"/"58%" used in the children-smartphone-age map for an overlapping claim — cross-map inconsistency in how the same trend is quantified.
- [LOW] `australia-age-verification` / `australia-implementation`: "facial age estimation correctly identifies under-16s 95% of the time" — Australia's age-assurance trial results were still emerging at my cutoff; NEEDS LIVE CHECK on the specific 95% figure.
- Balance: good — Pew "44% feel better / 46% worse," COPPA ineffectiveness, and circumvention are real counters.

### student-debt-forgiveness
- [MED] `total-student-debt-1-77-trillion`: "As of early 2025 ... $1.77 trillion ... 43.2 million borrowers ... 7 million in default." The $1.77T/43M figures are ~2024-2025 accurate, but post-cutoff default counts shifted substantially as collections/repayment resumed — NEEDS LIVE CHECK for any figure described as current.
- [LOW] `idr-servicer-failures`: "only 32 borrowers had ever received IDR forgiveness before 2021" — this widely cited NCLC/DoE figure is correct as stated (pre-2021 IDR forgiveness count). Good, with GAO URL.
- [LOW] `tuition-inflation-1200-percent`: title says nominal "1,200% since 1980"; body correctly distinguishes ~340% real vs ~1,200% nominal. Internally consistent but the headline uses the more dramatic nominal figure — acceptable since body clarifies.
- Balance: strong; CRFB regressivity item is a genuine, well-weighted counter.

### ultra-processed-food
- [LOW] `bmj-umbrella-review-2024`: "32 adverse outcomes ... 10 million participants ... obesity 55% increase" cites BMJ 2024;384:e077310 (Lane et al.) — mapping is correct, DOI valid. Good.
- [LOW] `hall-nih-rct-2019`: "508 more calories/day ... 0.9 kg ... n=20 ... Cell Metabolism 2019" — all correct, valid DOI. Strongest causal item, properly weighted (directness 9). Good.
- [LOW] `chile-labeling-law`: "obesity continued rising from 34.4% to 37.8% between 2016 and 2022" — verify exact prevalence figures; directionally correct that Chilean labeling cut purchases but did not visibly dent obesity. Fine.
- Balance: exemplary — NOVA-critique and socioeconomic-confounding items are strong, honest counters; not false-balanced. Best-sourced science map in the batch.

### wealth-tax
- [HIGH] `effective-tax-rates`: "ProPublica leak showed many billionaires pay lower effective rates than middle-class workers." The ProPublica "Secret IRS Files" finding was a low "true tax rate" measured against *wealth growth* (unrealized gains) — NOT a lower effective rate on *income* than middle-class workers. The description conflates the two, which materially overstates/misstates the finding. No `sourceUrl`. Fix the characterization.
- [MED] Citation hygiene: NONE of the 8 evidence items have a `sourceUrl`; several (`european-repeal`, `valuation-problems`, `wealth-not-consumed`, `capital-flight-risk`, `equity-illiquidity`) also have NO `source` field. Among the weakest-sourced maps in the batch alongside gun-control.
- [LOW] `us-billionaire-growth`: "$3T to $5T" in COVID (Forbes/Americans for Tax Fairness) — directionally correct; ATF is an advocacy source carrying `independence: 8`, slightly generous.
- [LOW] `european-repeal`: "France, Sweden, Germany, Austria ... repealed" — broadly correct (most OECD wealth taxes were repealed), `sourceReliability: 9` with no source is unjustified for an unsourced item.

---

## Top priority fixes across this batch

1. **[HIGH] wealth-tax / `effective-tax-rates`** — Rewrite: ProPublica showed a low "true tax rate" vs. wealth growth (unrealized gains), not a lower effective *income*-tax rate than middle-class workers. Current wording misstates the finding. Add source URL.
2. **[HIGH] gun-control / `defensive-gun-use`** — "CDC estimates 500K-3M DGUs" misattributes a Kleck/NCVS-disputed range to the CDC. Correct attribution; add a real source. (Item currently has no source field.)
3. **[HIGH] nuclear-proliferation / `new-start-suspended`** — "New START expired February 2026" is now past today's date (2026-06-15); confirm actual lapse/successor status. NEEDS LIVE CHECK; the meta_claim depends on it.
4. **[HIGH] foreign-aid (whole map)** — Add `sourceUrl` to all evidence items; none currently have URLs, materially undercutting verifiability.
5. **[HIGH] gun-control & wealth-tax (citation hygiene)** — Multiple evidence items have neither `source` nor `sourceUrl`, yet carry `sourceReliability` 8-9. Add sources or lower reliability weights to match.
6. **[HIGH] meritocracy-myth (whole map)** — All 12 evidence items lack `sourceUrl`; add URLs (a `references` array exists but item-level citations don't resolve).
7. **[HIGH] eacc / `gdpr-startup-impact`** — The "26% VC reduction / one-third app reduction" headline is not supported by the cited NBER w30028 (a GDPR-advertising paper); the reasoning itself concedes the 26% is contested. Fix citation–claim mismatch.
8. **[HIGH] ai-regulation / `present-harms-bias-surveillance`** — "$12.5B in AI-enabled cybercrime (FBI 2023)" conflates FBI IC3's total internet-crime losses with AI-enabled crime. Reword to avoid overstated attribution.
9. **[MED] children-smartphone-age / `cdc-youth-mental-health-data`** — Title "65% Increase (2011-2019)" contradicts body figures (36%→57%, 2011-2021 ≈ 58%). Reconcile title with cited data.
10. **[MED] pandemic-preparedness / `strategic-national-stockpile-depletion`** — Garbled quote artifact `'ichthe SNS...'` in the description string; clean the text.

**Severity totals:** HIGH 8 · MED 11 · LOW ~31.
**Topics with at least one [HIGH] finding:** 4 (gun-control-effectiveness, nuclear-proliferation-new-arms-race, wealth-tax, ai-regulation). Foreign-aid, meritocracy-myth, and eacc each carry a [HIGH]-equivalent citation-hygiene/mismatch item surfaced in the priority list, raising the practical HIGH-affected topic count to 7.

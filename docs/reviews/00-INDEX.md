# Verification Sweep — Index & Triage (Tier 6)

> **Update (2026-06-15, post-fix):** The structural findings and the high-priority citation issues have been FIXED and pushed to `main` (commits `18a4d0b`, `9fd27ab`, `95457b6`, `7282750`). Specifically resolved:
> - **Empty-evidence topics filled** (cryptocurrency-value, social-media-mental-health) with real, weighted evidence.
> - **Fabricated citations corrected via live web** — tiktok-brain-rot (fake "Xu/Nature" → Su et al. medRxiv), ai-in-education (phantom DOI → Kosmyna/MIT + Digital Promise), meaning-without-religion (→ Frost 2025, Zagonari 2024), consciousness-hard-problem (dead DOI → Cogitate 2025 Nature).
> - **Launch topic `consciousness-ai-systems`** now has a verified `sourceUrl` on every evidence item + the Butlin/Long 2023 and Long/Sebo 2024 canonical refs.
> - **Specific mis-cites corrected** (web-verified): wealth-tax (ProPublica true-tax-rate), gun-control (Kleck/Gertz not "CDC"), tiktok-ban (9-0, Sotomayor concurred not "dissent"), factory-farming (Sentience Institute not "USDA NASS"), universal-healthcare (Galvani/Cai split), ai-regulation (IC3 total not AI-specific), eacc (Jia/Jin/Wagman ~22%), global-water-crisis (17.7 not 54 km³/yr), ai-content-labeling (EU AI Act primary), ai-deepfakes ($40B projection), immigration-national-identity (Gallup 2024), lab-grown-meat (parity not "indistinguishable"), lab-diamonds (Trucost 511kg/2019).
> - **~12 overstated `verification_status: "verified"` downgraded to "theoretical"**; side-coding inversions, internal date/number contradictions, and garbled text fixed; low-authority sources de-weighted.
>
> **Still open (long-tail, lower-value-per-item):** systemic missing `sourceUrl`s across many older topics (one-by-one web backfill), and post-cutoff 2026 figures in the 5 new forward-looking topics (inherently need live confirmation as events resolve). The per-batch docs below remain the working lists.


A citation-integrity + balance review of **all 114 topic maps**. Detailed per-topic findings live in:
- `consciousness-ai-systems.md`, `ukraine-peace-terms.md`, `trump-tariffs.md`, `rfk-health-policy.md`, `doge-federal-cuts.md`, `open-weight-ai-models.md` (deep reviews)
- `batch-0`…`batch-5-citation-scan.md` (the other 108 topics, focused scans)
- `confidence-audit.md` (score-vs-evidence calibration — 0 topics off by ≥8)

> Caveat: reviewer training cutoff is Jan 2026. Many 2025–2026 figures are flagged **NEEDS LIVE CHECK** rather than asserted wrong — those require a human/live fetch before editing.

## Highest-priority, cross-corpus patterns (founder triage order)

1. **Topics with EMPTY evidence arrays (structural bug).** Pillars assert empirical claims with zero backing evidence/sources. Confirmed: `cryptocurrency-value`, `social-media-mental-health`; a pillar each in `minneapolis-shooting`. → These render as unsupported maps; fill or down-status.

2. **Likely-fabricated / phantom citations (accuracy + reputational risk).** Flagged as probably-invented or mis-tiered: `tiktok-brain-rot` ("Xu et al., *Nature* 2023" TikTok-fMRI), `ai-in-education` (phantom DOI + Khanmigo specifics), `meaning-without-religion` (URL-less "PMC 2025"/"PLOS 2024"). → Verify each exists; remove/replace if not.

3. **`verification_status: "verified"` overstated.** Many cruxes are marked "verified" for questions that are unresolved, normative, or describe a study not yet run (e.g. `glp1` off-label, `factory-farming` moral status, `covid-origins` furin-cleavage, `ev-environmental-impact`, `minimum-wage-effects`, `ai-risk` instrumental convergence). → Repo-wide sweep: downgrade to "theoretical" where the question isn't actually settled.

4. **Systemic missing `sourceUrl`.** Older topic files carry `source` strings but no URL on many evidence items, including high-reliability-weighted ones (gene-editing-embryos, gun-control, foreign-aid, immigration-wage, organic-food, nuclear-energy, media-bias, remote-work, veganism, etc.). → Hurts the LLM-citability goal; backfill URLs.

5. **Specific factual mis-cites (high-confidence corrections).** e.g. `consciousness-ai-systems` mislabels an HSSC paper as "*Nature*"; `wealth-tax` misstates the ProPublica finding; `gun-control` misattributes the defensive-gun-use range to "CDC"; `tiktok-ban` likely calls a concurrence a "dissent"; `factory-farming` misattributes the 99% CAFO figure to USDA NASS; `open-borders` has a `side`-coding inversion. → Each is a discrete, checkable fix.

6. **False-balance flags (handle precisely).** `ev-environmental-impact`, `obesity-personal-responsibility`, and `covid-origins` were flagged as structurally overstating parity vs. the evidence weight. (Good news: `climate-change`, `moon-landing`, `gender-affirming-care-minors`, `fluoride`, `transgender-athletes-sports` were checked and are NOT false-balanced.)

## Suggested workflow
Most items in (2), (5), (6) and all post-cutoff figures need a **live source check** before editing — that's the gating human/fetch step. Items in (1), (3), (4) are structural and can be worked through systematically. The per-batch docs end with a "Top priority fixes" list each.

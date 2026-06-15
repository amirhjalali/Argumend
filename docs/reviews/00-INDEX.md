# Verification Sweep — Index & Triage (Tier 6)

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

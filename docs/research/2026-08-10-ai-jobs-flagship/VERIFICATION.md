# Verification record — AI-jobs flagship research corpus

Date: 2026-08-10. Reviewer: Fable (main session). Producers: 4 independent Codex (gpt-5.5, xhigh) web-research runs. Parent question: "Will AI cause mass unemployment in the U.S. within the next 15 years?"

## Citation liveness sweep

138 unique URLs across the four reports; all curl-probed (`curl -sIL`, 15s timeout).

- **90 returned 2xx/3xx** — live.
- **Remaining failures are overwhelmingly bot-blockers**: BLS (blanket 403 on all data pages), academic publishers (OUP, Science, ScienceDirect, SSRN, INFORMS, HBS), government (CBO, DOL, FTC, SSA), OECD, Metaculus, SAG-AFTRA, Upwork research, OpenAI, Axios, Bloomberg Law, plus 429 rate-limits (WorldCat, VentureBeat) and a 405 HEAD-rejection. Treated as live per established policy.

## Defects found and fixed (3 across ~138 citations)

1. Stanford Digital Economy Lab "canaries follow-up" URL (a-empirical-record) — wrong slug (`...more-on-the-recent-drivers...`). Corrected to the live slug (`...more-on-recent-drivers...`, HTTP 200); search snippets independently confirmed the page carries the cited claims (interest-rate rebuttal, 2024-timing concession).
2. Amazon millionth-robot URL (c-capability-forecasts) — wrong slug (`amazon-one-million-robots-...`). Corrected to `amazon-million-robots-ai-foundation-model` (HTTP 200).
3. Census BTOS AI-use story (c-capability-forecasts) — dead path. Replaced with the primary source for the 5.4% figure: Census working paper CES-WP-24-16R "Tracking Firm Use of AI in Real Time" (PDF, HTTP 200).

## Inline honesty flags (preserve into topic graph)

The reports carry their own **UNVERIFIED** flags on: Challenger's standalone 2024 AI-attributed layoff total; a quantitative Marcus-prediction scorecard; the "insiders systematically overpredict" base-rate claim. These are load-bearing epistemic markers, not defects.

## Addenda G & H (patch runs implementing the balance-review fix list)

79 unique URLs across `g-timeline-symmetry.md` and `h-workers-distribution-geography.md`; all curl-probed. 62 live; all 17 failures are the established bot-blocker cohort (BLS ×8, Time, Wiley, Princeton, IMF eLibrary, SEC, Taylor & Francis, Yale Review, PNA, benchmarklist). **Zero citation defects found** — the cleanest sweep of the wave.

Notable epistemic event: G *corrected the balance review's own overclaim* — the reviewer asserted METR holds "paid evaluation contracts" with OpenAI/Anthropic; G found METR's public materials state it accepts no compensation for evaluations, and recast the claim as partnership/access relationships with private terms **UNVERIFIED**. Reviewer claims get the same scrutiny as producer claims.

Structural additions delivered: independent capability skeptics in their own terms (Narayanan/Kapoor, Mitchell, Kambhampati, Chollet) each with fast-side rebuttals; funder/contract disclosures for the forecast ecosystem with actual grant amounts; the P50-vs-P80 time-horizon gap quantified (~10× reliability gap); autonomous-vehicle prediction base rates; IMF/Goldman/Yale institutional estimates with common misquotes corrected; ILO gendered-exposure figures; U.S. clerical demographics; the offshoring/GCC rival hypothesis (honestly flagged UNVERIFIED as a causal split); Philippine BPO natural experiment (growth through 2026 — evidence against collapse, reported as such); data-annotation/content-moderation labor including the Sama/Kenya record; algorithmic management with the management steelman; BLS 2024–34 projections with the $46K-clerical→$34.9K-care wage-gap arithmetic.

## Known limitations

- Liveness ≠ content verification: every figure that flows into the flagship topic graph must be re-verified against source text at encoding time (Wave 3), per the standing rule that Codex's weak spot is literal constants.
- Several 2026-dated claims (BLS monthly figures, METR Time Horizon 1.1, OSWorld 2.0 results, SignalFire 2026 report) are from sources that block automated fetch; they were not independently re-read.
- Adversarial balance review (Opus, five-direction attack) dispatched separately; findings recorded alongside this file.

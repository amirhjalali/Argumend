# Verification record — nuclear flagship research corpus

Date: 2026-08-10. Reviewer: Fable (main session). Producers: 4 independent Codex (gpt-5.5, xhigh) web-research runs.

## Citation liveness sweep

154 unique URLs extracted across the four reports; all curl-probed (`curl -sIL`, 15s timeout).

- **116 returned 2xx/3xx** — live.
- **~24 returned 403** — bot-blocking by major institutions (congress.gov, ScienceDirect, Wiley, Lazard, IEA, IAEA, FERC, BMJ, LBNL, S&P, APS, corporate investor pages). Treated as live; these domains categorically block curl.
- **2 returned 503** — EIA transients.
- **Most 000s** — NREL (`nrel.gov`, `research-hub.nrel.gov`), ccomptes.fr, pref.fukushima.jp: verified as curl-hostile rather than dead by probing known-good URLs on the same hosts.
- **2 404s** were artifacts of the extraction regex truncating URLs containing parentheses (Lancet DOI, Wikimedia OWID data page); the in-report URLs are complete.

## Defects found and fixed (4 across ~150 citations)

1. `kanterella.com/ML25343A199` (d-deployment) — nonexistent domain wrapping a **real** NRC accession number. Underlying document verified live; URL replaced with `https://www.nrc.gov/docs/ML2534/ML25343A199.pdf` (HTTP 200).
2. `research-hub.nlr.gov` ×2 (b-reliability) — typo domain; corrected to `research-hub.nrel.gov`.
3. `world-nuclear.org/nuclear-reactor-database/summary` (d-deployment) — dead path; corrected to database root (HTTP 200).

## Addenda E & F (patch runs implementing the balance-review fix list)

112 unique URLs across `e-missing-lenses.md` and `f-symmetry-corrections.md`; all curl-probed. 82 live; remaining failures are the same bot-blocker cohort (IEA, congress.gov, ScienceDirect, GAO, BMJ, NEI, S&P, legal databases — all 403 to curl), EIA 503 transients, and curl-hostile NREL hosts. `bkl.co.kr` and `yna.co.kr` verified live via GET.

Defects found and fixed (2):

1. `sric.org/uranium/docs/CRUMPReportSummary.pdf` ×2 (e-missing-lenses) — dead path on a live site. Replaced with the EPA Superfund United Nuclear Corp. profile (`https://www.epa.gov/superfund/united-nuclear`, verified live and confirmed as the Church Rock mill site). The spill figures (~94M gallons / 1,100 tons) match standard accounts, but the exact figures were NOT re-confirmed against a fetchable primary page (NRC/Federal Register pages block automated fetch) — **pin to a primary document at Wave 3 encoding.**
2. `narf.org/.../bullcreek.html` (e-missing-lenses) — dead page. Replaced with the Justia opinion page for *Bullcreek v. NRC*, 359 F.3d 536 (D.C. Cir. 2004); case caption confirmed via search metadata (page itself 403s to automated fetch, same class as other legal databases).

One lesson recorded during replacement: a guessed EPA site-profile ID (`0600806`) turned out to be a different Superfund site (Chevron Questa Mine) — caught because titles are verified before swapping. Never substitute a citation URL without confirming its content identity.

## Known limitations

- Liveness ≠ content verification: URLs resolving does not prove each cited figure appears in the source. Figures that flow into the flagship topic graph must be re-verified against source text at encoding time (Wave 3), per the standing rule that Codex's weak spot is literal constants.
- Reports carry their own honest **UNVERIFIED** flags inline (e.g. Vogtle all-in final cost reconciliation, NuScale CFPP escalation via secondary source, New Jersey moratorium status contradiction on DOE's own page). These flags are load-bearing — preserve them into the topic graph.
- Adversarial balance review (Opus, five-direction attack) dispatched separately; findings will be recorded alongside this file.

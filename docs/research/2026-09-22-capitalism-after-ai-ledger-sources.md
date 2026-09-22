# Capitalism-after-AI crux ledger: sources

Companion to `data/argument/capitalism-after-ai.ledger.json`. Written 2026-09-22 against the spec
in `docs/plans/2026-09-22-crux-ledger-and-living-ai-map-spec.md` §1.1–1.2 and the draft graph
`data/topics/drafts/capitalism-after-ai.draft.json`. Every URL below was opened on 2026-09-22 and
the passage quoted comes from that fetch. `date` on each entry is the source's publication or
update date; `noticedAt` is 2026-09-22 for all of them.

Planner rule applied throughout: a `future-observable` crux is never `resolved` before its
observation lands. Four of the five cruxes are `future-observable`, so the strongest status
available to them is `narrowed`.

## Summary

| claimId | date | status | resolutionKind | evidenceNodeIds |
|---|---|---|---|---|
| c-survival-definition-contested | 2023-10-27 | unresolvable | definitional-choice | — |
| c-ai-ownership-stays-concentrated | 2025-04-07 | narrowed | future-observable | — |
| c-ai-ownership-stays-concentrated | 2026-04-13 | narrowed | future-observable | — |
| c-reallocation-keeps-pace | 2026-08-12 | open | — | — |
| c-reallocation-keeps-pace | 2026-09-15 | open | — | — |
| c-demand-collapse-without-recycling | 2026-09-03 | open | — | e-labor-share-fred |
| c-wage-channel-loses-primacy | 2026-08-26 | open | — | — |

Six of seven entries are editorial-only because what bore on them from 2023 to 2026 is not in the
graph yet. "Evidence nodes to add" at the end lists them.

---

## 1. c-survival-definition-contested: unresolvable (definitional-choice)

**Source.** Henry Snow, "We're Still Living Under Capitalism, Not 'Techno-Feudalism'", *Jacobin*,
2023-10-27. https://jacobin.com/2023/10/cloud-capitalism-technofeudalism-serfs-cloud-big-data-yanis-varoufakis
(Review of Yanis Varoufakis, *Technofeudalism: What Killed Capitalism*, Bodley Head, 2023. The
Penguin UK page, https://www.penguin.co.uk/books/451795/technofeudalism-by-varoufakis-yanis/9781529926095,
lists the ebook as 2023 and the Vintage paperback as 20/06/2024; it gives no exact day for the 2023
edition, so the entry is dated to the review rather than to the book.)

**Passage relied on.**
- Standfirst: "*Technofeudalism* offers sharp insights into the rise of 'cloud capital,' but misreads
  it as inaugurating an entirely new economic system. The enemy is still capitalism, even if in a
  novel form."
- Body: "In contrast to capitalism, techno-feudalism substitutes rents for profits and monopoly power
  for market competition."
- Penguin blurb: "Capitalism is dead. Welcome to technofeudalism."

**Why this status.** The claim's resolution condition is that "the field converges on a stipulated
threshold definition of 'capitalism'". That is a stipulation, not an observation, so the spec's
`unresolvable` status fits (`definitional-choice` is one of the three allowed kinds). The
Varoufakis–Snow exchange shows the fork happening: both sides describe the same thing (platform or
"cloud" rents) and reach opposite answers on whether capitalism survives. Varoufakis tests for
profits and competition. The review keeps the word "capitalism" for the same arrangement "in a
novel form" (I read only the open part of the review, so I do not state its full criterion). New
data would not move either side, because the dispute is over which test applies. I found nothing from 2023 to 2026 that proposed an agreed threshold, so there is
no convergence to record.

**Doubts for founder review.**
- The exchange concerns platform and cloud capital in general, not AI in particular. It is the
  clearest dated instance of the definitional fork I could open. An AI-specific version would be
  better if one exists.
- The review's full text is behind a paywall. The standfirst and the first body section, which I
  quote, were readable. I did not read the rest.
- Varoufakis's criterion (rents against profits) is a third definition. The claim names two (private
  ownership plus markets, and wage primacy). The note speaks of "the criterion used" and does not
  pretend the exchange uses the claim's two readings.

## 2. c-ai-ownership-stays-concentrated: narrowed (two entries)

### 2a. 2025-04-07: narrowed

**Source.** Stanford HAI, *The 2025 AI Index Report*, https://hai.stanford.edu/ai-index/2025-ai-index-report.
Release date 2025-04-07, confirmed by Library Journal infoDOCKET, "Stanford HAI Publishes 2025
Artificial Intelligence Index Report", 2025-04-07,
https://www.infodocket.com/2025/04/07/stanford-hai-publishes-2025-artificial-intelligence-index-report/.

**Passage relied on.** "Open-weight models are also closing the gap with closed models, reducing the
performance difference from 8% to just 1.7% on some benchmarks in a single year." infoDOCKET quotes
the same takeaway: "Together, these trends are rapidly lowering the barriers to advanced AI."

**Why this status.** The claim covers three layers: models, compute, and data. The implicit premise
beneath it is that a few firms control frontier capability. An open-weight model within 1.7% of the
best closed one, on a public leaderboard, is a sub-claim that has now been observed: near-frontier
capability can come from outside the small set of closed labs. What remains contested is compute,
chips, cloud distribution, beneficial ownership, and the very top tier. That fits the spec's
`narrowed` definition ("a sub-claim settled, a scope limit accepted"). It is not `resolved`,
because the resolution condition asks for a decade of measurements.

### 2b. 2026-04-13: narrowed

**Source.** Stanford HAI, *The 2026 AI Index Report*, Technical Performance chapter,
https://hai.stanford.edu/ai-index/2026-ai-index-report/technical-performance. Date from HAI's
"Inside the AI Index: 12 Takeaways from the 2026 Report", 2026-04-13,
https://hai.stanford.edu/news/inside-the-ai-index-12-takeaways-from-the-2026-report.

**Passages relied on.**
- Chapter takeaway 3: "The open model performance gap reopened in 2025 after briefly closing in
  2024. As of March 2026, the top closed model leads the top open model by 3.3%, up from 0.5% in
  August 2024. Six of the top ten models on the Arena Leaderboard are now closed."
- News post: "global corporate AI investments hit $581.7 billion in 2025, up 130% from the prior
  year", and "Giant, powerful models are concentrated within the largest AI companies".
- Report landing page (https://hai.stanford.edu/ai-index/2026-ai-index-report): "Industry produced
  over 90% of notable frontier models in 2025", and "In February 2025, DeepSeek-R1 briefly matched
  the top U.S. model".

**Why this status.** The status stays `narrowed` and does not revert to `open`. Across 2025 the gap
between open and closed models stayed in single digits (0.5% in August 2024, 3.3% in March 2026),
so the narrowed sub-claim still holds: frontier-adjacent models are available outside a few firms.
The same source shows the top tier and the capital moving toward the largest companies. That is
recorded in the note and is why the entry is not `resolved` in either direction.

**Doubts for founder review.**
- This is the judgment call most worth a second look. One could argue for `open`: the claim is
  about *frontier* control, and the absolute frontier is still closed and concentrated. I chose
  `narrowed` because the planner's test is whether "a 2025–26 open-weights ... development changed
  the live question", and the question has visibly moved from "can anyone else build these" to
  "does control of compute, capital, and deployment stay concentrated". If the founder reads the
  claim strictly as the top tier only, both entries should be `open`.
- The 1.7% and 3.3% figures are leaderboard gaps ("on some benchmarks" and Arena), not ownership
  measures. The note says "near-frontier capability" and does not claim ownership has diffused.
- The graph already has `c-open-models-lower-entry-barriers`, which the ownership claim
  `contradicts` (edge-046). Both AI Index findings are natural evidence for that claim as well.

## 3. c-reallocation-keeps-pace: open (two entries)

### 3a. 2026-08-12: open

**Source.** Erik Brynjolfsson, Bharat Chandar, Ruyu Chen, "Canaries in the Coal Mine? Six Facts about
the Recent Employment Effects of Artificial Intelligence", Stanford Digital Economy Lab, revised
2026-08-12 (original August 2025),
https://digitaleconomy.stanford.edu/publications/canaries-in-the-coal-mine/.

**Passages relied on.** "Using a sample of high-frequency administrative payroll data from ADP
covering millions of U.S. workers through June 2026 ..."; "employment of young workers (ages
22–25) in AI-exposed occupations now stands 19% below where it would be had it kept pace with that
of their less-exposed peers; experienced workers show no comparable gap"; "It operates primarily
through reduced hiring of young workers rather than increased separations"; "We interpret these
facts as early, descriptive indicators—canaries in the coal mine—rather than causal estimates".

**Why this status.** The resolution condition asks for longitudinal tracking of *displaced* workers:
re-employment time, earnings recovery, and movement into complementary jobs after broad adoption.
This paper measures reduced *entry* for young workers. That is relevant, because a hiring freeze is
one way reallocation fails, but it is not the measurement the condition names, and the authors call
it descriptive. Status stays `open`.

### 3b. 2026-09-15: open

**Source.** The Budget Lab at Yale (Martha Gimbel et al.), "Tracking the Impact of AI on the Labor
Market", published 2026-07-16, updated 2026-09-15,
https://budgetlab.yale.edu/research/tracking-impact-ai-labor-market.

**Passages relied on (key takeaways).** "The occupational mix is not yet changing in ways that
clearly align with the introduction of AI into the workforce." "Measures of AI usage show no
connection to changes in employment or unemployment." "A synthetic differences-in-differences
analysis of AI exposure does not yet clearly indicate an AI-related labor market footprint." The
predecessor report ("Evaluating the Impact of AI on the Labor Market: Current State of Affairs",
2025-10-01, https://budgetlab.yale.edu/research/evaluating-impact-ai-labor-market-current-state-affairs)
adds: "it is too soon to tell how disruptive the technology will be to jobs."

**Why this status.** This is aggregate stability, which says little about whether reallocation
*keeps pace*, since there is not yet a large displacement to reallocate. The note records the most
recent thing that bore on the crux and says what is still missing. `open`.

**Doubts.** Both reallocation sources come from the cluster the `ai-mass-unemployment` map is built
on. That map's ledger (authored in parallel) may cite the same papers against different claims.
Worth checking the two ledgers agree on dates and figures. For example, that map's hook uses "16%",
while the August 2026 revision of Canaries reports 19%.

## 4. c-demand-collapse-without-recycling: open

**Sources (all BEA or BLS series via FRED, opened 2026-09-22).**
- Nonfarm Business Sector: Labor Share for All Workers, PRS85006173, updated 2026-09-03,
  https://fred.stlouisfed.org/series/PRS85006173. Q2 2025 96.723, Q1 2026 94.843, Q2 2026 93.446
  (index 2017=100).
- Real Personal Consumption Expenditures, PCEC96, updated 2026-08-26,
  https://fred.stlouisfed.org/series/PCEC96. 15,317.1 (Nov 2022) to 16,901.3 (Jul 2026), billions
  of chained 2017 dollars, SAAR.
- Compensation of Employees, Received, W209RC1, updated 2026-08-26,
  https://fred.stlouisfed.org/series/W209RC1. 13,689.2 (Q4 2022) to 16,307.2 (Jul 2026), billions
  of dollars, SAAR.

**Why this status.** The claim's trigger is "labor income falls faster than transfers,
capital-income diffusion, new work, or falling prices recycle purchasing power". Through mid-2026,
labor's *share* kept falling, but labor *income* rose in dollar terms and real consumption rose
about 10% from November 2022. The trigger has not been observed, and nothing has narrowed the
mechanism either. `open`, with `e-labor-share-fred` as the graph node that bears on it. There is no
graph edge from that node to this claim today. The entry cites it because the share trend is the
input the claim's trigger depends on.

**Doubts.**
- **Graph data revision:** `e-labor-share-fred` says Q2 2026 was 93.547. FRED's 2026-09-03 update
  revises Q2 2026 to **93.446**. The node statement, and the `−19.3` share-card and highlight
  figures in `lib/argument/draftTopics.ts` (112.828 − 93.547), would become −19.4 on the revised
  number. I did not edit the graph or the meta, per instructions.
- Compensation is nominal. I did not compute real compensation. The note says "total employee pay",
  not "real".

## 5. c-wage-channel-loses-primacy: open

**Sources.** BEA via FRED, both updated 2026-08-26:
- W209RC1, Compensation of Employees, Received, https://fred.stlouisfed.org/series/W209RC1. Jul 2026
  16,307.2; Q4 2022 13,689.2; Q2 2026 16,224.3.
- PI, Personal Income, https://fred.stlouisfed.org/series/PI. Jul 2026 27,114.8; Oct to Dec 2022
  22,636.4 / 22,705.7 / 22,800.5; Apr to Jun 2026 26,766.0 / 26,951.3 / 26,999.7.

Computed ratio (mine, not the source's): 60.3% in Q4 2022, 60.3% in Q2 2026, 60.1% in Jul 2026.

**Why this status.** The resolution condition needs household-income data showing whether wages stop
being the largest income source for non-owners, *plus* a preregistered threshold for primacy. In
aggregate, compensation is still about three-fifths of personal income and has been flat since
ChatGPT's launch. No preregistered threshold exists that I could find. `open`.

**Doubts.**
- Personal income mixes owners and non-owners, so the aggregate share does not isolate
  non-owners, which is what the claim is about. A distributional
  source (BEA Distribution of Personal Income, or Fed DFA) would fit the condition better. I did
  not open one, so I did not cite one.
- "Compensation" includes employer benefit contributions, not only wages and salaries.

---

## Evidence nodes to add (do not edit the draft graph here; for the graph owner)

| Proposed node | Bears on | Suggested polarity | Source |
|---|---|---|---|
| AI Index 2025, open-weight gap 8% → 1.7% | c-ai-ownership-stays-concentrated; c-open-models-lower-entry-barriers | challenging / supporting | https://hai.stanford.edu/ai-index/2025-ai-index-report |
| AI Index 2026, open-model gap reopened to 3.3% (Mar 2026), 6 of top 10 closed | c-ai-ownership-stays-concentrated | qualifying | https://hai.stanford.edu/ai-index/2026-ai-index-report/technical-performance |
| Snow / Varoufakis technofeudalism exchange | c-survival-definition-contested | supporting | https://jacobin.com/2023/10/cloud-capitalism-technofeudalism-serfs-cloud-big-data-yanis-varoufakis |
| Canaries in the Coal Mine (rev. 2026-08-12) | c-reallocation-keeps-pace | challenging (entry margin) | https://digitaleconomy.stanford.edu/publications/canaries-in-the-coal-mine/ |
| Yale Budget Lab tracker (upd. 2026-09-15) | c-reallocation-keeps-pace | qualifying | https://budgetlab.yale.edu/research/tracking-impact-ai-labor-market |
| Real PCE Nov 2022 → Jul 2026 | c-demand-collapse-without-recycling | challenging (trigger not observed) | https://fred.stlouisfed.org/series/PCEC96 |
| Compensation share of personal income ≈60% | c-wage-channel-loses-primacy | challenging | https://fred.stlouisfed.org/series/W209RC1 + https://fred.stlouisfed.org/series/PI |
| Edge `e-labor-share-fred` → c-demand-collapse-without-recycling | — | qualifying | (existing node; revise Q2 2026 to 93.446) |

Once a node lands, its ledger entry can be superseded by one listing the node in
`evidenceNodeIds`, per the append-only rule.

## Considered and not used

- Humlum & Vestergaard, "Still Waters, Rapid Currents" (NBER w33777, issued May 2025, revised March
  2026, https://www.nber.org/papers/w33777). Its finding that "adopters transition into
  higher-paying occupations ... though still too few to move average earnings" bears directly on
  reallocation, but NBER gives only month-level dates, so I could not date an entry to a checked
  day. It is a good candidate for a future entry or node.
- Yale Budget Lab, "Current State of Affairs" (2025-10-01). Superseded by the 2026-09-15 tracker
  update and quoted above for context only.

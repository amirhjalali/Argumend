# AI mass unemployment: crux ledger sources (2026-09-22)

Companion to `data/argument/ai-mass-unemployment.ledger.json`, the first hand-authored crux
ledger (spec: `docs/plans/2026-09-22-crux-ledger-and-living-ai-map-spec.md` §1.1). Every entry
below cites a source that was opened and read on 2026-09-22; nothing is from memory. For each
entry: source, URL, publication date, the passage relied on, and why the entry is `open` or
`narrowed`. Quoted passages are kept short; the full text is at the URL.

Curator: `argumend-editorial`. `noticedAt` on every entry is 2026-09-22; `date` is the source's
publication date, per spec open question 1.

## How the cruxes were chosen

`identifyCruxes` over `data/topics/drafts/ai-mass-unemployment.draft.json` at commit `8c4fbac`
(branch `north-star/ledger-v1`), default options, before any edit in this change:

| rank | claim id | score | resolution kind |
|---|---|---|---|
| 1 | `c-firms-cut-hiring-not-output` | 0.782 | existing-evidence |
| 2 | `c-targeted-programs-can-help` | 0.770 | existing-evidence |
| 3 | `c-displaced-workers-can-retrain-costlessly` | 0.750 | existing-evidence |
| 4 | `c-mass-unemployment-definition-strict` | 0.664 | definitional-choice |
| 5 | `c-credential-pathway-narrows` | 0.565 | future-observable |

After the evidence added in this change (below), the served top 5 is the same five claims
(0.806, 0.767, 0.716, 0.709, 0.588). A sixth claim, `c-productivity-above-trend`, also has
ledger entries: it briefly entered the top 5 in an intermediate state of this edit and sits in
the near-tie band at rank 8 (0.557), so it was researched and ledgered too. See "Ranking side
effects" at the end.

## Latest status per crux

| claim | entries | latest |
|---|---|---|
| `c-firms-cut-hiring-not-output` | 3 | narrowed (2026-09-01) |
| `c-targeted-programs-can-help` | 2 | narrowed (2026-08-28) |
| `c-displaced-workers-can-retrain-costlessly` | 3 | narrowed (2026-08-28) |
| `c-mass-unemployment-definition-strict` | 2 | open (2026-09-15) |
| `c-credential-pathway-narrows` | 4 | open (2026-08-12) |
| `c-productivity-above-trend` | 2 | open (2026-05-26) |

No entry uses `resolved` or `unresolvable`.

---

## 1. `c-firms-cut-hiring-not-output`

> Firms facing improved AI capability respond primarily by reducing hiring and headcount growth
> rather than by expanding output or redesigning jobs to use the freed-up capacity.

Resolution condition: firm-level panels linking AI adoption to headcount, output, and pricing
decisions over multiple years.

### 2025-02-20 · open · `e-hampole-firm-reallocation`

- **Source:** Hampole, Papanikolaou, Schmidt, Seegmiller, "Artificial Intelligence and the Labor
  Market", NBER Working Paper 33509. https://www.nber.org/papers/w33509
- **Date:** issued 2025-02-20, revised 2025-09-18 (dates from the NBER page's `<time>` metadata).
- **Passage:** "Despite strong substitution at the task level, overall employment effects are
  modest, as reduced demand in exposed occupations is offset by productivity-driven increases in
  labor demand at AI-adopting firms."
- **Why open:** already in the graph as challenging evidence; the map's `statusBasis` calls it
  not decisive. It is the baseline for the window: it does not split output from hiring firm by
  firm, which is what the resolution condition asks.

### 2025-09-01 · open · `e-hosseini-lichtinger-seniority` (new node)

- **Source:** Hosseini Maasoum and Lichtinger, "Generative AI as Seniority-Biased Technological
  Change: Evidence from U.S. Résumé and Job Posting Data", SSRN 5425555.
  https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5425555
- **Date:** 2025-09-01, the co-author's announcement post (LinkedIn post id decoded to
  2025-09-01 13:19 UTC). Search indexes report an SSRN date of 2025-08-31; not confirmed.
- **Read via:** SSRN returned a bot check (not bypassed). Read instead: the Stanford Digital
  Economy Lab seminar page for the paper (event 2025-09-22),
  https://digitaleconomy.stanford.edu/event/seyed-m-hosseini-and-guy-lichtinger-generative-ai-as-seniority-biased-technological-change-evidence-from-u-s-resume-and-job-posting-data/
  and the co-author's announcement post.
- **Passage (author post):** "AI-adopting firms reduce junior hiring relative to non-adopters,
  while senior hiring remains largely unaffected."
- **Why open:** evidence arrived on the supporting side (a hiring channel at adopters), but
  output was not measured, so the "rather than expanding output" half is untouched.

### 2026-09-01 · narrowed · `e-humlum-vestergaard-denmark`, `e-census-btos-ai-supplement-2026` (new), `e-hosseini-lichtinger-seniority`

- **Sources:**
  - Humlum and Vestergaard, "Still Waters, Rapid Currents: Early Labor Market Transformation
    under Generative AI" (formerly "Large Language Models, Small Labor Market Effects"), NBER
    Working Paper 33777. https://www.nber.org/papers/w33777 . Issued 2025-05-09, revised
    2026-03-16. Passage: "the declines are not driven by firms adopting AI chatbots", and
    workplaces encouraging chatbot use "exhibit no differential changes in employment or wage
    bills, job creation or destruction, or the composition of hires or separations, including
    among early-career workers."
  - Bonney, Breaux, Dinlersoz, Foster, Haltiwanger, Pande, "The Microstructure of AI Diffusion:
    Evidence from Firms, Business Functions, and Worker Tasks", Census CES Working Paper 26-25.
    https://www.census.gov/library/working-papers/2026/adrm/CES-WP-26-25.html . April 2026 (the
    page gives month only). Passage: "Most users (66%) rely on AI solely to augment tasks, while
    AI-related employment decreases are rare, occurring in only 2% of firms." The same abstract
    adds that functional breadth and operational investment "are positively associated with
    employment decreases."
  - Abel, Deitz, Emanuel, Montalbano, "Businesses Are Using AI to Transform Work, Not Cut Jobs",
    Liberty Street Economics (New York Fed), 2026-09-01 (schema.org `datePublished`).
    https://libertystreeteconomics.newyorkfed.org/2026/09/businesses-are-using-ai-to-transform-work-not-cut-jobs/
    Passage: "Retraining employees in response to AI remains the primary way firms are adjusting
    their workforces." Chart data for service-firm AI users, 2026: lay off 4%, hire more 13%,
    hire fewer 15%, retrain 34%. Not added as a node (regional survey that duplicates the Census
    result); named in the entry's basis.
- **Why narrowed:** before, the dispute was how firms respond to AI in general. Three
  independent firm-level sources now agree that AI-linked headcount cuts are rare and that task
  reorganization and retraining are the common response. What is still live is one margin:
  whether adopting firms slow junior hiring. U.S. résumé data say yes; Danish register data say
  no. The resolution condition (multi-year panels of headcount, output, and pricing) is not met,
  so this is not `resolved`.

## 2. `c-targeted-programs-can-help`

> Better-designed, targeted, employer-linked, long-horizon workforce programs can meaningfully
> improve displaced workers' earnings and employment, even though generic short retraining
> programs mostly do not.

Resolution condition: evaluation of a well-funded, AI-displacement-specific workforce program at
national scale.

### 2025-09-15 · open · `e-mdrc-workadvance-10yr` (new node)

- **Source:** Yusim, Schaberg, Tessler, Ubalijoro, "Effects of Sector-Focused Training After 10
  Years: Findings from the WorkAdvance Evaluation", MDRC.
  https://www.mdrc.org/work/publications/effects-sector-focused-training-after-10-years
- **Date:** 2025-09-15 (page `datetime`; the PDF says September 2025). Funded by Arnold Ventures
  (recorded as `interest`).
- **Passages:** "The other three WorkAdvance programs did not have an impact on either
  confirmatory outcome in Year 10." and "These gains may not persist without additional
  sector-specific approaches".
- **Why open:** random assignment shows each of four sector programs raised earnings at some
  point, which fits the claim's "can", but only one program still did in year 10. Participants
  were low-income adults enrolled 2011-2013, not AI-displaced workers, so the AI resolution
  condition is untouched.

### 2026-08-28 · narrowed · `e-hyman-wioa-ai-retraining` (new), `e-mdrc-workadvance-10yr`

- **Source:** Hyman, Lahey, Ni, Pilossoph, "How Retrainable are AI-Exposed Workers?", NBER
  Working Paper 34174. https://www.nber.org/papers/w34174 (PDF read).
- **Date:** revised 2026-08-28 (NBER `<time>` metadata; the PDF says "August 2025, Revised August
  2026"). Interest: supported by Schmidt Sciences; NBER notes a co-author disclosure.
- **Passage:** "returns for workers from high-exposure occupations rose sharply over our sample
  period—from about $1,000 per quarter before 2020 to $3,000 by 2022–2024."
- **Why narrowed:** before this, whether training could raise earnings for AI-exposed workers at
  national scale was untested; the map had one randomized evaluation of generic intensive
  services. National WIOA records now show positive, rising returns. Still open, and named in the
  note: returns in a slack labor market (the authors tie the gains to tight markets), at
  displacement scale, and for AI-specific programs. The estimates are matched, not randomized.
  Polarity on the graph is `qualifying`, not `supporting`: WIOA training is closer to the
  "generic" programs the claim contrasts itself with, so the result complicates the claim's
  second half.

## 3. `c-displaced-workers-can-retrain-costlessly`

> Workers displaced from automated tasks can retrain and relocate into newly created tasks at a
> cost and delay small relative to the productivity gains.

Resolution condition: well-funded, targeted retraining programs evaluated at national
AI-displacement scale show earnings and reemployment outcomes comparable to pre-displacement work.

### 2025-08-25 · open · no node

- **Source:** first version of Hyman, Lahey, Ni, Pilossoph, NBER w34174 / New York Fed Staff
  Report 1165. https://www.newyorkfed.org/research/staff_reports/sr1165
- **Date:** 2025-08-25 (NBER `citation_publication_date`); staff report dated August 2025.
- **Passages (staff-report abstract):** "trainees who target AI-intensive work face a 29 percent
  earnings return penalty" and "Positive earnings returns in all groups are driven by the most
  recent years when labor markets were tightest".
- **Why open, and why no node:** positive returns, but a penalty for training into AI-intensive
  work and a dependence on tight markets; costs relative to productivity gains are not measured.
  The graph node carries the 2026 revision, whose numbers differ, so this entry cites the first
  version in its basis and lists no evidence node.

### 2026-01-21 · narrowed · `e-manning-aguirre-adaptive-capacity` (new node)

- **Source:** Manning, Aguirre, Muro, Methkupally, "Measuring US workers' capacity to adapt to
  AI-driven job displacement", Brookings.
  https://www.brookings.edu/articles/measuring-us-workers-capacity-to-adapt-to-ai-driven-job-displacement/
  Also NBER Working Paper 34705 (Manning and Aguirre, issued 2026-01-15).
- **Date:** 2026-01-21 (schema.org `datePublished`).
- **Passage:** "6.1 million workers, primarily in clerical and administrative roles, lack
  adaptive capacity due to limited savings, advanced age, scarce local opportunities, and/or
  narrow skill sets." Caveat from the same page: "the adaptive capacity of different workers
  within the same occupation can vary substantially."
- **Why narrowed:** the claim was argued about exposed workers in general. The index puts about
  70% of the most exposed workers (26.5 of 37.1 million) in occupations with above-median
  capacity to manage a switch, which locates the live cost question in a defined group of about
  6.1 million, mostly clerical, 86% women. Narrowed in scope only: the index predicts capacity and
  does not observe costs.

### 2026-08-28 · narrowed · `e-hyman-wioa-ai-retraining`

- **Source:** the revised NBER w34174 above (2026-08-28).
- **Passage:** "We attribute these gains primarily to transitions into less AI-exposed
  occupations and, to a lesser extent, to the expansion of training programs that build
  AI-complementary skills."
- **Why narrowed:** the claim's route is retraining "into newly created tasks". The measured
  gains run mainly through exit from exposed work, so the live question shrinks to what that
  switch costs outside a tight labor market. Flagged below as a judgment call.

## 4. `c-mass-unemployment-definition-strict`

> 'Mass unemployment' should be defined as sustained U-3 unemployment above 10% for multiple
> quarters, rather than by wage collapse, labor-force participation decline, or underemployment.

Resolution kind: definitional-choice. Condition: sides agree on a metric before forecasting.

### 2025-05-28 · open · no node

- **Source:** Jim VandeHei and Mike Allen, "Behind the Curtain: A white-collar bloodbath", Axios.
  https://www.axios.com/2025/05/28/ai-jobs-white-collar-unemployment-anthropic (read in a
  browser; plain fetch returned 403).
- **Date:** 2025-05-28.
- **Passage:** AI could "spike unemployment to 10-20% in the next one to five years," Dario
  Amodei told Axios.
- **Why open:** a prominent forecast uses a U-3 yardstick, while the research the map cites uses
  young-worker employment, hiring, or occupational churn. It is cited as a yardstick in public
  use, not as evidence about the forecast. Interest: the speaker is the CEO of an AI developer
  (see the conflict note below).

### 2026-09-15 · open · no node

- **Source:** The Budget Lab at Yale, "Tracking the Impact of AI on the Labor Market".
  https://budgetlab.yale.edu/research/tracking-impact-ai-labor-market (PDF export read:
  https://budgetlab.yale.edu/sites/default/files/page_to_pdf/1419/publication_1419.pdf)
- **Date:** published 2026-07-16, updated 2026-09-15 with August 2026 CPS microdata.
- **Passage:** "Churn across occupations, AI exposure among the unemployed, and usage data all
  remain flat, lie within historical ranges, or continue along pre-AI trends."
- **Why open:** a third yardstick (occupational churn, exposure of the unemployed), no U-3
  threshold, and no convergence on a shared metric. Nothing has moved the definitional fork.

## 5. `c-credential-pathway-narrows`

> If routine junior-analyst, coding, paralegal, and administrative tasks become automatable, the
> credential-to-experience pathway that converts education into a wage premium narrows, even for
> otherwise well-cushioned educated workers.

Resolution kind: future-observable. Condition: reemployment earnings and duration data; the claim
and its rival reading resolve together.

### 2025-07-28 · open · no node

- **Source:** Levanon, Sigelman, Mamertino, de Zeeuw, Guilford, "No Country for Young Grads: The
  Structural Forces That Are Reshaping Entry-Level Employment", Burning Glass Institute.
  https://www.burningglassinstitute.org/research/no-country-for-young-grads (PDF:
  https://www.burningglassinstitute.org/s/No-Country-for-Young-Grads-V_Final72925-1.pdf)
- **Date:** July 28 per the site; the PDF says July 2025.
- **Passage:** "Young graduates face unemployment rates that are rising faster than any other
  education or age cohort". It names four interlocking factors, AI among them.
- **Why open:** supports the first link (entry-level access), but it attributes the shift to
  several causes and does not measure the wage premium. Not added as a node, to avoid a third
  same-polarity edge and because its causal weighting is interpretive.

### 2025-08-10 · open · `e-eig-young-grads-exposure` (new node)

- **Source:** Eckhardt and Goldschlag, "AI and Jobs: The Final Word (Until the Next One)",
  Economic Innovation Group. https://eig.org/ai-and-jobs-the-final-word/
- **Date:** 2025-08-10.
- **Passage:** "Unemployment rates have been creeping up for young workers and recent graduates
  alike, whether they are AI-exposed or not."
- **Why open:** evidence against an AI-specific narrowing (the squeeze appears in unexposed work
  too), but unemployment rates do not measure hiring or the premium, and the data end mid-2025.

### 2026-02-24 · open · `e-dallas-fed-wage-growth` (existing node)

- **Source:** Scott Davis, "AI is simultaneously aiding and replacing workers, wage data suggest",
  Federal Reserve Bank of Dallas. https://www.dallasfed.org/research/economics/2026/0224
- **Date:** 2026-02-24.
- **Passage:** "for an occupation with a 0 percent experience premium, increased AI exposure is
  associated with a 0.28 percentage point reduction in wage growth."
- **Why open:** wage growth by experience premium is the right direction of measurement, but the
  lifetime credential premium the resolution needs has not been observed.

### 2026-08-12 · open · `e-stanford-canaries-2026-update` (new node)

- **Source:** Brynjolfsson, Chandar, Chen, "Canaries in the Coal Mine? Six Facts about the Recent
  Employment Effects of Artificial Intelligence", August 2026 update, Stanford Digital Economy
  Lab. https://digitaleconomy.stanford.edu/publication/canaries-in-the-coal-mine-six-facts-about-the-recent-employment-effects-of-artificial-intelligence/
  (PDF: https://digitaleconomy.stanford.edu/app/uploads/2026/08/Canaries_August2026.pdf)
- **Date:** 2026-08-12 (revision date on the publication page).
- **Passages:** employment of young workers in AI-exposed occupations "now stands 19% below where
  it would be had it kept pace with that of their less-exposed peers; experienced workers show no
  comparable gap." On the education control: "education is plausibly a channel through which AI
  affects work rather than only a confounder".
- **Why open:** the entry-level gap widened, which is the claim's first link, but reemployment
  earnings and durations (the resolution condition) are not in. The education attenuation cuts
  both ways, so nothing narrowed.

## 6. `c-productivity-above-trend` (sixth, near-tie claim)

> U.S. nonfarm business labor productivity growth from 2024 through mid-2026 has been running well
> above its 2005-2019 trend, consistent with AI-driven productivity gains already appearing in the
> aggregate data.

Resolution condition: a multi-year decomposition of productivity growth into AI-attributable and
non-AI-attributable components.

### 2026-02-11 · open · `e-kcfed-industry-productivity-ai` (new), `e-bls-macro-series`

- **Source:** Çakır Melek and Miller, "A New U.S. Productivity Chapter? What Industry Data Say
  About AI", Federal Reserve Bank of Kansas City Economic Bulletin.
  https://www.kansascityfed.org/research/economic-bulletin/a-new-us-productivity-chapter-what-industry-data-say-about-ai/
- **Date:** 2026-02-11.
- **Passage:** "Overall, AI appears linked to within-industry gains, but its aggregate footprint
  is still limited, consistent with adoption still spreading across industries."
- **Why open:** a partial industry decomposition, not the AI-attributable split the resolution
  needs; it cuts against the "already in the aggregate" half without settling it.

### 2026-05-26 · open · `e-sffed-productivity-regime-2026` (new node)

- **Source:** Abdelrahman and Foerster, "Have We Entered an Era of High Productivity Growth?",
  FRBSF Economic Letter 2026-14. https://www.frbsf.org/wp-content/uploads/el2026-14.pdf
- **Date:** 2026-05-26 (PDF header; a fetch-tool summary said May 14, but the PDF header wins).
- **Passage:** "This suggests that productivity improvements so far reflect better tools for
  workers rather than fundamental economic advancement."
- **Why open:** 57% odds of a high-growth regime on labor productivity against 21% on TFP. No
  AI-attributable share is estimated.

---

## Graph additions in this change

Ten EVIDENCE nodes and eleven `evidences` edges (`edge-147` to `edge-157`), all
`provenance.origin: "curator"`, `createdAt` 2026-09-22, with weights and `weightBasis`:

| node | edge(s) | polarity |
|---|---|---|
| `e-humlum-vestergaard-denmark` | → `c-firms-cut-hiring-not-output` | challenging |
| `e-hosseini-lichtinger-seniority` | → `c-firms-cut-hiring-not-output` | supporting |
| `e-census-btos-ai-supplement-2026` | → `c-firms-cut-hiring-not-output` | challenging |
| `e-mdrc-workadvance-10yr` | → `c-targeted-programs-can-help` | supporting |
| `e-hyman-wioa-ai-retraining` | → `c-targeted-programs-can-help`, → `c-displaced-workers-can-retrain-costlessly` | qualifying, qualifying |
| `e-manning-aguirre-adaptive-capacity` | → `c-displaced-workers-can-retrain-costlessly` | qualifying |
| `e-stanford-canaries-2026-update` | → `c-credential-pathway-narrows` | supporting |
| `e-eig-young-grads-exposure` | → `c-credential-pathway-narrows` | challenging |
| `e-kcfed-industry-productivity-ai` | → `c-productivity-above-trend` | challenging |
| `e-sffed-productivity-regime-2026` | → `c-productivity-above-trend` | qualifying |

`c-firms-cut-hiring-not-output` now has three challenging edges, which trips the validator's
same-polarity warning (rule 5). Its `statusBasis` was extended to say why that is not a one-sided
record, and `updatedAt` was set. `scripts/validate-argument-draft.ts`: schema ok, 0 errors,
39 warnings (was 38; the new one is that same-polarity warning).

## Ranking side effects

The top-5 claim set is unchanged, but positions 4 to 8 sit within about 0.15 of each other and
move with any evidence edit:

- In an intermediate state (after the crux 1 to 5 evidence, before the productivity evidence),
  `c-productivity-above-trend` entered the served top 5 and the definitional crux dropped to
  sixth. Leave-one-out tests showed no single edge was responsible; the effect comes from the
  combination.
- Final top 15 against the pre-change graph: `c-care-reallocation-counts-as-adjustment` fell from
  8th to outside the top 15; `c-offshoring-rival-explanation` fell from 10th to 15th;
  `c-decline-caused-by-ai` rose from 12th to 10th; `c-productivity-above-trend` and
  `c-no-productivity-boom-visible` rose to 8th and 9th.
- `scripts/validate-crux-recall.ts`: overall FAIL both before and after (pooled Recall@5 1/10).
  For this topic, `aijobs-p1` is now recovered and `aijobs-p4` is lost, so Recall@10 stays 2/4.
  Named test 3 (offshoring top-10) went from PASS (rank 10) to FAIL (rank 15). Named test 2
  (normative survives) was already failing.
- Engine behaviour worth knowing: `identifyCruxes` stops its greedy selection at `limit`
  *before* re-sorting by redundancy-penalized score, so the top 5 at `limit: 5` is not always
  the first five of `limit: 10`.

## For founder review

1. **Judgment calls on `narrowed`.** Crux 1 is the strongest case (three independent firm-level
   sources). Crux 2 rests on a matched, non-randomized national study. Both crux 3 entries are
   scope narrowings: an index of predicted capacity (Brookings) and a finding about the route
   (the Hyman revision). Downgrade any of them to `open` if the bar is "a sub-claim settled".
2. **Crux 4 could be `unresolvable`.** It is a definitional-choice fork that no evidence can
   settle, which the spec allows. Kept `open`, because the resolution condition (the sides agree
   on a metric) can still be met by agreement, and the page's "standing value disagreement" line
   would misdescribe a definitional crux.
3. **The Stanford 16% node is out of date.** The August 2026 update leads with a descriptive 19%
   gap and moves the earlier firm-controlled 13% and 16% estimates into history. The graph's
   `e-stanford-adp-16pct`, and the topic meta and share-card text that cite 16%, were not changed.
   A `supersedes` edge from `e-stanford-canaries-2026-update` is the model-correct fix, but it
   touches flagship copy pinned by `lib/argument/flagshipContracts.test.tsx`.
4. **Humlum and Vestergaard also bear on `c-decline-caused-by-ai`.** They find the early-career
   declines in Denmark are not driven by adopting firms. That edge was not added, to keep the
   change scoped. It probably should be.
5. **The Hyman revision strains `c-retraining-modest-negative` (uncontested).** Positive national
   WIOA training returns sit awkwardly next to an uncontested "modest-to-negative" claim. The
   status may need review.
6. **Hosseini and Lichtinger were not read in full.** SSRN was bot-blocked and no check was
   bypassed. The node omits effect sizes, carries `bot-blocked-assumed-live` and two
   `unverifiedFlags`, and its date comes from the author's announcement post.
7. **Dallas Fed title mismatch.** `e-dallas-fed-wage-growth` gives its source title as "AI
   Exposure and Wage Growth"; the published title is "AI is simultaneously aiding and replacing
   workers, wage data suggest" (2026-02-24). Not changed here.
8. **Conflict of interest.** This ledger was drafted by Claude, an Anthropic model. One entry
   cites Anthropic's CEO, as a public yardstick only. The Anthropic Economic Index was
   deliberately not used as a source.
9. **Klarna reversal not added.** In May 2025 Klarna said it was hiring human agents again after
   its AI-first push (CX Dive, 2025-05-09, reporting a Bloomberg interview:
   https://www.customerexperiencedive.com/news/klarna-reinvests-human-talent-customer-service-AI-chatbot/747586/).
   It bears on `e-klarna-700-agents`, crux 1's other supporting evidence, and could be a
   qualifying node or a `limits_scope` claim.
10. **Curator display name.** The brief specified `argumend-editorial`. The ledger UI renders
    "Recorded by <curator>", and the ledger-code agent suggested "Argumend editors" as easier to
    read. It is a one-line find-and-replace either way.
11. **Crux baseline fixture.** The ledger-code branch pins flagship rankings in
    `lib/crux/__fixtures__/flagship-cruxes.baseline.json`. These graph edits change the
    `ai-mass-unemployment` ranking on purpose, so the fixture has to be regenerated
    (`UPDATE_CRUX_BASELINE=1`) when the two branches merge.
12. **Month-only date.** The Census working paper gives only "April 2026", so its `publishedAt`
    is `2026-04`. It is cited inside the 2026-09-01 entry and does not date an entry itself.

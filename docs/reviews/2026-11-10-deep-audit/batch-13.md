# Deep citation audit, batch 13 (2026-11-10)

Maps assigned: `scott-cost-disease`, `standardized-testing-debate`, `meritocracy-myth`.

**Only `scott-cost-disease` was audited.** The usage check read `PROCEED` at the start
(7d=68%) and `THROTTLE_7D` (7d=76%, threshold 75%) after the first map, so work stopped
there as instructed. `standardized-testing-debate` and `meritocracy-myth` were read but
no source was loaded and neither file was edited. They still need a full pass.

For the audited map, every card's `sourceUrl` was loaded in this session (directly,
through the PubMed record, or through a web.archive.org snapshot of the same page) and
the card text compared with it. Only changed cards are tabled.

## scott-cost-disease

20 cards. 18 checked against a loaded source: 14 fixed, 0 replaced, 4 checked out
unchanged (`nordhaus-baumol-diseases`, `turner-pell-incidence`, `eno-50-percent-premium`,
`cutler-value-medical-spending`; every number and quotation in those four is verbatim).
2 cards carry no source to load (see Unresolved). Import check passes.

| Card | What was wrong | What it says now | Verified against |
|---|---|---|---|
| `helland-tabarrok` | "Baumol carries the majority" and "the bulk of real price growth in education and a substantial share in health care" are not the study's words; no such split is stated. | Title and text give the study's own conclusion, quoted ("the Baumol effect is the best explanation for rising prices in education and healthcare"), its 139-industry test, and its statement that the bulk of the lower-education rise is spending on teachers. Full title in `source`. | Study PDF via https://web.archive.org/web/20250802204843/https://www.mercatus.org/media/70001/download?attachment ; landing page via https://web.archive.org/web/20251026012403/https://www.mercatus.org/research/books/why-are-prices-so-damn-high (live page returns 403 to scripts) |
| `baumol-book` | Cited "Baumol & Bowen (1966)", which the linked page does not mention. Filed `for` although the book is the pillar's null hypothesis, the same reading as the two `against` cards beside it. | Describes the 2012 book from the publisher's page, with its summary line quoted ("society will be able to afford the rising costs"). **Side changed `for` → `against`**; the reasoning says so. | https://yalebooks.yale.edu/book/9780300188486/the-cost-disease/ |
| `haircut-counterexample` | No source. "Real prices [of haircuts and restaurant meals] grew only modestly" was unverified. | Same argument, anchored to a loaded figure: physicians' real income tripled since 1960 while barbers' and bus drivers' saw "essentially no increase" (quoted). Restaurant claim dropped from the card. Reasoning notes the source gives incomes, not prices, and that its authors read the figure differently. Now has `source` and `sourceUrl`. | Helland & Tabarrok PDF (as above), Figure 19 discussion |
| `flat-output` | Source named "NAEP Long-Term Trend Assessment" but the URL is a mid-1990s Hanushek paper whose data stop in 1992. No figures. | Age-17 scores: reading 285 (1971) to 287 (2012), mathematics 304 (1973) to 306 (2012). Current spending per pupil $5,980 (1970–71) to $13,196 (2011–12) in constant 2021–22 dollars, about 2.2 times. Reasoning adds that 9- and 13-year-olds gained. | https://nces.ed.gov/programs/digest/d22/tables/dt22_221.85.asp ; https://nces.ed.gov/programs/digest/d22/tables/dt22_222.85.asp ; https://nces.ed.gov/programs/digest/d22/tables/dt22_236.55.asp |
| `naep-flat` | Same wrong source and URL as `flat-output`. | Same verified figures, linked to the spending table; reasoning notes the gains at age 9. | Same three NCES tables |
| `k12-counterexample` | Source named the NCES as author and the section heading as the title. | Source is Eric A. Hanushek, "Improving School Performance While Controlling Costs" (NCES web publication 96344). Text adds the paper's figure (real spending per pupil up almost 3.5% a year, 1890–1990) and a verbatim quotation. Side unchanged. | https://nces.ed.gov/pubs/web/96344han.asp |
| `himmelstein-2020` | Title said "≈ 4x"; $2,497 / $551 is 4.5. | Title "≈ 4.5x"; shares given exactly (34.2% vs 17.0%); the abstract's stated limitations added. | PubMed record 31905376 (abstract of https://www.acpjournals.org/doi/10.7326/M19-2818, which returns 403 to scripts) |
| `ginsberg-admin` | No figures; "faster than ... students" not on the linked publisher page. | Figures from the author's own adapted excerpt: faculty up slightly more than 50% over four decades, in line with enrollment; administrators up 85%, administrative staffers 240%; 1975–2005 ratios (1:84 to 1:68 administrators, 1:50 to 1:21 professional staff). `sourceUrl` moved to the excerpt, where the numbers can be read. | https://washingtonmonthly.com/2011/08/28/administrators-ate-my-tuition/ ; book record via https://web.archive.org/web/20241001024253/https://academic.oup.com/book/40915 |
| `lucca-nadauld-shen` | Title said "each aid dollar" (the finding is for subsidized loan maximums). "Later in Review of Financial Studies" and "sticker tuition" are not on the linked page. | Abstract quoted; dates as the page gives them (July 2015, revised February 2017); smaller effect for unsubsidized loans and where the effect was strongest. | https://www.newyorkfed.org/research/staff_reports/sr733 |
| `insurance-price-insensitivity` | Card said patients "rarely see or shop on price"; the RAND brief says the opposite about mechanism: savings "came from using fewer services rather than finding lower prices". No figures. | Retitled to the finding. Design (2,750 families, 7,700+ people, 1971–1982), the 20% and 30% spending differences (quoted), the fewer-services sentence (quoted), and the health result. Directness 6 → 5 because the effect is on use, not on provider prices, which is what the crux asks. | https://www.rand.org/content/dam/rand/pubs/research_briefs/2006/RAND_RB9174.pdf |
| `transit-costs-project` | URL was the project homepage, which carries no figure. "$2.5 billion per mile" is not the project's number. "Several times ... European and Asian costs" was vague. | Phase 1 cost $4.6 billion for 2.7 km: about $1.7 billion a kilometer ($2.7 billion a mile, my division of the report's two figures), 8 to 12 times the project's composite low-cost baseline. U.S. ranked sixth most expensive of 59 countries with 37% of track tunneled. | https://transitcosts.com/transit-costs-study-final-report/ |
| `brooks-liscow` | "Tied to rising land costs and litigation/participation requirements" overstated the paper; reasoning called it "well-identified". | Abstract's wording: "more than threefold"; input prices explain little; income and housing prices explain about half; citizen voice is "suggestive evidence". Reasoning corrected. Article title and issue added. | https://www.aeaweb.org/articles?id=10.1257%2Fapp.20200398 |
| `scope-geography` | Generic sentence with "studies suggest"; nothing specific from the cited report. | Three verbatim concessions from the report (geology and archaeology drive costs; accounting and scope make precise comparison difficult; the premium is a range of 8 to 12), plus its finding that at most a quarter of the labor difference is pay. Side unchanged. | https://transitcosts.com/transit-costs-study-final-report/ |
| `life-expectancy-stall` | Source "CDC / National Vital Statistics" with no title; no figures; "even as health spending kept climbing" is not in the source. | +0.2 years 2010–2014, −0.3 years 2014–2017, +0.1 in 2018, 0.2 below the 2014 peak; 50.6% of the decline from unintentional injuries, offset by falling cancer and heart-disease mortality. Reasoning says the spending half is not from this source. Full citation. | https://web.archive.org/web/20241221122236/https://www.cdc.gov/nchs/data/hestat/life-expectancy/lifeexpectancy-H.pdf (live PDF returns 403 to scripts) |

Outside the cards, same file:

- Opening (`keystone_fact`): "roughly $2.5 billion a mile, several times what comparable lines cost in Europe and Asia" is now the final report's figures ($4.6 billion for 2.7 km, about $1.7 billion a kilometer or $2.7 billion a mile, roughly ten times the Italian and Swedish subways in the same study). `sourceUrl` moved from the homepage to the final report; `source` names it.
- Pillar 2 `proponent_rebuttal` and crux `skeptic_flip`: "about four times" / "near four times" Canada's administrative cost is now "about four and a half times".
- Left as is: "French or Korean costs" in pillar 4. It is not in the Transit Costs report but is in the map's own first reference (the Slate Star Codex essay, which loads and cites Vox for Paris and Seoul). "Real per-pupil spending doubled" in pillars 1 and 5 is an understatement (2.2 times by 2011–12) but not wrong.

Judgment call for the lead: `baumol-book` moved to `against`. The 2026-09-21 side adjudication fixed sides relative to the topic claim and did not rule on this card. The book's thesis (one benign cause, affordable) is the claim's opposite on its second clause, like Helland–Tabarrok and Nordhaus, which are `against`. The crux still has two `for` cards (`haircut-counterexample`, `flat-output`). Revert the one line if you read it the other way.

Unresolved:

- `admin-is-real-coordination` and `medicine-improved` are labelled "Synthesis / inference" and have no `sourceUrl`. Nothing to load; left unchanged and not counted as checked.
- `himmelstein-2020`: the journal published a correction (Ann Intern Med 173(5):415, September 2020; PubMed 32866397) whose text I could not open. The card's figures match the indexed abstract of the original article.

Repeated elsewhere: none. The old figures ("$2.5 billion", "Second Avenue", "2,497", "four times the per-capita") do not appear in `data/blog.ts`, `data/guides.ts` or any other file under `data/topics`.

## standardized-testing-debate

Not audited (budget stop). 0 cards checked. 10 evidence cards plus the opening remain.

## meritocracy-myth

Not audited (budget stop). 0 cards checked. 12 evidence cards plus the opening and three
references remain, including the two known suspects (`effort-motivation`, sourced to a
book sales page, and `aspirational-framework`, sourced to the "I Have a Dream" PDF).

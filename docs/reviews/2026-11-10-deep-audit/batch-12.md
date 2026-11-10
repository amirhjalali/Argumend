# Deep citation audit, batch 12 (2026-11-10)

Maps: `occupational-licensing-reform`, `congestion-pricing`, `jones-act`.

**Stopped early.** The usage check passed at the start and after the first two maps (7d = 68%), then returned `THROTTLE_7D` (7d = 76%, threshold 75%) while `jones-act` was being researched. Per the run rules, work stopped there. `occupational-licensing-reform` and `congestion-pricing` are finished and edited. **`data/topics/jones-act.ts` was not edited at all**; every source for it was loaded and compared, and the corrections it needs are listed below so the next run can apply them without re-fetching.

Where the live page returned 403 to a plain fetch, the same document was read through web.archive.org (noted per row). No ids changed. Each crux still has a non-agreed card on both sides. The import check passes for the two edited files.

| Map | Cards checked | Fixed in place | Replaced | Checked out unchanged | File edited |
| --- | --- | --- | --- | --- | --- |
| occupational-licensing-reform | 8 | 3 | 0 | 5 | yes |
| congestion-pricing | 6 | 1 | 0 | 5 | yes |
| jones-act | 19 | 0 (12 pending) | 0 (5 pending) | 2 | **no** |

## occupational-licensing-reform

Keystone fact: "more than one-quarter" and "five-fold since the 1950s" are in the Treasury/CEA/Labor report (the five-fold figure is the State-licensed share). The 36% figure is in the 2017 working-paper version of Johnson and Kleiner, not in the published abstract, so the keystone `source` now names Minneapolis Fed Staff Report 561 as the origin of the number. Statement text unchanged.

| Card id | What was wrong | What it says now | Verified against |
| --- | --- | --- | --- |
| `johnson-kleiner-migration` | "~7% less likely to move between states than workers in occupations with national licensing exams" is not in any version loaded. The working paper's direct comparison is 31% lower (16% after netting out lower within-state moves). The 36% figure was attributed to the 2020 journal article, whose abstract gives no number. | 22 occupations; 36 percent lower than other occupations (2017 working paper); no evidence of limited migration where the exam is national; 31 percent lower in the direct comparison, 16 percent net; published abstract quoted: "can only account for a small part of the overall decline in recent decades." `source` names both versions; reasoning says the published text was not checked for revised estimates. | https://www.aeaweb.org/articles?id=10.1257/pol.20170704 (abstract) and https://www.minneapolisfed.org/research/sr/sr561.pdf (redirects to researchdatabase.minneapolisfed.org); same text at https://www.nber.org/papers/w24107 |
| `ij-raising-barriers` | `sourceUrl` was an IssueLab aggregator copy that returns 403. "(e.g., barbers, manicurists, interior designers)" left three of the six occupations unnamed; "no significant" lacked "statistically". | `sourceUrl` is the Institute for Justice report page (archive snapshot; ij.org returns 403 live). All six occupations named. `source` says "revised October 2022", as the report does. 7 of 9 and "other 2 the less-licensed state scored higher" confirmed. | https://web.archive.org/web/20250114153710/https://ij.org/report/raising-barriers-not-quality/ |
| `nc-dental-ftc` | `sourceUrl` (FTC press statement) returns 404, as does the obvious variant. | `sourceUrl` is the Supreme Court syllabus and opinion at Cornell LII. Description adds what the syllabus states: six of eight board members must be practicing dentists; at least 47 cease-and-desist letters, after dentists complained about non-dentists' lower prices. `source` drops the FTC statement and gives the decision date, February 25, 2015. | https://www.law.cornell.edu/supremecourt/text/13-534 |

Checked out unchanged (5): `kleiner-soltas-welfare` and `willingness-to-pay-offset` (12 percent, 70/30 incidence, 80 percent offset, and Review of Economic Studies 90(5), 2023, all on https://www.nber.org/papers/w26383), `midwifery-mortality` (1979–2020, 2.5 percent, 0.6 months, "confined among blacks and ... slightly larger among males" at https://pmc.ncbi.nlm.nih.gov/articles/PMC10841694/), `cea-costs-summary` and `cea-safety-benefit` (both quotes verbatim in the executive summary of the 2015 report PDF).

Unresolved:

- `johnson-kleiner-migration` and the keystone: the published AEJ: Economic Policy text (2020) is paywalled and no open copy was found. The 36% and 31%/16% figures are the December 2017 working-paper estimates; the published tables may differ. Someone with journal access should check Table 3 or its equivalent.
- `nc-dental-ftc`: the reporter citation "574 U.S. 494" was not on the LII page (it prints the slip-opinion form). Left as written.
- Crux text, not a card: `quality-causal-test.falsification.skeptic_flip` says stricter licensing "showed no quality edge in 7 of 9 cases". The report found no edge in any of the nine (seven no difference, two where the lighter regime scored higher). Left alone as crux text.

## congestion-pricing

Keystone fact checked against Eliasson Table 1 and the TfL sixth annual report. No change.

| Card id | What was wrong | What it says now | Verified against |
| --- | --- | --- | --- |
| `nyc-first-year` | "peak-hour speeds ... rose 4.6%": the report's measure is average speed during peak toll hours, which run 5 a.m. to 9 p.m. on weekdays and 9 a.m. to 9 p.m. on weekends, not a rush-hour figure. The morning window for the 23% figure was unstated. | Says 6 to 10 a.m. for the crossing speeds and spells out the peak toll hours for the 4.6% figure. 11%, January 5 through October 2025, seasonally adjusted baseline including excluded roadways all confirmed. | https://web.archive.org/web/20261021024826/https://www.mta.info/document/195631 (mta.info returns 403 to a plain fetch; same PDF) |

Checked out unchanged (5): `stockholm-persistent-cut` (−21.0% in 2006a, −22.1% in 2013, adjusted row ends 2011, p. 9 of https://www.transportportal.se/swopec/cts2014-7.pdf), `london-congestion-decay` (21 percent for vehicles with four or more wheels on p. 40; congestion "identical to the representative value for 2002" on p. 4; capacity explanation and the no-scheme counterfactual on pp. 3–4 of the TfL PDF), `nyc-revenue-target-met` ($573.1M, $105.3M, $467.8M, unaudited, debt service excluded, Table 6-1 and p. 68 of the MTA report), `nyc-revenue-shortfall` (November 14, 2024; $9 daytime E-ZPass car toll through 2027, $12 from 2028; "$15 billion in bonds"; read with WebFetch because the page returns 403 to curl), `london-revenue-modest` (£341.6m, £128.0m, £4.1m, £209.5m against £235.6m, Note 1(c), p. 138 of the 2024/25 accounts).

Unresolved: none. One observation: `nyc-revenue-shortfall` is marked `for` although its own text says the 2024 revision "introduce[s] planning uncertainty". The release does keep the $15 billion goal, so the side is defensible and was left.

## jones-act (researched, NOT edited)

All 19 cards, the keystone and the three references were loaded and compared. Nothing was written to the file. Two cards check out as they stand: `cato-burden` and `pwc-maritime-contribution` (every quote verbatim in the Marine Log article). The keystone is right: CRS R45725 gives 99 oceangoing Jones Act ships in March 2018, down from 434 in 1950.

Sources as loaded (congress.gov, crsreports.congress.gov, gao.gov, usitc.gov, itf-oecd.org and cato.org all return 403 to a plain fetch; the archive snapshots below are the same documents):

- CRS R45725: https://web.archive.org/web/20260707001839/https://www.congress.gov/crs-product/R45725
- CRS R44831 (new, for the modal pillar): https://web.archive.org/web/20250227001605/https://crsreports.congress.gov/product/pdf/R/R44831
- GAO-13-260: https://web.archive.org/web/20261101194803/https://www.gao.gov/assets/gao-13-260.pdf
- GAO-18-478: https://web.archive.org/web/20261011050617/https://www.gao.gov/assets/gao-18-478.pdf
- GAO-21-118: https://web.archive.org/web/20260929125806/https://www.gao.gov/assets/gao-21-118.pdf
- USITC 3201: https://web.archive.org/web/20260130111714/https://www.usitc.gov/publications/332/pub3201.pdf
- ECMT 2001: https://web.archive.org/web/20241203183459/https://www.itf-oecd.org/sites/default/files/docs/01shortsea.pdf
- Cato PA 845: https://web.archive.org/web/20190531140914/https://www.cato.org/publications/policy-analysis/jones-act-burden-america-can-no-longer-bear
- Loaded live: NY Fed report PDF, DHS waiver PDF, USTRANSCOM report on globalsecurity.org, EPA NEPIS P100X04Q, Clark Center survey, Marine Log.

Pending corrections (fix in place unless marked replace):

| Card id | What is wrong | What the source says |
| --- | --- | --- |
| `nyfed-pr` | Direction is wrong. The card says it costs twice as much to bring goods from the mainland as *from* nearby foreign ports. | NY Fed, June 29, 2012: "$3,063 to ship a twenty-foot container of household and commercial goods from the East Coast of the United States to Puerto Rico; the same shipment costs $1,504 to nearby Santo Domingo ... and $1,687 to Kingston". Same origin, different destinations. The report adds: "While causality from the Jones Act has not been established, it stands to reason that the act is an important contributor insofar as it reduces competition". The same wrong wording is in the pillar's `proponent_rebuttal` and the crux `skeptic_flip`. |
| `gao-uncertain` | "genuinely uncertain" is put in quotation marks in the crux `supporter_flip` and used in the title and `skeptic_premise`. GAO never says it. | GAO-13-260 highlights: "The effects of modifying the application of the Jones Act for Puerto Rico are highly uncertain". Body, p. 9: "because so many other factors besides the Jones Act affect rates, it is difficult to isolate the exact extent to which freight rates ... are affected by the Jones Act." |
| `usitc-welfare` | "$380 million" is the top of a range. | $1,324 million (general equilibrium, 1996 data, about a 22 percent fall in the price of affected shipping). Partial equilibrium for the build requirement alone: "$138 million to $380 million". The two are not additive (table note 3). |
| `ship-build-premium` | `source` says "MARAD / industry shipbuilding cost data" but the URL is CRS; "built in Asia or Europe" is not in it. | CRS R45725: a U.S.-built tanker "is estimated to be about four times the global price of a similar vessel, while a U.S.-built container ship may cost five times the global price, according to one maritime consulting firm." 20% more in 1922, double in the 1950s, three times by the 1990s. |
| `grabow-islands` | "documents higher food, fuel, and construction-material costs in Puerto Rico, Hawaii, and Alaska" is not what PA 845 contains. | It gives sourcing examples: Puerto Rico farmers buying feed and fertilizer abroad (citing GAO 2013), Hawaiian cattlemen shipping cattle through Canada or by air, Puerto Rico airlines importing jet fuel, Gulf-to-Northeast crude at $5 to $6 a barrel on a Jones Act tanker against $2 to Eastern Canada. It calls the Act "a particularly heavy burden" for Alaska, Hawaii and the territories. |
| `maria-waiver` | No specifics; "tacit acknowledgment" is the card's reading. | 10-day waiver signed September 28, 2017 by the Acting Secretary at the Defense Department's request "in the interest of national defense", for "all products to be shipped from U.S. coastwise points to Puerto Rico". The document cites only national defense. |
| `gao-service-reliability` | "reroute capacity elsewhere" is loose. | GAO: foreign carriers would likely serve the island on multi-stop routes; carriers "could even intentionally bypass ports on occasion to make up lost travel time"; shippers feared larger inventories. |
| `water-efficiency` | `source` is "BTS / EPA modal emissions data"; the URL is a two-page EPA SmartWay flyer. No numbers given. | EPA-420-F-19-013 (March 2019): inland barge about 576 ton-miles per gallon and 18 g CO2 per ton-mile; rail 473 and 22 g; truck about 65 g. Inland barge, not coastal ships. |
| `shortsea-underuse` | `source` is "OECD / ITF cabotage analysis"; the document is the ECMT's "Short Sea Shipping in Europe" (2001) and has no U.S. share. | ECMT: short sea shipping "has a market share of about 32 % within intra-community trades"; one of its two expert reports says "U.S.-built vessels are relatively more expensive". CRS R44831 supplies the U.S. side: cargo carried by domestic ships "has declined by 61% since 1960" while other modes more than doubled. |
| `geography-confound` (replace; rename to `port-cost-confound`, no references outside the file) | CRS R45725 does not say geography explains the modal split. CRS R44831 says the opposite: "U.S. geography is well suited to take advantage of ships' ability to facilitate commerce." | Real `against` finding, same crux: a 2013 East Coast feasibility study "found that port handling costs were the largest cost element, greater than ship fuel and vessel capital cost"; "port costs appear to be a particular barrier to diverting truck freight to a coastal waterway"; ships are slower than truck and rail (CRS R44831, 2017). |
| `turbo-activation` | "only a minority ... fully mission-capable" with a note to verify. | TURBO ACTIVATION 19-PLUS, September 2019, 61 ships: 63.9% ready for tasking (39 of 61); 27 of 33 (81.8%) ready for sea within 120 hours; 77.8% qualitative mission success; "Cumulative Fleet Success Rate of 40.7%" against an 85% goal. These are government-owned reserve ships, not Jones Act ships. |
| `fleet-collapse` | "many hundreds mid-century", with a note to confirm. | 434 in 1950, 99 in March 2018; aggregate deadweight capacity "still less than in 1950" (CRS R45725, Figure 1, MARAD data). |
| `mariner-shortage` | No figure; `source` names MARAD/TRANSCOM, URL is GAO. | GAO-18-478 (August 2018) on MARAD's working group: 11,768 qualified and available mariners as of June 2017, "1,839 less than the 13,607" needed for sustained operation; enough for an initial surge; GAO notes data limits. |
| `security-public-good` (replace source) | `source` is "DoD / MARAD policy statements"; GAO-18-478 is about the internationally trading fleet, not the Jones Act, and has no such statement. | CRS R45725 quotes Maritime Administrator Mark Buzby (House Armed Services, March 8, 2018): Jones Act requirements "support U.S. shipyards and repair facilities ... This requirement results in the employment of the majority of U.S. mariners." About 3,380 mariners serve on Jones Act oceangoing ships, 29% of the 11,678 MARAD says sealift needs. |
| `economist-consensus` (replace) | "Across the ideological spectrum — from Cato to the Mercatus Center" names two free-market institutes; neither is at the URL. | Clark Center US Economic Experts Panel, March 25, 2026, statement C: "Any national security benefits from the Jones Act are more than offset by its negative economic effects." My tally of the published votes: 11 strongly agree, 13 agree, 9 uncertain, 2 disagree, 1 strongly disagree, 2 no opinion, 7 did not answer. On statement A, 24 of 36 disagreed that the 60-day waiver would substantially lower gasoline prices. |
| `concentrated-lobby` (replace source) | `source` is "Public-choice analysis of maritime protectionism", URL is CRS, which makes no such argument. | Cato PA 845: "The beneficiaries of the status quo are limited in number but well organized"; costs "are spread across the economy like a stealth tax"; supporters named as "U.S. shipbuilders, merchant mariners, various maritime unions". Independence should match the other Cato cards (5). |
| `legitimate-stakeholders` (replace) | Generic assertion; GAO-21-118 is a report on the crude oil export ban and says nothing about repeal or transition support. | GAO-21-118, pp. 21–22: after the 2015 export-ban repeal cut demand for Jones Act tankers (Gulf-to-East Coast crude shipments by Jones Act vessels fell 57 percent in 2016), "one of the two remaining U.S. shipyards with the capability to build Jones Act tankers ... experienced a 90 percent decrease in employment from its peak", according to one industry representative; six of seven stakeholders reported fewer mariner jobs. |

Unresolved for jones-act:

- All 17 pending rows above: verified but not applied.
- Pillar text, not a card: `cost-premium.proponent_rebuttal` says bodies "from the U.S. International Trade Commission to the OECD have repeatedly estimated net welfare gains". No OECD estimate was loaded.
- Pillar text: `modal-distortion.skeptic_premise` says the U.S. underuses coastal shipping "mostly because of geography". The map's own CRS source says U.S. geography is well suited to it.
- The NY Fed report (footnote 34) attributes a $656 million estimate to the 1999 USITC study; USITC 3201 itself says $1,324 million. The card's figure matches the primary source. The $656 million figure appears to belong to a later update, which was not loaded.

## Repeats elsewhere

Searched `data/blog.ts`, `data/guides.ts`, `data/is-claims.ts` and `data/topics/*.ts` for the corrected figures and URLs ("7% less likely", "national licensing exams", the IssueLab and FTC URLs, "36% lower"). None appears outside `occupational-licensing-reform.ts`. No blog post or guide mentions the Jones Act, so the pending Jones Act corrections have no repeats there either.

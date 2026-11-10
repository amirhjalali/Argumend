# Deep citation audit, batch 14 (2026-11-10)

Maps assigned: `sports-betting-legalization`, `net-neutrality`, `right-to-repair`.

**Stopped after the first map.** The usage check read `PROCEED` at the start (7d=68%) and
`THROTTLE_7D` (7d=76%, threshold 75%) after `sports-betting-legalization`, so `net-neutrality` and
`right-to-repair` were not started. Neither file was edited. Both still need the full audit.

Every source below was loaded in this session. The table lists only cards that changed.

## sports-betting-legalization

12 cards, 12 checked against a loaded source, 10 corrected, 1 replaced (same id), 1 checked out
(`ipv-nibrs-study`). Import check passes.

| Card id | What was wrong | What it says now | Verified against |
| --- | --- | --- | --- |
| `murphy-ncaa-148b-handle` | "6-3 ... on anti-commandeering grounds" blurred two votes; "31" mobile states has no source; the linked press release has no handle figure (it gives only $13.71B revenue) | Seven justices joined the anti-commandeering holding, six voted to strike the whole law; about 30 states online; $147.91B handle, up 23.6%, more than 95% online, $13.71B revenue up 25.4%; notes the later annual-report revision to $149.90B. `sourceUrl` is now the archived Q4 2024 tracker, which carries the handle | https://www.law.cornell.edu/supremecourt/text/16-476 ; https://web.archive.org/web/20250228192711/https://www.americangaming.org/resources/commercial-gaming-revenue-tracker/ ; https://web.archive.org/web/20251219030034/https://americangaming.org/resources/state-of-the-states-2025/ ($149.90B) |
| `illegal-market-displacement` | Said Americans wagered ~$64B a year illegally "before legalization". The AGA figure is a 2022 estimate of the illegal market four years after Murphy, with betting legal in 36 states and DC. GeoComply was called "independent" and its finding was given without scope | Title and text state the 2022 date and the AGA's "nearly 40 percent" of the market; GeoComply finding scoped to Super Bowl weekend 2025, with its September 2025 follow-up (10% more active-player growth, 39% more new accounts); reasoning notes GeoComply is a vendor to legal sportsbooks and that the estimate cuts both ways | https://web.archive.org/web/20250324062326/https://www.americangaming.org/new-aga-report-shows-americans-gamble-more-than-half-a-trillion-dollars-illegally-each-year/ ; https://www.geocomply.com/news/super-bowl-lix-drives-new-milestones-for-regulated-sports-betting/ ; https://www.geocomply.com/news/crackdowns-pay-off-enforcement-drives-players-to-legal-sportsbooks-geocomply-data-shows/ |
| `tax-revenue-3b` | Attributed $2.99B (2024) and New York's $1.2B to the Tax Foundation page, which reports only fiscal 2023 ($1.85B; New York "more than $800 million"). 51% was given as New York's rate alone | $2.99B for 2024 is USAFacts' figure from Census QTAX; New York's $1.2B is the twelve months through September 2025; the Census category can include horse-racing taxes; 51% is New Hampshire, New York and Rhode Island. `sourceUrl` is now USAFacts | https://usafacts.org/articles/how-much-revenue-does-sports-betting-generate/ ; https://taxfoundation.org/research/all/state/sports-betting-tax-revenue/ ; https://www.census.gov/library/stories/2025/12/sports-betting.html |
| `regressive-extraction-ucsd` | "Bank-transaction data" | "Digital payment records" (the release's words); called a working paper | https://today.ucsd.edu/story/legalized-gambling-increases-irresponsible-betting-behavior-especially-among-low-income-populations |
| `nber-gambling-away-stability` | "Across 26 states"; "not yet peer reviewed" | 230,171 households through September 2023, online betting live in 25 states plus DC; now published in the Journal of Financial Economics (2026). The $0.99 figure checks out (2SLS estimate) | https://www.nber.org/papers/w33108 and https://www.nber.org/system/files/working_papers/w33108/w33108.pdf |
| `credit-scores-bankruptcy` | "More than 4 million consumers", "25-30%" bankruptcy risk attributed to online betting, "largest among lower-income households", source named only as "academic analysis ... Stateline / NBC" | Names Hollenbeck, Larsen and Proserpio; roughly 7 million consumers; credit scores down roughly 0.3%; bankruptcies up 28%, collections up 8% (NBC's figures for the 2024 draft); stronger where betting is online, larger for young men in low-income counties | https://www.nbcnews.com/business/consumer/online-sports-gambling-bankrupting-households-reducing-savings-rcna167235 ; SSRN abstract 4903302 via https://web.archive.org/web/20240831131002/https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4903302 and the 20251230015008 snapshot |
| `regulatory-protections-offshore-gap` (replaced) | The cited AGA advocacy page says nothing about age checks, self-exclusion, helplines, prop-bet bans or affordability checks; it is a page about repealing the federal excise tax | Replaced with the AGA Responsible Gaming Regulations and Statutes Guide: all 38 jurisdictions require self-exclusion programs; 29 self-set limits; 35 signage or disclosures; 34 ad restrictions; 32 treatment funding; algorithmic-trigger rules in CO, MA, NJ, NC | https://web.archive.org/web/20260107023744/https://www.americangaming.org/resources/responsible-gaming-regulations-and-statutes-guide/ |
| `crs-consumer-finance` | Report was retitled and updated in July 2026; "affordability standards" is not in either version | Both titles and dates; findings as CRS states them (savings, overdrafts, credit-card debt, credit scores down 0.3% and 1.0% online, bankruptcy); bills on advertising, minimum federal standards and a national self-exclusion list; CRS's note that the effectiveness of state protections is debated | https://www.everycrsreport.com/reports/IF12761.html (July 2026 text) ; https://web.archive.org/web/20250129182353/https://crsreports.congress.gov/product/pdf/IF/IF12761 (Sept 2024 PDF) ; https://web.archive.org/web/20250330193128/https://www.congress.gov/crs-product/IF12761 |
| `helpline-surge-ma` | North Carolina "150% spike" and "average caller's age dropping from 42 to 37" could not be found in any source; "up to one-third" of calls; `sourceUrl` was a CBS rewrite that lacks the 3,050 and 1,378 figures | Massachusetts figures from the DPH release, with sports-betting callers 6 to 73 and DPH's statement that there is "currently no evidence" the rise reflects more problem gambling; one-third "non-helpline calls"; North Carolina from WRAL (68 calls in February 2024, 157 in March, records in April, May and June). `sourceUrl` is now the DPH release | https://web.archive.org/web/20251115172329/https://www.mass.gov/news/dph-report-shows-uptick-in-calls-to-states-problem-gambling-helpline ; https://cdcgaming.com/brief/one-third-of-callers-to-massachusetts-problem-gambling-helpline-are-seeking-tech-support-for-betting-apps/ ; https://www.wral.com/story/21591704/ ; https://www.cbsnews.com/boston/news/massachusetts-gambling-addiction-sports-betting/ |
| `integrity-monitoring-caught-fixing` | "About 40 athletes across 20 schools, with 11 found ..." is not in the source; the Temple case was presented as detected manipulation, but the NCAA found betting violations and, per the player's attorney, no evidence of point shaving | Leads with the Fresno State case (NCAA found the player altered his performance; bets flagged by a Nevada sportsbook operator); Temple facts as ESPN reports them (42 parlay bets, 23 Temple games, three against his team); more than a dozen players from seven schools ruled ineligible in 2025, about 30 cases opened | https://www.espn.com/mens-college-basketball/story/_/id/47049132/ncaa-former-temple-men-basketball-player-bet-team ; ESPN's Fresno State story as carried at https://abc30.com/post/ncaa-mens-basketball-players-conspired-gambling-scheme/17786959/ |
| `public-support-regulated-market` | "84% believe sports-event wagering should only be available through state-regulated online sportsbooks" is not on the cited page | Sentence removed; survey details added (Kantar, 2,001 registered voters aged 21 and over, July 22 to August 8, 2025); 74% and "less than 40% in 2018 to 64%" check out | https://web.archive.org/web/20260104021442/https://www.americangaming.org/resources/american-attitudes-towards-gaming/ |

Also changed outside the cards:

- `keystone_fact`: "Before the Supreme Court's 2018 Murphy v. NCAA ruling, Americans wagered an estimated $64 billion a year" is now "In 2022, four years after ... the industry's trade group estimated Americans were still wagering $63.8 billion a year". `keystone_fact.source` names the tracker.
- Pillar 1 `proponent_rebuttal`, crux `skeptic_flip`, question `q1`: same $64B date correction; GeoComply finding scoped to Super Bowl weekend 2025.
- Pillar 2 `skeptic_premise` and question `q2`: "26 states" and "25-30%" corrected as in the cards.
- Pillar 2 `proponent_rebuttal`: "display problem-gambling helpline numbers on every ad" and "moved toward mandatory affordability checks" replaced with what the AGA guide supports.
- Pillar 3 `skeptic_premise` and `proponent_rebuttal`: North Carolina and "up to a third" corrected as in the helpline card.
- `references`: the AGA 2024 release title no longer claims the handle figure; the CRS title is current.

Notes for the lead:

- `americangaming.org`, `mass.gov` and `congress.gov` return 403 to curl and WebFetch. Each was verified through a web.archive.org snapshot. Existing live `sourceUrl`s on those hosts were kept (`illegal-market-displacement`, `public-support-regulated-market`, `crs-consumer-finance`, `keystone_fact`); the new `helpline-surge-ma` URL is the live mass.gov address, verified through the 2025-11-15 snapshot; the two new AGA URLs are archive snapshots.
- Hollenbeck et al. revised their paper in December 2025. The current abstract reports credit scores down about 0.7 points on average and 12.17 points where betting is online, and no longer states a bankruptcy percentage. The card reports the 2024 draft's figures as NBC gave them and says so. The full paper was not loaded.
- The card id `murphy-ncaa-148b-handle` still fits the $147.91B tracker figure; the AGA's final 2024 figure is $149.90B.
- `data/topicSummaries.json` holds generated keywords for this map and may need regenerating by whatever script builds it; no numbers are repeated there.

Unresolved: none.

Repeated elsewhere: none. Searched `data/blog.ts`, `data/guides.ts`, `data/topics/` and `data/*.ts` for the old figures ($64 billion "before" legalization, 25-30% bankruptcy, 26 states, 4 million consumers, 150% spike, 42 to 37, 40 athletes); no other file repeats them, and no file outside the map references the card ids.

## net-neutrality

Not started (usage threshold reached). 7 cards, 0 checked.

## right-to-repair

Not started (usage threshold reached). 8 cards, 0 checked.

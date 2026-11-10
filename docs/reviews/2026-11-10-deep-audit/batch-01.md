# Deep citation audit, batch 01 (2026-11-10)

Maps: `consciousness-ai-systems`, `ai-2027`, `eacc-vs-tech-regulation`.
Every source below was loaded in this session. Tables list only cards that changed.

## consciousness-ai-systems

12 cards, 12 checked against a loaded source, 4 changed, 8 checked out, 0 replaced.

| Card id | What was wrong | What it says now | Verified against |
| --- | --- | --- | --- |
| `anthropic-welfare-research` | `sourceUrl` pointed at the introspection post, but the title and the two quotes come from the model-welfare post | `sourceUrl` is the welfare post; introspection post stays named in `source` | https://www.anthropic.com/research/exploring-model-welfare |
| `butlin-long-indicator-properties` | Title and reasoning said "no in-principle barrier"; description said current systems "satisfy few of the indicators". Neither is in the report | "No obvious technical barriers" (the report's words), none "a strong candidate for consciousness", and the functionalism working hypothesis is stated | https://arxiv.org/abs/2308.08708 (abstract and PDF) |
| `cogitate-theory-test` | "Limited prefrontal 'ignition'" misdescribed the GNWT result | Lack of ignition at stimulus offset, limited prefrontal representation of some conscious dimensions | https://www.nature.com/articles/s41586-025-08888-1 |
| `aims-survey-beliefs` | 838 US adults; the revised paper (v2, 5 Nov 2026) reports an analytic sample of 825 (838 recruited) | 825 | https://arxiv.org/abs/2506.11945 (v2 PDF, Table SI 25: 16.84% / 18.35%, 7.89% / 10.74%) |

Also changed outside the cards:

- `keystone_fact`: "since late 2024 Anthropic has run model-welfare assessments before deploying new models" had no source. Now: program opened in 2025, preliminary welfare assessment before deploying Claude Opus 4. Verified: https://www.anthropic.com/research/exploring-model-welfare and https://www.anthropic.com/research/end-subset-conversations. "No obvious technical barrier to building one that is [conscious]" now reads "that satisfies its indicators".
- Pillar 1 `proponent_rebuttal`: the 'non-negligible' quote attributed to Anthropic is not in Anthropic's posts, and the "2023 Nature article" urging companies to test for consciousness is a December 2024 Nature news article (the December 2023 one called for research funding). Verified: https://www.nature.com/articles/d41586-024-04023-8 and https://www.nature.com/articles/d41586-023-04047-6.

Unresolved: none. Seth and Chalmers were checked at abstract level only (full texts not loaded).

## ai-2027

20 cards, 16 checked against a loaded source, 6 changed, 10 checked out, 0 replaced. 4 cards have no source to load.

| Card id | What was wrong | What it says now | Verified against |
| --- | --- | --- | --- |
| `metr-time-horizon` | Paper is now titled "Measuring AI Ability to Complete Long Software Tasks"; `source` was just "METR (2025)" | Current title, date and arXiv id (also fixed in `references` and `keystone_fact.source`) | https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/ and https://arxiv.org/abs/2503.14499 |
| `epoch-compute-growth` | "4–5× annually over the past decade", URL on the old domain | About 5× per year since 2020 for frontier language models (90% CI 4× to 6×), doubling every 5.2 months | https://epoch.ai/trends (updated Feb 5, 2026) |
| `davidson-takeoff` | "Compressed into months" is not what the report finds; title was wrong | Median about 3 years (10th to 90th percentile 0.8 to 11) from 20% to 100% automation; best guess under a year from there to superintelligence | https://web.archive.org/web/20260101234319/https://coefficientgiving.org/research/what-a-compute-centric-framework-says-about-takeoff-speeds/ (live URL returns 403 to scripts; kept as `sourceUrl`) |
| `narrow-self-improvement` | "Related systems optimize chip layouts and GPU kernels" is not in the cited paper | AlphaTensor's own hardware-tailored algorithms, per the paper | https://www.nature.com/articles/s41586-022-05172-4 |
| `compute-capex-race` | "Tens to hundreds of billions" with no figure on the cited page | Epoch's figures: more than $370 billion raised, chip compute sold growing 2.5× a year, largest data center 1.1 million H100-equivalents | https://epoch.ai/trends |
| `export-controls-brake` | Title claimed controls are "throttling" the race; the source shows the rule, not its effect | Title and text state the October 7, 2022 rule and what it restricts | https://www.bis.gov/press-release/commerce-implements-new-export-controls-advanced-computing-semiconductor-manufacturing-items-peoples |

Also changed outside the cards: the Epoch figure in `keystone_fact`, pillar 2 `proponent_rebuttal`, crux equation, `skeptic_flip` and `common_ground` (4–5× to about 5× since 2020); "comparable pace" for algorithmic efficiency replaced with Epoch's halving every eight months (https://epoch.ai/publications/algorithmic-progress-in-language-models); `references` Epoch URL and title.

Unresolved:

- `serial-bottleneck`, `experiment-latency`, `deployment-ramp-lag`, `ai-winter-history`: labelled "Synthesis / inference", no source or URL, so nothing to check. Left unchanged.
- `christiano-slow-takeoff`: https://ai-alignment.com/takeoff-speeds-2b705d7b8a31 returns 403 to scripts. Text verified against the author's own copy at https://sideways-view.com/2018/02/24/takeoff-speeds/; URL left as is.

## eacc-vs-tech-regulation

14 cards, 14 checked against a loaded source, 13 changed, 1 checked out (`ai-safety-report-2024`), 0 replaced.

| Card id | What was wrong | What it says now | Verified against |
| --- | --- | --- | --- |
| `drug-development-cost-delay` | $2.6B called out-of-pocket and $2.87B "capitalized"; title blamed FDA regulation, which the study does not measure | Out-of-pocket $1.395B, capitalized pre-approval $2.558B, $2.87B with post-approval R&D; title states the finding | Europe PMC record for PMID 26928437 (DOI 10.1016/j.jhealeco.2016.01.012) |
| `nuclear-regulatory-capture` | Vogtle cost $36.8B; "7 to 15+ years due to regulation", "52 French reactors 1975-1990" and "safest source" not in the cited page | EIA: began 2009, $14B expected, more than $30B, in service 2023 and April 2024. WNA on the US and French fleets. OWID: among the safest, 99.8% fewer deaths than coal | https://www.eia.gov/todayinenergy/detail.php?id=61963, https://world-nuclear.org/information-library/country-profiles/countries-t-z/usa-nuclear-power, https://world-nuclear.org/information-library/country-profiles/countries-a-f/france, https://ourworldindata.org/safest-sources-of-energy |
| `moores-law-unregulated-progress` | `sourceUrl` was NBER w21524, a paper on optimal taxation; "$15+ trillion" and the SEMI claim had no source | Intel's statement of Moore's Law (1965, revised 1975, close to 60 years); unsourced figures removed | https://www.intel.com/content/www/us/en/newsroom/resources/moores-law.html (WebFetch) |
| `leaded-gasoline-decades-harm` | "Reduced the IQ of virtually every American born 1930-1980" is not the study's finding | Over 170 million Americans alive in 2015 exposed, 824 million IQ points, 2.6 per person, heaviest for those born 1951-1980; ban effective January 1, 1996 | Europe PMC full text PMC8931364 (DOI 10.1073/pnas.2118631119), https://www.epa.gov/archive/epa/aboutepa/epa-takes-final-step-phaseout-leaded-gasoline.html |
| `facebook-internal-research-harm` | "1 in 3 teen girls" dropped the base (girls who already had the issue); profit claim stated as fact; emoji claim unverifiable | The slide's words, Haugen's testimony quoted as testimony, Facebook's dispute; emoji claim removed | https://about.fb.com/news/2021/09/research-teen-well-being-and-instagram/, https://www.commerce.senate.gov/wp-content/uploads/media/doc/Frances%20Haugen%20Written%20Testimony.pdf |
| `auto-safety-market-improvements` | 24.09 and 1.10; title asserted the cause | 24.08 (1921) and 1.11 (2019); title states the decline | https://www.fhwa.dot.gov/policyinformation/statistics/2023/fi200.cfm |
| `social-media-mental-health-data` | APA advisory said to have "declared social media a significant risk" | APA's words: "not inherently beneficial or harmful to young people"; CDC figures confirmed (28 to 42, girls 36 to 57) | https://www.cdc.gov/yrbs/dstr/pdf/YRBS_Data-Summary-Trends_Report2023_508.pdf, https://www.apa.org/topics/social-media-internet/health-advisory-adolescent-social-media-use.pdf |
| `gdpr-startup-impact` | 22% fewer deals "from foreign investors" and 42% smaller deals are not in the cited working paper | 17.6% fewer weekly deals, 39.6% smaller average deal | https://www.nber.org/papers/w25248 (working paper PDF), https://www.nber.org/papers/w30028 |
| `eu-ai-act-effects` | "Adopted in March 2024", "compliance costs 1-6% of revenue", "full enforcement in 2027" | Proposed April 2021, adopted June 2024; generative AI obligations added June 2023; 24 and 36 month application dates | https://www.europarl.europa.eu/topics/en/article/20230601STO93804/eu-ai-act-first-regulation-on-artificial-intelligence, https://www.europarl.europa.eu/news/en/press-room/20230609IPR96212/meps-ready-to-negotiate-first-ever-rules-for-safe-and-transparent-ai |
| `china-tech-governance` | "More AI papers than US researchers in 2022"; UN said to call surveillance "potential crimes against humanity"; generic URL | AI Index 2023 wording; the UN finding is about arbitrary detentions | https://hai.stanford.edu/ai-index/2023-ai-index-report/research-and-development, https://news.un.org/en/story/2022/08/1125932 (WebFetch) |
| `crispr-governance-debates` | "Moratorium calls from the National Academies" and the research-output comparison had no source; the state response was left out | The 2018 summit statement's own words, and the three-year prison sentence | https://www.nationalacademies.org/news/statement-by-the-organizing-committee-of-the-second-international-summit-on-human-genome-editing, https://www.nature.com/articles/d41586-020-00001-y |
| `open-source-movement-outcomes` | "2024 Coverity Scan Report" does not exist; generic URL | 2013 report (April 2014): 0.59 against 0.72 defects per 1,000 lines | https://news.synopsys.com/2014-04-15-Coverity-Scan-Report-Finds-Open-Source-Software-Quality-Outpaces-Proprietary-Code-for-the-First-Time |
| `congressional-tech-illiteracy` | Hatch quote not verbatim; "2023 Internet Governance Project survey" and "average chair age 73" not found; homepage URL | Transcript wording; CRS counts for the 118th Congress, average senator age 64.0 | https://www.govinfo.gov/content/pkg/CHRG-115shrg37801/html/CHRG-115shrg37801.htm, CRS R47470 read at https://www.everycrsreport.com/reports/R47470.html |

Also changed outside the cards:

- Pillar 1 `skeptic_premise`: two quotes that are not in their sources ('the most significant existential threat after nuclear war'; 'current governance frameworks are not equipped to manage') replaced with the documents' own words. Verified: https://www.gov.uk/government/publications/uk-biological-security-strategy/uk-biological-security-strategy-html and https://arxiv.org/abs/2501.17805 (PDF).
- Pillar 1 `proponent_rebuttal`: "the safest power source" to "among the safest".
- Pillar 2 `skeptic_premise`, `proponent_rebuttal`, `skeptic_flip`, `common_ground`: 'toxic for teen girls' quote, 24.09 to 24.08, 1.10 to 1.11.
- Pillar 3 `proponent_rebuttal`: "not government intervention" for He Jiankui corrected (a court jailed him).
- `references`: wrong PNAS title, AI Safety Report link (now redirects to the 2026 edition), AI Index, CDC and World Nuclear entries.

Unresolved (left as written):

- "10-15 years" to develop a drug (keystone, pillar 1 rebuttal, flip, common ground, card): not found in a loaded primary source. The card now says the figure is not from the Tufts study. The Operation Warp Speed sentence was not source-checked.
- "About 7 years to 15+" US nuclear build times and "France built most of its fleet in about 15 years" remain in pillar 1 `proponent_rebuttal` and `skeptic_flip`; no source found.
- `leaded-gasoline-decades-harm`: "warnings from public health scientists" and "industry funded decades of disinformation" are not in the loaded sources.
- `auto-safety-market-improvements`: Volvo 1959, Mercedes 1952 and Ford Pinto 1978 not source-checked.
- `social-media-mental-health-data`: the Haidt correlation sentence not source-checked.
- `china-tech-governance`: 2.3 million 5G base stations, 1,200 GW renewables, 600 million CCTV cameras not source-checked. OHCHR's own page returns 403.
- `open-source-movement-outcomes`: "96% of the top 1 million web servers" and "100% of the top 500 supercomputers" not verified.
- `congressional-tech-illiteracy`: the 2023 TikTok hearing sentence not verified.
- `references`: the Wall Street Journal Facebook Files link is paywalled and was not loaded.
- Pillar text not checked: Boeing 737 MAX figures, the "series of tubes" quote, $10 trillion market cap, Sackler death toll.

## Repeated elsewhere (not edited)

- `data/blog.ts:3473`: "$15+ trillion in cumulative global GDP growth" for Moore's Law (removed from the card as unsourced) and "10-15 years and $2.6 billion per approved drug under FDA regulation".
- `data/blog.ts:3959`: Vogtle "came in above $35 billion"; EIA says more than $30 billion (`data/blog.ts:1314` already says "above $30 billion").
- No other file repeats 24.09, 838, the 4–5× Epoch figure, the GDPR 22%/42% figures or the old METR title.

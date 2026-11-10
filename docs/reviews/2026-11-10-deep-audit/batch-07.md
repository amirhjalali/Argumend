# Deep citation audit, batch 07 (2026-11-10)

Maps assigned: `tiktok-brain-rot`, `children-smartphone-age`, `longevity-science`.

**Status: two of three maps finished.** The usage check returned `THROTTLE_7D` (7d = 76%, threshold 75%) after the second map, so `longevity-science` was not audited and its file is untouched. Its known suspects (mayo-mouse-senolytic, metformin cohort sizes, the nrd3439 DOI, the c-Myc 70% figure, GLP-1 "independent of weight loss") are all still open.

Both edited files pass the import check (`npx tsx -e "import(...)"`). No tests, build or type-check were run.

## tiktok-brain-rot

13 cards checked against a loaded source. 3 checked out unchanged (`lorenz-spreen-collective-attention`, `attention-context-dependent`, `habit-not-addiction-overestimate`). 8 corrected in place, 2 replaced.

| Card id | What was wrong | What it says now | Verified against |
| --- | --- | --- | --- |
| `xu-fmri-tiktok-users` → `su-fmri-short-video-control` | Id named an author ("Xu") who does not exist; the card is Su et al. Text checked out (regions, self-control link). | Id renamed; reasoning now states the final sample of 27. | bioRxiv API record for 10.1101/2023.10.30.23296738 and https://web.archive.org/web/20260331145324/https://www.medrxiv.org/content/10.1101/2023.10.30.23296738v1.full |
| `goldfish-myth-debunked` | Title said the statistic "Is Fabricated"; the BBC found no study behind it, which is a weaker claim. | Title: "...Has No Study Behind It". | https://www.bbc.com/news/health-38896790 |
| `variable-ratio-reinforcement` | No source at all ("Synthesis / inference"). | Replaced with Lindström et al. 2021: reinforcement-learning models fitted to over one million posts from 4,000+ people; behavior "conforms qualitatively and quantitatively to the principles of reward learning"; online experiment n = 176. States that it measures posting, not viewing, and does not test variable-ratio schedules. | https://www.nature.com/articles/s41467-020-19607-x |
| `tiktok-internal-documents` | "14 states plus DC" (source: thirteen states and DC). "Filter bubbles", "tracked compulsive-use metrics" and "optimized for session duration" are not in the cited NPR piece. Title generalized one company to "platforms". | Thirteen states and DC; the 260-video internal study; the two executive quotes as NPR gives them; TikTok's response. Title names TikTok. | https://www.npr.org/2024/10/11/nx-s1-5150088/the-biggest-findings-from-uncensored-tiktok-lawsuit-documents |
| `striatal-activation-gambling` → `personalized-video-reward-activation` | Id described a striatal, gambling-comparison finding the study does not contain. Text checked out. | Id renamed only. | Europe PMC record PMID 33951514 (abstract) for 10.1016/j.neuroimage.2021.118136 |
| `most-users-self-regulate` | "Validated estimates" overstated a questionnaire figure; "industry trackers put it near an hour per day" had no source. The 5.9% itself is correct. | About 5.9% "may have significant problematic use", from the self-report questionnaire part of a study of young adults. Unsourced clause removed. | Same Europe PMC record |
| `pisa-reading-decline` | Said the OECD "attributes the drop primarily to COVID-19", which contradicts the OECD's own "only partly attributable". | Reading fell 10 points, twice the previous record; decline only partly attributable to the pandemic because reading and science had been falling for a decade. | https://web.archive.org/web/20260102205059/https://www.oecd.org/en/publications/pisa-2022-results-volume-i_53f23881-en.html |
| `hancock-meta-analysis` → `marker-meta-analysis` | Id named a paper that does not exist. Text checked out (59 samples, N = 29,337, r = -.07 [-.12, -.02], -.10 multitasking, +.08 academic use). | Id renamed only. | https://web.archive.org/web/20240213165309/https://link.springer.com/article/10.1007/s10648-017-9430-6 |
| `china-douyin-restrictions` | Title claimed the limit was "Based on Internal Dose-Response Data"; no such data is in the source. Text said regulators framed it around attention and study habits; CNN does not. The measure was ByteDance's, for real-name users under 14. | ByteDance's "teenage mode": 40 minutes a day, blocked 10 p.m. to 6 a.m., after the June 2021 Minor Protection Law revision; Citi called it a "proactive measure"; no published evidence behind the cap. | https://www.cnn.com/2021/09/20/tech/china-tiktok-douyin-usage-limit-intl-hnk |
| `covid-confound` | "1-2 years of learning loss" is in no cited source. "Countries with longer school closures showed proportionally larger declines" is contradicted by the cited OECD release ("no clear difference in performance trends" by closure length). Title said COVID "Explains Most"; the release is titled "only partly attributable". | Replaced with Betthäuser et al. 2023: 42 studies, 15 countries, d = -0.14 (95% CI -0.17 to -0.10), about 35% of a school year, "arose early in the pandemic and persists over time". Carries the OECD caveat. | https://www.nature.com/articles/s41562-022-01506-4 and https://web.archive.org/web/20250102195729/https://www.oecd.org/en/about/news/press-releases/2023/12/decline-in-educational-performance-only-partly-attributable-to-the-covid-19-pandemic.html |

Also corrected in the same file, to match the cards:

- **Opening (keystone)**: "COVID school closures account for a large share of the drop" → the OECD says the pandemic explains only part of it, since reading had been falling for a decade. "About twice any earlier change" → "twice the previous record drop".
- **Pillar 3 summary and skeptic premise**: "reading and math" trending down since 2012 → "reading and science" (the OECD says maths was stable from 2003 to 2018).
- **Pillar 3 rebuttal**: "China restricted..." → ByteDance limited real-name users under 14, under regulatory pressure.
- **Pillar 3 common ground**: COVID "explains a large share" → "explains part of it".
- **Pillar 2 rebuttal and skeptic flip**: wording about the TikTok documents brought in line with the NPR piece.
- **Pillar 2 common ground**: "show" → "may have" for the 5.9%.
- **References**: Marker et al. title corrected to the published title.

Unresolved or left for the lead:

- **Weights on the two replaced cards were not changed.** `variable-ratio-reinforcement` keeps 5/6/5/5 (low for a Nature Communications paper) and `covid-confound` keeps 9/9/9/7 (high for a card that no longer claims COVID explains most of the decline).
- **Baert et al. (Kyklos), "696 first-year students"** in the pillar 3 rebuttal: the Crossref abstract confirms the instrumental-variable design, two Belgian universities and "about one point (out of 20)", but not the 696. Wiley returns 403. Left unchanged.
- **Pillar 1 rebuttal, "a growing set of laboratory studies using the SART"**: no source is cited and none was loaded. It is prose, not a card. Left unchanged.
- **Su et al. 2021** was verified from the PubMed abstract only (Elsevier blocks the publisher page), so the reasoning's "the sample is small" is unconfirmed.
- Renamed ids appear only in older review notes (`docs/reviews/batch-3-citation-scan.md`, `docs/plans/2026-11-03-round15.md`), which were not edited. No code references them.

## children-smartphone-age

7 cards checked against a loaded source. 1 checked out unchanged (`australia-ban-three-month-evaluation`: every figure and both quotes match the eSafety release). 6 corrected in place. 1 card added.

| Card id | What was wrong | What it says now | Verified against |
| --- | --- | --- | --- |
| `cdc-youth-mental-health-data` (and the opening's source) | URL was the generic YRBS index, which now redirects. "Smartphone adoption among adolescents crossed 50% around 2012-2013" is not supported: Pew found 37% of teens had a smartphone in 2012. "Roughly 10%" attempted suicide is exactly 10%. The 36%→57%, 19%→30%, 10%→13% and 21%→29% figures are correct. | Points at the 2011-2021 Data Summary & Trends Report. Adoption sentence now gives Pew's 37% (2012) and nearly three-quarters with access (2014-15). | https://web.archive.org/web/20240101175749/https://www.cdc.gov/healthyyouth/data/yrbs/pdf/YRBS_Data-Summary-Trends_Report2023_508.pdf ; https://www.pewresearch.org/internet/2013/03/13/teens-and-technology-2013/ ; https://www.pewresearch.org/internet/2015/04/09/teens-social-media-technology-2015/ |
| `przybylski-small-effects` | Title called a specification-curve analysis a "Meta-Analysis". Reasoning said "pre-registered analyses"; the paper is not preregistered. Source was two journal names with no paper. | Title and text state the design, n = 355,358, "at most 0.4%", the potato and glasses comparisons as the paper gives them, and the authors' "too small to warrant policy change". Source names the paper. | https://www.nature.com/articles/s41562-018-0506-1 (abstract) and the Oxford repository full text, https://ora.ox.ac.uk/objects/uuid:5d844350-a359-47d3-b10c-4bfb93ce613b/files/m1139efb332d78a15e737adf5b68292a6 |
| `cross-national-consistency` | Attributed to "Jean Twenge and Jonathan Haidt"; the post is by Zach Rausch and Jon Haidt. Claimed coverage of "Scandinavia, and other developed nations"; this post covers the five Anglosphere countries. Source title did not match the page. | Authors, scope and title corrected; one concrete figure from the post (Australian females 16-24, 14.2% in 2013 to 35.1% in 2020); the Nordic follow-up is named as a second post. | https://www.afterbabel.com/p/international-mental-illness-part-one |
| `france-school-phone-ban-results` → `norway-school-phone-ban-results` | The only loaded source is a Norwegian study that found benefits from school phone bans, yet the card sat on the "against" side. The France sentence had no source. "Modest benefits" understated the abstract. | Rewritten to the study's findings (girls' psychological health-care take-up down, bullying down, girls' GPA up). **Side changed to "for".** France sentence removed. | https://econpapers.repec.org/paper/hhsnhheco/2024_5f001.htm |
| `australia-social-media-ban` | Platform list left YouTube out; eSafety lists it. "Fines up to ~A$50M" is out of date: eSafety now gives 300,000 penalty units, A$109.2 million. "Removing or restricting around 4.7 million in the first days" loosened eSafety's wording. "The strongest" intervention was an unsupported superlative. | eSafety's ten platforms, its current penalty figure, "removed access to 4.7 million under-16 accounts by mid-December 2025", "among the strongest". | https://web.archive.org/web/20261031200841/https://www.esafety.gov.au/about-us/industry-regulation/social-media-age-restrictions |
| `wait-until-8th-adoption-limits` | "Endorsements from prominent pediatricians", "a small fraction of families in participating schools" and the New York Times attribution are not on the cited page. | The campaign's own count (more than 155,000 parents), the 10-families-per-grade activation rule, and that no per-school participation rate is published. | https://www.waituntil8th.org/ |

Card added, so the cross-national crux keeps an "against" card after the Norway card changed side:

| Card id | What it says | Verified against |
| --- | --- | --- |
| `global-internet-adoption-wellbeing` (against) | Vuorre & Przybylski: 2,434,203 people in 168 countries (2005 to 2022), plus anxiety, depression and self-harm rates in 202 countries (2000 to 2019); "only small and inconsistent changes in global well-being and mental health"; no sign that young people or young women were most at risk. States that it measures national internet adoption for ages 15 and over, not children's phone ownership. | https://ora.ox.ac.uk/objects/uuid:f89a1517-7585-4404-9da3-43f96ff846b6/files/r76537263k (publisher DOI 10.1177/21677026231207791 confirmed through Crossref; Sage returns 403) |

Unresolved or left for the lead:

- **The Norway card's change of side** and the **weights on the added card** (8/6/7/6) are my calls and need a second look.
- **Australia's Act text** did not load (legislation.gov.au timed out; the archive snapshot shows only title, Act No. 127 of 2024 and 10 December 2024). The card now cites the regulator's page through an archive snapshot, because esafety.gov.au itself timed out for both curl and WebFetch. Swap in the live URL if it loads for you.
- **The A$109.2 million penalty** is eSafety's current figure. I did not verify the original maximum at enactment.
- **Wait Until 8th reasoning** says the count sits "in a country with tens of millions of schoolchildren". That context is not from a loaded source.
- **The HHS Surgeon General reference** now redirects to `/surgeongeneral/reports-and-publications/youth-mental-health/social-media/index.html`. Left unchanged; hhs.gov returns 403 to curl.
- No code references the renamed id.

## longevity-science

Not audited. 0 cards checked, file unchanged.

## The same figures elsewhere (not edited)

- `data/blog.ts:2770`: "around 2012 — the year smartphone ownership among American teens crossed 50%". Pew found 37% of teens had a smartphone in 2012 and nearly three-quarters had access by 2014-15.
- `data/blog.ts:4551`: "In 2021, the Chinese government imposed strict limits on Douyin". CNN reports ByteDance introduced the 40-minute "teenage mode" itself, for real-name users under 14, under regulatory pressure.
- `data/blog.ts:4507`: "A 2022 study published in *NeuroImage* by researchers at Beijing Normal University" comparing heavy and light TikTok users. This does not match Su et al., NeuroImage 2021, which compared personalized with non-personalized clips and made no heavy-versus-light comparison. It looks like the citation the map dropped earlier.
- `data/topics/social-media-mental-health.ts` (`orben-przybylski-small-effects`) cites the same paper and already has it right.

# Deep citation audit, batch 05 (2026-11-10)

Maps: `electoral-college-reform`, `social-media-elections`, `media-bias-democracy`.
Every card's `sourceUrl` was loaded in this session (directly, through the publisher's
abstract record, or through a web.archive.org snapshot of the same free page) and the
card text compared with it. Only changed cards are tabled.

## electoral-college-reform

9 cards checked, 4 fixed, 0 replaced. 5 checked out unchanged (`pew-2024-survey`,
`chiafalo-states-far-reaching-authority`, `crs-compact-consent-test`,
`crs-npv-compact-unresolved`, `morley-npv-constitutional-infirmities`; every quotation
in the four legal cards is verbatim).

| Card | What was wrong | What it says now | Verified against |
|---|---|---|---|
| `popular-vote-losses` | Source was a Wikipedia list. "No other established democracy regularly installs leaders who received fewer votes" had no source. | Margins kept (543,895 and 2,868,686, both confirmed) with the candidate totals, cited to the FEC's official results. Unsourced sentence replaced by Ballotpedia's count of four such elections from 1876 to 2024. | https://www.fec.gov/documents/1889/federalelections2016.pdf ; https://www.fec.gov/documents/1556/federalelections00.pdf ; https://ballotpedia.org/National_Popular_Vote_Interstate_Compact |
| `federalism-protection` | Source named "About the Electors"; the cited page is "What is the Electoral College?" and does not state a 3-vote minimum. | Source renamed. Text and reasoning now give the page's formula (one elector per House member plus two senators) and derive the floor of 3 from it, with a verbatim quote. | https://www.archives.gov/electoral-college/about |
| `npvic-progress` | "Every state that has enacted it joined under a Democratic governor" is false: Hawaii joined in 2008 by overriding Republican Gov. Linda Lingle's veto. Not in the NPR story either. | 16 of 18 member states had a Democratic trifecta; the two with divided government were New York (2014) and Hawaii (2008, veto override). | https://ballotpedia.org/National_Popular_Vote_Interstate_Compact ; NPR story re-read at the cited VPM URL |
| `partisan-adoption-concern` | Same false governor claim; "15 enacting states had a Democratic trifecta" (Ballotpedia says 16 of 18); the Republican-chamber parenthetical was not in Ballotpedia and described New York as a one-chamber passage. | Title and text restate Ballotpedia's table: 16 trifecta, 2 divided, no Republican trifecta, no Republican governor's signature, Maine law without signature; 23 of the 32 non-members have a Republican trifecta. Republican-controlled chambers (Arizona House 40-16 in 2016, Oklahoma Senate, New York Senate) now cited to National Popular Vote Inc. | https://ballotpedia.org/National_Popular_Vote_Interstate_Compact ; https://www.nationalpopularvote.com/state/az |

Outside the cards, same file:

- Opening (`keystone_fact`): "Twice in the last six elections (2000, 2016)" is now "seven" (2000 through 2024 is seven elections).
- "Wyoming voter carries about 3.6 times the electoral weight" is now 3.8 in the opening, the simple case, the pillar summary and the proponent rebuttal. 3.6 was the 2010-census ratio. The 2020 apportionment populations are California 39,576,757 (54 electoral votes) and Wyoming 577,719 (3), a ratio of 3.81. Verified against https://www2.census.gov/programs-surveys/decennial/2020/data/apportionment/apportionment-2020-table01.pdf. Keystone `source` string updated to match.
- Pillar 2 skeptic premise: "every enacting state did so under a Democratic governor" corrected as above.

Unresolved: none. Note: `npvic-progress` still links the NPR story through a member-station copy (vpm.org). The npr.org original could not be found by search; the copy loads and carries the NPR byline.

## social-media-elections

11 cards checked, 7 fixed, 1 replaced. 3 checked out unchanged (`haugen-facebook-files`,
`youtube-counterfactual-bots`, `kalla-broockman-meta-analysis`).

| Card | What was wrong | What it says now | Verified against |
|---|---|---|---|
| `mit-vosoughi-study` | Loose paraphrase of the bot finding; "largest empirical analysis" superlative; bare source. | Bot finding quoted from the abstract; "true stories took about six times as long to reach 1,500 people"; full citation plus MIT News for the 70% and six-times figures. | PubMed record 29590045 (abstract of https://www.science.org/doi/10.1126/science.aap9559) ; https://news.mit.edu/2018/study-twitter-false-news-travels-faster-true-stories-0308 |
| `meta-2020-rct-no-effect` | Companion study attributed to "Nyhan et al., Science" (it is Guess et al.; Nyhan et al. is a Nature paper). "Largest social media experiment ever". "Roughly 23,000 Facebook users" not in any source loaded. "No effect on ... vote choice" not in the abstract. Reasoning said "reducing misinformation exposure by 33%", which contradicts the card. Missing: reshares study found lower news knowledge; a 2024 Science letter says Meta changed the control feed during the experiment. | Abstract's own outcome list quoted; sample size dropped; dates added (24 Sep to 23 Dec 2020); untrustworthy content 40.9% lower under the algorithm (about 69% higher in the chronological feed); reshares study's knowledge decrease; Bagchi et al. caveat on 63 "break-glass" changes; reasoning corrected. | PubMed records 37498999 and 37499012 ; https://par.nsf.gov/biblio/10587827 (Bagchi et al.) ; https://pmc.ncbi.nlm.nih.gov/articles/PMC10396953/ (funding statement for the same project) |
| `youtube-radicalization-pipeline` | Title claimed a "radicalization pipeline". Attributed findings to NYU and to a "YouTube internal report, leaked in 2022" quoting "borderline content"; neither could be found. | Retitled to the Mozilla finding. Text gives the study's size (3,362 reports, 1,662 volunteers, 91 countries, July 2020 to May 2021), the 71% and 40% sentence verbatim, misinformation as top category, 60% higher regret rate in non-English countries, and keeps the Ledwich and Zaitsev counter-finding (quote verified). NYU and leaked-report claims removed. | https://foundation.mozilla.org/en/youtube/findings/ (via web.archive.org snapshot; live page refuses automated requests) ; https://arxiv.org/abs/1912.11211 |
| `mueller-ira-indictments` | Quote cut mid-phrase; "$1.25 million per month on the operation" was the budget of the wider Project Lakhta; "suppress African American voter turnout" and "swing states" were paraphrases; "based on intelligence intercepts, digital forensics, and cooperating witnesses" is not in the indictment; reasoning called an indictment "the highest evidentiary standard". | Full quote ("information warfare against the United States of America"), budget stated as the project's (over 73 million rubles), verbatim "purple states" and "encourage U.S. minority groups not to vote" passages, unsupported sentence removed, reasoning says an indictment is an allegation. | https://www.justice.gov/d9/fieldable-panel-panes/basic-panes/attachments/2018/02/16/internet_research_agency_indictment.pdf |
| `stanford-nyu-no-impact` | No Stanford author: the six authors are at Copenhagen, Trinity College Dublin, TU Munich and NYU. "Over 1,500 individuals" (n = 1,496). "Most comprehensive / most rigorous" superlatives. | Title "NYU-Led Study ..."; 1,496 respondents; 1%/70% phrase quoted; adds that exposure was concentrated among strong Republicans and eclipsed by domestic media; full citation. Id left unchanged (see notes). | https://www.nature.com/articles/s41467-022-35576-9 |
| `us-intel-2024-assessment` (replaced) | URL was the ODNI newsroom index. The quote "more sophisticated" and the claims about China and Taiwan-related down-ballot races and Iranian hack-and-leak could not be tied to any document loaded. | Rebuilt on one ODNI document: Russia and Iran used generative AI; Russia produced the most AI content, consistent with efforts to boost the former President; China not targeting election outcomes with AI; AI "has not ... revolutionize[d]" such operations. All quotes verbatim. Same side, same crux. | https://archive.dni.gov/files/FMIC/documents/ODNI-Election-Security-Update-20240923.pdf |
| `cambridge-analytica-scandal` | "87 million" stated as fact (Facebook said "up to 87 million ... may have been improperly shared"); the FTC page does not give the figure; Brexit-referendum use and "boasting about ... disinformation" had no source. | Facebook's sentence quoted; FTC penalty quoted, with the separate FTC actions against Cambridge Analytica, Nix and Kogan; Channel 4's undercover filming described as reported, with the company's denial. Brexit claim removed. | https://www.ftc.gov/news-events/news/press-releases/2019/07/ftc-imposes-5-billion-penalty-sweeping-new-privacy-restrictions-facebook ; https://about.fb.com/news/2018/04/restricting-data-access/ ; https://www.channel4.com/news/cambridge-analytica-revealed-trumps-election-consultants-filmed-saying-they-use-bribes-and-sex-workers-to-entrap-politicians-investigation |
| `trump-2020-ad-volume` | Source headline was the URL slug, not the article's headline. Numbers all confirmed (5.9 million, about 66,000, $44 million, $28 million, June to November 2016). | Source gives the real headline and author. | https://thenextweb.com/news/facebook-confirms-trumps-ads-bested-clintons-during-presidential-bid |

Outside the cards, same file:

- Pillar 1 skeptic premise: "researchers at Meta", "no measurable effect on political knowledge" (the reshares study found a decrease) corrected. Proponent rebuttal: the "divisiveness" slide was reported by the WSJ in 2020, not leaked by Haugen; "Mozilla ... pipeline ... in as few as 3-5 clicks" (no source) replaced by the 71% finding; "weeks" is now "three months". Crux methodology, skeptic flip and common ground brought into line ("roughly 23,000 users" removed).
- Pillar 2 skeptic premise: "$81 million by the Clinton campaign and $94 million by the Trump campaign" contradicted the map's own card; now $28 million and $44 million (The Next Web). "126 million impressions ... 0.0004% share" was off by a factor of ten and confused people with impressions; now Facebook's own statement (126 million people, over 33 trillion stories, about 0.004%, 1 in 23,000) and the $100,000 figure with its real period (June 2015 to August 2017). Verified against https://www.judiciary.senate.gov/imo/media/doc/10-31-17%20Stretch%20Testimony.pdf. "Stanford and NYU researchers" corrected. Common ground brought into line.
- Pillar 3 proponent rebuttal: "In 2020, the Trump campaign ran 5.9 million different Facebook ads" was the 2016 figure; corrected, and "87 million" softened to Facebook's wording.
- `references`: the NATO StratCom entry was titled "Like, Comment, Destroy: Weaponising Social Media"; the URL is the centre's "Robotrolling 2019/3". Title corrected to match the page. The Mueller report and MIT Technology Review links load and match.

Unresolved:

- `haugen-facebook-files`: the WSJ landing page is paywalled. The series description, the 2018 ranking-change finding, Haugen's Senate testimony and both AFP quotes were confirmed from the WSJ series page snapshot, the Senate Commerce Committee's copy of her written testimony and a copy of the AFP story, so the card is counted as checked; the 2020 WSJ article itself was not read.
- Guess et al. full text (science.org) could not be read; the card now relies only on the abstract and on Bagchi et al.'s restatement of the paper's 40.9% figure.
- Not verified, left as is: "The Mueller investigation resulted in 34 indictments" and "20 million on Instagram" (pillar 2 rebuttal); "peer-reviewed analysis concluded its psychographic targeting was no more effective" (pillar 3 skeptic premise and the Cambridge Analytica reasoning); "interests as specific as 'Holocaust denial'" (pillar 3 rebuttal).
- Ids `stanford-nyu-no-impact` and `trump-2020-ad-volume` now mislabel their cards (no Stanford author; a 2016 figure). Left unchanged because ids were out of scope unless a card was replaced; the only other references are in `docs/reviews/batch-0-citation-scan.md`.

## media-bias-democracy

11 cards checked, 5 fixed, 0 replaced. 6 checked out unchanged (`groseclose-milyo-study`,
`budak-goel-rao-fair-balanced`, `pew-polarization-media`, `internet-viewpoint-diversity`,
`nyhan-like-minded-not-polarizing`, `guess-chronological-feed-null`).

| Card | What was wrong | What it says now | Verified against |
|---|---|---|---|
| `allsides-bias-ratings` | "Fox News rates Lean Right" (AllSides rates Fox News Digital Right); "AP and Reuters near Center" (AP's US political news is Lean Left, moved from Left in May 2026); the cited methods page gives no outlet ratings; MSNBC's rating could not be loaded. | CNN Digital Lean Left, Fox News Digital Right, AP Lean Left, Reuters Center, as of late 2026; notes that AllSides rates online written news only. MSNBC dropped from the card. | https://www.allsides.com/media-bias/media-bias-rating-methods and the AllSides source pages for Fox News, Associated Press, CNN and Reuters (all via web.archive.org snapshots from October and November 2026; the live site refuses automated requests) |
| `reuters-trust-survey` | "TikTok at 23% for news among all ages, higher for under-25s": the report says 13% across all markets and 23% for 18–24s. | Corrected to 13% overall, 23% of 18–24s. 40%, 32% and "four points" confirmed. | https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/dnr-executive-summary |
| `cjr-standards-analysis` | Said CJR "documents that institutional journalism maintains professional norms"; the article is about the fact-checking industry and makes no such finding. No author. | Describes the article as it is (Emily Bell on the growth of fact-checking), with the 44-to-195 sentence and one more passage quoted verbatim. | https://www.cjr.org/special_report/fact-check-industry-twitter.php |
| `gallup-media-trust` | Quoted phrase had an extra comma ("fully, accurately, and fairly"); "in 1972, when trust was 68-72%" (Gallup: three readings in the 1970s ranged from 68% to 72%). | Quote verbatim; 1970s wording corrected. 31%, 54/27/12, 36% and "third consecutive year" confirmed. | https://news.gallup.com/poll/651977/americans-trust-media-remains-trend-low.aspx |
| `algorithmic-amplification` | Huszár et al. summarized as amplifying "right-leaning political content"; omitted the paper's finding against extremes being favored. | "Mainstream political right more than the mainstream left" in six of seven countries, and no evidence that far-left or far-right groups were amplified more than moderate ones. | PubMed record 34934011 (abstract of https://www.pnas.org/doi/10.1073/pnas.2025334119) ; Mozilla findings page as above |

Outside the cards, same file: "left of the median member of Congress" is now "average" in the pillar 1 proponent rebuttal and skeptic flip, matching Groseclose and Milyo's abstract.

Unresolved:

- `algorithmic-amplification`: the Facebook Papers sentence (from 2017 "angry" reactions weighted five times a "like") rests on the Washington Post, which is paywalled and was not read. Left as is. The same figure appears in the crux's skeptic flip.
- `internet-viewpoint-diversity`: the Gentzkow and Shapiro half was checked against the cited PDF; the Flaxman, Goel and Rao half was checked only against the journal's abstract page (https://academic.oup.com/poq/article/80/S1/298/2223402) and matches.
- AllSides is called "an advocacy organization" in the card's reasoning and in the pillar's skeptic premise. Nothing loaded supports or contradicts that label; left as is.

## Repeated elsewhere (not edited)

- `data/mockDebates.json` line 1681: "A Wyoming voter has 3.6 times the Electoral College weight of a California voter" (now 3.8 on the map).
- `data/mockDebates.json` line 1695: "two of the last six elections ... a 33% failure rate" (now two of the last seven).
- `data/mockDebates.json` line 1153: "87 million Facebook users had their data harvested without consent" (Facebook's wording is "up to 87 million ... may have been improperly shared").

No repeats of the corrected figures were found in `data/blog.ts`, `data/guides.ts` or other files in `data/topics`.

# AllSides and Ground News: Competitive Intel for Argumend

Both AllSides and Ground News are the closest mass-market analogs to Argumend. They sit in the "epistemics for everyone" lane with products, scale, and critiques that every Argumend strategic decision should reckon with. This memo digs into how each was built, how each reaches people, where each is plateauing, and what Argumend should actually steal.

## 1. Snapshot

| | AllSides | Ground News |
|---|---|---|
| Founded | 2012 | 2018 (incorporated Jan 2020) |
| Founders | John Gable (ex-Netscape/AOL/Microsoft, former GOP aide), Scott McDonald, Joan Blades (added 2016) | Harleen Kaur (ex-NASA aerospace engineer, ex-Rolls-Royce VP) and her brother Sukh Singh (app developer) |
| HQ | USA | Kitchener, Canada |
| Structure | Public Benefit Corporation (for-profit) + "AllSides Education Fund" nonprofit | Private C-corp, seed-funded |
| Funding | WeFunder equity crowdfunding, ~28+ owners, no VC | ~$1.01M seed; investors include 37 Angels, Blue Lagoon Capital, Right Side Capital ([Crunchbase](https://www.crunchbase.com/organization/ground-news)) |
| Traffic | ~1.6-3.7M monthly visits Nov 2024-Jan 2025 ([Semrush](https://www.semrush.com/website/allsides.com/overview/)) | 4.66M visits Nov 2025; 8M visits July 2025; visits up 63% YoY, MAUs +50% on Similarweb Digital 100 ([CJR](https://www.cjr.org/analysis/the-business-of-balance-ground-news.php), [Similarweb](https://ir.similarweb.com/news-events/press-releases/detail/114/similarwebs-2025-digital-100-ranking-celebrates-big-winners-and-fast-growth)) |
| Employees | Small team, unclear exact size | ~18 per their own claim; external estimates ~40+ with 52% YoY headcount growth ([Growjo](https://growjo.com/company/Ground_News)) |
| Revenue est. | ~72% client services, 23% subscriptions/donations, <10% ads ([AllSides](https://www.allsides.com/blog/is-allsides-biased-about-biases-partners-owner-funding)) | Estimated ~$5.7M ARR (third-party estimate, unverified) |
| Business model | Bias audits for newsrooms, school/library contracts, $2.50/mo ed-subscription, sustaining memberships | Freemium: Pro $9.99/yr, Premium $29.99/yr, Vantage $99.99/yr ([Ground News](https://ground.news/subscribe)) |

Gable's origin story is the 1997 "warning speech" in Portland about filter bubbles, crystallized during Obama vs. Romney in 2012 ([Online Journalism Blog](https://onlinejournalismblog.com/2017/02/20/fake-news-allsides-filter-bubbles-john-gable/)). Kaur's origin story is watching her father flip between CNN, BBC, and Al Jazeera during the Gulf War and realizing there was no single product that stitched the sources together ([Press Club Institute](https://www.pressclubinstitute.org/2021/02/23/how-an-ex-nasa-engineer-is-fighting-bias-in-media-with-ground-news/)).

## 2. Product vs. Argumend

They do "news bias aggregation." Argumend does "argument and evidence mapping." The framing overlaps heavily because both sell the same end-user promise: *see the full picture instead of your bubble*.

| Capability | AllSides | Ground News | Argumend |
|---|---|---|---|
| Headline: compare coverage across left/center/right | Yes (three-column view) | Yes (bias bar on every story) | No — topic-level not story-level |
| Bias ratings for 1,400+ sources | Yes (blind surveys + editorial panels) | No (aggregates AllSides, MBFC, Ad Fontes) | N/A |
| Source/outlet-level ratings | Yes | Yes | No |
| Story-level aggregation | Yes | Yes (primary product) | No |
| Claims/positions decomposition | No | No | **Yes (differentiator)** |
| Evidence with confidence scores | No | No | **Yes** |
| Cruxes (load-bearing disagreements) | No | No | **Yes** |
| Logical-fallacy surfacing | No | No | **Yes** |
| Interactive graph UI | No | No | **Yes** (React Flow) |
| Mobile app | Yes (iOS) | Yes (iOS/Android, #1 free news app July 2025) | No |
| School curriculum | Yes (flagship) | Group subscriptions only | No |
| Bias chart as marketing artifact | **Yes (the viral hit)** | Yes (derivative) | No |

The critical observation: neither AllSides nor Ground News does argument mapping. They stop at "here's the same story from three angles." Argumend goes a level deeper — "here's the actual disagreement and what evidence would move it." Whether that extra depth is a product wedge or a product dead-weight is the open question the founder's freeze is trying to answer.

## 3. Acquisition story

**AllSides' playbook: institutional SEO + the bias chart as a meme.**
- The AllSides Media Bias Chart is the single most linked-to artifact in the media-literacy world. University library guides embed it constantly ([Nova Southeastern](https://libguides.nova.edu/c.php?g=1236356&p=9814669), [CSN](https://libguides.csn.edu/c.php?g=1114766&p=8127997), [U-Michigan](https://guides.lib.umich.edu/c.php?g=637508&p=4462444), [DePauw](https://libguides.depauw.edu/c.php?g=833199&p=10807789)).
- AllSides for Schools (launched 2016 with Joan Blades of MoveOn/Living Room Conversations) sells at $2.50/user/mo with bulk school/district plans ([AllSides for Schools](https://allsidesforschools.org/)).
- The Colorado Dept. of Education lists AllSides in its media literacy resource bank ([CDE](https://www.cde.state.co.us/medialiteracy/ml-rb-allsides)). Princeton's Bridging Divides Initiative cross-promotes it ([BDI](https://bridgingdivides.princeton.edu/bridging-org/reso-a5d25282c2)). Common Sense Education reviews it ([Common Sense](https://www.commonsense.org/education/reviews/allsides-for-schools)). These placements are free forever and feed decades of backlink authority.
- Funding: WeFunder equity crowdfunding rather than VC — this is the tell that growth is slow and the strategy is endurance, not blitzscale ([AllSides Blog](https://www.allsides.com/blog/allsides-equity-crowdfunding-campaign-invest-balanced-news-all)).

**Ground News' playbook: pay every creator on YouTube.**
- In 2025 Axios reported Ground News was **the #1 brand sponsor on YouTube**: 1,863 sponsored integrations in a 65,759-video sample, accumulating 664 million views ([Axios](https://www.axios.com/2025/10/22/youtube-sponsorship-creator-videos)).
- SponsorRadar tracks 393+ YouTube creators sponsored ([SponsorRadar](https://sponsorradar.com/brands/ground-news)). Spread is explicitly nonpartisan — Adam Conover on the left, libertarian and far-right creators on the right, plus tech/education/gaming channels far outside politics.
- Podcast ads: show-description searches and ad-read databases confirm Ground News runs on mid-tier politics, history, and news podcasts. At typical host-read rates of $25–$40 CPM ([DX Media Direct](https://www.dxmediadirect.com/podcast-sponsorship-rates-guide/)), a 50k-download episode is $1,250–$2,000. Ground News appears to pay for hundreds of such slots per quarter; likely $2–5M/yr in podcast+YouTube media spend, though unverified.
- Substack ads: Ground News sponsorships surface on politics and media Substacks (sponsorship marketplace CPMs on Substack cluster around $1-per-subscriber benchmarks per [Sparkleon](https://sparkleon.substack.com/p/sponsorships-ads-at-substack-and)).
- Affiliate program: 10-20% commission drives long-tail self-serve creator pickup ([Ground News Affiliates](https://ground.news/affiliates)).

Ground News blitzed a distribution channel (creator sponsorships) before it was saturated. AllSides did institutional/educational SEO and stuck with it. Both work. Ground News scales faster.

## 4. Plateau or death cause

**AllSides is static-ish.** Traffic has bounced between 1.6M and 3.7M monthly visits over the past year ([Semrush](https://www.semrush.com/website/allsides.com/overview/)). The product hasn't changed much in a decade. Critiques ([Poynter](https://www.poynter.org/fact-checking/media-literacy/2021/should-you-trust-media-bias-charts/)):
- Bias charts conflate bias with reliability — they score "slant" but don't score "truth."
- Only online written content is rated; broadcast/radio uncovered.
- The Blind Bias Survey methodology relies on volunteer panel judgment that critics call circular.
- Equity crowdfunding signals no institutional investor appetite for the growth curve.

**Ground News looks healthier but has real risks.** Traffic growth is strong (+63% YoY), but dependencies are worrying:
- CJR's deep dive noted Ground News uses AllSides/MBFC/Ad Fontes bias ratings **without formal permission or compensation** from at least two of them ([CJR](https://www.cjr.org/analysis/the-business-of-balance-ground-news.php)). That is litigation/shutdown risk.
- The [Hacker News-top blog critique](https://sjodle.com/posts/2024/01/ground/) (500-story audit) found left-leaning stories averaged 10.9 high-factuality sources vs 2.7 for right-leaning stories; right-leaning Blindspots drew 76.5% from right-leaning sources. The "balance" label is doing work the data doesn't support.
- Includes stories from Alex Jones' Newswars, Sputnik, PJ Media without factuality gating on the free tier.
- Core product is basically an aggregator with a colored bias bar — easy to replicate, hard to moat.
- Customer acquisition is paid media dependent. When the YouTube-ads-for-news-apps market saturates, CAC goes up.

## 5. Where users live now

- **YouTube political/commentary audiences**: Ground News has trained this entire audience to associate "the balanced news app" with its brand. Adam Conover, Leeja Miller, American English With Brent, and hundreds more mid-tier political/educational creators ([SponsorRadar](https://sponsorradar.com/brands/ground-news)).
- **News-literacy educators**: K-12 and university librarians actively distribute AllSides. School district media specialists curate AllSides' chart into curricula.
- **Public/academic library systems**: AllSides is embedded in LibGuides at Nova Southeastern, CSN, U-Michigan, DePauw, and dozens more. This is a lock-in channel.
- **Podcast listeners, esp. history/news/politics**: Ground News ad reads are ubiquitous on mid-tier history and news podcasts. Likely reach: tens of millions of monthly listens.
- **Substack readers of politics/media creators**: Ground News sponsorships rotate through politics/media Substacks — Substack newsletter readership skews older, higher-income, politically engaged. This is the Argumend target persona.
- **Reddit**: r/centrist, r/moderatepolitics, r/TrueCentrist discuss both products; sentiment is mixed ([Tildes discussion](https://tildes.net/~talk/1rnb/does_anyone_use_ground_news)). Users respect the aggregation, distrust the bias math.
- **App Store users**: Ground News was #1 free news app in July 2025.
- **State DOE media literacy programs**: Colorado's DOE resource bank is a model that 10+ states run ([CDE](https://www.cde.state.co.us/medialiteracy/media-literacy-resource-bank/detail/ml-rb-allsides)).

## 6. Kill-shots for Argumend

**(a) Buy Substack + podcast sponsorships like Ground News did — RANK: HIGH**
Ground News validated that epistemic/news-literacy products convert through creator ad reads. The Substack channel is still cheap and not saturated. A targeted buy:
- 3-5 mid-tier politics/history/media Substacks (Slow Boring, Popular Information, Bulwark, Persuasion, Astral Codex Ten). Newsletter ad benchmark: ~$1/subscriber per insertion ([Sparkleon](https://sparkleon.substack.com/p/sponsorships-ads-at-substack-and)). A 50k-subscriber Substack = ~$50/mention; a 200k Substack = ~$200/mention. Three insertions across five pubs ~$2,500-$5,000/mo.
- 10-20 mid-tier podcast host-read ads at $25–$40 CPM ([DX Media Direct](https://www.dxmediadirect.com/podcast-sponsorship-rates-guide/)). $5-15k/mo gets meaningful reach.
- Total test budget: **~$10-25k/mo** for 3 months to get signal.
The risk: Argumend's onboarding isn't ready for that funnel yet (no users = probably not). But the distribution playbook *demonstrably works*.

**(b) Target school libraries like AllSides — RANK: LOW**
This is a 5-10 year game that requires: content polish, alignment to state media-literacy standards, sales staff, customer success, compliance. Argumend is a solo founder on a 14-day observation freeze. Not the right moment. File for later.

**(c) Make a "bias chart" equivalent — RANK: HIGH**
This is Argumend's most underexploited asset. AllSides' chart is the single most embedded media-literacy artifact on the internet — it's why AllSides still exists despite stagnant traffic. Argumend has the raw material for analogous viral artifacts that *neither* competitor has:
- **The Crux Map** — visualize, for a contested topic, what load-bearing disagreements exist and which side each piece of evidence supports. One image per topic × 109 topics = 109 shareable artifacts.
- **The Fallacy Frequency Chart** — rank common positions by which fallacies they most often use. Rage-click bait in the best way.
- **Position x Evidence matrix** — like a bias chart but for argument structure rather than source slant.
Each of these is a single static artifact that educators, journalists, and Substack writers will embed forever. Production cost: near zero given the 109 topics already analyzed. Distribution cost: near zero if seeded into 5-10 early aligned newsletters.

**Ranked recommendation:** Ship a bias-chart-equivalent viral artifact (c) FIRST; use it as the hook for Substack/podcast ad reads (a). Skip (b) until there is a funnel and a team.

## Sources

- [AllSides Wikipedia](https://en.wikipedia.org/wiki/AllSides)
- [Ground News Wikipedia](https://en.wikipedia.org/wiki/Ground_News)
- [John Gable — Online Journalism Blog profile](https://onlinejournalismblog.com/2017/02/20/fake-news-allsides-filter-bubbles-john-gable/)
- [AllSides Team](https://www.allsides.com/contact/team)
- [AllSides Ownership and funding disclosure](https://www.allsides.com/about/ownership)
- [AllSides "Is AllSides Biased" funding breakdown](https://www.allsides.com/blog/is-allsides-biased-about-biases-partners-owner-funding)
- [AllSides Equity Crowdfunding Campaign (WeFunder)](https://www.allsides.com/blog/allsides-equity-crowdfunding-campaign-invest-balanced-news-all)
- [AllSides PBC + multipartisan board press release](https://www.prnewswire.com/news-releases/allsides-technologies-inc-announces-multipartisan-board-of-directors-and-status-as-public-benefit-corporation-301988074.html)
- [AllSides for Schools homepage](https://allsidesforschools.org/)
- [AllSides for Schools – schools page](https://www.allsides.com/schools)
- [Common Sense Education review of AllSides for Schools](https://www.commonsense.org/education/reviews/allsides-for-schools)
- [Colorado Dept. of Education media literacy listing](https://www.cde.state.co.us/medialiteracy/ml-rb-allsides)
- [Princeton Bridging Divides Initiative listing](https://bridgingdivides.princeton.edu/bridging-org/reso-a5d25282c2)
- [AllSides Media Bias Chart](https://www.allsides.com/media-bias/media-bias-chart)
- [AllSides X Influencer Bias Chart](https://www.allsides.com/media-bias/x-bias-chart)
- [AllSides Bias Rating Methods](https://www.allsides.com/about/media-bias-rating-methods)
- [Poynter — "Should you trust media bias charts?"](https://www.poynter.org/fact-checking/media-literacy/2021/should-you-trust-media-bias-charts/)
- [AllSides Similarweb profile](https://www.similarweb.com/website/allsides.com/)
- [AllSides Semrush traffic data](https://www.semrush.com/website/allsides.com/overview/)
- [Harleen Kaur interview — MediaVillage](https://www.mediavillage.com/article/ground-news-founder-harleen-kaur-on-addressing-media-bias/)
- [Press Club Institute profile of Kaur](https://www.pressclubinstitute.org/2021/02/23/how-an-ex-nasa-engineer-is-fighting-bias-in-media-with-ground-news/)
- [Ground News — About](https://ground.news/about)
- [Ground News subscription tiers](https://ground.news/subscribe)
- [Ground News Vantage features](https://help.ground.news/en/articles/7541441)
- [Ground News group subscriptions](https://ground.news/group-subscriptions)
- [Ground News affiliate program](https://ground.news/affiliates)
- [Ground News Blindspot feature](https://ground.news/blindspot)
- [Ground News Crunchbase profile](https://www.crunchbase.com/organization/ground-news)
- [Ground News PitchBook profile](https://pitchbook.com/profiles/company/340782-22)
- [Ground News — Growjo revenue/headcount estimate](https://growjo.com/company/Ground_News)
- [Ground News Similarweb profile](https://www.similarweb.com/website/ground.news/)
- [Similarweb 2025 Digital 100 press release](https://ir.similarweb.com/news-events/press-releases/detail/114/similarwebs-2025-digital-100-ranking-celebrates-big-winners-and-fast-growth)
- [CJR — "The business of balance: Ground News"](https://www.cjr.org/analysis/the-business-of-balance-ground-news.php)
- [Sjodle blog — "Why I'm skeptical of Ground News"](https://sjodle.com/posts/2024/01/ground/)
- [Hacker News thread on the Sjodle critique](https://news.ycombinator.com/item?id=44507332)
- [Media Bias/Fact Check on Ground News](https://mediabiasfactcheck.com/ground-news/)
- [Ground News Blindspotter methodology](https://ground.news/blindspotter/methodology)
- [Ground News YouTube Sponsorships — SponsorRadar](https://sponsorradar.com/brands/ground-news)
- [Axios — YouTube sponsorships surge; Ground News ranked #1](https://www.axios.com/2025/10/22/youtube-sponsorship-creator-videos)
- [Ground News Wikitubia entry](https://youtube.fandom.com/wiki/Ground_News)
- [Tildes discussion on Ground News](https://tildes.net/~talk/1rnb/does_anyone_use_ground_news)
- [Substack sponsorship pricing — Sparkleon](https://sparkleon.substack.com/p/sponsorships-ads-at-substack-and)
- [DX Media Direct podcast sponsorship rates guide](https://www.dxmediadirect.com/podcast-sponsorship-rates-guide/)
- [Paved — guide to Substack advertising](https://www.paved.com/blog/substack-advertising/)
- [Adweek — Substack begins testing sponsorship ads](https://www.adweek.com/media/substack-ads-sponsorship-newsletters/)
- [Factually comparison of AllSides and Ground News methodologies](https://factually.co/fact-checks/media/allsides-ground-news-media-bias-methods-reliability-b342d2)
- [AllSides vs Ground News comparison](https://thisvsthat.io/allsides-vs-ground-news)
- [Ground News App Store page](https://apps.apple.com/gb/app/ground-news/id1324203419)

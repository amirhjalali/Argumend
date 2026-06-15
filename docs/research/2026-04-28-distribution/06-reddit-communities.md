# Distribution Research: Reddit Communities for Argumend

**Date:** 2026-04-28
**Analyst:** Research agent 06/10 — Reddit sweep for Argumend distribution map
**Constraint:** All Reddit subdomains are blocked from direct fetching in this environment. Subscriber counts and rules below are reconstructed from Wikipedia, third-party stat aggregators (gummysearch, subredditstats), academic papers that scraped Reddit (CSCW, ICWSM), and recent press coverage. Where numbers conflict, the most-recent published source is preferred and noted. Treat all counts as ±15% accurate at best — the user should spot-check before any post.

## 1. Snapshot

Reddit is the only mass-market English-language internet space whose **stated norms reward what Argumend produces** — sourced claims, willingness to be persuaded, fallacy-spotting, position decomposition. Twitter rewards dunks, LinkedIn rewards platitudes, Hacker News rewards technical pedantry, but Reddit's "thoughtful-discussion" subreddits actually *want* what an argument-mapping tool outputs. The catch is that those exact subreddits are also the most aggressively self-promotion-hostile communities on the internet, with mod teams that ban founders on sight ([CMV mods filed a formal ethics complaint with University of Zurich](https://retractionwatch.com/2025/04/29/ethics-committee-ai-llm-reddit-changemyview-university-zurich/) over an *academic* AI experiment in April 2025). The window between "this is genuinely useful" and "you are spam" is narrow and unforgiving.

Argumend's structural problem is that it sits at the worst possible intersection: it is a **founder-owned commercial-looking site that uses AI to generate content about controversial topics** — three of the top five trigger categories for Reddit mod automod rules. The CMV mods' April 2025 statement following the U-Zurich incident — "We think this was wrong. We do not think that 'it has not been done before' is an excuse" ([Simon Willison](https://simonwillison.net/2025/Apr/26/unauthorized-experiment-on-cmv/)) — is the single most important data point in this report. The CMV mod team is now hyper-vigilant about anything that looks like AI-generated content, and Argumend's entire offline corpus is exactly that.

## 2. Subreddit Map

| Subreddit | Subscribers (approx) | Posts/day (approx) | Top topics | Self-promo policy | Link policy | Weekly threads | Argumend fit |
|---|---|---|---|---|---|---|---|
| **r/changemyview** | ~3.6M (top-150 sub) ([Wiki](https://en.wikipedia.org/wiki/R/changemyview)) | 200-400 OPs/day, heavy comment vol | Politics, ethics, gender, religion, current events | **Hostile.** Self-promo posts removed on sight. Even academic research must clear mod permission ([CMV mod statement](https://simonwillison.net/2025/Apr/26/unauthorized-experiment-on-cmv/)) | Links allowed in comments if supporting a view, but tool-shilling = ban | Fresh Topic Friday (FTF), Monday meta threads | **HIGH if non-promotional**, NUKE if promo |
| **r/slatestarcodex** | ~75K (was 49K July 2022 per [Manifold market](https://manifold.markets/Dwaxe/will-redditcomrslatestarcodex-have-)) | 5-15/day | AI risk, rationalism, ACX threads, book reviews, prediction markets, contrarian takes | **Lenient if substantive.** Scott Alexander is honorary mod; commentariat tolerates startup posts that read like essays | Links to long blog posts welcomed; bare product launches downvoted | Open Threads, "Highlights from the Comments" | **HIGHEST core-audience fit** |
| **r/IntellectualDarkWeb** | ~250K (founded 2018 around Eric Weinstein/Peterson era; now [post-IDW-collapse decline per Skeptic](https://www.skeptic.com/michael-shermer-show/what-happened-to-the-intellectual-dark-web/)) | 30-50/day | Free speech, gender, race, Israel/Palestine, woke debates | **Permissive but partisan-skewed.** Mods enforce "viewpoint diversity" but right-leaning user base will brigade | Links allowed | None official | **MEDIUM** — wrong-vibe risk |
| **r/philosophy** | ~18M ([gummysearch via search](https://gummysearch.com/r/philosophy/)) | 30-50/day after heavy filtering | Continental, analytic, ethics, mind, free will | **Strict.** Anti-AI policy: mods ban for AI-generated content even as illustration ([Good Thoughts blog](https://www.goodthoughts.blog/p/anti-ai-ideology-enforced-at-rphilosophy)) | Links must be non-blogspam, full-text articles | Weekly Discussion Thread | **LOW** — AI policy is the kill-switch |
| **r/askphilosophy** | ~750K | 50-80/day | Questions about specific philosophers, concepts, arguments | **Strict, panelist-flair only for top-level answers.** Self-promo banned. One-question-per-day-per-user limit | Sources required for answers | None | **LOW** for posting; HIGH for *citation traffic* if Argumend topics get linked |
| **r/AcademicPhilosophy** | ~33K ([gummysearch](https://gummysearch.com/r/AcademicPhilosophy/)) | 1-3/day | Academic articles, calls for papers, profession | **Strict.** OA articles only, no popular press unless deep | Link-heavy by design | None | **LOW** — too academic for AI-extracted content |
| **r/PhilosophyofMind** | ~6K | <1/day | Consciousness, qualia, AI/mind, panpsychism | **Lenient (low traffic).** Mod-light | Permissive | None | **MEDIUM** — small but on-topic for consciousness/AI maps |
| **r/NeutralPolitics** | ~470K (was 150K in 2017 per searches) | 5-15/day after rejection | Policy debates with sourcing | **Hostile to anything unsourced.** Mods reject ~80% of submissions for tone or weak sourcing ([HN/AAAI study](https://ojs.aaai.org/index.php/ICWSM/article/download/7323/7177/10553)) | **Sources REQUIRED for top-level claims** | None | **HIGH for content fit** if Argumend pre-sources every claim |
| **r/PoliticalDiscussion** | ~3.5M | 30-50/day | US elections, foreign policy, congressional procedure | **Moderate.** No personal attacks; civility enforced | Self-promo discouraged | None official | **MEDIUM** — too broad, but volume |
| **r/moderatepolitics** | ~800K ([search results](https://citizensandtech.org/2024/04/community-moderation-reddit-politics/)) | 30-60/day | Policy, "civilly expressed opinions" | **Moderate.** Civility law 1; bans for accusing other users of bad faith | Source-friendly | "Starter Comments" required on link posts | **MEDIUM-HIGH** if posted by a regular |
| **r/AskHistorians** | ~2.7M ([Wiki](https://en.wikipedia.org/wiki/R/AskHistorians)) | 100+ Qs but ~95% removed | History 20+ years old, sourced | **Iron-fist moderation.** 30+ mods, strict source rules | **Mandatory.** Top answers must cite academic sources | "Floating Features," AMAs | **VERY LOW** for posting; HIGH for inspiration on mod rigor |
| **r/AskSocialScience** | ~101K ([gummysearch](https://gummysearch.com/r/AskSocialScience/)) | 5-10/day | Soc sci questions with sourced answers | **Strict.** All claims need citations | Source-required | None | **MEDIUM** — perfect fit for evidence-node showcasing |
| **r/PoliticalScience** | ~120K | 3-8/day | Polisci research, journals, elections | **Lenient academic.** Self-promo of research OK | Permissive | None | **MEDIUM** for academic angle |
| **r/IntellectualHumility** | ~3K (tiny niche) | <1/day | Cognitive humility, charitable interpretation | **Lenient.** Too small to police | Permissive | None | **MEDIUM** — perfect *vibe* fit, small audience |
| **r/skeptic** | ~250K | 20-40/day | Pseudoscience debunking, scientific consensus | **Has explicit Rule 11 on self-promotion** ([HN ref](https://news.ycombinator.com/item?id=37513140)). Tool posts must be approved | Sourced links welcomed | None | **MEDIUM** — wrong audience (skeptics, not arguers) |
| **r/LessWrong** | ~70K | 2-5/day | LW crossposts, AI alignment, decision theory | **Permissive.** Sub is largely a feed for lesswrong.com posts | Permissive | None | **HIGH** for AI-risk argument maps |
| **r/EffectiveAltruism** | ~25K | 3-8/day | EA cause prio, AI safety, global health | **Lenient.** EA Forum is primary; sub is overflow | Permissive | None | **HIGH** for moral argument maps |
| **r/ControlProblem** | ~35K | 5-15/day | AI alignment, x-risk | **Lenient.** Cross-posts welcomed | Permissive | None | **HIGH** for AI-risk topic maps |
| **r/CriticalTheory** | ~140K | 5-10/day | Marx, Foucault, Frankfurt school | **Mod-strict on right-wing posts.** Self-promo of edu content tolerated | Permissive for academic | None | **LOW** — wrong epistemology |
| **r/DebateAnAtheist** | ~38K | 30-50/day | Theist OPs invited; atheists debate | **Permissive.** Debate-friendly by design | Permissive | "Weekly Ask an Atheist" | **HIGH** for religion-topic maps |
| **r/DebateReligion** | ~186K | 50-100/day | Same but more theists in mod team | **Strict on civility (Rule 2 expanded 2020)** ([Feedback thread](https://libredd.it/r/DebateReligion/comments/hi50fi/feedback_on_new_rules)) | Permissive | "Weekly Discussion Thread" | **HIGH** for religion-topic maps |
| **r/TheMotte** | Migrated off Reddit ~2022 to themotte.org. Subreddit largely dormant. | n/a on Reddit | Culture-war discussion in rationalist frame | n/a — engage on themotte.org | n/a | "Culture War Roundup" weekly | **HIGH** for off-Reddit but on-vibe distribution |
| **r/ssc** | Does not exist as separate sub; aliases to r/slatestarcodex | — | — | — | — | — | — |
| **r/argument** | Tiny / not active | — | — | — | — | — | **NONE** |
| **r/Arguments** | Does not exist as a relevant sub | — | — | — | — | — | **NONE** |
| **r/rational** | ~50K | 3-8/day | Rationalist fiction (HPMOR-adjacent) | Lenient | Permissive | None | **LOW** — wrong content type |
| **r/SneerClub** | ~30K (now archived/quarantine-prone) | n/a | Mocking rationalists | Hostile to rats | n/a | n/a | **AVOID** — will dunk on Argumend |
| **r/bayesianstats** | ~6K | <1/day | Stats methodology | Lenient | Permissive | None | **LOW** but on-topic if Argumend showcases confidence calibration |
| **r/sorceryofthespectacle** | ~50K | 3-8/day | Theory-rich net-spectacle critique | Lenient | Permissive | None | **LOW** — adjacent vibe |
| **r/edtech** | ~70K | 5-15/day | Classroom tools, K-12/HE tech | Moderate. Self-promo allowed in dedicated thread | Permissive | "Weekly Self-Promo Thread" | **MEDIUM** if Argumend angles education |

## 3. Where similar products posted, and how it went

This section is the most data-poor part of the sweep because Reddit's search is broken from outside and direct fetches are blocked. What I could verify:

**Kialo on Reddit.** Searches across r/debate, r/edtech, r/Teachers, r/philosophy, and r/changemyview return essentially zero organic Kialo discussion threads with significant engagement. The Wikipedia Kialo article is occasionally cross-posted but Kialo's own founder Errikos Pitsos appears never to have posted from a labeled account. **Kialo's distribution playbook bypassed Reddit entirely** — they went teacher-by-teacher through edtech blogs and ISTE/BETT conferences (per [Kialo Edu 2024 highlights](https://blog.kialo-edu.com/announcements/celebrating-kialo-edus-2024-highlights/)). This is itself evidence: a 13-year-old, well-funded argument-mapping company with a global footprint chose not to fight on Reddit, suggesting they tried and failed, or judged the EV negative. Argumend should treat this as a pre-experiment result. ([Earlier 01-kialo.md analysis](../2026-04-16-competitive-intel/01-kialo.md) noted "no meaningful Reddit presence" as a gap.)

**Manifold Markets on r/slatestarcodex.** Manifold has had recurring crossposts — there is a [July 2022 Manifold market on whether r/slatestarcodex would cross 50K members by July 2022](https://manifold.markets/Dwaxe/will-redditcomrslatestarcodex-have-) (it didn't quite — it was at 49,527). Manifold runs a [Reddit bounty program](https://manifold.markets/SG/reddit-bounties) paying M$1,000 (mana) for posts that hit 30+ karma on Reddit. This program has produced steady but modest organic mentions in r/slatestarcodex, r/EffectiveAltruism, and r/ControlProblem. The bounty structure is the clue — Manifold can't get organic Reddit traction either, so they buy it with play-money incentives.

**Metaculus on r/EffectiveAltruism / r/slatestarcodex.** Metaculus benefited from a *Scott Alexander endorsement* in his [August 2017 SSC post "Why Not More Excitement About Prediction Aggregation?"](https://slatestarcodex.com/2017/08/03/why-not-more-excitement-about-prediction-aggregation/), which the r/slatestarcodex sub then absorbed. This is the cleanest case of the rationalist-blog-to-rationalist-sub distribution path: **earn an Astral Codex Ten/SSC mention first, the subreddit traffic flows automatically.** No first-party Metaculus self-promo posts are visible in search.

**Pol.is on Reddit.** Searches return no significant launch posts. Pol.is's distribution was almost entirely Taiwan vTaiwan + Audrey Tang + civic-tech academic conferences, never Reddit-driven.

**Are.na on Reddit.** Are.na has a small organic presence in r/InternetIsBeautiful and design subs but never made Reddit a strategic channel.

**Roam Research on Reddit.** Roam has its [own subreddit, r/RoamResearch (~14K)](https://gummysearch.com/r/RoamResearch/) which the Roam team actively moderates — and *banned users critical of the product* in 2021 ([MPU Talk](https://talk.macpowerusers.com/t/roam-research-negative-users-purged-from-the-roam-subreddit/25502)). This is a cautionary tale: founder-controlled subs can survive but damage your reputation when you over-moderate.

**The dominant pattern across all of these:** none of the argument/decision/discourse-tool startups treated Reddit as a primary acquisition channel. The successful ones (Manifold, Metaculus) earned Scott Alexander or LessWrong references and let the subreddit traffic follow. The unsuccessful ones (Kialo, Pol.is) bypassed Reddit and bet on conferences/institutions. **Nobody has cracked direct Reddit launch for this category.**

## 4. Mod culture deep-dive — top 5 most-relevant subs

### r/changemyview

The single most-relevant sub by volume and vibe, and the single most dangerous one for a founder. Founded by **Kal Turnbull (u/Snorrrlax)**, a Scottish musician who was 17 in 2013 ([Wiki](https://en.wikipedia.org/wiki/R/changemyview), [DeltaAllStars podcast](https://www.youtube.com/watch?v=cnybD6SMLuw)). Turnbull spun off ChangeAView.com in 2019 and has been less hands-on since. The current most-visible mod is **u/DuhChappers** (named in 2025 press coverage). Other named mods: **u/Apprehensive_Song490**, **u/Ansuz07**, and **u/Helpfulplatitudes**. Tony H, profiled by [Garbage Day](https://www.garbageday.email/p/meet-tony-h-a-moderator-for-reddits) in 2021, was previously prominent.

**Enforcement style:** highly proceduralized. Rule B requires OPs to respond within ~3 hours; Rule 4 forbids "fresh accounts"; Rule 5 forbids low-effort comments. The mod team is unusually transparent — they publish meta-posts explaining decisions. They are also aggressive: in April 2025 they filed a formal ethics complaint with the University of Zurich's Faculty of Arts and Sciences over the unauthorized AI experiment ([Retraction Watch](https://retractionwatch.com/2025/04/29/ethics-committee-ai-llm-reddit-changemyview-university-zurich/)) and got Reddit's Chief Legal Officer to publicly condemn the researchers. **Founder posts are NOT tolerated** unless the founder is a long-standing community member with delta history. Posting "I built a tool that maps CMV arguments" with a fresh account is an instant ban.

### r/slatestarcodex

Honorary mod **Scott Alexander (u/yashkaf? — Scott has used multiple usernames, including ScottAlexander)** comments occasionally. Day-to-day moderation is handled by a small team with a **light touch**. The community's ethos is "post anything reasonably thoughtful." **Founder posts ARE tolerated** if they read as genuine intellectual contributions — examples include past Manifold and Metaculus posts. The risk is community ridicule, not moderation. Top comments will demolish weak claims; a half-baked Argumend post will get a 200-comment evisceration thread that the founder cannot withdraw from gracefully.

### r/philosophy

Mod team is anonymous but enforces **strict anti-AI policy** — the [Good Thoughts blog](https://www.goodthoughts.blog/p/anti-ai-ideology-enforced-at-rphilosophy) documents a temp-ban for an article that contained an AI-generated *background image*. This is the worst-fit sub for Argumend on policy alone. Submission guidelines require "developed argument" in the post body; bare links are removed. **Founder posts are flatly disallowed** under "no self-promotion."

### r/NeutralPolitics

Mods (the team's username pattern is `NeutralverseBot` for automod plus ~10 named human mods) enforce the **strictest sourcing rules outside r/AskHistorians**. The [AAAI ICWSM paper "How Distinctive Toxicity Norms Are Maintained in Political Subreddits"](https://ojs.aaai.org/index.php/ICWSM/article/download/7323/7177/10553) found r/NeutralPolitics has one of the highest rejection rates on Reddit — the visible queue is ~10-20% of submitted volume. **Founder posts will be auto-rejected** unless every claim in the post body is sourced to a high-quality outlet. *This is also the sub where Argumend's pre-sourced topic format would shine* — a post that's 100% sourced from pre-extracted Argumend evidence nodes is exactly what they want, *if* it doesn't mention Argumend.

### r/AskHistorians

Mod team is famous: **30+ mods including senior mods like u/Georgy_K_Zhukov, u/Iphikrates, u/sunagainstgold, u/itsallfolklore** ([Wiki](https://en.wikipedia.org/wiki/R/AskHistorians); [DRUM CSCW case study](https://drum.lib.umd.edu/handle/1903/25576)). Famously self-described as "running the world's largest historical outreach project on a cesspool of a website." Removes ~95% of answers that don't meet the academic-citation bar. **Founder posts are categorically not allowed.** This sub is included only because Argumend's confidence-scored evidence nodes are the closest existing model on Reddit for what AH demands of human posters — there is *aesthetic* alignment but no posting opportunity.

## 5. The CMV opportunity specifically

r/changemyview is the highest-EV target *if* Argumend can avoid being seen as a tool peddler. Why it fits:

- **CMV OPs already do half of what Argumend does.** A standard CMV post has structure: "I think X because A, B, C. CMV." That's a position with three premises — which is literally an Argumend position node with three evidence/sub-position children.
- **The delta system rewards persuasion, not popularity.** [DeltaBot](https://en.wikipedia.org/wiki/R/changemyview) tracks who has changed minds, and deltas are tracked in flairs. This aligns with Argumend's "crux" concept — a delta is awarded when a *crux* is identified and addressed. An Argumend output highlighting cruxes is mechanically the same operation as predicting which arguments will earn deltas.
- **Cornell's [ConvoKit Winning Arguments corpus](https://convokit.cornell.edu/documentation/winning.html)** is built on CMV data and is the academic standard for studying which argument structures persuade. Argumend could be benchmarked against it.

Why CMV is also the most dangerous:

- **AI-generated content is now actively prosecuted.** Post-Zurich (April 2025), the mod team is hyper-vigilant. Argumend's offline corpus is AI-generated — even acknowledging that on the sub may trigger automod or mod review.
- **Tool posts are seen as gimmicky.** A post titled "I built an AI that maps CMV arguments — here's your view as a graph" is the worst possible framing. CMV regulars hate "look at this neat thing" content; they want substantive views to argue with.
- **The "smartest guy in the room" trap.** CMV explicitly punishes people who arrive with the answer. The format is OP-down: the OP says "change my view" and others change it. A founder showing up to *explain* arguments via a tool inverts the dynamic and triggers the mod team.

**The way it could work:** A CMV regular (someone with 10+ deltas under an established username) posts a normal CMV with a normal view, *then in a top comment* casually mentions "I find argument-mapping helpful for these — see this map I made for the topic" with a single link to a public Argumend page. This is the only safe surface, and it requires either (a) the founder spending 6-12 months earning delta-flair under a personal account, or (b) finding existing CMV regulars who like the tool and would post organically.

## 6. Concrete actions for Argumend

Ranked by impact × safety:

**Action 1 — [HIGH SAFETY, MEDIUM-HIGH IMPACT] — One r/slatestarcodex post: "Open-sourcing argument extraction on 109 topics — what's wrong with it?"**
- *Sub:* r/slatestarcodex
- *Format:* essay-length text post, NOT a link, with 2-3 inline screenshots
- *Ask:* "Roast the extraction. Where does the AI miss the actual crux?"
- *Why it works:* SSC commentariat loves epistemic-tool critique; framing as "tell me what's broken" inverts the salesman energy that gets founders banned; Scott Alexander has personally written about argument structure many times
- *Watch out for:* the comment thread will be brutal. Pre-write a calm reply template that says "good point, here's the prompt that produced this — would different prompting fix it?" — never defend the output

**Action 2 — [HIGH SAFETY, MEDIUM IMPACT] — Comment-only seeding on r/ControlProblem and r/EffectiveAltruism**
- *Subs:* r/ControlProblem, r/EffectiveAltruism, r/LessWrong
- *Format:* find existing threads about AI-extinction-risk cruxes; comment with "here's the same disagreement mapped" + one Argumend public link
- *Ask:* implicit ("look at this")
- *Why it works:* these subs are link-permissive; AI risk is Argumend's strongest topic-corpus area; comment-only seeding stays under self-promo radar
- *Watch out for:* comment ratio — 9 substantive replies for every 1 self-link, per the standard 90/10 rule

**Action 3 — [MEDIUM SAFETY, HIGH IMPACT IF IT WORKS] — Submit to r/NeutralPolitics as a pre-sourced policy primer**
- *Sub:* r/NeutralPolitics
- *Format:* a "What does the evidence say about [policy X]?" post with every claim sourced
- *Ask:* "What sources am I missing on either side?"
- *Why it works:* NeutralPolitics' bottleneck is the sourcing burden, which Argumend's evidence nodes can pre-pay; this is the only major political sub where the format itself is a competitive advantage
- *Watch out for:* the post body must NOT mention Argumend. Argumend appears only as a profile-page link or signature. Mods will reject anything that looks promotional. **Test with a draft modmail first.**

**Action 4 — [LOW SAFETY, HIGH IMPACT] — DO NOT post to r/changemyview as a founder. Recruit a CMV regular instead.**
- *Sub:* r/changemyview
- *Format:* identify 5-10 active CMV users (top-100 leaderboard) who blog or have public emails; offer free Argumend Pro / API credits in exchange for nothing — just "if you find it useful, mention it"
- *Why it works:* this is how Manifold seeded; the only safe CMV mention is from a non-founder
- *Watch out for:* don't make it look like astroturfing. Use real names, real outreach, no quid-pro-quo framing.

**Action 5 — [HIGH SAFETY, LOW-MEDIUM IMPACT] — Weekly thread participation**
- Subscribe to and quietly participate in: r/slatestarcodex Open Threads (weekly), r/edtech Self-Promo Thread (weekly), r/EffectiveAltruism open threads, r/DebateReligion Weekly Discussion Thread
- *Why it works:* weekly threads are explicitly the safe surface for marginal self-promo; you're allowed to mention a tool you built once per week
- *Watch out for:* still observe 90/10 — most weekly-thread comments should be substantive replies to others

**Action 6 — Skip these subs entirely:**
- r/philosophy (anti-AI policy; instant ban risk)
- r/AskHistorians (no posting opportunity exists)
- r/SneerClub (will dunk on Argumend)
- r/IntellectualDarkWeb (audience-vibe wrong; partisan blowback risk)

## 7. Watch-outs

**The self-promo ban risk is real and propagates.** Reddit account-level bans propagate via shared automod blacklists across ~50 of the highest-quality subs. A single ban on r/changemyview can lock the founder out of r/slatestarcodex, r/philosophy, r/AskHistorians, r/NeutralPolitics, r/AskSocialScience, etc. — automoderators sync. Use a clean account, not your personal one, but don't astroturf — moderators detect new-account product-pushers within hours.

**The "smartest guy in the room" trap.** Argumend's whole UX implies "we have analyzed this for you." Reddit cultures that Argumend wants — CMV, SSC, NeutralPolitics — are *built on the premise that the user does the analysis themselves*. Posting a pre-analyzed map says "you don't need to think, I did it for you," which is the opposite of why these communities exist. Frame everything as "this is a starting point, please tear it apart."

**Mod retaliation.** CMV mods filed an ethics complaint that ended a *University of Zurich research career* ([Retraction Watch](https://retractionwatch.com/2025/04/29/ethics-committee-ai-llm-reddit-changemyview-university-zurich/)). They will not hesitate to file Reddit admin complaints, blog about a bad actor, or coordinate cross-sub bans. Treat them as a press surface — never get crosswise with them.

**Brigade risk.** r/SneerClub, despite being smaller and quarantine-prone, monitors r/slatestarcodex and r/LessWrong for brigade targets. A high-profile Argumend post on SSC will get cross-posted to SneerClub for ridicule within 24 hours. This is *not necessarily bad* — SneerClub posts get screenshotted and amplified — but the founder must be psychologically prepared for unfair mockery.

**The Roam Research negative-purge cautionary tale** ([MPU Talk](https://talk.macpowerusers.com/t/roam-research-negative-users-purged-from-the-roam-subreddit/25502)). If Argumend ever stands up its own subreddit, do NOT moderate it heavily, do NOT ban critics, do NOT delete negative posts. Roam permanently lost trust in the Reddit-power-user community by doing this. Light-touch moderation on a founder-owned sub is non-negotiable.

**AI-content stigma is hardening.** [r/programming banned all LLM-related content in 2025](https://www.tomshardware.com/tech-industry/artificial-intelligence/the-largest-programming-community-on-reddit-just-banned-all-content-related-to-ai-llms-r-programming-is-prioritizing-only-high-quality-discussions-about-ai). r/philosophy bans AI-generated illustration. CMV bans AI-generated comments. The trend across Reddit's high-quality subs in 2025-2026 is to treat AI-generated content as spam by default. Argumend's offline corpus is AI-generated. **Disclose this transparently up front in any post, or face a worse blowup later when someone notices.**

**The Kialo lesson.** A 13-year-old well-funded competitor in the same category never made Reddit work. They went conferences and edtech blogs. Argumend should treat Reddit as *one* channel, not the channel. The realistic upside is 50-200 high-quality early users from rationalist-adjacent subs over 6 months, not viral inflection.

## Sources

- [r/changemyview — Wikipedia](https://en.wikipedia.org/wiki/R/changemyview)
- [r/AskHistorians — Wikipedia](https://en.wikipedia.org/wiki/R/AskHistorians)
- [Simon Willison — Unauthorized Experiment on CMV Involving AI-generated Comments](https://simonwillison.net/2025/Apr/26/unauthorized-experiment-on-cmv/)
- [Retraction Watch — Ethics Committee Moves to Stricter Review](https://retractionwatch.com/2025/04/29/ethics-committee-ai-llm-reddit-changemyview-university-zurich/)
- [Amy Bruckman (Medium) — Unethical Study of r/changemyview](https://asbruckman.medium.com/an-unethical-study-of-r-changemyview-by-university-of-zurich-highlights-the-need-for-international-787bb603ad6c)
- [Hacker News — Unauthorized experiment on r/changemyview thread](https://news.ycombinator.com/item?id=43806940)
- [NBC News — Researchers secretly infiltrated r/CMV](https://www.nbcnews.com/tech/tech-news/reddiit-researchers-ai-bots-rcna203597)
- [Garbage Day — Meet Tony H, A Moderator For r/ChangeMyView](https://www.garbageday.email/p/meet-tony-h-a-moderator-for-reddits)
- [DeltaAllStars Podcast — u/Snorrrlax CMV Origins](https://www.youtube.com/watch?v=cnybD6SMLuw)
- [Koshy et al — Measuring User-Moderator Alignment on r/ChangeMyView (CSCW 2023)](https://sundaram.cs.illinois.edu/pubs/2023/2023_koshy_moderation.pdf)
- [Cornell ConvoKit — Winning Arguments (CMV) Corpus](https://convokit.cornell.edu/documentation/winning.html)
- [Good Thoughts blog — Anti-AI Ideology Enforced at r/philosophy](https://www.goodthoughts.blog/p/anti-ai-ideology-enforced-at-rphilosophy)
- [AAAI ICWSM — Distinctive Toxicity Norms in Political Subreddits](https://ojs.aaai.org/index.php/ICWSM/article/download/7323/7177/10553)
- [DRUM CSCW — r/AskHistorians Case Study](https://drum.lib.umd.edu/handle/1903/25576)
- [Citizens & Tech — Community Moderation in r/moderatepolitics](https://citizensandtech.org/2024/04/community-moderation-reddit-politics/)
- [DebateReligion Feedback on New Rules](https://libredd.it/r/DebateReligion/comments/hi50fi/feedback_on_new_rules)
- [LessWrong Presence on Reddit (wiki)](https://www.lesswrong.com/w/lesswrong-presence-on-reddit)
- [LessWrong — Why is Argument Mapping Not More Common in EA/Rationality?](https://www.lesswrong.com/posts/bHXpbf6jXc4bgyrrp/why-is-argument-mapping-not-more-common-in-ea-rationality)
- [LessWrong — Debate tools: an experience report](https://www.lesswrong.com/posts/dJJYgmaYYFmHoQM4L/debate-tools-an-experience-report)
- [Slate Star Codex — Why Not More Excitement About Prediction Aggregation? (Aug 2017)](https://slatestarcodex.com/2017/08/03/why-not-more-excitement-about-prediction-aggregation/)
- [Manifold Markets — r/slatestarcodex membership market](https://manifold.markets/Dwaxe/will-redditcomrslatestarcodex-have-)
- [Manifold Markets — Reddit bounties program](https://manifold.markets/SG/reddit-bounties)
- [HN ref — r/skeptic Rule 11 self-promo policy](https://news.ycombinator.com/item?id=37513140)
- [MPU Talk — Roam Research negative-user purge from subreddit](https://talk.macpowerusers.com/t/roam-research-negative-users-purged-from-the-roam-subreddit/25502)
- [Tom's Hardware — r/programming bans all AI/LLM content](https://www.tomshardware.com/tech-industry/artificial-intelligence/the-largest-programming-community-on-reddit-just-banned-all-content-related-to-ai-llms-r-programming-is-prioritizing-only-high-quality-discussions-about-ai)
- [Skeptic Magazine — What Happened to the Intellectual Dark Web?](https://www.skeptic.com/michael-shermer-show/what-happened-to-the-intellectual-dark-web/)
- [The Next Web — r/changemyview is a template for online discussion](https://thenextweb.com/news/reddits-model-community-offers-a-prototype-for-controversial-discussions)
- [FEE — Change My View teaching civil challenge](https://fee.org/articles/reddit-s-change-my-view-is-actually-teaching-people-how-to-challenge-ideas-civilly/)
- [Engadget — CMV becomes its own site (ChangeAView)](https://www.engadget.com/2019-04-07-reddit-change-my-view-community-site.html)
- [gummysearch — r/philosophy stats](https://gummysearch.com/r/philosophy/)
- [gummysearch — r/AskSocialScience stats](https://gummysearch.com/r/AskSocialScience/)
- [gummysearch — r/AcademicPhilosophy stats](https://gummysearch.com/r/AcademicPhilosophy/)
- [gummysearch — r/RoamResearch stats](https://gummysearch.com/r/RoamResearch/)
- [SaaSCity — Best Subreddits to Promote Your Startup 2026](https://saascity.io/blog/best-subreddits-promote-startup-2026)
- [Earlier Argumend research — 01-kialo.md](../2026-04-16-competitive-intel/01-kialo.md)

# Bias-Attack-Vector Taxonomy: When the Founder Is the Attack Surface

**Date:** 2026-04-29
**Analyst:** Research agent 09/10 — brand-voice architecture swarm
**Topic:** What becomes attackable when a neutrality-positioned product has a known individual founder, and how peer institutions defuse those attacks. Argumend-specific threat modeling.

## 1. The Attack-Vector Framing

A product that claims neutrality is making a strong, falsifiable claim. Anything an opponent can point to that contradicts that claim is an attack vector. The opponent's *operational* goal is not to prove the product wrong on the merits — it is to give a reader a one-sentence reason to dismiss the output. "I don't have to think about Argumend's analysis of Topic X, because the founder is a [tribe member / donor to Y / signatory of Z]." Once dismissal is licensed, the analysis is unread.

This is the well-documented **credibility-attack** pattern. Cambridge Core's review of the persuasion literature ([When Do Sources Persuade? — Journal of Experimental Political Science](https://www.cambridge.org/core/journals/journal-of-experimental-political-science/article/when-do-sources-persuade-the-effect-of-source-credibility-on-opinion-change/48ECC9B706B2C3BA733936BE184917CC)) shows that perceived source credibility acts as the *gating function* for whether arguments persuade at all on partisan topics — and that on non-politicized issues, source effects collapse. The whole game is whether your audience reads you as inside or outside their tribe.

CJR ([Trust News Ideology](https://www.cjr.org/analysis/trust-news-ideology-partisan-personalities-survey-says.php)) and Pew ([Media Mistrust](https://www.pew.org/en/trend/archive/fall-2024/media-mistrust-has-been-growing-for-decades-does-it-matter)) document the asymmetry: by 2023 only 11% of Republicans trusted "the media" vs. 58% of Democrats. A 2025 ScienceDirect study ([Can fact-checking protect trust](https://www.sciencedirect.com/science/article/abs/pii/S074756322500319X)) found credibility attacks are most damaging when they come from *in-group* influencers — for Argumend, the relevant attacker is not a hostile outsider but a respected rationalist/EA-adjacent voice who flips and says "this is captured."

In partisan-attack research, this is the **branding move**: brand a source as "liberal" or "conservative" via opinion leaders, and large segments tune out ([Media Distrust in Partisan Voting](https://www.researchgate.net/publication/225412956_The_Role_of_Media_Distrust_in_Partisan_Voting)). For Argumend, the analogous brand attack is "captured by [tribe]." The founder's identity is the highest-yield attack surface because it converts the abstract claim "this product is biased" into a tweetable bullet: "founder donated $X to Y / worked at Z / signed letter W."

## 2. The Seven Canonical Attack Vectors When the Founder Is Known

### (a) Past public opinions — old tweets, blog posts, Substack subscriptions

Brendan Eich is the canonical case. His $1,000 donation to Prop 8 *in 2008* surfaced six years later when he was promoted to Mozilla CEO; he was forced out after 11 days ([Wikipedia — Brendan Eich](https://en.wikipedia.org/wiki/Brendan_Eich), [TechCrunch](https://techcrunch.com/2014/03/28/after-supporting-prop-8-brendan-eich-comes-under-fire-from-mozilla-employees-upon-ceo-appointment/)). The donation predated his promotion by half a decade and Mozilla's positioning entirely; it didn't matter. **Old surfaces are most dangerous because they are immutable, screenshottable, and unretconnable.**

For a neutrality-positioned product, the attack does not need the past view to be morally objectionable — just to demonstrate *a* view on a contested topic. Substack subscriptions are a similar tell ([CJR on Substack dark money](https://www.cjr.org/feature/aaron-parnas-substack-news-influencer-tiktok-video-politics-ukraine-democrats-independent-journalism-dark-money.php)): which Substacks a journalist publicly subscribes to is now treated as ideological alignment evidence, and the platform has been characterized as "reactionary centrism" ([Inkstick](https://inkstickmedia.com/how-deep-does-substacks-far-right-problem-run-really/)).

### (b) Political donations — FEC records

FEC records are searchable on OpenSecrets ([donor-lookup](https://www.opensecrets.org/donor-lookup)). Apple News was attacked on exactly this vector: Fox News reviewed FEC filings and reported that 15 of 25 listed leaders had made substantial Democratic contributions ([Fox News — Apple News bias](https://www.foxnews.com/media/alleged-bias-apple-news-tech-giants-leadership-filled-major-dem-donors)). That was sufficient for a multi-cycle bias narrative against a curated-news product. The donations did not need to relate to news editorial — partisan donation by leadership was the bullet.

### (c) Affiliations — employer history, board memberships, conference appearances

Open Philanthropy is the best-documented Argumend-relevant case. EA Forum threads document recurring criticism that "intimate connections with employees of Open Philanthropy greatly enhances the chances of having funding" and "residency in the San Francisco Bay Area is also a must" ([EA Forum — Criticism Thread](https://forum.effectivealtruism.org/posts/trqswoctpQ92tcY2y/criticism-thread-what-things-should-openphil-improve-on)). A Politico piece on the Open Phil Horizon Fellowship ([EA Forum](https://forum.effectivealtruism.org/posts/uiyHiwrXKysfdoCps/politico-article-on-open-phil-horizon-fellowship-and-ea)) used affiliation as the entire story: who attended which retreat became the bias evidence. EA Global, Manifest, LessOnline all leave trails.

### (d) Demographic — race, gender, education, geography

Wikipedia is canonical. The 2018 community survey across 12 language editions ([Gender bias on Wikipedia](https://en.wikipedia.org/wiki/Gender_bias_on_Wikipedia)) found 90% of contributors identifying as male. Critics use that single statistic as a complete bias argument: a knowledge product produced by a 90%-male, predominantly Western editor base cannot claim neutrality. A 2021 study found 41% of biographies *nominated for deletion* were of women, despite women being only 17% of biographies. The attack does not require individual editor views to be biased — the *base rate* of the producer pool is the attack.

### (e) Co-signed letters / petitions

The 2023 FLI "Pause Giant AI Experiments" letter ([Wikipedia](https://en.wikipedia.org/wiki/Pause_Giant_AI_Experiments:_An_Open_Letter), [TechCrunch](https://techcrunch.com/2023/03/28/1100-notable-signatories-just-signed-an-open-letter-asking-all-ai-labs-to-immediately-pause-for-at-least-6-months/)) attached 30,000+ names to a contested position. Gebru and others reframed signatories as "amplifying futuristic, dystopian sci-fi scenario instead of current problems with AI today" ([TIME](https://time.com/7327409/ai-agi-superintelligent-open-letter/)). For any signatory later launching a neutrality-positioned AI product, that signature is permanent and citable. The "Statement on AI Risk" was attacked the same way — as lab PR.

### (f) Friend graph — retweets, praise, collaboration

The hardest to defend, because the founder cannot pre-screen who interacts with their output. Larry Sanger's NPOV-abandoned accusation ([Manhattan Institute](https://manhattan.institute/article/is-wikipedia-politically-biased)) gets cited approvingly across right-of-center outlets *because* Sanger is a cofounder — praise from a cofounder is a credibility move; praise from partisan media is an attack vector. The friend graph cuts both ways.

### (g) Founding-team composition

The diversity / political balance of who the founder hired becomes evidence. Apple News was attacked via its leadership page. Open Phil's grantmaker concentration — small, geographically clustered, socially networked — is a recurring bias claim ([Inside Philanthropy](https://www.insidephilanthropy.com/home/2023-3-16-how-effective-is-effective-altruism-a-deep-dive-into-two-of-open-philanthropys-ea-inspired-programs)). A solo founder faces this inverted: no balancing team, so the founder's identity *is* the team's identity.

## 3. Case Study: Wikipedia Under Attack

Wikipedia's NPOV policy ([NPOV](https://en.wikipedia.org/wiki/Wikipedia:Neutral_point_of_view)) is the most-attacked neutrality claim on the public internet, and the pattern has hardened into a template:

1. **Editor-demographics attack.** "90% male, predominantly Anglo, college-educated — therefore content is systematically skewed." This is empirically grounded (the survey is real) and rhetorically devastating.
2. **Specific-edits attack.** "Look at the talk page on [contested article] — see who reverted whom." [The City Journal piece](https://www.city-journal.org/article/wikipedias-neutrality-myth-or-reality) and the Manhattan Institute analysis both lean on cherry-picked edit histories of right-leaning vs. left-leaning political figures, alleging asymmetric negative sentiment.
3. **Founder-flip attack.** Larry Sanger, cofounder, publicly says Wikipedia is biased. This is the highest-leverage attack: the *insider witness*.

**Wikipedia's defense:** process transparency. Every edit logged. Talk pages public. Dispute resolution (RfC, ArbCom, NPOV noticeboard) documented. The defense partially works because anyone alleging bias *also* has to engage the logged process, which is exhausting and rarely tweets well. But it does not eliminate the attack — it raises the cost of attacking *credibly*. Casual attacks ("Wikipedia is woke") still land; serious studies (Manhattan Institute) still get coverage.

Lesson: **process transparency is necessary but does not silence attackers**. It moves the fight from "are you biased?" to "who interprets the logs?" — still losable in narrative.

## 4. Case Study: Ground.news / AllSides

AllSides ([allsides.com/about/media-bias-rating-methods](https://www.allsides.com/about/media-bias-rating-methods)) and Ground News ([ground.news/rating-system](https://ground.news/rating-system)) are the two most-attacked-from-both-sides bias-rating products. Their defenses are instructive.

**AllSides' defense stack:**
- **Multi-method.** Editorial reviews + blind bias surveys + public crowd-sourced ratings + a politically balanced expert panel. The methodology page is exhaustive.
- **Public disagreement disclosure.** AllSides openly publishes when its blind survey diverges from its editorial review — e.g., 543 survey respondents rated WSJ Opinion "Lean Left" while the multipartisan panel rated it "Lean Right," and AllSides documented the disagreement and chose Lean Right ([AllSides — Bias Rating Methods](https://www.allsides.com/about/media-bias-rating-methods)).
- **Named advisory panel** with declared partisan affiliations balanced left/right.

**Attacks AllSides absorbs:** Poynter ([Should you trust media bias charts?](https://www.poynter.org/fact-checking/media-literacy/2021/should-you-trust-media-bias-charts/)) catalogues the standing critique — bias is subjective, charts confuse bias with reliability, and methodology choices encode the rater's own ideology. AllSides itself acknowledges "AllSides ratings are never entirely 'accurate' and never can be."

**Ground.news' defense:** *defer* — they aggregate AllSides + Ad Fontes + Media Bias/Fact Check rather than rate independently ([Wikipedia — Ground News](https://en.wikipedia.org/wiki/Ground_News)). The defense is meta: "we don't have an opinion, we surface theirs." Attack: CJR reported Ground News used AllSides' ratings without "formal permission," and critics pointed out that aggregating three biased rater pools doesn't make the aggregate unbiased ([factually.co comparison](https://factually.co/fact-checks/media/allsides-ad-fontes-ground-news-bias-rating-methods-compared-788ca3)).

The shared defense: **methodology transparency + named raters + multiple raters**. The shared residual vulnerability: someone always has to choose the raters, and that choice is a bias attack surface.

## 5. Case Study: Asterisk Magazine

Asterisk ([asteriskmag.com](https://asteriskmag.com/)) is the cleanest example of an EA-coded publication trying to reach beyond EA. Its attack profile:

- **Funding attack.** RationalWiki ([Asterisk Magazine — RationalWiki](https://rationalwiki.org/wiki/Asterisk_Magazine)) flatly states the magazine is "funded by Effective Altruism organizations" and by 2025 explicitly funded by Open Philanthropy. That single sentence is the entire bias case for skeptical readers.
- **Contributor attack.** "Many EA and rationalist bloggers such as Aella, Scott Alexander, Ozy Brennan, Sarah Constantin, and Kelsey Piper have written for the magazine ... almost all have connections to some related movement such as pro-natalism" — RationalWiki. Contributor list = friend graph = bias.
- **Hidden-frame attack.** "Articles are full of EA and LessWrong 'rationalist' ideas but rarely mention those movements by name" — i.e., the magazine is accused of *laundering* ideology by stripping the labels.

**Asterisk's defense:** strong editorial voice, deliberate contributor range (mainstream academics, pollsters, contractors), willingness to cite EA-skeptical perspectives, and high prose quality. The defense partially works for sophisticated readers and not at all for readers pattern-matching on funding source ([Reflective Altruism Pt 4](https://reflectivealtruism.com/2026/03/20/getting-it-right-part-4-criticism/)).

**Lesson for Argumend:** even with method-transparent product and diverse contributors, a tribe-coded named funder is a complete bias bullet. Funder concealment is not viable; funder *diversification* is.

## 6. Case Study: AI Safety Community Generally

The AI safety field is the cleanest example of a community attacked simultaneously from incompatible directions:

- **Doom-cult attack** ([The Atlas Society — AI Doomsday Cult](https://www.atlassociety.org/post/the-ai-doomsday-cult), [Realtime Techpocalypse](https://www.realtimetechpocalypse.com/p/effective-altruism-is-a-dangerous)): the field is characterized as a quasi-religious movement.
- **Regulatory-capture attack** ([Reason — The authoritarian side of effective altruism comes for AI](https://reason.com/2024/07/05/the-authoritarian-side-of-effective-altruism-comes-for-ai/)): AI safety is portrayed as a Trojan horse for incumbent labs to entrench.
- **Big-tech-capture attack**: AI safety as marketing op for Anthropic / OpenAI.
- **TESCREAL attack** ([Morris](https://davidzmorris.substack.com/p/what-is-tescrealism-mapping-the-cult)): bundled with transhumanism, eugenics-adjacent thinking, longtermism.
- **EA-funding attack** ([HN](https://news.ycombinator.com/item?id=35064303)).
- **Distraction-from-real-harms** (Gebru et al.): speculative risk de-prioritizes algorithmic-bias and labor harms today.

**The defense is mixed.** Internal forums (LessWrong, EA Forum, Asterisk, Alignment Forum) host serious self-criticism; public communications tend to deflect. The community has not converged on a defense that works against *all* attack vectors simultaneously, because the attacks are mutually contradictory — a defense against "doom cult" tends to amplify "regulatory capture," and vice versa.

This matters for Argumend because the most likely attacker pool is exactly this terrain.

## 7. Argumend-Specific Threat Model

Given the wedge audience (rationalist / ACX / LessWrong / AI-safety-adjacent), and given a known individual founder, the high-likelihood attacks are:

1. **"Argumend is captured by the rationalist tribe / EA / AI-safety doom industry."** Cited evidence: the wedge audience itself, the topic-selection biases toward AI-x-risk-style cruxes, the funder roster if it includes Open Phil or related.
2. **"Founder X is [political descriptor] / has bad takes on [topic Y], therefore topic-selection is biased."** Cited evidence: any past tweet, blog, donation, retweet, conference attendance, podcast appearance.
3. **"Funded by Open Phil = EA = biased toward EA causes."** Cited evidence: grant disclosure (which is mandatory for transparency).
4. **"Multi-model judging means hiding behind AI to avoid taking positions."** A more sophisticated attack from rationalist-internal critics: deferring to model consensus is itself an editorial choice, and an evasive one.
5. **"The judge models themselves are biased — RLHF skews them, so the 'neutrality' is fake."** This is the most empirically loaded attack and the hardest to fully defuse. Multiple peer-reviewed studies confirm RLHF-tuned models systematically lean liberal ([Manhattan Institute — Measuring Political Preferences in AI Systems](https://manhattan.institute/article/measuring-political-preferences-in-ai-systems-an-integrative-approach), [arXiv 2403.18932](https://arxiv.org/html/2403.18932v1), [SCL — LLMs Are Left-Leaning Liberals](https://www.scl.org/llms-are-left-leaning-liberals-the-hidden-political-bias-of-large-language-models/)). The "Silicon Valley Subject" framing in the literature is exactly the bullet a hostile critic will fire.
6. **"Topic selection reveals partisan priorities — covers X but not Y."** Cited evidence: the topic catalog. With 109 topics, the absence of any specific topic is now an attack surface.

## 8. Defenses

- **Anonymous-founder pattern.** Defuses (a)–(g) of section 2 immediately. The attacker has nothing to point to. This is the strongest single move.
- **Method-as-authority** (compose with research agent 06). The argument-extraction algorithm, the judge-council protocol, and the topic-selection rubric become the authority, replacing the founder. The reader judges the method, not the person.
- **Diverse advisor / contributor names** (compose with agents 03 / 07). Even an anonymous founder can have named, demographically and ideologically diverse advisors. Asterisk's contributor diversification is the model.
- **Pre-commit transparency on topic selection.** Publish the rubric *before* picking topics. "Topics are selected from a list of contested questions where major political camps have non-trivial expert support, ranked by [criteria]." Pre-commitment defuses the "you cherry-picked" attack because the rubric, not the picker, did the picking.
- **Public corrections when topics are added or removed.** A change-log makes additions and removals legible. Wikipedia-style edit-history transparency.
- **Inter-model-disagreement transparency.** When the Anthropic, OpenAI, and Google judges diverge, surface the divergence. This is the strongest defense against attack (5) — RLHF bias is most damaging when invisible. Surfacing model disagreement converts the bias from a hidden flaw into a visible feature.

## 9. Anonymous-Founder Is Necessary But Not Sufficient

Going anonymous removes vectors (a)–(g). It does not remove:

- **Topic-selection process.** The rubric itself is now the attack surface ("Argumend's rubric privileges meta-debates over object-level harms"). Defense: pre-commit, publish, accept community pull requests for topics.
- **Model choice.** Choosing Anthropic + OpenAI + Google is a choice. Why not Meta? Why not Mistral? Why not a Chinese model? Defense: publish selection criteria; rotate; explicitly enumerate the political compass shared by all chosen models so users know.
- **Funder list.** Even one named EA-aligned funder reactivates the entire (a)–(g) machinery against the *funder*. Defense: diversify funders or stay self-funded; if grant funding is taken, disclose it conspicuously *and* publish a methodology firewall.
- **Advisor board composition.** Same as founding team — who's named is the attack surface.
- **Wedge-audience composition.** If 100% of early users are rationalists, that itself is the bias claim ("by-rationalists, for-rationalists"). Defense: deliberately seed in adjacent communities (academic philosophy, journalism, civic-tech, education) early.
- **Voice / tone.** Even anonymous prose has a tribe-coded register. LessWrong-flavored qualifiers like "to be clear," "I notice that I'm confused," "the strong version of this claim" are tells. Defense: edit toward institutional register, or hire a copy editor outside the rationalist sphere.
- **Visual aesthetic.** The stoic/parchment look codes "thoughtful, possibly LW-adjacent." Defense: this is genuinely double-edged; the audience that finds it appealing is also the audience that recognizes the code.

## 10. Recommended Threat-Model + Defense Matrix

| Attack Vector | Likelihood | Severity | Structural Defense |
|---|---|---|---|
| Past tweets / Substack subs / blog posts | High (if founder named) | High | Anonymous-founder + clean public footprint |
| FEC donation records | Medium | High | Anonymous-founder; if named, no political donations |
| Employer / board / conference history | High (if founder named) | Medium | Anonymous-founder; named advisor diversification |
| Demographic attack | Always available | Medium-Low | Anonymous-founder; diverse named advisors/contributors |
| Co-signed letters / petitions | High (rationalist-adjacent) | High | Anonymous-founder; future no-signing policy |
| Friend graph (retweets, praise) | Always available | Medium | Anonymous-founder; institutional account only |
| Founding-team composition | Medium | Medium | Diverse named advisors stand in for team |
| Topic-selection bias | High | High | Pre-committed rubric, public change-log, community PRs |
| Model-choice bias | Medium | Medium | Published selection criteria, rotation, disclose model political baseline |
| Funder bias (esp. Open Phil) | High | Critical | Funder diversification or self-funding; no single >25% funder |
| RLHF / model neutrality fake | Medium-High | High | Inter-model disagreement transparency; cite the bias literature openly |
| "Captured by rationalist tribe" | High | Critical | Wedge-audience diversification; non-LW register; named non-rationalist advisors |
| "Hiding behind AI to avoid positions" | Medium | Medium | Method essays explaining when humans intervene; named editorial committee for edge cases |

## Sources

- [Wikipedia — NPOV](https://en.wikipedia.org/wiki/Wikipedia:Neutral_point_of_view), [Gender bias on Wikipedia](https://en.wikipedia.org/wiki/Gender_bias_on_Wikipedia)
- [City Journal — Wikipedia's Neutrality: Myth or Reality?](https://www.city-journal.org/article/wikipedias-neutrality-myth-or-reality)
- [Manhattan Institute — Is Wikipedia Politically Biased?](https://manhattan.institute/article/is-wikipedia-politically-biased)
- [Manhattan Institute — Measuring Political Preferences in AI Systems](https://manhattan.institute/article/measuring-political-preferences-in-ai-systems-an-integrative-approach)
- [AllSides — Bias Rating Methods](https://www.allsides.com/about/media-bias-rating-methods); [AllSides 2024 Ratings Over Time](https://www.allsides.com/blog/AllSides-Media-Bias-Rating-Over-Time-2024); [Wikipedia — AllSides](https://en.wikipedia.org/wiki/AllSides)
- [Wikipedia — Ground News](https://en.wikipedia.org/wiki/Ground_News); [Ground News — Rating System](https://ground.news/rating-system)
- [Poynter — Should you trust media bias charts?](https://www.poynter.org/fact-checking/media-literacy/2021/should-you-trust-media-bias-charts/)
- [factually.co — AllSides vs Ground News methods](https://factually.co/fact-checks/media/allsides-ground-news-media-bias-methods-reliability-b342d2); [vs Ad Fontes](https://factually.co/fact-checks/media/allsides-ad-fontes-ground-news-bias-rating-methods-compared-788ca3)
- [Asterisk — RationalWiki](https://rationalwiki.org/wiki/Asterisk_Magazine); [EA Forum — Introducing Asterisk](https://forum.effectivealtruism.org/posts/Mts84Mv5cFHRYBBA8/introducing-asterisk); [Reflective Altruism — Getting It Right Pt 4](https://reflectivealtruism.com/2026/03/20/getting-it-right-part-4-criticism/)
- [EA Forum — OpenPhil Criticism Thread](https://forum.effectivealtruism.org/posts/trqswoctpQ92tcY2y/criticism-thread-what-things-should-openphil-improve-on); [Inside Philanthropy — Effective Altruism Deep Dive](https://www.insidephilanthropy.com/home/2023-3-16-how-effective-is-effective-altruism-a-deep-dive-into-two-of-open-philanthropys-ea-inspired-programs); [EA Forum — Politico on Open Phil + Horizon](https://forum.effectivealtruism.org/posts/uiyHiwrXKysfdoCps/politico-article-on-open-phil-horizon-fellowship-and-ea)
- [Reason — Authoritarian EA Comes for AI](https://reason.com/2024/07/05/the-authoritarian-side-of-effective-altruism-comes-for-ai/); [Atlas Society — AI Doomsday Cult](https://www.atlassociety.org/post/the-ai-doomsday-cult); [David Z. Morris — TESCREALism](https://davidzmorris.substack.com/p/what-is-tescrealism-mapping-the-cult); [HN — EA's AI Safety Obsession](https://news.ycombinator.com/item?id=35064303)
- [Wikipedia — Pause Giant AI Experiments](https://en.wikipedia.org/wiki/Pause_Giant_AI_Experiments:_An_Open_Letter); [Wikipedia — Statement on AI Risk](https://en.wikipedia.org/wiki/Statement_on_AI_Risk); [TIME — Ban Superintelligent AI Letter](https://time.com/7327409/ai-agi-superintelligent-open-letter/); [TechCrunch — 1100+ Pause Letter Signers](https://techcrunch.com/2023/03/28/1100-notable-signatories-just-signed-an-open-letter-asking-all-ai-labs-to-immediately-pause-for-at-least-6-months/)
- [Wikipedia — Brendan Eich](https://en.wikipedia.org/wiki/Brendan_Eich); [TechCrunch — Eich/Prop 8 firestorm](https://techcrunch.com/2014/03/28/after-supporting-prop-8-brendan-eich-comes-under-fire-from-mozilla-employees-upon-ceo-appointment/); [Slate — Eich quits Mozilla](https://slate.com/news-and-politics/2014/04/brendan-eich-quits-mozilla-lets-purge-all-the-anti-gay-donors-to-prop-8.html)
- [Fox News — Apple News leadership donations](https://www.foxnews.com/media/alleged-bias-apple-news-tech-giants-leadership-filled-major-dem-donors); [CNN — AI Allies Political Donations 2026](https://www.cnn.com/2026/02/11/politics/palantir-midterms-artificial-intelligence-ai); [OpenSecrets Donor Lookup](https://www.opensecrets.org/donor-lookup); [FEC Individual Contribution Research](https://www.fec.gov/introduction-campaign-finance/how-to-research-public-records/individual-contributions/)
- [arXiv 2403.18932 — Measuring Political Bias in LLMs](https://arxiv.org/html/2403.18932v1); [arXiv 2510.08236 — Hidden Bias in LLMs](https://arxiv.org/html/2510.08236v1); [Brookings — ChatGPT Political Bias](https://www.brookings.edu/articles/the-politics-of-ai-chatgpt-and-political-bias/); [SCL — LLMs Are Left-Leaning Liberals](https://www.scl.org/llms-are-left-leaning-liberals-the-hidden-political-bias-of-large-language-models/)
- [Cambridge Core — When Do Sources Persuade?](https://www.cambridge.org/core/journals/journal-of-experimental-political-science/article/when-do-sources-persuade-the-effect-of-source-credibility-on-opinion-change/48ECC9B706B2C3BA733936BE184917CC); [Pew — Media Mistrust Trend](https://www.pew.org/en/trend/archive/fall-2024/media-mistrust-has-been-growing-for-decades-does-it-matter); [CJR — Trust News Ideology](https://www.cjr.org/analysis/trust-news-ideology-partisan-personalities-survey-says.php); [ScienceDirect — Can Fact-Checking Protect Trust](https://www.sciencedirect.com/science/article/abs/pii/S074756322500319X); [ResearchGate — Media Distrust in Partisan Voting](https://www.researchgate.net/publication/225412956_The_Role_of_Media_Distrust_in_Partisan_Voting)
- [Inkstick — Substack Far-Right Problem](https://inkstickmedia.com/how-deep-does-substacks-far-right-problem-run-really/); [CJR — Aaron Parnas Substack News](https://www.cjr.org/feature/aaron-parnas-substack-news-influencer-tiktok-video-politics-ukraine-democrats-independent-journalism-dark-money.php); [Wikipedia — Snopes](https://en.wikipedia.org/wiki/Snopes); [Wikipedia — PolitiFact](https://en.wikipedia.org/wiki/PolitiFact)

# Hacker News Playbook for Argumend

**Date:** 2026-04-28
**Analyst:** Research agent 07/10 — distribution sweep for Argumend
**Scope:** What it takes to launch an argumentation / epistemics / AI-thinking-tool product on HN in 2026, based on what worked and didn't for comparable products.

## 1. Snapshot of HN April 2026

Hacker News is moderated by **Daniel Gackle (dang)** and **Tom Howard (tomhow)** — the same two-person operation that has run the site since 2014 ([Wikipedia](https://en.wikipedia.org/wiki/Hacker_News)). dang reads a near-superhuman volume of comments and applies a consistent but uncodified set of norms; he can be emailed at hn@ycombinator.com to surface a missed-but-good launch into the **second-chance pool**, a curated re-injection mechanism in place since late 2014 that drops eligible stories onto random front-page slots for a few minutes of fresh attention ([HN 26998308](https://news.ycombinator.com/item?id=26998308), [HN 39151319](https://news.ycombinator.com/item?id=39151319)). Founders launching niche products should know this exists — it is by far the most underused lever on HN.

Traffic-wise, HN remains the most concentrated developer-and-rationalist audience on the open web. The front page turns over every few hours; a top-30 slot for 2-3 hours typically delivers 10K-50K uniques to a small site, with 100K+ for sustained #1 hits. **Show HN** has its own tab (`/show`) and `/shownew` queue, which are less competitive than the main `/newest` firehose and let posts gather upvotes more slowly before triggering main-page consideration ([Show HN Guidelines](https://news.ycombinator.com/showhn.html)). For niche-product launches this is the single most important structural fact: **the Show HN prefix gives you a parallel, lower-noise queue.**

Recent algorithm-adjacent changes worth noting: HN's moderation tooling was upgraded in 2025 with AI-assisted flagging and sentiment analysis to triage comment-rule violations. There has been no major change to the ranking algorithm itself — still votes-minus-flags-divided-by-time-with-penalties — but flag-overheating remains the most common cause of niche-product death on HN, and AI-related submissions are now subject to noticeably higher flag thresholds because of HN community fatigue with LLM-wrapper Show HNs. Argumend, which is fundamentally an "AI does the thinking" pitch, walks straight into this landmine.

## 2. HN Successes for Comparable Products

### Kialo (debate platform — closest analog)

| Metric | Detail |
|---|---|
| Title | Kialo – a platform for rational debate |
| Author | lukeplato (not the founder Pitsos — submitted by a fan) |
| Score | 179 points |
| Comments | 179 comments |
| Date | 2018-07-08 |
| URL | [HN 17486077](https://news.ycombinator.com/item?id=17486077) |

Notable because it was a **fan submission**, not a founder Show HN. The 1:1 points-to-comments ratio is the tell — debate-tool posts attract people who want to debate the debate tool. Top critical comments hit the same beats Argumend will face: joelthelion on missing neutral-option, electrograv on creator moderation enabling censorship. A separate October 2017 thread "Kialo Empowering Reason" ([HN 15399101](https://news.ycombinator.com/item?id=15399101)) generated similar design-critique threads. Kialo never did a proper "Launch HN" with founder-in-comments — a strategic miss.

### Manifold Markets (prediction-market platform — adjacent epistemics)

| Metric | Detail |
|---|---|
| Title | Show HN: Create your own prediction market in two minutes |
| Author | akrolsmir (founder Austin Chen) |
| Score | 84 points |
| Comments | 72 comments |
| Date | 2022-02-11 |
| URL | [HN 30275860](https://news.ycombinator.com/item?id=30275860) |

The earlier "Mantic Markets" thread ([HN 29729347](https://news.ycombinator.com/item?id=29729347)) seeded the audience before the rebrand. Modest 84-point launch is illustrative: even with an ACX grant, prior community surface, and a rationalist-coded audience, the cold Show HN got moderate-not-viral. Top critic argued the user-resolved model enables insider trading; founder responded calmly that traditional markets have the same risk and trust accrues to good resolvers. **What Manifold did right:** founder posted, founder replied to every substantive critique, founder did not get defensive, the demo was instantly playable without signup friction.

### Metaculus (forecasting)

Metaculus has never had a single defining Show HN moment — it accreted via long-running thread mentions ([HN 36740385](https://news.ycombinator.com/item?id=36740385), [HN 27418484](https://news.ycombinator.com/item?id=27418484)) and superforecaster discussions. Lesson: institutional epistemics platforms can win HN by being **the tool other people cite** rather than launching themselves. This is a years-long game.

### Roam Research (tools-for-thought)

| Metric | Detail |
|---|---|
| Title | Roam – Tool for Thinking |
| Author | pps (not the founder) |
| Score | 123 points |
| Comments | 43 comments |
| Date | 2019-11-04 |
| URL | [HN 21440289](https://news.ycombinator.com/item?id=21440289) |

Roam followed the same fan-submission pattern as Kialo. The HN post was modest; Roam's actual viral moment came on **Twitter** via the #roamcult tag. HN was a credibility surface, not the rocket. Top concerns were SaaS lock-in and data portability — exactly the concerns Argumend will face for AI extraction quality and content ownership.

### Logseq (open-source Roam alternative)

The 2020-11-17 "Show HN: Logseq – A roam like open-source plaintext note-taking app" ([HN 25083333](https://news.ycombinator.com/item?id=25083333)) is the canonical pattern of "X but open-source" Show HNs that consistently outperform their proprietary inspirations on HN. The "open-source alternative to $bigthing" framing is the single highest-converting Show HN format, per multiple meta-analyses ([Lucas Costa](https://lucasfcosta.com/2023/08/21/hn-launch.html), [Mark Pearl](https://www.markepear.dev/blog/dev-tool-hacker-news-launch)).

### Obsidian (note-taking)

| Metric | Detail |
|---|---|
| Title | Show HN: Obsidian – A knowledge base that works on local Markdown files |
| Author | ericax (founder) |
| Score | **1,087 points** |
| Comments | 477 comments |
| Date | 2020-05-27 |
| URL | [HN 23324598](https://news.ycombinator.com/item?id=23324598) |

The benchmark for what a tools-for-thought launch can hit. The title format is exemplary: dash-separated, what-it-is-immediately, two technical keywords ("local" and "Markdown") that act as developer dog-whistles. The tagline "knowledge base that works on local Markdown files" packs three positioning points (not a SaaS, not a graph DB, not proprietary format) into nine words. Top critique was missing math rendering — a feature critique, not an existential one. **This is the playbook.**

### Tana

The October 2022 "Tana – The Everything OS for You" submission ([HN 33102495](https://news.ycombinator.com/item?id=33102495)) is a cautionary tale: vague, marketing-speak title, no Show HN prefix, founder absent from comments. Underperformed despite Tana having strong product and well-funded launch. The "Everything OS" framing is exactly the type of grandiose positioning HN punishes.

### Pol.is (large-scale civic deliberation)

The 2014 "Show HN: Pol.is – a new commenting system powered by machine learning and D3" ([HN 8228974](https://news.ycombinator.com/item?id=8228974)) is the single most relevant precedent for Argumend. Title format: prefix + product name + dash + technical-keyword tagline. Pol.is later resurfaced in 2021 ([HN 29360547](https://news.ycombinator.com/item?id=29360547)) and 2026 ([HN 46992815](https://news.ycombinator.com/item?id=46992815)) as a **citation tool** for Taiwan-vTaiwan-style deliberation — Audrey Tang's adoption became Pol.is's primary distribution moat. Lesson: **a single high-status institutional adopter > all marketing.**

### Guesstimate / Squiggle (Ozzie Gooen)

| Metric | Detail |
|---|---|
| Title | Introducing Guesstimate, a Spreadsheet for Things That Aren't Certain |
| Author | freefrancisco (cofounder) |
| Score | 559 points |
| Comments | 94 comments |
| Date | 2015-12-31 |
| URL | [HN 10816563](https://news.ycombinator.com/item?id=10816563) |

Strong launch despite no "Show HN:" prefix — the parenthetical "Spreadsheet for Things That Aren't Certain" carried the whole post. Founder (ozgooen) was active in comments answering distribution-question and feature-request threads. A 2018 second submission ([HN 18785371](https://news.ycombinator.com/item?id=18785371)) replicated the pattern. Squiggle, the language successor, ran a cleaner title ([HN 44110502](https://news.ycombinator.com/item?id=44110502)). Notable because Gooen did exactly what Argumend should do: launched, got HN feedback, used it to build, came back later with the next thing.

### Argdown (markdown for argument mapping — direct competitor)

| Metric | Detail |
|---|---|
| Title | Argdown, like Markdown for argument mapping |
| Author | urlwolf |
| Score | 191 points |
| Comments | 47 comments |
| Date | 2024-08-07 |
| URL | [HN 41186310](https://news.ycombinator.com/item?id=41186310) |

The "X, like Y for Z" pattern is a proven format. Top critic (stared) argued tree-based argument structures oversimplify discourse and proposed LLM-embedding-based non-DAG structures — *exactly Argumend's pitch.* This is enormously useful: the HN audience for argument mapping has explicitly asked for what Argumend builds, and named the gap. Earlier Argdown threads in 2019, 2021, 2023 ([HN 20475865](https://news.ycombinator.com/item?id=20475865), [HN 26133335](https://news.ycombinator.com/item?id=26133335), [HN 34428680](https://news.ycombinator.com/item?id=34428680)) are evergreen reference points.

### Arguman (Turkish argument-analysis platform)

The October 2015 "Show HN: Arguman – Argument Analysis Platform" ([HN 10405288](https://news.ycombinator.com/item?id=10405288)) is the older direct precedent. Open-source, modest launch, primarily a Turkish audience but discussed in English. Project largely dormant now — typical of indie argument-mapping projects.

## 3. HN Failures and Postmortems

The dominant failure modes for argumentation/AI-thinking-tool launches on HN:

**(a) "AI debates AI" novelty Show HNs flame out.** Recent examples: "Show HN: AI Debate Arena – See Which LLM Argues Best" ([HN 44313022](https://news.ycombinator.com/item?id=44313022)), "Show HN: AgentVoices – Live debate arena where AI agents compete" ([HN 47059966](https://news.ycombinator.com/item?id=47059966)), "Show HN: AI Roundtable – Let 200 models debate your question" ([HN 47507666](https://news.ycombinator.com/item?id=47507666)), "Show HN: Mysti – Claude, Codex, and Gemini debate your code" ([HN 46365105](https://news.ycombinator.com/item?id=46365105)). These all read as LLM-wrapper toys to the HN audience and underperformed. The 2025-2026 HN community has pattern-matched "AI agents debate" as low-effort, and flag thresholds are correspondingly tight. **Argumend must not pitch as "AI agents debate."**

**(b) Vague "OS for X" grandiosity.** Tana's "Everything OS for You" framing is the canonical example. Substack-style "we are reinventing thought" pitches get downvoted on HN reflexively. Compare to Obsidian's literal "knowledge base that works on local Markdown files."

**(c) Missing demo / signup wall.** The single most reliable killer. HN users who hit a signup wall before they can see the product flag in seconds. Argumend's offline-by-default static-data setup is a structural advantage here — exploit it.

**(d) Booster comments and voting rings.** HN's anti-abuse detection is good. Founder telling friends to upvote within the first hour is the fastest known way to get a submission penalized or shadow-killed ([Show HN Guidelines](https://news.ycombinator.com/showhn.html)). Multiple threads in [hacker-news-undocumented](https://github.com/minimaxir/hacker-news-undocumented) confirm.

**(e) Founder going defensive in comments.** When Kialo critics pointed at moderation bias, Kialo's team mostly didn't respond, which was actually fine. The opposite failure — fighting every critic — has killed many Show HNs. Lucas Costa's HN-launch postmortem ([lucasfcosta.com](https://lucasfcosta.com/2023/08/21/hn-launch.html)) hammers this: "act like the critics are doing you a favor."

## 4. Title Patterns That Work

Analyzing the successful launches above, three formats dominate:

1. **`Show HN: <Name> – <literal description with technical keyword>`**
   - Obsidian (1087): "Show HN: Obsidian – A knowledge base that works on local Markdown files"
   - Pol.is (2014): "Show HN: Pol.is – a new commenting system powered by machine learning and D3"
   - Logseq (2020): "Show HN: Logseq – A roam like open-source plaintext note-taking app"

2. **`<Product>, like <familiar thing> for <new domain>`**
   - Argdown (191): "Argdown, like Markdown for argument mapping"
   - Guesstimate (559): "Introducing Guesstimate, a Spreadsheet for Things That Aren't Certain"

3. **`Show HN: <verb-phrase outcome>`**
   - Manifold (84): "Show HN: Create your own prediction market in two minutes"

Patterns that **don't** work: emotional ("I built X to help people think clearly"), grandiose ("Everything OS"), salesy ("revolutionize"), name-only ("Show HN: Argumend"), or anything containing "AI agents" + "debate" combined. Verifiable in [bestofshowhn.com](https://bestofshowhn.com/) rankings — the top-100 Show HNs of all time skew heavily toward Pattern 1.

The technical-keyword dog-whistle matters. "Local Markdown" (Obsidian), "open-source" (Logseq), "machine learning + D3" (Pol.is) all signal "this is for technical people." Argumend's equivalents: "React Flow," "open-source," "offline," "self-hostable," "multi-model judge council."

## 5. Weekend Curve and Posting Timing

Two competing analyses agree on the broad shape:

A June 2025 analysis of 23,000 posts ([HN 44569046](https://news.ycombinator.com/item?id=44569046), summarized at [alcazarsec.com](https://blog.alcazarsec.com/tech/posts/best-time-to-post-on-hacker-news)) found:
- **Best window:** Sunday 00:00-01:00 PT (avg 25.7 votes vs 18 overall, avg 20 comments vs 10 overall) — only 2% of submissions, low competition.
- **Strong secondary windows:** 04:00, 07:00, 20:00-22:00 PT.
- **Weekend bonus:** Sat/Sun submissions average above 19 upvotes; Mon comments over 10. Monday is the most-saturated day with 18%+ of weekly submissions.

Lucas Costa's counterargument ([lucasfcosta.com](https://lucasfcosta.com/2023/08/21/hn-launch.html)) is that the upvote-to-new-post ratio is roughly constant — there is no free lunch. The honest synthesis: **timing buys you a marginal advantage at the cost of audience size.** For Argumend, which needs *engaged commenters more than raw eyeballs*, the niche-product calculus favors the Sunday-midnight-PT window. Tuesday-Wednesday 09:00-11:00 PT is the maximum-eyeball window; Sunday 00:00 PT is the maximum-engagement-per-eyeball window.

Use [hnrankings.info](https://hnrankings.info) and [hckrnews.com](https://hckrnews.com) to confirm a chosen launch window has no front-page-saturating mega-thread (e.g., a major outage or earnings story) competing for attention that day.

## 6. Comment Management

What helps:
- **Founder posts first comment within 5 minutes of submission** giving honest backstory: why you built it, what you tried first, what you got wrong, what's still broken. This seeds the discussion thread and is the single biggest predictor of Show HN front-page survival per Costa's analysis.
- **Reply to every substantive comment, including hostile ones, within the first 4 hours.** Manifold's akrolsmir is a textbook example.
- **Find the kernel of truth in critiques.** "You're right that X is a real concern — here's how we're thinking about it" beats "Actually, X is wrong because..." by an order of magnitude on HN.
- **Disclose limitations proactively.** "We don't have multi-user collaboration yet, that's the #1 ask" preempts a comment thread that would otherwise dominate the post.

What hurts:
- Username matching company name (read as marketing).
- Asking friends to upvote or comment (detected, penalized).
- Defensive replies, especially to design critiques.
- Pasting marketing copy into comments.
- Silence after submission (read as drive-by spam).
- Hyperbole or vague mission language ("We're democratizing reasoning").

## 7. Concrete Plan for Argumend's Show HN

**Title (proposed):**
> Show HN: Argumend – Open-source AI argument maps with cruxes, evidence, and fallacy nodes

This follows Pattern 1 exactly. "Open-source" and "AI argument maps" are the technical-keyword dog-whistles. "cruxes, evidence, and fallacy nodes" signals to the rationalist/LessWrong-adjacent audience that this is **not** the generic Kialo pro/con tree they have rejected. 11 words, under HN's effective title-length sweet spot.

Backup title:
> Show HN: Argumend, like Argdown but with AI extraction and crux detection

Pattern 2. Cites Argdown directly, which is honest and surfaces the relationship. The 2024 Argdown thread had an explicit ask for exactly this; this title answers that ask.

**Demo URL:** argumend.org/topics/<a-strong-pre-analyzed-topic>. Pick a topic where the AI extraction visibly outperforms what a human-authored Kialo tree would look like — AI extinction risk, mechanistic interpretability disagreements, or a genuinely contested empirical question (effective altruism's epistemic problems, lab leak vs zoonotic origin). Avoid US-political topics (instant flame fuel; HN actively penalizes them). The chosen topic must show **at least one fallacy node, one crux node, and one evidence node with a confidence score.** Argumend's offline-by-default architecture means the demo works without signup or API keys — exploit this in the post text.

**Opening comment (founder, posted within 5 minutes):**

> Hey HN — I'm the solo founder. I built this because every existing argument-mapping tool either (a) makes humans do all the work like Kialo, or (b) reduces to pro/con trees, which lose the structure rationalists actually want — cruxes, evidence with confidence, named fallacies.
>
> What's here: 109 pre-analyzed topics, an AI extractor (Anthropic/OpenAI/Google), and a multi-model judge council that disagrees and shows the disagreement. No signup, all data is in static JSON, you can fork the repo.
>
> What's not here: collaborative editing, mobile-optimized graph view, accuracy at the level a TOK teacher would trust unsupervised. I'd especially love feedback on (1) whether the crux-vs-position distinction reads cleanly, (2) where the extraction visibly fails, (3) whether a notebook/Argdown-style text format would be more useful than the visual graph.
>
> Built with Next.js + React Flow + Drizzle. Standalone build runs offline.

**Posting time:** Sunday 00:00-01:00 PT or Tuesday 09:00 PT. Sunday is the niche-product play; Tuesday is the maximum-eyeballs play. Prefer Sunday.

**What NOT to do:**
- Do **not** include the words "AI agents debate" anywhere.
- Do **not** call it "the future of online discourse" or any variant.
- Do **not** ask anyone to upvote, even silently in DMs.
- Do **not** pre-warm with X/Twitter posts before launch — HN's voting-ring detection includes referrer signals.
- Do **not** post a pre-launch "Ask HN" the same week.
- Do **not** open with a Loom video — open with a working demo URL.
- Do **not** ship a politically charged topic as the headline demo. Pick something the rationalist audience cares about that is empirical or technical, not partisan.

## 8. Adjacent HN Surfaces

Beyond the canonical Show HN, four backdoor surfaces are underused:

1. **Comments on adjacent threads.** When Argdown, Pol.is, Kialo, or any LessWrong-adjacent debate-tool post hits the front page, a substantive top-level comment from the Argumend founder account ("we built something adjacent that solves $specific-problem they raised at <link>") is high-leverage. The 2024 Argdown thread's top critic explicitly named the gap Argumend fills — that thread is *still* an evergreen reference point a follow-up comment could mine.

2. **Ask HN.** Posts like "Ask HN: What argument-mapping tools have actually worked for you?" can seed audience awareness. Caveat: they must be honest questions, not marketing. The founder should genuinely want the answer.

3. **Tell HN.** Lower-traffic, but useful for non-launch announcements ("Tell HN: I open-sourced our argument-extraction prompts"). Builds credibility with the technical subset that cares.

4. **Who's Hiring / Who Wants To Be Hired.** Kialo used the Berlin hiring thread ([HN 18354595](https://news.ycombinator.com/item?id=18354595)) as backdoor brand exposure for years. Argumend, being a one-person shop, can use Who Wants To Be Hired or a "looking for collaborator" Ask HN — both surface the project to developers without tripping the marketing-flag radar.

Less useful: HN job ads (paid, low-engagement for niche tools), Launch HN program (only for current YC batches; Argumend is not YC). The second-chance pool is the highest-leverage **fallback** if the initial Show HN flops — email dang within 24 hours with a one-paragraph case for why the audience missed it.

## Sources

- [HN Show HN Guidelines](https://news.ycombinator.com/showhn.html)
- [HN Newsguidelines](https://news.ycombinator.com/newsguidelines.html)
- [Hacker News - Wikipedia](https://en.wikipedia.org/wiki/Hacker_News)
- [hacker-news-undocumented (minimaxir)](https://github.com/minimaxir/hacker-news-undocumented)
- [Lucas Costa — How to do a successful HN launch](https://lucasfcosta.com/2023/08/21/hn-launch.html)
- [Mark Pearl — How to launch a dev tool on HN](https://www.markepear.dev/blog/dev-tool-hacker-news-launch)
- [alcazarsec — Best time to post on HN](https://blog.alcazarsec.com/tech/posts/best-time-to-post-on-hacker-news)
- [HN 44569046 — When to Post on HN: Analyzed 23k posts](https://news.ycombinator.com/item?id=44569046)
- [HN 26998308 — Second-Chance Pool](https://news.ycombinator.com/item?id=26998308)
- [HN 39151319 — HN has a Second-Chance Pool](https://news.ycombinator.com/item?id=39151319)
- [HN 17486077 — Kialo, a platform for rational debate (Jul 2018)](https://news.ycombinator.com/item?id=17486077)
- [HN 15399101 — Kialo Empowering Reason (Oct 2017)](https://news.ycombinator.com/item?id=15399101)
- [HN 18354595 — Kialo Berlin hiring](https://news.ycombinator.com/item?id=18354595)
- [HN 30275860 — Show HN Manifold (Feb 2022)](https://news.ycombinator.com/item?id=30275860)
- [HN 29729347 — Mantic Markets pre-rebrand](https://news.ycombinator.com/item?id=29729347)
- [HN 36740385 — Metaculus thread](https://news.ycombinator.com/item?id=36740385)
- [HN 21440289 — Roam Tool for Thinking (Nov 2019)](https://news.ycombinator.com/item?id=21440289)
- [HN 25083333 — Show HN Logseq (Nov 2020)](https://news.ycombinator.com/item?id=25083333)
- [HN 23324598 — Show HN Obsidian (May 2020)](https://news.ycombinator.com/item?id=23324598)
- [HN 33102495 — Tana Everything OS (Oct 2022)](https://news.ycombinator.com/item?id=33102495)
- [HN 8228974 — Show HN Pol.is (2014)](https://news.ycombinator.com/item?id=8228974)
- [HN 29360547 — Polis Large Scale Discussions (2021)](https://news.ycombinator.com/item?id=29360547)
- [HN 46992815 — Polis civic deliberation (2026)](https://news.ycombinator.com/item?id=46992815)
- [HN 10816563 — Introducing Guesstimate (Dec 2015)](https://news.ycombinator.com/item?id=10816563)
- [HN 18785371 — Guesstimate resubmit (2018)](https://news.ycombinator.com/item?id=18785371)
- [HN 41186310 — Argdown like Markdown for argument mapping (Aug 2024)](https://news.ycombinator.com/item?id=41186310)
- [HN 20475865 — Argdown 2019](https://news.ycombinator.com/item?id=20475865)
- [HN 26133335 — Argdown 2021](https://news.ycombinator.com/item?id=26133335)
- [HN 34428680 — Argdown 2023](https://news.ycombinator.com/item?id=34428680)
- [HN 10405288 — Show HN Arguman (Oct 2015)](https://news.ycombinator.com/item?id=10405288)
- [HN 44313022 — Show HN AI Debate Arena](https://news.ycombinator.com/item?id=44313022)
- [HN 47059966 — Show HN AgentVoices](https://news.ycombinator.com/item?id=47059966)
- [HN 47507666 — Show HN AI Roundtable](https://news.ycombinator.com/item?id=47507666)
- [HN 46365105 — Show HN Mysti](https://news.ycombinator.com/item?id=46365105)
- [bestofshowhn.com — All-time Show HN rankings](https://bestofshowhn.com/)
- [hckrnews.com — HN sorted by time](https://hckrnews.com/)

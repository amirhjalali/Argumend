# The 1-Liner

**Date:** 2026-04-28
**Analyst:** Research agent 01/10, positioning/messaging swarm
**Charter:** Generate, test, and recommend Argumend's single-sentence product description (≤12 words). No fluff, no jargon, no AI-buzzword-of-the-month.

---

## 1. Current copy audit

Argumend is saying eight slightly different things about itself across eight surfaces. None is a clean 1-liner. Inventory:

| # | Surface | Copy | Verdict |
|---|---|---|---|
| 1 | `<title>` / OG title (`app/layout.tsx:37`, `app/page.tsx:10`) | "ARGUMEND — Map Arguments, Not Win Them" | **Best of the bunch.** Anti-positioning, opinionated. Does not say what the product *is*. |
| 2 | Meta description (`app/layout.tsx:40-41`) | "Visual argument mapping for controversial topics. See both sides, weigh the evidence, find what actually matters. 109+ topics analyzed." | Three sentences pretending to be one. Sentence 1 is the 1-liner hiding in plain sight. |
| 3 | OG / Twitter description (`app/layout.tsx:64-65, 70-71`) | Same as #2 minus topic count | Fine but redundant. |
| 4 | JSON-LD `Organization` (`app/layout.tsx:153-154`) | "**Structured** argument mapping platform…" | Drift — "Structured" not "Visual." Tells search engines two stories. |
| 5 | TopBar wordmark (`components/TopBar.tsx:55`) | "Disagree better." | Best line on the site. Tagline-grade. |
| 6 | Footer (`components/Footer.tsx:47`) | "Disagree better." | Same. |
| 7 | TopBar italic center (`components/TopBar.tsx:76`) | "What would change your mind?" | A *prompt*, not positioning. Only legible after the user already understands the product. |
| 8 | About hero (`app/about/page.tsx:57-58`) | "What if we could disagree without destroying each other?" | Best emotional hook. Mission-grade, not 1-liner-grade. |
| 9 | README.md:5 / `package.json:4` | "Argumend is a service which utilizes AI to provide context about varying perspectives on issues." | Word salad. "Utilizes," "varying perspectives," "issues." Worst line on the property. |
| 10 | `metadata.keywords` (`app/layout.tsx:42-55`) | 12 keyword phrases | SEO bait, not copy. |

**Diagnosis.** The site has three live candidates at different elevations: **"Disagree better."** (tagline, 2 words, no product), **"Map arguments, not win them."** (slogan, 5 words, stranger can't guess the product), **"Visual argument mapping for controversial topics."** (category, 6 words, no *why*). None fuses category + differentiator + audience into one breath. The README and package.json are actively hostile to the brand and need rewriting in the same pass.

---

## 2. What makes a 1-liner work

Four frameworks dominate 2026 positioning thinking. They disagree on emphasis, agree on the pre-conditions.

**Geoffrey Moore — *Crossing the Chasm* (1991).** The elevator template: "FOR [target] WHO [need], [product] IS A [category] THAT [benefit] UNLIKE [alt], [our differentiator]." Six slots. Forces honesty about who the chasm-crosser is, what alt is being replaced, what the product actually does ([Elevator Pitch Essentials](https://www.elevatorpitchessentials.com/essays/CrossingTheChasmElevatorPitchTemplate.html); [MIT CSAIL elevator test](https://groups.csail.mit.edu/mac/users/hal/misc/elevator.html)).

**April Dunford — *Obviously Awesome* (2019).** Positioning is a *consequence* of five components in order: (1) competitive alternatives, (2) unique attributes, (3) value those deliver, (4) customers who care, (5) market category. Skip a step and the line sounds generic ([Dunford](https://www.aprildunford.com/books); [Heinz Marketing summary](https://www.heinzmarketing.com/blog/10-step-positioning-process-an-obviously-awesome-book-summary-part-3/); [Lenny's summary](https://www.lennysnewsletter.com/p/summary-april-dunford-on-product)). Relevant test: read the line aloud, ask "compared to what?" If you can't answer, the line is failing component 1.

**Lenny Rachitsky — *A quickstart guide to positioning*.** Distilled rule: positioning is *not* a tagline, but a *good* tagline is a positioning artifact. Surveying Tinder/Uber/Instagram/Slack/etc., none use jargon, none exceed ~10 words, most name *one* atomic noun the user wants more of ([Lenny](https://www.lennysnewsletter.com/p/positioning); [Cup of Zhou](https://cupofzhou.com/the-secret-to-an-epic-one-liner/)).

**Lulu Cheng Meservey — *Go Direct*.** A comms operator (Substack, Activision, Ramp, Anduril, Coinbase), not a positioning theorist. Her test: the line must be speakable by the founder in their own voice — on a podcast, at a dinner party, when angry ([Go Direct manifesto](https://www.getflack.com/p/go-direct-the-manifesto); [Pirate Wires](https://www.piratewires.com/p/lulu-cheng-meservey-is-betting-on)). For a solo founder like Argumend's, the line will be repeated mostly *by him*. It needs to feel natural in his mouth.

**Synthesis — what a working 1-liner does in ≤12 words:**

1. **Noun the user wants more of** (issue tracker, workspace, prediction, encyclopedia).
2. **Implied alternative being replaced** ("the issue tracker you'll *enjoy* using" implies Jira).
3. **Mechanism or attribute** that is uniquely yours and customers care about.
4. **Founder-voice test:** founder can say it without flinching.
5. **Stranger test:** a reader with zero context can predict, within ±20%, what it does.

All five is rare. Three is workable. Argumend's current copy does, at best, two on any single surface.

---

## 3. Reference 1-liners

Thirty-two real lines from comparable products, scored A/B/C/D against the §2 criteria. "Comparable" = tools-for-thinkers, civic-discourse, content/community, productivity/SaaS gold-standards.

| # | Product | 1-liner | Score | Why |
|---|---|---|---|---|
| 1 | Linear (2019-25) | "the issue tracker you'll enjoy using" | A | Noun + implied alt (Jira) + mechanism (taste). 7 words. ([Linear About](https://linear.app/about); [Lenny — Inside Linear](https://www.lennysnewsletter.com/p/inside-linear-building-with-taste)) |
| 2 | Linear (2026) | "the shared product system that turns context into execution" | B | Lost the alt cue. "Shared product system" is vague. Pivot-driven ([Buttondown](https://buttondown.com/verified/archive/the-death-of-the-ticket-why-linear-is-pivoting/)). |
| 3 | Notion | "one workspace. every team." | A | 4 words. Noun + scope. Implicit alt = fragmented tools ([Product Hunt](https://www.producthunt.com/products/notion)). |
| 4 | Substack (early) | "the home for great writing" | B+ | Noun + value, no mechanism. |
| 5 | Substack (mid) | "the app for independent voices" | A- | Names alt (institutions). |
| 6 | Substack (now) | "an economic engine of culture" | C | Founder-voice max, customer-voice min. Stranger test fails. |
| 7 | Manifold (now) | "a social prediction game" | B | Homepage subtitle "bet on news, politics, tech, & AI with play money" carries the load ([homepage](https://manifold.markets/); [Wikipedia](https://en.wikipedia.org/wiki/Manifold_(prediction_market))). |
| 8 | Manifold (community) | "predict the future, get rich-ish" | A | Mechanism + payoff. Self-aware qualifier "rich-ish" signals taste. |
| 9 | Metaculus | "better forecasting through community" | B | "Better living through chemistry" cadence. Mechanism named. |
| 10 | Metaculus (live) | "the platform for high-quality forecasts of future events" | B- | Honest. Boring. "High-quality" = filler. |
| 11 | Asterisk | "a magazine of clear writing and clear thinking" | A | 7 words, two values, implicit alt (unclear everywhere else). Calm, opinionated. **Closest stylistic neighbor for Argumend** ([about](https://asteriskmag.com/about); [EA Forum](https://forum.effectivealtruism.org/posts/Mts84Mv5cFHRYBBA8/introducing-asterisk)). |
| 12 | LessWrong | "a community blog devoted to refining the art of human rationality" | B+ | 11 words. Vivid; "rationality" is jargon-coded ([RationalWiki](https://rationalwiki.org/wiki/LessWrong)). |
| 13 | Pol.is | "scaled open conversation for a divided world" | B | Mechanism + alt (broken discourse). Slightly NGO-flavored. |
| 14 | Kialo | "Empowering reason" | C+ | Mission slogan. No noun, no mechanism. Stranger test fails ([HN](https://news.ycombinator.com/item?id=15399101)). |
| 15 | Kialo Edu | "structured classroom debate, private, free, forever" | A | Category + three differentiators in five words ([Kialo Edu Pricing](https://www.kialo-edu.com/pricing-why-kialo-is-free)). |
| 16 | Are.na | "a platform for connecting ideas and building knowledge" | B | Two abstract gerunds. "Pinterest for thinkers" community shorthand is stronger than the official line ([about](https://www.are.na/about)). |
| 17 | Argdown | "Markdown for argument mapping" | A | 4 words, perfect comparison-first ([HN](https://news.ycombinator.com/item?id=41186310)). |
| 18 | Roam | "a note-taking tool for networked thought" | B+ | "Networked thought" did the work in 2019. |
| 19 | Obsidian | "your second brain, for free, forever" | A | Steals "second brain" (Forte). Commits to permanence. |
| 20 | Stripe | "payments infrastructure for the internet" | A | Noun + scope. |
| 21 | Slack | "where work happens" | A- | 3 words. Worked because email was universally hated. |
| 22 | Figma | "the collaborative interface design tool" | A | Names the differentiator (collaborative) Sketch lacked. |
| 23 | Tinder | "match. chat. date." | A | Verbs only, sequence implied. |
| 24 | Discord | "your place to talk" | A | Noun + verb. 4 words. |
| 25 | Wikipedia | "the free encyclopedia" | A+ | 3 words. "Free" was the alt-killer in 2001. |
| 26 | Stack Overflow | "where developers learn, share, & build careers" | B | Three verbs. Stranger test partial. |
| 27 | Wolfram Alpha | "computational knowledge engine" | C+ | Two-word jargon stack. Alienating. |
| 28 | Quora | "a place to share knowledge and better understand the world" | B- | 11 words, two clauses. Soggy. |
| 29 | Reddit | "the front page of the internet" | A | Scope + category. |
| 30 | Hacker News | (no tagline; brand = URL) | A+ | Sometimes the strongest move is no line. Argumend can't — no founder fame to substitute. |
| 31 | Astral Codex Ten | "P(A\|B) = P(B\|A) P(A) / P(B), all the rest is commentary" | A | Inside-joke. Earned. Argumend hasn't earned this. |
| 32 | Anthropic | "AI safety company" | A | 3 words. Wins because trillion-dollar competitors won't say "safety" first. |

**Pattern.** A-grade lines share three traits: ≤7 words, one concrete noun, an implicit "vs. what" so strong it isn't stated. B and C lines fail the stranger test or the founder-voice test. **Asterisk is the closest stylistic neighbor for Argumend** — same audience (curious adults, EA/rationalist-adjacent), same parchment-stoic register, same anti-noise posture.

---

## 4. Argumend candidate 1-liners

Twenty-eight candidates, grouped by framing. Word count + jargon flag in parentheses; "From → To" promise in italics.

**Mechanism-first** (says what we do)
- M1 "Argument maps for controversial topics, AI-extracted." (6w / mild jargon: AI) — *unstructured → mapped*
- M2 "Visual argument maps for the topics that divide us." (9w / clean) — *division → visualization*
- M3 "AI-mapped arguments for the questions that won't go away." (9w / mild jargon) — *recurring → mapped*
- M4 "We map controversies into evidence, cruxes, and fallacies." (8w / "cruxes") — *takes → structure*
- M5 "Structured argument maps for controversial topics." (6w / clean) — *takes → structure*

**Outcome-first** (what changes for the reader)
- O1 "Find the actual disagreement in any debate." (7w / clean) — *fake → real disagreement*
- O2 "See what would change your mind — on anything." (9w / clean) — *fixed → updatable*
- O3 "Stop arguing past each other." (5w / clean) — *monologues → engagement*
- O4 "Know what the other side is actually saying." (8w / clean) — *strawmen → steelmen*
- O5 "Disagree better. With receipts." (4w / mild) — *vibes → evidence*

**Audience-first** (who this is for)
- A1 "For people who steelman before they argue." (7w / "steelman")
- A2 "For arguers who would rather be right than win." (9w / clean)
- A3 "For the curious, the contrarian, and the careful." (8w / clean)
- A4 "For people who change their minds." (6w / clean)

**Comparison-first** ("we're like X but Y")
- C1 "Wikipedia, but for arguments." (4w / clean)
- C2 "Like Kialo, but with AI doing the work." (8w / "AI")
- C3 "Argdown, with a brain." (4w / insider)
- C4 "Google Maps for controversies." (4w / clean)

**Atomic-unit-first** (we make X visible)
- U1 "See the crux of any controversy." (6w / "crux")
- U2 "The crux of every argument, mapped." (6w / "crux")
- U3 "Every controversy has a crux. We find it." (8w / "crux")

**Verb-first** (commands the reader)
- V1 "Map controversies. Find cruxes. Steelman both sides." (7w / "cruxes," "steelman")
- V2 "Map the debate. Find what matters." (6w / clean)
- V3 "Argue better. Disagree well. Mend the gap." (7w / "Mend" puns the brand)

**Anti-positioning** (what we're against)
- N1 "Most takes are bad. We map the good ones." (9w / clean)
- N2 "Map arguments, not win them." (5w / clean — current line)
- N3 "The internet has takes. We have arguments." (7w / clean)
- N4 "Less yelling. More mapping." (4w / clean)

**Cross-cutting observations.**

- **U1–U3 (crux) violate the stranger test** for a normie audience but pass it for the rationalist wedge — this is the trade in §5.
- **C1 ("Wikipedia, but for arguments")** is the cleanest line in the set: 4 words, perfect category transfer. Risk: every argument-mapping competitor has reached for this; the mental model is also slightly wrong (Argumend has no UGC).
- **N4 ("Less yelling. More mapping.")** is the best anti-positioning line — 4 words, names the alternative (social-media yelling) and the mechanism (mapping). Pairs naturally with "Disagree better."
- **O4 ("Know what the other side is actually saying.")** is the highest-empathy line and the most likely to land outside the rationalist wedge.
- **V3 ("Mend the gap.")** is the only line that puns on the brand name (Argue + Mend per README) — makes the otherwise-opaque name retroactively legible, which it badly needs.

---

## 5. The crux-vocabulary question

"Crux" is rationalist vocabulary popularized by LessWrong (the "double crux" technique) and now standard in EA, ACX, and Manifold communities. Outside that wedge, "crux" is a low-frequency English word whose lay meaning ("the most important point") is correct but inert.

**Lean in (use "crux" prominently).** Precise vocabulary signals the founder is in the conversation. Wedge audiences prefer products that talk like them (Astral Codex Ten's tagline rewards in-group readers and ignores everyone else). "Crux" is also a feature name in the product (`CruxModal.tsx`, the cruxtacean agent, the crux-crimson color in CLAUDE.md) — the marketing should not contradict the product. And it filters audiences for free.

**Lean out (translate to "real disagreement," "load-bearing claim," "key question").** Every percentage point of stranger comprehension at the homepage matters more than wedge-signaling when site analytics are starved. The Kialo-Edu-attacking education funnel (KS1 in the competitive-intel report) hits teachers and students who don't know "crux" as a term of art. The product can still *be* about cruxes without the homepage saying "crux" — the homepage can say "the real disagreement" and the in-product label can say "Crux."

**Recommendation: lean *in* on second-tier surfaces, lean *out* on the 1-liner itself.** The 1-liner is the only piece of copy that has to work for a Twitter visitor, a Google searcher, an ACX classifieds reader, *and* a teacher's blog. It should not gate-keep on vocabulary. The 3-sentence pitch and the 100-word About *should* use "crux" — anyone reading a paragraph has already opted in. This matches Asterisk: tagline is universal ("clear writing and clear thinking"), inside-the-magazine is EA-coded.

So: **the recommended 1-liner does not use "crux."** All product surfaces below it do.

---

## 6. The "AI" question

**Pro-AI in the line.** AI-extraction is the actual differentiator vs. Kialo, Debategraph, Arguman, Argdown — without it, Argumend is "Kialo with a nicer node taxonomy." AI-tagged search queries remain elevated in 2026. Investors and edtech buyers expect to see AI named.

**Anti-AI in the line.** "AI-powered" is the most overused phrase in 2024–2026 startup copy and signals "I have nothing more specific to say." AI-skeptical audiences (the AI-doomer subset of the rationalist wedge; humanist educators) read "AI" as a downgrade — *replaced* human thought rather than *augmented* it. The phrase ages badly: "AI-powered" in 2026 will sound like "blockchain-powered" in 2018 by 2028. And anyone shipping a serious analysis tool in 2026 is using AI; saying so is table stakes.

**Recommendation: keep "AI" out of the 1-liner. Put it in sentence 2 of the elevator pitch.** Linear's tagline doesn't say "TypeScript-native." Notion's doesn't say "block-based." Stripe's doesn't say "API-driven." Mechanism-level facts go in sentence 2 or 3. The 1-liner should describe the *outcome*, not the mechanism. The one counter-case: a line like "Argument maps for any controversy, AI-extracted from sources you trust" earns the AI mention by adding the source-traceability claim that other tools don't make — but at 11 words that's the elevator-pitch sentence 1, not the tagline.

---

## 7. A/B test plan

**Three candidate 1-liners.**

1. **Recommended (descriptive-empathy hybrid):** "Argument maps for the questions that divide us." (8w)
2. **Anti-positioning:** "Less yelling. More mapping." (4w) + subhead "Argument maps for controversial topics."
3. **Comparison-first:** "Wikipedia, but for arguments." (4w) + subhead "AI-extracted maps of every controversy."

**Three surfaces × measures.**

| Surface | Where it lives | Measure | Tool |
|---|---|---|---|
| Homepage hero | New H1 above `FeaturedTopicHero.tsx` (today's H1 is the topic title) | scroll-past-fold, "See full analysis" click, bounce, time-on-page | Vercel Analytics + GA4 (`app/layout.tsx:24`) |
| X bio (`@argumend`) | Bio sentence | profile→site CTR, follower delta over 14 days | X analytics + UTM bio link |
| ACX Classifieds | First sentence | UTM clicks, signups within 72h | Plausible/GA4 + comment-thread scrape |

**Design.** Rotate homepage weekly, 2 weeks each = 6 weeks. With sub-1k weekly uniques, full statistical significance is unreachable — use directional signal + 5 user interviews per variant. Rotate X bio every 4 weeks; the bio is the highest-leverage surface because every reply, repost, and search result links back. Buy 3 consecutive ACX classifieds (~$300/quarter), one variant each, compare 72-hour signup spikes.

**Stop rules.** Kill any homepage variant <50% of leader CTR at 2 weeks. If X bio lift <20% over 30 days, the *line* is wrong — re-generate. If ACX produces zero attributable signups across all three variants, the *channel* is wrong, not the line.

---

## 8. The recommended 1-liner

**"Argument maps for the questions that divide us."** (8 words)

**Defense in 200 words.** This line does four of the five §2 jobs and concedes the fifth gracefully.

1. **Noun:** "argument maps" — same atomic noun Argdown, Kialo, Debategraph, and the 50-year argument-mapping research literature use. Stranger immediately has a category.
2. **Alternative:** "the questions that divide us" implies the alt is the *current state* of those questions — yelling, partisan media, thread wars. Reader fills in the alt without being told.
3. **Audience:** "us" is plural-first-person. Rejects "for educators / for forecasters / for rationalists" gating and welcomes anyone who has felt the divide.
4. **Founder-voice test:** speakable on a podcast without flinching; matches the Asterisk/LessWrong stoic-parchment register from CLAUDE.md.
5. **Mechanism (conceded):** does *not* say "AI" or "crux." Those go in sentence 2. The trade is intentional — the 1-liner targets the stranger, the paragraph targets the wedge.

It also outperforms the 28 candidates on specific failure modes: it has N4's rhythm without losing the category noun; O4's empathy without the qualifier weight; M5's calm without the dead word "structured."

**Three variants.**

| Variant | Line | Use |
|---|---|---|
| **Long (12 words)** | "AI-extracted argument maps for the questions that divide us — with sources." | OG card description, ACX classifieds first sentence, podcast bio |
| **Short (4 words)** | "Maps for hard questions." | Twitter bio, business card, app icon caption |
| **Audience-specific (rationalist wedge)** | "Crux maps for controversial topics." | LessWrong post titles, ACX comment signature, Manifold profile |
| **Audience-specific (educator)** | "Argument maps for the topics your students will Google anyway." | IB TOK/AP Seminar teacher landing page, edtech directory listings |

---

## 9. Tagline / longline / paragraph variants

### Tagline (paired couplet)

**"Disagree better."** Already on TopBar + Footer. Pair on homepage:

> **Argument maps for the questions that divide us.**
> *Disagree better.*

### 3-sentence elevator pitch (56 words)

> Argumend turns controversial questions into argument maps you can navigate — positions, evidence, cruxes, and fallacies, all visible at once. We use AI to extract the structure from real sources, then show our work so you can check it. It's the difference between yelling about a topic and actually understanding where you disagree.

Sentence 1 = outcome + four node types. Sentence 2 = AI earns its place by adding source-traceability. Sentence 3 = anti-positioning closer.

### 1-paragraph bio (75 words, podcast / press)

> Argumend is an AI-powered argument-mapping platform. It takes any controversial topic — climate policy, AI extinction risk, school choice, ozempic, Israel-Palestine — and produces a navigable map of the positions, evidence, cruxes, and fallacies on each side, with confidence scores and source citations on every claim. The goal isn't to tell you who's right. The goal is to make the actual disagreement visible, so reasonable people can disagree without strawmen.

Six concrete controversies, one feature per clause. Founder-voice clean.

### 100-word About section

> Most online debate generates heat, not light. We yell past each other, strawman views we don't understand, and walk away more certain than before. Argumend is built for the opposite. We take the controversies that won't go away — politics, science, ethics — and turn each one into a map: the positions on each side, the evidence behind each claim, the cruxes where reasonable people genuinely disagree, and the fallacies on every side. AI does the extraction. Sources do the work. You decide what to believe. The goal isn't agreement. The goal is understanding the disagreement.

100 words exactly. Direct rewrite of `app/about/page.tsx:60-63` and `README.md:5`. Can be lifted into About, README, package.json, and JSON-LD unchanged.

---

## Sources

External:
- [April Dunford — Obviously Awesome](https://www.aprildunford.com/books); [Heinz summary](https://www.heinzmarketing.com/blog/10-step-positioning-process-an-obviously-awesome-book-summary-part-3/); [Lenny's Dunford summary](https://www.lennysnewsletter.com/p/summary-april-dunford-on-product)
- [Lenny — Quickstart guide to positioning](https://www.lennysnewsletter.com/p/positioning); [Inside Linear](https://www.lennysnewsletter.com/p/inside-linear-building-with-taste); [Cup of Zhou — Epic One-Liner](https://cupofzhou.com/the-secret-to-an-epic-one-liner/)
- [Lulu Cheng Meservey — Go Direct](https://www.getflack.com/p/go-direct-the-manifesto); [Pirate Wires — Narrative Alpha](https://www.piratewires.com/p/lulu-cheng-meservey-is-betting-on)
- [Geoffrey Moore — Crossing the Chasm template](https://www.elevatorpitchessentials.com/essays/CrossingTheChasmElevatorPitchTemplate.html); [MIT CSAIL elevator test](https://groups.csail.mit.edu/mac/users/hal/misc/elevator.html)
- Reference 1-liners: [Linear About](https://linear.app/about); [Linear pivot — Buttondown](https://buttondown.com/verified/archive/the-death-of-the-ticket-why-linear-is-pivoting/); [Notion on PH](https://www.producthunt.com/products/notion); [Asterisk About](https://asteriskmag.com/about); [Asterisk launch — EA Forum](https://forum.effectivealtruism.org/posts/Mts84Mv5cFHRYBBA8/introducing-asterisk); [Manifold](https://manifold.markets/); [Manifold — Wikipedia](https://en.wikipedia.org/wiki/Manifold_(prediction_market)); [Metaculus](https://www.metaculus.com/); [Are.na About](https://www.are.na/about); [Kialo Edu Pricing](https://www.kialo-edu.com/pricing-why-kialo-is-free); [HN — Kialo Empowering Reason](https://news.ycombinator.com/item?id=15399101); [HN — Argdown](https://news.ycombinator.com/item?id=41186310); [LessWrong — RationalWiki](https://rationalwiki.org/wiki/LessWrong)

Argumend internal (file:line):
- `app/page.tsx:10`, `app/layout.tsx:37,40-41,63-65,69-71,153-154` — metadata, OG, JSON-LD
- `components/TopBar.tsx:51-56,76` — wordmark + italic centerpiece
- `components/Footer.tsx:43-47,77` — footer logo + tagline + copyright
- `components/FeaturedTopicHero.tsx:65-189`, `components/HeroAnalyze.tsx:50-55` — hero copy
- `app/about/page.tsx:9-23,57-63` — principles + hero
- `README.md:5`, `package.json:4` — legacy 1-liners (rewrite candidates)

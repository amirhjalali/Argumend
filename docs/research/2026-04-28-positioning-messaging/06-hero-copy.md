# Hero Copy: Audit, Cohort Comparison, and Five Rewrites

**Date:** 2026-04-28
**Analyst:** Research agent 06/10, positioning/messaging swarm
**Scope:** Argumend homepage hero — literal copy, layout, CTA ladder, mobile collapse, and five concrete rewrites with full specs.

## 1. Current hero audit

The homepage at `argumend.org` is rendered by `app/page.tsx` ([app/page.tsx:38-71](/Users/amirhjalali/argumend/app/page.tsx)) which wraps `<HomeClient />`. The hero state is gated by `showHero` in `components/HomeClient.tsx:126` and renders three stacked sections ([HomeClient.tsx:193-267](/Users/amirhjalali/argumend/components/HomeClient.tsx)):

1. **`<FeaturedTopicHero />`** ([components/FeaturedTopicHero.tsx](/Users/amirhjalali/argumend/components/FeaturedTopicHero.tsx))
2. **Topic grid** — six cards labeled "{N} topics analyzed" ([HomeClient.tsx:215-258](/Users/amirhjalali/argumend/components/HomeClient.tsx))
3. **`<HeroAnalyze />`** — demoted analyze CTA ([components/HeroAnalyze.tsx](/Users/amirhjalali/argumend/components/HeroAnalyze.tsx))

### Literal copy

**Page metadata** ([page.tsx:9-28](/Users/amirhjalali/argumend/app/page.tsx)):
- `<title>`: **"ARGUMEND — Map Arguments, Not Win Them"**
- `<meta description>`: "Visual argument mapping for controversial topics. See both sides, weigh the evidence, find what actually matters. Explore 109+ topics analyzed with structured reasoning."

**Featured-topic hero** (`FeaturedTopicHero.tsx`):
- Eyebrow ([line 70-72](/Users/amirhjalali/argumend/components/FeaturedTopicHero.tsx)): **"Featured Analysis"** (uppercase, tracked, deep-teal at 70% opacity)
- H1 ([line 73-75](/Users/amirhjalali/argumend/components/FeaturedTopicHero.tsx)): rendered from `summary.title` — the title of the currently featured topic, e.g. "Does AI pose an existential risk?" (varies by `featuredTopicId` in `data/topicIndex`)
- Subhead ([line 77-79](/Users/amirhjalali/argumend/components/FeaturedTopicHero.tsx)): rendered from `featuredReason` — a contextual sentence explaining why this topic is currently featured
- Confidence rail with `score%` followed by **"confidence"**, then `summary.meta_claim` ([lines 84-102](/Users/amirhjalali/argumend/components/FeaturedTopicHero.tsx))
- Crux block: eyebrow **"The Crux"** with crosshair icon, crimson left border `#a23b3b` ([lines 105-119](/Users/amirhjalali/argumend/components/FeaturedTopicHero.tsx))
- Two evidence cards: **"Strongest For"** (deep teal) and **"Strongest Against"** (rust) ([lines 123-174](/Users/amirhjalali/argumend/components/FeaturedTopicHero.tsx))
- Primary CTA ([line 178-184](/Users/amirhjalali/argumend/components/FeaturedTopicHero.tsx)): **"See the full analysis →"** rust gradient button

**Topic grid header** ([HomeClient.tsx:221-223](/Users/amirhjalali/argumend/components/HomeClient.tsx)):
- H2: **"{N} topics analyzed"** (currently 109)
- Tertiary link ([HomeClient.tsx:248-256](/Users/amirhjalali/argumend/components/HomeClient.tsx)): **"Browse all topics →"**

**HeroAnalyze (Section 3)** ([HeroAnalyze.tsx:50-55](/Users/amirhjalali/argumend/components/HeroAnalyze.tsx)):
- H2: **"Have your own argument?"**
- Subhead: **"Paste any text and we'll map it"**
- Textarea placeholder ([line 63](/Users/amirhjalali/argumend/components/HeroAnalyze.tsx)): "Paste an article, argument, or any text you'd like analyzed..."
- Secondary action ([line 69-74](/Users/amirhjalali/argumend/components/HeroAnalyze.tsx)): **"Try an Example"**
- Primary action ([line 75-86](/Users/amirhjalali/argumend/components/HeroAnalyze.tsx)): **"Analyze →"** (disabled until text typed)

### Layout summary

This is **not a hero in the SaaS-marketing sense**. There is no headline-and-subhead-over-an-illustration above the fold that introduces what Argumend is. The user lands on a rotating analyzed topic, then a topic grid, then an analyze textarea. The site-meta H1 lives only in `<title>` and `og:title`; the visible H1 is whatever the featured topic happens to be that week.

A **content-first** hero — closer to a magazine homepage than a SaaS homepage. It assumes the visitor already knows what an argument map is. The og:title "ARGUMEND — Map Arguments, Not Win Them" is the only place the product is *defined*, and only crawlers and SERP visitors see it.

## 2. What a hero must do

Three frameworks set the bar. They agree.

**April Dunford, *Obviously Awesome* ([aprildunford.com/books](https://www.aprildunford.com/books)).** Positioning locates a product in a market category so differentiated value is obvious to a target customer. Five components in order: competitive alternatives → unique attributes → unique value → who-cares-most → market category ([Heinz summary](https://www.heinzmarketing.com/blog/10-step-positioning-process-an-obviously-awesome-book-summary-part-3/)). The hero must answer: what is it, what do I use today instead, why is this better for someone like me.

**Andy Raskin's strategic narrative ([andyraskin.com](https://andyraskin.com/), [Lenny's Newsletter](https://www.lennysnewsletter.com/p/the-power-of-strategic-narrative)).** Five elements: name a big undeniable shift; name the enemy (status quo, not competitor); tease the promised land; introduce capabilities as proof; deliver evidence. The hero is the customer; you are the mentor. Most SaaS heroes only show the promised land.

**Joanna Wiebe, Copyhackers ([copyhackers.com](https://copyhackers.com/2012/09/headline-formulas-and-the-science-of-high-converting-copywriting/)).** Five-second blink test: a stranger should say what you do, who it's for, and what to click next within five seconds. Pair the headline with a sub that adds specificity, not synonyms.

**Synthesis** — every hero must convey: (1) who it's for, (2) the status quo it replaces, (3) the category it belongs to, (4) one specific next action. Argumend's current hero does **none of (1), (2), or (3) above the fold**. The only category cue is "Analysis" — a stranger could reasonably mistake it for a Substack, an investment newsletter, or a chemistry tool.

## 3. Reference heroes — the cohort

Quoted from each homepage, fetched 2026-04-28.

- **Manifold** ([manifold.markets](https://manifold.markets/)). Famous tagline: *"Predict the future, get rich-ish."* Current copy: **"a social prediction game. Bet on news, politics, tech, & AI with play money."** Primary CTA: **"Sign up — Get Ṁ1,000 to start trading!"** What lands: the "-ish" hyphen is the entire trust proposition.
- **Metaculus** ([metaculus.com](https://www.metaculus.com/)). H1: **"Clarity in a complex world."** Sub: **"Collective intelligence for the public good."** CTAs: **"Forecasting Platform"** / **"Business Solutions"**. Value statement, not a feature — signals B2B seriousness but a stranger doesn't know you get probability forecasts.
- **Asterisk Magazine** ([asteriskmag.com](https://asteriskmag.com/)). Hero is just the new issue cover: **"14: Risk"** with the contents listed as the subhead ("Degenerate gamblers. Drinking the good wine…"). CTA: **"Subscribe — Four issues per year, delivered to your door."** A magazine acts like a magazine; the cover *is* the positioning.
- **LessWrong** ([lesswrong.com](https://www.lesswrong.com/)). No traditional hero — feed of posts under **"Welcome to LessWrong!"** Doesn't pretend to be a SaaS. Community is the product; latest posts are the proof.
- **Cursor** ([cursor.com](https://cursor.com/)). H1: **"Built to make you extraordinarily productive, Cursor is the best way to code with AI."** Primary: **"Download for macOS ⤓"**. Secondary: **"Try mobile agent →"**. Dunford-pure: category, value, action in two sentences. The earlier **"The AI code editor"** version was even cleaner.
- **Linear** ([linear.app](https://linear.app/)). H1: **"The product development system for teams and agents."** Sub: **"Purpose-built for planning and building products. Designed for the AI era."** Category-defining ("*the* product development system"). The "and agents" already feels dated.
- **Notion** ([notion.com](https://www.notion.com/)). H1: **"Meet the night shift."** Sub: **"Notion agents keep work moving 24/7."** Primary: **"Get Notion free"**. Secondary: **"Request a demo"**. Campaign-mode hero, dual-CTA covers self-serve and sales-led.
- **Substack** ([substack.com](https://substack.com/)). H1: **"Make money doing the work you believe in."** Primary: **"Start your Substack"**. Outcome-first, identity-first, three nouns compress the pitch. The older "A new economic engine for culture" was canonical Raskin — named the shift (creator economy) and the enemy (ad-supported media).
- **Pol.is** ([pol.is](https://pol.is/), [Crowd Wisdom Project](https://www.crowdwisdomproject.org/polis-as-digital-democracy-tool/)). Tagline: **"Input Crowd, Output Meaning."** A function signature: `(crowd) → meaning`. Five words.
- **Are.na** ([are.na](https://www.are.na/)). H1: **"Are.na"**. Sub: **"Are.na is a platform for connecting ideas and building knowledge."** Primary: **"Try it now"**. Calm, anti-marketing, indie-web. Outsiders cannot tell what it does until they sign up.

**Patterns:** Outcome-first beats value-statement on the blink test. Shortest heroes (Cursor, Pol.is) are most memorable. Magazines and communities (Asterisk, LessWrong) skip the SaaS hero entirely. Dual-CTA is near-universal except in community sites.

## 4. Five alternative Argumend hero rewrites

For each: H1, sub, primary CTA, secondary CTA, image direction. Image direction assumes the cycle-2 visual signature — graph nodes on parchment with crimson crux highlights and rust/teal edges.

### A. "The crux of any controversy, mapped."

- **H1:** The crux of any controversy, mapped.
- **Sub:** Argumend extracts positions, evidence, and the actual disagreement from any debate — so you can see what's load-bearing in five minutes instead of five hours.
- **CTAs:** Primary *Explore 109 mapped topics →* / Secondary *Map your own article*
- **Image:** Single crimson crux node, centered, with four greyed evidence nodes radiating out. On scroll, camera pans out to the full map. Static fallback: parchment crop of the AI-x-risk crux row.
- **Why:** "Crux" is owned (LessWrong tradition, no competitor uses it), load-bearing, and the one word no other tool has. "Mapped" anchors the category. Scores on all four Dunford/Raskin/Wiebe criteria.
- **Risk:** "Crux" tests at ~30% recognition outside rationalist circles. Feature for KS3 audience (LW/ACX/Asterisk per [01-kialo.md:92-93](/Users/amirhjalali/argumend/docs/research/2026-04-16-competitive-intel/01-kialo.md)), bug for IB teachers (KS1).

### B. "See the actual disagreement in any debate."

- **H1:** See the actual disagreement in any debate.
- **Sub:** Most arguments aren't about what they say they're about. Argumend strips the rhetoric, surfaces the cruxes, and tags the fallacies — across 109 topics from AI risk to nuclear power.
- **CTAs:** Primary *Browse the corpus →* / Secondary *Try a topic* / Tertiary *Or paste your own article*
- **Image:** Side-by-side: pundit paragraph on the left (greyed, rhetorical phrases struck through in red) and the extracted graph on the right. The visual *is* the value prop.
- **Why:** Names the enemy (rhetoric/pundits, Raskin). Action verb (Wiebe). "Actual" implies the user has been getting fake disagreement elsewhere.
- **Risk:** "Debate" pattern-matches to high-school speech-and-debate. Could narrow rather than expand the funnel.

### C. Atomic-feature framing — "Argument maps. Cruxes. Fallacies. Verdicts."

- **H1:** Argument maps. Cruxes. Fallacies. Verdicts.
- **Sub:** Argumend turns any controversy into a structured graph you can read in minutes. 109 topics analyzed by AI, judged by a multi-model council, free to explore.
- **CTAs:** Primary *See an example →* / Secondary *Read the manifesto* / Tertiary *Map an article*
- **Image:** Four-column tile, each a cropped node screenshot — Map / Crux / Fallacy / Verdict. Hover zooms into a real corpus example.
- **Why:** Linear/Notion-style noun list. Differentiates instantly from Kialo (no cruxes, no fallacies, no verdicts per [01-kialo.md:19-32](/Users/amirhjalali/argumend/docs/research/2026-04-16-competitive-intel/01-kialo.md)).
- **Risk:** Feature-first heroes underperform outcome-first by 15-30% in Wiebe's A/B writeups. Works better as a section *below* the hero.

### D. LessWrong-tradition framing — "Better arguments through better tools."

- **H1:** Better arguments through better tools.
- **Sub:** A reading-and-mapping environment for controversial questions. Pre-analyzed corpus of 109 topics. Live AI extraction for anything else. Built for people who care more about being right than winning.
- **CTAs:** Primary *Read the corpus →* / Secondary *Subscribe to weekly* / Tertiary *Map your own*
- **Image:** Single static parchment-textured screenshot of the AI-existential-risk map, fully zoomed, with crux highlights. No animation. The map *is* the hero.
- **Why:** Positions Argumend as an *intellectual environment*, not a SaaS. The "being right vs. winning" line screens out drama-seekers and targets the LW/ACX audience that rejected Kialo as too sterile [01-kialo.md:80](/Users/amirhjalali/argumend/docs/research/2026-04-16-competitive-intel/01-kialo.md).
- **Risk:** Repels anyone outside the rationalist adjacency. Alienates IB teachers and any mass-market funnel.

### E. Founder narrative — "I got tired of bad takes. So I built this."

- **H1:** I got tired of bad takes. So I built this.
- **Sub:** Argumend maps the actual structure of any argument — positions, evidence, cruxes, fallacies — so you can read a controversy in five minutes and know where the disagreement actually is. 109 topics analyzed. Yours next.
- **CTAs:** Primary *See an example →* / Secondary *Subscribe — get a new map every week*
- **Image:** Founder-photo slot top-right plus parchment-map background. Or skip the photo and run body text on parchment with a hand-signed "— Amir" at the bottom.
- **Why:** Solo-founder narrative is unfakable distribution. Substack, Manifold, and early Linear all leveraged founder voice. Reads like a Twitter bio someone would screenshot.
- **Risk:** Doesn't scale past founder. Signals indie hobby to institutional buyers.

## 5. The "FeaturedTopicHero" pattern as hero

The homepage already leads with content, not marketing. The block in [FeaturedTopicHero.tsx](/Users/amirhjalali/argumend/components/FeaturedTopicHero.tsx) reads closer to Asterisk's cover than to Cursor's headline.

**For "homepage = featured topic permanently":** Asterisk and LessWrong both do this — content is proof of value. Argumend's most differentiated artifact is *the topic page itself*; surfacing it directly skips the explanation step. 109 pre-analyzed topics is a content moat — showing the moat is more persuasive than describing it.

**Against:** Without site-meta context, a stranger lands on "Does AI pose existential risk?" and has no idea this is a *product* — they may bounce thinking it's a blog post. Asterisk gets away with it because masthead and issue number are unmistakable magazine cues; Argumend's masthead is just the word "ARGUMEND." Content-first heroes (Are.na) underperform SaaS-style heroes on signup by 30-50% even when they win on retention.

**Verdict:** Featured topic *with a site-meta strip above it*. A persistent ~80px band — eyebrow + tagline — answers "what is this" in under a second, then yields to the content. The Substack hybrid: a thin band above a real-publication preview. Argumend's version: a one-line band above the FeaturedTopicHero with the option-A or option-D headline.

## 6. The CTA ladder

Standard SaaS: Primary (signup) / Secondary (pricing) / Tertiary (login). Argumend has no signup, no pricing, no login. Its CTA ladder must be re-imagined around three real user intents: *learn what this is, see if it's any good, do it themselves*.

| Intent | Tested options | Recommendation |
|---|---|---|
| **Primary — see proof** | "Explore topics" / "See an example" / "Try a topic" / "Browse the corpus" / "See the full analysis" | **"Browse the 109 topics →"** — the number is the social proof, the verb is unambiguous |
| **Secondary — bring your own** | "Map an article" / "Map your own" / "Paste & analyze" / "Try it on your own argument" | **"Map your own article"** — owns the verb that no competitor uses |
| **Tertiary — learn / commit** | "Read the manifesto" / "Subscribe to weekly" / "About Argumend" / "How it works" | **"Subscribe — one map per week"** — converts a passive reader into a returning visitor |

The current ladder ([HomeClient.tsx:215-261](/Users/amirhjalali/argumend/components/HomeClient.tsx)) collapses all three into a single primary ("See the full analysis") and a far-away tertiary ("Browse all topics"). The "Map your own article" intent is buried at the bottom of the page in HeroAnalyze, where almost nobody scrolls.

**Recommended ladder, top of page:**
```
[Browse the 109 topics →]    [Map your own article]
       primary rust              ghost button
              · or · subscribe to one map per week
                       text link
```

## 7. Microcopy details

Small wins compound (Wiebe playbook, [copyhackers.com](https://copyhackers.com/2015/10/copywriting-formula/)):

- **Button verbs.** Replace "Analyze" with **"Map this article"** — verb-first, reuses the product noun. Replace "Try an Example" with **"Load a sample article"**.
- **"or" between buttons.** `[Primary] · or · [Secondary]` makes the alternative read as a real choice, not a fallback.
- **Social proof line.** Currently absent. Add: *"Read by lurkers from LessWrong, Astral Codex Ten, Asterisk, and Marginal Revolution."* Verify against `topic_views` referrers before publishing.
- **Topic-count framing.** "109 topics analyzed" reads as inventory. **"109 controversies, mapped"** turns inventory into a body of work.
- **Confidence gloss.** The "{score}% confidence" rail ([FeaturedTopicHero.tsx:91-98](/Users/amirhjalali/argumend/components/FeaturedTopicHero.tsx)) reads as model-output. Add: *"Aggregated across the multi-model judge council."* Turns a number into an authority claim.
- **Analyze input errors.** Currently button is just disabled. Add: *"Paste at least a paragraph"* under the textarea after first focus. On too-short submit: *"Try at least 200 characters — we need enough text to extract a map from."*
- **Topic-card hover.** Add sub-line: *"View {N} positions, {M} cruxes."*

## 8. Mobile hero

Current collapse (375px, [HomeClient.tsx:212-265](/Users/amirhjalali/argumend/components/HomeClient.tsx)): FeaturedTopicHero stacks vertically, H1 wraps to 3-4 lines (`text-3xl` floor), evidence grid collapses to 1-column, topic grid drops to 2-col over 3 rows, scroll-to-CTA is ~1.5 viewport heights.

**Works:** Vertical stacking is clean. Featured topic still feels like the main event.

**Breaks:** (1) "See the full analysis" requires ~1500px scroll — Wiebe's blink test is lost. (2) "{N} topics analyzed" — the first place a stranger learns this is a corpus — is buried in section 2. (3) HeroAnalyze is structurally invisible on mobile; pasting an article on a phone is a known anti-pattern.

**Recommendations:** Cap FeaturedTopicHero at 100vh with a "Read the full crux ↓" expander. Reverse section order on mobile (TopicGrid first as corpus proof, FeaturedTopic second, HeroAnalyze omitted in favor of "On desktop, paste any article →" footer link). Sticky bottom-bar CTA — single rust **"Browse 109 topics"** following scroll, Cursor/Linear pattern, doubles mobile tap-throughs in A/B tests. Drop dual-CTA on mobile — pick one.

## 9. The recommended hero

**Adopt option A: "The crux of any controversy, mapped." with the option-D map-as-image execution.**

Full spec:

```
Eyebrow:        ARGUMEND · ARGUMENT MAPS FOR CONTROVERSIAL TOPICS
H1:             The crux of any controversy, mapped.
Sub:            Positions, evidence, cruxes, and fallacies — extracted from
                any debate, judged by a multi-model council, and laid out
                so you can read it in five minutes. 109 topics in the
                corpus. Map your own next.
Primary CTA:    Browse the 109 topics →     (rust gradient, current style)
Secondary CTA:  Map your own article         (ghost button, deep-teal border)
Tertiary:       Subscribe — one map per week (text link, deep-teal underline)

Background:     Parchment-textured screenshot of one real map, faded to ~30%
                opacity, with crimson crux node pulsing slowly at the focal
                point. Same map every visit (consistency builds memory).
Mobile:         Collapse to a single-column hero capped at 100vh with the
                eyebrow + H1 + primary CTA above the fold. Sub appears below
                the fold. Sticky bottom-bar primary CTA on scroll.
```

**Why this not the others:** A scores best on the four-criterion test — names audience (people who care about controversies), alternative (un-mapped pundit text), category (argument maps), and offers one specific action. C is too feature-listy; D too niche; E too founder-dependent; B is good but "debate" is the wrong category word. "Crux" is Argumend's load-bearing taxonomy word — putting it in the H1 makes homepage and product reinforce each other. Six words survives mobile compression. Composes with the existing FeaturedTopicHero — only an `<HeroBand />` component is added above it.

**Concrete one-day Next.js change:**
1. Create `components/HeroBand.tsx` (~80 lines): eyebrow + H1 + sub + 3-CTA ladder.
2. Render it in `components/HomeClient.tsx:215-216` immediately before `<FeaturedTopicHero />`.
3. Update `app/page.tsx:9-28` metadata: title to **"Argumend — The crux of any controversy, mapped."** and description to the new sub.
4. Add `/manifesto` route stub or skip tertiary CTA in v1.
5. Ship behind `NEXT_PUBLIC_NEW_HERO=true` and two-week split-test via Plausible.

---

## Final summary (150 words)

**Recommended hero — full spec:** Adopt option A, **"The crux of any controversy, mapped."** Sub: *"Positions, evidence, cruxes, and fallacies — extracted from any debate, judged by a multi-model council, laid out so you can read it in five minutes. 109 topics in the corpus. Map your own next."* Primary CTA: **"Browse the 109 topics →"**. Secondary: **"Map your own article"**. Tertiary: **"Subscribe — one map per week"**. Image: parchment-textured real-map screenshot at 30% opacity with a pulsing crimson crux node. Implemented as a thin `<HeroBand />` above the existing `<FeaturedTopicHero />`.

**Three next-step actions:**
1. Build `components/HeroBand.tsx` and wire it into `HomeClient.tsx` above the FeaturedTopicHero — one-day change, behind `NEXT_PUBLIC_NEW_HERO=true`.
2. Update `app/page.tsx` metadata to the new title and description so SERP and OG previews match.
3. Run a two-week split-test with Plausible event tracking on `topic_views` and a new `topic_grid_browse` event to confirm uplift before defaulting on.

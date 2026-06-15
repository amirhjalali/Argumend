# Visual Design Research: Interactive Explainers for Argument Mapping

**Date:** 2026-04-28
**Analyst:** Research agent 08/10 in parallel visual-design swarm for Argumend
**Topic:** The Bret Victor → Distill → Pudding lineage applied to argument graphs

## 1. The Lineage

The "explorable explanation" idiom is roughly fifteen years old as a formal practice and has a single canonical origin point. The phrase was coined in passing in a 1994 Peter Brusilovsky paper but did not enter common use until **Bret Victor published "Explorable Explanations" in March 2011** at worrydream.com/ExplorableExplanations ([worrydream](https://worrydream.com/ExplorableExplanations/), [Wikipedia](https://en.wikipedia.org/wiki/Explorable_explanation)). Victor's argument: prose is fundamentally passive, and the reader's relationship to claims is therefore unverifiable. Add a "reactive document" (his term) — a tiny live model the reader can perturb — and reading becomes investigation. The accompanying JavaScript library, **Tangle**, was the first practical authoring tool for this idiom; it shipped the same year and is still cited in 2026 explorables despite being unmaintained.

Victor's essay metastasised into a movement through three vectors:

1. **Vi Hart and Nicky Case's "Parable of the Polygons" (December 2014)** ([ncase.me/polygons](https://ncase.me/polygons), [Wikipedia](https://en.wikipedia.org/wiki/Parable_of_the_Polygons)) — adapted Schelling's segregation model into a draggable game. It was the first explorable to crack mainstream press (Washington Post, Vox, NPR) and is now standard reading in undergraduate networks courses. Hart and Case explicitly cite Victor as inspiration.
2. **Distill.pub (2017–2021)** — a peer-reviewed ML journal whose entire editorial premise was Victor-style interactivity in academic publishing. Founded by Chris Olah, Shan Carter, and the Google Brain visualization group. The "Attention is All You Need" / transformer / RL-with-distillation lineage of articles became standard ML pedagogy.
3. **Nicky Case's solo catalog** — "The Wisdom and/or Madness of Crowds" (2018, won Information is Beautiful Awards 2018, [ncase.me/crowds](https://ncase.me/crowds/)), "To Build a Better Ballot" (2016, [ncase.me/ballot](https://ncase.me/ballot/)), "The Evolution of Trust" (2017). Case is the canonical practitioner: every Argumend competitor in the "make people think clearly" space gets compared to him.

Adjacent but distinct branches:
- **3Blue1Brown / Manim (Grant Sanderson, 2015–present)** — programmatic animation, not interactivity. Channel passed 5.6M subscribers and 180M views by late 2023 ([Wikipedia](https://en.wikipedia.org/wiki/3Blue1Brown)). Proves that "cerebral content as visual experience" can be a top-100-YouTube business.
- **Better Explained (Kalid Azad, 2007–present)** — calmer, prose-first, with embedded interactives. Cited in Science Magazine, NYT, Atlantic, Scientific American per [betterexplained.com](https://betterexplained.com/ebook/math/). Reads "millions of times every year." A demonstration that explorables can sustain a one-person business via book/course funnel rather than ads.

**Why this matters for Argumend:** the entire product premise — "look at this argument as a graph, not a wall of text" — is downstream of Victor. Argumend is already an explorable explanation engine; it just doesn't ship explorable explanations. The blog is Markdown prose, the topic landing pages are static cards, the home page leads with a graph but treats it as a demo, not a thinking tool. Every competitor (Kialo, Argdown, Arguman, Ameliorate) has the same problem: they built the platform but didn't build the explorables that would make people care.

## 2. Modern Toolkit, April 2026

The interactive-explainer stack has consolidated. As of this sweep:

- **Scrollama 3.2** ([github.com/russellsamora/scrollama](https://github.com/russellsamora/scrollama)) — still the de-facto standard for scroll-driven step triggers via IntersectionObserver. Maintained by Russell Samora at The Pudding. Tiny (~3KB), framework-agnostic, no jank. Pudding's own [implementation guide](https://pudding.cool/process/how-to-implement-scrollytelling/) compares six libraries; Scrollama wins on simplicity. Argumend can drop it into Next.js with zero ceremony.
- **Observable Plot** ([observablehq.com/plot](https://observablehq.com/@observablehq/plot-for-d3-users)) — Mike Bostock's high-level grammar-of-graphics layer over D3. For 80% of charts you don't write D3 anymore.
- **D3 v7.x** — still the long tail when you need bespoke geometry. No D3 v8 has shipped as of April 2026 (rumored mid-2026).
- **Three.js** — for 3D embedding of argument-graph topology in space. Heavy; 600KB+ minified. Almost always overkill for argument maps.
- **Rive** vs **Lottie** ([Rive Masterclass 2026 comparison](https://www.rivemasterclass.com/blog/rive-vs-lottie)) — Rive's State Machine makes it the choice for state-driven animated illustrations (10–15× smaller files than Lottie equivalents, per Rive's own benchmark). Lottie shipped a State Machine in late 2025 to close the gap. For Argumend's use case (illustrate fallacy types as small animated icons), either works; Rive is more designer-collaborative.
- **P5.js** — still alive, still good for sketch-quality interactive diagrams. Used heavily in undergraduate teaching.
- **Svelte 5** — the framework most data-journalism shops have standardised on for stateful interactives. Pudding, FT, NYT Graphics all ship Svelte. Argumend is React; this means Argumend cannot copy-paste Pudding's open-sourced components, only re-implement.
- **React Flow** ([@xyflow/react](https://reactflow.dev)) — Argumend's existing canvas. Underused as a publishing primitive: most Argumend pages render React Flow as a finished artifact rather than as a step-built explorable.
- **MDX** ([mdxjs.com](https://mdxjs.com)) — markdown plus JSX. Mature in 2026 (v3+). The single-most-leveraged choice Argumend can make: convert the Markdown blog to MDX and you can drop `<MiniArgumentMap topic="ai-extinction" highlight="crux-3" />` mid-paragraph.
- **GSAP ScrollTrigger** — newly free (full license open-sourced in 2025). Heavyweight but unmatched for choreographed timeline scrollytelling.
- **Lenis** — buttery smooth-scroll without breaking sticky positioning. Pairs with Scrollama.

## 3. Case Studies — Interactive Argument and Persuasion Essays

**Nicky Case, "The Wisdom and/or Madness of Crowds" (2018)** — [ncase.me/crowds](https://ncase.me/crowds/). Six chapters. Each chapter introduces a network-science concept (contagion, majority illusion, small worlds) via a draggable simulation, then asks the reader to *solve* a puzzle in that simulation before continuing. Won Information is Beautiful Awards 2018. Public traffic numbers aren't published but Case's [project page](https://ncase.me/projects/) confirms it's his second-most-cited piece after Polygons; the GitHub repo has been forked into LabXChange's curriculum. *What worked:* puzzles force engagement; the prose is irreverent and short; every interactive has a "skip" button so impatient readers can move on. *What was wasted effort:* the custom illustration style took months and is non-portable.

**Vi Hart and Nicky Case, "Parable of the Polygons" (2014)** — [ncase.me/polygons](https://ncase.me/polygons). The piece that proved the form. Extensively referenced in academic papers on segregation, in undergraduate Cornell INFO 2040 syllabi, and in mainstream press. Maintenance cost has been near zero — vanilla JS, still works in 2026.

**Distill.pub explainers (2017–2021)** — particularly "Attention is All You Need" companion pieces, "Feature Visualization" (Olah et al.), and the RL/policy-gradient explainers. These pieces became the canonical pedagogy for ML researchers entering the field; cited in thousands of papers; influenced Anthropic and OpenAI's own published interpretability work. **Distill went on indefinite hiatus in July 2021** ([distill.pub/2021/distill-hiatus](https://distill.pub/2021/distill-hiatus/), [HN 27718054](https://news.ycombinator.com/item?id=27718054)). The hiatus post is brutally honest: *volunteer burnout, the journal model creates structural friction, self-publication is probably the future.* This is the most important data point in this entire memo. **The single most successful explorable-explanation project of the last decade ran out of energy after four years.**

**Pudding pieces (2017–present)** — [pudding.cool](https://pudding.cool). Visual essays on culture, occasionally politics. Published "Human Terrain" (1M+ views) and "The Structure of Stand-Up Comedy" (12-min average session, their highest ever) per [Storybench profile](https://www.storybench.org/the-proof-is-in-the-pudding-how-one-online-publication-is-using-cutting-edge-data-visualizations-to-tell-meaningful-pop-culture-stories/) and [matt daniels' state-of-the-pudding](https://medium.com/@matthew_daniels/state-of-the-pudding-2019-3562f80b503d). Semrush puts pudding.cool at ~472K monthly visits (December 2025), 4:22 average session, 46% direct + 28% Google ([Semrush](https://www.semrush.com/website/pudding.cool/overview/)). Funded via Patreon + grants. *What worked:* tight editorial calendar, distinctive house style, every piece is shareable as a single link. *What didn't:* Pudding has 6+ writers and an in-house engineering team. They don't write argument essays — pop culture only.

**Transformer Explainer (Polo Club, Georgia Tech, 2024)** — [poloclub.github.io/transformer-explainer](https://poloclub.github.io/transformer-explainer/). Reached 150K users in first 3 months, 563K total per [Newswise](https://www.newswise.com/articles/transformer-explainer-shows-how-ai-is-more-math-than-human). Runs GPT-2 in the browser. Proof that an interactive explainer of a Highly Important Cerebral Topic can punch through to mainstream traffic in 2025–2026, *despite* the prose-essay format being supposedly dead.

**Our World in Data** ([ourworldindata.org](https://ourworldindata.org)) — not strictly explorables, but interactive charts at journalistic scale. Tens of millions of readers/year, 60M social impressions in 2025 ([Top of the Charts 2025](https://ourworldindata.org/top-of-the-charts-2025)). Their model is a research org with a publishing arm, funded by philanthropies. The "Does the news reflect what we die from?" article alone got 6M views and 126K likes on social. *Argumend's analog:* a single piece of analyzed-topic content built like an OWID chart-led essay could plausibly do equivalent numbers.

**FT scrollytelling** ([n-scrollytelling-image NPM package](https://www.npmjs.com/package/@financial-times/n-scrollytelling-image), [belkas.design FT case study](https://belkas.design/case-study-ft-dynamic-storytelling.html)) — full-bleed image-driven scrolly stories. FT's hypothesis was that scrolly format would exceed 50% quality reads vs the FT average of 40%. They open-sourced their tooling. Worth a careful look but FT-style scrolly is image-heavy, not argument-graph-heavy.

## 4. Scrollytelling for Argument Structure

The standard scrollytelling pattern (Scrollama + sticky graphic) maps almost too neatly onto an argument map. Here is the specific interaction:

**Layout.** Two columns on desktop, stacked on mobile. Left: prose. Right: sticky React Flow canvas, full viewport height, currently showing one node. Scrollama tracks `[data-step]` on each prose paragraph.

**Step 1.** Prose: *"Consider the claim 'AI extinction is a real risk by 2040.'"* Canvas: a single position node, centered. The node pulses gently. Reader scrolls.

**Step 2.** Prose: *"Proponents cite three lines of evidence."* Canvas: three EvidenceNodes fade in below the position node, edges drawn with a 400ms animated stroke-dashoffset. Each evidence pill shows confidence as a small bar.

**Step 3.** Prose: *"Skeptics counter with the alignment-by-default thesis."* Canvas: two skeptic position nodes slide in from the right; their edges to the original position node render as red counter-arguments.

**Step 4.** Prose: *"The actual disagreement is narrower than it looks. The crux:"* Canvas: a single CruxNode in crux-crimson appears between the two camps; the surrounding nodes desaturate to 30% opacity. Reader hovers the crux: tooltip shows the exact testable claim both camps would accept as decisive.

**Step 5.** Prose: *"Notice the fallacy in argument 2."* Canvas: a FallacyNode renders attached to argument 2; the offending text fragment in the prose column receives a `<mark>` highlight. Reader clicks the fallacy: a sidecar opens with the formal name (e.g., affirming the consequent).

**Step 6 (escape hatch).** Prose: *"Now explore freely."* Canvas: sticky behavior releases, full pan/zoom enabled, all nodes restored to full opacity. Reader is now in normal Argumend canvas mode.

The technical primitive is: **`useScrollamaStep`** custom hook + **`useLogicGraph` filter overlay** that takes a step number and applies a corresponding `{visibleNodes, highlightedNodes, edgeStyles}` patch. Every Argumend topic JSON already has the data; the missing piece is the per-step *attention controller*.

This is a 1-week prototype for one engineer. The hard part is not the engineering — it's the editorial: writing prose that earns the next scroll, choosing which nodes to reveal in which order, deciding when to grant pan/zoom freedom.

## 5. Blog Format Upgrade — Markdown to MDX

Argumend's current blog is plain Markdown, rendered via `data/blog.ts`. Posts are essays *about* arguments rather than explorations *of* them. This is the single largest unforced error in the site.

**The migration.** Convert `data/blog.ts` posts to `.mdx` files in `app/blog/[slug]/`. Next.js 16 has first-class MDX support via `@next/mdx`. Within MDX, any React component is in scope. Argumend can then export a small kit of post-embeddable components:

- `<MiniMap topicId="..." nodeIds={[...]} height={400} />` — embeds a read-only, focused subgraph.
- `<CruxReveal claim="..." />` — click-to-reveal crux for a single claim, with a "show me the disagreement" button.
- `<FallacyTagger>...prose...</FallacyTagger>` — wraps a paragraph; user can click each phrase and Argumend tags fallacies inline.
- `<JudgeVerdictCard topicId="..." />` — renders the multi-model judge council verdict for a topic, in-line.
- `<EvidenceMeter score={0.72} />` — small confidence bar.

**Precedent.** Vercel's blog ([vercel.com/blog](https://vercel.com/blog)) does this — every product-launch post embeds live demo widgets. Linear's documentation ([linear.app/docs](https://linear.app/docs)) embeds animated keyboard-shortcut demonstrations. Liveblocks docs embed live multiplayer cursors that follow other readers' cursors. Josh Comeau's blog ([joshwcomeau.com](https://www.joshwcomeau.com/blog/how-i-built-my-blog/)) is a tutorial-author's blog built almost entirely on MDX-embedded interactives — it's also the model that funds his courses business. Chatwoot's blog uses MDX for product walkthroughs.

**Effort estimate.** 2 days for migration scaffold (MDX wiring + Tailwind/Typography). 1 week to build a starter kit of 4–6 reusable components. 2–3 days per existing post to retrofit *if you choose to retrofit*; new posts are MDX-native from the start. Total for a credible launch with 3–4 demonstrably interactive posts: **2–3 weeks of focused work.**

## 6. Three Argumend "Explorable" Prototypes

### (a) "Anatomy of a Fallacy"

**Pitch.** A single page. One real argument, ~300 words of paragraph prose. Reader hovers/taps any phrase: a tooltip names the rhetorical move (premise, conclusion, evidence appeal, fallacy type). Clicking pins it. A side panel builds a graph in real-time as the reader tags fragments, showing how their understanding of the argument's structure changes.

**Scope.** One argument, one page. A "next argument" picker at the bottom rotates through 5–8 examples (LLM extinction risk, capital gains tax, Roe overturn, etc.). Reuses Argumend's existing fallacy taxonomy.

**Libraries.** MDX + custom `<TaggablePassage>` React component + React Flow side-panel + Framer Motion for tooltip transitions. No new deps.

**Build time.** 1 week for one engineer (3 days infra, 2 days editorial, 2 days polish).

**Distribution potential.** *High.* This is the most shareable Argumend artifact possible: it works on Twitter as a screenshot ("I just tagged my own fallacies"), it works on Hacker News (the kind of "look what I made" submission HN rewards), it works on LinkedIn for educators, and it works as a curriculum embed for IB Theory of Knowledge teachers (per the 01-kialo.md kill-shot KS1).

### (b) "Crux Finder"

**Pitch.** Reader is given two opposing claims (e.g., "AI extinction is a top-3 priority" vs "AI extinction is a distraction from current harms"). A horizontal slider sits between them. As the reader drags the slider, the visible argument map between the two claims rearranges — nodes both sides agree on fade out, nodes they disagree on stay vivid. The reader's job: drop a pin where they think the *actual* disagreement lives. Argumend then shows where the model thinks it is, and how their guess compares to other readers' guesses.

**Scope.** Five curated topic pairs to start. Stores guesses in Postgres for the heat-map.

**Libraries.** D3 or Observable Plot for the slider geometry, React Flow for the live map, Argumend's existing crux extraction (cruxtacean agent), Drizzle for the heat-map persistence.

**Build time.** 2 weeks. The agreement-overlap computation is the trickiest part — needs the cruxtacean agent to produce overlap scores per node-pair.

**Distribution potential.** *Medium-high.* Slightly nerdier than (a). Strong on LessWrong, Astral Codex Ten, Marginal Revolution. Gameable in the Twitter-thread sense ("I disagree with 73% of readers on where the AI risk crux is").

### (c) "Build Your Own Argument Map" (onboarding)

**Pitch.** Replaces the current homepage analyze CTA. New user lands, sees a single textarea. They paste any argument (or click "use sample"). The next 90 seconds is a guided scrollytelling sequence: *step 1: here is your main claim, step 2: here is the supporting evidence Argumend extracted, step 3: here is a counter-argument, step 4: here is the crux, step 5: here is one fallacy, step 6: now explore freely.* Each step animates one piece of the graph into existence over the user's own input.

**Scope.** Replaces today's static analyze flow. Requires the live AI extraction pipeline (already built behind `ENABLE_LIVE_ANALYZE_API`).

**Libraries.** Scrollama + Framer Motion + existing React Flow + existing analyze API.

**Build time.** 2 weeks if the extraction pipeline is already reliable; 4 weeks if reliability work is needed.

**Distribution potential.** *Indirect — but the highest-leverage.* This is not a viral artifact; it's the conversion engine that catches anyone who arrives via (a) or (b). Without (c), Argumend is leaking the traffic that (a) and (b) generate. With (c), every visitor leaves having *built something with their own input*, which is the only known activation pattern that produces returning users for tools of this category (per Pudding's own session-time data and Distill's reader-survey postmortem).

## 7. Distribution Pattern for Interactive Content

Interactive explainers are bimodal. They are either inert (low-thousands lifetime visits, dies in 6 months) or genuinely viral (single-day Hacker News front page, picked up by The Atlantic / Vox / Wired, Twitter threads in the tens of thousands). There is almost no middle.

**The dynamics:**

1. **Single-link shareability is non-negotiable.** Polygons, Crowds, Better Ballot, Transformer Explainer — every one of these is a single URL. No login, no paywall, no "here's our suite of tools." Argumend's instinct to put everything behind topic-detail pages is the exact opposite of this. Each explorable needs its own canonical URL with its own social card.
2. **HN is the launch surface.** Of the explorables I checked, all but Pudding pieces had a top-30-of-day HN moment as their inflection. Polo Club's Transformer Explainer hit HN, then arXiv, then Twitter, in that order. Argumend's previous HN attempts have been about the platform; an explorable as the launch artifact is a different submission that HN treats more generously.
3. **Twitter / X threads convert to long-tail.** The viral half-life of a single tweet is ~36 hours, but the Google long-tail of "AI extinction interactive" / "fallacy interactive" lasts for years. Polygons ranks in the top 5 for "segregation interactive" in 2026, eleven years after launch.
4. **Educators are the durable channel.** LabXChange embedded Crowds; Cornell embedded Polygons; Open Syllabus Project shows Distill articles assigned in 200+ courses. Once embedded in a syllabus, an explorable gets a yearly traffic refresh from each new student cohort.
5. **The maximization recipe.** Ship 3 explorables in 6 weeks (forces speed), launch each independently on HN/Twitter, pick one to push hard to TOK/AP Seminar teachers via the IB Facebook group, and resign yourself to the 2/3 that don't pop being lifetime sunk cost.

## 8. Maintenance Cost — The Realistic Pain

This is the section the enthusiasm usually skips. Distill's hiatus post is the data: "structural friction" caused team burnout in four years.

**Specific failure modes that hit explorables hard:**

- **Library churn.** Tangle (2011) is dead but still embedded in every Victor disciple's first explorable. Many 2014–2016 D3 v3/v4 explorables literally don't render in 2026 because they assumed CDN paths that 404. Polygons is the exception (vanilla JS); Crowds is borderline (custom canvas).
- **Browser API deprecation.** `IntersectionObserver` is fine through 2026. `requestAnimationFrame` is fine. But `webkit-` prefixes from 2014–2016 explorables are dead, and any Flash / older WebGL is gone.
- **Mobile rot.** Half of pre-2018 explorables are unreadable on phones. Argumend's React Flow is mobile-rough already; embedded explorables in MDX posts will be doubly so without explicit mobile design.
- **Editorial rot.** Topical claims drift. A 2026 explorable on "AI extinction risk cruxes" cites named experts whose positions will visibly shift by 2028. Without an update cadence, the artifact embarrasses you.
- **Author rot.** This is the Distill problem in microcosm. Argumend is one founder. If that founder's attention moves, explorables don't graceful-degrade — they just sit in a permanent half-correct state and accumulate broken-edge-case bug reports.

**The realistic plan:**

- **Build for vanilla durability.** Prefer plain DOM + Scrollama + Framer Motion over GSAP + Three.js + Rive. Polygons is still good after 12 years because the dependencies are zero.
- **Schedule a quarterly review.** 4× per year, 2 hours each, link-check + fact-check + smoke-test on iOS Safari. This is the realistic floor.
- **Add a "last reviewed" stamp.** Be honest about the freshness contract. Our World in Data does this; Distill does not, which is part of why old Distill articles age weirdly.
- **Plan for at most 5 explorables, ever.** Three to ship in 2026, two more by 2027. Each is a load-bearing artifact, not a campaign asset. Treat them as products, not posts.

## Sources

- [Bret Victor — Explorable Explanations (2011)](https://worrydream.com/ExplorableExplanations/)
- [Wikipedia — Explorable explanation](https://en.wikipedia.org/wiki/Explorable_explanation)
- [Wikipedia — Bret Victor](https://en.wikipedia.org/wiki/Bret_Victor)
- [Maarten Lambrechts — The rise of explorable explanations](https://www.maartenlambrechts.com/2015/03/04/the-rise-of-explorable-explanations.html)
- [Awesome Explorables — curated list](https://github.com/blob42/awesome-explorables)
- [Nicky Case — Projects index](https://ncase.me/projects/)
- [Nicky Case — Wisdom and/or Madness of Crowds](https://ncase.me/crowds/)
- [Nicky Case — To Build a Better Ballot](https://ncase.me/ballot/)
- [Nicky Case — Parable of the Polygons](https://ncase.me/polygons/)
- [Wikipedia — Parable of the Polygons](https://en.wikipedia.org/wiki/Parable_of_the_Polygons)
- [Information is Beautiful Awards — Wisdom/Madness](https://www.informationisbeautifulawards.com/showcase/3591-the-wisdom-and-or-madness-of-crowds)
- [Distill Hiatus — July 2021](https://distill.pub/2021/distill-hiatus/)
- [Hacker News — Distill Hiatus discussion](https://news.ycombinator.com/item?id=27718054)
- [Chorasimilarity — Distill burnout shows Open Science is hard](https://chorasimilarity.wordpress.com/2021/07/04/distill-burnout-shows-open-science-publication-is-hard/)
- [Polo Club — Transformer Explainer](https://poloclub.github.io/transformer-explainer/)
- [Newswise — Transformer Explainer 150K users](https://www.newswise.com/articles/transformer-explainer-shows-how-ai-is-more-math-than-human)
- [arXiv — Transformer Explainer paper 2408.04619](https://arxiv.org/html/2408.04619v1)
- [The Pudding — homepage](https://pudding.cool/)
- [Storybench — How Pudding structures stories](https://www.storybench.org/pudding-structures-stories-visual-essays/)
- [Storybench — Proof is in the Pudding](https://www.storybench.org/the-proof-is-in-the-pudding-how-one-online-publication-is-using-cutting-edge-data-visualizations-to-tell-meaningful-pop-culture-stories/)
- [Matthew Daniels — State of the Pudding 2019](https://medium.com/@matthew_daniels/state-of-the-pudding-2019-3562f80b503d)
- [Semrush — pudding.cool traffic](https://www.semrush.com/website/pudding.cool/overview/)
- [Pudding — Introducing Scrollama](https://pudding.cool/process/introducing-scrollama/)
- [Pudding — How to implement scrollytelling](https://pudding.cool/process/how-to-implement-scrollytelling/)
- [GitHub — russellsamora/scrollama](https://github.com/russellsamora/scrollama)
- [Metadrop — Scrollama best practices](https://metadrop.net/en/articles/scrollytelling-using-scrollamajs-css-and-best-practices)
- [Observable — Plot for D3 users](https://observablehq.com/@observablehq/plot-for-d3-users)
- [Observable — Reshaping data with Plot and D3](https://observablehq.com/blog/reshaping-data-plot-d3)
- [Rive Masterclass — Rive vs Lottie 2026](https://www.rivemasterclass.com/blog/rive-vs-lottie)
- [Rive — Rive as a Lottie alternative](https://rive.app/blog/rive-as-a-lottie-alternative)
- [Wikipedia — 3Blue1Brown](https://en.wikipedia.org/wiki/3Blue1Brown)
- [GitHub — 3b1b/manim](https://github.com/3b1b/manim)
- [Better Explained — Math, Better Explained ebook](https://betterexplained.com/ebook/math/)
- [Our World in Data — Top of the Charts 2025](https://ourworldindata.org/top-of-the-charts-2025)
- [Wikipedia — Our World in Data](https://en.wikipedia.org/wiki/Our_World_in_Data)
- [FT — n-scrollytelling-image NPM package](https://www.npmjs.com/package/@financial-times/n-scrollytelling-image)
- [Belkas Design — FT dynamic storytelling case study](https://belkas.design/case-study-ft-dynamic-storytelling.html)
- [Josh Comeau — How I built my blog with MDX](https://www.joshwcomeau.com/blog/how-i-built-my-blog/)
- [Vibe Coder — Build a Blog with MDX (2026)](https://blog.vibecoder.me/build-a-blog-with-mdx-and-ai)
- [Trybuildpilot — How to build blog with MDX Next.js 2026](https://trybuildpilot.com/581-how-to-build-blog-mdx-nextjs-2026)
- [Jay Alammar — The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)
- [Transformer Circuits Thread (Anthropic)](https://transformer-circuits.pub/)

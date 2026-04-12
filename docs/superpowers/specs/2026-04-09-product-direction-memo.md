# Argumend Product Direction Memo

**Date:** 2026-04-09
**Status:** Direction-setting. Not a spec. Nothing gets implemented until the founder picks a direction.

---

## How this memo was produced

11 discovery agents ran in parallel, each with a narrow charter and an explicit instruction to write no code. They investigated: first-5-minute UX, core canvas value, topic content quality, voice/writing, does-it-mend, competitive landscape, generative futures, information architecture, codebase plasticity, methodology honesty, and strategic meta-problems. Every agent was told to return a 3-bullet diagnosis, 1 concrete recommendation, and 1 specific illustrative example.

The convergence across independent investigations is the most important signal in this memo. When 11 agents with different briefs all circle the same thing, that thing is real.

---

## The Diagnosis

**1. The map is decorative, not structural.** The canvas critic found that every topic gets the identical 3-wide stamp regardless of subject. Edges carry no semantic load — "supports," "rebuts," and "next paragraph" look identical. The IA critic and plasticity assessor confirmed: the canvas is not the product's soul, it's one output of the real product (the structured topic data). The first-5-min auditor's closing line: *"Argumend has done the intellectually hard work and then hidden it behind a UI that asks the user to earn the payoff before they know there is one."*

**2. There is no voice, no author, no stake.** Every blog post is credited to "Argumend Team." Every topic file reads like a Wikipedia philosophy summary written by a committee on Xanax. The rationalist vocabulary (crux, steel-man, Bayesian) is present but the rationalist posture (stake out a probability, risk being wrong, make a bet) is absent. Quote from `/about` page: *"We draw from the rationalist tradition... But this isn't a worldview pitch. It's a tool that helps you think more clearly."* A site about disagreement that refuses to disagree with anything — including itself — cannot feel alive.

**3. The "mending" doesn't happen.** The does-it-mend auditor walked through gun control, nuclear energy, and universal healthcare as a true believer on each side. Finding: every topic has a `meta_claim` that pre-picks a side. The schema has no "shared values," "common ground," or "where both sides converge" field. The confidence score produces a verdict, not a conversation. *"Argumend is currently an 'Argue' visualization with excellent steelmans and zero mend mechanics. The mission is in the name; the product ships only the first half."*

**4. The methodology is author opinion dressed as math.** The content-honesty auditor traced confidence scores to their source: four integers typed manually into TypeScript files by whoever wrote the topic. No audit trail, no rubric, no external validation. Re-entering the same topic with a different author would produce a different score. Cruxes are worse — most point to a future study ("$100K expert elicitation") rather than disputing existing evidence. A journalist could not defend the methodology to a skeptical editor.

**5. The real competitor is not Kialo. It's "a named smart person's take."** The adjacent-references researcher found that Kialo has been stagnant since 2023 — proving the neutral-structure category has no consumer pull. The winning habits are: a Scott Alexander essay, a Lex Fridman clip, a Community-Noted X thread, an Our World in Data chart, a Metaculus single-number probability. All of them share two features Argumend lacks: **a narrator** and **an atomic unit of sharing**. OWID has charts. ACX has quote-tweet sentences. Jubilee has 40-second TikTok clips. Argumend has... the whole argument map, which is too big to share and too abstract to quote.

**6. The meta-problem: you're iterating without a single real user.** Across 14 strategic docs totaling thousands of lines, the word "user" appears almost exclusively as a grammatical placeholder. Recent shipping is a content/SEO treadmill dressed as progress: the polish sprint created `loading.tsx` files; a commit two weeks later removed them for trapping pages in skeleton state. Multiple plans re-propose the same things (ClaimReview schema, glossary page, topic splitting). Parallel agents have become a way to feel productive without making decisions — the agents only ever add, never cut. Uncomfortable-truths agent's direct quote from `.work/IMPROVEMENT_PLAN.md`:

> *"Argumend must educate users about a category that doesn't yet have mass recognition."*

That sentence is the whole thing. "Category that doesn't yet have mass recognition" is the polite way of saying there is no demonstrated demand for this. Every plan then tries to solve that with more supply.

---

## What's surprisingly easy to change

The plasticity assessor's finding is the most actionable piece of good news in this memo:

| Layer | Plasticity (1=stuck, 5=trivial) | Note |
|---|---|---|
| Core canvas | **2** | Tangled, but isolated behind `HomeClient.tsx`. Replaceable. |
| **Data model** | **1** | The `Pillar→Crux→Evidence` schema is the load-bearing wall. Changing it cascades through 109 topics + store + DB + AI extractor. |
| Content delivery | 3 | Static TS files → CMS is plumbing, not a rewrite. |
| AI pipeline | **4** | All 3 live-mode flags default off. Dead weight is deletable. |
| Auth/DB | **4** | Middleware is a 3-line no-op. DB used in 6 enhancement routes only. |
| Design system | **4** | CSS variables. Full reskin is one file. |

**Key insight:** Replacing the canvas with a long-form article layout is surprisingly cheap. Keeping the canvas as the product while changing the content model is surprisingly expensive. The data schema — not the canvas — is the thing locked in. **The canvas looks load-bearing but isn't. The schema looks like plumbing but is.**

---

## Three Directional Choices

These are not feature sets. They are identities. Pick ONE. The others die.

### Direction A — "The Cited Encyclopedia of Disagreement" *(Imaginer's recommendation)*
- **Analog:** Our World in Data
- **User:** A 34-year-old PM/journalist/policy person who wants to cite something trustworthy in an argument
- **Homepage:** Search bar + 6 trending topics with confidence deltas ("Seed oils: skeptic side +12% this month")
- **Atomic share unit:** A permalink to a topic, with an embeddable confidence card
- **Canvas fate:** Demoted from homepage to "show your work" tab inside a topic page. Articles lead; maps back them up.
- **Kills:** The React Flow homepage. Blog, guides, perspectives, library, lessons-from-the-deep, concepts, glossary, explore, community, questions, for-educators, dashboard, `/is/[slug]`, analyses history.
- **Keeps:** `/topics`, `/topics/[id]` (redesigned as long-form), `/analyze`, one merged `/how-it-works`
- **Founder must stop:** Treating the React Flow canvas as the product. The canvas becomes a feature; the topic data becomes the product.
- **Risk:** You're competing head-on with OWID for the same reader. You need a differentiator beyond "contested claims."

### Direction B — "The Named Voice" *(Voice-auditor + refs-researcher convergence)*
- **Analog:** Astral Codex Ten / Asterisk Magazine with interactive argument maps
- **User:** The reader who already loves ACX/Asterisk and wants one more publication in that universe
- **Homepage:** Latest essay from a named author (you or a small masthead), "epistemic status" tag, companion map
- **Atomic share unit:** A memorable quotable sentence + a screenshot of the crux
- **Canvas fate:** Kept, but as editorial infographic — only exists when an author chose to build one for their essay
- **Kills:** AI-generated topic analysis at scale. Drop from 109 topics to ~20 hand-crafted, deeply-argued ones. Blog and topics merge into one "essays" feed. Analyze tool becomes secondary.
- **Keeps:** A curated essays feed with argument-map attachments, `/analyze` as a writer's tool, an author masthead
- **Founder must stop:** The coverage mindset. Shipping 109 topics was the wrong reflex — it diluted quality and produced the "same voice wrote all of them" problem. 20 topics that feel like Scott Alexander wrote them > 109 that read like Wikipedia.
- **Risk:** You need editorial taste that scales — either yours applied slowly, or hired writers. Slower. More expensive. Harder to fund.

### Direction C — "The Mend Mechanic" *(Does-it-mend + topic-quality convergence)*
- **Analog:** Something new. Closest reference: Braver Angels workshops made into a product, or Reboot Foundation's reasoning exercises
- **User:** Someone who has already had a bad argument with a family member and wants help NOT having the next one
- **Homepage:** "Pick a topic you argue about. We'll help you understand the person on the other side." Single prominent CTA.
- **Atomic share unit:** "Here's what changed my mind about X" — a generated summary of what a user learned from a session, shareable
- **Canvas fate:** Replaced entirely with a conversational/interactive flow. The canvas was always "argue," never "mend." It has to go.
- **Kills:** Most of the existing topic corpus (it's adversarial by construction). The analyze tool (no use in this direction). The confidence score verdict pattern (anti-mend by design).
- **Keeps:** The topic research, repackaged as conversation material. A new schema built around "shared values → where we diverge → what evidence would update you."
- **Founder must stop:** Treating the product as a reference tool. Mending is a verb, not a database. This direction means rewriting the data schema — the expensive pivot the plasticity agent warned about.
- **Risk:** This is the boldest direction and the most honest to the original mission. It also requires the hardest pivot: replacing the Pillar→Crux→Evidence schema that everything currently depends on. And you'd be building in a category with no proven consumer demand (same problem as current Argumend, but at least you'd be attacking the real mission).

---

## The Zero-Step Before Any Direction

The uncomfortable-truths agent's recommendation is the most important sentence in this memo, and it applies *regardless of which direction you pick*:

> **Stop shipping for 14 days. Put Argumend in front of 20 real humans who aren't you. Sit next to 5 of them. Write down (a) do they understand what the map is in under 10 seconds, (b) do they return the next day unprompted, (c) what do they say Argumend is *for*, in their own words.**

If you pick a direction without this step, you are picking a beautiful guess stacked on an existing beautiful guess. The cost of 14 days is nothing compared to another quarter of orbit.

Whichever direction you pick becomes the spec. The spec becomes a plan. The plan becomes implementation. But not today.

---

## What the next session should do

**If the founder does the 14-day observation first (recommended):** Bring the notebook back. This memo becomes input to a real brainstorming session grounded in observed behavior.

**If the founder picks a direction today without observation:** Write a spec for the chosen direction under `docs/superpowers/specs/2026-04-NN-<direction>-design.md`. Then a plan under `docs/superpowers/plans/`. Then execute. But understand: you are betting against the discovery agents' unanimous finding that you are iterating without a real user.

**If the founder does both (observation + direction at the end of it):** Best outcome. That's what the discovery team unanimously pointed toward.

---

## Appendix: Agent reports

All 11 agent reports are preserved in the conversation transcript for this session. The convergence pattern:

- Map is decorative → Canvas Critic, First-5-Min, IA Critic, Plasticity Assessor
- No voice → Voice Auditor, Refs Researcher
- Methodology is vibes → Topic Quality Auditor, Content Honesty Auditor
- No mending → Does-It-Mend Auditor
- Wrong competitor frame → Refs Researcher
- Iterating without users → Uncomfortable-Truths Critic

Nothing in the agents' findings contradicts anything else. That is itself a signal.

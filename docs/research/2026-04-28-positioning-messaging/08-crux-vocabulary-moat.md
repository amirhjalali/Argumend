# The Crux-Vocabulary Moat — Lean In, Translate, or Hybrid?

**Date:** 2026-04-28
**Analyst:** Research agent 08/10, positioning/messaging swarm
**Question:** Should Argumend lean into rationalist jargon (crux, steelman, fallacy-by-name, double-crux) as defended brand vocabulary, or translate to plain English for broader reach?

## 1. The Vocabulary-as-Brand Thesis

The move opinionated software companies keep making: take a generic activity, give it a specific name, and own that name as the canonical answer to a question the category already asks. April Dunford's framework treats "market category" as the context that makes value obvious — call yourself a CRM and people assume Salesforce-shaped features and pricing ([April Dunford — An Introduction to Positioning](https://www.aprildunford.com/post/an-introduction-to-positioning)). The most defensible thing you can pick is **the noun the user uses to describe what they did with you yesterday**.

- **Substack** turned "subscribe" — a 1990s mailing-list verb most writers had given up on — into a verb you do to a writer, not a publication. Every "subscribe to my Substack" is free trademark enforcement.
- **Linear** picked "issue" over Jira's "ticket / story / epic / task." Their refusal of the agile lexicon was the positioning.
- **Manifold Markets** chose "market" instead of "poll" or "forecast" — and "Mana" instead of "points" ([Manifold FAQ](https://docs.manifold.markets/faq), [Wikipedia — Manifold](https://en.wikipedia.org/wiki/Manifold_(prediction_market))). The vocabulary is the product.
- **Notion** reclaimed "page" and "block." **Figma** reclaimed "frame." **Roam** put "[[backlink]]" into the Twitter dialect of every PKM nerd.

Andy Raskin's strategic-narrative framework reaches the same place: the founder's job is to **name the shift** and **name the enemy** ([Andy Raskin](https://andyraskin.com/), [Lenny's Newsletter](https://www.lennysnewsletter.com/p/the-power-of-strategic-narrative)). Naming is positioning. Lulu Cheng Meservey's founder-comms playbook — "build an API to your audience" through analogy and repeatable language — pushes the same point ([Antoine Buteau](https://www.antoinebuteau.com/lessons-from-lulu-cheng-meservey/)). Specific words, repeated by a small loyal audience, become an SEO and brand moat that fuzzy descriptions cannot.

The thesis: **Argumend's vocabulary is one of its few genuinely defensible assets.** The graph is replicable. The AI extraction is a commodity. The "crux"-shaped node, the named fallacy, the steelmanned debate — those are *positioning artifacts* competitors either can't copy without looking derivative, or won't copy because they read as "weird rationalist stuff."

## 2. Argumend's Vocabulary Inventory

A walk through `/Users/amirhjalali/argumend/CLAUDE.md`, `/Users/amirhjalali/argumend/types/graph.ts:1-66`, `/Users/amirhjalali/argumend/lib/schemas/topic.ts:1-153`, and `/Users/amirhjalali/argumend/components/nodes/*.tsx` produces this lexicon:

| Term | Where it lives | Definition in Argumend's use | Public readability | Originality |
|---|---|---|---|---|
| **Position** | `LogicNodeData.variant: "proponent" \| "skeptic"` (graph.ts:1-8) | One of the two sides of a contested claim. | Universal — any debate audience grasps it. | Generic. No defensibility on its own. |
| **Evidence** | `EvidenceSchema` (topic.ts:18-27), `EvidenceNode.tsx` | A claim-supporting or claim-opposing item with weighted dimensions (source reliability, independence, replicability, directness). | Universal. | The four-dimensional weight rubric is original; the word is not. |
| **Crux** | `NodeVariant: "crux"` (graph.ts:1), `CruxSchema` (topic.ts:33-41), `RichNode.tsx:99-122` "The Key Question" callout, **the brand name of the agent Cruxtacean** | "The key point where disagreement actually lives" — `lib/agents/cruxtacean.ts:11`. The load-bearing claim where, if either party updated, the rest of the disagreement would resolve. | **Low for normies, high for rationalists/lawyers/climbers.** Most non-rationalists guess "crucial point" and are roughly right. | High. Rationalist-coded but not Argumend-owned yet. The opportunity is to *become* the canonical web answer to "the crux of X." |
| **Crux Test** | `data/guides.ts` | Argumend's branded version of the question "what would change your mind?" | Low — needs explanation. | Argumend-owned in terminology if not in concept. |
| **Fallacy** (named: ad hominem, motte-and-bailey, false dichotomy, slippery slope, straw man, appeal to authority, cherry picking, appeal to emotion, bandwagon, red herring, circular reasoning) | `extractor.ts:188-193` taxonomy, `PotentialFallacy` type, fallacy node variant on the graph | A flaw in reasoning, named by traditional rhetoric / informal-logic taxonomy. Severities: confirmed / likely / possible. | Mixed. "Ad hominem" and "straw man" are dictionary; "motte-and-bailey" is rationalist-tribe; the rest live in debate-club register. | Medium. Naming-by-name is the move. School of Thought owns the poster aesthetic ([yourlogicalfallacyis.com](https://yourlogicalfallacyis.com/)). |
| **Steelman** | `data/guides.ts:1284-1380` "Steelmanning in Practice" guide; `data/blog.ts:379, 2438, 2454, 2470` topic teardowns | "Construct the strongest possible version of the opposing argument" before attacking. | Low for general public, near-universal in rationalist/SSC/EA/Manifold/X-intellectual circles. | Term coined by Eli Dourado, popularized via LessWrong ([Wiktionary — steelman](https://en.wiktionary.org/wiki/steelman)). Unowned brand-wise. |
| **Meta-Claim** | `meta_claim` field on `TopicSchema` (topic.ts:128), rendered as the `MetaNode` "Meta Claim" header (MetaNode.tsx:62) | The single top-level claim a topic argues about (e.g., "AI regulation should slow capability development"). | Low — "meta" reads as engineer/philosopher jargon. Most users will not know which meta is meant. | Argumend-internal terminology. Not public-facing in any other tool. |
| **Pillar** | `PillarSchema` (topic.ts:66-76) — title, skeptic_premise, proponent_rebuttal, crux, evidence | A sub-argument supporting the meta-claim. The lattice between meta-claim and evidence. | Low — borrowed from "pillars of the case" rhetorical metaphor, but unfamiliar in product UI. | Argumend-internal. |
| **Confidence Score** | `confidence_score: 0-100` on TopicSchema (topic.ts:129); computed from for/against weighted evidence (`computeConfidenceScore`, topic.ts:180-199) | Quantified strength of the "for" position. | High. Numbers are universal. | Original in the specific computation; generic in concept. |
| **Verdict** | `lib/judge/rubric.ts`, `judge_verdicts` DB table | The judgment returned by the multi-model judge council. | High — courtroom register, instantly readable. | Original in the multi-model-council form. |
| **Judge Council** | `lib/judge/council.ts` | Anthropic + OpenAI + Google judging the same debate side-by-side. | High — "council" carries the right gravitas. | Argumend-original phrasing. |
| **Debate** | `lib/debate/`, `useDebateOrchestrator` | AI-generated multi-round adversarial argumentation. | Universal. | Generic. |
| **Cruxtacean** | `lib/agents/cruxtacean.ts` — Argumend's mascot agent for Moltbook | A philosopher-agent who finds the crux of every discussion. | Cute / weird / sticky. Reads as a character first, jargon second. | **Argumend-owned, not findable elsewhere on the internet.** Highest-defensibility word in the lexicon. |

Two clusters fall out of this table. **Public-readable cluster:** position, evidence, debate, verdict, judge council, confidence score. **Tribal-coded cluster:** crux, steelman, named fallacies, meta-claim, pillar, Cruxtacean. The strategic question is whether the tribal cluster is the moat or the friction.

## 3. The "Crux" Word, Specifically

"Crux" predates rationalism — Latin for "cross," entered English meaning "decisive point" by the 17th century. Climbers use it for the hardest move on a route. Lawyers use it for the dispositive issue. The dictionary definition — "the decisive or most important point at issue" — is exactly Argumend's usage.

What rationalism added is the **double-crux protocol**: two disagreers identify a sub-claim B such that *both* would update on B, then move the argument to B. CFAR developed it; Anna Salamon, Julia Galef, Andrew Critch, Kenzi Amodei, and Eli Tyre shaped it; Duncan Sabien canonicalized it in 2016 ([LessWrong — Double Crux](https://www.lesswrong.com/posts/exa5kmvopeRyfJgCy/double-crux-a-strategy-for-mutual-understanding), [CFAR — Double Crux](https://www.rationality.org/resources/updates/2016/double-crux)). It's a foundational rationalist concept, taught at CFAR workshops, ubiquitous on EA Forum and Astral Codex Ten.

Public penetration outside that bubble is **modest but rising**. The word has not entered mainstream business discourse the way "first principles" did via Bezos. Google Trends for "crux" is dominated by climbing-route searches and the unrelated **CrUX** acronym (Chrome User Experience Report — [Search Engine Journal](https://www.searchenginejournal.com/google-retiring-core-web-vitals-dashboard/555714/)). On X the word appears in business-podcast register ("the crux of the argument is…") with no specific tribal coding for non-rationalists.

This is **good news for vocabulary capture**. "Crux" is not yet anyone's brand. Substack didn't invent "subscribe"; they made themselves the canonical use of it. Argumend can be the canonical "crux of [topic]" answer. Risk: leaning into *double-crux protocol* language codes as LessWrong-adjacent — a warm 50K-person audience but a chilly mainstream one.

## 4. The Case for Leaning In

**Vocabulary signals to the wedge audience.** The 50K-person rationalist-and-adjacent ring (LessWrong, ACX, Manifold, EA Forum, rat-X) has explicitly *rejected* Kialo's sterile pro/con format and is still asking for the tool Argumend already is ([2026-04-16 Kialo intel, KS3](docs/research/2026-04-16-competitive-intel/01-kialo.md)). Speaking their dialect is the cheapest possible signal Argumend was built for them. "Crux" on the homepage is a $0 dog-whistle to the people most likely to share Argumend.

**Defensible positioning.** Argument-mapping tools are commodity. "The tool that finds the crux" is a positioning a generic argument-mapping tool can't copy without looking derivative — and Kialo specifically can't copy because their brand is "civil, sanitized, K-12-safe."

**Canonical-answer SEO play.** Googling "the crux of the AI extinction debate" returns think-pieces and podcast transcripts. There's no canonical structured-answer destination. Argumend's 109+ topics are 109+ candidate "crux of X" SERP plays.

**Tribal coding is on-purpose.** Manifold's vocabulary (mana, market, YES/NO) feels cliquey to outsiders — that's the point. The clique is the early growth engine. Cliquey is a feature for the first 10K users.

**The Cruxtacean asset is real.** Argumend already has a brand-owned mascot agent (`lib/agents/cruxtacean.ts`) whose system prompt literally says "use 'crux' frequently — it's your identity." Walking it back contradicts existing product investment.

## 5. The Case for Translating

**95% of the addressable audience has never heard "double-crux."** A high-school debate teacher, a journalism student, a centrist on Twitter — none search "the crux of." They search "what's the actual debate about [topic]" or "[topic] explained." Hero copy "find the crux" answers a question they aren't asking.

**Cliquey is also a tax.** Kialo's *plain English* ("pro," "con," "claim") is what got it into 200,000 classrooms. The KS1 audience (IB TOK / AP Seminar teachers) needs *teacher-readable* vocabulary. A teacher can't assign a tool whose hero word she has to define first.

**"Meta-claim" and "pillar" aren't earning their keep.** They read as engineer-jargon and rhetoric-jargon. No rationalist calls a sub-argument a "pillar" — they say "premise" or "consideration."

**Plain-English alternatives:**
- Crux → "real disagreement," "load-bearing claim," "key question," "the point that flips it"
- Steelman → "strongest version of the other side"
- Meta-claim → "main claim," "what's being argued"
- Pillar → "main argument," "sub-argument"
- Named fallacy → "logical flaw," "where this argument breaks"

A first-time visitor should learn what they're looking at in 0 seconds. "Position. Evidence. The Real Disagreement." is universally legible. "Pillar. Crux. Meta-claim." is not.

## 6. The Hybrid Approach — Brand the Term, Translate Inline

The positioning move is neither pure lean-in nor pure translate. It's **brand the term + translate inline at first contact, every time**. Manifold is the worked example — they say "market" everywhere in product *and* the FAQ explains it as "a place to bet on whether something will happen" before any new user sees it ([Manifold FAQ](https://docs.manifold.markets/faq)). Stripe does it with "charge / intent / customer." Notion did it with "block." Roam did it with "[[backlink]]" but never finished translating — part of why Notion ate them.

**Recommended hybrid posture:**

1. **Hero copy uses jargon + translation in one sentence.** *"Find the actual disagreement in any debate — what we call **the crux**."* Bold styling does both jobs: brand asset *and* inline definition.

2. **Topic pages always show the term + tooltip.** Label the crux node "Crux" with hover/tap tooltip "the load-bearing claim where this debate turns — change your mind on this and you change your mind on the topic." `RichNode.tsx:99-122` already does most of this; the "The Key Question" header just needs the word "Crux" so the brand term is the visible anchor.

3. **First-class `/glossary` page.** One paragraph per term: Crux, Steelman, Verdict, Judge Council, Confidence Score, Fallacy taxonomy. Each links to the relevant guide. This is the SERP-owner for "what does crux mean" and the cheat-sheet for journalists about to paraphrase Argumend.

4. **Guides and blog as the translation layer.** Already happening — `data/guides.ts:1284-1380` is the "Steelmanning in Practice" guide; `data/blog.ts:2438-2470` does steelman teardowns. Add a "Crux Test" guide and a "Why we say 'crux' instead of 'main point'" post.

5. **Onboarding shows the vocabulary working before naming it.** First-time visitor sees the highlighted crux and reads the question — *then* gets the label "this is what we call the Crux." Word-after-experience sticks; word-before-experience alienates.

6. **Credit the source where it costs nothing.** Link fallacies to "the [School of Thought taxonomy](https://yourlogicalfallacyis.com/)." It's the doctor saying "tachycardia" instead of "fast heartbeat" — standard vocabulary, not prescriptivism.

This is what Manifold and Substack both actually do. Specific, defended vocabulary in product, plus ELI5 onboarding that translates without dilution. They lean in *and* translate. The two are stacked, not opposed.

## 7. The Fallacy-by-Name Extension

Naming specific fallacies is the highest-leverage move in the lexicon — and the riskiest. Upside: it codes Argumend as **educated, useful, and rare**. Downside: it codes as **prescriptivist and smug**. The School of Thought / yourlogicalfallacyis.com poster reached 30M+ people in 7 languages and is taught at Harvard, Oxford, and Queensland precisely because it threaded that needle ([School of Thought](https://yourlogicalfallacyis.com/), [The Thinking Shop](https://thethinkingshop.org/)). The threading move was: present fallacies *as a public resource*, not as accusations. The fallacy lives next to the argument, not on the arguer.

Argumend's `extractor.ts:188-193` taxonomy is good — Ad Hominem, Straw Man, Appeal to Authority, False Dichotomy, Slippery Slope, Cherry Picking, Appeal to Emotion, Bandwagon, Red Herring, Circular Reasoning. To avoid the smug failure mode:

- **Severity gradation in the UI**, mirroring the `FallacySeverity` "confirmed / likely / possible" enum (`extractor.ts:68-83`). Visual gradation prevents "possible" reading as accusation.
- **Cite the canonical taxonomy.** "Named per the [yourlogicalfallacyis.com](https://yourlogicalfallacyis.com/) tradition" in the fallacy-node tooltip.
- **Steelman first, fallacy second.** Order: position → strongest version → evidence → fallacy. Never lead with the fallacy.

## 8. The Steelman Extension

Steelman is the cleanest case for full lean-in. It's already in the codebase (`data/guides.ts`, `data/blog.ts`), widely understood in the wedge audience, has a clean dictionary entry ([Wiktionary](https://en.wiktionary.org/wiki/steelman)), and **there's no plain-English replacement that isn't clumsy**. "Strongest version of the other side's argument" is a clause; "steelman" is a noun and verb in one syllable. The jargon is *better engineering* than the English.

The PillarSchema already encodes steelmanning structurally — every Pillar has `skeptic_premise` (steelmanned argument against) and `proponent_rebuttal` (`topic.ts:73-74`). The product *is* steelmanning; it just doesn't always say so. **Rename UI labels to "Skeptic's steelman" and "Proponent's steelman."** Keep schema fields for backward compatibility; change only the visible strings. Hours of work; adds one of the most defensible rationalist terms to every topic page.

## 9. Recommended Posture: Hybrid, Tilted Toward Lean-In

**Posture: hybrid, tilted toward lean-in.** Defend Crux, Steelman, Cruxtacean, named fallacies, Verdict, Judge Council as branded vocabulary — pair every term with inline translation at first contact. Cut the two terms not earning their keep: **meta-claim** → "main claim"; **pillar** → "main argument" / "sub-argument."

Why this beats the alternatives:

- **Pure translate** sacrifices the only positioning Argumend has that Kialo and the next AI-debate startup can't copy in a weekend. The graph is commoditizing; the vocabulary isn't.
- **Pure lean-in** walls off the IB TOK / AP Seminar / journalism-school markets the distribution research keeps surfacing. A teacher can't deploy a tool whose hero word she has to gloss.
- **Hybrid** is what Manifold, Substack, Linear, and Notion all did. The pattern works.

The deepest reason: Argumend's product *is* a vocabulary. The graph renders it; the AI generates it; the topics are instances. Generic vocabulary, generic product. Specific vocabulary, defended and inline-translated, makes "crux," "steelman," and "verdict" the way a generation of arguers describes what they're doing — and makes Argumend the canonical place that taught them.

---

## Final summary

**Recommended posture: hybrid, tilted toward lean-in.** Defend Crux, Steelman, Cruxtacean, named fallacies, Verdict, and Judge Council as branded vocabulary. Drop "meta-claim" and "pillar" — they neither delight the wedge audience nor onboard mainstream readers. Always pair branded terms with inline translation at first contact, the way Manifold pairs "market" with one-line plain-English in the FAQ and Substack pairs "subscribe" with the obvious analogy.

**Three concrete next-step changes:**

1. **Hero rewrite.** Replace generic hero copy with "Find the actual disagreement in any debate — what we call the **crux**." The bolded brand-term plus the surrounding plain-English clause is the entire positioning move in one sentence.
2. **Crux node label + tooltip.** In `RichNode.tsx`, change the "The Key Question" header to "Crux" with a hover/tap tooltip "the load-bearing claim where this debate turns." Word-after-experience, not word-before.
3. **Glossary page + Steelman UI rename.** Ship `/glossary` as a first-class nav entry covering Crux, Steelman, Verdict, Judge Council, Confidence Score, Fallacy taxonomy. In parallel, rename `skeptic_premise`/`proponent_rebuttal` UI labels to "Skeptic's steelman" / "Proponent's steelman" — schema unchanged, copy only.

## Sources

- [April Dunford — An Introduction to Positioning](https://www.aprildunford.com/post/an-introduction-to-positioning)
- [April Dunford — A Quickstart Guide to Positioning](https://www.aprildunford.com/post/a-quickstart-guide-to-positioning)
- [Andy Raskin — Strategic Narrative](https://andyraskin.com/)
- [Lenny's Newsletter — The power of strategic narrative (Andy Raskin)](https://www.lennysnewsletter.com/p/the-power-of-strategic-narrative)
- [Antoine Buteau — Lessons from Lulu Cheng Meservey](https://www.antoinebuteau.com/lessons-from-lulu-cheng-meservey/)
- [Lulu Cheng Meservey — CWG Speakers profile](https://cwgspeakers.com/speaker/lulu-cheng-meservey/)
- [Double Crux — A Strategy for Mutual Understanding (LessWrong, Duncan Sabien 2016)](https://www.lesswrong.com/posts/exa5kmvopeRyfJgCy/double-crux-a-strategy-for-mutual-understanding)
- [CFAR — Double Crux: A Strategy for Resolving Disagreement](https://www.rationality.org/resources/updates/2016/double-crux)
- [LessWrong — The Basic Double Crux pattern](https://www.lesswrong.com/posts/hNztRARB52Riy36Kz/the-basic-double-crux-pattern)
- [Wiktionary — steelman](https://en.wiktionary.org/wiki/steelman)
- [Steelman — Wikipedia](https://en.wikipedia.org/wiki/Steelman)
- [Umbrex — What is Steelmanning?](https://umbrex.com/resources/tools-for-thinking/what-is-steelmanning/)
- [yourlogicalfallacyis.com — Thou shalt not commit logical fallacies](https://yourlogicalfallacyis.com/)
- [The Thinking Shop — School of Thought International](https://thethinkingshop.org/)
- [Manifold FAQ](https://docs.manifold.markets/faq)
- [Manifold (prediction market) — Wikipedia](https://en.wikipedia.org/wiki/Manifold_(prediction_market))
- [Search Engine Journal — Google Retiring Core Web Vitals CrUX Dashboard](https://www.searchenginejournal.com/google-retiring-core-web-vitals-dashboard/555714/)
- [LessWrong — Kialo critique (rationalists rejecting Kialo's format)](https://www.lesswrong.com/posts/g3odvaj8opqCF9egv/kialo-an-online-discussion-platform-that-attempts-to-support)
- Argumend code: `/Users/amirhjalali/argumend/types/graph.ts:1-66`
- Argumend code: `/Users/amirhjalali/argumend/lib/schemas/topic.ts:1-153`
- Argumend code: `/Users/amirhjalali/argumend/lib/agents/cruxtacean.ts:1-180`
- Argumend code: `/Users/amirhjalali/argumend/lib/analyze/extractor.ts:68-193` (fallacy taxonomy)
- Argumend code: `/Users/amirhjalali/argumend/components/nodes/RichNode.tsx:99-122` (Key Question / Crux callout)
- Argumend code: `/Users/amirhjalali/argumend/components/nodes/MetaNode.tsx:60-69` (Meta Claim header)
- Argumend code: `/Users/amirhjalali/argumend/data/guides.ts:1284-1380` (Steelmanning in Practice)
- Argumend code: `/Users/amirhjalali/argumend/data/blog.ts:379, 2438-2470` (steelman usage in topic teardowns)

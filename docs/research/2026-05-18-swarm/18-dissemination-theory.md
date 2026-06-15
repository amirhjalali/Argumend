# How Good Information Actually Spreads in 2026

*Research dump for Argumend strategy. Date: 2026-05-19.*

---

## TL;DR

- **Two distinct spread modes operate in parallel, and confusing them kills products.** *Memetic* spread is viral, catchy, lossy, and decays fast (Clubhouse, NFTs, most rationalist memes). *Durable* spread is canonical-reference-shaped: a load-bearing artifact that other people cite, link, and quote verbatim for years (SSC/ACX, Our World in Data, ProPublica investigations, key Yudkowsky/MacAskill texts). Argumend must decide which mode each surface optimizes for — they require opposite tradeoffs.
- **The terminal node of the modern epistemic stack is no longer Google; it's Wikipedia, LLMs, and a small set of canonical-reference sites.** Wikipedia is cited in ~48% of ChatGPT responses ([GEO AIO Marketing](https://geoaiomarketing.com/the-role-of-wikipedia-in-training-llms-to-recognize-your-brand/)). LLMs verbatim-memorize references after ~1,000 citations. Anything that becomes the thing people link *to* when they want to settle a question accrues compounding returns. Anything that lives only on social timelines disappears in 100 days ([link rot research](https://en.wikipedia.org/wiki/Link_rot)).
- **There is a real and underappreciated reach-vs-fidelity tradeoff** ([CEA fidelity model](https://www.centreforeffectivealtruism.org/blog/the-fidelity-model-of-spreading-ideas)). Mass-media reach corrupts the idea ("Earning to Give" → "Wall Street, save the world"). High-fidelity channels (long-form, in-person, books, canonical posts) preserve the idea but reach fewer. The honest answer for Argumend is not "pick one" but **stage the funnel**: cheap memetic surfaces feed into a durable canonical artifact at the bottom.

---

## Memetic spread vs. durable spread

| Axis | Memetic | Durable |
|---|---|---|
| Substrate | Timeline, short video, headline | Canonical URL, citation, archive |
| Lifecycle | Days to weeks | Years to decades |
| Re-transmission | Mutates (telephone game) | Quoted verbatim |
| Examples | "Stochastic parrots", "vibe shift", BAYC | *Slate Star Codex* "Meditations on Moloch", OWID's CO2 chart, Wikipedia's "Existential risk from AI" article |
| Failure mode | Stripped to caricature | Calcified, ignored by general public |
| Optimized for | Reach × emotion | Re-use × authority |

**Why this matters:** the most influential ideas of the last decade did *both*, but in stages. "AI x-risk" became a memetic frame in 2023 (TIME's "End of Humanity" cover, the FLI pause letter, Hinton/Bengio mainstream signatures — see [Euronews 2023 retrospective](https://www.euronews.com/next/2023/12/27/2023-was-the-year-ai-went-mainstream-it-was-also-the-year-we-started-to-panic-about-it)), but it had been compounding durably for 15 years before that on LessWrong, MIRI papers, and Bostrom's *Superintelligence* (2014). The memetic explosion only worked because the canonical layer was already load-bearing.

### The "epistemic civilization" framing

The phrase doesn't appear verbatim in Yudkowsky's corpus, but the underlying claim is consistent across **Yudkowsky, Vitalik, and Sam Hammond**: civilization runs on shared epistemic infrastructure, and that infrastructure is currently degrading or being captured.

- **Yudkowsky** (LessWrong, *Rationality: A-Z*): epistemic rationality as the slow strengthening of humanity's truth-finding apparatus across generations ([LessWrong](https://www.lesswrong.com/rationality)).
- **Vitalik Buterin**: prediction markets (Polymarket) as "social epistemic tools"; DeSci shifts legitimacy "away from traditional gatekeepers toward programmable systems of provenance" ([Crypto Briefing](https://cryptobriefing.com/vitalik-buterin-polymarket-cftc-defense/)).
- **Sam Hammond** (*Ninety-five theses on AI*, *AI and Leviathan*): institutions are epistemic, not normative — property rights, rule of law, and religious freedom are recent constructions that depend on functioning information environments. AI can either fortify or hollow them ([Second Best](https://www.secondbest.ca/p/ninety-five-theses-on-ai)).

Common thread: **the substrate matters more than any individual message.** Argumend is a substrate play, not a content play. That's the right read of the founder's instinct.

---

## Case studies: durable penetration

**Effective Altruism** grew ~37%/year from 2015–2021, hitting $416M annually directed at vetted charities ([80,000 Hours](https://80000hours.org/2021/11/growth-of-effective-altruism/)). The growth was *deliberately* high-fidelity: CEA explicitly chose books, conferences, university chapters, and in-person community over mass media — and wrote a now-canonical essay arguing that mass coverage actively damaged the movement ([CEA fidelity model](https://www.centreforeffectivealtruism.org/blog/the-fidelity-model-of-spreading-ideas)). The strategy worked until SBF/2022, then the memetic spillover (after the canonical layer was contaminated) collapsed the brand even though the underlying ideas survived.

**ACX / SlateStarCodex** is the cleanest example of blog-to-canonical-reference. SSC posts are routinely cited verbatim in academic papers, policy memos, and as authoritative summaries in their own right. *Harper's* in 2026 called Alexander "a titanic figure" with "extremely powerful figures in Silicon Valley" treating him as the most significant intellectual of the time ([Wikipedia](https://en.wikipedia.org/wiki/Slate_Star_Codex)). Mechanism: very long posts (8–20k words), idiosyncratic but stable URL structure, low publication frequency, no SEO games, and a comment culture that turned each post into a research artifact.

**Our World in Data** is the highest-leverage epistemic infrastructure of the last decade. 100M annual readers, 8,000+ academic citations/year, 50,000+ media mentions, open license, reused by policymakers and the WHO ([Oxford Social Sciences](https://socsci.web.ox.ac.uk/our-world-in-data-transforming-data-into-global-impact)). Mechanism: one canonical chart per question, permanent URLs, open-source code, machine-readable data, CC-BY license that *encourages* embedding. They optimized for being the thing other people cite, not the thing people read.

**ProPublica** invented the modern nonprofit investigative model by giving full republication rights to partner outlets — now 90+ partners, multiple Pulitzers, and a structural template that spawned a wave of nonprofit imitators ([Poynter](https://www.poynter.org/business-work/2025/propublica-nonprofit-business-model-journalism-poynter-50/)). Mechanism: the asset (the investigation) is the durable unit; distribution is given away so the asset compounds in reach without losing fidelity.

**AI x-risk as frame:** went from LessWrong subculture (~2008) to *TIME* cover (June 2023) to default policy vocabulary (UK AI Safety Summit, EU AI Act preamble). Sequence: canonical books (Bostrom 2014) → academic credentialing (Hinton, Bengio) → coordinated memetic moment (FLI pause letter, March 2023) → terminal-node capture (Wikipedia "Existential risk from AI" article is now the definitive reference).

## Case studies: flash and fade

**Clubhouse** hit a $4B valuation in April 2021, 10M users in February 2021, then collapsed by late 2022. Failure modes: pure synchronous audio = no durable artifact, no transcripts, no search, no embedding, no citation. Every conversation was unrecoverable the moment it ended ([JustAnotherPM](https://www.justanotherpm.com/blog/the-rise-and-fall-of-clubhouse-what-product-managers-learn-from-it)). Lesson: **if you can't link to it, it didn't happen.**

**NFTs as "ownership economy"** — $2.7B daily OpenSea volume at peak (March 2021), now ~$5M. The term itself is now "culturally toxic" ([NFT Culture post-mortem](https://www.nftculture.com/nft-news/the-unraveling-and-rebirth-of-digital-ownership-a-post-mortem-on-the-2021-nft-empire-and-the-rise-of-verifiable-utility/)). Failure mode: the idea was a pure meme — "you own this" — with no load-bearing canonical text underneath. No Bostrom, no MacAskill, no SSC equivalent.

**Rationalist memes that flashed and faded:** "shiri's scissor", "moloch" (partially survived via SSC canonical), "the dath ilan thing", most of the 2014-era Bayesian-cult vocabulary. These all spread memetically inside the subculture but never crossed into durable infrastructure because no one outside the in-group could link to a definitive explanation that didn't require 40 hours of prerequisite reading.

---

## Infrastructure analysis: what makes good info compound

Six properties separate compounding info-assets from disappearing ones:

1. **Permanent URLs.** Web citation accessibility drops from 87% (0–5 years old) to 38% (>10 years). Permanent link rot tripled from 5% (2012) to 15% (2025). 70% of news links disappear within a day ([link rot studies](https://en.wikipedia.org/wiki/Link_rot)). `.edu` URLs survive at 93% vs 42% for `.com`. **If your URLs aren't stable, you're not building infrastructure.**
2. **Embeddability + open license.** OWID's CC-BY + iframe embeds let every newsroom and textbook ship their charts. Wikipedia's CC-BY-SA created the largest knowledge graph in history.
3. **Citation-shaped.** Things get cited when they look citeable: stable URL, dated, attributed, a single defensible claim per page, machine-parseable.
4. **Wikipedia + LLM legibility.** Wikipedia is the single highest-cited domain in ChatGPT responses (47.9%) ([GEO AIO Marketing](https://geoaiomarketing.com/the-role-of-wikipedia-in-training-llms-to-recognize-your-brand/)). Bibliographic info becomes verbatim memorized in LLMs beyond ~1,000 citations. Getting into Wikipedia and the LLM training set is now the modern equivalent of getting into the *Britannica*.
5. **Archive coverage.** Wayback retrieves 72.6% of dead URLs ([link rot research](https://en.wikipedia.org/wiki/Link_rot)). Anything you want to last needs to be archive-friendly (no JS-only content, no dynamic database renders for canonical pages).
6. **Long-form anchor + short-form distribution.** Lex Fridman, Rogan, and similar long-form formats now outdraw legacy newspapers — Rogan has more subscribers than NYT ([CJR](https://www.cjr.org/feature/the-idiot-lex-fridman-podcast-musk-trump-modi-tesla.php)). But the long-form episode itself doesn't compound; the clips, transcripts, and the *referenced canonical sources* do. Substack hit unicorn status in July 2025 ([Entrepreneur](https://www.entrepreneur.com/growing-a-business/why-substacks-20-million-bet-could-reshape-the-creator/492598)) precisely because Notes (short-form) feeds the durable Newsletter (long-form) asset.

---

## The reach vs. fidelity tradeoff

CEA's [fidelity model](https://www.centreforeffectivealtruism.org/blog/the-fidelity-model-of-spreading-ideas) is the cleanest statement of the tradeoff:

> Low-fidelity channels (mass media) reach vastly more people but distort core ideas. High-fidelity methods (conferences, books, personal conversations) maintain nuance but reach fewer.

The "telephone game effect": each retransmission through low-fidelity channels degrades the idea. By the time "Earning to Give" reached *Time*, it had become "Join Wall Street. Save the world" — losing replaceability, counterfactual impact, and comparative advantage in one headline.

**The honest answer is not to pick a side. It's to stage the funnel:**

- Top of funnel: memetic surfaces (clips, charts, one-line topic taglines) optimized for reach.
- Middle: long-form anchors (canonical topic pages, deep dives) optimized for fidelity.
- Bottom: citation-shaped artifacts (permanent URLs, embeddable graphs, downloadable data) optimized for becoming load-bearing in someone else's argument.

The mistake everyone makes is optimizing the whole funnel for one mode. Clubhouse was all-memetic. Most academic projects are all-fidelity. EA almost got it right but didn't control the memetic layer when SBF hit.

---

## Implications for Argumend's strategy

1. **Treat each topic page as a canonical reference, not a marketing surface.** The OWID model. One stable URL per controversy, permanent, dated, embeddable, with downloadable structured data (positions/cruxes/evidence as JSON-LD + CSV). The goal: when someone googles "is the minimum wage good", Argumend's topic page is the thing the next *Vox* explainer cites. This is a Wikipedia-adjacent move, not a content-marketing move.
2. **Become Wikipedia-legible and LLM-legible before becoming SEO-legible.** Wikipedia is in ~48% of ChatGPT citations and is the terminal node. Argumend's structured topic data (positions, cruxes, fallacies as discrete addressable units) is *already* the right shape for citation. Make every node addressable by URL fragment, ship a Wikidata-compatible export, and seed citations into Wikipedia articles where there's a genuine gap. Aim to be in the LLM training set by 2027.
3. **Stage the funnel — don't pick reach or fidelity.** Memetic top (a clip of the graph for X/TikTok), durable bottom (the permanent topic URL). The clip exists to drive the link, not to convey the argument. This means investing in *two* content pipelines, not one — and accepting that the memetic layer will distort and that's fine because the durable layer is one click away.
4. **Solve link permanence as a core feature, not an afterthought.** Topic URLs must be stable for 10+ years. No URL changes during redesigns. Server-rendered (not JS-only) so archives can capture them. Versioned (so a 2026 snapshot is permanently recoverable even after the live page updates). This is the single highest-leverage move and almost no consumer product does it.
5. **Stop chasing virality, start chasing citation count.** The success metric should not be "topic page got 50k views" but "topic page got cited by N journalists, M academics, and is referenced in Wikipedia." Citation count is the durable analog of reach and compounds for years. Build a public dashboard for it (OWID does this — they prominently display 8,000+ citations/year).
6. **Make the graph the primary embeddable artifact.** OWID's charts succeeded because every newsroom could embed them with one line of HTML. Argumend's argument graphs should be one-line embeddable iframes, CC-BY-licensed, with a stable visual identity that becomes recognizable across the web. Every embed on someone else's site is a permanent backlink and a brand impression — the compounding infrastructure play.
7. **Pair canonical topic pages with high-fidelity long-form anchors.** Each major topic should have a podcast episode or a 5,000-word essay that is the authoritative human-narrated version. This is the SSC/ACX move — long, idiosyncratic, defensible. Distribute clips of it on short-form. The long-form is the durable anchor; the clips are the memetic spores; the topic page is the citation target. All three work together or none of them work.

---

## Open questions

- **Wikipedia capture strategy:** is it ethical/realistic to seed Argumend citations into Wikipedia articles, or does that violate WP:COI? Probably the right move is to make the data so obviously useful that other editors cite it unprompted — but how long does that take?
- **LLM citation engineering:** is there a known playbook for getting into the next generation of LLM training sets, or is it purely a function of being cited heavily on the open web?
- **Versioning and the "fact drift" problem:** if Argumend updates a topic page as new evidence arrives, what happens to citations of the prior version? OWID handles this with explicit versioning. Need to decide before the first redesign.
- **Memetic-layer governance:** if Argumend clips go viral with distorted framing (the EA / "Wall Street save the world" problem), what's the response? Pre-emptive canonical counter-clips? Editorial guidelines for which framings are publishable?
- **Reach metric we'd actually trust:** citation count is right in principle but lags by years. Is there a leading indicator — embed count? Repeat-visit rate on topic pages? Direct-link share rate vs. social share rate?
- **Does the "epistemic civilization" frame help or hurt positioning?** It's accurate to what Argumend is doing but may sound grandiose to non-rationalist audiences. Worth A/B testing against more grounded framings ("the wiki for controversies", "Our World in Data for arguments").

---

*Sources cited inline. Word count: ~2,160.*

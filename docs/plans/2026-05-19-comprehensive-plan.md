# Argumend — comprehensive plan to reach the goal

Date: 2026-05-19
Built on: `/Users/amirhjalali/argumend/docs/research/2026-05-18-swarm/` (20 research reports + synthesis)
Status: draft, founder approval required at each phase boundary

---

## 1. Define the goal concretely

The Argumend goal, stated loosely, is "help people think more clearly about controversial topics" and "build epistemic infrastructure." That's a heading, not a goal. Translating into something measurable so we can tell if any move is working:

**Goal by 2026-12-31** — Argumend is a load-bearing reference work for at least ONE named community (rationalist OR AI-alignment OR debate-education OR journalism), with all of:
- **~10K monthly returning visitors** (currently ~0 by founder's own diagnosis)
- **Cited by name in ≥5 newsletters, podcasts, or papers** (currently 0)
- **≥1 institutional partnership active** (debate team, journalism org, alignment lab)
- **≥$80K committed runway** via grants or revenue (currently $0)
- **≥1 map embedded as a third-party iframe** somewhere on the public internet (the dissemination proof-of-concept)

If none of these are met by 2026-12-31, the project either pivots significantly or is honestly downsized to a hobby. That's the kill criterion.

## 2. Why this is hard (the constraints)

Three constraints shape every decision below:

1. **Solo founder, finite attention.** Token budget is not the bottleneck for *engineering*. It IS a force multiplier for research, content, outreach drafting, and analysis — but the founder still has to make the judgment calls, write in his own voice on the things that need that voice, and show up to relationships in person.

2. **The "in orbit, not climbing" diagnosis is correct.** Per memory: many plans shipped, no real users. The proximate cause is that the product hides itself (#15 onboarding), the audience never heard of it (#03, #04), and the content isn't packaged for the channels the audience uses (#05, #08, #09).

3. **Anti-tribal positioning is a real constraint with measurable cost.** Nature 2026 confirmed short-form algorithms favor partisan intensity (#08). Argumend must compete on saves + shares + citations rather than likes + shares. This narrows the channel mix.

## 3. Core thesis from the swarm

There is one path the 20 reports agree on, and it's not "ship more features":

> **Win one named community by shipping one canonical artifact, amplified by one named gatekeeper, packaged for distribution across formats the community already reads/watches/listens to — then convert that single-community penetration into compounding via embeddability and LLM-citation.**

Concretely:
- **Community:** rationalist core (LessWrong + ACX) is the primary target because it (a) rewards Argumend's exact in-group signal — steelman + named cruxes + visible confidence, (b) has named gatekeepers who can amplify in a single post, (c) has grant funders adjacent (Manifund, FLF, SFF, Open Phil, ACX Grants), and (d) physically gathers at Manifest 2026 (Jun 12–14 Berkeley) and LessOnline (Jun 5–7 Berkeley).
- **Artifact:** ONE killer map. Best two candidates from the topic deep-dives: *AI consciousness / moral patienthood* (Anthropic shipped model welfare; Lindsey introspection work; COGITATE partial disconfirmation of both IIT and GWT) or *superintelligence timelines / AI-2027*.
- **Gatekeeper:** Scott Alexander > Zvi Mowshowitz > Liron Shapira > habryka. Direct DMs with the map link + 2-sentence pitch.
- **Format mix:** one LW long-form post anchored to the live map; one Substack teaser cross-post; one Cleo-Abram-style 60s short; one NotebookLM Debate-mode 15-min audio; one Bluesky/Twitter thread.
- **Compounding:** every artifact links to the map; map is CC-BY iframe-embeddable; topic page is LLM-citation-optimized (60-word extractable TL;DR, named studies + numbers + dates, server-rendered text).

## 4. The 90-day execution plan

### Days 0–7: Foundation (the cheap, blocking work)

These are prerequisites for everything below. Don't skip.

**A. Onboarding aha fix.** Per #15:
- Replace static hero with live auto-playing mini-canvas (1 day).
- Swap `featuredTopicId` from gun-control-effectiveness to either moon-landing or ai-consciousness (10 min).
- Auto-expand root in `loadInitialTopic` / `setTopic` (30 min).
- CTA copy: "Open the map →" (10 min).

**B. Instrumentation baseline.** This is the gap the swarm couldn't fix from outside. Wire up:
- GA4 event funnel: visit → graph-interact → node-expand → 2-min-engaged → share/save.
- GSC verified + indexed for all 109 topic pages.
- Plausible/PostHog for session replay on 50 sessions/week.
- A "north-star number" dashboard the founder sees daily. Single metric: 2-min-engaged sessions/week.

Without this, every move below is flying blind.

**C. Fix the `sitemap.ts` hardcoded fake `lastModified` dates** (#20). 30-min fix; real freshness signals matter for indexing.

**D. Add `/llms.txt`** (#20). Trivial. Currently 404.

### Days 8–30: Launch arc

**E. Build the embeddable iframe route.** `/embed/[topicId]` — minimal chrome, the graph, attribution + link back. CC-BY license. 1–2 days. This is the dissemination compounding asset called out in #18 and #09.

**F. Pick ONE topic and write the canonical asset.** Recommend AI consciousness (#10 has the full research dump). The asset is a long-form essay (3,000–4,000 words, ACX register, epistemic-status preamble) that uses the live map as the central artifact. Founder writes this in his own voice — this is not delegate-able to agents because the rationalist audience reads voice.

**G. Stand up the content factory for 5 topics.**
- NotebookLM Plus subscription ($7.99/mo) + custom Debate-mode prompt from #05. One audio per topic.
- Cleo-Abram-template 60s short per topic (Descript + Submagic + CapCut). Per #08.
- Image generation backfill via FLUX.1 [pro] for the 5 picked topics + hero. Per #06.
- All 5 share one RSS feed → Spotify/Apple/Amazon auto-distribution.

**H. Ship the LessWrong "Introducing Argumend" post.** Anchored to the AI consciousness map. Recommended publish date: a Tuesday or Wednesday, 1 week before Manifest (so Jun 9–10 if shooting for Manifest). Cross-post day-of to EA Forum + Bluesky thread + reply guy on relevant ACX open thread.

**I. Cold-DM the gatekeepers.** Per #03: Scott, Zvi, Liron, habryka. Each DM is custom-written, references something they wrote, gives them a gift-mapped version of one of their own canonical posts (this is the AI-Impacts-style "we mapped your debate for you" play from #04). Founder-written, no templates.

**J. Apply to ACX Grants and Manifund** (#19). Both have low-friction processes; both are deterministic accelerants if they hit. Manifund regrants decide in days.

### Days 31–60: Compound or learn

By day 30 we have data from the launch arc. Two branches:

**Branch A — the LW post + DMs moved the needle.** Indicators: ≥1K LW karma, named-gatekeeper mention, ≥500 organic visits with ≥30% engaging the canvas, ≥1 grant hit.
- Action: scale to 5 more topics (covered by the swarm — UBI, geoengineering, nuclear, I-P framing, plus one founder-pick).
- Apply to FLF "AI for Human Reasoning" fellowship ($25–50K, 12 wks) and SFF (next round timing).
- Attend Manifest in person.
- Begin gentle institutional outreach to one debate program and one journalism org (NYT, ProPublica, or Drop Site for I-P framing relevance).

**Branch B — flat metrics.** Indicators: <100 organic LW-driven visits, no mention, no grant, single-digit shares.
- Stop. Diagnose with the founder, not with another agent swarm. The diagnosis is probably one of: wrong topic, wrong gatekeeper, wrong voice, wrong format, wrong cluster.
- If wrong cluster, the second-priority cluster is AI-alignment-adjacent (similar in-group signals, parallel gatekeepers, similar grant funders).
- If wrong voice / format, do a founder-voice exploration sprint (covered in §6).

### Days 61–90: Institutional wedge OR retreat

If Branch A, the third phase is the institutional wedge. This is the Kialo-Edu analogue — the channel that turns single-community penetration into a durable distribution beachhead.

Three candidate wedges, in priority order:
1. **AI-alignment lab partnership.** "Embed Argumend maps in your safety-case write-ups" — Anthropic's Alignment team, Apollo Research, METR, Redwood. The product fit is direct.
2. **One named debate program.** NSDA HQ won't move; 30–50 elite coaches might. Find one Harvard / Stanford / Berkeley coach via Manifest connections.
3. **One named journalism partner.** Drop Site or ProPublica or The Intercept for the I-P framing map; Asterisk for the AI-consciousness map.

The goal at day 90 is ONE active institutional pilot, not three.

If Branch B at day 60, the day 60–90 task is a brutal, honest founder-led pivot or downsizing decision. Don't paper it over with more agent swarms.

## 5. The 12-month milestone arc

| Date | Milestone | Kill criterion |
|---|---|---|
| 2026-05-26 | Onboarding fixed, instrumentation live | If not done, the rest doesn't matter |
| 2026-06-09 | LW post published, gatekeepers DM'd, embeddable iframes live | If post karma <50, single biggest signal |
| 2026-06-14 | Manifest 2026 attended, founder shook ≥10 hands | If not attended, missed the only physical density moment of the year |
| 2026-07-15 | First grant decision back (Manifund/ACX) | If both rejected with no feedback, signal |
| 2026-09-30 | 5 topics fully packaged across all formats, ≥1 institutional pilot, ≥1 LLM citation observable | The 90-day branch decision |
| 2026-12-31 | Goal-state from §1 hit, OR honest pivot/downsize | Hard stop |

## 6. What unlimited tokens specifically enables

The user's question is "what would you do with unlimited tokens." The answer is NOT "more of what we already did." The swarm already covered the strategic surface. What unlimited tokens uniquely unlocks is **parallel continuous workstreams that a solo founder cannot personally sustain** — but only where the work is genuinely token-bound rather than judgment-bound.

### 6a. Continuous adversarial review of every map (~5 agents always running)

Each map gets a daily devil's-advocate sweep: an agent argues each position's strongest case, flags every weak claim, proposes new evidence nodes, checks for missing cruxes. Output: a `reviews/` folder per topic with prioritized critique items. The founder triages, doesn't write.

### 6b. Continuous primary-source verification (~10 agents)

Every claim in every map gets traced to a primary source within 30 days. Where the chain breaks (study retracted, link rot, mis-cited), an agent flags it. This is what makes the maps LLM-citable per #18, #20.

### 6c. Continuous gatekeeper monitoring (~5 agents)

For each of the ~30 named gatekeepers in #03: daily scan of their Twitter, Substack, podcast feed. When they post about a topic Argumend has mapped, draft a reply or DM (founder approves and sends). This is the "always be in their feed at the right moment" play — token-bound, not judgment-bound until send time.

### 6d. Continuous topic-discovery (~3 agents)

Watch ACX, LW, Hacker News, EA Forum, NSDA event calendar, arxiv quant-ph + cs.CL + econ for emerging controversial-topic candidates. When a topic crosses a relevance threshold (multiple front-page mentions in a week), spin up a research dump in the format of the swarm topic deep-dives. Founder picks which ones get mapped.

### 6e. Continuous grant-application drafting (~2 agents)

There are ~12 plausible grant funders for Argumend (Manifund, ACX Grants, FLF, SFF, Open Phil, Reaktiva, AI Futures Project, FLI, FHI-adjacent funds, Wytham Abbey alumni network, EA Infrastructure Fund, Long-Term Future Fund). Each has different forms, timelines, criteria. Agents continuously maintain a tailored draft for each, updated quarterly with latest metrics, ready to submit when windows open.

### 6f. Continuous content production (~10 agents)

For each validated topic: agents produce blog post, social threads, video script, audio script, image set, share-card variants, translations. Founder reviews + approves. Pipeline is built in #05, #06, #07, #08; unlimited tokens scales it from 5 topics to as many as the metric-validation allows.

### 6g. Continuous A/B variant generation (~3 agents)

For each homepage / topic-page / share-card / CTA, agents generate variant copy + designs. Founder picks the test cells. Statistical engine runs the tests.

### 6h. Continuous Wikipedia / canonical-reference outreach (~2 agents)

Per #18, Wikipedia is the terminal node. Agents identify Wikipedia articles where an Argumend map would be cite-worthy, draft the addition + edit summary, check WP COI policy, flag the article for the founder to review and submit (must be submitted by a human editor with a real account).

### 6i. Founder-voice exploration (~3 agents, time-limited)

If Branch B in §4 hits, ~30-day sprint where multiple agents pitch different positioning angles, sample posts in different voices, surface comparable founders' arcs. Output: 3 viable voice/positioning options for founder decision. Not continuous — bursty.

### 6j. Translation + localization (~5 agents)

Once English-language traction is real, the maps and key essays go to Spanish, French, Portuguese, German, Hindi. The argument-map format is unusually translatable because the data is structured.

**Total: ~50 agents running in parallel.** Each token-bound, none judgment-bound past the founder approval point.

## 7. What unlimited tokens does NOT enable

These are the human-bound parts of reaching the goal. They are the actual bottleneck.

- **Trust.** Earning the rationalist community's trust is a 6–18 month relationship arc. Agents can't shortcut it.
- **Voice.** The LessWrong essay must be written by the founder in his own voice. Delegating it loses the audience.
- **Showing up.** Manifest 2026, LessOnline, EAG. In-person matters.
- **Taste.** Picking which topic to map next, which gatekeeper to DM, which institutional partner to pilot with — these are taste calls.
- **Sustained attention.** The 90-day arc requires the founder showing up every day. Agents help; they don't replace this.
- **The founder's emotional sustainability.** The "is this still worth doing?" question at month 6 and month 12 is the most important judgment call in the entire plan.

## 8. Decisions the founder needs to make before this plan can execute

1. **Pick the topic for Move 2.** AI consciousness or AI-2027? (Recommend AI consciousness — fresher news hook, less crowded.)
2. **Anonymous or founder-named brand?** Per #09, this is load-bearing for essay distribution and E-E-A-T signals. Once chosen, it's hard to unwind.
3. **First-priority cluster: rationalist or AI-alignment?** Recommend rationalist for the launch, alignment as the institutional wedge.
4. **What gets killed.** If we add a content factory + grant arc + outreach arc, what current Argumend work gets stopped? Be specific. Probably: any "ship more features" work, any non-anchor blog/guides content, anything that doesn't serve the §4 plan.
5. **Manifest attendance.** Yes/no — if yes, plane tickets get booked this week.
6. **The kill criterion in §1 is honest.** If by 2026-12-31 it's not met, will the founder actually pivot or downsize? Pre-committing is different from promising.

## 9. The single most important thing in this whole plan

**Do not skip §4 step B (instrumentation).** Every other move requires that we can tell if it worked. The 20-agent swarm could only do so much from the outside because we don't have funnel data. Once instrumentation is in, the next swarm is dramatically more useful — it can reason about what's actually happening rather than what's plausibly happening.

End plan.

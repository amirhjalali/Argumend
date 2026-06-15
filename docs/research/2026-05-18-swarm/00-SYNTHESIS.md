# Argumend research swarm — synthesis (2026-05-19)

20 agents, ~2 hours, ~40K words of research across distribution, content production, controversial-topic deep dives, UX/mobile, dissemination theory, monetization, and SEO. Source reports are 01–20 in this directory.

## Top 5 cross-cutting insights

### 1. Every successful argument-map project won through an institutional channel. Every project that asked end-users to build maps is dead.

From the prior-art audit (#02): Kialo's 1M+ users came via teachers (Kialo Edu); Pol.is's wins came via governments (vTaiwan). DebateGraph, Truthsift, Arguman, Argunet — all asked the "rational debater" to construct maps; all dormant or dead. The unoccupied wedge is **reader-first, AI-generated** — which is what Argumend already builds. The strategic question is which institutional channel substitutes for Kialo's teachers. The dissemination and monetization reports (#18, #19) converge on the same answer: journalism, debate education (NSDA), and AI-alignment-adjacent orgs.

### 2. The distribution playbook is one canonical artifact + one named gatekeeper amplifying — not "ship more content."

Across Manifold, Fatebook, Asterisk, AI Impacts, Rational Animations, Astral Codex Ten, Robert Miles, Liron Shapira (#04), the launch pattern is identical: a single LessWrong "Introducing X" post anchored to one concrete artifact, with sponsor backing (ACX Grants, Open Phil, Manifund) as a deterministic accelerant. The audience research (#03) converges: ~5–10M reachable readers across 10 clusters, but only ~3 reliably reward an argument-mapping artifact (rationalist core, AI alignment, debate education). Gatekeepers are individuals — Scott Alexander, Zvi, habryka, Justin Weinberg — and one Scott mention outweighs a month of SEO.

### 3. Argumend already has shipped technical excellence that isn't load-bearing yet. The bottleneck is packaging and distribution, not features.

The onboarding audit (#15) found that cold visitors see a static text card on landing — **the graph, which is the product, is invisible until 4–5 interactions in**. The mobile audit (#16) found a real mobile fallback (MobileArgumentList) already exists; the broken zone is tablet (768–1024px), not phone. The SEO audit (#20) found rich JSON-LD, canonical tags, valid sitemap, ~70ms TTFB — technical floor is fine; 109 topic pages just aren't being read. The image-generation report (#06) found that backfilling all 109 topics with art costs ~$17. **The constraint is not engineering capacity.**

### 4. The honest financial frame is "subsidized public good," not "real business."

The monetization audit (#19) found that every comparable epistemic tool — Lightcone/LessWrong, Metaculus, Kialo, Asterisk — is structurally subsidized, not commercial. Year-1 revenue almost certainly comes from grants (Manifund regrants $5–50K in days; FLF "AI for Human Reasoning" fellowship $25–50K; SFF distributed $34.9M in 2025), not Pro tier. Realistic year-1 Pro MRR at current traffic: $0–500. The right ambition is $80–200K/yr total budget — not "real business," not "hobby," but funded epistemic infrastructure.

### 5. The anti-tribal positioning is a real strategic constraint with a real countermove.

The short-form video research (#08) cited Nature 2026 confirming TikTok's algorithm is structurally biased toward partisan intensity. Anti-tribal content can't win on likes. It can win on **saves + shares** — which is a different optimization target. Cleo Abram's "Huge If True" frame is structurally identical to Argumend's "what if the other side is right?". The Israel-Palestine research (#11) demonstrated that genuine steel-manning of all 8 positions is possible without taking a side — which is the in-group signal the rationalist audience rewards (#03). Anti-tribal isn't a slogan; it's a measurable production discipline (epistemic-status preambles, named cruxes, visible confidence) that the strongest topic deep-dives (#10 AI consciousness, #14 UBI, #12 geoengineering, #13 nuclear) all delivered.

## Top 3 recommended next moves (ranked)

### Move 1 — Fix the onboarding aha moment. 1–2 days. Highest leverage / lowest cost in the entire report.

From #15, in priority order:
- **P1:** Replace static hero with a live auto-playing mini-canvas. The graph IS the product; show it on first paint.
- **P2:** Swap `featuredTopicId` away from gun-control-effectiveness (US-specific, politically charged — filters out half the audience). Use moon-landing or AI-consciousness instead.
- **P3:** Auto-expand the root in `loadInitialTopic` / `setTopic` so the canvas is never empty.
- **P4:** CTA copy "Open the map →" not "See the full analysis."

This is the prerequisite for every other move below — there's no point driving traffic to a hero that hides the product.

### Move 2 — Ship the LessWrong "Introducing Argumend" post in the next 30 days, anchored to ONE killer map.

Best candidates from the topic research:
- **AI consciousness (#10)** — Anthropic just shipped a model-welfare feature (Aug 2025), Lindsey introspection work is ~20% accurate with ~0% FP, COGITATE partially disconfirmed both IIT and GWT. Fresh news hook + load-bearing cruxes the graph view actually clarifies.
- **AI-2027 / superintelligence timelines** — squarely in the rationalist wheelhouse, no other tool maps the disagreement structurally.

Coordinate with: ACX Grants application (#04), cold DMs to Zvi/Scott/Liron (#03), EA Forum cross-post, Bluesky thread, Daily Nous guest piece. **Manifest 2026 (June 12–14, Berkeley)** is the highest-density physical gathering for the rationalist + AI alignment + debate clusters simultaneously (#03) — work backward from that date.

### Move 3 — Stand up the content pipeline (NotebookLM Plus + Codex CLI + FLUX.1 + Submagic+Descript+CapCut) — but for 5 topics, not 109.

The pipelines are validated and cheap (#05, #06, #07, #08): ~$13/mo NotebookLM Plus + RSS, ~$17 total to backfill all 109 topic images, ~$50/mo video stack, ~4× token efficiency from `codex exec` vs Claude Code on bulk schema-bound text. Recommended hybrid: codex for bulk generation, Claude for prose review, NotebookLM Debate mode for audio with steel-manning prompts that beat centrist-mush.

But: **don't batch all 109 until 5 actually move the metric.** Pick 5 (AI consciousness, UBI, nuclear, geoengineering, Israel-Palestine framing — the four covered in this swarm plus one founder-pick). Ship audio + 60s short + long-form essay per topic, distribute through Move 2's channels, instrument. If 5 don't move metrics, 109 won't either.

## What's missing / where another swarm would help

- **Wikipedia/LLM-citation playbook.** #18 and #20 flagged that Wikipedia is now the terminal node for both human and LLM retrieval (47.9% of ChatGPT citations). No concrete playbook for getting Argumend cited there.
- **Institutional partnership target list.** The "journalism/teacher institutional channel analogous to Kialo Edu" was identified as the wedge in #02, but no concrete list of newsroom contacts, debate-coach networks, or AI-alignment org integrations exists.
- **Current funnel baseline.** No agent could access GA4 or GSC data. The "is mobile a meaningful traffic slice?" question (#16) and the "are topic pages getting any organic traffic?" question (#20) both blocked on this. Instrumentation gap that should be closed before Move 2.
- **Brand-voice decision.** Anonymous vs founder-named (#09) was raised across multiple reports as load-bearing for both essay distribution and LLM-E-E-A-T-signal optimization. Unresolved.
- **Embeddable graphs (CC-BY iframes).** #18 identified this as a high-leverage dissemination move; no implementation cost or design analysis. Probably 1 day of engineering, 10x distribution potential if essays/Wikipedia/Substacks can embed live argument maps.

— end synthesis —

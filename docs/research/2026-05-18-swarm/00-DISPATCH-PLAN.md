# 20-agent research swarm — dispatch plan

**Status:** scheduled. Cron will fire ~2 hours after 2026-05-18 23:54 EDT and dispatch all 20 agents in parallel.

When the cron fires, future-me should:
1. Dispatch all 20 agents below in ONE message (parallel Agent tool calls), each with `run_in_background: true` and `subagent_type: general-purpose`.
2. Use the **exact prompt text** in each agent's section below — they are self-contained briefings.
3. After all agents complete (~30–60 min wallclock typical), write a synthesis at `docs/research/2026-05-18-swarm/00-SYNTHESIS.md`: top 5 cross-cutting insights + top 3 recommended next moves. Then PushNotification the user.

Common preamble each agent already has baked into its prompt: Argumend is a Next.js argument-mapping app at argumend.org, 109+ topics, solo founder, many features shipped but no real recurring users; focus is distribution/content/audience NOT shipping more features; today is 2026-05-18.

Output convention: each agent writes ONE markdown file to `/Users/amirhjalali/argumend/docs/research/2026-05-18-swarm/<NN>-<slug>.md` with sections TL;DR / Key findings / Recommendations / Open questions, sourced & cited.

---

## 01 — Gabooja Labs content playbook
**description:** Gabooja Labs content playbook
**prompt:**
Argumend (https://argumend.org) is a Next.js app that visualizes controversial topics as interactive argument-map graphs (positions, evidence, cruxes, fallacies) — 109+ pre-analyzed topics. Built by a solo founder. Has shipped many features but lacks real recurring users. Today is 2026-05-18. Focus right now is distribution/content/audience, NOT shipping more features.

Your task: Research "Gabooja Labs" (a content production org/operation the founder admires). Figure out: who they are, what they make, who their audience is; their content production pipeline (tools, cadence, formats); their distribution channels (YouTube, TikTok, Substack, etc.) and approximate reach; what's working for them, what isn't; concrete lessons Argumend could steal — both tactical (tools/workflow) and strategic (positioning/audience).

Use WebSearch + WebFetch liberally. If "Gabooja Labs" returns nothing or you find a different spelling, report what you found and proceed with the closest match. Cross-check across multiple sources.

Output: /Users/amirhjalali/argumend/docs/research/2026-05-18-swarm/01-gabooja-labs-playbook.md. Sections: TL;DR (3 bullets), Key findings (with source URLs), Concrete recommendations for Argumend (specific, actionable, ranked by leverage), Open questions. Under 1500 words. No filler. Cite sources.

---

## 02 — Argument-map prior art
**description:** Argument-map prior art
**prompt:**
Argumend (https://argumend.org) visualizes controversial topics as interactive argument-map graphs. Solo-founder project. Many features shipped, no users. Today is 2026-05-18.

Your task: Research prior art in argument mapping and debate visualization. For each (and others you find), document: what they built, audience size + trajectory, current status (alive/dead/dormant), pricing model, key UX choices, why they did or didn't succeed: Kialo / Kialo Edu, Arguman.org, DebateGraph, Society Library (Jamie Joyce), Truthsift, Rationale (Austhink), bCisive, Argunet, Argdown, Pol.is, Remesh, Talkmap, Loomio.

Then synthesize: what are the 3 recurring failure modes? What do rare successes share? What does this imply Argumend should NOT do, and what's a genuine differentiator?

Use WebSearch + WebFetch. Look at HN/Reddit discussions, post-mortems, founders' own writing.

Output: /Users/amirhjalali/argumend/docs/research/2026-05-18-swarm/02-prior-art-argument-maps.md. Sections: TL;DR (3 bullets), Per-project notes, Patterns (success/failure), Implications for Argumend, Open questions. Cite sources. Under 1800 words.

---

## 03 — Audience-where research
**description:** Audience-where research
**prompt:**
Argumend (https://argumend.org) visualizes controversial topics as argument graphs — positions, evidence, cruxes, fallacies. Solo-founder. Stoic/LessWrong aesthetic. Today 2026-05-18.

Your task: Map the actual audience for "tools and content that help people think more clearly about controversial topics." Where do these people gather online in 2026? Be specific — name newsletters, subreddits, channels, podcasts, Twitter/X accounts, Discord servers, conferences.

Cover: LessWrong + ACX + EA Forum sphere; Heterodox/IDW-adjacent (Bari Weiss, Sam Harris, Persuasion); academic philosophy/CritThink Twitter; AI alignment community; rationalist-adjacent newsletters; debate communities; journalism/media-criticism communities; high school + college debate (NSDA, etc.); Wikipedia editor community.

For each cluster: size estimate, where they hang out, what content they engage with, who the gatekeepers are (people who can amplify), what the "in-group signal" is that gets you taken seriously, and what's a tactical first-move for Argumend.

Output: /Users/amirhjalali/argumend/docs/research/2026-05-18-swarm/03-audience-where.md. Sections: TL;DR (3 bullets), Audience clusters (one per section with the structure above), Highest-leverage first-move recommendation, Open questions. Use WebSearch. Cite. Under 2000 words.

---

## 04 — Rationalist-distribution playbook
**description:** Rationalist-distribution playbook
**prompt:**
Argumend (https://argumend.org) is an argument-mapping app aimed at LessWrong/ACX/EA-adjacent audiences. Solo founder. Many features, no users. Today is 2026-05-18.

Your task: Case studies of how new projects broke into the LessWrong/ACX/EA-adjacent audience in the last ~5 years. Cases: Manifold Markets, Fatebook, ASTERISK Magazine, AI Impacts, 80,000 Hours, Forecasting Research Institute, Roots of Progress (Jason Crawford), Astral Codex Ten, Robert Miles, Rational Animations, AI Explained (a.k.a. AIxplained), Liron Shapira's Doom Debates.

For each, document the launch playbook: cold-start tactics, who guest-posted/cross-posted them, what content they led with, "found" or "made" community. Then synthesize 5-8 reusable plays Argumend could run in the next 30 days.

Output: /Users/amirhjalali/argumend/docs/research/2026-05-18-swarm/04-rationalist-distribution-playbook.md. Sections: TL;DR (3 bullets), Case studies, 5-8 concrete 30-day plays for Argumend (ranked, with effort estimate), Open questions. Cite. Use WebSearch + WebFetch. Under 1800 words.

---

## 05 — NotebookLM workflow
**description:** NotebookLM workflow
**prompt:**
Argumend (https://argumend.org) has 109+ argument-mapped controversial topics in data/topics/. The founder wants a NotebookLM-driven content pipeline that turns each topic into shareable audio/video content. Today is 2026-05-18.

Your task: Document a concrete, end-to-end NotebookLM-based content workflow. Cover: current state of NotebookLM in 2026 (features, audio overviews, video overviews, custom prompts, Plus tier limits); what inputs NotebookLM expects best and how to structure Argumend topic data for ingestion; prompt patterns to get *steel-manned* multi-side discussion not centrist mush; how to make resulting audio/video distinctive (branded, recognizable as "Argumend"); distribution (YouTube, Spotify, Apple Podcasts, Substack, Twitter/X), cadence, cover art / titles; examples of creators using NotebookLM well; cost / effort per episode.

Output a *concrete* runnable workflow. Include a sample prompt the founder can paste into NotebookLM tomorrow.

Output: /Users/amirhjalali/argumend/docs/research/2026-05-18-swarm/05-notebooklm-workflow.md. Sections: TL;DR (3 bullets), End-to-end workflow (numbered steps), Sample prompt, Distribution plan, Effort/cost, Open questions. Use WebSearch + WebFetch. Cite. Under 1500 words.

---

## 06 — GPT Image generation workflow
**description:** GPT Image generation workflow
**prompt:**
Argumend (https://argumend.org) has a stoic/parchment LessWrong-adjacent aesthetic: EB Garamond serif, parchment background (#f4f1eb), deep teal (#3a6965), rust (#C4613C), brown (#8B5A3C), crux crimson (#a23b3b). Today is 2026-05-18.

Your task: Build a concrete image-generation playbook for Argumend's social/share/hero imagery. Cover: current state of GPT Image / Imagen 4 / Midjourney / FLUX / Stable Diffusion 3.5+ in 2026 (strengths, weaknesses, cost per image); recommended primary model + 1-2 fallbacks given Argumend's aesthetic + budget (solo founder); a "house style" prompt scaffold producing consistent imagery (paste-ready); 10 concrete prompt examples for topic hero images, social share cards (1200x630), Instagram square, YouTube thumbnails, podcast cover art, blog post illustrations; integration with codex-cli or a simple script to batch-generate for all 109 topics; cost estimate.

Output: /Users/amirhjalali/argumend/docs/research/2026-05-18-swarm/06-image-generation-workflow.md. Sections: TL;DR (3 bullets), Model comparison, House-style prompt scaffold, 10 ready-to-use prompts, Batch script outline, Cost estimate, Open questions. Use WebSearch. Cite. Under 1500 words.

---

## 07 — Codex CLI content automation
**description:** Codex CLI content automation
**prompt:**
Argumend has 109+ controversial-topic argument maps in data/topics/. Solo founder, ships via parallel AI agents. Today is 2026-05-18.

Your task: Research how to use OpenAI's codex-cli (codex) to automate content-generation pipelines. Cover: current state of codex-cli in 2026 (auth, models, sandboxing, MCP support, scripting); how it differs from claude-code in workflow and unique advantages; 5 concrete pipeline ideas Argumend could run (blog posts from topic data; social threads for Twitter/X/LinkedIn/Bluesky; weekly newsletter from week's hottest topics; 60s short-form video scripts per topic; "objections answered" follow-up content); sample codex-cli invocation, paste-ready; cost/rate-limit considerations; how to combine codex-cli with claude-code in the founder's parallel-agent workflow.

Output: /Users/amirhjalali/argumend/docs/research/2026-05-18-swarm/07-codex-cli-content-automation.md. Sections: TL;DR (3 bullets), codex-cli 2026 status, Pipeline ideas (5), Sample invocation, Cost/limits, Integration with claude-code workflow, Open questions. Use WebSearch + WebFetch. Cite. Under 1500 words.

---

## 08 — Short-form video strategy
**description:** Short-form video strategy
**prompt:**
Argumend (https://argumend.org) visualizes controversial topics as argument maps. Solo founder. Today is 2026-05-18.

Your task: Build a short-form video strategy (TikTok, YouTube Shorts, Instagram Reels, Twitter/X video). Cover: who's doing thoughtful controversial-topic short-form well in 2026 (Johnny Harris, Vox short, Veritasium clips, Hank Green, More Perfect Union, Tom Nicholas, BobbyBroccoli, Liron Shapira Doom Debates Shorts, Cleo Abram) — document hook patterns, visual conventions, length sweet spot, what drives saves vs likes; the honest tradeoff (short-form algo favors heat, Argumend is anti-tribal — how do you thread that needle?); 5 concrete 60-second video script outlines pegged to AI consciousness, nuclear power, geoengineering, UBI, Israel-Palestine framing (hook in first 3 sec, arc, visual notes, CTA); production stack for solo founder (Argil AI? HeyGen? Submagic? Descript? CapCut? ElevenLabs?); posting cadence + cross-posting flow.

Output: /Users/amirhjalali/argumend/docs/research/2026-05-18-swarm/08-shortform-video-strategy.md. Sections: TL;DR (3 bullets), Reference creators (with what to steal), Anti-tribal threading-the-needle, 5 script outlines, Stack, Cadence, Open questions. Use WebSearch. Cite. Under 2000 words.

---

## 09 — Long-form essay strategy
**description:** Long-form essay strategy
**prompt:**
Argumend (https://argumend.org) maps controversial topics. Has a /blog and /guides already. Solo founder. Today is 2026-05-18.

Your task: Build a long-form essay/newsletter strategy. Cover: should Argumend host on its own /blog, on Substack/Beehiiv/Ghost, or both (canonical/cross-post)? Pros/cons in 2026. The "essay flywheel" — how long-form drives short-form + SEO + credibility. Cadence: weekly? biweekly? Realistic for solo founder also coding. Length sweet spot for LessWrong/ACX audience. 5 detailed essay outlines, each targeting a specific controversial topic in Argumend's catalog and a specific narrative beat the topic-page alone can't deliver — working title, target audience, key claim, 4-6 section headings with 1-line descriptions, expected sharing hook, distribution plan. How to use Argumend's argument-map data inside essays (embed, screenshot, link) so essays drive map views and vice versa. Email capture + retention (ConvertKit/Beehiiv/Substack) in 2026.

Output: /Users/amirhjalali/argumend/docs/research/2026-05-18-swarm/09-longform-essay-strategy.md. Sections: TL;DR (3 bullets), Platform recommendation, Flywheel logic, Cadence + length, 5 essay outlines, Map↔essay integration, List mechanics, Open questions. Use WebSearch. Cite. Under 2000 words.

---

## 10 — AI consciousness topic research
**description:** AI consciousness topic research
**prompt:**
Argumend (https://argumend.org) maps controversial topics as argument graphs with positions, evidence, cruxes, fallacies. Format reference: ls /Users/amirhjalali/argumend/data/topics/ and read one or two topic files to match the data shape. Today is 2026-05-18.

Your task: Produce a deep, source-cited research dump on the *AI consciousness / moral patienthood* debate. Cover: ~6-10 distinct *positions* across the spectrum (illusionism, higher-order theories, GWT-based functionalism, biological naturalism, panpsychist takes, Anthropic's "model welfare" stance, the "we can't know" position); 8-12 pieces of *evidence* (papers, behavioral tests, neuroscience analogues, introspection reports, model-organism arguments) each with source; 4-7 *cruxes*; 4-6 *fallacies* (substrate-independence smuggle, "just predicting tokens" eliminativism, anthropomorphism, mind-projection); recent 2024-2026 developments (Anthropic Kyle Fish, Schwitzgebel, Patrick Butlin et al "Consciousness in AI").

Output: /Users/amirhjalali/argumend/docs/research/2026-05-18-swarm/10-topic-ai-consciousness.md. Sections: TL;DR, Positions, Evidence, Cruxes, Fallacies, 2024-2026 developments, Source list. Cite carefully — primary sources where possible. Use WebSearch + WebFetch. Under 2500 words.

---

## 11 — Israel-Palestine framing topic
**description:** Israel-Palestine framing topic
**prompt:**
Argumend (https://argumend.org) maps controversial topics. Today is 2026-05-18. Politically charged — rigorous steel-manning, not advocacy.

Your task: Produce a research dump on *Western media framing of the Israel-Palestine conflict* — the meta-debate about whether and how mainstream Western media systematically frames the conflict (the *framing* debate, not the conflict itself). Cover: 6-10 distinct positions ("pro-Israel bias dominates," "pro-Palestine bias dominates," "varies by outlet and time period," "the 'both sides' frame is itself a frame," "media follows state-department alignment," etc.); 10-15 pieces of evidence (FAIR studies, MIT Media Lab, Intercept/Drop Site reporting on NYT internal memos, BBC editorial guidelines, recent academic content analyses 2023-2026); 4-7 cruxes; 4-6 recurring fallacies; recent 2023-2026 developments (post-Oct-7 coverage shifts, NYT internal memos, Intercept reporting, BBC's "Verify" unit, Wikipedia I-P arbcom rulings).

Steel-man every position. Treat all sides as held by intelligent people for legitimate reasons. Cite rigorously.

Output: /Users/amirhjalali/argumend/docs/research/2026-05-18-swarm/11-topic-israel-palestine-framing.md. Sections: TL;DR, Positions, Evidence, Cruxes, Fallacies, 2023-2026 developments, Source list. Use WebSearch + WebFetch. Under 2500 words.

---

## 12 — Geoengineering topic research
**description:** Geoengineering topic research
**prompt:**
Argumend (https://argumend.org) maps controversial topics. Today is 2026-05-18.

Your task: Research dump on *solar geoengineering / stratospheric aerosol injection (SAI) / marine cloud brightening*. Cover: 6-10 distinct positions (deploy-now, research-only, moral-hazard-prohibition, governance-first, "termination shock is a myth", indigenous-veto); 10-15 pieces of evidence — Pinatubo natural analog, Harvard SCoPEx history + cancellation, Make Sunsets deployment, Reflective Earth, Degrees Initiative, IPCC AR6 + AR7 chapters, NAS 2021 report, 2024-2026 modeling studies, governance moves (Mexico SAI ban, EU non-deployment pledge); 4-7 cruxes (termination shock, regional precipitation effects, governance feasibility, moral hazard quantification, comparison to mitigation cost); 4-6 fallacies (slippery slope, perfect-solution, mitigation-vs-adaptation false dichotomy); 2023-2026 developments.

Output: /Users/amirhjalali/argumend/docs/research/2026-05-18-swarm/12-topic-geoengineering.md. Same structure. Cite rigorously. Use WebSearch + WebFetch. Under 2500 words.

---

## 13 — Nuclear power topic research
**description:** Nuclear power topic research
**prompt:**
Argumend (https://argumend.org) maps controversial topics. Today is 2026-05-18.

Your task: Research dump on the *nuclear power* debate. Cover: 6-10 distinct positions (pro-build SMR/AP1000, pro-build only existing reactors, anti-build economics-based, anti-build safety/waste, pro-build only public ownership, fusion-only optimists); 10-15 evidence items — Lazard LCOE 2024-2026, Vogtle final cost, NuScale cancellation, TerraPower/Westinghouse AP300 progress, Hinkley C, French fleet performance, Korean APR-1400 build economics, deaths-per-TWh comparisons, Fukushima/Chernobyl health-effect reassessments, waste storage status (Yucca/Olkiluoto), hyperscaler nuclear deals (Microsoft TMI, Amazon Talen, Google Kairos); 4-7 cruxes; 4-6 fallacies; 2024-2026 developments.

Output: /Users/amirhjalali/argumend/docs/research/2026-05-18-swarm/13-topic-nuclear-power.md. Same structure. Cite. Use WebSearch + WebFetch. Under 2500 words.

---

## 14 — UBI topic research
**description:** UBI topic research
**prompt:**
Argumend (https://argumend.org) maps controversial topics. Today is 2026-05-18.

Your task: Research dump on *Universal Basic Income (UBI)*. Cover: 6-10 distinct positions (full UBI replacing welfare, UBI on top, NIT/EITC instead, "AI-funded UBI" Altman/Yang-style, "UBI is a bad idea period", Hayek-style minimum income, post-work UBI, work-requirement variants); 10-15 evidence items — OpenResearch/Altman 3-year RCT 2024 results, GiveDirectly Kenya long-term study, Finland 2017-2018 trial, Stockton SEED, Alaska PFD, Ontario cancelled trial, MGNREGA comparisons, macro-modeling on inflation, labor-supply elasticity studies; 4-7 cruxes; 4-6 fallacies; 2024-2026 developments.

Output: /Users/amirhjalali/argumend/docs/research/2026-05-18-swarm/14-topic-ubi.md. Same structure. Cite. Use WebSearch + WebFetch. Under 2500 words.

---

## 15 — Onboarding audit
**description:** Onboarding audit
**prompt:**
Argumend (https://argumend.org) — Next.js argument-mapping app, solo founder, many features shipped, no users. Today is 2026-05-18. Repo at /Users/amirhjalali/argumend.

Your task: Cold-visitor onboarding audit. Pretend you've never heard of Argumend and you just landed on argumend.org from a Twitter link. Trace the journey *step by step*. Read code: app/page.tsx, app/topics/[id]/page.tsx, components/HomeClient.tsx, components/FeaturedTopicHero.tsx, components/TopBar.tsx, hooks/useLogicGraph.ts. Optionally use claude-in-chrome tools to load the live site (load mcp__claude-in-chrome__tabs_context_mcp first via ToolSearch).

For each step in the cold visitor's journey: what they see, what they likely think/feel, next-action friction, most likely drop-off, whether an "aha moment" exists. Then a punch list of 5-8 *specific*, *minimal* changes that would dramatically improve first-visit conversion to "actually engaged with a topic for 2+ minutes." Each: what to change, why, effort, expected lift.

Output: /Users/amirhjalali/argumend/docs/research/2026-05-18-swarm/15-onboarding-audit.md. Sections: TL;DR (3 bullets), Cold-visitor journey (step by step), Drop-off analysis, "Aha moment" assessment, Punch list (ranked by leverage/effort ratio), Open questions. Under 1800 words.

---

## 16 — Mobile UX audit
**description:** Mobile UX audit
**prompt:**
Argumend (https://argumend.org) — Next.js app with a React Flow (@xyflow/react) canvas as the core experience. Solo founder. Today is 2026-05-18. Repo at /Users/amirhjalali/argumend.

Your task: Mobile UX audit. Most rationalist-Twitter traffic is mobile; React Flow on touch is famously awkward.

Approach: read components/HomeClient.tsx, components/nodes/*, hooks/useLogicGraph.ts, app/topics/[id]/page.tsx, globals.css; grep for mobile-specific code (`isMobile|touch|@media|sm:|md:|lg:`); load argumend.org on mobile viewports via claude-in-chrome (portrait phone, landscape phone, tablet) on homepage + one topic page; identify gesture conflicts, tap targets, text-wrap, performance, modal/sidebar fit.

Output: /Users/amirhjalali/argumend/docs/research/2026-05-18-swarm/16-mobile-ux-audit.md. Sections: TL;DR (3 bullets), Current mobile behavior, Top issues (ranked by severity), Concrete fixes (with file paths + approach), "Mobile-first redesign?" question (is incremental enough?), Open questions. Under 1800 words.

---

## 17 — Competitive UX teardown
**description:** Competitive UX teardown
**prompt:**
Argumend (https://argumend.org) is a Next.js argument-mapping app. Today is 2026-05-18.

Your task: UX teardown of comparable products. For each, identify 3-5 things they do well that Argumend should consider stealing: Kialo (debate-tree app); ProCon.org (classic pro/con site); Wikipedia's controversial-topic pages (e.g., "Israeli-Palestinian conflict"); LessWrong; Manifold Markets; AI Explained YouTube channel pages; Our World in Data; Asterisk Magazine. Use claude-in-chrome where helpful (ToolSearch for mcp__claude-in-chrome__tabs_context_mcp first).

Cover for each: first-30-seconds experience, information density choices, navigation pattern, how they handle "controversial" gracefully, how they signal credibility, mobile behavior, the one "hero interaction" that defines them. Then synthesize 5-8 concrete UX moves Argumend should adopt.

Output: /Users/amirhjalali/argumend/docs/research/2026-05-18-swarm/17-competitive-ux-teardown.md. Sections: TL;DR (3 bullets), Per-product teardown, Pattern synthesis, 5-8 concrete moves for Argumend, Open questions. Under 2000 words.

---

## 18 — Dissemination theory
**description:** Dissemination theory
**prompt:**
Argumend (https://argumend.org) maps controversial topics. The founder cares about *how information actually disseminates* — not just "marketing." Today is 2026-05-18.

Your task: Research dump on how good information actually spreads in 2026. Cover: the "epistemic civilization" framing (Eliezer Yudkowsky, Vitalik, Sam Hammond); the difference between memetic spread (catchy, lossy, viral) and durable spread (canonical references, citations, "load-bearing" texts); case studies of ideas that durably penetrated (Effective Altruism's growth, the "AI x-risk" frame, ACX/SSC moving from blog to canonical reference, ProPublica's investigative model, Our World in Data); case studies of ideas that flashed and faded (Clubhouse, NFTs as "ownership economy", various rationalist memes); the role of platforms (X/Twitter, Substack, podcasts, YouTube long-form, Wikipedia as terminal node); what infrastructure helps good info compound (search, citations, archives, link permanence, embedability); the honest tradeoff between reach and fidelity.

Then: 5-7 implications for Argumend's strategy — specific.

Output: /Users/amirhjalali/argumend/docs/research/2026-05-18-swarm/18-dissemination-theory.md. Sections: TL;DR (3 bullets), Memetic vs durable spread, Case studies (success + flash-fade), Infrastructure analysis, Reach vs fidelity tradeoff, Implications for Argumend, Open questions. Use WebSearch + WebFetch. Cite. Under 2200 words.

---

## 19 — Monetization & sustainability
**description:** Monetization & sustainability
**prompt:**
Argumend (https://argumend.org) — solo-founder argument-mapping platform. No revenue yet. Today is 2026-05-18.

Your task: Research monetization paths for solo-founder epistemic tools. Cover the realistic option space: (1) free-with-donations (LessWrong, Wikipedia model); (2) sponsorship (ASTERISK, Our World in Data partial); (3) Pro tier for power users (Manifold, Metaculus); (4) Institutional licensing (debate teams, journalism orgs, universities); (5) Course / cohort spinoff (CFAR-style); (6) API / data licensing (the structured argument data is unique); (7) Embedded integrations / white-label; (8) Grants (Open Philanthropy, Survival and Flourishing Fund, FLI, Future of Humanity Institute-adjacent). For each: who's done it, who's failed at it, realistic revenue ceiling for a solo founder, time-to-revenue, alignment with mission (vs corrosive to mission).

Also: an honest read on "ramen-profitable" vs "real business" vs "subsidized public good" framing — what's the right ambition for Argumend?

Then: a 12-month sequenced monetization plan.

Output: /Users/amirhjalali/argumend/docs/research/2026-05-18-swarm/19-monetization-sustainability.md. Sections: TL;DR (3 bullets), Option space (each option as above), Ambition framing, 12-month sequenced plan, Open questions. Use WebSearch. Cite. Under 2000 words.

---

## 20 — SEO & discoverability
**description:** SEO & discoverability
**prompt:**
Argumend (https://argumend.org) has 109+ topic pages at /topics/[id]. Solo founder. Today is 2026-05-18.

Your task: SEO audit + discoverability strategy. Cover: current state of SEO in 2026 (post-Google-AI-Overviews, post-ChatGPT-search, Bing/Copilot, the "zero-click" reality); whether Argumend's topic pages can rank, given competition from Wikipedia, ProCon.org, Kialo, mainstream news sites; the role of being *cited by* LLMs (the new "rank" — appearing as a source in ChatGPT/Claude answers) and how to optimize for that; specific keyword research for 10 of Argumend's likely highest-leverage topics (use the catalog at /topics or read /Users/amirhjalali/argumend/data/topics/ for the list); page-level recommendations (titles, H1, schema.org markup, llms.txt, sitemaps, internal linking); technical SEO (Core Web Vitals on argumend.org, what to fix); off-site SEO (which backlinks are realistic to acquire — HN, Reddit, LessWrong, Substack mentions).

Use WebSearch to check current ranking for a few sample queries. Use WebFetch on argumend.org/sitemap.xml and on a sample topic page if possible.

Output: /Users/amirhjalali/argumend/docs/research/2026-05-18-swarm/20-seo-discoverability.md. Sections: TL;DR (3 bullets), 2026 SEO landscape, Argumend's realistic ranking potential, LLM-citation optimization, 10 target keywords with recommendations, Page-level + technical fixes, Off-site backlink strategy, Open questions. Cite. Under 2000 words.

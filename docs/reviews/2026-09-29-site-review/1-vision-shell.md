# First-time visitor and the site's story — evaluation

## Verdict (≤6 lines)
A newcomer cannot tell in ten seconds what Argumend is or why it is different. Home stacks four unrelated beats, and the idea the site exists for (most fights are counterfeit: people agree on more than they think) appears nowhere on it.
The one rust button on home and every sidebar topic open the **legacy canvas** at `/?topic=…`, which shows a 31% balance gauge and a Map/Scales/**Debate** (swords) toggle. The four story pages (/about, /how-it-works, /methodology, /faq) still sell balance-and-weight scoring, a "4-Judge AI Council", a "verdict matrix" and "who is right".
Navigation points at the oldest paste tool (/analyze, "rate how strong the reasoning really is"). The two vision-aligned tools (/analyze-v2, /reply) and the north-star artifact (/ai) have no nav entry.
**The change that matters most:** one shell with four nav items (Maps · The AI argument · Paste an argument · About), with home rebuilt as a single argument whose two doors go to a flagship map and to one paste tool. Delete the home canvas mode and the sidebar.

## Page scorecard
| Route | Purpose in one line (as a visitor reads it) | Clarity 1-5 | Consistency 1-5 | Phone 1-5 | Vision fit 1-5 | Keep / Merge into X / Demote / Remove |
|---|---|---|---|---|---|---|
| `/` | "Debate maps about AI and Israel… plus a crux about AI consciousness, a list of sports-betting/PFAS topics, and a paste box" | 2 | 2 | 3 | 3 | Keep; rebuild as one argument (F1, F2) |
| `/about` | "A manifesto about disagreeing without destroying each other, plus a balance/weight scoring explainer and a quote wall" | 3 | 2 | 3 | 2 | Keep as THE story page; absorb /how-it-works + /community |
| `/how-it-works` | "How to read a node graph (Meta Claim/Skeptic/Proponent) and balance/weight scores" | 3 | 2 | 3 | 2 | Merge into `/about#read-a-map` (steps 1–3 copy is good) |
| `/methodology` | "An AI product that scores arguments with a 4-judge council (Claude, GPT-4, Gemini)" | 3 | 1 | 3 | 1 | Rewrite as "How maps are made"; keep only lines 445–458 |
| `/faq` | "73 SEO Q&As; several describe features that don't exist" | 2 | 1 | 3 | 2 | Cut to ≤12 product questions; move the glossary-style ones out |
| `/auth/signin` | Redirects to /saved (auth off). With auth on, it reads "Welcome back… save your analyses and debates" | – | 2 | – | 2 | Demote (flag-only; fix copy before it is ever turned on) |
| `/dashboard` | Redirects to /saved (auth off). With auth on, it shows "recent debate history" with a swords icon | – | 2 | – | 2 | Demote (flag-only) |
| `/saved` | "An empty bookmarks page", which every newcomer sees because it is a primary nav item | 4 | 3 | 4 | 3 | Demote: a filter on /topics, out of the primary nav |
| `/community` | "Join the Argumend Movement", which turns out to be a GitHub contribution page | 3 | 2 | 3 | 3 | Merge into `/about#contribute` |
| 404 | "Insufficient Evidence for This Page": a cute page with no nav and no search | 4 | 2 | 4 | 3 | Keep; put it in the shell; link the canonical paste tool |
| Shell (top bar, sidebar, footer, ⌘K, theme, phone menu) | Two navs that duplicate each other, a random topic list, and search results labelled For/Against/Draw | 2 | 2 | 2 | 2 | Rebuild (F5–F8) |

## Findings (ranked, most severe first)

### F1. Home's only primary button, and every sidebar topic, drop the newcomer into the legacy scoreboard canvas
- Severity: critical     Scope: system     Effort: M
- Where: `/` rust CTA "Open the interactive map", and every sidebar TOPICS button on every AppShell page. Evidence: `extra/v2-cta-interactive-map-1440.png`, `extra/v2-cta-interactive-map-390.png`, `extra/v2-sidebar-topic-1440.png`. Code: `components/FeaturedTopicHero.tsx:226-231` (`onTopicSelect(featuredTopicId)`), `components/Sidebar.tsx:64-76` (`router.push('/?topic=…&view=logic-map')`), `components/HomeClient.tsx:124-176, 204-239` (canvas mode with `ViewToggle` Map/Scales/Debate), `data/topicIndex.ts:71` (`featuredTopicId = "consciousness-ai-systems"`).
- Problem: home promises "The whole fight, not a verdict." The one rust button then opens a React Flow canvas for a *fifth* topic (AI consciousness), not one of the three shown above it. That canvas leads with a "31% BALANCE" gauge, and on phones with "highly speculative · Evidence leans toward the counterclaim". It has placeholder nodes ("Skeptic Thesis — Arguments challenging the core premise", "Leaf node") and a top-bar toggle whose third tab is "Debate" with a swords icon (LLM debate rounds, `components/DebateView.tsx`). The sidebar sends every topic there too, so the same topic has two different homes: `/topics/X` and `/?topic=X`.
- Fix: replace the button with a `<Link>` to the flagship map the section is about (`/topics/ai-mass-unemployment`, see F2). Make sidebar topic rows (if any survive, see F5) plain links to `/topics/{id}`. Remove canvas mode from `HomeClient.tsx`: home becomes a server component inside `AppShell` rendering `HomeLanding`. `/?topic=:id` should redirect to `/topics/:id`, where the map already lives ("Open the map if you want more", `/how-it-works` step 4). Drop the `ViewToggle` "Debate" tab everywhere.

### F2. Home does not say what Argumend is or why it is different, and its four sections are a stack, not an argument
- Severity: critical     Scope: page     Effort: M
- Where: `/`. Evidence: `home--1440.png`, `home--1440-full.png`, `home--390.png`, `home--390-sheet1/2.png`. Code: `components/home/HomeLanding.tsx:29-166`, `components/FeaturedTopicHero.tsx`, `components/HeroAnalyze.tsx`.
- Ten-second test, 1440: the visitor reads "ARGUMEND / Disagree better." and "The whole fight, not a verdict.", then "Choose a live question to compare four serious positions…". Three question cards follow, each opening with a statistic (16%, labor share, $38 billion), and each ends in a teal "Open the debate map". A left column lists Sports Betting, PFAS, Intermittent Fasting, Daylight Saving, Tipping… A likely reading: "a debate-explainer site about hot topics". The H1 negates a verdict the visitor never expected, and it primes judging. There is no primary action above the fold: three equal teal links, five sidebar nav items, eight sidebar topics and three top-bar links compete. The rust button sits at y≈1800 of 3308.
- Ten-second test, 390: the tagline is hidden below 420px (`TopBar.tsx:87` `max-[420px]:hidden`), so the first screen is the H1, the paragraph and one stat-heavy card. "Analyze" in the top bar is an unlabelled brain icon. The rust button arrives at about y≈3000 (screen 4 of 6.7, metrics height 5626), and the paste box is on screen 6.
- Stack, not argument: (1) three flagship maps, then (2) a worked crux from a different topic, whose button opens a different product (F1), then (3) "156 questions, mapped the same way", listing the first three legacy topics per category. They are *not* mapped the same way: the flagships are ArgumentGraph maps and are not even in `topicSummaries.json`. Then (4) a paste box that routes to /analyze (F4). No section refers to another. The north star's thesis, the measured perceived-vs-actual gap ("88 of 114 turns not about the question in the title"; "none above 20% contested"), is absent. So is /ai.
- The single thing home must say: **most arguments are not about what they seem; Argumend shows what a disagreement actually turns on (the crux, and what would change each side's mind), and never names a winner.** Then two doors: see it on a live question, or paste an argument you are in.
- What should go: the sidebar on home; the five-column library index (replace with one "Browse all 156 maps" link); the consciousness featured topic; the canvas button; "Open the debate map" (→ "Read the map"); "{n} questions, mapped the same way" and "the cruxes that would settle it" (`HomeLanding.tsx:99,103`).
- Fix (reuse, don't invent):
  1. Hero: an H1 in the voice /ai and /analyze-v2 already use, e.g. "Find what the argument actually turns on." Add one sentence of evidence from the north-star table, one rust button "See it on AI and jobs" → `/topics/ai-mass-unemployment` (or `/ai`), and one text link "Paste an argument you're in" → the canonical paste route. Keep "Disagree better." visible on phones.
  2. Proof: the existing crux sheet (`FeaturedTopicHero` + `CRUX_SHEET` from `components/argument/DebateView.tsx`), fed crux #1 of the same flagship the button opens (the /ai ledger already ranks it: "When AI makes a firm more productive, does it hire fewer people — or just sell more?").
  3. Three maps as crux questions, not statistics, plus "The AI argument, on one page →" and "All 156 maps →".
  4. The paste box, pointed at the canonical tool.

### F3. /about, /how-it-works, /methodology and /faq tell the old story: scores, judges, verdicts, "who is right"
- Severity: critical     Scope: template/content     Effort: M
- Where: `about--1440-full.png`, `how-it-works--1440-full.png`, `methodology--1440-full.png`, `faq--390-sheet1.png`. Contradicting lines:
  - `app/methodology/page.tsx:157-158` "Not just another AI opinion"; `:7-28` a four-card "problem with 'just ask ChatGPT'" section; `:59-68` "Multi-Judge Council… 4 AI judges (Claude, GPT-4, Gemini, and more) evaluate independently… Scores are aggregated"; `:88` "the verdict is calibrated"; `:253` "The 4-Judge AI Council"; `:295` "Score Aggregation"; `:394` "The verdict matrix"; `:472` "Every score can be traced back to specific evidence and specific judges." `app/methodology/layout.tsx` title: "Methodology — How We Score Arguments". The judge council is `ENABLE_LIVE_JUDGING_API`, off by default. The site's transparency page describes a process that does not run.
  - `data/faqs.ts:68-69` "How does the AI judge council work? … Every judge scores the arguments…"; `:76-77` "Confidence scores track evidence… Our multi-model AI judge council catches bias"; `:124-125` and `:230-231` the same; `:15` "show you how confident the evidence makes us"; `:34-35` "Why only three pillars per topic? … would settle the broader question" (the flagships have no pillars); `:272-273` "Each topic opens as an interactive graph" (false: topics open as a page); `:388-389` "How do I win an argument? … start trying to find out who is right"; `:72-73` analyses "(positions, cruxes, fallacies, and scores) is saved"; `:21` "sign in if you want to save your own analyses" (there is no sign-in). 73 questions, about 50 of them glossary/SEO ("What is the Gish gallop?").
  - `app/about/page.tsx:17-18` "Balance & Weight" is one of four "Core principles"; `:155-199` a full "Understanding balance and weight" section; `:102` "the question that would actually resolve the debate"; `:60` "Most debates generate heat"; `:133` "rationalist tradition… Bayesian updating". The page never mentions the paste tool, /ai, "never a winner", or the gap. `app/about/layout.tsx:8,11` "Our Mission to Transform How People Disagree… two-axis balance and weight scoring".
  - `app/how-it-works/page.tsx:29` Crux = "The key question that would settle the debate"; `:127-162` "Anatomy of an argument map" and "Five types of nodes" (the legacy Meta Claim/Skeptic/Proponent graph); `:165-199` "Reading balance and weight"; `:205-206` "Most debates never bother to find it. We do."; `:36` the example evidence "NRC Safety Report 2023: Zero incidents in passive reactors" reads as an invented citation on a page about source transparency; `:217-227` the close sends the visitor to a legacy map (nuclear), not a flagship. Its steps 1–3 (`:40-56`) *are* in the new voice ("It records movement, not a winner.").
  - `app/analyze/page.tsx:525-527`, the nav's paste target: "…pinpoint the crux that divides them, and rate how strong the reasoning really is."
- Problem: a visitor who clicks "About" to learn what this is gets a different product from the one home describes: a scoring engine with AI judges and a verdict matrix. The four pages also contradict each other: the pillars count, whether topics open as a graph or a page, and whether sign-in exists.
- Fix: yes, merge and cut.
  - **/about** becomes the single story page, with anchored sections: #why (the counterfeit argument and the gap, from `docs/plans/2026-09-22-north-star.md`), #principles (crux over verdict · never a winner · voluntary before imposed), #read-a-map (/how-it-works steps 1–4 verbatim), #contribute (the /community content). Delete the balance/weight section, the stakes cards and the quote wall.
  - **/methodology** is rewritten as "How maps are made": evidence weighing on four dimensions, the side audit, and the "When 'settled' is withheld" paragraph (`:445-458`, which is exactly on-vision). Delete the ChatGPT, judge-council and verdict-matrix sections.
  - **/faq**: at most 12 product questions, rewritten against the current product. Move the fallacy and critical-thinking questions to /glossary and /fallacies (they duplicate them).
  - 301 `/how-it-works` → `/about#read-a-map` and `/community` → `/about#contribute`.

### F4. The navigation sends people to the oldest paste tool; the two on-vision tools are orphans
- Severity: high     Scope: system     Effort: S (routing) / M (consolidation)
- Where: `lib/nav.ts:56` "Analyze Text" → `/analyze`; `components/TopBar.tsx:133` → `/analyze` unless `NEXT_PUBLIC_ENABLE_DISAGREEMENT_V2`; `components/HeroAnalyze.tsx:26`; `app/not-found.tsx` "Run an Analysis" → `/analyze`; `app/methodology/page.tsx:488` "Try it yourself" → `/analyze`; ⌘K "paste" returns only "Analyze — Paste text and extract positions, cruxes, and fallacies" (`extra/v1-search-paste-1440.png`). Evidence: `analyze--1440.png` ("Programmatic Mode" pill, an "Include Programmatic Judgment" checkbox, "rate how strong the reasoning really is") vs `analyze-v2--1440.png` ("What is the argument really resting on?") vs `reply--1440.png` ("Reply with the map… It never says who is right.").
- Problem: there are three paste tools with three promises. The one every nav surface points at contradicts the vision. The two that express it (/analyze-v2, /reply) are reachable only by URL: /reply from a consent-line link, /analyze-v2 only when a build-time flag is on. In this build the server flag is on and the public flag off, so /analyze-v2 is live but unlinked.
- Fix: one nav item, "Paste an argument", pointing at one canonical route. 301 the other two, or turn the map-match into a section of the result. Founder decision: which engine is canonical. My recommendation: /analyze-v2's diagnosis for any text, with /reply's "the map it belongs to" shown when the paste matches a topic. /analyze → 301 (keep `/analysis/:id` result URLs alive).

### F5. Top bar and sidebar duplicate each other, and the sidebar is noise
- Severity: high     Scope: system     Effort: M
- Where: every AppShell page and home. `components/TopBar.tsx:123-149` (Explore / Analyze / About) and `components/Sidebar.tsx:99-124` (Home / Explore / Analyze Text / Saved / About) + `:127` "Most read this week" + `:188-231` TOPICS. Evidence: `home--1440.png`, `saved--1440.png`, `extra/v1-home-390-menu-open.png`, `extra/v1-home-1440-scrolled.png`.
- Problem:
  - The same three destinations appear twice, with different labels ("Analyze" vs "Analyze Text").
  - The sidebar's TOPICS are just rows 1–8 of `data/topicSummaries.json` (Sports Betting, PFAS, Intermittent Fasting, Daylight Saving, Tipping, AI therapy, Carbon capture, Hydrogen). They are not the flagships and cannot be, because the flagships are not in that file. On every page this tells a newcomer the site is a generic topic farm.
  - The top bar does not stick: `app/globals.css:142-145` sets `overflow-x: hidden` on html/body (a known open item, still broken). Measured: header rect top −1491 after scrolling. The 260px sidebar scrolls away with the page, so on a scrolled desktop page the left quarter of the screen is empty parchment (`extra/v1-home-1440-scrolled.png`).
  - The phone drawer shows the same 5 items + 8 random topics + the theme toggle and nothing else. No Learn links, no /ai.
- Fix: delete the sidebar as navigation, on every page. It can survive only on /topics as a filter rail. The top bar carries the 4 items (see IA), plus Search and one theme icon (the 3-button segmented toggle takes about 140px). On phones, the menu button opens a sheet with the same 4 items + Search + Learn links + theme. Change `overflow-x: hidden` to `overflow-x: clip` so the bar sticks. Remove `TrendingTopics` from nav: it is a popularity list and silently absent without a DB.

### F6. Five shell variants; the hamburger is dead on the paste tools; SEO landing pages have no nav at all
- Severity: high     Scope: system     Effort: S–M
- Where: the variants are AppShell "browse" (sidebar open), AppShell "reading" (collapsed), HomeClient's private copy of the shell (`HomeClient.tsx:42-101`), top-bar-only (`app/reply/page.tsx:37`, `app/analyze-v2/page.tsx:21` render `<TopBar />` without `onMenuClick`), and no shell at all (`/is`, `/is/*`, `/questions`, `/questions/*`, 404). Verified by fetch: `banner=0` on /is, /is/nuclear-energy-safe, /questions, /questions/is-nuclear-energy-safe and 404. Evidence: `is--1440.png`, `questions--1440.png`, `nonexistent-page-404--390.png`, `extra/v3-reply-390-after-menu-tap.png`, `extra/v3-analyze-v2-390-after-menu-tap.png` (tapping the menu does nothing; 0 nav elements after the tap).
- Problem: on a phone on /reply or /analyze-v2, the menu button is a no-op and the theme toggle is hidden, so the only way out is the logo. The /is and /questions detail pages are the site's search-engine landing pages (140 + 248), and a visitor landing there has no brand bar, no search, no footer and no way to the flagships.
- Fix: one `SiteHeader` that owns its own phone menu sheet, so it never depends on a sidebar being mounted. Use it in every layout, including /is, /questions and `app/not-found.tsx`. Delete HomeClient's private shell (F1).

### F7. ⌘K search is a scoreboard: For / Against / Draw
- Severity: high     Scope: system     Effort: S
- Where: `components/SearchModal.tsx:152-157` (`getLeanInfo` → "Draw" / "For" / "Against"), `:140-146` (hardcoded "Popular Topics": climate-change, ai-risk, free-will, moon-landing, simulation-hypothesis), `:166` "Debate Maps". Evidence: `extra/v1-search-open-1440.png` (Free Will "Draw", Climate "For"), `extra/v1-search-paste-1440.png` (DOGE "Against", Right to Repair "For"; the "Blog" badge is clipped to "Blo").
- Problem: the first thing search shows a newcomer is a match-result column. "Draw" is literally a debate-outcome word. "Popular" is a hand-picked list, not a popularity measure.
- Fix: delete the lean meter and label from results. The empty state lists the flagship maps, "The AI argument", "Paste an argument" and About. Rename "Debate Maps" → "Maps". Widen the type badge.

### F8. Half the site is unreachable, and the footer does not rescue it either
- Severity: high     Scope: system (IA)     Effort: M
- Where: `lib/nav.ts:87-96`. The footer lists only Explore, Saved, About (+ Privacy, Terms, GitHub; `components/Footer.tsx`). In-app inbound links (source grep, excluding the route itself):
  - zero: /glossary, /is, /questions, /perspectives, /research, /lessons-from-the-deep, /topics/compare;
  - search modal only: /faq, /library;
  - search + FAQ text: /blog;
  - no nav/footer link: /how-it-works, /methodology, /community;
  - only from the flagship page body: /ai;
  - only from a consent line: /reply.
- Problem: the brief's premise ("reachable by URL or footer") is too generous. Most of these are reachable by URL only. The north star's second artifact (/ai, the living AI map, the best page on the site) is not on home or in nav. Meanwhile the numbers conflict wherever a visitor does land: 156 topics (home, sidebar), "150+" (/topics title), 248 questions (/questions), 140 claims (/is), 73 FAQs. That reads as a content farm.
- Fix: the IA below.

### F9. Account surfaces sit in an anonymous-first product's primary nav and carry the old framing
- Severity: medium     Scope: page     Effort: S
- Where: `lib/nav.ts:57` (Saved is primary); `app/saved/SavedClient.tsx` (balance/weight chip + a `CheckCircle` "Evidence converges" status on every card); `next.config.js:85-92` + page guards redirect /dashboard and /auth/signin → /saved while auth is off (visitors never see them; that is fine). `app/auth/signin/page.tsx:43,50,53,104,113`: "Map arguments. Find cruxes. Think better together.", "Welcome back" (to first-time users), "Sign in to save your analyses and debates", a rust "Continue as Guest" as the page's primary action, and "terms of use" linking to /about. `app/dashboard/page.tsx:30` "Your saved topics and recent debate history" (Swords icon). `app/community/layout.tsx:5` "Community — Join the Argumend Movement". Evidence: `saved--1440.png`, `community--390-sheet1.png`.
- Problem: every newcomer who taps "Saved" gets an empty state. The two flagship maps home pushes cannot be saved at all: `DebateView` has no `SaveTopicButton`, and `SavedClient` silently drops ids not in `topicSummaries`. The auth pages are still written for the debate product. "Community" promises a movement and delivers a GitHub link.
- Fix: remove Saved from the primary nav. Make it a "Saved on this device (n)" filter on /topics, and show a bookmark icon in the header only once n > 0. Add a save control to the flagship page, and let SavedClient resolve argument-topic ids. Keep /dashboard and /auth/signin behind the flag. Before the flag is ever flipped, rewrite the copy ("Sign in to keep your saved maps across devices"; no "debates"; terms → /terms). Fold /community into /about#contribute.

### F10. Voice: three registers, "debate" everywhere, title-case drift
- Severity: medium     Scope: system     Effort: S
- Sample:

  | Register | Lines (file) |
  |---|---|
  | Calm, plain, on-vision | "What would change your mind?" (home); "It does not score the sides." (/ai); "It never says who is right." (/reply); "Both numbers are real. The fight is over what they mean." (flagship); footer "Maps of hard questions, built around what would change a mind, never around who won." (`Footer.tsx:22-23`), the best one-line description on the site, buried in the footer |
  | Manifesto / marketing | "Our Mission to Transform How People Disagree" (about/layout:8); "These aren't aspirational. They're how we actually work." (about:114); "Most debates never bother to find it. We do." (how-it-works:206); "Not guidelines. Rules." (community:93); "Join the Argumend Movement"; "Question everything — including this." (about:224) |
  | AI-SaaS / scoring | "Not just another AI opinion"; "The 4-Judge AI Council"; "Score Aggregation"; "The verdict matrix" (methodology); "Programmatic Mode", "rate how strong the reasoning really is" (/analyze); "Methodology — How We Score Arguments" |

  - "Debate" vocabulary on newcomer surfaces: "Open the debate map" ×3 (home), "DEBATE MAP, REVIEWED…" (flagship eyebrow), "Debate Maps" (search), the "Debate" tab (canvas), "Weekly debates" (`NewsletterSignup.tsx:110`), "Now see it on a real debate" (how-it-works:217), "analyses and debates" (signin).
  - Case drift: "Saved Topics", "Explore Topics", "Analyze Any Argument", "Insufficient Evidence for This Page", "Run an Analysis", "Our Principles", "How to Contribute" vs sentence case elsewhere.
  - Brand drift: "ARGUMEND" (wordmark, titles) vs "Argumend" (footer, prose).
  - Titles: "ARGUMEND — Map Arguments, Not Win Them" (`app/page.tsx:18`, ungrammatical); "Find what the argument turns on — ARGUMEND | ARGUMEND" (/analyze-v2, doubled suffix); `SITE_DESCRIPTION` "See both sides…" while home says "four serious positions".
- Fix: one voice, the first row. Write a 10-line voice note (sentence case; "map", not "debate"; no scores or winners; no mission-speak) and apply it to every H1/H2/CTA/title in this area. Rename "Open the debate map" → "Read the map" and the eyebrow → "Map, reviewed …". Newsletter: "New maps, and cruxes that moved." Fix the /analyze-v2 metadata title.

### F11. 404 is a dead end with the old tool as its only action
- Severity: low     Scope: page     Effort: S
- Where: `app/not-found.tsx`; `nonexistent-page-404--390.png`.
- Problem: there is no header or search, so a mistyped /topics/ slug cannot search from there. "Run an Analysis" goes to /analyze. The headline is title case.
- Fix: render inside the shared header. Put a search field on the page. Actions: "Browse maps", "Paste an argument" (canonical). Keep the joke, in sentence case.

### Nits (grouped)
- `app/about/page.tsx:227` "Explore topics" is rust-500 text (below AA as text; use the teal link style).
- `app/how-it-works/page.tsx:34`: the Evidence node is rust-600, colliding with Proponent rust (CLAUDE.md: evidence is teal).
- Footer: "Built with stubbornness and peer review" claims peer review. Say what is true, or cut it.
- `lib/nav.ts:1-10`: the comment says the nav is "Explore · Analyze · About", but it ships 5–6 items.
- The FAQ cards that look blank in the full-page captures are `content-visibility: auto` (`lib/collectionStyles.ts:23`): a capture artifact, not a bug.
- The home library "first three per category" puts Sports Betting first in Policy and Meditations on Moloch first in Philosophy: data order, not editorial.

## Proposed information architecture

```
HEADER (one component, every route incl. /is, /questions, 404, /reply, /analyze-v2; sticky)
  ARGUMEND · Disagree better.                 → /
  Maps                                        → /topics         (flagships pinned first; "Saved on this device (n)" filter)
  The AI argument                             → /ai             (north-star artifact #2: living AI map, crux ledger)
  Paste an argument                           → <one canonical paste route>   (founder picks engine; see F4)
  About                                       → /about
  [⌘K search icon] [theme icon] [bookmark icon only when n>0]
  Phone: logo · "Paste" · menu → sheet with the same 4 + Search + "Learn" links + theme
  No sidebar navigation anywhere. (/topics may keep a filter rail.)

HOME  /  — one argument, four beats that reference each other
  1 Claim + evidence line + [rust] "See it on AI and jobs" → /topics/ai-mass-unemployment · link "Paste an argument you're in"
  2 One crux worked through: crux #1 of that same map (CRUX_SHEET), "Read the whole map"
  3 Three maps as crux questions (AI jobs, capitalism & AI, US–Israel) · "The AI argument, on one page →" · "All 156 maps →"
  4 Paste box → canonical paste route
  Footer

ABOUT  /about  — the only story page
  #why          the counterfeit argument; the perceived-vs-actual gap, with the north-star findings in plain words
  #principles   crux over verdict · never a winner, always the other side's best card · voluntary before imposed
  #read-a-map   /how-it-works steps 1–4 (verbatim, they are already on-vision)
  #how-made     summary + link → /methodology (rewritten "How maps are made": 4-dimension weighing, side audit,
                "When 'settled' is withheld"; no judges, no ChatGPT section, no "verdict matrix")
  #faq          link → /faq (≤12 product questions)
  #contribute   /community content (GitHub)

LEARN HUB  /guides (retitled "Learn") — linked from footer + About only, never primary nav
  Guides · Fallacies · Glossary (absorbs /concepts) · Essays (/blog) · For educators · Reading list (/library) · Research

FOOTER
  Maps · The AI argument · Paste an argument · About
  Learn · How maps are made · FAQ · Contribute (GitHub) · Privacy · Terms
  Newsletter: "New maps, and cruxes that moved."

SITEMAP-ONLY (inside the shell, no nav link; founder reviews indexing)
  /is, /is/*           "Is it true? 140 claims fact-checked" is verdict framing; reframe to "What would settle it?" or noindex
  /questions, /questions/*   duplicates /topics with a third count (248)
  /topics/compare/*    side-by-side comparison invites scoreboarding
  /perspectives, /analyses, /analysis/*, /d/*
  REMOVE or noindex: /lessons-from-the-deep (Moltbook agent discourse; off-story)

REDIRECTS
  301 /how-it-works          → /about#read-a-map
  301 /community             → /about#contribute
  301 /concepts, /concepts/:slug → /glossary(#slug)
  301 /analyze               → canonical paste route   (/analysis/:id results stay)
  301 /reply | /analyze-v2   → whichever is not canonical (or keep as a mode of it)
  301 /?topic=:id[&view=…]   → /topics/:id              (kills the home canvas)
  301 /explore               → /topics                  (exists)
  302 /dashboard, /auth/signin → /topics?saved          (while auth is off; today → /saved)
  later /questions/:slug → parent /topics/:id#crux     (only after checking search traffic)
```

Justification against the vision:
- **Maps** and **Paste an argument** are the two product surfaces the north star names.
- **The AI argument** is its named artifact and the site's clearest "crux, not verdict" page.
- **About** is where a skeptical newcomer checks whether the claim of "never a winner" is real, so it must say only true things about the product.
- Everything educational is useful but secondary: one hub, one link.
- Everything that ranks, fact-checks or counts (search lean labels, /is badges, "248 questions", trending) is demoted, because it is the scoreboard / content-farm reading the north star warns against.
- Saved and sign-in are utilities, not destinations, in an anonymous-first product.

## Patterns worth copying
- `/ai` (`app/ai/page.tsx`, `ai--1440.png`): dated eyebrow, "It does not score the sides.", crux cards with "What would settle it" and a movement ledger. This is the voice and structure the whole site should converge on. Home should borrow its crux #1 and its tone.
- The crux sheet: `CRUX_SHEET` / `MARGIN_RULE` / `ENTRY_GRID` from `components/argument/DebateView.tsx`, as reused in `FeaturedTopicHero.tsx:115-184`. The right component for home's worked example; only the data source and button are wrong.
- `/reply` hero copy (`reply--1440.png`): the clearest honest promise on the site. Reuse "It never says who is right…" on home and /about.
- `/how-it-works` steps 1–3 (`app/how-it-works/page.tsx:40-56`) and the methodology "When 'settled' is withheld" paragraph (`app/methodology/page.tsx:445-458`): keep both verbatim in the merged About/Methodology.
- `components/Footer.tsx:22-23`: "Maps of hard questions, built around what would change a mind, never around who won." Promote this to home's sub-head.
- Home's editorial layout (hairline rules, one left edge, no tinted bands; `components/home/HomeLanding.tsx`) is the right visual system. /about, /how-it-works, /methodology and /community still use the older rounded-card stack and should adopt it when merged.

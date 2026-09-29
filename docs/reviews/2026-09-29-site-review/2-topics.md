# Topic maps (the core product) — evaluation

## Verdict (≤6 lines)
Argumend doesn't have one topic page. It has two, plus a third product one tap away. Three new-model maps (DebateView) lead with a crux ledger. The 156 legacy maps (ReadModeView) lead with a label title, a drop cap, the full text printed twice and a Balance/Weight /100 readout, and they close with a for/against vote that is graded against that number. Their "Map" button leaves the topic URL for a canvas at `/` whose Scales tab shows "FOR 138 pts · 54%" and whose Debate tab is a "Proposition vs Opposition" AI chamber. On every template the crux sits 2.7–5 screens down. **The change that would matter most:** one crux-first template, built from DebateView's crux sheet (the one `/ai` already reuses), fed by a legacy-topic adapter. At the same time, remove the Map/Scales/Debate exit and the verdict embed.

## Page scorecard
| Route | Purpose in one line (as a visitor reads it) | Clarity 1-5 | Consistency 1-5 | Phone 1-5 | Vision fit 1-5 | Keep / Merge into X / Demote / Remove |
|---|---|---|---|---|---|---|
| /topics | "156 questions, search and browse them" | 4 | 3 | 4 | 3 | Keep (drop the scoreboard sorts and the balance filter, add /ai) |
| /topics/ai-mass-unemployment | Flagship: four camps, five questions the fight turns on | 3 | 2 | 3 | 4 | Keep. Becomes the single template (crux higher up) |
| /topics/capitalism-after-ai | Same flagship shape | 3 | 2 | 3 | 4 | Keep (same template) |
| /topics/us-israel-support | Third new-model map (the sweep's "random legacy" sample picked this one) | 3 | 2 | 3 | 4 | Keep (same template) |
| /topics/nuclear-energy-safety | Legacy: key fact, pro and con text twice, balance score, vote | 3 | 2 | 2 | 2 | Merge into the single template |
| /topics/climate-change | Legacy, 15 phone screens | 2 | 2 | 2 | 2 | Merge into the single template |
| /topics/epstein-files, /topics/tiktok-ban (the 46 legacy maps without falsification data) | A wall of pro and con text, then a "test" with cost and method in monospace | 2 | 2 | 1 | 2 | Merge into the single template (needs data) |
| /?topic=X&view=logic-map (canvas, plus the Scales and Debate tabs) | "An interactive diagram"… then a points tally and an AI debate chamber | 2 | 1 | 2 | 1 | Demote: optional desktop diagram inside Researcher mode. Remove Scales and Debate from the topic path |
| /ai | "What the AI fight turns on now, and what has moved" | 5 | 4 | 4 | 5 | Keep. Link it from the nav, /topics and home |
| /topics/compare | "See how topics stack up against each other" | 3 | 2 | 3 | 1 | Remove |
| /topics/compare/[a]/vs/[b] | Two unrelated debates ranked "By the Numbers" | 2 | 2 | 3 | 1 | Remove (redirect to /topics) |
| /topics/category/[slug] | Category list with different cards and verdict chips | 3 | 2 | 3 | 2 | Merge into /topics?category= (redirect) |
| /topics/tag/[slug] | Tag list (tag "climate" → 1 topic) | 2 | 2 | 3 | 2 | Demote (noindex) until tags are cleaned up |
| /embed/[topicId] | Third-party widget: "VERDICT · Scores came out even · Margin 0.2" | 3 | 3 | 4 | 1 | Keep, rebuilt around crux + both best cards |

## Findings (ranked, most severe first)

### F1. Two topic products (really three variants) that look and behave differently
- Severity: critical     Scope: template     Effort: L
- Where: `app/topics/[id]/page.tsx:151-189` (new-model → `components/argument/DebateView.tsx` inside `AppShell layout="reading"`) vs `:191-267` (legacy → `LegacyTopicPageLoader` → `TopicPageClient` → `components/ReadModeView.tsx` inside `AppShell` browse layout). Screenshots: `topics__ai-mass-unemployment--1440.png` vs `topics__nuclear-energy-safety--1440.png`; `topics__capitalism-after-ai--1440-full.png` vs `topics__climate-change--1440-full.png`; `extra/t2-legacy-epstein--1440-full.png`.
- Problem: open two maps from the same library and you get two products. Every visible difference:
  - **Shell (1440).** Flagship: sidebar collapsed, one 672px column on a 1440 screen, no breadcrumbs, no table of contents. Legacy: sidebar open (with eight arbitrary topics), breadcrumbs, a right "On this page" rail, and a floating "Open the map" pill.
  - **Header.** Flagship: 3:2 hero illustration, kicker "Debate map, reviewed Aug 12, 2026", the H1 is a *question*, then Scope, hook and "What this map shows". Legacy: kicker "POLICY, EVIDENCE STILL DIVIDED", a Read/Map toggle, the H1 is a *label* ("Climate Change", "Nuclear Energy for Climate"; 110 of 156 titles are not questions), then "Continuously reviewed · 8 sources", then a drop-cap proposition.
  - **Opening content.** Flagship: hook, then share card, then divergence chart. Legacy with data (110 maps): "The fact that reframes this debate" plus "This fact: Established", then "The honest version, in three sentences". Legacy without data (46 maps): nothing; straight into the pro and con table.
  - **Cruxes.** Flagship: one numbered ledger sheet of five questions, each led by "What would settle it", with a movement track and ledger. Legacy: one crux box per pillar, placed *after* that pillar's evidence and titled with a test name ("Deaths Per TWh Analysis"). It holds "A supporter / A skeptic changes their mind if…", or on the 46 maps "What would settle this" plus a monospace `cost: $0 … status: verified`.
  - **Evidence.** Flagship: hidden inside each crux, "＋ Supports" / "− Challenges" with source, date and interest disclosure. Legacy: "SUPPORTS · Strong" / "AGAINST · Contested" cards with a 0–40 score bar, the two strongest per pillar plus "Show all N".
  - **Verdict/status.** Flagship: none (claim chips only inside Researcher mode). Legacy: status in the kicker, the "Established" chip, a "Where the evidence stands" Balance/Weight /100 readout, and "Heaviest card for… against…".
  - **Vote.** Flagship: none. Legacy: a five-point agree/disagree scale that is then compared with the map's balance score.
  - **Save / share / embed.** Flagship: none. Legacy: two unlabelled icons (Save, Embed) under the related topics. No share button on either.
  - **Map canvas.** Flagship: none (`/?topic=ai-mass-unemployment&view=logic-map` silently falls back to the home hero, `HomeClient.tsx:148-176`). Legacy: the toggle plus the floating CTA both leave for `/`.
  - **Related topics.** Flagship: "Keep exploring", plain links to the other two new-model maps. Legacy: three same-category cards.
  - **Newsletter.** The same on both (AppShell footer only).
- Fix: one template (see "Proposed topic page"). It's **mainly a component problem, plus a bounded data gap**:
  - **Coverage.** 110 of 156 legacy topics already carry `keystone_fact`, `simple_case`, and on every pillar crux a `falsification` block (`supporter_flip`, `skeptic_flip`, `common_ground`, `live_disagreement`) (counted with bun over `data/topics`). That covers the hook, the "what this map shows" text, and "what would change your mind" for each crux. `crux.verification_status` already maps to a resolution kind (`lib/argument/adapter.ts:241-245`).
  - **Gap (a).** No crux is phrased as a question. `crux.title` is a test name. `live_disagreement` is the nearest text and could seed one authored sentence per pillar, about 330 sentences.
  - **Gap (b).** 110 titles are labels, not questions.
  - **Gap (c).** Legacy positions are binary proponent/skeptic, not named camps.
  - **Gap (d).** The 46 topics without falsification include epstein-files, tiktok-ban, trump-tariffs, transgender-athletes-sports and second-amendment-individual-right. They need full crux data.
  - **The existing adapter is not a render path.** `lib/argument/adapter.ts` drops `falsification` and emits `[REQUIRES AUTHORING]` placeholder claims (`adapter.ts:225-238`). Instead, write a small `Topic → CruxPageModel` adapter and a presentational template that both data shapes feed. Reuse DebateView's crux primitives: `CRUX_SHEET`, `ENTRY_GRID`, `MARGIN_RULE` and `SettleAnswer` (`DebateView.tsx:565-718`), which `/ai` already shares.

### F2. "Map" on every legacy topic exits to a scoreboard and a debate-winner machine
- Severity: critical     Scope: system     Effort: S (unlink) / M (retire)
- Where:
  - **The exits.** `ReadModeView.tsx:270` (Read/Map toggle → `ReadGraphToggle.tsx:34-35`) and `:536-552` (floating "Open the map" / "Map", always visible at `lg`). `app/topics/[id]/page.tsx:196-199` also redirects `?view=graph` there.
  - **What they land on.** `/?topic=…&view=logic-map`, with tabs `components/ViewToggle.tsx:10-14` (Map · Scales · Debate).
  - **Screenshots.** `extra/t2-map-nuclear--1440.png`, `extra/t2-canvas-scales--1440.png`, `extra/t2-canvas-debate--1440.png`, `extra/t2-map-nuclear--390.png`, `extra/t2-map-nuclear-tap--390.png`.
- Problem:
  - **You leave the page.** One tap takes a reader off `/topics/[id]` into a different shell (the sidebar highlights "Home"). There is no way back to the reading page.
  - **Scales tab.** "Scales" reads "FOR 138 pts … 118 pts AGAINST", "FOR 54% / AGAINST 46%", "Evidence FOR 138 pts" (`components/ScalesOfEvidence.tsx:152-248, 445-490`). On phones this is the "Evidence" tab of MobileArgumentList, one tap from the topic.
  - **Debate tab.** "Debate" is a "DEBATE CHAMBER — Proposition vs Opposition — Select your debaters" (Claude/GPT/Gemini/Grok) wired to `JudgingResults`.
  - **Rigged fallback.** When a pillar has no evidence, `ScalesOfEvidence.tsx:356-384` fabricates cards: the proponent side gets weights 9/8/9/8 and the skeptic side 4/5/3/5. The thumb is literally on the scale. Only minneapolis-shooting is affected today, but the fallback is live.
- Fix: delete the Read/Map toggle and the floating CTA from the topic page. Stop redirecting `?view=graph` (render the topic page instead). Take Scales and Debate off any topic path. Delete `generateEvidenceFromTopic`'s synthetic cards. If the diagram survives at all, see F8.

### F3. The embed widget, the one artifact that travels off-site, is a verdict banner
- Severity: critical     Scope: page     Effort: S
- Where: `app/embed/[topicId]/page.tsx:87-124` (`VerdictBanner`: "Verdict · Scores leaned toward the for side · Margin", fed by `getMockVerdict`), `:174-178` (BalanceWeightReadout), `:187-196`. Screenshots: `extra/t2-embed-nuclear--390.png`, `extra/t2-embed-nuclear--1440.png`. Also `/embed/ai-mass-unemployment` → 404 "Insufficient Evidence for This Page" (`extra/t2-embed-aimu--390.png`).
- Problem: anyone who embeds a map shows "VERDICT — Scores came out even — Margin 0.2" plus "Balance 54/100 · Weight 76/100" on their own site. There is no crux and nothing about what would change a mind. New-model maps can't be embedded at all.
- Fix: rebuild the embed as the question, the top crux with "What would settle it", and one best card from each side, reusing `SettleAnswer`. Delete `VerdictBanner` and the readout. Serve new-model topics through the same model as F1.

### F4. Neither template's first screen answers "what's the question, the positions, the crux, what would change my mind"
- Severity: high     Scope: template     Effort: M
- Where:
  - **Page lengths.** `topics__ai-mass-unemployment--390.png` / `--1440.png`, `topics__nuclear-energy-safety--390-sheet1.png`, metrics.json. On phone: ai-mass-unemployment is 7,973px (**9.4 screens**), nuclear-energy-safety 9,558px (11.3), climate-change 12,838px (15.2), epstein-files 14,084px (16.7), tiktok-ban 19,351px (**22.9 screens**).
  - **Where the crux lands (measured with Playwright).** Flagship: positions start at 2.4 phone screens and the crux list at **3.9 phone screens** (2.75 desktop screens). Legacy nuclear: first crux at **4.95 phone screens** (2.69 desktop).
  - **Code.** Flagship `DebateView.tsx:90-139`; legacy `ReadModeView.tsx:265-300`.
- Problem:
  - **Flagship at 1440.** The hero illustration takes about 60% of the first screen, so the first screen is a picture, a title and one paragraph.
  - **Flagship on phone.** Screen 1 is the picture and the hook. Screens 2–3 repeat "−16%" twice more: the ShareCard and the DivergenceChart. The positions only start on screen 3, the questions on screen 4.
  - **Legacy.** The H1 is a label, and the claim appears as a drop cap below the fold. The page's own content names the real crux ("The serious debate is no longer really about safety; it is about whether new reactors can be built fast enough", simple_case sentence 2), yet the structure leads with the non-crux pillar, "Safety Record".
- Fix: above the fold, put the question as the H1, a one-sentence hook (the keystone fact), "What both sides already agree on" (legacy `common_ground`, flagship `closer.heading`), and a "N questions decide this" list of the crux questions as anchor links. Put the hero image below the positions, or at most 200px on desktop and off entirely on phone. Fold ShareCard and DivergenceChart into a "The numbers" `<details>`. Full order in "Proposed topic page".

### F5. Legacy pages print every argument twice
- Severity: high     Scope: template     Effort: S
- Where: `components/SynopticTable.tsx:31-41` renders every pillar's full `proponent_rebuttal` and `skeptic_premise`. `ReadModeView.tsx:328-344` renders the same two texts again in each pillar. Screenshots: `topics__climate-change--1440-full.png`, `extra/t2-legacy-epstein--1440-full.png`.
- Problem: roughly a quarter to a third of every legacy page is verbatim repetition. That is a big part of why phone pages run 11–23 screens. The side order also flips: proponent first in the table, skeptic first in the pillars. The table's "CRUXES" row links to test names in 15px type.
- Fix: delete `SynopticTable` from the topic page. The crux list in F4 replaces its navigation role.

### F6. Leftover scoreboard framing, where it lives
- Severity: high     Scope: system     Effort: M
- Where:
  - **Legacy "Where the evidence stands".** Balance/Weight readout "Balance 54/100 · Weight 76/100", Against↔For meter: `components/BalanceWeightReadout.tsx:72-127`, placed at `ReadModeView.tsx:377-391`.
  - **Vote that grades the reader.** "the evidence balance for this topic is 54/100… You lean further toward 'for' than the weighed evidence does" (`components/VerdictVoting.tsx:286-307`; `extra/t2-vote-after--390.png`). It also says "You're not alone — readers land all over this one" (`:262-275`), but the "aggregate" is only this browser's localStorage (`:92-118`). That social claim can't be true.
  - **Tier chips.** "This fact: Established" (`components/FlagshipIntro.tsx:34-36`). Per-card tiers "Established/Strong/Contested/Thin" plus a 0–40 bar (`ReadModeView.tsx:78-107`, `lib/evidenceMetrics.ts:16-21`). On a card, "Contested" means a score of 50–74, while on the same page "contested" is the topic's status.
  - **/topics sorts and filters.** Sort options "Most settled", "Strongest for", "Strongest against" (`app/topics/TopicsPageClient.tsx:24-27`), plus an "Evidence balance" range filter (`:418-449`).
  - **Category and tag cards.** "CONVERGES / DIVIDED / MODERATE" chips, with "Moderate" in rust (the proponent/CTA colour) (`components/BalanceWeightChip.tsx:24-46`). An AlertCircle icon marks "contested". One card can carry both "contested" and "CONVERGES" (Affirmative Action, `extra/t2-category-policy--1440.png`).
  - **Canvas.** The root node shows a "54% BALANCE" ring (`components/nodes/MetaNode.tsx:108`). The phone list header shows the verdict label in monospace (`components/MobileArgumentList.tsx:295-296`).
  - **Compare.** "By the Numbers", with the higher value bolded in teal on each row (`app/topics/compare/[id1]/vs/[id2]/ComparisonView.tsx:96-105, 347-379`). The index promises topics "stack up against each other" (`CompareIndexView.tsx:537`).
  - **Search snippets.** Legacy metadata descriptions lead with `topic.verdict.label` (`app/topics/[id]/page.tsx:86`).
- Problem: the north star says "verdict banners become secondary to crux cards". On the 156 legacy maps the verdict is still a full-width scored panel, and the reader's own view is graded against it. No green/red truth colours or amber were found in this area. The one colour-coding exception is the DivergenceChart, which plots unemployment in a non-token teal (#0f9284) and the decline in crux crimson (#a23b3b) (`components/argument/DivergenceChart.tsx:203-243`).
- Fix:
  - **Balance/Weight readout.** Move it into Researcher mode as "How the cards weigh". No /100 in the page body.
  - **Vote.** Replace `VerdictVoting` with the north-star one-tap: "Which of these questions would change your mind?" (pick a crux), then "Did this change what you thought the argument was about?". Never compare the reader with a number.
  - **Tiers.** Drop "Established". Rename card tiers to evidence quality ("strong source", "single study") so they can't collide with "contested".
  - **/topics.** Remove the three sort options and the balance filter. Sort by "Most active cruxes" or recency instead.
  - **Metadata.** Use the crux in meta descriptions, not the verdict.

### F7. `/ai`, the north-star "living AI map", is effectively orphaned
- Severity: high     Scope: system     Effort: S
- Where: the only inbound link is `components/argument/DebateView.tsx:343-352`, below the crux list on two pages. It is not in `lib/nav.ts:54-60`, not on `/topics` (whose "Start here" block lists three maps, not `/ai`), and not on home. Screenshots: `ai--1440-full.png`, `ai--390-sheet1.png`.
- Problem: the best page in this area is where a topic page should lead. It is crux-first, its lede says "It does not score the sides", it has dated evidence, and its chips are 44px. Nobody can find it.
- Fix: add `/ai` as the first "Start here" card on `/topics` and as a nav or Explore sub-item. Link it from every AI-category legacy map's crux section.

### F8. The React Flow canvas: unreadable on desktop, absent on phones, adds nothing
- Severity: high     Scope: system     Effort: S (unlink) / M (rebuild as diagram)
- Where: `components/HomeClient.tsx:227-236` (desktop → `DesktopCanvas`, phone → `MobileArgumentList`), `data/logicBlueprint.ts:58-74`, `components/nodes/RichNode.tsx:59-65,158`, `data/topics/nuclear-energy-safety.ts:28-29`. Screenshots: `extra/t2-map-nuclear--1440.png`, `extra/t2-canvas-explore--1440.png`, `extra/t2-canvas-findcrux--1440.png`, `extra/t2-map-nuclear--390.png`.
- Problem:
  - **Readability.** On desktop the canvas opens at 67% zoom, with node body text around 8px. Pressing "Explore" on one pillar refits to 43%, around 5px, which can't be read.
  - **Placeholder and filler content.** Two of the five opening nodes are placeholders: "Skeptic Thesis — Arguments challenging the core premise." and "Leaf node" (the blueprint default for topics without `questions`). The pillar "Safety Record" for nuclear illustrates itself with an Unsplash photo of an AMD Ryzen CPU. The crux node's "The key question" is a test description in quotation marks, not a question. Clicking a node opens nothing.
  - **Phones.** Phones never get a canvas. They get a tabbed list whose "Evidence" tab is the points tally from F2.
  - **Discoverability.** On desktop it is very discoverable (toggle plus a permanent pill), which is the problem.
- Fix: phones should get the outline, and the new topic page *is* that outline. Remove the canvas from the topic header entirely. If it's worth keeping, offer "See the structure as a diagram" only inside Researcher mode at ≥1024px, rendered in place on `/topics/[id]` rather than at `/`, with no photos, no balance ring and no placeholder nodes.

### F9. Orphaned and duplicate listing routes: category, tag, compare
- Severity: medium     Scope: system     Effort: S
- Where:
  - **Category.** `/topics/category/[slug]` is linked only from `app/sitemap.ts:117-124`. The `/topics` tabs use `/topics?category=` instead (`TopicsPageClient.tsx:310-323`), so the same list exists at two URLs with two card designs (`extra/t2-category-policy--1440.png` vs `topics--1440-full.png`).
  - **Tag.** `/topics/tag/[slug]` is linked only from the sitemap (`:126-137`). Tags duplicate categories (`/topics/tag/policy` is `/topics/category/policy`). `/topics/tag/climate` returns 1 topic (Carbon Tax); climate-change and nuclear-energy-safety aren't tagged "climate" (`extra/t2-tag-climate--1440.png`).
  - **Compare.** `/topics/compare` and the pair pages have no inbound link except the dead `TopicDetailView.tsx:437`. Both render `<Breadcrumbs>` outside `AppShell` (`app/topics/compare/page.tsx:139`, `[id1]/vs/[id2]/page.tsx:212`), so the breadcrumb sits *above* the TopBar (`topics__compare--1440.png`).
- Problem: pages that exist for SEO, show a different design from the library, and in compare's case exist only to rank debates against each other.
- Fix:
  - **Compare.** Remove it (redirect to `/topics`).
  - **Category.** Pick one category URL. Either 301 `/topics/category/x` → `/topics?category=x`, or make the tabs link to `/topics/category/x` rendered by `TopicsPageClient`.
  - **Tag.** noindex tag pages until the taxonomy is audited, and drop category names from tags.

### F10. Topic actions are missing, unlabelled or buried
- Severity: medium     Scope: template     Effort: S
- Where: `ReadModeView.tsx:443-451` (Save + Embed as icon-only buttons after the related topics). `components/SubscribeButton.tsx:96` returns null without auth. `ShareButtons` is used only in blog, analysis and the dead TopicDetailView. DebateView has no actions. Screenshots: `extra/t2-actions--390.png`, `extra/t2-actions-saved--390.png`.
- Problem: the reader can't share the thing the site exists to spread. Save is an unlabelled bookmark glyph 12 screens down, and it turns into a filled rust square.
- Fix: one labelled action row (Save · Share · Embed), in the desktop rail and at the end of the crux list on phone. Reuse `ShareButtons`.

### F11. Library content-farm signals
- Severity: medium     Scope: system     Effort: M (editorial)
- Where: `topics--1440-full.png`, `data/topics/*`.
- Problem:
  - **Overlapping AI-jobs maps.** "Will AI cause mass unemployment?" (flagship), "Will AI Replace Most White-Collar Jobs?" (`ai-job-displacement`) and "AI White-Collar Job Displacement" (`ai-white-collar-displacement`).
  - **Odd categorisation.** "The Moon Landing" is filed under Philosophy.
  - **Mixed titles.** Labels and questions are mixed, and so are Title Case and sentence case ("Should TikTok Be Banned?" vs "Will AI cause mass unemployment?").
  - **Cards list inventory, not insight.** They show a proposition plus "3 pillars, 12 evidence cards" instead of what the fight turns on.
- Fix: merge the two legacy AI-jobs maps into the flagship (redirect). Retitle every map as a sentence-case question. Change the card line to "Turns on: <first crux question>".

### F12. Dead and confusable code keeps the old product one import away
- Severity: medium     Scope: system     Effort: S
- Where:
  - `app/topics/[id]/TopicDetailView.tsx` is 1,761 lines and imported nowhere. It still pulls in `getMockVerdict`, `JudgingResults`, `ShareButtons` and the compare link.
  - `components/DebateView.tsx` (the AI debate chamber) and `components/argument/DebateView.tsx` (the flagship reader) share a name.
- Fix: delete TopicDetailView, and update `lib/categoryColors.test.ts:237`. Rename `components/DebateView.tsx` → `DebateChamber.tsx`, or delete it with F2.

### F13. Tap targets (metrics.json: 60 under 32px on ai-mass-unemployment at 390)
- Severity: low     Scope: template     Effort: S
- Where: my own re-measure (`t2-small.mjs`). On ai-mass-unemployment, **55 of the 60 sit inside closed `<details>`**. They are the evidence source links "Title ↗", 15–31px tall (`DebateView.tsx:866-874`), which Chromium measures although they're hidden. The 5 visible ones are the skip link, the "Keep exploring" links (18px, `:496`) and "How this map was made →" (15px, `:512`). Legacy nuclear: the synoptic crux anchors (15px) and the GlossaryTerm "Pillar"/"Crux" buttons (47×21, 38×21). `/ai`: 14 map-name links at 16px.
- Problem: these don't matter on first load. They do matter once a reader opens a crux, because the source links stack as 15px lines. That is exactly where a sceptical reader taps.
- Fix: in ClaimEvidence, make each source a block link (`inline-flex min-h-11 py-2`). Give footer lists `min-h-11` rows. On `/ai`, fold the map name into the card's kicker as plain text.

### F14. Nits
- Severity: low     Scope: page     Effort: S
- **Hardcoded counts.** "Jump to the five crux questions" and "The four camps" are hardcoded (`DebateView.tsx:135,144`) and break on the first map with a different count.
- **Stale date.** The flagship says "Reviewed Aug 12, 2026" while `/ai` says "as of September 22, 2026" and the ledger has September entries (`ARGUMENT_TOPICS_LAST_UPDATED`).
- **Monospace metadata.** `FalsificationCrux.tsx:81,101` (cost/status), `VerdictVoting.tsx:291`, `MobileArgumentList.tsx:91,124,295`.
- **Crimson on data.** The −16% in the DivergenceChart uses crux crimson.
- **Title suffixes differ.** Legacy page titles end "— Argument Analysis", flagship "— Debate Map".

## Patterns worth copying
- **`/ai` crux sheet** (`app/ai/page.tsx`, `components/ai/*`, primitives exported from `components/argument/DebateView.tsx:565-718`: `CRUX_SHEET`, `ENTRY_GRID`, `MARGIN_RULE`, `SettleAnswer`, `settleTally`; movement in `components/argument/CruxMovement.tsx`). It is crux-first, says "does not score the sides", and has 44px filter chips. This is the template's core.
- **DebateView progressive disclosure.** Native `<details>`, zero client JS: "Read the full case", "Show the evidence and the exact claim", "Researcher mode", source-interest disclosure (`DebateView.tsx:178-196, 316-335, 430-485, 891-905`).
- **Legacy `FalsificationCrux`'s content**: "A supporter changes their mind if… / A skeptic changes their mind if… / Both agree / The live fight" (`components/FalsificationCrux.tsx:30-67`). It is the most on-mission text in the legacy library. Put it inside each crux entry of the sheet.
- **ReadModeView navigation.** The desktop TOC rail and the phone "Contents" float that hides while you read down (`ReadModeView.tsx:211-250, 456-534`). Keep them, listing crux questions instead of pillars.
- **`/topics`** "Start here: the full debate maps" block, search and category tabs (`app/topics/TopicsPageClient.tsx`).

## Proposed topic page

One route and one template, `/topics/[id]`, always in `AppShell layout="reading"`. It is fed by `ArgumentGraph` (via DebateView's data) or by a legacy `Topic` (via a new `Topic → CruxPageModel` adapter).

**Phone (390). Target: crux list starts on screen 1–2, and the whole page is ≤ 6 screens with everything folded.**
1. Breadcrumb (one line) and the kicker "Map · reviewed <date> · N sources".
2. **H1 = the question** (sentence case).
3. **Hook**: one or two sentences. Flagship `meta.hook`; legacy `keystone_fact.statement` without the "Established" chip, source as a small link.
4. **"What both sides already agree on"**: 1–3 bullets. Legacy `falsification.common_ground` per crux; flagship `closer.heading` or takeaways[0]. This is the perceived-versus-actual gap, stated up front.
5. **"This turns on N questions"**: the crux sheet (`CRUX_SHEET` entries). Each shows the question and "What would settle it" (`SettleAnswer`). Folded under each: "What each answer changes", "A supporter / a skeptic changes their mind if…", and "Evidence on each side" (DebateView's `ClaimEvidence` with 44px source links, or legacy EvidenceItem without the score bar). Movement track where a ledger exists.
6. **The positions**: compact cards (label plus one sentence). "Read the full case" folded. Legacy: two cards, proponent and skeptic, built from the pillar texts, shown once.
7. **One-tap reflection** (replaces VerdictVoting): "Which question would change your mind?" (crux chips), then "Did this change what you thought the argument was about?".
8. Action row: Save · Share · Embed, labelled.
9. Folded: "The numbers" (highlights, DivergenceChart, ShareCard), "How the cards weigh" (Balance/Weight readout, moved here), and "Researcher mode" (all claims).
10. Related maps (3), plus `/ai` for AI-category maps. "How this map was made" line. Footer.

**Desktop (1440).** The same order in a 72ch main column plus a sticky right rail. Rail: "On this page" listing the N crux questions (ReadModeView's TOC pattern), then the action row. The hero illustration, if kept, sits beside the H1 at ≤ 200px tall or after the positions, never as a 430px band above the H1. First screen: H1, hook, agreement bullets and the top of the crux sheet.

**Keep:** DebateView crux primitives and CruxMovement; DebateView positions cards, `ClaimEvidence` and Researcher mode; FalsificationCrux content (restyled into the crux entry); ReadModeView TOC rail and phone Contents float; Breadcrumbs; SaveTopicButton, ShareButtons and EmbedButton (labelled); FlagshipIntro's keystone as the hook.
**Delete from the topic page:** SynopticTable, the in-body BalanceWeightReadout, VerdictVoting, ReadGraphToggle and the floating "Open the map" CTA, the "Established" chip, the per-card score bars, and the ShareCard and DivergenceChart above the fold.
**Delete from the repo:** `TopicDetailView.tsx`, `ScalesOfEvidence` synthetic evidence, the embed `VerdictBanner`, and the topic path into Map/Scales/Debate.
**Data work, in order:** one authored crux question per legacy pillar (about 330; seed from `live_disagreement`); question-form titles for 110 maps; falsification blocks for the 46 maps without them (list in `scratchpad/topicstats.ts` output); merge the two legacy AI-jobs maps into the flagship.

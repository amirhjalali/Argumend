# Topic template: one crux-first page for every map (2026-09-29)

Branch `ux/topic-template`, on `ux/site-overhaul-2026-09-29` (shell foundation merged in).
Evaluation it answers: `scratchpad/findings/2-topics.md` (F1, F2, F4, F5, F6, F10, F13, and the
"Proposed topic page" order).

## What changed

**One template, one order.** Every map on `/topics/[id]` now renders through
`components/topic/TopicPage.tsx`, server-rendered inside `AppShell`:

1. breadcrumb (one line, truncates) and kicker `Map · reviewed <date> · N sources` (only what the data has);
2. H1 = the question (legacy: the title as authored), with a one-line "Scope:" / "The claim:";
3. the hook (flagship `meta.hook`; legacy `keystone_fact` with its source as a small link, no "Established" chip);
4. **What both sides already agree on** (legacy `common_ground` per crux; flagship: claims the graph marks
   uncontested or broadly accepted, listed in a new `agreementClaims` meta field and printed in the graph's own words);
5. **This turns on N questions**: the crux sheet in the `/ai` look (crimson margin numerals, "What would settle it"),
   each entry folding "what each answer changes", "A supporter / A skeptic changes their mind if…", the movement
   ledger where one exists, and the evidence on each side (no score bars, 44px source links);
6. the positions: compact cards, full case folded (legacy: two cards, Supporters and Skeptics, each pillar text shown once);
7. "Which question would change your mind?" (local only, never graded) then "Did this map change what you thought the argument was about?";
8. Save · Share · Embed, labelled (Embed only where `/embed` serves the map);
9. folds: "The numbers" (flagship share card, chart, highlights), "What you can honestly say after five minutes",
   "How the evidence weighs" (legacy, in words: converges / divided / thin, heaviest card on each side), "Researcher mode";
10. related maps and "How this map was made".

Desktop keeps that order in the reading column (44rem) with a sticky rail: "On this page" (agreement, each crux, the
positions) and the action buttons.

**Two adapters feed it, so the templates can't drift.** `components/argument/DebateView.tsx` turns an ArgumentGraph
into the page model; `lib/topicPage/legacy.ts` turns a legacy `Topic` into the same model using only the map's own
text (not `lib/argument/adapter.ts`, which drops falsification and emits placeholders). Crux primitives moved to
`components/topic/cruxPrimitives.tsx`; `/ai` imports them from there.

**The canvas exit is gone.** The Read/Map toggle and the floating "Open the map" pill are replaced by one quiet
"See it as a diagram →" under the crux sheet (legacy maps only). It goes to the new `/topics/[id]/map`: the logic map
inside the site shell with "Back to the map page", no Scales tab, no Debate tab, no balance ring on the root node, no
floating topic card; phones get the pillar outline without the Evidence/Debate tabs, verdict label or per-card scores.
`noindex`, canonical to the topic page, and the proxy 404s unknown ids and debate maps early. `?view=graph` on a
topic page now redirects there instead of to `/?topic=`.

**Scoreboard framing removed from topic pages:** the Established chip, per-card score bars, the in-body
Balance/Weight /100 readout, the graded vote (VerdictVoting deleted), rust verdict chips, the verdict in legacy meta
descriptions. `ScalesOfEvidence` no longer invents cards for pillars without evidence.

**Other:** legacy pages are server-rendered (the client loader is gone; only the reflection and action buttons
hydrate). Save now works for flagship maps and `/saved` resolves their ids. The flagship hero moved after the camps
(hidden on phones); the share card, chart and highlights moved into "The numbers", so "16%" appears once before
the positions. Hardcoded "five questions" / "four camps" are computed. CTAs use `components/ui` (Button, TextAction,
Chip, Section, page widths and title scale).

Deleted as unused: `FalsificationCrux`, `FlagshipIntro`, `SynopticTable`, `ReadGraphToggle`, `VerdictVoting`,
`app/topics/[id]/LegacyTopicPageLoader.tsx`, `app/topics/[id]/TopicPageClient.tsx`.

## Phone screens, before and after (390×844)

Whole page including the site footer / content up to the footer, folds closed. "First crux" is where the first crux
entry starts, in screens.

| map | before: page / content | after: page / content | first crux before → after |
|---|---|---|---|
| ai-mass-unemployment | 9.4 / 8.4 | 7.0 / 5.7 | 4.1 → 1.6 |
| capitalism-after-ai | 8.6 / 7.5 | 7.0 / 5.7 | 3.2 → 1.6 |
| us-israel-support | 8.6 / 7.5 | 6.9 / 5.6 | 3.3 → 2.0 |
| nuclear-energy-safety | 11.3 / 10.5 | 5.2 / 3.8 | 4.95 (eval) → 1.5 |
| climate-change | 15.2 / 14.4 | 5.7 / 4.3 | — → 1.65 |
| epstein-files | 16.7 / 15.9 | 4.9 / 3.5 | — → 0.5 |
| tiktok-ban | 22.9 / 22.1 | 5.6 / 4.2 | — → 0.6 |

Desktop (1440×900): the first screen now shows the H1, hook, agreement block and the crux sheet heading on all three
flagships; the first crux entry starts at 1.05–1.26 screens (was 2.5–2.9). Legacy maps: 0.45–1.14.

Screenshots: `scratchpad/wave2/topics/before__*` and `after__*` (390 and 1440, first screen and full page),
`after-open__*` (a crux, its evidence and every fold open), `open__nuclear-energy-safety-map--*` (the diagram
route), `after-dark__nuclear-energy-safety--1440.png`.

## Data gaps seen (data/* untouched)

- **Titles.** 110 of 156 legacy titles are labels ("Nuclear Energy for Climate", "The Epstein Files"); the H1 shows them as authored.
- **Crux questions.** No legacy crux is a question. With falsification data the sheet uses `live_disagreement`
  (median 236 characters, so long headings get a smaller size); the 46 maps without it fall back to the test's title
  ("The Redaction Audit"). One authored question per pillar (~430) would fix both.
- **46 maps without falsification** (epstein-files, tiktok-ban, trump-tariffs, …) render with no agreement block,
  no hook and no "changes their mind" folds. They render cleanly; they need the data.
- **Position summaries.** The legacy cards quote the first sentence of the first pillar's texts. Where the proponent
  text is a rebuttal it reads like one (Epstein: "The failures went far beyond one prosecutor's 'poor judgment.'").
  An authored one-line summary per side would read better.
- **Common ground** bullets all begin "Both sides agree…", which repeats the heading; left verbatim.
- **Flagship review date** is still the constant `ARGUMENT_TOPICS_LAST_UPDATED` (Aug 12, 2026, pinned by
  `flagshipContracts.test.tsx`) while the ledgers hold September entries.
- **Diagram content** (`data/logicBlueprint.ts`, pillar `image_url`s): placeholder "Skeptic Thesis / Proponent Thesis"
  nodes for maps without `questions`, stock photos on pillar nodes (a CPU for "Safety Record"), evidence nodes still
  show "N/40" badges, and the canvas opens around 54% zoom.

## Left for others / not done

- `HomeClient` canvas mode and the `/?topic=X` → `/topics/X` redirect (another agent). `DesktopCanvas`,
  `MobileArgumentList`, `useLogicGraph` and `components/nodes/*` stay; the diagram route uses them.
- The embed widget is still a verdict banner and 404s for debate maps (F3); Embed is hidden on debate maps until it's rebuilt.
- `BalanceWeightReadout` still renders on `/embed`, `/is/*` and `/questions/*` (not topic pages).
- The legacy page's scroll-progress bar, phone "Contents" float and active-section highlighting were dropped: pages
  are now 4–6 screens and the rail anchors are plain links.
- The topic header keeps its own markup rather than `PageHeader` (it needs the hook source, the scope/claim line,
  and a tighter bottom margin to keep the crux sheet on the first desktop screen); it uses PageHeader's "page" title
  scale, not "display", for the same reason.

# Home and story pages: one argument, one voice (2026-09-29)

Branch `ux/home-story`, stacked on `ux/site-overhaul-2026-09-29` (foundation merged
in at 923c757). Spec: the site review's vision/shell findings F1–F3, F9–F11 and the
design-system findings F4–F6, F10 (`docs/reviews/2026-09-29-site-review/`).

## What changed

**Home (`/`)** is now a server page inside `AppShell`: one argument in four beats.
`components/HomeClient.tsx` (its private shell and the React Flow canvas mode) is
deleted. The canvas components (`DesktopCanvas`, `MobileArgumentList`,
`ScalesOfEvidence`, `components/DebateView.tsx`, `ViewToggle`, `useLogicGraph`,
`components/nodes/*`) are untouched for the topic diagram route.

1. **Claim.** H1, serif lede, one line of public evidence linked to its post, one
   rust `Button` to `/topics/ai-mass-unemployment`, one `TextAction` to the paste tool
   (`ANALYZE_HREF`). The button is on the first phone screen (y = 468 at 390px; it was
   at y = 3050, screen 4).
2. **Proof.** Crux #1 of the same map, on the flagship crux sheet (`CRUX_SHEET`,
   `MARGIN_RULE`, `SettleAnswer`, `CruxMovementTrack`), computed from the map's own
   graph, engine ranking and public ledger (`components/home/homeModel.ts`). It shows
   the question, that it is a hidden assumption, what would settle it, its ledger track
   (Feb 2025 → narrowed Sep 2026), why it is still open and what each answer changes.
3. **Breadth.** The three flagship maps as crux questions, not statistics. Each row
   shows the first crux not already on the page (so the AI-jobs row does not repeat
   beat 2), "Read the map", then "All 156 maps" (`TOPIC_COUNT`). The five-column
   library index is gone. `/ai` is not linked.
4. **Your own argument.** The paste box (`HeroAnalyze`, unedited; wrapped in a
   one-line client component because a server page cannot pass it a function).

Title "ARGUMEND — Map Arguments, Not Win Them" (ungrammatical) is replaced on home and
as the root default; `SITE_DESCRIPTION` is now the footer's line.

**`/about`** is the only story page: `#why`, `#principles`, `#read-a-map`,
`#how-maps-are-made`, `#faq`, `#contribute`, with an "On this page" list. Serif prose on
hairline rules, left-aligned, no boxes or shadows. Deleted: the balance-and-weight
section, stakes cards, quote wall, "Philosophy" band and the "Our Mission to Transform
How People Disagree" metadata. `/how-it-works` and `/community` are deleted and
redirect here (so is `components/DiamondDiagram.tsx`, used only by `/how-it-works`).
Every number on the page is one the site already published (the 2026-09-17 post).

**`/methodology`** is "How maps are made", every claim checked against code and data
(the file header lists where): positions and evidence (drafted by a model from research
reports, provenance on every node, audited before release), the four measures, filing
by what a card shows and the side audit, the deterministic crux engine and the three
ways a crux can be settled, the reviewed crux ledger, the older maps' one-line reading,
the "When 'settled' is withheld" paragraph kept verbatim (marked `data-kept`), and what
the method cannot do. Deleted: the ChatGPT section, the four-judge council, score
aggregation, the verdict matrix, "every score can be traced back to specific judges".

**`/faq`** renders `data/faqs.ts` (now 14 questions after the copy sweep) as one
hairline-ruled list of `<details>` rows under a `PageHeader`. Small tap targets from
the page: 48 → 0 (the one still counted at 390px is the shell's visually hidden skip link).

**Sign-in and dashboard** (both still behind `NEXT_PUBLIC_ENABLE_AUTH`): "Sign in to
keep your saved maps across devices", no "Welcome back", no "analyses and debates", the
guest path a quiet link, terms → `/terms`. Dashboard: "Your saved maps" as hairline
rows (flagship ids resolve too); no debate history, Swords icon, status chips, balance
chip or winner.

All six pages sit on `components/ui` (`PageHeader`, `PageContainer`, `Section`,
`Button`, `TextAction`). `components/story/StoryParts.tsx` keeps only the "On this
page" list and ruled lists.

## The new home copy, in full

> **Find what the argument actually turns on.**
>
> Most arguments are not about what they seem. Argumend maps the few questions a
> fight really turns on, and what would change each side's mind. It never names a
> winner.
>
> WHAT WE MEASURED — In a 36-minute televised debate, 88 of 114 turns were not about
> the question in its title. [How we measured it](/blog/we-gave-a-model-that-cant-talk-1000-arguments)
>
> [**See it on AI and jobs →**](/topics/ai-mass-unemployment) · [Paste an argument you're in](/analyze)
>
> ---
>
> **What would change your mind?**
> Every map narrows a fight to a few questions like this one. It is the first of five
> on *Will AI cause mass unemployment?*
>
> 1 · THE CRUX — **When AI makes a firm more productive, does it hire fewer people — or
> just sell more?**
> *A hidden assumption: nobody in the debate says it out loud, but the positions lean
> on it.*
> WHAT WOULD SETTLE IT — Firm-level panels linking AI adoption to headcount, output,
> and pricing decisions over multiple years.
> Feb 2025 ○–○–◎ Narrowed Sep 2026
>
> *Why it is still open.* Everyone agrees AI makes some teams faster. Nobody has the
> firm-level data showing what bosses then do with the slack — hire fewer, or sell
> more.
> *What each answer changes.* If it's "hire fewer," the displacement case gains its
> mechanism. If it's "sell more," the historical pattern holds and the jobs can come
> back somewhere else.
>
> [Read the whole map](/topics/ai-mass-unemployment)
>
> ---
>
> **Three live arguments, mapped**
> Each sets out four serious positions, the questions they turn on, and the strongest
> evidence each side reads.
>
> - **Will AI cause mass unemployment?** — TURNS ON FIVE QUESTIONS, INCLUDING *Could
>   retraining actually work if it were done seriously — or is the record damning?* —
>   Read the map
> - **Can capitalism survive AI?** — TURNS ON FIVE QUESTIONS, INCLUDING *Does control of
>   frontier AI stay concentrated — or diffuse?* — Read the map
> - **Should the U.S. reduce its support for Israel?** — TURNS ON FIVE QUESTIONS,
>   INCLUDING *Does current U.S. support deter a wider war — or feed escalation?* — Read
>   the map
>
> [All 156 maps →](/topics)
>
> ---
>
> **Bring your own argument** (the paste box, unchanged)

The crux text, counts and questions are read from the maps at build time, not typed
into home. "Disagree better." is in the header at every width, so home no longer
repeats it.

Metadata: title "ARGUMEND — Find what the argument actually turns on"; description
"Most arguments are not about what they seem. Argumend maps the few questions a fight
really turns on, and what would change each side's mind. It never names a winner."

## Redirects added (`next.config.js`, one "home + story" block)

| From | To | Note |
|---|---|---|
| `/?topic=:id` (any `view`) | `/topics/:id?view=read` | 308. Next merges the incoming query, so the destination pins `view=read`: a merged `view=logic-map` would otherwise bounce off the legacy topic page back to `/?topic=` (a loop). Verified: one hop, 200. |
| `/how-it-works` | `/about#read-a-map` | 308 |
| `/community` | `/about#contribute` | 308 |

## Phone screens (390 × 844, full document incl. header and footer)

| Page | Before | After | After, excluding footer |
|---|---|---|---|
| `/` | 6.67 (rust button on screen 4) | 4.30 (button on screen 1) | 3.40 |
| `/about` | 7.04 | 7.18 (now also carries /how-it-works and /community) | 6.28 |
| `/methodology` | 10.14 | 7.62 | 6.72 |
| `/faq` | 9.27 (73 questions) | 2.94 (14 questions) | 2.05 |

Home misses the ≤ 4 target by 0.3 screens only because of the footer, which grew from
659 to 757 px in the foundation merge (newsletter card plus two link columns). The four
home beats themselves are 547 + 894 + 859 + 512 px.

Screenshots: `scratchpad/wave2/home/before/` and `…/after/` (390 and 1440, full page
and first screen, for `/`, `/about`, `/methodology`, `/faq`, plus dark-mode home and
about at 1440).

## Tests

- `app/page.test.tsx` (replaces `page.semantic.test.tsx`): one h1; the primary CTA is a
  `/topics/…` page, never `/?topic=`, and the only rust fill; paste link is
  `ANALYZE_HREF`; the evidence link resolves to a real post that publishes the quoted
  numbers; beat 2 is crux #1 of the button's map; beat 3 lists every flagship with "Read
  the map", no tagline statistics and no repeat of beat 2; no canvas, debate-map,
  verdict or `/ai` link.
- `components/FeaturedTopicHero.test.tsx`: rewritten for the server component.
- `app/storyPages.test.tsx`: `/about` and `/methodology` render none of "judge",
  "Judge", "verdict matrix", "Score Aggregation", "who is right" (the verbatim paragraph,
  which uses "judge" as a verb, is excluded and checked word for word instead); anchors,
  principles, steps and links.
- `app/dashboard/page.test.tsx` (new) and `app/auth/signin/page.test.tsx` (copy case).
- `next.config.test.ts`: the three redirects, including the loop guard.
- Guard lists updated for deleted files (`darkModeTextTokens`, `routeErrorBoundaries`,
  `categoryColors`, `modalAccessibilityContract`, `topicImportBoundaries`,
  `staticMetadata`).

## Notes for the merge and the founder

- **Interim canvas gap.** Legacy topic pages' "Map" button (`ReadModeView`,
  `ReadGraphToggle`) still links `/?topic=…&view=logic-map`, which now lands back on the
  reading page until the topic agent's `/topics/[id]/map` route replaces those links.
- **Home frame.** Home's beats use `px-4 md:px-8` around `max-w-5xl`, the frame
  `HeroAnalyze` draws itself, so all four beats share one left edge. Move both to
  `PageContainer` together (the paste agent may touch `HeroAnalyze`).
- **Turbopack/SWC whitespace quirk.** In JSX text that contains an HTML entity
  (`&rsquo;`) and follows an `{expression}`, the leading space was dropped ("3newer
  maps"). Fixed on `/methodology` by using the literal ’; rendered pages were scanned
  for `word<!-- -->word` and are clean.
- **Left for their owners:** `CLAUDE.md` still lists `HomeClient.tsx`;
  `featuredTopicId`/`featuredReason` in `data/topicIndex.ts` and `listUserDebates` in
  `lib/db/queries.ts` are now unused; `Sidebar.tsx`, `useSidebarState` and
  `useMobileSidebarA11y` stay because `app/analyze/page.tsx` still imports them; the
  footer labels `/methodology` "Methodology" (its title is now "How maps are made").
- **About copy decisions to confirm:** H1 "Disagree better."; the name line ("It reads
  both ways, argum-end and argu-mend: end the counterfeit argument, and mend how we talk
  to each other, so that people can look for wisdom rather than a side") avoids the
  rejected "Mend the real one."

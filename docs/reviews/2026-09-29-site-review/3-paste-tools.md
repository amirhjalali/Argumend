# "Bring your own argument" (paste tools and their results): evaluation

## Verdict (≤6 lines)
Argumend has three paste tools with three names, three flags, three consent lines and three visual languages, and nothing on the site routes between them. In production (checked on argumend.org, 2026-09-29) only `/analyze` exists: `/analyze-v2`, `/reply` and `/d/*` all return 404. That one tool is a debate-scoring machine. It promises to "rate how strong the reasoning really is", runs "Programmatic Judgment" by default, and ends in "Aggregate Scores FOR 4.7 / AGAINST 5.0" with three identical "evaluators" in "unanimous agreement". Every entry point on the site sends visitors to it, including /analyze-v2's own error fallback. The v2 diagnosis is close to the north star, but none of the three results links to the 156 maps. **The change that matters most:** make one paste flow at `/analyze` that always ends at the relevant map. The routing already exists, runs offline and costs nothing (`lib/mapReply/prefilter.ts`). Add the v2 diagnosis on top when its lane is on. Delete judging from every paste surface.

## Page scorecard
| Route | Purpose in one line (as a visitor reads it) | Clarity 1-5 | Consistency 1-5 | Phone 1-5 | Vision fit 1-5 | Keep / Merge into X / Demote / Remove |
|---|---|---|---|---|---|---|
| `/analyze` | "Paste text; we score both sides with 3 evaluators and flag fallacies" | 2 | 2 | 2 | 1 | Keep the URL; replace the page with the single flow (below); remove judging now |
| `/analyze-v2` | "Paste a disagreement; see what they agree on, the hinge, and what would settle it" | 3 | 4 | 4 | 4 | Merge into `/analyze` (its client becomes the front door); 308 redirect |
| `/reply` | "Paste a thread; see which Argumend map it belongs to and which cruxes it reached, as percentages" | 2 | 4 | 3 | 3 | Merge into `/analyze` as the "on the map" section of the result; 308 redirect |
| `/analyses` | "Your past analyses" (actually a public list of everyone's; always empty in prod) | 1 | 2 | 3 | 1 | Remove (redirect to `/analyze`) |
| `/analysis/[id]` | "A saved analysis: For 7/10 Strong vs Against 3/10 Weak, plus judge scores" (read from code; needs DB) | 2 | 2 | n/r | 1 | Demote: stop creating; render old rows without strength bars or judging, or return 410 |
| `/d/[slug]` | "A published diagnosis someone shared with you" (read from code; needs DB) | 3 | 3 | n/r (same view as v2: 4) | 4 | Keep as the shared-result template; fix its shell and 404 |
| Home "Bring your own argument" box | "Paste here" → sends you to `/analyze`, where you paste-submit again | 3 | 4 | 3 | 2 (lands on the scoreboard) | Keep; submit straight into the single flow |

n/r = not rendered: the dev server cannot load `postgres` (see F9), and production has no DB.

## Entry-point map (what actually links where)
Dev server: `NEXT_PUBLIC_ENABLE_DISAGREEMENT_V2` unset, `ENABLE_DISAGREEMENT_V2=true`. Production: all paste flags off (verified with curl).

| Entry point | Label | Code | Goes to (dev / prod) |
|---|---|---|---|
| Home box | "Analyze" (V2: "Find what it turns on") | `components/HeroAnalyze.tsx:11,26` | `/analyze`, prefilled, not submitted. Would go to `/analyze-v2` only if the *public* flag is on. |
| TopBar brain icon | "Analyze" | `components/TopBar.tsx:133` | `/analyze` (same public-flag switch) |
| Sidebar | "Analyze Text" | `lib/nav.ts:56` | `/analyze`, always, even when the TopBar points to v2 |
| Topic pages, "Explore more" | "Analyze your own content: Submit a claim and get an evidence-based analysis with weighted arguments" | `app/topics/[id]/TopicDetailView.tsx:553-557` | `/analyze` |
| Search modal | "Analyze: Paste text and extract positions, cruxes, and fallacies" | `components/SearchModal.tsx:94-98` | `/analyze` |
| 404 page | "Run an Analysis" | `app/not-found.tsx:53` | `/analyze` |
| FAQ ×5 | "Try the argument analyzer" | `data/faqs.ts:101,131,189,249,287` | `/analyze` |
| Methodology | "Try it yourself" | `app/methodology/page.tsx:488` | `/analyze` |
| Footer | none | `lib/nav.ts:89-98` | no paste link |
| `/analyze-v2` error | "Try the limited local parser" | `components/disagreement/DisagreementAnalyzeClient.tsx:225-226` | `/analyze` (the scoreboard) |
| `/d/[slug]` and its 404 | "Analyze another disagreement" | `app/d/[slug]/page.tsx:89`, `app/d/[slug]/not-found.tsx:8` | `/analyze-v2` (404 in prod) |
| `/reply` | none | none | Orphan: linked from nowhere. 404 in prod, and the `Dockerfile:17-28` build args omit `NEXT_PUBLIC_ENABLE_JEV_MAP_REPLY`, so a Docker build cannot turn it on. |

**What each page renders with its flags off or its provider offline** (from code):
- `/analyze`: always renders. Uses the offline parser unless `ENABLE_LIVE_ANALYZE_API` is set. The judging checkbox defaults to ON (`app/analyze/page.tsx:254`), so every run ends in programmatic scores.
- `/analyze-v2`: `notFound()` unless `ENABLE_DISAGREEMENT_V2` (`app/analyze-v2/page.tsx:15`). With the flag on and no Anthropic key: "The analysis service is temporarily unavailable." plus the link to `/analyze`.
- `/reply`: 404 unless the build-time `NEXT_PUBLIC_ENABLE_JEV_MAP_REPLY`. With the page on and the API off, the pasted thread gets "switched off on this deployment" (F7).
- `/analyses`: no DB, or DB down → the empty state "Nothing here yet" (this is what production shows).
- `/analysis/[id]`: no DB → the not-found page.
- `/d/[slug]`: no DB → a bare 404 with no TopBar or Footer.

## Findings (ranked, most severe first)

### F1. The only paste tool live in production is a debate-scoring machine
- Severity: critical     Scope: page + system     Effort: S (interim) / M (proper)
- Where: `/analyze`. Evidence: `eval/analyze--1440.png`, `eval/extra/p3/analyze-result-full--1440.png`, `analyze-result--390-sheet1/2.png`. Production check: argumend.org/analyze shows "Programmatic Mode" and "Include Programmatic Judgment".
- Problem: the hero says *"In seconds, we'll surface every position, pinpoint the crux that divides them, and rate how strong the reasoning really is"* (`app/analyze/page.tsx:525-527`). The judging checkbox is on by default (`:254`, label `:689`). Half the result is `components/JudgingResults.tsx`:
  - "Programmatic Rubric Scores" (`:161`).
  - A dark banner, "Scores came out even", over "Aggregate Scores FOR 4.7 AGAINST 5.0" (`:41-46, :82-93`).
  - "Score Gap: Very Narrow, 0.3 point margin" (`:177, :192-194`).
  - "Score Breakdown by Dimension" (`:237`).
  - "Programmatic evaluator 1/2/3" (`:280`), which give identical scores and are then reported as "Unanimous agreement from all evaluators". The three are the same deterministic rules, so the agreement is theatre.

  The "never a winner" rewording on 09-22 changed the verb and kept the scoreboard. The SEO copy repeats the framing: "assesses argument quality" and the keywords "argument quality score", "logical fallacy detector" (`app/analyze/layout.tsx:8-19`), and the HowTo step "Inspect argument-strength assessments" (`:56`).
- Fix: interim, shippable today:
  - Delete the judging checkbox (`page.tsx:671-692`) and the JudgingResults block (`:933-954`), and send `includeJudging:false`.
  - Replace the hero line with the home box's promise ("the positions in it, the claims each one rests on, and the question they turn on").
  - Drop the "Programmatic Mode" badge (`:514-519`), "Running in local/offline mode to keep analysis costs predictable" (`:529-533`) and "Analyze (Local)" (`:753`).
  - Strip "quality/strength" from `layout.tsx`.

  Proper: the single flow below. JudgingResults and ShareVerdictCard should appear on no paste surface.

### F2. Three tools, three names, two conflicting flags, no routing
- Severity: critical     Scope: system     Effort: M
- Where: the entry-point map above. Evidence: `eval/analyze--1440.png`, `eval/analyze-v2--1440.png` and `eval/reply--1440.png`, side by side.
- Problem: a visitor has no way to learn why there are three tools or which one to use. Nothing links to `/reply`. The v2 tool can only be reached through the home box and TopBar, and only if a *build-time* public flag matches a *runtime* server flag:
  - `TopBar.tsx:133` and `HeroAnalyze.tsx:11` read `NEXT_PUBLIC_ENABLE_DISAGREEMENT_V2`.
  - `app/analyze-v2/page.tsx:15` reads `ENABLE_DISAGREEMENT_V2`.

  In this dev server they disagree, so v2 is orphaned and its TopBar icon leads to the *other* tool. In the reverse mismatch, the home box parks the visitor's text in sessionStorage and navigates to a 404. The sidebar ("Analyze Text" → `/analyze`) and TopBar ("Analyze" → v2) diverge whenever the flag is on.

  Everything a visitor sees differs across the three:

  | | `/analyze` | `/analyze-v2` | `/reply` |
  |---|---|---|---|
  | Title | "Analyze Any Argument" | "What is the argument really resting on?" | "Reply with the map" |
  | Submit | "Analyze (Local)" | "Find what it turns on" | "Map this thread" |
  | Example link | "Try an Example" | "See an example" | "Load example" |
  | Character limit | 50,000 | 20,000 | 12,000 |
  | Type selector | Freeform / Article / Transcript | Conversation / Article / Freeform | none; expects "name: text" |
  | Start over | "Edit input or analyze another" | "Analyze another" | "Map another thread" |

  The code comment in `app/reply/page.tsx:10-12` wrongly says v2 is gated on the public flag, which is how this drift survived.
- Fix: one front door at `/analyze`, one label everywhere ("Paste an argument" in `lib/nav.ts`, TopBar, footer column, search, topic CTA). Remove the `NEXT_PUBLIC_ENABLE_DISAGREEMENT_V2` branches from `TopBar.tsx` and `HeroAnalyze.tsx`: the server page decides the lane. `/analyze-v2` and `/reply` get 308 redirects in `next.config.js`. See "Proposed single paste flow".

### F3. No result ever links to a map, though the site has one and offline routing finds it
- Severity: high     Scope: system     Effort: S
- Where: all three results. Evidence: `eval/extra/p3/analyze-result-full--1440.png`, `v2-result-full--1440.png`.
- Problem: the `/analyze` example is about nuclear power, and the result never mentions `/topics/nuclear-energy-safety`. The v2 example is Alex and Blair on immigration and wages, and the result never mentions `/topics/immigration-wage-impact`. The report ends in "Share" and "Analyze another", a dead end for the site's actual product. The BM25 prefilter in `lib/mapReply/prefilter.ts` needs no network or model ("runs in a few milliseconds") and picks exactly those maps:
  - v2 example → `immigration-wage-impact` 29.7, next best 17.9.
  - `/analyze` example → `nuclear-energy-safety` 50.3.

  Run locally with `bun` on 2026-09-29.
- Fix: compute `closestMaps` server-side in `/api/analyze` and `/api/disagreements/analyze` from `prefilterTopics()`. Render them with the "Closest maps" block from `components/mapReply/MapReplyNoMatch.tsx:67-80`. For the top map, show its claim and cruxes (the home page's crux card pattern). Make "Open the map" the result's rust CTA. This works in production with every flag off.

### F4. `/reply` scores named people, and "Copy reply" posts that into their thread
- Severity: high     Scope: page     Effort: S
- Where: `/reply` result. Evidence: `eval/extra/p3/reply-result--390-sheet1.png`, `reply-result-full--1440.png`, and the expanded turn list in `reply-turns-expanded--390.png`.
- Problem: the lede says *"gary_1962 did not make an argument about the topic. Some of you are arguing about different sections of the map while thinking you disagree."* (`lib/mapReply/render.ts:78,91`). `TurnList.tsx:193` repeats it in bold. Each named speaker's turn carries a "Fallacy 80%" meter (`TurnList.tsx:141`). The page's only rust CTA, "Copy reply" (`MapReplyFooter.tsx:57-68`), copies markdown with the real names restored, meant to be pasted back into a thread whose other participants never consented. That is the "imposed" case the north star rules out ("voluntary before imposed"), and it scores people rather than moves.

  The evidence block sets "For the map's claim 34 / 40" beside "Against 28 / 40" as bars (`EvidenceCards.tsx:79-83`), which reads as a side ahead on points.
- Fix:
  - Describe moves, not people: "1 of 8 turns wasn't about the topic."
  - Keep speaker names out of the copied text.
  - Remove the per-turn Fallacy meter from the visible list, or keep it behind a "How this was read" disclosure without names.
  - Show the evidence cards without numeric /40 comparisons, or with each score explained on its own card.

### F5. Pasted-text handling is disclosed three different ways, and two of them are inaccurate
- Severity: high     Scope: system     Effort: S
- Where:
  - `/analyze`: pill badge "Source text isn't stored or sent to an AI model" (`app/analyze/page.tsx:651-658`).
  - `/analyze-v2`: "By analyzing, you agree that this text is sent to our AI provider (TypeSafe AI or Anthropic…) and is not stored." (`lib/aiProviders.ts:176-184`).
  - `/reply`: "By submitting, you agree that this text is sent to TypeSafe AI … Identifiers are removed first. … Privacy." (`:210-220`).

  Evidence: `eval/analyze--1440.png`, `eval/analyze-v2--1440.png`, `eval/reply--1440.png`.
- Problem:
  1. **`/analyze` publishes results without saying so on the page.** With a DB configured, `/api/analyze` auto-saves the extraction (`app/api/analyze/route.ts:174-194`), including claims, quotes and speaker-attributed fallacies. It is listed publicly at `/analyses`. The only disclosure is on `/privacy` (`app/privacy/page.tsx:152-158`); the page itself says only "isn't stored".
  2. **`/analyze-v2` names a vendor it never uses.** It names TypeSafe AI, but the diagnosis lane never calls TypeSafe (`lib/aiProviders.ts:16-20`, `DIAGNOSIS_PROVIDER_IDS :96-99`). It shows the same sentence when the provider is `fake` and nothing leaves the server.
  3. **The wording drifts.** Three verbs ("analyzing" / "submitting" / a badge), two link styles, and no link at all on `/analyze`.
- Fix: one `AiConsentLine` rendered by the single flow. The server page passes the lane that will actually run, so the line tells the truth:
  - Offline/map lane: "Nothing you paste leaves our server."
  - Diagnosis lane: "sent to Anthropic (US), not stored."
  - Thread lane: "sent to TypeSafe AI (US) with identifiers removed."

  Remove the silent auto-persist and the public listing (see F9).

### F6. Jargon leaks on every result page
- Severity: high     Scope: template     Effort: M
- Where: `eval/extra/p3/*-result-text--390.txt`, and the sheets `reply-result--390-sheet1.png` and `v2-result--390-sheet1.png`.
- Problem: a non-expert meets operator vocabulary and templated grammar.
  - **`/reply`:**
    - Thresholds and meters: "every placement above the 70% floor" (`TurnList.tsx:185`); "touched at or above 50%" (`CruxLists.tsx:99`); "The tick on each track is the 50% threshold" and "Above the line, so the reply says so." (`PatternSignals.tsx:112-113`); "Mixed disagreement 99%"; "Confidence this is the map 95%".
    - Pipeline internals: "Routed to no section of the map (…on "none")" (`TurnList.tsx:54`); "Probing the shape of the thread" (`MapReplyProgress.tsx:18`); "4 requests, 39 ms, model jev-1.13.0, 0 identifiers removed" and "fixtures, not a live model" (`MapReplyFooter.tsx:18-24, 87-93`).
    - Map vocabulary with no explanation: section names such as "Supply Effects" and "Incumbent Protection vs New Renter Harm", and "It never reached … 49%".
  - **`/analyze-v2`:**
    - Bare labels: "Kind of disagreement: Cause", "Resolvability: High" (`ReportMasthead.tsx:45-49`), "Cause question, high resolvability", "Also load-bearing", "Stated in source, high confidence", "steelman", "source-only" (`ReportProvenance.tsx:134`); "Source-only AI assembly" on `/d` (`app/d/[slug]/page.tsx:64`).
    - Templated sentences:
      - "Is this true: Immigrants grow the economy and create jobs for natives." (`lib/disagreement/projectReport.ts:359`)
      - "If Immigrants grow the economy … holds → Growth offsets supply becomes stronger." (`:145`)
      - "What could settle it: Further clarification is required." (`:325`)
      - "No update is stated", "no consequence stated" (`ClaimStakeLedger.tsx:8`)
      - "The stated updates are qualified…"
    - The report contradicts itself: the headline says it "turns on" one question, the sidebar says "Turns on 2 cruxes", and the resolution sits under a different question.
  - **`/analyze`:** "Programmatic Mode", "Analyze (Local)", "Extraction confidence: 85%", "Rubric", "evaluators".
  - "Noul" and "probe" do not leak; "Jev" leaks only as the model id. "crux" is used without a definition on `/analyze` ("Key Cruxes"); v2's "What the argument turns on" is the right plain form.
- Fix:
  - Move every threshold, meter and execution line under one collapsed "How this was read" disclosure.
  - Rename masthead labels in plain words, for example "What kind of disagreement: about causes", and drop "Resolvability".
  - Rewrite the three `projectReport.ts` templates as grammatical questions and sentences.
  - Where a crux has no resolution condition, say "The text doesn't say what would settle this", not "Further clarification is required."

### F7. Disabled, error and share states are dead ends
- Severity: high     Scope: page     Effort: S
- Where:
  - `eval/extra/p3/reply-disabled--390.png`: *"Map replies are switched off on this deployment. The page is here; the model lane behind it is not enabled."* plus "Reference 6c437a3a-…" (`components/mapReply/errorCopy.ts:12-15`). The PROVIDER_NOT_CONFIGURED copy reads "Fixture answers are never served in production."
  - `v2-share-deadend--390.png`: the report's one rust CTA, "Create shareable link", leads to a confirm panel, then "Create unlisted link", then "Publishing is not configured." (`ShareReport.tsx:47-50`). The server already sent `unavailableReason` with the result (`app/api/disagreements/analyze/route.ts:90`).
  - `v2-error--390.png`: every v2 failure offers only "Try the limited local parser", which leads to the scoreboard.
  - `hamburger-reply--390.png`: on `/reply`, `/analyze-v2` and `/d/*` the TopBar menu button has no `onMenuClick` (`TopBar.tsx:71-80` rendered from `app/reply/page.tsx:37`, `app/analyze-v2/page.tsx:21`), so it does nothing. On a phone the only other nav icon ("Analyze") goes to a different tool. Verified by tapping.
  - `app/d/[slug]/not-found.tsx`: no shell, a hardcoded `#C4613C` link (rust-500, 3.6:1 on parchment, below AA), pointing at `/analyze-v2`, which 404s in prod.
- Problem: a visitor who has just pasted a thread, after being told it goes to a third party, gets operator language and nowhere to go.
- Fix:
  - Don't render a tool whose lane is off. The single flow degrades to the map lane instead of erroring.
  - Render Share only when `publishing.available`.
  - Make v2's error offer "See the closest maps" (F3), not the legacy parser.
  - Wrap every paste route in `AppShell` (or pass `onMenuClick`).
  - Give `/d` not-found TopBar and Footer and `text-rust-600`, and point it at `/analyze`.

### F8. Legacy result content reads as broken
- Severity: high     Scope: page     Effort: S (remove) / L (fix the parser)
- Where: `/analyze` result, `eval/extra/p3/analyze-result-text--1440.txt`.
- Problem:
  - The topic is the text's first sentence, "Debate over nuclear energy has intensified".
  - The summary reads *"a structured dispute about Debate over nuclear energy has intensified. The supporting side argues that proponents argue it's essential…"*.
  - The first "Key Crux" is two quoted clauses glued with "outweighs": *"Whether proponents argue it's essential for meeting climate goals — nuclear produces … outweighs critics counter that nuclear is too expensive and too slow to build"*.
  - "Hasty Generalization" is flagged on a sentence with no absolute language, and the quote is cut at "Finland's".
  - All of it sits under "Extraction confidence: 85%".

  This is what production visitors see from the example button.
- Fix: stop presenting offline extraction as a report. In the single flow's offline lane, show the matched map's crux and evidence (F3). The parser's positions could be kept at most as a collapsed "Sides we detected" list.

### F9. `/analyses` misdescribes itself; the dev 500 is an artefact that also breaks `/analyze` locally
- Severity: medium     Scope: page + tooling     Effort: S
- Where: `eval/analyses--1440.png`, which shows the dev overlay "Failed to load external module postgres-3f98aac8c9563034". Production: argumend.org/analyses → 200, "Nothing here yet".
- Problem:
  - **The page's words are wrong.** It says "Past analyses live here … This is where *your* analyses will live." (`app/analyses/page.tsx:93, 119`), but when a DB exists it is a public, unauthored list of everyone's extractions. Its metadata sells "quality scores" (`:20, :30, :38`), and each item shows a confidence bar (`:153-164`).
  - **The dev 500 is not a product bug.** The page handles a missing or down DB correctly: `isDatabaseConfigured()` is false → empty state, a thrown query → empty state (`:49-56`), and `error.tsx` exists. The 500 comes from `lib/db/index.ts:2` statically importing `postgres` while `next.config.js:50` marks it `serverExternalPackages`. Under `"dev": "bun --bun next dev"` (`package.json:7`), Turbopack's hashed external `postgres-<hash>` cannot be resolved by the Bun runtime. Production runs Node on standalone output and is unaffected.
  - **The same dev failure breaks other routes locally.** `POST /api/analyze` 500s, so local `/analyze` always shows "The analysis service is temporarily unavailable" (`eval/extra/p3/analyze-error--390.png`). `/analysis/[id]` and `/d/[slug]` 500, and `/api/topic-views` fails quietly. The founder cannot test the legacy tool locally.
- Fix: remove `/analyses` (308 to `/analyze`; delete the `/privacy` sentence that points at it), or make it a personal list kept in localStorage. For dev, run Next under Node ("dev": "next dev"), matching the production runner. The alternative is to import `postgres` lazily inside `initDb()`.

### F10. `/analysis/[id]` is the scoreboard in its purest form
- Severity: medium     Scope: page     Effort: S
- Where: `app/analysis/[id]/AnalysisView.tsx:160-215` (SplitStrengthBar: "{for}% — Strong" vs "Weak — {against}%", "{n}/10"), `:115-130` (StrengthBadge "7/10 strong" per argument), `:725` (JudgingResults again). Not rendered: production has no DB, and dev 500s (F9).
- Problem: if persistence is ever switched on, every saved paste becomes a shareable page that says one side is Strong and the other Weak.
- Fix: stop writing new rows (F5). Render legacy rows with positions and cruxes only, delete SplitStrengthBar, StrengthBadge and JudgingResults, and add the closest-map CTA. Or return 410.

### F11. Three visual languages for one job
- Severity: medium     Scope: template     Effort: M
- Where: `eval/analyze--1440.png` vs `analyze-v2--1440.png` vs `reply--1440.png`.
- Problem:
  - **`/analyze`** has a hand-copied sidebar and TopBar shell (`page.tsx:450-500`) instead of `AppShell`. It uses a centred hero with two pill badges, a white shadow card, a teal-filled segmented control, a `from-rust-600 to-rust-700` gradient button, monospace numerals, and a dark stone-gradient score banner.
  - **v2 and `/reply`** use TopBar + Footer with no sidebar, a left-aligned serif, a `rounded-full bg-rust-600` button and underlined text links. Even these two disagree:
    - Container: v2 is `max-w-5xl`, so the heading starts at x=232 at 1440; `/reply` is `max-w-3xl` at x=360.
    - H1 location: v2's H1 lives in the client; `/reply`'s lives in the page.
    - Section shell: two copies of the same component, `components/disagreement/ReportSection.tsx` and `components/mapReply/ResultSection.tsx`.
- Fix: one page shell (`AppShell`, like the other content pages), the v2 input block, and one section shell (keep `ReportSection`, delete `ResultSection`). Delete the `/analyze` chrome.

### F12. Phone: the home handoff makes you submit twice, and `/analyze` spends its first screen on a header
- Severity: medium     Scope: page     Effort: S
- Where: `eval/extra/p3/home-box-filled--390.png` → `home-box-landing--390.png`; `eval/analyze--390.png`.
- Problem:
  - Pressing "Analyze" in the home box only navigates (`HeroAnalyze.tsx:19-27`). On a phone the landing screen is two badges, a centred H1, a centred five-line paragraph and a cost note. The prefilled text is below the fold and the submit button two screens down, so the visitor must find it and press again.
  - "← Edit input or analyze another" is a 205×20 tap target.
  - The `/reply` result is 7 phone screens (5,698 px) with 9 meters. The v2 result (5,042 px) reads well on a phone; its problems are words (F6), not layout.
- Fix: the home box submits directly: put `autoSubmit:true` in the prefill and have the flow start on mount. Use left-aligned body text. Put result actions at the top of the report.

### Nits (low)
- The v2 prefill sets content programmatically, bypassing the textarea's `maxLength` (20,000) for long home-box pastes.
- The v2 progress steps ("Separating the voices…") are a fake 1.8 s timer over a 450 ms response. Harmless, but untrue.
- `/reply` header: "Every line is either a number from the model", but "the model" is never introduced.
- The home V2 subhead "Paste a disagreement and find the hinge", and v2's "what each major claim is actually committed to changing", are opaque.
- FAQ "Can AI really analyze arguments objectively?" (`data/faqs.ts:124`) describes the paste tool as a "multi-model judge council" that "scores arguments".

## Patterns worth copying
- **The v2 report as a document:** `components/disagreement/DisagreementReportView.tsx`, `ReportSection.tsx` and `CruxSection.tsx`. The masthead's plain verdict-free headline ("They agree more than the argument makes it seem."), then "What they agree on", then "What the argument turns on" with what would settle it. This is the result page's backbone.
- **Consent at the click:** `components/AiConsentLine.tsx` with the builders in `lib/aiProviders.ts`, wired to the button with `aria-describedby`. Keep the mechanism; feed it the real lane.
- **Honest refusal:** `components/mapReply/MapReplyNoMatch.tsx` ("No map, rather than the wrong map" plus "Closest maps"), backed by `lib/mapReply/prefilter.ts`. This is the offline, free map routing every result should end with.
- **No-winner line:** the `/reply` header "It never says who is right." and `MapReplyResult.tsx:72-74` "Argumend does not say who is right. Nothing below is a verdict." Reuse one line of this in the single flow's masthead.
- **Crux-card pattern** on the home page ("What would change a supporter's mind / a skeptic's mind"), for showing the matched map's crux inside a paste result.

## Proposed single paste flow

**Principle:** you paste an argument, see where the disagreement really is, and are taken to the map that already lays out both sides' best cards. One URL, one shell, one consent line, no scores. The server picks the lane; the UI stays the same.

1. **Entry.** Everything points to `/analyze`: the home box, TopBar, sidebar, footer column, topic-page CTA, search, 404, FAQ and methodology. The label everywhere is "Paste an argument". Rewrite the topic CTA: "Bring an argument you're in. We'll show where it sits on a map like this one."
   - The home box submits straight through (auto-submit) instead of prefilling.
   - `/analyze-v2` and `/reply` get 308s to `/analyze`. `/analyses` gets a 308 too, or becomes a personal localStorage list.
   - Delete `NEXT_PUBLIC_ENABLE_DISAGREEMENT_V2` from `TopBar.tsx` and `HeroAnalyze.tsx`.
2. **Input.** `app/analyze/page.tsx` becomes a *server* component inside `AppShell`. At request time it reads which lanes are live and passes `lane` to `DisagreementAnalyzeClient` (keep it; rename it `PasteClient`). Reuse:
   - `AnalyzeInput`, with one type selector: Conversation / Article / My own draft.
   - "See an example": one example, the immigration one, because it has a map.
   - One limit (20,000).
   - One `AiConsentLine` built for the lane that will actually run (F5).

   Delete the 964-line legacy page UI, `AnalyzeExecutionNotice` and the `/analyze` HowTo JSON-LD's strength claims.
3. **Processing lanes** (server-decided, same response shape):
   - **Map lane:** always on, offline, free. `prefilterTopics()` → top 3 maps. This is what production gets with every flag off, starting today.
   - **Diagnosis lane:** when `ENABLE_DISAGREEMENT_V2` and a provider are configured. The v2 six-box report *above* the map block.
   - **Thread lane:** when Jev is enabled and the paste parses as `name: text` turns. Adds `SectionBar` and `CruxLists` ("which of the map's cruxes this thread reached") *inside* the map block, as a section, not a separate page. No names, no per-person meters.
   - The legacy offline extractor and all judging are retired from this surface (`/api/analyze` judging stays only if another surface needs it; none should).
4. **Result, one document** (v2 typography, `ReportSection` shell):
   1. Masthead: plain headline, then "Argumend does not say who is right."
   2. What they agree on.
   3. What the argument turns on, and what would settle it.
   4. **"This argument is already mapped":** the map's title and claim, its crux with "what would change a supporter's / skeptic's mind", and the strongest card on each side, without /40 comparisons.
   5. Closest other maps.
   6. "How this was read": one collapsed disclosure holding every percentage, threshold, lane and model id.

   Reuse `MapReplyNoMatch` for the no-map case.
5. **Next step:**
   - Primary rust CTA: **"Open the map at this crux"** (`/topics/[id]#crux-…`).
   - Secondary: "Copy a summary" (no names, no scores), and the north-star one-tap question: "Did this change what you thought you were arguing about? Yes / No". Log it via the existing gap-metric path (counts only).
   - Share (`ShareReport` → `/d/[slug]`) renders only when publishing is available. `/d/[slug]` keeps the same document template inside the shell.

**Code to keep:**
- `components/disagreement/*`: the client, input, report view and sections, `RepresentationFeedback`, and `ShareReport` (gated).
- `components/AiConsentLine.tsx` and `lib/aiProviders.ts`.
- `lib/mapReply/prefilter.ts`.
- `components/mapReply/{MapReplyNoMatch, CruxLists, EvidenceCards, SectionBar}`.
- `app/d/[slug]`.

**Code to delete from paste surfaces:**
- The `app/analyze/page.tsx` UI.
- `components/JudgingResults.tsx` and `ShareVerdictCard` usage.
- `AnalyzeExecutionNotice`.
- `components/mapReply/ResultSection.tsx` (duplicate shell).
- `app/analyses`.
- The strength components in `AnalysisView.tsx`.
- The per-person fallacy meters and names in `render.ts` and `TurnList.tsx`.

**Interim before the merge** (S, safe for production now, where only `/analyze` runs):
- Remove judging from `/analyze` (F1).
- Add `closestMaps` from the prefilter to the `/api/analyze` response and render it with a rust "Open the map" CTA (F3).
- Fix the `/d` not-found page and the dead hamburger (F7).
- Switch dev to Node (F9).

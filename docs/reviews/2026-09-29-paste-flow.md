# One paste flow at /analyze (2026-09-29)

Branch `ux/paste-flow`, from the site-wide UX overhaul. Evaluation it answers:
the paste-tools findings (F1–F12 and "Proposed single paste flow") in the
overhaul review. Screenshots were taken at 390 and 1440 wide, with the lanes off
and with the fixture diagnosis lane on.

## What production visitors see now (every flag off)

`/analyze` is one page: "What is the argument really resting on?", a type
selector (Conversation / Article / My own draft), "See an example" (the
immigration exchange, which has a map), one 20,000-character limit, and one line
at the button: *"Nothing you paste leaves our server. It is matched against
Argumend's maps there and is not stored. Privacy."* That line is true. The route
runs a keyword index in memory, makes no network call, writes nothing, and logs
nothing about the text.

The result is a single document:

1. **"This argument is already mapped"**: the map's title and claim. Then what
   the map says it turns on, worded exactly as the topic page words it, with
   what would change a supporter's mind and what would change a skeptic's. Then
   the strongest card on each side, with no weight scores.
2. **Next step**: the rust "Open the map at this crux" button, which deep-links
   the topic template's crux entry (`#crux-<pillar>` for pillar maps,
   `#crux-<claim>` for flagship maps; checked by clicking through). Beside it,
   "Copy a summary" (no names, no scores), then "Did this change what you
   thought you were arguing about? Yes / No".
3. **Closest other maps** (two), "Paste another", and **"How this was read"**,
   collapsed. It holds every number: keyword scores, the bar a match has to
   clear, and timings.

When no map stands out, the page says "No map, rather than the wrong map" (some
maps come close) or "No map on the site came close" (none do), and lists the
closest maps. The home paste box hands its text over and `/analyze` submits it
on arrival, so a phone visitor presses once. No page anywhere shows
"Programmatic Mode", a judging checkbox, FOR / AGAINST badges, aggregate scores
or evaluators.

## What changed

- **`POST /api/analyze` is the map lane** (`lib/paste/maps.ts`). It uses the
  map-reply BM25 prefilter over the 156 pillar maps plus the three flagship
  debate maps, 159 in all. The flagship maps are described from
  `lib/argument/topicIds.ts`, so they can be matched too. A map is named only
  when its score is at least 15 and at least 1.5 times the mean of ranks 3 to
  6. That was calibrated on the two examples, eight short on-topic pastes, and
  unrelated text from 150 to 3,500 characters. "Closest" maps need a score of
  at least 8. An answer names at most 3 maps. Pillar maps are read through
  `lib/topicPage/legacy.ts`, the model the topic page itself renders.
  - The route no longer runs the offline extractor, the rule-based judge
    council, or `saveAnalysis`.
  - The public `GET /api/analyze` listing is gone.
- **`/analyze` is a server page** (`app/analyze/page.tsx`). It reads the lanes
  at request time (`lib/paste/lanes.ts`) and renders `components/paste/PasteClient`
  inside AppShell, built from `components/ui`.
  - The diagnosis lane runs only when `ENABLE_DISAGREEMENT_V2=true` and a
    provider can run: `fake`, or `cli` outside production, or Anthropic with
    both a model id and a key. Its six-box report sits *above* the map block in
    the same document. A diagnosis failure never blocks the map.
  - The consent line comes from `buildPasteConsentLine(providerIds)`. It names
    exactly the provider that will receive the text, and says nothing is sent
    anywhere when that is true.
  - Deleted: the 964-line legacy page, `AnalyzeExecutionNotice`, and the
    strength claims in the HowTo JSON-LD and metadata.
- **Plain words in the diagnosis report.** These components are shared with
  `/d/[slug]`, so the changes show there too.
  - The masthead reads "Mostly a disagreement about causes. Something checkable,
    or a shared definition, could settle much of it." It no longer shows "Kind
    of disagreement: Cause / Resolvability: High".
  - "Is this true: X" became "X. Is that true?"
  - Branches read "If “X” holds → The case for “Y” gets stronger."
  - "Further clarification is required" became "The text doesn't say what would
    settle this."
  - "No update is stated", "Also load-bearing", "source-only", "steelman" and
    the per-position confidence bands are gone.
  - The confidence note moves into the page's "How this was read".
  - The fixture eval (`scripts/eval-disagreement.ts`) still passes 48/48.
- **Retired:**
  - `/analyses` and `/analyze-v2` 308 to `/analyze`. Both redirects sit in one
    "paste flow" block in `next.config.js`.
  - The `/analyses` page and the `/analyze-v2` page are deleted, together with
    `DisagreementAnalyzeClient` and its "Try the limited local parser" link.
  - `/analysis/[id]` no longer reads the database or renders strength bars and
    judge scores. It says "This older analysis format is retired" and links to
    `/analyze`. `AnalysisView` is deleted.
  - `/privacy` describes the paste tool as it now works.
- **`/reply` stays behind its flags.** Its thread lane is not folded into
  `/analyze` in this pass, because it cannot be exercised without enabling
  Jev. Its output now follows the same rules:
  - It describes turns, never people: "1 of 8 turns was not an argument about
    the topic". It no longer prints "gary_1962 did not make an argument" and no
    longer addresses the thread as "you".
  - The copied reply carries no percentages, "/40" weights or thresholds.
  - The visible page is words only. Every meter, threshold, weight, model id
    and the numbered turn-by-turn list (no names) moves into one "How this was
    read" fold.
- **Home box** (`components/HeroAnalyze.tsx`) no longer reads
  `NEXT_PUBLIC_ENABLE_DISAGREEMENT_V2`. It makes one promise and uses one label
  ("Find what it turns on"). The handoff key is in `lib/paste/handoff.ts`.
- `bun run dev:node` runs Next under Node. Under Bun, dev cannot load the
  `postgres` external module.

## Verification

- Gates: `tsc --noEmit`, `eslint . --max-warnings=0` and `vitest run`
  (256 files, 3,038 tests) all pass.
- New tests:
  - The map lane: ≤3 maps, no network, flagship matching, no scores.
  - Lane resolution.
  - The page with the lanes off.
  - PasteClient: both lanes, the handoff under Strict Mode, failures, and no
    auto-submit when a provider would receive the text.
  - The summary: no names, no scores.
  - A guard that renders every state of every paste surface and fails on
    FOR / AGAINST badges, "aggregate", "winner", "judg", "verdict" or x/10 and
    x/40 scores. It also fails on imports of JudgingResults, ShareVerdictCard,
    `lib/judge` or the strength bars.
- In the browser (dev server under Node):
  - The home box auto-submits once.
  - The CTA lands on the crux entry, in view.
  - `/analyze-v2` and `/analyses` return 308.
  - The screenshots show no forbidden words and none of the old jargon.

## For the founder

1. **The one-tap answer is not recorded anywhere yet.** The gap-metric path
   (`lib/gapMetric`) accepts only its strict per-reply record, so the
   Yes / No answer stays in the page. Recording it needs a small counts-only
   schema or table.
2. **Rows saved by the old analyzer.** Decide whether to delete them; the
   privacy page flags this as pending. `GET /api/analysis/[id]` still returns
   an old row as JSON when a database is connected. Nothing links to it any
   more. Remove it if the rows go.
3. **The diagnosis lane now appears at `/analyze` when its flag is on.**
   Before, it appeared at `/analyze-v2`. The flag is still off in production,
   and the disagreement-loop checkpoints (spec §22) still gate turning it on.
4. **`DIAGNOSIS_PROVIDER_IDS` still names TypeSafe AI**, and so does the
   privacy page, although the diagnosis lane never calls it. The paste flow
   itself names only the real provider.
5. **`NEXT_PUBLIC_ENABLE_DISAGREEMENT_V2` is now read by nothing.** It is still
   in the Dockerfile and `.env.example`. CLAUDE.md's V2, Map Reply and flag
   notes still mention `/analyze-v2`; they were not edited here.
6. **The match thresholds (15, 1.5×, 8) rest on a small calibration.** Lexical
   matching can misroute: an anti-vaccine paste scores highest against
   climate-change. The floor holds that back as "closest", not "mapped".
   Re-check the thresholds on real pastes.
7. **Folding `/reply` into `/analyze`** needs Jev enabled to test, and a
   consent line that covers two providers at once.

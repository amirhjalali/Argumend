# Duplicate-logic audit — 2026-07-29

Scope: small utility / formatting / presentation logic copy-pasted across 3+ files.
Prompted by the doc comment on `lib/categoryColors.ts`, which records an earlier
round of the same problem (category + status chip colors duplicated across
`SearchModal`, `/topics`, `ReadModeView`, `TopicDetailView` with conflicting
palettes).

The pattern repeats. The consolidation of `categoryColors` fixed the *colors* but
left the *labels and icons* that travel with them duplicated in eight places, and
the same copy-paste habit shows up in verdict rendering, OG image routes, and
score-to-color thresholds.

One cluster (#1) was extracted for real. Everything else is a recommendation.

---

## 1. Date formatting — EXTRACTED ✅

**Status: fixed in this branch.** `lib/formatDate.ts` + `lib/formatDate.test.ts`.

Seven private `formatDate` declarations implemented the same two formats:

| Site | Was |
| --- | --- |
| `app/blog/page.tsx:17` | `toLocaleDateString` long |
| `app/blog/category/[category]/page.tsx:14` | `toLocaleDateString` long |
| `app/blog/tag/[tag]/page.tsx:14` | `toLocaleDateString` long |
| `app/blog/[slug]/page.tsx:270` | `toLocaleDateString` long (arrow fn) |
| `components/ReadModeView.tsx:573` | `toLocaleDateString` long **+ NaN guard** |
| `app/analysis/[id]/AnalysisView.tsx:522` | `toLocaleDateString` long, inlined |
| `app/dashboard/page.tsx:45` | `Intl.DateTimeFormat` short |
| `app/analyses/page.tsx:125` | `toLocaleDateString` short, inlined |

Two different APIs for the same output, and only one of the eight
(`ReadModeView`) guarded against an unparseable input — the other seven would
render `Invalid Date` to the user.

Now: `formatLongDate()` / `formatShortDate()`, locale pinned to `en-US` (a
runtime-dependent locale would be a hydration mismatch, since several of these
render on the server and hydrate on the client). The NaN guard now applies
everywhere. Behavior is otherwise byte-identical.

Known caveat, deliberately preserved and documented in the module: a *date-only*
string like `"2026-01-15"` parses as UTC midnight and renders in the host
timezone, so it shows as the 14th anywhere behind UTC. Every current caller
passes a full timestamp.

---

## 2. Status label + icon maps — 8 copies (largest cluster)

`lib/categoryColors.ts` centralized the chip *colors* for `TopicStatus`, but each
call site still re-declares the label string and the Lucide icon that go with it:

- `app/dashboard/page.tsx:33` (`statusIcons`) and `:39` (`statusLabels`)
- `app/saved/SavedClient.tsx:27`, `:33`
- `app/topics/page.tsx:29`, `:48`
- `app/topics/category/[slug]/page.tsx:35`
- `app/topics/tag/[slug]/page.tsx:54`
- `app/topics/compare/CompareIndexView.tsx:63`
- `app/topics/compare/[id1]/vs/[id2]/ComparisonView.tsx:30`, `:36`
- `app/topics/[id]/TopicDetailView.tsx:86`, `:92`
- `components/ReadModeView.tsx:26` (`statusMeta` — already bundles label + icon + chip)

The labels have already drifted: most say `"Speculative"`, `ReadModeView` and
`app/api/og/[id]/route.tsx` say `"Highly Speculative"`.

**Recommendation:** promote `ReadModeView`'s `statusMeta` shape into
`lib/categoryColors.ts` as
`statusMeta: Record<TopicStatus, { label: string; short: string; icon: LucideIcon; chip: string }>`,
and have every site read from it. `categoryColors.ts` is already the owner of
status presentation, so this is a pure extension rather than a new module — and
it keeps label and color from drifting apart again.

Note: several of these files are outside this agent's edit scope right now
(`app/library/`, `app/questions/`, etc. are owned by parallel agents), which is
part of why this was not attempted live.

## 3. Verdict / winner rendering — 3 copies

`getWinnerLabel` is character-for-character identical in two files, and
`getDrivingDimension` + `getConsensusLabel` are near-identical:

- `components/ShareVerdictCard.tsx:33` `getWinnerLabel`, `:46` `getWinnerBgClass`, `:59` `getDrivingDimension`, `:84` `getConsensusLabel`
- `app/api/verdict-card/[topicId]/route.tsx:13` `getWinnerLabel`, `:26` `getWinnerColors`, `:39` `getDrivingDimension`, `:58` `getConsensusLabel`
- `app/api/og/route.tsx:5` `getVerdictColor`, `:18` `getVerdictLabel` (same three-way for/against/draw switch, different label vocabulary)

Two drifts already present:

- Consensus casing: `"3/3 unanimous"` (component) vs `"3/3 Unanimous"` (OG route).
- Verdict vocabulary: `"FOR WINS"` vs `"Evidence Supports"` — the share card and
  the OG image for the same verdict say different things.
- `getDrivingDimension` returns `{name, forScore, againstScore}` in the component
  and a bare `string | null` in the route — same loop, divergent return types.

**Recommendation:** `lib/judge/verdictPresentation.ts`, next to the rubric it
already depends on (`DEFAULT_RUBRIC`). Export `getWinnerLabel`,
`getConsensusLabel`, `getDrivingDimension` (returning the richer object; the
route can read `.name`), plus a `WINNER_HEX` map. The Tailwind-class variant
(`getWinnerBgClass`) must stay separate from the hex variant, because the two OG
routes run on `edge` with `next/og` and cannot use Tailwind classes — but they
can share the *labels* and the *hex values*, which is where the drift is.

This one is tempting but was not attempted live: it spans an edge runtime and a
client component, the two `getConsensusLabel` variants genuinely differ in
output, and picking a winner between `"FOR WINS"` and `"Evidence Supports"` is a
copy decision, not a refactor.

## 4. Score-to-color thresholds — 4 copies, and an off-brand palette leak

The same `>= 80 / >= 50 / else` (and `>= 0.8 / >= 0.5`) three-band split, each
with its own palette:

- `components/ConfidenceGauge.tsx:20` — teal / rust / brown (**on-brand**)
- `app/analysis/[id]/AnalysisView.tsx:457` `ConfidenceBadge` — emerald / stone / red
- `components/JudgingResults.tsx:291` — emerald / stone / red
- `components/MobileArgumentList.tsx:279` — `settled: "bg-emerald-100 text-emerald-700"`
- `app/api/og/[id]/route.tsx:20` `getStatusColor` — `settled: "#059669"` (emerald)

This is exactly the failure `lib/categoryColors.ts` documents under
"Green-as-verdict decoupling": green reads as "this claim is true" and fights the
neutral brand. Four of the five copies use emerald/red anyway. `CLAUDE.md` also
forbids amber/tangerine; emerald and red are the same class of violation.

Worth flagging separately: `AnalysisView.tsx:457` `ConfidenceBadge` is **dead
code** — declared, never rendered (eslint reports it as an unused var today).
Deleting it removes one copy for free.

**Recommendation:** `lib/confidenceColors.ts` exporting
`getConfidenceChipClass(pct)` (Tailwind, on-brand teal/rust/brown, dark-mode
aware) and `getConfidenceHex(pct)` for the edge OG routes, with the thresholds as
named constants. Fold the band boundaries into `lib/constants.ts` if they should
be tunable. Note this is a *visible* color change at three sites, so it needs a
design sign-off rather than a silent refactor — which is why it was left alone.

## 5. Hardcoded site origin — 30+ copies

`"https://argumend.org"` is a string literal in at least 30 files, including
`app/layout.tsx:38,64,88,148,165`, `app/page.tsx:18,27,47`, `app/sitemap.ts:24`,
`app/is/page.tsx:88,92`, `app/blog/page.tsx:43,47,50,57`, and every JSON-LD
block. Only `app/llms.txt/route.ts:5` bothers to name it (`const BASE`).

Nested inside that, the `publisher: { "@type": "Organization", name: "ARGUMEND",
url: "https://argumend.org" }` object is re-typed verbatim in ~12 files —
`app/research/page.tsx:110`, `app/analysis/[id]/page.tsx:136`,
`app/methodology/layout.tsx:35`, `app/is/page.tsx:89`, `app/is/[slug]/page.tsx:190`,
`app/about/layout.tsx:42`, `app/how-it-works/layout.tsx:35`, `app/blog/page.tsx:44`,
and others. It has already drifted: `app/about/layout.tsx:39` says `"Argumend"`
where the rest say `"ARGUMEND"`.

**Recommendation:** `SITE_URL` in `lib/constants.ts` (which already exists for
exactly this purpose and currently has no URL entry), plus an
`ORGANIZATION_JSON_LD` constant beside `components/JsonLd.tsx`. Low risk,
mechanical, but touches ~30 files across several parallel agents' territory — it
should be done as a single dedicated pass when no other agents are in flight, not
piecemeal.

## 6. Strength-label ladders — 3 copies, 3 different scales

Same "strong / moderate / weak" ladder over three incompatible numeric ranges:

- `components/nodes/EvidenceNode.tsx:20` — `>= 32 / 24 / 16` on a 0–40 scale → `"Strong" | "Moderate" | "Weak"`
- `lib/analyze/extractor.ts:22` — `>= 7 / 4 / 1` on a 0–10 scale → `"strong" | "moderate" | "weak"`
- `lib/judge/offline.ts:117` — `>= 7 / 4` on a 0–10 scale → `"strong alignment" | "moderate alignment" | "weak alignment"`

**Recommendation:** lower priority than the others. These are genuinely different
domains (evidence weight vs. argument strength vs. judge alignment) that happen
to share vocabulary, so consolidating risks coupling three unrelated scales. The
useful move is narrower: make the underlying 0–40 vs 0–10 normalization explicit
and shared (`lib/schemas/topic.ts` already has `calculateEvidenceScore` and
`confidenceTier`), then let each domain keep its own labels.

## 7. Clipboard-copy handlers — 5 copies

`navigator.clipboard.writeText` + a `copied` boolean + a `setTimeout` reset, hand-
rolled in each of:

- `app/analyze/page.tsx:201`
- `app/topics/[id]/TopicDetailView.tsx:508`
- `components/ShareButtons.tsx:50`
- `components/ShareVerdictCard.tsx:258`
- `components/EmbedButton.tsx:44`

They differ in timeout duration and in whether the promise is awaited or its
rejection handled at all (`ShareButtons.tsx:50` does neither, so a clipboard
permission denial is an unhandled rejection).

**Recommendation:** `hooks/useCopyToClipboard.ts` returning `[copied, copy]`,
with a single reset duration sourced from `lib/constants.ts` and a `try/catch`
around the write. `hooks/` already exists and this is the idiomatic React shape.
Genuinely safe and testable — this is the strongest candidate for the *next*
extraction after #1.

---

## Suggested order for follow-up

1. **#7 clipboard hook** — smallest blast radius, fixes a real unhandled rejection.
2. **#2 status label/icon maps** — biggest duplication count, drift already visible, natural home already exists.
3. **#5 `SITE_URL`** — mechanical but wide; do it in one uninterrupted pass.
4. **#3 verdict presentation** — needs a copy decision first.
5. **#4 confidence colors** — needs design sign-off; it's a visible palette change and a live brand violation.
6. **#6 strength ladders** — probably leave alone; document rather than consolidate.

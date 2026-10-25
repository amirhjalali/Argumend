# V2 disagreement report: render verification (2026-09-15)

Closes the gap left by `2026-09-15-render-sweep.md` F3. The fake provider now
returns the eval fixture whose `source` matches the pasted text exactly, so the
full six-box report can be exercised offline.

Setup: `sprint-2026-09-14` branch, `next dev --webpack -p 3109` with
`ENABLE_DISAGREEMENT_V2=true NEXT_PUBLIC_ENABLE_DISAGREEMENT_V2=true ARGUMEND_DISAGREEMENT_PROVIDER=fake`,
Playwright (Chromium) at 1280x800 and 390x844, dark mode via
`document.documentElement.classList.add('dark')`. Text was pasted by setting the
textarea value and dispatching `input`, then clicking "Find what it turns on".

Screenshots live in the session scratchpad
(`scratchpad/render/`) and in `.playwright-mcp/` (gitignored):

| File | What |
| --- | --- |
| `v2_trust-split_1280_light.png` | trust-split report, desktop, light |
| `v2_trust-split_1280_dark.png` | trust-split report, desktop, dark (before F7 fix) |
| `v2_trust-split_1280_dark_after-f7.png` | same after the F7 contrast fix |
| `v2_trust-split_390_light.png` / `v2_trust-split_390_dark.png` | trust-split, phone |
| `v2_one-sided_1280_light.png` | one-sided article |
| `v2_recipe_1280_light.png` | non-argument recipe |
| `v2_stake-ledger_1280_light.png` | explicit-update-commitment (the only way to render the stake ledger, see below) |
| `v2_rate-limited_1280_light.png` | the 429 state hit on the fourth submission |
| `v2_trust-split_text.txt` | full `article.innerText` of the trust-split report |

## Checklist

Legend: PASS / FAIL / N/A (the fixture cannot exercise the item).

| Check | trust-split-traffic-study | one-sided-article-libraries | non-argument-recipe | explicit-update-commitment |
| --- | --- | --- | --- | --- |
| Positions box with heading ("The positions") | PASS (2: Accept the study, Withhold trust until replication) | PASS (1: Fund libraries preventively, no invented opponent) | PASS (heading renders, 0 positions) | PASS (2) |
| Common ground box ("What they agree on") | PASS (1 item, "Stated by all sides") | PASS (empty-state copy) | PASS (empty-state copy) | PASS |
| Disagreement types box ("The remaining disagreements", typed label in masthead) | PASS (2 items; masthead label "SOURCE TRUST · HIGH") | N/A (0 disagreements; masthead label "DISAGREEMENT · UNKNOWN") | N/A (same) | PASS |
| Crux box ("What the argument turns on") | PASS (question, two branches, "What could settle it") | N/A (0 cruxes, box hidden) | N/A | PASS |
| Evidence state box | **FAIL, see D1** | FAIL (D1) | FAIL (D1) | FAIL (D1) |
| Resolution paths box ("What could move this forward") | PASS (2 paths) | PASS (empty-state copy) | PASS (empty-state copy) | PASS (1) |
| Stake ledger / accountability section | N/A (fixture has no `claimStakeCandidates`, so `report.accountability` is undefined and the section is correctly hidden) | N/A | N/A | PASS ("What is actually at stake?", 1 stake attributed to Nadia, no participant-less stake) |
| No winner / rationality score (regex `winner|rationality score`) | PASS | PASS | PASS | PASS |
| No percentage in DOM text (regex `\d+\s?%`) | PASS | PASS | PASS | PASS |
| Every rendered quote is a verbatim substring of the source | PASS (5 source-note quotes, 5 verbatim) | PASS (1/1) | N/A (no quotes) | PASS for the 2 source-note quotes and the 1 footnote; **FAIL for the ledger claim column, see D3** |
| Crux resolution text is not "Further clarification is required." | PASS ("An unaffiliated team reruns the model and publishes inputs and code.") | N/A | N/A | PASS ("Point-of-sale totals split by shift over a full season.") |
| `independentlyVerified` messaging honest | PASS (`provenance.independentlyVerified=false` in the API; page shows "This is a source-only analysis... does not fact-check claims" in the rail and "does not independently verify factual claims" in the caveat) | PASS | PASS | PASS |
| No horizontal overflow at 390px | PASS (`scrollWidth` 390) | not measured | not measured | not measured |
| Console errors | **1 error, fixed, see D2** | 0 | 0 | 1 (same as D2, before the fix) |

Console warnings on every run: the four `.woff2` "preloaded but not used" dev
warnings already listed as noise in the render sweep. Nothing else.

After the D2 fix, a fresh trust-split submission rendered with 0 console errors.

## Defects

### D1 (Medium, spec deviation) The evidence-state box is never rendered

- Spec §6.6 (governing spec, "Evidence state:" block) lists a sixth box with one of
  "No independent verification performed", "Evidence was asserted in the source",
  "No evidence was supplied in the source".
- `lib/disagreement/projectReport.ts:405` sets `evidenceState: "not-independently-checked"`
  on every crux, and `components/disagreement/CruxSection.tsx` has the copy for it,
  but `CruxSection` is imported nowhere. The editorial report
  (`DisagreementReportView` -> `ArgumentHinge`) reads only `question`, `branches`
  and `resolution.condition`. `grep -rn evidenceState app components` matches no
  file.
- Effect: the report shows five of the six boxes. The source-only boundary is still
  stated twice (rail and caveat), so the honesty guarantee holds, but the per-crux
  evidence state the spec promises is missing.
- Repro: any fixture with a crux; look for the string "verification performed" in
  the DOM. Absent.
- Not fixed here: adding the line to `ArgumentHinge` is a one-liner, but it is a
  visible product change to the report layout and belongs with the founder review.

### D2 (Low, fixed) Duplicate React key on crux branches

- Console: `Encountered two children with the same key ... If A study commissioned
  by ... holds`.
- Cause: `cruxBranches` in `projectReport.ts` emits one branch per direction
  (stronger, weaker) with the identical `condition` string, and
  `ArgumentHinge.tsx` keyed the list by `branch.condition`.
- Fix in this pass: key is now `${branch.condition}-${index}`
  (`components/disagreement/ArgumentHinge.tsx:27`). Verified: 0 console errors on a
  fresh submission.

### D3 (Low, copy) Stake ledger wraps a paraphrased claim in quotation marks

- On `explicit-update-commitment.json` the ledger's Claim column renders
  “Sales after 5pm are barely a third of daytime sales.”¹ in typographic quotes.
  The source says "sales after 5pm are barely a third of daytime." The text is
  `stake.claim` (the model's claim statement), not a grounding quote; the real
  quote is the numbered footnote below the table, which is verbatim.
- `components/disagreement/ClaimStakeLedger.tsx:62` and `:96` (`&ldquo;{stake.claim}&rdquo;`).
- Suggest dropping the quote marks around the claim statement (or styling it as
  a restatement), since the product promise is that quoted text is verbatim.

### D4 (Low, copy) Crux branch reads "If A study ... holds"

- `asCondition` in `projectReport.ts:106` keeps the claim's leading capital, so the
  branch reads "If A study commissioned by ... holds" and "If Sales after 5pm ...
  holds". Lower-casing the first letter when the claim does not start with a
  proper noun or "I" would fix most cases.

### D5 (Low, copy) Zero-position reports still render the positions preamble

- On the recipe fixture the "The positions" heading and its "Each position is
  stated at its strongest..." preamble render above an empty list, and the rail
  says "High — Most quoted support was found verbatim in the source" although the
  report contains no quotes. The "DISAGREEMENT · UNKNOWN" masthead label noted in
  the sweep (F3, secondary) is also still present on the one-sided and recipe
  reports.

### D6 (Verification note) The dev rate limit blocks a four-fixture sweep

- `DISAGREEMENT_ANALYZE_RATE_LIMITS.perHour = 3`, keyed on a hash of
  `x-forwarded-for` (all local requests share the key "unknown"), stored in
  process memory. The fourth submission returns 429 "Too many analyses from this
  network." Restarting the dev server clears it. Anyone repeating this sweep
  should expect to restart between every three fixtures, or the harness should
  inject a permissive limiter when the provider is `fake`.

## F7 fix (dark-mode contrast of brand text colours)

Measured with `getComputedStyle` in the browser, dark mode, after the change:

| Element | Colour | Background | Ratio |
| --- | --- | --- | --- |
| "WHAT THE ARGUMENT TURNS ON" (crux crimson on the paper card) | rgb(230,103,103) | rgb(42,41,38) | 4.50 |
| "Source notes (2)" summary (deep teal on canvas) | rgb(111,163,158) | rgb(26,25,23) | 6.20 |
| "Edit" link on /analyze-v2 | rgb(111,163,158) | rgb(26,25,23) | 6.20 |

Before: 2.39 (crimson on card), 2.83 (teal on canvas).

Changes:

- `tailwind.config.ts`: `crux.light` raised from `#c45c5c` (4.2:1 on the canvas,
  3.5:1 on cards, and used only as `dark:text-crux-light` in 13 places, all of
  which were failing AA) to `#e66767` (5.4:1 / 4.5:1). New `deep.bright: #6fa39e`
  (6.2:1 / 5.1:1) for deep teal in dark mode. Neither is amber.
- `app/globals.css`: `.dark --crux-crimson` follows `crux.light`.
- Every `text-[#a23b3b]` now carries `dark:text-crux-light`, every
  `text-[#3a6965]` carries `dark:text-deep-bright` (about, methodology, topics,
  FeaturedTopicHero, and the whole `components/disagreement/` set). The
  ad-hoc `dark:text-[#e66767]` / `dark:text-[#6fa39e]` in `DebateView` and
  `ShareCard` were swapped for the same tokens. `DeleteReportControl`'s crimson
  border gets `dark:border-crux-light`.
- Gates: `tsc --noEmit` 0, `eslint . --max-warnings=0` 0, `vitest run lib components`
  139 files / 1882 tests passed (both dark-mode ratchet tests included).

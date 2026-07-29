# Internal link integrity audit — 2026-07-29

Scope: every internal link expression in `app/`, `components/`, `lib/`, and `data/` —
`href="/..."`, `href={\`/...\`}`, `href: "/..."`, markdown `](/...)`, plus
`router.push()` / `redirect()` targets. Each was resolved against either a static
route under `app/` or the id/slug set of the data source that backs the dynamic
segment.

## Method

Route inventory (56 route files) built from `app/**/{page,route}.tsx?`.

Id/slug sets loaded at runtime from the real modules:

| Route | Backing source | Count |
| --- | --- | --- |
| `/topics/[id]`, `/embed/[topicId]` | `data/topicIndex.ts` (`topicSummaries`, from `data/topicSummaries.json`) | 133 |
| `/fallacies/[slug]` | `data/fallacies.ts` (`fallacies[].slug`) | 20 |
| `/concepts/[slug]` | `data/concepts.ts` (`concepts[].id`) | 6 |
| `/guides/[id]` | `data/guides.ts` (`guides[].id`) | 15 |
| `/blog/[slug]` | `data/blogIndex.ts` (`articleSummaries[].slug`) | 62 |
| `/is/[slug]` | `data/is-claims.ts` (`isClaims[].slug`) | 79 |
| `/questions/[slug]` | `lib/questions.ts` (`TOPIC_QUESTIONS`, keyed by topic id) | derived |
| `/for-educators/worksheets/[id]` | `worksheets` map inside the page file | 4 |
| `/topics/compare/[id1]/vs/[id2]` | `app/topics/compare/comparisonPairs.ts` | — |

Beyond literal hrefs, the referential integrity of every data field that *feeds* a
link was checked: `fallacies[].relatedFallacies`, `fallacies[].relatedTopicIds`,
`concepts[].relatedConcepts`, `isClaims[].topicId`, `COMPARISON_PAIRS`,
`CROSS_CATEGORY_CLUSTERS` (both copies), `readingOrder` in `app/guides/page.tsx`,
the topic-id tables and `exampleHref` values in `app/for-educators/page.tsx` and
`app/glossary/page.tsx`, and the worksheet id list.

## Result

**No broken internal links.** Every literal `href="/..."` in `app/` and
`components/` resolves to a real static route, and every dynamic href is built
from an id that exists in its backing data source. All `relatedTopicIds`,
`relatedFallacies`, `relatedConcepts`, `topicId`, and `COMPARISON_PAIRS` entries
resolve.

What the audit *did* find are dangling **data** references that never surface as a
404 because the consuming code filters unresolvable ids, but which silently drop
links that were meant to render.

### Dangling references

| Source file | Line | Bad id | Why it's broken | Effect |
| --- | --- | --- | --- | --- |
| `data/topicIndex.ts` | 178 | `covid-origins` | No topic with this id. `data/topics/covid-origins.ts` exports a topic whose real id is `lab-leak-theory` (see the note at `data/topics.ts:178`); the cluster still uses the old filename. | `getCrossCategoryRelatedSummaries("pandemic-preparedness", …)` returned 3 related topics instead of 4. **Fixed** — see below. |
| `data/topics.ts` | 718 | `covid-origins` | Same stale id in the duplicate `CROSS_CATEGORY_CLUSTERS` map. | Same. **Fixed.** |
| `data/topicIndex.ts` | 181 | `covid-origins` | Same stale id, in the `gain-of-function-research-ban` cluster. | Silently dropped. **Not fixed — ambiguous:** the correct target `lab-leak-theory` is *already* the first entry of that same array, so the right repair is either deleting the stale entry (leaving a 3-item cluster) or substituting a different topic. That is a content decision. |
| `data/topics.ts` | 721 | `covid-origins` | Same as above, duplicate map. | Same. **Not fixed.** |

### Dead configuration (no page ever generated)

`lib/questions.ts` keys `TOPIC_QUESTIONS` by topic id, and
`getAllQuestionVariations()` only iterates over real topics — so a key that does
not match a topic id produces no `/questions/[slug]` page at all. Three keys are
dead, costing ~9 intended question pages:

| Line | Dead key | Nearest real topic id | Why not auto-fixed |
| --- | --- | --- | --- |
| 224 | `standardized-testing-value` | `standardized-testing-debate` | `standardized-testing-debate` is *already* a separate key at line 93 with its own three questions. Merging the two sets (6 questions on one topic) vs. dropping one set is a content decision. |
| 249 | `ubi-economics` | `universal-basic-income` | `universal-basic-income` already exists as a key at line 83. Same merge-or-drop decision; the two question sets differ ("Does UBI reduce poverty?" vs "Should the government give everyone a basic income?"). |
| 280 | `free-will-determinism` | `free-will` | `free-will` already exists at line 261. Same merge-or-drop decision. |

### Verified-not-broken (checked, no action)

- `/find?a=1&b=2` — appears only in `lib/markdown-blocks.test.ts` as a renderer
  fixture, not a real link.
- `/fallacies#<family.id>` — anchor targets the `id={family.id}` sections rendered
  on `app/fallacies/page.tsx`. Valid.
- `/concepts/fallacies`, `/concepts/steel-manning`, `/guides/argument-audit`,
  `/topics/nuclear-energy-safety` — the only hardcoded dynamic-segment links in
  `app/`/`components/`; all four resolve.
- `lib/nav.ts` — every entry (`/analyses`, `/dashboard`, `/saved`, `/is`,
  `/research`, `/perspectives`, `/lessons-from-the-deep`, `/glossary`) has a route.
- `readingOrder` in `app/guides/page.tsx` (6 ids) and the worksheet id list (4 ids)
  all resolve; both consumers also guard with a null check.
- `app/glossary/page.tsx` `exampleHref` values and the 11 topic ids in
  `app/for-educators/page.tsx` all resolve.

## Fixes applied

- `data/topicIndex.ts:178` and `data/topics.ts:718` — `covid-origins` →
  `lab-leak-theory`. Unambiguous: the id was renamed and the old filename was left
  behind, and `lab-leak-theory` is not otherwise present in that array.

Nothing else was changed; the remaining items above are judgment calls, not typos.

## Suggested follow-up

`CROSS_CATEGORY_CLUSTERS` is duplicated verbatim in `data/topicIndex.ts` and
`data/topics.ts` (the comment at `data/topicIndex.ts:87` already flags this). Both
copies drifted in the same way. A test asserting that every id in both maps exists
in `topicSummaries` — and that the two maps are identical — would have caught this
and would keep the two in sync.

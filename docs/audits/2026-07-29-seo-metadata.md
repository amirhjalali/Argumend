# SEO / Metadata + JSON-LD Audit — 2026-07-29

Scope: all 40 `page.tsx` files under `app/`, plus the `layout.tsx` files they inherit
metadata from, plus a spot-check of the `<JsonLd data={...}>` blocks.

Overall the metadata layer is in good shape: every indexable route resolves a title,
description, canonical, and Open Graph block, and every canonical URL matches its own
route (verified programmatically — zero mismatches). The findings below are mostly
consistency and rich-result-eligibility gaps, not outright breakage.

---

## 1. Fixes applied in this pass

Only "copy-paste-clear from a sibling" canonical additions were made. Three pages
declared no `alternates.canonical` while every structurally similar sibling did:

| File | Fix |
|---|---|
| `app/analysis/[id]/page.tsx` | added `alternates: { canonical: https://argumend.org/analysis/${id} }` — matches `blog/[slug]`, `is/[slug]`, `guides/[id]`, `fallacies/[slug]`, `topics/[id]`, `questions/[slug]`, `concepts/[slug]`, `for-educators/worksheets/[id]` |
| `app/saved/page.tsx` | added `alternates: { canonical: https://argumend.org/saved }` — matches the sibling utility page `auth/signin` |
| `app/dashboard/page.tsx` | added `alternates: { canonical: https://argumend.org/dashboard }` — same |

All three are `robots: { index: false }` pages, so the impact is hygiene rather than
ranking; the change is zero-risk and removes the last canonical gaps in the tree.

Nothing else was changed. Everything below is reported, not fixed, because the fix
would require inventing copy or making a judgement call about intent.

---

## 2. HIGH — doubled brand suffix in `<title>`

`app/layout.tsx` sets:

```ts
title: { default: "ARGUMEND — Map Arguments, Not Win Them", template: "%s | ARGUMEND" }
```

Any child page that exports a plain-string `title` gets ` | ARGUMEND` appended. Several
pages *also* bake the brand into the string, producing a doubled suffix in the rendered
`<title>` and in SERP snippets. `app/dashboard/page.tsx` and `app/saved/page.tsx` carry
code comments showing this bug was already diagnosed and fixed *locally* — but it was
never swept across the rest of the tree.

Confirmed offenders (page-level `title`, i.e. the one the template applies to):

| File | Baked title | Rendered result |
|---|---|---|
| `app/analyses/page.tsx:15` | `Recent Analyses \| Argumend` | `Recent Analyses \| Argumend \| ARGUMEND` |
| `app/auth/signin/page.tsx:9` | `Sign In \| Argumend` | `Sign In \| Argumend \| ARGUMEND` |
| `app/about/layout.tsx:5` | `About ARGUMEND — Our Mission to Transform How People Disagree` | `… \| ARGUMEND` (73 chars → truncated) |
| `app/is/page.tsx:18` | `Is It True? N Claims Fact-Checked with Evidence — ARGUMEND` | `… — ARGUMEND \| ARGUMEND` |
| `app/questions/page.tsx:23` | `N+ Questions Analyzed with Evidence — ARGUMEND` | `… — ARGUMEND \| ARGUMEND` |
| `app/community/layout.tsx:4` | `Community — Join the Argumend Movement` | `… \| ARGUMEND` |
| `app/topics/compare/page.tsx` (title at top level) | `Compare Topics Side by Side — Argument Comparison` | ok-ish, but 49+11 chars |
| `app/topics/category/[slug]/page.tsx:59` | `Category Not Found — Argumend` (404 branch) | doubled |
| `app/topics/tag/[slug]/page.tsx:78` + generated `${label} Debates — Argumend` | doubled |
| `app/for-educators/worksheets/[id]/page.tsx:300` | `${ws.title} — Argumend for Educators` | doubled |
| `app/analysis/[id]/page.tsx:23,32` | `… - ARGUMEND Analysis` | doubled |
| `app/embed/[topicId]/page.tsx:29` | `${topic.title} — ARGUMEND Embed` | doubled (noindex, low impact) |
| `app/is/[slug]/page.tsx:74` | `${claim.question} \| ARGUMEND` | doubled |
| `app/questions/[slug]/page.tsx:63` | `${variation.question} \| ARGUMEND` | doubled |
| `app/topics/[id]/page.tsx:59` | `${topic.title} — Argument Analysis \| ARGUMEND` | doubled |
| `app/guides/[id]/page.tsx:39` | `${guide.title} -- Guide \| Argumend` | doubled, plus a literal `--` instead of an em dash |

Note the `openGraph.title` / `twitter.title` copies of these strings are **not** affected —
the template only applies to the top-level `title` field. So the fix is per-page and
narrow: either drop the brand from the top-level `title`, or use
`title: { absolute: "…" }`. Grep confirmed **zero** uses of `title: { absolute: … }`
anywhere in `app/`.

The clean reference pattern already exists: `app/blog/category/[category]/page.tsx:47`
and `app/blog/tag/[tag]/page.tsx:47` build titles with no brand at all.

---

## 3. MEDIUM — four collection routes have no `twitter` card block

These four pages export `openGraph` but no `twitter`, so X/Twitter falls back to the
root layout's `summary_large_image` card with the *site-wide* title and description
instead of the page's own:

- `app/blog/category/[category]/page.tsx`
- `app/blog/tag/[tag]/page.tsx`
- `app/topics/category/[slug]/page.tsx`
- `app/topics/tag/[slug]/page.tsx`

Every other route with an `openGraph` block also ships a matching `twitter` block. The
fix is mechanical (reuse the local `title` / `description` consts already in scope) but
was left alone because it also implies a decision about the OG image (below).

The same four routes are also the only `openGraph` blocks with **no `images`**. That is
partially mitigated: `app/opengraph-image.tsx` exists as a file-convention OG image and
Next.js applies it to every descendant route, so they are not imageless — they just get
the generic site card rather than a topic-specific `/api/og?title=…` card the way
`topics/[id]`, `is/[slug]`, `blog/[slug]`, `questions/[slug]`, `fallacies/[slug]`,
`concepts/[slug]`, and `guides/[id]` do.

**Worth verifying separately:** Next.js gives file-based metadata (`opengraph-image.tsx`)
priority over config-based `openGraph.images`. If that ordering holds in Next 16, the
root `app/opengraph-image.tsx` may be *overriding* all the carefully-built
`/api/og?title=…` URLs across the site, and every page would share one generic card.
This is a single-check task (view-source on a deployed topic page and read the
`og:image` value) that would invalidate or confirm a large amount of OG work. All
`/api/og` callers do pass correct param names (`title`, `subtitle`) — the route reads
`title`, `subtitle`, `verdict`, `score` at `app/api/og/route.tsx:34-37`.

Also: there is no `app/twitter-image.tsx`, so pages without an explicit
`twitter.images` rely on the OG image fallback. That is fine but worth knowing.

---

## 4. MEDIUM — description lengths outside ~120–160 chars

Measured on the *top-level* `description` of each metadata block (the one that becomes
`<meta name="description">`; the shorter `openGraph.description` / `twitter.description`
variants are intentionally shorter and are excluded).

**Too long (will be truncated in SERPs):**

| File | Len | Description |
|---|---|---|
| `app/for-educators/layout.tsx` | 222 | "Bring structured argument mapping to your classroom…" |
| `app/is/page.tsx` | 215 (template) | "Direct, evidence-based answers to ${totalCount} …" |
| `app/questions/page.tsx` | 202 (template) | "Browse ${totalCount}+ controversial questions across…" |
| `app/about/layout.tsx` | 192 | "ARGUMEND maps controversial topics visually…" |
| `app/faq/layout.tsx` | 186 | "Common questions about Argumend: how confidence scores work…" |
| `app/glossary/layout.tsx` | 180 | "Definitions of 20+ key terms…" |
| `app/topics/layout.tsx` | 178 (template) | "Browse ${L} controversial topics with visual argument maps…" |
| `app/topics/compare/page.tsx` | 165 (template) | borderline |
| `app/analyze/layout.tsx` | 165 | borderline |
| `app/library/layout.tsx` | 161 | borderline |
| `app/research/layout.tsx` | 162 | borderline |
| `app/methodology/layout.tsx` | 162 | borderline |

**Too short (leaves SERP real estate unused):**

| File | Len |
|---|---|
| `app/dashboard/page.tsx` | 44 (noindex — ignore) |
| `app/embed/[topicId]/layout.tsx` | 46 (noindex — ignore) |
| `app/saved/page.tsx` | 92 (noindex — ignore) |
| `app/auth/signin/page.tsx` | 102 |
| `app/layout.tsx` (site default) | 135 with the `${L}` suffix — fine |

Everything else lands in the 120–160 band. Rewrites are copy decisions, deliberately
not made here.

---

## 5. LOW — duplicate metadata titles across pages

Only one exact collision exists across distinct routes:

- `"ARGUMEND — Map Arguments, Not Win Them"` in `app/layout.tsx` (the `title.default`)
  and `app/page.tsx`. This is correct by design — the homepage should match the site
  default, and `app/page.tsx` also sets `alternates.canonical: https://argumend.org`
  matching the root. No action.

(An earlier naive grep flagged collisions in `app/about/page.tsx` vs
`app/methodology/page.tsx` and `app/for-educators/*` — those are component *content*
props named `title`, not metadata. Not an issue.)

---

## 6. JSON-LD spot-check

~45 `<JsonLd>` blocks were sampled across `WebSite`, `WebApplication`, `Organization`,
`CollectionPage`, `QAPage`, `FAQPage`, `HowTo`, `Article`, `BlogPosting`,
`ScholarlyArticle`, `LearningResource`, `DefinedTerm`, `Claim`, `ItemList`, and
`BreadcrumbList`. Structural quality is **high** — every required property for the
`@type` in use is present in the blocks checked. Specific notes:

**Correct and worth keeping as reference patterns:**
- `app/is/[slug]/page.tsx:152` — `QAPage` → `mainEntity` `Question` with `name`, `text`,
  `answerCount`, and a full `acceptedAnswer` `Answer` including `author`. Textbook.
- `app/fallacies/[slug]/page.tsx:87` — `DefinedTerm` with `name`, `description`, `url`,
  `termCode`, conditional `alternateName`, and `inDefinedTermSet` → `DefinedTermSet`
  with `name` + `url`. Nothing missing.
- `app/how-it-works/page.tsx:66` — `HowTo` with `name`, `description`, `url`, and a
  `step` array of `HowToStep` carrying `position`, `name`, `text`. Complete.
- `app/fallacies/page.tsx:39` and `app/guides/page.tsx:57` — `CollectionPage` with
  `mainEntity` → `ItemList` → `ListItem[]` using `position` + `url`, which is Google's
  documented *summary page* ItemList shape. Correct as written.
- `components/Breadcrumbs.tsx` — `BreadcrumbList` is emitted centrally, so every page
  using `<Breadcrumbs>` gets breadcrumb markup for free. Good architecture.

**Genuine gaps found:**

1. **`app/research/page.tsx:100` — `ScholarlyArticle` has no `datePublished`.**
   Google requires `datePublished` for `Article` and its subtypes to be eligible for
   article rich results. `headline`, `author`, `publisher`, `url`, and `citation[]` are
   all present; only the date is missing. Compare `app/is/[slug]/page.tsx:199` which does
   set `datePublished` + `dateModified`. Not fixed here because picking the date is a
   content decision.

2. **`app/blog/page.tsx:61` — `BlogPosting` entries in the blog listing have no `image`
   and no `dateModified`.** `headline`, `description`, `url`, `datePublished`, and
   `author` are present. `image` is a Google-required property for `Article` rich
   results. The detail page `app/blog/[slug]/page.tsx` *does* emit `ImageObject`s, so the
   listing is the outlier.

3. **Two different `Organization` names for the same entity.** `app/layout.tsx:164` emits
   `name: "Argumend"`, while essentially every other block (`is/[slug]`, `topics/[id]`,
   `questions/[slug]`, `research`, `blog/[slug]`, …) emits `name: "ARGUMEND"`. Neither
   block sets an `@id`, so search engines have no way to unify them into one entity.
   Recommend a single shared `ORGANIZATION` constant with a stable
   `"@id": "https://argumend.org/#organization"` and `@id` references from every
   `author`/`publisher` slot.

4. **`app/layout.tsx:168` — `Organization.sameAs` points at `https://x.com/argumend` and
   `https://github.com/argumend`.** Could not verify these profiles exist. A `sameAs`
   pointing at a 404 is a negative trust signal; worth a manual check.

5. **`app/topics/compare/[id1]/vs/[id2]/page.tsx:146` — `Claim` nodes carry only `name`
   and `description`.** Structurally valid (schema.org `Claim` has no required
   properties), but with no `claimReviewed` / `appearance` / `author` it is inert for
   rich results. Low priority — flagging as an opportunity, not a defect.

---

## 7. LOW — other observations

- **`/topics/compare/[id1]/vs/[id2]` self-canonicalizes both orderings.** The canonical
  is `…/compare/${id1}/vs/${id2}`, so `/compare/A/vs/B` and `/compare/B/vs/A` are two
  URLs with near-identical content each declaring itself canonical. Only the curated
  `COMPARISON_PAIRS` are statically generated, but if `dynamicParams` is left at its
  default the reversed URLs are still reachable. Consider canonicalising to a sorted
  `[id1, id2]` order, or set `export const dynamicParams = false` the way
  `topics/category/[slug]` and `topics/tag/[slug]` already do.
- **`app/auth/signin/page.tsx` is indexable.** It sets a canonical but no
  `robots: { index: false }`, unlike the other utility pages (`dashboard`, `saved`,
  `embed`, `analysis/[id]`). Sign-in pages generally should not be in the index. Left
  alone in case it is deliberate.
- **`openGraph.url` is relative in `app/analysis/[id]/page.tsx:41`** (`/analysis/${id}`)
  while every sibling uses an absolute `https://argumend.org/…`. `metadataBase` resolves
  it correctly, so this is a consistency nit only.
- **Layout-level canonicals are inherited correctly.** `app/topics/layout.tsx`,
  `app/blog/layout.tsx`, `app/concepts/layout.tsx`, and `app/guides/layout.tsx` each
  declare a canonical that would leak to child routes — verified that every child route
  overrides it. No accidental canonical collapse.
- `app/sitemap.ts` and `app/robots.ts` both exist (not audited in depth this pass).

---

## Suggested priority order

1. Sweep the doubled `| ARGUMEND` title suffix (section 2) — highest SERP-visible impact,
   ~16 one-line edits.
2. Confirm whether `app/opengraph-image.tsx` is overriding the per-page `/api/og` cards
   (section 3) — one view-source check, potentially large blast radius.
3. Add `twitter` blocks to the four collection routes (section 3).
4. Add `datePublished` to the research `ScholarlyArticle` and `image` to the blog-listing
   `BlogPosting` entries (section 6).
5. Trim the 6 descriptions over 180 chars (section 4).
6. Unify the `Organization` entity behind one `@id` (section 6.3).

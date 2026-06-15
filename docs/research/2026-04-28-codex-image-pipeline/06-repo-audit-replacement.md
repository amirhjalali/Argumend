# Argumend Visual-Asset Audit + Codex-Driven Replacement Plan

**Date:** 2026-04-28
**Agent:** Research swarm 06/7 (visual-asset audit + Codex replacement workflow)
**Scope:** Every image / SVG / generated visual currently shipping in `argumend.org`, ranked by visibility × upgrade-impact, with a Codex job spec to systematically swap lower-quality assets for on-brand Image 2.0 alternatives.

## 1. Audit methodology

Three lenses: **disk** (what files exist), **render path** (where each file ends up on a page), **runtime generation** (what `next/og` composites at request time). Commands run:

```bash
find /Users/amirhjalali/argumend/public -type f
find /Users/amirhjalali/argumend -type f \( -name "*.png" -o -name "*.jpg" \
  -o -name "*.webp" -o -name "*.svg" -o -name "*.ico" \) \
  -not -path "*/node_modules/*" -not -path "*/.next/*" -not -path "*/.git/*"
grep -rn "background-image\|<img\|<Image" components app lib
grep -rln "next/image" components app
grep -n "background-image\|url(" app/globals.css
find app -name "opengraph-image.tsx" -o -name "icon.*" -o -name "favicon.*"
grep -rn "images\.unsplash" data/topics | wc -l
file public/images/perspectives/*.png
git log --all --oneline -- 'public/images/perspectives/*.png'
```

Findings:

- `public/` is **11 files / ~5.3 MB total**: one watercolor (`lw-background.webp` + `.jpg` fallback), one logo PNG (`claude.png`), seven 1024×1024 anime PNGs in `public/images/perspectives/`. The `public/images/topics/` directory **exists but is empty**.
- Only **four files import `next/image`**: `RichNode.tsx`, `MetaNode.tsx`, `LLMIcons.tsx`, `app/perspectives/page.tsx`. No raw `<img>` tags outside OG generators.
- **No favicon, no `app/icon.png`, no `apple-icon.png`, no `manifest.json`.** `app/layout.tsx:159` references `https://argumend.org/icon.png` inside JSON-LD — the file doesn't exist. **Currently shipping a 404 logo URL.**
- AI-provider icons (OpenAI, Gemini, Grok) are inline SVG paths in `LLMIcons.tsx`. UI chrome is Lucide React.
- All four OG endpoints are runtime-composited via `next/og`'s `ImageResponse` (`app/opengraph-image.tsx`, `app/api/og/route.tsx`, `app/api/og/[id]/route.tsx`, `app/api/verdict-card/[topicId]/route.tsx`). **Zero static OG PNGs on disk.**
- `data/topics/*.ts` has **118 hot-linked Unsplash URLs** (e.g., `meritocracy-myth.ts:11`). Argumend doesn't own them.
- `data/blog.ts` (4106 lines) and `data/guides.ts` (1562 lines) have **no image fields at all**.

## 2. Complete inventory

| # | Path / surface | Format | Size | Where rendered | Visibility | Quality | Recommended action |
|---|---|---|---|---|---|---|---|
| 1 | `public/images/lw-background.webp` | WebP 782×1080 | 109 KB | `globals.css:116` `body::after` on every page | **Very high** (every route) | Acceptable — borrowed LessWrong watercolor | Image 2 generate on-brand watercolor |
| 2 | `public/images/lw-background.jpg` | JPG 782×1080 | 122 KB | Fallback for #1 | High | Acceptable | Image 2 (regenerate from same source as #1) |
| 3 | `public/icons/claude.png` | PNG | 31 KB | `LLMIcons.tsx:19` Claude judge icon | High (judge UI) | Excellent (official Anthropic mark) | **Keep** — third-party brand, do not touch |
| 4 | `public/images/perspectives/moment.png` | PNG/JPEG 1024×1024 | 668 KB | `app/perspectives/page.tsx:37` | Medium (one essay route) | Good — anime style, founder-curated | **Leave** — emotional anchor (see §5) |
| 5 | `public/images/perspectives/rewind.png` | PNG 1024×1024 | 700 KB | `perspectives/page.tsx:58` | Medium | Good | Leave |
| 6 | `public/images/perspectives/context.png` | PNG 1024×1024 | 607 KB | `perspectives/page.tsx:79` | Medium | Good | Leave |
| 7 | `public/images/perspectives/witness.png` | PNG 1024×1024 | 890 KB | `perspectives/page.tsx:100` | Medium | Good | Leave |
| 8 | `public/images/perspectives/rumors.png` | PNG 1024×1024 | 714 KB | `perspectives/page.tsx:123` | Medium | Good | Leave |
| 9 | `public/images/perspectives/motivated.png` | PNG 1024×1024 | 843 KB | `perspectives/page.tsx:146` | Medium | Good | Leave |
| 10 | `public/images/perspectives/synthesis.png` | PNG 1024×1024 | 668 KB | `perspectives/page.tsx:176` | Medium | Good | Leave |
| 11 | `public/robots.txt` | text | 117 B | crawlers | n/a | Fine | Keep |
| 12 | **MISSING `app/icon.png`** | PNG (32×32 / 256×256) | — | Browser tab + `JsonLd` schema.org logo (`layout.tsx:159`) | **Critical — every tab, every share** | **Broken (404)** | **Image 2 + manual export** — phase 1 priority |
| 13 | **MISSING `app/apple-icon.png`** | PNG 180×180 | — | iOS home screen | High (mobile bookmark) | Missing | Image 2 + export |
| 14 | **MISSING `app/favicon.ico`** | ICO multi | — | Legacy browsers | Medium | Missing | Convert from #12 |
| 15 | **MISSING `public/manifest.json`** | JSON | — | PWA install prompt | Low (no PWA path) | Missing | Author after icons exist |
| 16 | `app/opengraph-image.tsx` (root) | runtime PNG 1200×630 | runtime | Twitter/LinkedIn/Slack/Discord card for `argumend.org` | **Very high** (every share) | Plain — text-only, no graphic identity | **Redesign** — Image 2 + ImageResponse compositing |
| 17 | `app/api/og/route.tsx` | runtime PNG 1200×630 | runtime | Generic verdict card | High | Decent — score circle + brand bar | Keep template, swap background to Image 2 texture |
| 18 | `app/api/og/[id]/route.tsx` | runtime PNG 1200×630 | runtime | All 109 topic OG cards | **Very high** (109 share surfaces) | Decent | Same as #17 — add per-topic illustration tile |
| 19 | `app/api/verdict-card/[topicId]/route.tsx` | runtime PNG | runtime | Verdict-card share | Medium | Decent | Keep template, refresh background |
| 20 | `data/topics/meritocracy-myth.ts:11` `imageUrl` | external Unsplash URL | external | `MetaNode` hero image | High (topic page) | Variable — generic stock | **Image 2 per topic** (109 of these) |
| 21 | `data/topics/global-housing-bubble.ts:11` | external Unsplash | external | MetaNode hero | High | Stock | Image 2 |
| 22 | `data/topics/global-housing-bubble.ts:32` | external Unsplash | external | RichNode pillar tile | Medium | Stock | Image 2 (lower priority) |
| 23 | `data/topics/inflation-monetary-policy.ts:10` | external Unsplash | external | MetaNode hero | High | Stock | Image 2 |
| 24 | …106 more `imageUrl: "https://images.unsplash.com/..."` entries | external Unsplash | external | MetaNode + RichNode tiles | High aggregated | Stock — no brand fit | **Image 2 batch** (see phase 2) |
| 25 | `components/icons/LLMIcons.tsx` `OpenAIIcon` | inline SVG | <1 KB | Judge council UI | Medium | Excellent (official mark) | Keep |
| 26 | `components/icons/LLMIcons.tsx` `GeminiIcon` | inline SVG | <1 KB | Judge UI | Medium | Acceptable (geometric placeholder) | Replace with official Gemini gradient mark |
| 27 | `components/icons/LLMIcons.tsx` `GrokIcon` | inline SVG | <1 KB | Judge UI | Medium | Acceptable (X/Twitter bird) | Verify mark — replace with current Grok logo |
| 28 | `components/icons/MenuIcon.tsx` | inline SVG | <1 KB | Sidebar toggle | High (every page) | Fine | Keep |
| 29 | Lucide icons (`Crown`, `Scale`, `FileText`, `Lightbulb`, `BarChart3`, `Crosshair`, etc.) | bundled SVG | <1 KB each | Throughout UI | High | Excellent | **Keep** — third-party icon set |
| 30 | `components/Footer.tsx` SVG (X/Twitter, GitHub) | inline SVG | <1 KB | Footer on every page | High | Excellent | Keep |
| 31 | `components/Sidebar.tsx` chevron / nav SVG | inline SVG | <1 KB | Sidebar | High | Fine | Keep |
| 32 | `components/DiamondDiagram.tsx` | inline SVG dataviz | n/a | About / methodology | Medium | Excellent (custom) | Keep |
| 33 | `components/ScalesOfEvidence.tsx` | inline SVG dataviz | n/a | Topic pages | Medium | Excellent | Keep |
| 34 | `components/ConfidenceTimeline.tsx` | inline SVG dataviz | n/a | Topic pages | Medium | Excellent | Keep |
| 35 | `components/ConfidenceGauge.tsx` | inline SVG dataviz | n/a | MetaNode + topic | High | Excellent | Keep |
| 36 | `components/ShareVerdictCard.tsx` `<ImageIcon>` (Lucide) | bundled | n/a | Share modal | Low | Fine | Keep |
| 37 | `components/ShareButtons.tsx` social SVGs | inline | <1 KB | Topic page share row | High | Fine | Keep |
| 38 | `app/error.tsx` decorative SVG | inline | <1 KB | error pages | Low | Fine | Keep |
| 39 | `app/global-error.tsx` decorative SVG | inline | <1 KB | global error | Very low | Fine | Keep |
| 40 | Blog post body imagery | **none** | — | `app/blog/[slug]/page.tsx` | High (SEO) | **Missing** — every post is text-only | **Add** — 1 hero per post via Image 2 |
| 41 | Guide post body imagery | **none** | — | `app/guides/[id]/page.tsx` | High | Missing | Add Image 2 hero per guide |
| 42 | Blog index thumbnails | **none** | — | `app/blog/page.tsx` | High | Missing | Add Image 2 thumbs |
| 43 | Guides index thumbnails | **none** | — | `app/guides/page.tsx` | High | Missing | Add Image 2 thumbs |
| 44 | "Lessons from the Deep" Cruxtacean header | none | — | `app/lessons-from-the-deep/page.tsx` | Low | Missing | Image 2 — Cruxtacean character art (singular asset) |
| 45 | Concepts / glossary illustrations | none | — | `app/concepts/`, `app/glossary/` | Medium | Missing | Image 2 (later batch) |
| 46 | About page founder portrait / brand mark | none | — | `app/about/` | Medium | Missing | Optional — Image 2 abstract instead of photo |
| 47 | For-Educators page hero | none | — | `app/for-educators/` | Medium | Missing | Image 2 — classroom-feel illustration |
| 48 | FAQ / methodology header | none | — | `app/faq/`, `app/methodology/` | Low | Missing | Optional |
| 49 | Question page hero (`/questions/[slug]`) | none | — | seasonal SEO surface | Medium | Missing | Image 2 (long tail) |
| 50 | `screenshots/` directory (28 PNGs, ~18 MB) | PNG | 18 MB total | **Not served — local dev only** | n/a | n/a | **Add to `.gitignore`** — these are committed dev artifacts, not site assets |

**50 distinct asset slots.** Only 10 exist on disk, 5 are runtime-composited, 118 are Unsplash hot-links inside `data/topics/`, 3 are missing brand-critical files (favicon set), the rest are empty slots.

## 3. Categories of asset, one-sentence state

- **(a) Brand assets — logos, favicons, social cards.** Critically broken: there is no favicon, no app icon, no Apple touch icon, and `layout.tsx:159` is shipping a 404 logo URL inside the schema.org `Organization` JSON-LD. **Highest-impact bucket to fix.**
- **(b) Marketing surfaces — hero illustrations, OG images, blog/guide covers.** All four OG generators are runtime-text-only (no graphic identity); blogs and guides have zero header imagery; there is no homepage hero illustration. **Largest surface area to invest in.**
- **(c) UI chrome — icons, dividers, badges.** In great shape: Lucide React handles 95% of icons, three custom AI-provider SVGs are crisp, decorative chrome is minimal. **Keep as-is.**
- **(d) Canvas elements — React Flow background, node decorations.** A single borrowed watercolor PNG (`lw-background.webp`) sits behind every page; nodes use external Unsplash photos when an `imageUrl` is set. **Background is the single highest-visibility upgrade target.**
- **(e) Topic-specific illustrations — per-topic OG, header images.** 118 Unsplash hot-links across the 109 topic dataset; runtime OG cards are decent but generic. **Medium-priority bulk replacement.**
- **(f) Blog / guide post imagery.** Doesn't exist at all. Posts have no hero, no inline diagrams, no thumbnails on index pages. **Pure additive opportunity.**

## 4. Visibility-weighted top 20

Cost estimates assume Image 2.0 at ~$0.04/image standard, ~$0.19 high-fidelity (cf. agent 01). Times assume one review pass per asset.

| Rank | Asset | Status today | Image 2 prompt sketch | Cost | Time |
|---|---|---|---|---|---|
| 1 | `app/icon.png` (favicon set, three sizes) | **404 — broken in JSON-LD** | "Minimal serif `A` mark in deep teal `#3a6965` on parchment `#f4f1eb`, single rust accent stroke `#C4613C`, square crop, faint paper texture, 1024×1024" → export 16/32/180/512 | $0.20 | 30 min |
| 2 | Homepage OG card (`app/opengraph-image.tsx`) | Plain text on gradient | Composite background tile from Image 2 ("aged parchment with subtle teal watercolor wash, top-right rust accent corner") under existing typography | $0.20 | 1 hr |
| 3 | `lw-background.webp` (every page) | Borrowed LessWrong watercolor | "Soft watercolor wash, deep teal `#3a6965` blooming from top-right corner into warm parchment, no figurative content, 1536×2048, painterly edges, low saturation" | $0.20 | 1 hr |
| 4 | Featured-topic homepage hero illustration | None — `FeaturedTopicHero.tsx` is text + score only | Per-topic header tile rendered inside the hero card, generated from topic title and meta_claim ("editorial illustration of [topic] in muted parchment palette, no text") | $0.20 / topic, but only featured one needed = $0.20 | 1 hr |
| 5 | Per-topic OG card backgrounds (`app/api/og/[id]/route.tsx`) | Solid `#f4f1eb` | Add a 1200×630 background tile with topic-category-specific texture (politics / climate / AI / etc.) — 6 reusable backgrounds, not 109 | $1.20 | 2 hr |
| 6 | Hero topic illustration on `data/topics/[featuredId]` MetaNode | Unsplash stock | Image 2 generate per-topic illustration, replace `imageUrl` field | $0.04 | 30 min |
| 7 | Cruxtacean character art (`/lessons-from-the-deep`) | Missing | "Anthropomorphic crab character holding scales of evidence, anime/storybook style, parchment palette, single hero shot" | $0.20 | 1 hr |
| 8 | Blog index thumbnails (top 10 posts) | Missing | Per-post abstract illustration ("editorial collage representing [post topic], muted palette, no text") | $0.40 | 3 hr |
| 9 | Blog [slug] hero (top 10 posts) | Missing | Same as #8, 1600×900 hero variant | $0.40 | 3 hr |
| 10 | Guide [id] hero (top 5 guides) | Missing | "Pedagogical diagram-style illustration for [concept], parchment palette" | $0.20 | 2 hr |
| 11 | Guides index thumbnails | Missing | Same as #8 | $0.20 | 1 hr |
| 12 | Per-topic Unsplash replacement — top 20 most-trafficked topics | Stock photos | Per-topic hero illustration generated from topic.title + meta_claim | $0.80 | 4 hr |
| 13 | For-Educators hero | Missing | "Stylized argument map projected on classroom wall, students silhouetted, parchment palette" | $0.20 | 1 hr |
| 14 | Default `data/topics` fallback illustration | n/a | One reusable illustration for any topic missing an `imageUrl` | $0.04 | 15 min |
| 15 | About page brand illustration | Missing | "Abstract: cracked monolith of certainty fracturing into many lenses, watercolor" | $0.20 | 1 hr |
| 16 | Homepage above-the-fold illustration (left of FeaturedTopicHero copy) | Missing | "Loose argument-map sketch, evidence node + crux node + fallacy node interconnected, parchment, hand-drawn feel" | $0.20 | 2 hr |
| 17 | Concepts / glossary card illustrations (top 5 concepts) | Missing | Per-concept icon-style illustration | $0.20 | 1 hr |
| 18 | Methodology page diagram backdrop | Missing | "Faint watercolor of converging arrows from many sources to a central judgment, low contrast" | $0.04 | 30 min |
| 19 | FAQ hero | Missing | Optional — small abstract motif | $0.04 | 15 min |
| 20 | Per-topic Unsplash replacement — next 20 topics | Stock | Same prompt template as #12 | $0.80 | 4 hr |

**Phase-1 total of top 5: ~$2.00, ~6 hours.** Fixing the broken favicon alone is "stop shipping a bug" tier.

## 5. The "leave alone" list

- **All seven `public/images/perspectives/*.png` anime illustrations** — git log `a9feb08 Update Perspectives page with new anime-style illustrations` shows the founder personally curated these. Stylistically distinct from the rest of the site by intent. Don't sand off the founder's voice.
- **`public/icons/claude.png`** — Anthropic trademark. Keep.
- **Lucide React icons** — third-party set, professional, comprehensive. Net-negative to replace.
- **`OpenAIIcon` SVG path** in `LLMIcons.tsx` — official mark.
- **`DiamondDiagram.tsx`, `ScalesOfEvidence.tsx`, `ConfidenceTimeline.tsx`, `ConfidenceGauge.tsx`** — custom inline-SVG dataviz. Content, not decoration; belongs to the data-viz track.
- **Footer / Sidebar / TopBar inline SVGs** — minor chrome, no upgrade path.
- **CSS shimmer at `globals.css:671`** — pure CSS, faster than any image.

The `lw-background.webp` → `paper-wash.webp` rename is itself an act of respect — the current filename literally announces "copied from LessWrong."

## 6. Codex-driven replacement workflow

Single job spec, walks the inventory in priority order, human review every 5 generations. Builds on agent 02's manifest+hash design.

**Spec:** `scripts/image-pipeline/replacement-job.json`

```json
{
  "job_name": "argumend-asset-replacement-2026-Q2",
  "image_model": "gpt-image-2",
  "default_size": "1024x1024",
  "default_style": "argumend-stoic-parchment-v1",
  "style_prompt_suffix": "muted parchment palette #f4f1eb base, deep teal #3a6965 accent, rust #C4613C secondary, no text, no UI elements, soft watercolor edges, no figurative people unless specified",
  "output_root": "public/images/generated",
  "manifest": "scripts/image-pipeline/manifest.json",
  "review_checkpoint_every": 5,
  "batches": [
    {
      "id": "phase-1-brand",
      "assets": [
        { "slot": "app/icon.png", "size": "1024x1024", "exports": [16, 32, 180, 512], "prompt_template": "favicon-mark" },
        { "slot": "app/opengraph-image-bg.png", "size": "1536x806", "prompt_template": "og-card-bg" },
        { "slot": "public/images/paper-wash.webp", "size": "1536x2048", "prompt_template": "watercolor-bg" },
        { "slot": "public/images/featured-topic-hero.webp", "size": "1024x1024", "prompt_template": "topic-illustration", "topic_id": "${FEATURED_TOPIC_ID}" },
        { "slot": "public/images/og-bg/politics.png", "size": "1200x630", "prompt_template": "og-category-bg", "category": "politics" }
      ]
    },
    {
      "id": "phase-2-topics",
      "depends_on": "phase-1-brand",
      "assets": [
        { "slot": "public/images/topics/${TOPIC_ID}.webp", "size": "1024x1024", "prompt_template": "topic-illustration", "iterate_over": "data/topicIndex.ts:topicSummaries" }
      ]
    },
    {
      "id": "phase-3-content",
      "depends_on": "phase-2-topics",
      "assets": [
        { "slot": "public/images/blog/${SLUG}.webp", "size": "1600x900", "prompt_template": "blog-hero", "iterate_over": "data/blog.ts:blogPosts" },
        { "slot": "public/images/guides/${ID}.webp", "size": "1600x900", "prompt_template": "guide-hero", "iterate_over": "data/guides.ts:guides" }
      ]
    }
  ]
}
```

**Driver:** `scripts/image-pipeline/run-codex.ts` (Bun) — reads `replacement-job.json` + `manifest.json`, skips slots with matching `prompt_hash`, generates the rest, writes to `public/images/generated/`, updates the manifest with `{slot, prompt_hash, model, generated_at, dollars_spent}`, and emits a `reviews/<batch-id>.md` showing each new asset beside the prior one. After every 5 generations it exits `REVIEW_REQUIRED`; founder approves with `--approve <batch-id>` or fixes one asset with `--regenerate <slot>`. On approval, `scripts/image-pipeline/wire-up.ts` rewrites TS imports (e.g., swaps `data/topics/meritocracy-myth.ts:11` from Unsplash URL to `/images/topics/meritocracy-myth.webp`) and opens a PR.

```bash
bun scripts/image-pipeline/run-codex.ts --plan                 # dry-run
bun scripts/image-pipeline/run-codex.ts --batch phase-1-brand  # ~$2
bun scripts/image-pipeline/run-codex.ts --approve phase-1-brand
bun scripts/image-pipeline/wire-up.ts phase-1-brand
```

Mirrors agent 02's principle: human-in-the-loop **between** batches, autonomous **inside** them.

## 7. Risk audit

- **Broken `<Image>` paths.** `next/image` throws at build. Mitigation: `wire-up.ts` runs `bun run build` before the PR; failure blocks merge.
- **OG cache lag.** Twitter / LinkedIn / Slack / Facebook cache OG images 24h–7d. After phase 1, existing share posts still show the old card until expiry. Mitigation: hit the Twitter, LinkedIn, and Facebook validators on deploy; append a build-id query (`?v=2026-04-28`) to `og:image` URLs.
- **Per-topic OG route runs `edge`.** Pulling per-topic illustrations into the composite requires same-origin (avoids `images.remotePatterns` config) — already the plan.
- **CDN propagation.** Coolify + Next standalone serves `public/` directly; if Cloudflare is later added, purge required.
- **Alt-text regression.** `wire-up.ts` lints every changed `<Image>` for a non-empty `alt=` and fails the PR if missing.
- **Topic-data diff explosion.** Don't inline the new URL — replace `imageUrl` field reads with a central `getTopicImage(topic.id)` helper in `lib/topics.ts`. One file change instead of 109.
- **Bundle weight.** WebP at 1024×1024 q80 is ~100 KB. 109 topics ≈ 11 MB on disk, but `next/image` only ships what the viewport needs. Net Lighthouse impact should be **positive** vs the current third-party Unsplash DNS+TLS round-trip.
- **Founder rejection.** Every batch ships a markdown review; `--regenerate <slot>` re-runs a single asset with a tweaked prompt before approval.
- **Trademark territory.** `claude.png`, `OpenAIIcon`, and `GeminiIcon` are excluded from the job spec.

## 8. Phased execution plan

**Phase 1 — week 1 — ~$2.** Top 5 highest-visibility assets: `app/icon.png` + favicon set (fixes the JSON-LD 404), homepage OG card background, `paper-wash.webp` canvas background (replacing `lw-background.webp`), featured-topic hero illustration, one reusable OG-category background tile. Single PR with screenshots; OG validators run on staging before merge.

**Phase 2 — week 2 — ~$10.** Per-topic OG backgrounds (6 categories) + 109 topic illustrations + Cruxtacean character + 5 blog hero images. The `iterate_over: data/topicIndex.ts:topicSummaries` block feeds each topic's title and meta_claim into the prompt template. Founder reviews in groups of 5 → ~22 checkpoints, ~2 min each, ~45 min total founder time across the week.

**Phase 3 — ongoing.** A pre-commit hook (`scripts/image-pipeline/pre-commit.sh`) detects new entries in `data/blog.ts` / `data/guides.ts` / `data/topics/` and queues illustration generation. Cost amortizes to ~$0.04 per content addition.

## 9. Success metrics

- **Visual coherence score.** Manual "is this on-brand?" pass against §3.b–e for every page. Track in `coherence-log.md` per phase. Target 100% within 30 days of phase 2.
- **Share-rate uplift on X.** Append `?utm_source=x_share` and track GA4 referrer counts pre/post phase 1. Hypothesis: real OG card lifts share CTR 1.5–3×. At the current low baseline, even a doubling is observable in absolute numbers inside the 14-day observation freeze.
- **Lighthouse image-weight delta.** Run before phase 1, after phase 2. Same-origin WebPs vs. Unsplash hot-links should be net-positive on LCP.
- **OG validator screenshots.** Attach Twitter / LinkedIn validator output to phase-1 PR.
- **Broken-asset count.** Currently 1 (the missing `icon.png`). Target 0 after phase 1; verify with `curl -I https://argumend.org/icon.png` → 200.
- **Founder gut check.** The single weightiest metric. Per CLAUDE.md context: regenerate without negotiation when output misses.

---

## Final summary

**Top 5 assets to replace first (phase 1, ~$2 total, ~6 hours of work):**

1. **The missing `app/icon.png`** — `app/layout.tsx:159` is shipping a 404 logo URL inside the schema.org JSON-LD right now. This is a bug, not an upgrade.
2. **Homepage OG card** (`app/opengraph-image.tsx`) — every Twitter / LinkedIn / Slack share of `argumend.org` currently shows a plain text card with no graphic identity.
3. **`lw-background.webp`** — the borrowed-from-LessWrong watercolor that sits behind every page, every route, every share screenshot. Highest single-asset visibility on the site.
4. **Featured-topic homepage hero** — the `FeaturedTopicHero` card on `/` is text-only; one Image-2 illustration would lift the entire above-the-fold.
5. **A reusable OG-category background tile** — feeds into `app/api/og/[id]/route.tsx` so all 109 topic share cards inherit a real visual identity instead of a beige rectangle.

**Three next-step actions to launch the audit-driven replacement:**

1. **Today: ship the broken-favicon hotfix** — generate `app/icon.png` + `apple-icon.png` via Image 2, commit, deploy. ~30 min, ~$0.20. Stops the JSON-LD 404 immediately.
2. **This week: scaffold `scripts/image-pipeline/`** — author `replacement-job.json`, `run-codex.ts`, `wire-up.ts`, `manifest.json`. No generation yet; just the harness so phase 1 and phase 2 can run identically with `--batch <id>` flags.
3. **Week 2: run phase 2 in 22 review batches** — generate 109 topic illustrations + 6 OG-category backgrounds, swap the 118 Unsplash hot-links to same-origin paths via a single `lib/topics.ts:getTopicImage()` helper. Net effect: every share surface and every topic page gets on-brand visuals, third-party DNS load disappears, and the repo finally owns the visual layer it depends on.

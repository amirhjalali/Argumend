# Codex + GPT Image 2.0 Pipeline — Synthesis

**Date:** 2026-04-28
**Companion to:** `docs/research/2026-04-28-distribution/00-SYNTHESIS.md` and `docs/research/2026-04-28-visual-design/00-SYNTHESIS.md`
**Inputs:** 7 parallel research files in this directory (~22k words)
**Reader context:** Visual-design swarm locked the "Natural-Philosophy Notebook" signature. Distribution swarm identified that the magic-moment demo and the Vercel-style OG generator are the two highest-ROI brand artifacts. This swarm answers "how do we actually use Codex + GPT Image 2.0 to ship those, plus replace the rest of the visual content."

## 1. Two findings to act on TODAY (before any pipeline work)

The audit (file 06) surfaced two issues that don't need a pipeline — they need 30 minutes:

1. **Live 404 in production JSON-LD.** `app/layout.tsx:159` references `https://argumend.org/icon.png`, but the file does not exist in `public/`. Every Google rich-result crawl is hitting a 404 right now. **Fix today: ~30 min, ~$0.20 to generate one favicon set in Image 2 + cleanup.** This was unintentional and would have stayed broken until someone noticed.
2. **Stale OG card claim.** `app/opengraph-image.tsx:69` advertises "50 Topics" — the actual count is 109. Every X share of `argumend.org/` is currently lying. **Fix today: literal 1-line edit.**

These two are the lowest-hanging fruit on this entire research; do them before the pipeline scaffolding.

## 2. The audit's bigger truth

Argumend's visual surface is **smaller than it looks** (only 11 files in `public/`, ~5.3 MB total) and **leans on third parties more than it should** (118 Unsplash hot-links across `data/topics/*.ts` for node imagery). Blog posts (4106 lines) and guides (1562 lines) carry **zero image fields**. The visual-asset replacement opportunity is therefore not "fix the existing 50" — it's **"populate the empty slots."**

This reframes the Codex-pipeline ROI: this isn't a refactor, it's *new asset creation* in a visual surface that's mostly text right now. The brand wedge from the visual-design swarm (defended color + rotating motif) compounds dramatically when you go from ~10 branded assets to ~150.

## 3. The recommended Codex integration pattern

**Pattern B from file 01: Codex writes and runs Node TypeScript scripts that call the OpenAI SDK directly.** Not curl in shell (too fragile for 109-topic batches). Not custom MCP server (over-engineered for solo founder).

```
scripts/
  generate-image.ts      # one-off: bun run image:generate -- --prompt "..." --out tmp.png
  image-batch.ts         # batch: bun run image:batch -- --spec codex-jobs/og-images-batch
codex-jobs/
  og-images-batch/
    AGENTS.md            # house rules
    SPEC.md              # this batch's contract
    prompt-template.ts   # composes from the locked fragment library
    critic-prompt.md     # GPT-4o-vision review prompt
    INPUT_IDS.json       # which topic ids
    STATUS.md            # append-only progress (resumable)
lib/visual/
  openai-image.ts        # SDK wrapper with p-limit + 429 retry
  prompt-fragments.ts    # the locked Natural-Philosophy Notebook library
  icon-manifest.json     # the 50-element library spec
```

Setup cost: ~30 min install + ~4 hr to write the scaffold + iterate one smoke-test image. Total under $1.

## 4. The 90-day execution plan

| Day/Wk | Action | File | Cost | Why |
|---|---|---|---|---|
| Today | Hotfix `app/layout.tsx:159` icon 404 | 06 | $0.20 | Live production bug |
| Today | Update "50 Topics" → "109 Topics" in `app/opengraph-image.tsx:69` | 06 | $0 | Lying to every X share |
| Day 2-3 | Install Codex CLI + write `lib/visual/openai-image.ts` + `scripts/generate-image.ts` | 01 | $1 | The minimum-viable scaffold |
| Day 4 | Commit `lib/visual/prompt-fragments.ts` (~80 lines, drop-in from file 07) | 07 | $0 | The discipline layer that prevents drift |
| Wk 1 | Generate canvas background pair (light + dark) and replace `BackgroundVariant.Dots` at `HomeClient.tsx:316-322` | 03 | $0.66 | Single highest-impact change — every user touches the canvas |
| Wk 1 | Replace `globals.css:101-124` watercolor wash with re-encoded AVIF + dark-mode pair | 03 | $0 | 60-80% bandwidth saving, no visual change |
| Wk 2 | Generate Phase-1 decorative library: 6 icons (crux scale, proponent figure, skeptic figure, verified seal, disputed seal, evidence-source seal) | 05 | $1.30 | Brand wedge in the node taxonomy |
| Wk 2 | Build `codex-jobs/og-images-batch/` and run on top 12 highest-traffic topics | 02, 04 | $4 | Validate the workflow before scaling |
| Wk 3 | Generate full 109-topic OG batch via build-time pre-generation into `public/og/topics/<id>.png`; integrate via `metadata.openGraph.images` in `app/topics/[id]/page.tsx` | 04 | $30 | Every X share becomes a branded asset |
| Wk 3 | Wire GPT-4o-vision critic with pass/fail rubric, cap retries at 2 | 02, 07 | $5 | Drift prevention at scale |
| Wk 4 | Replace 118 Unsplash hot-links in `data/topics/*.ts` with 109 Codex-generated topic illustrations | 06 | $25 | Argumend stops renting node imagery |
| Wk 5-6 | Full fallacy badge set (24 cards from yourlogicalfallacyis.com School of Thought taxonomy) via Image 2 → Recraft v3 vectorize | 05 | $5 + $10 | Visual differentiator vs Kialo |
| Wk 7-8 | Phase-3 page-section backgrounds (blog hero, footer, /about) | 03 | $3 | Surface coherence |
| Wk 9 | Add image fields to blog and guide schemas; backfill 5 highest-traffic posts with Codex-generated heroes | 06 | $5 | Long-form gets visual identity |
| Ongoing | Per-new-topic OG image (auto on topic add via runtime `@vercel/og` fallback) | 04 | $0.21 each | Steady-state |

## 5. The cost model (file 07)

- **Initial batch: ~$51 one-time** (everything in weeks 1-4 above)
- **Year 1 total: ~$106** (initial + ongoing per-new-topic)
- **Steady state: ~$55/year** (drift fixes + new content)
- **Compare to alternatives:** hiring an editorial illustrator for monthly retainer = $9K-26K/year; stock illustration = $0 cost but $0 brand coherence; status quo = $0 cost but 118 Unsplash dependencies and a live 404.

The pipeline is the cheapest way to get from "incoherent" to "branded" by a factor of 100x.

## 6. The discipline layer (this is what's actually hard)

The scaffold is easy. The hard part is **not breaking your own brand** when each individual piece of content tempts a deviation. File 07's recommendations:

- **`lib/visual/prompt-fragments.ts` is the source of truth.** No prompt is written by hand into a Codex job. All prompts compose via `compose(asset, topic, motif)` from named fragments.
- **Semver the signature.** v1.0 = current Natural-Philosophy Notebook. Every generated image's sidecar manifest records which signature version produced it. v2.0 triggers conscious migration, not silent drift.
- **5-image anchor pool.** Pick the 5 best of the first 12 generations as anchors. Every subsequent batch passes 3 anchors as reference images to constrain style.
- **Two-layer drift detection:** pHash + histogram catches palette/composition drift; GPT-4o-vision critic catches semantic drift (wrong motif, missing crux marker, wordmark gibberish).
- **PR template requires "which prompt fragments + which signature version?" for any new visual asset.** No one-off images.
- **`/dev/visual-system` dashboard** showing the current signature, the anchor pool, and the last 50 outputs. Founder can spot drift visually in 15 seconds.

If the founder cannot defend the brand against their own future self, the pipeline produces 100 images of progressively-mutating slop. The prompt library + signature versioning + critic loop are what prevent that.

## 7. What's NOT in scope (deliberately)

- **Real-time user-facing image generation.** Argumend doesn't need users uploading prompts. All Image 2 jobs are admin/build-time.
- **Animated images.** Static only — animation lives in the React Flow canvas itself and the AI video stack (visual-design swarm file 07).
- **Replacing `public/images/perspectives/*.png`.** These are 7 anime PNGs the founder curated (per `git log` `a9feb08`). Per file 06: leave them alone. Don't propose replacing things that work or have emotional attachment.
- **Replacing the Argumend wordmark/logo.** Vector logo overlay always happens in post (Photoshop/Affinity action). Brand-critical type never goes through Image 2.

## 8. Composition with prior swarms

This swarm closes the loop on the ACX-funnel push from cycle 1:

| Cycle 1 finding | Cycle 2 (visual) finding | Cycle 3 (this swarm) action |
|---|---|---|
| Demo asset gates everything | Sora 2 + Runway for the 30s magic moment | The 30s clip composites Codex-generated background + scripted React Flow recording (week 2) |
| Vercel-style OG generator is highest-ROI free distribution | Natural-Philosophy Notebook signature | Batch-generate 109 OG PNGs, integrate via `metadata.openGraph.images` (week 3) |
| ACX classifieds is the single best distribution lever | Polished thumbnail required | Codex job generates a custom Image 2 thumbnail for the classifieds listing (week 1) |
| Asterisk Magazine pitch needs visual artifacts | Hand-drawn motif rotation | Pitch piece can include 5 Codex-generated argument-map illustrations as inline figures (week 4) |

All three documents now compose into a single coherent execution plan. The freeze ends, the pipeline runs, the brand is consistent at scale, and the ACX funnel has the artifacts it needs.

## 9. Confidence

- **High confidence:** Pattern B (Node SDK scripts) is the right Codex integration. The two hotfixes are real bugs. The 109-topic OG batch costs ~$30 and works. Phase-1 decorative library (6 icons) is low-risk.
- **Medium confidence:** GPT-4o-vision critic catches enough drift to be worth the wiring. Tileable backgrounds work via "generate large enough" rather than seamless tiling. Recraft v3 vectorization quality is good enough for 24 fallacy badges.
- **Low confidence:** The full 24-fallacy classical-allegory illustration set lands cohesively (some allegories are obvious — straw man, ad hominem — others are harder). The founder maintains discipline to use the prompt library for every new image rather than writing one-offs.
- **Honest unknown:** Whether replacing the 118 Unsplash hot-links produces a *better* user experience or just a more-on-brand one. The Unsplash photos are professionally-shot and emotionally evocative; ink-illustration topic art is more cohesive but possibly less immediately engaging. Worth A/B testing on the top 5 topics before committing to the full 109.

# Topic OG Image Pipeline — Replacing the @vercel/og Edge Route with a Codex-Driven Image 2.0 Batch

**Date:** 2026-04-28
**Analyst:** Research agent 04/7, Codex-image swarm
**Brief:** Audit Argumend's current OG image system, design a build-time GPT Image 2.0 batch that produces 109 on-brand OG cards in the locked Natural-Philosophy Notebook signature, and lay out a 1-week ship plan.

## 1. Current OG Image Audit

The current system is a **runtime, edge-rendered, text-only `@vercel/og` route**. There is no Image 2 / GPT image generation in the loop, no parchment background, and no graph imagery — every topic gets a near-identical layout differing only in title text, status badge, and a numeric confidence score.

**Files in the current pipeline:**

- **`app/api/og/[id]/route.tsx` (272 lines, edge runtime).** Per-topic handler. Imports `next/og`'s `ImageResponse`, looks up the topic from `data/topics.ts`, and renders a flexbox layout: rust accent line at top (lines 60-68), status pill, topic title in `Georgia, serif` 54px (lines 134-148), verdict line, stats row "3 Pillars · 18 Evidence Items · 12 References" (lines 162-220), 220×220px concentric-circle confidence-score badge (lines 223-286), ARGUMEND wordmark in tracked Georgia at the bottom. Output 1200×630.
- **`app/api/og/route.tsx` (272 lines, edge runtime).** Generic query-string sibling — `?title=&subtitle=&verdict=&score=` — used by `/analysis/[id]`, blog comparisons, etc.
- **`app/opengraph-image.tsx` (81 lines, edge runtime).** Site-root default. Centered "ARGUMEND — Map Arguments, Not Win Them" with rust rule on a `linear-gradient(135deg, #f4f1eb 0%, #e8e0d5 100%)` background. **Line 69 says "50 Topics" — stale**, since the project now has 109 (per `data/topics.ts`).
- **`app/topics/[id]/page.tsx` lines 50-70.** `generateMetadata()` returns `openGraph.images[0].url = https://argumend.org/api/og/${topic.id}` (line 58) plus matching `twitter.images[0]` (line 69). Every share triggers a runtime fetch of the edge route. The same URL is embedded in JSON-LD `Article.image` (line 119).
- **`app/layout.tsx` lines 58-72.** Root metadata declares `openGraph`/`twitter` but **no `images:`** — the root falls back to `app/opengraph-image.tsx` via Next.js convention.
- **`next.config.js`.** No `Cache-Control` headers and no `images.remotePatterns` entry for `/api/og/*`.
- **`public/og/`** does **not exist**. Zero pre-generated PNGs. System is 100% runtime.

Paste any `/topics/[id]` URL into X/Slack/iMessage today and you get a beige-cream card with a Georgia headline, a colored score circle, and the wordmark. The colors are on-brand-adjacent (rust `#C4613C`, cream `#f4f1eb`) but it has **none of the locked Natural-Philosophy Notebook signature**: no parchment texture, no hand-drawn ink, no graph motif, no crimson crux mark, no classical artifact, no EB Garamond (Georgia is the edge-runtime fallback). And every card is identical modulo title and score — worst case for share recognition.

## 2. Strategy Comparison — Three Approaches

### (a) Build-time pre-generated PNGs

Generate one PNG per topic via a one-shot script, commit to `public/og/topics/<id>.png`. 109 topics × $0.211 (high-quality 1024×1024 per the pricing table in `01-gpt-image-2-visual-signature.md` §1) × 1.3 re-roll buffer ≈ **~$30 one-time**. Pros: full Image 2 signature applied, zero runtime cost, deterministic, CDN caches indefinitely. Cons: ~27MB added to the repo (109 × ~250KB), regeneration is manual.

### (b) Build-time `@vercel/og` (text-only, free)

Hit the existing edge route at `next build` via a Node script and write PNGs to `public/og/`. Zero API spend. Cons: pure typographic refresh — **no parchment, no graph, no artifact**. Not what the founder asked for.

### (c) Runtime hybrid — Image 2 background + `@vercel/og` overlay

Image 2 generates a parchment background per topic on first request and caches it; `@vercel/og` overlays text via `<img src=...>` inside `ImageResponse` (supported per https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image). Pros: dynamic, zero build cost. Cons: Image 2 latency is ~6-12s and X gives crawlers a ~5s budget per https://developer.x.com/en/docs/x-for-websites/cards/overview/markup — the first share after deploy will time out. Same $23+ in spend as (a) but distributed across slow first-shares.

### Recommendation

- **For the existing 109 topics: (a) build-time PNGs.** One-shot, ~$30, ships in a week, full visual signature. Commit to `public/og/topics/<slug>.png`.
- **For future topics: (c) hybrid as fallback.** Each new topic added to `data/topics.ts` triggers `bun run og:regenerate <id>` (CI hook or manual). Runtime route becomes the pre-warm fallback. Marginal cost: $0.21/topic.

This is the pattern Vercel themselves recommend for static catalogs — generate once, serve from `/public`, regenerate via cron on data change (https://vercel.com/docs/og-image-generation).

## 3. Per-Topic Image Specification

Every OG card is **1200×630** (Twitter `summary_large_image` + OG `og:image` standard, https://developer.x.com/en/docs/x-for-websites/cards/overview/markup, https://ogp.me/). Image 2 generates at **1536×1024** (closest supported size from the pricing table) and is cropped to 1200×630 in post.

Fixed positions:

1. **Background:** Natural-Philosophy Notebook parchment per `01-gpt-image-2-visual-signature.md` §5 — `#f4f1eb` warm cream, subtle foxing, faint horizontal rules. Image 2 generated.
2. **Topic title (overlay):** EB Garamond 700, `#3d3a36`, top-left, multi-line with ellipsis at ~70 chars, max 3 lines.
3. **Crux statement (overlay):** EB Garamond 400 italic, `#564d45`, 28-32px, under the title, max 2 lines. Source: topic's `meta_claim` from `lib/schemas/topic.ts`.
4. **3-node mini-graph (overlay SVG):** one position node (rust `#C4613C`), one evidence node (deep teal `#3a6965`), one crux node (crimson `#a23b3b`), connected by ink-line edges. Right side, ~40% canvas width.
5. **Rotating classical artifact (Image 2):** astrolabe / weighing scale / hourglass / manuscript fragment / compass / dividers / sealing wax / quill-and-inkwell — picked deterministically from `topic.id` hash so each topic always gets the same artifact.
6. **Argumend wordmark (overlay):** Plus Jakarta Sans 600, stone gray, bottom-right, 8% width. **Never Image 2-rendered** — per §7 of the visual-signature doc, "the argumend.org wordmark will misspell itself."
7. **Confidence score chip:** top-right, EB Garamond 600, verdict color from `getScoreColor()` in the existing route.

The existing edge route's content (status pill, stats row, full score circle) is **dropped** in favor of the crux + mini-graph. The score circle has been read as a generic rating widget; the crux statement is more legibly Argumend-specific.

## 4. The Codex Batch Job

The script lives at `scripts/generate-topic-og-images.ts` and is invoked via `bun run og:generate` (added to `package.json`). It reads `data/topics.ts`, calls Image 2 for each background, composes the overlay with Sharp, and emits a manifest.

**Pseudocode:**

```ts
// scripts/generate-topic-og-images.ts
import { topics } from "@/data/topics";
import OpenAI from "openai";
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";
import { buildPrompt } from "@/lib/visual/prompt-builder";
import { ARTIFACTS, pickArtifact } from "@/lib/visual/artifacts";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
const OUT_DIR = path.join(process.cwd(), "public/og/topics");
const MANIFEST = path.join(process.cwd(), "public/og/manifest.json");

async function generateOne(topic: Topic) {
  const artifact = pickArtifact(topic.id);                  // deterministic
  const prompt = buildPrompt({
    title: topic.title,
    cruxLabel: topic.meta_claim.slice(0, 80),
    nodeCount: 3,
    artifact,
    aspectRatio: "16:9",
    omitText: true,                                          // text comes later
  });

  const result = await client.images.generate({
    model: "gpt-image-2-2026-04-21",
    prompt,
    size: "1536x1024",
    quality: "high",
    n: 1,
  });
  const png = Buffer.from(result.data[0].b64_json!, "base64");

  // Crop 1536x1024 -> 1200x630 (centered horizontally, 12px top inset)
  const bg = await sharp(png).resize(1200, 630, { fit: "cover" }).toBuffer();

  // Compose the text + wordmark overlay (rendered separately via @vercel/og or satori)
  const overlay = await renderOverlaySvg(topic);             // returns SVG string
  const composed = await sharp(bg)
    .composite([{ input: Buffer.from(overlay), top: 0, left: 0 }])
    .png({ quality: 92, compressionLevel: 9 })
    .toBuffer();

  const outPath = path.join(OUT_DIR, `${topic.id}.png`);
  await fs.writeFile(outPath, composed);
  return { id: topic.id, path: `/og/topics/${topic.id}.png`, artifact, bytes: composed.byteLength };
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const manifest: any[] = [];
  // Concurrency = 5 to respect Tier 2 rate limit (20 IPM)
  const limit = pLimit(5);
  await Promise.all(topics.map(t => limit(async () => {
    const entry = await generateOne(t);
    manifest.push(entry);
    console.log(`✓ ${entry.id}`);
  })));
  await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2));
}
main();
```

**Real APIs cited:**

- `openai.images.generate({ model: "gpt-image-2-2026-04-21", ... })` — per https://developers.openai.com/api/docs/models/gpt-image-2 — returns `{ data: [{ b64_json }] }` when `response_format` defaults to `b64_json`.
- `sharp(input).composite([{ input, top, left }]).png().toBuffer()` — per https://sharp.pixelplumbing.com/api-composite/.
- `sharp(input).resize(w, h, { fit: "cover" })` — https://sharp.pixelplumbing.com/api-resize/.
- For the SVG overlay we use **`satori`** (the underlying renderer of `@vercel/og`, https://github.com/vercel/satori) directly: it converts JSX to SVG, which Sharp can composite as a vector layer. This avoids the edge-runtime constraint that limits the existing route.

**Manifest format** (`public/og/manifest.json`):

```json
[
  { "id": "ai-extinction-risk", "path": "/og/topics/ai-extinction-risk.png",
    "artifact": "astrolabe", "bytes": 248113, "generatedAt": "2026-04-28T19:14:02Z",
    "promptHash": "a3c1...", "model": "gpt-image-2-2026-04-21" },
  ...
]
```

The manifest is read by `app/topics/[id]/page.tsx`'s `generateMetadata` to emit the correct `og:image` URL (now `/og/topics/${id}.png` instead of `/api/og/${id}`).

## 5. Text Overlay Strategy

Image 2 hits ~95% character accuracy on short strings (per `01-gpt-image-2-visual-signature.md` §1) but **drifts on multi-line italics, custom fonts, and the literal `argumend.org` wordmark**. The visual-signature doc's risk section explicitly says: "The argumend.org wordmark will misspell itself." We cannot trust Image 2 to render the title, crux statement, or wordmark at production quality.

**Workaround:** Image 2 generates a **textless** background (parchment + graph + artifact + node colors), and a separate Satori/Sharp pass renders the typography on top.

**Code sample using Satori (the engine inside `@vercel/og`):**

```ts
// lib/visual/render-overlay.tsx
import satori from "satori";
import { readFile } from "node:fs/promises";

const ebGaramond = await readFile("./fonts/EBGaramond-Bold.ttf");
const ebGaramondItalic = await readFile("./fonts/EBGaramond-Italic.ttf");
const plusJakarta = await readFile("./fonts/PlusJakartaSans-SemiBold.ttf");

export async function renderOverlaySvg(topic: Topic): Promise<string> {
  return satori(
    <div style={{ width: 1200, height: 630, display: "flex", padding: 56,
                  flexDirection: "column", justifyContent: "space-between" }}>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 720 }}>
        <div style={{ fontSize: 56, fontFamily: "EB Garamond", fontWeight: 700,
                      color: "#3d3a36", lineHeight: 1.1 }}>
          {topic.title.length > 80 ? topic.title.slice(0, 77) + "..." : topic.title}
        </div>
        <div style={{ fontSize: 28, fontFamily: "EB Garamond", fontStyle: "italic",
                      color: "#564d45", marginTop: 18, lineHeight: 1.35 }}>
          {topic.meta_claim.slice(0, 140)}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div style={{ fontSize: 18, fontFamily: "Plus Jakarta", fontWeight: 600,
                      color: "#7a7068", letterSpacing: 1 }}>
          argumend.org
        </div>
      </div>
    </div>,
    {
      width: 1200, height: 630,
      fonts: [
        { name: "EB Garamond", data: ebGaramond, weight: 700, style: "normal" },
        { name: "EB Garamond", data: ebGaramondItalic, weight: 400, style: "italic" },
        { name: "Plus Jakarta", data: plusJakarta, weight: 600, style: "normal" },
      ],
    }
  );
}
```

Satori returns an SVG string which `sharp.composite()` accepts directly as a vector layer — no rasterization quality loss for the typography. Per https://github.com/vercel/satori#fonts, fonts must be supplied as `Buffer | ArrayBuffer`; commit the three TTFs to `fonts/` (they're each ~50-200KB, fine for the repo).

**Why not Image 2's text at all?** At 99% char accuracy, 109 topics × 2 strings × ~80 chars ≈ 17,000 chars at 1% error ≈ 170 expected misspellings batch-wide. And even when chars are right, kerning drifts between batches — every card looks like a slightly different font. Vector overlay is deterministic and free.

## 6. Mini-Graph Rendering

Three options for the 3-node graph element:

### (a) Playwright screenshot of the React Flow canvas

Spin up a headless browser at build time, navigate to `localhost:3000/topics/[id]`, wait for the React Flow canvas to settle, screenshot the relevant region. Pros: pixel-perfect match with the in-app product. Cons: heavy build-time dependency (Playwright + Chromium ~300MB), 109 × ~3s/render = 5.5 minutes added to the build, and React Flow's actual node styling (boxy modern UI) **does not match the parchment-and-ink signature** — pasting a real React Flow shot onto a parchment background looks like a screenshot collage, not a notebook drawing.

### (b) Custom SVG generator from topic data — RECOMMENDED

Write `lib/visual/mini-graph.tsx` that takes `{ position, evidence, crux, edges }` and emits a hand-drawn-styled SVG: thin curved Bézier edges (stroke-width 1.5, slight stroke-dasharray for ink texture), 3 circular nodes (radius 28) with the locked node colors, marginalia labels in EB Garamond italic. The SVG is composed onto the Image 2 background via Sharp, same path as the typography overlay. Pros: full control, deterministic, on-brand, ~2KB per graph, no headless-browser dep. Cons: requires writing the SVG generator (~60 lines).

### (c) Hand-drawn graph as part of the Image 2 prompt with text-overlay correction

Let Image 2 draw the graph itself ("3 nodes connected by curved ink edges, one filled in crimson, one in deep teal, one in rust"), then overlay correct labels via Satori. Pros: zero custom code, fully matches the parchment hand-drawn aesthetic. Cons: Image 2 cannot reliably place 3 nodes in a known layout — the position, count, and color assignment drift between generations. Founder cannot programmatically know where to place labels, so labels won't align with the drawn nodes.

**Recommendation: (b) custom SVG with (a) as a backup verification step.** Use the SVG generator for the actual OG render. Run a one-time Playwright screenshot pass on 5 topics and visually compare the SVG mini-graph to the real product graph; if they diverge meaningfully, tune the SVG generator's curve and node styling.

## 7. Next.js Integration

Two patterns work in Next.js 16+ (current Argumend version per `package.json` is `next: "^16.1.6"`):

### Pattern A — Static `opengraph-image.png` per route

Place a literal PNG at `app/topics/[id]/opengraph-image.png` and Next.js wires it up (https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image). **Problem:** dynamic routes have no built-in way to pick the right file per `[id]` — we'd need 109 sibling directories, breaking the parameterized route structure.

### Pattern B — Public assets + explicit `metadata.openGraph.images` URL — RECOMMENDED

Keep the dynamic route intact, store PNGs at `public/og/topics/<id>.png`, and update `app/topics/[id]/page.tsx`'s `generateMetadata()` (currently lines 50-70) to point at the static URL:

```ts
openGraph: {
  type: "article",
  title: `${topic.title} — Argument Analysis | ARGUMEND`,
  description,
  url: `https://argumend.org/topics/${topic.id}`,
  siteName: "ARGUMEND",
  images: [{ url: `/og/topics/${topic.id}.png`, width: 1200, height: 630, alt: topic.title }],
},
twitter: {
  card: "summary_large_image",
  title: `${topic.title} — Argument Analysis`,
  description,
  images: [`/og/topics/${topic.id}.png`],
},
```

Next.js resolves the relative URL against `metadataBase` from `app/layout.tsx` line 35 (`new URL("https://argumend.org")`) — this already works. The existing edge route at `app/api/og/[id]/route.tsx` becomes the **fallback** for topics whose static PNG hasn't been generated yet (e.g., a topic just added between deploys); add a small server-side check: `images: [exists(`public/og/topics/${id}.png`) ? `/og/topics/${id}.png` : `/api/og/${id}`]`.

### Twitter card variant

Twitter's `summary_large_image` and Open Graph `og:image` accept the same 1200×630 PNG, so a separate `twitter-image.tsx` is **not required**. If we ever want a Twitter-specific crop (e.g., 1600×900 for X's larger preview frame), add `app/topics/[id]/twitter-image.png` later — Next.js will prefer it over the OG one for Twitter previews.

### Cache headers and revalidation

Static files in `public/` are served by Next.js with default `Cache-Control: public, max-age=0, must-revalidate`. For OG images we want **`Cache-Control: public, max-age=31536000, immutable`** (one year, since the filename is content-versioned per topic-id). Set this in `next.config.js`'s `headers()` function:

```js
{ source: "/og/topics/:path*", headers: [
    { key: "Cache-Control", value: "public, max-age=31536000, immutable" } ] }
```

When a topic's content changes (rare), bump the filename: `public/og/topics/<id>-v2.png` and update the manifest. Twitter and Slack respect `?v=` query params for cache-busting per https://developer.x.com/en/docs/x-for-websites/cards/troubleshooting/troubleshooting-cards.

## 8. Visual Variety vs Consistency

Two extremes:

- **Maximum uniqueness:** every topic gets a fully unique Image 2 generation. 109 distinct backgrounds, 8 rotating artifacts, 3-node graph laid out differently each time. Cost: $30 one-time. Risk: viewers don't recognize the brand on share #2 because it doesn't look like share #1.
- **Templated rotation:** 5-10 master templates (e.g., "astrolabe top-right + 3-node graph center", "weighing scale bottom-left + linear arrows", etc.) generated once, then text-overlaid per topic. Cost: $5 one-time. Risk: by topic #20, every share looks identical and the "feed" loses interest.

**Recommendation: per-topic uniqueness with locked motifs.** Generate one Image 2 background per topic (109 unique), but every background contains the **same five recurring motifs** from `01-gpt-image-2-visual-signature.md` §5: parchment, ink graph, crimson crux, deep-teal evidence, rotating classical artifact. Artifact selection is deterministic from `topic.id` (continuity), but adjacent topics on the homepage show different artifacts (variety). Same trick as book covers and album sleeves: fixed type + fixed palette + variable illustration = a series that reads as both unique-per-issue and recognizably one brand. 8 artifacts × 109 topics ≈ 13 topics each — enough that the same artifact rarely appears twice in an X feed, while parchment + graph + crimson crux scream "Argumend" at first glance.

## 9. Rollout Plan — 1-Week Timeline

**Day 1 — Audit + scaffold (4h).** Run Twitter Card Validator (https://cards-dev.twitter.com/validator) and Facebook Sharing Debugger on 5 live topics; screenshot for before/after. Create `scripts/generate-topic-og-images.ts` and `lib/visual/{prompt-builder,artifacts,mini-graph,render-overlay}.ts`. Add `sharp`, `satori`, `openai`, `p-limit` deps. Commit EB Garamond + Plus Jakarta TTFs to `fonts/`.

**Day 2 — Prompt + overlay (6h).** Wire `prompt-builder.ts` using the `VISUAL_PROMPT_FRAGMENTS` from `01-gpt-image-2-visual-signature.md` §5. Write `mini-graph.tsx` (SVG) and `render-overlay.tsx` (Satori). Run end-to-end on one topic locally; inspect output.

**Day 3 — Test batch of 10 (~$3).** Pick 10 topics spanning title-length and verdict variety. Generate, lay out as a 5×2 contact sheet in Figma. Review for amber drift, crux saturation, artifact diversity, text overflow. Iterate prompt fragments. Budget allows ~3 iteration cycles.

**Day 4 — Full 109 (~$25, 35min wall-clock at Tier 2).** Run the batch. Spot-check 20. Queue losers for re-roll.

**Day 5 — Re-roll + integrate (4h).** Re-roll <10 losers. Update `app/topics/[id]/page.tsx` `generateMetadata()` per §7. Add `Cache-Control` header in `next.config.js`. Commit `public/og/topics/*.png` + `manifest.json`. Deploy to staging.

**Day 6 — Validate (2h).** Twitter Card Validator, Slack unfurl test, Facebook Sharing Debugger, LinkedIn Post Inspector (https://www.linkedin.com/post-inspector/) on 10 staging URLs. Confirm `og:image:width=1200`, `og:image:height=630`, `og:image:alt`, and `max-age=31536000` are live. Spot-check iMessage + Telegram on a phone. Tighten Satori overflow if any platform truncates >70-char titles.

**Day 7 — Ship (2h).** Add `bun run og:generate` + `og:regenerate <id>` scripts. Merge to main, deploy. Tweet rollout from `@argumend` with one example link to seed X's cache.

**Total:** 7 days, ~22 hours, ~$30 cash, $0 infra (static assets only).

---

## Final Summary

**Recommended approach:** build-time pre-generation of 109 PNGs into `public/og/topics/<id>.png`, using **GPT Image 2** (`gpt-image-2-2026-04-21`) for parchment/graph/artifact backgrounds (textless, ~$30 one-shot), **Satori + Sharp** for typographic overlays (title, crux statement, wordmark, mini-graph SVG), and a deterministic per-topic artifact rotation across 8 classical motifs. Replace the dynamic edge route at `/api/og/[id]` with a static URL in `generateMetadata()`; keep the edge route as a fallback for newly added topics until the next batch run. Future topics added to `data/topics.ts` get one-off generation via `bun run og:regenerate <id>` ($0.21/topic), or a CI hook can automate it.

**Three next-step actions to ship:**

1. **Today:** scaffold `scripts/generate-topic-og-images.ts` + `lib/visual/{prompt-builder,artifacts,mini-graph,render-overlay}.ts`; add `sharp`, `satori`, `openai`, `p-limit` deps; commit EB Garamond + Plus Jakarta TTFs to `fonts/`.
2. **Tomorrow:** generate a 10-topic test batch ($3), lay out a contact sheet, iterate prompt fragments until the parchment color, crux saturation, and graph hand-drawn feel all lock in.
3. **By end of week:** generate the full 109, update `app/topics/[id]/page.tsx` lines 50-70 to point `images:` at `/og/topics/${topic.id}.png`, add the immutable `Cache-Control` header in `next.config.js`, deploy, and validate against the Twitter/Slack/Facebook/LinkedIn debuggers.

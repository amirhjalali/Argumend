# Canvas Backgrounds: React Flow + GPT Image 2 Parchment Aesthetic

**Date:** 2026-04-28
**Analyst:** Research agent 03/7, codex-image-pipeline swarm
**Brief:** How to upgrade Argumend's React Flow canvas background — and the page-section backgrounds across the site — from the current generic dot pattern to a GPT-Image-2-generated parchment/manuscript aesthetic that locks the Natural-Philosophy Notebook signature.

## 1. Current State Audit

**Canvas (the React Flow surface).** The graph canvas in `components/HomeClient.tsx` renders the stock `<Background>` component from `@xyflow/react` in dot mode. From line 316:

```tsx
<Background
  color="#cdc6bb"
  gap={GRAPH.GRID_GAP}        // 24
  size={GRAPH.DOT_SIZE}        // 1.2
  variant={BackgroundVariant.Dots}
  className="opacity-50"
/>
```

The dot color `#cdc6bb` is a stone gray, gap 24px, dot radius 1.2px (per `lib/constants.ts:54-56`), and the whole layer is dimmed with `.react-flow__background { opacity: 0.3 !important; }` in `app/globals.css:731-733`. Net visual effect: a faint 24px stone-gray dot grid on the parchment-cream `--bg-canvas` (`#f4f1eb`, `globals.css:12`). It is the React Flow default in everything but the dot color. It carries zero brand. A user who lands on `argumend.org` sees the same canvas as any of the 50,000+ React Flow deployments shipping the default `BackgroundVariant.Dots`.

**Body background (everywhere else).** `globals.css:101-124` sets up a two-layer body background: a flat `--bg-canvas` color base, plus a watercolor accent loaded from `/images/lw-background.webp` (a 112KB WebP, JPG twin at 125KB) masked with a top-to-bottom alpha gradient and desaturated 50%. This is the LessWrong-style watercolor wash that bleeds in from the upper-right corner. Dark mode hides it (`globals.css:127-129`). This is the *only* image asset doing brand work today.

**Section-level backgrounds.**

- `Footer` (`components/Footer.tsx:37`): solid `bg-[#f4f1eb] dark:bg-[#1a1917]` — flat parchment.
- `FeaturedTopicHero` (`components/FeaturedTopicHero.tsx:66`): a vertical gradient `bg-gradient-to-b from-[#f4f1eb] to-stone-50 dark:from-[#1a1917] dark:to-[#201f1c]` — parchment fading to off-white. No texture.
- Topic hero card (`FeaturedTopicHero.tsx:106`): a tinted block `bg-[#faf5f0]` with crimson left border. No image.
- All `app/*/page.tsx` content pages inherit the body's watercolor wash and add nothing else.

**Bottom line.** The only "designed" background surface on the site today is the LessWrong watercolor wash on the body. Every other surface — the canvas, the footer, all section heroes, the blog, the about page — is a flat fill. The graph canvas, which is the literal core of the product experience, has no brand DNA on it at all.

## 2. Background Design Archetypes

Five archetypes worth considering for the canvas. The constant constraint: the background must **not compete with foreground graph nodes**. Argumend nodes are already information-dense — body text, evidence dots, confidence scores, crimson crux highlights. Anything below them must whisper.

**(a) Tileable parchment texture (subtle).** A hand-aged paper grain at ~6% opacity, tileable. **Pros:** locks the parchment metaphor; survives extreme zoom; cheap to render once you have a clean tile. **Cons:** the worst variant feels like a Microsoft Word stationery template; the best is invisible. Hard to make distinctive without crossing into "noisy."

**(b) Faint hand-drawn margin doodles around the edges only.** Center 70% featureless; margins carry small ink illustrations (astrolabe, dividers, scale, hourglass). **Pros:** visible character with zero conflict on the working area; matches the Natural-Philosophy Notebook signature; no tiling required (each is one-shot). **Cons:** at extreme pan/zoom the doodles disappear; works best with the doodles fixed-positioned outside the viewport coordinate system.

**(c) Cartographer's map texture (compass roses, latitude lines, terrain shading).** **Pros:** distinctive; reinforces "explore an argument" metaphor. **Cons:** the texture itself contains lines and shapes that compete with React Flow edges; gets gimmicky after 12 topics.

**(d) Manuscript page with faint ruled lines** at ~12% opacity. **Pros:** minimal visual weight; tileable as a horizontal stripe. **Cons:** ruled lines clash with curved edge paths; evokes school binder paper if not restrained.

**(e) Abstract ink-wash gradient** — a subtle radial wash, like watercolor bleeding from one corner (the body's existing LessWrong style, extended). **Pros:** zero linework conflict. **Cons:** least distinctive.

**Recommendation:** Combine **(a) + (b) + (e)** — a single full-canvas image that is mostly featureless parchment in the center 70%, has faint ruled lines or margin doodles only at the edges, and a soft ink-wash falloff toward the corners. This is one Image 2 generation per resolution, no tiling required.

## 3. The "Tileable Seamless" Challenge

GPT Image 2 does not natively generate seamlessly tileable images. Independent testers have confirmed that even with explicit "seamless tile, edges match" prompting, the model produces visible seams 70-80% of the time (consistent with the failure-mode catalogue in [the OpenAI dev community thread on iterative drift](https://community.openai.com/t/collection-of-gpt-image-generator-2-0-issues-bugs-and-work-around-tips-check-first-post/1379535)). Four workarounds, with trade-offs:

**(1) Generate large enough that no tiling is needed.** Image 2's reliable upper bound is 2560×1440 (2K), and 4K (4096×4096) is supported but slow. For Argumend's React Flow canvas — which a user can pan around — a single 2560×1440 image at `background-size: cover` covers ~95% of viewport sizes without visible repeat. Pan beyond the image, and the user just hits flat `#f4f1eb`. **Verdict: best ROI for v1.**

**(2) Post-process with seamless-pattern tools.** ImageMagick `-roll` + edge-blending, Photoshop's Filter → Other → Offset, or [Resynthesizer](https://github.com/bootchk/resynthesizer). Generate at 1024², offset 50%, heal the seam, save as a tile, use with `background-repeat: repeat`. **Verdict: 30 min of post-work; worth it for the body wash but overkill for the canvas.**

**(3) Small repeating motifs at low opacity.** A 256² motif (ink flourish, tiny astrolabe) tiled at 6-10% opacity — seams disappear at that brightness. **Verdict: good as a *secondary* layer, not the primary.**

**(4) Standard resolutions + responsive picture.** Generate at 1920×1080, 2560×1440, 3840×2160; serve via `<picture>` or `image-set()`. **Verdict: combine with (1) — 2K is the default, 4K for retina, skip 1080p.**

## 4. Argumend Canvas-Background Prompt Suite

Six pasteable Image 2 prompts targeting the Natural-Philosophy Notebook signature, optimized to *not* distract from foreground graph nodes. The shared constraint block is identical across all six and matches the locked signature snippets library from `01-gpt-image-2-visual-signature.md`:

```
A scanned 17th-century natural philosopher's notebook page. Background:
warm parchment cream #f4f1eb with subtle foxing, fine paper-grain
texture, gentle wear at the edges. The CENTER 70% of the image is
deliberately empty — featureless parchment, almost no detail —
because graph nodes will be rendered on top. All visual interest
lives in the OUTER 15% margins and corners only. Soft vignette
darkening at corners (drop ~8%). Color constraints: stone gray
#3d3a36 ink only. NO PURE BLACK. NO AMBER. NO YELLOW. NO TANGERINE.
NO NEON. NO MODERN UI ELEMENTS. NO GRID. NO DOTS. No text labels
larger than 6pt. Aspect ratio 16:9, 2560×1440. Single flat image,
no panels, no borders.
```

**Prompt 1 — "Empty Notebook Page" (the safest, default canvas).**

```
[shared constraints above]
PLUS: extremely subtle horizontal rule lines spanning full width at
12% opacity, EB Garamond italic stone gray, spaced ~80px apart in
the digital render. A single ink smudge in the lower-left margin.
The upper-right corner has a barely-visible page-curl shadow.
Nothing else. This is the resting state of the canvas — the page
before the philosopher writes on it.
```

**Prompt 2 — "Marginalia Frame" (for the home/featured topic canvas).**

```
[shared constraints above]
PLUS: in the top-LEFT corner only, a small hand-drawn ink astrolabe
(~120px), drawn with fine dip-pen linework, deep teal #3a6965
accents. In the bottom-RIGHT corner only, a small hand-drawn ink
weighing scale (~120px), same hand. Both corners 8% opacity. The
remaining 70% center area is empty parchment. Tiny EB Garamond
italic marginal note in lower-left reads "fig. I — the canvas".
```

**Prompt 3 — "Compass & Dividers" (for the explore/topics index canvas).**

```
[shared constraints above]
PLUS: top-RIGHT corner: small ink compass rose (~140px) at 10%
opacity, four cardinal points labeled N E S W in EB Garamond italic
stone gray. Bottom-LEFT corner: small drafting-dividers ink
illustration. The entire center 70% is featureless. Two faint ink
splatters scattered in the outer 15% — barely visible.
```

**Prompt 4 — "Hourglass & Quill" (for the debate/timeline canvas).**

```
[shared constraints above]
PLUS: top-RIGHT corner: small hand-drawn ink hourglass (~120px) at
9% opacity. Bottom-LEFT corner: a quill resting in an inkwell, same
hand, same opacity. Three barely-visible ink-wash dabs scattered
through the outer margin, deep-teal #3a6965 at 6% opacity. Center
70% empty.
```

**Prompt 5 — "Manuscript Fragment" (for the long-form/reading canvas).**

```
[shared constraints above]
PLUS: along the LEFT edge only, a vertical strip (~140px wide) of
faux-Latin handwritten manuscript text in EB Garamond italic stone
gray at 14% opacity, abstract enough that no real words are
legible. Right 80% of the canvas is empty parchment. Bottom-right
corner has a small wax-seal-style crimson #a23b3b dot at 50%
opacity (this is the only saturated color anywhere in the image).
```

**Prompt 6 — "Charcoal Leather" (the dark-mode pair for prompts 1-5).**

```
A scanned aged-leather notebook cover, deep ink-black #1a1917
background with very faint warm undertones, subtle scuff and
patina. The CENTER 70% is featureless dark leather — graph nodes
will render on top. Outer 15% margins carry a single hand-drawn
chalk-white astrolabe in the top-LEFT corner (~120px, 8% opacity)
and a chalk weighing scale in the bottom-RIGHT (same hand, same
opacity). All linework in cool stone-gray #b0a99f. NO PURE BLACK
ON BLACK. NO AMBER. NO NEON. Soft vignette darkening at corners.
Aspect ratio 16:9, 2560×1440.
```

Generate each at `quality="high"`, `size="1536x1024"` (Image 2's reliable landscape) and upscale in post to 2560×1440. Per-image cost $0.165, total for six prompts × 2 modes = ~$2.00.

## 5. React Flow Integration

React Flow's `<Background>` component supports the dot/line/cross variants, color, gap, size, lineWidth, and bgColor — but **not a custom image prop** (confirmed in [the React Flow docs](https://reactflow.dev/api-reference/components/background)). The clean integration path is to keep `<Background>` for a sparse dot overlay (or remove it entirely) and put the image on a wrapper div behind the React Flow viewport.

```tsx
// components/HomeClient.tsx (replace the canvas branch around line 297)

<div className="relative h-full">
  {/* Layer 0: the parchment background image, fixed under the canvas */}
  <div
    className="absolute inset-0 pointer-events-none select-none"
    style={{
      backgroundImage:
        "image-set(url('/images/canvas/canvas-bg-light.avif') type('image/avif'), " +
        "url('/images/canvas/canvas-bg-light.webp') type('image/webp'))",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundColor: "#f4f1eb",
      zIndex: 0,
      // crucial: keep nodes legible on top
      opacity: 0.85,
    }}
    aria-hidden
  />
  {/* Dark-mode pair via a sibling — Tailwind dark: cannot directly toggle image-set */}
  <div
    className="absolute inset-0 pointer-events-none select-none hidden dark:block"
    style={{
      backgroundImage:
        "image-set(url('/images/canvas/canvas-bg-dark.avif') type('image/avif'), " +
        "url('/images/canvas/canvas-bg-dark.webp') type('image/webp'))",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundColor: "#1a1917",
      zIndex: 0,
      opacity: 0.9,
    }}
    aria-hidden
  />

  {/* Layer 1: React Flow itself, transparent so the image shows through */}
  <ReactFlow
    className="h-full w-full"
    style={{ background: "transparent" }}
    nodes={nodes}
    edges={edges}
    nodeTypes={nodeTypes}
    /* …all existing props… */
  >
    {/* OPTIONAL: keep an ultra-faint dot grid on top of the parchment for spatial reference */}
    <Background
      color="#3d3a36"
      gap={GRAPH.GRID_GAP}
      size={0.8}
      variant={BackgroundVariant.Dots}
      style={{ opacity: 0.06 }}
    />
    {/* …MiniMap, ZoomIndicator, etc. as today… */}
  </ReactFlow>
</div>
```

**Z-index/opacity contract.** The wrapper div sits at `z-index: 0` and is `pointer-events-none` so React Flow still owns pan/zoom. React Flow's pane is transparent (`style={{ background: 'transparent' }}`), letting the parchment show through. Nodes render at React Flow's default node z-index (1000+), well above the background. Final image opacity is 0.85 in light mode, 0.90 in dark — slightly muted so the highest-contrast pixels of the parchment image (the edge doodles) never approach node legibility thresholds.

**Pan behavior.** `background-size: cover` on a fixed-position wrapper means the image stays put while the React Flow viewport pans through it. This is correct for our use case: the parchment is the *page*, not the *world*. If you want the parchment to pan *with* the graph (so the astrolabe in the top-left corner is genuinely "in the upper-left of the conceptual canvas"), you'd need a custom Background component that reads `useViewport()` and offsets via SVG `<pattern>` (the approach in the [xyflow custom-background discussion](https://github.com/xyflow/xyflow/discussions/2689)). Skip that for v1.

## 6. Performance Optimization

**Format priority.** AVIF first, WebP fallback, JPG last. AVIF achieves ~50% smaller files than JPEG and ~20-30% smaller than WebP at identical visual quality, with ~93-95% global browser support as of early 2026 ([dev.to AVIF 2026 guide](https://dev.to/aralroca/avif-in-2026-the-complete-guide-to-the-image-format-that-beat-jpeg-png-and-webp-34n2)). Switching to AVIF-first typically saves 60-80% bandwidth on hero/canvas images.

**File-size targets.**

| Asset | Format | Target size |
|---|---|---|
| Canvas background, 2560×1440 | AVIF | <100 KB |
| Canvas background, 2560×1440 | WebP | <180 KB |
| Canvas background, 2560×1440 | JPG (legacy fallback) | <250 KB |
| Section background, 1536×1024 | AVIF | <60 KB |
| Section background, 1536×1024 | WebP | <100 KB |

For the existing `lw-background.webp` (112 KB at unknown dimensions), an AVIF re-encode at the same perceptual quality would land near 60-70 KB.

**Encoding command (one-shot, requires `sharp` or `avifenc`).**

```bash
# AVIF — quality 60 is visually transparent for a low-contrast parchment
avifenc --min 30 --max 50 --speed 4 canvas-bg-light.png canvas-bg-light.avif

# WebP fallback — quality 78 is the sweet spot
cwebp -q 78 -m 6 canvas-bg-light.png -o canvas-bg-light.webp

# JPG legacy — only generate if you need <93% browser coverage
mozjpeg -quality 82 canvas-bg-light.png canvas-bg-light.jpg
```

**Picture element pattern (for hero images, blog posts, /about).**

```tsx
<picture>
  <source srcSet="/images/canvas/canvas-bg-light.avif" type="image/avif" />
  <source srcSet="/images/canvas/canvas-bg-light.webp" type="image/webp" />
  <img
    src="/images/canvas/canvas-bg-light.jpg"
    alt=""
    role="presentation"
    loading="lazy"
    decoding="async"
    className="absolute inset-0 w-full h-full object-cover"
  />
</picture>
```

**CSS `image-set()` pattern (for background-image surfaces — see the React Flow integration above).** `image-set()` is now the right tool for background images where `srcset` isn't available ([Savvy's image-set guide](https://savvy.co.il/en/blog/css/css-image-set-smart-fallbacks/)). All current evergreen browsers support it.

**Lazy loading + blur-up.** The canvas background is *above the fold* on the home view — do **not** lazy-load it; it should be in the critical path. Generate a 24×14 "blur-up" placeholder (encode with `sharp`'s `blur` + base64), inline it as `background-image` until the AVIF loads, then swap. For below-the-fold section backgrounds (footer, blog post hero past first viewport), `loading="lazy"` is correct.

**Preload hint** in `app/layout.tsx`:

```tsx
<link
  rel="preload"
  as="image"
  href="/images/canvas/canvas-bg-light.avif"
  type="image/avif"
  imageSrcSet="/images/canvas/canvas-bg-light.avif"
  fetchPriority="high"
/>
```

## 7. Light vs Dark Mode

Generate matched pairs. Naming convention: `canvas-bg-light.{avif,webp,jpg}` and `canvas-bg-dark.{avif,webp,jpg}`. Use Prompt 1-5 for light, Prompt 6's recipe (charcoal leather, chalk-white linework) for the dark twin of each.

**Switching strategy.** Two clean options:

1. **Sibling div + Tailwind `dark:` visibility toggle** (shown in Section 5). Two divs, each with its own image; only one is `display: block` at a time. Browser only network-fetches the one in scope (CSS `display:none` short-circuits image fetches in modern engines).

2. **CSS variable swap.**

   ```css
   :root {
     --canvas-bg-image: image-set(
       url('/images/canvas/canvas-bg-light.avif') type('image/avif'),
       url('/images/canvas/canvas-bg-light.webp') type('image/webp')
     );
   }
   .dark {
     --canvas-bg-image: image-set(
       url('/images/canvas/canvas-bg-dark.avif') type('image/avif'),
       url('/images/canvas/canvas-bg-dark.webp') type('image/webp')
     );
   }
   .canvas-bg {
     background-image: var(--canvas-bg-image);
     background-size: cover;
     background-position: center;
   }
   ```

   Cleaner but means *both* assets are referenced in CSS; some browsers preload both. Slight extra bytes; preferable if the same component is reused across many surfaces.

Recommend option (1) for the canvas wrapper and option (2) for the body's `body::after` watercolor wash (replacing the current single `lw-background.webp` reference with a CSS-variable pair).

## 8. Page-Section Backgrounds

Beyond the canvas, the same prompt library scales to every other surface. Concrete plan:

| Surface | File | Recommended archetype | Prompt base | Asset spec |
|---|---|---|---|---|
| Body wash (replaces `lw-background.webp`) | `body-wash-light.{avif,webp}` | (e) ink-wash gradient | corner watercolor bleed, top-right, deep teal #3a6965, soft falloff | 1920×1080, AVIF <80 KB |
| `Footer.tsx:37` | `footer-bg-light.{avif,webp}` | (a) parchment + (b) doodle | a single ink quill-and-inkwell illustration in the lower-right margin, rest empty | 1536×400, AVIF <40 KB |
| `FeaturedTopicHero.tsx:66` | `hero-bg-light.{avif,webp}` | (b) margin doodles + (e) wash | astrolabe upper-left, crimson wax seal lower-right, subtle teal wash | 1920×800, AVIF <70 KB |
| Blog post hero (`/blog/[slug]`) | `blog-hero-{slug}.{avif,webp}` | (b) margin doodles, varied artifact per post | one of: dividers, hourglass, manuscript, sealing wax, quill | 1536×768, AVIF <60 KB each |
| `/about` full-page | `about-bg-light.{avif,webp}` | (a) + (b) parchment with three corner artifacts | astrolabe + scale + compass at three corners | 1920×1200, AVIF <90 KB |
| `/explore` and `/topics` index | reuse `canvas-bg-light` | same as canvas | — | — |

**Implementation pattern for section backgrounds.** Add a reusable component:

```tsx
// components/SectionBackground.tsx
export function SectionBackground({ variant }: { variant: "hero" | "footer" | "blog" | "about" }) {
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          backgroundImage: `image-set(url('/images/sections/${variant}-bg-light.avif') type('image/avif'), url('/images/sections/${variant}-bg-light.webp') type('image/webp'))`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.9,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none -z-10 hidden dark:block"
        style={{
          backgroundImage: `image-set(url('/images/sections/${variant}-bg-dark.avif') type('image/avif'), url('/images/sections/${variant}-bg-dark.webp') type('image/webp'))`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.9,
        }}
      />
    </>
  );
}
```

Drop into any section: `<section className="relative …"><SectionBackground variant="hero" />…content…</section>`. Three lines of integration per surface.

## 9. Cost & Cadence

**Full background set, one-time generation.**

| Asset class | Count | Quality | Size | Per-image cost | Subtotal |
|---|---|---|---|---|---|
| Canvas backgrounds (light + dark, 6 prompts each) | 12 | high | 1536×1024 | $0.165 | $1.98 |
| Body wash pair | 2 | high | 1536×1024 | $0.165 | $0.33 |
| Footer pair | 2 | medium | 1536×1024 | $0.041 | $0.08 |
| Hero pair | 2 | high | 1536×1024 | $0.165 | $0.33 |
| Blog hero artifact set (8 variants × 2 modes) | 16 | medium | 1536×1024 | $0.041 | $0.66 |
| About page pair | 2 | high | 1536×1024 | $0.165 | $0.33 |
| Re-roll buffer (~30%) | — | — | — | — | $1.11 |
| **Total** | **36 useful + buffer** | | | | **~$4.82** |

Even at 5× the volume the spend is under $25. Constraint isn't dollars, it's the 4-6 hours of post-processing labor (levels, sharpening, AVIF encode, blur-up placeholder per image). Build the Photoshop/Affinity action once; the remaining work is mechanical.

**Cadence.** This is a one-time job for v1. Future cadence: regenerate the canvas pair if the brand evolves (annual at most), and add one new blog-hero-artifact variant per blog post (cost: $0.041 + 5 minutes of post). Argumend's 50-image/month budget from the visual-signature memo absorbs this without negotiation.

---

## Sources

- [React Flow — The Background component](https://reactflow.dev/api-reference/components/background)
- [React Flow — BackgroundVariant type](https://reactflow.dev/api-reference/types/background-variant)
- [xyflow GitHub — Custom background component discussion #2689](https://github.com/xyflow/xyflow/discussions/2689)
- [Robin Wieruch — How to use React SVG Patterns as Backgrounds](https://www.robinwieruch.de/react-svg-patterns/)
- [dev.to — AVIF in 2026: The Complete Guide](https://dev.to/aralroca/avif-in-2026-the-complete-guide-to-the-image-format-that-beat-jpeg-png-and-webp-34n2)
- [Savvy — CSS image-set for Better Images and Fallback Support](https://savvy.co.il/en/blog/css/css-image-set-smart-fallbacks/)
- [Compresto — AVIF vs WebP 2026](https://compresto.app/blog/avif-vs-webp)
- [MDN — Image file type and format guide](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types)
- [OpenAI Cookbook — GPT Image Models Prompting Guide](https://developers.openai.com/cookbook/examples/multimodal/image-gen-models-prompting-guide)
- [OpenAI Developer Community — gpt-image-2 issues, bugs, workarounds](https://community.openai.com/t/collection-of-gpt-image-generator-2-0-issues-bugs-and-work-around-tips-check-first-post/1379535)
- Internal: `01-gpt-image-2-visual-signature.md` (visual-design swarm) — locked Natural-Philosophy Notebook signature
- Internal: `components/HomeClient.tsx:316-322` (current React Flow Background usage)
- Internal: `app/globals.css:101-129, 731-733` (current body wash + canvas dot opacity)

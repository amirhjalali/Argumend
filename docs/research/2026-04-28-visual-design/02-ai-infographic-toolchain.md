# AI Infographic Toolchain — April 2026

**Date:** 2026-04-28
**Analyst:** Research agent 02/10, visual-design swarm
**Topic:** Comparing GPT Image 2.0, Midjourney v8, Recraft v4, Ideogram v3, Krea, and Adobe Firefly Image 4 for explainer infographics — with a recommended Argumend pipeline.

## 1. The 2026 toolchain landscape

The image-generation space went through a hard re-shuffle in Q1–Q2 2026. By April, six tools dominate the conversation for serious explainer/infographic work, and the order is meaningfully different from late 2025.

The single biggest shift: **GPT Image 2** ([gpt-image-2](https://community.openai.com/t/introducing-gpt-image-2-available-today-in-the-api-and-codex/1379479)), released **April 21, 2026** with a +242 Elo lead in text-to-image arena ([Latent.Space launch coverage](https://www.latent.space/p/ainews-openai-launches-gpt-image)). It is the first image model with native "thinking" — a reasoning pass before the diffusion pass — and it brought legible body text to the median diffusion output for the first time. [TechCrunch's launch piece](https://techcrunch.com/2026/04/21/chatgpts-new-images-2-0-model-is-surprisingly-good-at-generating-text/) led with a Mexican-restaurant menu rendered without a single misspelling — two years after DALL-E 3 produced "enchuita" and "churiros" on the same prompt. **Recraft v4** (Feb 2026) remains the only model that emits *production-grade native SVG* — not vectorized raster — making it the structurally correct pick for any output that needs to be edited in Figma or Illustrator. **Midjourney v8 Alpha** shipped March 17, 2026, with **v8.1 preview April 14, 2026** ([Midjourney updates](https://www.midjourney.com/updates), [Geeky Gadgets](https://www.geeky-gadgets.com/midjourney-v8-release-date/)) — 5× faster than v7, native 2K, and finally usable text rendering when prompts use quotation marks. The v7 era is effectively over for new work.

| Tool | Latest version | Released | Native text | Vector export | Editability | Batch consistency | API | Cost per image |
|---|---|---|---|---|---|---|---|---|
| **GPT Image 2** | gpt-image-2 | Apr 21 2026 | **Best in class** — multilingual, small text, dense layouts | None (PNG/WebP only) | Inpainting via API; reference-image conditioning | Up to 8 coherent images per prompt; reasoning pass holds layout | Yes — `gpt-image-2` in OpenAI API + Codex | $0.01–$0.02 (low), ~$0.053 (medium), $0.165–$0.211 (high 2K) ([Nemovideo breakdown](https://www.nemovideo.com/blog/gpt-image-2-pricing-breakdown)) |
| **Midjourney v8 / v8.1** | v8.1 alpha | Apr 14 2026 | Quoted-text mode legible at poster scale | None | Vary Region, Pan, Style Refs (--sv 6) | Strong with `--sref` and `--cref` moodboards | **No official API** — Discord/web only; 3rd-party proxies (EvoLink, MidAPI) | Subscription only: $10–$120/mo; ~$0.015/image via MidAPI ([LinkrAPI](https://linkrapi.com/blog/midjourney-api-pricing)) |
| **Recraft v4 / v4 Pro** | V4 Pro Vector | Feb 2026 | Clear, legible — scales to print | **Native SVG** (only model that does this) + PNG/PDF/Lottie | Editable vector paths; Recraft Studio canvas; Figma plugin | Style sets, brand palettes, repeatable templates | Yes — Recraft API + [Replicate](https://replicate.com/recraft-ai/recraft-v4-pro-svg) + WaveSpeed | 2 credits per vector (Pro Vector ~45s); $48/mo Pro = 8,400 credits |
| **Ideogram v3** | V3 Quality / Default / Turbo | Mar 2025, refreshed 2026 | Strong on short/medium copy; weaker on dense paragraphs | None | Magic Fill, Edit, Canvas | Good with style references | Yes — from $15/mo Plus tier, Together AI, Kie.ai | $7/$15/$48 monthly tiers ([Ideogram pricing](https://ideogram.ai/features/api-pricing)) |
| **Krea Image** | Krea 1 + 64-model aggregator | 2026 redesign Mar 2026 | Variable (depends which underlying model) | None directly | **Realtime Canvas** (50ms feedback), Nodes workflow automation | Cross-model consistency via Realtime Canvas | API via aggregator; native Nodes | $9/$35/$70 monthly ([Krea pricing](https://www.krea.ai/pricing)) |
| **Adobe Firefly Image 4** | Image Model 4 + Vector Model 2 | 2026 | Solid typography rendering | **Yes — Vector Model 2** emits editable Illustrator paths | Photoshop/Illustrator round-trip, Generative Fill/Expand | Strong with brand kits | Yes — $0.02–$0.10/img, ~$1k/mo enterprise minimum ([SudoMock](https://sudomock.com/blog/adobe-firefly-api-pricing-2026)) | $9.99 Standard / $19.99 Pro / $199.99 Premium |

**The hierarchy for explainer infographics in April 2026:**

1. **Text-heavy single panels** → GPT Image 2 (best text), then Ideogram v3, then Midjourney v8 quoted-text mode.
2. **Anything that needs to be edited in Figma/Illustrator** → Recraft v4 Pro Vector or Adobe Firefly Vector Model 2. Nothing else emits real SVG.
3. **Brand-consistent batch production** → Recraft (style sets) or Midjourney v8 (`--sref`/moodboards).
4. **Realtime ideation** → Krea Realtime Canvas. Useless for finals; brilliant for sketching the layout.
5. **Adobe Creative Cloud shops** → Firefly stays competitive purely because it's inside Photoshop/Illustrator.

## 2. Infographic-specific capabilities

The five things an explainer infographic actually needs are: **legible body text inside the image, accurate charts/graphs, multi-panel layouts, isometric diagrams, and flow charts**. No model does all five well. The 2026 reality is brutally specialized:

| Capability | Best | Acceptable | Avoid |
|---|---|---|---|
| Legible body text (≤8pt at 2K) | **GPT Image 2** ([techcrunch demo](https://techcrunch.com/2026/04/21/chatgpts-new-images-2-0-model-is-surprisingly-good-at-generating-text/), [fal prompting guide](https://fal.ai/learn/tools/prompting-gpt-image-2)) | Ideogram v3 Quality, Recraft v4 Pro | Midjourney v7 and earlier |
| Accurate charts/graphs (real data) | **None** — all hallucinate axis values | GPT Image 2 for *fake-but-plausible* charts | Diffusion models for real data — always compose in Figma |
| Multi-panel layouts (3×3 grid, comic) | **GPT Image 2** (8-image coherent batch + reasoning pass holds grid) | Midjourney v8 with explicit prompt | Krea, Firefly |
| Isometric diagrams | **Midjourney v8** (aesthetic) tied with **Recraft v4 Vector** (editable) | Ideogram, Firefly | GPT Image 2 (loses 3D consistency) |
| Flow charts / node-edge diagrams | **Recraft v4 Vector** (only viable for editable) | GPT Image 2 (raster only, but legible) | Midjourney (decorative arrows, not real edges) |

Real-world evidence collected for this brief:

- **Multi-panel + dense text:** [@flowersslop, @WolfRiccardo, @MrLarus on the awesome-gpt-image collection](https://github.com/ZeroLu/awesome-gpt-image/) demonstrate GPT Image 2 holding museum-catalog layouts with "structural disassembly and material annotations" and Chinese-character e-commerce app homepages with exact pricing — the kind of dense composition Midjourney v7 simply could not.
- **Native SVG output:** [Recraft V4 on Replicate](https://replicate.com/recraft-ai/recraft-v4-pro-svg) ships SVG that opens directly in Figma with editable paths and live text layers. The Recraft Figma plugin closes the loop.
- **Quoted-text typography:** [Midjourney v8.1's geeky-gadgets writeup](https://www.geeky-gadgets.com/midjourney-v8-release-date/) shows readable street signs, clean product labels, legible book covers — but it still loses small caption text.
- **Real-time iteration:** [Krea's Realtime Canvas](https://www.krea.ai/) renders in <50ms, the only credible option for live "draw a fallacy taxonomy and watch it style itself" workflows.
- **Aesthetic comparison:** Independent reviewers ([10b.ai's GPT Image 2 explainer](https://10b.ai/blog/what-is-gpt-image-2-2026), [createvision.ai guide](https://createvision.ai/guides/gpt-image-2-complete-guide)) consistently note that GPT Image 2 produces *practical, productive* outputs — UI mocks, documentation visuals, infographics — at the cost of the painterly Midjourney aesthetic.

## 3. The "GPT Image 2 as illustrator + Figma as composer" workflow

The dominant pattern emerging in April 2026 — popularized by Visual Electric, Figma's Workflow Lab post, and an ongoing thread of "Claude Design vs Figma" posts ([Lenny's newsletter](https://www.lennysnewsletter.com/p/what-claude-design-is-actually-good)) — is **not** "AI generates the entire infographic." It's:

1. **Generate illustration assets** in GPT Image 2 (or Midjourney for aesthetic, Recraft for vector).
2. **Compose** in Figma, Affinity Designer, or Adobe Illustrator.
3. **Set type** in the design tool, never in the AI.
4. **Export** print/web from the design tool.

**Why this beats end-to-end AI:**

| Pros | Cons |
|---|---|
| Type is real text, not an image of text — accessible, searchable, infinitely editable | Two-tool workflow; longer per-asset |
| Brand-locked colors, type, spacing | Requires Figma fluency |
| Iterative tweak without re-generating ($0.05+ per re-roll) | Not zero-shot — humans still composing |
| Charts use actual data via Figma plugins (Datavizly, Charts plugin) | AI-illustrated bits can clash if not curated |
| Multi-format export (SVG, PNG, PDF, social sizes) from one source of truth | Larger time investment per asset |

**Estimated production time, single explainer infographic, this workflow:**

| Phase | Time |
|---|---|
| Brief + outline | 15 min |
| Generate 4–8 illustration variants (GPT Image 2 medium quality) | 5 min wall, ~$0.20 spend |
| Pick + Figma compose | 30–45 min |
| Type, layout, accessibility check | 20 min |
| Export, name, version | 5 min |
| **Total** | **~90 min per polished infographic** |

By comparison, end-to-end Ideogram or Midjourney v8 with no Figma pass: 15–30 minutes but with text issues, no real chart data, no brand consistency, and no editable source. The Figma-as-composer workflow is what scales past one-off social posts.

## 4. Argument-mapping use cases — five Argumend infographics

Below: five explicit infographic types Argumend produces (or should), with the right tool, prompt skeleton, and time estimate.

| # | Infographic | Best tool | Prompt skeleton | Compose in | Time |
|---|---|---|---|---|---|
| **a** | **Fallacy taxonomy poster** — 24 fallacies in a 6×4 grid, each with icon + name + one-line definition | **GPT Image 2** (text!), then Figma type override | `"24-cell grid poster of logical fallacies, stoic parchment palette (#f4f1eb bg, #3a6965 teal accents, #C4613C rust). Each cell: small icon, fallacy name in EB Garamond serif, one-line definition. EXACT TEXT for cell 1: 'Ad Hominem'. EXACT TEXT for cell 2: '...'. No duplicate text. 2K resolution."` | Figma — replace AI text with real type, lock palette | 2 hr |
| **b** | **Anatomy of an argument cutaway** — labelled cross-section of a single argument showing premise → evidence → counter → crux | **Midjourney v8** (`--sref` Argumend palette, isometric aesthetic) for the illustration; **Recraft v4 Vector** for editable callouts | `"Isometric exploded diagram of an argument structure, layered like an anatomy textbook cutaway, parchment beige background, deep teal #3a6965 and rust #C4613C accents. Five labeled layers: premise, evidence, counter, crux, conclusion. EB Garamond serif labels --ar 4:5 --sref ARGUMEND_BRAND --v 8.1"` | Figma — overlay clean SVG callouts from Recraft | 2.5 hr |
| **c** | **Crux comparison chart** — 3-column comparison of three positions on a topic, with crux row highlighted in crimson | **Recraft v4 Vector** (editable table, then drop into Figma) | `"3-column comparison table SVG, parchment bg #f4f1eb, header row deep teal #3a6965, crux row crimson #a23b3b. Three positions: 'Pro', 'Skeptic', 'Synthesis'. Rows: claim, evidence, crux, fallacy risk. Clean serif typography. Native SVG."` | Figma — paste SVG, type the actual content per topic | 1.5 hr |
| **d** | **Evidence-strength visualization** — radial dial / weight visualization with confidence ring | **Krea Realtime Canvas** for ideation, then **Recraft v4 Vector** for final | `"Radial confidence dial, parchment palette, deep teal arc filling 0-100%, with concentric rings labeled 'weak / moderate / strong / overwhelming'. Native SVG, no extraneous decoration."` | Figma — bind dial fill to real confidence variable via Variables API | 1 hr |
| **e** | **Topic landscape map** — bird's-eye node-link of 109 Argumend topics clustered by domain | **Recraft v4 Vector** for nodes/clusters, layout in Figma + auto-layout (or D3) | `"Bird's-eye view diagrammatic map of debate topics, organic clusters on parchment background, deep teal nodes with rust connecting edges, hand-drawn cartography aesthetic. SVG output, vector paths editable. EB Garamond labels for cluster names."` | Figma — programmatic node placement via plugin | 3 hr |

## 5. Hybrid pipelines — concrete how-tos

**Pipeline A: Recraft → SVG → Figma (editable vector pipeline)**
1. Generate in Recraft v4 Pro Vector (`/v4/text-to-vector` API, ~45s, 2 credits).
2. Click "Download SVG" — Recraft emits real `<path>` and `<text>` elements, not raster traces.
3. In Figma, **File → Import** the SVG. Each path becomes a Figma layer. Text remains live.
4. Apply Argumend Variables (color tokens, type styles).
5. Export PNG (2×) for web, PDF for print, SVG for embedding.
**Time:** ~20 min illustration + 30 min compose. **Cost:** ~$0.02 per generation. The Recraft Figma plugin ([community.figma.com/plugin/1613917155067897575](https://www.figma.com/community/plugin/1613917155067897575/ai-image-generator-recraft)) skips steps 2–3.

**Pipeline B: Midjourney → Photoshop layer comp → export (aesthetic pipeline)**
1. Midjourney v8 prompt with `--sref` brand reference + `--ar 16:9 --v 8.1`.
2. Upscale 2× to 4K.
3. Photoshop: **Generative Fill** (Firefly Image 4 inside PS) to extend background, remove artifacts, mask out incorrect text.
4. Layer real type in Photoshop (Argumend uses EB Garamond + Plus Jakarta Sans).
5. Export PNG/JPG, optionally PDF.
**Time:** ~30 min illustration + 45 min cleanup + composition. **Cost:** Midjourney Standard $30/mo flat. **Best for:** hero images, blog headers, social posts. **Worst for:** anything that needs editable structure.

**Pipeline C: Ideogram → direct (zero-touch pipeline)**
1. Ideogram v3 Quality with the full text spec in the prompt.
2. Download PNG.
3. Post.
**Time:** ~5 min. **Cost:** $0.01–$0.04 per image. **Best for:** Twitter/X cards, quick quote graphics. **Worst for:** anything where the type might need updating later — you'll re-roll the whole image.

## 6. Templates and reusable assets

The trap of any AI image pipeline is **regenerating end-to-end every time**. For 4 infographics/week (Argumend's likely cadence), end-to-end is irrational: every regenerate costs another $0.05–$0.20 *and* loses the brand alignment you finally got right last time.

The pattern that wins is a **Figma template library** with AI illustrations as **drop-in slots**. Think of the AI tools as suppliers of decorative imagery, not page builders.

| Asset class | Source | Reusable? | How it scales |
|---|---|---|---|
| Page chrome (logo, footer, watermark) | Figma component | Always | Locked once, version with brand updates |
| Type styles (H1/H2/body/caption) | Figma styles | Always | One change → propagates everywhere |
| Color tokens (#f4f1eb, #3a6965, #C4613C, #a23b3b, #8B5A3C) | Figma Variables | Always | Light/dark mode swaps automatically |
| Layout grids (12-col, 6×4 fallacy grid, 3-col compare) | Figma autolayout templates | Always | New topic = duplicate template, swap content |
| Icon set (24 fallacy icons, 5 node types) | Recraft v4 Vector batch, saved as Figma library | Yes | Generated once, used across 100+ infographics |
| Hero illustrations | GPT Image 2 / Midjourney v8 per infographic | Sometimes | Built per infographic, occasionally re-skinned |
| Charts/graphs (real data) | Figma Charts plugin or D3 | Yes | Templated, data-driven |

**The unlock:** spend one weekend generating 24 fallacy icons in Recraft v4 Vector with a locked style reference (~$10 in credits, ~3 hours), import to Figma as a published library, and *every* future fallacy infographic is 80% complete on the first click. This is what scales.

## 7. Recommended Argumend workflow

```
┌─────────────────────────────────────────────────────────────────────┐
│ ARGUMEND INFOGRAPHIC PIPELINE — APRIL 2026                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Brief (15m)  →  Tool selection                                     │
│                  ├─ Text-heavy single panel? → GPT Image 2          │
│                  ├─ Editable diagram? → Recraft v4 Vector           │
│                  ├─ Hero/aesthetic?   → Midjourney v8.1             │
│                  └─ Quick social?     → Ideogram v3 (rare)          │
│                                                                     │
│       ↓                                                             │
│                                                                     │
│  AI generation (5–10m, $0.05–$0.30)                                 │
│       ↓                                                             │
│                                                                     │
│  Figma composition (30–60m)                                         │
│  • Drop into Argumend template (6×4 fallacy grid, 3-col compare,    │
│    radial dial, anatomy cutaway, topic map)                         │
│  • Replace AI-text with real EB Garamond / Plus Jakarta             │
│  • Apply color tokens (Variables)                                   │
│  • Pull icons from published Argumend Icons library                 │
│       ↓                                                             │
│                                                                     │
│  Export (5m)                                                        │
│  • PNG @2× for web, OG images                                       │
│  • SVG for blog inline                                              │
│  • PDF for print/lead-mag                                           │
│  • Social crops (1:1, 16:9, 4:5, 9:16) via Figma "Export as"        │
│       ↓                                                             │
│                                                                     │
│  File: argumend-infographic-YYYYMMDD-{topic}-{type}-{version}.{ext} │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Tool roles, locked:**

| Use | Tool | Why |
|---|---|---|
| Hero illustrations, blog headers, social cards | **Midjourney v8.1** | Best aesthetic, brand-consistent via `--sref` |
| Text-heavy infographics, fallacy posters, comparison sheets | **GPT Image 2** medium quality | Best text, dense layouts, multi-panel |
| Editable diagrams, icons, taxonomy items | **Recraft v4 Pro Vector** | Only model with real SVG output; Figma-native |
| Page composition + final type | **Figma** | Always — never trust AI for live type |
| Charts with real data | **Figma + Datavizly/Charts plugin** | Never trust AI for axes/values |
| Realtime ideation | **Krea Realtime Canvas** | When stuck on layout, sketch in <50ms |
| Photoshop cleanup of MJ outputs | **Adobe Firefly Image 4** in PS | Generative Fill is genuinely good |

**Weekly cadence (4 infographics/week, the agreed Argumend rate):**

| Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|
| Brief + outline 4 pieces (~1 hr total) | Generate AI assets for all 4 (~30 min) | Compose infographic 1 + 2 in Figma | Compose 3 + 4 in Figma | QA, export, schedule, post |

**Asset library structure (Figma + Drive):**

```
Argumend Design System/
├── 01_Brand/            (logo, type, colors, voice)
├── 02_Templates/        (6×4 fallacy grid, 3-col compare, anatomy
│                         cutaway, radial dial, topic landscape)
├── 03_Components/       (RichNode, EvidenceNode, CruxNode visualizations)
├── 04_Icon_Library/     (24 fallacies, 5 node types, scoring badges)
├── 05_Illustrations/    (Midjourney/GPT-2 outputs, tagged by topic)
└── 06_Exports/YYYY-MM/  (versioned final outputs by month)
```

**Naming convention:** `argumend-{type}-{topic_id}-{YYYYMMDD}-v{n}.{ext}`
e.g. `argumend-fallacy-poster-073-20260428-v2.png`

## 8. Cost model — 4 infographics/week

Assume 4 infographics/week × 4 weeks = **16 infographics/month**, average pipeline = 1 GPT Image 2 generation (medium qual) + 1 Recraft Vector generation + 1 Midjourney generation + Figma composition.

| Line item | Cost | Notes |
|---|---|---|
| **Midjourney Standard** | $24/mo (annual) or $30 monthly | Unlimited Standard, ~16 hero generations + drafts |
| **GPT Image 2** | ~$2/mo | 16 medium-quality + 30 low-quality drafts at $0.053/$0.015 |
| **Recraft v4 Pro** | $48/mo | 8,400 credits = 4,200 vector images headroom |
| **Adobe Creative Cloud** (Photoshop, Illustrator, Firefly Pro) | $54.99/mo (Photography) or $19.99 Firefly Pro standalone | Pick Firefly Pro standalone if no Photoshop need |
| **Figma Professional** | $15/mo per editor | Variables, libraries, dev mode |
| **Krea Basic** (optional, ideation only) | $9/mo | 5,000 credits, real-time canvas |
| **Ideogram Plus** (optional, fallback) | $15/mo | Only if specific text-poster runs need re-rolling |
| **Total — recommended baseline** | **~$112/mo** | Midjourney + GPT-2 + Recraft + Firefly + Figma |
| **Total — lean** | **~$80/mo** | Drop Adobe; use only Recraft + GPT-2 + Figma + Midjourney annual |
| **Total — maximalist** | **~$155/mo** | Add Krea + Ideogram for niche cases |

**Per-infographic blended cost: ~$5–$7** at recommended baseline. Below the cost of a single licensed stock illustration, with 100% original output and full editability.

## 9. Final summary

**Recommended pipeline:** **GPT Image 2 (text-heavy) + Recraft v4 Pro Vector (editable diagrams) + Midjourney v8.1 (hero aesthetic) → Figma composition → versioned exports.** Build the icon and template libraries in Figma once, treat AI tools as illustrators not page-builders, and never let live type sit inside an AI-generated raster. Total cost ~$112/mo for 16 infographics, ~$5–$7 per polished piece. Time to ship a single explainer infographic: ~90 min.

**Three next-step actions:**

1. **This week — generate the 24 fallacy icons.** One Recraft v4 Pro Vector batch with a locked `--sref` of Argumend's parchment/teal palette. Cost: <$10. Output: a Figma library that 80%-completes every future fallacy graphic. Highest-leverage asset Argumend can build in a day.
2. **Within two weeks — build five Figma templates.** Fallacy poster (6×4), crux comparison (3-col), anatomy cutaway, radial confidence dial, topic landscape. Each becomes a 5-minute "duplicate, swap content" job for new topics.
3. **Test GPT Image 2 against Recraft on the same brief.** Pick one topic from `data/topics.ts`, generate the same fallacy poster in both. Pick a winner and lock it as the in-house default. The +242 Elo lead suggests GPT Image 2 wins on text density — but Recraft wins on editability. Argumend should know which axis matters more *for them* before committing.

## Sources

- [OpenAI — gpt-image-2 announcement](https://community.openai.com/t/introducing-gpt-image-2-available-today-in-the-api-and-codex/1379479)
- [TechCrunch — ChatGPT Images 2.0 review (Apr 21 2026)](https://techcrunch.com/2026/04/21/chatgpts-new-images-2-0-model-is-surprisingly-good-at-generating-text/)
- [Latent.Space — GPT Image 2 launch coverage](https://www.latent.space/p/ainews-openai-launches-gpt-image)
- [GPT Image 2 prompting guide — fal.ai](https://fal.ai/learn/tools/prompting-gpt-image-2)
- [Awesome GPT Image — community prompt collection](https://github.com/ZeroLu/awesome-gpt-image/)
- [GPT Image 2 pricing breakdown — Nemovideo](https://www.nemovideo.com/blog/gpt-image-2-pricing-breakdown)
- [OpenAI API pricing](https://openai.com/api/pricing/)
- [Recraft V4 docs](https://www.recraft.ai/docs/recraft-models/recraft-V4)
- [Recraft V4 review — Replicate blog](https://replicate.com/blog/recraft-v4)
- [Recraft V4 Pro SVG on Replicate](https://replicate.com/recraft-ai/recraft-v4-pro-svg)
- [Recraft Figma plugin](https://www.figma.com/community/plugin/1613917155067897575/ai-image-generator-recraft)
- [Recraft pricing](https://www.recraft.ai/pricing)
- [Midjourney V8 features and pricing — WaveSpeedAI](https://wavespeed.ai/blog/posts/what-is-midjourney-v8-features-pricing-how-to-use-2026/)
- [Midjourney V8 release — Geeky Gadgets](https://www.geeky-gadgets.com/midjourney-v8-release-date/)
- [Midjourney updates page](https://www.midjourney.com/updates)
- [Midjourney API pricing 2026 — LinkrAPI](https://linkrapi.com/blog/midjourney-api-pricing)
- [Ideogram V3 features](https://ideogram.ai/features/3.0)
- [Ideogram API pricing](https://ideogram.ai/features/api-pricing)
- [Ideogram V3 review — pxz.ai](https://pxz.ai/blog/ideogram-ai-review-2026)
- [Krea pricing](https://www.krea.ai/pricing)
- [Krea homepage](https://www.krea.ai/)
- [Adobe Firefly what's new](https://helpx.adobe.com/firefly/web/whats-new/new-features/whats-new.html)
- [Adobe Firefly 2026 guide — AI Tools DevPro](https://aitoolsdevpro.com/ai-tools/adobe-firefly-guide/)
- [Adobe Firefly API pricing — SudoMock](https://sudomock.com/blog/adobe-firefly-api-pricing-2026)
- [Adobe Firefly all-in-one studio announcement (Feb 2026)](https://blog.adobe.com/en/publish/2026/02/02/create-unlimited-generations-adobe-firefly-all-in-one-creative-ai-studio)
- [Figma Workflow Lab — AI image tooling](https://www.figma.com/blog/workflow-lab-ai-image-tooling/)
- [What Claude Design is actually good for — Lenny's Newsletter](https://www.lennysnewsletter.com/p/what-claude-design-is-actually-good)
- [GPT Image 2 use cases — MindStudio](https://www.mindstudio.ai/blog/gpt-image-2-use-cases)
- [What is Recraft V4 Vector — MindStudio](https://www.mindstudio.ai/blog/what-is-recraft-v4-vector-generate-svg-logos-icons-ai)
- [Recraft V4 review — Pasquale Pillitteri](https://pasqualepillitteri.it/en/news/769/recraft-ai-v4-review-2026-vector-svg-midjourney-dalle)
- [Best AI image models 2026 — Atlas Cloud](https://www.atlascloud.ai/blog/guides/best-ai-image-generation-models-2026)
- [Visual Electric review 2026](https://raitly.com/tool/visual-electric)

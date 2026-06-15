# Prompt Library + Style Locking + Cost Model — The Discipline Layer

**Date:** 2026-04-28
**Analyst:** Research agent 07/7, Codex image-pipeline swarm
**Brief:** A maintained prompt library, anchor scaffold, drift detector, and cost model that keep every Codex-generated GPT Image 2.0 output locked to Argumend's Natural-Philosophy Notebook signature across hundreds of images and signature versions.

## 1. The Drift Problem

Drift is the dominant failure mode for any team generating more than ~30 images on a model. It accumulates silently across batches. Typeface and Toolient identify two layers: **style drift** (lighting warms, line weight thickens, negative space fills) and **product drift**, "worse than style drift — the model can keep the mood while subtly changing the object" so the logomark's proportions migrate over time ([Typeface — AI Brand Management](https://www.typeface.ai/blog/ai-brand-management-how-to-maintain-brand-consistency-with-ai-image-generators), [Toolient — Consistent Brand Visuals](https://www.toolient.com/2026/03/ai-image-generation-ecommerce-brand-visuals.html)). MindStudio's batch guide: "when you create images over weeks or months, styles drift" — the only countermeasure is "generating all assets in a single session with locked parameters" + "documenting model versions used for each batch" ([MindStudio — Batch AI Image Generation](https://www.mindstudio.ai/blog/batch-ai-image-generation-hundreds-visuals-minutes)).

Mature 2025-2026 brand teams converged on the same architecture across different products:

- **Adobe Firefly Style Kits / Style IDs** "enable scaling content creation while maintaining brand consistency by learning your brand's rules… colors, logos, typography, editorial voice" ([Adobe — Style Kits](https://helpx.adobe.com/firefly/web/work-with-enterprise-features/collaborate-using-style-kits/style-kits-overview.html), [Custom Models](https://business.adobe.com/products/firefly-business/custom-models.html)).
- **Canva Magic Design** uses **template locks**: "Locks help maintain consistency by preventing changes to key elements… locked elements stay protected during AI generation" ([Canva — Locks](https://www.canva.com/help/brand-template-locks/)).
- **Anthropic Claude Design** (2026-04-17) ingests codebase + design files at onboarding to extract palette, typography, components, layout, then reapplies per project ([Anthropic — Claude Design](https://www.anthropic.com/news/claude-design-anthropic-labs)).
- **Linear-style design teams** treat the brand as a structured system of design tokens — hex codes, type scales, spacing, motion — that AI reads from rather than improvises around ([UXPin](https://www.uxpin.com/studio/blog/ai-design-systems-consistency-simple/)).
- **Coframe** reported a **26% improvement** in visual consistency and layout accuracy after vision fine-tuning ([Encord](https://encord.com/blog/vision-fine-tuning-with-openais-gpt-4/)) — the only quantitative result in this sweep.

Shared lesson: **drift is solved by structure, not prose.** Argumend needs that discipline as code in `lib/visual/`.

## 2. Style-Locking Techniques in GPT Image 2.0

OpenAI's cookbook does not document a `seed` parameter for `gpt-image-2`, and there is no public negative-prompt flag. The mechanisms that actually work:

**(a) Verbatim preserve fragments.** OpenAI's guide says to "repeat the preserve list on each iteration to reduce drift" and "describe what must stay consistent (style cues) and what must change (new content)" ([OpenAI Cookbook](https://developers.openai.com/cookbook/examples/multimodal/image-gen-models-prompting-guide)). The same fragments — palette hex codes, line-weight language, negative-space ratio — go in every prompt, byte-for-byte identical.

**(b) Reference-image inputs (multi-image consistency).** gpt-image-2's native style-locking primitive. The cookbook teaches indexed referencing: "Reference each input by index and description (e.g., 'Image 1: product photo… Image 2: style reference…')" and the API supports up to 10 reference images per call ([Replicate — GPT Image 2](https://replicate.com/openai/gpt-image-2)). Highest-leverage move in the toolbox.

**(c) Seed pinning.** Not currently exposed. Closest substitute: a fixed reference-image set acting as a "perceptual seed."

**(d) Negative prompts as inline clauses.** No flag exists, but the model honors "No amber. No yellow. No glossy textures. No photorealism. No watermarks." Treat negatives as first-class fragments and end every prompt with the same banned-list block.

**(e) Post-process palette quantization.** AI models have a documented warm-yellow bias with "parchment" instructions. Defense: deterministic post-process that quantizes outputs to a 12-color palette — "reduces the number of distinct colors while keeping the visual vibe close to the original" ([Snapcorn — Color Quantization](https://snapcorn.com/blog/defining-color-quantization-in-image-processing)). `sharp` or ImageMagick, ~5 lines.

**(f) Human review gates.** Per Adobe's enterprise pattern: every batch passes through a "validate outputs against brand guidelines" step. For Argumend: one founder reviewing a 12-image contact sheet at quality `low` before re-rolling winners at `high`.

Effectiveness ranking: **(b) > (a) ≈ (e) > (d) > (f) > (c, unavailable).** The first two together do ~80% of the work.

## 3. The Argumend Prompt Library Structure

Drop-in, ready to commit at `lib/visual/prompt-fragments.ts`:

```ts
// lib/visual/prompt-fragments.ts
// Argumend visual signature — Natural-Philosophy Notebook v1.0
// Source spec: docs/research/2026-04-28-visual-design/01-gpt-image-2-visual-signature.md

export const SIGNATURE_VERSION = "1.0.0" as const;
export const MODEL_SNAPSHOT = "gpt-image-2-2026-04-21" as const;

export const BASE_SCAFFOLD =
  "A scanned parchment page, warm cream #f4f1eb background with subtle " +
  "foxing and faint horizontal rules. 60% subject, 40% negative space.";

export const SIGNATURE_BLOCK =
  "Hand-drawn ink linework, fine dip-pen aesthetic with visible pressure " +
  "variation, in the style of a 17th-century natural-philosophy notebook. " +
  "Scholarly, contemplative, civil-but-tense. Never corporate, never glossy.";

export const PALETTE_BLOCK =
  "Palette is locked: parchment #f4f1eb, deep teal #3a6965 (evidence and " +
  "titles only), rust #C4613C (proponent dots), earth-brown #8B5A3C (skeptic " +
  "dots), crimson #a23b3b (the single crux mark), stone gray #3d3a36 (body), " +
  "muted gray #7a7068 (marginalia). No other colors anywhere.";

export const BANNED_BLOCK =
  "No amber. No yellow. No tangerine. No neon. No pure black (#000). No " +
  "glossy textures. No photorealism. No 3D rendering. No modern UI elements. " +
  "No sans-serif anywhere except the argumend.org wordmark. No human faces. " +
  "No watermarks. No stock-illustration tropes.";

export const MOTIF_BLOCKS = {
  astrolabe:        "an astrolabe with concentric brass rings",
  weighingScale:    "a two-pan weighing scale balanced level",
  hourglass:        "an hourglass with sand mid-fall",
  manuscript:       "a fragment of folded manuscript with visible script",
  compass:          "a brass-tipped drawing compass, half open",
  dividers:         "a pair of navigator's dividers",
  sealingWax:       "a crimson wax seal pressed with a signet",
  quillAndInkwell:  "a quill resting in a brass inkwell",
} as const;
export type Motif = keyof typeof MOTIF_BLOCKS;

export const LAYOUT_BLOCKS = {
  og: // 1200x630 social card
    "Layout: title dominant in EB Garamond 48pt deep teal, top-left. " +
    "A 4-node ink graph as the lower 40% of the canvas. One crimson crux " +
    "node center-bottom. argumend.org wordmark in Plus Jakarta Sans 8pt, " +
    "stone gray, lower-right corner. Aspect ratio 1.91:1.",
  topicHeader: // 1536x1024 in-app
    "Layout: 5-7 node ink graph centered. Title in EB Garamond italic " +
    "across the top. One marginal classical artifact. Aspect ratio 3:2.",
  blogHero: // 1536x1024
    "Layout: single conceptual ink illustration center, headline overlay " +
    "in EB Garamond top-left, generous negative space. Aspect ratio 3:2.",
  icon: // 1024x1024 — single artifact only, no graph
    "Layout: single classical artifact centered on parchment, no text, " +
    "no graph, deep-teal accent only. Aspect ratio 1:1.",
  background: // 2560x1440 ambient
    "Layout: faint graph at 25% opacity scattered across the canvas, no " +
    "title, no crux mark, generous negative space for foreground content. " +
    "Aspect ratio 16:9.",
} as const;
export type AssetClass = keyof typeof LAYOUT_BLOCKS;

export interface ComposeArgs {
  asset: AssetClass;
  topic: { title: string; cruxLabel?: string; evidenceCount?: number };
  motif: Motif;
}

export function compose({ asset, topic, motif }: ComposeArgs): string {
  const motifFragment =
    `In one margin, a small ink illustration of ${MOTIF_BLOCKS[motif]}, ` +
    `drawn in the same hand as the graph.`;
  const titleFragment = `Title text reads "${topic.title}".`;
  const cruxFragment = topic.cruxLabel
    ? `The crimson crux node is labeled "${topic.cruxLabel}".`
    : "The crimson crux node carries a marginal note reading \"crux\".";
  return [
    BASE_SCAFFOLD,
    SIGNATURE_BLOCK,
    LAYOUT_BLOCKS[asset],
    titleFragment,
    cruxFragment,
    motifFragment,
    PALETTE_BLOCK,
    BANNED_BLOCK,
    `Signature version ${SIGNATURE_VERSION}.`,
  ].join(" ");
}
```

The discipline this enforces: every caller in `app/`, `scripts/`, or any one-off Codex agent must go through `compose()`. There is no path to a Codex image call that does not include `BANNED_BLOCK`. Drift becomes structurally hard.

## 4. Reference-Image Scaffolding

Verbatim fragments get you ~60%. Anchor images supply the rest. Per the OpenAI cookbook, **"Use the same style from the input image and generate a [new subject]"** with the input acting as a perceptual lock.

**The anchor pipeline:**

1. **Bootstrap.** Generate 12 candidates at `quality="low"` ($0.072 total) using `compose()` alone, varying motif and topic.
2. **Curate 5 anchors by hand.** Cleanest outputs become `assets/visual-anchors/v1.0/anchor-{1..5}.png`, committed to git.
3. **All future calls reference them.** Every API call passes `input_images: [anchor1, anchor2, anchor3]` (3 is the sweet spot — 1 is too narrow, 5+ confuses composition). Prompt opens: `"Image 1, Image 2, Image 3 are style references — match their parchment tone, ink line weight, palette, and marginalia placement exactly. Apply that style to: [composed prompt]."`
4. **Re-anchor every 2-3 rounds on edits.** Throw away the latest output, start the next edit from the original anchor.

**Storage layout:**

```
assets/visual-anchors/
  v1.0/
    anchor-01-topic-header-astrolabe.png
    anchor-02-og-weighing-scale.png
    anchor-03-blog-hero-hourglass.png
    anchor-04-icon-compass.png
    anchor-05-background-quill.png
    MANIFEST.json
  v1.1/   # only if signature evolves
```

**Anchor selection checklist:** background hex within `#f0ede5`–`#f6f3ed` (5 sample points); crimson crux luminance <50%, saturation >40%; zero amber contamination; visible line-weight variation; wordmark present, not misspelled; no faces, no glossy textures.

The anchor library is the single most important artifact in the visual system — committed to git, code-reviewed like source, version-tagged.

## 5. Versioning Strategy

Semver, scoped to the visual signature itself. TianPan: "the execution context is a single coherent unit including prompt template, model name and version, temperature and sampling parameters, and retrieval configuration" — versioning the prompt text alone is insufficient ([TianPan — Prompt Versioning](https://tianpan.co/blog/2026-03-13-prompt-versioning-change-management-production)).

The unit is `(SIGNATURE_VERSION, MODEL_SNAPSHOT, anchor-set hash)`:

- **v1.0.0** — Natural-Philosophy Notebook. Frozen baseline.
- **v1.0.x** — Patch: typo fixes in fragment text. Anchors unchanged. No regeneration.
- **v1.x.0** — Minor: new motif, tightened banned-list. Anchors extended. Regeneration optional.
- **v2.0.0** — Major: signature evolution (parchment→vellum, crimson→indigo). Anchors re-curated. Assets grandfathered or regenerated.

**Sidecar manifest per image:**

```jsonc
// assets/generated/argumend-og-{slug}-{date}.json
{
  "asset": "og",
  "topicId": "ai-extinction-cruxes",
  "signatureVersion": "1.0.0",
  "modelSnapshot": "gpt-image-2-2026-04-21",
  "anchorSetHash": "sha256:b7c1...",
  "prompt": "<the full composed prompt string>",
  "motif": "astrolabe",
  "generatedAt": "2026-04-28T14:21:00Z",
  "qcPassed": true,
  "qcNotes": []
}
```

Every image becomes re-generatable, auditable, rollbackable. When v1.1 ships, the runner reads the manifest, re-composes with v1.1 fragments, re-calls with v1.1 anchors.

## 6. Visual Diff + Drift Detection

Two layers.

**Layer A — perceptual hash + palette histogram (cheap, automated).** Each output is compared against the anchor set:

- pHash distance < 12 against at least one anchor (~30 lines with `sharp` + `phash-image`).
- Histogram intersection ≥ 0.85 against anchor color distribution.
- Background sample (5 random points, upper-left quadrant) within parchment hex range.

Fails → manifest flagged `qcPassed: false`, shunted to `/dev/visual-system/quarantine`. $0 per check.

**Layer B — GPT-4o vision critic.** Weekly cron over last 50 outputs:

```ts
// lib/visual/critic.ts
const CRITIC_PROMPT = `
You are the brand auditor for Argumend's Natural-Philosophy Notebook visual signature v${SIGNATURE_VERSION}.

Evaluate the attached image against this rubric. For each criterion, return PASS/FAIL with one sentence of evidence.

1. Background is warm cream parchment in the range #f0ede5 to #f6f3ed. No amber, no yellow.
2. Linework is hand-drawn ink with visible pen-pressure variation. No vector-perfect strokes.
3. Exactly one crimson #a23b3b crux mark exists, with a marginal "crux" label.
4. Deep teal #3a6965 is reserved for evidence and titles only — never decorative.
5. Rust #C4613C and earth-brown #8B5A3C appear only as small dots on proponent/skeptic nodes.
6. EB Garamond serif is used for all in-image text except the argumend.org wordmark.
7. Exactly one classical-artifact illustration appears in a margin.
8. No human faces, no glossy textures, no photorealism, no neon, no pure black.
9. argumend.org wordmark is lower-right, in Plus Jakarta Sans, ~8pt, stone gray.
10. 60/40 subject-to-negative-space ratio, generous breathing room.

Return JSON: { "scores": { "1": "PASS", "2": "PASS", ... }, "overall": "PASS"|"FAIL", "drift_notes": "..." }
`;
```

Cost: ~$0.005-0.010 per image at 1024². Auditing 50 images/month ≈ $0.25-0.50.

Coframe's 26% layout-accuracy improvement after vision fine-tuning suggests this critic could be sharpened by fine-tuning on Argumend's own pass/fail history once 200+ labeled examples exist. Percy and Chromatic are built for UI screenshots, not generative art ([Percy — Visual Regression 2026](https://percy.io/blog/visual-regression-testing-tools)) — pHash+critic is more semantically aligned and cheaper.

## 7. Cost Model

Volumes: 109 existing topics, ~3 new/month, ~8 blog posts/month, ~6 X graphics/month, plus drift fixes.

**Initial batch (one-time):**

| Item | Vol | Quality | Subtotal |
|---|---|---|---|
| OG for 109 topics | 109 | high / 1024² | $23.00 |
| Topic headers for 109 | 109 | med / 1536×1024 | $4.47 |
| Blog heroes for 30 posts | 30 | high / 1536×1024 | $4.95 |
| 12 ambient backgrounds | 12 | med / 2K | $4.80 |
| 8 motif icons | 8 | med / 1024² | $0.42 |
| Bootstrap + anchor curation | 60 | low / 1024² | $0.36 |
| Re-roll buffer (~40% of high) | — | mixed | $13.00 |
| **Initial total** | | | **~$51** |

Plus ~6 hours of founder time — the labor dwarfs the API spend.

**Per new topic:** 1 OG + 1 header + 1-2 re-rolls = **~$0.35**. At 3/month: **$1.05/month**.

**Monthly maintenance:**

| Activity | Cost |
|---|---|
| 8 blog heroes × $0.165 | $1.32 |
| 6 X graphics × $0.211 | $1.27 |
| Drift-fix re-rolls (~2) | $0.40 |
| GPT-4o critic on 50 images | $0.40 |
| Exploration | $0.12 |
| **Monthly** | **~$3.50** |

**Year 1:** $51 + 12 × ($1.05 + $3.50) = **~$106**. **Steady-state Y2+:** **~$55/year**.

**v1.1 migration** (e.g., palette tighten): regenerate 109 OGs = ~$23 + critic = **~$24**. **v2.0 migration**: ~$50 + 8 hours anchor re-curation.

**Comparison against alternatives:**

- **Hire an illustrator** ($80-120/hr): single OG = 1-2 hrs = $80-240. 109 topics = $9K-$26K. Two orders of magnitude more.
- **Stock illustration** (Storyset/unDraw/Freepik Premium): ~$180/year, but no stock library carries the Natural-Philosophy Notebook signature. Stock = brand-incoherence by definition.
- **Status quo:** $0 API, infinite brand erosion. Argumend scrolls past on X looking like every other Substack. The *expensive* option.
- **Adobe Firefly Foundry** (enterprise): reportedly $5K-$15K setup + usage fees ([Firefly Foundry](https://business.adobe.com/products/firefly-business/firefly-foundry.html)). Out of band.

**Verdict: ~$100/year is rounding error.** The bottleneck is founder taste-time, not API spend.

## 8. Operational Discipline

Rules that prevent the founder from breaking their own brand:

**The "no one-off images" rule.** Every shipped image goes through `compose()`. No code path calls gpt-image-2 directly. Enforce with a lint rule (`no-direct-image-api-calls`) flagging any OpenAI image-client import outside `lib/visual/`.

**PR template addendum** at `.github/pull_request_template.md`:

```markdown
## Visual changes (delete if none)
- [ ] `compose()` asset class? (og / topicHeader / blogHero / icon / background)
- [ ] Signature version? (e.g., v1.0.0)
- [ ] Motif?
- [ ] Anchor set hash:
- [ ] QC critic pass? (paste JSON)
- [ ] Manifest committed at `assets/generated/...`?
```

**The `/dev/visual-system` dashboard** (auth-gated, founder-only): a Next.js page showing current `SIGNATURE_VERSION`, `MODEL_SNAPSHOT`, anchor-set hash; the 5 active anchors; last 50 outputs with critic scores; a drift heatmap (histogram intersection trends, alert at <0.80); a "regenerate batch" button.

**Signature change protocol.** Major/minor bumps require: (1) update fragments, (2) re-curate anchors, (3) run critic against existing library, (4) one-paragraph migration note in `docs/research/`, (5) one PR. Patch bumps ship freely.

## 9. Failure Recovery

Drift detected after 50 images shipped. Decision tree:

**Step 1 — Diagnose drift class.**
- *Palette drift* (warm-yellow contamination): run all 50 through palette quantization. ~$0, ~30 min.
- *Composition drift* (nodes proliferating, negative space shrinking): regenerate, tighten the offending `LAYOUT_BLOCKS` entry.
- *Motif drift* (artifacts modernized): regenerate, tighten `MOTIF_BLOCKS`, re-curate one anchor.
- *Signature evolution* (spec itself feels off): v2.0 decision, not a bug. Write migration note, ship v2.0.

**Step 2 — Rollback vs. accept-and-evolve matrix:**

| Drift severity | <25% of corpus | 25-60% | >60% |
|---|---|---|---|
| Palette | Quantize in post (free) | Quantize + regen worst 10 | Quantize all + lock tighter |
| Composition | Regenerate the bad N | Regen batch + tighten layout | v1.1 minor, regen all |
| Signature feel | Live with it | v1.x + selective regen | v2.0 — brand evolved |

**Step 3 — Regen cost ceiling.** Regenerating all 109 topic headers + 109 OG at high = ~$41. Dollars are never the blocker. The blocker: do I have 4 hours to review the contact sheet?

**Step 4 — Document.** Every recovery event lives in `docs/research/visual-incidents/`.

The counter-intuitive lesson: **drift is not a bug, it's an entropy gradient.** The job is not to prevent it (impossible) but to detect and recover cheaply. Prompt library + anchors + critic + manifest-per-image collectively make recovery an afternoon, not a quarter.

---

## Final summary

The prompt-library MVP is small, mechanical, and dictatorial: one TypeScript file (`lib/visual/prompt-fragments.ts`) exporting a `compose()` function that every image call must funnel through, five hand-curated anchor PNGs committed in `assets/visual-anchors/v1.0/`, a sidecar manifest per generated image, a pHash + GPT-4o critic running on every output, and a dashboard at `/dev/visual-system` that surfaces drift before it ships. Annual cost is ~$100; the constraint is taste-time, not API spend. Versioning is semver scoped to the signature itself, with `v1.0.0` as the locked baseline.

**Three next-step actions to commit:**

1. Land `lib/visual/prompt-fragments.ts` (the ~80-line file in section 3) and add a lint rule banning direct gpt-image-2 imports outside that module.
2. Run the bootstrap 12-image batch at `quality="low"` (~$0.07), curate 5 anchors by hand, commit them to `assets/visual-anchors/v1.0/` with a `MANIFEST.json` mapping anchors to asset classes.
3. Build the GPT-4o critic at `lib/visual/critic.ts` plus the `/dev/visual-system` dashboard route, then backfill the existing 109 topics through `compose()` over a single weekend (~$51 total, founder review the bottleneck).

## Sources

- [OpenAI Cookbook — Image Models Prompting Guide](https://developers.openai.com/cookbook/examples/multimodal/image-gen-models-prompting-guide)
- [OpenAI — Introducing ChatGPT Images 2.0](https://openai.com/index/introducing-chatgpt-images-2-0/)
- [Replicate — GPT Image 2 docs](https://replicate.com/openai/gpt-image-2)
- [fal.ai — GPT Image 2 Prompting Guide](https://fal.ai/learn/tools/prompting-gpt-image-2)
- [Typeface — AI Brand Management](https://www.typeface.ai/blog/ai-brand-management-how-to-maintain-brand-consistency-with-ai-image-generators)
- [Toolient — Consistent Brand Visuals](https://www.toolient.com/2026/03/ai-image-generation-ecommerce-brand-visuals.html)
- [MindStudio — Batch AI Image Generation](https://www.mindstudio.ai/blog/batch-ai-image-generation-hundreds-visuals-minutes)
- [Adobe — Style Kits Overview](https://helpx.adobe.com/firefly/web/work-with-enterprise-features/collaborate-using-style-kits/style-kits-overview.html)
- [Adobe — Firefly Custom Models](https://business.adobe.com/products/firefly-business/custom-models.html)
- [Adobe — Firefly Foundry](https://business.adobe.com/products/firefly-business/firefly-foundry.html)
- [Canva — Apply Locks to Brand Templates](https://www.canva.com/help/brand-template-locks/)
- [Canva — Generate On-Brand Designs](https://www.canva.com/help/create-on-brand-designs/)
- [Anthropic — Introducing Claude Design](https://www.anthropic.com/news/claude-design-anthropic-labs)
- [Claude Help — Set Up Design System](https://support.claude.com/en/articles/14604397-set-up-your-design-system-in-claude-design)
- [UXPin — AI in Design Systems](https://www.uxpin.com/studio/blog/ai-design-systems-consistency-simple/)
- [LogoDiffusion — Automated Brand Guidelines](https://logodiffusion.com/blog/automated-brand-guidelines-how-ai-ensures-consistency)
- [Snapcorn — Color Quantization in Image Processing](https://snapcorn.com/blog/defining-color-quantization-in-image-processing)
- [TianPan — Prompt Versioning and Change Management](https://tianpan.co/blog/2026-03-13-prompt-versioning-change-management-production)
- [Latitude — Prompt Versioning Best Practices](https://latitude-blog.ghost.io/blog/prompt-versioning-best-practices/)
- [Encord — Vision Fine-Tuning with GPT-4](https://encord.com/blog/vision-fine-tuning-with-openais-gpt-4/)
- [Percy — Visual Regression Testing Tools 2026](https://percy.io/blog/visual-regression-testing-tools)
- [image-json-gen — Reproducible TypeScript Prompts (GitHub)](https://github.com/xcaeser/image-json-gen)

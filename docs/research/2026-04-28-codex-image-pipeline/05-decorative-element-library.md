# Decorative Element Library — Coherent Icon/Badge/Illustration Set via Image 2 + Recraft

**Date:** 2026-04-28
**Analyst:** Research agent 05/7, Codex image pipeline swarm
**Brief:** Inventory every decorative slot in Argumend's node taxonomy, then design a Codex-driven generation pipeline (GPT Image 2.0 raster → Recraft v3 vectorize → Illustrator/Affinity cleanup) that produces a coherent fallacy / evidence / position / status element library matching the Natural-Philosophy Notebook signature from `01-gpt-image-2-visual-signature.md`.

## 1. Inventory of Needed Elements

The current canvas signals node type via **color + border + a Lucide stock icon**. From `lib/variantStyles.ts:31-87`, every variant uses one of six off-the-shelf Lucide glyphs (`Scale`, `ScrollText`, `Landmark`, `MessageCircleQuestion`, `Swords`, `Shield`) — placeholders that don't carry the parchment/ink signature, don't differentiate fallacy *types*, and don't differentiate evidence *kinds*. Four of the six are visually similar shields/landmasses at small sizes — proponent and skeptic blur into each other.

Reading `types/graph.ts:1-9`, `lib/schemas/topic.ts`, and the three node components (`RichNode.tsx`, `EvidenceNode.tsx`, `MetaNode.tsx`), the decorative slots needing real artwork are:

| Slot | Current implementation | Proposed upgrade |
|---|---|---|
| **Position-side icons** (proponent / skeptic) | `Swords` and `Shield` Lucide glyphs on a colored left border (`variantStyles.ts:48-62`) | A pair of facing-figure ink illustrations in rust `#C4613C` and earth-brown `#8B5A3C` — clearly a *dialogue*, not a brawl |
| **Crux marker** | `Scale` Lucide glyph + `Lightbulb` accent, on a crimson card (`RichNode.tsx:99-122`) | A custom hand-drawn weighing scale with one pan tipped, crimson `#a23b3b` ink, used as both the in-node icon and as a margin glyph |
| **Evidence-side polarity** | `ThumbsUp` / `ThumbsDown` Lucide (`EvidenceNode.tsx:76-87`) | Replaced by tiny illustrative "tally marks" — a check-quill for *for*, a strike-quill for *against* — keeping the reading direction without the corporate thumbs aesthetic |
| **Evidence-type markers** | None — all evidence is one shape regardless of source | Six type glyphs: **study** (microscope), **statistic** (graphed line), **expert opinion** (academic-robe figure), **historical record** (manuscript), **anecdote** (single quotation mark), **systematic review** (stacked manuscripts) |
| **Confidence-level indicator** | Numeric `score/40` + label "Strong/Moderate/Weak/Minimal" (`EvidenceNode.tsx:19-24`) and a `ConfidenceGauge` SVG dial on meta nodes | Keep the gauge; add four small "weighing-pan" glyphs at corners to show which weight dimension drives the score (sourceReliability / independence / replicability / directness — `topic.ts:7-12`) |
| **Source-quality badge** | None | Three-tier ink seal: **gold-standard** (filled wax seal in deep teal), **moderate** (open seal), **disputed** (cracked seal) — placed top-right of evidence cards |
| **Status / verification icons** | Plain colored pills "verified / theoretical" (`RichNode.tsx:19-28`) tied to `verification_status: "verified" | "theoretical" | "impossible"` (`topic.ts:39`) | Three margin glyphs: **verified** (a small ink checkmark inside a circle drawn in deep teal), **theoretical** (a question-mark drawn as a small spiral, rust), **impossible** (a struck-through circle, brown) |
| **Topic-status decorations** | Plain `TopicStatusSchema = "settled" / "contested" / "highly_speculative"` (`topic.ts:115-119`) — currently text-only | Three corner ribbons: **settled** (sealed scroll), **contested** (crossed quills), **highly speculative** (an open question-mark cartouche) |
| **Topic-category icons** | None (categories `policy / technology / science / economics / philosophy` — `topic.ts:103-109` — are text-only) | Five small allegorical glyphs: **policy** (a column capital), **technology** (a brass cog), **science** (an astrolabe — already in the visual-signature artifact rotation), **economics** (a scale of coin), **philosophy** (an open codex) |
| **Pillar icons** | Twelve Lucide names enumerated in `IconNameSchema` (`topic.ts:47-60`) — `Target / Zap / HelpCircle / Shield / Atom / Telescope / Microscope / Scale / Gavel / FileText / Users / AlertTriangle` | Replace each with a hand-drawn ink equivalent so pillar headers stop looking like generic SaaS dashboards |
| **Fallacy badges** | The taxonomy is **open-ended** — `PotentialFallacy.type` is a free-form `string` (`extractor.ts:73-86`). The extractor prompt seeds the set with **10 named fallacies**: *Ad Hominem, Straw Man, Appeal to Authority, False Dichotomy, Slippery Slope, Cherry Picking, Appeal to Emotion, Bandwagon, Red Herring, Circular Reasoning* (`extractor.ts:192`). Blog/guide content references **Sunk Cost** and **Appeal to Nature** as well (`guides.ts:1444, 1468`). The offline detector adds **Hasty Generalization** and **Appeal to Popularity** (`offline.ts:175-208`). | Pre-author **24 illustrated fallacy badges** matching the canonical School of Thought "yourlogicalfallacyis.com" deck of 24 ([yourlogicalfallacyis.com](https://yourlogicalfallacyis.com/)) so coverage of any extractor output is essentially complete on day one |

That gives us a decorative library of roughly **50 unique elements** to generate in the first pass: 24 fallacies + 6 evidence types + 5 categories + 12 pillar replacements + 3 source-quality seals + 3 status glyphs + 3 topic-status ribbons + 2 position figures + 1 crux scale.

## 2. Style Spec — Notebook Signature at 32px

The Natural-Philosophy Notebook signature (Candidate A in `01-gpt-image-2-visual-signature.md:99-128`) was designed for 1536×1024 hero imagery. At icon scale (24-48px display from 256×256 source) three things stay and three things change.

**Stays the same:** (1) Hand-drawn ink linework with visible pen-pressure variation — `stroke-width` 1.4-1.8px in the source 256px file, with hairline thinning at curve apexes. (2) Single-color rule — every icon is one ink: stone gray `#3d3a36` default, crux crimson `#a23b3b` for crux elements, deep teal `#3a6965` for evidence/source-quality, rust `#C4613C` only for proponent, brown `#8B5A3C` only for skeptic. Never two colors. (3) Cream-or-transparent background — committed SVGs ship `fill="none"`; the `#f4f1eb` parchment is the page, not the icon. Generation still asks for cream parchment so the model produces correct edge contrast; the background gets keyed out in cleanup.

**Changes for icon scale:** (1) No marginal artifacts or wordmarks — the classical-allegory motif *is* the whole icon. The astrolabe is no longer a margin flourish; it *is* the science-category icon. (2) Closed silhouettes over open scenes — a single recognizable object centered in 256×256 with ~12% safe-area padding. (3) Drop the 60/40 subject ratio — icons are 90% subject, 10% margin.

**Style anchor.** Every prompt prefixes the same locked block (icon-mode equivalent of the snippet library at `01-gpt-image-2-visual-signature.md:202-215`):

```
Single-color hand-drawn ink illustration on warm cream #f4f1eb
parchment, drawn as if by a 17th-century natural philosopher with
a fine dip pen. Visible pen-pressure variation in the linework.
Centered subject, ~12% safe-area padding, no background scenery,
no text, no wordmark, no shading beyond fine cross-hatch on the
subject. Stroke color: #3d3a36 stone gray. No pure black, no amber,
no neon, no glossy textures, no photorealism. Square 1024×1024.
```

Equivalent to CapCut's hard-coded brand block ([CapCut brand style guide](https://www.capcut.com/ideas/gpt-image-2/gpt-image-2-for-brand-style-guides)). Per-element prompts vary only the *subject* and, for crux/evidence/position icons, swap the stroke color line.

## 3. Per-Fallacy Illustration Brief — 24 Pre-Written Prompts

Aligned with the School of Thought "Thou Shalt Not Commit Logical Fallacies" canon ([yourlogicalfallacyis.com](https://yourlogicalfallacyis.com/), [Pesec 24 most common](https://www.pesec.no/24-most-common-logical-fallacies/)) so the set covers anything the extractor or `offline.ts` can plausibly emit. Each is the *subject* line that follows the locked anchor block.

1. **Ad Hominem** — `a single hand pointing accusingly at an unseen target, fingertip slightly curved, fine cross-hatch on the cuff of a scholar's sleeve`
2. **Straw Man** — `a small straw-stuffed effigy with crossed-stick arms, loose hay protruding at the joints, slightly slumped`
3. **Appeal to Authority** — `a tall figure in long academic robes pointing skyward with one hand, no facial features, gown drawn with vertical pen-strokes`
4. **False Dichotomy** — `two empty bowls on either end of a beam balance with nothing between them, a third invisible option implied by a faint dotted question mark above`
5. **Slippery Slope** — `a small ball perched at the top of a steeply tilted plank, three smaller dotted ghost-balls receding down the slope`
6. **Cherry Picking** — `a hand reaching into a basket of fruit, plucking only one ripe cherry while leaving bruised ones visible`
7. **Appeal to Emotion** — `a single tear suspended below a stylized eye, the eye drawn with classical heavy lid-line`
8. **Bandwagon** — `a small wagon laden with three identical figures all gesturing the same direction, drawn from the side`
9. **Red Herring** — `a fish drawn with classical ichthyological detail, a faint trail of dotted lines leading away from the actual subject (an open book left in the corner ghosted at 30% opacity)`
10. **Circular Reasoning** — `an ouroboros-like serpent biting its own tail, drawn as a clean ink ring with a single interior arrow`
11. **Hasty Generalization** — `a single tally mark on parchment with three dotted-ghost tally marks projected forward as imagined data`
12. **Appeal to Popularity** — `a crowd of small identical silhouette-heads, all turned the same direction, drawn as repeating ink stamps`
13. **Sunk Cost** — `an hourglass with sand piled deep in the bottom chamber, a hand still cradling it as if unwilling to set it down`
14. **Appeal to Nature** — `a single laurel leaf with a halo or radiance lines emanating from it`
15. **Tu Quoque** — `two pointing fingers facing each other in mirror image, both accusing`
16. **Begging the Question** — `a small dog chasing its own tail in a tight circle, classical etched style`
17. **No True Scotsman** — `a kilted figure being shooed away from a doorway by a larger gatekeeping hand`
18. **Genetic Fallacy** — `a sapling growing from a cracked acorn shell, with a faint dotted line from acorn to sapling marked "origin ≠ value"` (the text is illustrative — strip in cleanup if it generates badly)
19. **Anecdotal** — `a single quotation mark sitting alone in the center of an empty parchment, oversized`
20. **The Texas Sharpshooter** — `a barn-side wall with bullet holes scattered, then a target painted around the densest cluster after the fact, the target drawn in lighter line`
21. **Burden of Proof** — `a heavy stone book sitting on one balance pan, the other pan empty and high, a hand pointing at the empty pan`
22. **Ambiguity / Equivocation** — `a single word "fair" hanging from two threads, splitting into two ghost meanings on either side`
23. **Composition / Division** — `a brick wall where one brick is highlighted, with an arrow showing a single brick property being mistakenly attributed to the whole wall (or vice versa)`
24. **Loaded Question** — `a quill poised over parchment writing "have you stopped...", with the question itself trailing into a noose-like loop`

All 24 use the locked anchor block from §2; per-element prompt is `[anchor] + ". Subject: " + brief`. Visual register reference: [Allegory — Wikipedia](https://en.wikipedia.org/wiki/Allegory), [Obelisk Art History — Allegory](https://www.arthistoryproject.com/subjects/allegory/) — emulating classical-allegory tradition, not photorealism, flat-design, or corporate icon-pack. Non-fallacy elements (evidence types, categories, status, position figures) follow the same scaffold; the inventory table above already specifies their subjects.

## 4. Generation + Vectorization Pipeline

The pipeline is **four mechanical stages** plus a human-in-the-loop review gate at the end of stage 3.

### Stage 1 — Codex script: batch raster generation via GPT Image 2

A single script `scripts/generate-icon-library.ts` reads `lib/visual/icon-manifest.json` (one entry per element with `id`, `category`, `subject`, optional `colorOverride`), composes each prompt as `ANCHOR_BLOCK + manifestEntry.subject`, calls `gpt-image-2` with `quality="medium"`, `size="1024x1024"`, `n=1`, and saves the raster to `public/icons/_raw/<category>/<id>.png` along with the seed in `<id>.seed.txt`.

Cost from `01-gpt-image-2-visual-signature.md:226-232`: medium 1024² is **$0.053/image**. At 50 elements with a 30% re-roll buffer that is `50 × 1.3 × $0.053 ≈ $3.45`. ([OpenAI API Pricing](https://openai.com/api/pricing/))

### Stage 2 — Recraft v3 vectorize via API

POST each raster to Recraft's vectorize endpoint to produce SVG paths. Recraft v3 charges roughly **$0.04/raster, $0.08/vector** ([Recraft v3 — AI/ML API Docs](https://docs.aimlapi.com/api-references/image-models/recraftai/recraft-v3), [Recraft Pricing](https://www.recraft.ai/docs/api-reference/pricing)). 50 × $0.08 ≈ **$4.00**. Output → `public/icons/_raw/<category>/<id>.svg`.

Recraft's `vector_illustration` style produces native paths that open cleanly in Illustrator, Figma, Sketch, Affinity, or Inkscape ([Recraft v3 SVG / Replicate](https://replicate.com/recraft-ai/recraft-v3-svg)).

The alternative — generating SVG **directly** via `recraft-v3-svg` and skipping Image 2 — flattens the pen-pressure variation that defines the Notebook signature into uniform strokes. The two-step (Image 2 raster → Recraft vectorize) preserves the hand quality.

### Stage 3 — Cleanup in Illustrator/Affinity Designer

Per SVG: simplify paths (Path > Simplify, threshold 95%), force stroke to the assigned hex, remove the cream background, normalize viewBox to `0 0 256 256`, set stroke-width 1.6, export optimized SVG with unused `<defs>` purged. **5-7 min per icon; 4-6 hours total** for the first 50.

### Stage 4 — Commit + registry

Cleaned SVGs go to `public/icons/<category>/<id>.svg`; `_raw/` is gitignored. `scripts/build-icon-registry.ts` walks the tree and emits `lib/visual/icons.generated.ts` mapping ids to SVG components for type-checked imports.

### Style-consistency gate

Pre-merge, the script renders all icons into `docs/visual/icon-contact-sheet.png`. Reviewer eyeballs line-weight consistency. Drift goes back to Stage 1 with the **first three approved icons attached as reference images** (the anchoring trick from `01-gpt-image-2-visual-signature.md:65`) — the single most important consistency lever.

## 5. Integration in Components

Argumend already imports Lucide icons inline as React components. The new SVGs follow the same pattern via SVGR — Next.js supports `import IconAdHominem from "@/public/icons/fallacies/ad-hominem.svg"` if `next.config.js` registers the SVGR webpack loader. This keeps tree-shaking intact: only icons actually referenced ship in the bundle.

The registry file `lib/visual/icons.generated.ts` looks like:

```ts
import AdHominem from "@/public/icons/fallacies/ad-hominem.svg";
import StrawMan from "@/public/icons/fallacies/straw-man.svg";
// ... 22 more
import HelpCircle from "lucide-react"; // fallback for unknown

export const FALLACY_ICONS: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  "ad hominem": AdHominem,
  "straw man": StrawMan,
  // canonical-name → component
};

export function getFallacyIcon(name: string) {
  const key = name.toLowerCase().trim();
  return FALLACY_ICONS[key] ?? HelpCircle;
}
```

JSX modification to `EvidenceNode.tsx` (replacing the ThumbsUp/Down at line 75):

```tsx
import { getEvidenceTypeIcon } from "@/lib/visual/icons.generated";
const TypeIcon = getEvidenceTypeIcon(data.evidenceType ?? "study");
<TypeIcon className="h-4 w-4" stroke={isFor ? "#C4613C" : "#8B5A3C"} strokeWidth={1.6} />
```

For fallacy badges on a future `FallacyNode` or callout overlay, `getFallacyIcon(fallacy.type)` handles arbitrary extractor-emitted strings, falling back to `HelpCircle`. The icon set is additive: new fallacies surface with a sensible fallback while a new icon gets generated.

**Inline SVG via SVGR for everything.** `<img>` strips the ability to recolor via stroke props; CSS backgrounds prevent React-driven stroke-width control. Inline is the only path that lets variant-driven color overrides flow through cleanly.

## 6. Reusable Element Library Structure

```
public/icons/
  fallacies/         # 24 SVGs, kebab-case ids
    ad-hominem.svg
    straw-man.svg
    ...
  evidence/          # 6 SVGs
    study.svg
    statistic.svg
    expert-opinion.svg
    historical-record.svg
    anecdote.svg
    systematic-review.svg
  categories/        # 5 SVGs (policy, technology, science, economics, philosophy)
  pillars/           # 12 SVGs replacing IconNameSchema enum
  status/            # verified, theoretical, impossible
  topic-status/      # settled, contested, highly-speculative
  source-quality/    # gold-standard, moderate, disputed
  positions/         # proponent, skeptic
  crux/              # crux-scale.svg
  _raw/              # gitignored — Image 2 PNGs + Recraft SVGs pre-cleanup

lib/visual/
  prompt-fragments.ts        # ANCHOR_BLOCK + per-element subject library
  icon-manifest.json         # source of truth for what to generate
  icons.generated.ts         # auto-built registry, do not hand-edit
  icons.ts                   # public API: getFallacyIcon, getEvidenceTypeIcon, etc.

scripts/
  generate-icon-library.ts   # Stage 1+2 driver
  build-icon-registry.ts     # Stage 4 codegen
```

**Naming.** kebab-case ids match lower-cased fallacy name with spaces → hyphens. Lookup normalizes whitespace and case, so `"Ad Hominem"`, `"ad hominem"`, and `"Ad-Hominem"` all resolve.

**Fallback for unknown types.** `getFallacyIcon` returns Lucide's `HelpCircle`. Unknown evidence types fall back to "study"; unknown categories to philosophy. Never throw — the graph must always render with stale data.

## 7. Style Consistency Enforcement

Three mechanisms keep drift bounded as the library grows.

**Reference-image scaffolding.** Every post-Phase-1 generation passes the closest existing icon as `Reference #1 — style/line weight` plus 1-2 thematic siblings as #2 and #3 — the OpenAI-documented anti-drift workaround ([OpenAI Cookbook prompting guide](https://developers.openai.com/cookbook/examples/multimodal/image-gen-models-prompting-guide)).

**Visual diff in CI.** [Chromatic](https://www.chromatic.com/) or [Percy](https://percy.io/) snapshots the contact sheet on every PR touching `public/icons/`. Chromatic's free tier (5K snapshots/month) covers Argumend's volume.

**Manifest lint.** A unit test enforces every entry in `icon-manifest.json` has a non-empty subject, valid category, and an actually-committed SVG at the expected path. Catches the common failure of adding a manifest row but forgetting to commit the asset.

**The "first three" rule.** After the initial 50 ship, the *first three icons per category* become immutable style anchors — never regenerated, always the reference for what follows. Borrowed from the [CapCut brand-style-guide pattern](https://www.capcut.com/ideas/gpt-image-2/gpt-image-2-for-brand-style-guides).

## 8. Cost & Cadence

**One-time cost for the first 50 elements:**

| Line item | Cost |
|---|---|
| Image 2 medium raster, 50 × 1.3 (re-roll buffer) × $0.053 | $3.45 |
| Recraft v3 vectorize, 50 × 1.3 × $0.08 | $5.20 |
| Cleanup labor, 5-7 min/icon × 50 | 4-6 hours founder time |
| Contact-sheet review + visual-diff setup | 2 hours founder time |
| **Total cash:** | **~$8.65** |
| **Total founder time:** | **6-8 hours** |

Lower than the brief's $5+$10 estimate because Image 2 medium quality is sufficient at icon scale; high quality is reserved for hero imagery.

**Maintenance:** marginal cost ~$0.13/element ($0.053 + $0.08) + 5-7 min cleanup. Budget $1/element to cover re-rolls and occasional high-quality renders.

**Cadence.** Run a monthly catch-up: query `analyses.fallacies` jsonb (`lib/db/schema.ts:110`) for names missing an icon, generate, ship batch PR. At current scale, realistically 0-3 new icons/month.

## 9. Phased Rollout

**Phase 1 — 6 most-visible elements (Week 1).** Smallest set that upgrades the canvas without committing to the full library: (1) **Crux scale** (crimson weighing-scale), (2) **Proponent figure** (rust), (3) **Skeptic figure** (brown), (4) **Verified seal** (deep teal check-in-circle), (5) **Disputed seal** (cracked, brown), (6) **Generic evidence-source seal** (deep teal open seal). Cost ~$1.30 + 1 hr cleanup. Replaces the four blurriest Lucide glyphs (Swords/Shield/Scale/Crown) and adds two badges that don't exist today.

**Phase 2 — Full fallacy set (Week 2).** All 24 fallacy badges. Cost ~$4.50 + 2.5 hrs. Every extractor-emitted fallacy gets a real illustrated badge.

**Phase 3 — Evidence-type and category markers (Week 3).** 6 evidence types + 5 categories + 12 pillar replacements. Cost ~$3.80 + 2.5 hrs. Category icons surface in topic lists and `FeaturedTopicHero`.

**Phase 4 — Status, topic-status, source-quality variants (Week 4).** Remaining 12 elements. Cost ~$1.60 + 1 hr. Lowest-priority — visible on detail pages, not the canvas.

After Phase 4, the library sits at ~50 elements, ~$11 spent, ~7 hours founder labor. Maintenance reverts to the monthly catch-up in §8.

**Non-obvious sequencing note:** Phase 1 ships behind a feature flag (`NEXT_PUBLIC_ICON_LIBRARY_V2=true`) as PNG-at-2x first, not Recraft SVGs, so we can verify on real users whether hand-drawn ink reads at 24-32px across retina, non-retina, and dark mode. SVG-via-SVGR migration follows after a week. Cheap insurance against the "great in Figma, smudge on a 1080p monitor" failure mode that is the canonical risk of hand-drawn iconography at small scale.

---

## Sources

- [School of Thought — yourlogicalfallacyis.com (canonical 24-fallacy deck)](https://yourlogicalfallacyis.com/)
- [Pesec — 24 most common logical fallacies](https://www.pesec.no/24-most-common-logical-fallacies/)
- [List of fallacies — Wikipedia](https://en.wikipedia.org/wiki/List_of_fallacies)
- [Recraft v3 — AI/ML API Documentation](https://docs.aimlapi.com/api-references/image-models/recraftai/recraft-v3)
- [Recraft v3 SVG — Replicate](https://replicate.com/recraft-ai/recraft-v3-svg)
- [Recraft Pricing](https://www.recraft.ai/docs/api-reference/pricing)
- [Recraft v3 FAQ — Vector Export, Style Lock, API — Flowith Blog](https://flowith.io/blog/recraft-v3-faq-vector-export-style-lock-commercial-license-api/)
- [Recraft AI Vector Generator](https://www.recraft.ai/ai-vector-generator)
- [OpenAI Cookbook — GPT Image Models Prompting Guide](https://developers.openai.com/cookbook/examples/multimodal/image-gen-models-prompting-guide)
- [OpenAI API Pricing](https://openai.com/api/pricing/)
- [CapCut — GPT Image-2 for brand style guides](https://www.capcut.com/ideas/gpt-image-2/gpt-image-2-for-brand-style-guides)
- [Allegory — Wikipedia](https://en.wikipedia.org/wiki/Allegory)
- [Obelisk Art History — Allegory](https://www.arthistoryproject.com/subjects/allegory/)
- [Noun Project — Fallacy icons reference](https://thenounproject.com/browse/icons/term/fallacy/)
- [Chromatic visual diff](https://www.chromatic.com/)
- Argumend internal: `types/graph.ts:1-9`, `lib/schemas/topic.ts:33-119`, `lib/variantStyles.ts:31-87`, `lib/analyze/extractor.ts:73-86, 192`, `lib/analyze/offline.ts:165-211`, `lib/db/schema.ts:110`, `components/nodes/EvidenceNode.tsx:75-87`, `components/nodes/RichNode.tsx:99-122`, `data/guides.ts:1444, 1468`, `docs/research/2026-04-28-visual-design/01-gpt-image-2-visual-signature.md`

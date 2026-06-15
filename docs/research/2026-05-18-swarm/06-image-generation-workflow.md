# Image Generation Workflow for Argumend

_Date: 2026-05-19. Audience: solo founder. Goal: ship consistent, on-brand imagery (hero, OG, social, blog) without becoming a full-time prompt engineer._

## TL;DR

- **Primary: FLUX.1 [pro] via Replicate** (~$0.04/image). Best price/quality fit for Argumend's painterly-parchment aesthetic, strong prompt adherence, batch-friendly API. Fallback to **Imagen 4 Standard** ($0.04) when faces/text matter, and **GPT Image 1.5** ($0.04–0.17) when on-image typography is required.
- **House style is a frozen scaffold**, not a free-form prompt. One paragraph of locked stylistic clauses + one variable subject clause + fixed negative prompt = consistent output across 109 topics.
- **Full one-time backfill cost (109 topics × 4 sizes ≈ 436 images @ FLUX pro) ≈ $17.50.** Even with 2× regeneration overhead, the whole library lands well under $50. The bottleneck is curation, not spend.

## Model Comparison (May 2026)

| Model | Cost / 1024² | Strengths | Weaknesses | Argumend fit |
|---|---|---|---|---|
| **FLUX.1 [pro] / 1.1 [pro]** (Replicate, fal.ai, BFL) | $0.04–$0.055 | Painterly + editorial styles, strong prompt adherence, fast (~3–6 s), open weights option for future self-host | Faces still soft; text rendering mid | **Primary.** Matches the LessWrong-y illustrated tone we want. ([BFL](https://bfl.ai/pricing), [Replicate](https://replicate.com/collections/flux)) |
| **FLUX.1 [schnell]** | ~$0.003 | Cheapest credible option, batch-scale generation | Lower detail, weaker on complex compositions | Useful for blog inline figures / drafts. ([Pixazo](https://www.pixazo.ai/blog/flux-schnell-api-cheapest-pricing)) |
| **Imagen 4 (Fast / Standard / Ultra)** | $0.02 / $0.04 / $0.06 | Best photorealism in 2026, excellent on faces/hands, clean compositions | Less expressive on illustration/painterly | Fallback for portraits, "evidence" photographic motifs. ([Magic Hour](https://magichour.ai/blog/imagen-4-pricing-and-api)) |
| **GPT Image 1.5** | $0.009–$0.20 | Best in-image text, instruction-following, easy editing | Slow, costlier, more "AI-generic" look | Fallback for OG cards / YouTube thumbnails where words must render correctly. ([costgoat](https://costgoat.com/pricing/openai-images), [aifreeapi](https://www.aifreeapi.com/en/posts/openai-image-generation-api-pricing)) |
| **Midjourney V7** | $10–$120/mo subscription | Best raw aesthetics, strong artistic defaults | No first-class API, terms restrict automation, manual web/Discord workflow | Skip for batch. Worth $30/mo Standard plan for hero exploration only. ([Midjourney docs](https://docs.midjourney.com/hc/en-us/articles/27870484040333-Comparing-Midjourney-Plans), [evolink](https://evolink.ai/blog/midjourney-api-pricing-2026)) |
| **Stable Diffusion 3.5 Large** | ~$0.03 API, or free self-hosted | Free under $1M revenue, open weights, fine-tunable | Behind FLUX on prompt adherence; needs more tuning | Worth a LoRA experiment later for a true house-style model; not the daily driver. ([Stability pricing](https://platform.stability.ai/pricing), [AIRadar review](https://www.airadartools.com/reviews/stability-sd-3-5-large/)) |

Side-by-side reviews put FLUX as the best illustration-mode pick at this price point; Imagen 4 Ultra wins photoreal; GPT Image 1.5 wins typography. ([Melies](https://melies.co/compare/ai-image-models), [artificialanalysis](https://artificialanalysis.ai/image/models))

**Decision:** FLUX.1 [pro] on Replicate as default, GPT Image 1.5 only for typographic cards, Midjourney Standard ($30/mo) as a manual sandbox for exploring hero looks.

## House-Style Prompt Scaffold

Paste-ready. Variables in `{{...}}`. Same scaffold across every Argumend image; only `{{SUBJECT}}` and optional `{{COMPOSITION_HINT}}` change.

```
{{SUBJECT}}, rendered as an editorial illustration in the Argumend house style:
hand-painted parchment texture background (#f4f1eb warm cream),
muted stoic palette of deep teal (#3a6965), rust orange (#C4613C),
walnut brown (#8B5A3C) and crimson accent (#a23b3b),
inked linework with subtle gouache washes,
slight grain and aged-paper imperfections,
EB Garamond-era engraving sensibility crossed with modern flat editorial illustration
(think New Yorker spot art meets LessWrong diagram meets a stoic philosophy folio),
soft directional light from upper left, shallow palette,
no glossy 3D render, no neon, no chrome, no photoreal skin, no AI-generic gradient mush.
{{COMPOSITION_HINT}}
--ar {{ASPECT}} --style raw
```

Universal **negative prompt** (FLUX / SD): `glossy 3D, neon, chrome, lens flare, stock-photo skin, deepfake-grade photoreal, watermark, signature, logos, garbled text, oversaturated, HDR sheen, cyberpunk, AI-generic gradient sky`.

Aspect presets:
- Topic hero (landscape): `3:2`
- OG / share card: `1200x630` → `1.91:1`
- Instagram square: `1:1`
- YouTube thumbnail: `16:9`
- Podcast cover: `1:1`
- Blog inline: `4:3` or `3:2`

## 10 Ready-to-Use Prompts

Each prompt = scaffold + the `{{SUBJECT}}` / `{{COMPOSITION_HINT}}` below.

1. **Topic hero — "AI risk":** `Two figures playing chess on a marble table where the chessboard is dissolving into circuit traces; one figure is human in a stoic toga, the other a faceless silhouette of folded paper. COMPOSITION: wide landscape, figures centered, plenty of parchment negative space on the right for headline overlay.`
2. **Topic hero — "Climate change":** `An ancient sundial half-submerged in cracked dry earth, with a single green sprout emerging from the gnomon's shadow. COMPOSITION: low horizon line, deep teal sky gradient, rust-toned earth.`
3. **OG share card (1.91:1) — generic Argumend:** `A weathered scroll unrolling across a wooden desk, splitting into two diverging branches of inked argument trees, with small evidence-circles attached like seals. COMPOSITION: leave the left 40 percent as clean parchment for the topic title.`
4. **OG share card — "Universal Basic Income":** `An ornate apothecary balance scale, one pan holding gold coins, the other holding open books and bread loaves, the fulcrum is a small house. COMPOSITION: centered scale, vignetted parchment edges.`
5. **Instagram square — daily crux quote:** `A single oversized question mark rendered as an inked botanical illustration, leaves and roots growing from the curve, sitting on a parchment page with faint Latin marginalia. COMPOSITION: 1:1, motif centered, lower third reserved for a pull-quote.`
6. **Instagram square — fallacy spotlight ("Strawman"):** `A scarecrow made of folded debate transcripts standing in a stoic Mediterranean field, one arm pointing at nothing. COMPOSITION: 1:1, scarecrow off-center left.`
7. **YouTube thumbnail (16:9) — "Is AI conscious?":** `A classical bust of a philosopher with one half of the face replaced by a delicate exposed clockwork mechanism, deep teal background with rust accents. COMPOSITION: bust on right two-thirds, left third reserved for bold headline text.`
8. **YouTube thumbnail — debate recap:** `Two ink-drawn ancient orators facing each other across a glowing crux-crimson fault line in the floor, parchment scroll fragments scattered. COMPOSITION: 16:9, faces in profile, drama.`
9. **Podcast cover (1:1) — "The Argumend Hour":** `A single oil lamp on an open codex, the flame splitting into two intertwined ribbons of teal and rust smoke that form an abstract argument map above it. COMPOSITION: 1:1, symmetrical, intimate.`
10. **Blog inline — "What is a crux?":** `A diagram-style illustration of two stone columns supporting a single keystone labeled with a small crimson circle; faint compass-rose and isometric guides drawn in pencil behind. COMPOSITION: 3:2, schematic-meets-painterly, leave a third of the canvas as annotation space.`

## Batch Script Outline

Lives at `scripts/generate-topic-art.ts`. Run via Bun. Reads existing topic IDs from `data/topics/*.ts`, writes to `public/topic-art/{id}/{variant}.webp`, idempotent (skips files that already exist).

```ts
// scripts/generate-topic-art.ts
import Replicate from "replicate";
import { readdir, mkdir, writeFile, stat } from "node:fs/promises";
import { join, basename } from "node:path";

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN! });
const MODEL = "black-forest-labs/flux-1.1-pro" as const;

const HOUSE_STYLE = `rendered as an editorial illustration in the Argumend house style:
hand-painted parchment texture (#f4f1eb), muted stoic palette of deep teal (#3a6965),
rust orange (#C4613C), walnut brown (#8B5A3C), crimson accent (#a23b3b),
inked linework with subtle gouache washes, aged-paper grain,
New Yorker spot art meets LessWrong diagram meets stoic folio,
soft upper-left light. No glossy 3D, no neon, no photoreal skin, no AI gradient mush.`;

const NEGATIVE = "glossy 3D, neon, chrome, watermark, garbled text, HDR sheen, AI-generic gradient sky";

const VARIANTS = {
  hero:    { aspect: "3:2",    size: [1536, 1024] },
  og:      { aspect: "1.91:1", size: [1200, 630]  },
  square:  { aspect: "1:1",    size: [1080, 1080] },
  youtube: { aspect: "16:9",   size: [1280, 720]  },
} as const;

async function topicIds(): Promise<string[]> {
  const files = await readdir("data/topics");
  return files.filter(f => f.endsWith(".ts")).map(f => basename(f, ".ts"));
}

// Hand-curated or LLM-generated subject lines, keyed by topic id.
// Generate once with a cheap LLM pass over each topic's summary, then human-edit.
const SUBJECTS: Record<string, string> = require("../data/topic-art-subjects.json");

async function exists(p: string) { try { await stat(p); return true; } catch { return false; } }

async function generate(topicId: string, variant: keyof typeof VARIANTS) {
  const outDir = `public/topic-art/${topicId}`;
  const outPath = join(outDir, `${variant}.webp`);
  if (await exists(outPath)) return; // idempotent

  const subject = SUBJECTS[topicId];
  if (!subject) { console.warn(`skip ${topicId}: no subject`); return; }

  const prompt = `${subject}\n${HOUSE_STYLE}`;
  const [{ aspect }] = [VARIANTS[variant]];

  const output = await replicate.run(MODEL, {
    input: {
      prompt,
      negative_prompt: NEGATIVE,
      aspect_ratio: aspect,
      output_format: "webp",
      output_quality: 88,
      safety_tolerance: 5,
    },
  });

  await mkdir(outDir, { recursive: true });
  const url = Array.isArray(output) ? output[0] : output;
  const bytes = new Uint8Array(await (await fetch(url as string)).arrayBuffer());
  await writeFile(outPath, bytes);
  console.log(`ok ${topicId}/${variant}`);
}

const CONCURRENCY = 4; // polite for Replicate
async function main() {
  const ids = await topicIds();
  const jobs = ids.flatMap(id => Object.keys(VARIANTS).map(v => [id, v] as const));
  for (let i = 0; i < jobs.length; i += CONCURRENCY) {
    await Promise.all(jobs.slice(i, i + CONCURRENCY).map(([id, v]) => generate(id, v as any).catch(e => console.error(id, v, e))));
  }
}
main();
```

Companion file `data/topic-art-subjects.json` is generated once with a Claude/codex pass:

```bash
codex run "for each file in data/topics/*.ts, read the summary and emit one\
 short visual SUBJECT clause matching Argumend's stoic-parchment illustration\
 style. Output JSON keyed by topic id." > data/topic-art-subjects.json
```

Then hand-edit the subjects file — that's the only artisan step.

Run: `REPLICATE_API_TOKEN=... bun scripts/generate-topic-art.ts`. Re-running is safe; only missing files regenerate.

## Cost Estimate

Assuming FLUX 1.1 [pro] at ~$0.04/image ([BFL](https://bfl.ai/pricing)):

| Asset class | Count | Variants | Images | Cost @ $0.04 |
|---|---|---|---|---|
| Topic full set (hero + og + square + yt) | 109 | 4 | 436 | $17.44 |
| Blog post inline illustrations | ~30 | 1 | 30 | $1.20 |
| Generic OG / brand cards | 10 | 1 | 10 | $0.40 |
| Instagram weekly post | 52/yr | 1 | 52 | $2.08 / yr |
| Podcast cover variants | 5 | 1 | 5 | $0.20 |
| **Subtotal one-time** | | | **481** | **~$19.32** |
| 2× regen factor (curation) | | | 962 | **~$38.64** |
| Midjourney Standard subscription (optional manual exploration) | | | | $30/mo → $24/mo annual ([docs.midjourney.com](https://docs.midjourney.com/hc/en-us/articles/27870484040333-Comparing-Midjourney-Plans)) |

**Realistic first-month spend: $40–$70 all-in** including a Midjourney month and some Imagen 4 / GPT Image fallback for typography-heavy assets. Steady-state: under $10/month.

## Open Questions

1. **LoRA route?** Worth fine-tuning an SD 3.5 / FLUX LoRA on ~40 curated Argumend images later to lock the house style even harder, eliminating the long style preamble in every prompt.
2. **OG card text rendering — generate or composite?** Cleaner to generate the illustration without text and overlay the headline in Satori/`@vercel/og` at request time. Recommend the composite path for OG specifically; only use GPT Image 1.5 for posters where typography is part of the artwork.
3. **Licensing on Replicate/BFL for commercial use** — FLUX [pro] commercial terms are fine via the API providers, but if we ever self-host the open `[dev]` weights, that license is non-commercial; need to stay on the API path or buy a commercial license. ([BFL pricing](https://bfl.ai/pricing))
4. **Codex-cli vs. direct script** — current Argumend prior work already has a codex pipeline (`docs/research/2026-04-28-codex-image-pipeline/`); should this script be wired into that existing harness instead of standalone?
5. **Human review gate** — at 436 images, eyeballing every one is real work. Worth building a tiny `/admin/art-review` page that shows 4-up regen candidates and lets me pick.

## Sources

- [BFL FLUX API Pricing](https://bfl.ai/pricing)
- [Replicate FLUX collection](https://replicate.com/collections/flux)
- [Replicate Node.js docs](https://replicate.com/docs/get-started/nodejs)
- [Flux Schnell pricing breakdown — Pixazo](https://www.pixazo.ai/blog/flux-schnell-api-cheapest-pricing)
- [Imagen 4 pricing & API — Magic Hour](https://magichour.ai/blog/imagen-4-pricing-and-api)
- [OpenAI image pricing calculator — costgoat](https://costgoat.com/pricing/openai-images)
- [OpenAI image API pricing — AIFreeAPI](https://www.aifreeapi.com/en/posts/openai-image-generation-api-pricing)
- [Midjourney plan comparison](https://docs.midjourney.com/hc/en-us/articles/27870484040333-Comparing-Midjourney-Plans)
- [Midjourney API pricing — Evolink](https://evolink.ai/blog/midjourney-api-pricing-2026)
- [Best AI image models 2026 — Melies](https://melies.co/compare/ai-image-models)
- [Image model leaderboard — artificialanalysis.ai](https://artificialanalysis.ai/image/models)
- [SD 3.5 Large review — AIRadarTools](https://www.airadartools.com/reviews/stability-sd-3-5-large/)
- [Stability AI platform pricing](https://platform.stability.ai/pricing)
- [API costs roundup — BuildMVPFast](https://www.buildmvpfast.com/api-costs/ai-image)

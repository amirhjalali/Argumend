# Argumend Subagent Review and Media Plan

Date: 2026-06-30

This document preserves the initial subagent review and extends it into a content, UI/UX, and generated-media plan.

## Product Goal

Argumend should make contentious disagreement legible through structured maps of positions, evidence, cruxes, confidence, and judgments. The product should remain useful in offline/programmatic mode without API keys or a database, while optional live AI analysis, debate, judging, and persistence can be enabled explicitly.

## Initial Review Summary

### Highest Priority Findings

1. Offline analysis and judging are blocked by auth and persistence.
   - `app/api/analyze/route.ts` requires auth before offline extraction and always calls `saveAnalysis`.
   - `app/api/judge/route.ts` requires auth before offline judging and always calls `saveJudgment`.
   - This conflicts with the README promise that no API keys or DB are required.

2. Auth is effectively always degraded.
   - `lib/db/index.ts` exports `db` as a constant `null`.
   - `lib/auth.ts` branches on that imported value, so the Drizzle adapter branch is unreachable.

3. The topic "Map" route is ambiguous.
   - `components/ReadModeView.tsx` links to `?view=graph`.
   - `app/topics/[id]/TopicPageClient.tsx` routes graph mode to `TopicDetailView`, not the React Flow canvas.
   - The result is two reading experiences instead of a clear read/map split.

4. Live model outputs need runtime schemas.
   - `lib/analyze/extractor.ts` and `lib/judge/prompts.ts` parse model JSON with minimal validation and casts.
   - Bad output can flow into UI state and DB JSON columns.

5. Delivery gates need cleanup.
   - `bun run test -- --run` passed: 20 files, 691 tests.
   - `bun run lint` failed with three hard React hook lint errors.
   - CI currently uses `bun test`, which invokes Bun's runner instead of Vitest.

### Execution Workstreams

1. Offline Contract
   - Owns: `app/api/analyze`, `app/api/judge`, `app/api/debate/*`, `lib/db/*`, `lib/auth.ts`.
   - Goal: anonymous no-DB offline workflows; persistence only when session and DB are available.

2. Schema Boundary
   - Owns: `lib/analyze`, `lib/judge`, `lib/schemas`, `types`.
   - Goal: Zod contracts for extracted arguments, judge responses, API payloads, and graph data.

3. Topic Experience
   - Owns: `app/topics/*`, `ReadModeView`, `TopicDetailView`, read/graph toggles.
   - Goal: distinct read and map modes, no duplicate shell/navigation, clear canvas entry.

4. Verification
   - Owns: `.github`, `package.json`, lint failures, test commands, Docker/Bun pinning.
   - Goal: reliable `lint`, `test`, and `build` gates.

5. Trust and Data
   - Owns: `data/topics/*`, `data/blog.ts`, `data/guides.ts`, `data/faqs.ts`.
   - Goal: safe slugs, runtime content schemas, provenance, citation quality.

6. User State
   - Owns: saved topics, dashboard, debate persistence, account sync.
   - Goal: local anonymous state first, optional authenticated sync second.

## Content, UI/UX, and Media Framing

Argumend has strong written content, but the experience is visually sparse outside a few existing assets. Generated media can add value if it explains reasoning instead of decorating pages. The goal is not stock-photo filler. The media system should make abstract epistemic concepts feel concrete and make dense argument pages easier to scan.

### Current Inventory

As of this review:

- Blog articles: 82
- Guides: 15
- Topics: 152
- Article categories: 27
- Article tags: 233
- Topic categories: policy, science, economics, technology, philosophy
- Topics with `imageUrl`: 26
- Guides with image fields: 0

This is too large for manual one-off art direction. Treat generated media as a content pipeline with schemas, manifests, naming rules, prompts, review status, and fallbacks.

### Media Principles

1. Use media to clarify structure.
   - Show claims, evidence, uncertainty, cruxes, source triangulation, and confidence shifts.

2. Avoid generic controversy imagery.
   - No shouting heads, debate podium cliches, dark conspiracy walls, or sensational topic thumbnails.

3. Prefer reusable visual systems over one-off illustrations.
   - A consistent family of article headers, guide diagrams, topic cards, and OG images will improve the whole product faster than isolated hero art.

4. Keep generated text out of most images.
   - Text-heavy diagrams should be produced in code/SVG/HTML where possible.
   - Use generated raster images mainly for atmospheric headers, conceptual scenes, and rich abstract illustrations.

5. Preserve trust.
   - Topic media should not imply photographic evidence unless it is actually evidentiary.
   - Use illustration or clearly conceptual imagery for contested claims.

6. Match Argumend's existing visual identity.
   - Warm archival paper, restrained editorial illustration, subtle grain.
   - Deep teal, rust, crimson, warm brown, and stone accents.
   - Avoid glossy AI/cyberpunk, courtroom cliches, flags as dominant subjects, public figures, disaster spectacle, and invented readable text.

### Art Direction

Style name: `argumend-editorial-v1`

Base style suffix:

```text
Warm parchment editorial illustration for Argumend, an evidence-based argument mapping platform. Quiet analytical tone, archival paper texture, faint watercolor wash, restrained serif-era academic feel, abstract symbolic composition, subtle teal/rust/crimson accents, soft grain, high craft, no readable text, no logos, no UI mockup, no photorealistic people, no sensational imagery.
```

Negative prompt:

```text
photorealistic portraits, public figures, flags as dominant subject, gore, disaster spectacle, propaganda poster, fake readable text, equations, logos, neon cyberpunk, glossy 3D, generic stock photo, courtroom cliches, shouting people
```

Topic prompt template:

```text
Create an abstract editorial illustration for the debate: "{title}". Core claim: "{meta_claim}". Represent competing explanations and the central crux through layered maps, branching paths, evidence markers, and a balanced but unresolved composition. Category accent: {categoryColor}. {baseStyle}
```

Article prompt template:

```text
Create an editorial article image for "{title}". Theme: {description}. Show the reader moving from confusion to structured evidence: separated signal/noise, annotated source fragments, branching reasoning paths, and one central unresolved question. {baseStyle}
```

Guide prompt template:

```text
Create a calm instructional illustration for the guide "{title}: {subtitle}". Teach the concept visually using abstract diagrams, source cards, paths, and evidence markers. More educational than dramatic. Accent color: {guide.color}. {baseStyle}
```

### Proposed Media Taxonomy

1. Article header images
   - Aspect ratio: 16:9 and 2:1 crops.
   - Style: editorial conceptual photography or restrained matte illustration.
   - Use: blog post hero, article cards, social sharing.

2. Guide chapter illustrations
   - Aspect ratio: 4:3 or 3:2.
   - Style: clean educational illustration.
   - Use: guides such as triangulation, evidence hierarchy, crux test, Bayesian thinking.

3. Topic cover images
   - Aspect ratio: 16:9.
   - Style: neutral conceptual, not persuasive advocacy.
   - Use: topic read header, topic cards, search results.

4. Concept cards
   - Aspect ratio: 1:1 or 4:3.
   - Style: simple symbolic images for concepts such as steel-manning, crux, confidence, fallacy, source reliability.

5. OG/social cards
   - Aspect ratio: 1200x630.
   - Style: code-rendered branded card with optional generated background texture.
   - Use: share previews and verdict cards.

6. Empty and loading states
   - Aspect ratio: flexible small illustrations.
   - Style: quiet, functional, not mascot-driven.
   - Use: saved topics, dashboard, analysis empty state, no search results.

### Asset Sizes and Paths

Canonical generated-media paths:

```text
public/images/generated/topics/{topic-id}/hero.{webp|jpg}
public/images/generated/topics/{topic-id}/og.{webp|jpg}
public/images/generated/topics/{topic-id}/thumb.{webp|jpg}
public/images/generated/blog/{slug}/hero.{webp|jpg}
public/images/generated/blog/{slug}/og.{webp|jpg}
public/images/generated/guides/{id}/hero.{webp|jpg}
public/images/generated/guides/{id}/og.{webp|jpg}
```

Recommended derivatives:

- Hero master: 1600x900
- OG card crop: 1200x630
- Card thumbnail: 800x450
- Square/social fallback: 1080x1080
- Optional node/detail crop: 800x600

Metadata should live in a typed static module instead of being embedded ad hoc in every article/topic object:

```ts
type GeneratedMedia = {
  id: string;
  kind: "topic" | "blog" | "guide";
  title: string;
  prompt: string;
  negativePrompt: string;
  palette: string[];
  styleVersion: "argumend-editorial-v1";
  hero: string;
  og: string;
  thumb?: string;
  alt: string;
  reviewed: boolean;
};
```

### First Batch Candidates

1. Core concept/guides media
   - Triangulation
   - Evidence hierarchy
   - Argument map reading
   - First analysis
   - Source credibility
   - Crux test
   - Bayesian thinking

2. Product workflow media
   - Analyze flow header
   - Debate/judge council explainer
   - Offline/programmatic mode explainer
   - Graph/read mode transition

3. Topic category cover set
   - Policy
   - Technology
   - Science
   - Economics
   - Philosophy

4. High-traffic topic covers
   - AI risk
   - Climate change
   - Universal basic income
   - Nuclear energy
   - Social media mental health
   - Free will
   - COVID origins
   - Moon landing

### Rollout Shape

Phase 1 should not attempt all 249 content surfaces at once. The highest-value first move is a reusable system:

1. Add a typed media manifest and optional media fields.
2. Generate a pilot set of 12-20 assets.
3. Wire those assets into blog cards/article headers and guide cards/pages.
4. Review visual consistency and performance.
5. Batch-generate article/topic media by category.

Recommended pilot scope:

- 7 guide/concept covers for evergreen reasoning education.
- 5 category covers for topic/topic-list affordances.
- 8 article headers for the most important or newest posts.

Recommended batch order:

1. Guides first: stable evergreen concepts and easiest style lock.
2. Blog top 12 by recency/SEO: immediate card and social value.
3. Homepage featured topic plus top traffic topics.
4. Remaining topics by category rotation: policy, technology, science, economics, philosophy.
5. Legacy remote/Unsplash-style topic images last.

### Quality Controls

- Check each image at hero, OG, and thumbnail crops.
- Reject invented readable text, real-person resemblance, propaganda cues, horror/disaster spectacle, and one-note teal/rust wash.
- Require title-safe negative space in top-left or center-left.
- Preview against dark mode (`#1a1917`) and parchment light mode.
- Keep alt text factual and non-poetic, e.g. "Abstract parchment illustration of branching evidence paths for the COVID origins debate."
- Version prompts as `argumend-editorial-v1`; change the version only when the whole style system intentionally shifts.

### Integration Targets

1. Add optional media metadata to content schemas.
   - Blog articles: `heroImage`, `heroAlt`, `heroPrompt`, `imageCredit`.
   - Guides: `coverImage`, `coverAlt`, `chapterImages`.
   - Topics: use existing `imageUrl`, but define stronger semantics and fallback behavior.

2. Create a project media directory.
   - `public/images/generated/articles/`
   - `public/images/generated/guides/`
   - `public/images/generated/topics/`
   - `public/images/generated/concepts/`
   - `public/images/generated/system/`

3. Add image manifest data.
   - A typed manifest can track slug, path, alt text, prompt, generation date, intended placements, and review status.

4. Update UI incrementally.
   - Blog cards and article pages first.
   - Guide landing and guide pages second.
   - Topic pages third, because trust semantics matter more there.
   - Empty states and product workflow media fourth.

### UX Placement Rules

Use media differently across the product:

1. Topic read pages
   - Add visible topic hero media, but it should look like an explanatory argument-map thumbnail rather than generic photography.
   - Best placements: `components/ReadModeView.tsx` header and topic metadata/OG in `app/topics/[id]/page.tsx`.

2. Topic OG images
   - Improve share cards by showing the first crux and a tiny three-pillar visual.
   - Keep them argument-structured and text-rendered in code where possible.

3. Guides and concepts
   - Add small inline diagrams where abstract ideas need explanation: cruxes, confidence, evidence hierarchy, source credibility, bias, and argument maps.
   - Guides should get generated visual covers before topics get per-pillar visuals.

4. Topic cards
   - Keep cards dense and comparable.
   - Prefer micro-visuals, confidence strips, or category-coded mini topology.
   - Avoid full photo thumbnails in the topic grid.

5. Blog
   - Add visible generated editorial media to the featured blog card and article detail header.
   - Secondary blog cards can get thumbnails later after style is proven.

6. Search and glossary
   - Keep search compact; avoid thumbnails.
   - Use at most one category-level glossary schematic, not per-term media.

7. Graph nodes
   - Use media sparingly inside expanded nodes.
   - Show images only when they are evidence or clarify a source/document/map, not as decoration.

### Existing Media State

- Blog has 82 articles and no media fields.
- Guides have 15 entries, icon/color fields, and no bitmap fields.
- FAQ has 73 entries and should remain mostly text-first.
- Concepts have 6 entries and no image fields.
- Topics already have partial image slots: `Topic.imageUrl`, `Pillar.image_url`, `Question.imageUrl`.
- Current runtime counts: 26 topic images, 53 pillar images, 39 question images across 152 topics, 412 pillars, and 257 questions.
- Existing topic images are mostly external Unsplash URLs; generated assets should move the product toward local static images under `public/images/generated`.
- There is a dormant `scripts/generate-topic-images.py` targeting `public/images/topics`, but the current public inventory does not contain that output.

## Subagent Plan for Media Expansion

1. Content Inventory Agent
   - Audit blog/guides/topics/questions/concepts for missing media.
   - Produce a prioritized media backlog and required metadata fields.

2. UX Placement Agent
   - Identify exact components and routes where media helps comprehension.
   - Flag places where media would add clutter or hurt density.

3. Art Direction Agent
   - Define the visual language, prompt templates, aspect ratios, naming, and QA rules.
   - Produce batch prompts for first 20-30 assets.

4. Implementation Agent
   - Add schema fields, manifest, components, and responsive rendering.
   - Keep defaults working with no generated assets.

5. Generation Agent
   - Generate approved first-batch images.
   - Save assets into `public/images/generated`.
   - Record prompts and alt text in the manifest.

## Immediate Implementation Slice

Start with a narrow but real vertical slice:

1. Add `data/generatedMedia.ts` with the typed manifest and helpers.
2. Add first pilot entries for:
   - `guides/how-to-read-an-argument-map`
   - `guides/evidence-hierarchy`
   - `guides/triangulation`
   - `blog/did-covid-come-from-a-lab`
   - `blog/what-would-change-your-mind`
   - `topics/ai-risk`
   - `topics/climate-change`
   - `topics/moon-landing`
   - Expanded blog batch: `could-ai-be-conscious`, `is-fluoride-in-water-safe`, `are-gmos-safe`, `are-vaccine-mandates-justified`, `fact-or-value`, `why-steel-manning-makes-you-smarter`, `5-logical-fallacies-in-online-debates`, `how-confidence-scores-change-thinking`, `nuclear-energy-what-both-sides-get-right`, `argue-against-your-own-beliefs`, `what-is-a-crux-and-why-it-matters`, and `dunning-kruger-in-political-debates`.
3. Generate local hero assets for those pilot entries. Prefer WebP when the local toolchain supports it; the current pilot uses compressed JPEGs because this machine's available `sips` writer supports JPEG output but not WebP output.
4. Wire guide and blog detail headers to use manifest media when present.
5. Keep all pages working when media is absent.

### Pilot Implementation Status

Implemented in this slice:

- Added `data/generatedMedia.ts` with typed media entries, local paths, dimensions, alt text, and prompts.
- Generated and compressed 20 pilot hero images under `public/images/generated`: 14 blog articles, 3 guides, and 3 topics.
- Wired generated media into:
  - Blog article metadata and article headers.
  - Blog index featured/secondary cards when media exists.
  - Guide metadata, guide headers, and guide index cards.
  - Topic metadata/social images for the three pilot topics.

## Open Decisions

1. Whether generated article/topic media should be committed directly to the repo or produced in a separate asset pipeline.
2. Whether topic media should be per-topic from the start or category-level first.
3. Whether OG cards should stay primarily code-rendered or use generated background art.
4. How strict review should be before publishing generated topic imagery.

# Codex Agentic Workflows for Argumend's Image Pipeline

**Date:** 2026-04-28
**Analyst:** Research agent 02/7, Codex image-pipeline swarm
**Brief:** How to structure multi-step Codex jobs that take Argumend's topic data as input and produce on-brand image assets at scale, with quality control, retry logic, and human checkpoints.

## 1. The Three Job Archetypes

Argumend's image needs collapse to three workflow shapes, each with different ergonomics. The mistake that wastes founder time is treating them as one pipeline.

**(a) Ad-hoc one-off — "generate a hero image for next blog post."** A founder running `codex` interactively in `~/argumend/`, pasting the post draft, asking for one image, iterating in chat until it lands, then committing. Latency tolerant (you're sitting there), drift tolerant (you'll catch it), but expensive in human attention. Perfect for Codex CLI's interactive mode; bad as a model for the other two.

**(b) Batch over a corpus — "generate OG images for all 109 topics."** Dispatched once, runs unattended for 30-60 minutes, produces 109 candidate folders, the founder reviews a contact sheet, accepts/rejects, regenerates rejects. Latency irrelevant, drift the dominant risk, parallelism the dominant opportunity. This wants a Codex *spec* (an `AGENTS.md`-shaped task brief plus an Agent Skill — see [Codex Skills docs](https://developers.openai.com/codex/skills)), executed via the Agents SDK with a project-manager pattern, not interactive chat.

**(c) On-demand at runtime — "generate when a user creates a new topic."** Triggered by a webhook from `app/api/analyze/`, must not block the user. Latency and cost dominant. This is *not* a Codex job at all — Codex CLI is a developer tool, not a runtime service. It should be a thin Next.js route at `app/api/topics/[id]/og/route.ts` that calls `gpt-image-2` directly with the same prompt template, skipping human review and using a generic fallback when the vision critic fails twice.

The rest of this memo focuses on (b), with notes on (a) and (c) where the architecture diverges.

## 2. Anatomy of a Well-Designed Codex Job

A reliable Codex agentic job has six layers. Each layer is a real artifact you check into the repo so the next person (or the next Codex run) can reproduce it.

```
codex-jobs/
└── og-images-batch/
    ├── AGENTS.md             # what Codex reads first — house rules
    ├── SPEC.md               # this specific job's contract
    ├── input.schema.ts       # Zod schema for the input
    ├── prompt-template.ts    # topicToImagePrompt() function
    ├── critic-prompt.md      # vision-review prompt for GPT-4o
    ├── runbook.sh            # the actual command sequence
    └── staging/              # output landing zone (gitignored)
        └── {topic-slug}/
            ├── prompt.txt
            ├── candidate-{seed}.png
            ├── critic-verdict.json
            └── final.png      # symlinked after human approval
```

The **AGENTS.md** layer is what Codex CLI auto-injects into the context window at session start ([AGENTS.md spec](https://developers.openai.com/codex/guides/agents-md)). It's house rules — palette, fonts, the locked Natural-Philosophy Notebook signature, the never-touch list. Same content for every image job, written once.

The **SPEC.md** is the per-job contract. It declares: input source, output location, success criteria, retry budget, human-checkpoint policy. Codex reads it as a task brief. Below is what one looks like for the OG-batch job — this is what you'd actually paste into Codex CLI.

```markdown
# SPEC: OG Image Batch — Top-12 Topics

## Input
Read /Users/amirhjalali/argumend/data/topics.ts. Filter to the 12
topic IDs listed in INPUT_IDS.json (top traffic from analytics).

## Output
For each topic, write to staging/{topic-slug}/:
  - prompt.txt          (the final assembled prompt)
  - candidate-*.png     (raw gpt-image-2 outputs, max 3)
  - critic-verdict.json (vision-critic JSON output)
  - final.png           (created by human reviewer, not by you)

## Generation
Use gpt-image-2-2026-04-21, quality=high, size=1024x1024,
n=1 per attempt. Build prompts via topicToImagePrompt() from
prompt-template.ts. Save the seed in the filename.

## Vision review
After each generation, invoke critic-prompt.md against the output
using gpt-4o. Parse the JSON verdict. If verdict=PASS, stop. If
verdict=FAIL with reason in the auto-fixable list (palette drift,
text gibberish on background only), regenerate with the suggested
fragment patch. Cap retries at 2.

## Human checkpoint
After all 12 topics have at least one PASS, stop. Do not commit.
Write a STATUS.md summarizing pass/fail/retries, then exit. The
human runs `bun run review:og-batch` to open the contact sheet.

## Failure budget
If 4+ topics fail twice, halt the entire batch and write a HALT.md
explaining what's drifting. Do not silently consume API credit.
```

This SPEC is the "input contract." Codex follows it by reading top-down. The `runbook.sh` is the executable equivalent — `codex exec --skill og-image-batch < SPEC.md` — so you can re-run the job non-interactively.

## 3. Reading Argumend Topic Data

Argumend's topic shape is locked in `lib/schemas/topic.ts` as a Zod schema. The fields that matter for image prompts are: `title`, `meta_claim` (the one-sentence claim being argued), `status` (settled/contested/highly_speculative — drives mood), `category` (policy/technology/science/economics/philosophy — drives the marginal-artifact pick), `pillars[].title` (the 3-5 sub-arguments), and `pillars[].crux.title` (the load-bearing point). Evidence is per-pillar with explicit `side: "for" | "against"` weights — this is what feeds the rust/brown side dots and the deep-teal evidence dots.

Confidence score is computed at runtime via `computeConfidenceScore(pillars)` from `lib/schemas/topic.ts`. That number — 0 to 100 — is what determines how the crux mark is drawn (high confidence: solid crimson; contested: half-shaded; speculative: dashed outline).

The reading code is short:

```ts
// codex-jobs/og-images-batch/load-topics.ts
import { topics } from "@/data/topics";
import { computeConfidenceScore, type Topic } from "@/lib/schemas/topic";
import inputIds from "./INPUT_IDS.json";

export type ImageManifestEntry = {
  topicId: string;
  slug: string;
  title: string;
  metaClaim: string;
  status: Topic["status"];
  category: Topic["category"];
  confidence: number;
  pillarCount: number;
  cruxLabel: string;        // first pillar's crux.title, the headline crux
  evidenceCount: number;    // total evidence items, used to size the graph
  proponentCount: number;
  skepticCount: number;
};

export function buildManifest(): ImageManifestEntry[] {
  return topics
    .filter((t) => inputIds.includes(t.id))
    .map((t) => {
      const allEvidence = t.pillars.flatMap((p) => p.evidence ?? []);
      return {
        topicId: t.id,
        slug: t.id,
        title: t.title,
        metaClaim: t.meta_claim,
        status: t.status,
        category: t.category,
        confidence: computeConfidenceScore(t.pillars),
        pillarCount: t.pillars.length,
        cruxLabel: t.pillars[0]?.crux.title ?? "the load-bearing point",
        evidenceCount: allEvidence.length,
        proponentCount: allEvidence.filter((e) => e.side === "for").length,
        skepticCount: allEvidence.filter((e) => e.side === "against").length,
      };
    });
}
```

This is the input contract for the prompt template. Notice what's deliberately *not* in the manifest: the full pillar bodies, the evidence descriptions, the equations. The image prompt cannot consume that volume of text and would not benefit. The prompt only needs the structural shape (how many nodes, how many sides, which crux is the headline) plus the topic's identity (title, claim, category).

## 4. Prompt Template Design

The locked Natural-Philosophy Notebook signature lives in `lib/visual/prompt-fragments.ts` per the [visual-design memo](../2026-04-28-visual-design/01-gpt-image-2-visual-signature.md). The template is a pure function from a manifest entry to a single string:

```ts
// codex-jobs/og-images-batch/prompt-template.ts
import { VISUAL_PROMPT_FRAGMENTS as F } from "@/lib/visual/prompt-fragments";
import type { ImageManifestEntry } from "./load-topics";

const ARTIFACTS_BY_CATEGORY = {
  policy:     "weighing scale",
  technology: "compass and dividers",
  science:    "astrolabe",
  economics:  "hourglass with coins",
  philosophy: "manuscript fragment with quill-and-inkwell",
} as const;

const STATUS_CRUX_STYLE = {
  settled:            "filled solid crimson #a23b3b",
  contested:          "half-filled crimson #a23b3b with the right side hatched",
  highly_speculative: "outlined in dashed crimson #a23b3b, hollow center",
} as const;

export function topicToImagePrompt(m: ImageManifestEntry): string {
  const nodeCount = Math.min(7, Math.max(3, m.pillarCount + 2));
  const artifact  = ARTIFACTS_BY_CATEGORY[m.category];
  const cruxStyle = STATUS_CRUX_STYLE[m.status];

  return [
    F.base,
    F.graph.replace("[N]", String(nodeCount)),
    `One node — the central one — is ${cruxStyle}, with a marginal note in EB Garamond italic reading "${m.cruxLabel}" pointing to it.`,
    `${m.proponentCount > 0 ? `${Math.min(3, m.proponentCount)} adjacent nodes carry small rust #C4613C dots labeled "for".` : ""}`,
    `${m.skepticCount > 0 ? `${Math.min(3, m.skepticCount)} adjacent nodes carry small earth-brown #8B5A3C dots labeled "against".` : ""}`,
    F.evidence,
    F.artifact.replace("[astrolabe|weighing scale|hourglass|manuscript fragment|compass|dividers|sealing wax|quill-and-inkwell]", artifact),
    `A title bar across the top in EB Garamond serif, deep teal #3a6965, reads exactly: "${m.title}".`,
    `Below the title in smaller EB Garamond italic stone gray #3d3a36: "${truncate(m.metaClaim, 90)}".`,
    F.typography,
    F.constraints,
    "Aspect ratio 1:1, 1024x1024.",
  ].filter(Boolean).join(" ");
}

function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}
```

**Three concrete examples** (titles and claims pulled from the actual repo):

*Climate Change* (`science`, `settled`, confidence 95):
"...3 nodes carry rust dots labeled 'for'... One node filled solid crimson with marginal note 'The Suess Effect Measurement'... ink illustration of an astrolabe... Title: 'Climate Change'... 'Climate change is primarily caused by human activity.'"

*AI Risk* (`technology`, `contested`, confidence ~60):
"...One node half-filled crimson with the right side hatched, marginal note 'Instrumental Convergence'... 3 rust dots, 3 brown dots... ink illustration of a compass and dividers... Title: 'Existential Risk from AGI'..."

*Artificial Reproduction Ethics* (`philosophy`, `highly_speculative`, confidence ~40):
"...One node outlined in dashed crimson, hollow center, marginal note '[crux label]'... 2 rust dots, 4 brown dots... ink illustration of a manuscript fragment with quill-and-inkwell... Title: 'Artificial Reproduction Ethics'..."

The same template produces all three. The variation comes from the manifest, not from prose engineering. This is the documented [one-axis-variation pattern](https://fal.ai/learn/tools/prompting-gpt-image-2) — keep the scaffold identical, vary one structural variable (here: status, category, pillar count) per topic.

## 5. The Vision-Review Loop

GPT-4o-vision (or gpt-5-vision when you have access) is the second model in the pipeline — it never generates, only judges. The methodology is OpenAI's own ([Image Evals cookbook](https://developers.openai.com/cookbook/examples/multimodal/image_evals)): split criteria into **gates** (pass/fail, hard) and **graded signals** (0-5, soft). Average nothing across the gate.

```markdown
# critic-prompt.md

You are evaluating a generated brand image against the locked Argumend
"Natural-Philosophy Notebook" signature. Return JSON only.

## Gates (any FAIL = overall FAIL, regardless of graded scores)

- title_text_correct: The title bar must read EXACTLY "{expectedTitle}",
  no misspellings, no added words, no missing characters.
- wordmark_present_and_correct: The lower-right corner must contain the
  literal text "argumend.org" in a sans-serif font, stone gray, NOT in
  a serif and NOT misspelled.
- palette_compliance: The dominant background must sample within
  #f0ede5 to #f6f3ed (warm cream). No amber, no tangerine, no neon.
  The crux mark must be crimson (#a23b3b family), not maroon, not red-
  orange, not pink.
- motif_present: There must be a hand-drawn ink graph of 3-7 nodes
  AND at least one classical-artifact illustration in the margins.

## Graded (0-5, all must be >= 3 for PASS)

- linework_quality: pen pressure variation visible, not flat vector.
- composition_balance: 60/40 subject/negative-space, no crowding.
- typography_fit: serifs read as EB Garamond, not Times Roman or
  Garamond Premier.
- artifact_legibility: the marginal artifact is recognizable as the
  named object (astrolabe / weighing scale / etc.).

## Output

{
  "verdict": "PASS" | "FAIL",
  "title_text_correct": true | false,
  "wordmark_present_and_correct": true | false,
  "palette_compliance": true | false,
  "motif_present": true | false,
  "linework_quality": 0-5,
  "composition_balance": 0-5,
  "typography_fit": 0-5,
  "artifact_legibility": 0-5,
  "fail_reasons": ["short, machine-readable strings"],
  "auto_fixable": true | false,
  "patch_suggestion": "single fragment-name to swap, or null"
}
```

**Auto-retry rules:** if `auto_fixable=true` and the fail reasons include only `palette_compliance` or `linework_quality`, retry with a fragment patch (swap the `base` fragment for the more-saturated variant; bump linework instructions). Cap retries at **2**. After two fails, mark the topic as `needs_human` in `STATUS.md` and move on. Never let a single topic burn unbounded API credit — the [public failures thread](https://community.openai.com/t/collection-of-gpt-image-generator-2-0-issues-bugs-and-work-around-tips-check-first-post/1379535) has multiple horror stories of agents looping on a stubborn drift case.

## 6. Human Checkpoint Patterns

Two patterns work; one is sneaky-good. The bad pattern is "block on stdin" — Codex CLI sitting at a prompt waiting for the founder to choose A/B/C/D. That breaks unattended overnight runs and adds zero value over async review.

**Pattern 1 — Staging directory + contact sheet (recommended for batch).** Codex never blocks. It writes all candidates plus a `staging/CONTACT_SHEET.html` that the founder opens in a browser; clicking a thumbnail accepts that candidate (writes `final.png` symlink). A small `bun run review:og-batch` script wraps this — Argumend already has the Bun + standalone-Next pattern, so a tiny review server is one file. The advantage: the founder reviews on a phone over coffee, not blocking the laptop.

**Pattern 2 — Slack/email notification on completion (recommended for ad-hoc).** Codex finishes, sends one message ("12 candidates ready, link to staging"), exits. This is what Anthropic's own docs call the [PushNotification pattern](https://developers.openai.com/codex/cli/features) — applies equally to Codex.

**Pattern 3 — Interactive Codex chat (only for the (a) ad-hoc archetype).** The founder sits there, says "make node 3 more central," gets a regen, iterates 4-6 times. This is fine for a single blog hero. Do not use it for batch.

The honest pattern composition: batch jobs use Pattern 1 + Pattern 2 together (write contact sheet, then ping). Runtime jobs (archetype c) use neither — the auto-retry vision loop is the only gate, with a generic fallback image if both retries fail.

## 7. Batch Orchestration over 109 Topics

The full corpus is 109 topics ([data/topics/](../../../data/topics/)). The constraints are:

**Parallelism budget.** Tier 1 OpenAI API rate limit on `gpt-image-2` is 5 images/minute. Tier 2 (which Argumend likely is on after $50 lifetime spend) lifts this to 20 IPM. With vision-critic round-trips, real throughput is ~10 topics/minute on Tier 2. The 109-topic corpus completes in ~12 minutes if everything passes first try, ~25 minutes with realistic 30% retry rate. **Don't parallelize beyond `Promise.all` with a concurrency limit of 8** — go wider and you'll hit rate-limit 429s, and the recovery code is more failure surface than savings.

**Progress reporting.** Write a `STATUS.md` after each topic completes. Append, never rewrite. Format:

```
[2026-04-28T19:14:22Z] climate-change         PASS retries=0 seed=7a3f
[2026-04-28T19:14:38Z] ai-risk                PASS retries=1 seed=2b91
[2026-04-28T19:14:55Z] free-will              FAIL retries=2 reason=palette_drift
```

**Resumability.** Before generating, the runbook reads `STATUS.md` and skips any topic with a recent PASS line. This is the cheapest possible idempotency — no database, no state machine, just an append-only log. To resume an interrupted run, re-run the same command. To force a regen, delete the topic's lines from `STATUS.md` and its `staging/{slug}/` folder.

**Output organization.** One folder per topic under `staging/`, three files inside: `prompt.txt` (the exact text sent), `candidate-{seed}.png` (one per attempt, all kept for debugging), `final.png` (only after human approval). Post-processing (the parchment levels curve, the vector logo overlay) runs as a separate `bun run finalize` step on `final.png` files only — never on candidates, because candidates are throwaway.

**The actual command:**

```bash
codex exec --skill og-image-batch \
  --spec ./SPEC.md \
  --concurrency 8 \
  --halt-on-budget 50 \
  > runs/og-batch-$(date +%s).log
```

`--halt-on-budget` is the hard kill: if `vision_failures >= 50` halt and write a HALT.md. This is the documented counter to runaway costs in the [agentic-image-pipeline literature](https://github.com/paulsuryanshu/multimodal-agentic-poc).

## 8. Failure Modes and Mitigations

**Wordmark drift.** Image 2's text rendering is at ~95% real-world accuracy ([TechCrunch review](https://techcrunch.com/2026/04/21/chatgpts-new-images-2-0-model-is-surprisingly-good-at-generating-text/)) but the wordmark is brand-critical so any failure is unacceptable. *Mitigation:* the vision critic gates on it, and post-processing always overlays the vector logo on top regardless of what the model drew. Defense in depth.

**Palette drift toward amber.** Documented bias when "warm cream" or "parchment" appears in the prompt. *Mitigation:* explicit negative constraint in `F.constraints` ("No amber. No yellow. No tangerine."), gated by the vision critic with a hex-range check, plus a Photoshop levels droplet that flattens the background curve in post.

**Motif inconsistency across batch.** Different topics drawing different styles of "graph" — sometimes flowchart, sometimes mindmap, sometimes neural-net. *Mitigation:* the `F.graph` fragment is verbatim across every prompt and uses the specific phrase "hand-drawn ink graph...with a fine dip pen, visible pressure variation in the linework." This is the [reference-image anchoring pattern](https://www.imagine.art/blogs/gpt-image-2-prompt-guide) without an actual reference image — words alone, but identical words.

**Text gibberish in the body.** Image 2 will sometimes invent labels on the secondary nodes ("evidnce", "skeptci"). *Mitigation:* the prompt instructs labels to be in EB Garamond italic — gibberish in italic serif is harder to spot, but the vision critic catches it because the gates require labels to be either "for" or "against" or empty. If the critic finds an unrecognized label, FAIL.

**"Generic AI image" fallback.** Sometimes the model outputs an obviously stock-AI-looking image — too smooth, too symmetrical, neon edges. *Mitigation:* the `linework_quality` graded signal under 3 forces a regen. After 2 retries, the topic is escalated to human review rather than shipped — this is non-negotiable. There's a fallback static image at `public/og/fallback.png` that runtime jobs (archetype c) can serve, so the on-demand path never blocks.

**Faces drift across batches.** Acknowledged in [the visual-design memo](../2026-04-28-visual-design/01-gpt-image-2-visual-signature.md): avoid faces in v1 entirely. The Natural-Philosophy Notebook signature is faceless by design.

## 9. End-to-End Example: Top-12 OG Images

**Setup.** The founder picks the 12 highest-traffic topic slugs from analytics, drops them into `codex-jobs/og-images-batch/INPUT_IDS.json`. Writes a one-line task brief: *"Generate OG images for these 12 topics, batch mode, contact sheet for review."*

**The runbook commands:**

```bash
cd /Users/amirhjalali/argumend
codex exec --skill og-image-batch \
  --spec codex-jobs/og-images-batch/SPEC.md \
  --concurrency 8 \
  --halt-on-budget 30 \
  | tee runs/og-top12-2026-04-28.log
```

**What Codex does, step by step:**

1. Reads `~/.codex/AGENTS.md` and project `AGENTS.md` — house rules locked.
2. Reads `SPEC.md` — task contract locked.
3. Loads the manifest via `buildManifest()` from `load-topics.ts`. 12 entries.
4. For each entry (concurrency 8): builds the prompt via `topicToImagePrompt()`, writes `prompt.txt`, calls `gpt-image-2-2026-04-21` at `quality=high size=1024x1024`, saves `candidate-{seed}.png`.
5. Calls `gpt-4o` with `critic-prompt.md` + the candidate, parses JSON.
6. If PASS: writes `critic-verdict.json`, appends PASS line to `STATUS.md`, moves on.
7. If FAIL with `auto_fixable=true`: regenerates with the patch suggestion. Up to 2 retries.
8. If FAIL after retries: appends FAIL line, marks for human review.
9. After all 12 complete: writes `staging/CONTACT_SHEET.html`, sends a Slack/email ping ("Top-12 OG batch ready, 11 PASS / 1 needs review").
10. Exits.

**Artifacts produced:**

```
codex-jobs/og-images-batch/staging/
├── STATUS.md                      # the append-only log
├── CONTACT_SHEET.html             # opens in browser
├── climate-change/
│   ├── prompt.txt
│   ├── candidate-7a3f.png         # PASSed first try
│   ├── critic-verdict.json
│   └── final.png -> candidate-7a3f.png
├── ai-risk/
│   ├── prompt.txt
│   ├── candidate-2b91.png         # FAILed, palette
│   ├── candidate-9c44.png         # PASSed retry
│   ├── critic-verdict.json
│   └── final.png -> candidate-9c44.png
├── ...
└── free-will/
    ├── prompt.txt
    ├── candidate-1e7a.png         # FAILed
    ├── candidate-4f02.png         # FAILed retry
    ├── critic-verdict.json
    └── NEEDS_HUMAN.md             # human picks up here
```

**Founder's review** takes ~10 minutes: opens the contact sheet, accepts 11 thumbnails, looks at Free Will manually, accepts it, runs `bun run finalize:og-batch` which applies the Photoshop droplet and overlays the vector logo. Then `git add public/og/*.png && git commit`. Total wall-clock: ~45 minutes, of which ~30 was Codex running unattended.

**Cost.** 12 topics × 1.3 average attempts × $0.211/image (high quality) = **~$3.30** for generation, plus ~$0.40 for the GPT-4o vision-critic calls. Total: under $4 for the batch.

---

## Sources

- [OpenAI — AGENTS.md spec](https://developers.openai.com/codex/guides/agents-md)
- [OpenAI — Codex Agent Skills](https://developers.openai.com/codex/skills)
- [OpenAI — Codex CLI features](https://developers.openai.com/codex/cli/features)
- [OpenAI Cookbook — Building Consistent Workflows with Codex CLI & Agents SDK](https://developers.openai.com/cookbook/examples/codex/codex_mcp_agents_sdk/building_consistent_workflows_codex_cli_agents_sdk)
- [OpenAI Cookbook — Image Evals for Image Generation and Editing](https://developers.openai.com/cookbook/examples/multimodal/image_evals)
- [OpenAI Cookbook — GPT Image Models Prompting Guide](https://developers.openai.com/cookbook/examples/multimodal/image-gen-models-prompting-guide)
- [OpenAI Developer Community — gpt-image-2 announcement](https://community.openai.com/t/introducing-gpt-image-2-available-today-in-the-api-and-codex/1379479)
- [OpenAI Developer Community — gpt-image-2 issues, bugs, workarounds](https://community.openai.com/t/collection-of-gpt-image-generator-2-0-issues-bugs-and-work-around-tips-check-first-post/1379535)
- [TechCrunch — ChatGPT Images 2.0 is surprisingly good at text](https://techcrunch.com/2026/04/21/chatgpts-new-images-2-0-model-is-surprisingly-good-at-generating-text/)
- [Confident AI — LLM-as-a-Judge guide](https://www.confident-ai.com/blog/why-llm-as-a-judge-is-the-best-llm-evaluation-method)
- [Evidently AI — LLM-as-a-judge complete guide](https://www.evidentlyai.com/llm-guide/llm-as-a-judge)
- [Label Your Data — LLM as a Judge 2026 Guide](https://labelyourdata.com/articles/llm-as-a-judge)
- [GitHub — paulsuryanshu/multimodal-agentic-poc](https://github.com/paulsuryanshu/multimodal-agentic-poc)
- [arXiv — ImAgent: Unified Multimodal Agent for Test-Time Scalable Image Generation](https://arxiv.org/abs/2511.11483)
- [InfoQ — Orchestrating Agentic Multimodal AI Pipelines with Apache Camel](https://www.infoq.com/articles/orchestrating-agentic-multimodal-ai-pipelines-apache-camel/)
- [The Prompt Shelf — AGENTS.md for OpenAI Codex 2026 setup guide](https://thepromptshelf.dev/blog/agents-md-codex-setup-guide-2026/)
- [fal.ai — GPT Image 2 prompting guide](https://fal.ai/learn/tools/prompting-gpt-image-2)
- [Imagine.art — GPT Image 2 prompt guide](https://www.imagine.art/blogs/gpt-image-2-prompt-guide)
- [Argumend — visual signature memo (sibling research)](../2026-04-28-visual-design/01-gpt-image-2-visual-signature.md)
- [Argumend — lib/schemas/topic.ts](../../../lib/schemas/topic.ts)
- [Argumend — data/topics/](../../../data/topics/)

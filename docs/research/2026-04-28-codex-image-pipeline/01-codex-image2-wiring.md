# Codex CLI + GPT Image 2.0 — Technical Wiring Foundation

**Date:** 2026-04-28
**Analyst:** Research agent 01/7, Codex-image-pipeline swarm
**Brief:** Lay the technical wiring for an OpenAI Codex agent to programmatically generate GPT Image 2.0 assets for Argumend — auth, SDK choice, scripts, scaffolding, and minimum-viable integration.

## 1. OpenAI Codex CLI — April 2026 Snapshot

OpenAI's `codex` CLI is the local, terminal-resident form of its coding agent — open-source, written in Rust, installable in two lines. As of **version 0.125.0 (April 24, 2026)** it has had 744 GitHub releases since the May 2025 launch ([Codex GitHub](https://github.com/openai/codex), [Codex Changelog](https://developers.openai.com/codex/changelog)).

```bash
npm i -g @openai/codex            # node 18+; preferred for JS/TS shops
brew install --cask codex         # macOS via Homebrew
npm i -g @openai/codex@latest     # upgrade in place
```

Pre-built binaries also ship on the GitHub Releases page for macOS Apple Silicon/x86_64 and Linux x86_64/arm64 ([Codex CLI install](https://developers.openai.com/codex/cli)).

**Backbone models.** Codex now defaults to **GPT-5.5**, OpenAI's newest frontier coding model rolled out April 23, 2026 in version 0.124.0. GPT-5.4 remains the prior default; GPT-5.4-mini is available for cheaper subagents ([Codex Models](https://developers.openai.com/codex/models), [Simon Willison on GPT-5.5](https://simonwillison.net/2026/Apr/23/gpt-5-5/)).

**Auth.** Two mutually exclusive paths per session:

1. **`codex login`** runs OAuth against your ChatGPT account and uses subscription quota — Plus, Pro, Business, Edu, Enterprise. Recommended for solo development ([Using Codex with your ChatGPT plan](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan)).
2. **`OPENAI_API_KEY` env var** routes calls through the API — pay-as-you-go via the Platform dashboard. Required for headless CI. The CLI also accepts `CODEX_API_KEY` as a CI alias ([Non-interactive mode](https://developers.openai.com/codex/noninteractive)).

**Pricing (post April 2, 2026 token-aligned shift):**

| Plan | Monthly cost | Codex usage |
|---|---|---|
| Plus | $20/mo | Standard 1x quota |
| Pro | $200/mo | 20x Plus baseline; temporary 25x cap through May 31, 2026 |
| Business | $30/user/mo | Pay-as-you-go or seat-based; workspace credits |
| Enterprise | Negotiated | Same flexible billing since April 23, 2026 |
| Go | $8/mo | New ad-supported tier |

Sources: [ChatGPT Plans](https://chatgpt.com/pricing/), [Codex flexible pricing](https://openai.com/index/codex-flexible-pricing-for-teams/), [TechCrunch — $100/mo Pro](https://techcrunch.com/2026/04/09/chatgpt-pro-plan-100-month-codex/), [Codex rate card](https://help.openai.com/en/articles/20001106-codex-rate-card).

**CLI vs. Cloud vs. IDE Extension** — same agent core, same `~/.codex/config.toml`, different execution surface ([Cloud](https://developers.openai.com/codex/cloud), [IDE extension](https://developers.openai.com/codex/ide)):

| Surface | Where it runs | Best for |
|---|---|---|
| **Codex CLI** | Local terminal, full filesystem | Iterative dev, scripted batches |
| **IDE extension** | VS Code / Cursor / Windsurf side panel | Inline edits, dispatching Cloud tasks |
| **Codex Cloud** | OpenAI-hosted ephemeral VM | Long-horizon parallel agent fleets |

For Argumend, **CLI is the primary surface** — local repo, local filesystem write, headless `codex exec` for batch runs.

## 2. GPT Image 2.0 API Surface

`gpt-image-2` (snapshot ID `gpt-image-2-2026-04-21`, alias `chatgpt-image-latest`) shipped to the API on April 22, 2026 and is exposed at three endpoints ([gpt-image-2 model card](https://developers.openai.com/api/docs/models/gpt-image-2), [Image generation guide](https://developers.openai.com/api/docs/guides/image-generation)):

- `POST /v1/images/generations` — text-to-image
- `POST /v1/images/edits` — image-to-image with optional mask, accepts up to 16 reference images
- `POST /v1/images/variations` — legacy DALL-E endpoint, **not supported** for `gpt-image-2`; do not use

**Parameter surface (generations):**

| Param | Values | Notes |
|---|---|---|
| `model` | `"gpt-image-2"` | Pin snapshot `"gpt-image-2-2026-04-21"` for reproducibility |
| `prompt` | string | Up to ~32K chars; the five-slot scaffold (Scene, Subject, Details, Use case, Constraints) outperforms blob prompts |
| `size` | `"1024x1024"`, `"1024x1536"`, `"1536x1024"`, custom | Both edges multiples of 16, max edge 3840px, aspect ≤ 3:1, total pixels 655K–8.3M |
| `quality` | `"low"` \| `"medium"` \| `"high"` \| `"auto"` | Quality maps directly to cost — see table below |
| `n` | 1–10 | Higher `n` cheaper per-image but burns token budget faster |
| `background` | `"opaque"` \| `"transparent"` | **gpt-image-2 does not currently honor `transparent` reliably** — composite backgrounds in post |
| `output_format` | `"png"` \| `"jpeg"` \| `"webp"` | PNG default |
| `output_compression` | 0–100 | JPEG/WebP only |
| `moderation` | `"auto"` \| `"low"` | Set `"low"` for editorial content with named figures, mild violence, etc. |
| `partial_images` | 0–3 | Enables streaming partial frames during generation |
| `stream` | `true` \| `false` | Pair with `partial_images` for live preview |

`response_format` is no longer used — `gpt-image-2` always returns base64-encoded data in `result.data[0].b64_json` ([OpenAI image generation guide](https://developers.openai.com/api/docs/guides/image-generation)).

**Pricing per image** (token-derived):

| Quality | 1024×1024 | 1024×1536 | 1536×1024 |
|---|---|---|---|
| Low | $0.006 | $0.005 | $0.005 |
| Medium | $0.053 | $0.041 | $0.041 |
| High | $0.211 | $0.165 | $0.165 |

Backed by token rates of $8.00/M image input, $2.00/M cached input, $30.00/M image output, $5.00/M text input ([CrePal pricing breakdown](https://crepal.ai/blog/aiimage/image-gpt-image-2-pricing/), [OpenAI pricing](https://openai.com/api/pricing/)).

**Rate limits** (organization tier-based — Argumend will be Tier 1 unless lifetime spend > $50):

| Tier | Tokens/min | Images/min |
|---|---|---|
| Tier 1 | 100K | 5 |
| Tier 2 | 250K | 20 |
| Tier 3 | 800K | 50 |

Tier 1's 5 images/minute equates to 7,200/day, well above Argumend's volume ([gpt-image-2 model page](https://developers.openai.com/api/docs/models/gpt-image-2)).

**Native capabilities.** GPT Image 2 supports up to 16 reference images per `edits` call, multi-image character/style consistency, and ~95-99% character-level text accuracy across Latin/CJK/Hindi/Bengali — all features Argumend's signature workflow leans on for parchment-rendered topic titles and recurring node motifs ([fal.ai prompting guide](https://fal.ai/learn/tools/prompting-gpt-image-2), [TechCrunch text accuracy review](https://techcrunch.com/2026/04/21/chatgpts-new-images-2-0-model-is-surprisingly-good-at-generating-text/)).

## 3. Codex-as-Image-Orchestrator: Three Integration Patterns

Codex can drive image generation in three architecturally different ways. Each has a place; Argumend picks one and structures around it.

### Pattern A — Codex calls `curl` directly

Simplest. Codex shells out using its built-in shell tool. Zero code, zero install beyond the CLI.

```bash
codex exec --full-auto "Generate a parchment hero image for the AI extinction \
risk topic via curl: POST /v1/images/generations with model=gpt-image-2, \
quality=medium, size=1536x1024, prompt sourced from prompt-fragments.ts. \
Decode the b64_json response and save to public/topics/ai-extinction-hero.png"
```

Codex resolves to a sequence like:

```bash
curl -s https://api.openai.com/v1/images/generations \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gpt-image-2","prompt":"...","size":"1536x1024","quality":"medium"}' \
  | jq -r '.data[0].b64_json' \
  | base64 -d > public/topics/ai-extinction-hero.png
```

**Trade-off.** Trivial for one-shot, fails for batches: no retry logic, no concurrency control, awkward to thread the visual-prompt fragments through bash. Use for first-image smoke tests; never for production.

### Pattern B — Codex writes/runs a Node TypeScript script

The default. Codex authors `scripts/generate-image.ts` using the `openai` SDK, then runs it via `bun run`. Argumend already runs Bun for everything else, so this matches the existing stack.

```typescript
// scripts/generate-image.ts (sketch)
import OpenAI from "openai";
import { writeFileSync } from "node:fs";

const client = new OpenAI();
const result = await client.images.generate({
  model: "gpt-image-2",
  prompt: process.argv[2],
  size: "1536x1024",
  quality: "medium",
});
writeFileSync(`out/${Date.now()}.png`, Buffer.from(result.data[0].b64_json, "base64"));
```

**Trade-off.** Most flexible — gets you typed clients, retry logic, concurrency, prompt-fragment imports from the existing codebase, deterministic outputs. Only "cost" is a small `scripts/` directory. **This is the recommended pattern for Argumend.**

### Pattern C — Codex via MCP server with image-gen tool

Most reusable but most complex. Stand up an MCP server (custom or off-the-shelf) that exposes a `generate_image` tool; register it in `~/.codex/config.toml`; Codex auto-discovers and calls it like any other tool.

```toml
# ~/.codex/config.toml
[mcp_servers.argumend-image]
command = "bun"
args = ["run", "scripts/mcp-image-server.ts"]

[mcp_servers.argumend-image.env]
OPENAI_API_KEY = "${OPENAI_API_KEY}"
```

Codex CLI from version 0.124.0 has stable MCP hooks, `mcp_oauth_callback_port` for OAuth-protected servers, and tool-level `enabled_tools` filters ([Codex MCP docs](https://developers.openai.com/codex/mcp), [Codex changelog 0.124.0](https://developers.openai.com/codex/changelog)).

**Trade-off.** Pays off if the same tool is reused across many workspaces or shared with collaborators. For a single-founder project that already has `lib/` and `scripts/`, this is over-engineered. **Defer until v2.**

### Pattern comparison

| Pattern | Setup effort | Flexibility | Reusable across repos | Best fit |
|---|---|---|---|---|
| A — curl in shell | Minimal | Low | No | One-off smoke tests |
| B — TypeScript script | ~30 min | High | Within one repo | **Argumend default** |
| C — MCP server | ~half-day | High | Yes | Multi-repo or shared infra |

## 4. Argumend-Specific Wiring Proposal (Pattern B)

Three files, one library module, two `package.json` scripts. All paths absolute under `/Users/amirhjalali/argumend/`.

### `lib/visual/openai-image.ts`

The thin wrapper that everyone — scripts, future API routes, future MCP server — uses. Encapsulates SDK init, retry, fragment composition, and file output.

```typescript
import OpenAI from "openai";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { VISUAL_PROMPT_FRAGMENTS } from "./prompt-fragments";

const client = new OpenAI({ maxRetries: 4 }); // SDK 4+ retries 429s with backoff

export type ImageQuality = "low" | "medium" | "high";
export type ImageSize = "1024x1024" | "1024x1536" | "1536x1024";

export interface GenerateImageOptions {
  prompt: string;
  outPath: string;          // absolute path under /Users/amirhjalali/argumend/
  size?: ImageSize;
  quality?: ImageQuality;
  model?: string;           // defaults to pinned snapshot
}

export async function generateImage(opts: GenerateImageOptions): Promise<string> {
  const result = await client.images.generate({
    model: opts.model ?? "gpt-image-2-2026-04-21",
    prompt: opts.prompt,
    size: opts.size ?? "1536x1024",
    quality: opts.quality ?? "medium",
    n: 1,
  });
  const b64 = result.data[0].b64_json;
  if (!b64) throw new Error("gpt-image-2 returned no b64_json");
  mkdirSync(dirname(opts.outPath), { recursive: true });
  writeFileSync(opts.outPath, Buffer.from(b64, "base64"));
  return opts.outPath;
}

export function buildArgumendPrompt(args: {
  topicTitle: string;
  artifact: "astrolabe" | "weighing scale" | "hourglass" | "compass" | "quill-and-inkwell";
  nodeCount: number;
}): string {
  const f = VISUAL_PROMPT_FRAGMENTS;
  return [
    f.base,
    f.graph.replace("[N]", String(args.nodeCount)),
    f.crux,
    f.evidence,
    f.sides,
    f.artifact.replace(/\[.*\]/, args.artifact),
    f.typography.replace("[TITLE]", args.topicTitle),
    f.constraints,
    "Aspect ratio 16:9.",
  ].join(" ");
}
```

### `scripts/generate-image.ts`

The single-image CLI driver. Codex calls this from `codex exec` for one-off generations.

```typescript
#!/usr/bin/env bun
import { generateImage, buildArgumendPrompt } from "@/lib/visual/openai-image";

// Usage: bun run image:generate -- <topicSlug> <topicTitle>
const [, , slug, ...titleParts] = process.argv;
if (!slug) {
  console.error("usage: bun run image:generate -- <slug> <title>");
  process.exit(1);
}

const outPath = `/Users/amirhjalali/argumend/public/topics/${slug}-hero.png`;
const prompt = buildArgumendPrompt({
  topicTitle: titleParts.join(" "),
  artifact: "astrolabe",
  nodeCount: 5,
});

const path = await generateImage({ prompt, outPath, size: "1536x1024", quality: "medium" });
console.log(`Wrote ${path}`);
```

### `scripts/image-batch.ts`

Walks `data/topics/` and generates a hero per topic, with concurrency capped at Tier 1's 5 IPM and exponential-backoff retries inherited from the SDK.

```typescript
#!/usr/bin/env bun
import pLimit from "p-limit";
import { topics } from "@/data/topics";
import { generateImage, buildArgumendPrompt } from "@/lib/visual/openai-image";

const limit = pLimit(3); // 3 concurrent under Tier 1's 5 IPM ceiling
const ARTIFACTS = ["astrolabe", "weighing scale", "hourglass", "compass", "quill-and-inkwell"] as const;

async function run() {
  const tasks = topics.map((t, i) => limit(async () => {
    const outPath = `/Users/amirhjalali/argumend/public/topics/${t.slug}-hero.png`;
    const prompt = buildArgumendPrompt({
      topicTitle: t.title,
      artifact: ARTIFACTS[i % ARTIFACTS.length],
      nodeCount: Math.min(7, Math.max(3, t.evidenceCount ?? 5)),
    });
    try {
      await generateImage({ prompt, outPath, quality: "medium" });
      console.log(`OK  ${t.slug}`);
    } catch (e) {
      console.error(`FAIL ${t.slug}: ${(e as Error).message}`);
    }
  }));
  await Promise.all(tasks);
}
run();
```

### `package.json` script entries

```json
{
  "scripts": {
    "image:generate": "bun run scripts/generate-image.ts",
    "image:batch":    "bun run scripts/image-batch.ts",
    "image:test":     "bun run scripts/generate-image.ts -- _test 'Smoke test'"
  }
}
```

### How Codex invokes them

Interactive iteration:

```bash
codex "Generate a parchment hero for the 'AI extinction risk' topic. Use the \
weighing-scale artifact, 5 nodes, medium quality. Run bun run image:generate."
```

Headless batch (CI or scheduled):

```bash
codex exec --full-auto --sandbox workspace-write \
  "Run bun run image:batch and write a markdown report of any failures to \
  docs/runs/$(date +%Y%m%d)-image-batch.md"
```

## 5. Auth and Secrets Handling

Three places the key lives, three rules.

**Local dev — `.env.local` (gitignored).**

```bash
OPENAI_API_KEY=sk-proj-...
```

`.env.local` is already in Argumend's `.gitignore` from the existing setup. The `openai` SDK reads `OPENAI_API_KEY` automatically — no `dotenv` import needed when running through Bun (which loads `.env*` files natively).

**CI / Codex Cloud — repo or org secrets.** GitHub Actions: store as `OPENAI_API_KEY` secret, expose via `env: OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}`. Codex Cloud delegated tasks inherit secrets from the workspace setup config you defined when creating the cloud environment ([Codex Cloud](https://developers.openai.com/codex/cloud)).

**Codex's own auth — keep separate.** When the founder runs `codex` interactively, the CLI authenticates via `codex login` against the ChatGPT subscription; that token lives in `~/.codex/auth.json` and is **not** the same as `OPENAI_API_KEY`. Image generation through `scripts/generate-image.ts` always uses `OPENAI_API_KEY` (API billing), never the ChatGPT token. This split matters: image generation through the API is metered against the org's API tier, while Codex's coding work is metered against the ChatGPT plan.

**Don't leak the key.**

- Never use `NEXT_PUBLIC_OPENAI_API_KEY` — Next.js inlines `NEXT_PUBLIC_*` into the browser bundle, exposing the key to anyone who views source ([Next.js env vars](https://nextjs.org/docs/pages/guides/environment-variables)).
- Image generation runs at **build time or via background scripts**, not at user request time. Generated PNGs are committed (or stored in object storage) and served as static assets. There is no need for runtime-side image generation, and therefore no need for the API key on Vercel runtime.
- Add a pre-commit hook that scans for `sk-proj-`, `sk-`, and `OPENAI_API_KEY=` patterns. The `gitleaks` or `detect-secrets` projects both ship usable defaults; wire one in via `.husky/pre-commit` or `lefthook.yml`.
- For Vercel: only add `OPENAI_API_KEY` as a server-only environment variable if Argumend ever needs runtime image generation (e.g., user-uploaded topics). Do not mark it public, do not duplicate it client-side ([Vercel env vars](https://vercel.com/docs/environment-variables)).

## 6. Rate-Limit and Retry Strategy

The OpenAI Node SDK v4+ already retries 429 responses with exponential backoff and respects `retry-after` headers, controllable via `new OpenAI({ maxRetries: N })` ([OpenAI Cookbook — handling rate limits](https://cookbook.openai.com/examples/how_to_handle_rate_limits)). For Argumend's volume, that handles 99% of cases. The remaining 1% — large batch jobs at Tier 1's 5 IPM ceiling — needs concurrency capping with `p-limit`.

```typescript
// lib/visual/budget.ts
import pLimit from "p-limit";

export const TIER_1_CONCURRENCY = 3;     // safe under 5 IPM ceiling
export const TIER_2_CONCURRENCY = 12;    // safe under 20 IPM
export const TIER_3_CONCURRENCY = 30;    // safe under 50 IPM

export const imageLimiter = pLimit(
  Number(process.env.OPENAI_IMAGE_CONCURRENCY ?? TIER_1_CONCURRENCY)
);

// Optional manual retry with jitter — for non-429 transients only
export async function withJitterRetry<T>(fn: () => Promise<T>, attempts = 3): Promise<T> {
  for (let i = 0; i < attempts; i++) {
    try { return await fn(); }
    catch (e) {
      if (i === attempts - 1) throw e;
      const ms = 500 * 2 ** i + Math.random() * 250;
      await new Promise(r => setTimeout(r, ms));
    }
  }
  throw new Error("unreachable");
}
```

For 109 topic regenerations at medium quality, `pLimit(3)` finishes in ~6 minutes (109 / 3 × ~10s per call). Per-image cost stays at $0.041 × 109 = **~$4.50** total for the full topic-library refresh.

If a single batch ever hits a 429 storm (transient organization-wide quota glitch), the SDK's built-in 4-retry sequence sleeps roughly 1, 2, 4, 8 seconds. Anything beyond that needs human attention — log the failures and re-run only the failed slugs.

## 7. Local Dev vs CI vs Codex Cloud Execution

| Surface | Use for | Trade-off |
|---|---|---|
| **Local Codex CLI** | Iterating on prompts, single-image regeneration, designer review | Burns founder's time; not durable |
| **CI (GitHub Actions)** | PR-triggered preview generation, post-merge regeneration of the changed topic | 30-60s startup per PR; needs caching |
| **Codex Cloud** | Full 109-topic batch refresh; long-horizon redesigns ([Long-horizon Codex](https://developers.openai.com/blog/run-long-horizon-tasks-with-codex)) | Outputs land in cloud workspace, PR'd back; harder to eyeball mid-run |

**Argumend split:** local CLI for prompt iteration; CI to regenerate just the changed topic in the PR (commit back via `peter-evans/create-pull-request`); Cloud reserved for "bulk regenerate everything" runs that follow a signature revision — twice a year at most.

## 8. Minimum-Viable Scaffold Checklist

A one-day sprint to get from zero to one committed AI-generated topic hero.

1. **Install Codex CLI:** `npm i -g @openai/codex`. Confirm with `codex --version`.
2. **Set the API key:** `echo 'OPENAI_API_KEY=sk-proj-…' >> .env.local`. Confirm with `bun -e 'console.log(!!process.env.OPENAI_API_KEY)'`.
3. **Add SDK and concurrency lib:** `bun add openai p-limit`.
4. **Create `lib/visual/prompt-fragments.ts`** — copy the `VISUAL_PROMPT_FRAGMENTS` block from the visual-signature research doc verbatim.
5. **Create `lib/visual/openai-image.ts`** — paste the wrapper from §4 above.
6. **Create `scripts/generate-image.ts`** — paste the single-image script.
7. **Add `package.json` scripts:** `image:generate`, `image:batch`, `image:test`.
8. **Generate the smoke-test image:** `bun run image:test`. Output should land in `public/topics/_test-hero.png`. Open in Preview, eyeball, throw away if signature is off; iterate the prompt fragments until it isn't.
9. **Add the gitleaks pre-commit hook:** `bunx lefthook install`, drop a `pre-commit` step that runs `gitleaks protect --staged`.
10. **Commit `lib/visual/`, `scripts/generate-image.ts`, `scripts/image-batch.ts`, and one finished hero.** Skip committing the test image.
11. **Document the workflow** in `lib/visual/README.md` (or just inline JSDoc on `buildArgumendPrompt`) so future-Claude-Code agents pick up the same fragments.

Total time: ~4 hours for someone with the visual-signature doc already in hand. Total spend: under $1 (1 high-quality test image at $0.211 + 5 medium iterations at $0.041 each = $0.42).

---

## Sources

- [OpenAI Codex CLI — install + overview](https://developers.openai.com/codex/cli)
- [OpenAI Codex CLI — features](https://developers.openai.com/codex/cli/features)
- [OpenAI Codex CLI — command-line options reference](https://developers.openai.com/codex/cli/reference)
- [OpenAI Codex CLI — non-interactive (`codex exec`) mode](https://developers.openai.com/codex/noninteractive)
- [OpenAI Codex — changelog (versions 0.122.0–0.125.0)](https://developers.openai.com/codex/changelog)
- [OpenAI Codex — models](https://developers.openai.com/codex/models)
- [OpenAI Codex — MCP configuration](https://developers.openai.com/codex/mcp)
- [OpenAI Codex SDK (TypeScript)](https://developers.openai.com/codex/sdk)
- [OpenAI Codex Cloud — web/delegated tasks](https://developers.openai.com/codex/cloud)
- [OpenAI Codex IDE extension](https://developers.openai.com/codex/ide)
- [Codex GitHub repo (openai/codex)](https://github.com/openai/codex)
- [Codex pricing — developers.openai.com](https://developers.openai.com/codex/pricing)
- [Codex rate card — Help Center](https://help.openai.com/en/articles/20001106-codex-rate-card)
- [Using Codex with your ChatGPT plan](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan)
- [Codex now offers pay-as-you-go pricing for teams](https://openai.com/index/codex-flexible-pricing-for-teams/)
- [TechCrunch — ChatGPT $100/month Pro plan](https://techcrunch.com/2026/04/09/chatgpt-pro-plan-100-month-codex/)
- [ChatGPT Plans](https://chatgpt.com/pricing/)
- [Run long-horizon tasks with Codex](https://developers.openai.com/blog/run-long-horizon-tasks-with-codex)
- [Simon Willison — A pelican for GPT-5.5 via the Codex backdoor](https://simonwillison.net/2026/Apr/23/gpt-5-5/)
- [GPT Image 2 model card](https://developers.openai.com/api/docs/models/gpt-image-2)
- [OpenAI image generation guide](https://developers.openai.com/api/docs/guides/image-generation)
- [OpenAI Cookbook — Generate images with GPT Image](https://developers.openai.com/cookbook/examples/generate_images_with_gpt_image)
- [OpenAI image generation prompting guide](https://developers.openai.com/cookbook/examples/multimodal/image-gen-models-prompting-guide)
- [fal.ai — GPT Image 2 prompting guide](https://fal.ai/learn/tools/prompting-gpt-image-2)
- [TechCrunch — GPT Image 2 text accuracy](https://techcrunch.com/2026/04/21/chatgpts-new-images-2-0-model-is-surprisingly-good-at-generating-text/)
- [CrePal — GPT Image 2 pricing breakdown](https://crepal.ai/blog/aiimage/image-gpt-image-2-pricing/)
- [OpenAI API pricing](https://openai.com/api/pricing/)
- [OpenAI Cookbook — How to handle rate limits](https://cookbook.openai.com/examples/how_to_handle_rate_limits)
- [OpenAI Help Center — Solving 429 errors](https://help.openai.com/en/articles/5955604-how-can-i-solve-429-too-many-requests-errors)
- [Next.js — Environment Variables guide](https://nextjs.org/docs/pages/guides/environment-variables)
- [Vercel — Environment variables](https://vercel.com/docs/environment-variables)
- [p-limit — sindresorhus/p-limit](https://github.com/sindresorhus/p-limit)

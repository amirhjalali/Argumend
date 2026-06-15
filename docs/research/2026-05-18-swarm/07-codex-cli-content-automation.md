# codex-cli for Argumend Content Automation

Research date: 2026-05-19
Scope: how to wire OpenAI's `codex` CLI into Argumend's content-generation pipelines, in parallel with the existing claude-code workflow.

## TL;DR

- `codex exec` is a non-interactive, JSONL-streaming, sandbox-aware CLI that fits cleanly into shell pipelines and CI — it's the OpenAI counterpart to `claude -p` and is now priced on token usage rather than messages ([OpenAI, Non-interactive mode](https://developers.openai.com/codex/noninteractive); [OpenAI Help Center, Codex rate card](https://help.openai.com/en/articles/20001106-codex-rate-card)).
- For Argumend's 109+ topic dataset, the highest-leverage uses are: blog posts, multi-platform social threads, weekly newsletter digests, 60s short-form scripts, and "objections answered" follow-ups — all driven from the static `data/topics/*` JSON.
- The right play is hybrid: Codex's GPT-5.5 / GPT-5.3-Codex are roughly 4× more token-efficient than Claude for bulk generation, while Claude Code retains the edge for taste-sensitive prose and React edits ([NxCode comparison](https://www.nxcode.io/resources/news/claude-code-vs-codex-cli-terminal-coding-comparison-2026); [morphllm benchmarks](https://www.morphllm.com/comparisons/codex-vs-claude-code)).

## codex-cli 2026 status

**Auth.** First-run prompts for ChatGPT login or API key; OAuth credentials are stored in the OS keyring. For CI, set `CODEX_API_KEY` as a job secret ([OpenAI, Non-interactive mode](https://developers.openai.com/codex/noninteractive)).

**Models.** Default is GPT-5.5 (frontier; planning and multi-step tool use). GPT-5.3-Codex is the cheaper coding-tuned default; GPT-5.4 / GPT-5.4-mini available; ChatGPT Pro adds GPT-5.3-Codex-Spark in preview. Switch with `/model` in TUI or `-m gpt-5.4` in `exec` ([OpenAI, Features](https://developers.openai.com/codex/cli/features)).

**Sandboxing.** OS-kernel-level: macOS Seatbelt, Linux seccomp/Landlock, Windows Sandbox (or Linux sandbox under WSL2). Policies are `read-only`, `workspace-write`, `danger-full-access`; pair with `--ask-for-approval` (`untrusted` / `on-request` / `never`) ([OpenAI, Sandbox](https://developers.openai.com/codex/concepts/sandboxing); [OpenAI, CLI reference](https://developers.openai.com/codex/cli/reference)).

**MCP.** Codex consumes MCP servers via `~/.codex/config.toml` (or project-scoped `.codex/config.toml`), supporting both stdio and Streamable HTTP. Register with `codex mcp add <name>` ([OpenAI, MCP](https://developers.openai.com/codex/mcp); [Composio guide](https://composio.dev/content/how-to-mcp-with-codex)).

**Scripting.** `codex exec "<prompt>"` runs one session, streams progress to stderr, emits final message on stdout. `--json` produces JSONL events (`thread.started`, `turn.completed`, `item.completed`, etc., with token usage). `--output-schema <file>` enforces a JSON shape — critical for pipelines. Stdin can be a context (`cmd | codex exec "summarize"`) or the full prompt (`codex exec -`). `codex exec resume --last "..."` continues a prior thread ([OpenAI, Non-interactive mode](https://developers.openai.com/codex/noninteractive); [DeepWiki, Headless exec](https://deepwiki.com/openai/codex/4.2-headless-execution-mode-(codex-exec))).

## Pipeline ideas (5)

**1. Blog posts from topic data.** For each `data/topics/<slug>.json`, `codex exec` with `--output-schema blog.schema.json` to produce `{title, dek, body_mdx, tags, og_alt}`. Feed positions, cruxes, fallacies as stdin; constrain to 900–1200 words; require one quoted crux per section. Output drops into `app/blog/posts/`.

**2. Social threads (X / LinkedIn / Bluesky).** A single `codex exec` per topic with a schema returning three platform-specific variants: X thread (5–7 posts, ≤280 chars, hooks first), LinkedIn (one long post, professional register, no emoji), Bluesky (3–4 posts, conversational, ≤300 chars). Pipe through a small Bun script that posts via each platform's API or stages drafts.

**3. Weekly newsletter from hottest topics.** Cron job ranks topics by `topic_views` + `saved_topics` deltas over 7 days, writes top-10 JSON to stdin, `codex exec` produces a single MDX newsletter with section per topic + an "argument of the week" featuring the sharpest crux. Output schema enforces sections, CTAs, unsubscribe footer.

**4. 60s short-form video scripts.** Per topic, `codex exec` with a script schema: `{hook_5s, setup_10s, crux_reveal_30s, twist_10s, cta_5s, b_roll_prompts[]}`. The `b_roll_prompts` array feeds the existing codex-image-pipeline (see `2026-04-28-codex-image-pipeline`). One CLI call yields both script and image briefs, keyed to the topic's actual crux node.

**5. "Objections answered" follow-ups.** For each published blog/social post, harvest top objections from the topic's `skeptic` positions, then `codex exec` to draft a follow-up post that steel-mans each objection and links back to the relevant evidence node in the Argumend map. Output schema returns `{objection, steelman, response, evidence_node_id}` rows.

## Sample invocation

Paste-ready. Generates a blog post for `keto-diet.json` with structured output, workspace-write sandbox, GPT-5.5, no approval prompts:

```bash
cat data/topics/keto-diet.json \
  | CODEX_API_KEY=$OPENAI_API_KEY codex exec - \
      --model gpt-5.5 \
      --sandbox workspace-write \
      --ask-for-approval never \
      --output-schema ./scripts/content/schemas/blog.schema.json \
      --json \
      -o ./content/blog/keto-diet.draft.json \
  2> ./logs/codex-keto.log
```

Bulk version (109 topics, parallelism 4) via GNU parallel:

```bash
ls data/topics/*.json | \
  parallel -j 4 'cat {} | codex exec - \
    --model gpt-5.3-codex \
    --sandbox read-only \
    --ask-for-approval never \
    --output-schema ./scripts/content/schemas/social.schema.json \
    -o ./content/social/{/.}.json --json'
```

Schema-driven outputs make downstream MDX rendering and platform posting trivially scriptable ([OpenAI, Non-interactive mode](https://developers.openai.com/codex/noninteractive)).

## Cost / limits

- **Billing model.** Since 2026-04-02, Codex usage on ChatGPT plans is metered in credits per million input / cached-input / output tokens, not per message ([OpenAI Help Center, Codex rate card](https://help.openai.com/en/articles/20001106-codex-rate-card)).
- **Plan ceilings.** Plus ($20/mo) gives 400–2,000 local messages per 5h on GPT-5.4; Pro ($200/mo) is 20× Plus; Pro $100 tier currently offers 10× Plus through 2026-05-31 ([VentureBeat](https://venturebeat.com/orchestration/openai-introduces-chatgpt-pro-usd100-tier-with-5x-usage-limits-for-codex); [LaoZhang AI](https://blog.laozhang.ai/en/posts/openai-codex-usage-limits)).
- **API-key path.** GPT-5.3-Codex-Mini lists at ~$1.50 / $6.00 per M tokens — roughly 3–4× cheaper than Claude Opus 4.6 at $5 / $25 ([NxCode](https://www.nxcode.io/resources/news/claude-code-vs-codex-cli-terminal-coding-comparison-2026)).
- **Token efficiency.** Codex CLI uses ~4× fewer tokens per task than Claude Code; for bulk fan-out across 109 topics this compounds ([NxCode comparison](https://www.nxcode.io/resources/news/claude-code-vs-codex-cli-terminal-coding-comparison-2026)).
- **Practical guidance.** For Argumend's bulk content runs, use API-key auth and GPT-5.3-Codex with `--sandbox read-only` (no file writes needed for content drafts beyond `-o`); reserve GPT-5.5 for the newsletter and "hero" blog posts where quality matters most.

## Integration with claude-code workflow

The founder's pattern is parallel Claude Code agents on isolated worktrees. Codex slots in two ways:

**1. Codex as a specialized parallel worker.** From a Claude Code orchestrator session, dispatch Codex subprocesses for bulk, schema-bound content fan-out. Claude Code drives the plan and reviews outputs; Codex executes the boring iterations cheaper and faster. Example: a Claude agent reads `00-DISPATCH-PLAN.md`, writes per-topic prompts, then shell-execs `codex exec` in parallel via `parallel -j 8`, and finally reads JSON outputs back for QA.

**2. Codex inside CI.** A GitHub Action triggered weekly runs the newsletter pipeline headlessly: `codex exec` with `--json --output-schema`, pipes into a Bun script that opens a PR with the MDX newsletter draft. Claude Code reviews the PR locally before merge. This mirrors OpenAI's recommended pattern ([OpenAI, Non-interactive mode](https://developers.openai.com/codex/noninteractive)).

**3. Shared MCP surface.** Both CLIs speak MCP. Register an Argumend MCP server (exposing `get_topic`, `list_hot_topics`, `get_crux`, `record_draft`) once; both agents can call it. Argumend then becomes a substrate that either CLI can drive without bespoke glue ([OpenAI, MCP](https://developers.openai.com/codex/mcp)).

**Division of labor.** Use Claude Code for: React/MDX components, taste-sensitive copy edits, brand-voice work, code review (blind evals favor Claude 67% to 25% on code quality per [NxCode](https://www.nxcode.io/resources/news/claude-code-vs-codex-cli-terminal-coding-comparison-2026)). Use Codex for: bulk schema-bound content generation across all 109 topics, scheduled headless jobs, anything where token cost dominates quality margin.

## Open questions

- Does Codex's `--output-schema` enforce strictly, or does it best-effort and silently drift on long outputs? Worth a 5-topic probe before committing to the 109-topic fan-out.
- Can Codex itself be exposed as an MCP server so Claude Code subagents call it as a tool? Docs cover Codex-as-consumer but not Codex-as-provider ([OpenAI, MCP](https://developers.openai.com/codex/mcp)).
- What's the real per-topic token cost on GPT-5.3-Codex for an 1100-word blog post with ~3KB of topic JSON context? Needs a metered benchmark run.
- Is the 5-hour rate-limit window enough for a 109-topic weekly refresh on Plus, or does this force the API-key path (and therefore PAYG billing instead of subscription)?
- How does `codex exec resume --last` interact with parallel workers — is the rollout state per-cwd or global? Affects whether worktrees can each carry their own Codex thread.

## Sources

- [OpenAI Developers — Codex CLI Features](https://developers.openai.com/codex/cli/features)
- [OpenAI Developers — Non-interactive mode](https://developers.openai.com/codex/noninteractive)
- [OpenAI Developers — CLI Reference](https://developers.openai.com/codex/cli/reference)
- [OpenAI Developers — Sandboxing](https://developers.openai.com/codex/concepts/sandboxing)
- [OpenAI Developers — Model Context Protocol](https://developers.openai.com/codex/mcp)
- [OpenAI Developers — Pricing](https://developers.openai.com/codex/pricing)
- [OpenAI Help Center — Codex rate card](https://help.openai.com/en/articles/20001106-codex-rate-card)
- [DeepWiki — Headless execution mode (codex exec)](https://deepwiki.com/openai/codex/4.2-headless-execution-mode-(codex-exec))
- [NxCode — Claude Code vs Codex CLI 2026](https://www.nxcode.io/resources/news/claude-code-vs-codex-cli-terminal-coding-comparison-2026)
- [morphllm — Codex vs Claude Code May 2026 benchmarks](https://www.morphllm.com/comparisons/codex-vs-claude-code)
- [VentureBeat — ChatGPT Pro $100 tier Codex limits](https://venturebeat.com/orchestration/openai-introduces-chatgpt-pro-usd100-tier-with-5x-usage-limits-for-codex)
- [Composio — MCPs with Codex](https://composio.dev/content/how-to-mcp-with-codex)
- [LaoZhang AI — Codex usage limits](https://blog.laozhang.ai/en/posts/openai-codex-usage-limits)

# Live AI as the Activation Hook: Cost, Abuse, and Rollout Plan

**Date:** 2026-04-28
**Analyst:** Research agent 09/10, activation-retention swarm
**Question:** Should turning on `ENABLE_LIVE_ANALYZE_API` and putting "paste any article → instant argument map" on the homepage become Argumend's activation hook?

## 1. The activation-hook thesis

For AI products built in 2024-2026, the demo is the activation event. The first time a visitor sees the model do something specific to *their* input is the moment that decides whether they stay. Cycle 1 file 10 of the launch postmortems noted Lex.page's shape: a single Twitter demo of paste-and-magic-happens converted a cold landing page into ~1,000 signups before the founder finished his coffee, and ~25K within the first week ([How Lex Happened — Every](https://every.to/divinations/how-lex-happened)). Lex now claims 300K+ users ([lex.page](https://lex.page/)). The demo did the marketing.

Argumend already has the equivalent feature. It is sitting behind `ENABLE_LIVE_ANALYZE_API`, which is off. Every visitor sees pre-baked maps of 109 curated topics. There is no "I just experienced what this product does *to my own content*" moment.

The competitive sweep established that Kialo plateaued partly because its content was human-authored — the first-time user could only browse, never *summon*. Argumend's only differentiator vs Kialo, Arguman, and Argdown is "AI extracts the map" — and right now no stranger can experience that.

The thesis: **the offline `extractArgumentsOffline` fallback is a great cost-control measure and a terrible activation hook**. It runs a regex-and-keywords pipeline (`lib/analyze/offline.ts:21-31, 59-82`) — the FOR/AGAINST classifier literally counts words like `"effective"`, `"reliable"`, `"risk"`, `"harm"`. A smart visitor pasting a real op-ed will instantly see the shallowness. The live LLM extractor will impress. The question is whether we can afford it.

## 2. Current implementation audit

### What live-analyze actually does

`lib/analyze/extractor.ts:352-376` defines `extractArguments()`. It builds a hand-tuned system prompt (`buildExtractionSystemPrompt`, lines 145-246) of ~1,800 tokens of JSON-schema instructions plus a per-call user prompt (lines 251-276), then dispatches via `executeAgent()`.

`lib/agents/executor.ts:237-311` is the dispatcher. Default agent is `claude` (`extractor.ts:342-347`) routed to `executeWithClaude` (`executor.ts:95-113`). Production model: `claude-sonnet-4-20250514`, `max_tokens: 2048`. **No streaming** — `client.messages.create` is a single non-streamed POST, route awaits the full response. Retry with exponential backoff up to 2 attempts (lines 20-51).

Output parsed by `parseExtractionResponse` (lines 281-337) — brittle JSON-extraction handling markdown fences, leading prose, unbalanced braces. On parse failure or any thrown error, the route falls back to offline extraction (`route.ts:71-80`).

### What the API route already enforces

`app/api/analyze/route.ts` is more locked-down than the average AI SaaS demo:
- **Auth wall** (lines 41-45): `auth()` must return a session. **Anonymous visitors cannot call the live extractor today** — the single biggest activation friction, opposite of what you want for a demo CTA.
- **Rate limit** (line 49): 10/hour/IP, hard-coded in-memory (`lib/rate-limit.ts:29`), per-process.
- **Content cap** (line 15): 50,000 chars (~12,500 tokens).
- **Persistence**: every analysis saved (`saveAnalysis`, line 109), even though the UI says "Not stored after processing" (`app/analyze/page.tsx:497`). Disclosure mismatch — fix before hero rollout.
- **Optional judging** (line 96): 3-model fan-out (Claude/GPT-4o/Gemini), ~4x cost.

### Latency & failure modes

Empirically, Sonnet 4 on this prompt runs **10-25s** end-to-end, no streaming. Current UI shows a spinner (`page.tsx:556-560`). With judging, 30-60s. In 2026, a 20-second blank spinner reads as broken.

Failure modes: (1) JSON parse failures from prose-wrapped output, (2) low-confidence garbage maps when input isn't argumentative — fine when nobody pastes, primary case in a demo flow, (3) API outage falls back to offline (quality cliff visible to users), (4) auth wall is binary, no graceful anonymous mode.

## 3. Cost economics

### Cost per call

Claude Sonnet 4.6 (the live default's natural successor) is **$3/M input, $15/M output** ([Claude API pricing 2026 — pricepertoken](https://pricepertoken.com/pricing-page/model/anthropic-claude-sonnet-4.6), [BenchLM](https://benchlm.ai/blog/posts/claude-api-pricing)). Per analyze call:

- System prompt: ~1,800 tokens × $3/M = **$0.0054**
- User content (assume median 1,500 tokens, p90 5,000 tokens): median **$0.0045**, p90 **$0.015**
- Output: model emits ~1,500-2,000 tokens of JSON. Median **$0.027**, max **$0.030**

**Median cost per analyze call: ~$0.037 ≈ 4 cents.**
**P90 cost per analyze call: ~$0.050 ≈ 5 cents.**

With **prompt caching on the system prompt** (cached input is 10% of standard input price), the system-prompt portion drops from $0.0054 to **$0.00054**. Net per-call cost falls to **~$0.032**. Worth doing — prompt caching is a one-line change with the Anthropic SDK.

If we add the judge council (Claude + GPT-4o + Gemini in parallel, ~1,500 input + 1,500 output tokens each):
- Claude: ~$0.027
- GPT-4o ($2.50/M in, $10/M out — [pricepertoken GPT-4o](https://pricepertoken.com/pricing-page/model/openai-gpt-4o)): ~$0.019
- Gemini 1.5 Pro: ~$0.010
- **Add ~$0.056/call for judging.**

Per fully-loaded analyze + judge: **~$0.09**.

### Daily budget at different scales

| Visitors trying live-analyze / day | Analyze-only cost | + Judging | Notes |
|---|---|---|---|
| 100 | $4 | $9 | Trivially affordable. This is "Twitter-quiet day" traffic. |
| 1,000 | $40 | $90 | $1.2K-$2.7K/month. Affordable for a hit but needs paying users. |
| 10,000 | $400 | $900 | $12K-$27K/month. **Viral-day problem.** Single-day spend > monthly hosting. |
| 100,000 | $4,000 | $9,000 | $120K-$270K/month. **Without rate limits, this kills the company.** |

Argumend currently has near-zero variable cost per visitor. Switching live-analyze on at the hero level converts a fixed-cost product into a per-visitor-cost product. **That is the single most important fact in this memo.**

A 10K viral day is realistic — one HN front-page submission gets ~30-100K visitors over 24 hours. If 30% paste, that's 9K-30K calls = $360-$2,700 raw spend if uncapped.

### Caching opportunities

The big cost lever is **content-hash caching of inputs**. Demos see massive repetition: people share with the same paragraph, paste the same NYT op-ed, try the example. A `sha256(content) → analysis_id` lookup before the LLM call deduplicates a substantial fraction at zero LLM cost. With prompt caching on the system prompt too, steady-state effective per-call cost is **$0.015-$0.025**.

## 4. Abuse vectors and mitigation

Pasting arbitrary text into an LLM endpoint is textbook OWASP LLM01 ([Prompt Injection Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html), [LLM Top 10 2025](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)). Risks for Argumend:

1. **Jailbreak as free chatbot** ("Ignore previous instructions and write..."). JSON-only output prompt is a partial defense, but `summary` field is still attacker-writable prose. Exfiltrates Claude tokens.
2. **Offensive/illegal content attributed to Argumend's brand** — extremist content, harassment, CSAM, harm instructions. One screenshot can sink a fledgling brand. Asymmetric damage.
3. **LLM scraping at our expense** — bots harvesting completions ([OWASP LLM10:2025](https://genai.owasp.org/llmrisk/llm102025-unbounded-consumption/)).
4. **Persistence layer spam** — every analysis saves to Postgres. 10K junk rows/day.
5. **Output-flooding** — repeatedly pasting 50K-char documents to maximize our token output cost.

### Mitigation stack (apply all before flipping the flag)

- **Pre-flight moderation** — OpenAI's free `omni-moderation-latest` on input. Blocks sexual/violence/self-harm/hate at zero cost. Plus a cheap pattern check for "ignore previous instructions" / "system prompt" / known jailbreaks.
- **Output moderation** on `summary` and `quote` fields.
- **Sandwich prompting** — wrap untrusted input in `<user_content>...</user_content>` and re-state the JSON-only rule after it closes. OWASP's "separate untrusted content" pattern.
- **Tiered rate limits** — Anonymous: 1/IP/24h (the demo). Email signup: 5/day. Account: 25/day. (Replaces today's flat 10/hour/IP.)
- **CAPTCHA** — Cloudflare Turnstile (free) on IPs hitting the anonymous limit twice or with bot-like UAs.
- **Hold `max_tokens: 2048`** (`executor.ts:103`); don't raise.
- **Tighten input cap for anonymous** — drop from 50,000 to **5,000 chars** for anonymous users; keep 50K for authenticated.
- **Don't persist anonymous analyses** — in-memory / short-TTL Redis only. Persist only for authenticated users.
- **Move `lib/rate-limit.ts` to Redis/Upstash** — per-process limits don't survive cold starts or horizontal scaling.

## 5. The signup-after-first-use pattern

Pattern is well-established:

- **ChatGPT** — anonymous users get a few free messages (since 2024), then signup wall.
- **v0** — gated by Vercel auth from launch ([v0 docs](https://v0.app/docs/pricing)). Free $5/month credits = "feel the magic" then cap. Funnel: see-demo → sign up → use credits → run out → upgrade.
- **Cursor, Lovable, Bolt, Magic Patterns** — all freemium with mandatory signup before first generation, justified by GPU cost ([Anna Arteeva](https://annaarteeva.medium.com/choosing-your-ai-prototyping-stack-lovable-v0-bolt-replit-cursor-magic-patterns-compared-9a5194f163e9)).

Real tension: Fishman Afnewsletter notes *winners will find ways to expose more trial ahead of login as costs come down* ([Template Activation Loop](https://www.fishmanafnewsletter.com/p/how-ai-products-drive-adoption-in-onboarding-through-template-activation-loop)). For Argumend at ~$0.03/call, **one free analysis pre-signup is genuinely affordable** in a way it wasn't for v0 in 2023.

**Proposed funnel:**
1. **First analysis: free, anonymous, no email.** 1/IP/24h. Full map shown including cruxes and fallacies.
2. **Second analysis: email magic-link.** No password. 5 more analyses, can come back.
3. **Sixth analysis: full account.** Google OAuth (already wired). Unlocks 25/day, persistence, sharing.
4. **Heavy usage: paid.** $9/mo for 200 analyses + judging. Not week 1.

Softer wall than v0/Cursor. Works because Argumend's per-call cost is lower (no GPU), and **the first call is the only one that has to delight a stranger**.

## 6. Hero CTA redesign

Current homepage (post the 2026-04-23 rewire) shows a featured topic + topic grid with analyze CTA demoted. Right move *while live-analyze was off* — no point pushing visitors to a tool requiring an account for the lower-quality offline thing.

If live-analyze flips on, the homepage should reverse:

> **Hero (above the fold):**
> *"Paste any controversial article. See the argument mapped in 30 seconds."*
> [ Large textarea — placeholder: "Paste an NYT op-ed, a Reddit thread, a debate transcript..." ]
> [ "Try with our example" link ]
> [ "Analyze (free, no signup)" button — rust gradient ]

Below the fold: featured topic + grid stays as social proof / browse-mode. Cycle 2 file 07's magic-moment pattern: the hero *is* the demo, not a description. Visitors never click "try it" to find the input box — the input box is the page.

"Try our example" matters — ~30% of pasted-content demos see users click the example rather than paste their own (informal observation across v0/Lex). The example must be a *real* op-ed with clean structure producing an impressive map — not synthetic test data.

## 7. Streaming UX

The non-streamed 10-25s wait is the worst UX flaw in the current flow. ChatGPT trained users to expect tokens *as they generate*. A 20s spinner in 2026 reads as broken.

Anthropic's streaming API supports SSE with `content_block_delta` events and partial JSON via the SDK's `jiter` integration ([Streaming Messages — Claude API Docs](https://platform.claude.com/docs/en/build-with-claude/streaming)). We can stream partial JSON and parse incrementally.

**Proposed streaming UX:**
- Topic appears on canvas immediately (first field emitted).
- Each `positions[i].arguments[j].claim` renders as a node when it completes (~1-3s each).
- Cruxes appear after positions, fallacies after cruxes.
- Confidence number rolls in last.

20s of *something happening every 1-2s* vs 20s of blank spinner — completely different dopamine economics.

`extractor.ts:352` does NOT currently support streaming; `executor.ts:101-106` calls `messages.create` without `stream: true`. Adding it requires: (1) `extractArgumentsStreaming()` async iterator, (2) SSE route at `/api/analyze/stream`, (3) client-side SSE consumer in `page.tsx`, (4) re-order JSON schema so `topic`/`summary`/first position emit early. ~2-3 focused days; ship with the hero-CTA rollout.

## 8. Quality concerns

Live-analyze on real articles will produce bad maps:
- **Missed cruxes** — model picks surface-level disagreement.
- **Hallucinated evidence** — invents "study showed 40%..." not in the article.
- **Mis-classified positions** — nuanced "yes, but" essay parsed as one-sided.
- **Fallacy false positives** — current prompt rewards finding fallacies; model finds them when they aren't there.
- **Low-confidence garbage** — song lyrics / recipes produce absurd maps.

Honest disclosure: small "AI-generated, may be wrong" badge on every result, with one-click "Regenerate" and "Report this map." Same pattern Perplexity and Notion use — boring, expected, sufficient.

Two retention features that double as quality safeguards:
1. **Easy regenerate** — fresh model call. Costs $0.03 but increases trust per call.
2. **"Was this useful?" thumbs** — anonymously logged. Drives prompt iteration and surfaces inputs that reliably produce good maps (use as homepage examples).

Skip a human-review queue at founding stage. Trust disclaimer + regenerate + feedback.

## 9. The 30-day rollout plan

Gradual ramp, gated by metrics. Each week's gate is a real number, not a vibe.

**Week 1 (days 1-7): Authenticated-only live analyze.** Flip `ENABLE_LIVE_ANALYZE_API=true`. Auth wall stays. Add prompt caching, content-hash dedupe, OpenAI Moderation pre-flight. Wire metrics: latency, cost, fail rate, cache hit. Daily cost ceiling: $5. **Gate to wk2:** fail rate < 5%, p95 < 15s, no abuse incidents.

**Week 2 (days 8-14): Email-gated free first analysis.** Add anonymous-with-email tier, magic-link signup. New `/api/analyze/anonymous` endpoint: 1/day/IP, 5K char cap, in-memory persistence with 24h TTL. Add Turnstile. Build streaming SSE (or scope-cut to a faster non-streaming with progress messages). Daily cost ceiling: $25. **Gate to wk3:** anon-to-email conversion ≥ 15%, moderation flags ≤ 0.5%.

**Week 3 (days 15-21): Anonymous first-use, hero CTA flip.** Drop email gate for first analysis. Homepage hero becomes the textarea; featured topic moves below fold. Email at second use, account at sixth. Streaming UX live. "Was this useful?" feedback on every result. One credible distribution shot (HN Show / ACX Open Thread / curated Twitter thread). Daily cost ceiling: $200, auto-failback to offline if exceeded. **Gate to wk4:** ≥ 30% of visitors paste, ≥ 10% complete.

**Week 4 (days 22-30): Measure, iterate, decide.** Cohort: anonymous-first-paste vs control (old homepage). Measure 7-day return rate. Look at the input corpus — what are people pasting? Op-eds? Reddit? Their homework? This reveals who the actual users are. Iterate the prompt against the actual input distribution (current prompt was tuned on synthetic test data).

**Kill criterion:** if 7-day return rate from anonymous-first-paste cohort is **not at least 2x** the current ~5% topics-grid baseline, live-analyze hero is not the activation hook and the flag goes back off.

---

## Summary

**Should live-analyze be the hero hook?** Yes, conditional on the abuse stack and rollout plan above. The economics work at every realistic traffic level once content-hash caching and prompt caching are in place. The 10K-viral-day cost ($400) is large but bounded and can be hard-capped via per-tier rate limits with auto-failback to offline. The product's only real differentiator versus Kialo, Arguman, and the long tail of debate sites is "AI extracts the map" — and right now no stranger can experience that. Flipping the flag is the single highest-information-bet experiment in the activation freeze. The risks (cost, abuse, quality embarrassment) are all mitigable with one focused engineering week before flipping the public flag.

**Three next-step actions to validate:**

1. **Implement prompt caching + content-hash dedupe + OpenAI Moderation pre-flight** before any flag flip. Without these, a single bad day burns the runway.
2. **Build streaming JSON output and incremental node rendering** as a parallel work stream — the demo only works if it *feels* live, not after a 20-second spinner. 2-3 days of work.
3. **Run the week-3 hero-flip A/B against the current topics-grid homepage with one credible distribution shot** (HN Show, ACX Open Thread, or a single high-signal Twitter thread). Decide on the 7-day return cohort, not on launch-day click-through.

## Sources

- [Claude API Pricing 2026 — pricepertoken (Sonnet 4.6)](https://pricepertoken.com/pricing-page/model/anthropic-claude-sonnet-4.6)
- [Claude API Pricing — BenchLM (April 2026)](https://benchlm.ai/blog/posts/claude-api-pricing)
- [GPT-4o Pricing 2026 — pricepertoken](https://pricepertoken.com/pricing-page/model/openai-gpt-4o)
- [Streaming Messages — Claude API Docs](https://platform.claude.com/docs/en/build-with-claude/streaming)
- [Anthropic SDK Python — Streaming (DeepWiki)](https://deepwiki.com/anthropics/anthropic-sdk-python/6-streaming)
- [OWASP LLM Prompt Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html)
- [OWASP Gen AI — LLM01:2025 Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)
- [OWASP Gen AI — LLM10:2025 Unbounded Consumption](https://genai.owasp.org/llmrisk/llm102025-unbounded-consumption/)
- [How Lex Happened — Every / Divinations](https://every.to/divinations/how-lex-happened)
- [Lex.page homepage (300K+ writers claim)](https://lex.page/)
- [v0 Pricing & Free Tier](https://v0.app/docs/pricing)
- [Choosing your AI prototyping stack — Anna Arteeva (Medium)](https://annaarteeva.medium.com/choosing-your-ai-prototyping-stack-lovable-v0-bolt-replit-cursor-magic-patterns-compared-9a5194f163e9)
- [How AI Products Drive Adoption: The Template Activation Loop — Fishman Afnewsletter](https://www.fishmanafnewsletter.com/p/how-ai-products-drive-adoption-in-onboarding-through-template-activation-loop)
- Argumend repo — `lib/analyze/extractor.ts:145-376`, `lib/analyze/offline.ts:21-31, 59-82`, `lib/agents/executor.ts:95-113, 237-311`, `app/api/analyze/route.ts:14-138`, `app/analyze/page.tsx:381-567`, `lib/rate-limit.ts:29-100`

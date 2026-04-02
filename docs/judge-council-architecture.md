# The Council of Judges: Multi-Model AI Evaluation for Debates

*How Argumend uses multi-model AI to deliver transparent, calibrated verdicts*

---

## Why Judgment Needs Diversity

In early testing, we asked Claude to judge a debate about AI safety. The FOR side made sweeping philosophical claims about existential risk; the AGAINST side presented narrow empirical studies showing current AI systems lack dangerous capabilities. Claude scored FOR higher—favoring eloquent abstraction over grounded evidence.

Then we asked GPT-4. It reversed the verdict, penalizing FOR for unfalsifiable claims while rewarding AGAINST's specific citations.

Same debate. Two models. Opposite conclusions.

This wasn't a bug—it revealed something fundamental: evaluation involves judgment, and judgment reflects values embedded during training. [Research from UC Berkeley](https://arxiv.org/abs/2306.05685) documents systematic biases in LLM judges: position bias (favoring the first response), verbosity bias (rewarding length over substance), and self-enhancement bias (preferring outputs similar to their own training distribution). Any single judge amplifies its particular biases. A council of diverse judges surfaces disagreement, forcing us to reckon with genuine ambiguity rather than accepting one model's verdict as truth.

## The Council Architecture

Inspired by [Andrej Karpathy's LLM Council](https://github.com/karpathy/llm-council)—which assembles multiple models to answer questions collaboratively—Argumend implements a multi-model evaluation system designed specifically for debate scoring. Our approach differs in one key respect: rather than having judges rank each other's responses, we use a fixed rubric that all judges score independently. This reflects that debate evaluation asks "how well did each side argue?" rather than "which response is best?"

```
┌─────────────────────────────────────────────────────────┐
│                     Debate Transcript                   │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│                   Judge Council                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │  Claude  │  │  GPT-4   │  │  Gemini  │   parallel   │
│  │  Judge   │  │  Judge   │  │  Judge   │   execution  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘              │
│       │             │             │                     │
│       └─────────────┼─────────────┘                     │
│                     ▼                                   │
│            Score Aggregation                            │
│         + Disagreement Detection                        │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│                  Verdict + Reasoning                    │
│  - Winner (or explicit "no consensus")                  │
│  - Individual judge scores & explanations               │
│  - Flagged disagreements                                │
└─────────────────────────────────────────────────────────┘
```

### Parallel, Independent Evaluation

When a debate concludes, we send the full transcript to Claude, GPT-4, and Gemini concurrently. Each judge receives identical instructions and operates without knowledge of the others. This independence matters: if judges could see each other's scores, they might anchor or conform, destroying the diversity that makes the council valuable.

```typescript
// All judges evaluate concurrently
const verdicts = await Promise.all(
  judges.map((judge) =>
    executeAgent({ agent: judge, systemPrompt, userPrompt })
  )
);
```

The total latency equals the slowest model's response time, not the sum of all three—a practical benefit for user experience.

### The Scoring Rubric

Every judge scores the same five dimensions:

| Dimension | Weight | Rationale |
|-----------|--------|-----------|
| **Logical Validity** | 25% | Fallacious arguments should lose |
| **Evidence Quality** | 25% | Unsupported claims are opinions, not arguments |
| **Rebuttal Strength** | 20% | Ignoring opponents signals weak engagement |
| **Crux Identification** | 15% | Finding the true disagreement demonstrates understanding |
| **Clarity** | 15% | Incomprehensible brilliance is worthless |

**Why these weights?** The 25/25/20/15/15 split prioritizes logic and evidence equally—both sound reasoning *and* empirical grounding matter. Rebuttal strength earns 20% because failing to engage opponents is a moderate sin, though some debates involve genuinely parallel arguments. Crux identification and clarity receive lower weights because they're secondary to the core question: is this argument valid and supported?

These weights are configurable. Users with different epistemological preferences can adjust them—prioritizing clarity for public communication or crux identification for philosophical discourse.

Each judge scores 1-10 per dimension and must provide:
- Specific quotes from the debate justifying each score
- An overall summary for each side
- A confidence level (0-1) reflecting certainty in the assessment

Forced citation prevents judges from scoring on vague impressions.

### Aggregation and Disagreement Detection

Raw scores from three judges become a verdict through simple averaging—but we treat disagreement as signal, not noise.

**When judges disagree by more than 3 points on any dimension, we flag it.** Why 3? On a 10-point scale, this represents a 30% spread—substantial enough to indicate meaningfully different assessments. A 1-2 point spread is normal variance; 3+ suggests the dimension is genuinely ambiguous or the judges are responding to different aspects of the argument.

```typescript
function hasSignificantDisagreement(scores: number[]): boolean {
  return Math.max(...scores) - Math.min(...scores) > 3;
}
```

**Consensus determination:**
- **Unanimous**: All three judges agree on the winner → high confidence
- **Majority**: Two judges agree → moderate confidence, noted as "split decision"
- **No consensus**: Three-way split or virtual tie (scores within 0.5 points) → no winner declared, flagged for human review

We deliberately avoid forcing a verdict when judges genuinely disagree. A "no consensus" result isn't failure—it's honest acknowledgment that reasonable evaluators differed.

## A Worked Example

Consider a two-round debate on "Should AI development be paused?"

**FOR side argues**: Current AI capabilities are advancing faster than our ability to align them with human values. Historical precedent (nuclear weapons, CFCs) shows we should pause transformative technologies until safety is assured. Leading researchers have signed letters calling for a moratorium.

**AGAINST side argues**: Pausing is impractical given global competition; unilateral pause merely cedes advantage to less safety-conscious actors. Current AI systems show no signs of autonomous goal-seeking. The "pause" framing conflates research (which should continue) with deployment (which can be regulated).

**Judge verdicts:**

| Dimension | Claude | GPT-4 | Gemini | Average |
|-----------|--------|-------|--------|---------|
| Logical Validity | FOR: 7, AGAINST: 8 | FOR: 6, AGAINST: 8 | FOR: 7, AGAINST: 7 | FOR: 6.7, AGAINST: 7.7 |
| Evidence Quality | FOR: 6, AGAINST: 7 | FOR: 5, AGAINST: 8 | FOR: 7, AGAINST: 6 | FOR: 6.0, AGAINST: 7.0 |
| Rebuttal Strength | FOR: 5, AGAINST: 7 | FOR: 4, AGAINST: 8 | FOR: 6, AGAINST: 6 | FOR: 5.0, AGAINST: 7.0 |
| Crux Identification | FOR: 7, AGAINST: 6 | FOR: 8, AGAINST: 5 | FOR: 6, AGAINST: 7 | FOR: 7.0, AGAINST: 6.0 |
| Clarity | FOR: 8, AGAINST: 7 | FOR: 7, AGAINST: 8 | FOR: 8, AGAINST: 7 | FOR: 7.7, AGAINST: 7.3 |

**Weighted totals:** FOR: 6.35, AGAINST: 7.10

**Flagged disagreement:** Evidence Quality shows a 2-point spread (not flagged), but Rebuttal Strength shows GPT-4 scoring AGAINST at 8 while Gemini scores it at 6—exactly at the threshold. This surfaces to the user: "Judges disagreed on how well AGAINST addressed FOR's points."

**Final verdict:** AGAINST wins by majority consensus (all three judges scored AGAINST higher overall), with noted disagreement on rebuttal assessment.

Users see not just "AGAINST wins" but *why* each judge scored as they did, *where* they disagreed, and *how confident* the verdict is. This transforms opaque AI judgment into transparent deliberation.

## Limitations and Failure Modes

Multi-model evaluation isn't a panacea. Three judges aren't always better than one—but they're more transparent and often more robust.

**Correlated failures**: If all three models share training data encoding a particular bias (e.g., deference to academic citations over practitioner experience), the council inherits that bias unanimously. Ensemble diversity helps only when models fail in uncorrelated ways.

**Cost**: Running three models costs roughly 3× a single model. For Argumend's use case—high-stakes evaluation of consequential debates—this tradeoff favors thoroughness. For bulk content moderation, it would be prohibitive.

**Prompt sensitivity**: All judges receive the same system prompt. If that prompt is poorly designed, all three judges fail identically. The architecture doesn't compensate for poor prompt engineering.

**Extreme disagreement**: When one judge scores 9 and another scores 3, averaging to 6 may be meaningless—it reflects neither judge's actual assessment. Our current approach flags this but doesn't resolve it. Future iterations may implement outlier detection or weighted voting based on historical accuracy.

**Domain blindness**: For highly technical debates (advanced physics, niche legal questions), all three general-purpose models may lack expertise to evaluate competently. Specialized models or human experts may be necessary.

We surface these limitations in the UI. When the council flags a verdict for review, users understand it's an invitation to apply their own judgment, not a system error.

## The Case for Multiple Judges

The ensemble approach rests on a hypothesis: *models with different training regimes have partially uncorrelated failure modes, so aggregation reduces overall error rate.*

We haven't validated this empirically for our specific use case. The [MT-Bench research](https://arxiv.org/abs/2306.05685) shows GPT-4 achieves ~80% agreement with human preferences—impressive but imperfect. Whether our three-model council exceeds 80% agreement remains an open question we plan to test.

What we *can* claim with confidence:

1. **Transparency builds trust.** Even if the council isn't more accurate than a single judge, showing three independent assessments with reasoning gives users far more information.

2. **Disagreement is informative.** A split verdict tells users something a unanimous verdict cannot: that the outcome depends on value judgments about what makes arguments good.

3. **Graceful degradation.** If one model's API fails, the council continues with two judges. Single-model systems fail completely.

The [VirtusLab analysis](https://virtuslab.com/blog/ai/llm-council/) of Karpathy's Council architecture makes the cost-benefit case: "For high-stakes applications, spending 5× inference costs across multiple models can reduce error rates significantly." Debate evaluation—which shapes how users think about contested questions—qualifies.

## Technical Reference

**API Endpoint**: `POST /api/judge`

```json
{
  "type": "debate",
  "topic": "Should nuclear power be expanded?",
  "messages": [
    { "side": "for", "content": "...", "round": 1 },
    { "side": "against", "content": "...", "round": 1 }
  ],
  "judgeModels": ["claude", "gpt-4", "gemini"]
}
```

**Response structure:**
```json
{
  "verdicts": [...],           // Individual judge assessments
  "winner": "against",         // Or "for", "draw", null
  "hasConsensus": true,        // All judges agreed
  "aggregatedScores": {...},   // Averaged dimension scores
  "disagreements": [...],      // Flagged high-variance dimensions
  "flaggedForReview": false    // Recommend human review?
}
```

**Source files:**
- `lib/judge/council.ts` — JudgeCouncil class orchestrating parallel evaluation
- `lib/judge/rubric.ts` — Scoring dimensions, weights, and aggregation logic
- `lib/judge/prompts.ts` — System prompts engineering judge behavior
- `components/JudgingResults.tsx` — UI for displaying verdicts and reasoning

---

*Architecture inspired by [Karpathy's LLM Council](https://github.com/karpathy/llm-council). Research foundations from [Judging LLM-as-a-Judge (Zheng et al., 2023)](https://arxiv.org/abs/2306.05685). For deeper background on LLM evaluation methodology, see [Evidently AI's comprehensive guide](https://www.evidentlyai.com/llm-guide/llm-as-a-judge).*

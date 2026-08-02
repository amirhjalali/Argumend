import {
  TopicSchema,
  computeBalance,
  computeWeight,
  getVerdict,
  type Topic,
  type TopicInput,
} from "@/lib/schemas/topic";
import { WEIGHT } from "@/lib/constants";

/** Normalize authored topic input into the canonical computed Topic shape. */
export function buildTopic(data: TopicInput): Topic {
  const computedBalance = computeBalance(data.pillars);
  const computedWeight = computeWeight(data.pillars);

  // Settled topics: trust the authored score as a floor on the tilt, and
  // guarantee a weight floor — "settled" is an editorial assertion of both.
  const balance =
    data.status === "settled"
      ? Math.max(computedBalance, data.confidence_score ?? 0)
      : computedBalance;
  const weight =
    data.status === "settled"
      ? Math.max(computedWeight, WEIGHT.SETTLED_FLOOR)
      : computedWeight;

  // Guarantee every topic has at least one tag so tag pages always have content.
  // Always include the category, then any explicit tags (deduped).
  const tags = Array.from(new Set([data.category, ...(data.tags ?? [])]));

  return TopicSchema.parse({
    ...data,
    tags,
    balance,
    weight,
    verdict: getVerdict(balance, weight),
    confidence_score: balance, // @deprecated mirror — JSON-LD + unmigrated surfaces only
  });
}

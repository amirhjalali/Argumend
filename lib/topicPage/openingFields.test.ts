/**
 * Every legacy map opens with a fact under its title and a line above its
 * crux sheet (round 13: 41 maps went straight from the title to "What both
 * sides already agree on", leaving a visitor from a shared link with no
 * orientation). The page reads `keystone_fact` as the hook and `simple_case`
 * as the crux-sheet lede (lib/topicPage/legacy.ts); what they may say is
 * checked by ./ledeContract.test.ts.
 */
import { describe, expect, it } from "vitest";
import { topics } from "@/data/topics";

/**
 * Maps other round-13 work was editing while the openings were written.
 * Remove an id once its map has both fields.
 */
const OPENING_PENDING = new Set(["minneapolis-shooting"]);

describe("map openings", () => {
  it("every legacy map has a sourced opening fact and a crux-sheet lede", () => {
    const missing = topics
      .filter((topic) => !OPENING_PENDING.has(topic.id))
      .filter((topic) => {
        const fact = topic.keystone_fact;
        const hasFact = !!fact?.statement.trim() && !!fact.source.trim() && !!fact.sourceUrl;
        const hasLede = (topic.simple_case ?? []).some((paragraph) => paragraph.trim().length > 0);
        return !hasFact || !hasLede;
      })
      .map((topic) => topic.id);
    expect(missing).toEqual([]);
  });
});

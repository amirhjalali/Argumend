import type { Topic } from "@/lib/schemas/topic";

/**
 * A legacy map with its falsification blocks taken out.
 *
 * Every shipped pillar map now carries `crux.falsification`, so the pages'
 * no-data fallback (no agreement block, no mind-change lines, the crux title
 * as the heading when nothing is authored) is tested on this fixture rather
 * than on whichever real map happened to lack the data.
 */
export function withoutFalsification(topic: Topic): Topic {
  return {
    ...topic,
    pillars: topic.pillars.map((pillar) => {
      const { falsification: _dropped, ...crux } = pillar.crux;
      return { ...pillar, crux };
    }),
  };
}

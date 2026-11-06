/**
 * For e2e/paste.spec.ts's borrowed-card test, run with tsx (the Playwright
 * loader does not resolve the "@/" imports the paste lane loads lazily).
 * Prints, as JSON on its last line, the live match for the paste in argv[2]
 * and the match the same code gives when the selected crux of that live map
 * has no "for" cards (lib/paste/testTopics.ts, withoutSide).
 */
import { loadTopicById } from "@/data/topicLoader";
import { findMaps, matchOnTopic } from "@/lib/paste/maps";
import { withoutSide } from "@/lib/paste/testTopics";

async function main() {
  const paste = process.argv[2];
  const live = (await findMaps(paste)).match;
  const pillarId = live?.kind === "map" ? live.crux?.href.split("#crux-")[1] : undefined;
  const topic = live && pillarId ? await loadTopicById(live.id) : null;
  const forced = topic && pillarId ? await matchOnTopic(withoutSide(topic, pillarId, "for"), paste) : null;
  process.stdout.write(`\n${JSON.stringify({ live, forced })}\n`);
}

void main();

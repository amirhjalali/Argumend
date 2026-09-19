// Render the three flagship maps used in the crux repeatability review to transcripts.
import { writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
const HERE = dirname(fileURLToPath(import.meta.url));
import { renderDebateFromGraph } from "@/lib/disagreement/corpus/renderDebate";
import { loadArgumentTopic } from "@/lib/argument/draftTopics";

for (const id of ["ai-mass-unemployment", "capitalism-after-ai", "us-israel-support"]) {
  const topic = loadArgumentTopic(id);
  if (!topic) {
    console.log("missing", id);
    continue;
  }
  const debate = renderDebateFromGraph(topic.graph);
  writeFileSync(`${HERE}/${id}.transcript.txt`, debate.source);
  writeFileSync(`${HERE}/${id}.truth.json`, JSON.stringify({ truth: debate.truth, cruxes: topic.cruxes }, null, 2));
  console.log(id, "chars", debate.source.length, "| Q:", topic.graph.question.statement, "| cruxes:", topic.cruxes.length, "| nodes:", topic.graph.nodes.length);
}

/**
 * Generate pre-computed verdicts for all mock debates.
 *
 * Usage: npx tsx scripts/generate-verdicts.ts
 */

 

import { MOCK_DEBATES } from "../data/mockDebates";
import { judgeWithClaudePanel } from "../lib/judge/panel";
import type { JudgingResult } from "../lib/judge/rubric";
import * as fs from "fs";
import * as path from "path";

const verdicts: Record<string, JudgingResult> = {};
const topicIds = Object.keys(MOCK_DEBATES);

console.log(`Judging ${topicIds.length} debates with 3-Claude panel...\n`);

for (const topicId of topicIds) {
  const messages = MOCK_DEBATES[topicId];
  if (!messages || messages.length === 0) {
    console.log(`  SKIP ${topicId} (no messages)`);
    continue;
  }
  const result = judgeWithClaudePanel(messages, topicId);
  verdicts[topicId] = result;
  const winLabel = result.winner === "for" ? "FOR" : result.winner === "against" ? "AGAINST" : "DRAW";
  const forAvg = result.aggregatedScores.for.average.toFixed(2);
  const againstAvg = result.aggregatedScores.against.average.toFixed(2);
  const consensusTag = result.hasConsensus ? "unanimous" : "split";
  console.log(`  ${topicId}: ${winLabel} (${forAvg} vs ${againstAvg}) [${consensusTag}]`);
}

// Write the output JSON file (the .ts wrapper imports from this)
const outputPath = path.join(__dirname, "..", "data", "mockVerdicts.json");

fs.writeFileSync(outputPath, JSON.stringify(verdicts, null, 2), "utf-8");
console.log(`\nWrote ${Object.keys(verdicts).length} verdicts to data/mockVerdicts.json`);

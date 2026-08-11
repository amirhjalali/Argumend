/**
 * Validate an ArgumentGraph draft JSON and run the crux engine over it.
 *
 * Usage: node_modules/.bin/tsx scripts/validate-argument-draft.ts <path-to-draft.json>
 *
 * Exits 1 on parse failure or validation ERRORS; warnings are reported but non-fatal.
 * On success, prints the ranked cruxes with their component scores so authors can
 * check the graph against the pre-registered acceptance tests in docs/CRUX_ENGINE.md.
 */
import { readFileSync } from "node:fs";
import { parseArgumentGraph } from "@/lib/schemas/argument";
import { validateArgumentGraph } from "@/lib/argument/validate";
import { identifyCruxes } from "@/lib/crux";

const path = process.argv[2];
if (!path) {
  console.error("usage: tsx scripts/validate-argument-draft.ts <draft.json>");
  process.exit(1);
}

const raw = JSON.parse(readFileSync(path, "utf8"));
const parsed = parseArgumentGraph(raw);
if (!parsed.ok) {
  console.error(`SCHEMA: FAIL (${parsed.errors.length} errors)`);
  for (const err of parsed.errors.slice(0, 40)) console.error(`  - ${err}`);
  process.exit(1);
}
console.log("SCHEMA: ok");

const issues = validateArgumentGraph(parsed.graph);
const errors = issues.filter((i) => i.severity === "error");
const warnings = issues.filter((i) => i.severity === "warning");
console.log(`VALIDATION: ${errors.length} errors, ${warnings.length} warnings`);
for (const issue of errors) {
  console.log(`  ERROR [${issue.rule}] ${issue.nodeId ?? issue.edgeId ?? ""}: ${issue.message}`);
}
for (const issue of warnings) {
  console.log(`  warn  [${issue.rule}] ${issue.nodeId ?? issue.edgeId ?? ""}: ${issue.message}`);
}
if (errors.length > 0) process.exit(1);

const cruxes = identifyCruxes(parsed.graph);
console.log(`\nCRUXES (${cruxes.length}):`);
for (const crux of cruxes) {
  const node = parsed.graph.nodes.find((n) => n.id === crux.claimId);
  console.log(
    `  ${crux.score.toFixed(3)}  ${crux.claimId}  [C ${crux.contestedness.toFixed(2)} R ${crux.reach.toFixed(2)} D ${crux.discrimination.toFixed(2)} T ${crux.tractability.toFixed(2)}]${crux.evidenceStarved ? " (evidence-starved)" : ""}`
  );
  if (node) console.log(`         ${node.statement.slice(0, 110)}`);
}

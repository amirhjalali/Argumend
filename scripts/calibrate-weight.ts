/**
 * Calibration report for the weight formula (spec §2.2).
 *
 * Usage: bun --bun tsx scripts/calibrate-weight.ts
 *
 * Prints every topic's balance/weight/verdict sorted by weight, a histogram,
 * and pass/fail against the anchor targets. Tune WEIGHT in lib/constants.ts
 * until the anchors pass and the spread is legible, then re-run.
 */

import { topics } from "../data/topics";

const rows = [...topics].sort((a, b) => b.weight - a.weight);
for (const t of rows) {
  const d = Math.abs(t.balance - 50);
  console.log(
    `${String(t.weight).padStart(3)}  b=${String(t.balance).padStart(3)} d=${String(d).padStart(2)}  ${t.verdict.quadrant.padEnd(9)}  ${t.id}`
  );
}

const buckets = [0, 0, 0, 0, 0]; // 0-19, 20-39, 40-59, 60-79, 80-100
for (const t of topics) buckets[Math.min(4, Math.floor(t.weight / 20))]++;
console.log("\nweight histogram (0-19 / 20-39 / 40-59 / 60-79 / 80-100):", buckets.join(" / "));

const get = (id: string) => topics.find((t) => t.id === id);
const checks: [string, boolean][] = [
  ["moon-landing weight > 80", (get("moon-landing")?.weight ?? 0) > 80],
  ["moloch weight in [60, 80]", (get("moloch")?.weight ?? 0) >= 60 && (get("moloch")?.weight ?? 100) <= 80],
  ["moloch quadrant = contested", get("moloch")?.verdict.quadrant === "contested"],
  ["ai-2027 quadrant = contested", get("ai-2027")?.verdict.quadrant === "contested"],
  ["some topic weight < 35", Math.min(...topics.map((t) => t.weight)) < 35],
  ["spread > 40", Math.max(...topics.map((t) => t.weight)) - Math.min(...topics.map((t) => t.weight)) > 40],
];
console.log("\nanchors:");
for (const [name, ok] of checks) console.log(`  ${ok ? "PASS" : "FAIL"}  ${name}`);
process.exitCode = checks.every(([, ok]) => ok) ? 0 : 1;

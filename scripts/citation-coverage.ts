/**
 * Citation-coverage metric (Tier "Citation Moat" sprint).
 *
 * For every topic, counts evidence items and how many carry a resolvable
 * `sourceUrl`. Reports per-topic coverage ascending (worst first) so the
 * hardening sprint can target the lowest-coverage maps, plus an overall %.
 *
 * Usage: bun scripts/citation-coverage.ts            (summary + worst 30)
 *        bun scripts/citation-coverage.ts --all      (every topic)
 *        bun scripts/citation-coverage.ts --json      (machine-readable)
 */
import { topics } from "../data/topics";

type Row = {
  id: string;
  evidence: number;
  withUrl: number;
  coverage: number; // 0-100
};

const rows: Row[] = topics.map((t) => {
  const ev = t.pillars.flatMap((p) => p.evidence ?? []);
  const withUrl = ev.filter(
    (e) => typeof e.sourceUrl === "string" && /^https?:\/\/\S+\.\S+/.test(e.sourceUrl),
  ).length;
  return {
    id: t.id,
    evidence: ev.length,
    withUrl,
    coverage: ev.length === 0 ? 0 : Math.round((withUrl / ev.length) * 100),
  };
});

const totalEv = rows.reduce((s, r) => s + r.evidence, 0);
const totalUrl = rows.reduce((s, r) => s + r.withUrl, 0);
const overall = totalEv === 0 ? 0 : Math.round((totalUrl / totalEv) * 100);
const noEvidence = rows.filter((r) => r.evidence === 0);
const sorted = [...rows].sort((a, b) => a.coverage - b.coverage || a.id.localeCompare(b.id));

if (process.argv.includes("--json")) {
  console.log(JSON.stringify({ overall, totalEv, totalUrl, rows: sorted }, null, 2));
} else {
  const showAll = process.argv.includes("--all");
  console.log(`Citation coverage: ${totalUrl}/${totalEv} evidence items have a sourceUrl = ${overall}%`);
  console.log(`Topics: ${rows.length} | with zero evidence: ${noEvidence.length}${noEvidence.length ? " (" + noEvidence.map((r) => r.id).join(", ") + ")" : ""}`);
  console.log(`\nLowest coverage (worst first):`);
  for (const r of (showAll ? sorted : sorted.slice(0, 30))) {
    console.log(`  ${String(r.coverage).padStart(3)}%  ${String(r.withUrl)}/${String(r.evidence)}  ${r.id}`);
  }
}

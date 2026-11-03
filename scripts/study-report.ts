/**
 * The study's report (docs/plans/2026-11-03-study-plan.md, "Analysis plan").
 * Reads `study_responses`, applies the pre-registered exclusions, writes CSVs,
 * and prints the primary outcome and the H1 decision.
 *
 *   DATABASE_URL=postgres://... npx tsx scripts/study-report.ts [--out dir] [--study <prolific study id>]
 *   npx tsx scripts/study-report.ts --input rows.json [--out dir]
 *   DATABASE_URL=... STUDY_PID_SECRET=... npx tsx scripts/study-report.ts --check-pids prolific-export.csv
 *
 * --out          where the CSVs go (default ./study-report). Writes
 *                study-responses.csv (one row per analysed participant, with
 *                their gap scores) and study-arms.csv (one row per arm).
 * --study        only rows from one Prolific study id (the pilot is analysed
 *                separately and never pooled with the main study).
 * --input        a JSON array of rows in the StudyRow shape, instead of the database.
 * --check-pids   a Prolific submissions export (or one id per line): prints
 *                which participants have a stored response, for approving
 *                submissions. Hashes each id with STUDY_PID_SECRET; prints counts
 *                and the unmatched ids only.
 *
 * Reads `.env.local` like drizzle.config.ts. Read-only: it never writes to the database.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { config } from "dotenv";
import { analyseStudy, armsCsv, responsesCsv, type StudyReport, type StudyRow } from "../lib/study/analysis";

config({ path: ".env.local" });

function argValue(name: string): string | undefined {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

const fmt = (value: number, digits = 2) => (Number.isFinite(value) ? value.toFixed(digits) : "–");

export function formatReport(report: StudyReport): string {
  const lines: string[] = [];
  lines.push(`rows: ${report.totalRows}; analysed: ${report.analysed.length}`);
  lines.push(
    `excluded: attention ${report.excluded.attention}, too fast ${report.excluded["too-fast"]}, other version ${report.excluded.version}`,
  );
  lines.push("");
  lines.push("arm       n     gap pre  gap post  change  crux %  charity pre→post  perceived pre→post  read s (median)");
  for (const arm of report.arms) {
    lines.push(
      [
        arm.arm.padEnd(8),
        String(arm.n).padStart(4),
        fmt(arm.gapPre).padStart(9),
        fmt(arm.gapPost).padStart(9),
        fmt(arm.gapChange).padStart(7),
        fmt(arm.cruxCorrect * 100, 0).padStart(7),
        `${fmt(arm.charityPre)}→${fmt(arm.charityPost)}`.padStart(18),
        `${fmt(arm.perceivedPre)}→${fmt(arm.perceivedPost)}`.padStart(20),
        fmt(arm.medianStimulusSeconds, 0).padStart(16),
      ].join(" "),
    );
  }
  lines.push("");
  if (report.h1 === "insufficient data") {
    lines.push("Primary outcome: insufficient data (fewer than 10 analysable participants in an arm).");
    return lines.join("\n");
  }
  lines.push("Primary outcome (H1): post perception gap, adjusted for pre gap, topic, party, device; HC2 SEs.");
  lines.push("Estimate = comparison arm minus map arm, in percentage points (positive favours the map).");
  for (const c of report.primary) {
    lines.push(`  map vs ${c.versus.padEnd(7)} ${fmt(c.estimate)} pp (SE ${fmt(c.se)}), p = ${fmt(c.p, 4)}, d = ${fmt(c.standardized)}`);
  }
  lines.push(`H1: ${report.h1} (both contrasts must favour the map with p < 0.05).`);
  lines.push("");
  lines.push("Secondary (Holm-adjusted across these four):");
  for (const c of report.secondary) {
    lines.push(
      `  ${c.outcome.padEnd(8)} map vs ${c.versus.padEnd(7)} ${fmt(c.estimate, 3)} (SE ${fmt(c.se, 3)}), p = ${fmt(c.p, 4)}, Holm p = ${fmt(c.pAdjusted, 4)}, d = ${fmt(c.standardized)}`,
    );
  }
  lines.push("");
  lines.push("Read the decision rules in the plan before reading anything into these numbers.");
  return lines.join("\n");
}

async function loadRows(study: string | undefined): Promise<StudyRow[] | null> {
  const input = argValue("--input");
  if (input) {
    const rows = JSON.parse(readFileSync(resolve(input), "utf8")) as StudyRow[];
    return study ? rows.filter((row) => row.prolificStudyId === study) : rows;
  }
  if (!process.env.DATABASE_URL?.trim()) return null;
  const [{ getDb }, { studyResponses }, { eq }] = await Promise.all([
    import("../lib/db"),
    import("../lib/db/schema"),
    import("drizzle-orm"),
  ]);
  const db = getDb();
  const query = db.select().from(studyResponses);
  const rows = study ? await query.where(eq(studyResponses.prolificStudyId, study)) : await query;
  return rows as unknown as StudyRow[];
}

async function checkPids(file: string) {
  const secret = process.env.STUDY_PID_SECRET?.trim();
  if (!secret || !process.env.DATABASE_URL?.trim()) {
    console.log("study-report --check-pids needs DATABASE_URL and STUDY_PID_SECRET (the production values).");
    return;
  }
  const { hashProlificId } = await import("../lib/study/config");
  const ids = [...new Set(readFileSync(resolve(file), "utf8").match(/\b[a-f0-9]{24}\b/gi) ?? [])].map((id) =>
    id.toLowerCase(),
  );
  const [{ getDb }, { studyResponses }] = await Promise.all([import("../lib/db"), import("../lib/db/schema")]);
  const stored = new Set(
    (await getDb().select({ pidHash: studyResponses.pidHash }).from(studyResponses)).map((row) => row.pidHash),
  );
  const unmatched = ids.filter((id) => !stored.has(hashProlificId(id, secret)));
  console.log(`${ids.length} ids in the file; ${ids.length - unmatched.length} have a stored response.`);
  if (unmatched.length) {
    console.log("No stored response (check before approving; a study id in the export also shows up here):");
    for (const id of unmatched) console.log(`  ${id}`);
  }
}

async function main() {
  const pidsFile = argValue("--check-pids");
  if (pidsFile) return checkPids(pidsFile);

  const study = argValue("--study");
  const rows = await loadRows(study);
  if (!rows) {
    console.log(
      [
        "study-report: DATABASE_URL is not set and no --input file was given, so there is nothing to read.",
        "",
        "To produce the report:",
        "  1. Point DATABASE_URL at the production (or a restored) Postgres, in .env.local or the shell.",
        "  2. Make sure migration drizzle/0004_study.sql has been applied (bun run db:migrate).",
        "  3. Rows only exist where the server ran with ENABLE_STUDY_RESPONSES=true and STUDY_PID_SECRET set.",
        "  4. Run: npx tsx scripts/study-report.ts [--study <prolific study id>] [--out dir]",
      ].join("\n"),
    );
    return;
  }

  const report = analyseStudy(rows);
  const out = resolve(argValue("--out") ?? "study-report");
  mkdirSync(out, { recursive: true });
  writeFileSync(join(out, "study-responses.csv"), responsesCsv(report));
  writeFileSync(join(out, "study-arms.csv"), armsCsv(report));
  console.log(formatReport(report));
  console.log(`\nCSV written to ${out}/study-responses.csv and ${out}/study-arms.csv`);
}

const isMain = process.argv[1] && /study-report\.ts$/.test(process.argv[1]);
if (isMain) {
  main().then(
    () => process.exit(0),
    (error: unknown) => {
      console.error(error);
      process.exit(1);
    },
  );
}

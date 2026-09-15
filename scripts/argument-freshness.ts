/**
 * Freshness diagnostics for every registered ArgumentGraph flagship.
 *
 * Usage: node_modules/.bin/tsx scripts/argument-freshness.ts [--today=YYYY-MM-DD] [--verbose] [topicId ...]
 *
 * Exits 1 only on hard errors: a missing or invalid review manifest, a
 * manifest or metadata key that references a node the graph does not have, or
 * a fast-moving id that is not an evidence node. Overdue reviews, missing
 * dates, and undisclosed evidence gaps are printed as warnings and never fail
 * the run — they are signals for a human, per the north-star.
 */
import { loadArgumentTopic, argumentTopicIds } from "@/lib/argument/draftTopics";
import { diagnoseArgumentFreshness, type FreshnessReport } from "@/lib/argument/freshness";
import { loadArgumentReviewManifest, REVIEW_CADENCES, isIsoDate } from "@/lib/argument/reviewManifest";

interface CliOptions {
  today: string;
  verbose: boolean;
  topicIds: string[];
}

function parseArgs(argv: string[]): CliOptions {
  const options: CliOptions = {
    today: new Date().toISOString().slice(0, 10),
    verbose: false,
    topicIds: [],
  };
  for (const arg of argv) {
    if (arg.startsWith("--today=")) {
      const value = arg.slice("--today=".length);
      if (!isIsoDate(value)) {
        console.error(`--today must be a real YYYY-MM-DD date, got "${value}"`);
        process.exit(2);
      }
      options.today = value;
    } else if (arg === "--verbose") {
      options.verbose = true;
    } else if (arg.startsWith("--")) {
      console.error(`unknown flag ${arg}`);
      process.exit(2);
    } else {
      options.topicIds.push(arg);
    }
  }
  if (options.topicIds.length === 0) options.topicIds = [...argumentTopicIds];
  return options;
}

function renderTable(header: string[], rows: string[][]): string {
  const widths = header.map((cell, column) =>
    Math.max(cell.length, ...rows.map((row) => (row[column] ?? "").length))
  );
  const line = (cells: string[]) =>
    cells.map((cell, column) => cell.padEnd(widths[column])).join("  ").trimEnd();
  const rule = widths.map((width) => "-".repeat(width)).join("  ");
  return [line(header), rule, ...rows.map(line)].join("\n");
}

function dueCell(due: string, overdueDays: number): string {
  return overdueDays > 0 ? `${due} OVERDUE ${overdueDays}d` : `${due} ok`;
}

function idList(ids: string[], verbose: boolean, limit = 6): string {
  if (ids.length === 0) return "";
  if (verbose || ids.length <= limit) return ids.join(", ");
  return `${ids.slice(0, limit).join(", ")} … (+${ids.length - limit} more)`;
}

function printReport(report: FreshnessReport, verbose: boolean) {
  const cadence = REVIEW_CADENCES[report.review.cadence];
  console.log(`\n=== ${report.topicId}  (cadence: ${report.review.cadence}; headline every ${cadence.headlineCheckDays}d, full every ${cadence.fullReviewDays}d; evaluated ${report.today})`);

  console.log(
    renderTable(
      ["Review", "Last", "Next due"],
      [
        ["full map", report.review.lastFullReview, dueCell(report.review.nextFullReviewDue, report.review.fullReviewOverdueDays)],
        ["headline check", report.review.lastHeadlineCheck, dueCell(report.review.nextHeadlineCheckDue, report.review.headlineCheckOverdueDays)],
      ]
    )
  );

  const { evidenceDates } = report;
  console.log(
    `\nEvidence dates (${evidenceDates.evidenceCount} current evidence nodes): ` +
      `missing publishedAt ${evidenceDates.missingPublishedAt.length}, missing verifiedAt ${evidenceDates.missingVerifiedAt.length}`
  );
  if (evidenceDates.missingPublishedAt.length > 0) {
    console.log(`  publishedAt missing: ${idList(evidenceDates.missingPublishedAt, verbose)}`);
  }
  if (evidenceDates.missingVerifiedAt.length > 0) {
    console.log(`  verifiedAt missing:  ${idList(evidenceDates.missingVerifiedAt, verbose)}`);
  }

  const overdue = report.fastMoving.filter((status) => status.daysOverdue > 0);
  console.log(`\nFast-moving nodes: ${report.fastMoving.length} tracked, ${overdue.length} past due`);
  if (report.fastMoving.length > 0) {
    const rows = (verbose ? report.fastMoving : overdue).map((status) => [
      status.nodeId,
      status.referenceDate,
      status.dueDate,
      status.daysOverdue > 0 ? `${status.daysOverdue}d overdue` : "ok",
    ]);
    if (rows.length > 0) console.log(renderTable(["Node", "Known good", "Due", "Status"], rows));
  }

  const { metadataKeys } = report;
  console.log(
    `\nMetadata keys: ${metadataKeys.unmatched.length} unmatched` +
      (metadataKeys.notesForNonCruxClaims.length > 0
        ? `; crux notes for unranked claims: ${metadataKeys.notesForNonCruxClaims.join(", ")}`
        : "")
  );
  for (const key of metadataKeys.unmatched) {
    console.log(`  ERROR meta.${key.field}["${key.key}"] ${key.reason}`);
  }

  console.log("\nTop cruxes:");
  console.log(
    renderTable(
      ["#", "Claim", "Type", "Q/F/S/R", "Sup/Chl/Qual", "Quota", "Gap disclosed"],
      report.topCruxes.map((crux) => [
        String(crux.rank),
        crux.claimId,
        crux.epistemicType,
        [crux.hasQuestion, crux.hasFight, crux.hasSoWhat, crux.hasResolution]
          .map((flag) => (flag ? "y" : "-"))
          .join(""),
        `${crux.directEvidence.supporting}/${crux.directEvidence.challenging}/${crux.directEvidence.qualifying}`,
        crux.evidenceQuota,
        crux.gapDisclosure,
      ])
    )
  );

  if (report.errors.length > 0) {
    console.log("\nERRORS:");
    for (const error of report.errors) console.log(`  [${error.code}] ${error.message}`);
  }
  if (report.warnings.length > 0) {
    console.log("\nWarnings (informational):");
    for (const warning of report.warnings) console.log(`  - ${warning}`);
  }
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  let hardErrors = 0;
  const summaryRows: string[][] = [];

  for (const topicId of options.topicIds) {
    const topic = loadArgumentTopic(topicId);
    if (topic === null) {
      console.error(`\n=== ${topicId}\n  ERROR unknown ArgumentGraph topic id`);
      hardErrors += 1;
      continue;
    }

    const loaded = loadArgumentReviewManifest(topicId);
    if (!loaded.ok) {
      console.error(`\n=== ${topicId}\n  ERROR manifest ${loaded.reason} at ${loaded.path}`);
      for (const error of loaded.errors) console.error(`    - ${error}`);
      hardErrors += 1;
      continue;
    }

    const report = diagnoseArgumentFreshness({
      graph: topic.graph,
      manifest: loaded.manifest,
      meta: topic.meta,
      cruxes: topic.cruxes,
      today: options.today,
    });
    printReport(report, options.verbose);
    hardErrors += report.errors.length;

    summaryRows.push([
      topicId,
      report.review.cadence,
      dueCell(report.review.nextFullReviewDue, report.review.fullReviewOverdueDays),
      dueCell(report.review.nextHeadlineCheckDue, report.review.headlineCheckOverdueDays),
      `${report.evidenceDates.missingPublishedAt.length}/${report.evidenceDates.missingVerifiedAt.length} of ${report.evidenceDates.evidenceCount}`,
      `${report.fastMoving.filter((status) => status.daysOverdue > 0).length}/${report.fastMoving.length}`,
      `${report.topCruxes.filter((crux) => crux.issues.length > 0).length}/${report.topCruxes.length}`,
      String(report.errors.length),
    ]);
  }

  console.log(`\n=== Summary (evaluated ${options.today})`);
  console.log(
    renderTable(
      ["Map", "Cadence", "Full review", "Headline check", "Missing pub/ver", "Fast-moving overdue", "Cruxes w/ issues", "Errors"],
      summaryRows
    )
  );

  if (hardErrors > 0) {
    console.error(`\n${hardErrors} hard error(s).`);
    process.exit(1);
  }
  console.log("\nNo hard errors. Warnings above are review signals, not release failures.");
}

main();

import type { DisagreementReportV1 } from "@/types/disagreement";

export function AuditStrip({ report }: { report: DisagreementReportV1 }) {
  const items = [
    `${report.positions.length} position${report.positions.length === 1 ? "" : "s"}`,
    `${report.commonGround.length} shared premise${report.commonGround.length === 1 ? "" : "s"}`,
    `${report.disagreements.length} disputed question${report.disagreements.length === 1 ? "" : "s"}`,
    `${report.cruxes.length} primary crux${report.cruxes.length === 1 ? "" : "es"}`,
    "Source-only analysis",
  ];
  return (
    <ul className="flex flex-wrap gap-2 text-sm text-[var(--text-secondary)]">
      {items.map((item) => (
        <li key={item} className="rounded-md border border-[var(--border-default)] bg-[var(--bg-paper)] px-3 py-2">
          {item}
        </li>
      ))}
    </ul>
  );
}

/**
 * One ledger entry as a mark, in the same shape language as the crux ledger
 * strip on the map pages: an open ring is still running, a ring with a core
 * has narrowed, a filled disc met its condition, and two discs side by side
 * are a standing fork (the map holds both horns). No checks, no crosses.
 */
import type { CruxLedgerStatus } from "@/types/cruxLedger";

const MARK_COLOR: Record<CruxLedgerStatus, string> = {
  open: "text-stone-500 dark:text-stone-400",
  narrowed: "text-[#3a6965] dark:text-[#8fc0bb]",
  resolved: "text-[#3a6965]/60 dark:text-[#8fc0bb]/55",
  unresolvable: "text-[#8B5A3C] dark:text-[#cfa88a]",
};

export function LedgerMark({
  status,
  size = 10,
  className = "",
}: {
  status: CruxLedgerStatus;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      viewBox="0 0 12 12"
      className={`block shrink-0 ${MARK_COLOR[status]} ${className}`}
      data-mark={status}
    >
      {(status === "open" || status === "narrowed") && (
        <circle cx="6" cy="6" r="4.25" fill="var(--bg-canvas)" stroke="currentColor" strokeWidth="1.6" />
      )}
      {status === "narrowed" && <circle cx="6" cy="6" r="1.7" fill="currentColor" />}
      {status === "resolved" && <circle cx="6" cy="6" r="4.5" fill="currentColor" />}
      {status === "unresolvable" && (
        <>
          <circle cx="3.1" cy="6" r="2.35" fill="currentColor" />
          <circle cx="8.9" cy="6" r="2.35" fill="currentColor" />
        </>
      )}
    </svg>
  );
}

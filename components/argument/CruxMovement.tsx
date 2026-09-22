/**
 * The crux movement strip: a dated record of how one crux has moved.
 *
 * Spec: docs/plans/2026-09-22-crux-ledger-and-living-ai-map-spec.md §1.1.
 * Two renderings of the same public history:
 *
 *  - `CruxMovementTrack` sits in the collapsed crux card: a thread of small
 *    marks, one per ledger entry, and the latest status with its month.
 *  - `CruxMovementLedger` sits in the open card: the thread drawn vertically,
 *    each entry with its date, note, and the evidence that moved it.
 *
 * The thread's ending carries the meaning, and the endings are deliberately
 * not symmetric. An open or narrowed crux trails a dashed line (still
 * running). A resolved crux's thread stops at a capped mark and the entry
 * fades (its stated condition was met). An unresolvable crux's thread splits
 * into two lines that keep going, one per horn, under the engine's standing
 * line. No checks, no crosses, no winner: status is movement, not verdict.
 *
 * Server component, zero client JS; the evidence citations use <details>.
 * Renders nothing for a claim with no public entries.
 */
import type { ArgumentNode, Evidence, ResolutionKind } from "@/types/argument";
import type { CruxLedgerStatus } from "@/types/cruxLedger";
import type { CruxMovementEntry } from "@/lib/argument/ledger";

/** The engine's line for a crux no evidence can settle (docs/CRUX_ENGINE.md). */
export const STANDING_DISAGREEMENT_LINE =
  "Nothing does — this is a standing value disagreement; the map holds both horns.";

const STATUS_LABEL: Record<CruxLedgerStatus, string> = {
  open: "Open",
  narrowed: "Narrowed",
  resolved: "Resolved",
  unresolvable: "Unresolvable by evidence",
};

/** Track labels read with the month after them: states hold "since", events do not. */
const STATUS_SHORT_LABEL: Record<CruxLedgerStatus, string> = {
  open: "Open since",
  narrowed: "Narrowed",
  resolved: "Resolved",
  unresolvable: "Unresolvable since",
};

/** Why nothing settles it, for the kinds `unresolvable` allows. */
const UNRESOLVABLE_REASON: Partial<Record<ResolutionKind, string>> = {
  "value-difference": "It turns on a difference in values.",
  "definitional-choice": "It turns on a choice of definition.",
  "authority-allocation": "It turns on who gets to decide.",
};

/**
 * Text color per status. Teal is evidence moving it; brown is a standing fork.
 * Every pair clears 4.5:1 on --bg-panel in its theme (resolved is the faded
 * teal, #56736f = 4.9:1 light; the lighter #6f8f8c was 3.4:1).
 */
const STATUS_TEXT: Record<CruxLedgerStatus, string> = {
  open: "text-stone-600 dark:text-stone-300",
  narrowed: "text-[#3a6965] dark:text-[#8fc0bb]",
  resolved: "text-[#56736f] dark:text-[#7f9c99]",
  unresolvable: "text-[#8B5A3C] dark:text-[#cfa88a]",
};

/** Mark stroke/fill color per status (uses currentColor inside the SVG). */
const STATUS_MARK: Record<CruxLedgerStatus, string> = {
  open: "text-stone-500 dark:text-stone-400",
  narrowed: "text-[#3a6965] dark:text-[#8fc0bb]",
  resolved: "text-[#3a6965]/55 dark:text-[#8fc0bb]/50",
  unresolvable: "text-[#8B5A3C] dark:text-[#cfa88a]",
};

const THREAD = "border-stone-300 dark:border-stone-600";

// ---------------------------------------------------------------------------

function StatusMark({ status, size = 12 }: { status: CruxLedgerStatus; size?: number }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      viewBox="0 0 12 12"
      className={`block shrink-0 ${STATUS_MARK[status]}`}
      data-mark={status}
    >
      {status === "open" && (
        <circle cx="6" cy="6" r="4.25" fill="var(--bg-panel)" stroke="currentColor" strokeWidth="1.5" />
      )}
      {status === "narrowed" && (
        <>
          <circle cx="6" cy="6" r="4.25" fill="var(--bg-panel)" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="6" cy="6" r="1.6" fill="currentColor" />
        </>
      )}
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

// ---------------------------------------------------------------------------
// Compact track (collapsed card)
// ---------------------------------------------------------------------------

const TRACK_MAX_MARKS = 6;

export function CruxMovementTrack({ movement }: { movement: CruxMovementEntry[] }) {
  if (movement.length === 0) return null;
  const latest = movement[movement.length - 1].entry;
  const shown = movement.slice(-TRACK_MAX_MARKS);
  const elided = movement.length > shown.length;
  // A state ("Open since", "Unresolvable since") dates from the first entry of
  // the run that is still in force, not from the latest note written about it.
  const since = STATE_STATUSES.has(latest.status) ? runStart(movement).date : latest.date;
  const first = movement[0].entry.date;
  // Read left to right as a timeline: where the record starts, each entry,
  // then where it stands. The start is dropped when it would repeat the end.
  const showStart = formatMonth(first) !== formatMonth(since);

  return (
    <span className="flex items-center gap-2" data-testid="crux-movement-track">
      {showStart && (
        <time
          dateTime={first}
          className="text-xs leading-none tabular-nums text-muted dark:text-stone-400"
        >
          <span className="sr-only">Record starts </span>
          {formatMonth(first)}
        </time>
      )}
      <span aria-hidden="true" className="flex items-center">
        {elided && <span className={`mr-1 w-2 border-t border-dotted ${THREAD}`} />}
        {shown.map(({ entry }, index) => (
          <span key={entry.id} className="flex items-center">
            {index > 0 && <span className={`w-2.5 border-t ${THREAD}`} />}
            <StatusMark status={entry.status} size={10} />
          </span>
        ))}
        <TrackEnding status={latest.status} />
      </span>
      <span className="text-xs leading-none">
        <span className="sr-only">Latest movement: </span>
        <span className={`font-medium ${STATUS_TEXT[latest.status]}`}>
          {STATUS_SHORT_LABEL[latest.status]}
        </span>{" "}
        <time dateTime={since} className="tabular-nums text-muted dark:text-stone-400">
          {formatMonth(since)}
        </time>
      </span>
    </span>
  );
}

/** Statuses that describe a standing state rather than a dated event. */
const STATE_STATUSES = new Set<CruxLedgerStatus>(["open", "unresolvable"]);

/** The earliest entry of the trailing run that shares the latest status. */
function runStart(movement: CruxMovementEntry[]): CruxMovementEntry["entry"] {
  const status = movement[movement.length - 1].entry.status;
  let start = movement[movement.length - 1].entry;
  for (let i = movement.length - 2; i >= 0 && movement[i].entry.status === status; i--) {
    start = movement[i].entry;
  }
  return start;
}

function TrackEnding({ status }: { status: CruxLedgerStatus }) {
  if (status === "resolved") {
    // Capped: the thread stops here.
    return <span className={`ml-px h-2 border-l ${THREAD}`} />;
  }
  if (status === "unresolvable") {
    // Two lines run on: the map holds both horns.
    return <span className="h-[5px] w-3.5 border-y border-[#8B5A3C]/60 dark:border-[#cfa88a]/60" />;
  }
  // Still running.
  return <span className={`w-3.5 border-t border-dashed ${THREAD}`} />;
}

// ---------------------------------------------------------------------------
// Full ledger (open card)
// ---------------------------------------------------------------------------

type Segment = "solid" | "dashed" | "double" | "none";

export function CruxMovementLedger({
  movement,
  claimId,
  nodesById,
  standingLineShown = false,
}: {
  movement: CruxMovementEntry[];
  claimId: string;
  nodesById: Map<string, ArgumentNode>;
  /**
   * The surrounding card already answers "what would settle it" with
   * STANDING_DISAGREEMENT_LINE. The thread still splits into its two horns,
   * but the caption says when it last moved instead of repeating the line.
   */
  standingLineShown?: boolean;
}) {
  if (movement.length === 0) return null;
  const latest = movement[movement.length - 1].entry;
  const headingId = `movement-${domId(claimId)}`;
  const tail: Segment =
    latest.status === "resolved" ? "none" : latest.status === "unresolvable" ? "double" : "dashed";
  // One author for the whole history is said once, under it, not on every row.
  const authors = new Set(movement.map(({ entry }) => authorLine(entry)));
  const sharedAuthor = authors.size === 1 ? [...authors][0] : null;
  // Likewise one ingest date for every entry (a ledger written in one sitting).
  const noticed = new Set(movement.map(({ entry }) => entry.noticedAt ?? ""));
  const sharedNoticed =
    movement.length > 1 && noticed.size === 1 && movement[0].entry.noticedAt
      ? movement[0].entry.noticedAt
      : null;
  const footer = [
    sharedAuthor,
    sharedNoticed ? `Added to the map ${formatDay(sharedNoticed)}` : null,
  ].filter(Boolean);

  return (
    <section
      aria-labelledby={headingId}
      data-testid="crux-movement-ledger"
      className="!mt-4 border-t border-stone-200/80 pt-4 dark:border-stone-700/60"
    >
      <h4
        id={headingId}
        className="font-serif text-[17px] leading-snug text-stone-900 dark:text-stone-100"
      >
        How this has moved
      </h4>
      <ol className="mt-3">
        {movement.map(({ entry, corrects }, index) => {
          const isLast = index === movement.length - 1;
          const resolved = entry.status === "resolved";
          const evidence = entry.evidenceNodeIds
            .map((id) => nodesById.get(id))
            .filter((node): node is Evidence => node?.type === "evidence");
          const provenance = provenanceLine(
            entry,
            corrects,
            sharedAuthor === null,
            sharedNoticed === null,
          );

          return (
            <li
              key={entry.id}
              id={`ledger-${domId(entry.id)}`}
              data-status={entry.status}
              className="grid grid-cols-[1.25rem_1fr] gap-x-3"
            >
              <Thread
                above={index === 0 ? "none" : "solid"}
                below={isLast ? tail : "solid"}
                status={entry.status}
                capped={isLast && resolved}
              />
              <div className={isLast && tail === "none" ? "pb-1" : "pb-5"}>
                <p className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                  <span
                    className={`font-serif text-[17px] italic leading-snug ${STATUS_TEXT[entry.status]}`}
                  >
                    {STATUS_LABEL[entry.status]}
                  </span>
                  <time
                    dateTime={entry.date}
                    className="text-[11.5px] tabular-nums tracking-wide text-muted dark:text-stone-400"
                  >
                    {formatDay(entry.date)}
                  </time>
                </p>
                <p
                  className={`mt-1 font-serif text-[15.5px] leading-[1.55] ${
                    resolved
                      ? "text-stone-600 dark:text-stone-400"
                      : "text-stone-800 dark:text-stone-200"
                  }`}
                >
                  {entry.note}
                </p>
                {resolved && (
                  <p className="mt-1 text-xs text-muted dark:text-stone-400">
                    Its stated condition was met.
                  </p>
                )}
                {entry.status === "unresolvable" && entry.resolutionKind && (
                  <p className="mt-1 text-xs text-muted dark:text-stone-400">
                    {UNRESOLVABLE_REASON[entry.resolutionKind]}
                  </p>
                )}
                {evidence.length > 0 && (
                  <ul className="mt-0.5" aria-label="Evidence behind this entry">
                    {evidence.map((node) => (
                      <EvidenceCitation key={node.id} node={node} entryId={entry.id} />
                    ))}
                  </ul>
                )}
                {provenance && (
                  <p className="mt-1.5 text-[11.5px] leading-relaxed text-muted dark:text-stone-400">
                    {provenance}
                  </p>
                )}
              </div>
            </li>
          );
        })}
        {tail !== "none" && (
          <li className="grid grid-cols-[1.25rem_1fr] gap-x-3" data-testid="crux-movement-tail">
            <Thread above={tail} below={tail === "double" ? "double-fade" : "none"} />
            <p
              className={
                tail === "double"
                  ? "pb-1 font-serif text-[16px] italic leading-snug text-[#8B5A3C] dark:text-[#cfa88a]"
                  : "pb-1 font-serif text-[14.5px] italic leading-snug text-muted dark:text-stone-400"
              }
            >
              {tail === "double" && !standingLineShown
                ? STANDING_DISAGREEMENT_LINE
                : `No recorded movement since ${formatDay(latest.date)}.`}
            </p>
          </li>
        )}
      </ol>
      {footer.length > 0 && (
        <p className="mt-3 pl-8 text-[11.5px] leading-relaxed text-muted dark:text-stone-400">
          {footer.join(". ")}.
        </p>
      )}
    </section>
  );
}

/** The left rail of one ledger row: a segment above the mark, the mark, a segment below. */
function Thread({
  above,
  below,
  status,
  capped = false,
}: {
  above: Segment;
  below: Segment | "double-fade";
  status?: CruxLedgerStatus;
  capped?: boolean;
}) {
  // Mark center sits on the first line of the status label (17px serif).
  return (
    <div aria-hidden="true" className="relative flex justify-center">
      <SegmentLine kind={above} className="top-0 h-[0.6rem]" />
      {status ? (
        <span className="relative z-10 mt-[0.3rem] flex h-3 items-center">
          <StatusMark status={status} />
        </span>
      ) : (
        <span className="mt-[0.6rem] block h-0" />
      )}
      {capped && (
        <span
          className={`absolute left-1/2 top-[1.2rem] w-3 -translate-x-1/2 border-t-[1.5px] border-stone-400 dark:border-stone-500`}
        />
      )}
      <SegmentLine
        kind={below}
        className={status ? "bottom-0 top-[1.05rem]" : "bottom-0 top-[0.6rem]"}
      />
    </div>
  );
}

function SegmentLine({ kind, className }: { kind: Segment | "double-fade"; className: string }) {
  if (kind === "none") return null;
  const base = `absolute left-1/2 -translate-x-1/2 ${className}`;
  if (kind === "double" || kind === "double-fade") {
    return (
      <span
        className={`${base} w-[5px] border-x border-[#8B5A3C]/55 dark:border-[#cfa88a]/55 ${
          kind === "double-fade" ? "[mask-image:linear-gradient(to_bottom,black,transparent)]" : ""
        }`}
      />
    );
  }
  return <span className={`${base} w-0 border-l ${kind === "dashed" ? "border-dashed" : ""} ${THREAD}`} />;
}

function EvidenceCitation({ node, entryId }: { node: Evidence; entryId: string }) {
  const year = node.source.publishedAt?.slice(0, 4);
  return (
    <li id={`ledger-${domId(entryId)}--${domId(node.id)}`}>
      <details className="group/cite">
        <summary className="-mx-1 inline-flex min-h-11 cursor-pointer list-none items-baseline gap-1.5 rounded px-1 py-3 text-[12.5px] leading-snug text-[#3a6965] hover:text-[#2d524f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep dark:text-[#8fc0bb] dark:hover:text-[#b5dad6] dark:focus-visible:ring-[#6fa39e] [&::-webkit-details-marker]:hidden">
          <span
            aria-hidden="true"
            className="inline-block translate-y-px text-[11px] transition-transform group-open/cite:rotate-90 motion-reduce:transition-none"
          >
            ›
          </span>
          <span className="font-medium underline decoration-[#3a6965]/30 underline-offset-2 dark:decoration-[#8fc0bb]/30">
            {node.source.title}
          </span>
          {year && <span className="tabular-nums text-muted dark:text-stone-400">{year}</span>}
        </summary>
        <div className="mb-1.5 ml-[0.2rem] mt-0.5 border-l border-stone-200 pl-3 dark:border-stone-700">
          <p className="text-[13px] leading-relaxed text-stone-700 dark:text-stone-300">
            {node.finding}
          </p>
          {node.source.url && (
            <a
              href={node.source.url}
              rel="noopener noreferrer"
              target="_blank"
              className="mt-1 inline-flex min-h-11 items-center text-xs font-medium text-stone-700 link-underline dark:text-stone-300"
            >
              Read the source<span aria-hidden="true">&nbsp;↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </div>
      </details>
    </li>
  );
}

// ---------------------------------------------------------------------------

function authorLine(entry: CruxMovementEntry["entry"]): string {
  return entry.author.kind === "editorial"
    ? `Recorded by ${entry.author.curator}`
    : `Proposed by a model, reviewed by ${entry.author.reviewedBy ?? "no one yet"}`;
}

function provenanceLine(
  entry: CruxMovementEntry["entry"],
  corrects: string[],
  includeAuthor: boolean,
  includeNoticed = true,
): string | null {
  const parts: string[] = [];
  if (includeNoticed && entry.noticedAt && entry.noticedAt !== entry.date) {
    parts.push(`Added to the map ${formatDay(entry.noticedAt)}`);
  }
  if (includeAuthor) parts.push(authorLine(entry));
  if (corrects.length > 0) {
    parts.push(`Corrects the entry of ${corrects.map(formatDay).join(", ")}`);
  }
  return parts.length > 0 ? `${parts.join(". ")}.` : null;
}

function domId(value: string): string {
  return value.replace(/[^A-Za-z0-9_-]/g, "-");
}

function parseDay(value: string): Date {
  return new Date(`${value.slice(0, 10)}T00:00:00Z`);
}

const DAY_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const MONTH_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

function formatDay(value: string): string {
  const parsed = parseDay(value);
  return Number.isNaN(parsed.getTime()) ? value : DAY_FORMAT.format(parsed);
}

function formatMonth(value: string): string {
  const parsed = parseDay(value);
  return Number.isNaN(parsed.getTime()) ? value : MONTH_FORMAT.format(parsed);
}

/**
 * What's arrived since: ledger entries whose source is dated inside the
 * reader's window, grouped by the crux they bear on, each with the evidence
 * that moved it (finding, source, how far the source was checked).
 */
import Link from "next/link";
import type { Evidence } from "@/types/argument";
import type { CruxLedgerEntry } from "@/types/cruxLedger";
import type { ArrivedGroup } from "@/lib/argument/ledgerPool";
import {
  STATUS_TEXT,
  STATUS_WORD,
  VERIFICATION_LINE,
  domId,
  formatDay,
  formatSourceDate,
} from "./format";
import { cruxQuestion, type IndexedMap } from "./types";

/**
 * Which (entry, evidence) pairs print the evidence in full: the first time a
 * source appears in the section. Later citations of the same source name it
 * and point back, so one paper cited by two cruxes is not read twice.
 */
export function firstCitations(groups: readonly ArrivedGroup[]): Set<string> {
  const seen = new Set<string>();
  const first = new Set<string>();
  for (const group of groups) {
    for (const entry of group.entries) {
      for (const evidenceId of entry.evidenceNodeIds) {
        const key = `${group.topicId}|${evidenceId}`;
        if (seen.has(key)) continue;
        seen.add(key);
        first.add(`${entry.id}|${evidenceId}`);
      }
    }
  }
  return first;
}

export interface ArrivedDisplay {
  /** Pairs from `firstCitations`. */
  fullCitations: Set<string>;
  /** When every entry shares one recorded day, the intro says it once. */
  sharedNoticedDay: string | null;
}

export function ArrivedGroupView({
  group,
  map,
  display,
}: {
  group: ArrivedGroup;
  map: IndexedMap;
  display: ArrivedDisplay;
}) {
  const headingId = `arrived-${domId(group.topicId)}-${domId(group.claimId)}`;
  return (
    <li aria-labelledby={headingId} className="py-7 first:pt-2">
      <p className="text-[12.5px] text-muted dark:text-stone-400">
        <Link
          href={`/topics/${group.topicId}#cruxes`}
          className="font-medium text-stone-800 underline decoration-stone-400/60 underline-offset-[3px] hover:decoration-stone-700 dark:text-stone-200 dark:decoration-stone-500"
        >
          {map.label}
        </Link>
      </p>
      <h3
        id={headingId}
        className="mt-1 text-balance font-serif text-[1.25rem] leading-snug text-stone-900 dark:text-stone-50"
      >
        {cruxQuestion(map, group.claimId)}
      </h3>
      <ol className="mt-4 space-y-6">
        {group.entries.map((entry) => (
          <ArrivedEntry key={entry.id} entry={entry} map={map} display={display} />
        ))}
      </ol>
    </li>
  );
}

function ArrivedEntry({
  entry,
  map,
  display,
}: {
  entry: CruxLedgerEntry;
  map: IndexedMap;
  display: ArrivedDisplay;
}) {
  const evidence = entry.evidenceNodeIds
    .map((id) => map.nodesById.get(id))
    .filter((node): node is Evidence => node?.type === "evidence");

  return (
    <li className="sm:grid sm:grid-cols-[7.5rem_1fr] sm:gap-x-6">
      <div className="mb-1.5 flex flex-wrap items-baseline gap-x-3 text-[12px] leading-snug sm:mb-0 sm:block sm:pt-[3px]">
        <time dateTime={entry.date} className="block tabular-nums text-stone-700 dark:text-stone-300">
          {formatDay(entry.date)}
        </time>
        <span className={`block font-serif text-[15px] italic sm:mt-0.5 ${STATUS_TEXT[entry.status]}`}>
          {STATUS_WORD[entry.status]}
        </span>
        {entry.noticedAt && entry.noticedAt !== entry.date && display.sharedNoticedDay === null && (
          <span className="block text-[11.5px] text-muted dark:text-stone-400 sm:mt-1">
            added {formatDay(entry.noticedAt)}
          </span>
        )}
      </div>
      <div className="min-w-0">
        <p className="font-serif text-[1.0625rem] leading-[1.6] text-stone-800 dark:text-stone-200">
          {entry.note}
        </p>
        {evidence.length > 0 ? (
          <ul className="mt-3 space-y-3" aria-label="Evidence behind this entry">
            {evidence.map((node) => (
              <EvidenceItem
                key={node.id}
                node={node}
                full={display.fullCitations.has(`${entry.id}|${node.id}`)}
              />
            ))}
          </ul>
        ) : (
          <SourceNote entry={entry} />
        )}
      </div>
    </li>
  );
}

function EvidenceItem({ node, full }: { node: Evidence; full: boolean }) {
  const { source } = node;
  const published = formatSourceDate(source.publishedAt);
  const byline = [source.institution ?? source.author, published].filter(Boolean).join(", ");
  return (
    <li className="border-l-2 border-[#3a6965]/70 pl-3.5 dark:border-[#8fc0bb]/60">
      {full && (
        <p className="mb-1.5 text-[13.5px] leading-relaxed text-stone-700 dark:text-stone-300">
          {node.finding}
        </p>
      )}
      <p className="text-[12.5px] leading-snug">
        {!full && <span className="text-muted dark:text-stone-400">Also cited above: </span>}
        {source.url ? (
          <a
            href={source.url}
            rel="noopener noreferrer"
            target="_blank"
            className="font-medium text-[#3a6965] underline decoration-[#3a6965]/35 underline-offset-2 hover:decoration-[#3a6965] dark:text-[#8fc0bb] dark:decoration-[#8fc0bb]/35"
          >
            {source.title}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ) : (
          <span className="font-medium text-[#3a6965] dark:text-[#8fc0bb]">{source.title}</span>
        )}
        {byline && <span className="text-muted dark:text-stone-400">. {byline}</span>}
      </p>
      {full && (
        <p className="mt-0.5 text-[11.5px] text-muted dark:text-stone-400">
          {VERIFICATION_LINE[source.verification]}
          {source.verifiedAt ? `, ${formatDay(source.verifiedAt)}` : ""}.
        </p>
      )}
    </li>
  );
}

/** An editorial entry with no evidence node: show the editors' source record. */
function SourceNote({ entry }: { entry: CruxLedgerEntry }) {
  if (entry.author.kind !== "editorial") return null;
  return (
    <details className="group/source mt-2.5">
      <summary className="inline-flex min-h-8 cursor-pointer list-none items-center gap-1.5 rounded text-[12.5px] font-medium text-stone-700 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep dark:text-stone-300 dark:hover:text-stone-100 [&::-webkit-details-marker]:hidden">
        <span
          aria-hidden="true"
          className="inline-block text-[11px] transition-transform group-open/source:rotate-90 motion-reduce:transition-none"
        >
          ›
        </span>
        The editors&rsquo; source record
      </summary>
      <p className="mt-1.5 border-l-2 border-stone-300 pl-3.5 text-[13px] leading-relaxed text-stone-600 [overflow-wrap:anywhere] dark:border-stone-600 dark:text-stone-400">
        {entry.author.basis}
      </p>
    </details>
  );
}

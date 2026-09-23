/**
 * What's arrived since: ledger entries whose source is dated inside the
 * reader's window, grouped by the crux they bear on. Each entry shows its
 * date, status, and note; the evidence that moved it (finding, source, how
 * far the source was checked) waits behind a native disclosure, so the
 * section reads as a list of what changed and stays zero-JS.
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

export function ArrivedGroupView({
  group,
  map,
  showNoticed,
}: {
  group: ArrivedGroup;
  map: IndexedMap;
  /** False when the section intro already names the one day every entry was added. */
  showNoticed: boolean;
}) {
  const headingId = `arrived-${domId(group.topicId)}-${domId(group.claimId)}`;
  return (
    <li aria-labelledby={headingId} className="py-6 first:pt-2">
      <p className="text-[12.5px] leading-snug text-muted dark:text-stone-400">
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
      <ol className="mt-3 space-y-5">
        {group.entries.map((entry) => (
          <ArrivedEntry key={entry.id} entry={entry} map={map} showNoticed={showNoticed} />
        ))}
      </ol>
    </li>
  );
}

function ArrivedEntry({
  entry,
  map,
  showNoticed,
}: {
  entry: CruxLedgerEntry;
  map: IndexedMap;
  showNoticed: boolean;
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
        {showNoticed && entry.noticedAt && entry.noticedAt !== entry.date && (
          <span className="block text-[11.5px] text-muted dark:text-stone-400 sm:mt-1">
            added {formatDay(entry.noticedAt)}
          </span>
        )}
      </div>
      <div className="min-w-0">
        <p className="font-serif text-[1rem] leading-[1.55] text-stone-800 dark:text-stone-200 sm:text-[1.0625rem] sm:leading-[1.6]">
          {entry.note}
        </p>
        {evidence.length > 0 ? (
          <Sources label={
              evidence.length === 1
                ? "The source and what it found"
                : `The ${evidence.length} sources and what they found`
            }>
            <ul className="space-y-3" aria-label="Evidence behind this entry">
              {evidence.map((node) => (
                <EvidenceItem key={node.id} node={node} />
              ))}
            </ul>
          </Sources>
        ) : (
          entry.author.kind === "editorial" && (
            <Sources label="The editors’ source record">
              <p className="border-l-2 border-stone-300 pl-3.5 text-[13px] leading-relaxed text-stone-600 [overflow-wrap:anywhere] dark:border-stone-600 dark:text-stone-400">
                {entry.author.basis}
              </p>
            </Sources>
          )
        )}
      </div>
    </li>
  );
}

function EvidenceItem({ node }: { node: Evidence }) {
  const { source } = node;
  const published = formatSourceDate(source.publishedAt);
  const byline = [source.institution ?? source.author, published].filter(Boolean).join(", ");
  return (
    <li className="border-l-2 border-[#3a6965]/70 pl-3.5 dark:border-[#8fc0bb]/60">
      <p className="mb-1.5 text-[13.5px] leading-relaxed text-stone-700 dark:text-stone-300">
        {node.finding}
      </p>
      <p className="text-[12.5px] leading-snug">
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
      <p className="mt-0.5 text-[11.5px] leading-snug text-muted dark:text-stone-400">
        {VERIFICATION_LINE[source.verification]}
        {source.verifiedAt ? `, ${formatDay(source.verifiedAt)}` : ""}.
      </p>
    </li>
  );
}

/** A closed-by-default disclosure for what stands behind an entry. */
function Sources({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <details className="group/source -mb-2 mt-0.5">
      <summary className="-ml-1 inline-flex min-h-11 cursor-pointer list-none items-center gap-1.5 rounded px-1 text-[12.5px] font-medium text-stone-700 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep dark:text-stone-300 dark:hover:text-stone-100 dark:focus-visible:ring-[#6fa39e] [&::-webkit-details-marker]:hidden">
        <span
          aria-hidden="true"
          className="inline-block text-[11px] transition-transform group-open/source:rotate-90 motion-reduce:transition-none"
        >
          ›
        </span>
        {label}
      </summary>
      <div className="mb-1 mt-1">{children}</div>
    </details>
  );
}

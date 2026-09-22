import { ExternalLink } from "lucide-react";
import type { MapReplyEvidenceItem } from "@/lib/mapReply/types";
import { Meter } from "./meters";
import { ResultSection } from "./ResultSection";

/**
 * The strongest weighted evidence in the section the thread argued in.
 *
 * Each card carries its own side label rather than the pair being presented
 * as "for and against": where a section's evidence all points one way, the
 * two strongest items are still shown, and mislabelling the weaker one as the
 * opposing case would be the one lie in an otherwise number-backed reply.
 */

const MAX_SCORE = 40;

const SIDE_LABEL: Record<MapReplyEvidenceItem["side"], string> = {
  for: "For the map's claim",
  against: "Against the map's claim",
};

const SIDE_CHIP: Record<MapReplyEvidenceItem["side"], string> = {
  for: "border-rust-500/40 text-rust-700 dark:border-rust-400/40 dark:text-rust-400",
  against: "border-skeptic/40 text-skeptic dark:border-skeptic-light/40 dark:text-skeptic-light",
};

function EvidenceCard({ item }: { item: MapReplyEvidenceItem }) {
  return (
    <li className="surface-card flex flex-col p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-1 font-sans text-xs ${
            SIDE_CHIP[item.side]
          }`}
        >
          {SIDE_LABEL[item.side]}
        </span>
        <span className="font-sans text-sm tabular-nums text-[var(--text-secondary)]">
          {item.score} / {MAX_SCORE}
        </span>
      </div>

      <div className="mt-3">
        <Meter value={item.score / MAX_SCORE} tone={item.side === "for" ? "rust" : "brown"} />
      </div>

      <h4 className="mt-4 font-serif text-lg leading-snug text-[var(--text-heading)]">
        {item.title}
      </h4>
      <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
        {item.description}
      </p>

      {item.source ? (
        <p className="mt-4 font-sans text-xs text-[var(--text-muted)]">{item.source}</p>
      ) : null}
      {item.sourceUrl ? (
        <a
          href={item.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex min-h-11 items-center gap-1.5 font-sans text-sm text-deep underline underline-offset-2 hover:text-deep-dark dark:text-deep-light dark:hover:text-stone-200"
        >
          Open the source
          <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
        </a>
      ) : null}
    </li>
  );
}

export function EvidenceCards({
  evidence,
  sectionTitle,
}: {
  evidence: MapReplyEvidenceItem[];
  sectionTitle: string | null;
}) {
  if (evidence.length === 0) return null;

  return (
    <ResultSection
      title="Strongest evidence"
      aside={sectionTitle ? `in ${sectionTitle}` : undefined}
    >
      <p className="max-w-prose text-sm text-[var(--text-secondary)]">
        Weighted on source reliability, independence, replicability and directness, out of{" "}
        {MAX_SCORE}.
      </p>
      <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {evidence.map((item) => (
          <EvidenceCard key={item.id} item={item} />
        ))}
      </ul>
    </ResultSection>
  );
}

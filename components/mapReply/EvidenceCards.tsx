import { ExternalLink } from "lucide-react";
import type { MapReplyEvidenceItem } from "@/lib/mapReply/types";
import { Meter } from "./meters";
import { ResultSection } from "./ResultSection";

/**
 * The strongest weighted evidence in the section the thread argued in.
 *
 * Each item carries its own side label rather than the pair being presented
 * as "for and against": where a section's evidence all points one way, the
 * two strongest items are still shown, and mislabelling the weaker one as the
 * opposing case would be the one lie in an otherwise number-backed reply.
 */

const MAX_SCORE = 40;

const SIDE_LABEL: Record<MapReplyEvidenceItem["side"], string> = {
  for: "For the map's claim",
  against: "Against the map's claim",
};

const SIDE_TEXT: Record<MapReplyEvidenceItem["side"], string> = {
  for: "text-rust-700 dark:text-rust-500",
  against: "text-skeptic dark:text-skeptic-light",
};

function EvidenceItem({ item }: { item: MapReplyEvidenceItem }) {
  return (
    <li className="flex flex-col border-t-2 border-[var(--border-divider)] pt-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2 font-sans text-sm">
        <span className={`font-medium ${SIDE_TEXT[item.side]}`}>{SIDE_LABEL[item.side]}</span>
        <span className="tabular-nums text-[var(--text-secondary)]">
          {item.score} / {MAX_SCORE}
        </span>
      </div>

      <Meter
        className="mt-2"
        value={item.score / MAX_SCORE}
        tone={item.side === "for" ? "rust" : "brown"}
      />

      <h4 className="mt-4 font-serif text-[1.25rem] leading-snug text-[var(--text-heading)]">
        {item.title}
      </h4>
      <p className="mt-2 font-sans text-[0.9375rem] leading-relaxed text-[var(--text-secondary)]">
        {item.description}
      </p>

      {item.source ? (
        <p className="mt-3 font-serif text-base italic text-[var(--text-muted)]">{item.source}</p>
      ) : null}
      {item.sourceUrl ? (
        <a
          href={item.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-flex min-h-11 items-center gap-1.5 self-start font-sans text-sm text-deep underline underline-offset-2 hover:text-deep-dark dark:text-deep-light dark:hover:text-stone-200"
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
      <p className="max-w-[36rem] font-sans text-[0.9375rem] text-[var(--text-secondary)]">
        Weighted on source reliability, independence, replicability and directness, out of{" "}
        {MAX_SCORE}.
      </p>
      <ul className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
        {evidence.map((item) => (
          <EvidenceItem key={item.id} item={item} />
        ))}
      </ul>
    </ResultSection>
  );
}

import { ExternalLink } from "lucide-react";
import { textActionClasses } from "@/components/ui";
import type { MapReplyEvidenceItem } from "@/lib/mapReply/types";
import { ResultSection } from "./ResultSection";

/**
 * The strongest weighted evidence in the section the thread argued in.
 *
 * Each item carries its own side label rather than the pair being presented
 * as "for and against": where a section's evidence all points one way, the
 * two strongest items are still shown, and mislabelling the weaker one as the
 * opposing case would be the one lie in an otherwise number-backed reply.
 *
 * No weight is shown on the card. "34 / 40" beside "28 / 40" read as one
 * side ahead on points; the weights are listed under "How this was read"
 * (`EvidenceWeights`), where they explain why these two cards were chosen.
 */

const MAX_SCORE = 40;

const SIDE_LABEL: Record<MapReplyEvidenceItem["side"], string> = {
  for: "Supports the map's claim",
  against: "Cuts against the map's claim",
};

const SIDE_TEXT: Record<MapReplyEvidenceItem["side"], string> = {
  for: "text-rust-700 dark:text-rust-500",
  against: "text-skeptic dark:text-skeptic-light",
};

function EvidenceItem({ item }: { item: MapReplyEvidenceItem }) {
  return (
    <li className="flex flex-col border-t-2 border-[var(--border-divider)] pt-4">
      <p className={`font-sans text-sm font-medium ${SIDE_TEXT[item.side]}`}>{SIDE_LABEL[item.side]}</p>

      <h4 className="mt-2 font-serif text-[1.25rem] leading-snug text-[var(--text-heading)]">
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
          className={textActionClasses("mt-1 gap-1.5 self-start")}
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

  // Supporting card first, then the challenge: a fixed order, not a ranking.
  const ordered = [...evidence].sort((a, b) => (a.side === b.side ? 0 : a.side === "for" ? -1 : 1));

  return (
    <ResultSection
      title="Strongest evidence"
      aside={sectionTitle ? `in ${sectionTitle}` : undefined}
    >
      <ul className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
        {ordered.map((item) => (
          <EvidenceItem key={item.id} item={item} />
        ))}
      </ul>
    </ResultSection>
  );
}

/** Why these cards: their weights, for "How this was read". */
export function EvidenceWeights({ evidence }: { evidence: MapReplyEvidenceItem[] }) {
  if (evidence.length === 0) return null;
  return (
    <div className="space-y-1.5">
      <p>
        The cards are the section&rsquo;s heaviest on each side, weighted on source reliability,
        independence, replicability and directness, out of {MAX_SCORE}. A weight says how much a
        card can bear, not which side is right.
      </p>
      <ul className="list-disc space-y-1 pl-5">
        {evidence.map((item) => (
          <li key={item.id}>
            {item.title}: {item.score} of {MAX_SCORE}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * The key to the diagram's evidence marks: ＋ before a card that points to
 * yes (or supports the claim), − before one that points to no. The labels are
 * the page's own (lib/mapNaming.ts evidenceLabels), so the key says what the
 * map page's evidence headings say.
 *
 * The marks themselves are aria-hidden on every card (each card's accessible
 * name carries its side label instead), so the key names them in words too.
 */
const MARKS = [
  { side: "for", glyph: "＋", name: "Plus", className: "text-rust-700 dark:text-rust-400" },
  { side: "against", glyph: "−", name: "Minus", className: "text-skeptic dark:text-[#cfa88a]" },
] as const;

export function EvidenceKey({
  labels,
  className = "",
}: {
  labels: Record<"for" | "against", string>;
  className?: string;
}) {
  return (
    <dl
      aria-label="Evidence marks"
      data-evidence-key=""
      className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-xs leading-snug text-secondary dark:text-stone-400 ${className}`}
    >
      {MARKS.map((mark) => (
        <div key={mark.side} className="flex items-center gap-1.5">
          <dt className={`inline-flex w-4 justify-center font-sans text-[13px] font-semibold ${mark.className}`}>
            <span aria-hidden="true">{mark.glyph}</span>
            <span className="sr-only">{mark.name}</span>
          </dt>
          <dd>{labels[mark.side]}</dd>
        </div>
      ))}
    </dl>
  );
}

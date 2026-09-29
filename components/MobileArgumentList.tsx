"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useIsHydrated } from "@/hooks/useMediaQuery";
import { TextAction } from "@/components/ui";
import { INLINE_SUMMARY, SOURCE_LINK, SettleAnswer } from "@/components/topic/cruxPrimitives";
import { cruxSheetHeading } from "@/lib/topicPage/model";
import type {
  DiagramCruxNode,
  DiagramEvidenceNode,
  DiagramModel,
  DiagramSideNode,
} from "@/lib/diagram/model";

/**
 * The phone view of the diagram route (/topics/[id]/map): the same tree as
 * the desktop canvas, as an outline. Same model, same order, same words:
 *
 *   the question → the cruxes it turns on → each side → its evidence.
 *
 * Server-rendered with the route, so a phone never waits on a blank area.
 * The crux toggles stay disabled until the page hydrates, so an early tap is
 * never silently lost.
 */

const SIDE_STYLE = {
  supporters: {
    rule: "border-l-rust-500 dark:border-l-rust-400",
    label: "!text-rust-700 dark:!text-rust-400",
  },
  skeptics: {
    rule: "border-l-skeptic dark:border-l-[#cfa88a]",
    label: "!text-skeptic dark:!text-[#cfa88a]",
  },
} as const;

const EVIDENCE_GLYPH = {
  for: { glyph: "＋", className: "text-rust-700 dark:text-rust-400" },
  against: { glyph: "−", className: "text-skeptic dark:text-[#cfa88a]" },
} as const;

function EvidenceRow({ item }: { item: DiagramEvidenceNode }) {
  const mark = EVIDENCE_GLYPH[item.side];
  return (
    <li>
      <details className="group/ev">
        <summary className={INLINE_SUMMARY}>
          <span className="font-serif text-[1rem] font-normal leading-snug text-stone-800 dark:text-stone-200">
            <span aria-hidden="true" className={`mr-1 font-sans text-[13px] ${mark.className}`}>
              {mark.glyph}
            </span>
            {item.label}
          </span>
          <span
            aria-hidden="true"
            className="shrink-0 text-base transition-transform group-open/ev:rotate-90 motion-reduce:transition-none"
          >
            ›
          </span>
        </summary>
        <div className="pb-2 pl-4 text-sm leading-relaxed text-secondary dark:text-stone-400">
          <p>{item.description}</p>
          {item.source &&
            (item.sourceUrl ? (
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open source from ${item.source} (opens in a new tab)`}
                className={`${SOURCE_LINK} text-xs`}
              >
                {item.source} ↗
              </a>
            ) : (
              <span className="inline-flex min-h-11 items-center text-xs">{item.source}</span>
            ))}
        </div>
      </details>
    </li>
  );
}

function SideBlock({ side, evidence }: { side: DiagramSideNode; evidence: DiagramEvidenceNode[] }) {
  const style = SIDE_STYLE[side.side];
  return (
    <div className={`border-l-[3px] pl-3 ${style.rule}`}>
      <p className={`label-caps !text-[0.9375rem] ${style.label}`}>{side.heading}</p>
      <p className="mt-0.5 font-serif text-[1.0625rem] leading-[1.5] text-stone-800 dark:text-stone-200">
        {side.label}
      </p>
      {side.text.trim() !== side.label.trim() && (
        <details className="group/case">
          <summary className={INLINE_SUMMARY}>
            <span>Read the full case</span>
            <span
              aria-hidden="true"
              className="shrink-0 text-base transition-transform group-open/case:rotate-90 motion-reduce:transition-none"
            >
              ›
            </span>
          </summary>
          <p className="pb-2 font-serif text-[1rem] leading-[1.6] text-secondary dark:text-stone-400">
            {side.text}
          </p>
        </details>
      )}
      {evidence.length > 0 && <ul className="mt-1">{evidence.map((item) => <EvidenceRow key={item.id} item={item} />)}</ul>}
    </div>
  );
}

function CruxSection({
  crux,
  sides,
  evidenceOf,
  hydrated,
}: {
  crux: DiagramCruxNode;
  sides: DiagramSideNode[];
  evidenceOf: (sideId: string) => DiagramEvidenceNode[];
  hydrated: boolean;
}) {
  const [open, setOpen] = useState(false);
  const panelId = `outline-${crux.id}`;
  return (
    <li className="overflow-hidden rounded-lg border border-l-[3px] border-stone-200/80 border-l-crux bg-[#fefcf9] dark:border-[var(--border-default)] dark:border-l-crux-light dark:bg-[var(--bg-card)]">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        disabled={!hydrated}
        className="flex min-h-11 w-full items-start gap-3 px-4 py-3.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-focus"
      >
        <span aria-hidden="true" className="font-serif text-[1.375rem] leading-[1.6rem] text-crux-text">
          {crux.number}
        </span>
        <span className="min-w-0 flex-1">
          {crux.kicker && (
            <span className="block text-[12.5px] leading-snug text-muted dark:text-stone-400">{crux.kicker}</span>
          )}
          <span className="mt-0.5 block text-pretty font-serif text-[1.125rem] font-medium leading-[1.35] text-stone-900 dark:text-stone-100">
            {crux.label}
          </span>
        </span>
        <ChevronDown
          aria-hidden="true"
          className={`mt-1 h-4 w-4 shrink-0 text-muted transition-transform motion-reduce:transition-none dark:text-stone-400 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div id={panelId} className="space-y-4 px-4 pb-4">
          <div className="-mt-1">
            <SettleAnswer
              mode={crux.settle.mode}
              kind={crux.settle.kind}
              condition={crux.settle.condition}
              resolved={crux.settle.resolved}
              label={crux.settle.label}
            />
          </div>
          {sides.map((side) => (
            <SideBlock key={side.id} side={side} evidence={evidenceOf(side.id)} />
          ))}
          <TextAction href={crux.pageHref} className="inline-flex min-h-11 items-center text-sm">
            Open this crux on the map page →
          </TextAction>
        </div>
      )}
    </li>
  );
}

export function MobileArgumentList({ diagram }: { diagram: DiagramModel }) {
  const hydrated = useIsHydrated();
  const question = diagram.nodes.find((node) => node.kind === "question");
  const cruxes = diagram.nodes.filter((node): node is DiagramCruxNode => node.kind === "crux");
  const sidesOf = (cruxId: string) =>
    diagram.nodes.filter(
      (node): node is DiagramSideNode => node.kind === "side" && node.parentId === cruxId,
    );
  const evidenceOf = (sideId: string) =>
    diagram.nodes.filter(
      (node): node is DiagramEvidenceNode => node.kind === "evidence" && node.parentId === sideId,
    );

  return (
    <div className="bg-[var(--bg-surface)]">
      <div className="mx-auto max-w-lg space-y-5 px-4 py-5">
        {question && (
          <div>
            <p className="label-caps !text-[0.9375rem] !text-deep dark:!text-accent-text">The question</p>
            <h2 className="mt-1 text-balance font-serif text-[1.375rem] font-medium leading-snug text-stone-900 dark:text-stone-100">
              {question.label}
            </h2>
            {question.claim && (
              <p className="mt-1.5 text-sm leading-relaxed text-secondary dark:text-stone-400">
                <em className="font-medium not-italic text-stone-800 dark:text-stone-200">{question.claim.lead}:</em>{" "}
                {question.claim.text}
              </p>
            )}
          </div>
        )}

        {cruxes.length > 0 && (
          <section aria-labelledby="outline-cruxes" className="space-y-3">
            <h3 id="outline-cruxes" className="label-caps">
              {cruxSheetHeading(cruxes.length)}
            </h3>
            <ol className="space-y-3">
              {cruxes.map((crux) => (
                <CruxSection
                  key={crux.id}
                  crux={crux}
                  sides={sidesOf(crux.id)}
                  evidenceOf={evidenceOf}
                  hydrated={hydrated}
                />
              ))}
            </ol>
          </section>
        )}
      </div>
    </div>
  );
}

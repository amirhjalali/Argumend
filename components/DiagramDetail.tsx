"use client";

import type { ReactNode } from "react";
import { X } from "lucide-react";
import { useModalAccessibility } from "@/hooks/useModalAccessibility";
import { TextAction } from "@/components/ui";
import { DetailBlock, RunIn, SettleAnswer, SOURCE_LINK } from "@/components/topic/cruxPrimitives";
import type { DiagramCruxNode, DiagramModel, DiagramNode } from "@/lib/diagram/model";

/**
 * The full text behind one box of the diagram, in a side sheet over the
 * canvas. Everything here is what the map page shows for the same thing, in
 * its words and with its labels; the sheet only gathers it in one place.
 *
 * Modal: focus moves in, stays in, Escape or the backdrop closes it, and focus
 * returns to the box that opened it (hooks/useModalAccessibility).
 */

/** Width of the sheet in px; the canvas slides a box out from under it. */
export const DETAIL_PANEL_WIDTH = 416;

/** The page's evidence labels (components/ReadModeView.tsx). */
const EVIDENCE_SIDE = {
  for: { label: "Supports the claim", glyph: "＋", className: "!text-rust-700 dark:!text-rust-400" },
  against: { label: "Challenges the claim", glyph: "−", className: "!text-skeptic dark:!text-[#cfa88a]" },
} as const;

const SIDE_LABEL = {
  supporters: "!text-rust-700 dark:!text-rust-400",
  skeptics: "!text-skeptic dark:!text-[#cfa88a]",
} as const;

const TITLE_ID = "diagram-detail-title";

function findNode<K extends DiagramNode["kind"]>(
  model: DiagramModel,
  id: string | undefined,
  kind: K,
): Extract<DiagramNode, { kind: K }> | undefined {
  const node = model.nodes.find((n) => n.id === id);
  return node?.kind === kind ? (node as Extract<DiagramNode, { kind: K }>) : undefined;
}

/** The crux a box sits under, for the context line and the page link. */
function cruxOf(model: DiagramModel, node: DiagramNode): DiagramCruxNode | undefined {
  if (node.kind === "crux") return node;
  if (node.kind === "side") return findNode(model, node.parentId, "crux");
  if (node.kind === "evidence") {
    const side = findNode(model, node.parentId, "side");
    return side ? findNode(model, side.parentId, "crux") : undefined;
  }
  return undefined;
}

function Header({ node, model }: { node: DiagramNode; model: DiagramModel }) {
  const crux = cruxOf(model, node);
  let label: ReactNode;
  let title: string;
  switch (node.kind) {
    case "question":
      label = <span className="!text-deep dark:!text-accent-text">The question</span>;
      title = node.label;
      break;
    case "crux":
      label = (
        <span className="!text-crux-text">
          Crux {node.number}
          {node.kicker ? ` · ${node.kicker}` : ""}
        </span>
      );
      title = node.label;
      break;
    case "side":
      label = <span className={SIDE_LABEL[node.side]}>{node.heading}</span>;
      title = node.lead;
      break;
    case "evidence": {
      const side = EVIDENCE_SIDE[node.side];
      label = (
        <span className={side.className}>
          <span aria-hidden="true">{side.glyph} </span>
          {side.label}
        </span>
      );
      title = node.label;
      break;
    }
  }
  return (
    <div className="min-w-0 flex-1">
      <p className="label-caps !text-[0.9375rem]">{label}</p>
      <h2
        id={TITLE_ID}
        className="mt-1 text-pretty font-serif text-[1.3125rem] font-medium leading-[1.3] text-stone-900 dark:text-stone-100"
      >
        {title}
      </h2>
      {crux && node.kind !== "crux" && (
        <p className="mt-1.5 text-[12.5px] leading-snug text-muted dark:text-stone-400">
          On: {crux.label}
        </p>
      )}
    </div>
  );
}

/** "Someone who says yes / no would change their mind if…", styled as the crux sheet has it. */
function MindChange({ label, side, text }: { label: string; side: keyof typeof SIDE_LABEL; text: string }) {
  return (
    <div>
      <p className={`label-caps !text-[0.9375rem] ${SIDE_LABEL[side]}`}>{label}</p>
      <p className="mt-1 font-serif text-[1.0625rem] leading-[1.55] text-stone-800 dark:text-stone-200">{text}</p>
    </div>
  );
}

function Body({ node }: { node: DiagramNode }) {
  switch (node.kind) {
    case "question":
      return (
        <>
          {node.claim && <RunIn lead={`${node.claim.lead}.`}>{node.claim.text}</RunIn>}
          {node.hook && (
            <p className="font-serif text-[1.0625rem] leading-[1.55] text-stone-800 dark:text-stone-200">
              {node.hook.text}
              {node.hook.source?.label && (
                <span className="mt-1 block font-sans text-xs text-muted dark:text-stone-400">
                  {node.hook.source.url ? (
                    <a
                      href={node.hook.source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open source from ${node.hook.source.label} (opens in a new tab)`}
                      className={SOURCE_LINK}
                    >
                      {node.hook.source.label} ↗
                    </a>
                  ) : (
                    node.hook.source.label
                  )}
                </span>
              )}
            </p>
          )}
          {node.agreement.length > 0 && (
            <DetailBlock label={node.agreementHeading}>
              <ul className="list-disc space-y-1.5 pl-4">
                {node.agreement.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </DetailBlock>
          )}
        </>
      );
    case "crux":
      return (
        <>
          <div>
            <SettleAnswer
              mode={node.settle.mode}
              kind={node.settle.kind}
              condition={node.settle.condition}
              resolved={node.settle.resolved}
              label={node.settle.label}
            />
            {node.settle.note && (
              <span className="mt-1.5 block text-xs leading-snug text-muted dark:text-stone-400">
                {node.settle.note}
              </span>
            )}
          </div>
          {node.flips && (
            <div className="space-y-3">
              <MindChange label={node.flips.supporterLead} side="supporters" text={node.flips.supporter} />
              <MindChange label={node.flips.skepticLead} side="skeptics" text={node.flips.skeptic} />
            </div>
          )}
          {node.runIns.map((runIn) => (
            <RunIn key={runIn.lead} lead={runIn.lead} emphasis={runIn.emphasis}>
              {runIn.text}
            </RunIn>
          ))}
          <DetailBlock label="The test">
            <p>
              <span className="font-medium text-stone-800 dark:text-stone-200">{node.test.title}.</span>{" "}
              {node.test.methodology}
            </p>
            <p className="mt-1 text-xs text-muted dark:text-stone-400">Cost to run it: {node.test.cost}</p>
          </DetailBlock>
        </>
      );
    case "side":
      return (
        <p className="font-serif text-[1.0625rem] leading-[1.6] text-stone-800 dark:text-stone-200">
          {node.text}
        </p>
      );
    case "evidence":
      return (
        <>
          <p className="font-serif text-[1.0625rem] leading-[1.6] text-stone-800 dark:text-stone-200">
            {node.description}
          </p>
          {node.source && (
            <p className="text-sm text-muted dark:text-stone-400">
              {node.sourceUrl ? (
                <a
                  href={node.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open source from ${node.source} (opens in a new tab)`}
                  className={SOURCE_LINK}
                >
                  {node.source} ↗
                </a>
              ) : (
                <span className="inline-flex min-h-11 items-center">{node.source}</span>
              )}
            </p>
          )}
        </>
      );
  }
}

/** Where the same thing lives on the map page. */
function pageLink(node: DiagramNode, model: DiagramModel): { href: string; label: string } {
  const page = `/topics/${model.topicId}`;
  if (node.kind === "question") return { href: page, label: "Read the map page" };
  if (node.kind === "side") return { href: `${page}#positions`, label: "See both sides on the map page" };
  const crux = cruxOf(model, node);
  return crux
    ? { href: crux.pageHref, label: "Open this crux on the map page" }
    : { href: page, label: "Read the map page" };
}

export function DiagramDetail({
  model,
  node,
  onClose,
}: {
  model: DiagramModel;
  node: DiagramNode | null;
  onClose: () => void;
}) {
  const sheetRef = useModalAccessibility<HTMLDivElement>({ isOpen: node !== null, onClose });
  if (!node) return null;
  const link = pageLink(node, model);

  return (
    <div className="absolute inset-0 z-50 flex justify-end">
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-stone-900/[0.06] dark:bg-black/30"
      />
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={TITLE_ID}
        tabIndex={-1}
        style={{ width: DETAIL_PANEL_WIDTH }}
        className="relative m-3 flex max-w-[calc(100%-1.5rem)] flex-col overflow-hidden rounded-lg border border-stone-200/90 bg-[#fefcf9] shadow-[0_8px_32px_rgba(60,50,40,0.16)] focus:outline-none dark:border-[var(--border-default)] dark:bg-[var(--bg-card)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
      >
        <div className="flex items-start gap-3 border-b border-stone-200/80 px-5 pb-4 pt-4 dark:border-[var(--border-default)]">
          <Header node={node} model={model} />
          <button
            type="button"
            onClick={onClose}
            data-modal-initial-focus
            aria-label="Close"
            className="-mr-1.5 -mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-stone-100 hover:text-stone-800 focus-visible:rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus dark:text-stone-400 dark:hover:bg-[var(--bg-muted)] dark:hover:text-stone-200"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-4">
          <Body node={node} />
        </div>
        <div className="border-t border-stone-200/80 px-5 py-2 dark:border-[var(--border-default)]">
          <TextAction href={link.href} className="inline-flex min-h-11 items-center text-sm">
            {link.label} →
          </TextAction>
        </div>
      </div>
    </div>
  );
}

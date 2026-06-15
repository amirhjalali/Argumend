"use client";

import React, { useId, useState } from "react";
import { getGlossaryEntry } from "@/data/glossaryTerms";

interface GlossaryTermProps {
  /**
   * The glossary key to look up (any casing/variant). Defaults to the rendered
   * children text when omitted.
   */
  term?: string;
  /** Visible label. Falls back to the resolved canonical term. */
  children?: React.ReactNode;
  /** Extra classes for the trigger. */
  className?: string;
}

/**
 * Inline, accessible glossary tooltip.
 *
 * Renders a <button> with a dotted underline that reveals a one-sentence
 * definition on hover AND keyboard focus. The tooltip is absolutely positioned
 * so it never disturbs surrounding layout, and the whole thing degrades to
 * plain text when the term isn't in the glossary.
 *
 * SSR-safe (no window access), offline (static data), no external deps.
 */
export function GlossaryTerm({ term, children, className }: GlossaryTermProps) {
  const childText =
    typeof children === "string"
      ? children
      : Array.isArray(children)
        ? children.filter((c) => typeof c === "string").join("")
        : undefined;
  const lookupKey = term ?? childText ?? "";
  const entry = getGlossaryEntry(lookupKey);
  const tooltipId = useId();
  const [open, setOpen] = useState(false);

  const label = children ?? entry?.term ?? lookupKey;

  // No definition found — render plain text, don't break anything.
  if (!entry) {
    return <>{label}</>;
  }

  return (
    <span className="relative inline-block">
      <button
        type="button"
        aria-describedby={open ? tooltipId : undefined}
        aria-expanded={open}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={(e) => {
          // Prevent the click from bubbling to parent handlers (e.g. node
          // selection on the canvas) and toggle for touch users.
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
        className={`cursor-help border-0 bg-transparent p-0 font-[inherit] text-[inherit] leading-[inherit] [text-decoration-line:underline] [text-decoration-style:dotted] [text-decoration-color:#4f7b77] underline-offset-2 transition-colors hover:[text-decoration-color:#3a6965] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep ${className ?? ""}`}
      >
        {label}
      </button>
      {open && (
        <span
          role="tooltip"
          id={tooltipId}
          className="absolute left-1/2 top-full z-50 mt-1.5 w-60 max-w-[16rem] -translate-x-1/2 rounded-md border border-stone-200/80 bg-white px-3 py-2 text-left font-sans text-[12px] font-normal not-italic normal-case leading-snug tracking-normal text-[#3d3a36] shadow-lg dark:border-[#3d3a36] dark:bg-[#252420] dark:text-[#e8e3da]"
        >
          <span className="block font-semibold text-deep">{entry.term}</span>
          <span className="mt-0.5 block text-[#564d45] dark:text-[#b8b0a6]">
            {entry.definition}
          </span>
        </span>
      )}
    </span>
  );
}

export default GlossaryTerm;

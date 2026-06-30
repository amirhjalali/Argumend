"use client";

import { useState } from "react";
import { motion, AnimatePresence, type MotionProps } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Info, X } from "lucide-react";
import { VARIANT_STYLES } from "@/lib/variantStyles";
import type { NodeVariant } from "@/types/graph";

// The legend is DERIVED from VARIANT_STYLES (the single source of truth for
// each variant's label, color, and icon) so it can never drift from what the
// node headers actually render. Only the human-friendly description and the
// reading order live here — neither appears on a node, so neither can drift.
const LEGEND_ORDER: { variant: NodeVariant; description: string }[] = [
  { variant: "meta", description: "The big question being examined" },
  { variant: "pillar", description: "A core supporting argument" },
  { variant: "proponent", description: "The best case for the claim" },
  { variant: "skeptic", description: "The strongest objection" },
  { variant: "crux", description: "What would settle the debate" },
  { variant: "evidence", description: "Data, studies, and sources" },
  { variant: "question", description: "Questions still worth asking" },
];

interface MapLegendProps {
  /**
   * When provided, a persistent "Find the crux" affordance is shown alongside
   * the legend toggle so the crux (otherwise buried an expansion deep) is one
   * click away. Passed only when a crux is reachable in the current graph.
   */
  onFindCrux?: () => void;
}

export function MapLegend({ onFindCrux }: MapLegendProps) {
  // Default-collapsed on every screen: on first paint the canvas should show a
  // small toggle pill, not a tall card occluding the 300–340px nodes. Expands
  // on click; all content is preserved when open.
  const [isOpen, setIsOpen] = useState(false);

  // Honour prefers-reduced-motion — swap the spring/scale entrances for a quick
  // opacity fade so motion-sensitive users don't get the pop-in.
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const cardMotion: MotionProps = reducedMotion
    ? {
        initial: false,
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.12 },
      }
    : {
        initial: { opacity: 0, y: 10, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 10, scale: 0.95 },
        transition: { duration: 0.2, ease: "easeOut" },
      };

  const pillMotion: MotionProps = reducedMotion
    ? {
        initial: false,
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.12 },
      }
    : {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 },
        transition: { duration: 0.2 },
      };

  const crux = VARIANT_STYLES.crux;
  const CruxIcon = crux.Icon;

  return (
    <div
      className="absolute bottom-3 left-3 md:bottom-6 md:left-6 z-50 flex flex-col items-start gap-2"
      aria-label="Map controls"
      role="region"
    >
      {/* Persistent crux affordance — surfaces the crux without the user having
          to dig through expansions. Sits above the legend toggle. */}
      {onFindCrux && (
        <motion.button
          {...pillMotion}
          onClick={onFindCrux}
          aria-label="Find the crux — jump to what would settle the debate"
          className="flex items-center gap-1.5 rounded-xl border bg-[#faf8f5]/95 dark:bg-[var(--bg-card)]/95 backdrop-blur-sm px-3 py-2 text-xs shadow-lg transition-all hover:shadow-xl focus:outline-none focus-visible:ring-2"
          style={{
            color: crux.accentColor,
            borderColor: `${crux.accentColor}40`,
          }}
        >
          <CruxIcon className="h-3.5 w-3.5" style={{ color: crux.accentColor }} strokeWidth={2} />
          <span className="font-semibold">Find the crux</span>
        </motion.button>
      )}

      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="legend"
            {...cardMotion}
            className="w-48 md:w-56 lg:w-64 rounded-2xl border border-stone-200/40 dark:border-[var(--border-default)] bg-[#faf8f5]/95 dark:bg-[var(--bg-card)]/95 backdrop-blur-sm p-4 md:p-5 shadow-2xl max-h-[45vh] md:max-h-none overflow-y-auto"
          >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-serif text-sm md:text-base font-semibold text-primary">
                How to Read This Map
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1.5 text-stone-400 transition-colors hover:bg-stone-100 dark:hover:bg-[#302e2a] hover:text-stone-600 dark:hover:text-stone-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-deep/40"
                aria-label="Collapse legend"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Legend items — label/color/icon come straight from VARIANT_STYLES */}
            <div className="space-y-2.5 md:space-y-3">
              {LEGEND_ORDER.map(({ variant, description }) => {
                const { label, accentColor, Icon } = VARIANT_STYLES[variant];
                return (
                  <div key={variant} className="flex items-start gap-2.5 md:gap-3">
                    <div
                      className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-lg flex-shrink-0"
                      style={{ backgroundColor: `${accentColor}12` }}
                    >
                      <Icon
                        className="h-3.5 w-3.5"
                        style={{ color: accentColor }}
                        strokeWidth={2}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-xs font-semibold leading-tight"
                        style={{ color: accentColor }}
                      >
                        {label}
                      </p>
                      <p className="text-[10px] md:text-[11px] leading-snug text-stone-500 dark:text-[#8a8279] mt-0.5">
                        {description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tip */}
            <div className="mt-4 border-t border-stone-200/60 dark:border-[var(--border-default)] pt-3">
              <p className="text-[11px] md:text-xs text-stone-500 dark:text-[#8a8279] leading-relaxed">
                <span className="font-semibold text-deep">Tip:</span> Click &ldquo;Explore&rdquo; on nodes to reveal deeper arguments.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="button"
            {...pillMotion}
            onClick={() => setIsOpen(true)}
            aria-label="Show map legend"
            className="flex items-center gap-1.5 rounded-xl border border-stone-200/40 dark:border-[var(--border-default)] bg-[#faf8f5]/95 dark:bg-[var(--bg-card)]/95 backdrop-blur-sm px-3 py-2 text-xs text-stone-500 dark:text-[#8a8279] shadow-lg hover:border-stone-300 dark:hover:border-[#4a4640] hover:shadow-xl transition-all"
          >
            <Info className="h-3.5 w-3.5 text-deep" />
            <span className="font-medium">Legend</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

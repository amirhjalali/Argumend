"use client";

import { useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { InteractiveCruxExample } from "@/components/home/homeExamples";

interface InteractiveCruxShowcaseProps {
  /** The server-rendered WorkedCrux for the flagship map (shown on tab 0). */
  flagshipPanel: React.ReactNode;
  flagshipLabel: string;
  flagshipHref: string;
  examples: readonly InteractiveCruxExample[];
}

/**
 * Interactive "Try one live" tab switcher on the homepage.
 * Tab 0 renders the server-rendered flagship WorkedCrux (so the default view
 * works identically with or without JS and preserves every flagship contract).
 * Additional tabs let visitors click straight into real maps
 * to see agreed ground, crux #1, and symmetric mind-change flips in seconds. Only maps with a
 * verified evidence dossier (`audited`) are labelled "Audited map".
 */
export function InteractiveCruxShowcase({
  flagshipPanel,
  flagshipLabel,
  flagshipHref,
  examples,
}: InteractiveCruxShowcaseProps) {
  const [activeId, setActiveId] = useState<string>("flagship");
  const reducedMotion = useReducedMotion();
  const baseId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activeExample = examples.find((example) => example.id === activeId) ?? null;

  const tabs = [
    { id: "flagship", label: flagshipLabel },
    ...examples.map((example) => ({ id: example.id, label: example.shortLabel })),
  ];

  const tabDomId = (id: string) => `${baseId}-tab-${id}`;
  const panelDomId = (id: string) => `${baseId}-panel-${id}`;

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
    setActiveId(tabs[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div>
      {/* Topic switcher pills */}
      <div
        role="tablist"
        aria-label="Preview a live argument map"
        className="mb-5 flex flex-wrap items-center gap-2"
      >
        {tabs.map((tab, index) => {
          const selected = tab.id === activeId;
          return (
            <button
              key={tab.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              id={tabDomId(tab.id)}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={panelDomId(tab.id)}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(tab.id)}
              onKeyDown={(event) => onTabKeyDown(event, index)}
              className={`min-h-10 rounded-full border px-4 py-1.5 font-sans text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus ${
                selected
                  ? "border-primary bg-primary text-canvas"
                  : "border-divider bg-card text-secondary dark:text-stone-300 hover:border-stone-400 hover:text-primary dark:hover:border-stone-500 dark:hover:text-stone-100"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeExample === null ? (
        <motion.div
          key="flagship"
          id={panelDomId("flagship")}
          role="tabpanel"
          aria-labelledby={tabDomId("flagship")}
          initial={reducedMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.22 }}
        >
          {flagshipPanel}
          <p className="mt-4 md:mt-6">
            <Link
              href={flagshipHref}
              className="inline-flex min-h-11 items-center gap-1.5 font-sans text-sm font-medium text-deep underline decoration-deep/30 underline-offset-4 transition-colors hover:decoration-deep dark:text-accent-text dark:decoration-accent-text/40"
            >
              Read the whole map
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </p>
        </motion.div>
      ) : (
        <motion.div
          key={activeExample.id}
          id={panelDomId(activeExample.id)}
          role="tabpanel"
          aria-labelledby={tabDomId(activeExample.id)}
          initial={reducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.22 }}
        >
          <div className="overflow-hidden rounded-xl border border-divider bg-card shadow-sm">
            <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.45fr)]">
              {/* Editorial plate */}
              <div className="relative min-h-[12rem] border-b border-divider bg-canvas lg:min-h-full lg:border-b-0 lg:border-r">
                {activeExample.heroSrc ? (
                  <Image
                    src={activeExample.heroSrc}
                    alt={activeExample.heroAlt}
                    fill
                    sizes="(min-width: 1024px) 380px, 100vw"
                    className="object-cover"
                  />
                ) : null}
              </div>

              {/* Structured crux preview */}
              <div className="p-5 sm:p-6">
                <p className="label-caps">{activeExample.audited ? `${activeExample.category} · Audited map` : activeExample.category}</p>
                <h3 className="mt-1 font-serif text-[1.4375rem] font-medium leading-snug text-primary dark:text-stone-100 sm:text-[1.625rem]">
                  {activeExample.title}
                </h3>

                <div className="mt-4 rounded-lg border border-divider/80 bg-canvas/70 px-4 py-3">
                  <p className="label-caps !text-deep dark:!text-accent-text">What both sides already accept</p>
                  <p className="mt-1 font-serif text-[1rem] leading-relaxed text-secondary dark:text-stone-300">
                    {activeExample.agreedGround}
                  </p>
                </div>

                <div className="mt-4 border-l-2 border-crux pl-4">
                  <p className="label-caps !text-crux-text">Crux #1</p>
                  <p className="mt-1 font-serif text-[1.1875rem] font-medium leading-snug text-primary dark:text-stone-100">
                    {activeExample.cruxQuestion}
                  </p>
                  <p className="mt-1.5 font-serif text-[0.9375rem] leading-relaxed text-secondary dark:text-stone-400">
                    <em className="font-medium text-primary dark:text-stone-200">What would settle it:</em>{" "}
                    {activeExample.settleCondition}
                  </p>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-divider bg-canvas/50 p-3.5">
                    <p className="label-caps !text-deep dark:!text-accent-text">Would move supporters</p>
                    <p className="mt-1 font-serif text-[0.9375rem] leading-relaxed text-secondary dark:text-stone-300">
                      {activeExample.supporterFlip}
                    </p>
                  </div>
                  <div className="rounded-lg border border-divider bg-canvas/50 p-3.5">
                    <p className="label-caps !text-rust-700 dark:!text-rust-400">Would move skeptics</p>
                    <p className="mt-1 font-serif text-[0.9375rem] leading-relaxed text-secondary dark:text-stone-300">
                      {activeExample.skepticFlip}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-4 flex flex-wrap items-center gap-6 md:mt-6">
            <Link
              href={activeExample.href}
              className="inline-flex min-h-11 items-center gap-1.5 font-sans text-sm font-medium text-deep underline decoration-deep/30 underline-offset-4 transition-colors hover:decoration-deep dark:text-accent-text dark:decoration-accent-text/40"
            >
              Read the whole map
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href={activeExample.cruxHref}
              className="inline-flex min-h-11 items-center gap-1 font-sans text-sm text-secondary dark:text-stone-400 underline decoration-divider underline-offset-4 transition-colors hover:text-primary dark:hover:text-stone-200"
            >
              Jump straight to crux #1
            </Link>
          </p>
        </motion.div>
      )}
    </div>
  );
}

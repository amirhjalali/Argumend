"use client";

import dynamic from "next/dynamic";
import { PAGE_GUTTER, PAGE_WIDTHS, TextAction } from "@/components/ui";
import { MobileArgumentList } from "@/components/MobileArgumentList";
import { useIsHydrated, useIsMobile } from "@/hooks/useMediaQuery";
import type { DiagramModel } from "@/lib/diagram/model";

// React Flow (+CSS) ships only to desktop sessions of this route. Phones get
// the outline, which is server-rendered from the same model.
const DesktopCanvas = dynamic(() => import("@/components/DesktopCanvas"), { ssr: false });

/**
 * On desktop the route is exactly one screen: the shell's 57px header, a
 * compact intro, and the canvas filling the rest, so the tree it fits on load
 * is as large as the window allows.
 */
export function TopicDiagram({ diagram }: { diagram: DiagramModel }) {
  const hydrated = useIsHydrated();
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col md:h-[calc(100svh-3.5rem-1px)]">
      <div className={`mx-auto w-full shrink-0 ${PAGE_WIDTHS.default} ${PAGE_GUTTER} pb-3 pt-4`}>
        <TextAction href={`/topics/${diagram.topicId}`} className="gap-1.5">
          <span aria-hidden="true">←</span> Back to the map page
        </TextAction>
        <p className="label-caps mt-1.5">
          <span className="md:hidden">Outline</span>
          <span className="hidden md:inline">Diagram</span>
        </p>
        <h1 className="text-balance font-serif text-[1.75rem] leading-tight text-stone-900 dark:text-stone-100 sm:text-[1.875rem]">
          {diagram.title}
        </h1>
        <p className="mt-1 text-sm leading-relaxed text-muted dark:text-stone-400">
          The map page as a tree: the question, its cruxes, each side&rsquo;s case and its evidence.{" "}
          <span className="md:hidden"> On a phone it is an outline; the diagram needs a larger screen.</span>{" "}
          Yes and no are answers to the question at the top.{" "}
          <span className="md:hidden">Tap a crux to open it.</span>
          <span className="hidden md:inline">Select a box, or Tab to it and press Enter, to read it in full.</span>
        </p>
      </div>
      <div
        className="relative w-full border-t border-stone-200/70 dark:border-[var(--border-divider)] md:min-h-[480px] md:flex-1"
        data-testid="topic-diagram"
      >
        <div className="md:hidden">
          <MobileArgumentList diagram={diagram} />
        </div>
        {hydrated && !isMobile && (
          <div className="absolute inset-0">
            <DesktopCanvas diagram={diagram} />
          </div>
        )}
      </div>
    </div>
  );
}

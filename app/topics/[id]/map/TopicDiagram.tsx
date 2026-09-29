"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useLogicGraph } from "@/hooks/useLogicGraph";
import { useIsHydrated, useIsMobile } from "@/hooks/useMediaQuery";

// React Flow (+CSS) ships only to desktop sessions of this route; phones get
// the pillar outline instead.
const DesktopCanvas = dynamic(() => import("@/components/DesktopCanvas"), { ssr: false });
const MobileArgumentList = dynamic(
  () => import("@/components/MobileArgumentList").then((m) => m.MobileArgumentList),
  { ssr: false },
);

export function TopicDiagram({ topicId, title }: { topicId: string; title: string }) {
  const hydrated = useIsHydrated();
  const isMobile = useIsMobile();

  useEffect(() => {
    const store = useLogicGraph.getState();
    store.setView("logic-map");
    store.setTopic(topicId);
  }, [topicId]);

  return (
    <div className="flex flex-col">
      <div className="mx-auto w-full max-w-[66rem] px-4 pb-4 pt-3 sm:px-6 lg:px-8">
        <Link
          href={`/topics/${topicId}`}
          className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-deep link-underline dark:text-[#8fc0bb]"
        >
          <span aria-hidden="true">←</span> Back to the map page
        </Link>
        <p className="label-caps mt-2">Diagram</p>
        <h1 className="mt-1 text-balance font-serif text-[1.75rem] leading-tight text-stone-900 dark:text-stone-100 sm:text-[2rem]">
          {title}
        </h1>
        <p className="mt-1.5 max-w-[42rem] text-sm leading-relaxed text-muted dark:text-stone-400">
          The same map drawn as a diagram: the claim, the pillars under it, and the test that
          could settle each one. {isMobile && hydrated ? "Tap" : "Select"} a pillar to open it.
        </p>
      </div>
      <div
        className="relative w-full border-t border-stone-200/70 dark:border-[var(--border-divider)] md:h-[calc(100svh-15rem)] md:min-h-[520px]"
        data-testid="topic-diagram"
      >
        {hydrated && (isMobile ? <MobileArgumentList outlineOnly /> : <DesktopCanvas showIntroPanel={false} />)}
      </div>
    </div>
  );
}

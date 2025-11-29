"use client";

import {
  ArgumentNodeData,
  useLogicGraph,
} from "@/hooks/useLogicGraph";
import { NodeProps } from "@xyflow/react";
import { ArrowUpRight } from "lucide-react";

const VARIANT_STYLES = {
  pillar: {
    border: "border-white/10",
    background: "bg-card/60",
    badge: "text-accent-truth border-accent-truth/40 bg-accent-truth/10",
  },
  skeptic: {
    border: "border-accent-doubt/30",
    background: "bg-void/80",
    badge: "text-accent-doubt border-accent-doubt/40 bg-accent-doubt/10",
  },
  proponent: {
    border: "border-accent-crux/30",
    background: "bg-void/80",
    badge: "text-accent-crux border-accent-crux/40 bg-accent-crux/10",
  },
} as const;

export function ArgumentNode({ data }: NodeProps<ArgumentNodeData>) {
  const expandPillar = useLogicGraph((state) => state.expandPillar);
  const expanded = useLogicGraph(
    (state) => state.expandedNodes[`pillar-${data.pillarId}`],
  );

  const style = VARIANT_STYLES[data.variant];

  return (
    <div
      className={`w-[280px] rounded-3xl border ${style.border} ${style.background} p-5 shadow-glass backdrop-blur-xl`}
    >
      <div
        className={`mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs uppercase tracking-[0.3em] ${style.badge}`}
      >
        {data.variant === "pillar"
          ? "Pillar Node"
          : data.variant === "skeptic"
            ? "Skeptic"
            : "Proponent"}
      </div>

      {data.variant === "pillar" && (
        <div className="mb-4 h-36 w-full overflow-hidden rounded-2xl border border-white/5">
          <div
            className="h-full w-full bg-gradient-to-br from-accent-truth/10 to-accent-purple/10"
            style={
              data.imageUrl
                ? {
                    backgroundImage: `url(${data.imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : undefined
            }
          />
        </div>
      )}

      <h3 className="text-xl font-semibold leading-tight">
        {data.title}
      </h3>
      {data.summary && (
        <p className="mt-2 text-sm text-secondary">
          {data.summary}
        </p>
      )}
      {data.body && (
        <p className="mt-3 text-sm text-secondary leading-relaxed">
          {data.body}
        </p>
      )}

      {data.variant === "pillar" && (
        <button
          className="mt-5 inline-flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:border-accent-truth/60 hover:text-accent-truth disabled:opacity-40"
          onClick={() => expandPillar(data.pillarId)}
          disabled={expanded}
        >
          {expanded ? "Branches online" : "Spawn branches"}
          <ArrowUpRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}



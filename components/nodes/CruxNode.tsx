"use client";

import { CruxNodeData, useLogicGraph } from "@/hooks/useLogicGraph";
import { NodeProps } from "@xyflow/react";
import { FlaskConical, ArrowRight } from "lucide-react";

export function CruxNode({ data }: NodeProps<CruxNodeData>) {
  const openCrux = useLogicGraph((state) => state.openCrux);

  return (
    <button
      onClick={() => openCrux(data.pillarId)}
      className="crux-node relative inline-flex w-[260px] flex-col gap-3 rounded-[32px] border-2 border-accent-crux/60 bg-gradient-to-br from-accent-crux/10 via-void/80 to-accent-crux/5 p-5 text-left text-white shadow-glow-crux outline-none transition hover:border-accent-crux hover:shadow-glow-truth"
      style={{
        clipPath:
          "polygon(20% 0%, 80% 0%, 100% 25%, 100% 75%, 80% 100%, 20% 100%, 0% 75%, 0% 25%)",
      }}
    >
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.4em] text-accent-crux">
        <span>Crux Node</span>
        <FlaskConical className="h-4 w-4" />
      </div>
      <div>
        <p className="text-sm text-secondary">{data.pillarTitle}</p>
        <h4 className="text-lg font-semibold leading-tight">
          {data.title}
        </h4>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.3em] text-accent-crux">
        Status: {data.status}
      </div>

      {data.equation && (
        <div className="text-xs font-mono text-secondary/90">
          {data.equation}
        </div>
      )}

      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-accent-crux">
        Open details
        <ArrowRight className="h-4 w-4" />
      </div>
    </button>
  );
}



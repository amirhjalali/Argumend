"use client";

import { useLogicGraph } from "@/hooks/useLogicGraph";
import { AnimatePresence, motion } from "framer-motion";
import { X, FlaskConical, Beaker } from "lucide-react";

export function CruxDrawer() {
  const selectedCrux = useLogicGraph((state) => state.selectedCrux);
  const closeCrux = useLogicGraph((state) => state.closeCrux);

  return (
    <AnimatePresence>
      {selectedCrux && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCrux}
          />
          <motion.aside
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto border-l border-white/60 bg-panel/95 p-8 font-sans text-primary shadow-lw backdrop-blur-xl"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 25, 
              mass: 1.2
            }}
          >
            <div className="flex items-start justify-between border-b border-white/60 pb-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-link">
                  Definitive Test
                </p>
                <h3 className="mt-3 font-serif text-2xl font-bold tracking-tight text-primary">
                  {selectedCrux.title}
                </h3>
                <p className="mt-1 font-serif text-sm italic text-secondary">
                  {selectedCrux.pillarTitle}
                </p>
              </div>
              <button
                onClick={closeCrux}
                className="rounded-full border border-white/70 p-2 text-secondary transition hover:text-primary"
                aria-label="Close crux details"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-8 space-y-8">
              <section>
                <div className="mb-3 flex items-center gap-3 border-b border-white/50 pb-2 text-xs font-bold uppercase tracking-[0.3em] text-primary">
                  <FlaskConical className="h-4 w-4 text-accent-main" strokeWidth={1.5} />
                  Description
                </div>
                <p className="text-sm leading-relaxed text-secondary">
                  {selectedCrux.description}
                </p>
              </section>

              <section>
                <div className="mb-3 flex items-center gap-3 border-b border-white/50 pb-2 text-xs font-bold uppercase tracking-[0.3em] text-primary">
                  <Beaker className="h-4 w-4 text-accent-main" strokeWidth={1.5} />
                  Methodology
                </div>
                <p className="text-sm leading-relaxed text-secondary">
                  {selectedCrux.methodology}
                </p>
              </section>

              {selectedCrux.equation && (
                <section>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-muted">
                    Equation
                  </p>
                  <code className="block rounded-md border border-white/60 bg-white/70 px-4 py-4 font-mono text-sm text-primary">
                    {selectedCrux.equation}
                  </code>
                </section>
              )}

              <section className="grid grid-cols-2 gap-4 border-t border-white/40 pt-4 text-sm">
                <div className="rounded-lg border border-white/60 bg-white/70 p-4">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
                    Status
                  </p>
                  <p className="font-serif text-lg font-bold capitalize text-accent-main">
                    {selectedCrux.status}
                  </p>
                </div>
                <div className="rounded-lg border border-white/60 bg-white/70 p-4">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
                    Cost
                  </p>
                  <p className="font-serif text-lg font-bold text-accent-warn">
                    {selectedCrux.cost}
                  </p>
                </div>
              </section>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

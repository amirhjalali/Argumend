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
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCrux}
          />
          <motion.aside
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-black/5 bg-parchment p-8 text-primary shadow-2xl font-sans"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            <div className="flex items-start justify-between border-b border-black/5 pb-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-accent-logos/60 font-bold">
                  Definitive Test
                </p>
                <h3 className="mt-3 text-3xl font-bold tracking-tight text-accent-logos font-serif">
                  {selectedCrux.title}
                </h3>
                <p className="mt-1 text-sm text-secondary italic font-serif">
                  {selectedCrux.pillarTitle}
                </p>
              </div>
              <button
                onClick={closeCrux}
                className="rounded-sm border border-black/10 p-2 text-secondary transition hover:text-accent-logos hover:border-accent-logos"
                aria-label="Close crux details"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-8 space-y-8">
              <section>
                <div className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-accent-ethos font-bold border-b border-accent-ethos/20 pb-2 mb-3">
                  <FlaskConical className="h-4 w-4" />
                  Description
                </div>
                <p className="text-base leading-relaxed text-primary/90">
                  {selectedCrux.description}
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-accent-logos font-bold border-b border-accent-logos/20 pb-2 mb-3">
                  <Beaker className="h-4 w-4" />
                  Methodology
                </div>
                <p className="text-base leading-relaxed text-primary/90">
                  {selectedCrux.methodology}
                </p>
              </section>

              {selectedCrux.equation && (
                <section>
                  <p className="text-sm uppercase tracking-[0.2em] text-accent-logos/60 font-bold mb-2">
                    Equation
                  </p>
                  <code className="block rounded-sm border border-black/5 bg-black/5 px-4 py-4 font-mono text-sm text-accent-logos">
                    {selectedCrux.equation}
                  </code>
                </section>
              )}

              <section className="grid grid-cols-2 gap-4 text-sm pt-4 border-t border-black/5">
                <div className="bg-parchment-dark p-4 rounded-sm border border-black/5">
                  <p className="text-xs uppercase tracking-[0.2em] text-secondary font-bold mb-1">
                    Status
                  </p>
                  <p className="text-lg font-bold text-accent-ethos font-serif">
                    {selectedCrux.status}
                  </p>
                </div>
                <div className="bg-parchment-dark p-4 rounded-sm border border-black/5">
                  <p className="text-xs uppercase tracking-[0.2em] text-secondary font-bold mb-1">
                    Cost
                  </p>
                  <p className="text-lg font-bold text-accent-logos font-serif">
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



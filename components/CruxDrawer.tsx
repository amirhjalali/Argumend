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
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-white/10 bg-void/95 p-8 text-white shadow-2xl backdrop-blur-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-secondary">
                  Definitive Test
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                  {selectedCrux.title}
                </h3>
                <p className="text-sm text-secondary">
                  {selectedCrux.pillarTitle}
                </p>
              </div>
              <button
                onClick={closeCrux}
                className="rounded-full border border-white/10 p-2 text-secondary transition hover:text-white"
                aria-label="Close crux details"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-8 space-y-6">
              <section>
                <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-accent-crux">
                  <FlaskConical className="h-5 w-5" />
                  Description
                </div>
                <p className="mt-3 text-base leading-relaxed text-secondary">
                  {selectedCrux.description}
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-accent-truth">
                  <Beaker className="h-5 w-5" />
                  Methodology
                </div>
                <p className="mt-3 text-base leading-relaxed text-secondary">
                  {selectedCrux.methodology}
                </p>
              </section>

              {selectedCrux.equation && (
                <section>
                  <p className="text-sm uppercase tracking-[0.3em] text-accent-purple">
                    Equation
                  </p>
                  <code className="mt-2 inline-block rounded-xl border border-white/10 bg-black/40 px-4 py-3 font-mono text-sm text-secondary">
                    {selectedCrux.equation}
                  </code>
                </section>
              )}

              <section className="grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.4em] text-secondary">
                    Verification status
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {selectedCrux.status}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.4em] text-secondary">
                    Cost to verify
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
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



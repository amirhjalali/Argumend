"use client";

import { useLogicGraph } from "@/hooks/useLogicGraph";
import { AnimatePresence, motion } from "framer-motion";
import { X, FlaskConical, Beaker } from "lucide-react";

export function CruxModal() {
    const selectedCrux = useLogicGraph((state) => state.selectedCrux);
    const closeCrux = useLogicGraph((state) => state.closeCrux);

    return (
        <AnimatePresence>
            {selectedCrux && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCrux}
                    />
                    <motion.div
                        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/60 bg-panel/95 shadow-2xl backdrop-blur-xl"
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between border-b border-white/60 bg-white/40 px-8 py-6">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-link">
                                    Definitive Test
                                </p>
                                <h3 className="mt-2 font-serif text-3xl font-bold tracking-tight text-primary">
                                    {selectedCrux.title}
                                </h3>
                                <p className="mt-1 font-serif text-base italic text-secondary">
                                    {selectedCrux.pillarTitle}
                                </p>
                            </div>
                            <button
                                onClick={closeCrux}
                                className="rounded-full border border-white/70 bg-white/50 p-2 text-secondary transition hover:bg-white hover:text-primary"
                                aria-label="Close crux details"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="max-h-[70vh] overflow-y-auto px-8 py-8">
                            <div className="grid gap-8 md:grid-cols-2">
                                <section className="space-y-4">
                                    <div className="flex items-center gap-3 border-b border-white/50 pb-2 text-xs font-bold uppercase tracking-[0.3em] text-primary">
                                        <FlaskConical className="h-4 w-4 text-accent-main" strokeWidth={1.5} />
                                        Description
                                    </div>
                                    <p className="text-base leading-relaxed text-secondary">
                                        {selectedCrux.description}
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <div className="flex items-center gap-3 border-b border-white/50 pb-2 text-xs font-bold uppercase tracking-[0.3em] text-primary">
                                        <Beaker className="h-4 w-4 text-accent-main" strokeWidth={1.5} />
                                        Methodology
                                    </div>
                                    <p className="text-base leading-relaxed text-secondary">
                                        {selectedCrux.methodology}
                                    </p>
                                </section>
                            </div>

                            {selectedCrux.equation && (
                                <section className="mt-8">
                                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-muted">
                                        Equation
                                    </p>
                                    <div className="flex items-center justify-center rounded-xl border border-white/60 bg-white/60 py-6">
                                        <code className="font-mono text-lg text-primary">
                                            {selectedCrux.equation}
                                        </code>
                                    </div>
                                </section>
                            )}

                            <div className="mt-8 grid grid-cols-2 gap-6">
                                <div className="rounded-xl border border-white/60 bg-white/60 p-5 text-center transition-colors hover:bg-white/80">
                                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
                                        Status
                                    </p>
                                    <p className="font-serif text-xl font-bold capitalize text-accent-main">
                                        {selectedCrux.status}
                                    </p>
                                </div>
                                <div className="rounded-xl border border-white/60 bg-white/60 p-5 text-center transition-colors hover:bg-white/80">
                                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
                                        Cost
                                    </p>
                                    <p className="font-serif text-xl font-bold text-accent-warn">
                                        {selectedCrux.cost}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

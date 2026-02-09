"use client";

import { useLogicGraph } from "@/hooks/useLogicGraph";
import { AnimatePresence, motion } from "framer-motion";
import { X, Scale, ScrollText } from "lucide-react";
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";

export function CruxModal() {
    const selectedCrux = useLogicGraph((state) => state.selectedCrux);
    const closeCrux = useLogicGraph((state) => state.closeCrux);

    return (
        <AnimatePresence>
            {selectedCrux && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Overlay - solid warm tone instead of blur */}
                    <motion.div
                        className="fixed inset-0 bg-stone-900/50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={closeCrux}
                    />
                    {/* Modal - refined scholarly aesthetic */}
                    <motion.div
                        className="relative w-full mx-4 md:mx-auto max-w-2xl overflow-hidden rounded-xl border border-stone-200/80 bg-[#fefcf9] shadow-[0_25px_60px_rgba(80,60,40,0.2)]"
                        initial={{ opacity: 0, scale: 0.96, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 20 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between border-b border-stone-200 px-4 md:px-8 py-4 md:py-6">
                            <div>
                                <p className="text-[11px] font-sans font-semibold uppercase tracking-[0.35em] text-stone-500">
                                    Crux of Verification
                                </p>
                                <h3 className="mt-2 font-serif text-lg md:text-xl font-bold tracking-tight text-stone-800">
                                    {selectedCrux.title}
                                </h3>
                                <p className="mt-1 font-serif text-base italic text-stone-500">
                                    from "{selectedCrux.pillarTitle}"
                                </p>
                            </div>
                            <button
                                onClick={closeCrux}
                                className="rounded-lg p-2 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-600"
                                aria-label="Close crux details"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="max-h-[70vh] overflow-y-auto px-4 py-4 md:px-8 md:py-8">
                            <div className="grid gap-4 md:gap-8 md:grid-cols-2">
                                <section className="space-y-4">
                                    <div className="flex items-center gap-3 border-b border-stone-200 pb-2">
                                        <Scale className="h-4 w-4 text-stone-600" strokeWidth={1.5} />
                                        <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.35em] text-stone-600">
                                            The Question
                                        </span>
                                    </div>
                                    <p className="font-serif text-base leading-relaxed text-stone-700">
                                        {selectedCrux.description}
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <div className="flex items-center gap-3 border-b border-stone-200 pb-2">
                                        <ScrollText className="h-4 w-4 text-stone-600" strokeWidth={1.5} />
                                        <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.35em] text-stone-600">
                                            The Method
                                        </span>
                                    </div>
                                    <p className="font-serif text-base leading-relaxed text-stone-700">
                                        {selectedCrux.methodology}
                                    </p>
                                </section>
                            </div>

                            {selectedCrux.equation && (
                                <section className="mt-8">
                                    <p className="mb-3 text-[11px] font-sans font-semibold uppercase tracking-[0.35em] text-stone-500">
                                        Mathematical Form
                                    </p>
                                    <div className="flex items-center justify-center rounded-lg border border-stone-200 bg-white/80 py-6">
                                        <span className="font-serif text-lg text-stone-800">
                                            <InlineMath math={selectedCrux.equation} />
                                        </span>
                                    </div>
                                </section>
                            )}

                            <div className="mt-8 grid grid-cols-2 gap-6">
                                <div className="rounded-lg border border-stone-200 bg-stone-50/50 p-5 text-center">
                                    <p className="mb-2 text-[10px] font-sans font-semibold uppercase tracking-[0.35em] text-stone-500">
                                        Verification Status
                                    </p>
                                    <p className="font-serif text-xl font-bold capitalize text-stone-700">
                                        {selectedCrux.status}
                                    </p>
                                </div>
                                <div className="rounded-lg border border-stone-200 bg-stone-50/50 p-5 text-center">
                                    <p className="mb-2 text-[10px] font-sans font-semibold uppercase tracking-[0.35em] text-stone-500">
                                        Cost to Verify
                                    </p>
                                    <p className="font-serif text-xl font-bold text-amber-700">
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

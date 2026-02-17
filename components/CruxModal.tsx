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
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 backdrop-blur-sm bg-black/30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={closeCrux}
                    />
                    {/* Modal */}
                    <motion.div
                        className="relative w-full mx-4 md:mx-auto max-w-2xl overflow-hidden rounded-2xl border border-stone-200/40 bg-[#faf8f5] shadow-2xl"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
                    >
                        {/* Deep teal top accent */}
                        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-deep/40 via-deep to-deep/40 rounded-t-2xl" />

                        {/* Header */}
                        <div className="flex items-start justify-between border-b border-stone-200/60 px-6 py-6 sm:px-8">
                            <div>
                                <p className="text-[11px] font-sans font-semibold uppercase tracking-[0.35em] text-deep">
                                    Crux of Verification
                                </p>
                                <h3 className="mt-2 font-serif text-lg md:text-xl font-bold tracking-tight text-primary">
                                    {selectedCrux.title}
                                </h3>
                                <p className="mt-1 font-serif text-base italic text-stone-500">
                                    from &ldquo;{selectedCrux.pillarTitle}&rdquo;
                                </p>
                            </div>
                            <button
                                onClick={closeCrux}
                                className="rounded-full p-2 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-600"
                                aria-label="Close crux details"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="max-h-[70vh] overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
                            <div className="grid gap-6 md:gap-8 md:grid-cols-2">
                                <section className="space-y-4">
                                    <div className="flex items-center gap-3 border-b border-stone-200/60 pb-2">
                                        <Scale className="h-4 w-4 text-deep" strokeWidth={1.5} />
                                        <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.35em] text-stone-500">
                                            The Question
                                        </span>
                                    </div>
                                    <p className="font-serif text-base leading-relaxed text-stone-600">
                                        {selectedCrux.description}
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <div className="flex items-center gap-3 border-b border-stone-200/60 pb-2">
                                        <ScrollText className="h-4 w-4 text-deep" strokeWidth={1.5} />
                                        <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.35em] text-stone-500">
                                            The Method
                                        </span>
                                    </div>
                                    <p className="font-serif text-base leading-relaxed text-stone-600">
                                        {selectedCrux.methodology}
                                    </p>
                                </section>
                            </div>

                            {selectedCrux.equation && (
                                <section className="mt-8">
                                    <p className="mb-3 text-[11px] font-sans font-semibold uppercase tracking-[0.35em] text-stone-500">
                                        Mathematical Form
                                    </p>
                                    <div className="flex items-center justify-center rounded-xl border border-stone-200/60 bg-white/80 py-6">
                                        <span className="font-serif text-lg text-primary">
                                            <InlineMath math={selectedCrux.equation} />
                                        </span>
                                    </div>
                                </section>
                            )}

                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <div className="rounded-xl border border-stone-200/40 bg-[#f4f1eb]/50 p-5 text-center">
                                    <p className="mb-2 text-[10px] font-sans font-semibold uppercase tracking-[0.35em] text-stone-500">
                                        Verification Status
                                    </p>
                                    <p className="font-serif text-xl font-bold capitalize text-stone-700">
                                        {selectedCrux.status}
                                    </p>
                                </div>
                                <div className="rounded-xl border border-stone-200/40 bg-[#f4f1eb]/50 p-5 text-center">
                                    <p className="mb-2 text-[10px] font-sans font-semibold uppercase tracking-[0.35em] text-stone-500">
                                        Cost to Verify
                                    </p>
                                    <p className="font-serif text-xl font-bold text-rust-600">
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

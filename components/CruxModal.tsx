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
                    {/* Modal - classical tablet/scroll aesthetic */}
                    <motion.div
                        className="relative w-full max-w-2xl overflow-hidden rounded-sm border-2 border-stone-300 bg-[#faf8f5] shadow-[0_25px_80px_rgba(30,25,20,0.3)]"
                        style={{
                            boxShadow: "0 0 0 1px #d6cdbf, 0 0 0 4px #faf8f5, 0 0 0 5px #d6cdbf, 0 25px 80px rgba(30,25,20,0.3)"
                        }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        transition={{ type: "tween", duration: 0.4, ease: "easeOut" }}
                    >
                        {/* Header - classical border style */}
                        <div className="flex items-start justify-between border-b-2 border-stone-300 bg-gradient-to-b from-[#f4f1eb] to-[#faf8f5] px-8 py-6">
                            <div>
                                <p className="text-[11px] font-sans font-semibold uppercase tracking-[0.35em] text-stone-500">
                                    Crux of Verification
                                </p>
                                <h3 className="mt-2 font-serif text-3xl font-bold tracking-tight text-stone-800">
                                    {selectedCrux.title}
                                </h3>
                                <p className="mt-1 font-serif text-base italic text-stone-500">
                                    from "{selectedCrux.pillarTitle}"
                                </p>
                            </div>
                            <button
                                onClick={closeCrux}
                                className="rounded-sm border border-stone-300 bg-[#faf8f5] p-2 text-stone-500 transition-colors hover:border-stone-400 hover:bg-stone-100 hover:text-stone-700"
                                aria-label="Close crux details"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="max-h-[70vh] overflow-y-auto px-8 py-8">
                            <div className="grid gap-8 md:grid-cols-2">
                                <section className="space-y-4">
                                    <div className="flex items-center gap-3 border-b border-stone-300 pb-2">
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
                                    <div className="flex items-center gap-3 border-b border-stone-300 pb-2">
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
                                    <div className="flex items-center justify-center rounded-sm border-2 border-stone-200 bg-white py-6">
                                        <span className="font-serif text-lg text-stone-800">
                                            <InlineMath math={selectedCrux.equation} />
                                        </span>
                                    </div>
                                </section>
                            )}

                            <div className="mt-8 grid grid-cols-2 gap-6">
                                <div className="rounded-sm border border-stone-200 bg-gradient-to-b from-white to-stone-50 p-5 text-center">
                                    <p className="mb-2 text-[10px] font-sans font-semibold uppercase tracking-[0.35em] text-stone-500">
                                        Verification Status
                                    </p>
                                    <p className="font-serif text-xl font-bold capitalize text-stone-700">
                                        {selectedCrux.status}
                                    </p>
                                </div>
                                <div className="rounded-sm border border-stone-200 bg-gradient-to-b from-white to-stone-50 p-5 text-center">
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

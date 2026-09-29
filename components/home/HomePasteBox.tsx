"use client";

import { HeroAnalyze } from "@/components/HeroAnalyze";

// HeroAnalyze still takes the canvas-era topic callback (it ignores it).
// Home is a server component now and cannot pass a function across the
// boundary, so this client wrapper supplies the no-op.
const ignoreTopicSelect = () => {};

/** Home, beat 4: the paste box, unchanged. */
export function HomePasteBox() {
  return <HeroAnalyze onTopicSelect={ignoreTopicSelect} />;
}

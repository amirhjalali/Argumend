const STEPS = [
  "Separating the voices",
  "Mapping the positions",
  "Finding shared ground",
  "Testing the cruxes",
  "Building the diagnosis",
];

export function AnalysisProgress({ step }: { step: number }) {
  return (
    <p className="flex items-center gap-3 font-serif text-lg italic text-[var(--text-secondary)]" aria-live="polite">
      <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse rounded-full bg-deep motion-reduce:animate-none dark:bg-deep-light" />
      {STEPS[step % STEPS.length]}…
    </p>
  );
}

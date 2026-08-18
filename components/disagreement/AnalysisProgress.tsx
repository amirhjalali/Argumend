const STEPS = [
  "Separating the voices",
  "Mapping the positions",
  "Finding shared ground",
  "Testing the cruxes",
  "Building the diagnosis",
];

export function AnalysisProgress({ step }: { step: number }) {
  return (
    <p className="text-sm text-[#3a6965]" aria-live="polite">
      {STEPS[step % STEPS.length]}
    </p>
  );
}

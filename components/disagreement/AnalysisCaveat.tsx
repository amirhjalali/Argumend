export function AnalysisCaveat() {
  return (
    <aside className="rounded-md border border-[var(--border-divider)] bg-[var(--bg-muted)] px-5 py-4">
      <h2 className="font-serif text-xl text-[var(--text-heading)]">What this report does not establish</h2>
      <p className="mt-1.5 max-w-[36rem] font-sans text-[0.9375rem] leading-relaxed text-[var(--text-secondary)]">
        This analysis maps the submitted text. It does not independently verify factual claims,
        identify hidden motives, or prove that a participant would endorse every inferred formulation.
      </p>
    </aside>
  );
}

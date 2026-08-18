export function AnalysisCaveat() {
  return (
    <aside className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-muted)] p-4">
      <h2 className="font-serif text-xl text-[var(--text-heading)]">What this report does not establish</h2>
      <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
        This analysis maps the submitted text. It does not independently verify factual claims,
        identify hidden motives, or prove that a participant would endorse every inferred formulation.
      </p>
    </aside>
  );
}

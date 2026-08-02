/** PostgreSQL `uuid` values use the canonical 8-4-4-4-12 hexadecimal form. */
export const ANALYSIS_ID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isAnalysisId(value: string): boolean {
  return ANALYSIS_ID_PATTERN.test(value);
}

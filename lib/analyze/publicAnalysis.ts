type PrivateAnalysisField = "inputContent" | "contentHash" | "userId";

export type PublicAnalysis<T> = T extends Date
  ? T
  : T extends ReadonlyArray<infer Item>
    ? PublicAnalysis<Item>[]
    : T extends Record<string, unknown>
      ? {
          [Key in keyof T as Key extends PrivateAnalysisField
            ? never
            : Key]: PublicAnalysis<T[Key]>;
        }
      : T;

const PRIVATE_ANALYSIS_FIELDS = new Set<string>([
  "inputContent",
  "contentHash",
  "userId",
]);

function projectPublicValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(projectPublicValue);
  }

  if (value instanceof Date || value === null || typeof value !== "object") {
    return value;
  }

  return Object.fromEntries(
    Object.entries(value)
      .filter(([key]) => !PRIVATE_ANALYSIS_FIELDS.has(key))
      .map(([key, nestedValue]) => [key, projectPublicValue(nestedValue)]),
  );
}

/**
 * Defense-in-depth for API serialization. Database queries already select only
 * public columns, but this prevents a future query change from exposing stored
 * source text, content hashes, or ownership identifiers.
 */
export function toPublicAnalysis<T extends Record<string, unknown>>(
  analysis: T
): PublicAnalysis<T> {
  return projectPublicValue(analysis) as PublicAnalysis<T>;
}

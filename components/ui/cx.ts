/** Joins class names, skipping empty values. No merging: callers own conflicts. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

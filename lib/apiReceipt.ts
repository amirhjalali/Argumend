// Plain guards for the small JSON receipts our own API routes send back to
// client components ({ success: true } or { error: "..." }). Client code uses
// these instead of zod: the footer's newsletter form renders on every page,
// and importing zod there shipped ~67KB gzip of it to every first load.
// app/perfContracts.test.ts keeps zod out of the shared shell.

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** True for a `{ success: true }` receipt (extra keys allowed). */
export function isSuccessReceipt(data: unknown): data is { success: true } {
  return isRecord(data) && data.success === true;
}

/** The `error` string of an `{ error: "..." }` receipt, if there is one. */
export function receiptError(data: unknown): string | undefined {
  return isRecord(data) && typeof data.error === "string" ? data.error : undefined;
}

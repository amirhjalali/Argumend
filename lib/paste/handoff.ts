/**
 * The home page's paste box hands its text to /analyze through
 * sessionStorage under this key: `{ content, contentType }`. /analyze reads
 * it once, removes it, and submits it straight away when nothing will leave
 * the server, so a phone visitor presses the button once, not twice.
 */
export const PASTE_PREFILL_KEY = "argumend-analyze-prefill";

// Client-side navigation still works when privacy settings or a full quota
// reject storage. Keep that one handoff in memory until the paste page reads it.
let pendingInMemory: string | null = null;

export function savePastePrefill(value: { content: string; contentType: string }): void {
  const raw = JSON.stringify(value);
  try {
    window.sessionStorage.setItem(PASTE_PREFILL_KEY, raw);
    pendingInMemory = null;
  } catch {
    pendingInMemory = raw;
  }
}

export function readPastePrefill(): string | null {
  if (pendingInMemory !== null) return pendingInMemory;
  try {
    return window.sessionStorage.getItem(PASTE_PREFILL_KEY);
  } catch {
    return null;
  }
}

export function clearPastePrefill(): void {
  pendingInMemory = null;
  try {
    window.sessionStorage.removeItem(PASTE_PREFILL_KEY);
  } catch {
    // The in-memory handoff has still been consumed for this visit.
  }
}

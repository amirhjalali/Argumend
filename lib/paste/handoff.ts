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
let ignoreStoredPrefill = false;

export function savePastePrefill(value: { content: string; contentType: string }): void {
  const raw = JSON.stringify(value);
  try {
    window.sessionStorage.setItem(PASTE_PREFILL_KEY, raw);
    pendingInMemory = null;
    ignoreStoredPrefill = false;
  } catch {
    pendingInMemory = raw;
  }
}

export function readPastePrefill(): string | null {
  if (pendingInMemory !== null) return pendingInMemory;
  if (ignoreStoredPrefill) return null;
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
    ignoreStoredPrefill = false;
  } catch {
    // A failed write may have left an older paste in storage. Do not replay
    // it after the newer in-memory handoff has been consumed.
    ignoreStoredPrefill = true;
  }
}

/**
 * The home page's paste box hands its text to /analyze through
 * sessionStorage under this key: `{ content, contentType }`. /analyze reads
 * it once, removes it, and submits it straight away when nothing will leave
 * the server, so a phone visitor presses the button once, not twice.
 */
export const PASTE_PREFILL_KEY = "argumend-analyze-prefill";

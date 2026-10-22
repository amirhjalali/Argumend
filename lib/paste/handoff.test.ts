import "@/test/setup-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { clearPastePrefill, PASTE_PREFILL_KEY, readPastePrefill, savePastePrefill } from "./handoff";

let storage: Storage;

beforeEach(() => {
  const values = new Map<string, string>();
  storage = {
    getItem: vi.fn((key: string) => values.get(key) ?? null),
    setItem: vi.fn((key: string, value: string) => { values.set(key, value); }),
    removeItem: vi.fn((key: string) => { values.delete(key); }),
    clear: vi.fn(() => values.clear()),
    key: vi.fn((index: number) => [...values.keys()][index] ?? null),
    get length() { return values.size; },
  };
  vi.spyOn(window, "sessionStorage", "get").mockReturnValue(storage);
  clearPastePrefill();
});

afterEach(() => {
  vi.restoreAllMocks();
  clearPastePrefill();
});

describe("paste handoff consumption", () => {
  it("does not replay an older stored paste after a memory handoff when removal fails", () => {
    const oldPaste = { content: "An earlier private argument", contentType: "freeform" };
    const newPaste = { content: "The argument the reader just submitted", contentType: "freeform" };
    storage.setItem(PASTE_PREFILL_KEY, JSON.stringify(oldPaste));
    vi.mocked(storage.setItem).mockImplementation(() => { throw new DOMException("Full", "QuotaExceededError"); });
    vi.mocked(storage.removeItem).mockImplementation(() => { throw new DOMException("Blocked", "SecurityError"); });

    savePastePrefill(newPaste);
    expect(JSON.parse(readPastePrefill()!)).toEqual(newPaste);
    clearPastePrefill();

    expect(storage.setItem).toHaveBeenLastCalledWith(PASTE_PREFILL_KEY, JSON.stringify(newPaste));
    expect(storage.removeItem).toHaveBeenLastCalledWith(PASTE_PREFILL_KEY);
    expect(storage.getItem(PASTE_PREFILL_KEY)).toBe(JSON.stringify(oldPaste));
    expect(readPastePrefill()).toBeNull();
    expect(readPastePrefill()).toBeNull();
  });

  it("accepts a new explicit handoff after a failed removal and storage recovery", () => {
    savePastePrefill({ content: "First argument", contentType: "conversation" });
    const removeNormally = vi.mocked(storage.removeItem).getMockImplementation()!;
    vi.mocked(storage.removeItem).mockImplementation(() => { throw new DOMException("Blocked", "SecurityError"); });
    clearPastePrefill();
    expect(readPastePrefill()).toBeNull();
    vi.mocked(storage.removeItem).mockImplementation(removeNormally);

    const next = { content: "A new explicit submission", contentType: "article" };
    savePastePrefill(next);
    expect(JSON.parse(readPastePrefill()!)).toEqual(next);
    clearPastePrefill();
    expect(readPastePrefill()).toBeNull();
  });
});

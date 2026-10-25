import "@/test/setup-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { copyTextToClipboard } from "./copyToClipboard";

describe("copyTextToClipboard", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    document.body.replaceChildren();
    window.getSelection()?.removeAllRanges();
  });

  it("falls back to selection copy when the Clipboard API rejects", async () => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: vi.fn().mockRejectedValue(new Error("denied")) },
    });
    const fallback = vi.fn().mockReturnValue(true);
    Object.defineProperty(document, "execCommand", {
      configurable: true,
      value: fallback,
    });

    await expect(copyTextToClipboard("safe text")).resolves.toBeUndefined();
    expect(fallback).toHaveBeenCalledWith("copy");
    expect(document.querySelector("textarea")).toBeNull();
  });

  it("rejects when neither copy mechanism succeeds", async () => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: vi.fn().mockRejectedValue(new Error("denied")) },
    });
    Object.defineProperty(document, "execCommand", {
      configurable: true,
      value: vi.fn().mockReturnValue(false),
    });

    await expect(copyTextToClipboard("safe text")).rejects.toThrow(
      "Clipboard copy was rejected",
    );
    expect(document.querySelector("textarea")).toBeNull();
  });

  it.each([true, false])("restores focus and the reader's selection after fallback success=%s", async (succeeds) => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: vi.fn().mockRejectedValue(new Error("denied")) },
    });
    Object.defineProperty(document, "execCommand", {
      configurable: true,
      value: vi.fn().mockReturnValue(succeeds),
    });
    const trigger = document.createElement("button");
    const quote = document.createElement("p");
    quote.textContent = "The question I was reading";
    document.body.append(trigger, quote);
    trigger.focus();
    const selection = window.getSelection()!;
    const range = document.createRange();
    range.selectNodeContents(quote);
    selection.addRange(range);

    // Chrome focuses the temporary textarea and clears the document selection
    // on select(); reproduce that browser behavior in the DOM test environment.
    vi.spyOn(HTMLTextAreaElement.prototype, "select").mockImplementation(function (this: HTMLTextAreaElement) {
      this.focus();
      selection.removeAllRanges();
    });

    if (succeeds) await expect(copyTextToClipboard("safe text")).resolves.toBeUndefined();
    else await expect(copyTextToClipboard("safe text")).rejects.toThrow("Clipboard copy was rejected");

    expect(document.activeElement).toBe(trigger);
    expect(selection.toString()).toBe(quote.textContent);
    expect(document.querySelector("textarea")).toBeNull();
  });
});

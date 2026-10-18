import "@/test/setup-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { copyTextToClipboard } from "./copyToClipboard";

describe("copyTextToClipboard", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    document.body.replaceChildren();
  });

  it("falls back to selection copy when the Clipboard API rejects", async () => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: vi.fn().mockRejectedValue(new Error("denied")) },
    });
    const trigger = document.createElement("button");
    document.body.appendChild(trigger);
    trigger.focus();
    const fallback = vi.fn(() => {
      document.querySelector("textarea")!.focus();
      return true;
    });
    Object.defineProperty(document, "execCommand", {
      configurable: true,
      value: fallback,
    });

    await expect(copyTextToClipboard("safe text")).resolves.toBeUndefined();
    expect(fallback).toHaveBeenCalledWith("copy");
    expect(document.querySelector("textarea")).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it("rejects when neither copy mechanism succeeds", async () => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: vi.fn().mockRejectedValue(new Error("denied")) },
    });
    const trigger = document.createElement("button");
    document.body.appendChild(trigger);
    trigger.focus();
    Object.defineProperty(document, "execCommand", {
      configurable: true,
      value: vi.fn(() => {
        document.querySelector("textarea")!.focus();
        return false;
      }),
    });

    await expect(copyTextToClipboard("safe text")).rejects.toThrow(
      "Clipboard copy was rejected",
    );
    expect(document.querySelector("textarea")).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });
});

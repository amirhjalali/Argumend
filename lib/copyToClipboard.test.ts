import "@/test/setup-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { copyTextToClipboard } from "./copyToClipboard";

describe("copyTextToClipboard", () => {
  afterEach(() => {
    vi.restoreAllMocks();
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
});

import "@/test/setup-dom";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { EmbedButton } from "./EmbedButton";

describe("EmbedButton", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("opens an associated modal dialog, closes with Escape, and restores focus", async () => {
    const view = render(<EmbedButton topicId="topic one" />);
    const trigger = view.getByRole("button", { name: "Embed this topic" });
    trigger.focus();
    fireEvent.click(trigger);

    const dialog = view.getByRole("dialog", { name: "Embed this topic" });
    const close = view.getByRole("button", { name: "Close" });
    await waitFor(() => expect(document.activeElement).toBe(close));
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(trigger.getAttribute("aria-controls")).toBe(dialog.id);

    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() => expect(view.queryByRole("dialog")).toBeNull());
    await waitFor(() => expect(document.activeElement).toBe(trigger));
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
  });

  it("copies a production embed URL with an encoded topic id", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
    const view = render(<EmbedButton topicId="topic one" />);
    fireEvent.click(view.getByRole("button", { name: "Embed this topic" }));
    fireEvent.click(view.getByRole("button", { name: "Copy embed code" }));

    await waitFor(() => expect(writeText).toHaveBeenCalledTimes(1));
    expect(writeText.mock.calls[0]?.[0]).toContain(
      'src="https://argumend.org/embed/topic%20one"',
    );
    expect(view.getByRole("button", { name: "Embed code copied" })).toBeTruthy();
  });

  it("does not claim success when clipboard and fallback copying fail", async () => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: vi.fn().mockRejectedValue(new Error("denied")) },
    });
    Object.defineProperty(document, "execCommand", {
      configurable: true,
      value: vi.fn().mockReturnValue(false),
    });
    const view = render(<EmbedButton topicId="test-topic" />);
    fireEvent.click(view.getByRole("button", { name: "Embed this topic" }));
    fireEvent.click(view.getByRole("button", { name: "Copy embed code" }));

    const alert = await view.findByRole("alert");
    expect(alert.textContent).toContain("could not be copied");
    expect(view.queryByRole("button", { name: "Embed code copied" })).toBeNull();
  });
});

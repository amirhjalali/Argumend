import "@/test/setup-dom";
import { act, cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ShareButtons } from "./ShareButtons";

const URL = "https://argumend.org/topics/nuclear-energy-safety";
const TITLE = "Is nuclear energy safe?";

function mockClipboard(writeText: ReturnType<typeof vi.fn>) {
  Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
}

function mockFallback(succeeds: boolean) {
  const copy = vi.fn().mockReturnValue(succeeds);
  Object.defineProperty(document, "execCommand", { configurable: true, value: copy });
  return copy;
}

describe("ShareButtons copy feedback", () => {
  beforeEach(() => {
    Reflect.deleteProperty(navigator, "share");
  });

  afterEach(() => {
    cleanup();
    Reflect.deleteProperty(navigator, "clipboard");
    Reflect.deleteProperty(document, "execCommand");
    vi.restoreAllMocks();
  });

  it("waits for the clipboard before announcing the link was copied", async () => {
    let finish!: () => void;
    const writeText = vi.fn(() => new Promise<void>((resolve) => { finish = resolve; }));
    mockClipboard(writeText);
    const view = render(<ShareButtons title={TITLE} url={URL} />);

    fireEvent.click(view.getByRole("button", { name: "Copy link" }));
    expect(writeText).toHaveBeenCalledWith(URL);
    expect(view.queryByRole("button", { name: "Link copied" })).toBeNull();
    expect(view.getByRole("status").textContent).toBe("");

    await act(async () => { finish(); });
    expect(view.getByRole("button", { name: "Link copied" })).toBeTruthy();
    expect(view.getByRole("status").textContent).toBe("Link copied!");
  });

  it("uses the selection fallback after an asynchronous clipboard refusal", async () => {
    mockClipboard(vi.fn().mockRejectedValue(new Error("Clipboard permission denied")));
    const fallback = mockFallback(true);
    const view = render(<ShareButtons title={TITLE} url={URL} />);

    fireEvent.click(view.getByRole("button", { name: "Copy link" }));

    await waitFor(() => expect(view.getByRole("status").textContent).toBe("Link copied!"));
    expect(fallback).toHaveBeenCalledWith("copy");
    expect(view.queryByRole("alert")).toBeNull();
    expect(document.querySelector("textarea")).toBeNull();
  });

  it("offers the exact link for manual copying when both copy mechanisms fail, then allows retry", async () => {
    const writeText = vi.fn().mockRejectedValue(new Error("Clipboard permission denied"));
    mockClipboard(writeText);
    mockFallback(false);
    const view = render(<ShareButtons title={TITLE} url={URL} />);

    fireEvent.click(view.getByRole("button", { name: "Copy link" }));

    const alert = await view.findByRole("alert");
    expect(alert.textContent).toContain("The link could not be copied");
    expect(view.queryByRole("button", { name: "Link copied" })).toBeNull();
    expect(view.getByRole("status").textContent).toBe("");
    const manual = view.getByRole("textbox", { name: "Link to copy" }) as HTMLTextAreaElement;
    expect(manual.value).toBe(URL);
    expect(manual.readOnly).toBe(true);
    fireEvent.focus(manual);
    expect(manual.selectionStart).toBe(0);
    expect(manual.selectionEnd).toBe(URL.length);

    writeText.mockResolvedValue(undefined);
    fireEvent.click(view.getByRole("button", { name: "Copy link" }));
    await waitFor(() => expect(view.getByRole("status").textContent).toBe("Link copied!"));
    expect(view.queryByRole("alert")).toBeNull();
    expect(view.queryByRole("textbox")).toBeNull();
  });

  it("handles an unavailable Clipboard API without claiming a rejected fallback worked", async () => {
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: undefined });
    mockFallback(false);
    const view = render(<ShareButtons title={TITLE} url={URL} />);

    fireEvent.click(view.getByRole("button", { name: "Copy link" }));

    expect(await view.findByRole("alert")).toBeTruthy();
    expect(view.getByRole("status").textContent).toBe("");
  });

  it("does not claim the crux was copied when copying fails", async () => {
    const writeText = vi.fn().mockRejectedValue(new Error("Clipboard permission denied"));
    mockClipboard(writeText);
    mockFallback(false);
    const view = render(
      <ShareButtons
        title={TITLE}
        url={URL}
        topicMeta={{
          metaClaim: "Nuclear energy is safe",
          verdictLabel: "Open",
          balance: 50,
          weight: 50,
          status: "contested",
          cruxQuestion: "Which risks count?",
          topicTitle: TITLE,
        }}
      />,
    );

    fireEvent.click(view.getByRole("button", { name: "Copy crux text" }));

    const alert = await view.findByRole("alert");
    expect(alert.textContent).toContain("The crux text could not be copied");
    expect(view.queryByRole("button", { name: "Crux copied" })).toBeNull();
    const manual = view.getByRole("textbox", { name: "Crux text to copy" }) as HTMLTextAreaElement;
    expect(manual.value).toBe(writeText.mock.calls[0][0]);
    expect(manual.value).toContain("Which risks count?");
    expect(manual.value).toContain(URL);

    writeText.mockResolvedValue(undefined);
    fireEvent.click(view.getByRole("button", { name: "Copy crux text" }));
    await waitFor(() => expect(view.getByRole("status").textContent).toBe("Crux copied!"));
    expect(view.queryByRole("alert")).toBeNull();
  });
});

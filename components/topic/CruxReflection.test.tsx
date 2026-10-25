import "@/test/setup-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render } from "@testing-library/react";
import { CruxReflection } from "./CruxReflection";
import * as clipboard from "@/lib/copyToClipboard";

const OPTIONS = [
  {
    id: "crux-a",
    label: "Whether the waste can be stored safely",
    settle: { mode: "evidence" as const, condition: "a sealed repository that holds for a century", resolved: false },
  },
  { id: "crux-b", label: "Whether the plants can be built on time" },
];

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  vi.restoreAllMocks();
});

describe("CruxReflection", () => {
  it("has its live region in the page before the first tap, then announces the answer", async () => {
    const view = render(<CruxReflection topicId="t" options={OPTIONS} />);
    // Present and empty: a status mounted together with its text is often
    // not read out, so the region has to exist before the answer does.
    const status = view.getByRole("status");
    expect(status.textContent).toBe("");

    const first = view.getByRole("button", { name: /plants can be built/ });
    expect(first.getAttribute("aria-pressed")).toBe("false");
    await act(async () => {
      fireEvent.click(first);
    });
    expect(first.getAttribute("aria-pressed")).toBe("true");
    expect(view.getByRole("status")).toBe(status);
    expect(status.textContent).toMatch(/^Noted in this browser only\. The question is ready to open or copy below/);

    await act(async () => {
      fireEvent.click(view.getByRole("button", { name: "A little" }));
    });
    expect(status.textContent).toBe("Kept in this browser only.");
  });

  it("names every option and the follow-up group", async () => {
    const view = render(<CruxReflection topicId="t" options={OPTIONS} />);
    expect(view.getByRole("heading", { level: 2, name: "Which question would change your mind?" })).toBeTruthy();
    expect(view.getByRole("button", { name: /None of these would/ })).toBeTruthy();
    await act(async () => {
      fireEvent.click(view.getByRole("button", { name: /plants can be built/ }));
    });
    const group = view.getByRole("group", {
      name: "Did this change what you thought you were arguing about?",
    });
    expect(group.querySelectorAll("button[aria-pressed]")).toHaveLength(3);
  });

  it("leads somewhere: the picked question's settle line and a link to open it", async () => {
    const view = render(<CruxReflection topicId="t" options={OPTIONS} />);
    expect(view.queryByRole("link", { name: "Open this crux" })).toBeNull();
    await act(async () => {
      fireEvent.click(view.getByRole("button", { name: /waste can be stored/ }));
    });
    expect(view.getByText("What would settle it")).toBeTruthy();
    expect(view.getByText("A sealed repository that holds for a century.")).toBeTruthy();
    expect(view.getByRole("link", { name: "Open this crux" }).getAttribute("href")).toBe("#crux-a");
    expect(view.getByRole("status").textContent).toMatch(/What would settle it is shown below, with a link to open this crux/);

    // "None of these would" has nothing to open.
    await act(async () => {
      fireEvent.click(view.getByRole("button", { name: /None of these would/ }));
    });
    expect(view.queryByRole("link", { name: "Open this crux" })).toBeNull();
  });

  it("never truncates an option", () => {
    const view = render(<CruxReflection topicId="t" options={OPTIONS} />);
    expect(view.container.querySelector("[class*='line-clamp'], [class*='truncate']")).toBeNull();
  });

  it("previews and copies the chosen question with its evidence link, without the reflection answer", async () => {
    const copy = vi.spyOn(clipboard, "copyTextToClipboard").mockResolvedValue();
    const view = render(<CruxReflection topicId="nuclear-energy-safety" options={OPTIONS} />);
    expect(view.queryByRole("button", { name: "Copy this question" })).toBeNull();
    fireEvent.click(view.getByRole("button", { name: /waste can be stored/ }));
    fireEvent.click(view.getByRole("button", { name: "A little" }));
    const expected = [
      "Could we start with this question?",
      OPTIONS[0].label,
      "Read the evidence: https://argumend.org/topics/nuclear-energy-safety#crux-a",
    ].join("\n\n");
    const preview = view.getByText("Preview conversation starter").closest("details")!;
    expect(preview.querySelector("p")?.textContent).toBe(expected);
    await act(async () => fireEvent.click(view.getByRole("button", { name: "Copy this question" })));
    expect(copy).toHaveBeenCalledExactlyOnceWith(expected);
    expect(view.getByRole("button", { name: "Copied" })).toBeTruthy();

    fireEvent.click(view.getByRole("button", { name: /plants can be built/ }));
    expect(view.queryByRole("button", { name: "Copied" })).toBeNull();
    expect(view.getByRole("button", { name: "Copy this question" })).toBeTruthy();
    fireEvent.click(view.getByRole("button", { name: "None of these would" }));
    expect(view.queryByRole("button", { name: "Copy this question" })).toBeNull();
  });

  it("keeps a selectable starter when the clipboard is blocked and clears it for another question", async () => {
    vi.spyOn(clipboard, "copyTextToClipboard").mockRejectedValue(new Error("Blocked"));
    const view = render(<CruxReflection topicId="t" options={OPTIONS} />);
    fireEvent.click(view.getByRole("button", { name: /waste can be stored/ }));
    await act(async () => fireEvent.click(view.getByRole("button", { name: "Copy this question" })));
    const fallback = view.getByRole("textbox", { name: "Question to copy" }) as HTMLTextAreaElement;
    expect(fallback.readOnly).toBe(true);
    expect(fallback.value).toContain(OPTIONS[0].label);
    expect(fallback.value).toContain("https://argumend.org/topics/t#crux-a");
    expect(view.queryByRole("button", { name: "Copied" })).toBeNull();
    fireEvent.click(view.getByRole("button", { name: /plants can be built/ }));
    expect(view.queryByRole("textbox", { name: "Question to copy" })).toBeNull();
  });

  it("does not claim a pending copy succeeded or apply its result to a different question", async () => {
    let finish!: () => void;
    vi.spyOn(clipboard, "copyTextToClipboard").mockImplementation(() => new Promise<void>((resolve) => { finish = resolve; }));
    const view = render(<CruxReflection topicId="t" options={OPTIONS} />);
    fireEvent.click(view.getByRole("button", { name: /waste can be stored/ }));
    fireEvent.click(view.getByRole("button", { name: "Copy this question" }));
    expect(view.queryByRole("button", { name: "Copied" })).toBeNull();
    fireEvent.click(view.getByRole("button", { name: /plants can be built/ }));
    await act(async () => finish());
    expect(view.queryByRole("button", { name: "Copied" })).toBeNull();
    expect(view.getByRole("button", { name: "Copy this question" })).toBeTruthy();
  });
});

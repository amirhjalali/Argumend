import "@/test/setup-dom";
import { StrictMode } from "react";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { INVALID_ANALYZE_RESPONSE_MESSAGE } from "@/lib/analyze/contracts";

vi.mock("next/dynamic", () => ({
  default: () => () => null,
}));

vi.mock("@/components/TopBar", () => ({ TopBar: () => null }));
vi.mock("@/components/Footer", () => ({ Footer: () => null }));
vi.mock("@/components/Sidebar", () => ({ Sidebar: () => null }));
vi.mock("@/hooks/useSidebarState", () => ({
  useSidebarState: () => ({
    isOpen: false,
    mounted: true,
    toggle: vi.fn(),
    close: vi.fn(),
  }),
}));
vi.mock("@/hooks/useMobileSidebarA11y", () => ({
  useMobileSidebarA11y: vi.fn(),
}));
vi.mock("@/lib/analytics", () => ({ trackEvent: vi.fn() }));

import AnalyzePage from "./page";

describe("AnalyzePage response validation", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: true,
        json: async () => ({ unexpected: "shape" }),
      })),
    );
  });

  afterEach(() => {
    cleanup();
    sessionStorage.clear();
    vi.unstubAllGlobals();
  });

  it("consumes a homepage draft exactly once under Strict Mode", async () => {
    sessionStorage.setItem(
      "argumend-analyze-prefill",
      JSON.stringify({
        content: "Supporters favor the proposal; critics oppose it.",
        contentType: "article",
      }),
    );

    const view = render(
      <StrictMode>
        <AnalyzePage />
      </StrictMode>,
    );
    const input = view.getByRole("textbox", { name: "Text to analyze" });

    await waitFor(() => {
      expect((input as HTMLTextAreaElement).value).toBe(
        "Supporters favor the proposal; critics oppose it.",
      );
      expect(
        view.getByRole("button", { name: "Article" }).getAttribute(
          "aria-pressed",
        ),
      ).toBe("true");
    });
    expect(sessionStorage.getItem("argumend-analyze-prefill")).toBeNull();
  });

  it("shows stable user-facing copy for an invalid success response", async () => {
    const view = render(<AnalyzePage />);
    const input = view.getByRole("textbox", { name: "Text to analyze" });

    fireEvent.change(input, {
      target: { value: "Supporters favor it, while critics oppose it." },
    });
    fireEvent.click(view.getByRole("button", { name: /Analyze/ }));

    await waitFor(() => {
      expect(view.getByText(INVALID_ANALYZE_RESPONSE_MESSAGE)).toBeTruthy();
    });
  });

  it("provides associated guidance, format controls, and a visible character limit", () => {
    const view = render(<AnalyzePage />);
    const input = view.getByRole("textbox", { name: "Text to analyze" });

    expect(view.getByRole("group", { name: "Content format" })).toBeTruthy();
    expect(view.getByRole("button", { name: "Freeform" }).getAttribute("aria-pressed")).toBe("true");
    expect(input.getAttribute("aria-describedby")).toContain("analyze-content-help");
    expect((view.getByLabelText("Upload") as HTMLInputElement).type).toBe("file");
    expect(view.getByText("0 / 50,000 characters")).toBeTruthy();

    fireEvent.change(input, { target: { value: "A short argument." } });
    expect(view.getByText("17 / 50,000 characters")).toBeTruthy();
  });

  it("gives every primary mobile form control a 44px minimum target", () => {
    const view = render(<AnalyzePage />);

    for (const format of ["Freeform", "Article", "Transcript"]) {
      expect(
        view.getByRole("button", { name: format }).className,
      ).toContain("min-h-11");
    }
    expect(
      view.getByRole("button", { name: "Try an Example" }).className,
    ).toContain("min-h-11");

    const upload = view.getByLabelText("Upload");
    expect(upload.closest("label")?.className).toContain("min-h-11");
    const judging = view.getByRole("checkbox", {
      name: "Include Programmatic Judgment",
    });
    expect(judging.closest("label")?.className).toContain("min-h-11");
  });

  it("focuses an actionable validation message for an empty submission", async () => {
    const view = render(<AnalyzePage />);
    fireEvent.submit(view.getByRole("form", { name: "Argument analysis form" }));

    const alert = await view.findByRole("alert");
    expect(alert.textContent).toContain("Paste something first");
    expect(document.activeElement).toBe(alert);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("announces loading, disables editing, and prevents duplicate submissions", async () => {
    let resolveFetch: ((value: unknown) => void) | undefined;
    const fetchMock = vi.fn(
      () => new Promise((resolve) => { resolveFetch = resolve; }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const view = render(<AnalyzePage />);
    const input = view.getByRole("textbox", { name: "Text to analyze" });
    fireEvent.change(input, { target: { value: "Supporters favor it; critics oppose it." } });
    const submit = view.getByRole("button", { name: /Analyze/ });
    fireEvent.click(submit);
    fireEvent.click(submit);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(view.getByRole("form", { name: "Argument analysis form" }).getAttribute("aria-busy")).toBe("true");
    expect((input as HTMLTextAreaElement).disabled).toBe(true);
    expect(view.getByRole("status").textContent).toContain("Reading the text");

    resolveFetch?.({
      ok: true,
      json: async () => ({
        extracted: {
          topic: "Whether the proposal should pass",
          summary: "The text contains opposing views.",
          positions: [],
          identifiedCruxes: [],
          potentialFallacies: [],
          detectedBiases: [],
          confidence: 0.5,
        },
        judgingResult: null,
        execution: {
          analysis: { requested: "offline", actual: "offline" },
          judging: { requested: "offline", actual: "skipped", fallbackCode: "JUDGING_NO_ARGUMENTS" },
        },
      }),
    });

    await waitFor(() => expect(view.getByRole("heading", { name: "Results" })).toBeTruthy());
  });

  it("cancels an in-flight analysis, preserves the draft, and returns focus", async () => {
    const fetchMock = vi.fn(
      (_input: RequestInfo | URL, init?: RequestInit) =>
        new Promise((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () => {
            const error = new Error("cancelled");
            error.name = "AbortError";
            reject(error);
          });
        }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const view = render(<AnalyzePage />);
    const input = view.getByRole("textbox", { name: "Text to analyze" });
    fireEvent.change(input, { target: { value: "Keep this argument after cancellation." } });
    fireEvent.click(view.getByRole("button", { name: /Analyze/ }));
    fireEvent.click(view.getByRole("button", { name: "Cancel analysis" }));

    await waitFor(() => {
      expect(view.getByRole("status").textContent).toContain("Analysis cancelled");
      expect(document.activeElement).toBe(input);
    });
    expect((input as HTMLTextAreaElement).disabled).toBe(false);
    expect((input as HTMLTextAreaElement).value).toBe("Keep this argument after cancellation.");
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("focuses completed results and renders meaningful empty states", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: true,
        json: async () => ({
          extracted: {
            topic: "A one-sided claim",
            summary: "No structured disagreement was present.",
            positions: [],
            identifiedCruxes: [],
            potentialFallacies: [],
            detectedBiases: [],
            confidence: 0.25,
          },
          judgingResult: null,
          execution: {
            analysis: { requested: "offline", actual: "offline" },
            judging: { requested: "disabled", actual: "disabled" },
          },
        }),
      })),
    );

    const view = render(<AnalyzePage />);
    fireEvent.change(view.getByRole("textbox", { name: "Text to analyze" }), {
      target: { value: "This is a one-sided claim." },
    });
    fireEvent.click(view.getByRole("button", { name: /Analyze/ }));

    const heading = await view.findByRole("heading", { name: "Results" });
    await waitFor(() => expect(document.activeElement).toBe(heading));
    expect(view.getByText(/No clear positions found/)).toBeTruthy();
    expect(view.getByText("No clear point of disagreement was found in this text.")).toBeTruthy();
    expect(view.getByText("No potential fallacies were identified in this analysis.")).toBeTruthy();
    expect(view.getByText("Extraction confidence: 25%")).toBeTruthy();
    expect(view.getByText("Session-only report — not saved")).toBeTruthy();

    fireEvent.click(view.getByRole("button", { name: /Edit input or analyze another/ }));
    const restoredInput = view.getByRole("textbox", { name: "Text to analyze" });
    await waitFor(() => expect(document.activeElement).toBe(restoredInput));
  });

  it("uses a safe actionable message for server failures and preserves input", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: false,
        status: 500,
        json: async () => ({ details: "sensitive provider stack trace" }),
      })),
    );

    const view = render(<AnalyzePage />);
    const input = view.getByRole("textbox", { name: "Text to analyze" });
    fireEvent.change(input, { target: { value: "Please preserve this argument." } });
    fireEvent.click(view.getByRole("button", { name: /Analyze/ }));

    const alert = await view.findByRole("alert");
    expect(alert.textContent).toContain("temporarily unavailable");
    expect(alert.textContent).not.toContain("stack trace");
    expect((input as HTMLTextAreaElement).value).toBe("Please preserve this argument.");
    await waitFor(() => expect(document.activeElement).toBe(alert));

    fireEvent.click(view.getByRole("button", { name: "Dismiss" }));
    await waitFor(() => expect(document.activeElement).toBe(input));
    expect(input.getAttribute("aria-invalid")).toBe("false");
  });
});

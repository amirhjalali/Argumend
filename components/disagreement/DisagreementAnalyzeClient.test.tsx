import "@/test/setup-dom";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DISAGREEMENT_EXAMPLE_SOURCE } from "@/lib/disagreement/constants";
import { DISAGREEMENT_FEW_SHOT_EXAMPLES } from "@/lib/disagreement/prompts/v1/examples";
import { FakeDisagreementProvider } from "@/lib/disagreement/model/fake";
import { analyzeDisagreement } from "@/lib/disagreement/analyze";

vi.mock("@/lib/analytics", () => ({ trackEvent: vi.fn() }));

import { DisagreementAnalyzeClient } from "./DisagreementAnalyzeClient";

describe("DisagreementAnalyzeClient", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("loads the example and renders a diagnosis from the API", async () => {
    const example = DISAGREEMENT_FEW_SHOT_EXAMPLES[1];
    const bundle = await analyzeDisagreement({
      content: `${example.source}\n\n${"Context for length. ".repeat(8)}`,
      contentType: "conversation",
      requestId: "11111111-1111-1111-1111-111111111111",
      provider: new FakeDisagreementProvider(example.extraction),
    });

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({
        report: bundle.report,
        graph: bundle.graph,
        execution: bundle.execution,
        publishing: { available: false, unavailableReason: "Publishing is not configured." },
      }),
    } as Response);

    const view = render(<DisagreementAnalyzeClient />);
    fireEvent.click(view.getByRole("button", { name: "Use example" }));
    expect((view.getByLabelText("Disagreement text") as HTMLTextAreaElement).value).toContain(
      DISAGREEMENT_EXAMPLE_SOURCE.slice(0, 20),
    );

    fireEvent.click(view.getByRole("button", { name: "Find the crux" }));

    await waitFor(() => {
      expect(view.getByText("ARGUMEND DIAGNOSIS")).toBeTruthy();
    });
    expect(view.getByText("What this report does not establish")).toBeTruthy();
    expect(view.queryByText(/winner/i)).toBeNull();
    expect(fetch).toHaveBeenCalledWith(
      "/api/disagreements/analyze",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("keeps the input editable after a typed error", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      json: async () => ({
        error: "The analysis timed out. Please try again.",
        code: "MODEL_TIMEOUT",
      }),
    } as Response);

    const view = render(<DisagreementAnalyzeClient />);
    fireEvent.change(view.getByLabelText("Disagreement text"), {
      target: { value: DISAGREEMENT_EXAMPLE_SOURCE },
    });
    fireEvent.click(view.getByRole("button", { name: "Find the crux" }));

    await waitFor(() => {
      expect(view.getByText("The analysis timed out. Please try again.")).toBeTruthy();
    });
    const input = view.getByLabelText("Disagreement text") as HTMLTextAreaElement;
    expect(input.disabled).toBe(false);
    expect(input.value).toContain("Immigration");
    expect(view.getByText("Try the limited local parser")).toBeTruthy();
  });
});

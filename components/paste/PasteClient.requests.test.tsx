import "@/test/setup-dom";
import { act, cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { trackEvent } from "@/lib/analytics";
import { DISAGREEMENT_EXAMPLE_SOURCE } from "@/lib/disagreement/constants";
import { findMaps } from "@/lib/paste/maps";
import type { PasteLanes, PasteMapsResult } from "@/lib/paste/types";
import { clearWorkingPaste, PasteClient } from "./PasteClient";

vi.mock("@/lib/analytics", () => ({ trackEvent: vi.fn() }));

const HOSTED: PasteLanes = {
  maps: true,
  diagnosis: { enabled: true, providerIds: ["anthropic"], fixtures: false },
};
const OFFLINE: PasteLanes = { maps: true, diagnosis: { enabled: false } };

interface PendingRequest {
  url: string;
  signal?: AbortSignal | null;
  resolve: (response: Response) => void;
}

let maps: PasteMapsResult;
let requests: PendingRequest[];

beforeAll(async () => {
  maps = await findMaps(DISAGREEMENT_EXAMPLE_SOURCE);
}, 60_000);

beforeEach(() => {
  clearWorkingPaste();
  requests = [];
  sessionStorage.clear();
  vi.mocked(trackEvent).mockClear();
  // Deliberately ignore cancellation, like a response whose body is already
  // being decoded, to exercise the stale-result guard as well as the signal.
  vi.stubGlobal("fetch", vi.fn((url: string, init?: RequestInit) => new Promise<Response>((resolve) => {
    requests.push({ url, signal: init?.signal, resolve });
  })));
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

function submit(view: ReturnType<typeof render>) {
  fireEvent.click(view.getByRole("button", { name: "See an example" }));
  fireEvent.click(view.getByRole("button", { name: "Find what it turns on" }));
}

async function reply(request: PendingRequest, body: unknown, ok = true) {
  await act(async () => {
    request.resolve({ ok, json: async () => body } as Response);
  });
}

describe("paste request lifecycle", () => {
  it.each([OFFLINE, HOSTED])("cancels every active lane when the page unmounts", (lanes) => {
    const view = render(<PasteClient lanes={lanes} />);
    submit(view);
    expect(requests).toHaveLength(lanes.diagnosis.enabled ? 2 : 1);
    for (const request of requests) expect(request.signal?.aborted).toBe(false);

    view.unmount();

    for (const request of requests) expect(request.signal?.aborted).toBe(true);
  });

  it("cancels both active lanes when the server changes the lane configuration", async () => {
    const view = render(<PasteClient lanes={HOSTED} />);
    submit(view);
    expect(requests).toHaveLength(2);

    view.rerender(<PasteClient lanes={OFFLINE} />);

    for (const request of requests) expect(request.signal?.aborted).toBe(true);
    await waitFor(() => expect((view.getByLabelText("The argument to read") as HTMLTextAreaElement).value).toBe(""));
    await reply(requests[0], { maps });
    await reply(requests[1], { error: "Old provider result", code: "PROVIDER_ERROR" }, false);
    expect(view.queryByRole("region", { name: "Result" })).toBeNull();
    expect(vi.mocked(trackEvent).mock.calls.some(([event]) => event.action === "disagreement_analysis_failed")).toBe(false);
  });

  it("cancels a pending diagnosis when the reader starts another paste", async () => {
    const view = render(<PasteClient lanes={HOSTED} />);
    submit(view);
    await reply(requests[0], { maps });
    await waitFor(() => view.getByRole("button", { name: "Paste another" }));

    fireEvent.click(view.getByRole("button", { name: "Paste another" }));

    expect(requests[1].signal?.aborted).toBe(true);
    await reply(requests[1], { error: "Late provider error", code: "PROVIDER_ERROR" }, false);
    expect(view.queryByText(/Late provider error/)).toBeNull();
    expect(vi.mocked(trackEvent).mock.calls.some(([event]) => event.action === "disagreement_analysis_failed")).toBe(false);
    expect((view.getByLabelText("The argument to read") as HTMLTextAreaElement).value).toBe("");
  });

  it("cancels the previous run when edited text is submitted and ignores its late diagnosis", async () => {
    const view = render(<PasteClient lanes={HOSTED} />);
    submit(view);
    await reply(requests[0], { maps });
    await waitFor(() => view.getByRole("button", { name: "Edit" }));
    fireEvent.click(view.getByRole("button", { name: "Edit" }));
    fireEvent.click(view.getByRole("button", { name: "Find what it turns on" }));

    expect(requests).toHaveLength(4);
    expect(requests[1].signal?.aborted).toBe(true);
    expect(requests[2].signal?.aborted).toBe(false);
    expect(requests[3].signal?.aborted).toBe(false);
    await reply(requests[1], { error: "Stale error", code: "PROVIDER_ERROR" }, false);
    expect(vi.mocked(trackEvent).mock.calls.some(([event]) => event.action === "disagreement_analysis_failed")).toBe(false);
    expect(view.queryByText(/Stale error/)).toBeNull();
  });

  it("does not record a late diagnosis as a completed analysis after navigation", async () => {
    const view = render(<PasteClient lanes={HOSTED} />);
    submit(view);
    view.unmount();

    await reply(requests[1], {
      report: { diagnosis: { pattern: "mixed" }, positions: [], cruxes: [] },
      graph: {},
    });

    expect(vi.mocked(trackEvent).mock.calls.some(([event]) => event.action === "disagreement_analysis_completed")).toBe(false);
  });
});

import "@/test/setup-dom";
import { act, cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { trackEvent } from "@/lib/analytics";
import { RepresentationFeedback } from "./RepresentationFeedback";

vi.mock("@/lib/analytics", () => ({ trackEvent: vi.fn() }));

describe("RepresentationFeedback submission", () => {
  beforeEach(() => {
    const values = new Map<string, string>();
    Object.defineProperty(window, "sessionStorage", {
      configurable: true,
      value: {
        getItem: (key: string) => values.get(key) ?? null,
        setItem: (key: string, value: string) => values.set(key, value),
      },
    });
    vi.stubGlobal("fetch", vi.fn());
    vi.mocked(trackEvent).mockClear();
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it.each([404, 429, 500])("does not claim feedback was saved after HTTP %i", async (status) => {
    vi.mocked(fetch).mockResolvedValue(Response.json({ error: "Unavailable" }, { status }));
    const view = render(<RepresentationFeedback slug="example" section="overall" />);

    fireEvent.click(view.getByRole("button", { name: "Yes" }));

    await waitFor(() => expect(view.queryByText("Saved privately. Thank you.")).toBeNull());
    expect(await view.findByRole("alert")).toBeTruthy();
    expect(trackEvent).not.toHaveBeenCalled();
  });

  it("offers an explicit way to save a typed correction", async () => {
    vi.mocked(fetch).mockImplementation(async () => Response.json({ ok: true }));
    const view = render(<RepresentationFeedback slug="example" section="position" targetId="position-1" />);
    fireEvent.click(view.getByRole("button", { name: "No" }));
    await view.findByText("Saved privately. Thank you.");

    fireEvent.change(view.getByRole("textbox", { name: "Optional correction" }), {
      target: { value: "The position is about timing, not the goal." },
    });
    expect(view.queryByText("Saved privately. Thank you.")).toBeNull();
    fireEvent.click(view.getByRole("button", { name: "Save correction" }));
    await view.findByText("Saved privately. Thank you.");

    const body = JSON.parse(vi.mocked(fetch).mock.calls[1][1]!.body as string);
    expect(body).toMatchObject({
      section: "position", targetId: "position-1", vote: "inaccurate",
      correction: "The position is about timing, not the goal.",
    });
  });

  it("waits for confirmation and prevents duplicate submissions while pending", async () => {
    let finish!: (response: Response) => void;
    vi.mocked(fetch).mockImplementation(() => new Promise((resolve) => { finish = resolve; }));
    const view = render(<RepresentationFeedback slug="example" section="overall" />);
    const yes = view.getByRole("button", { name: "Yes" }) as HTMLButtonElement;

    fireEvent.click(yes);
    expect(yes.disabled).toBe(true);
    expect(view.queryByText("Saved privately. Thank you.")).toBeNull();
    fireEvent.click(yes);
    expect(fetch).toHaveBeenCalledTimes(1);
    await act(async () => finish(Response.json({ ok: true })));
    expect(yes.disabled).toBe(false);
    expect(view.getByRole("status").textContent).toBe("Saved privately. Thank you.");
  });

  it("keeps a correction available to retry after a connection failure", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(Response.json({ ok: true }));
    const view = render(<RepresentationFeedback slug="example" section="overall" />);
    fireEvent.click(view.getByRole("button", { name: "Mostly" }));
    await view.findByText("Saved privately. Thank you.");
    const correction = view.getByRole("textbox", { name: "Optional correction" }) as HTMLTextAreaElement;
    fireEvent.change(correction, { target: { value: "This misses a qualification." } });

    vi.mocked(fetch).mockRejectedValueOnce(new TypeError("Failed to fetch"));
    fireEvent.click(view.getByRole("button", { name: "Save correction" }));
    await view.findByRole("alert");
    expect(correction.value).toBe("This misses a qualification.");
    expect(view.queryByText("Saved privately. Thank you.")).toBeNull();

    vi.mocked(fetch).mockResolvedValueOnce(Response.json({ ok: true }));
    fireEvent.click(view.getByRole("button", { name: "Save correction" }));
    await view.findByText("Saved privately. Thank you.");
    expect(view.queryByRole("alert")).toBeNull();
  });

  it("retains an anonymous session for retries when browser storage is blocked", async () => {
    Object.defineProperty(window, "sessionStorage", {
      configurable: true,
      get: () => { throw new DOMException("Blocked", "SecurityError"); },
    });
    vi.mocked(fetch).mockImplementation(async () => Response.json({ ok: true }));
    const view = render(<RepresentationFeedback slug="example" section="overall" />);

    fireEvent.click(view.getByRole("button", { name: "Yes" }));
    await view.findByText("Saved privately. Thank you.");
    fireEvent.click(view.getByRole("button", { name: "No" }));
    await view.findByText("Saved privately. Thank you.");

    const bodies = vi.mocked(fetch).mock.calls.map(([, init]) => JSON.parse(init!.body as string));
    expect(bodies[0].anonymousSessionId).toEqual(expect.any(String));
    expect(bodies[0].anonymousSessionId.length).toBeGreaterThan(0);
    expect(bodies[1].anonymousSessionId).toBe(bodies[0].anonymousSessionId);
  });

  it("does not trust a successful HTTP response without a valid confirmation", async () => {
    vi.mocked(fetch).mockResolvedValue(Response.json({ ok: false }));
    const view = render(<RepresentationFeedback slug="example" section="overall" />);
    fireEvent.click(view.getByRole("button", { name: "Yes" }));
    await view.findByRole("alert");
    expect(view.queryByText("Saved privately. Thank you.")).toBeNull();
    expect(trackEvent).not.toHaveBeenCalled();
  });
});

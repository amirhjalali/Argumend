import "@/test/setup-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { trackEvent } from "@/lib/analytics";
import { NewsletterSignup } from "./NewsletterSignup";

vi.mock("@/lib/analytics", () => ({ trackEvent: vi.fn() }));

describe("NewsletterSignup", () => {
  it("dispatches one signup while an earlier submission is pending", () => {
    vi.mocked(fetch).mockImplementation(() => new Promise(() => undefined));
    const view = render(<NewsletterSignup />);
    fireEvent.change(view.getByLabelText("Email address"), { target: { value: "reader@example.com" } });
    const form = view.getByRole("form", { name: "Newsletter signup" });
    act(() => {
      form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
      form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    });
    expect(fetch).toHaveBeenCalledOnce();
  });
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
    vi.mocked(trackEvent).mockClear();
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("sends the placement source and shows a truthful stored-success message", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "content-type": "application/json" },
      })
    );
    const view = render(<NewsletterSignup variant="compact" source="footer" />);

    fireEvent.change(view.getByLabelText("Email address"), {
      target: { value: "reader@example.com" },
    });
    fireEvent.submit(view.getByRole("form", { name: "Footer newsletter signup" }));

    await waitFor(() => {
      expect(view.getByText(/you.re subscribed/i)).toBeTruthy();
    });
    expect(view.getByRole("status").getAttribute("aria-live")).toBe("polite");
    const init = vi.mocked(fetch).mock.calls[0][1] as RequestInit;
    expect(JSON.parse(String(init.body))).toEqual({
      email: "reader@example.com",
      source: "footer",
    });
  });

  it("keeps the form available when durable storage is unavailable", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          error: "Newsletter signup is temporarily unavailable. Please try again later.",
        }),
        { status: 503, headers: { "content-type": "application/json" } }
      )
    );
    const view = render(<NewsletterSignup />);

    fireEvent.change(view.getByLabelText("Email address"), {
      target: { value: "reader@example.com" },
    });
    fireEvent.submit(view.getByRole("form", { name: "Newsletter signup" }));

    await waitFor(() => {
      expect(view.getByRole("alert").textContent).toMatch(/temporarily unavailable/i);
    });
    const input = view.getByLabelText("Email address");
    expect(input.getAttribute("aria-describedby")).toBe(
      view.getByRole("alert").id,
    );
  });

  it.each([{}, { success: false }, { success: "true" }, null])("does not confirm an invalid success receipt %j", async (body) => {
    vi.mocked(fetch).mockResolvedValueOnce(new Response(JSON.stringify(body), { status: 200 }));
    const view = render(<NewsletterSignup />);
    fireEvent.change(view.getByLabelText("Email address"), { target: { value: "reader@example.com" } });
    fireEvent.submit(view.getByRole("form", { name: "Newsletter signup" }));

    await waitFor(() => expect(view.getByRole("alert").textContent).toMatch(/try again/i));
    expect(view.queryByText(/you.re subscribed/i)).toBeNull();
    expect((view.getByLabelText("Email address") as HTMLInputElement).value).toBe("reader@example.com");
    expect(trackEvent).not.toHaveBeenCalled();
  });

  it("handles a non-text API error and lets the reader retry", async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce(new Response(JSON.stringify({ error: { detail: "Unavailable" } }), { status: 503 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ success: true }), { status: 200 }));
    const view = render(<NewsletterSignup />);
    fireEvent.change(view.getByLabelText("Email address"), { target: { value: "reader@example.com" } });
    fireEvent.submit(view.getByRole("form", { name: "Newsletter signup" }));
    await waitFor(() => expect(view.getByRole("alert").textContent).toMatch(/try again/i));
    expect(trackEvent).not.toHaveBeenCalled();

    fireEvent.submit(view.getByRole("form", { name: "Newsletter signup" }));
    await waitFor(() => expect(view.getByRole("status").textContent).toMatch(/you.re subscribed/i));
    expect(trackEvent).toHaveBeenCalledTimes(1);
  });

  it("uses unique error relationships when multiple forms share a page", async () => {
    const view = render(
      <>
        <NewsletterSignup variant="compact" />
        <NewsletterSignup source="footer" />
      </>,
    );
    const inputs = view.getAllByLabelText("Email address");

    for (const input of inputs) {
      fireEvent.change(input, { target: { value: "invalid" } });
    }
    for (const form of view.getAllByRole("form", { name: /newsletter signup/i })) {
      fireEvent.submit(form);
    }

    const errorIds = inputs.map((input) => input.getAttribute("aria-describedby"));
    expect(new Set(errorIds).size).toBe(2);
    for (const errorId of errorIds) expect(document.getElementById(errorId ?? "")).toBeTruthy();
  });

  it("distinguishes newsletter landmarks when article and footer forms share a page", () => {
    const view = render(
      <>
        <NewsletterSignup variant="compact" />
        <NewsletterSignup variant="compact" source="footer" />
      </>,
    );

    expect(view.getByRole("form", { name: "Article newsletter signup" })).toBeTruthy();
    expect(view.getByRole("form", { name: "Footer newsletter signup" })).toBeTruthy();
  });

  it("keeps both form controls at least 44px tall", () => {
    const view = render(<NewsletterSignup variant="compact" />);

    expect(view.getByLabelText("Email address").className).toContain("min-h-11");
    expect(view.getByRole("button", { name: "Subscribe" }).className).toContain(
      "min-h-11",
    );
  });

  it("draws Subscribe in ink, leaving rust to the page's one primary action", () => {
    const view = render(<NewsletterSignup variant="compact" />);
    const button = view.getByRole("button", { name: "Subscribe" });

    expect(button.className).toContain("bg-primary");
    expect(button.className).not.toMatch(/\brust-/);
  });
});

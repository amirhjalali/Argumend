import "@/test/setup-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { NewsletterSignup } from "./NewsletterSignup";

vi.mock("@/lib/analytics", () => ({ trackEvent: vi.fn() }));

describe("NewsletterSignup", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
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
});

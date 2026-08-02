import "@/test/setup-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { SubscribeButton } from "./SubscribeButton";

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

describe("SubscribeButton", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
    delete process.env.NEXT_PUBLIC_ENABLE_AUTH;
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("renders nothing and performs no request while auth features are off", () => {
    const view = render(<SubscribeButton topicId="ai-risk" />);

    expect(view.container.textContent).toBe("");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("offers a real sign-in link to anonymous visitors when enabled", async () => {
    vi.stubEnv("NEXT_PUBLIC_ENABLE_AUTH", "true");
    vi.mocked(fetch).mockResolvedValueOnce(
      jsonResponse({
        authenticated: false,
        subscribed: false,
        subscriberCount: 12,
      }),
    );

    const view = render(<SubscribeButton topicId="ai-risk" />);
    const link = await view.findByRole("link", { name: /sign in to follow/i });

    expect(link.getAttribute("href")).toBe("/auth/signin");
    expect(link.textContent).toContain("12");
  });

  it("updates authenticated follow state only after the API confirms it", async () => {
    vi.stubEnv("NEXT_PUBLIC_ENABLE_AUTH", "true");
    vi.mocked(fetch)
      .mockResolvedValueOnce(
        jsonResponse({
          authenticated: true,
          subscribed: false,
          subscriberCount: 4,
        }),
      )
      .mockResolvedValueOnce(
        jsonResponse({
          authenticated: true,
          subscribed: true,
          subscriberCount: 5,
        }),
      );

    const view = render(<SubscribeButton topicId="ai-risk" />);
    const button = await view.findByRole("button", { name: /follow 4/i });
    expect(button.getAttribute("aria-pressed")).toBe("false");

    fireEvent.click(button);
    await waitFor(() => {
      expect(view.getByRole("button", { name: /following 5/i })).toBeTruthy();
    });

    const init = vi.mocked(fetch).mock.calls[1][1] as RequestInit;
    expect(JSON.parse(String(init.body))).toEqual({
      topicId: "ai-risk",
      subscribe: true,
    });
  });

  it("offers a retry when status cannot be loaded", async () => {
    vi.stubEnv("NEXT_PUBLIC_ENABLE_AUTH", "true");
    vi.mocked(fetch).mockResolvedValueOnce(
      jsonResponse({ error: "unavailable" }, 503),
    );

    const view = render(<SubscribeButton topicId="ai-risk" />);

    expect(
      await view.findByRole("button", { name: /retry follow status/i }),
    ).toBeTruthy();
    expect(view.getByRole("alert").textContent).toMatch(/temporarily unavailable/i);
  });

  it("preserves confirmed state when an update fails", async () => {
    vi.stubEnv("NEXT_PUBLIC_ENABLE_AUTH", "true");
    vi.mocked(fetch)
      .mockResolvedValueOnce(
        jsonResponse({
          authenticated: true,
          subscribed: true,
          subscriberCount: 5,
        }),
      )
      .mockResolvedValueOnce(
        jsonResponse({ error: "unavailable" }, 503),
      );

    const view = render(<SubscribeButton topicId="ai-risk" />);
    fireEvent.click(await view.findByRole("button", { name: /following 5/i }));

    await waitFor(() => {
      expect(view.getByRole("alert").textContent).toMatch(/was not changed/i);
    });
    expect(view.getByRole("button", { name: /following 5/i })).toBeTruthy();
  });
});

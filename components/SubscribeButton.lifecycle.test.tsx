import "@/test/setup-dom";
import { act, cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SubscribeButton } from "./SubscribeButton";

const followed = { authenticated: true, subscribed: true, subscriberCount: 99 };
const unfollowed = { authenticated: true, subscribed: false, subscriberCount: 2 };

beforeEach(() => {
  vi.stubEnv("NEXT_PUBLIC_ENABLE_AUTH", "true");
  vi.stubGlobal("fetch", vi.fn());
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.unstubAllEnvs(); });

describe("follow request ownership", () => {
  it("ignores an old topic status body delivered after navigation", async () => {
    let finish!: (body: unknown) => void;
    const json = vi.fn(() => new Promise((resolve) => { finish = resolve; }));
    vi.mocked(fetch)
      .mockResolvedValueOnce({ ok: true, json } as unknown as Response)
      .mockResolvedValueOnce(Response.json(unfollowed));
    const view = render(<SubscribeButton topicId="ai-risk" />);
    await act(async () => undefined);
    expect(json).toHaveBeenCalledOnce();
    view.rerender(<SubscribeButton topicId="nuclear-energy-safety" />);
    await view.findByRole("button", { name: "Follow 2" });
    await act(async () => finish(followed));
    expect(view.getByRole("button", { name: "Follow 2" })).toBeTruthy();
  });

  it("ignores an old topic mutation receipt delivered after navigation", async () => {
    let finish!: (response: Response) => void;
    vi.mocked(fetch)
      .mockResolvedValueOnce(Response.json(unfollowed))
      .mockImplementationOnce(() => new Promise((resolve) => { finish = resolve; }))
      .mockResolvedValueOnce(Response.json(unfollowed));
    const view = render(<SubscribeButton topicId="ai-risk" />);
    fireEvent.click(await view.findByRole("button", { name: "Follow 2" }));
    view.rerender(<SubscribeButton topicId="nuclear-energy-safety" />);
    await act(async () => undefined);
    await act(async () => finish(Response.json(followed)));
    expect(view.getByRole("button", { name: "Follow 2" })).toBeTruthy();
  });

  it("does not use a previous topic's status after the new topic fails to load", async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce(Response.json(followed))
      .mockResolvedValueOnce(Response.json({ error: "Unavailable" }, { status: 503 }));
    const view = render(<SubscribeButton topicId="ai-risk" />);
    await view.findByRole("button", { name: "Following 99" });
    view.rerender(<SubscribeButton topicId="nuclear-energy-safety" />);
    expect(await view.findByRole("button", { name: "Retry follow status" })).toBeTruthy();
    expect(view.queryByRole("button", { name: "Following 99" })).toBeNull();
  });

  it("dispatches a single follow change before React updates the disabled state", async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce(Response.json(unfollowed))
      .mockImplementation(() => new Promise(() => undefined));
    const view = render(<SubscribeButton topicId="ai-risk" />);
    const button = await view.findByRole("button", { name: "Follow 2" });
    act(() => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it("recognizes a signed-out response even when its body is empty", async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce(Response.json(unfollowed))
      .mockResolvedValueOnce(new Response(null, { status: 401 }));
    const view = render(<SubscribeButton topicId="ai-risk" />);
    fireEvent.click(await view.findByRole("button", { name: "Follow 2" }));
    expect(await view.findByRole("link", { name: /Sign in to follow/ })).toBeTruthy();
  });
});

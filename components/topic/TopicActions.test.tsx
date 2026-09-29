import "@/test/setup-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render } from "@testing-library/react";
import { ShareTopicButton } from "./TopicActions";

function mockShare(error: { name: string } | null) {
  const share = vi.fn(() => (error ? Promise.reject(error) : Promise.resolve()));
  Object.defineProperty(navigator, "share", { configurable: true, value: share });
  return share;
}

afterEach(() => {
  cleanup();
  Reflect.deleteProperty(navigator, "share");
});

describe("ShareTopicButton", () => {
  it("does nothing more when the visitor cancels the native share sheet", async () => {
    const share = mockShare({ name: "AbortError" });
    const view = render(<ShareTopicButton title="A map" url="https://argumend.org/topics/x" />);
    await act(async () => {
      fireEvent.click(view.getByRole("button", { name: "Share" }));
    });
    expect(share).toHaveBeenCalledWith({ title: "A map", url: "https://argumend.org/topics/x" });
    expect(view.queryByRole("group", { name: "Share this map" })).toBeNull();
  });

  it("offers the copy-link panel when the share sheet is refused", async () => {
    mockShare({ name: "NotAllowedError" });
    const view = render(<ShareTopicButton title="A map" url="https://argumend.org/topics/x" />);
    await act(async () => {
      fireEvent.click(view.getByRole("button", { name: "Share" }));
    });
    expect(view.getByRole("group", { name: "Share this map" })).toBeTruthy();
  });
});

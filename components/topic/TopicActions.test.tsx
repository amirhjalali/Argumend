import "@/test/setup-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { ShareTopicButton, TopicActions } from "./TopicActions";
import { useModalAccessibility } from "@/hooks/useModalAccessibility";

function mockResizableViewport(initialDesktop: boolean) {
  let desktop = initialDesktop;
  const listeners = new Set<() => void>();
  vi.spyOn(window, "matchMedia").mockImplementation((query: string) => ({
    matches: query === "(min-width: 1024px)" ? desktop : false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: (_type: string, listener: () => void) => listeners.add(listener),
    removeEventListener: (_type: string, listener: () => void) => listeners.delete(listener),
    dispatchEvent: vi.fn(),
  }) as unknown as MediaQueryList);
  return (next: boolean) => {
    desktop = next;
    act(() => listeners.forEach((listener) => listener()));
  };
}

function ResponsiveActions({ searchOpen = false }: { searchOpen?: boolean }) {
  const ref = useModalAccessibility<HTMLDivElement>({ isOpen: searchOpen, onClose: () => {} });
  const props = { topicId: "test-map", title: "A map", url: "https://argumend.org/topics/test-map", embeddable: true };
  return <>
    <TopicActions {...props} />
    <TopicActions {...props} stacked />
    {searchOpen && <div ref={ref} role="dialog" aria-label="Search" aria-modal="true"><input aria-label="Search input" /></div>}
  </>;
}

function mockShare(error: { name: string } | null) {
  const share = vi.fn(() => (error ? Promise.reject(error) : Promise.resolve()));
  Object.defineProperty(navigator, "share", { configurable: true, value: share });
  return share;
}

afterEach(() => {
  cleanup();
  Reflect.deleteProperty(navigator, "share");
  vi.restoreAllMocks();
});

describe("responsive topic actions", () => {
  it.each([true, false])("releases a hidden Embed and focuses its replacement (desktop=%s)", async (desktop) => {
    const resize = mockResizableViewport(desktop);
    const view = render(<ResponsiveActions />);
    const trigger = view.getAllByRole("button", { name: "Embed" }).at(desktop ? -1 : 0)!;
    trigger.focus();
    fireEvent.click(trigger);
    await waitFor(() => expect(document.activeElement).toBe(view.getByRole("button", { name: "Close" })));

    resize(!desktop);

    await waitFor(() => expect(view.queryByRole("dialog")).toBeNull());
    expect(view.getAllByRole("button", { name: "Embed" })).toHaveLength(1);
    await waitFor(() => expect(document.activeElement).toBe(view.getByRole("button", { name: "Embed" })));
    expect(document.documentElement.style.overflow).toBe("");
    expect(document.body.style.overflow).toBe("");
  });

  it.each([true, false])("preserves Search focus while its lower Embed unmounts (desktop=%s)", async (desktop) => {
    const resize = mockResizableViewport(desktop);
    const view = render(<ResponsiveActions />);
    const trigger = view.getAllByRole("button", { name: "Embed" }).at(desktop ? -1 : 0)!;
    trigger.focus();
    fireEvent.click(trigger);
    await waitFor(() => expect(document.activeElement).toBe(view.getByRole("button", { name: "Close" })));
    view.rerender(<ResponsiveActions searchOpen />);
    const input = view.getByRole("textbox", { name: "Search input" });
    await waitFor(() => expect(document.activeElement).toBe(input));

    resize(!desktop);

    expect(view.queryByRole("dialog", { name: "Embed this topic" })).toBeNull();
    expect(document.activeElement).toBe(input);
    expect(document.documentElement.style.overflow).toBe("hidden");
    view.rerender(<ResponsiveActions searchOpen={false} />);
    await waitFor(() => expect(document.activeElement).toBe(view.getByRole("button", { name: "Embed" })));
    expect(document.documentElement.style.overflow).toBe("");
    expect(document.body.style.overflow).toBe("");
  });

  it("does not steal unrelated input focus when the layout changes", async () => {
    const resize = mockResizableViewport(true);
    const view = render(<><ResponsiveActions /><input aria-label="Unrelated input" /></>);
    fireEvent.click(view.getByRole("button", { name: "Embed" }));
    await waitFor(() => expect(document.activeElement).toBe(view.getByRole("button", { name: "Close" })));
    const input = view.getByRole("textbox", { name: "Unrelated input" });
    input.focus();

    resize(false);

    await waitFor(() => expect(view.queryByRole("dialog")).toBeNull());
    expect(document.activeElement).toBe(input);
    expect(document.documentElement.style.overflow).toBe("");
  });
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

  it("hands focus back to Share when Escape closes the panel from inside it", async () => {
    const view = render(<ShareTopicButton title="A map" url="https://argumend.org/topics/x" />);
    const share = view.getByRole("button", { name: "Share" });
    await act(async () => {
      fireEvent.click(share);
    });
    const panel = view.getByRole("group", { name: "Share this map" });
    const first = panel.querySelector<HTMLElement>("a, button");
    expect(first).toBeTruthy();
    first!.focus();
    await act(async () => {
      fireEvent.keyDown(document, { key: "Escape" });
    });
    expect(view.queryByRole("group", { name: "Share this map" })).toBeNull();
    // Not dropped on <body>, where the next Tab starts the page over.
    expect(document.activeElement).toBe(share);
  });
});

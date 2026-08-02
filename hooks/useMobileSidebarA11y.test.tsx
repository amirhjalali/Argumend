import "@/test/setup-dom";
import { useRef, useState } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { useMobileSidebarA11y } from "./useMobileSidebarA11y";

function SidebarHarness() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);

  useMobileSidebarA11y({
    isOpen,
    close: () => setIsOpen(false),
    drawerRef,
    triggerRef,
  });

  return (
    <>
      <button
        ref={triggerRef}
        aria-expanded={isOpen}
        aria-controls="test-sidebar"
        onClick={() => setIsOpen(true)}
      >
        Open menu
      </button>
      <aside ref={drawerRef} id="test-sidebar" aria-label="Sidebar navigation">
        <button data-sidebar-initial-focus onClick={() => setIsOpen(false)}>
          Close menu
        </button>
        <button>Browse topics</button>
      </aside>
    </>
  );
}

describe("useMobileSidebarA11y", () => {
  beforeEach(() => {
    document.body.style.overflow = "clip";
    vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
      matches: query === "(max-width: 767px)",
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  afterEach(() => {
    cleanup();
    document.body.style.overflow = "";
    vi.restoreAllMocks();
  });

  it("labels the mobile drawer, contains focus, closes on Escape, and restores state", async () => {
    const view = render(<SidebarHarness />);
    const trigger = view.getByRole("button", { name: "Open menu" });
    const close = view.getByRole("button", { name: "Close menu" });

    fireEvent.click(trigger);

    await waitFor(() => expect(document.activeElement).toBe(close));
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    const dialog = view.getByRole("dialog", { name: "Sidebar navigation" });
    expect(dialog.getAttribute("aria-modal")).toBe("true");
    expect(document.body.style.overflow).toBe("hidden");

    const last = view.getByRole("button", { name: "Browse topics" });
    last.focus();
    fireEvent.keyDown(last, { key: "Tab" });
    expect(document.activeElement).toBe(close);

    close.focus();
    fireEvent.keyDown(close, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(last);

    trigger.focus();
    fireEvent.keyDown(trigger, { key: "Tab" });
    expect(document.activeElement).toBe(close);

    fireEvent.keyDown(document, { key: "Escape" });

    await waitFor(() => expect(document.activeElement).toBe(trigger));
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(view.queryByRole("dialog", { name: "Sidebar navigation" })).toBeNull();
    expect(document.body.style.overflow).toBe("clip");
  });

  it("leaves the desktop sidebar non-modal and the page scrollable", () => {
    vi.mocked(window.matchMedia).mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const view = render(<SidebarHarness />);
    fireEvent.click(view.getByRole("button", { name: "Open menu" }));

    expect(view.queryByRole("dialog")).toBeNull();
    expect(document.body.style.overflow).toBe("clip");
  });
});

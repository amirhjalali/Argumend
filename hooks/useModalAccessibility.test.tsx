import "@/test/setup-dom";
import { useState } from "react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { lockPageScroll, useModalAccessibility } from "./useModalAccessibility";

function ModalHarness() {
  const [isOpen, setIsOpen] = useState(false);
  const [renderCount, setRenderCount] = useState(0);
  const modalRef = useModalAccessibility<HTMLDivElement>({
    isOpen,
    // Intentionally unstable: normal inline callbacks must not retire an
    // active dialog's semantics or briefly unlock background scrolling.
    onClose: () => setIsOpen(false),
  });

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open dialog</button>
      {isOpen ? (
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-label="Test dialog"
          tabIndex={-1}
        >
          <button data-modal-initial-focus>First action</button>
          <button onClick={() => setRenderCount((count) => count + 1)}>
            Rerender {renderCount}
          </button>
        </div>
      ) : null}
    </>
  );
}

function LayeredModalHarness() {
  const [outerOpen, setOuterOpen] = useState(false);
  const [innerOpen, setInnerOpen] = useState(false);
  const outerRef = useModalAccessibility<HTMLDivElement>({ isOpen: outerOpen, onClose: () => setOuterOpen(false) });
  const innerRef = useModalAccessibility<HTMLDivElement>({ isOpen: innerOpen, onClose: () => setInnerOpen(false) });
  return (
    <>
      <button onClick={() => setOuterOpen(true)}>Open outer</button>
      {outerOpen && (
        <div ref={outerRef} role="dialog" aria-modal="true" aria-label="Outer">
          <button onClick={() => setInnerOpen(true)}>Open inner</button>
          <button>Last outer action</button>
        </div>
      )}
      {innerOpen && (
        <div ref={innerRef} role="dialog" aria-modal="true" aria-label="Inner">
          <button>First inner action</button>
          <button>Last inner action</button>
        </div>
      )}
    </>
  );
}

describe("useModalAccessibility", () => {
  beforeEach(() => {
    document.body.style.overflow = "clip";
    document.documentElement.style.overflow = "";
  });

  afterEach(() => {
    cleanup();
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  });

  it("preserves an open modal across callback identity changes", async () => {
    const view = render(<ModalHarness />);
    const trigger = view.getByRole("button", { name: "Open dialog" });
    trigger.focus();
    fireEvent.click(trigger);

    const dialog = view.getByRole("dialog", { name: "Test dialog" });
    await waitFor(() =>
      expect(document.activeElement).toBe(
        view.getByRole("button", { name: "First action" }),
      ),
    );
    expect(document.body.style.overflow).toBe("hidden");
    // The window scrolls the page, and html's `overflow-x: clip` keeps body's
    // overflow from reaching it, so the lock must be on <html> as well.
    expect(document.documentElement.style.overflow).toBe("hidden");

    fireEvent.click(view.getByRole("button", { name: "Rerender 0" }));

    expect(dialog.getAttribute("aria-modal")).toBe("true");
    expect(document.body.style.overflow).toBe("hidden");

    fireEvent.keyDown(document, { key: "Escape" });

    await waitFor(() => expect(view.queryByRole("dialog")).toBeNull());
    await waitFor(() => expect(document.activeElement).toBe(trigger));
    expect(document.body.style.overflow).toBe("clip");
    expect(document.documentElement.style.overflow).toBe("");
  });

  it("unwinds nested locks in order", () => {
    const unlockOuter = lockPageScroll();
    const unlockInner = lockPageScroll();
    unlockInner();
    expect(document.documentElement.style.overflow).toBe("hidden");
    expect(document.body.style.overflow).toBe("hidden");
    unlockOuter();
    expect(document.documentElement.style.overflow).toBe("");
    expect(document.body.style.overflow).toBe("clip");
  });

  it("keeps scrolling locked until the final lock is released, regardless of order", () => {
    const unlockOuter = lockPageScroll();
    const unlockInner = lockPageScroll();
    unlockOuter();
    expect(document.documentElement.style.overflow).toBe("hidden");
    expect(document.body.style.overflow).toBe("hidden");
    unlockOuter();
    expect(document.body.style.overflow).toBe("hidden");
    unlockInner();
    expect(document.documentElement.style.overflow).toBe("");
    expect(document.body.style.overflow).toBe("clip");
  });

  it("gives the top dialog keyboard ownership and restores focus through the stack", async () => {
    const view = render(<LayeredModalHarness />);
    const outerTrigger = view.getByRole("button", { name: "Open outer" });
    outerTrigger.focus();
    fireEvent.click(outerTrigger);
    const innerTrigger = view.getByRole("button", { name: "Open inner" });
    await waitFor(() => expect(document.activeElement).toBe(innerTrigger));
    fireEvent.click(innerTrigger);
    const first = view.getByRole("button", { name: "First inner action" });
    const last = view.getByRole("button", { name: "Last inner action" });
    await waitFor(() => expect(document.activeElement).toBe(first));

    fireEvent.keyDown(first, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(last);
    fireEvent.keyDown(last, { key: "Tab" });
    expect(document.activeElement).toBe(first);
    expect(view.getByRole("dialog", { name: "Outer" }).getAttribute("aria-modal")).toBe("false");
    expect(view.getByRole("dialog", { name: "Inner" }).getAttribute("aria-modal")).toBe("true");

    fireEvent.keyDown(first, { key: "Escape" });
    expect(view.queryByRole("dialog", { name: "Inner" })).toBeNull();
    expect(view.getByRole("dialog", { name: "Outer" }).getAttribute("aria-modal")).toBe("true");
    await waitFor(() => expect(document.activeElement).toBe(innerTrigger));
    expect(document.documentElement.style.overflow).toBe("hidden");

    fireEvent.keyDown(innerTrigger, { key: "Escape" });
    expect(view.queryByRole("dialog")).toBeNull();
    await waitFor(() => expect(document.activeElement).toBe(outerTrigger));
    expect(document.documentElement.style.overflow).toBe("");
    expect(document.body.style.overflow).toBe("clip");
  });

  it("unlocks the page when layered dialogs unmount together", async () => {
    const view = render(<LayeredModalHarness />);
    fireEvent.click(view.getByRole("button", { name: "Open outer" }));
    fireEvent.click(view.getByRole("button", { name: "Open inner" }));
    await waitFor(() => expect(document.activeElement).toBe(view.getByRole("button", { name: "First inner action" })));

    view.unmount();

    expect(document.documentElement.style.overflow).toBe("");
    expect(document.body.style.overflow).toBe("clip");
  });

  it.each([
    { isComposing: true, keyCode: 27 },
    { isComposing: false, keyCode: 229 },
  ])("leaves composition Escape to the input method (%j)", async (composition) => {
    const view = render(<ModalHarness />);
    fireEvent.click(view.getByRole("button", { name: "Open dialog" }));
    const first = view.getByRole("button", { name: "First action" });
    await waitFor(() => expect(document.activeElement).toBe(first));

    const event = new KeyboardEvent("keydown", { key: "Escape", bubbles: true, cancelable: true, ...composition });
    fireEvent(first, event);

    expect(event.defaultPrevented).toBe(false);
    expect(view.getByRole("dialog", { name: "Test dialog" })).toBeTruthy();
    expect(document.activeElement).toBe(first);
    expect(document.body.style.overflow).toBe("hidden");

    fireEvent.keyDown(first, { key: "Escape" });
    await waitFor(() => expect(view.queryByRole("dialog")).toBeNull());
    expect(document.body.style.overflow).toBe("clip");
  });
});

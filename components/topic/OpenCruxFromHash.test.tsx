import "@/test/setup-dom";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { OpenCruxFromHash } from "./OpenCruxFromHash";

function Page() {
  return (
    <ul>
      <li id="crux-a">
        <details>
          <summary>A</summary>body
        </details>
      </li>
      <li id="other">
        <details>
          <summary>B</summary>body
        </details>
      </li>
      <li><a href="#crux-a">Return to A</a></li>
      <OpenCruxFromHash />
    </ul>
  );
}

describe("OpenCruxFromHash", () => {
  afterEach(() => {
    cleanup();
    window.history.replaceState(null, "", window.location.pathname);
    vi.restoreAllMocks();
  });

  it("opens the crux fold the URL points at", () => {
    window.history.replaceState(null, "", "#crux-a");
    const { container } = render(<Page />);
    const [a, b] = container.querySelectorAll("details");
    expect(a.open).toBe(true);
    expect(b.open).toBe(false);
    expect(document.activeElement).toBe(a.querySelector("summary"));
  });

  it("leaves folds alone for non-crux anchors", () => {
    window.history.replaceState(null, "", "#other");
    const { container } = render(<Page />);
    for (const d of container.querySelectorAll("details")) expect(d.open).toBe(false);
  });

  it("opens and focuses a different crux after fragment navigation", () => {
    const { container } = render(<Page />);
    window.history.replaceState(null, "", "#crux-a");
    fireEvent(window, new Event("hashchange"));
    const details = container.querySelector("details")!;
    expect(details.open).toBe(true);
    expect(document.activeElement).toBe(details.querySelector("summary"));
  });

  it("reopens a collapsed crux when a link repeats the current fragment", () => {
    window.history.replaceState(null, "", "#crux-a");
    const view = render(<Page />);
    const entry = view.container.querySelector<HTMLElement>("#crux-a")!;
    const details = entry.querySelector("details")!;
    details.open = false;
    const scroll = vi.fn();
    entry.scrollIntoView = scroll;

    fireEvent.click(view.getByRole("link", { name: "Return to A" }));

    expect(details.open).toBe(true);
    expect(document.activeElement).toBe(details.querySelector("summary"));
    expect(scroll).toHaveBeenCalledWith({ block: "start" });
  });

  it("does not intercept modified clicks or malformed fragments", () => {
    window.history.replaceState(null, "", "#crux-a");
    const view = render(<Page />);
    const details = view.container.querySelector("details")!;
    details.open = false;
    fireEvent.click(view.getByRole("link", { name: "Return to A" }), { ctrlKey: true });
    expect(details.open).toBe(false);

    window.history.replaceState(null, "", "#crux-%E0%A4%A");
    expect(() => fireEvent(window, new Event("hashchange"))).not.toThrow();
    expect(details.open).toBe(false);
  });

  it("repairs focus reset by initial fragment navigation after loading", () => {
    vi.spyOn(document, "readyState", "get").mockReturnValue("loading");
    let frame!: FrameRequestCallback;
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => { frame = callback; return 1; });
    window.history.replaceState(null, "", "#crux-a");
    const view = render(<Page />);
    const summary = view.container.querySelector("summary")!;
    summary.blur();
    fireEvent(window, new Event("load"));
    frame(0);
    expect(document.activeElement).toBe(summary);
  });

  it.each(["another control", "closed fold", "different fragment"])("does not override a reader's %s after loading", (change) => {
    vi.spyOn(document, "readyState", "get").mockReturnValue("loading");
    let frame!: FrameRequestCallback;
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => { frame = callback; return 1; });
    window.history.replaceState(null, "", "#crux-a");
    const view = render(<Page />);
    const summary = view.container.querySelector("summary")!;
    summary.blur();
    if (change === "another control") view.getByRole("link", { name: "Return to A" }).focus();
    if (change === "closed fold") view.container.querySelector("details")!.open = false;
    if (change === "different fragment") window.history.replaceState(null, "", "#other");
    const active = document.activeElement;
    fireEvent(window, new Event("load"));
    frame(0);
    expect(document.activeElement).toBe(active);
  });
});

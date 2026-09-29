import "@/test/setup-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, waitFor, within } from "@testing-library/react";
import { SAVED_TOPICS_KEY } from "@/hooks/useSavedTopics";
import { LEARN_HREF, learnNav, primaryNav } from "@/lib/nav";

let pathname = "/topics";

vi.mock("next/navigation", () => ({
  usePathname: () => pathname,
  useRouter: () => ({ push: vi.fn() }),
}));
// The search modal is code-split; its own tests cover it.
vi.mock("next/dynamic", () => ({ default: () => () => null }));

import { TopBar } from "./TopBar";
import { nextThemeChoice } from "./ThemeToggle";

function mockViewport(desktop: boolean) {
  vi.spyOn(window, "matchMedia").mockImplementation((query: string) => ({
    matches: query === "(min-width: 768px)" ? desktop : false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

/** A viewport whose width can cross the 768px breakpoint mid-test. */
function mockResizableViewport(initialDesktop: boolean) {
  let desktop = initialDesktop;
  const listeners = new Set<() => void>();
  vi.spyOn(window, "matchMedia").mockImplementation(
    (query: string) =>
      ({
        get matches() {
          return query === "(min-width: 768px)" ? desktop : false;
        },
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: (_type: string, listener: () => void) => listeners.add(listener),
        removeEventListener: (_type: string, listener: () => void) => listeners.delete(listener),
        dispatchEvent: vi.fn(),
      }) as unknown as MediaQueryList,
  );
  return (next: boolean) => {
    desktop = next;
    act(() => listeners.forEach((listener) => listener()));
  };
}

describe("TopBar (the site header)", () => {
  beforeEach(() => {
    pathname = "/topics";
    localStorage.clear();
    mockViewport(false);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    document.body.style.overflow = "";
  });

  it("shows the wordmark and tagline, linked home", () => {
    const view = render(<TopBar />);
    const home = view.getByRole("link", { name: /ARGUMEND/ });
    expect(home.getAttribute("href")).toBe("/");
    expect(within(home).getByText("Disagree better.")).toBeTruthy();
    // The tagline stays visible on phones (it used to hide under 420px).
    expect(within(home).getByText("Disagree better.").className).not.toMatch(/hidden/);
  });

  it("renders the four primary items from lib/nav and marks the current one", () => {
    pathname = "/fallacies/straw-man";
    const view = render(<TopBar />);
    const nav = within(view.getByRole("navigation", { name: "Main" }));
    const links = nav.getAllByRole("link");
    expect(links.map((l) => [l.textContent, l.getAttribute("href")])).toEqual(
      primaryNav.map((item) => [item.label, item.href]),
    );
    const current = links.filter((l) => l.getAttribute("aria-current") === "page");
    expect(current.map((l) => l.getAttribute("href"))).toEqual([LEARN_HREF]);
  });

  it("has one search button and one theme button, never a sidebar toggle", () => {
    const view = render(<TopBar />);
    expect(view.getAllByRole("button", { name: "Search" })).toHaveLength(1);
    expect(view.queryByRole("button", { name: /toggle sidebar/i })).toBeNull();
    expect(view.queryByRole("radiogroup")).toBeNull();
  });

  it("opens its own phone menu: primary items, the Learn group, then theme", async () => {
    const view = render(<TopBar />);
    const menuButton = view.getByRole("button", { name: "Open menu" });
    expect(menuButton.getAttribute("aria-expanded")).toBe("false");

    menuButton.focus();
    fireEvent.click(menuButton);

    const sheet = view.getByRole("dialog", { name: "Menu" });
    expect(menuButton.getAttribute("aria-expanded")).toBe("true");
    expect(menuButton.getAttribute("aria-controls")).toBe(sheet.id);

    const labels = within(sheet)
      .getAllByRole("link")
      .map((l) => l.textContent);
    expect(labels).toEqual([
      ...primaryNav.map((item) => item.label),
      ...learnNav.map((item) => item.label),
    ]);
    expect(within(sheet).getByRole("list", { name: "Learn" })).toBeTruthy();
    expect(within(sheet).getByText("Theme")).toBeTruthy();
    await waitFor(() => expect(document.body.style.overflow).toBe("hidden"));

    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() => expect(view.queryByRole("dialog")).toBeNull());
    await waitFor(() => expect(document.activeElement).toBe(menuButton));
  });

  it("closes the menu when a link in it is followed", () => {
    const view = render(<TopBar />);
    fireEvent.click(view.getByRole("button", { name: "Open menu" }));
    const sheet = view.getByRole("dialog", { name: "Menu" });
    fireEvent.click(within(sheet).getByRole("link", { name: "Maps" }));
    expect(view.queryByRole("dialog")).toBeNull();
  });

  it("closes the sheet for good when the window widens past the breakpoint", () => {
    const setDesktop = mockResizableViewport(false);
    const view = render(<TopBar />);
    fireEvent.click(view.getByRole("button", { name: "Open menu" }));
    expect(view.getByRole("dialog", { name: "Menu" })).toBeTruthy();

    setDesktop(true);
    expect(view.queryByRole("dialog")).toBeNull();
    // The menu button is hidden on desktop, so focus goes to the inline nav
    // that replaced the sheet: its current item.
    const maps = within(view.getByRole("navigation", { name: "Main" })).getByRole("link", {
      name: "Maps",
    });
    expect(document.activeElement).toBe(maps);

    // Narrowing again does not reopen it unasked.
    setDesktop(false);
    expect(view.queryByRole("dialog")).toBeNull();
    expect(view.getByRole("button", { name: "Open menu" }).getAttribute("aria-expanded")).toBe("false");
  });

  it("does not show the phone sheet on desktop, where the nav is inline", () => {
    mockViewport(true);
    const view = render(<TopBar />);
    fireEvent.click(view.getByRole("button", { name: "Open menu" }));
    expect(view.queryByRole("dialog")).toBeNull();
  });

  it("shows a bookmark link to /saved only once something is saved", async () => {
    const empty = render(<TopBar />);
    await act(async () => {});
    expect(empty.queryByRole("link", { name: /Saved maps/ })).toBeNull();
    cleanup();

    localStorage.setItem(SAVED_TOPICS_KEY, JSON.stringify(["nuclear-energy", "ai-risk"]));
    const view = render(<TopBar />);
    const saved = await view.findByRole("link", { name: "Saved maps (2)" });
    expect(saved.getAttribute("href")).toBe("/saved");
  });

  it("gives every header link and button a 44px target", () => {
    const view = render(<TopBar />);
    for (const el of [...view.getAllByRole("link"), ...view.getAllByRole("button")]) {
      expect(el.className, el.textContent ?? el.getAttribute("aria-label") ?? "").toMatch(
        /min-h-11|h-11/,
      );
    }
  });
});

describe("theme cycle", () => {
  it("goes light → dark → system → light", () => {
    expect(nextThemeChoice("light")).toBe("dark");
    expect(nextThemeChoice("dark")).toBe("system");
    expect(nextThemeChoice("system")).toBe("light");
    expect(nextThemeChoice(undefined)).toBe("light");
  });
});

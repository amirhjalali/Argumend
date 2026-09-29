import "@/test/setup-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));
vi.mock("next/navigation", () => ({ notFound: vi.fn() }));
vi.mock("@/components/AppShell", () => ({
  AppShell: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));
vi.mock("@/components/JsonLd", () => ({ JsonLd: () => null }));

import ForEducatorsPage from "./page";
import WorksheetPage, { generateStaticParams } from "./worksheets/[id]/page";

afterEach(cleanup);

describe("/for-educators", () => {
  it("asks no class to score its confidence or vote on a winner", () => {
    const view = render(<ForEducatorsPage />);
    const text = view.container.textContent ?? "";
    expect(text).not.toMatch(/confidence score/i);
    expect(text).not.toMatch(/0\s*[–-]\s*100\s*%/);
    expect(text).not.toMatch(/votes? on/i);
    expect(text).not.toMatch(/winning team/i);
  });

  it("ends the crux lesson with what would move each team", () => {
    const view = render(<ForEducatorsPage />);
    expect(
      view.getByText(
        "Each team states what evidence would move it; the class checks whether both teams named the same crux",
      ),
    ).toBeTruthy();
  });

  it("is on the shared primitives: crumbs through Learn, one rust action, retired routes unlinked", () => {
    const view = render(<ForEducatorsPage />);
    const crumbs = view.getByRole("navigation", { name: "Breadcrumb" });
    expect(crumbs.querySelector('a[href="/learn"]')).toBeTruthy();
    const primary = Array.from(view.container.querySelectorAll("a")).filter((a) =>
      a.className.includes("from-rust-600"),
    );
    expect(primary).toHaveLength(1);
    for (const retired of ["/how-it-works", "/community", "/concepts", "/guides"]) {
      expect(view.container.querySelector(`a[href="${retired}"]`)).toBeNull();
    }
  });
});

describe("educator worksheets", () => {
  it.each(generateStaticParams())("$id asks for no confidence percentage", async ({ id }) => {
    const view = render(await WorksheetPage({ params: Promise.resolve({ id }) }));
    const text = view.container.textContent ?? "";
    expect(text).not.toMatch(/confidence score/i);
    expect(text).not.toMatch(/0\s*[–-]\s*100\s*%|___%/);
    expect(text).not.toMatch(/votes? on|winning team/i);
  });
});

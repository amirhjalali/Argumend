import "@/test/setup-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";

vi.mock("@/components/AppShell", () => ({
  AppShell: ({ children }: { children: React.ReactNode }) => <main>{children}</main>,
}));

import FAQPage from "./page";
import { metadata } from "./layout";

afterEach(cleanup);

/**
 * /questions is the questions index; /faq is the product FAQ. The two must
 * not share a name (round-6 review #15).
 */
describe("/faq", () => {
  it("is headed Common questions, with FAQ in the breadcrumb", () => {
    const view = render(<FAQPage />);
    expect(view.getByRole("heading", { level: 1 }).textContent).toBe("Common questions");
    const crumbs = view.getByRole("navigation", { name: /breadcrumb/i }).textContent ?? "";
    expect(crumbs).toContain("FAQ");
    expect(crumbs).not.toMatch(/\bQuestions\b/);
  });

  it("keeps its metadata on the same name", () => {
    expect(String(metadata.title)).toMatch(/^FAQ — Common questions/);
    expect(String(metadata.openGraph?.title)).toMatch(/Common questions/);
  });

  it("no longer explains the older maps' verdict phrases", () => {
    const view = render(<FAQPage />);
    expect(view.container.textContent).not.toMatch(/largely converges|still divided|still thin/);
  });
});

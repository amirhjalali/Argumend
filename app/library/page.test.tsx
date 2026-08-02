import "@/test/setup-dom";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { CATEGORY_ORDER } from "@/data/topicIndex";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));
vi.mock("@/components/AppShell", () => ({
  AppShell: ({ children }: { children: React.ReactNode }) => <main>{children}</main>,
}));
vi.mock("@/components/Breadcrumbs", () => ({ Breadcrumbs: () => null }));
vi.mock("@/components/JsonLd", () => ({ JsonLd: () => null }));
vi.mock("@/components/BalanceWeightChip", () => ({
  BalanceWeightChip: () => <span>scores</span>,
}));

import LibraryPage from "./page";
import { libraryTopicSampler } from "./_config";

describe("LibraryPage", () => {
  afterEach(cleanup);

  it("samples three lightweight topics from every category", () => {
    expect(libraryTopicSampler).toHaveLength(CATEGORY_ORDER.length * 3);
    expect(new Set(libraryTopicSampler.map((topic) => topic.id)).size).toBe(
      libraryTopicSampler.length,
    );
    for (const category of CATEGORY_ORDER) {
      expect(libraryTopicSampler.filter((topic) => topic.category === category)).toHaveLength(3);
    }
  });

  it("renders an accessible sampler table instead of all topic graphs", () => {
    const view = render(<LibraryPage />);

    expect(view.container.querySelectorAll("tbody tr")).toHaveLength(15);
    expect(view.getByText(/sample argument maps with category/i)).toBeTruthy();
    expect(view.container.querySelectorAll('th[scope="col"]')).toHaveLength(3);
  });

  it("does not import the full topic graph module", () => {
    const source = readFileSync(join(process.cwd(), "app/library/page.tsx"), "utf8");
    expect(source).not.toContain('from "@/data/topics"');
    expect(source).toContain('from "@/data/topicIndex"');
  });
});

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

import WorksheetPage, { generateMetadata, generateStaticParams } from "./page";

describe("educator worksheets", () => {
  afterEach(cleanup);

  it("pre-renders every worksheet linked from the educator hub", () => {
    expect(generateStaticParams()).toEqual([
      { id: "argument-map-template" },
      { id: "steel-man-challenge" },
      { id: "evidence-evaluation-rubric" },
      { id: "crux-finder" },
    ]);
  });

  it("keeps unknown worksheet URLs out of search results", async () => {
    await expect(
      generateMetadata({ params: Promise.resolve({ id: "missing" }) }),
    ).resolves.toMatchObject({ robots: { index: false, follow: true } });
  });

  it.each(generateStaticParams())(
    "publishes route-specific canonical and social metadata for $id",
    async ({ id }) => {
      const expected = `https://argumend.org/for-educators/worksheets/${id}`;
      const metadata = await generateMetadata({ params: Promise.resolve({ id }) });

      expect(metadata.alternates?.canonical).toBe(expected);
      expect(metadata.openGraph?.url).toBe(expected);
      expect(metadata.openGraph?.title).toBe(metadata.title);
      expect(metadata.openGraph?.description).toBe(metadata.description);
      expect(metadata.twitter).toMatchObject({
        card: "summary_large_image",
        title: metadata.title,
        description: metadata.description,
      });
    },
  );

  it("renders the evidence guide with table semantics and dimension-specific anchors", async () => {
    const page = await WorksheetPage({
      params: Promise.resolve({ id: "evidence-evaluation-rubric" }),
    });
    const view = render(page);

    expect(view.container.querySelector("main#main-content")).toBeTruthy();
    expect(view.container.querySelectorAll('th[scope="col"]').length).toBeGreaterThan(0);
    expect(view.container.querySelectorAll('th[scope="row"]').length).toBeGreaterThan(0);
    expect(view.getByText("Single interested source")).toBeTruthy();
    expect(view.getByText("Repeatedly verified or reproduced")).toBeTruthy();
    expect(view.container.querySelector("script")).toBeNull();
  });
});

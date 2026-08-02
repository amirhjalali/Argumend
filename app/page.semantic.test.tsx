import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/components/HomeClient", () => ({
  default: () => (
    <main>
      <h1>See both sides of any controversial topic, mapped</h1>
    </main>
  ),
}));

import HomePage from "./page";

describe("homepage heading semantics", () => {
  it("keeps the noscript fallback from duplicating the primary H1", () => {
    const html = renderToStaticMarkup(<HomePage />);
    expect(html.match(/<h1\b/g)).toHaveLength(1);
    expect(html).toContain("<noscript>");
    expect(html).toContain("ARGUMEND");
  });
});

import { render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
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
      <OpenCruxFromHash />
    </ul>
  );
}

describe("OpenCruxFromHash", () => {
  afterEach(() => {
    window.location.hash = "";
  });

  it("opens the crux fold the URL points at", () => {
    window.location.hash = "#crux-a";
    const { container } = render(<Page />);
    const [a, b] = container.querySelectorAll("details");
    expect(a.open).toBe(true);
    expect(b.open).toBe(false);
  });

  it("leaves folds alone for non-crux anchors", () => {
    window.location.hash = "#other";
    const { container } = render(<Page />);
    for (const d of container.querySelectorAll("details")) expect(d.open).toBe(false);
  });
});

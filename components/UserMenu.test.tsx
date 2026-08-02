import "@/test/setup-dom";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { UserMenu } from "./UserMenu";

afterEach(cleanup);

describe("UserMenu", () => {
  it("renders an actionable sign-in link when the auth entry is enabled upstream", () => {
    const view = render(<UserMenu />);
    const link = view.getByRole("link", { name: "Sign in" });

    expect(link.getAttribute("href")).toBe("/auth/signin");
  });
});

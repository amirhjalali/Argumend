import "@/test/setup-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, waitFor, within } from "@testing-library/react";
import { getVerdict } from "@/lib/schemas/topic";

const navigation = vi.hoisted(() => ({ push: vi.fn() }));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: navigation.push }),
}));

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

vi.mock("@/components/AppShell", () => ({
  AppShell: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

import CompareIndexView from "./CompareIndexView";

const verdict = getVerdict(55, 60);
const allTopics = Array.from({ length: 20 }, (_, index) => ({
  id: `topic-${index + 1}`,
  title: `Topic ${index + 1}`,
  balance: 55,
  weight: 60,
  verdict,
  category: "policy",
  categoryLabel: "Policy",
}));

describe("CompareIndexView topic picker", () => {
  beforeEach(() => {
    navigation.push.mockReset();
    window.history.replaceState(null, "", "/topics/compare");
  });
  afterEach(() => {
    cleanup();
    window.history.replaceState(null, "", "/");
  });

  it("keeps the initial picker concise and exposes every topic through search", async () => {
    const view = render(
      <CompareIndexView featuredPairs={[]} allTopics={allTopics} />,
    );
    const results = view.getByLabelText("Topic search results");

    expect(within(results).getAllByRole("button")).toHaveLength(16);
    expect(view.getByText("Showing 16 of 20 topics")).toBeTruthy();

    fireEvent.change(view.getByLabelText("Search topics to fill slot A"), {
      target: { value: "Topic 20" },
    });

    await waitFor(() => expect(view.getByText("1 match")).toBeTruthy());
    expect(within(results).getByRole("button", { name: /Topic 20/ })).toBeTruthy();
  });

  it("uses separate, labelled controls for choosing and clearing each slot", () => {
    const view = render(
      <CompareIndexView featuredPairs={[]} allTopics={allTopics} />,
    );

    fireEvent.click(
      within(view.getByLabelText("Topic search results")).getByRole("button", {
        name: /Topic 1 /,
      }),
    );

    expect(
      view.getByRole("button", {
        name: "Choose a different topic for slot A. Current topic: Topic 1",
      }).getAttribute("aria-pressed"),
    ).toBe("false");
    expect(view.getByRole("button", { name: "Clear topic A: Topic 1" })).toBeTruthy();
    expect(view.container.querySelector("button button")).toBeNull();
  });

  it("navigates once two different topics are selected", async () => {
    const view = render(
      <CompareIndexView featuredPairs={[]} allTopics={allTopics} />,
    );
    const search = view.getByLabelText("Search topics to fill slot A");
    const results = view.getByLabelText("Topic search results");

    fireEvent.change(search, { target: { value: "Topic 20" } });
    fireEvent.click(await within(results).findByRole("button", { name: /Topic 20/ }));

    const searchB = view.getByLabelText("Search topics to fill slot B");
    fireEvent.change(searchB, { target: { value: "Topic 19" } });
    fireEvent.click(await within(results).findByRole("button", { name: /Topic 19/ }));
    fireEvent.click(view.getByRole("button", { name: "Compare these topics" }));

    expect(navigation.push).toHaveBeenCalledWith(
      "/topics/compare/topic-20/vs/topic-19",
    );
  });

  it("restores the selected pair from URL and browser history", async () => {
    window.history.replaceState(
      null,
      "",
      "/topics/compare?a=topic-2&b=topic-3&slot=b",
    );
    const view = render(
      <CompareIndexView featuredPairs={[]} allTopics={allTopics} />,
    );

    await waitFor(() =>
      expect(
        view.getByRole("button", {
          name: "Choose a different topic for slot A. Current topic: Topic 2",
        }),
      ).toBeTruthy(),
    );
    expect(
      view.getByRole("button", {
        name: "Choose a different topic for slot B. Current topic: Topic 3",
      }).getAttribute("aria-pressed"),
    ).toBe("true");

    window.history.pushState(
      null,
      "",
      "/topics/compare?a=topic-4&slot=b",
    );
    window.dispatchEvent(new PopStateEvent("popstate"));

    await waitFor(() =>
      expect(
        view.getByRole("button", {
          name: "Choose a different topic for slot A. Current topic: Topic 4",
        }),
      ).toBeTruthy(),
    );
    expect(view.getByRole("button", { name: "Choose a topic for slot B" })).toBeTruthy();
  });

  it("keeps the featured comparison filter in the URL", async () => {
    window.history.replaceState(null, "", "/topics/compare?pairs=climate");
    const view = render(
      <CompareIndexView featuredPairs={[]} allTopics={allTopics} />,
    );
    const input = view.getByRole("textbox", {
      name: "Filter comparisons",
    }) as HTMLInputElement;

    await waitFor(() => expect(input.value).toBe("climate"));
    fireEvent.change(input, { target: { value: "economics" } });

    await waitFor(() => expect(window.location.search).toContain("pairs=economics"));
    fireEvent.click(
      view.getByRole("button", { name: "Clear comparison filter" }),
    );
    await waitFor(() => expect(document.activeElement).toBe(input));
    expect(window.location.search).not.toContain("pairs=");
  });
});

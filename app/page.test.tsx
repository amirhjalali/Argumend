import "@/test/setup-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, within } from "@testing-library/react";
import { argumentTopicIndex } from "@/lib/argument/topicIds";
import { MAP_COUNT, TOPIC_COUNT } from "@/data/topicIndex";
import { argumentTopicIds } from "@/lib/argument/topicIds";
import { ANALYZE_HREF } from "@/lib/nav";
import { articles } from "@/data/blog";
import {
  HOME_EVIDENCE_HREF,
  HOME_FLAGSHIP_HREF,
  loadHomeCrux,
} from "@/components/home/homeModel";

// The shell is the foundation's; home only has to render inside it.
vi.mock("@/components/AppShell", () => ({
  AppShell: ({ children }: { children: React.ReactNode }) => <main>{children}</main>,
}));
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));
vi.mock("next/image", () => ({ default: () => null }));

import HomePage, { metadata } from "./page";

afterEach(cleanup);

function renderHome() {
  return render(<HomePage />);
}

describe("home: one argument, two doors", () => {
  it("has exactly one h1, the claim", () => {
    const view = renderHome();
    const h1s = view.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0].textContent).toBe("Find what the argument actually turns on.");
    // "Disagree better." rides in the site header (TopBar) at every width.
  });

  it("sends its primary button to a flagship map page, never the legacy canvas", () => {
    const view = renderHome();
    const primary = view.getByRole("link", { name: /See it on AI and jobs/ });
    const href = primary.getAttribute("href") ?? "";
    expect(href).toMatch(/^\/topics\/[a-z0-9-]+$/);
    expect(href).not.toContain("?topic=");
    expect(href).toBe(HOME_FLAGSHIP_HREF);
    // One rust fill on the page.
    const rustFills = view.container.querySelectorAll('[class*="from-rust-600"]');
    expect(rustFills).toHaveLength(1);
  });

  it("offers the paste tool as the quiet second door", () => {
    const view = renderHome();
    const paste = view.getByRole("link", { name: /Paste an argument you.re in/ });
    expect(paste.getAttribute("href")).toBe(ANALYZE_HREF);
  });

  it("links its one line of evidence to the public post it comes from", () => {
    const view = renderHome();
    const link = view.getByRole("link", { name: "How we measured it" });
    expect(link.getAttribute("href")).toBe(HOME_EVIDENCE_HREF);
    const slug = HOME_EVIDENCE_HREF.replace("/blog/", "");
    const post = articles.find((candidate) => candidate.slug === slug);
    expect(post, "the evidence post must exist").toBeTruthy();
    // The numbers home quotes are the ones the post publishes.
    expect(post?.content).toMatch(/\b114 substantive turns\b/);
    expect(post?.content).toMatch(/\b88 were\b/);
    expect(post?.content).toMatch(/\b36 minutes\b/);
  });

  it("works through crux #1 of the same map the button opens", () => {
    const crux = loadHomeCrux();
    expect(crux).not.toBeNull();
    expect(`/topics/${crux!.topicId}`).toBe(HOME_FLAGSHIP_HREF);
    expect(crux!.rank).toBe(1);

    const view = renderHome();
    const section = view.getByRole("region", { name: "What would change your mind?" });
    expect(within(section).getByRole("heading", { level: 3, name: crux!.question })).toBeTruthy();
    expect(within(section).getByText(/What would settle it/i)).toBeTruthy();
    expect(
      within(section).getByRole("link", { name: "Read the whole map" }).getAttribute("href"),
    ).toBe(HOME_FLAGSHIP_HREF);
  });

  it("lists the three flagship maps as crux questions, each with 'Read the map'", () => {
    const view = renderHome();
    const section = view.getByRole("region", { name: /live arguments, mapped/ });
    for (const topic of argumentTopicIndex) {
      const link = within(section).getByRole("link", { name: new RegExp(topic.title.replace(/[?.]/g, "\\$&")) });
      expect(link.getAttribute("href")).toBe(`/topics/${topic.id}`);
      expect(link.textContent).toContain("Read the map");
      expect(link.textContent).toMatch(/Turns on \w+ questions, including/);
    }
    // No statistic leads a row: the tagline numbers are not on home.
    for (const topic of argumentTopicIndex) {
      expect(section.textContent).not.toContain(topic.tagline);
    }
    // Every map, flagships included: the same total /topics lists.
    expect(MAP_COUNT).toBe(TOPIC_COUNT + argumentTopicIds.length);
    const all = within(section).getByRole("link", { name: new RegExp(`All ${MAP_COUNT} maps`) });
    expect(all.getAttribute("href")).toBe("/topics");
  });

  it("does not repeat the worked crux in the map rows", () => {
    const crux = loadHomeCrux()!;
    const view = renderHome();
    const section = view.getByRole("region", { name: /live arguments, mapped/ });
    expect(section.textContent).not.toContain(crux.question);
  });

  it("keeps the old home out: no canvas, no library index, no debate-map wording, no /ai", () => {
    const view = renderHome();
    const html = view.container.innerHTML;
    expect(html).not.toContain("?topic=");
    expect(html).not.toMatch(/Open the (debate|interactive) map/);
    expect(html).not.toMatch(/debate map/i);
    expect(html).not.toMatch(/verdict/i);
    expect(html).not.toContain('href="/ai"');
    expect(html).not.toContain("?category=");
  });

  it("ends with the paste box", () => {
    const view = renderHome();
    expect(view.getByRole("textbox", { name: "Text to analyze" })).toBeTruthy();
  });

  it("titles the page in the same voice as its h1", () => {
    const title = metadata.title as { absolute: string };
    expect(title.absolute).toBe("ARGUMEND — Find what the argument actually turns on");
    expect(title.absolute).not.toMatch(/Not Win Them/);
    expect(metadata.description).toContain("never names a winner");
  });
});

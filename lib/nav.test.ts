import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  ANALYZE_HREF,
  LEARN_HREF,
  SAVED_HREF,
  footerColumns,
  getActivePrimaryHref,
  learnNav,
  legalLinks,
  primaryNav,
} from "./nav";

const read = (file: string) => readFileSync(join(process.cwd(), ...file.split("/")), "utf8");

describe("primary navigation (the header, phone sheet and footer all read it)", () => {
  it("is exactly Maps · Paste an argument · Learn · About, in that order", () => {
    expect(primaryNav.map(({ label, href }) => ({ label, href }))).toEqual([
      { label: "Maps", href: "/topics" },
      { label: "Paste an argument", href: ANALYZE_HREF },
      { label: "Learn", href: LEARN_HREF },
      { label: "About", href: "/about" },
    ]);
  });

  it("routes the paste tool and the learn hub through the shared constants", () => {
    expect(ANALYZE_HREF).toBe("/analyze");
    expect(LEARN_HREF).toBe("/learn");
  });

  it("keeps Saved, the dashboard and Home out of the primary nav", () => {
    const hrefs = primaryNav.map((item) => item.href);
    expect(hrefs).not.toContain(SAVED_HREF);
    expect(hrefs).not.toContain("/dashboard");
    expect(hrefs).not.toContain("/");
  });

  it("uses sentence-case labels and root-relative hrefs", () => {
    for (const item of [...primaryNav, ...learnNav]) {
      expect(item.href.startsWith("/"), `${item.label} -> ${item.href}`).toBe(true);
      expect(item.href).not.toMatch(/^\/\//);
      const [, ...rest] = item.label.split(" ");
      for (const word of rest) {
        expect(word, `${item.label} is not sentence case`).toBe(word.toLowerCase());
      }
    }
  });

  it("declares no href or label twice", () => {
    const hrefs = primaryNav.map((i) => i.href);
    const labels = primaryNav.map((i) => i.label);
    expect(new Set(hrefs).size).toBe(hrefs.length);
    expect(new Set(labels).size).toBe(labels.length);
  });
});

describe("learn group (phone menu sheet and footer)", () => {
  it("lists the /learn hub's main sections", () => {
    expect(learnNav.map((item) => [item.label, item.href])).toEqual([
      ["Core ideas", "/learn#ideas"],
      ["Guides", "/learn#guides"],
      ["Fallacies", "/fallacies"],
      ["Glossary", "/glossary"],
      ["Essays", "/blog"],
      ["For teachers", "/for-educators"],
    ]);
  });

  it("never repeats the hub itself, which is the primary Learn item", () => {
    expect(learnNav.map((item) => item.href)).not.toContain(LEARN_HREF);
  });

  it("points only at section anchors the hub renders", () => {
    const hub = read("lib/learn/sections.ts");
    for (const item of learnNav) {
      const anchor = item.href.split("#")[1];
      if (anchor) expect(hub).toContain(`id: "${anchor}"`);
    }
  });
});

describe("getActivePrimaryHref", () => {
  it.each([
    ["/topics", "/topics"],
    ["/topics/ai-mass-unemployment", "/topics"],
    ["/analyze", ANALYZE_HREF],
    ["/faq", "/about"],
    ["/reply", ANALYZE_HREF],
    ["/d/some-report", ANALYZE_HREF],
    ["/learn", LEARN_HREF],
    ["/guides/crux-test", LEARN_HREF],
    ["/concepts/cruxes", LEARN_HREF],
    ["/fallacies/straw-man", LEARN_HREF],
    ["/glossary", LEARN_HREF],
    ["/questions/is-nuclear-energy-safe", LEARN_HREF],
    ["/blog/some-post", LEARN_HREF],
    ["/research", LEARN_HREF],
    ["/for-educators/worksheets/crux-finder", LEARN_HREF],
    ["/about", "/about"],
    ["/methodology", "/about"],
  ])("marks %s as part of %s", (pathname, expected) => {
    expect(getActivePrimaryHref(pathname)).toBe(expected);
  });

  it.each(["/", "/saved", "/is/nuclear-energy-safe", "/analysis/abc", "/topicsx"])(
    "marks nothing current on %s",
    (pathname) => {
      expect(getActivePrimaryHref(pathname)).toBeUndefined();
    },
  );
});

describe("footerColumns", () => {
  it("has the Argumend, Learn and More columns", () => {
    expect(
      footerColumns.map((column) => ({
        title: column.title,
        labels: column.links.map((link) => link.label),
      })),
    ).toEqual([
      { title: "Argumend", labels: ["Maps", "Paste an argument", "Learn", "About"] },
      {
        title: "Learn",
        labels: ["Core ideas", "Guides", "Fallacies", "Glossary", "Essays", "For teachers"],
      },
      { title: "More", labels: ["FAQ", "Methodology", "Saved", "GitHub"] },
    ]);
  });

  it("reuses the primary items so the footer cannot drift from the header", () => {
    expect(footerColumns[0].links).toBe(primaryNav);
    expect(footerColumns[1].links).toBe(learnNav);
  });

  it("marks only GitHub as external", () => {
    const external = footerColumns.flatMap((c) => c.links).filter((l) => l.external);
    expect(external.map((l) => l.label)).toEqual(["GitHub"]);
    expect(external[0].href).toMatch(/^https:\/\/github\.com\//);
  });

  it("keeps the legal links out of the columns", () => {
    const hrefs = footerColumns.flatMap((c) => c.links.map((l) => l.href));
    for (const link of legalLinks) expect(hrefs).not.toContain(link.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });
});

describe("no local nav link arrays in the shell (SOT regression guard)", () => {
  it.each(["components/TopBar.tsx", "components/Footer.tsx"])(
    "%s imports from @/lib/nav",
    (file) => {
      expect(read(file)).toMatch(/from\s+["']@\/lib\/nav["']/);
    },
  );

  it.each([
    "components/TopBar.tsx",
    "components/Footer.tsx",
    "components/HeroAnalyze.tsx",
    "app/not-found.tsx",
    "components/paste/PasteClient.tsx",
    "components/paste/MapResult.tsx",
    "app/analysis/[id]/page.tsx",
  ])("%s links the paste tool through ANALYZE_HREF, never a literal", (file) => {
    const source = read(file);
    expect(source).not.toMatch(/["'`]\/analyze(?:-v2)?["'`]/);
  });
});

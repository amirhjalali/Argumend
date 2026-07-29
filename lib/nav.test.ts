import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  navItems,
  primaryNav,
  learnNav,
  metaNav,
  footerColumns,
} from "./nav";

describe("navItems (the single source of truth)", () => {
  it("declares every href exactly once", () => {
    const hrefs = navItems.map((i) => i.href);
    const dupes = hrefs.filter((h, idx) => hrefs.indexOf(h) !== idx);
    expect(dupes, `duplicate hrefs: ${dupes.join(", ")}`).toEqual([]);
  });

  it("declares every label exactly once", () => {
    const labels = navItems.map((i) => i.label);
    const dupes = labels.filter((l, idx) => labels.indexOf(l) !== idx);
    expect(dupes, `duplicate labels: ${dupes.join(", ")}`).toEqual([]);
  });

  it("uses root-relative hrefs only (no external or relative links)", () => {
    for (const item of navItems) {
      expect(item.href.startsWith("/"), `${item.label} -> ${item.href}`).toBe(true);
      expect(item.href).not.toMatch(/^\/\//);
    }
  });

  it("gives every item a non-empty label and a valid group", () => {
    for (const item of navItems) {
      expect(item.label.trim().length).toBeGreaterThan(0);
      expect(["primary", "learn", "meta"]).toContain(item.group);
    }
  });
});

describe("derived sidebar groups", () => {
  it("partitions navItems exactly — no item lost or duplicated", () => {
    expect(primaryNav.length + learnNav.length + metaNav.length).toBe(navItems.length);
    const derived = [...primaryNav, ...learnNav, ...metaNav].map((i) => i.href).sort();
    expect(derived).toEqual(navItems.map((i) => i.href).sort());
  });

  it("filters to the right group", () => {
    expect(primaryNav.every((i) => i.group === "primary")).toBe(true);
    expect(learnNav.every((i) => i.group === "learn")).toBe(true);
    expect(metaNav.every((i) => i.group === "meta")).toBe(true);
  });

  it("guarantees an icon on every primary and learn item (NavItemWithIcon)", () => {
    for (const item of [...primaryNav, ...learnNav]) {
      expect(item.icon, `${item.label} is missing its icon`).toBeTruthy();
    }
  });

  it("preserves declaration order within each group", () => {
    const declaredPrimary = navItems.filter((i) => i.group === "primary").map((i) => i.href);
    expect(primaryNav.map((i) => i.href)).toEqual(declaredPrimary);
  });

  it("includes Home as the first primary item", () => {
    expect(primaryNav[0]).toMatchObject({ href: "/", label: "Home" });
  });

  it("marks only Analyze as the highlighted CTA", () => {
    const highlighted = navItems.filter((i) => i.highlight);
    expect(highlighted.map((i) => i.href)).toEqual(["/analyze"]);
  });

  it("opts auth-gated / heavy routes out of prefetch", () => {
    const noPrefetch = navItems.filter((i) => i.noPrefetch).map((i) => i.href).sort();
    expect(noPrefetch).toEqual(["/analyses", "/dashboard", "/saved"]);
  });
});

describe("footerColumns", () => {
  it("resolves every declared href to a real NavItem (none dropped)", () => {
    // The builder silently filters out unresolvable hrefs, so a typo in
    // FOOTER_COLUMN_HREFS would vanish from the footer with no error. Compare
    // against the raw source declaration to catch that.
    const source = readFileSync(join(process.cwd(), "lib", "nav.ts"), "utf8");
    const block = source.slice(
      source.indexOf("FOOTER_COLUMN_HREFS"),
      source.indexOf("export interface FooterColumn"),
    );
    const declared = [...block.matchAll(/"(\/[^"]*)"/g)].map((m) => m[1]);
    const resolved = footerColumns.flatMap((c) => c.links.map((l) => l.href));

    expect(declared.length).toBeGreaterThan(0);
    expect(resolved.length, "a footer href failed to resolve against navItems").toBe(
      declared.length,
    );
    expect(resolved.sort()).toEqual(declared.sort());
  });

  it("takes labels from navItems so the footer cannot drift from the sidebar", () => {
    const canonical = new Map(navItems.map((i) => [i.href, i.label]));
    for (const column of footerColumns) {
      for (const link of column.links) {
        expect(link.label).toBe(canonical.get(link.href));
      }
    }
  });

  it("has three titled, non-empty columns", () => {
    expect(footerColumns).toHaveLength(3);
    expect(footerColumns.map((c) => c.title)).toEqual(["Explore", "Learn", "About"]);
    for (const column of footerColumns) {
      expect(column.links.length, `${column.title} column is empty`).toBeGreaterThan(0);
    }
  });

  it("lists no destination in more than one column", () => {
    const hrefs = footerColumns.flatMap((c) => c.links.map((l) => l.href));
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("surfaces /questions, which used to be footer-only and drifted", () => {
    // Regression guard from the IA consolidation: /questions must exist in the
    // canonical list AND still appear in the footer.
    expect(navItems.some((i) => i.href === "/questions")).toBe(true);
    const inFooter = footerColumns.some((c) => c.links.some((l) => l.href === "/questions"));
    expect(inFooter).toBe(true);
  });
});

describe("no local nav link arrays in Sidebar/Footer (SOT regression guard)", () => {
  const files = ["components/Sidebar.tsx", "components/Footer.tsx"];

  it.each(files)("%s imports from @/lib/nav", (file) => {
    const source = readFileSync(join(process.cwd(), ...file.split("/")), "utf8");
    expect(source).toMatch(/from\s+["']@\/lib\/nav["']/);
  });
});

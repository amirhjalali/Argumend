import { test as base, expect, type Locator, type Page } from "@playwright/test";

/**
 * Every browser test runs with two guards, checked when the test ends:
 *
 *  - no request leaves the server's own host. Anything else is aborted and
 *    recorded; the site runs offline by default, so any attempt is a
 *    regression (a tracker, a font CDN, a model provider).
 *  - no console error and no uncaught page error, which is where hydration
 *    mismatches and client crashes surface in a production build.
 *
 * The fixture callback's second argument is named `provide` rather than the
 * conventional `use`, which the React hooks lint rule mistakes for React's
 * `use()`.
 */
interface Guards {
  externalRequests: string[];
  consoleErrors: string[];
}

export const test = base.extend<Guards>({
  externalRequests: [
    async ({ context, baseURL }, provide) => {
      const ownHost = new URL(baseURL ?? "http://127.0.0.1").host;
      const attempts: string[] = [];
      await context.route(
        (url) => url.host !== ownHost,
        (route) => {
          attempts.push(route.request().url());
          return route.abort("blockedbyclient");
        },
      );
      await provide(attempts);
      expect(attempts, "requests to a third party").toEqual([]);
    },
    { auto: true },
  ],
  consoleErrors: [
    async ({ page }, provide) => {
      const errors: string[] = [];
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      page.on("pageerror", (error) => errors.push(`Uncaught: ${error.message}`));
      await provide(errors);
      expect(errors, "console errors").toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };

/** The four primary destinations, in header order (lib/nav.ts). */
export const PRIMARY_NAV = ["Maps", "Paste an argument", "Learn", "About"];

/**
 * Resolves once React has hydrated `locator`'s element: React attaches its
 * props to a DOM node (`__reactProps$…`) when it takes the node over, and
 * only then do its handlers run. Clicking a server-rendered button before
 * that is silently lost, which is the classic source of e2e flakes.
 */
export async function waitForHydration(locator: Locator): Promise<void> {
  await expect
    .poll(() =>
      locator.evaluate((element) => Object.keys(element).some((key) => key.startsWith("__reactProps$"))),
    )
    .toBe(true);
}

/**
 * Elements that stick out past the right (or left) edge of the viewport and
 * are not inside a scroll or clip container of their own. `html` and `body`
 * clip horizontal overflow (globals.css), so the document never reports a
 * wider scroll width; content cut off by that clip is what a phone visitor
 * loses, and what this finds.
 */
export async function horizontalOverflow(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const width = document.documentElement.clientWidth;
    const offenders: string[] = [];
    if (document.body.scrollWidth > width + 1) {
      offenders.push(`body scrollWidth ${document.body.scrollWidth} > ${width}`);
    }
    for (const element of Array.from(document.body.querySelectorAll("*"))) {
      const rect = element.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;
      if (rect.right <= width + 1 && rect.left >= -1) continue;
      if (getComputedStyle(element).visibility === "hidden") continue;
      let contained = false;
      for (let parent = element.parentElement; parent && parent !== document.body; parent = parent.parentElement) {
        if (getComputedStyle(parent).overflowX !== "visible") {
          contained = true;
          break;
        }
      }
      if (contained) continue;
      const id = element.id ? `#${element.id}` : "";
      const label = (element.textContent ?? "").trim().slice(0, 40);
      offenders.push(
        `<${element.tagName.toLowerCase()}${id}> spans ${Math.round(rect.left)}–${Math.round(rect.right)}px: "${label}"`,
      );
    }
    return offenders;
  });
}

/** The page's words as a reader or crawler gets them: no scripts or styles, closed folds included. */
export async function pageText(page: Page): Promise<string> {
  return page.evaluate(() => {
    const clone = document.body.cloneNode(true) as HTMLElement;
    clone.querySelectorAll("script, style, noscript, template").forEach((node) => node.remove());
    return clone.textContent ?? "";
  });
}

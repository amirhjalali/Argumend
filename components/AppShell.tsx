import { Footer } from "@/components/Footer";
import { TopBar } from "@/components/TopBar";

interface AppShellProps {
  children: React.ReactNode;
  /**
   * Kept so the existing call sites need no edits. With the sidebar gone the
   * shell is the same for every page: the header, the page, the footer.
   * Width belongs to the page (components/ui `PageContainer`, "reading" or
   * "default"); this value is only recorded as `data-layout` on the frame.
   */
  layout?: "browse" | "reading";
}

/**
 * The one frame every route sits in: the sticky header (which owns all
 * navigation, including the phone menu), `<main id="main-content">` for the
 * skip link, and the footer. The window scrolls; nothing inside the frame
 * does, so the header stays at the top and anchors land below it.
 *
 * Not a client component: server pages render their content inside it
 * without shipping the page to the browser. TopBar is the client island.
 */
export function AppShell({ children, layout = "browse" }: AppShellProps) {
  return (
    <div
      data-layout={layout}
      className="flex min-h-[100svh] w-full flex-col font-sans text-primary dark:text-stone-200"
    >
      <TopBar />
      <main id="main-content" role="main" className="w-full min-w-0 flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

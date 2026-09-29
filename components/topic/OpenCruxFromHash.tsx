"use client";

import { useEffect } from "react";

/**
 * Opens the crux a link points at. "Open the map at this crux" (the paste
 * result) and the rail's "On this page" links land on `#crux-…`; without this
 * the reader arrives at a closed fold and has to find the toggle.
 */
export function OpenCruxFromHash() {
  useEffect(() => {
    const open = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id.startsWith("crux-")) return;
      const details = document.getElementById(id)?.querySelector("details");
      if (details && !details.open) details.open = true;
    };
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, []);
  return null;
}

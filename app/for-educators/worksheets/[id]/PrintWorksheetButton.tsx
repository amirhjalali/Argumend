"use client";

import { Printer } from "lucide-react";

export function PrintWorksheetButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-gradient-to-r from-rust-500 to-rust-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:from-rust-600 hover:to-rust-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rust-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#121210]"
    >
      <Printer className="h-4 w-4" aria-hidden="true" />
      <span className="hidden sm:inline">Print Worksheet</span>
      <span className="sm:hidden">Print</span>
    </button>
  );
}

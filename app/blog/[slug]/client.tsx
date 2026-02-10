"use client";

import { AppShell } from "@/components/AppShell";

export function BlogArticleClient({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}

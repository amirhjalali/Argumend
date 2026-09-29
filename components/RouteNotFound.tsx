import type { ReactNode } from "react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/Button";
import { PageContainer } from "@/components/ui/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";

interface RouteNotFoundProps {
  eyebrow: string;
  title: string;
  description: ReactNode;
  /** The one rust action: where to go instead. */
  primaryHref: string;
  primaryLabel: string;
  /** A second, outlined way out. Defaults to home. */
  secondaryHref?: string;
  secondaryLabel?: string;
  children?: ReactNode;
}

/**
 * The not-found page, for the root 404 and every route family that calls
 * `notFound()`. Inside the shell, so a visitor who lands on a dead link still
 * has the header, search and footer; built from the shared page primitives.
 */
export function RouteNotFound({
  eyebrow,
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref = "/",
  secondaryLabel = "Back to home",
  children,
}: RouteNotFoundProps) {
  return (
    <AppShell>
      <PageContainer width="reading" as="section" className="sm:pt-16">
        <PageHeader
          eyebrow={eyebrow}
          title={title}
          titleId="route-not-found-title"
          lede={description}
          className="mb-8"
        >
          <nav aria-label="Not found navigation" className="flex flex-wrap items-center gap-3">
            <Button href={primaryHref}>{primaryLabel}</Button>
            <Button href={secondaryHref} variant="secondary">
              {secondaryLabel}
            </Button>
          </nav>
        </PageHeader>
        {children}
      </PageContainer>
    </AppShell>
  );
}

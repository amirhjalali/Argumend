import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { toneStyles, type Tone } from "@/lib/categoryColors";
import { cx } from "./cx";

export type ChipSize = "sm";

const CHIP_BASE = "inline-flex items-center gap-1.5 rounded-full border font-sans font-medium";

const CHIP_SIZES: Record<ChipSize, string> = {
  sm: "px-2.5 py-0.5 text-xs",
};

interface ChipProps {
  /** From the one tone map in lib/categoryColors.ts. There is no crux tone. */
  tone?: Tone;
  size?: ChipSize;
  icon?: LucideIcon;
  /** Makes the chip a link, with a 44px touch target. */
  href?: string;
  className?: string;
  children: ReactNode;
}

/**
 * A small label: a category, a kind, a tag. Never a status verdict and never
 * a crux (crimson belongs to the crux components). Tones come from
 * `toneStyles`, so a chip is the same colour wherever that family appears.
 */
export function Chip({ tone = "neutral", size = "sm", icon: Icon, href, className, children }: ChipProps) {
  const classes = cx(
    CHIP_BASE,
    CHIP_SIZES[size],
    toneStyles[tone].chip,
    href ? "min-h-11 transition-opacity hover:opacity-80" : null,
    className,
  );
  const content = (
    <>
      {Icon ? <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={1.8} aria-hidden="true" /> : null}
      {children}
    </>
  );
  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }
  return <span className={classes}>{content}</span>;
}

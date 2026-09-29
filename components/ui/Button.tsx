import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "./cx";

export type ButtonVariant = "primary" | "secondary" | "quiet";
export type ButtonSize = "md" | "lg";

const BUTTON_BASE =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg font-sans font-medium transition-colors " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas " +
  "disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50";

const BUTTON_SIZES: Record<ButtonSize, string> = {
  md: "px-5 py-2 text-sm",
  lg: "min-h-12 px-6 py-2.5 text-base",
};

/**
 * primary    THE brand CTA, one per page: the rust 600→700 gradient, white
 *            text (5.0:1 on rust-600). Same look as the `.btn-primary` class.
 * secondary  an outlined action beside a primary one.
 * quiet      a ghost action: no fill, no border until hover.
 */
const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-b from-rust-600 to-rust-700 text-white shadow-sm hover:from-rust-700 hover:to-rust-800 focus-visible:ring-focus",
  secondary:
    "border border-stone-300/80 bg-card text-primary hover:border-stone-400 hover:bg-subtle focus-visible:ring-focus dark:border-divider dark:hover:border-stone-500",
  quiet: "text-secondary hover:bg-subtle hover:text-primary focus-visible:ring-focus",
};

/** The class string behind `<Button>`, for the rare element that cannot be one. */
export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}): string {
  return cx(BUTTON_BASE, BUTTON_SIZES[size], BUTTON_VARIANTS[variant], className);
}

interface ButtonOwnProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

type LinkOwnProps = { href: string; prefetch?: boolean };

export type ButtonProps =
  | (ButtonOwnProps &
      Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonOwnProps> & { href?: undefined })
  | (ButtonOwnProps &
      LinkOwnProps &
      Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonOwnProps | "href">);

/**
 * A button, or a link that looks like one when given `href` (rendered with
 * next/link). Always at least 44px tall. Use `variant="primary"` once per
 * page; everything else is secondary, quiet, or a `TextAction`.
 */
export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { variant, size, className, children, href, prefetch, ...anchor } = props;
    return (
      <Link
        href={href}
        prefetch={prefetch}
        className={buttonClasses({ variant, size, className })}
        {...anchor}
      >
        {children}
      </Link>
    );
  }
  const { variant, size, className, children, type = "button", href: _href, ...button } = props;
  return (
    <button type={type} className={buttonClasses({ variant, size, className })} {...button}>
      {children}
    </button>
  );
}

const TEXT_ACTION =
  "inline-flex min-h-11 items-center rounded-sm font-sans text-sm text-deep underline underline-offset-2 transition-colors " +
  "hover:text-deep-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus " +
  "disabled:cursor-not-allowed disabled:opacity-60 dark:text-accent-text dark:hover:text-stone-200";

/** The class string behind `<TextAction>`. */
export function textActionClasses(className?: string): string {
  return cx(TEXT_ACTION, className);
}

interface TextActionOwnProps {
  className?: string;
  children: ReactNode;
}

export type TextActionProps =
  | (TextActionOwnProps &
      Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof TextActionOwnProps> & {
        href?: undefined;
      })
  | (TextActionOwnProps &
      LinkOwnProps &
      Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof TextActionOwnProps | "href">);

/**
 * The quiet, underlined teal action that follows a primary button ("See an
 * example", "Edit", "Analyze another"). A link with `href`, a button without.
 */
export function TextAction(props: TextActionProps) {
  if (props.href !== undefined) {
    const { className, children, href, prefetch, ...anchor } = props;
    return (
      <Link href={href} prefetch={prefetch} className={textActionClasses(className)} {...anchor}>
        {children}
      </Link>
    );
  }
  const { className, children, type = "button", href: _href, ...button } = props;
  return (
    <button type={type} className={textActionClasses(className)} {...button}>
      {children}
    </button>
  );
}

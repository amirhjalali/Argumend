/**
 * Elegant staggered-line menu icon.
 *
 * Three horizontal lines with decreasing widths — feels more
 * designed than the standard equal-width hamburger.
 */

interface MenuIconProps {
  className?: string;
}

export function MenuIcon({ className }: MenuIconProps) {
  return (
    <svg
      viewBox="0 0 20 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="1" y1="2" x2="19" y2="2" />
      <line x1="1" y1="8" x2="15" y2="8" />
      <line x1="1" y1="14" x2="11" y2="14" />
    </svg>
  );
}

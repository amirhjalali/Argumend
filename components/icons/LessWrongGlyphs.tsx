import { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export const LWSunIcon = ({ className, ...props }: IconProps) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="16" cy="16" r="5.5" />
    <path d="M16 4.5v3.5" />
    <path d="M16 24v3.5" />
    <path d="M4.5 16h3.5" />
    <path d="M24 16h3.5" />
    <path d="M7.3 7.3l2.5 2.5" />
    <path d="M22.2 22.2l2.5 2.5" />
    <path d="M24.7 7.3l-2.5 2.5" />
    <path d="M9.8 22.2l-2.5 2.5" />
  </svg>
);

export const LWListIcon = ({ className, ...props }: IconProps) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect x="7" y="8" width="18" height="16" rx="2.8" />
    <path d="M11 12.5h10" />
    <path d="M11 16h10" />
    <path d="M11 19.5h6" />
  </svg>
);

export const LWBookIcon = ({ className, ...props }: IconProps) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M6.5 8.5H14a4 4 0 0 1 4 4v11.5H10.5a4 4 0 0 0-4-4z" />
    <path d="M25.5 8.5H18a4 4 0 0 0-4 4v11.5h7.5a4 4 0 0 1 4 4z" />
    <path d="M16 8.5v15.5" />
  </svg>
);

export const LWCommunityIcon = ({ className, ...props }: IconProps) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="11" cy="12" r="3.2" />
    <circle cx="21" cy="12" r="3.2" />
    <path d="M6.5 23.5c0-3.3 2.8-6 6.2-6h0.6c3.4 0 6.2 2.7 6.2 6" />
    <path d="M12 19.5l4 2 4-2" />
  </svg>
);

export const LWQuestionIcon = ({ className, ...props }: IconProps) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="16" cy="16" r="10.5" />
    <path d="M13.5 13.7a2.7 2.7 0 1 1 4.5 2c-.8.6-1.5 1.2-1.5 2.3v.5" />
    <path d="M15.9 22.5h.1" />
  </svg>
);


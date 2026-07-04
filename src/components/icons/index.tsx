import type { SVGProps } from "react";

type IconName =
  | "check"
  | "shield"
  | "dollar"
  | "award"
  | "calendar"
  | "users"
  | "chart"
  | "home"
  | "briefcase"
  | "graduation"
  | "heart"
  | "building"
  | "seedling"
  | "trending"
  | "file"
  | "clock"
  | "map-pin"
  | "arrow-right";

const paths: Record<IconName, React.ReactNode> = {
  check: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  ),
  shield: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
    />
  ),
  dollar: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"
    />
  ),
  award: (
    <>
      <circle cx="12" cy="8" r="6" strokeWidth={1.75} />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
    </>
  ),
  calendar: (
  <>
    <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth={1.75} />
    <path strokeLinecap="round" strokeWidth={1.75} d="M16 2v4M8 2v4M3 10h18" />
  </>
  ),
  users: (
    <>
      <path strokeLinecap="round" strokeWidth={1.75} d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" strokeWidth={1.75} />
      <path strokeLinecap="round" strokeWidth={1.75} d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </>
  ),
  chart: (
    <>
      <path strokeLinecap="round" strokeWidth={1.75} d="M18 20V10M12 20V4M6 20v-6" />
    </>
  ),
  home: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
    />
  ),
  briefcase: (
    <>
      <rect x="2" y="7" width="20" height="14" rx="2" strokeWidth={1.75} />
      <path strokeLinecap="round" strokeWidth={1.75} d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
    </>
  ),
  graduation: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M22 10l-10 5L2 10l10-5 10 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" />
    </>
  ),
  heart: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
    />
  ),
  building: (
    <>
      <rect x="4" y="2" width="16" height="20" rx="2" strokeWidth={1.75} />
      <path strokeLinecap="round" strokeWidth={1.75} d="M9 22v-4h6v4M9 6h.01M15 6h.01M9 10h.01M15 10h.01M9 14h.01M15 14h.01" />
    </>
  ),
  seedling: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M12 22V12M12 12C12 6 18 4 18 4s-2 6-8 6M12 12C12 6 6 4 6 4s2 6 6 6"
    />
  ),
  trending: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M23 6l-9.5 9.5-5-5L1 18" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 6h6v6" />
    </>
  ),
  file: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <path strokeLinecap="round" strokeWidth={1.75} d="M14 2v6h6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10" strokeWidth={1.75} />
      <path strokeLinecap="round" strokeWidth={1.75} d="M12 6v6l4 2" />
    </>
  ),
  "map-pin": (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" strokeWidth={1.75} />
    </>
  ),
  "arrow-right": (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
  ),
};

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

export function Icon({ name, size = 20, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}

export function IconCircle({
  name,
  className = "",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <div
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold ${className}`}
    >
      <Icon name={name} size={20} />
    </div>
  );
}

export type { IconName };

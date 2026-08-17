/**
 * Feature-index icons, authored in the illustration grammar: 1.5px
 * `currentColor` strokes, rounded caps, one consistent weight. Kept tiny and
 * literal — they mark ledger rows, they don't decorate.
 */

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 20 20"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="shrink-0"
    >
      {children}
    </svg>
  );
}

export function SplitIcon() {
  return (
    <Icon>
      <path d="M10 3v4.5" />
      <path d="M10 7.5C10 11 5.5 10.5 5.5 16" />
      <path d="M10 7.5c0 3.5 4.5 3 4.5 8.5" />
      <path d="M4 14.5 5.5 16 7 14.5" />
      <path d="M13 14.5 14.5 16 16 14.5" />
    </Icon>
  );
}

export function ScaleIcon() {
  return (
    <Icon>
      <path d="M10 3.5v13" />
      <path d="M7.5 16.5h5" />
      <path d="M4.5 5.5h11" />
      <path d="M4.5 5.5 2.75 10a2.35 2.35 0 0 0 3.5 0L4.5 5.5Z" />
      <path d="M15.5 5.5 13.75 10a2.35 2.35 0 0 0 3.5 0L15.5 5.5Z" />
    </Icon>
  );
}

export function UsersIcon() {
  return (
    <Icon>
      <circle cx="7" cy="7" r="2.6" />
      <path d="M2.5 16c.7-3.3 2.4-5 4.5-5s3.8 1.7 4.5 5" />
      <circle cx="14" cy="7.5" r="2.1" opacity="0.6" />
      <path d="M13.5 11.5c1.9.2 3.3 1.7 3.9 4.5" opacity="0.6" />
    </Icon>
  );
}

export function WalletIcon() {
  return (
    <Icon>
      <rect x="2.75" y="5" width="14.5" height="10.5" rx="2" />
      <path d="M2.75 8.25H12" />
      <path d="M13.5 11.75h2" />
    </Icon>
  );
}

export function TagIcon() {
  return (
    <Icon>
      <path d="M3 3h5.9l8 8-5.9 5.9-8-8V3Z" />
      <circle cx="6.6" cy="6.6" r="1" />
    </Icon>
  );
}

export function ChartIcon() {
  return (
    <Icon>
      <path d="M3 16.5h14" />
      <path d="M5.5 16.5v-4.5" />
      <path d="M10 16.5v-8" />
      <path d="M14.5 16.5V4.5" />
    </Icon>
  );
}

export function JarIcon() {
  return (
    <Icon>
      <path d="M7 5.5V4h6v1.5" />
      <rect x="5" y="5.5" width="10" height="11" rx="2.5" />
      <path d="M8.25 10.5h3.5" />
    </Icon>
  );
}

export function RepeatIcon() {
  return (
    <Icon>
      <path d="M4.5 8.5a6 6 0 0 1 10.3-2.7" />
      <path d="M15 2.75V6h-3.25" />
      <path d="M15.5 11.5a6 6 0 0 1-10.3 2.7" />
      <path d="M5 17.25V14h3.25" />
    </Icon>
  );
}

export function ScanIcon() {
  return (
    <Icon>
      <path d="M3 6V4.75A1.75 1.75 0 0 1 4.75 3H6" />
      <path d="M14 3h1.25A1.75 1.75 0 0 1 17 4.75V6" />
      <path d="M17 14v1.25A1.75 1.75 0 0 1 15.25 17H14" />
      <path d="M6 17H4.75A1.75 1.75 0 0 1 3 15.25V14" />
      <path d="M6.5 10h7" />
    </Icon>
  );
}

export function BellIcon() {
  return (
    <Icon>
      <path d="M10 3.25A4.75 4.75 0 0 1 14.75 8c0 3.1 1 4.6 1.5 5.25H3.75C4.25 12.6 5.25 11.1 5.25 8A4.75 4.75 0 0 1 10 3.25Z" />
      <path d="M8.5 15.75a1.5 1.5 0 0 0 3 0" />
    </Icon>
  );
}

export function ExportIcon() {
  return (
    <Icon>
      <path d="M10 3.5v8" />
      <path d="M7 6.25 10 3.25l3 3" />
      <path d="M3.75 12.5v2.25a1.75 1.75 0 0 0 1.75 1.75h9a1.75 1.75 0 0 0 1.75-1.75V12.5" />
    </Icon>
  );
}

export function TemplateIcon() {
  return (
    <Icon>
      <rect x="3" y="3" width="10" height="10" rx="2" />
      <path d="M7 16.5h8A1.5 1.5 0 0 0 16.5 15V7" />
    </Icon>
  );
}

export function GlobeIcon() {
  return (
    <Icon>
      <circle cx="10" cy="10" r="7" />
      <path d="M10 3c-2.4 2-2.4 12 0 14" />
      <path d="M10 3c2.4 2 2.4 12 0 14" />
      <path d="M3.25 10h13.5" />
    </Icon>
  );
}

export function CloudCheckIcon() {
  return (
    <Icon>
      <path d="M6.25 15.5h8.25a2.9 2.9 0 0 0 .55-5.75 5 5 0 0 0-9.55-1.1A3.4 3.4 0 0 0 6.25 15.5Z" />
      <path d="m7.75 10.75 1.9 1.9 3.1-3.4" />
    </Icon>
  );
}

export function SunIcon() {
  return (
    <Icon>
      <circle cx="10" cy="10" r="4" />
      <path d="M10 2.75v1.75M10 15.5v1.75M2.75 10h1.75M15.5 10h1.75M4.9 4.9l1.25 1.25M13.85 13.85l1.25 1.25M15.1 4.9l-1.25 1.25M6.15 13.85 4.9 15.1" />
    </Icon>
  );
}

export function MoonIcon() {
  return (
    <Icon>
      <path d="M16.5 11.5A6.75 6.75 0 1 1 8.5 3.5a5.4 5.4 0 0 0 8 8Z" />
    </Icon>
  );
}

export function KeyIcon() {
  return (
    <Icon>
      <circle cx="6.5" cy="13.5" r="3.1" />
      <path d="m8.9 11.1 7.35-7.35" />
      <path d="m13.5 6.5 2 2" />
    </Icon>
  );
}

import type { ReactNode } from "react";

export function SilverText({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`text-silver ${className}`}>{children}</span>;
}

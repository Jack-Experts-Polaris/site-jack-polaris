"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";

export function SpotlightCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  function move(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    element.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    element.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }
  return <div ref={ref} onPointerMove={move} className={`fx-spotlight ${className}`}>{children}</div>;
}

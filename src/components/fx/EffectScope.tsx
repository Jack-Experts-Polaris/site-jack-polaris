"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/** CSS loops only run while this surface is visible, including tab visibility. */
export function EffectScope({ children, className = "", style, decorative = false }: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  decorative?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let visible = false;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => element.style.setProperty("--fx-play-state", visible && !document.hidden && !media.matches ? "running" : "paused");
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", sync);
    media.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      media.removeEventListener("change", sync);
    };
  }, []);

  return <div ref={ref} className={`fx-scope ${className}`} style={style} aria-hidden={decorative ? true : undefined}>{children}</div>;
}

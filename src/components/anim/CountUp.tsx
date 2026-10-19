"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

export function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 1.4,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const reducedMotion = useReducedMotion();
  const [current, setCurrent] = useState(0);
  const decimals = (String(value).split(".")[1] ?? "").length;
  const formatted = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(reducedMotion ? value : current);

  useEffect(() => {
    if (!inView || reducedMotion) return;
    let frame = 0;
    let start: number | undefined;
    const tick = (now: number) => {
      start ??= now;
      const progress = Math.min((now - start) / Math.max(duration * 1000, 1), 1);
      setCurrent(value * (1 - (1 - progress) ** 3));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [duration, inView, reducedMotion, value]);

  return <span ref={ref} className={`tabular-nums ${className ?? ""}`}>{prefix}{formatted}{suffix}</span>;
}

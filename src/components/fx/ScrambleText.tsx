"use client";

import { useEffect, useRef } from "react";

const glyphs = "01/{}[]#*+ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function ScrambleText({ text, className = "", repeat = true }: { text: string; className?: string; repeat?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let timer: ReturnType<typeof setTimeout>;
    let frame = 0;
    function tick() {
      if (!element) return;
      const resolved = Math.floor((frame / 24) * text.length);
      element.textContent = Array.from(text, (char, i) => i < resolved || char === " " ? char : glyphs[(i * 13 + frame * 7) % glyphs.length]).join("");
      frame++;
      if (frame <= 24) timer = setTimeout(tick, 45);
      else {
        element.textContent = text;
        frame = 0;
        if (repeat) timer = setTimeout(tick, 6500);
      }
    }
    const sync = () => {
      clearTimeout(timer);
      element.textContent = text;
      frame = 0;
      if (visible && !media.matches && !document.hidden) timer = setTimeout(tick, 350);
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(element);
    document.addEventListener("visibilitychange", sync);
    media.addEventListener("change", sync);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      media.removeEventListener("change", sync);
      element.textContent = text;
    };
  }, [text, repeat]);
  return <span className={`inline-grid ${className}`}><span className="sr-only">{text}</span><span aria-hidden="true" className="invisible col-start-1 row-start-1">{text}</span><span aria-hidden="true" ref={ref} className="col-start-1 row-start-1 whitespace-pre">{text}</span></span>;
}

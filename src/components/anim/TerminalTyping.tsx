"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

type Line = { text: string; tone?: "code" | "comment" | "out" };

const tokenPattern = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|\b(?:const|let|await|return|import|from|async|true|false|new|if|else|export)\b)/g;

function Syntax({ text }: { text: string }) {
  return text.split(tokenPattern).map((part, index) => {
    const color = /^["'`]/.test(part) ? "#ba9cff" : /^(const|let|await|return|import|from|async|true|false|new|if|else|export)$/.test(part) ? "#9cb2ff" : undefined;
    return <span key={index} style={color ? { color } : undefined}>{part}</span>;
  });
}

export function TerminalTyping({ lines, className, title = "gateway.ts" }: { lines: Line[]; className?: string; title?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [characters, setCharacters] = useState(0);
  const reducedMotion = useReducedMotion();
  const total = useMemo(() => lines.reduce((sum, line) => sum + line.text.length + 1, 0), [lines]);
  const count = reducedMotion ? total : characters;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setStarted(true);
        observer.disconnect();
      }
    }, { rootMargin: "0px 0px -10% 0px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started || reducedMotion || characters >= total) return;
    const timer = window.setInterval(() => setCharacters((count) => Math.min(count + 1, total)), 24);
    return () => window.clearInterval(timer);
  }, [characters, reducedMotion, started, total]);

  return (
    <div ref={ref} className={`surface min-w-0 max-w-full overflow-hidden rounded-[16px] ${className ?? ""}`}>
      <div className="flex h-10 items-center gap-1.5 border-b border-steel/20 px-4">
        <span className="h-[6px] w-[6px] rounded-full bg-steel/70" />
        <span className="h-[6px] w-[6px] rounded-full bg-dusk/60" />
        <span className="h-[6px] w-[6px] rounded-full bg-steel/40" />
        <span className="ml-3 font-mono text-[11px] text-fog">{title}</span>
      </div>
      <div className="overflow-x-auto overscroll-x-contain px-4 py-5 font-mono text-[13px] leading-6 md:text-[14px]">
        <div className="w-max min-w-full">
          {lines.map((line, index) => {
            const start = lines.slice(0, index).reduce((sum, previous) => sum + previous.text.length + 1, 0);
            const shown = Math.max(0, Math.min(line.text.length, count - start));
            if (count < start || (!started && !reducedMotion)) return null;
            const visibleText = line.text.slice(0, shown);
            const caret = !reducedMotion && started && ((count < total && count >= start && count <= start + line.text.length) || (count >= total && index === lines.length - 1));
            return (
              <div key={index} className={`whitespace-pre ${line.tone === "comment" ? "text-steel" : line.tone === "out" ? "text-lavender" : "text-lilac"}`}>
                {line.tone === "code" || !line.tone ? <Syntax text={visibleText} /> : visibleText}
                {caret && <span className="ml-0.5 inline-block h-[1em] w-[1px] animate-pulse bg-lavender align-[-2px]" />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

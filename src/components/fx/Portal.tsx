"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { EffectScope } from "./EffectScope";

export function Portal({ className = "", interactive = false }: { className?: string; interactive?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { stiffness: 45, damping: 24 });
  const y = useSpring(mouseY, { stiffness: 45, damping: 24 });

  useEffect(() => {
    const element = ref.current;
    if (!element || !interactive) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const move = (event: PointerEvent) => {
      if (!visible || media.matches || event.pointerType === "touch") return;
      mouseX.set((event.clientX / window.innerWidth - 0.5) * 20);
      mouseY.set((event.clientY / window.innerHeight - 0.5) * 12);
    };
    const reset = () => { mouseX.set(0); mouseY.set(0); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (!visible) reset(); });
    observer.observe(element);
    window.addEventListener("pointermove", move, { passive: true });
    media.addEventListener("change", reset);
    return () => { observer.disconnect(); window.removeEventListener("pointermove", move); media.removeEventListener("change", reset); };
  }, [interactive, mouseX, mouseY]);

  return (
    <div ref={ref} className={`fx-portal ${className}`} aria-hidden="true">
      <EffectScope className="fx-portal-stage">
        <motion.div className="fx-portal-parallax" style={{ x, y }}>
          <div className="fx-portal-bloom fx-loop" />
          <div className="fx-portal-rings fx-loop">
            {[0, 1, 2, 3, 4].map((ring) => <i key={ring} className={`fx-portal-ring fx-portal-ring-${ring}`} />)}
          </div>
          <svg className="fx-portal-orbits" viewBox="0 0 1000 760" fill="none">
            {[245, 330, 420].map((radius, i) => (
              <g key={radius} className="fx-orbit-turn fx-loop" style={{ animationDuration: `${80 + i * 25}s`, animationDirection: i === 1 ? "reverse" : "normal" }}>
                <circle cx="500" cy="445" r={radius} stroke="#9382ff" strokeOpacity={0.2 - i * 0.04} />
                {[0, 1, 2, 3].map((node) => {
                  const angle = (node * Math.PI) / 2 + i * 0.5;
                  return <circle key={node} cx={500 + Math.cos(angle) * radius} cy={445 + Math.sin(angle) * radius} r={node === 1 ? 3 : 2} fill="#10093a" stroke="#ba9cff" strokeOpacity=".55" />;
                })}
              </g>
            ))}
          </svg>
        </motion.div>
      </EffectScope>
    </div>
  );
}

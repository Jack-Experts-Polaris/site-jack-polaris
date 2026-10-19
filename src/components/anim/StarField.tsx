"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  phase: number;
  depth: number;
};

export function StarField({ className, density = 1 }: { className?: string; density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stars: Star[] = Array.from({ length: Math.max(0, Math.round(180 * density)) }, () => ({
      x: Math.random(),
      y: Math.random(),
      radius: 0.5 + Math.random() * 1.1,
      opacity: 0.13 + Math.random() * 0.48,
      phase: Math.random() * Math.PI * 2,
      depth: 1 + Math.floor(Math.random() * 3),
    }));
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    let pointerX = 0;
    let pointerY = 0;
    let nextShooting = performance.now() + 6000 + Math.random() * 4000;
    let shootingStart = -Infinity;
    let shootingX = 0;
    let shootingY = 0;

    const draw = (now: number) => {
      context.clearRect(0, 0, width, height);
      const reduced = media.matches;
      for (const star of stars) {
        const drift = reduced ? 0 : now * 0.000003 * star.depth;
        const x = ((star.x + drift) % 1) * width + (reduced ? 0 : pointerX * star.depth * 2.5);
        const y = star.y * height + (reduced ? 0 : Math.sin(now * 0.00016 + star.phase) * star.depth * 1.5 + pointerY * star.depth * 2.5);
        const twinkle = reduced ? 1 : 0.78 + Math.sin(now * 0.001 + star.phase) * 0.22;
        context.beginPath();
        context.arc(x, y, star.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(244, 240, 255, ${star.opacity * twinkle})`;
        context.fill();
      }

      if (!reduced) {
        if (now >= nextShooting) {
          shootingStart = now;
          shootingX = width * (0.15 + Math.random() * 0.55);
          shootingY = height * (0.08 + Math.random() * 0.4);
          nextShooting = now + 6000 + Math.random() * 4000;
        }
        const progress = (now - shootingStart) / 850;
        if (progress >= 0 && progress < 1) {
          const x = shootingX + progress * 110;
          const y = shootingY + progress * 42;
          const gradient = context.createLinearGradient(x - 48, y - 18, x, y);
          gradient.addColorStop(0, "rgba(186, 156, 255, 0)");
          gradient.addColorStop(1, `rgba(244, 240, 255, ${Math.sin(progress * Math.PI) * 0.42})`);
          context.beginPath();
          context.moveTo(x - 48, y - 18);
          context.lineTo(x, y);
          context.strokeStyle = gradient;
          context.lineWidth = 1;
          context.stroke();
        }
      }
    };

    const tick = (now: number) => {
      draw(now);
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      if (visible && !document.hidden && !media.matches) frame = requestAnimationFrame(tick);
      else if (media.matches) draw(0);
    };
    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now());
    };
    const onPointer = (event: PointerEvent) => {
      pointerX = event.clientX / window.innerWidth - 0.5;
      pointerY = event.clientY / window.innerHeight - 0.5;
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    const resizeObserver = new ResizeObserver(resize);
    observer.observe(canvas);
    resizeObserver.observe(canvas);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", sync);
    media.addEventListener("change", sync);
    resize();
    sync();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", sync);
      media.removeEventListener("change", sync);
    };
  }, [density]);

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className ?? ""}`} />;
}

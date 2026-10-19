"use client";

import { useEffect, useRef } from "react";
import "./PolarisTrails.css";

const TAU = Math.PI * 2;
const colors = ["229,156,255", "186,156,255", "156,178,255", "244,240,255"];

/** Long exposures around a fixed pole. The detailed sky is cached, then rotated as one layer. */
export function PolarisTrails() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const canvas = canvasRef.current;
    if (!scene || !canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const sky = document.createElement("canvas");
    const ink = sky.getContext("2d");
    if (!ink) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let diameter = 0;
    let dpr = 1;
    let frame = 0;
    let visible = false;
    let previousTime = 0;
    let elapsed = 0;
    let rotation = 0;
    let scrollImpulse = 0;
    let lastScroll = window.scrollY;
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;

    const render = () => {
      context.clearRect(0, 0, width, height);
      context.save();
      context.translate(width / 2 + x, height / 2 + y);
      context.rotate(rotation);
      context.drawImage(sky, -diameter / 2, -diameter / 2, diameter, diameter);
      context.restore();
      // Keep the star fixed relative to its sky, without inheriting the rotation.
      scene.style.setProperty("--polaris-x", `${x.toFixed(2)}px`);
      scene.style.setProperty("--polaris-y", `${y.toFixed(2)}px`);
      scene.style.setProperty("--polaris-breath", String(media.matches ? 1 : 0.9 + Math.sin(elapsed * 0.00065) * 0.1));
    };

    const paintSky = () => {
      let seed = 20261019;
      const random = () => {
        seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
        return seed / 4294967296;
      };
      ink.clearRect(0, 0, diameter, diameter);
      ink.save();
      ink.translate(diameter / 2, diameter / 2);
      ink.lineCap = "round";
      const mobile = width < 800;
      const count = mobile ? 280 : 520;
      const radius = diameter * 0.47;

      for (let index = 0; index < count; index++) {
        const depth = Math.pow(random(), 1.35);
        const r = 28 + depth * (radius - 28);
        const start = random() * TAU;
        const length = 0.2 + random() * 1.05;
        const color = colors[Math.floor(random() * colors.length)];
        const alpha = (0.3 + random() * 0.7) * Math.pow(1 - depth, 0.65);
        const lineWidth = 0.45 + random() * 0.65;
        // A conic gradient follows the arc continuously, with no seams between segments.
        const gradient = ink.createConicGradient(start, 0, 0);
        gradient.addColorStop(0, `rgba(${color},0)`);
        gradient.addColorStop(length / TAU * 0.45, `rgba(${color},${alpha * 0.15})`);
        gradient.addColorStop(length / TAU, `rgba(${color},${alpha})`);
        gradient.addColorStop(Math.min(1, length / TAU + 0.001), `rgba(${color},0)`);
        ink.beginPath();
        ink.arc(0, 0, r, start, start + length);
        ink.strokeStyle = gradient;
        ink.lineWidth = lineWidth;
        ink.stroke();
        const head = start + length;
        ink.beginPath();
        ink.arc(Math.cos(head) * r, Math.sin(head) * r, lineWidth * 0.7, 0, TAU);
        ink.fillStyle = `rgba(244,240,255,${alpha * 0.85})`;
        ink.fill();
      }
      ink.restore();
    };

    const resize = () => {
      const bounds = scene.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      diameter = Math.min(width, 1480);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      sky.width = sky.height = Math.round(diameter * dpr);
      ink.setTransform(dpr, 0, 0, dpr, 0, 0);
      paintSky();
      render();
    };

    const tick = (now: number) => {
      const delta = previousTime ? Math.min(now - previousTime, 48) : 16;
      previousTime = now;
      elapsed += delta;
      const ease = 1 - Math.exp(-delta / 180);
      x += (targetX - x) * ease;
      y += (targetY - y) * ease;
      rotation += delta * (0.000014 + scrollImpulse * 0.000025);
      scrollImpulse *= Math.exp(-delta / 350);
      render();
      frame = requestAnimationFrame(tick);
    };

    const sync = () => {
      cancelAnimationFrame(frame);
      previousTime = 0;
      if (media.matches) {
        x = y = targetX = targetY = rotation = 0;
        render();
      } else if (visible && !document.hidden) {
        lastScroll = window.scrollY;
        frame = requestAnimationFrame(tick);
      }
    };

    const move = (event: PointerEvent) => {
      if (!visible || document.hidden || media.matches || event.pointerType === "touch") return;
      targetX = (event.clientX / window.innerWidth - 0.5) * 16;
      targetY = (event.clientY / window.innerHeight - 0.5) * 8;
    };
    const reset = () => { targetX = targetY = 0; };
    const scroll = () => {
      const next = window.scrollY;
      if (visible && !document.hidden && !media.matches) {
        scrollImpulse = Math.min(scrollImpulse + Math.abs(next - lastScroll) / 180, 1.5);
      }
      lastScroll = next;
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    const resizeObserver = new ResizeObserver(resize);
    observer.observe(scene);
    resizeObserver.observe(scene);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", scroll, { passive: true });
    document.documentElement.addEventListener("pointerleave", reset);
    document.addEventListener("visibilitychange", sync);
    media.addEventListener("change", sync);
    resize();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", scroll);
      document.documentElement.removeEventListener("pointerleave", reset);
      document.removeEventListener("visibilitychange", sync);
      media.removeEventListener("change", sync);
    };
  }, []);

  return (
    <div ref={sceneRef} className="polaris-trails" aria-hidden="true">
      <canvas ref={canvasRef} className="polaris-trails-canvas" />
      <div className="polaris-pole">
        <div className="polaris-halo" />
        <div className="polaris-flare" />
        <svg className="polaris-star" viewBox="0 0 104 112" fill="none">
          <path d="M52 0 56.5 50 104 56 56.5 62 52 112 47.5 62 0 56 47.5 50Z" fill="#f4f0ff" />
        </svg>
      </div>
    </div>
  );
}

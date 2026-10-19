"use client";

import { useEffect, useId, useRef } from "react";
import { EffectScope } from "./EffectScope";

const TAU = Math.PI * 2;
const ground = { x: 720, y: 1490, radius: 1322 };
const orbits = [
  { rx: 650, ry: 180, tilt: -8, cy: 254, duration: 100 },
  { rx: 550, ry: 132, tilt: 10, cy: 260, duration: 86 },
  { rx: 440, ry: 100, tilt: -13, cy: 234, duration: 72 },
];
const satellites = [
  { label: "OpenAI", orbit: 0, phase: -2.35 },
  { label: "Anthropic", orbit: 0, phase: -0.66 },
  { label: "Bedrock", orbit: 1, phase: -2.1 },
  { label: "Vertex", orbit: 1, phase: 0.45 },
  { label: "chat-padrao", orbit: 2, phase: -1.55 },
];

function position(satellite: (typeof satellites)[number], elapsed: number) {
  const orbit = orbits[satellite.orbit];
  const angle = satellite.phase + (elapsed / orbit.duration) * TAU;
  const tilt = (orbit.tilt * Math.PI) / 180;
  const x = orbit.rx * Math.cos(angle);
  const y = orbit.ry * Math.sin(angle);
  return {
    x: ground.x + x * Math.cos(tilt) - y * Math.sin(tilt),
    y: orbit.cy + x * Math.sin(tilt) + y * Math.cos(tilt),
    front: Math.sin(angle) >= 0,
  };
}

function orbitPath(orbit: (typeof orbits)[number], front: boolean) {
  const left = ground.x - orbit.rx;
  const right = ground.x + orbit.rx;
  return `M ${front ? left : right} ${orbit.cy} A ${orbit.rx} ${orbit.ry} 0 0 0 ${front ? right : left} ${orbit.cy}`;
}

/** Fixed SVG geometry; only satellite transforms and label opacity change per frame. */
export function OrbitHorizon() {
  const id = useId();
  const ref = useRef<SVGSVGElement>(null);
  const paint = (name: string) => `url(#${id}-${name})`;

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nodes = satellites.map((_, index) => ({
      back: svg.querySelector<SVGGElement>(`[data-satellite="back-${index}"]`),
      front: svg.querySelector<SVGGElement>(`[data-satellite="front-${index}"]`),
      label: svg.querySelector<SVGTextElement>(`[data-label="${index}"]`),
    }));
    let visible = false;
    let frame = 0;
    let previous = 0;
    let elapsed = 0;

    const render = () => {
      const occupied: { x: number; y: number; width: number }[] = [];
      satellites.forEach((satellite, index) => {
        const point = position(satellite, elapsed);
        const node = nodes[index];
        const transform = `translate(${point.x.toFixed(2)} ${point.y.toFixed(2)})`;
        node.back?.setAttribute("transform", transform);
        node.front?.setAttribute("transform", transform);
        node.back?.setAttribute("opacity", point.front ? "0" : "1");
        node.front?.setAttribute("opacity", point.front ? "1" : "0");

        // Labels stay in the sky, and yield before their fixed text bounds can overlap.
        const surfaceY = ground.y - Math.sqrt(ground.radius ** 2 - (point.x - ground.x) ** 2);
        const width = satellite.label.length * 7 + 20;
        const collides = occupied.some((other) => Math.abs(point.y - other.y) < 32 && Math.abs(point.x - other.x) < (width + other.width) / 2);
        const show = !point.front && point.y < surfaceY - 16 && point.x > width && point.x < 1440 - width && !collides;
        node.label?.setAttribute("opacity", show ? "1" : "0");
        if (show) occupied.push({ ...point, width });
      });
    };
    const tick = (time: number) => {
      if (previous) elapsed += Math.min(time - previous, 64) / 1000;
      previous = time;
      render();
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      previous = 0;
      if (media.matches) {
        elapsed = 0;
        render();
      } else if (visible && !document.hidden) {
        frame = requestAnimationFrame(tick);
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(svg);
    document.addEventListener("visibilitychange", sync);
    media.addEventListener("change", sync);
    render();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      media.removeEventListener("change", sync);
    };
  }, []);

  const renderSatellites = (front: boolean) => satellites.map((satellite, index) => {
    const point = position(satellite, 0);
    return (
      <g key={satellite.label} data-satellite={`${front ? "front" : "back"}-${index}`} transform={`translate(${point.x.toFixed(2)} ${point.y.toFixed(2)})`} opacity={point.front === front ? 1 : 0}>
        <circle r="18" fill={paint("node")} />
        <circle r="6" fill="#060317" stroke="#9382ff" strokeOpacity=".65" />
        <circle r="2.5" fill="#f4f0ff" />
        {!front && <text data-label={index} className="orbit-horizon-label" y="-18" textAnchor="middle">{satellite.label}</text>}
      </g>
    );
  });

  return (
    <EffectScope decorative className="orbit-horizon">
      <svg ref={ref} className="orbit-horizon-art" viewBox="0 0 1440 480" fill="none">
        <defs>
          <radialGradient id={`${id}-surface`} cx="50%" cy="0%" r="85%">
            <stop stopColor="#10093a" />
            <stop offset=".5" stopColor="#060317" />
            <stop offset="1" stopColor="#030014" />
          </radialGradient>
          <radialGradient id={`${id}-node`}>
            <stop stopColor="#ba9cff" stopOpacity=".7" />
            <stop offset=".25" stopColor="#9382ff" stopOpacity=".3" />
            <stop offset="1" stopColor="#9382ff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#9382ff" stopOpacity="0" />
            <stop offset=".25" stopColor="#ba9cff" stopOpacity=".7" />
            <stop offset=".5" stopColor="#f4f0ff" />
            <stop offset=".75" stopColor="#9cb2ff" stopOpacity=".7" />
            <stop offset="1" stopColor="#9382ff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`${id}-signal`} x1="720" y1="64" x2="720" y2="168" gradientUnits="userSpaceOnUse">
            <stop stopColor="#9382ff" stopOpacity="0" />
            <stop offset=".5" stopColor="#9382ff" stopOpacity=".25" />
            <stop offset="1" stopColor="#f4f0ff" stopOpacity=".9" />
          </linearGradient>
          <linearGradient id={`${id}-fade`} x1="0" y1="280" x2="0" y2="450" gradientUnits="userSpaceOnUse">
            <stop stopColor="#030014" stopOpacity="0" />
            <stop offset="1" stopColor="#030014" />
          </linearGradient>
          <clipPath id={`${id}-ground`}><circle cx={ground.x} cy={ground.y} r={ground.radius} /></clipPath>
          <filter id={`${id}-bloom`} x="-30%" y="-100%" width="160%" height="300%" colorInterpolationFilters="sRGB"><feGaussianBlur stdDeviation="18" /></filter>
          <filter id={`${id}-rim-glow`} x="-20%" y="-100%" width="140%" height="300%" colorInterpolationFilters="sRGB"><feGaussianBlur stdDeviation="4" /></filter>
        </defs>

        <g className="orbit-horizon-sky" fill="#9382ff">
          {Array.from({ length: 24 }, (_, index) => <circle key={index} cx={80 + ((index * 173) % 1280)} cy={28 + ((index * 53) % 260)} r={index % 3 === 0 ? 1.2 : .65} opacity={.12 + (index % 4) * .08} />)}
        </g>
        {orbits.map((orbit, index) => <path key={index} d={orbitPath(orbit, false)} transform={`rotate(${orbit.tilt} 720 ${orbit.cy})`} stroke="#9382ff" strokeOpacity={.19 + index * .035} strokeWidth=".8" />)}
        {renderSatellites(false)}

        <ellipse className="orbit-horizon-dawn fx-loop" cx="720" cy="164" rx="300" ry="90" fill={paint("node")} />
        <path d="M -40 408 A 1322 1322 0 0 1 1480 408" stroke="#5046e4" strokeWidth="56" opacity=".6" filter={paint("bloom")} />
        <path d="M -40 408 A 1322 1322 0 0 1 1480 408" stroke="#9382ff" strokeWidth="12" opacity=".55" filter={paint("rim-glow")} />
        <circle cx={ground.x} cy={ground.y} r={ground.radius} fill={paint("surface")} />
        <g clipPath={paint("ground")} stroke="#9382ff" strokeWidth=".8" opacity=".16">
          {[204, 238, 286, 350, 434].map((y) => <path key={y} d={`M -60 ${y + 250} Q 720 ${y - 250} 1500 ${y + 250}`} />)}
          {[-600, -390, -200, 0, 200, 390, 600].map((x) => <path key={x} d={`M ${720 + x * .22} 162 Q ${720 + x * .62} 285 ${720 + x} 530`} />)}
        </g>
        <circle cx={ground.x} cy={ground.y} r={ground.radius} stroke={paint("rim")} strokeWidth="1.5" />

        {orbits.map((orbit, index) => <path key={index} d={orbitPath(orbit, true)} transform={`rotate(${orbit.tilt} 720 ${orbit.cy})`} stroke={paint("rim")} strokeOpacity={.24 + index * .035} strokeWidth=".8" />)}
        {renderSatellites(true)}

        <path d="M 710 168 698 64 Q 720 74 742 64 L 730 168Z" fill={paint("signal")} opacity=".12" />
        <path d="M720 168V64" stroke={paint("signal")} />
        <g className="orbit-horizon-pulse fx-loop"><circle cx="720" cy="168" r="10" fill={paint("node")} /><circle cx="720" cy="168" r="2" fill="#f4f0ff" /></g>
        <ellipse cx="720" cy="168" rx="68" ry="24" fill={paint("node")} />
        <ellipse className="orbit-horizon-beacon fx-loop" cx="720" cy="168" rx="16" ry="5" stroke="#ba9cff" strokeOpacity=".7" />
        <circle cx="720" cy="168" r="3.5" fill="#f4f0ff" />
        <path d="M720 181V192" stroke="#9382ff" strokeOpacity=".45" />
        <text className="orbit-horizon-company" x="720" y="212" textAnchor="middle">sua empresa</text>
        <rect y="280" width="1440" height="200" fill={paint("fade")} />
      </svg>
    </EffectScope>
  );
}

"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { Braces, Check, Database, Fingerprint, Gauge, GitBranch, LockKeyhole, ReceiptText, ShieldCheck, type LucideIcon } from "lucide-react";

type Point = { x: number; y: number };
type NodeId = "application" | "auth" | "policy" | "limits" | "privacy" | "cache" | "router" | "meter";
type NodePosition = Point & { width: number; height: number };
type Layout = {
  width: number;
  height: number;
  nodes: Record<NodeId, NodePosition>;
  providers: NodePosition[];
  edges: Record<string, string>;
};
type Snapshot = { provider: number; unavailable: number | null; cost: number; tokens: number; masked: boolean; log: string };
type Segment = { edge: string; duration: number; target: string; reverse?: boolean };

const providers = ["OpenAI", "Anthropic", "AWS Bedrock", "Azure OpenAI", "Google Vertex", "NVIDIA"];
const requests = [
  { provider: 0, cost: 42, tokens: 820 },
  { provider: 0, cost: 0, tokens: 0, hit: true },
  { provider: 1, cost: 51, tokens: 960, fallback: true },
  { provider: 3, cost: 36, tokens: 750 },
  { provider: 4, cost: 28, tokens: 640 },
  { provider: 5, cost: 19, tokens: 510 },
  { provider: 1, cost: 45, tokens: 880 },
  { provider: 0, cost: 0, tokens: 0, hit: true },
];
const cycleCost = requests.reduce((total, request) => total + request.cost, 0);
const cycleTokens = requests.reduce((total, request) => total + request.tokens, 0);
const launchInterval = 4.8;
const initialSnapshot: Snapshot = {
  provider: 0, unavailable: null, cost: 42, tokens: 820, masked: true,
  log: "req_8f2a · OpenAI · 820 tokens · R$ 0,0042",
};
const money = (value: number) => `R$ ${(value / 10000).toFixed(4).replace(".", ",")}`;
const tokenCount = (value: number) => String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const requestId = (index: number) => `req_${(0x8f2a + index * 0x296).toString(16).slice(-4)}`;
const requestFor = (index: number) => requests[index % requests.length];

const desktop: Layout = {
  width: 1100, height: 320,
  nodes: {
    application: { x: 104, y: 143, width: 160, height: 78 },
    auth: { x: 314, y: 65, width: 184, height: 36 },
    policy: { x: 314, y: 116, width: 184, height: 36 },
    limits: { x: 314, y: 167, width: 184, height: 36 },
    privacy: { x: 314, y: 228, width: 184, height: 60 },
    cache: { x: 492, y: 218, width: 96, height: 48 },
    router: { x: 653, y: 143, width: 126, height: 94 },
    meter: { x: 1030, y: 143, width: 112, height: 94 },
  },
  providers: providers.map((_, i) => ({ x: 857, y: 46 + i * 40, width: 134, height: 30 })),
  edges: {
    entry: "M184 143 C209 143 197 65 222 65",
    auth: "M314 83 V98",
    policy: "M314 134 V149",
    limits: "M314 185 V198",
    privacy: "M406 228 C425 228 425 218 444 218",
    miss: "M540 218 C570 218 560 143 590 143",
    hit: "M492 242 V264 Q492 282 474 282 H122 Q104 282 104 264 V182",
    response: "M1030 190 V290 Q1030 308 1012 308 H78 Q60 308 60 290 V182",
  },
};
const mobile: Layout = {
  width: 350, height: 782,
  nodes: {
    application: { x: 194, y: 40, width: 216, height: 60 },
    auth: { x: 194, y: 112, width: 220, height: 40 },
    policy: { x: 194, y: 162, width: 220, height: 40 },
    limits: { x: 194, y: 212, width: 220, height: 40 },
    privacy: { x: 194, y: 270, width: 220, height: 64 },
    cache: { x: 194, y: 346, width: 138, height: 48 },
    router: { x: 194, y: 430, width: 180, height: 68 },
    meter: { x: 194, y: 704, width: 180, height: 76 },
  },
  providers: providers.map((_, i) => ({ x: i % 2 === 0 ? 121 : 269, y: 528 + Math.floor(i / 2) * 42, width: 114, height: 32 })),
  edges: {
    entry: "M194 70 V92",
    auth: "M194 132 V142",
    policy: "M194 182 V192",
    limits: "M194 232 V238",
    privacy: "M194 302 V322",
    miss: "M194 370 V396",
    hit: "M125 346 H66 Q48 346 48 328 V58 Q48 40 66 40 H86",
    response: "M194 742 V746 Q194 764 176 764 H36 Q18 764 18 746 V58 Q18 40 36 40 H86",
  },
};
// The paths and node centers share one coordinate system at each breakpoint.
for (const layout of [desktop, mobile]) {
  layout.providers.forEach((node, i) => {
    if (layout === desktop) {
      layout.edges[`provider-${i}`] = `M716 143 C752 143 754 ${node.y} 790 ${node.y}`;
      layout.edges[`meter-${i}`] = `M924 ${node.y} C948 ${node.y} 950 143 974 143`;
    } else {
      const left = i % 2 === 0;
      const rail = left ? 51 : 340;
      layout.edges[`provider-${i}`] = `M194 464 C194 500 ${rail} 492 ${rail} 514 V${node.y - 6} Q${rail} ${node.y} ${left ? 57 : 334} ${node.y} H${left ? 64 : 326}`;
      layout.edges[`meter-${i}`] = `M${left ? 178 : 212} ${node.y} C194 ${node.y} 194 646 194 666`;
    }
  });
}

function journey(index: number): Segment[] {
  const request = requestFor(index);
  const segments: Segment[] = [
    { edge: "entry", duration: 0.8, target: "auth" },
    { edge: "auth", duration: 0.6, target: "policy" },
    { edge: "policy", duration: 0.6, target: "limits" },
    { edge: "limits", duration: 0.8, target: "privacy" },
    { edge: "privacy", duration: 0.75, target: "cache" },
  ];
  if (request.hit) return [...segments, { edge: "hit", duration: 2.4, target: "application" }];
  segments.push(
    { edge: "miss", duration: 0.95, target: "router" },
    { edge: `provider-${request.provider}`, duration: 1, target: `provider-${request.provider}` },
  );
  if (request.fallback) {
    segments.push(
      { edge: `provider-${request.provider}`, duration: 0.6, target: "router", reverse: true },
      { edge: "provider-2", duration: 0.9, target: "provider-2" },
    );
  }
  segments.push(
    { edge: `meter-${request.fallback ? 2 : request.provider}`, duration: 0.7, target: "meter" },
    { edge: "response", duration: 2.3, target: "application" },
  );
  return segments;
}
const journeys = requests.map((_, i) => journey(i));

function currentSegment(index: number, age: number) {
  let start = 0;
  for (const segment of journeys[index % journeys.length]) {
    if (age < start + segment.duration) return { ...segment, progress: (age - start) / segment.duration };
    start += segment.duration;
  }
  return null;
}

function snapshotAt(time: number): Snapshot {
  const latest = Math.floor(time / launchInterval);
  let provider = 0;
  let unavailable: number | null = null;
  let measured = -1;
  let masked = true;
  let log = initialSnapshot.log;
  let logPriority = -1;
  for (let index = Math.max(0, latest - 3); index <= latest; index++) {
    const age = time - index * launchInterval;
    const request = requestFor(index);
    if (!request.hit && age >= 4.5) {
      provider = request.fallback && age >= 6.1 ? 2 : request.provider;
      unavailable = request.fallback && age >= 5.5 ? 1 : null;
    }
    if (age >= (request.hit ? 3.55 : request.fallback ? 7.7 : 6.2)) measured = index;
    if (age >= 2 && age < 2.65) masked = false;
    const segment = currentSegment(index, age);
    if (!segment) continue;
    let priority = index;
    let event = "autenticação · chave validada";
    if (age >= 0.8) event = "política do projeto · acesso permitido";
    if (age >= 1.4) event = "limites e orçamento · dentro da quota";
    if (age >= 2) event = age < 2.65 ? "proteção de dados · mascarando CPF" : "proteção de dados · CPF mascarado";
    if (age >= 2.8) event = "cache · consultando resposta";
    if (age >= 3.55) event = `cache miss · roteando para ${providers[request.provider]}`;
    if (age >= 5.5) event = `${providers[request.provider]} · ${request.tokens} tokens · ${money(request.cost)}`;
    if (request.hit && age >= 3.55) {
      event = "cache hit · resposta direta · R$ 0,0000";
      priority += 10;
    }
    if (request.fallback && age >= 5.5 && age < 7.7) {
      event = "Anthropic indisponível → fallback AWS Bedrock";
      priority += 20;
    } else if (request.fallback && age >= 7.7) {
      event = `AWS Bedrock · ${request.tokens} tokens · ${money(request.cost)}`;
    }
    if (priority >= logPriority) {
      log = `${requestId(index)} · ${event}`;
      logPriority = priority;
    }
  }
  // Count completed calls, including full cycles, without growing a history array.
  const completed = measured + 1;
  const cycles = Math.floor(completed / requests.length);
  let cost = cycles * cycleCost;
  let tokens = cycles * cycleTokens;
  for (let i = 0; i < completed % requests.length; i++) {
    cost += requests[i].cost;
    tokens += requests[i].tokens;
  }
  return { provider, unavailable, cost, tokens, masked, log };
}

function DiagramNode({ id, position, children, accent = false }: { id: string; position: NodePosition; children: ReactNode; accent?: boolean }) {
  const { x, y, width, height } = position;
  return (
    <g transform={`translate(${x - width / 2} ${y - height / 2})`}>
      <rect width={width} height={height} rx={id === "router" || id === "application" || id === "meter" ? 16 : 5} fill={accent ? "#10093a" : "#09061e"} stroke={accent ? "#9382ff" : "#f4f0ff"} strokeOpacity={accent ? 0.45 : 0.13} />
      <rect data-node-light={id} width={width} height={height} rx={id === "router" || id === "application" || id === "meter" ? 16 : 5} fill="#9382ff" fillOpacity="0.1" stroke="#ba9cff" strokeOpacity="0.8" opacity={accent ? 0.4 : 0} style={{ transition: "opacity 220ms ease" }} />
      {children}
    </g>
  );
}

function Stage({ id, label, Icon, position, masked }: { id: NodeId; label: string; Icon: LucideIcon; position: NodePosition; masked: boolean }) {
  const privacy = id === "privacy";
  return (
    <DiagramNode id={id} position={position}>
      <Icon x={13} y={privacy ? 11 : position.height / 2 - 7} width={14} height={14} stroke="#a8a6b7" strokeWidth={1.5} />
      <text x={36} y={privacy ? 22 : position.height / 2 + 4} className="pf-node-text">{label}</text>
      {privacy && (
        <g>
          <rect x={11} y={32} width={position.width - 22} height={19} rx={5} fill="#9382ff" fillOpacity="0.07" />
          <text x={position.width / 2} y={45} textAnchor="middle" className="pf-code" fill={masked ? "#ba9cff" : "#918ea0"}>{masked ? "CPF ***.***.***-**" : "CPF 123.456.789-00"}</text>
        </g>
      )}
    </DiagramNode>
  );
}

function PathLabel({ x, y, width, children, rotate = false }: { x: number; y: number; width: number; children: ReactNode; rotate?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})${rotate ? " rotate(-90)" : ""}`}>
      <rect x={-width / 2} y={-8} width={width} height={16} rx={5} fill="#08051c" />
      <text textAnchor="middle" y={3} className="pf-path-label">{children}</text>
    </g>
  );
}

function Diagram({ compact, snapshot, id }: { compact: boolean; snapshot: Snapshot; id: string }) {
  const layout = compact ? mobile : desktop;
  const { nodes } = layout;
  const uid = `${id}-${compact ? "mobile" : "desktop"}`;
  return (
    <svg data-diagram={compact ? "mobile" : "desktop"} viewBox={`0 0 ${layout.width} ${layout.height}`} className={compact ? "mx-auto block w-full max-w-[420px] lg:hidden" : "hidden w-full lg:block"} fill="none" aria-hidden="true">
      <defs>
        <radialGradient id={`${uid}-bloom`}>
          <stop stopColor="#9382ff" stopOpacity="0.48" />
          <stop offset="0.45" stopColor="#5046e4" stopOpacity="0.22" />
          <stop offset="1" stopColor="#5046e4" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${uid}-beam`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#9382ff" stopOpacity="0" />
          <stop offset="0.7" stopColor="#9382ff" stopOpacity="0.24" />
          <stop offset="1" stopColor="#ba9cff" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id={`${uid}-silver`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#f4f0ff" />
          <stop offset="1" stopColor="#a8a6b7" />
        </linearGradient>
        <filter id={`${uid}-light`} x="-300%" y="-300%" width="700%" height="700%"><feGaussianBlur stdDeviation="3" /></filter>
        <marker id={`${uid}-arrow`} viewBox="0 0 6 6" refX="5" refY="3" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="m1 1 3 2-3 2" stroke="#9382ff" strokeWidth="1" /></marker>
      </defs>
      <ellipse cx={nodes.router.x} cy={nodes.router.y} rx={compact ? 140 : 166} ry={compact ? 120 : 148} fill={`url(#${uid}-bloom)`} />
      <ellipse cx={nodes.router.x} cy={nodes.router.y} rx={compact ? 100 : 80} ry={compact ? 53 : 77} stroke="#9382ff" strokeWidth="3" strokeOpacity="0.28" filter={`url(#${uid}-light)`} />
      {[76, 99, 125].map((radius) => <circle key={radius} cx={nodes.router.x} cy={nodes.router.y} r={compact ? radius * 0.85 : radius} stroke="#9382ff" strokeOpacity="0.07" />)}
      {!compact && <g fill="#9382ff" fillOpacity="0.6"><circle cx="653" cy="44" r="2" /><circle cx="554" cy="143" r="2" /><circle cx="653" cy="242" r="2" /></g>}
      {!compact && <path d="M653 0 V96" stroke={`url(#${uid}-beam)`} strokeWidth="1.5" />}
      <g stroke="#9382ff" strokeWidth="1" strokeOpacity="0.25">
        {Object.entries(layout.edges).map(([key, path]) => {
          const providerEdge = key.startsWith("provider-") || key.startsWith("meter-");
          const provider = Number(key.split("-")[1]);
          const active = providerEdge && provider === snapshot.provider;
          const unavailable = providerEdge && provider === snapshot.unavailable;
          return <path key={key} data-edge={key} d={path} stroke={active ? "#ba9cff" : "#9382ff"} strokeOpacity={unavailable ? 0.14 : active ? 0.8 : key === "hit" ? 0.45 : 0.25} strokeDasharray={unavailable ? "3 5" : key === "response" ? "3 5" : undefined} markerEnd={key === "hit" || key === "response" ? `url(#${uid}-arrow)` : undefined} />;
        })}
      </g>
      <g className="pf-section-label">
        {compact ? <>
          <text x="84" y="86">01 / CONTROLE</text><text x="84" y="316">02 / OTIMIZAÇÃO</text><text x="64" y="486">03 / EXECUÇÃO</text><text x="104" y="656">04 / MEDIÇÃO</text>
        </> : <>
          <text x="24" y="17">ENTRADA / RESPOSTA</text><text x="222" y="17">01 / CONTROLE</text><text x="510" y="17">02 / OTIMIZAÇÃO</text><text x="790" y="17">03 / EXECUÇÃO</text><text x="974" y="17">04 / MEDIÇÃO</text>
        </>}
      </g>
      <DiagramNode id="application" position={nodes.application}>
        <Braces x={compact ? 15 : 14} y={compact ? 13 : 16} width="18" height="18" stroke="#9382ff" strokeWidth={1.5} />
        <text x={compact ? 43 : 41} y={compact ? 26 : 29} className="pf-node-text" style={{ fontSize: 13 }}>Sua aplicação</text>
        <text x={nodes.application.width / 2} y={compact ? 46 : 53} textAnchor="middle" className="pf-code" fill="#918ea0">model=&quot;chat-padrao&quot;</text>
      </DiagramNode>
      <Stage id="auth" label="Autenticação" Icon={Fingerprint} position={nodes.auth} masked={snapshot.masked} />
      <Stage id="policy" label="Política do projeto" Icon={ShieldCheck} position={nodes.policy} masked={snapshot.masked} />
      <Stage id="limits" label="Limites e orçamento" Icon={Gauge} position={nodes.limits} masked={snapshot.masked} />
      <Stage id="privacy" label="Proteção de dados" Icon={LockKeyhole} position={nodes.privacy} masked={snapshot.masked} />
      <DiagramNode id="cache" position={nodes.cache}>
        <Database x={compact ? 32 : 15} y="16" width="15" height="15" stroke="#9382ff" strokeWidth={1.5} />
        <text x={compact ? 57 : 39} y="28" className="pf-node-text">Cache</text>
      </DiagramNode>
      <DiagramNode id="router" position={nodes.router} accent>
        <GitBranch x={compact ? 15 : 53} y={compact ? 24 : 14} width="20" height="20" stroke="#ba9cff" strokeWidth={1.5} />
        <text x={compact ? 49 : 63} y={compact ? 29 : 54} textAnchor={compact ? "start" : "middle"} className="pf-node-text" fill={`url(#${uid}-silver)`}>Roteamento</text>
        <text x={compact ? 49 : 63} y={compact ? 45 : 70} textAnchor={compact ? "start" : "middle"} className="pf-node-text" fill={`url(#${uid}-silver)`}>inteligente</text>
        <circle cx={compact ? 166 : 111} cy="14" r="2" fill="#ba9cff" />
      </DiagramNode>
      {layout.providers.map((node, i) => {
        const active = snapshot.provider === i;
        const unavailable = snapshot.unavailable === i;
        return (
          <g key={providers[i]} opacity={unavailable ? 0.35 : 1}>
            <DiagramNode id={`provider-${i}`} position={node} accent={active}>
              {unavailable && <rect width={node.width} height={node.height} rx="5" stroke="#9382ff" strokeDasharray="3 4" />}
              <circle cx="12" cy={node.height / 2} r="2.3" fill={active ? "#ba9cff" : "#54525f"} />
              <text x="23" y={node.height / 2 + 4} className="pf-node-text" style={{ fontSize: compact ? 10.5 : 11 }} fill={active ? "#f4f0ff" : "#a8a6b7"}>{providers[i]}</text>
              {active && !compact && <Check x="119" y="10" width="10" height="10" stroke="#ba9cff" strokeWidth={1.5} />}
            </DiagramNode>
          </g>
        );
      })}
      <DiagramNode id="meter" position={nodes.meter}>
        {compact && <ReceiptText x="14" y="13" width="14" height="14" stroke="#9382ff" strokeWidth={1.5} />}
        <text x={nodes.meter.width / 2 + (compact ? 9 : 0)} y={compact ? 23 : 22} textAnchor="middle" className="pf-node-text" style={{ fontSize: 10.5 }}>Medição de custo</text>
        <text x={nodes.meter.width / 2} y={compact ? 46 : 49} textAnchor="middle" className="pf-total" fill={`url(#${uid}-silver)`}>{money(snapshot.cost)}</text>
        <text x={nodes.meter.width / 2} y={compact ? 63 : 72} textAnchor="middle" className="pf-code" fill="#918ea0">{tokenCount(snapshot.tokens)} tokens</text>
      </DiagramNode>
      {compact ? <>
        <PathLabel x={38} y={206} width={86} rotate>cache hit →</PathLabel>
        <PathLabel x={10} y={574} width={82} rotate>resposta →</PathLabel>
        <PathLabel x={215} y={383} width={32}>miss</PathLabel>
      </> : <>
        <PathLabel x={295} y={271} width={218}>← cache hit · resposta direta</PathLabel>
        <PathLabel x={706} y={297} width={156}>← resposta à aplicação</PathLabel>
        <PathLabel x={557} y={184} width={32}>miss</PathLabel>
      </>}
      {[0, 1, 2].map((packet) => (
        <g key={packet} data-packet={packet} opacity="0">
          {[4, 3, 2, 1, 0].map((trail) => <circle key={trail} data-trail={trail} r={trail === 0 ? 3 : 2.3 - trail * 0.25} fill={trail === 0 ? "#f4f0ff" : "#9382ff"} opacity={1 - trail * 0.18} />)}
          <circle data-trail="0" r="5" fill="#9382ff" opacity="0.7" filter={`url(#${uid}-light)`} />
        </g>
      ))}
    </svg>
  );
}

export function PipelineFlow() {
  const root = useRef<HTMLElement>(null);
  const elapsed = useRef(7.3);
  const inView = useInView(root, { amount: 0.08 });
  const reducedMotion = useReducedMotion();
  const id = useId().replace(/:/g, "");
  const [snapshot, setSnapshot] = useState(initialSnapshot);
  const display = reducedMotion ? initialSnapshot : snapshot;

  useEffect(() => {
    if (!inView || reducedMotion || !root.current) return;
    const element = root.current;
    const media = window.matchMedia("(min-width: 1024px)");
    let frame = 0;
    let previous = 0;
    let lastSnapshot = 0;
    let paths = new Map<string, { element: SVGPathElement; length: number }>();
    let packets: { group: SVGGElement; dots: { element: SVGCircleElement; trail: number }[] }[] = [];
    let lights: SVGRectElement[] = [];

    const selectDiagram = () => {
      element.querySelectorAll<SVGGElement>("[data-packet]").forEach((packet) => packet.setAttribute("opacity", "0"));
      const svg = element.querySelector<SVGSVGElement>(`[data-diagram="${media.matches ? "desktop" : "mobile"}"]`);
      if (!svg) return;
      paths = new Map(Array.from(svg.querySelectorAll<SVGPathElement>("[data-edge]")).map((path) => [path.dataset.edge!, { element: path, length: path.getTotalLength() }]));
      packets = Array.from(svg.querySelectorAll<SVGGElement>("[data-packet]")).map((group) => ({ group, dots: Array.from(group.querySelectorAll<SVGCircleElement>("[data-trail]")).map((dot) => ({ element: dot, trail: Number(dot.dataset.trail) })) }));
      lights = Array.from(svg.querySelectorAll<SVGRectElement>("[data-node-light]"));
    };
    selectDiagram();
    media.addEventListener("change", selectDiagram);

    const tick = (now: number) => {
      if (previous) elapsed.current += Math.min((now - previous) / 1000, 0.05);
      previous = now;
      const time = elapsed.current;
      const latest = Math.floor(time / launchInterval);
      const activeNodes = new Set(["router"]);
      packets.forEach(({ group, dots }, slot) => {
        const index = latest - slot;
        const age = time - index * launchInterval;
        const segment = index >= 0 ? currentSegment(index, age) : null;
        const path = segment ? paths.get(segment.edge) : null;
        if (!segment || !path) {
          group.setAttribute("opacity", "0");
          return;
        }
        group.setAttribute("opacity", "1");
        // Sample the same SVG geometry used for connectors; label length cannot move a packet.
        const distance = segment.progress * path.length;
        dots.forEach(({ element: dot, trail }) => {
          const along = Math.max(0, distance - trail * Math.min(4, path.length / 5));
          const point = path.element.getPointAtLength(segment.reverse ? path.length - along : along);
          dot.setAttribute("transform", `translate(${point.x.toFixed(2)} ${point.y.toFixed(2)})`);
        });
        if (segment.progress > 0.25) activeNodes.add(segment.target);
        if (segment.edge === "entry") activeNodes.add("application");
        if (segment.edge === "privacy") activeNodes.add("privacy");
        if (segment.edge === "hit") activeNodes.add("cache");
        if (segment.edge === "response" && segment.progress < 0.25) activeNodes.add("meter");
      });
      lights.forEach((light) => light.setAttribute("opacity", activeNodes.has(light.dataset.nodeLight!) ? "1" : "0"));
      if (now - lastSnapshot > 140) {
        const next = snapshotAt(time);
        setSnapshot((current) => Object.keys(next).every((key) => current[key as keyof Snapshot] === next[key as keyof Snapshot]) ? current : next);
        lastSnapshot = now;
      }
      frame = requestAnimationFrame(tick);
    };
    const resume = () => {
      cancelAnimationFrame(frame);
      previous = 0;
      if (!document.hidden) frame = requestAnimationFrame(tick);
    };
    document.addEventListener("visibilitychange", resume);
    resume();
    return () => {
      cancelAnimationFrame(frame);
      media.removeEventListener("change", selectDiagram);
      document.removeEventListener("visibilitychange", resume);
      element.querySelectorAll<SVGGElement>("[data-packet]").forEach((packet) => packet.setAttribute("opacity", "0"));
      element.querySelectorAll<SVGRectElement>("[data-node-light]").forEach((light) => light.setAttribute("opacity", light.dataset.nodeLight === "router" ? "0.4" : "0"));
    };
  }, [inView, reducedMotion]);

  return (
    <figure ref={root} className="pf-gateway relative isolate overflow-hidden rounded-[16px] border border-lavender/15 bg-midnight" aria-label="Demonstração do pipeline do Jack Polaris">
      <figcaption className="sr-only">Sua aplicação envia uma requisição com o modelo chat-padrao. Ela passa por autenticação, política do projeto, limites e orçamento, proteção de dados e cache. Um cache hit retorna diretamente à aplicação. Um miss segue para o roteamento inteligente entre OpenAI, Anthropic, AWS Bedrock, Azure OpenAI, Google Vertex e NVIDIA. Se um provedor falha, o gateway usa outro. Por fim, mede custo e tokens e devolve a resposta à aplicação. Valores ilustrativos.</figcaption>
      <div aria-hidden="true" className="relative z-10 flex h-[51px] items-center justify-between px-5 lg:px-6">
        <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.12em] text-ash"><span className="size-1.5 rounded-full bg-lavender" />REQUISIÇÃO / GATEWAY</span>
        <span className="rounded-full border border-white/[0.08] px-2 py-1 font-mono text-[9px] text-fog">8 etapas</span>
      </div>
      <div className="relative z-10 pb-2 lg:px-1">
        <Diagram compact={false} snapshot={display} id={id} />
        <Diagram compact snapshot={display} id={id} />
      </div>
      <div aria-hidden="true" className="relative z-10 flex min-h-[76px] flex-wrap items-center gap-x-3 gap-y-1 border-t border-white/[0.06] bg-void/40 px-5 py-3 lg:min-h-[47px] lg:flex-nowrap lg:px-6">
        <span className="hidden size-1 shrink-0 rounded-full bg-lavender lg:block" />
        <p className="min-w-0 basis-full font-mono text-[10px] leading-[1.7] text-ash lg:flex-1 lg:basis-auto lg:text-[11px]">{display.log}</p>
        <span className="shrink-0 font-mono text-[8px] tracking-[0.08em] text-fog lg:text-[9px]">FLUXO ILUSTRATIVO</span>
      </div>
      <style>{`
        .pf-gateway { box-shadow: inset 0 0 24px rgba(255,255,255,.04); }
        .pf-gateway::before { content: ""; position: absolute; inset: 0; z-index: -1; background-image: radial-gradient(rgba(147,130,255,.12) .7px, transparent .7px); background-size: 18px 18px; mask-image: linear-gradient(90deg,transparent,#000 30%,#000 80%,transparent); }
        .pf-gateway::after { content: ""; position: absolute; height: 1px; top: 0; left: 10%; right: 10%; background: linear-gradient(90deg,transparent,rgba(186,156,255,.5),transparent); }
        .pf-gateway .pf-node-text { font-family: var(--font-inter),sans-serif; font-size: 11.5px; font-weight: 400; }
        .pf-gateway .pf-node-text:not([fill]) { fill: #f4f0ff; }
        .pf-gateway .pf-code { font-family: var(--font-mono-face),monospace; font-size: 10px; }
        .pf-gateway .pf-section-label { font-family: var(--font-mono-face),monospace; font-size: 8.5px; letter-spacing: 1px; fill: #918ea0; }
        .pf-gateway .pf-path-label { font-family: var(--font-mono-face),monospace; font-size: 9px; fill: #9382ff; }
        .pf-gateway .pf-total { font-family: var(--font-mono-face),monospace; font-size: 15px; font-variant-numeric: tabular-nums; }
        @media (max-width: 1023px) {
          .pf-gateway .pf-node-text { font-size: 12px; }
          .pf-gateway .pf-section-label { font-size: 8.5px; letter-spacing: 1px; }
          .pf-gateway .pf-total { font-size: 18px; }
        }
        @media (prefers-reduced-motion: reduce) { .pf-gateway [data-node-light] { transition: none !important; } }
      `}</style>
    </figure>
  );
}

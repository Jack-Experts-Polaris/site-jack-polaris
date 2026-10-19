"use client";

import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { ArrowRight, Braces, Check, ChevronRight, Database, Fingerprint, GitBranch, KeyRound, Link2, LockKeyhole, Orbit, Pause, Play, ScanLine, Server, ShieldCheck, Sparkles } from "lucide-react";
import { Badge, Container } from "@/components/ui";
import { reasons } from "@/content";

const CYCLE = 5600;
const icons = [Orbit, Braces, ScanLine, LockKeyhole, Fingerprint];
const sceneNames = ["Liberdade para escolher", "Uma linha. Toda a governança.", "Proteção que fala português", "O controle continua com você", "Nada fica sem resposta"];
const sceneNotes = ["Um único ponto de acesso. Vários caminhos possíveis.", "A mesma API que o seu time já conhece.", "Dados protegidos antes de chegar ao modelo.", "Sua nuvem. Suas chaves. Seus dados.", "Do pedido à decisão, uma trilha verificável."];
const orbitProviders = ["OpenAI", "Anthropic", "Google Vertex", "AWS Bedrock"];
const stars = Array.from({ length: 34 }, (_, i) => ({ x: 18 + (i * 149) % 604, y: 18 + (i * 83) % 390, opacity: 0.12 + (i % 5) * 0.07 }));

function orbitalPosition(index: number, time: number) {
  const angle = index * Math.PI / 2 + time * 0.14 - 0.52;
  const x = Math.cos(angle) * 244;
  const y = Math.sin(angle) * 108;
  return { x: 320 + x * 0.97 - y * 0.24, y: 207 + x * 0.24 + y * 0.97, depth: Math.sin(angle), scale: 0.87 + (Math.sin(angle) + 1) * 0.085 };
}

function PolarisMark() {
  return <svg viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="m20 2 3 15 15 3-15 3-3 15-3-15-15-3 15-3Z" fill="currentColor" /><circle cx="20" cy="20" r="18" stroke="currentColor" strokeOpacity=".3" /></svg>;
}

function PortalScene({ running }: { running: boolean }) {
  const id = useId();
  const nodes = useRef<(SVGGElement | null)[]>([]);
  const beam = useRef<SVGLineElement>(null);
  const spark = useRef<SVGCircleElement>(null);
  const providerLabel = useRef<SVGTextElement>(null);
  const clock = useRef(0);

  // Only transforms and a single beam change per frame; React does not rerender the orbit.
  useEffect(() => {
    if (!running) return;
    let frame = 0;
    let previous = 0;
    const tick = (now: number) => {
      if (previous) clock.current += Math.min(now - previous, 50) / 1000;
      previous = now;
      const active = Math.floor(clock.current / 2.3) % orbitProviders.length;
      orbitProviders.forEach((_, index) => {
        const point = orbitalPosition(index, clock.current);
        for (let layer = 0; layer < 2; layer += 1) {
          const node = nodes.current[index + layer * orbitProviders.length];
          node?.setAttribute("transform", `translate(${point.x} ${point.y}) scale(${point.scale})`);
          node?.setAttribute("opacity", String(0.58 + (point.depth + 1) * 0.21));
          node?.setAttribute("data-active", String(index === active));
          node?.setAttribute("visibility", (point.depth >= 0) === (layer === 1) ? "visible" : "hidden");
        }
      });
      const target = orbitalPosition(active, clock.current);
      beam.current?.setAttribute("x2", String(target.x));
      beam.current?.setAttribute("y2", String(target.y));
      const progress = (clock.current * 0.75) % 1;
      spark.current?.setAttribute("cx", String(320 + (target.x - 320) * progress));
      spark.current?.setAttribute("cy", String(207 + (target.y - 207) * progress));
      if (providerLabel.current) providerLabel.current.textContent = orbitProviders[active];
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running]);

  function providerNodes(front: boolean) {
    return orbitProviders.map((name, index) => {
      const point = orbitalPosition(index, 0);
      return <g key={name} ref={(node) => { nodes.current[index + (front ? orbitProviders.length : 0)] = node; }} transform={`translate(${point.x} ${point.y}) scale(${point.scale})`} visibility={(point.depth >= 0) === front ? "visible" : "hidden"} className="wpwhy-provider" data-active={index === 0}>
        <circle r="26" fill="#9382ff" opacity=".07" />
        <rect x="-62" y="-19" width="124" height="38" rx="5" fill="#060317" stroke="#9382ff" strokeOpacity=".25" />
        <circle cx="-45" r="2.5" fill="#9382ff" />
        <text x="6" y="4" fill="#f4f0ff" fontSize="12" textAnchor="middle"><tspan className="wpwhy-provider-full">{name}</tspan><tspan className="wpwhy-provider-short">{["OpenAI", "Anthropic", "Google", "Bedrock"][index]}</tspan></text>
      </g>;
    });
  }

  const initial = orbitalPosition(0, 0);
  return (
    <div className="wpwhy-portal">
      <div className="wpwhy-portal-haze" />
      <svg viewBox="0 0 640 440" className="wpwhy-orbit-svg" aria-hidden="true">
        <defs>
          <radialGradient id={`${id}-bloom`}><stop stopColor="#5046e4" stopOpacity=".52" /><stop offset=".55" stopColor="#5046e4" stopOpacity=".2" /><stop offset="1" stopColor="#5046e4" stopOpacity="0" /></radialGradient>
          <linearGradient id={`${id}-ring`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#e59cff" /><stop offset=".48" stopColor="#f4f0ff" /><stop offset="1" stopColor="#9cb2ff" /></linearGradient>
          <linearGradient id={`${id}-beam`}><stop stopColor="#9382ff" stopOpacity="0" /><stop offset="1" stopColor="#f4f0ff" /></linearGradient>
          <filter id={`${id}-soft`} x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="14" /></filter>
          <filter id={`${id}-light`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" /></filter>
        </defs>
        <circle cx="320" cy="207" r="213" fill={`url(#${id}-bloom)`} />
        {stars.map((star, i) => <circle key={i} cx={star.x} cy={star.y} r={i % 6 === 0 ? 1.5 : 0.8} fill="#f4f0ff" opacity={star.opacity} className="wpwhy-star" style={{ animationDelay: `${i * -0.37}s` }} />)}
        <g fill="none" stroke="#9382ff">
          <ellipse cx="320" cy="207" rx="244" ry="108" transform="rotate(14 320 207)" strokeOpacity=".24" />
          <ellipse cx="320" cy="207" rx="251" ry="151" transform="rotate(-26 320 207)" strokeOpacity=".12" />
          <ellipse cx="320" cy="207" rx="220" ry="162" transform="rotate(52 320 207)" strokeOpacity=".1" />
          <circle cx="320" cy="207" r="146" strokeOpacity=".12" strokeDasharray="2 10" />
        </g>
        <line ref={beam} x1="320" y1="207" x2={initial.x} y2={initial.y} stroke={`url(#${id}-beam)`} strokeWidth="1.5" />
        <circle ref={spark} cx="465" cy="191" r="3" fill="#f4f0ff" />
        {providerNodes(false)}
        <g className="wpwhy-portal-breathe" style={{ transformOrigin: "320px 207px" }}>
          <circle cx="320" cy="207" r="97" fill="none" stroke="#5046e4" strokeWidth="36" filter={`url(#${id}-soft)`} />
          <circle cx="320" cy="207" r="94" fill="none" stroke="#9382ff" strokeWidth="13" filter={`url(#${id}-light)`} opacity=".8" />
          <circle cx="320" cy="207" r="92" fill="none" stroke="#f4f0ff" strokeWidth="4" filter={`url(#${id}-light)`} opacity=".6" />
          <circle cx="320" cy="207" r="103" fill="none" stroke="#9382ff" strokeWidth="1" opacity=".7" />
          <circle cx="320" cy="207" r="111" fill="none" stroke="#9382ff" strokeWidth=".7" opacity=".35" />
          <circle cx="320" cy="207" r="91" fill="#060317" stroke={`url(#${id}-ring)`} strokeWidth="2.5" />
          <circle cx="320" cy="207" r="83" fill="none" stroke="#9382ff" strokeWidth=".7" opacity=".3" />
        </g>
        <g fill="#f4f0ff" textAnchor="middle">
          <path d="m320 154 3 17 17 3-17 3-3 17-3-17-17-3 17-3Z" fill={`url(#${id}-ring)`} />
          <text x="320" y="222" className="wpwhy-core-name font-display" fontSize="21">Jack Polaris</text>
          <text x="320" y="243" className="font-mono" fontSize="10" letterSpacing="2" fill="#a8a6b7">UMA ÚNICA API</text>
        </g>
        {providerNodes(true)}
        <g className="wpwhy-active-route font-mono" fontSize="11" textAnchor="middle"><text x="320" y="400" fill="#918ea0">chat-padrao <tspan fill="#9382ff">→ </tspan><tspan ref={providerLabel} fill="#f4f0ff">OpenAI</tspan></text></g>
      </svg>
    </div>
  );
}

function CodeScene() {
  return <div className="wpwhy-code-scene wpwhy-scene-content">
    <div className="wpwhy-light-beam" />
    <div className="wpwhy-code-window">
      <div className="wpwhy-window-bar"><span><Braces size={14} strokeWidth={1.5} /> sua-aplicacao.py</span><span className="wpwhy-code-language">Python</span></div>
      <div className="wpwhy-code-body font-mono">
        <div><span className="wpwhy-line-no">01</span><code><em>from</em> openai <em>import</em> OpenAI</code></div>
        <div className="wpwhy-code-empty"><span className="wpwhy-line-no">02</span></div>
        <div><span className="wpwhy-line-no">03</span><code>client = OpenAI(</code></div>
        <div className="wpwhy-code-old"><span className="wpwhy-line-no">−</span><code>  base_url=<s>&quot;https://api.openai.com/v1&quot;</s>,</code></div>
        <div className="wpwhy-code-new"><span className="wpwhy-line-no">+</span><code>  base_url=<b>&quot;https://polaris.suaempresa/v1&quot;</b>,</code><span className="wpwhy-code-cursor" /></div>
        <div><span className="wpwhy-line-no">05</span><code>  api_key=API_KEY,</code></div>
        <div><span className="wpwhy-line-no">06</span><code>)</code></div>
        <div className="wpwhy-code-empty"><span className="wpwhy-line-no">07</span></div>
        <div><span className="wpwhy-line-no">08</span><code>client.chat.completions.create(</code></div>
        <div><span className="wpwhy-line-no">09</span><code>  model=<b>&quot;chat-padrao&quot;</b>,</code></div>
        <div><span className="wpwhy-line-no">10</span><code>  messages=messages</code></div>
        <div><span className="wpwhy-line-no">11</span><code>)</code></div>
      </div>
      <div className="wpwhy-code-result"><ShieldCheck size={15} strokeWidth={1.5} /><span>Governança conectada.</span><span className="wpwhy-code-result-detail">Seu código segue igual.</span></div>
    </div>
    <div className="wpwhy-small-caption"><GitBranch size={13} strokeWidth={1.5} /> Troque o destino. Preserve o fluxo.</div>
  </div>;
}

const personalData = [
  { label: "CPF", value: "123.456.789-00", masked: "***.***.***-**" },
  { label: "Cartão", value: "4111 1111 1111 1111", masked: "**** **** **** 1111" },
  { label: "E-mail", value: "ana@exemplo.com", masked: "***@exemplo.com" },
  { label: "Telefone", value: "(11) 99999-0000", masked: "(**) *****-****" },
];

function BrazilScene() {
  return <div className="wpwhy-brazil-scene wpwhy-scene-content">
    <div className="wpwhy-light-beam" />
    <div className="wpwhy-prompt-window">
      <div className="wpwhy-window-bar"><span><ScanLine size={15} strokeWidth={1.5} /> Proteção de dados pessoais</span><span className="wpwhy-lgpd"><ShieldCheck size={12} strokeWidth={1.5} /> LGPD</span></div>
      <div className="wpwhy-prompt-intro">“Confira os dados deste atendimento:”</div>
      <div className="wpwhy-pii-rows">
        {personalData.map((item, i) => <div key={item.label} className="wpwhy-pii-row" style={{ "--row": i } as CSSProperties}>
          <span className="wpwhy-pii-label">{item.label}</span>
          <span className="wpwhy-pii-value font-mono"><span className="wpwhy-pii-raw">{item.value}</span><span className="wpwhy-pii-masked">{item.masked}</span></span>
          <Check size={14} strokeWidth={1.5} className="wpwhy-pii-check" />
        </div>)}
        <div className="wpwhy-scanner" aria-hidden="true"><div className="wpwhy-scanner-lens"><span className="font-mono">•••</span></div></div>
      </div>
      <div className="wpwhy-prompt-footer"><LockKeyhole size={13} strokeWidth={1.5} /><span>4 dados pessoais mascarados</span></div>
    </div>
    <div className="wpwhy-currency"><span className="wpwhy-currency-label">Custo da requisição</span><div className="font-mono"><span>US$ 0,0009</span><ArrowRight size={17} strokeWidth={1.5} /><strong>R$ 0,0049</strong></div></div>
  </div>;
}

const cipherAlphabet = "7k9Xa2Bf0dC8mQ4zR1sV6nP3tH5wJ";
function cipherLine(row: number, tick: number) {
  return Array.from({ length: 52 }, (_, column) => column % 9 === 8 ? " " : cipherAlphabet[(column * 7 + row * 11 + tick * (column % 4 + 1)) % cipherAlphabet.length]).join("");
}

function PrivateScene({ running, reduced }: { running: boolean; reduced: boolean }) {
  const lines = useRef<(HTMLSpanElement | null)[]>([]);
  const decrypted = useRef<HTMLParagraphElement>(null);
  const cipherTick = useRef(0);
  useEffect(() => {
    if (reduced && decrypted.current) decrypted.current.textContent = "Seus dados ficam com você.";
    if (!running) return;
    const interval = window.setInterval(() => {
      cipherTick.current += 1;
      lines.current.forEach((line, i) => { if (line) line.textContent = cipherLine(i, cipherTick.current); });
      const message = "Seus dados ficam com você.";
      const revealed = Math.max(0, Math.floor((cipherTick.current - 3) * 1.8));
      if (decrypted.current) decrypted.current.textContent = Array.from(message, (letter, i) => i < revealed || letter === " " ? letter : cipherAlphabet[(i * 7 + cipherTick.current) % cipherAlphabet.length]).join("");
    }, 140);
    return () => window.clearInterval(interval);
  }, [running, reduced]);

  return <div className="wpwhy-private-scene wpwhy-scene-content">
    <div className="wpwhy-cloud-boundary"><span className="wpwhy-cloud-label font-mono">sua nuvem</span></div>
    <div className="wpwhy-cipher font-mono" aria-hidden="true">{Array.from({ length: 9 }, (_, i) => <span key={i} ref={(node) => { lines.current[i] = node; }}>{cipherLine(i, 0)}</span>)}</div>
    <div className="wpwhy-private-glow" />
    <div className="wpwhy-lock"><LockKeyhole size={52} strokeWidth={1.5} /><span className="wpwhy-lock-orbit" /></div>
    <div className="wpwhy-infra wpwhy-infra-kube"><Server size={14} strokeWidth={1.5} /> Kubernetes</div>
    <div className="wpwhy-infra wpwhy-infra-kms"><KeyRound size={14} strokeWidth={1.5} /> KMS</div>
    <div className="wpwhy-infra wpwhy-infra-postgres"><Database size={14} strokeWidth={1.5} /> PostgreSQL</div>
    <div className="wpwhy-infra wpwhy-infra-redis"><Database size={14} strokeWidth={1.5} /> Redis</div>
    <div className="wpwhy-decrypted"><span className="wpwhy-decrypt-label font-mono">CRIPTOGRAFIA SOB SEU CONTROLE</span><p ref={decrypted} className="font-display">Seus dados ficam com você.</p></div>
  </div>;
}

const auditRecords = [
  { id: "req_8f3a", model: "chat-padrao", cost: "R$ 0,0049", decision: "Permitida", hash: "a7c9…e21f", previous: "e2b4…0d87" },
  { id: "req_8f3b", model: "resumo-rapido", cost: "R$ 0,0012", decision: "Mascarada", hash: "b3d1…f89a", previous: "a7c9…e21f" },
  { id: "req_8f3c", model: "chat-padrao", cost: "R$ 0,0000", decision: "Bloqueada", hash: "c8a2…d34e", previous: "b3d1…f89a" },
  { id: "req_8f3d", model: "chat-padrao", cost: "R$ 0,0038", decision: "Permitida", hash: "d1f6…a72b", previous: "c8a2…d34e" },
  { id: "req_8f3e", model: "resumo-rapido", cost: "R$ 0,0015", decision: "Mascarada", hash: "e6b3…c91d", previous: "d1f6…a72b" },
];

function AuditScene() {
  return <div className="wpwhy-audit-scene wpwhy-scene-content">
    <div className="wpwhy-audit-head"><span><Fingerprint size={16} strokeWidth={1.5} /> Trilha de auditoria</span><span className="wpwhy-live-dot">Registro contínuo</span></div>
    <div className="wpwhy-audit-viewport"><div className="wpwhy-audit-stream">{auditRecords.map((record, index) => <div key={record.id} className="wpwhy-audit-item">
      <div className="wpwhy-audit-link font-mono"><Link2 size={12} strokeWidth={1.5} /><span>{record.previous}</span><ArrowRight size={11} strokeWidth={1.5} /><span>{record.hash}</span></div>
      <div className="wpwhy-audit-record" data-blocked={index === 2}>
        <div className="wpwhy-record-top"><span className="font-mono">{record.id}</span><span className="wpwhy-decision"><span />{record.decision}</span></div>
        <div className="wpwhy-record-details"><span><small>Modelo</small><span className="font-mono">{record.model}</span></span><span><small>Custo</small><span className="font-mono">{record.cost}</span></span></div>
      </div>
    </div>)}</div></div>
    <div className="wpwhy-audit-seal"><ShieldCheck size={14} strokeWidth={1.5} /> Registros conectados. Histórico verificável.</div>
  </div>;
}

export function WhySection() {
  const id = useId();
  const stageRef = useRef<HTMLDivElement>(null);
  const tabListRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const progressRef = useRef<HTMLSpanElement>(null);
  const elapsed = useRef(0);
  const inView = useInView(stageRef, { amount: 0.25 });
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [verticalTabs, setVerticalTabs] = useState(false);
  const running = inView && !hidden && !paused && !reducedMotion;
  const advancing = running && !hovered && !focused;

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onLayout = () => setVerticalTabs(desktop.matches);
    onVisibility();
    onLayout();
    document.addEventListener("visibilitychange", onVisibility);
    desktop.addEventListener("change", onLayout);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      desktop.removeEventListener("change", onLayout);
    };
  }, []);

  useEffect(() => {
    if (!advancing) return;
    let frame = 0;
    let previous = 0;
    const tick = (now: number) => {
      if (previous) elapsed.current += Math.min(now - previous, 100);
      previous = now;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${Math.min(elapsed.current / CYCLE, 1)})`;
      if (elapsed.current >= CYCLE) {
        elapsed.current = 0;
        setActive((current) => (current + 1) % reasons.length);
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [advancing, active]);

  useEffect(() => {
    const tab = tabsRef.current[active];
    const list = tabListRef.current;
    if (tab && list && list.scrollWidth > list.clientWidth) list.scrollTo({ left: tab.offsetLeft - list.offsetLeft, behavior: reducedMotion ? "instant" : "smooth" });
  }, [active, reducedMotion]);

  function select(index: number) {
    elapsed.current = 0;
    if (progressRef.current) progressRef.current.style.transform = "scaleX(0)";
    setActive(index);
  }

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % reasons.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index + reasons.length - 1) % reasons.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = reasons.length - 1;
    else return;
    event.preventDefault();
    select(next);
    tabsRef.current[next]?.focus({ preventScroll: true });
  }

  return <section className="wpwhy relative isolate py-24 md:py-32" aria-labelledby={`${id}-title`} data-running={running} data-reduced={!!reducedMotion}>
    <style>{styles}</style>
    <div className="wpwhy-section-line" aria-hidden="true" />
    <Container>
      <div className="wpwhy-header"><Badge>Por que Jack Polaris</Badge><h2 id={`${id}-title`} className="font-display">Governança que não<br className="wpwhy-title-break" /> atrapalha ninguém.</h2></div>
      <div className="wpwhy-layout" onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(true); }} onPointerLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
        <div ref={stageRef} className="wpwhy-stage" id={`${id}-panel`} role="tabpanel" tabIndex={0} aria-labelledby={`${id}-tab-${active}`}>
          <div className="wpwhy-stage-grain" aria-hidden="true" />
          <div className="wpwhy-stage-top"><span className="wpwhy-stage-brand"><PolarisMark /><span>JACK POLARIS</span></span><span className="wpwhy-demo-label font-mono">DEMONSTRAÇÃO</span></div>
          <div className="wpwhy-scene-wrap"><AnimatePresence mode="wait" initial={false}><motion.div key={active} className="wpwhy-scene" initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }} transition={{ duration: reducedMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}>
            <div className="wpwhy-scene-title font-display">{sceneNames[active]}</div>
            <div className="wpwhy-scene-visual" aria-hidden="true">
              {active === 0 && <PortalScene running={running} />}
              {active === 1 && <CodeScene />}
              {active === 2 && <BrazilScene />}
              {active === 3 && <PrivateScene running={running} reduced={!!reducedMotion} />}
              {active === 4 && <AuditScene />}
            </div>
            <p className="wpwhy-scene-note">{sceneNotes[active]}</p>
          </motion.div></AnimatePresence></div>
          <div className="wpwhy-stage-bottom"><span className="font-mono">0{active + 1}<span className="wpwhy-page-total"> / 05</span></span><div className="wpwhy-scene-dots" aria-hidden="true">{reasons.map((reason, index) => <span key={reason.title} data-active={active === index} />)}</div><button type="button" className="wpwhy-pause" onClick={() => setPaused((value) => !value)} aria-label={paused ? "Retomar demonstração automática" : "Pausar demonstração automática"} aria-pressed={paused} disabled={!!reducedMotion}>{paused || reducedMotion ? <Play size={13} strokeWidth={1.5} /> : <Pause size={13} strokeWidth={1.5} />}</button></div>
        </div>
        <div className="wpwhy-tabs-column"><div className="wpwhy-tabs-eyebrow"><Sparkles size={13} strokeWidth={1.5} /><span>Cinco motivos. Uma plataforma.</span></div><div ref={tabListRef} className="wpwhy-tabs" role="tablist" aria-orientation={verticalTabs ? "vertical" : "horizontal"} aria-label="Por que escolher Jack Polaris">
          {reasons.map((reason, index) => { const Icon = icons[index]; return <button key={reason.title} ref={(node) => { tabsRef.current[index] = node; }} type="button" role="tab" id={`${id}-tab-${index}`} aria-selected={active === index} aria-controls={`${id}-panel`} tabIndex={active === index ? 0 : -1} onClick={() => select(index)} onKeyDown={(event) => navigate(event, index)} className="wpwhy-tab">
            <span className="wpwhy-tab-icon"><Icon size={20} strokeWidth={1.5} /></span><span className="wpwhy-tab-copy"><span className="wpwhy-tab-title font-display">{reason.title}</span><span className="wpwhy-tab-text">{reason.text}</span></span><ChevronRight className="wpwhy-tab-arrow" size={15} strokeWidth={1.5} />
            {active === index && <span className="wpwhy-progress-track" aria-hidden="true"><span ref={progressRef} className="wpwhy-progress" /></span>}
          </button>; })}
        </div><div className="wpwhy-tabs-hint font-mono"><span>Explore cada motivo</span><span>01 — 05</span></div></div>
      </div>
    </Container>
  </section>;
}

const styles = `
.wpwhy{color:var(--lilac);overflow:hidden}
.wpwhy *{box-sizing:border-box}
.wpwhy button{cursor:pointer}
.wpwhy button:disabled{cursor:default}
.wpwhy button:focus-visible,.wpwhy [role=tabpanel]:focus-visible{outline:2px solid var(--lavender);outline-offset:4px}
.wpwhy-section-line{position:absolute;inset:0 10% auto;height:1px;background:linear-gradient(90deg,transparent,rgba(147,130,255,.28),transparent)}
.wpwhy-header{display:flex;align-items:center;flex-direction:column;gap:25px;text-align:center}
.wpwhy-header h2{margin:0;max-width:840px;font-size:56px;line-height:1.09;letter-spacing:-1.7px;font-weight:500;background:linear-gradient(180deg,#f4f0ff 20%,#a8a6b7 100%);background-clip:text;-webkit-background-clip:text;color:transparent}
.wpwhy-layout{display:grid;grid-template-columns:minmax(0,1.63fr) minmax(0,1fr);align-items:center;gap:42px;margin-top:56px}
.wpwhy-stage{position:relative;isolation:isolate;height:584px;border:1px solid rgba(147,130,255,.16);border-radius:16px;background:radial-gradient(ellipse at 50% 40%,rgba(80,70,228,.09),transparent 65%),#060317;box-shadow:inset 0 0 24px rgba(255,255,255,.04);overflow:hidden}
.wpwhy-stage:before{content:"";position:absolute;top:0;left:12%;right:12%;height:1px;background:linear-gradient(90deg,transparent,#9382ff,transparent);opacity:.65}
.wpwhy-stage-grain{position:absolute;inset:0;z-index:-1;opacity:.22;background-image:radial-gradient(rgba(147,130,255,.35) .6px,transparent .6px);background-size:17px 17px;mask-image:linear-gradient(180deg,#000,transparent 85%)}
.wpwhy-stage-top{height:57px;padding:0 24px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(244,240,255,.05)}
.wpwhy-stage-brand{display:flex;align-items:center;gap:8px;font-size:10px;letter-spacing:1.8px;color:#a8a6b7}
.wpwhy-stage-brand svg{width:20px;height:20px;color:#ba9cff}
.wpwhy-demo-label{color:#72707b;font-size:8px;letter-spacing:1.4px}
.wpwhy-scene-wrap{position:absolute;inset:57px 0 45px}
.wpwhy-scene{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center}
.wpwhy-scene-title{position:relative;z-index:2;margin:24px 14px 0;font-size:22px;letter-spacing:-.4px;line-height:1.3;text-align:center;color:#cdccd0}
.wpwhy-scene-visual{position:relative;width:100%;min-height:0;flex:1}
.wpwhy-scene-note{position:relative;z-index:2;margin:0 16px 22px;text-align:center;color:#918ea0;font-size:12px;line-height:1.5}
.wpwhy-stage-bottom{position:absolute;bottom:0;left:0;right:0;display:flex;align-items:center;justify-content:space-between;height:45px;padding:0 24px;border-top:1px solid rgba(244,240,255,.06);font-size:10px;color:#a8a6b7}
.wpwhy-page-total{color:#54525f}
.wpwhy-scene-dots{display:flex;gap:7px}
.wpwhy-scene-dots span{height:3px;width:14px;border-radius:999px;background:#54525f;opacity:.3;transition:opacity .3s,background .3s}
.wpwhy-scene-dots span[data-active=true]{background:#9382ff;opacity:1}
.wpwhy-pause{display:flex;align-items:center;justify-content:center;height:29px;width:29px;border:1px solid rgba(147,130,255,.15);border-radius:5px;color:#a8a6b7;background:#060317}
.wpwhy-pause:hover{color:#f4f0ff;border-color:#9382ff}
.wpwhy-pause:disabled{opacity:.4}
.wpwhy-tabs-column{min-width:0}
.wpwhy-tabs-eyebrow{display:flex;gap:8px;align-items:center;font-size:11px;color:#918ea0;margin:0 0 16px 19px}
.wpwhy-tabs-eyebrow svg{color:#9382ff}
.wpwhy-tabs{display:flex;flex-direction:column;gap:6px}
.wpwhy-tab{position:relative;display:grid;grid-template-columns:26px minmax(0,1fr) 12px;gap:13px;align-items:start;width:100%;padding:19px 16px 19px 19px;border:1px solid transparent;border-radius:16px;text-align:left;background:transparent;color:#72707b;transition:background .3s,border-color .3s,color .3s;overflow:hidden}
.wpwhy-tab:hover{background:rgba(16,9,58,.35);color:#a8a6b7}
.wpwhy-tab[aria-selected=true]{border-color:rgba(147,130,255,.25);background:linear-gradient(110deg,rgba(80,70,228,.12),rgba(6,3,23,.9));box-shadow:inset 0 0 24px rgba(255,255,255,.04);color:#9382ff}
.wpwhy-tab-icon{padding-top:2px}
.wpwhy-tab-copy{display:flex;flex-direction:column;gap:7px}
.wpwhy-tab-title{font-size:17px;line-height:1.3;letter-spacing:-.3px;color:#a8a6b7;transition:color .3s}
.wpwhy-tab[aria-selected=true] .wpwhy-tab-title{color:#f4f0ff}
.wpwhy-tab-text{font-size:13px;line-height:1.6;color:#918ea0}
.wpwhy-tab[aria-selected=true] .wpwhy-tab-text{color:#a8a6b7}
.wpwhy-tab-arrow{margin-top:4px;opacity:0;transform:translateX(-4px);transition:opacity .3s,transform .3s}
.wpwhy-tab[aria-selected=true] .wpwhy-tab-arrow{opacity:1;transform:translateX(0)}
.wpwhy-progress-track{position:absolute;bottom:0;left:20px;right:20px;height:1px;background:rgba(147,130,255,.09)}
.wpwhy-progress{display:block;width:100%;height:100%;transform:scaleX(0);transform-origin:left;background:linear-gradient(90deg,#9382ff,#e59cff)}
.wpwhy-tabs-hint{display:flex;justify-content:space-between;margin:19px 19px 0;font-size:9px;color:#54525f;letter-spacing:.2px}
.wpwhy-portal{position:absolute;inset:-15px -6px -8px}
.wpwhy-orbit-svg{position:relative;width:100%;height:100%;overflow:visible}
.wpwhy-portal-haze{position:absolute;left:25%;top:23%;width:50%;height:55%;border-radius:50%;background:rgba(80,70,228,.19);filter:blur(45px);pointer-events:none}
.wpwhy-portal-breathe{animation:wpwhy-breathe 5s ease-in-out infinite}
.wpwhy-star{animation:wpwhy-twinkle 4s ease-in-out infinite}
.wpwhy-provider-short{display:none}
.wpwhy-provider rect{transition:stroke-opacity .5s,fill .5s}
.wpwhy-provider[data-active=true] rect{stroke-opacity:.8;fill:#10093a}
.wpwhy-provider[data-active=true]>circle:first-child{opacity:.16}
.wpwhy-scene-content{isolation:isolate;position:relative;width:100%;height:100%;padding:22px 34px 20px;display:flex;align-items:center;justify-content:center;flex-direction:column}
.wpwhy-code-scene:before,.wpwhy-brazil-scene:before,.wpwhy-audit-scene:before{content:"";position:absolute;z-index:-1;pointer-events:none;left:-10%;bottom:0;width:120%;height:140px;background-image:linear-gradient(rgba(147,130,255,.13) 1px,transparent 1px),linear-gradient(90deg,rgba(147,130,255,.13) 1px,transparent 1px);background-size:32px 32px;transform:perspective(150px) rotateX(58deg);transform-origin:bottom;mask-image:radial-gradient(ellipse at 50% 50%,#000,transparent 65%)}
.wpwhy-light-beam{position:absolute;z-index:-1;pointer-events:none;width:110px;top:-100px;height:370px;left:calc(50% - 55px);background:radial-gradient(ellipse at 50% 50%,rgba(147,130,255,.28),rgba(80,70,228,.09) 45%,transparent 70%);filter:blur(12px)}
.wpwhy-light-beam:after{content:"";position:absolute;inset:0 48%;background:linear-gradient(180deg,transparent,rgba(186,156,255,.6),transparent)}
.wpwhy-code-window,.wpwhy-prompt-window{flex-shrink:0;position:relative;width:100%;border-radius:16px;border:1px solid rgba(147,130,255,.22);background:linear-gradient(140deg,rgba(16,9,58,.85),#060317 65%);box-shadow:inset 0 0 24px rgba(255,255,255,.04);overflow:hidden}
.wpwhy-window-bar{height:42px;display:flex;align-items:center;justify-content:space-between;gap:6px;padding:0 18px;border-bottom:1px solid rgba(244,240,255,.07);font-size:11px;color:#a8a6b7}
.wpwhy-window-bar>span:first-child{display:flex;align-items:center;gap:7px}
.wpwhy-window-bar svg{color:#9382ff}
.wpwhy-code-language{color:#72707b;font-size:10px}
.wpwhy-code-body{padding:10px 0;font-size:12px;color:#a8a6b7;line-height:1.6}
.wpwhy-code-body>div{display:flex;align-items:center;position:relative;min-height:19px}
.wpwhy-code-body code{white-space:pre}
.wpwhy-code-body em{font-style:normal;color:#9382ff}
.wpwhy-code-body b{font-weight:400;color:#cdccd0}
.wpwhy-line-no{flex:0 0 38px;text-align:center;color:#54525f;font-size:10px;user-select:none}
.wpwhy-code-body .wpwhy-code-empty{min-height:8px;height:8px}
.wpwhy-code-old{opacity:.38;animation:wpwhy-old-line 5.6s ease both}
.wpwhy-code-old s{text-decoration-color:#9382ff;text-decoration-thickness:1px}
.wpwhy-code-new{background:rgba(147,130,255,.1);border-left:2px solid #9382ff;animation:wpwhy-new-line 5.6s ease both}
.wpwhy-code-new .wpwhy-line-no{flex-basis:36px;color:#9382ff}
.wpwhy-code-new b{color:#ba9cff}
.wpwhy-code-cursor{display:inline-block;width:5px;height:13px;margin-left:5px;background:#9382ff;animation:wpwhy-twinkle 1.5s steps(2) infinite}
.wpwhy-code-result{display:flex;align-items:center;gap:7px;padding:12px 18px;border-top:1px solid rgba(147,130,255,.12);font-size:10px;color:#a8a6b7}
.wpwhy-code-result svg{color:#9382ff}
.wpwhy-code-result-detail{margin-left:auto;color:#72707b}
.wpwhy-small-caption{display:flex;align-items:center;gap:8px;color:#72707b;font-size:10px;margin-top:18px}
.wpwhy-brazil-scene{gap:16px;padding-top:18px}
.wpwhy-lgpd{display:inline-flex;align-items:center;gap:4px;padding:3px 7px;border:1px solid rgba(147,130,255,.3);border-radius:999px;font-size:9px;color:#ba9cff}
.wpwhy-prompt-intro{padding:19px 18px 13px;color:#a8a6b7;font-size:12px}
.wpwhy-pii-rows{position:relative;padding:0 18px}
.wpwhy-pii-row{display:grid;grid-template-columns:62px minmax(0,1fr) 14px;align-items:center;gap:8px;min-height:42px;border-bottom:1px solid rgba(244,240,255,.045)}
.wpwhy-pii-label{font-size:10px;color:#918ea0}
.wpwhy-pii-value{position:relative;height:18px;font-size:11px;line-height:18px;white-space:nowrap}
.wpwhy-pii-raw,.wpwhy-pii-masked{position:absolute;inset:0}
.wpwhy-pii-raw{color:#a8a6b7;opacity:0;animation:wpwhy-mask-raw 5.6s both;animation-delay:calc(var(--row) * .46s)}
.wpwhy-pii-masked{color:#ba9cff;animation:wpwhy-mask-value 5.6s both;animation-delay:calc(var(--row) * .46s)}
.wpwhy-pii-check{color:#9382ff;animation:wpwhy-mask-value 5.6s both;animation-delay:calc(var(--row) * .46s)}
.wpwhy-prompt-footer{display:flex;align-items:center;gap:6px;padding:13px 18px;color:#9382ff;font-size:10px}
.wpwhy-scanner{position:absolute;top:0;right:10%;width:65%;height:42px;border-top:1px solid rgba(147,130,255,.25);background:linear-gradient(180deg,rgba(147,130,255,.09),transparent);animation:wpwhy-scan 5.6s both;pointer-events:none}
.wpwhy-scanner-lens{position:absolute;right:4%;top:-18px;display:flex;align-items:center;justify-content:center;width:70px;height:70px;border-radius:50%;border:1px solid rgba(244,240,255,.35);background:radial-gradient(circle at 30% 20%,rgba(244,240,255,.12),rgba(16,9,58,.8));box-shadow:inset 0 0 24px rgba(255,255,255,.04);backdrop-filter:blur(3px)}
.wpwhy-scanner-lens:after{content:"";position:absolute;bottom:-12px;right:0;width:1px;height:25px;background:#9382ff;transform:rotate(-38deg)}
.wpwhy-scanner-lens span{font-size:24px;letter-spacing:4px;color:#f4f0ff}
.wpwhy-currency{display:flex;align-items:center;justify-content:space-between;gap:15px;width:100%;padding:0 4px}
.wpwhy-currency-label{font-size:10px;color:#72707b}
.wpwhy-currency>div{display:flex;align-items:center;gap:12px;font-size:11px;color:#918ea0}
.wpwhy-currency svg{color:#9382ff}
.wpwhy-currency strong{font-size:13px;font-weight:500;color:#f4f0ff;animation:wpwhy-currency 5.6s both}
.wpwhy-private-scene{padding:0}
.wpwhy-cloud-boundary{position:absolute;inset:27px 35px 69px;border:1px dashed rgba(147,130,255,.3);border-radius:16px}
.wpwhy-cloud-label{position:absolute;top:-7px;left:20px;padding:0 10px;background:#060317;color:#918ea0;font-size:10px}
.wpwhy-cipher{position:absolute;inset:40px 0 75px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;overflow:hidden;mask-image:radial-gradient(ellipse,#000 12%,transparent 68%);opacity:.7;color:#9382ff;font-size:12px;letter-spacing:1px;line-height:1.4}
.wpwhy-cipher span{white-space:nowrap}
.wpwhy-cipher span:nth-child(2n){opacity:.38}
.wpwhy-cipher span:nth-child(3n){color:#ba9cff;text-shadow:0 0 10px rgba(147,130,255,.5)}
.wpwhy-private-glow{position:absolute;top:19%;left:calc(50% - 105px);width:210px;height:210px;background:radial-gradient(ellipse,rgba(147,130,255,.45),rgba(80,70,228,.1) 60%,transparent 72%);filter:blur(18px)}
.wpwhy-lock{position:absolute;top:calc(45% - 48px);left:calc(50% - 48px);width:96px;height:96px;display:flex;align-items:center;justify-content:center;border-radius:50%;color:#f4f0ff;background:radial-gradient(circle at 50% 10%,#5046e4,#10093a 68%);border:1px solid rgba(244,240,255,.5);box-shadow:inset 0 0 24px rgba(255,255,255,.16)}
.wpwhy-lock:before{content:"";position:absolute;inset:-7px;border:1px solid rgba(147,130,255,.25);border-radius:50%}
.wpwhy-lock-orbit{position:absolute;inset:-17px;border-radius:50%;border:1px solid rgba(147,130,255,.1);border-top-color:#ba9cff;animation:wpwhy-rotate 9s linear infinite}
.wpwhy-infra{position:absolute;display:flex;align-items:center;justify-content:center;gap:6px;padding:8px 10px;border:1px solid rgba(147,130,255,.18);border-radius:5px;background:#060317;color:#a8a6b7;font-size:10px;min-width:89px;animation:wpwhy-infra-float 6s ease-in-out infinite}
.wpwhy-infra svg{color:#9382ff}
.wpwhy-infra-kube{top:53px;left:57px}
.wpwhy-infra-kms{top:53px;right:57px;animation-delay:-2s}
.wpwhy-infra-postgres{bottom:99px;left:57px;animation-delay:-4s}
.wpwhy-infra-redis{bottom:99px;right:57px;animation-delay:-1s}
.wpwhy-decrypted{position:absolute;bottom:8px;width:100%;text-align:center}
.wpwhy-decrypt-label{font-size:8px;letter-spacing:1.5px;color:#72707b}
.wpwhy-decrypted p{font-size:21px;color:#cdccd0;letter-spacing:-.4px;margin:8px 0 0;animation:wpwhy-decrypt 5.6s both}
.wpwhy-audit-scene{padding:22px 35px 14px}
.wpwhy-audit-head{display:flex;justify-content:space-between;align-items:center;gap:10px;width:100%;color:#a8a6b7;font-size:11px}
.wpwhy-audit-head>span{display:flex;align-items:center;gap:7px}
.wpwhy-audit-head svg{color:#9382ff}
.wpwhy-live-dot{font-size:9px;color:#72707b}
.wpwhy-live-dot:before{content:"";width:4px;height:4px;background:#9382ff;border-radius:50%;animation:wpwhy-twinkle 2s infinite}
.wpwhy-audit-viewport{position:relative;margin-top:8px;width:100%;height:290px;overflow:hidden;mask-image:linear-gradient(180deg,transparent,#000 7%,#000 90%,transparent)}
.wpwhy-audit-stream{animation:wpwhy-record-flow 11.2s linear both}
.wpwhy-audit-item{height:119px}
.wpwhy-audit-link{position:relative;display:flex;justify-content:center;align-items:center;gap:9px;height:30px;font-size:9px;color:#72707b}
.wpwhy-audit-link:before{content:"";position:absolute;left:50%;top:-20px;height:50px;width:1px;background:linear-gradient(180deg,rgba(147,130,255,.2),#9382ff,rgba(147,130,255,.2));z-index:-1}
.wpwhy-audit-link>span,.wpwhy-audit-link>svg{background:#060317}
.wpwhy-audit-link svg{color:#9382ff}
.wpwhy-audit-record{position:relative;border:1px solid rgba(147,130,255,.17);border-radius:16px;background:linear-gradient(115deg,rgba(16,9,58,.85),#060317);box-shadow:inset 0 0 24px rgba(255,255,255,.04);padding:12px 17px}
.wpwhy-record-top{display:flex;align-items:center;justify-content:space-between;font-size:11px;color:#cdccd0}
.wpwhy-decision{display:flex;align-items:center;gap:5px;font-size:9px;color:#9382ff}
.wpwhy-decision>span{height:3px;width:3px;background:#9382ff;border-radius:50%}
.wpwhy-record-details{display:grid;grid-template-columns:1fr 100px;gap:12px;margin-top:8px}
.wpwhy-record-details>span{display:flex;align-items:center;gap:9px;white-space:nowrap;font-size:11px;color:#a8a6b7}
.wpwhy-record-details small{font-size:8px;color:#72707b}
.wpwhy-audit-record[data-blocked=true]{border-style:dashed;opacity:.66}
.wpwhy-audit-seal{display:flex;align-items:center;gap:7px;font-size:10px;color:#918ea0;margin-top:12px}
.wpwhy-audit-seal svg{color:#9382ff}
.wpwhy[data-running=false] *,.wpwhy[data-running=false] *:before,.wpwhy[data-running=false] *:after{animation-play-state:paused!important}
.wpwhy[data-reduced=true] .wpwhy-progress{transform:scaleX(1)!important}
.wpwhy[data-reduced=true] .wpwhy-scanner{display:none}
@keyframes wpwhy-breathe{0%,100%{opacity:.8;transform:scale(.98)}50%{opacity:1;transform:scale(1.025)}}
@keyframes wpwhy-twinkle{0%,100%{opacity:.25}50%{opacity:.85}}
@keyframes wpwhy-rotate{to{transform:rotate(360deg)}}
@keyframes wpwhy-infra-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
@keyframes wpwhy-old-line{0%,15%{opacity:.8}30%,100%{opacity:.3}}
@keyframes wpwhy-new-line{0%,17%{opacity:.2}35%,100%{opacity:1}}
@keyframes wpwhy-mask-raw{0%,12%{opacity:1}18%,100%{opacity:0}}
@keyframes wpwhy-mask-value{0%,12%{opacity:0}18%,100%{opacity:1}}
@keyframes wpwhy-scan{0%{transform:translateY(0);opacity:0}8%{opacity:1}35%{transform:translateY(126px);opacity:1}47%,100%{transform:translateY(126px);opacity:0}}
@keyframes wpwhy-currency{0%,45%{opacity:.3;transform:translateY(3px)}60%,100%{opacity:1;transform:translateY(0)}}
@keyframes wpwhy-decrypt{0%,15%{opacity:.2;transform:translateY(5px)}40%,100%{opacity:1;transform:translateY(0)}}
@keyframes wpwhy-record-flow{from{transform:translateY(0)}to{transform:translateY(-238px)}}
@media(min-width:1280px){.wpwhy-tab{padding-top:20px;padding-bottom:20px}
.wpwhy-tab-title{font-size:18px}}
@media(max-width:1023px){.wpwhy-layout{grid-template-columns:1fr;gap:25px;max-width:720px;margin-left:auto;margin-right:auto}
.wpwhy-tabs-eyebrow{display:none}
.wpwhy-tabs{position:relative;flex-direction:row;overflow-x:auto;gap:10px;scroll-snap-type:x mandatory;scrollbar-width:none;padding:4px 2px 8px;margin:-4px -2px -8px}
.wpwhy-tabs::-webkit-scrollbar{display:none}
.wpwhy-tab{flex:0 0 300px;scroll-snap-align:start;border-color:rgba(244,240,255,.07);min-height:120px;grid-template-columns:24px minmax(0,1fr);padding:18px}
.wpwhy-tab-arrow{display:none}
.wpwhy-tabs-hint{margin:16px 2px 0}
.wpwhy-stage{height:570px}
.wpwhy-scene-content{max-width:600px;margin:auto}
.wpwhy-private-scene{max-width:none}}
@media(max-width:599px){.wpwhy-header{gap:22px}
.wpwhy-header h2{font-size:36px;line-height:1.13;letter-spacing:-.9px}
.wpwhy-title-break{display:none}
.wpwhy-layout{margin-top:33px;gap:18px}
.wpwhy-stage{height:470px}
.wpwhy-stage-top{height:46px;padding:0 15px}
.wpwhy-stage-brand{font-size:9px;letter-spacing:1.1px}
.wpwhy-demo-label{font-size:7px;letter-spacing:.7px}
.wpwhy-scene-wrap{inset:46px 0 39px}
.wpwhy-scene-title{font-size:18px;letter-spacing:-.25px;margin-top:21px}
.wpwhy-scene-note{font-size:10px;margin:0 13px 15px;max-width:290px}
.wpwhy-stage-bottom{height:39px;padding:0 15px}
.wpwhy-portal{inset:-10px 0 -5px}
.wpwhy-orbit-svg{transform:none}
.wpwhy-provider-full{display:none}
.wpwhy-provider-short{display:inline}
.wpwhy-provider text{font-size:16px}
.wpwhy-core-name{font-size:25px}
.wpwhy-active-route{font-size:14px}
.wpwhy-tab{flex-basis:calc(100% - 30px);min-height:132px;padding:18px 16px;gap:10px}
.wpwhy-tab-title{font-size:17px;line-height:1.3}
.wpwhy-tab-text{font-size:13px;line-height:1.5}
.wpwhy-tabs-hint{margin-top:13px;font-size:8px}
.wpwhy-scene-content{padding:18px 14px 12px}
.wpwhy-window-bar{height:35px;font-size:9px;padding:0 11px}
.wpwhy-code-body{font-size:9.5px;line-height:1.7;padding:9px 0}
.wpwhy-code-body>div{min-height:17px}
.wpwhy-line-no{flex-basis:24px;font-size:8px}
.wpwhy-code-new .wpwhy-line-no{flex-basis:22px}
.wpwhy-code-body .wpwhy-code-empty{height:7px;min-height:7px}
.wpwhy-code-result{font-size:8px;padding:10px 11px;gap:5px}
.wpwhy-code-result-detail{display:none}
.wpwhy-code-cursor{width:4px;height:10px;margin-left:2px}
.wpwhy-small-caption{display:none}
.wpwhy-code-language{font-size:8px}
.wpwhy-brazil-scene{gap:14px;padding:15px 14px 8px}
.wpwhy-lgpd{font-size:8px;padding:2px 5px}
.wpwhy-prompt-intro{font-size:10px;padding:12px 11px 9px}
.wpwhy-pii-rows{padding:0 11px}
.wpwhy-pii-row{grid-template-columns:49px minmax(0,1fr) 12px;gap:6px;min-height:33px}
.wpwhy-pii-label{font-size:9px}
.wpwhy-pii-value{font-size:10px}
.wpwhy-pii-check{width:12px}
.wpwhy-prompt-footer{font-size:9px;padding:10px 11px}
.wpwhy-scanner{height:33px;animation-name:wpwhy-scan-mobile}
.wpwhy-scanner-lens{width:55px;height:55px;top:-12px}
.wpwhy-currency{padding:0 2px;gap:7px}
.wpwhy-currency-label{font-size:8px}
.wpwhy-currency>div{font-size:9px;gap:7px}
.wpwhy-currency strong{font-size:10px}
.wpwhy-currency svg{width:12px}
.wpwhy-private-scene{padding:0}
.wpwhy-cloud-boundary{inset:20px 17px 65px}
.wpwhy-infra{font-size:8px;min-width:72px;padding:6px 8px;gap:4px}
.wpwhy-infra svg{width:11px;height:11px}
.wpwhy-infra-kube{left:30px;top:42px}
.wpwhy-infra-kms{right:30px;top:42px}
.wpwhy-infra-postgres{left:30px;bottom:84px}
.wpwhy-infra-redis{right:30px;bottom:84px}
.wpwhy-lock{width:76px;height:76px;top:calc(44% - 38px);left:calc(50% - 38px)}
.wpwhy-lock>svg{width:40px;height:40px}
.wpwhy-lock-orbit{inset:-10px}
.wpwhy-private-glow{width:160px;height:160px;left:calc(50% - 80px);top:14%}
.wpwhy-cipher{inset:44px 0 76px;font-size:9px;gap:3px;letter-spacing:.6px}
.wpwhy-decrypted{bottom:14px}
.wpwhy-decrypt-label{font-size:6px;letter-spacing:1px}
.wpwhy-decrypted p{font-size:17px;margin-top:5px}
.wpwhy-audit-scene{padding:17px 17px 9px}
.wpwhy-audit-head{font-size:9px}
.wpwhy-live-dot{font-size:7px}
.wpwhy-audit-viewport{height:219px;margin-top:5px}
.wpwhy-audit-item{height:100px}
.wpwhy-audit-link{font-size:8px;height:25px;gap:6px}
.wpwhy-audit-record{padding:10px 11px}
.wpwhy-record-top{font-size:10px}
.wpwhy-decision{font-size:8px}
.wpwhy-record-details{grid-template-columns:1fr 78px;gap:7px;margin-top:7px}
.wpwhy-record-details>span{font-size:9px;gap:5px}
.wpwhy-record-details small{font-size:7px}
.wpwhy-audit-seal{font-size:8px;margin-top:8px;gap:5px}
.wpwhy-audit-stream{animation-name:wpwhy-record-flow-mobile}}
@keyframes wpwhy-scan-mobile{0%{transform:translateY(0);opacity:0}8%{opacity:1}35%{transform:translateY(99px);opacity:1}47%,100%{transform:translateY(99px);opacity:0}}
@keyframes wpwhy-record-flow-mobile{from{transform:translateY(0)}to{transform:translateY(-200px)}}
@media(prefers-reduced-motion:reduce){.wpwhy *,.wpwhy *:before,.wpwhy *:after{animation:none!important;transition:none!important}
.wpwhy-scanner{display:none}
.wpwhy-code-old{opacity:.3}
.wpwhy-pii-raw{opacity:0}
.wpwhy-pii-masked,.wpwhy-pii-check{opacity:1}}
`;

import { Bot, Check, FileText, LockKeyhole, MessageSquare, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import { EffectScope } from "./EffectScope";
import { ScrambleText } from "./ScrambleText";

/** Illustrative UI only; all nodes use the same fixed geometry as their connectors. */
export function UseCaseVisual({ index }: { index: number }) {
  return (
    <EffectScope decorative className={`fx-case-visual fx-case-${index}`}>
      <div className="fx-case-aura" />
      {index === 0 && (
        <div className="fx-support-demo">
          <div className="fx-demo-label"><MessageSquare size={13} strokeWidth={1.5} /> Atendimento · mensagem recebida</div>
          <div className="fx-chat-bubble">Quero consultar meu pedido.<br /><span className="text-fog">Meu CPF é </span><span className="font-mono text-lavender"><ScrambleText text="•••.•••.•••-••" /></span></div>
          <div className="fx-mask-rule"><span /><ShieldCheck size={15} strokeWidth={1.5} /><span /></div>
          <div className="fx-demo-status fx-loop"><Check size={13} strokeWidth={1.5} /> Dados protegidos antes de chegar ao modelo</div>
        </div>
      )}
      {index === 1 && (
        <div className="fx-terminal-demo">
          <div className="fx-terminal-chrome"><span /><span /><span /><span className="ml-auto !size-auto !bg-transparent font-mono text-[10px]">terminal · meu-projeto</span></div>
          <div className="font-mono text-[12px] leading-[1.9]">
            <div className="text-fog">$ python app.py</div>
            <div className="fx-terminal-line fx-loop"><span className="text-lavender">↳</span> chat-padrao <span className="text-fog">→ modelo aprovado</span></div>
            <div className="fx-terminal-line fx-loop" style={{ animationDelay: ".6s" }}><span className="text-lavender">↳</span> resumo-rapido <span className="text-fog">→ menor custo</span></div>
            <div className="mt-2 text-fog">$ <span className="text-lilac">Pronto para criar.</span><span className="fx-terminal-cursor fx-loop" /></div>
          </div>
        </div>
      )}
      {index === 2 && (
        <div className="fx-document-demo">
          <div className="fx-document-sheet"><FileText size={19} strokeWidth={1.5} /><span>contrato.pdf</span><i /><i /><i /><i /></div>
          <div className="fx-document-lock fx-loop"><LockKeyhole size={24} strokeWidth={1.5} /></div>
          <div className="fx-retention-seal"><ShieldCheck size={13} strokeWidth={1.5} /><ScrambleText text="Retenção zero" /></div>
        </div>
      )}
      {index === 3 && (
        <div className="fx-agent-demo">
          <svg viewBox="0 0 300 160" fill="none" className="absolute inset-0 size-full">
            <path d="M52 62H111Q150 62 150 101V116M150 101V62H248" stroke="#9382ff" strokeOpacity=".28" />
            <path className="fx-node-signal fx-loop" d="M52 62H111Q150 62 150 101V116M150 101V62H248" stroke="#ba9cff" strokeDasharray="8 160" />
          </svg>
          <div className="fx-agent-node" style={{ left: "17.333%", top: "38.75%" }}><Bot size={21} strokeWidth={1.5} /><span>Agente</span></div>
          <div className="fx-agent-node" style={{ left: "82.667%", top: "38.75%" }}><Wrench size={21} strokeWidth={1.5} /><span>MCP</span></div>
          <div className="fx-agent-approval fx-loop"><Check size={13} strokeWidth={1.5} /> Aprovação humana</div>
        </div>
      )}
      {index === 4 && (
        <div className="fx-corporate-demo">
          <div className="fx-demo-label"><LockKeyhole size={12} strokeWidth={1.5} /> Espaço do seu time</div>
          <div className="fx-team-message fx-loop"><span>Resuma os pontos da reunião.</span></div>
          <div className="fx-team-response fx-loop"><Sparkles size={15} strokeWidth={1.5} /><div><i /><i /><i /></div></div>
          <span className="fx-team-approved"><Check size={12} strokeWidth={1.5} /> Somente modelos aprovados</span>
        </div>
      )}
    </EffectScope>
  );
}

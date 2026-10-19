import type { ReactNode } from "react";
import { EffectScope } from "./EffectScope";

export function BeamBorder({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <EffectScope className={`fx-beam-border ${className}`}>
      <div className="fx-beam-track" aria-hidden="true"><div className="fx-beam-sweep fx-loop" /></div>
      {children}
    </EffectScope>
  );
}

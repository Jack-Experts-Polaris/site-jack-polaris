import { EffectScope } from "./EffectScope";

export function LightBeam({ className = "", grid = true }: { className?: string; grid?: boolean }) {
  return (
    <EffectScope decorative className={`fx-light-scene ${className}`}>
      <div className="fx-light-column fx-loop" />
      <div className="fx-light-core" />
      <div className="fx-light-pool" />
      {grid && <div className="fx-floor"><div className="fx-floor-grid" /></div>}
    </EffectScope>
  );
}

export function AuroraDivider({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`fx-aurora-divider ${className}`}><span /><i /></div>;
}

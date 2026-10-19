import type { CSSProperties } from "react";
import { EffectScope } from "./EffectScope";

export function GridSquares({ className = "" }: { className?: string }) {
  return (
    <EffectScope decorative className={`fx-grid-squares ${className}`}>
      <div className="fx-square-grid" />
      {Array.from({ length: 24 }, (_, i) => (
        <span key={i} className="fx-grid-cell fx-loop" style={{
          left: `${((i * 7 + 3) % 24) * 40}px`,
          top: `${((i * i * 17 + i * 3 + 7) % 9) * 40}px`,
          animationDelay: `${-(i * 1.7)}s`,
          animationDuration: `${6 + (i % 4)}s`,
        } as CSSProperties} />
      ))}
    </EffectScope>
  );
}

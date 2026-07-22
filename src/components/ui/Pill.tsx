import type { ReactNode } from "react";

/** Etiqueta redondeada tipo LunaUI ("Nuestras historias"). */
export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line bg-surface/60 px-3.5 py-1.5 font-display text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted">
      {children}
    </span>
  );
}

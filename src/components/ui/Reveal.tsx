"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
}

/** Fade-up sutil al entrar en viewport (una sola vez), con salvaguardas de visibilidad. */
/**
 * Se dispara apenas asoma el primer píxel del bloque (threshold 0) y con un
 * margen inferior positivo, así el fade empieza un poco ANTES de que el
 * bloque entre en pantalla. Un threshold proporcional (p. ej. 0.1) fallaba en
 * bloques altos como la galería: había que bajar cientos de píxeles para ver
 * algo.
 */
const OBSERVER_OPTIONS: IntersectionObserverInit = { threshold: 0, rootMargin: "0px 0px 15% 0px" };

export function Reveal({ children, as, className = "", delay = 0 }: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);

  // El estado "visible" se escribe directo en el DOM (data-shown) en vez de
  // en estado de React: evita un re-render extra y el setState dentro del effect.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const show = () => {
      el.dataset.shown = "true";
    };

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
      show();
      return;
    }

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        show();
        io.disconnect();
      }
    }, OBSERVER_OPTIONS);
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

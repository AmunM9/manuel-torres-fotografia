"use client";

import { useEffect, useState } from "react";
import { CloudPhoto } from "@/components/ui/CloudPhoto";
import type { Photo } from "@/lib/weddings";

const INTERVAL = 4800;

/**
 * Carrusel del hero: las fotos se funden entre sí cada cierto tiempo,
 * sin controles visibles. El marco se ve idéntico; solo cambia la imagen.
 */
export function HeroCarousel({ photos, alt }: { photos: Photo[]; alt: string }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (photos.length <= 1) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(
      () => setActive((a) => (a + 1) % photos.length),
      INTERVAL,
    );
    return () => clearInterval(id);
  }, [photos.length]);

  return (
    <div
      className="relative overflow-hidden rounded-photo shadow-[0_40px_90px_-50px_rgba(23,20,15,0.5)]"
      style={{ aspectRatio: "4/5" }}
    >
      {photos.map((p, i) => (
        <div
          key={p.id}
          className="absolute inset-0 transition-opacity duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ opacity: i === active ? 1 : 0 }}
          aria-hidden={i !== active}
        >
          <CloudPhoto
            photo={p}
            alt={alt}
            fill
            rounded={false}
            priority={i === 0}
            sizes="(max-width: 1024px) 100vw, 58vw"
          />
        </div>
      ))}
    </div>
  );
}

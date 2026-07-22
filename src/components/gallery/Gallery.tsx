"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { CloudPhoto } from "@/components/ui/CloudPhoto";
import type { Photo } from "@/lib/weddings";

// El lightbox (y su librería) se cargan solo al abrir la primera foto.
const LightboxView = dynamic(() => import("./LightboxView"), { ssr: false });

interface GalleryProps {
  photos: Photo[];
  title: string;
}

/** Galería masonry (CSS columns) con lightbox de navegación una a una. */
export function Gallery({ photos, title }: GalleryProps) {
  const [index, setIndex] = useState(-1);

  return (
    <>
      <div className="[column-fill:_balance] columns-1 gap-3 sm:columns-2 sm:gap-4 lg:columns-3">
        {photos.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setIndex(i)}
            className="photo-hover group mb-3 block w-full overflow-hidden rounded-photo sm:mb-4"
            aria-label={`Abrir foto ${i + 1} de ${photos.length}`}
          >
            <CloudPhoto
              photo={p}
              alt={`${title} — fotografía ${i + 1}`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="transition-[filter] duration-500 group-hover:brightness-[1.03]"
            />
          </button>
        ))}
      </div>

      {index >= 0 && (
        <LightboxView photos={photos} index={index} onClose={() => setIndex(-1)} />
      )}
    </>
  );
}

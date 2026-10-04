"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { CloudPhoto } from "@/components/ui/CloudPhoto";
import type { Photo } from "@/lib/weddings";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

// El lightbox (y su librería) se cargan solo al abrir la primera foto.
const LightboxView = dynamic(() => import("./LightboxView"), { ssr: false });

interface GalleryProps {
  photos: Photo[];
  title: string;
  locale: Locale;
  /** IDs de fotos que solo se ocultan por debajo del breakpoint sm (en escritorio sí aparecen). */
  hideOnMobile?: string[];
}

/** Galería masonry (CSS columns) con lightbox de navegación una a una. */
export function Gallery({ photos, title, locale, hideOnMobile }: GalleryProps) {
  const t = getDictionary(locale).gallery;
  const [index, setIndex] = useState(-1);
  const mobileHiddenIds = new Set(hideOnMobile);

  return (
    <>
      <div className="[column-fill:_balance] columns-2 gap-2 sm:gap-4 lg:columns-3">
        {photos.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setIndex(i)}
            className={`photo-hover group mb-2 w-full overflow-hidden rounded-photo sm:mb-4 ${
              mobileHiddenIds.has(p.id) ? "hidden sm:block" : "block"
            }`}
            aria-label={t.open(i + 1, photos.length)}
          >
            <CloudPhoto
              photo={p}
              alt={t.photoAlt(title, i + 1)}
              sizes="(max-width: 1024px) 50vw, 33vw"
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

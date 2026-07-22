"use client";

import { CldImage } from "next-cloudinary";
import type { Photo } from "@/lib/weddings";

interface CloudPhotoProps {
  photo: Photo;
  alt: string;
  sizes: string;
  /** Si se define, recorta a esa relación de aspecto (p. ej. "4/5"). Si no, usa las dimensiones reales. */
  aspect?: string;
  /** Rellena el contenedor padre (que debe ser `relative`). Ignora `aspect`. */
  fill?: boolean;
  priority?: boolean;
  className?: string;
  rounded?: boolean;
}

const DELIVERY = { format: "auto" as const, quality: "auto" as const };

/**
 * Foto servida por Cloudinary (AVIF/WebP responsive, lazy salvo priority).
 * Redondeo sutil por defecto.
 */
export function CloudPhoto({
  photo,
  alt,
  sizes,
  aspect,
  fill,
  priority,
  className = "",
  rounded = true,
}: CloudPhotoProps) {
  const round = rounded ? "rounded-photo" : "";

  if (fill) {
    return (
      <CldImage
        src={photo.id}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${round} ${className}`}
        {...DELIVERY}
      />
    );
  }

  if (aspect) {
    return (
      <div
        className={`relative overflow-hidden ${round} ${className}`}
        style={{ aspectRatio: aspect }}
      >
        <CldImage
          src={photo.id}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          {...DELIVERY}
        />
      </div>
    );
  }

  return (
    <CldImage
      src={photo.id}
      alt={alt}
      width={photo.w}
      height={photo.h}
      sizes={sizes}
      priority={priority}
      className={`block w-full h-auto ${round} ${className}`}
      {...DELIVERY}
    />
  );
}

import manifest from "@/data/weddings.json";

export interface Photo {
  id: string;
  w: number;
  h: number;
}

export interface Wedding {
  slug: string;
  title: string;
  location: string;
  cover: string;
  photos: Photo[];
}

const P = (slug: string, n: string) => `manuel-torres/${slug}/_MAN${n}`;

/** Fotos excluidas del sitio por completo (no aparecen en ninguna galería). */
const EXCLUDE = new Set<string>([
  P("paola-andres", "6098"),
  P("paola-andres", "4947"),
  P("paola-andres", "7554"),
  P("paola-andres", "6920"),
  P("paola-andres", "5680"),
  P("paola-andres", "5677"),
  P("sofia-diego", "9973"),
  P("paula-victor", "3339"),
  P("paula-victor", "3323"),
]);

/** Portada elegida a mano por boda (una foto de pareja fuerte). */
const COVER_OVERRIDES: Record<string, string> = {
  "paola-andres": P("paola-andres", "7054"),
  "paula-victor": P("paula-victor", "3441"),
  "sofia-diego": P("sofia-diego", "9979"),
};

export const weddings: Wedding[] = manifest.weddings.map((w) => ({
  ...w,
  cover: COVER_OVERRIDES[w.slug] ?? w.cover,
  photos: w.photos.filter((p) => !EXCLUDE.has(p.id)),
}));

// Retrato vertical de Manuel (Sobre mí / Contacto).
export const personalPhoto: Photo = {
  id: "manuel-torres/site/Foto_Personal_2",
  w: 2160,
  h: 2700,
};

export function getWedding(slug: string): Wedding | undefined {
  return weddings.find((w) => w.slug === slug);
}

/** Busca una foto por su public_id (usa el manifiesto para conservar dimensiones). */
export function photoById(id: string): Photo {
  const found = manifest.weddings.flatMap((w) => w.photos).find((p) => p.id === id);
  return found ?? { id, w: 2000, h: 3000 };
}

/**
 * Hero: 5 mejores fotos (parejas/retratos) que rotan en un carrusel.
 */
const HERO_IDS = [
  P("paola-andres", "7574"),
  P("sofia-diego", "9975"),
  P("paula-victor", "2684"),
  P("paola-andres", "6759"),
  P("sofia-diego", "8704"),
];

export function heroPhotos(): Photo[] {
  return HERO_IDS.map(photoById);
}

/**
 * "Un vistazo": selección curada (las mejores, sin repetir portadas/hero ni
 * fotos similares) ordenada para que dos fotos seguidas no sean de la misma
 * boda — así se siente más variado, como si fueran más de tres bodas.
 */
const GLIMPSE_IDS = [
  P("paola-andres", "5151"),
  P("paula-victor", "2387"),
  P("sofia-diego", "9032"),
  P("paola-andres", "5164"),
  P("paula-victor", "3238"),
  P("sofia-diego", "9959"),
  P("paola-andres", "6782"),
  P("paula-victor", "3369"),
  P("sofia-diego", "8977"),
  P("paola-andres", "5129"),
  P("paula-victor", "3286"),
  P("paola-andres", "5679"),
];

export function glimpsePhotos(): Photo[] {
  return GLIMPSE_IDS.map(photoById);
}

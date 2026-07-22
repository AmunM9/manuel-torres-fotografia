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
  P("paula-victor", "3313"),
  P("paola-andres", "5151"),
  P("paola-andres", "6759"),
  P("sofia-diego", "8704"),
];

export function heroPhotos(): Photo[] {
  return HERO_IDS.map(photoById);
}

/**
 * "Un vistazo": selección curada, solo verticales, sin repetir portadas/hero
 * ni fotos similares entre sí. El orden intercala las tres bodas (nunca dos
 * fotos seguidas de la misma) y, dentro de cada boda, prioriza primero fotos
 * de pareja y novia — las de novio quedan más hacia el final — para que la
 * apertura de la galería se sienta con más parejas/novias y, aun así, se
 * perciba variada, como si fueran más de tres bodas.
 */
const GLIMPSE_IDS = [
  P("paola-andres", "6917"),
  P("paula-victor", "3656"),
  P("sofia-diego", "9032"),
  P("paola-andres", "6769"),
  P("paula-victor", "3197"),
  P("sofia-diego", "9976"),
  P("paola-andres", "5267"),
  P("paula-victor", "2627"),
  P("sofia-diego", "8404"),
  P("paola-andres", "5151"),
  P("paula-victor", "3425"),
  P("sofia-diego", "9959"),
  P("paola-andres", "4986"),
  P("paula-victor", "2754"),
  P("sofia-diego", "8977"),
  P("paola-andres", "5164"),
  P("paula-victor", "3355"),
  P("sofia-diego", "9974"),
  P("paola-andres", "6097"),
  P("paula-victor", "3326"),
  P("sofia-diego", "9977"),
  P("paola-andres", "5679"),
  P("paula-victor", "3531"),
  P("paola-andres", "5514"),
  P("paula-victor", "2387"),
  P("paola-andres", "6793"),
  P("paula-victor", "3248"),
];

export function glimpsePhotos(): Photo[] {
  return GLIMPSE_IDS.map(photoById);
}

/**
 * Muestra compacta del portafolio para las páginas de ubicación (pSEO):
 * las 9 primeras del listado de "un vistazo" (ya priorizadas pareja/novia,
 * sin repetir boda consecutiva). Se reutiliza la misma selección en todas
 * las páginas de municipio porque ninguna foto tiene ubicación confirmada.
 */
export function locationGalleryPhotos(): Photo[] {
  return GLIMPSE_IDS.slice(0, 9).map(photoById);
}

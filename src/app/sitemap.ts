import type { MetadataRoute } from "next";
import { weddings } from "@/lib/weddings";
import { SITE } from "@/lib/site";
import { REGION_HUBS } from "@/data/locations";
import { INDEXABLE_LOCATIONS } from "@/lib/locations";

/** Prioridad de sitemap por fase de lanzamiento (fase 1 = mayor prioridad). */
const PHASE_PRIORITY: Record<number, number> = { 1: 0.7, 2: 0.55, 3: 0.5 };

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, priority: 1 },
    { url: `${base}/portafolio`, lastModified: now, priority: 0.8 },
    { url: `${base}/contacto`, lastModified: now, priority: 0.5 },
    ...weddings.map((w) => ({
      url: `${base}/portafolio/${w.slug}`,
      lastModified: now,
      priority: 0.6,
    })),
    // Directorios de región — siempre indexables.
    ...REGION_HUBS.map((r) => ({
      url: `${base}/fotografo-bodas-${r.slug}`,
      lastModified: now,
      priority: 0.65,
    })),
    // Solo páginas de municipio marcadas como indexables entran al sitemap;
    // las de cola larga (fase 2/3 sin revisar) se sirven con noindex y se
    // excluyen aquí a propósito para no diluir presupuesto de rastreo.
    ...INDEXABLE_LOCATIONS.map((l) => ({
      url: `${base}/fotografo-bodas-${l.slug}`,
      lastModified: now,
      priority: PHASE_PRIORITY[l.phase] ?? 0.5,
    })),
  ];
}

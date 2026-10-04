import type { MetadataRoute } from "next";
import { weddings } from "@/lib/weddings";
import { absoluteUrl } from "@/lib/site";
import { REGION_HUBS } from "@/data/locations";
import { INDEXABLE_LOCATIONS } from "@/lib/locations";
import { LOCALES, HREFLANG, DEFAULT_LOCALE } from "@/i18n/config";
import { hasRoute, localePath, type Route } from "@/i18n/routes";

/** Prioridad de sitemap por fase de lanzamiento (fase 1 = mayor prioridad). */
const PHASE_PRIORITY: Record<number, number> = { 1: 0.7, 2: 0.55, 3: 0.5 };

interface Entry {
  route: Route;
  priority: number;
}

/**
 * Una URL por idioma, cada una con sus alternates hreflang (es / en /
 * x-default). Así Google entiende que /fotografo-bodas-chia y
 * /en/wedding-photographer-chia son la misma página en dos idiomas y no
 * contenido duplicado — y la URL en español conserva su posicionamiento.
 */
function expand({ route, priority }: Entry, lastModified: Date): MetadataRoute.Sitemap {
  const both = LOCALES.every((l) => hasRoute(l, route));
  const languages = both
    ? {
        ...Object.fromEntries(LOCALES.map((l) => [HREFLANG[l], absoluteUrl(localePath(l, route))])),
        "x-default": absoluteUrl(localePath(DEFAULT_LOCALE, route)),
      }
    : undefined;

  return LOCALES.filter((l) => hasRoute(l, route)).map((l) => ({
    url: absoluteUrl(localePath(l, route)),
    lastModified,
    priority,
    ...(languages ? { alternates: { languages } } : {}),
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: Entry[] = [
    { route: { kind: "home" }, priority: 1 },
    { route: { kind: "destination" }, priority: 0.8 },
    { route: { kind: "portfolio" }, priority: 0.8 },
    { route: { kind: "contact" }, priority: 0.5 },
    ...weddings.map((w) => ({ route: { kind: "wedding", slug: w.slug } as const, priority: 0.6 })),
    // Directorios de región — siempre indexables.
    ...REGION_HUBS.map((r) => ({ route: { kind: "location", slug: r.slug } as const, priority: 0.65 })),
    // Solo municipios indexables; los de cola larga se sirven con noindex
    // (en ambos idiomas) y se excluyen a propósito para no diluir rastreo.
    ...INDEXABLE_LOCATIONS.map((l) => ({
      route: { kind: "location", slug: l.slug } as const,
      priority: PHASE_PRIORITY[l.phase] ?? 0.5,
    })),
  ];
  return entries.flatMap((e) => expand(e, now));
}

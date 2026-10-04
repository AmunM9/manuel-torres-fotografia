import type { Metadata } from "next";
import { DEFAULT_LOCALE, HREFLANG, type Locale } from "@/i18n/config";

/**
 * Mapa de rutas por idioma — una sola fuente de verdad para enlaces,
 * canonical, hreflang, sitemap y el selector de idioma.
 *
 * El español conserva EXACTAMENTE sus URLs históricas (ya posicionadas);
 * el inglés usa slugs traducidos bajo /en para posicionar búsquedas en
 * inglés ("wedding photographer bogota", etc.).
 */
export type Route =
  | { kind: "home" }
  | { kind: "portfolio" }
  | { kind: "wedding"; slug: string }
  | { kind: "contact" }
  | { kind: "location"; slug: string }
  | { kind: "destination" };

export const LOCATION_PREFIX: Record<Locale, string> = {
  es: "fotografo-bodas-",
  en: "wedding-photographer-",
};

const SEGMENTS: Record<Locale, { portfolio: string; contact: string; destination: string | null }> = {
  es: { portfolio: "portafolio", contact: "contacto", destination: null },
  en: {
    portfolio: "portfolio",
    contact: "contact",
    destination: "destination-wedding-photographer-colombia",
  },
};

const ROOT: Record<Locale, string> = { es: "", en: "/en" };

/** true si la ruta tiene versión en ese idioma. */
export function hasRoute(locale: Locale, route: Route): boolean {
  return route.kind !== "destination" || SEGMENTS[locale].destination !== null;
}

/** Ruta relativa (sin dominio) de `route` en `locale`. */
export function localePath(locale: Locale, route: Route): string {
  const root = ROOT[locale];
  const seg = SEGMENTS[locale];
  switch (route.kind) {
    case "home":
      return root || "/";
    case "portfolio":
      return `${root}/${seg.portfolio}`;
    case "wedding":
      return `${root}/${seg.portfolio}/${route.slug}`;
    case "contact":
      return `${root}/${seg.contact}`;
    case "location":
      return `${root}/${LOCATION_PREFIX[locale]}${route.slug}`;
    case "destination":
      return seg.destination ? `${root}/${seg.destination}` : root || "/";
  }
}

/** Interpreta una URL del sitio y devuelve su idioma + ruta lógica. */
export function parsePath(pathname: string): { locale: Locale; route: Route } | null {
  const clean = pathname.replace(/\/+$/, "") || "/";
  const isEn = clean === "/en" || clean.startsWith("/en/");
  const locale: Locale = isEn ? "en" : "es";
  const rest = isEn ? clean.slice(3) : clean;
  const parts = rest.split("/").filter(Boolean);
  const seg = SEGMENTS[locale];

  if (parts.length === 0) return { locale, route: { kind: "home" } };
  const [first, second] = parts;

  if (first === seg.portfolio) {
    if (parts.length === 1) return { locale, route: { kind: "portfolio" } };
    if (parts.length === 2) return { locale, route: { kind: "wedding", slug: second } };
    return null;
  }
  if (parts.length !== 1) return null;
  if (first === seg.contact) return { locale, route: { kind: "contact" } };
  if (seg.destination && first === seg.destination) return { locale, route: { kind: "destination" } };
  if (first.startsWith(LOCATION_PREFIX[locale])) {
    return { locale, route: { kind: "location", slug: first.slice(LOCATION_PREFIX[locale].length) } };
  }
  return null;
}

/**
 * Equivalente de `pathname` en el otro idioma. Si la página no existe en
 * ese idioma (o la URL no se reconoce), cae al inicio de ese idioma.
 */
export function switchLocalePath(pathname: string, target: Locale): string {
  const parsed = parsePath(pathname);
  if (!parsed || !hasRoute(target, parsed.route)) return localePath(target, { kind: "home" });
  return localePath(target, parsed.route);
}

/**
 * `alternates` de Metadata: canonical propio + hreflang recíproco
 * (es, en y x-default → español, el idioma histórico del sitio).
 */
export function alternatesFor(locale: Locale, route: Route): NonNullable<Metadata["alternates"]> {
  const canonical = localePath(locale, route);
  const bothExist = hasRoute("es", route) && hasRoute("en", route);
  if (!bothExist) return { canonical };
  return {
    canonical,
    languages: {
      [HREFLANG.es]: localePath("es", route),
      [HREFLANG.en]: localePath("en", route),
      "x-default": localePath(DEFAULT_LOCALE, route),
    },
  };
}

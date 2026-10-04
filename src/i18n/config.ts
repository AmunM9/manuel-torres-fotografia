/**
 * Idiomas del sitio. El español es el idioma por defecto y vive en la raíz
 * SIN prefijo (las URLs ya posicionadas no cambian); el inglés vive bajo /en.
 */
export const LOCALES = ["es", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "es";

/** Cookie que recuerda el idioma elegido a mano con el selector. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

/** Etiquetas hreflang / Open Graph por idioma. */
export const HREFLANG: Record<Locale, string> = { es: "es", en: "en" };
export const OG_LOCALE: Record<Locale, string> = { es: "es_CO", en: "en_US" };

export function isLocale(value: string | undefined): value is Locale {
  return value === "es" || value === "en";
}

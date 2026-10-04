import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/**
 * Configuración global del sitio — una sola fuente de verdad.
 * Los textos que dependen del idioma viven en src/i18n/dictionaries.
 */
const whatsappNumber = "573112204004"; // Colombia (+57) 311 220 4004

export const SITE = {
  name: "Manuel Torres",
  // Cambiar por el dominio real tras el deploy en Vercel.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.manueltorres.com.co",
  instagram: "https://www.instagram.com/manueltorresfotografia",
  instagramHandle: "@manueltorresfotografia",
  // Formato E.164 para tel: y schema.org (telephone).
  phoneE164: `+${whatsappNumber}`,
  // Bogotá como base de operación — el negocio se desplaza a cada venue, no atiende en un local fijo.
  baseCity: "Bogotá",
} as const;

/** Enlace de WhatsApp con el mensaje inicial en el idioma de la página. */
export function whatsappUrl(locale: Locale): string {
  const message = getDictionary(locale).site.whatsappMessage;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** URL absoluta del sitio para una ruta relativa ("/en/portfolio"). */
export function absoluteUrl(path: string): string {
  const base = SITE.url.replace(/\/$/, "");
  return path === "/" ? `${base}/` : `${base}${path}`;
}

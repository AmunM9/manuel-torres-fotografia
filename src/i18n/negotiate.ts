import { LOCALES, type Locale } from "@/i18n/config";
import { parsePath, switchLocalePath } from "@/i18n/routes";

/**
 * Crawlers y previsualizadores de enlaces: nunca se redirigen por idioma,
 * para que Google y compañía siempre vean cada URL tal cual (sin esto, un
 * bot con Accept-Language en inglés no podría indexar el español).
 */
const BOT_UA =
  /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|whatsapp|telegram|slack|discord|embedly|lighthouse|headless|preview/i;

/** Idioma soportado preferido según la cabecera Accept-Language, o null. */
export function preferredLocale(acceptLanguage: string | null): Locale | null {
  if (!acceptLanguage) return null;
  const ranked = acceptLanguage
    .split(",")
    .map((part, index) => {
      const [tag, ...params] = part.trim().toLowerCase().split(";");
      const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      const quality = q ? Number.parseFloat(q.slice(2)) : 1;
      return { base: tag.split("-")[0], quality: Number.isNaN(quality) ? 0 : quality, index };
    })
    .filter((l) => l.quality > 0)
    .sort((a, b) => b.quality - a.quality || a.index - b.index);

  const match = ranked.find((l) => (LOCALES as readonly string[]).includes(l.base));
  return match ? (match.base as Locale) : null;
}

interface RedirectInput {
  pathname: string;
  cookieLocale: string | undefined;
  acceptLanguage: string | null;
  userAgent: string | null;
}

/**
 * Decide si una visita a una URL en español debe ir a su versión en inglés.
 * Reglas (en orden):
 *  1. Las URLs /en nunca se redirigen: un enlace en inglés se respeta.
 *  2. Si la persona eligió idioma con el selector (cookie), manda la cookie.
 *  3. Bots: nunca se redirigen.
 *  4. Sin cookie: solo si el navegador prefiere inglés antes que español.
 * El español es el valor por defecto, así que nunca se redirige "hacia" él.
 */
export function localeRedirect({ pathname, cookieLocale, acceptLanguage, userAgent }: RedirectInput): string | null {
  const parsed = parsePath(pathname);
  if (!parsed || parsed.locale !== "es") return null;

  const wantsEnglish =
    cookieLocale === "en" ||
    (cookieLocale === undefined &&
      !BOT_UA.test(userAgent ?? "") &&
      preferredLocale(acceptLanguage) === "en");

  return wantsEnglish ? switchLocalePath(pathname, "en") : null;
}

import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE } from "@/i18n/config";
import { localeRedirect } from "@/i18n/negotiate";

/**
 * Idioma automático: quien llega a una URL en español con el navegador en
 * inglés (y sin haber elegido idioma) va a la misma página en /en.
 * Redirección temporal (307) — las URLs en español siguen siendo las
 * canónicas e indexables; Google las rastrea sin redirección (ver negotiate.ts).
 */
export function proxy(request: NextRequest) {
  const target = localeRedirect({
    pathname: request.nextUrl.pathname,
    cookieLocale: request.cookies.get(LOCALE_COOKIE)?.value,
    acceptLanguage: request.headers.get("accept-language"),
    userAgent: request.headers.get("user-agent"),
  });

  if (!target) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = target;
  const response = NextResponse.redirect(url, 307);
  response.headers.set("Vary", "Accept-Language, Cookie");
  return response;
}

export const config = {
  // Solo páginas: fuera estáticos, imágenes, API y archivos de metadata/SEO.
  matcher: [
    "/((?!_next/|api/|en(?:/|$)|.*\\..*|sitemap.xml|robots.txt|llms.txt|opengraph-image|icon|apple-icon).*)",
  ],
};

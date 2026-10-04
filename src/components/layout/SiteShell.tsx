import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/nav/Footer";
import { JsonLd } from "@/components/ui/JsonLd";
import { fontClasses } from "@/components/layout/fonts";
import { siteJsonLd } from "@/lib/schema";
import type { Locale } from "@/i18n/config";

interface SiteShellProps {
  locale: Locale;
  children: ReactNode;
}

/**
 * <html>/<body> compartido por los dos layouts raíz (español en la raíz,
 * inglés bajo /en). Dos layouts raíz permiten un `lang` correcto por idioma
 * sin mover las URLs en español.
 */
export function SiteShell({ locale, children }: SiteShellProps) {
  return (
    <html lang={locale} className={`${fontClasses} h-full`}>
      <body className="min-h-full flex flex-col bg-bg text-ink">
        <JsonLd data={siteJsonLd(locale)} />
        <Nav locale={locale} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} />
        <Analytics />
      </body>
    </html>
  );
}

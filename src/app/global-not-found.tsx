import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { fontClasses } from "@/components/layout/fonts";
import { getDictionary } from "@/i18n/dictionaries";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: "404 · Manuel Torres",
  robots: { index: false, follow: true },
};

/**
 * 404 global (no hay un único layout raíz). Bilingüe a propósito: no se
 * sabe con certeza el idioma de una URL inexistente.
 */
export default function GlobalNotFound() {
  const es = getDictionary("es").notFound;
  const en = getDictionary("en").notFound;
  return (
    <html lang="es" className={`${fontClasses} h-full`}>
      <body className="min-h-full flex items-center bg-bg text-ink">
        <main className="shell w-full py-24 text-center">
          <p className="eyebrow">404</p>
          <h1 className="display mt-5 text-[clamp(2.2rem,1rem+4vw,4rem)]">{es.title}</h1>
          <p className="mt-4 text-lg text-muted">{es.text}</p>
          <p lang="en" className="mt-2 text-muted">
            {en.title} — {en.text}
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3 font-display text-sm font-semibold">
            <Link href="/" className="rounded-full bg-ink px-6 py-3 text-bg transition-colors hover:bg-accent">
              {es.cta}
            </Link>
            <Link
              href="/en"
              hrefLang="en"
              className="rounded-full border border-line px-6 py-3 transition-colors hover:border-ink hover:bg-surface"
            >
              {en.cta}
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}

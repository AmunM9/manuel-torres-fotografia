"use client";

import { usePathname } from "next/navigation";
import { LOCALE_COOKIE, type Locale } from "@/i18n/config";
import { switchLocalePath } from "@/i18n/routes";

const ONE_YEAR = 60 * 60 * 24 * 365;

const LABELS: Record<Locale, { short: string; long: string }> = {
  es: { short: "ES", long: "Español" },
  en: { short: "EN", long: "English" },
};

/** Guarda la elección para que el proxy no vuelva a redirigir por el idioma del navegador. */
function rememberLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${ONE_YEAR}; samesite=lax`;
}

interface LanguageSwitchProps {
  locale: Locale;
  /** "compact": enlace discreto (ES/EN). "full": ambos idiomas, el actual marcado. "text": enlace de texto (footer). */
  variant: "compact" | "full" | "text";
  label: string;
  onNavigate?: () => void;
}

/**
 * Selector de idioma. Usa <a> (no <Link>) a propósito: cada idioma tiene su
 * propio layout raíz, así que el cambio es siempre una carga completa.
 */
export function LanguageSwitch({ locale, variant, label, onNavigate }: LanguageSwitchProps) {
  const pathname = usePathname() ?? "/";
  const other: Locale = locale === "es" ? "en" : "es";

  if (variant === "text") {
    return (
      <a
        href={switchLocalePath(pathname, other)}
        hrefLang={other}
        lang={other}
        onClick={() => rememberLocale(other)}
        className="text-xs font-display tracking-wide text-faint transition-colors hover:text-ink"
      >
        {other === "en" ? "English version" : "Versión en español"}
      </a>
    );
  }

  if (variant === "compact") {
    return (
      <a
        href={switchLocalePath(pathname, other)}
        hrefLang={other}
        lang={other}
        onClick={() => rememberLocale(other)}
        aria-label={LABELS[other].long}
        title={LABELS[other].long}
        className="rounded-full border border-transparent px-2.5 py-1 font-display text-[0.68rem] font-semibold tracking-[0.18em] text-faint transition-colors hover:border-line hover:text-ink focus-visible:border-ink focus-visible:text-ink focus-visible:outline-none"
      >
        {LABELS[other].short}
      </a>
    );
  }

  return (
    <div role="group" aria-label={label} className="flex items-center gap-2 font-display">
      {(["es", "en"] as const).map((l, i) => (
        <span key={l} className="flex items-center gap-2">
          {i > 0 && <span aria-hidden className="text-accent/70">·</span>}
          {l === locale ? (
            <span aria-current="true" className="text-sm font-semibold tracking-[0.12em] text-ink">
              {LABELS[l].long}
            </span>
          ) : (
            <a
              href={switchLocalePath(pathname, l)}
              hrefLang={l}
              lang={l}
              onClick={() => {
                rememberLocale(l);
                onNavigate?.();
              }}
              className="text-sm font-semibold tracking-[0.12em] text-muted transition-colors hover:text-ink"
            >
              {LABELS[l].long}
            </a>
          )}
        </span>
      ))}
    </div>
  );
}

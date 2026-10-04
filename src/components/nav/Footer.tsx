import Link from "next/link";
import Image from "next/image";
import monogram from "../../../public/logo-monogram.png";
import { SITE, whatsappUrl } from "@/lib/site";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath } from "@/i18n/routes";
import { LanguageSwitch } from "@/components/nav/LanguageSwitch";
import type { Locale } from "@/i18n/config";
import { InstagramIcon, WhatsappIcon } from "@/components/ui/icons";

export function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <footer className="border-t border-line mt-[var(--space-section)]">
      <div className="shell py-14 flex flex-col md:flex-row gap-10 md:items-end md:justify-between">
        <div>
          <Link
            href={localePath(locale, { kind: "home" })}
            className="flex items-center gap-2.5 mb-5"
            aria-label={t.nav.homeAria}
          >
            <Image
              src={monogram}
              alt=""
              height={30}
              className="h-7 w-auto"
            />
            <span className="font-display font-semibold tracking-[0.24em] text-[0.82rem] uppercase">
              Manuel Torres
            </span>
          </Link>
          <p className="font-display text-sm text-muted max-w-xs">
            {t.footer.tagline}{" "}
            <span className="text-ink">{t.site.bookingNote}.</span>
          </p>
          <a
            href={`tel:${SITE.phoneE164}`}
            className="mt-2 inline-block font-display text-sm text-muted transition-colors hover:text-ink"
          >
            {SITE.phoneE164}
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-ink hover:text-bg hover:border-ink"
          >
            <InstagramIcon className="h-[18px] w-[18px]" />
          </Link>
          <Link
            href={whatsappUrl(locale)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-ink hover:text-bg hover:border-ink"
          >
            <WhatsappIcon className="h-[19px] w-[19px]" />
          </Link>
        </div>
      </div>

      <div className="shell pb-8">
        <p className="text-xs text-faint font-display tracking-wide">
          © {new Date().getFullYear()} Manuel Torres · {t.footer.rights}
        </p>
        {locale === "en" && (
          <Link
            href={localePath("en", { kind: "destination" })}
            className="mt-2 block text-xs font-display tracking-wide text-faint transition-colors hover:text-ink"
          >
            Destination weddings in Colombia
          </Link>
        )}
        <div className="mt-2">
          <LanguageSwitch locale={locale} variant="text" label={t.nav.language} />
        </div>
      </div>
    </footer>
  );
}

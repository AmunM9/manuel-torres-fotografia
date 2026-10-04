import { HeroCarousel } from "@/components/home/HeroCarousel";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath } from "@/i18n/routes";
import type { Photo } from "@/lib/weddings";

export function Hero({ photos, locale }: { photos: Photo[]; locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <section className="shell relative pt-10 pb-6 sm:pt-16 lg:pt-20">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Texto — la parte áurea menor */}
        <div className="order-2 lg:order-1 lg:col-span-5">
          <Pill>{t.hero.pill}</Pill>
          <h1 className="display mt-6 text-[clamp(2.2rem,1rem+4.6vw,4.4rem)]">
            {t.hero.titleA}
            <br className="hidden sm:block" /> {t.hero.titleB}{" "}
            <span className="text-accent italic">{t.hero.titleAccent}</span>.
          </h1>
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted">
            {t.meta.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href={localePath(locale, { kind: "portfolio" })}>{t.hero.ctaPortfolio}</Button>
            <Button href={localePath(locale, { kind: "contact" })} variant="ghost" withArrow={false}>
              {t.hero.ctaContact}
            </Button>
          </div>
          <p className="eyebrow mt-8">{t.site.bookingNote}</p>
        </div>

        {/* Foto — protagonista */}
        <div className="relative order-1 lg:order-2 lg:col-span-7">
          {/* circunferencia decorativa */}
          <div
            aria-hidden
            className="absolute -right-6 -top-10 -z-10 hidden aspect-square w-56 rounded-full border border-accent/25 lg:block"
          />
          <HeroCarousel photos={photos} alt={t.hero.photoAlt} />
        </div>
      </div>
    </section>
  );
}

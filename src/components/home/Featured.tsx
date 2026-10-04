import Link from "next/link";
import { CloudPhoto } from "@/components/ui/CloudPhoto";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowIcon } from "@/components/ui/icons";
import { photoById } from "@/lib/weddings";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath } from "@/i18n/routes";


const FEATURED_ID = "manuel-torres/paola-andres/_MAN7548";

export function Featured({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).featured;
  const photo = photoById(FEATURED_ID);
  return (
    <section className="shell mt-[var(--space-section)]">
      <Reveal>
        <div className="relative aspect-[4/5] overflow-hidden rounded-card sm:aspect-[16/10]">
          <CloudPhoto
            photo={photo}
            alt={t.title}
            fill
            rounded={false}
            sizes="(max-width: 1536px) 100vw, 1400px"
          />
          {/* scrim para legibilidad */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent sm:from-ink/75 sm:via-ink/25"
          />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-12 lg:p-16">
            <div className="max-w-xl text-bg">
              <h2 className="display text-[clamp(1.7rem,1rem+4vw,3.6rem)]">
                {t.title}
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-bg/85">
                {t.text}
              </p>
              <Link
                href={localePath(locale, { kind: "portfolio" })}
                className="group mt-6 inline-flex items-center gap-2 rounded-full bg-bg px-6 py-3 font-display text-sm font-semibold text-ink transition-colors hover:bg-accent hover:text-bg sm:mt-7"
              >
                {t.cta}
                <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

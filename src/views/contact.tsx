import type { Metadata } from "next";
import { CloudPhoto } from "@/components/ui/CloudPhoto";
import { Reveal } from "@/components/ui/Reveal";
import { Pill } from "@/components/ui/Pill";
import { ContactLinks } from "@/components/ui/ContactLinks";
import { personalPhoto } from "@/lib/weddings";
import { pageMetadata } from "@/lib/metadata";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export function contactMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale);
  return pageMetadata(locale, { kind: "contact" }, {
    title: t.contact.metaTitle,
    description: t.contact.metaDescription(t.site.bookingNote),
  });
}

export function ContactView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <div className="shell py-16 sm:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        {/* Retrato */}
        <Reveal className="lg:col-span-5">
          <div className="relative">
            <div
              aria-hidden
              className="absolute -right-7 -top-8 -z-10 hidden aspect-square w-40 rounded-full border border-accent/25 lg:block"
            />
            <CloudPhoto
              photo={personalPhoto}
              alt={t.about.portraitAlt}
              aspect="4/5"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
          </div>
        </Reveal>

        {/* Contenido */}
        <Reveal delay={100} className="lg:col-span-7">
          <Pill>{t.contact.pill}</Pill>
          <h1 className="display mt-6 text-[clamp(2.4rem,1rem+4.5vw,4.4rem)]">{t.contact.title}</h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            {t.contact.text(t.site.bookingNote)}
          </p>

          <ContactLinks className="mt-9 max-w-xl" locale={locale} />
        </Reveal>
      </div>
    </div>
  );
}

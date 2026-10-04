import type { Metadata } from "next";
import { weddings } from "@/lib/weddings";
import { WeddingCard } from "@/components/portfolio/WeddingCard";
import { Reveal } from "@/components/ui/Reveal";
import { Pill } from "@/components/ui/Pill";
import { pageMetadata } from "@/lib/metadata";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export function portfolioMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale).portfolio;
  return pageMetadata(locale, { kind: "portfolio" }, {
    title: t.metaTitle,
    description: t.metaDescription,
  });
}

export function PortfolioView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).portfolio;
  return (
    <div className="shell pt-16 pb-8 sm:pt-24">
      <header className="max-w-3xl">
        <Reveal>
          <Pill>{t.pill}</Pill>
        </Reveal>
        <Reveal as="h1" delay={80} className="display mt-6 text-[clamp(2.6rem,1rem+7vw,6rem)]">
          {t.title}
        </Reveal>
        <Reveal as="p" delay={140} className="mt-6 max-w-md text-muted text-lg leading-relaxed">
          {t.intro}
        </Reveal>
      </header>

      <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 sm:mt-20 lg:grid-cols-3">
        {weddings.map((w, i) => (
          <Reveal key={w.slug} delay={i * 90}>
            <WeddingCard wedding={w} priority={i === 0} locale={locale} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

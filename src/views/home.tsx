import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Glimpse } from "@/components/home/Glimpse";
import { About } from "@/components/home/About";
import { Featured } from "@/components/home/Featured";
import { heroPhotos } from "@/lib/weddings";
import { pageMetadata } from "@/lib/metadata";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export function homeMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale).meta;
  return pageMetadata(locale, { kind: "home" }, {
    title: { absolute: t.brandTitle },
    description: t.description,
  });
}

export function HomeView({ locale }: { locale: Locale }) {
  return (
    <>
      <Hero photos={heroPhotos()} locale={locale} />
      <Glimpse locale={locale} />
      <About locale={locale} />
      <Featured locale={locale} />
    </>
  );
}

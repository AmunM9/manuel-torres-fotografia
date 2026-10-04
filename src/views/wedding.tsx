import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getWedding, weddings } from "@/lib/weddings";
import { cldUrl } from "@/lib/cloudinary";
import { Gallery } from "@/components/gallery/Gallery";
import { Reveal } from "@/components/ui/Reveal";
import { Pill } from "@/components/ui/Pill";
import { ArrowIcon } from "@/components/ui/icons";
import { pageMetadata } from "@/lib/metadata";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath } from "@/i18n/routes";
import type { Locale } from "@/i18n/config";

export function weddingStaticParams() {
  return weddings.map((w) => ({ slug: w.slug }));
}

export function weddingMetadata(locale: Locale, slug: string): Metadata {
  const wedding = getWedding(slug);
  if (!wedding) return {};
  const t = getDictionary(locale).portfolio;
  return pageMetadata(locale, { kind: "wedding", slug }, {
    title: wedding.title,
    description: t.weddingDescription(wedding.title),
    openGraph: { images: [{ url: cldUrl(wedding.cover, 1200), width: 1200, height: 1500 }] },
  });
}

export function WeddingView({ locale, slug }: { locale: Locale; slug: string }) {
  const wedding = getWedding(slug);
  if (!wedding) notFound();
  const t = getDictionary(locale).portfolio;

  return (
    <div className="shell pt-14 pb-4 sm:pt-20">
      <Reveal className="text-center">
        <Link
          href={localePath(locale, { kind: "portfolio" })}
          className="eyebrow inline-flex items-center gap-2 transition-colors hover:text-ink"
        >
          <ArrowIcon className="h-3.5 w-3.5 rotate-180" />
          {t.title}
        </Link>
        <h1 className="display mt-5 text-[clamp(2.6rem,1rem+8vw,7rem)]">{wedding.title}</h1>
        <div className="mt-5 flex justify-center">
          <Pill>{t.photos(wedding.photos.length)}</Pill>
        </div>
      </Reveal>

      <div className="mt-12 sm:mt-16">
        <Gallery photos={wedding.photos} title={wedding.title} locale={locale} />
      </div>
    </div>
  );
}

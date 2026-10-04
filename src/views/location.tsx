import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { REGION_HUBS } from "@/data/locations";
import {
  ALL_LOCATIONS,
  getLocation,
  getRegionHub,
  localizeLocation,
  localizeRegion,
} from "@/lib/locations";
import { LocationPage } from "@/components/location/LocationPage";
import { RegionHubPage } from "@/components/location/RegionHubPage";
import { pageMetadata } from "@/lib/metadata";
import { getDictionary } from "@/i18n/dictionaries";
import { LOCATION_PREFIX } from "@/i18n/routes";
import type { Locale } from "@/i18n/config";

/**
 * Next.js App Router exige que un segmento dinámico sea la carpeta completa
 * ([param]), no un prefijo + corchete (fotografo-bodas-[slug] no funciona).
 * Por eso la carpeta se llama [fullslug] y aquí se compone/descompone el
 * prefijo del idioma ("fotografo-bodas-" / "wedding-photographer-") a mano
 * para lograr URLs planas: /fotografo-bodas-chia y /en/wedding-photographer-chia.
 */
export function locationStaticParams(locale: Locale) {
  const prefix = LOCATION_PREFIX[locale];
  return [...ALL_LOCATIONS, ...REGION_HUBS].map((l) => ({ fullslug: `${prefix}${l.slug}` }));
}

function resolveSlug(locale: Locale, fullslug: string): string | null {
  const prefix = LOCATION_PREFIX[locale];
  return fullslug.startsWith(prefix) ? fullslug.slice(prefix.length) : null;
}

export function locationMetadata(locale: Locale, fullslug: string): Metadata {
  const slug = resolveSlug(locale, fullslug);
  if (!slug) return {};
  const t = getDictionary(locale).location;
  const route = { kind: "location", slug } as const;

  const base = getLocation(slug);
  if (base) {
    const location = localizeLocation(base, locale);
    return pageMetadata(locale, route, {
      title: t.metaTitle(location.name),
      description: location.intro,
      // Misma regla en ambos idiomas: lo que no se indexa en español tampoco en inglés.
      robots: location.indexable ? { index: true, follow: true } : { index: false, follow: true },
    });
  }

  const baseRegion = getRegionHub(slug);
  if (baseRegion) {
    const region = localizeRegion(baseRegion, locale);
    return pageMetadata(locale, route, {
      title: t.metaTitle(region.name),
      description: region.description,
    });
  }

  return {};
}

export function LocationView({ locale, fullslug }: { locale: Locale; fullslug: string }) {
  const slug = resolveSlug(locale, fullslug);
  if (!slug) notFound();

  const location = getLocation(slug);
  if (location) return <LocationPage location={location} locale={locale} />;

  const region = getRegionHub(slug);
  if (region) return <RegionHubPage region={region} locale={locale} />;

  notFound();
}

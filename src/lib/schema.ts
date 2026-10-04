import { SITE, absoluteUrl } from "@/lib/site";
import type { Location } from "@/data/locations";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath } from "@/i18n/routes";

/** Coordenadas aproximadas de Bogotá — base de operación (negocio de área de servicio, sin local fijo). */
const BOGOTA_GEO = { "@type": "GeoCoordinates", latitude: 4.71099, longitude: -74.07209 } as const;

/** Un solo @id para la entidad de negocio en ambos idiomas: es la misma marca. */
const BUSINESS_ID = `${SITE.url}/#negocio`;

/**
 * JSON-LD de la entidad de negocio, para insertar en TODAS las páginas
 * (layout raíz). Declara explícitamente quién es "Manuel Torres" como
 * marca/persona, con `knowsLanguage` para búsquedas de parejas extranjeras.
 */
export function siteJsonLd(locale: Locale) {
  const t = getDictionary(locale);
  const home = absoluteUrl(localePath(locale, { kind: "home" }));
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": BUSINESS_ID,
    name: `${SITE.name} Fotografía`,
    alternateName: [SITE.name, `${SITE.name} Photography`],
    url: home,
    description: t.meta.description,
    inLanguage: locale,
    knowsLanguage: ["es", "en"],
    image: `${SITE.url}/opengraph-image`,
    telephone: SITE.phoneE164,
    priceRange: "$$",
    sameAs: [SITE.instagram],
    areaServed: [
      { "@type": "City", name: "Bogotá" },
      { "@type": "AdministrativeArea", name: "Cundinamarca, Colombia" },
      { "@type": "Country", name: "Colombia" },
    ],
    geo: BOGOTA_GEO,
    founder: {
      "@type": "Person",
      name: SITE.name,
      jobTitle: t.site.jobTitle,
      url: home,
      sameAs: [SITE.instagram],
      knowsLanguage: ["es", "en"],
    },
  } as const;
}

/**
 * JSON-LD Service + LocalBusiness para una página de municipio.
 * Sin dirección física fija a propósito: es un negocio de área de servicio
 * (el fotógrafo se desplaza al lugar del evento).
 */
export function locationJsonLd(location: Location, locale: Locale) {
  const t = getDictionary(locale).location;
  const pageUrl = absoluteUrl(localePath(locale, { kind: "location", slug: location.slug }));
  const areaServed = {
    "@type": "City",
    name: location.name,
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: `${location.province}, ${location.department}, Colombia`,
    },
  };

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: t.serviceType,
    name: t.h1(location.name),
    url: pageUrl,
    inLanguage: locale,
    areaServed,
    provider: {
      "@type": "LocalBusiness",
      "@id": BUSINESS_ID,
      name: `${SITE.name} Fotografía`,
      url: SITE.url,
      telephone: SITE.phoneE164,
      priceRange: "$$",
      image: `${SITE.url}/opengraph-image`,
      areaServed,
    },
  } as const;
}

export function regionJsonLd(regionName: string, regionSlug: string, locale: Locale) {
  const t = getDictionary(locale).location;
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t.h1(regionName),
    url: absoluteUrl(localePath(locale, { kind: "location", slug: regionSlug })),
    inLanguage: locale,
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
  } as const;
}

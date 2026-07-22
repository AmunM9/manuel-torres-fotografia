import { SITE } from "@/lib/site";
import type { Location } from "@/data/locations";

/**
 * JSON-LD Service + LocalBusiness para una página de municipio.
 * Sin dirección física fija a propósito: es un negocio de área de servicio
 * (el fotógrafo se desplaza al lugar del evento), así que se declara
 * `areaServed` por municipio en vez de un `address` que induciría a pensar
 * en un local público. Ver: https://schema.org/LocalBusiness (service-area business).
 */
export function locationJsonLd(location: Location) {
  const pageUrl = `${SITE.url}/fotografo-bodas-${location.slug}`;
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
    serviceType: "Fotografía de bodas y eventos sociales",
    name: `Fotógrafo de bodas en ${location.name}`,
    url: pageUrl,
    areaServed,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${SITE.url}/#negocio`,
      name: `${SITE.name} Fotografía`,
      url: SITE.url,
      telephone: SITE.phoneE164,
      priceRange: "$$",
      image: `${SITE.url}/opengraph-image`,
      areaServed,
    },
  } as const;
}

export function regionJsonLd(regionName: string, regionSlug: string) {
  const pageUrl = `${SITE.url}/fotografo-bodas-${regionSlug}`;
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Fotógrafo de bodas en ${regionName}`,
    url: pageUrl,
    isPartOf: {
      "@type": "WebSite",
      name: SITE.name,
      url: SITE.url,
    },
  } as const;
}

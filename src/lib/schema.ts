import { SITE } from "@/lib/site";
import type { Location } from "@/data/locations";

/** Coordenadas aproximadas de Bogotá — base de operación (negocio de área de servicio, sin local fijo). */
const BOGOTA_GEO = { "@type": "GeoCoordinates", latitude: 4.71099, longitude: -74.07209 } as const;

/**
 * JSON-LD de la entidad de negocio, para insertar en TODAS las páginas
 * (layout raíz) — no solo en las de municipio. Es lo que le da a Google y a
 * los agentes de IA una declaración explícita de quién es "Manuel Torres"
 * como marca/persona, independiente de cualquier página de ubicación
 * específica. Usa el mismo `@id` que `locationJsonLd` para que ambas
 * declaraciones se entiendan como la misma entidad.
 */
export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE.url}/#negocio`,
    name: `${SITE.name} Fotografía`,
    alternateName: SITE.name,
    url: SITE.url,
    description: SITE.description,
    image: `${SITE.url}/opengraph-image`,
    telephone: SITE.phoneE164,
    priceRange: "$$",
    sameAs: [SITE.instagram],
    areaServed: [
      { "@type": "City", name: "Bogotá" },
      { "@type": "AdministrativeArea", name: "Cundinamarca, Colombia" },
    ],
    geo: BOGOTA_GEO,
    founder: {
      "@type": "Person",
      name: SITE.name,
      jobTitle: "Fotógrafo de bodas y eventos sociales",
      url: SITE.url,
      sameAs: [SITE.instagram],
    },
  } as const;
}

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

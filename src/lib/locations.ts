import type { Locale } from "@/i18n/config";
import { SABANA_COPY_EN, REGION_COPY_EN } from "@/data/en/locations-sabana.en";
import { TOWN_FACTS_EN } from "@/data/en/town-facts.en";
import { buildLocationContentEn } from "@/lib/locationContent.en";
import {
  REGION_HUBS,
  SABANA_LOCATIONS,
  CUNDINAMARCA_LOCATIONS,
  RADIUS_LOCATIONS,
  type Location,
  type RegionHub,
} from "@/data/locations";

export const ALL_LOCATIONS: Location[] = [
  ...SABANA_LOCATIONS,
  ...CUNDINAMARCA_LOCATIONS,
  ...RADIUS_LOCATIONS,
];

/** Solo las páginas indexables (fase 1 siempre; fase 2/3 cuando se marcan listas). */
export const INDEXABLE_LOCATIONS: Location[] = ALL_LOCATIONS.filter(
  (l) => l.indexable,
);

export function getLocation(slug: string): Location | undefined {
  return ALL_LOCATIONS.find((l) => l.slug === slug);
}

export function getRegionHub(slug: string): RegionHub | undefined {
  return REGION_HUBS.find((r) => r.slug === slug);
}

export function getLocationsByRegion(regionSlug: string): Location[] {
  return ALL_LOCATIONS.filter((l) => l.region === regionSlug).sort(
    (a, b) => a.distanceKm - b.distanceKm,
  );
}

/** Municipios vecinos (misma región, excluyendo el actual) para enlaces internos. */
export function getNeighbors(location: Location, count = 6): Location[] {
  return ALL_LOCATIONS.filter(
    (l) => l.region === location.region && l.slug !== location.slug,
  )
    .sort((a, b) => Math.abs(a.distanceKm - location.distanceKm) - Math.abs(b.distanceKm - location.distanceKm))
    .slice(0, count);
}

/** true si el slug corresponde a un directorio de región, no a un municipio. */
export function isRegionSlug(slug: string): boolean {
  return REGION_HUBS.some((r) => r.slug === slug);
}

/* ---------------------------------------------------------------
   Localización (inglés). Los datos base están en español; aquí se
   reemplaza solo el texto visible. Slugs, distancias e `indexable`
   son los mismos en ambos idiomas, para que el hreflang sea 1:1.
---------------------------------------------------------------- */

function factToBulletEn(fact: string): string {
  const clean = fact.startsWith("being ") ? fact.slice(6) : fact;
  return clean.charAt(0).toUpperCase() + clean.slice(1) + ".";
}

export function localizeLocation(location: Location, locale: Locale): Location {
  if (locale === "es") return location;

  const handWritten = SABANA_COPY_EN[location.slug];
  if (handWritten) return { ...location, ...handWritten };

  const fact = TOWN_FACTS_EN[location.name];
  const { intro, body } = buildLocationContentEn({
    slug: location.slug,
    name: location.name,
    province: location.province,
    distanceKm: location.distanceKm,
    fact,
  });
  return { ...location, intro, body, facts: fact ? [factToBulletEn(fact)] : [] };
}

export function localizeRegion(region: RegionHub, locale: Locale): RegionHub {
  if (locale === "es") return region;
  const copy = REGION_COPY_EN[region.slug];
  return copy ? { ...region, ...copy } : region;
}

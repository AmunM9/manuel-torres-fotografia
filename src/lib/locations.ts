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

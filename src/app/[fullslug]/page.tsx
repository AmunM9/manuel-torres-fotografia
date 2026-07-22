import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { REGION_HUBS } from "@/data/locations";
import { ALL_LOCATIONS, getLocation, getRegionHub } from "@/lib/locations";
import { LocationPage } from "@/components/location/LocationPage";
import { RegionHubPage } from "@/components/location/RegionHubPage";

/**
 * Next.js App Router exige que un segmento dinámico sea la carpeta completa
 * ([param]), no un prefijo + corchete (fotografo-bodas-[slug] no funciona:
 * genera una sola página literal en vez de expandir generateStaticParams).
 * Por eso esta carpeta se llama [fullslug] y aquí se compone/descompone el
 * prefijo "fotografo-bodas-" a mano para lograr la URL plana pedida:
 * manueltorres.com.co/fotografo-bodas-chia (sin barra intermedia).
 */
const PREFIX = "fotografo-bodas-";

interface Params {
  params: Promise<{ fullslug: string }>;
}

export function generateStaticParams() {
  const locationSlugs = ALL_LOCATIONS.map((l) => ({ fullslug: `${PREFIX}${l.slug}` }));
  const regionSlugs = REGION_HUBS.map((r) => ({ fullslug: `${PREFIX}${r.slug}` }));
  return [...locationSlugs, ...regionSlugs];
}

function resolveSlug(fullslug: string): string | null {
  return fullslug.startsWith(PREFIX) ? fullslug.slice(PREFIX.length) : null;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { fullslug } = await params;
  const slug = resolveSlug(fullslug);
  if (!slug) return {};

  const location = getLocation(slug);
  if (location) {
    const title = `Fotógrafo de Bodas en ${location.name} | Manuel Torres Fotografía`;
    return {
      title,
      description: location.intro,
      alternates: { canonical: `/${PREFIX}${location.slug}` },
      robots: location.indexable
        ? { index: true, follow: true }
        : { index: false, follow: true },
      openGraph: { title, description: location.intro },
    };
  }

  const region = getRegionHub(slug);
  if (region) {
    const title = `Fotógrafo de Bodas en ${region.name} | Manuel Torres Fotografía`;
    return {
      title,
      description: region.description,
      alternates: { canonical: `/${PREFIX}${region.slug}` },
      openGraph: { title, description: region.description },
    };
  }

  return {};
}

export default async function LocationOrRegionPage({ params }: Params) {
  const { fullslug } = await params;
  const slug = resolveSlug(fullslug);
  if (!slug) notFound();

  const location = getLocation(slug);
  if (location) return <LocationPage location={location} />;

  const region = getRegionHub(slug);
  if (region) return <RegionHubPage region={region} />;

  notFound();
}

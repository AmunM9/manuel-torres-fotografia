import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { REGION_HUBS, type RegionHub } from "@/data/locations";
import { getLocationsByRegion } from "@/lib/locations";
import { regionJsonLd } from "@/lib/schema";

interface RegionHubPageProps {
  region: RegionHub;
}

export function RegionHubPage({ region }: RegionHubPageProps) {
  const locations = getLocationsByRegion(region.slug);
  const otherRegions = REGION_HUBS.filter((r) => r.slug !== region.slug);

  return (
    <div className="shell pt-14 pb-8 sm:pt-20">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(regionJsonLd(region.name, region.slug)) }}
      />

      <Reveal className="max-w-3xl">
        <Pill>Fotógrafo de bodas</Pill>
        <h1 className="display mt-6 text-[clamp(2.2rem,1rem+4.4vw,4.2rem)]">
          Fotógrafo de Bodas en {region.name}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          {region.description}
        </p>
      </Reveal>

      <Reveal delay={100} className="mt-12 sm:mt-16">
        <p className="eyebrow mb-5">
          {locations.length} municipio{locations.length === 1 ? "" : "s"}
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {locations.map((loc) => (
            <Link
              key={loc.slug}
              href={`/fotografo-bodas-${loc.slug}`}
              className="group rounded-card border border-line bg-surface/50 p-4 transition-all duration-300 hover:border-ink hover:bg-surface"
            >
              <span className="block font-display font-semibold text-ink group-hover:text-accent">
                {loc.name}
              </span>
              <span className="mt-1 block text-xs text-faint">
                ~{loc.distanceKm} km de Bogotá
              </span>
            </Link>
          ))}
        </div>
      </Reveal>

      <Reveal delay={160} className="mt-14 border-t border-line pt-10 sm:mt-20">
        <p className="eyebrow">Otras zonas</p>
        <div className="mt-5 flex flex-wrap gap-3">
          {otherRegions.map((r) => (
            <Button key={r.slug} href={`/fotografo-bodas-${r.slug}`} variant="ghost">
              {r.name}
            </Button>
          ))}
          <Button href="/portafolio" variant="ghost">
            Ver portafolio
          </Button>
        </div>
      </Reveal>
    </div>
  );
}

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { REGION_HUBS, type RegionHub } from "@/data/locations";
import { getLocationsByRegion, localizeRegion } from "@/lib/locations";
import { JsonLd } from "@/components/ui/JsonLd";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath } from "@/i18n/routes";
import { regionJsonLd } from "@/lib/schema";

interface RegionHubPageProps {
  region: RegionHub;
  locale: Locale;
}

export function RegionHubPage({ region: base, locale }: RegionHubPageProps) {
  const t = getDictionary(locale);
  const region = localizeRegion(base, locale);
  const locations = getLocationsByRegion(region.slug);
  const otherRegions = REGION_HUBS.filter((r) => r.slug !== region.slug).map((r) =>
    localizeRegion(r, locale),
  );
  const toLocation = (slug: string) => localePath(locale, { kind: "location", slug });

  return (
    <div className="shell pt-14 pb-8 sm:pt-20">
      <JsonLd data={regionJsonLd(region.name, region.slug, locale)} />

      <Reveal className="max-w-3xl">
        <Pill>{t.region.pill}</Pill>
        <h1 className="display mt-6 text-[clamp(2.2rem,1rem+4.4vw,4.2rem)]">
          {t.location.h1(region.name)}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          {region.description}
        </p>
      </Reveal>

      <Reveal delay={100} className="mt-12 sm:mt-16">
        <p className="eyebrow mb-5">
          {t.region.count(locations.length)}
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {locations.map((loc) => (
            <Link
              key={loc.slug}
              href={toLocation(loc.slug)}
              className="group rounded-card border border-line bg-surface/50 p-4 transition-all duration-300 hover:border-ink hover:bg-surface"
            >
              <span className="block font-display font-semibold text-ink group-hover:text-accent">
                {loc.name}
              </span>
              <span className="mt-1 block text-xs text-faint">
                {t.region.distance(loc.distanceKm)}
              </span>
            </Link>
          ))}
        </div>
      </Reveal>

      <Reveal delay={160} className="mt-14 border-t border-line pt-10 sm:mt-20">
        <p className="eyebrow">{t.region.otherRegions}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          {otherRegions.map((r) => (
            <Button key={r.slug} href={toLocation(r.slug)} variant="ghost">
              {r.name}
            </Button>
          ))}
          <Button href={localePath(locale, { kind: "portfolio" })} variant="ghost">
            {t.region.portfolio}
          </Button>
        </div>
      </Reveal>
    </div>
  );
}

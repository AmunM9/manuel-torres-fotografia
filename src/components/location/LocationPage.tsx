import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { ContactLinks } from "@/components/ui/ContactLinks";
import { Gallery } from "@/components/gallery/Gallery";
import { ArrowIcon } from "@/components/ui/icons";
import { locationGalleryPhotos } from "@/lib/weddings";
import { getNeighbors, getRegionHub } from "@/lib/locations";
import { locationJsonLd } from "@/lib/schema";
import type { Location } from "@/data/locations";

interface LocationPageProps {
  location: Location;
}

export function LocationPage({ location }: LocationPageProps) {
  const region = getRegionHub(location.region);
  const neighbors = getNeighbors(location, 6);
  const photos = locationGalleryPhotos();

  return (
    <div className="shell pt-14 pb-8 sm:pt-20">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locationJsonLd(location)) }}
      />

      <Reveal className="max-w-3xl">
        {region && (
          <Link
            href={`/fotografo-bodas-${region.slug}`}
            className="eyebrow inline-flex items-center gap-2 transition-colors hover:text-ink"
          >
            <ArrowIcon className="h-3.5 w-3.5 rotate-180" />
            {region.shortName}
          </Link>
        )}
        <div className="mt-5">
          <Pill>{location.province}</Pill>
        </div>
        <h1 className="display mt-6 text-[clamp(2.2rem,1rem+4.4vw,4.2rem)]">
          Fotógrafo de Bodas en {location.name}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          {location.intro}
        </p>
      </Reveal>

      {location.facts.length > 0 && (
        <Reveal delay={80} className="mt-8 max-w-3xl">
          <ul className="grid gap-3 sm:grid-cols-2">
            {location.facts.map((fact) => (
              <li
                key={fact}
                className="rounded-card border border-line bg-surface/50 px-4 py-3 text-sm leading-relaxed text-muted"
              >
                {fact}
              </li>
            ))}
          </ul>
        </Reveal>
      )}

      <Reveal delay={120} className="mt-10 max-w-3xl space-y-5 text-lg leading-relaxed text-muted">
        {location.body.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </Reveal>

      <Reveal delay={160} className="mt-14 sm:mt-20">
        <p className="eyebrow">Portafolio</p>
        <h2 className="display mt-3 text-[clamp(1.6rem,1rem+2.4vw,2.6rem)]">
          Bodas reales, en el mismo estilo que llevo a {location.name}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          {location.photoIds && location.photoIds.length > 0
            ? `Estas son fotografías tomadas en bodas reales en ${location.name}.`
            : `Todavía no tengo fotografías propias tomadas específicamente en ${location.name}. Estas son bodas reales de mi portafolio en la región — el mismo estilo, luz y cuidado que llevaría a tu boda ahí.`}
        </p>
        <div className="mt-8">
          <Gallery photos={photos} title={`Fotografía de bodas cerca de ${location.name}`} />
        </div>
      </Reveal>

      <Reveal delay={200} className="mt-14 sm:mt-20 text-center">
        <p className="eyebrow">Contacto</p>
        <h2 className="display mt-3 text-[clamp(1.8rem,1rem+3vw,3rem)]">
          Cuéntame de tu boda en {location.name}
        </h2>
        <div className="mx-auto mt-8 max-w-xl">
          <ContactLinks />
        </div>
      </Reveal>

      <Reveal delay={240} className="mt-14 border-t border-line pt-10 sm:mt-20">
        <p className="eyebrow">También sirvo bodas cerca de {location.name}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {neighbors.map((n) => (
            <Link
              key={n.slug}
              href={`/fotografo-bodas-${n.slug}`}
              className="rounded-full border border-line px-4 py-2 text-sm text-muted transition-colors hover:border-ink hover:text-ink"
            >
              {n.name}
            </Link>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/portafolio" variant="ghost">
            Ver portafolio completo
          </Button>
          {region && (
            <Button href={`/fotografo-bodas-${region.slug}`} variant="ghost">
              Todos los municipios de {region.shortName}
            </Button>
          )}
        </div>
      </Reveal>
    </div>
  );
}

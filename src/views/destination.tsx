import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { ContactLinks } from "@/components/ui/ContactLinks";
import { Gallery } from "@/components/gallery/Gallery";
import { JsonLd } from "@/components/ui/JsonLd";
import { locationGalleryPhotos } from "@/lib/weddings";
import { getLocation } from "@/lib/locations";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/site";
import { localePath } from "@/i18n/routes";

/**
 * Landing solo en inglés para parejas extranjeras que planean una boda de
 * destino en Colombia. No tiene equivalente en español (no hay hreflang):
 * responde a una intención de búsqueda que no existe en el mercado local.
 * Mismo criterio de honestidad que el resto del sitio — nada de lugares o
 * bodas que Manuel no haya hecho; los destinos enlazan a sus páginas.
 */
const TITLE = "Destination Wedding Photographer in Colombia";
const DESCRIPTION =
  "Planning a destination wedding in Colombia? Bogotá-based wedding photographer covering Bogotá, colonial Villa de Leyva, warm-weather estates in Anapoima and La Mesa, and countryside haciendas across the region — in English.";

const DESTINATIONS = [
  { slug: "bogota", note: "Hotels, historic La Candelaria and hilltop haciendas overlooking the city." },
  { slug: "villa-de-leyva", note: "Colonial town with the largest cobblestone main square in Colombia." },
  { slug: "anapoima", note: "Warm-weather estates, a classic choice for weddings outside Bogotá." },
  { slug: "la-mesa", note: "Countryside fincas with a mild, warmer climate below the Andean plateau." },
  { slug: "guasca", note: "Mountain haciendas near the Tominé reservoir, under an hour from Bogotá." },
  { slug: "la-calera", note: "Estates in the hills just east of Bogotá." },
  { slug: "chia", note: "The Sabana's classic wedding town: colonial haciendas and wide open skies." },
  { slug: "paipa", note: "Historic haciendas and hot springs in Boyacá." },
];

const FAQ = [
  {
    q: "Do you work with couples from abroad?",
    a: "Yes. I'm based in Bogotá and happy to plan everything in English over WhatsApp, email or video call — from the first questions to the timeline of your wedding day.",
  },
  {
    q: "Where in Colombia do you photograph weddings?",
    a: "Bogotá, the Sabana de Bogotá, every town in Cundinamarca and countryside destinations within roughly 200 km of the city, such as Villa de Leyva, Paipa, Melgar or Villavicencio. For other destinations in Colombia, write to me and we'll look at travel together.",
  },
  {
    q: "What should we know about weddings around Bogotá?",
    a: "Bogotá sits at about 2,600 m (8,600 ft) above sea level, so evenings are cool all year and many couples choose a lower, warmer town like Anapoima or La Mesa for an outdoor celebration. Most international guests fly into Bogotá's El Dorado airport, which makes the city and its surroundings an easy base.",
  },
  {
    q: "How far ahead should we book?",
    a: "I'm currently booking weddings for 2026 and 2027. Popular dates go first, so it's best to reach out as soon as you have a date and a region in mind.",
  },
];

export function destinationMetadata(): Metadata {
  return pageMetadata("en", { kind: "destination" }, { title: TITLE, description: DESCRIPTION });
}

function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "en",
    url: absoluteUrl(localePath("en", { kind: "destination" })),
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function DestinationView() {
  const destinations = DESTINATIONS.flatMap((d) => {
    const location = getLocation(d.slug);
    return location ? [{ ...d, name: location.name }] : [];
  });

  return (
    <div className="shell pt-14 pb-8 sm:pt-20">
      <JsonLd data={faqJsonLd()} />

      <Reveal className="max-w-3xl">
        <Pill>Destination weddings</Pill>
        <h1 className="display mt-6 text-[clamp(2.2rem,1rem+4.4vw,4.2rem)]">{TITLE}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          Colombia is a beautiful place to get married: colonial towns, Andean
          haciendas, warm-weather estates and a capital full of character. I&apos;m
          Manuel Torres, a wedding photographer based in Bogotá, and I photograph
          weddings across the region with an editorial, natural style — for
          couples who live here and for those flying in from abroad.
        </p>
      </Reveal>

      <Reveal delay={80} className="mt-12 sm:mt-16">
        <p className="eyebrow">Where I photograph</p>
        <h2 className="display mt-3 text-[clamp(1.6rem,1rem+2.4vw,2.6rem)]">
          Wedding destinations around Bogotá
        </h2>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {destinations.map((d) => (
            <li key={d.slug}>
              <Link
                href={localePath("en", { kind: "location", slug: d.slug })}
                className="group block h-full rounded-card border border-line bg-surface/50 p-5 transition-all duration-300 hover:border-ink hover:bg-surface"
              >
                <span className="block font-display font-semibold text-ink group-hover:text-accent">
                  {d.name}
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-muted">{d.note}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href={localePath("en", { kind: "location", slug: "destinos-campestres" })} variant="ghost">
            More countryside destinations
          </Button>
          <Button href={localePath("en", { kind: "location", slug: "cundinamarca" })} variant="ghost">
            All towns in Cundinamarca
          </Button>
        </div>
      </Reveal>

      <Reveal delay={120} className="mt-14 sm:mt-20">
        <p className="eyebrow">Portfolio</p>
        <h2 className="display mt-3 text-[clamp(1.6rem,1rem+2.4vw,2.6rem)]">Real weddings in Colombia</h2>
        <div className="mt-8">
          <Gallery photos={locationGalleryPhotos()} title="Wedding photography in Colombia" locale="en" />
        </div>
      </Reveal>

      <Reveal delay={160} className="mt-14 max-w-3xl sm:mt-20">
        <p className="eyebrow">Questions</p>
        <h2 className="display mt-3 text-[clamp(1.6rem,1rem+2.4vw,2.6rem)]">Planning from abroad</h2>
        <dl className="mt-8 divide-y divide-line border-y border-line">
          {FAQ.map((f) => (
            <div key={f.q} className="py-6">
              <dt className="font-display text-lg font-semibold text-ink">{f.q}</dt>
              <dd className="mt-2 leading-relaxed text-muted">{f.a}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal delay={200} className="mt-14 text-center sm:mt-20">
        <p className="eyebrow">Contact</p>
        <h2 className="display mt-3 text-[clamp(1.8rem,1rem+3vw,3rem)]">Tell me about your wedding in Colombia</h2>
        <div className="mx-auto mt-8 max-w-xl">
          <ContactLinks locale="en" />
        </div>
      </Reveal>
    </div>
  );
}

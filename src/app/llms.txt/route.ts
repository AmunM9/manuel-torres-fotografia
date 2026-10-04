import { SITE, absoluteUrl } from "@/lib/site";
import { REGION_HUBS } from "@/data/locations";
import { weddings } from "@/lib/weddings";
import { localizeRegion } from "@/lib/locations";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath } from "@/i18n/routes";

/**
 * /llms.txt — resumen curado del sitio para agentes de IA (spec: llmstxt.org).
 * A propósito NO lista las páginas de municipio (eso sería tratar este
 * archivo como un sitemap) — solo los directorios de región, que ya enlazan
 * a cada municipio. Incluye la versión en inglés para búsquedas de parejas
 * extranjeras (bodas de destino en Colombia).
 */
export const dynamic = "force-static";

const url = (...args: Parameters<typeof localePath>) => absoluteUrl(localePath(...args));

export function GET() {
  const es = getDictionary("es");

  const body = `# ${SITE.name} Fotografía

> ${es.meta.description} Fotógrafo de bodas y eventos sociales con más de cinco años de experiencia, con base en Bogotá, Colombia. Atiende en español e inglés.

Manuel Torres cubre bodas en Bogotá, la Sabana de Bogotá, los municipios de Cundinamarca y destinos de finca en Boyacá, Tolima y Meta.

## Páginas principales

- [Inicio](${url("es", { kind: "home" })}): presentación, portafolio destacado y contacto.
- [Fotógrafo de bodas en Bogotá](${url("es", { kind: "location", slug: "bogota" })}): página principal de la ciudad donde vive y trabaja Manuel Torres.
- [Portafolio](${url("es", { kind: "portfolio" })}): bodas reales fotografiadas por Manuel Torres.
- [Contacto](${url("es", { kind: "contact" })}): WhatsApp e Instagram para cotizar.

## Zonas donde trabaja

${REGION_HUBS.map((r) => `- [Fotógrafo de bodas en ${r.name}](${url("es", { kind: "location", slug: r.slug })}): ${r.description}`).join("\n")}

## English

- [Home](${url("en", { kind: "home" })}): wedding photographer based in Bogotá, Colombia.
- [Destination wedding photographer in Colombia](${url("en", { kind: "destination" })}): guide for couples from abroad planning a wedding in Colombia.
- [Wedding photographer in Bogotá](${url("en", { kind: "location", slug: "bogota" })})
- [Portfolio](${url("en", { kind: "portfolio" })})
- [Contact](${url("en", { kind: "contact" })}): WhatsApp and Instagram, in English.
${REGION_HUBS.map((r) => localizeRegion(r, "en")).map((r) => `- [Wedding photographer in ${r.name}](${url("en", { kind: "location", slug: r.slug })}): ${r.description}`).join("\n")}

## Optional

${weddings.map((w) => `- [Boda ${w.title}](${url("es", { kind: "wedding", slug: w.slug })})`).join("\n")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

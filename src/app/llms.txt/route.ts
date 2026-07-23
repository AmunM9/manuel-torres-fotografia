import { SITE } from "@/lib/site";
import { REGION_HUBS } from "@/data/locations";
import { weddings } from "@/lib/weddings";

/**
 * /llms.txt — resumen curado del sitio para agentes de IA (spec: llmstxt.org).
 * A propósito NO lista las 133 páginas de municipio (eso sería tratar este
 * archivo como un sitemap, el error más común de la spec) — solo los 3
 * directorios de región, que ya enlazan a cada municipio.
 */
export const dynamic = "force-static";

export function GET() {
  const base = SITE.url.replace(/\/$/, "");

  const body = `# ${SITE.name} Fotografía

> ${SITE.description} Fotógrafo de bodas y eventos sociales con más de cinco años de experiencia, con base en Bogotá, Colombia.

Manuel Torres cubre bodas en Bogotá, la Sabana de Bogotá, los municipios de Cundinamarca y destinos de finca en Boyacá, Tolima y Meta.

## Páginas principales

- [Inicio](${base}/): presentación, portafolio destacado y contacto.
- [Fotógrafo de bodas en Bogotá](${base}/fotografo-bodas-bogota): página principal de la ciudad donde vive y trabaja Manuel Torres.
- [Portafolio](${base}/portafolio): bodas reales fotografiadas por Manuel Torres.
- [Contacto](${base}/contacto): WhatsApp e Instagram para cotizar.

## Zonas donde trabaja

${REGION_HUBS.map((r) => `- [Fotógrafo de bodas en ${r.name}](${base}/fotografo-bodas-${r.slug}): ${r.description}`).join("\n")}

## Optional

${weddings.map((w) => `- [Boda ${w.title}](${base}/portafolio/${w.slug})`).join("\n")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

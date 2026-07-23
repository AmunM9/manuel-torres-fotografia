import { slugify } from "@/lib/slug";
import { buildLocationContent } from "@/lib/locationContent";
import type { Location, Department } from "@/data/locations";

/**
 * FASE 3 — destinos campestres a ~200 km de Bogotá fuera de Cundinamarca,
 * en Boyacá, Tolima y Meta. Huila se excluyó por completo: su municipio más
 * cercano a Bogotá (Neiva) está a 300+ km, muy fuera del radio pedido.
 * Sogamoso/Nobsa/Tibasosa (Boyacá) quedan en el borde superior (~200-220 km)
 * — se incluyen por estar dentro de "menos de un día de camino", a revisar
 * si se prefiere un límite más estricto.
 *
 * A diferencia de la fase 2, prácticamente todos estos municipios tienen un
 * dato distintivo real y verificado (son destinos turísticos conocidos), así
 * que el contenido es más rico que el del resto de Cundinamarca.
 *
 * El subconjunto en `ACTIVATED` ya se activó tras investigar evidencia real
 * de mercado de bodas (fincas/haciendas con nombre propio, planeadores de
 * matrimonios especializados, listados en directorios de matrimonio.com.co)
 * — no solo por ser destino turístico en general.
 */

interface RawTown {
  name: string;
  department: Department;
  province: string; // aquí se usa como referencia regional/turística, no provincia administrativa de Cundinamarca
  distanceKm: number;
  fact: string;
}

const TOWNS: RawTown[] = [
  {
    name: "Tunja",
    department: "Boyacá",
    province: "Boyacá",
    distanceKm: 137,
    fact: "ser la capital de Boyacá, con arquitectura e iglesias coloniales como Santo Domingo y la Casa del Fundador",
  },
  {
    name: "Villa de Leyva",
    department: "Boyacá",
    province: "Boyacá",
    distanceKm: 177,
    fact: "la arquitectura colonial mejor conservada de Colombia y la plaza principal empedrada más grande del país, además de un mercado consolidado de bodas de destino, con planeadores de matrimonios especializados y haciendas como Casa de Buganvilias y Hacienda Molino La Rosita",
  },
  {
    name: "Sáchica",
    department: "Boyacá",
    province: "Boyacá",
    distanceKm: 170,
    fact: "ser el último pueblo colonial antes de llegar a Villa de Leyva viniendo desde Bogotá",
  },
  {
    name: "Ráquira",
    department: "Boyacá",
    province: "Boyacá",
    distanceKm: 192,
    fact: "ser un pueblo alfarero de fachadas de colores, reconocido por sus artesanías en cerámica",
  },
  {
    name: "Paipa",
    department: "Boyacá",
    province: "Boyacá",
    distanceKm: 187,
    fact: "sus venues históricos para matrimonios, como la Casona del Salitre —monumento nacional— y el Hotel Hacienda El Salitre, además de sus aguas termales y el Lago Sochagota",
  },
  {
    name: "Duitama",
    department: "Boyacá",
    province: "Boyacá",
    distanceKm: 200,
    fact: "sus haciendas reconocidas para matrimonios, como la centenaria Hacienda Venecia, además de ser centro comercial y de transporte de la provincia de Sugamuxi",
  },
  {
    name: "Tibasosa",
    department: "Boyacá",
    province: "Boyacá",
    distanceKm: 200,
    fact: "ser conocida como la 'capital nacional de la feijoa' y por su parque temático Guátika",
  },
  {
    name: "Nobsa",
    department: "Boyacá",
    province: "Boyacá",
    distanceKm: 210,
    fact: "ser conocida como la 'capital de la ruana' por su tradición de tejidos en lana",
  },
  {
    name: "Sogamoso",
    department: "Boyacá",
    province: "Boyacá",
    distanceKm: 215,
    fact: "haber sido un antiguo centro sagrado muisca dedicado al sol, por lo que se le conoce como la 'ciudad del Sol y del Acero'",
  },
  {
    name: "Melgar",
    department: "Tolima",
    province: "Tolima",
    distanceKm: 98,
    fact: "su mercado propio de fincas y haciendas para matrimonios, como Villa Ceci, Finca Villa Magaly y Posada Monte de Sión, además de su clima cálido",
  },
  {
    name: "Flandes",
    department: "Tolima",
    province: "Tolima",
    distanceKm: 152,
    fact: "ser un pueblo ribereño de clima cálido junto al río Magdalena, contiguo a Girardot",
  },
  {
    name: "Espinal",
    department: "Tolima",
    province: "Tolima",
    distanceKm: 155,
    fact: "ser un centro agrícola reconocido, con cultivos de arroz y algodón",
  },
  {
    name: "Ibagué",
    department: "Tolima",
    province: "Tolima",
    distanceKm: 198,
    fact: "su condición de capital del Tolima y salones para matrimonios como Casa Loma Eventos, además de su tradición musical como 'capital del bambuco'",
  },
  {
    name: "Villavicencio",
    department: "Meta",
    province: "Meta",
    distanceKm: 116,
    fact: "su fama como la 'puerta al Llano', con fincas llaneras para bodas como La Zarabanda y Finca Hotel Casa Baquero, y buena infraestructura hotelera y de eventos",
  },
  {
    name: "Restrepo",
    department: "Meta",
    province: "Meta",
    distanceKm: 130,
    fact: "ser un destino reconocido para el parapentismo",
  },
  {
    name: "Acacías",
    department: "Meta",
    province: "Meta",
    distanceKm: 145,
    fact: "su vocación agrícola, ganadera y palmicultora",
  },
  {
    name: "Cumaral",
    department: "Meta",
    province: "Meta",
    distanceKm: 148,
    fact: "sus aguas termales, conocidas como Aguas Calientes de Cumaral",
  },
];

function factToBullet(fact: string): string {
  const clean = fact.startsWith("ser ") ? fact.slice(4) : fact;
  return clean.charAt(0).toUpperCase() + clean.slice(1) + ".";
}

/** Municipios activados tras confirmar evidencia real de mercado de bodas (ver nota arriba). */
const ACTIVATED = new Set<string>([
  "Villa de Leyva",
  "Melgar",
  "Villavicencio",
  "Duitama",
  "Paipa",
  "Ibagué",
]);

export const RADIUS_PHASE3: Location[] = TOWNS.map((t) => {
  const slug = slugify(t.name);
  const { intro, body } = buildLocationContent({
    slug,
    name: t.name,
    province: t.province,
    distanceKm: t.distanceKm,
    fact: t.fact,
  });
  return {
    slug,
    name: t.name,
    region: "destinos-campestres",
    province: t.province,
    department: t.department,
    distanceKm: t.distanceKm,
    distanceApprox: true,
    phase: 3,
    indexable: ACTIVATED.has(t.name),
    facts: [factToBullet(t.fact)],
    intro,
    body,
  };
});

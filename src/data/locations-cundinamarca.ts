import { slugify } from "@/lib/slug";
import { buildLocationContent } from "@/lib/locationContent";
import type { Location } from "@/data/locations";

/**
 * FASE 2 — los 95 municipios de Cundinamarca que no pertenecen a la Sabana
 * de Bogotá (116 totales − 21 de Sabana = 95). Datos investigados y
 * verificados (ver informe de investigación): provincia oficial, distancia
 * aproximada por carretera y, cuando existe, un dato distintivo real y
 * verificable. Cuando el dato distintivo no pudo verificarse, se omite en
 * vez de inventarlo — el contenido de esa página se apoya solo en datos
 * ciertos (provincia, distancia).
 *
 * La mayoría queda `indexable: false` (noindex,follow) hasta revisión manual
 * por lotes — ver docs/pseo-plan.md. El subconjunto en `ACTIVATED` ya se
 * activó tras investigar evidencia real de mercado de bodas (fincas/salones
 * con nombre propio, listados en directorios de matrimonio.com.co, etc.) por
 * municipio — no por cercanía geográfica. La Vega y San Francisco se
 * activaron por decisión explícita del cliente aunque la evidencia de
 * mercado sea más débil (La Vega) o nula (San Francisco).
 */

interface RawTown {
  name: string;
  province: string;
  distanceKm: number;
  fact?: string;
}

const TOWNS: RawTown[] = [
  // Almeidas
  { name: "Chocontá", province: "Almeidas", distanceKm: 76 },
  { name: "Villapinzón", province: "Almeidas", distanceKm: 93 },
  {
    name: "Suesca",
    province: "Almeidas",
    distanceKm: 56,
    fact: "las Rocas de Suesca, el sitio de escalada en roca más conocido de Colombia, con más de 400 rutas",
  },
  {
    name: "Sesquilé",
    province: "Almeidas",
    distanceKm: 48,
    fact: "la Laguna de Guatavita, cuna de la leyenda de El Dorado, ubicada en su jurisdicción",
  },
  { name: "Manta", province: "Almeidas", distanceKm: 70 },
  { name: "Machetá", province: "Almeidas", distanceKm: 85 },
  { name: "Tibirita", province: "Almeidas", distanceKm: 100 },

  // Alto Magdalena
  {
    name: "Girardot",
    province: "Alto Magdalena",
    distanceKm: 134,
    fact: "su mercado propio de fincas para matrimonios, como Finca Villa Rosita y Hacienda San Luis de Peñalisa, además de su tradición como destino vacacional sobre el río Magdalena",
  },
  { name: "Ricaurte", province: "Alto Magdalena", distanceKm: 134, fact: "su zona hotelera y de clubes vacacionales, contigua a Girardot" },
  { name: "Tocaima", province: "Alto Magdalena", distanceKm: 104, fact: "sus balnearios y aguas termales de origen sulfuroso" },
  { name: "Agua de Dios", province: "Alto Magdalena", distanceKm: 117 },
  { name: "Nilo", province: "Alto Magdalena", distanceKm: 112 },
  { name: "Guataquí", province: "Alto Magdalena", distanceKm: 145 },
  { name: "Jerusalén", province: "Alto Magdalena", distanceKm: 150 },
  { name: "Nariño", province: "Alto Magdalena", distanceKm: 160 },

  // Bajo Magdalena
  {
    name: "Guaduas",
    province: "Bajo Magdalena",
    distanceKm: 117,
    fact: "su finca para matrimonios El Molino, además de ser cuna de la heroína Policarpa Salavarrieta y tener un casco colonial declarado bien de interés cultural",
  },
  { name: "Caparrapí", province: "Bajo Magdalena", distanceKm: 170, fact: "su producción panelera reconocida en la región" },
  { name: "Puerto Salgar", province: "Bajo Magdalena", distanceKm: 193 },

  // Gualivá
  {
    name: "Villeta",
    province: "Gualivá",
    distanceKm: 90,
    fact: "sus fincas y clubes orientados a bodas y eventos, como el Club Social Villeta y varias propiedades de Marbar Hoteles, además de su clima cálido",
  },
  {
    name: "La Vega",
    province: "Gualivá",
    distanceKm: 70,
    fact: "su cercanía a Girardot, La Mesa y Fusagasugá, la zona de clima cálido más buscada para bodas de finca cerca de Bogotá",
  },
  { name: "Sasaima", province: "Gualivá", distanceKm: 75, fact: "su producción de mandarina y otros cítricos" },
  { name: "Albán", province: "Gualivá", distanceKm: 60 },
  { name: "San Francisco", province: "Gualivá", distanceKm: 65 },
  { name: "Supatá", province: "Gualivá", distanceKm: 80, fact: "su producción cafetera" },
  { name: "Nocaima", province: "Gualivá", distanceKm: 95 },
  { name: "Nimaima", province: "Gualivá", distanceKm: 95 },
  { name: "Útica", province: "Gualivá", distanceKm: 105 },
  { name: "Vergara", province: "Gualivá", distanceKm: 100 },
  { name: "Quebradanegra", province: "Gualivá", distanceKm: 100 },
  { name: "La Peña", province: "Gualivá", distanceKm: 110 },

  // Guavio
  {
    name: "La Calera",
    province: "Guavio",
    distanceKm: 30,
    fact: "sus haciendas dedicadas a eventos y matrimonios, como Villa de Lagos, Hacienda Casaloma y Finca La Lomita, además de sus restaurantes campestres",
  },
  {
    name: "Guasca",
    province: "Guavio",
    distanceKm: 55,
    fact: "su propio mercado de haciendas para matrimonios, con venues como Naturaleza Muisca y Cabañas y Eventos Villa Helena, además de su cercanía al embalse de Tominé",
  },
  {
    name: "Guatavita",
    province: "Guavio",
    distanceKm: 75,
    fact: "ser un pueblo reconstruido tras la inundación del original por el embalse de Tominé, y por la leyenda de El Dorado asociada a la zona",
  },
  { name: "Gachetá", province: "Guavio", distanceKm: 90 },
  { name: "Gama", province: "Guavio", distanceKm: 100 },
  { name: "Junín", province: "Guavio", distanceKm: 110, fact: "el embalse de La Balsa" },
  { name: "Gachalá", province: "Guavio", distanceKm: 120 },
  { name: "Ubalá", province: "Guavio", distanceKm: 130, fact: "formar parte de la zona del embalse y la hidroeléctrica del Guavio" },

  // Magdalena Centro
  { name: "San Juan de Rioseco", province: "Magdalena Centro", distanceKm: 130 },
  { name: "Beltrán", province: "Magdalena Centro", distanceKm: 150 },
  { name: "Bituima", province: "Magdalena Centro", distanceKm: 120 },
  { name: "Chaguaní", province: "Magdalena Centro", distanceKm: 140 },
  { name: "Guayabal de Síquima", province: "Magdalena Centro", distanceKm: 110 },
  { name: "Pulí", province: "Magdalena Centro", distanceKm: 145 },
  { name: "Vianí", province: "Magdalena Centro", distanceKm: 115 },

  // Medina
  { name: "Medina", province: "Medina", distanceKm: 150, fact: "ser el municipio más extenso de Cundinamarca y conocido como 'la puerta al Llano'" },
  { name: "Paratebueno", province: "Medina", distanceKm: 211, fact: "su clima cálido y su vocación ganadera, en el límite con los Llanos Orientales" },

  // Oriente
  { name: "Choachí", province: "Oriente", distanceKm: 45, fact: "sus aguas termales y ser puerta de acceso al Parque Nacional Natural Chingaza" },
  { name: "Chipaque", province: "Oriente", distanceKm: 35 },
  { name: "Cáqueza", province: "Oriente", distanceKm: 59 },
  { name: "Fómeque", province: "Oriente", distanceKm: 63, fact: "ser la entrada principal al Parque Nacional Natural Chingaza" },
  { name: "Une", province: "Oriente", distanceKm: 55 },
  { name: "Ubaque", province: "Oriente", distanceKm: 55 },
  { name: "Quetame", province: "Oriente", distanceKm: 75, fact: "estar sobre la vía Bogotá–Villavicencio" },
  { name: "Fosca", province: "Oriente", distanceKm: 70 },
  { name: "Guayabetal", province: "Oriente", distanceKm: 95, fact: "ser parada tradicional de clima cálido en la vía Bogotá–Villavicencio" },
  { name: "Gutiérrez", province: "Oriente", distanceKm: 100 },

  // Rionegro
  { name: "Pacho", province: "Rionegro", distanceKm: 87, fact: "ser capital de su provincia y zona cafetera reconocida" },
  { name: "San Cayetano", province: "Rionegro", distanceKm: 95 },
  { name: "El Peñón", province: "Rionegro", distanceKm: 110 },
  { name: "La Palma", province: "Rionegro", distanceKm: 120 },
  { name: "Topaipí", province: "Rionegro", distanceKm: 130 },
  { name: "Villagómez", province: "Rionegro", distanceKm: 110 },
  { name: "Paime", province: "Rionegro", distanceKm: 135 },
  { name: "Yacopí", province: "Rionegro", distanceKm: 160, fact: "su extensa producción cafetera y panelera" },

  // Sumapaz
  { name: "Silvania", province: "Sumapaz", distanceKm: 57, fact: "su producción de mango" },
  {
    name: "Fusagasugá",
    province: "Sumapaz",
    distanceKm: 64,
    fact: "su fama como 'la ciudad jardín de Colombia' y sus haciendas para matrimonios, como Hacienda Coloma y Finca Castillo La Fortaleza",
  },
  { name: "Granada", province: "Sumapaz", distanceKm: 68 },
  { name: "Tibacuy", province: "Sumapaz", distanceKm: 75 },
  { name: "Pasca", province: "Sumapaz", distanceKm: 75 },
  { name: "Arbeláez", province: "Sumapaz", distanceKm: 82 },
  { name: "San Bernardo", province: "Sumapaz", distanceKm: 92, fact: "su producción de durazno y mora" },
  { name: "Pandi", province: "Sumapaz", distanceKm: 95 },
  { name: "Venecia", province: "Sumapaz", distanceKm: 100 },
  { name: "Cabrera", province: "Sumapaz", distanceKm: 140, fact: "su límite con el Páramo de Sumapaz, el páramo más extenso del mundo" },

  // Tequendama
  { name: "San Antonio del Tequendama", province: "Tequendama", distanceKm: 40, fact: "el Salto del Tequendama, una de las cataratas más icónicas de Colombia" },
  { name: "El Colegio", province: "Tequendama", distanceKm: 48 },
  { name: "Tena", province: "Tequendama", distanceKm: 52 },
  { name: "Anolaima", province: "Tequendama", distanceKm: 60, fact: "su reconocida producción frutícola" },
  {
    name: "La Mesa",
    province: "Tequendama",
    distanceKm: 63,
    fact: "sus haciendas reconocidas para matrimonios, como Hacienda El Caliche, Hacienda Siete Sentidos y Finca Las Palmas",
  },
  { name: "Cachipay", province: "Tequendama", distanceKm: 68, fact: "su producción de café" },
  {
    name: "Anapoima",
    province: "Tequendama",
    distanceKm: 86,
    fact: "sus fincas y haciendas dedicadas a matrimonios, como Palermo Campestre Anapoima y Finca Palomango, además de su clima cálido",
  },
  { name: "Quipile", province: "Tequendama", distanceKm: 85 },
  { name: "Viotá", province: "Tequendama", distanceKm: 95, fact: "haber sido un histórico epicentro cafetero" },
  { name: "Apulo", province: "Tequendama", distanceKm: 95, fact: "sus balnearios sobre el río Apulo, cerca del Magdalena" },

  // Ubaté
  { name: "Tausa", province: "Ubaté", distanceKm: 65, fact: "el Páramo de Guerrero y su antigua explotación artesanal de sal" },
  { name: "Sutatausa", province: "Ubaté", distanceKm: 75 },
  { name: "Cucunubá", province: "Ubaté", distanceKm: 78, fact: "la Laguna de Cucunubá y su tradición de tejido en lana" },
  { name: "Ubaté", province: "Ubaté", distanceKm: 90, fact: "ser conocida como 'la capital lechera de Colombia'" },
  { name: "Guachetá", province: "Ubaté", distanceKm: 100, fact: "su zona de minería de carbón" },
  { name: "Carmen de Carupa", province: "Ubaté", distanceKm: 100 },
  { name: "Lenguazaque", province: "Ubaté", distanceKm: 100, fact: "su zona de minería de carbón" },
  { name: "Fúquene", province: "Ubaté", distanceKm: 100, fact: "la Laguna de Fúquene, uno de los humedales más grandes de Colombia" },
  { name: "Susa", province: "Ubaté", distanceKm: 110 },
  { name: "Simijaca", province: "Ubaté", distanceKm: 115, fact: "su agroindustria láctea" },
];

/** Convierte el fragmento "conocido por ser X" / "conocido por su X" en una frase suelta para la lista de datos. */
function factToBullet(fact: string): string {
  const clean = fact.startsWith("ser ") ? fact.slice(4) : fact;
  return clean.charAt(0).toUpperCase() + clean.slice(1) + ".";
}

/**
 * Municipios activados para indexación tras investigar evidencia real de
 * mercado de bodas (fincas/haciendas con nombre propio verificadas en
 * directorios de matrimonio.com.co y contenido editorial de bodas de
 * destino). La Vega y San Francisco se activaron por pedido explícito del
 * cliente, no por evidencia de mercado — ver nota arriba.
 */
const ACTIVATED = new Set<string>([
  "Girardot",
  "Villeta",
  "La Vega",
  "San Francisco",
  "La Calera",
  "Guaduas",
  "Fusagasugá",
  "La Mesa",
  "Anapoima",
  "Guasca", // reemplaza a Soacha (desactivado): página dedicada en matrimonio.com.co + venues con nombre propio
]);

export const CUNDINAMARCA_PHASE2: Location[] = TOWNS.map((t) => {
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
    region: "cundinamarca",
    province: t.province,
    department: "Cundinamarca",
    distanceKm: t.distanceKm,
    distanceApprox: true,
    phase: 2,
    indexable: ACTIVATED.has(t.name),
    facts: t.fact ? [factToBullet(t.fact)] : [],
    intro,
    body,
  };
});

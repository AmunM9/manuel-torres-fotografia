/**
 * Generador de contenido para las páginas de ubicación de fase 2 y 3
 * (el resto de Cundinamarca + destinos a 200 km). A diferencia de la fase 1
 * (Sabana de Bogotá), redactada localidad por localidad, aquí el volumen
 * (95 + ~17 municipios) hace inviable escribir prosa 100% artesanal para
 * cada uno sin caer en relleno o en datos inventados.
 *
 * En su lugar, cada página combina:
 *  - Datos reales por municipio (provincia oficial, distancia investigada,
 *    dato distintivo verificado cuando existe — nunca inventado).
 *  - Una rotación determinista de estructuras de frase (no aleatoria: se
 *    fija por el slug para que el build sea reproducible) para que dos
 *    páginas no compartan literalmente el mismo texto aunque compartan
 *    provincia o rango de distancia.
 *
 * Esto es exactamente la recomendación del skill programmatic-seo de
 * "contenido condicional basado en datos" en vez de solo cambiar el nombre
 * en una plantilla fija. Aun así, es contenido más liviano que el de fase 1
 * — por eso todas las páginas de fase 2/3 se marcan `indexable: false` hasta
 * revisión (ver docs/pseo-plan.md).
 */

function hashIndex(seed: string, mod: number): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h % mod;
}

interface ContentInput {
  slug: string;
  name: string;
  province: string;
  distanceKm: number;
  fact?: string;
  /** Frase corta sobre el tipo de destino (usada en fase 3, p. ej. "colonial", "termal"). */
  characterNote?: string;
}

const INTRO_NO_FACT = [
  (i: ContentInput) =>
    `A ${i.distanceKm} km de Bogotá, ${i.name} es uno de los municipios de la provincia de ${i.province}, en Cundinamarca — un lugar menos fotografiado que la Sabana, pero con el mismo tipo de paisaje campestre para una boda de finca.`,
  (i: ContentInput) =>
    `${i.name}, en la provincia de ${i.province}, queda a unos ${i.distanceKm} km de Bogotá. Como en el resto de Cundinamarca, aquí las bodas suelen aprovechar el entorno rural y la posibilidad de una ceremonia al aire libre.`,
  (i: ContentInput) =>
    `Ubicado a ${i.distanceKm} km de Bogotá, en la provincia de ${i.province}, ${i.name} ofrece el tipo de entorno campestre que buscan muchas parejas para su boda: espacio abierto, naturaleza y una distancia razonable desde la ciudad.`,
  (i: ContentInput) =>
    `En la provincia de ${i.province}, a ${i.distanceKm} km de Bogotá, ${i.name} es uno más de los 116 municipios de Cundinamarca donde cubro bodas con el mismo cuidado que en cualquier finca de la Sabana.`,
  (i: ContentInput) =>
    `${i.name} pertenece a la provincia de ${i.province} y está a unos ${i.distanceKm} km de Bogotá. Si tu boda es en una finca de esta zona, el enfoque fotográfico parte de lo mismo que en cualquier otro municipio de Cundinamarca: aprovechar la luz natural y el paisaje del lugar.`,
  (i: ContentInput) =>
    `A ${i.distanceKm} km de la capital, en la provincia de ${i.province}, ${i.name} es un municipio de Cundinamarca donde el campo manda: fincas, potreros y cielos abiertos, el mismo tipo de escenario que buscan muchas bodas fuera de la ciudad.`,
];

const INTRO_WITH_FACT = [
  (i: ContentInput) =>
    `A ${i.distanceKm} km de Bogotá, en la provincia de ${i.province}, ${i.name} es conocido por ${i.fact}. Más allá de eso, es un municipio con el entorno rural típico de Cundinamarca para celebrar una boda de finca.`,
  (i: ContentInput) =>
    `${i.name}, en la provincia de ${i.province} (a unos ${i.distanceKm} km de Bogotá), es reconocido por ${i.fact}. Un dato que también dice algo del carácter del lugar donde podrías celebrar tu boda.`,
  (i: ContentInput) =>
    `A unos ${i.distanceKm} km de Bogotá, ${i.name} —en la provincia de ${i.province}— es conocido por ${i.fact}, además de contar con el entorno campestre típico de esta zona de Cundinamarca.`,
  (i: ContentInput) =>
    `En la provincia de ${i.province}, ${i.name} queda a ${i.distanceKm} km de Bogotá y es conocido por ${i.fact}. Un buen punto de partida para pensar en esta zona para tu boda.`,
  (i: ContentInput) =>
    `${i.name} es conocido por ${i.fact}. Está en la provincia de ${i.province}, a ${i.distanceKm} km de Bogotá, y comparte con el resto de Cundinamarca el mismo entorno de finca y campo abierto para una boda.`,
  (i: ContentInput) =>
    `A ${i.distanceKm} km de Bogotá, ${i.name} —provincia de ${i.province}— tiene algo que lo distingue: ${i.fact}. Un dato de contexto para quienes consideran esta zona para su boda de finca.`,
];

const BODY_LOGISTICS = [
  (i: ContentInput) =>
    `El trayecto desde Bogotá hasta ${i.name} toma normalmente entre ${Math.round(i.distanceKm / 70 * 60 - 10)} y ${Math.round(i.distanceKm / 55 * 60 + 10)} minutos en carro, dependiendo de la vía y el tráfico de salida de la ciudad. Es un factor a tener en cuenta al planear los horarios del día de la boda, sobre todo para los invitados que vienen desde Bogotá.`,
  (i: ContentInput) =>
    `Para una boda en ${i.name}, conviene calcular bien los tiempos de traslado desde Bogotá (unos ${i.distanceKm} km) tanto para el equipo de fotografía y video como para los invitados, especialmente si la ceremonia y la recepción están en el mismo lugar y se busca aprovechar la luz de la tarde.`,
  (i: ContentInput) =>
    `Como en cualquier boda fuera de Bogotá, la distancia hasta ${i.name} (${i.distanceKm} km) es un dato práctico más que estético: define cuánto tiempo hay disponible para la sesión de fotos antes de que caiga la noche y cuánto margen dejar para el traslado de los invitados.`,
];

const BODY_PHOTO_APPROACH = [
  () =>
    `Fotográficamente, una finca en Cundinamarca ofrece lo mismo en cualquier municipio: luz natural, espacios verdes para la ceremonia y jardines o arboledas para el book de pareja. Lo que cambia de una zona a otra es el paisaje de fondo —más plano en la sabana, más montañoso hacia el oriente o más cálido hacia el Magdalena— y ese contraste es justamente lo que hace interesante fotografiar bodas en distintos municipios de Cundinamarca.`,
  () =>
    `El enfoque de cobertura no cambia según el municipio: aprovechar la luz de la tarde, conocer de antemano los rincones de la finca o el salón elegido y moverse con calma entre la ceremonia, el book de pareja y la recepción, sin perder ningún momento importante del día.`,
  () =>
    `Trabajar en una finca que no conozco de antemano no cambia el resultado: llegar temprano, revisar la luz disponible en distintos puntos del lugar y planear con la pareja el recorrido del día son pasos que aplico igual en cualquier municipio de Cundinamarca.`,
  () =>
    `Cada finca tiene su propia luz y su propio ritmo. Parte de cubrir bodas en toda Cundinamarca es justamente eso: adaptarse al lugar elegido por cada pareja, sin depender de conocer ya el sitio de antemano, y aprovechar lo que ese entorno específico ofrece para las fotos.`,
];

export function buildLocationContent(input: ContentInput): { intro: string; body: string[] } {
  const introBank = input.fact ? INTRO_WITH_FACT : INTRO_NO_FACT;
  const intro = introBank[hashIndex(input.slug, introBank.length)](input);
  const bodyLogistics = BODY_LOGISTICS[hashIndex(input.slug + "-l", BODY_LOGISTICS.length)](input);
  const bodyPhoto = BODY_PHOTO_APPROACH[hashIndex(input.slug + "-p", BODY_PHOTO_APPROACH.length)]();
  return { intro, body: [bodyLogistics, bodyPhoto] };
}

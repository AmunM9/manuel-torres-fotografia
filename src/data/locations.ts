/**
 * Datos de las páginas de ubicación (programmatic SEO).
 *
 * REGLA DE HONESTIDAD: ninguna de las fotos del portafolio actual tiene
 * metadatos de ubicación confirmados por Manuel. Por eso ninguna página de
 * municipio afirma tener fotos propias tomadas ahí — todas usan una muestra
 * del portafolio general con una nota explícita al respecto (ver
 * `PhotoDisclosure` en el componente de plantilla). Si en el futuro se
 * confirma en qué municipio fue cada boda, se puede añadir `photoIds` aquí
 * para mostrar fotos reales de ese lugar específico.
 */

export type Department = "Cundinamarca" | "Boyacá" | "Tolima" | "Meta";

/** Fase de lanzamiento — controla prioridad de sitemap e indexación. */
export type Phase = 1 | 2 | 3;

export interface RegionHub {
  slug: string; // URL: /fotografo-bodas-[slug]
  name: string; // "Sabana de Bogotá"
  shortName: string; // para breadcrumbs/menús
  description: string; // intro del directorio
  phase: Phase;
}

export interface Location {
  slug: string; // URL: /fotografo-bodas-[slug]
  name: string; // "Chía"
  region: string; // RegionHub.slug al que pertenece
  province: string; // provincia oficial real (para precisión factual en el copy)
  department: Department;
  distanceKm: number; // distancia aprox. por carretera desde Bogotá
  distanceApprox: boolean; // true = estimado, no verificado con precisión
  phase: Phase;
  /** Uno o dos datos reales y verificables (no inventados). */
  facts: string[];
  /** Párrafo de apertura único — no se reutiliza literalmente en otra página. */
  intro: string;
  /** Cuerpo del artículo (varios párrafos), contenido real y específico. */
  body: string[];
  /** IDs de fotos confirmadas como tomadas en este municipio (ninguna aún). */
  photoIds?: string[];
  /** Si es false, la página se sirve con noindex,follow (borrador/cola larga). */
  indexable: boolean;
}

export const REGION_HUBS: RegionHub[] = [
  {
    slug: "sabana-de-bogota",
    name: "Sabana de Bogotá",
    shortName: "Sabana de Bogotá",
    description:
      "La Sabana de Bogotá reúne los municipios de Sabana Centro, Sabana Occidente y la provincia de Soacha: el corazón de las fincas, haciendas y salones campestres donde más bodas fotografío cada año.",
    phase: 1,
  },
  {
    slug: "cundinamarca",
    name: "Cundinamarca",
    shortName: "Cundinamarca",
    description:
      "Cubro bodas en los 116 municipios de Cundinamarca, desde el altiplano frío de Ubaté hasta el calor del Magdalena. Encuentra tu municipio y descubre por qué conviene un fotógrafo que ya conoce el terreno.",
    phase: 2,
  },
  {
    slug: "destinos-campestres",
    name: "Destinos campestres a 200 km de Bogotá",
    shortName: "Destinos campestres",
    description:
      "Villa de Leyva, Tunja, Ibagué, Villavicencio y otros destinos clásicos de boda de finca a menos de un día de camino desde Bogotá.",
    phase: 3,
  },
];

/**
 * FASE 1 — Sabana de Bogotá (21 municipios: Sabana Centro + Sabana Occidente
 * + provincia de Soacha). Contenido redactado individualmente, no plantilla
 * con variables. Prioridad máxima de lanzamiento e indexación.
 */
export const SABANA_LOCATIONS: Location[] = [
  {
    slug: "chia",
    name: "Chía",
    region: "sabana-de-bogota",
    province: "Sabana Centro",
    department: "Cundinamarca",
    distanceKm: 25,
    distanceApprox: true,
    phase: 1,
    indexable: true,
    facts: [
      "Conocida popularmente como la 'Ciudad de la Luna' por su pasado indígena muisca.",
      "Uno de los municipios con mayor concentración de fincas, haciendas coloniales y clubes campestres de la Sabana.",
    ],
    intro:
      "Chía es, junto con Cajicá, el destino de boda de finca más buscado de la Sabana: a menos de media hora de Bogotá por la Autopista Norte, combina haciendas coloniales, humedales y un entorno verde que rara vez decepciona en fotos.",
    body: [
      "Chía queda a unos 25 km al norte de Bogotá, un trayecto de 30 a 45 minutos según el tráfico de la Autopista Norte. Es el municipio de la Sabana Centro con más historia como destino de matrimonios: aquí conviven haciendas centenarias, clubes campestres y salones de eventos rodeados de cerros y potreros, todo a corta distancia de la capital para los invitados que llegan desde Bogotá.",
      "Fotografiar una boda en Chía suele significar luz abierta de sabana —cielos amplios, cerros al fondo, tardes con esa luz dorada tan característica del altiplano— y arquitectura colonial o campestre que da mucho juego visual: portones de piedra, corredores con vigas de madera, jardines grandes para el momento de la ceremonia al aire libre.",
      "Si tu boda es en Chía, o en cualquier finca de la Sabana Centro, trabajar con un fotógrafo que ya conoce la zona ahorra tiempo el día del evento: saber dónde cae la mejor luz a cada hora, qué rincones de la finca funcionan para el book de pareja y cómo moverse entre salón, jardín y capilla sin perder ningún momento.",
    ],
  },
  {
    slug: "cajica",
    name: "Cajicá",
    region: "sabana-de-bogota",
    province: "Sabana Centro",
    department: "Cundinamarca",
    distanceKm: 35,
    distanceApprox: true,
    phase: 1,
    indexable: true,
    facts: [
      "Reconocido por su producción lechera y sus fincas de recreo, muchas convertidas en centros de eventos.",
      "El casco urbano conserva un parque principal e iglesia colonial típica de la Sabana Centro.",
    ],
    intro:
      "Cajicá comparte con Chía el título de capital no oficial de las bodas de finca en la Sabana: ambos municipios concentran algunas de las haciendas y centros de eventos campestres más solicitados de Cundinamarca.",
    body: [
      "A unos 35 km de Bogotá (45 a 60 minutos por la Autopista Norte), Cajicá es tierra de fincas lecheras convertidas en salones de eventos, con grandes extensiones verdes, arboledas y vistas a los cerros orientales de la Sabana. Es habitual que las bodas aquí combinen ceremonia al aire libre con recepción bajo carpa o en un salón campestre techado, aprovechando el clima fresco de la zona.",
      "Para las fotos, Cajicá ofrece algo que muchas fincas de sabana comparten: espacio. Praderas amplias para retratos de pareja con luz de atardecer, arboledas para sesiones más íntimas y, casi siempre, algún detalle arquitectónico —un portón, una capilla privada, un corredor colonial— que sirve de telón de fondo.",
      "Conocer de antemano la finca o el salón elegido en Cajicá permite planear el recorrido fotográfico del día: dónde ubicar la ceremonia según la posición del sol, qué zona de la finca aprovechar para el book de los novios y cómo organizar los tiempos entre el arreglo, la ceremonia y la fiesta sin que nada se sienta apurado.",
    ],
  },
  {
    slug: "cota",
    name: "Cota",
    region: "sabana-de-bogota",
    province: "Sabana Centro",
    department: "Cundinamarca",
    distanceKm: 20,
    distanceApprox: true,
    phase: 1,
    indexable: true,
    facts: [
      "Uno de los municipios más cercanos a Bogotá por el occidente, con fuerte vocación gastronómica y de eventos.",
      "Su casco urbano y cerros cercanos (como el cerro de La Moya) son un punto de referencia habitual para actividades al aire libre.",
    ],
    intro:
      "Cota es de los municipios de sabana más cercanos a Bogotá, lo que lo hace popular tanto para la boda misma como para el alojamiento de invitados que prefieren quedarse cerca de la ciudad.",
    body: [
      "A unos 20 km de Bogotá por la Avenida Boyacá o la Calle 80, Cota es un trayecto corto —entre 30 y 40 minutos— que lo convierte en una opción práctica para bodas con muchos invitados que vienen desde la capital. El municipio combina zona urbana pequeña, fincas de recreo y una vocación gastronómica reconocida en toda la Sabana.",
      "Las fincas de Cota suelen tener jardines cuidados, piscinas y áreas techadas para la recepción, además de vistas a los cerros que rodean el municipio. Es un entorno versátil para fotografiar: funciona tanto para una ceremonia íntima como para una recepción grande con banquete.",
      "Como con cualquier finca de sabana, la clave para las fotos está en aprovechar la luz natural del atardecer y los espacios verdes antes de que caiga la noche. Conocer la zona ayuda a anticipar esos momentos y a moverse con calma durante el día del evento.",
    ],
  },
  {
    slug: "tabio",
    name: "Tabio",
    region: "sabana-de-bogota",
    province: "Sabana Centro",
    department: "Cundinamarca",
    distanceKm: 35,
    distanceApprox: true,
    phase: 1,
    indexable: true,
    facts: [
      "Conocido por sus aguas termales y su ambiente rural más tranquilo dentro de la Sabana Centro.",
      "Comparte límites con Tenjo y Cajicá, en una zona de fincas y clima fresco de montaña.",
    ],
    intro:
      "Tabio conserva un aire más rural y tranquilo que sus vecinos de la Sabana Centro, con fincas rodeadas de montaña que dan un marco distinto —más íntimo, menos urbano— para una boda.",
    body: [
      "Ubicado a unos 35 km de Bogotá (alrededor de una hora en carro), Tabio es conocido sobre todo por sus aguas termales, pero también por sus fincas de clima frío rodeadas de cultivos y montaña. Es una alternativa para quienes buscan un entorno de boda más apartado y silencioso que el de los municipios más cercanos a la capital.",
      "El paisaje de Tabio —montañoso, con neblina frecuente en las mañanas y luz suave durante buena parte del día— da fotografías con un carácter distinto al de la sabana plana: más atmosférico, con capas de montaña de fondo y esa sensación de estar realmente en el campo.",
      "Si tu boda es en una finca de Tabio, conviene planear la sesión de fotos alrededor del clima de montaña, que puede cambiar rápido durante el día. Un fotógrafo familiarizado con esas condiciones sabe adaptarse sin perder los momentos clave.",
    ],
  },
  {
    slug: "tenjo",
    name: "Tenjo",
    region: "sabana-de-bogota",
    province: "Sabana Centro",
    department: "Cundinamarca",
    distanceKm: 30,
    distanceApprox: true,
    phase: 1,
    indexable: true,
    facts: [
      "Municipio de vocación agrícola y floricultora, con paisaje de sabana abierta.",
      "Limita con Tabio, Cota y Chía, en el corazón de la Sabana Centro.",
    ],
    intro:
      "Tenjo combina el paisaje abierto de sabana con la tranquilidad de un municipio menos urbanizado, un contraste que se nota en las fotos de boda tomadas en sus fincas.",
    body: [
      "A unos 30 km de Bogotá (45 a 60 minutos en carro), Tenjo es un municipio de vocación agrícola y floricultora que conserva grandes extensiones de sabana abierta. Sus fincas suelen tener terrenos amplios, ideales para ceremonias al aire libre y para aprovechar la luz de atardecer típica de la zona.",
      "El paisaje de Tenjo —potreros, cultivos de flores en los alrededores, cerros suaves al fondo— da un marco natural y poco intervenido para las fotos, distinto al de fincas más 'de postal' con jardines muy diseñados. Es una buena opción para parejas que buscan un ambiente más campestre y menos formal.",
      "Como en el resto de la Sabana Centro, la luz de la tarde es el mejor aliado fotográfico en Tenjo: planear la ceremonia y el book de pareja alrededor de esas horas marca la diferencia en el resultado final.",
    ],
  },
  {
    slug: "sopo",
    name: "Sopó",
    region: "sabana-de-bogota",
    province: "Sabana Centro",
    department: "Cundinamarca",
    distanceKm: 35,
    distanceApprox: true,
    phase: 1,
    indexable: true,
    facts: [
      "Sede de una de las principales empresas lácteas del país y de reconocidos restaurantes campestres.",
      "Cercano al embalse de Tominé, uno de los cuerpos de agua más grandes de la Sabana.",
    ],
    intro:
      "Sopó es sinónimo de fincas de recreo y restaurantes campestres reconocidos en toda la Sabana, además de estar cerca del embalse de Tominé, un atractivo natural adicional para fotos con agua de por medio.",
    body: [
      "A unos 35 km de Bogotá (45 minutos a una hora), Sopó combina la vocación lechera y gastronómica de la región con un entorno natural privilegiado: cerca del embalse de Tominé y rodeado de montañas propias de la Sabana Centro. Es un municipio habitual para bodas y eventos campestres de todo tamaño.",
      "Muchas fincas de Sopó cuentan con jardines extensos, arboledas maduras y en algunos casos vista al embalse, lo que amplía las posibilidades fotográficas más allá del jardín tradicional de sabana: agua, montaña y campo en un mismo lugar.",
      "Conocer las fincas de Sopó de antemano ayuda a planear el recorrido del día —dónde hacer la ceremonia, dónde el book de pareja aprovechando el agua o la montaña— y a anticipar el clima, que en esta zona puede ser más cambiante que en el resto de la Sabana.",
    ],
  },
  {
    slug: "zipaquira",
    name: "Zipaquirá",
    region: "sabana-de-bogota",
    province: "Sabana Centro",
    department: "Cundinamarca",
    distanceKm: 48,
    distanceApprox: true,
    phase: 1,
    indexable: true,
    facts: [
      "Hogar de la Catedral de Sal, uno de los monumentos más visitados de Colombia.",
      "Capital de la provincia de Sabana Centro y centro comercial de los municipios vecinos.",
    ],
    intro:
      "Zipaquirá es la capital de la Sabana Centro y uno de los pocos municipios de la región con un ícono arquitectónico reconocido a nivel nacional: la Catedral de Sal, además de un centro histórico colonial bien conservado.",
    body: [
      "A unos 48 km de Bogotá (una hora aproximadamente por la Autopista Norte), Zipaquirá es un municipio más grande y urbano que sus vecinos de Sabana Centro, con un centro histórico de calles coloniales, plaza principal e iglesia que sirven de escenario para fotos de boda con mucho carácter arquitectónico.",
      "Además de las fincas de los alrededores, Zipaquirá ofrece algo distinto: la posibilidad de fotos en el casco urbano colonial, con fachadas, balcones y calles empedradas que dan una estética diferente a la del jardín de finca típico. Para quienes se casan por la iglesia, el centro histórico suele ser parte del recorrido fotográfico natural.",
      "Trabajar con un fotógrafo que conoce Zipaquirá ayuda a combinar bien ambos mundos —el centro histórico y la finca— dentro del tiempo disponible el día de la boda, sin que el traslado entre uno y otro reste tiempo a la fiesta.",
    ],
  },
  {
    slug: "cogua",
    name: "Cogua",
    region: "sabana-de-bogota",
    province: "Sabana Centro",
    department: "Cundinamarca",
    distanceKm: 55,
    distanceApprox: true,
    phase: 1,
    indexable: true,
    facts: [
      "Vecino directo de Zipaquirá, con paisaje de páramo y montaña más marcado que el resto de la Sabana Centro.",
      "Cercano al Parque Natural Chicaque y a zonas de humedales de altura.",
    ],
    intro:
      "Cogua tiene un paisaje más montañoso y fresco que el resto de la Sabana Centro, cercano a Zipaquirá pero con un entorno natural que se siente distinto en cámara: más verde oscuro, más niebla, más 'páramo'.",
    body: [
      "A unos 55 km de Bogotá (poco más de una hora), Cogua es un municipio pequeño pegado a Zipaquirá, con clima más frío y paisaje de montaña que se nota en la luz —más difusa, más gris azulada en las mañanas— y en el verde del entorno, más oscuro que el de la sabana plana.",
      "Las fincas de Cogua suelen aprovechar ese entorno de montaña: cultivos, potreros en pendiente y vistas amplias hacia los cerros vecinos. Es una opción menos convencional para quienes buscan algo distinto al jardín de sabana clásico.",
      "El clima de Cogua puede ser más impredecible que el de municipios más bajos, así que planear la sesión de fotos con margen y conocer de antemano los rincones de la finca ayuda a aprovechar la luz cuando aparece.",
    ],
  },
  {
    slug: "nemocon",
    name: "Nemocón",
    region: "sabana-de-bogota",
    province: "Sabana Centro",
    department: "Cundinamarca",
    distanceKm: 55,
    distanceApprox: true,
    phase: 1,
    indexable: true,
    facts: [
      "Conocido por su propia mina de sal y su casco urbano colonial, menos concurrido que el de Zipaquirá.",
      "Uno de los municipios más al norte de la Sabana Centro.",
    ],
    intro:
      "Nemocón comparte con Zipaquirá la tradición salinera, pero con un centro histórico más pequeño y tranquilo, una opción distinta para quienes quieren fotos de boda con encanto colonial sin el movimiento de un municipio más grande.",
    body: [
      "A unos 55 km de Bogotá (algo más de una hora), Nemocón es de los municipios más al norte de la Sabana Centro. Su casco urbano colonial —plaza, iglesia, calles estrechas— es más recogido que el de Zipaquirá, lo que da un ambiente más íntimo para fotos en el centro del pueblo.",
      "El entorno rural de Nemocón, con fincas y paisaje de sabana alta, funciona bien para ceremonias campestres, mientras que el casco urbano suma la opción de fotos con fachadas coloniales y calles empedradas.",
      "Para bodas en Nemocón, conviene planear bien el recorrido entre la finca y el pueblo si se quieren aprovechar ambos escenarios, además de tener en cuenta el clima de sabana alta, similar al de Cogua y Zipaquirá.",
    ],
  },
  {
    slug: "gachancipa",
    name: "Gachancipá",
    region: "sabana-de-bogota",
    province: "Sabana Centro",
    department: "Cundinamarca",
    distanceKm: 45,
    distanceApprox: true,
    phase: 1,
    indexable: true,
    facts: [
      "Municipio pequeño de la Sabana Centro, de paso obligado hacia Tocancipá y Zipaquirá por la Autopista Norte.",
      "Zona de crecimiento industrial y de fincas de recreo en su área rural.",
    ],
    intro:
      "Gachancipá es uno de los municipios más pequeños de la Sabana Centro, con fincas de recreo que aprovechan la cercanía a la Autopista Norte sin perder el ambiente rural del resto de la región.",
    body: [
      "A unos 45 km de Bogotá (alrededor de una hora), Gachancipá es un municipio de paso entre Tocancipá y Zipaquirá, con un área rural de fincas y potreros típica de la Sabana Centro, aunque con menor concentración de salones de eventos que sus vecinos más conocidos.",
      "El paisaje de Gachancipá —sabana abierta, cerros suaves, cielos amplios— ofrece las mismas posibilidades fotográficas que el resto de la región: luz de atardecer, espacios verdes para la ceremonia y jardines para el book de pareja.",
      "Si tu boda es en una finca de Gachancipá, un fotógrafo que conoce la Sabana Centro en general sabe qué esperar del clima y la luz de la zona, aunque no haya fotografiado antes en ese predio específico.",
    ],
  },
  {
    slug: "tocancipa",
    name: "Tocancipá",
    region: "sabana-de-bogota",
    province: "Sabana Centro",
    department: "Cundinamarca",
    distanceKm: 35,
    distanceApprox: true,
    phase: 1,
    indexable: true,
    facts: [
      "Sede del Parque Jaime Duque y del autódromo de Tocancipá, dos referentes conocidos del municipio.",
      "Zona de rápido crecimiento industrial y residencial dentro de la Sabana Centro.",
    ],
    intro:
      "Tocancipá combina zona industrial con fincas de recreo y algunos de los referentes turísticos más conocidos de la Sabana, como el Parque Jaime Duque, aunque las bodas aquí suelen celebrarse en sus fincas rurales.",
    body: [
      "A unos 35 km de Bogotá (45 minutos aproximadamente), Tocancipá ha crecido rápido en los últimos años, pero conserva un área rural con fincas de recreo donde se celebran bodas y eventos, generalmente con el mismo paisaje de sabana abierta del resto de la Sabana Centro.",
      "El entorno rural de Tocancipá funciona igual de bien que el de Chía o Cajicá para ceremonias al aire libre y sesiones de pareja con luz de atardecer, con la ventaja de estar sobre la Autopista Norte y ser de fácil acceso para los invitados.",
      "Conocer la zona ayuda a planear el día con calma, sobre todo si la finca elegida está cerca de vías principales con más tráfico a ciertas horas.",
    ],
  },
  {
    slug: "mosquera",
    name: "Mosquera",
    region: "sabana-de-bogota",
    province: "Sabana Occidente",
    department: "Cundinamarca",
    distanceKm: 20,
    distanceApprox: true,
    phase: 1,
    indexable: true,
    facts: [
      "Uno de los municipios más cercanos a Bogotá por el occidente, sobre la vía a Girardot y Facatativá.",
      "Capital no oficial de la provincia de Sabana Occidente en términos de crecimiento urbano.",
    ],
    intro:
      "Mosquera es el municipio de Sabana Occidente más cercano a Bogotá, lo que facilita la logística para bodas con invitados que llegan desde distintas zonas de la capital.",
    body: [
      "A unos 20 km de Bogotá (30 a 40 minutos por la Calle 13 o la Avenida Ciudad de Cali), Mosquera ha crecido mucho en los últimos años, pero su área rural conserva fincas y salones de eventos que sirven de escenario para bodas de toda escala.",
      "El paisaje de Sabana Occidente es similar al de la Sabana Centro —potreros, cerros suaves, luz abierta de sabana— aunque con menos concentración de fincas 'de postal' que Chía o Cajicá. Aun así, hay opciones sólidas para ceremonias al aire libre y recepciones campestres.",
      "La cercanía de Mosquera a Bogotá es una ventaja práctica: menos tiempo de traslado para el equipo fotográfico y para los invitados, lo que deja más margen para aprovechar la luz del día en la sesión de fotos.",
    ],
  },
  {
    slug: "madrid",
    name: "Madrid",
    region: "sabana-de-bogota",
    province: "Sabana Occidente",
    department: "Cundinamarca",
    distanceKm: 30,
    distanceApprox: true,
    phase: 1,
    indexable: true,
    facts: [
      "Tradicionalmente conocido por sus cultivos de flores de exportación.",
      "Uno de los municipios más poblados de la provincia de Sabana Occidente.",
    ],
    intro:
      "Madrid es reconocido por sus extensos cultivos de flores, un paisaje particular de la Sabana Occidente que a veces se convierte en telón de fondo de las fotos de boda en la zona.",
    body: [
      "A unos 30 km de Bogotá (40 minutos aproximadamente), Madrid combina zona urbana en crecimiento con un área rural marcada por los invernaderos de flores de exportación, además de fincas y salones de eventos más tradicionales.",
      "El entorno de Madrid ofrece el paisaje típico de sabana —potreros, cerros al fondo, cielos amplios— con el añadido ocasional de los cultivos de flores como referencia visual distintiva de la zona.",
      "Como en el resto de Sabana Occidente, la clave fotográfica está en aprovechar la luz de atardecer y los espacios abiertos de cada finca, algo que un fotógrafo familiarizado con la región sabe planear de antemano.",
    ],
  },
  {
    slug: "funza",
    name: "Funza",
    region: "sabana-de-bogota",
    province: "Sabana Occidente",
    department: "Cundinamarca",
    distanceKm: 18,
    distanceApprox: true,
    phase: 1,
    indexable: true,
    facts: [
      "Uno de los municipios más cercanos a Bogotá, casi contiguo al occidente de la ciudad.",
      "Cercano al aeropuerto El Dorado, lo que facilita la llegada de invitados de fuera de la ciudad.",
    ],
    intro:
      "Funza es de los municipios más cercanos a Bogotá por el occidente, prácticamente contiguo a la ciudad y cerca del aeropuerto El Dorado, una ventaja para bodas con invitados que viajan desde otras ciudades.",
    body: [
      "A menos de 20 km de Bogotá (25 a 35 minutos), Funza es un trayecto corto que casi no se siente como salir de la ciudad. Su área rural conserva fincas de recreo con el paisaje de sabana característico de la zona: potreros abiertos, cerros suaves y luz amplia durante buena parte del día.",
      "La cercanía a Bogotá y al aeropuerto El Dorado hace de Funza una opción práctica para bodas con invitados que llegan en avión, sin sacrificar el ambiente campestre de una finca de sabana.",
      "El enfoque fotográfico en Funza es similar al del resto de Sabana Occidente: aprovechar los espacios abiertos y la luz de atardecer para el book de pareja, con un traslado mínimo desde Bogotá para todo el equipo.",
    ],
  },
  {
    slug: "facatativa",
    name: "Facatativá",
    region: "sabana-de-bogota",
    province: "Sabana Occidente",
    department: "Cundinamarca",
    distanceKm: 40,
    distanceApprox: true,
    phase: 1,
    indexable: true,
    facts: [
      "Capital de la provincia de Sabana Occidente y sede del Parque Arqueológico Piedras del Tunjo.",
      "Punto de referencia en la vía Bogotá–Girardot hacia el occidente de Cundinamarca.",
    ],
    intro:
      "Facatativá es la capital de la Sabana Occidente y el municipio más grande de la zona, con el Parque Arqueológico Piedras del Tunjo como uno de sus referentes naturales más conocidos.",
    body: [
      "A unos 40 km de Bogotá (50 minutos a una hora por la Calle 80 o la vía a Girardot), Facatativá es un municipio más grande y urbano que el resto de Sabana Occidente, con un área rural de fincas y un entorno natural que incluye formaciones rocosas y bosque en el Parque Piedras del Tunjo.",
      "Para bodas en Facatativá, el paisaje ofrece más variedad que el de otros municipios de la sabana: además de las fincas tradicionales, hay entornos con roca y bosque que dan opciones distintas para la sesión de fotos de pareja.",
      "Al ser el municipio de referencia de Sabana Occidente, Facatativá suele ser también el punto donde los invitados se hospedan si vienen de fuera, algo a tener en cuenta al planear los tiempos del día de la boda.",
    ],
  },
  {
    slug: "el-rosal",
    name: "El Rosal",
    region: "sabana-de-bogota",
    province: "Sabana Occidente",
    department: "Cundinamarca",
    distanceKm: 35,
    distanceApprox: true,
    phase: 1,
    indexable: true,
    facts: [
      "Municipio pequeño y rural de la Sabana Occidente, sobre la vía Bogotá–Facatativá.",
      "Comparte el paisaje de sabana abierta con Subachoque y Facatativá.",
    ],
    intro:
      "El Rosal es uno de los municipios más pequeños y rurales de la Sabana Occidente, con un paisaje abierto de sabana que lo hace apto para bodas de finca íntimas.",
    body: [
      "A unos 35 km de Bogotá (45 a 55 minutos), El Rosal conserva un carácter más rural que sus vecinos más grandes, con fincas y potreros abiertos típicos de la Sabana Occidente y cercanía a Subachoque y Facatativá.",
      "El paisaje de El Rosal —sabana plana, cerros al fondo, luz amplia— funciona bien para ceremonias al aire libre y sesiones de pareja con el mismo enfoque que el resto de la región: aprovechar la luz de atardecer y los espacios verdes de cada finca.",
      "Al ser un municipio pequeño, es habitual que las bodas aquí sean más íntimas, lo que también da más margen para dedicar tiempo a los detalles y momentos personales durante la cobertura fotográfica.",
    ],
  },
  {
    slug: "subachoque",
    name: "Subachoque",
    region: "sabana-de-bogota",
    province: "Sabana Occidente",
    department: "Cundinamarca",
    distanceKm: 45,
    distanceApprox: true,
    phase: 1,
    indexable: true,
    facts: [
      "Reconocido por su paisaje de páramo, bosques de niebla y ferias agropecuarias tradicionales.",
      "Uno de los municipios más verdes y menos urbanizados de la Sabana Occidente.",
    ],
    intro:
      "Subachoque es de los municipios más verdes y menos urbanizados de la Sabana Occidente, con paisaje de páramo y bosque de niebla que da a las fotos un carácter distinto al de la sabana plana.",
    body: [
      "A unos 45 km de Bogotá (una hora aproximadamente), Subachoque conserva un entorno rural marcado por el paisaje de montaña, con neblina frecuente en las mañanas y una vegetación más densa que la de municipios como Mosquera o Funza.",
      "Las fincas de Subachoque suelen tener jardines grandes, arboledas y en algunos casos vista a zonas de bosque, lo que da más profundidad visual a las fotos que un jardín de sabana plana convencional.",
      "El clima de montaña de Subachoque puede cambiar rápido durante el día, así que conviene planear la sesión de fotos con flexibilidad y aprovechar las ventanas de luz cuando se presenten.",
    ],
  },
  {
    slug: "zipacon",
    name: "Zipacón",
    region: "sabana-de-bogota",
    province: "Sabana Occidente",
    department: "Cundinamarca",
    distanceKm: 45,
    distanceApprox: true,
    phase: 1,
    indexable: true,
    facts: [
      "Uno de los municipios más pequeños de Cundinamarca en población, de carácter rural marcado.",
      "Limita con Facatativá y forma parte de la provincia de Sabana Occidente.",
    ],
    intro:
      "Zipacón es uno de los municipios más pequeños y tranquilos de la Sabana Occidente, una opción para bodas de finca alejadas del movimiento de los municipios más grandes.",
    body: [
      "A unos 45 km de Bogotá (una hora aproximadamente), Zipacón es un municipio pequeño y rural, vecino de Facatativá, con fincas que ofrecen el mismo tipo de entorno campestre que el resto de la Sabana Occidente pero con menos tránsito y más tranquilidad.",
      "El paisaje de Zipacón —potreros, cerros, vegetación de sabana alta— da el mismo tipo de oportunidades fotográficas que otros municipios de la zona: ceremonias al aire libre, sesiones de pareja con luz de atardecer y espacios verdes amplios.",
      "Por ser un municipio pequeño, es habitual que la logística de una boda aquí sea más sencilla de coordinar, algo que también facilita el trabajo fotográfico durante el día del evento.",
    ],
  },
  {
    slug: "bojaca",
    name: "Bojacá",
    region: "sabana-de-bogota",
    province: "Sabana Occidente",
    department: "Cundinamarca",
    distanceKm: 35,
    distanceApprox: true,
    phase: 1,
    indexable: true,
    facts: [
      "Municipio pequeño de la Sabana Occidente, sobre la vía hacia Zipacón y La Mesa.",
      "Conserva un centro urbano colonial de tamaño reducido.",
    ],
    intro:
      "Bojacá es uno de los municipios más pequeños de la Sabana Occidente, con un centro colonial modesto y un área rural que combina sabana y las primeras estribaciones hacia el occidente de Cundinamarca.",
    body: [
      "A unos 35 km de Bogotá (45 a 55 minutos), Bojacá marca casi la transición entre la Sabana Occidente y la zona más templada del occidente de Cundinamarca (Tequendama), lo que se nota en un clima ligeramente más cálido que el de municipios como Facatativá.",
      "Sus fincas ofrecen el mismo tipo de entorno campestre que el resto de la Sabana Occidente, con la posibilidad de encontrar zonas algo menos frías hacia el sur del municipio.",
      "Como en el resto de la región, conocer la zona ayuda a anticipar la luz y el clima disponibles el día de la boda para aprovechar al máximo la sesión de fotos.",
    ],
  },
  {
    slug: "soacha",
    name: "Soacha",
    region: "sabana-de-bogota",
    province: "Provincia de Soacha",
    department: "Cundinamarca",
    distanceKm: 15,
    distanceApprox: true,
    phase: 1,
    indexable: true,
    facts: [
      "Forma parte de la provincia de Soacha, oficialmente distinta de las provincias de Sabana Centro y Sabana Occidente, aunque se agrupa comercialmente dentro del área metropolitana de Bogotá.",
      "Uno de los municipios más poblados de Cundinamarca por su contigüidad con el sur de Bogotá.",
    ],
    intro:
      "Soacha es, en términos administrativos, parte de la provincia de Soacha y no de la Sabana Centro u Occidente, pero por su cercanía inmediata a Bogotá suele agruparse junto a estos municipios para efectos de servicios y logística de boda.",
    body: [
      "A menos de 20 km del centro de Bogotá, Soacha es prácticamente contiguo a la ciudad por el sur, lo que facilita la llegada de invitados sin necesidad de trayectos largos. Su área rural, hacia el sur y occidente del municipio, conserva fincas y fincas de recreo con paisaje de montaña.",
      "El entorno de Soacha combina zona urbana densa con sectores rurales que ofrecen el tipo de espacio verde necesario para una ceremonia al aire libre, aunque con menor concentración de salones de eventos reconocidos que municipios como Chía o Cajicá.",
      "Para bodas en fincas de Soacha, el enfoque fotográfico es el mismo que en el resto de la sabana: aprovechar la luz de la tarde y los espacios abiertos disponibles en cada predio.",
    ],
  },
  {
    slug: "sibate",
    name: "Sibaté",
    region: "sabana-de-bogota",
    province: "Provincia de Soacha",
    department: "Cundinamarca",
    distanceKm: 25,
    distanceApprox: true,
    phase: 1,
    indexable: true,
    facts: [
      "Parte de la provincia de Soacha, cercano al embalse del Muña.",
      "Municipio de transición entre la Sabana y el altiplano hacia Fusagasugá y Sumapaz.",
    ],
    intro:
      "Sibaté es vecino de Soacha y también parte de su provincia, con la particularidad de estar junto al embalse del Muña, un cuerpo de agua que añade una opción distinta al paisaje típico de sabana.",
    body: [
      "A unos 25 km de Bogotá (35 a 45 minutos), Sibaté combina zona urbana pequeña con un entorno rural de montaña y cercanía al embalse del Muña, lo que da más variedad de paisaje que otros municipios de la provincia de Soacha.",
      "Las fincas de Sibaté suelen aprovechar ese entorno de montaña y agua, con vistas que se salen un poco del jardín de sabana plana convencional, algo interesante para quienes buscan fotos con un fondo distinto.",
      "El clima de Sibaté puede ser más fresco y cambiante que el de municipios más bajos, así que planear la sesión de fotos con margen ayuda a aprovechar las mejores condiciones de luz.",
    ],
  },
];

/**
 * FASE 2 — los 95 municipios de Cundinamarca que no pertenecen a la Sabana
 * de Bogotá (116 − 21 = 95). Ver src/data/locations-cundinamarca.ts.
 */
export { CUNDINAMARCA_PHASE2 as CUNDINAMARCA_LOCATIONS } from "@/data/locations-cundinamarca";

/**
 * FASE 3 — destinos campestres a ~200 km de Bogotá fuera de Cundinamarca
 * (Boyacá, Tolima, Meta). Ver src/data/locations-radius.ts.
 */
export { RADIUS_PHASE3 as RADIUS_LOCATIONS } from "@/data/locations-radius";

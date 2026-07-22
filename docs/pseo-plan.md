# Plan de páginas de ubicación (pSEO) — Manuel Torres Fotografía

Estrategia y arquitectura de páginas de ubicación para posicionar
"fotógrafo de bodas + [municipio]", construida con la skill `programmatic-seo`
(`.agents/skills/programmatic-seo`). Implementación 100% en producción en el
repo — este documento es la referencia legible, no la fuente de datos (esa es
`src/data/locations*.ts`; si la cambias, corre de nuevo el script generador
de tablas para actualizar este archivo).

## 1. Resumen ejecutivo

- **133 páginas de municipio** + **3 páginas de directorio de región** = **136 páginas** nuevas, todas ya implementadas y funcionando en `/fotografo-bodas-[municipio]`.
- **Fase 1 (21 municipios, Sabana de Bogotá): indexables desde ya.** Contenido redactado individualmente, con datos reales verificados.
- **Fases 2 y 3 (95 + 17 = 112 municipios): implementadas pero en `noindex,follow`** hasta revisión por lotes. Motivo detallado en la sección 5.
- Estructura de URL en subcarpetas planas (no subdominios), tal como pediste: `manueltorres.com.co/fotografo-bodas-chia`.
- Cada página tiene: H1/meta únicos, contenido real (no solo el nombre cambiado), galería con aviso honesto sobre el origen de las fotos, CTA, schema `Service` + `LocalBusiness`, y enlaces internos a municipios vecinos + directorio de región + portafolio.

## 2. Corrección importante sobre tu lista original

Verifiqué la lista de municipios con investigación real (fuentes: Wikipedia en español artículo por artículo de cada provincia de Cundinamarca, y contraste con todacolombia.com / Gobernación de Cundinamarca). Dos correcciones:

1. **Girardot, La Vega y Anapoima son municipios de Cundinamarca**, no de Boyacá/Tolima/Meta/Huila — ya están cubiertos en la Fase 2 (Cundinamarca completo), no se duplican en la Fase 3.
2. **Melgar sí es de Tolima**, no de Cundinamarca — quedó correctamente en la Fase 3.
3. **Excluí Huila por completo**: su municipio más cercano a Bogotá (Neiva) está a 300+ km, muy por fuera del radio de 200 km que pediste. Ningún municipio real de Huila cae dentro del rango.
4. **Soacha y Sibaté** no son oficialmente "Sabana" (son la Provincia de Soacha, una provincia distinta de Sabana Centro y Sabana Occidente) — los agrupé igual bajo "Sabana de Bogotá" porque así se conoce comercialmente la zona metropolitana, pero el texto de cada página menciona la provincia oficial correcta.

## 3. Arquitectura implementada

```
src/data/locations.ts              tipos, REGION_HUBS, SABANA_LOCATIONS (fase 1, redactada a mano)
src/data/locations-cundinamarca.ts fase 2 — 95 municipios, contenido generado con datos reales
src/data/locations-radius.ts       fase 3 — 17 municipios, contenido generado con datos reales
src/lib/locations.ts               getLocation, getRegionHub, getNeighbors, ALL_LOCATIONS, INDEXABLE_LOCATIONS
src/lib/locationContent.ts         generador de contenido variado (fase 2/3) — ver sección 4
src/lib/schema.ts                  JSON-LD Service + LocalBusiness por página
src/components/location/
  LocationPage.tsx                 plantilla de página de municipio
  RegionHubPage.tsx                plantilla de directorio de región
src/app/[fullslug]/page.tsx        ruta única que resuelve /fotografo-bodas-* (municipio o región)
src/app/sitemap.ts                 incluye directorios + solo municipios indexable:true
```

**Nota técnica:** Next.js App Router no permite un segmento dinámico tipo `fotografo-bodas-[slug]` (prefijo + corchete) en el nombre de carpeta — solo `[slug]` puro. Por eso la carpeta se llama `[fullslug]` y el código compone/descompone el prefijo `fotografo-bodas-` a mano. La URL pública sigue siendo exactamente la que pediste (sin barra intermedia).

## 4. Plantilla de página (deliverable 2)

### Página de municipio (`LocationPage.tsx`)

1. **Breadcrumb** — enlace de vuelta al directorio de región.
2. **H1 + meta únicos** — `Fotógrafo de Bodas en [Municipio] | Manuel Torres Fotografía`. La meta description es el párrafo de intro de esa página (único, no reciclado).
3. **Pill** con la provincia oficial real.
4. **Intro** (1 párrafo) — fase 1: escrito a mano por municipio. Fase 2/3: generado combinando datos reales (provincia, distancia, dato distintivo verificado) a través de 6 estructuras de frase distintas, elegidas de forma determinista por el slug (no aleatoria — el build es reproducible) para que dos páginas nunca compartan literalmente el mismo texto.
5. **Tarjetas de datos** — 1-2 hechos reales y verificables por municipio (nunca inventados; si no hay dato verificado, la tarjeta simplemente no aparece).
6. **Cuerpo** (2-3 párrafos) — fase 1: contenido específico de cada municipio (fincas, iglesia, clima, arquitectura). Fase 2/3: logística real (tiempo de viaje calculado desde la distancia) + enfoque fotográfico.
7. **Galería** — 9 fotos reales del portafolio general, con aviso explícito: *"Todavía no tengo fotografías propias tomadas específicamente en [Municipio]..."* — honesto, tal como pediste, en vez de fingir ubicación.
8. **CTA** — WhatsApp + Instagram, con el copy personalizado ("Cuéntame de tu boda en [Municipio]").
9. **Enlaces internos** — hasta 6 municipios vecinos (misma región, ordenados por cercanía en distancia), botón al portafolio completo y al directorio de región.
10. **Schema JSON-LD** — `Service` (fotografía de bodas) + `LocalBusiness` proveedor, con `areaServed` = el municipio (sin dirección física fija — es negocio de área de servicio, el fotógrafo se desplaza).

### Página de directorio de región (`RegionHubPage.tsx`)

H1 + descripción de la región → grid de tarjetas (todos sus municipios, ordenados por distancia) → enlaces a las otras 2 regiones + portafolio. Schema `CollectionPage`.

## 5. Por qué fases 2 y 3 están en `noindex` (importante)

La skill `programmatic-seo` es explícita en esto — cito sus "Common Mistakes" y su checklist de indexación:

> Thin content: Just swapping city names in identical content · Over-generation: Creating pages with no search demand · Indexation Strategy: Prioritize high-volume patterns, noindex very thin variations, manage crawl budget thoughtfully

Publicar de golpe 112 páginas de municipios donde (a) no has fotografiado nunca, (b) muchas tienen menos de 5.000 habitantes y probablemente cero volumen de búsqueda real para "fotógrafo de bodas + [pueblo]", y (c) casi la mitad no tiene ni un dato distintivo verificable, es exactamente el patrón que Google penaliza como "scaled content abuse" / doorway pages. El riesgo no es hipotético: podría arrastrar también el ranking de tus páginas buenas (Sabana).

Por eso implementé un mecanismo real y accionable, no solo una advertencia:
- Cada municipio de fase 2/3 tiene `indexable: false` en el dato → se sirve con `<meta name="robots" content="noindex, follow">` y **no entra al sitemap**.
- La página existe, es navegable y enlaza con el resto del sitio (no hay páginas huérfanas), pero Google no la indexa todavía.
- Para activar un municipio: cambiar `indexable: false` a `true` en `src/data/locations-cundinamarca.ts` o `locations-radius.ts` y volver a desplegar. Se puede hacer municipio por municipio o por lotes.

## 6. Plan de lanzamiento por fases (deliverable 3)

| Fase | Qué | Cuándo | Acción |
|---|---|---|---|
| **1** | 21 municipios Sabana de Bogotá | **Ya en producción, indexable** | Ninguna — monitorear Search Console |
| **2a** | ~15-20 municipios de Cundinamarca con dato distintivo fuerte y buena cercanía (ej. La Calera, Guasca, Guatavita, Choachí, Fusagasugá, La Mesa, Anapoima, Villeta, Zipacón cercanos) | Semana 2-4 tras fase 1 | Revisar/spot-check distancia en Google Maps → `indexable: true` → redeploy |
| **2b** | Resto de Cundinamarca (~75 municipios, muchos "sin dato distintivo") | Progresivo, por lotes de 15-20/semana, priorizando por señales reales de demanda (Search Console de fase 1, Google Trends, consultas de clientes) | Mismo mecanismo `indexable: true` |
| **3** | 17 municipios de Boyacá/Tolima/Meta | Después de validar que fase 1 y 2a están rankeando bien (evita competir por presupuesto de rastreo mientras el dominio es nuevo en esto) | Mismo mecanismo, empezando por Villa de Leyva y Tunja (mayor volumen esperado) |

**Antes de activar cualquier página de fase 2/3**: verificar la distancia real en Google Maps (las de fase 2/3 son estimadas por rango, no todas confirmadas con una fuente exacta — ver nota de honestidad del informe de investigación) y, si es posible, añadir un dato local genuino adicional (una finca/salón real donde sepas que se hacen bodas en esa zona) en vez de dejar solo el contenido genérico basado en distancia/provincia.

## 7. Municipios y URLs (deliverable 1)

### Directorios de región

| Región | URL | Municipios |
|---|---|---|
| Sabana de Bogotá | https://www.manueltorres.com.co/fotografo-bodas-sabana-de-bogota | 21 |
| Cundinamarca | https://www.manueltorres.com.co/fotografo-bodas-cundinamarca | 95 |
| Destinos campestres a 200 km de Bogotá | https://www.manueltorres.com.co/fotografo-bodas-destinos-campestres | 17 |

---

### Fase 1 — Sabana de Bogotá (21 municipios, prioridad máxima, todos indexables)

| Municipio | Provincia | Distancia aprox. | URL | Indexable |
|---|---|---|---|---|
| Soacha | Provincia de Soacha | ~15 km | https://www.manueltorres.com.co/fotografo-bodas-soacha | Sí (indexable) |
| Funza | Sabana Occidente | ~18 km | https://www.manueltorres.com.co/fotografo-bodas-funza | Sí (indexable) |
| Cota | Sabana Centro | ~20 km | https://www.manueltorres.com.co/fotografo-bodas-cota | Sí (indexable) |
| Mosquera | Sabana Occidente | ~20 km | https://www.manueltorres.com.co/fotografo-bodas-mosquera | Sí (indexable) |
| Chía | Sabana Centro | ~25 km | https://www.manueltorres.com.co/fotografo-bodas-chia | Sí (indexable) |
| Sibaté | Provincia de Soacha | ~25 km | https://www.manueltorres.com.co/fotografo-bodas-sibate | Sí (indexable) |
| Tenjo | Sabana Centro | ~30 km | https://www.manueltorres.com.co/fotografo-bodas-tenjo | Sí (indexable) |
| Madrid | Sabana Occidente | ~30 km | https://www.manueltorres.com.co/fotografo-bodas-madrid | Sí (indexable) |
| Cajicá | Sabana Centro | ~35 km | https://www.manueltorres.com.co/fotografo-bodas-cajica | Sí (indexable) |
| Tabio | Sabana Centro | ~35 km | https://www.manueltorres.com.co/fotografo-bodas-tabio | Sí (indexable) |
| Sopó | Sabana Centro | ~35 km | https://www.manueltorres.com.co/fotografo-bodas-sopo | Sí (indexable) |
| Tocancipá | Sabana Centro | ~35 km | https://www.manueltorres.com.co/fotografo-bodas-tocancipa | Sí (indexable) |
| El Rosal | Sabana Occidente | ~35 km | https://www.manueltorres.com.co/fotografo-bodas-el-rosal | Sí (indexable) |
| Bojacá | Sabana Occidente | ~35 km | https://www.manueltorres.com.co/fotografo-bodas-bojaca | Sí (indexable) |
| Facatativá | Sabana Occidente | ~40 km | https://www.manueltorres.com.co/fotografo-bodas-facatativa | Sí (indexable) |
| Gachancipá | Sabana Centro | ~45 km | https://www.manueltorres.com.co/fotografo-bodas-gachancipa | Sí (indexable) |
| Subachoque | Sabana Occidente | ~45 km | https://www.manueltorres.com.co/fotografo-bodas-subachoque | Sí (indexable) |
| Zipacón | Sabana Occidente | ~45 km | https://www.manueltorres.com.co/fotografo-bodas-zipacon | Sí (indexable) |
| Zipaquirá | Sabana Centro | ~48 km | https://www.manueltorres.com.co/fotografo-bodas-zipaquira | Sí (indexable) |
| Cogua | Sabana Centro | ~55 km | https://www.manueltorres.com.co/fotografo-bodas-cogua | Sí (indexable) |
| Nemocón | Sabana Centro | ~55 km | https://www.manueltorres.com.co/fotografo-bodas-nemocon | Sí (indexable) |

### Fase 2 — Resto de Cundinamarca (95 municipios, noindex hasta revisión por lotes)

| Municipio | Provincia | Distancia aprox. | URL | Indexable |
|---|---|---|---|---|
| La Calera | Guavio | ~30 km | https://www.manueltorres.com.co/fotografo-bodas-la-calera | No (noindex hasta revisión) |
| Chipaque | Oriente | ~35 km | https://www.manueltorres.com.co/fotografo-bodas-chipaque | No (noindex hasta revisión) |
| San Antonio del Tequendama | Tequendama | ~40 km | https://www.manueltorres.com.co/fotografo-bodas-san-antonio-del-tequendama | No (noindex hasta revisión) |
| Choachí | Oriente | ~45 km | https://www.manueltorres.com.co/fotografo-bodas-choachi | No (noindex hasta revisión) |
| Sesquilé | Almeidas | ~48 km | https://www.manueltorres.com.co/fotografo-bodas-sesquile | No (noindex hasta revisión) |
| El Colegio | Tequendama | ~48 km | https://www.manueltorres.com.co/fotografo-bodas-el-colegio | No (noindex hasta revisión) |
| Tena | Tequendama | ~52 km | https://www.manueltorres.com.co/fotografo-bodas-tena | No (noindex hasta revisión) |
| Guasca | Guavio | ~55 km | https://www.manueltorres.com.co/fotografo-bodas-guasca | No (noindex hasta revisión) |
| Une | Oriente | ~55 km | https://www.manueltorres.com.co/fotografo-bodas-une | No (noindex hasta revisión) |
| Ubaque | Oriente | ~55 km | https://www.manueltorres.com.co/fotografo-bodas-ubaque | No (noindex hasta revisión) |
| Suesca | Almeidas | ~56 km | https://www.manueltorres.com.co/fotografo-bodas-suesca | No (noindex hasta revisión) |
| Silvania | Sumapaz | ~57 km | https://www.manueltorres.com.co/fotografo-bodas-silvania | No (noindex hasta revisión) |
| Cáqueza | Oriente | ~59 km | https://www.manueltorres.com.co/fotografo-bodas-caqueza | No (noindex hasta revisión) |
| Albán | Gualivá | ~60 km | https://www.manueltorres.com.co/fotografo-bodas-alban | No (noindex hasta revisión) |
| Anolaima | Tequendama | ~60 km | https://www.manueltorres.com.co/fotografo-bodas-anolaima | No (noindex hasta revisión) |
| Fómeque | Oriente | ~63 km | https://www.manueltorres.com.co/fotografo-bodas-fomeque | No (noindex hasta revisión) |
| La Mesa | Tequendama | ~63 km | https://www.manueltorres.com.co/fotografo-bodas-la-mesa | No (noindex hasta revisión) |
| Fusagasugá | Sumapaz | ~64 km | https://www.manueltorres.com.co/fotografo-bodas-fusagasuga | No (noindex hasta revisión) |
| San Francisco | Gualivá | ~65 km | https://www.manueltorres.com.co/fotografo-bodas-san-francisco | No (noindex hasta revisión) |
| Tausa | Ubaté | ~65 km | https://www.manueltorres.com.co/fotografo-bodas-tausa | No (noindex hasta revisión) |
| Granada | Sumapaz | ~68 km | https://www.manueltorres.com.co/fotografo-bodas-granada | No (noindex hasta revisión) |
| Cachipay | Tequendama | ~68 km | https://www.manueltorres.com.co/fotografo-bodas-cachipay | No (noindex hasta revisión) |
| Manta | Almeidas | ~70 km | https://www.manueltorres.com.co/fotografo-bodas-manta | No (noindex hasta revisión) |
| La Vega | Gualivá | ~70 km | https://www.manueltorres.com.co/fotografo-bodas-la-vega | No (noindex hasta revisión) |
| Fosca | Oriente | ~70 km | https://www.manueltorres.com.co/fotografo-bodas-fosca | No (noindex hasta revisión) |
| Sasaima | Gualivá | ~75 km | https://www.manueltorres.com.co/fotografo-bodas-sasaima | No (noindex hasta revisión) |
| Guatavita | Guavio | ~75 km | https://www.manueltorres.com.co/fotografo-bodas-guatavita | No (noindex hasta revisión) |
| Quetame | Oriente | ~75 km | https://www.manueltorres.com.co/fotografo-bodas-quetame | No (noindex hasta revisión) |
| Tibacuy | Sumapaz | ~75 km | https://www.manueltorres.com.co/fotografo-bodas-tibacuy | No (noindex hasta revisión) |
| Pasca | Sumapaz | ~75 km | https://www.manueltorres.com.co/fotografo-bodas-pasca | No (noindex hasta revisión) |
| Sutatausa | Ubaté | ~75 km | https://www.manueltorres.com.co/fotografo-bodas-sutatausa | No (noindex hasta revisión) |
| Chocontá | Almeidas | ~76 km | https://www.manueltorres.com.co/fotografo-bodas-choconta | No (noindex hasta revisión) |
| Cucunubá | Ubaté | ~78 km | https://www.manueltorres.com.co/fotografo-bodas-cucunuba | No (noindex hasta revisión) |
| Supatá | Gualivá | ~80 km | https://www.manueltorres.com.co/fotografo-bodas-supata | No (noindex hasta revisión) |
| Arbeláez | Sumapaz | ~82 km | https://www.manueltorres.com.co/fotografo-bodas-arbelaez | No (noindex hasta revisión) |
| Machetá | Almeidas | ~85 km | https://www.manueltorres.com.co/fotografo-bodas-macheta | No (noindex hasta revisión) |
| Quipile | Tequendama | ~85 km | https://www.manueltorres.com.co/fotografo-bodas-quipile | No (noindex hasta revisión) |
| Anapoima | Tequendama | ~86 km | https://www.manueltorres.com.co/fotografo-bodas-anapoima | No (noindex hasta revisión) |
| Pacho | Rionegro | ~87 km | https://www.manueltorres.com.co/fotografo-bodas-pacho | No (noindex hasta revisión) |
| Villeta | Gualivá | ~90 km | https://www.manueltorres.com.co/fotografo-bodas-villeta | No (noindex hasta revisión) |
| Gachetá | Guavio | ~90 km | https://www.manueltorres.com.co/fotografo-bodas-gacheta | No (noindex hasta revisión) |
| Ubaté | Ubaté | ~90 km | https://www.manueltorres.com.co/fotografo-bodas-ubate | No (noindex hasta revisión) |
| San Bernardo | Sumapaz | ~92 km | https://www.manueltorres.com.co/fotografo-bodas-san-bernardo | No (noindex hasta revisión) |
| Villapinzón | Almeidas | ~93 km | https://www.manueltorres.com.co/fotografo-bodas-villapinzon | No (noindex hasta revisión) |
| Nocaima | Gualivá | ~95 km | https://www.manueltorres.com.co/fotografo-bodas-nocaima | No (noindex hasta revisión) |
| Nimaima | Gualivá | ~95 km | https://www.manueltorres.com.co/fotografo-bodas-nimaima | No (noindex hasta revisión) |
| Guayabetal | Oriente | ~95 km | https://www.manueltorres.com.co/fotografo-bodas-guayabetal | No (noindex hasta revisión) |
| San Cayetano | Rionegro | ~95 km | https://www.manueltorres.com.co/fotografo-bodas-san-cayetano | No (noindex hasta revisión) |
| Pandi | Sumapaz | ~95 km | https://www.manueltorres.com.co/fotografo-bodas-pandi | No (noindex hasta revisión) |
| Viotá | Tequendama | ~95 km | https://www.manueltorres.com.co/fotografo-bodas-viota | No (noindex hasta revisión) |
| Apulo | Tequendama | ~95 km | https://www.manueltorres.com.co/fotografo-bodas-apulo | No (noindex hasta revisión) |
| Tibirita | Almeidas | ~100 km | https://www.manueltorres.com.co/fotografo-bodas-tibirita | No (noindex hasta revisión) |
| Vergara | Gualivá | ~100 km | https://www.manueltorres.com.co/fotografo-bodas-vergara | No (noindex hasta revisión) |
| Quebradanegra | Gualivá | ~100 km | https://www.manueltorres.com.co/fotografo-bodas-quebradanegra | No (noindex hasta revisión) |
| Gama | Guavio | ~100 km | https://www.manueltorres.com.co/fotografo-bodas-gama | No (noindex hasta revisión) |
| Gutiérrez | Oriente | ~100 km | https://www.manueltorres.com.co/fotografo-bodas-gutierrez | No (noindex hasta revisión) |
| Venecia | Sumapaz | ~100 km | https://www.manueltorres.com.co/fotografo-bodas-venecia | No (noindex hasta revisión) |
| Guachetá | Ubaté | ~100 km | https://www.manueltorres.com.co/fotografo-bodas-guacheta | No (noindex hasta revisión) |
| Carmen de Carupa | Ubaté | ~100 km | https://www.manueltorres.com.co/fotografo-bodas-carmen-de-carupa | No (noindex hasta revisión) |
| Lenguazaque | Ubaté | ~100 km | https://www.manueltorres.com.co/fotografo-bodas-lenguazaque | No (noindex hasta revisión) |
| Fúquene | Ubaté | ~100 km | https://www.manueltorres.com.co/fotografo-bodas-fuquene | No (noindex hasta revisión) |
| Tocaima | Alto Magdalena | ~104 km | https://www.manueltorres.com.co/fotografo-bodas-tocaima | No (noindex hasta revisión) |
| Útica | Gualivá | ~105 km | https://www.manueltorres.com.co/fotografo-bodas-utica | No (noindex hasta revisión) |
| La Peña | Gualivá | ~110 km | https://www.manueltorres.com.co/fotografo-bodas-la-pena | No (noindex hasta revisión) |
| Junín | Guavio | ~110 km | https://www.manueltorres.com.co/fotografo-bodas-junin | No (noindex hasta revisión) |
| Guayabal de Síquima | Magdalena Centro | ~110 km | https://www.manueltorres.com.co/fotografo-bodas-guayabal-de-siquima | No (noindex hasta revisión) |
| El Peñón | Rionegro | ~110 km | https://www.manueltorres.com.co/fotografo-bodas-el-penon | No (noindex hasta revisión) |
| Villagómez | Rionegro | ~110 km | https://www.manueltorres.com.co/fotografo-bodas-villagomez | No (noindex hasta revisión) |
| Susa | Ubaté | ~110 km | https://www.manueltorres.com.co/fotografo-bodas-susa | No (noindex hasta revisión) |
| Nilo | Alto Magdalena | ~112 km | https://www.manueltorres.com.co/fotografo-bodas-nilo | No (noindex hasta revisión) |
| Vianí | Magdalena Centro | ~115 km | https://www.manueltorres.com.co/fotografo-bodas-viani | No (noindex hasta revisión) |
| Simijaca | Ubaté | ~115 km | https://www.manueltorres.com.co/fotografo-bodas-simijaca | No (noindex hasta revisión) |
| Agua de Dios | Alto Magdalena | ~117 km | https://www.manueltorres.com.co/fotografo-bodas-agua-de-dios | No (noindex hasta revisión) |
| Guaduas | Bajo Magdalena | ~117 km | https://www.manueltorres.com.co/fotografo-bodas-guaduas | No (noindex hasta revisión) |
| Gachalá | Guavio | ~120 km | https://www.manueltorres.com.co/fotografo-bodas-gachala | No (noindex hasta revisión) |
| Bituima | Magdalena Centro | ~120 km | https://www.manueltorres.com.co/fotografo-bodas-bituima | No (noindex hasta revisión) |
| La Palma | Rionegro | ~120 km | https://www.manueltorres.com.co/fotografo-bodas-la-palma | No (noindex hasta revisión) |
| Ubalá | Guavio | ~130 km | https://www.manueltorres.com.co/fotografo-bodas-ubala | No (noindex hasta revisión) |
| San Juan de Rioseco | Magdalena Centro | ~130 km | https://www.manueltorres.com.co/fotografo-bodas-san-juan-de-rioseco | No (noindex hasta revisión) |
| Topaipí | Rionegro | ~130 km | https://www.manueltorres.com.co/fotografo-bodas-topaipi | No (noindex hasta revisión) |
| Girardot | Alto Magdalena | ~134 km | https://www.manueltorres.com.co/fotografo-bodas-girardot | No (noindex hasta revisión) |
| Ricaurte | Alto Magdalena | ~134 km | https://www.manueltorres.com.co/fotografo-bodas-ricaurte | No (noindex hasta revisión) |
| Paime | Rionegro | ~135 km | https://www.manueltorres.com.co/fotografo-bodas-paime | No (noindex hasta revisión) |
| Chaguaní | Magdalena Centro | ~140 km | https://www.manueltorres.com.co/fotografo-bodas-chaguani | No (noindex hasta revisión) |
| Cabrera | Sumapaz | ~140 km | https://www.manueltorres.com.co/fotografo-bodas-cabrera | No (noindex hasta revisión) |
| Guataquí | Alto Magdalena | ~145 km | https://www.manueltorres.com.co/fotografo-bodas-guataqui | No (noindex hasta revisión) |
| Pulí | Magdalena Centro | ~145 km | https://www.manueltorres.com.co/fotografo-bodas-puli | No (noindex hasta revisión) |
| Jerusalén | Alto Magdalena | ~150 km | https://www.manueltorres.com.co/fotografo-bodas-jerusalen | No (noindex hasta revisión) |
| Beltrán | Magdalena Centro | ~150 km | https://www.manueltorres.com.co/fotografo-bodas-beltran | No (noindex hasta revisión) |
| Medina | Medina | ~150 km | https://www.manueltorres.com.co/fotografo-bodas-medina | No (noindex hasta revisión) |
| Nariño | Alto Magdalena | ~160 km | https://www.manueltorres.com.co/fotografo-bodas-narino | No (noindex hasta revisión) |
| Yacopí | Rionegro | ~160 km | https://www.manueltorres.com.co/fotografo-bodas-yacopi | No (noindex hasta revisión) |
| Caparrapí | Bajo Magdalena | ~170 km | https://www.manueltorres.com.co/fotografo-bodas-caparrapi | No (noindex hasta revisión) |
| Puerto Salgar | Bajo Magdalena | ~193 km | https://www.manueltorres.com.co/fotografo-bodas-puerto-salgar | No (noindex hasta revisión) |
| Paratebueno | Medina | ~211 km | https://www.manueltorres.com.co/fotografo-bodas-paratebueno | No (noindex hasta revisión) |

### Fase 3 — Destinos campestres a ~200 km fuera de Cundinamarca (17 municipios, noindex hasta revisión por lotes)

| Municipio | Provincia | Distancia aprox. | URL | Indexable |
|---|---|---|---|---|
| Melgar | Tolima | ~98 km | https://www.manueltorres.com.co/fotografo-bodas-melgar | No (noindex hasta revisión) |
| Villavicencio | Meta | ~116 km | https://www.manueltorres.com.co/fotografo-bodas-villavicencio | No (noindex hasta revisión) |
| Restrepo | Meta | ~130 km | https://www.manueltorres.com.co/fotografo-bodas-restrepo | No (noindex hasta revisión) |
| Tunja | Boyacá | ~137 km | https://www.manueltorres.com.co/fotografo-bodas-tunja | No (noindex hasta revisión) |
| Acacías | Meta | ~145 km | https://www.manueltorres.com.co/fotografo-bodas-acacias | No (noindex hasta revisión) |
| Cumaral | Meta | ~148 km | https://www.manueltorres.com.co/fotografo-bodas-cumaral | No (noindex hasta revisión) |
| Flandes | Tolima | ~152 km | https://www.manueltorres.com.co/fotografo-bodas-flandes | No (noindex hasta revisión) |
| Espinal | Tolima | ~155 km | https://www.manueltorres.com.co/fotografo-bodas-espinal | No (noindex hasta revisión) |
| Sáchica | Boyacá | ~170 km | https://www.manueltorres.com.co/fotografo-bodas-sachica | No (noindex hasta revisión) |
| Villa de Leyva | Boyacá | ~177 km | https://www.manueltorres.com.co/fotografo-bodas-villa-de-leyva | No (noindex hasta revisión) |
| Paipa | Boyacá | ~187 km | https://www.manueltorres.com.co/fotografo-bodas-paipa | No (noindex hasta revisión) |
| Ráquira | Boyacá | ~192 km | https://www.manueltorres.com.co/fotografo-bodas-raquira | No (noindex hasta revisión) |
| Ibagué | Tolima | ~198 km | https://www.manueltorres.com.co/fotografo-bodas-ibague | No (noindex hasta revisión) |
| Duitama | Boyacá | ~200 km | https://www.manueltorres.com.co/fotografo-bodas-duitama | No (noindex hasta revisión) |
| Tibasosa | Boyacá | ~200 km | https://www.manueltorres.com.co/fotografo-bodas-tibasosa | No (noindex hasta revisión) |
| Nobsa | Boyacá | ~210 km | https://www.manueltorres.com.co/fotografo-bodas-nobsa | No (noindex hasta revisión) |
| Sogamoso | Boyacá | ~215 km | https://www.manueltorres.com.co/fotografo-bodas-sogamoso | No (noindex hasta revisión) |

### Totales

- Municipios totales: 133
- Directorios de región: 3
- Páginas totales: 136

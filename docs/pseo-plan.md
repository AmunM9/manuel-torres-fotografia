# Plan de páginas de ubicación (pSEO) — Manuel Torres Fotografía

Estrategia y arquitectura de páginas de ubicación para posicionar
"fotógrafo de bodas + [municipio]", construida con la skill `programmatic-seo`
(`.agents/skills/programmatic-seo`). Implementación 100% en producción en el
repo — este documento es la referencia legible, no la fuente de datos (esa es
`src/data/locations*.ts`; si la cambias, corre de nuevo el script generador
de tablas para actualizar este archivo).

## 1. Resumen ejecutivo

- **134 páginas de ubicación** (133 municipios + Bogotá) + **3 páginas de directorio de región** = **137 páginas** nuevas, todas ya implementadas y funcionando en `/fotografo-bodas-[municipio]`.
- **37 páginas indexables ahora mismo**: Bogotá + 20 de la Sabana (Soacha se desactivó a pedido del cliente) + 16 activadas tras investigar evidencia real de mercado de bodas (venues con nombre propio, no solo cercanía geográfica) — ver sección 6.
- **Los 97 restantes están implementados pero en `noindex,follow`** hasta tener evidencia real de mercado o demanda. Motivo detallado en la sección 5.
- Estructura de URL en subcarpetas planas (no subdominios), tal como pediste: `manueltorres.com.co/fotografo-bodas-chia`.
- Cada página tiene: H1/meta únicos, contenido real (no solo el nombre cambiado), galería con aviso honesto sobre el origen de las fotos, CTA, schema `Service` + `LocalBusiness`, y enlaces internos a municipios vecinos + directorio de región + portafolio.
- **Sección 8 (nueva)**: SEO de marca y de los términos genéricos ("Manuel Torres fotógrafo", "fotógrafo de bodas Bogotá") que no estaban cubiertos — página de Bogotá, schema de marca sitewide, metadata y NAP.

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
- Cada municipio de fase 2/3 tiene un campo `indexable` (`true`/`false`, controlado por un `Set` llamado `ACTIVATED` en el archivo). Si es `false` → se sirve con `<meta name="robots" content="noindex, follow">` y **no entra al sitemap**.
- La página existe, es navegable y enlaza con el resto del sitio (no hay páginas huérfanas), pero Google no la indexa hasta que se active.
- Para activar un municipio: añadir su nombre al `Set` `ACTIVATED` en `src/data/locations-cundinamarca.ts` o `locations-radius.ts` y volver a desplegar. Se puede hacer municipio por municipio o por lotes — así se activaron los 15 de la sección 6.

## 6. Plan de lanzamiento por fases (deliverable 3)

### Ronda 1 — activación por mercado real (ya hecha)

Investigué evidencia real de mercado de bodas para los 112 municipios de fase 2/3 (fincas/haciendas con nombre propio, listados en directorios de matrimonio.com.co, planeadores de bodas especializados, contenido editorial de bodas de destino — no solo "es un lugar bonito"). Resultado:

- **13 municipios con evidencia fuerte** (venues nombrados, confirmados por varias fuentes independientes): Villa de Leyva, La Mesa, Anapoima, Girardot, Villeta, Fusagasugá, La Calera, Guaduas, Melgar, Villavicencio, Duitama, Paipa, Ibagué → **activados** (`indexable: true`).
- **+2 activados por decisión explícita del cliente**, no por evidencia de mercado: **La Vega** (evidencia débil — aparece agrupado con Girardot/La Mesa/Fusagasugá en contenido editorial, pero sin venue propio confirmado) y **San Francisco** (sin evidencia encontrada). Son los pueblos más cercanos a donde vive/trabaja el cliente — conveniencia personal, no señal de mercado.
- **8 municipios con evidencia débil, no activados todavía** (un solo dato, ambiguo): Sasaima, Guatavita, Silvania, Arbeláez, Tunja, Sogamoso, Restrepo, y uno más — ver siguiente punto.
- **90 municipios sin ninguna evidencia de mercado de bodas** — quedan en `noindex`. No se recomienda activarlos sin una señal real primero (demanda de clientes, Search Console de las páginas ya activas, etc.).

### Ronda 2 — Soacha por Guasca (a pedido del cliente)

El cliente pidió desactivar **Soacha** (mercado de bodas de finca que no le interesa) y reemplazarlo por un municipio más popular en bodas. Investigué puntualmente y encontré evidencia más fuerte de lo esperado para **Guasca**: página propia dedicada en matrimonio.com.co ("Las mejores haciendas para bodas en Guasca") + venues con nombre propio (Naturaleza Muisca, Cabañas y Eventos Villa Helena, cerca del embalse de Tominé) — evidencia comparable a la de los 13 municipios de la ronda 1, no del nivel débil en el que lo había clasificado inicialmente.

- **Soacha**: `indexable: false` desde ahora (la página sigue existiendo, solo no se indexa).
- **Guasca**: `indexable: true`, con el dato distintivo actualizado a la evidencia real encontrada.

**Total activado ahora: 36 municipios indexables** (20 Sabana + 16 de Cundinamarca/destinos campestres) de 133 — mismo total que antes, composición distinta.

### Próximas rondas

| Ronda | Qué | Cuándo | Acción |
|---|---|---|---|
| **3** | Los 7 de evidencia débil restantes (Sasaima, Guatavita, Silvania, Arbeláez, Tunja, Sogamoso, Restrepo) | Cuando haya señal real de demanda (Search Console de las 36 activas, consultas de clientes) | Verificar con una búsqueda puntual antes de activar cada una — como se hizo con Guasca |
| **4** | Resto (~90, sin evidencia) | Solo si aparece demanda real y específica para alguno (ej. te contactan de ahí) | Activar caso por caso, nunca en bloque |

**Mecanismo** (sin cambios): cada municipio tiene un flag `indexable` en `src/data/locations*.ts`, controlado por un `Set<string>` llamado `ACTIVATED` en los archivos de fase 2/3 (en fase 1/Sabana el flag va directo en cada objeto) — para activar o desactivar uno, se edita el `Set` o el flag y se redespliega.

## 7. Municipios y URLs (deliverable 1)

### Directorios de región

| Región | URL | Municipios |
|---|---|---|
| Sabana de Bogotá | https://www.manueltorres.com.co/fotografo-bodas-sabana-de-bogota | 22 |
| Cundinamarca | https://www.manueltorres.com.co/fotografo-bodas-cundinamarca | 95 |
| Destinos campestres a 200 km de Bogotá | https://www.manueltorres.com.co/fotografo-bodas-destinos-campestres | 17 |

---

### Fase 1 — Bogotá + Sabana de Bogotá (22 páginas, 21 indexables)

| Municipio | Provincia | Distancia aprox. | URL | Indexable |
|---|---|---|---|---|
| Bogotá | Distrito Capital | ~0 km | https://www.manueltorres.com.co/fotografo-bodas-bogota | ✅ Indexable |
| Soacha | Provincia de Soacha | ~15 km | https://www.manueltorres.com.co/fotografo-bodas-soacha | No (noindex) |
| Funza | Sabana Occidente | ~18 km | https://www.manueltorres.com.co/fotografo-bodas-funza | ✅ Indexable |
| Cota | Sabana Centro | ~20 km | https://www.manueltorres.com.co/fotografo-bodas-cota | ✅ Indexable |
| Mosquera | Sabana Occidente | ~20 km | https://www.manueltorres.com.co/fotografo-bodas-mosquera | ✅ Indexable |
| Chía | Sabana Centro | ~25 km | https://www.manueltorres.com.co/fotografo-bodas-chia | ✅ Indexable |
| Sibaté | Provincia de Soacha | ~25 km | https://www.manueltorres.com.co/fotografo-bodas-sibate | ✅ Indexable |
| Tenjo | Sabana Centro | ~30 km | https://www.manueltorres.com.co/fotografo-bodas-tenjo | ✅ Indexable |
| Madrid | Sabana Occidente | ~30 km | https://www.manueltorres.com.co/fotografo-bodas-madrid | ✅ Indexable |
| Cajicá | Sabana Centro | ~35 km | https://www.manueltorres.com.co/fotografo-bodas-cajica | ✅ Indexable |
| Tabio | Sabana Centro | ~35 km | https://www.manueltorres.com.co/fotografo-bodas-tabio | ✅ Indexable |
| Sopó | Sabana Centro | ~35 km | https://www.manueltorres.com.co/fotografo-bodas-sopo | ✅ Indexable |
| Tocancipá | Sabana Centro | ~35 km | https://www.manueltorres.com.co/fotografo-bodas-tocancipa | ✅ Indexable |
| El Rosal | Sabana Occidente | ~35 km | https://www.manueltorres.com.co/fotografo-bodas-el-rosal | ✅ Indexable |
| Bojacá | Sabana Occidente | ~35 km | https://www.manueltorres.com.co/fotografo-bodas-bojaca | ✅ Indexable |
| Facatativá | Sabana Occidente | ~40 km | https://www.manueltorres.com.co/fotografo-bodas-facatativa | ✅ Indexable |
| Gachancipá | Sabana Centro | ~45 km | https://www.manueltorres.com.co/fotografo-bodas-gachancipa | ✅ Indexable |
| Subachoque | Sabana Occidente | ~45 km | https://www.manueltorres.com.co/fotografo-bodas-subachoque | ✅ Indexable |
| Zipacón | Sabana Occidente | ~45 km | https://www.manueltorres.com.co/fotografo-bodas-zipacon | ✅ Indexable |
| Zipaquirá | Sabana Centro | ~48 km | https://www.manueltorres.com.co/fotografo-bodas-zipaquira | ✅ Indexable |
| Cogua | Sabana Centro | ~55 km | https://www.manueltorres.com.co/fotografo-bodas-cogua | ✅ Indexable |
| Nemocón | Sabana Centro | ~55 km | https://www.manueltorres.com.co/fotografo-bodas-nemocon | ✅ Indexable |

### Fase 2 — Resto de Cundinamarca (95 municipios, 10 activados por mercado real de bodas)

| Municipio | Provincia | Distancia aprox. | URL | Indexable |
|---|---|---|---|---|
| La Calera | Guavio | ~30 km | https://www.manueltorres.com.co/fotografo-bodas-la-calera | ✅ Indexable |
| Chipaque | Oriente | ~35 km | https://www.manueltorres.com.co/fotografo-bodas-chipaque | No (noindex) |
| San Antonio del Tequendama | Tequendama | ~40 km | https://www.manueltorres.com.co/fotografo-bodas-san-antonio-del-tequendama | No (noindex) |
| Choachí | Oriente | ~45 km | https://www.manueltorres.com.co/fotografo-bodas-choachi | No (noindex) |
| Sesquilé | Almeidas | ~48 km | https://www.manueltorres.com.co/fotografo-bodas-sesquile | No (noindex) |
| El Colegio | Tequendama | ~48 km | https://www.manueltorres.com.co/fotografo-bodas-el-colegio | No (noindex) |
| Tena | Tequendama | ~52 km | https://www.manueltorres.com.co/fotografo-bodas-tena | No (noindex) |
| Guasca | Guavio | ~55 km | https://www.manueltorres.com.co/fotografo-bodas-guasca | ✅ Indexable |
| Une | Oriente | ~55 km | https://www.manueltorres.com.co/fotografo-bodas-une | No (noindex) |
| Ubaque | Oriente | ~55 km | https://www.manueltorres.com.co/fotografo-bodas-ubaque | No (noindex) |
| Suesca | Almeidas | ~56 km | https://www.manueltorres.com.co/fotografo-bodas-suesca | No (noindex) |
| Silvania | Sumapaz | ~57 km | https://www.manueltorres.com.co/fotografo-bodas-silvania | No (noindex) |
| Cáqueza | Oriente | ~59 km | https://www.manueltorres.com.co/fotografo-bodas-caqueza | No (noindex) |
| Albán | Gualivá | ~60 km | https://www.manueltorres.com.co/fotografo-bodas-alban | No (noindex) |
| Anolaima | Tequendama | ~60 km | https://www.manueltorres.com.co/fotografo-bodas-anolaima | No (noindex) |
| Fómeque | Oriente | ~63 km | https://www.manueltorres.com.co/fotografo-bodas-fomeque | No (noindex) |
| La Mesa | Tequendama | ~63 km | https://www.manueltorres.com.co/fotografo-bodas-la-mesa | ✅ Indexable |
| Fusagasugá | Sumapaz | ~64 km | https://www.manueltorres.com.co/fotografo-bodas-fusagasuga | ✅ Indexable |
| San Francisco | Gualivá | ~65 km | https://www.manueltorres.com.co/fotografo-bodas-san-francisco | ✅ Indexable |
| Tausa | Ubaté | ~65 km | https://www.manueltorres.com.co/fotografo-bodas-tausa | No (noindex) |
| Granada | Sumapaz | ~68 km | https://www.manueltorres.com.co/fotografo-bodas-granada | No (noindex) |
| Cachipay | Tequendama | ~68 km | https://www.manueltorres.com.co/fotografo-bodas-cachipay | No (noindex) |
| Manta | Almeidas | ~70 km | https://www.manueltorres.com.co/fotografo-bodas-manta | No (noindex) |
| La Vega | Gualivá | ~70 km | https://www.manueltorres.com.co/fotografo-bodas-la-vega | ✅ Indexable |
| Fosca | Oriente | ~70 km | https://www.manueltorres.com.co/fotografo-bodas-fosca | No (noindex) |
| Sasaima | Gualivá | ~75 km | https://www.manueltorres.com.co/fotografo-bodas-sasaima | No (noindex) |
| Guatavita | Guavio | ~75 km | https://www.manueltorres.com.co/fotografo-bodas-guatavita | No (noindex) |
| Quetame | Oriente | ~75 km | https://www.manueltorres.com.co/fotografo-bodas-quetame | No (noindex) |
| Tibacuy | Sumapaz | ~75 km | https://www.manueltorres.com.co/fotografo-bodas-tibacuy | No (noindex) |
| Pasca | Sumapaz | ~75 km | https://www.manueltorres.com.co/fotografo-bodas-pasca | No (noindex) |
| Sutatausa | Ubaté | ~75 km | https://www.manueltorres.com.co/fotografo-bodas-sutatausa | No (noindex) |
| Chocontá | Almeidas | ~76 km | https://www.manueltorres.com.co/fotografo-bodas-choconta | No (noindex) |
| Cucunubá | Ubaté | ~78 km | https://www.manueltorres.com.co/fotografo-bodas-cucunuba | No (noindex) |
| Supatá | Gualivá | ~80 km | https://www.manueltorres.com.co/fotografo-bodas-supata | No (noindex) |
| Arbeláez | Sumapaz | ~82 km | https://www.manueltorres.com.co/fotografo-bodas-arbelaez | No (noindex) |
| Machetá | Almeidas | ~85 km | https://www.manueltorres.com.co/fotografo-bodas-macheta | No (noindex) |
| Quipile | Tequendama | ~85 km | https://www.manueltorres.com.co/fotografo-bodas-quipile | No (noindex) |
| Anapoima | Tequendama | ~86 km | https://www.manueltorres.com.co/fotografo-bodas-anapoima | ✅ Indexable |
| Pacho | Rionegro | ~87 km | https://www.manueltorres.com.co/fotografo-bodas-pacho | No (noindex) |
| Villeta | Gualivá | ~90 km | https://www.manueltorres.com.co/fotografo-bodas-villeta | ✅ Indexable |
| Gachetá | Guavio | ~90 km | https://www.manueltorres.com.co/fotografo-bodas-gacheta | No (noindex) |
| Ubaté | Ubaté | ~90 km | https://www.manueltorres.com.co/fotografo-bodas-ubate | No (noindex) |
| San Bernardo | Sumapaz | ~92 km | https://www.manueltorres.com.co/fotografo-bodas-san-bernardo | No (noindex) |
| Villapinzón | Almeidas | ~93 km | https://www.manueltorres.com.co/fotografo-bodas-villapinzon | No (noindex) |
| Nocaima | Gualivá | ~95 km | https://www.manueltorres.com.co/fotografo-bodas-nocaima | No (noindex) |
| Nimaima | Gualivá | ~95 km | https://www.manueltorres.com.co/fotografo-bodas-nimaima | No (noindex) |
| Guayabetal | Oriente | ~95 km | https://www.manueltorres.com.co/fotografo-bodas-guayabetal | No (noindex) |
| San Cayetano | Rionegro | ~95 km | https://www.manueltorres.com.co/fotografo-bodas-san-cayetano | No (noindex) |
| Pandi | Sumapaz | ~95 km | https://www.manueltorres.com.co/fotografo-bodas-pandi | No (noindex) |
| Viotá | Tequendama | ~95 km | https://www.manueltorres.com.co/fotografo-bodas-viota | No (noindex) |
| Apulo | Tequendama | ~95 km | https://www.manueltorres.com.co/fotografo-bodas-apulo | No (noindex) |
| Tibirita | Almeidas | ~100 km | https://www.manueltorres.com.co/fotografo-bodas-tibirita | No (noindex) |
| Vergara | Gualivá | ~100 km | https://www.manueltorres.com.co/fotografo-bodas-vergara | No (noindex) |
| Quebradanegra | Gualivá | ~100 km | https://www.manueltorres.com.co/fotografo-bodas-quebradanegra | No (noindex) |
| Gama | Guavio | ~100 km | https://www.manueltorres.com.co/fotografo-bodas-gama | No (noindex) |
| Gutiérrez | Oriente | ~100 km | https://www.manueltorres.com.co/fotografo-bodas-gutierrez | No (noindex) |
| Venecia | Sumapaz | ~100 km | https://www.manueltorres.com.co/fotografo-bodas-venecia | No (noindex) |
| Guachetá | Ubaté | ~100 km | https://www.manueltorres.com.co/fotografo-bodas-guacheta | No (noindex) |
| Carmen de Carupa | Ubaté | ~100 km | https://www.manueltorres.com.co/fotografo-bodas-carmen-de-carupa | No (noindex) |
| Lenguazaque | Ubaté | ~100 km | https://www.manueltorres.com.co/fotografo-bodas-lenguazaque | No (noindex) |
| Fúquene | Ubaté | ~100 km | https://www.manueltorres.com.co/fotografo-bodas-fuquene | No (noindex) |
| Tocaima | Alto Magdalena | ~104 km | https://www.manueltorres.com.co/fotografo-bodas-tocaima | No (noindex) |
| Útica | Gualivá | ~105 km | https://www.manueltorres.com.co/fotografo-bodas-utica | No (noindex) |
| La Peña | Gualivá | ~110 km | https://www.manueltorres.com.co/fotografo-bodas-la-pena | No (noindex) |
| Junín | Guavio | ~110 km | https://www.manueltorres.com.co/fotografo-bodas-junin | No (noindex) |
| Guayabal de Síquima | Magdalena Centro | ~110 km | https://www.manueltorres.com.co/fotografo-bodas-guayabal-de-siquima | No (noindex) |
| El Peñón | Rionegro | ~110 km | https://www.manueltorres.com.co/fotografo-bodas-el-penon | No (noindex) |
| Villagómez | Rionegro | ~110 km | https://www.manueltorres.com.co/fotografo-bodas-villagomez | No (noindex) |
| Susa | Ubaté | ~110 km | https://www.manueltorres.com.co/fotografo-bodas-susa | No (noindex) |
| Nilo | Alto Magdalena | ~112 km | https://www.manueltorres.com.co/fotografo-bodas-nilo | No (noindex) |
| Vianí | Magdalena Centro | ~115 km | https://www.manueltorres.com.co/fotografo-bodas-viani | No (noindex) |
| Simijaca | Ubaté | ~115 km | https://www.manueltorres.com.co/fotografo-bodas-simijaca | No (noindex) |
| Agua de Dios | Alto Magdalena | ~117 km | https://www.manueltorres.com.co/fotografo-bodas-agua-de-dios | No (noindex) |
| Guaduas | Bajo Magdalena | ~117 km | https://www.manueltorres.com.co/fotografo-bodas-guaduas | ✅ Indexable |
| Gachalá | Guavio | ~120 km | https://www.manueltorres.com.co/fotografo-bodas-gachala | No (noindex) |
| Bituima | Magdalena Centro | ~120 km | https://www.manueltorres.com.co/fotografo-bodas-bituima | No (noindex) |
| La Palma | Rionegro | ~120 km | https://www.manueltorres.com.co/fotografo-bodas-la-palma | No (noindex) |
| Ubalá | Guavio | ~130 km | https://www.manueltorres.com.co/fotografo-bodas-ubala | No (noindex) |
| San Juan de Rioseco | Magdalena Centro | ~130 km | https://www.manueltorres.com.co/fotografo-bodas-san-juan-de-rioseco | No (noindex) |
| Topaipí | Rionegro | ~130 km | https://www.manueltorres.com.co/fotografo-bodas-topaipi | No (noindex) |
| Girardot | Alto Magdalena | ~134 km | https://www.manueltorres.com.co/fotografo-bodas-girardot | ✅ Indexable |
| Ricaurte | Alto Magdalena | ~134 km | https://www.manueltorres.com.co/fotografo-bodas-ricaurte | No (noindex) |
| Paime | Rionegro | ~135 km | https://www.manueltorres.com.co/fotografo-bodas-paime | No (noindex) |
| Chaguaní | Magdalena Centro | ~140 km | https://www.manueltorres.com.co/fotografo-bodas-chaguani | No (noindex) |
| Cabrera | Sumapaz | ~140 km | https://www.manueltorres.com.co/fotografo-bodas-cabrera | No (noindex) |
| Guataquí | Alto Magdalena | ~145 km | https://www.manueltorres.com.co/fotografo-bodas-guataqui | No (noindex) |
| Pulí | Magdalena Centro | ~145 km | https://www.manueltorres.com.co/fotografo-bodas-puli | No (noindex) |
| Jerusalén | Alto Magdalena | ~150 km | https://www.manueltorres.com.co/fotografo-bodas-jerusalen | No (noindex) |
| Beltrán | Magdalena Centro | ~150 km | https://www.manueltorres.com.co/fotografo-bodas-beltran | No (noindex) |
| Medina | Medina | ~150 km | https://www.manueltorres.com.co/fotografo-bodas-medina | No (noindex) |
| Nariño | Alto Magdalena | ~160 km | https://www.manueltorres.com.co/fotografo-bodas-narino | No (noindex) |
| Yacopí | Rionegro | ~160 km | https://www.manueltorres.com.co/fotografo-bodas-yacopi | No (noindex) |
| Caparrapí | Bajo Magdalena | ~170 km | https://www.manueltorres.com.co/fotografo-bodas-caparrapi | No (noindex) |
| Puerto Salgar | Bajo Magdalena | ~193 km | https://www.manueltorres.com.co/fotografo-bodas-puerto-salgar | No (noindex) |
| Paratebueno | Medina | ~211 km | https://www.manueltorres.com.co/fotografo-bodas-paratebueno | No (noindex) |

### Fase 3 — Destinos campestres a ~200 km fuera de Cundinamarca (17 municipios, 6 activados por mercado real de bodas)

| Municipio | Provincia | Distancia aprox. | URL | Indexable |
|---|---|---|---|---|
| Melgar | Tolima | ~98 km | https://www.manueltorres.com.co/fotografo-bodas-melgar | ✅ Indexable |
| Villavicencio | Meta | ~116 km | https://www.manueltorres.com.co/fotografo-bodas-villavicencio | ✅ Indexable |
| Restrepo | Meta | ~130 km | https://www.manueltorres.com.co/fotografo-bodas-restrepo | No (noindex) |
| Tunja | Boyacá | ~137 km | https://www.manueltorres.com.co/fotografo-bodas-tunja | No (noindex) |
| Acacías | Meta | ~145 km | https://www.manueltorres.com.co/fotografo-bodas-acacias | No (noindex) |
| Cumaral | Meta | ~148 km | https://www.manueltorres.com.co/fotografo-bodas-cumaral | No (noindex) |
| Flandes | Tolima | ~152 km | https://www.manueltorres.com.co/fotografo-bodas-flandes | No (noindex) |
| Espinal | Tolima | ~155 km | https://www.manueltorres.com.co/fotografo-bodas-espinal | No (noindex) |
| Sáchica | Boyacá | ~170 km | https://www.manueltorres.com.co/fotografo-bodas-sachica | No (noindex) |
| Villa de Leyva | Boyacá | ~177 km | https://www.manueltorres.com.co/fotografo-bodas-villa-de-leyva | ✅ Indexable |
| Paipa | Boyacá | ~187 km | https://www.manueltorres.com.co/fotografo-bodas-paipa | ✅ Indexable |
| Ráquira | Boyacá | ~192 km | https://www.manueltorres.com.co/fotografo-bodas-raquira | No (noindex) |
| Ibagué | Tolima | ~198 km | https://www.manueltorres.com.co/fotografo-bodas-ibague | ✅ Indexable |
| Duitama | Boyacá | ~200 km | https://www.manueltorres.com.co/fotografo-bodas-duitama | ✅ Indexable |
| Tibasosa | Boyacá | ~200 km | https://www.manueltorres.com.co/fotografo-bodas-tibasosa | No (noindex) |
| Nobsa | Boyacá | ~210 km | https://www.manueltorres.com.co/fotografo-bodas-nobsa | No (noindex) |
| Sogamoso | Boyacá | ~215 km | https://www.manueltorres.com.co/fotografo-bodas-sogamoso | No (noindex) |

### Totales

- Páginas de ubicación totales: 134
- Indexables ahora mismo: 37 (21 Bogotá+Sabana + 10 Cundinamarca + 6 destinos campestres)
- Directorios de región: 3

---

## 8. SEO de marca y términos genéricos (instalada la skill `claude-seo`)

Este trabajo (pSEO por municipio) cubría solo búsquedas de cola larga tipo "fotógrafo de bodas + [pueblo]". Faltaba lo que la mayoría de gente realmente busca primero: el nombre de Manuel, y "fotógrafo de bodas Bogotá" a secas. Instalé la skill [claude-seo](https://github.com/AgricIDaniel/claude-seo) (suite completa: `seo-local`, `seo-schema`, `seo-technical`, `seo-page`, etc.) y apliqué directamente sobre el sitio — no solo generé un informe — lo que identifica como negocio de área de servicio (SAB, sin dirección física fija, el fotógrafo se desplaza al venue).

### Qué se cerró

1. **Página de Bogotá — el hueco más grande.** Bogotá D.C. no es uno de los 116 municipios de Cundinamarca (es su propio Distrito Capital), así que nunca había quedado cubierta por la investigación de municipios. Es probablemente la palabra clave de mayor volumen de todas y no tenía página. Ahora existe `/fotografo-bodas-bogota`, redactada a mano, con venues reales de la ciudad (Haciendas Trinity Club, Hacienda Común y Silvestre, Hacienda Chic, cerro de Monserrate) — indexable desde ya, primera en la lista de la Sabana.
2. **Schema de marca en todo el sitio.** Antes el `LocalBusiness` solo aparecía en las páginas de municipio. Ahora hay un JSON-LD `LocalBusiness` en el layout raíz (todas las páginas), con un `Person` anidado como `founder` ("Manuel Torres", fotógrafo de bodas y eventos sociales) — es la señal explícita que le falta a Google/IA para asociar tu nombre con el negocio. Incluye `sameAs` a Instagram y coordenadas geográficas de Bogotá.
3. **Metadata con las palabras clave que faltaban.** `SITE.description` (usado en meta description, Open Graph, y el párrafo del hero) ahora dice "Fotógrafo de bodas en Bogotá, Colombia..." en vez del texto genérico anterior sin ubicación. El título por defecto del sitio pasó de `Manuel Torres · Fotografía de bodas` a `Manuel Torres · Fotógrafo de Bodas en Bogotá, Colombia`. Se agregó `keywords` con las variantes de marca y ciudad.
4. **NAP visible en el footer.** Antes solo había un botón de WhatsApp (deep link, no un teléfono legible). Ahora el footer muestra el teléfono en texto plano con enlace `tel:`, consistente con el que aparece en el schema — esto es lo que la skill llama "NAP consistency", uno de los factores de SEO local con más peso.
5. **llms.txt actualizado** para incluir la página de Bogotá en "Páginas principales".

### Qué NO se hizo (fuera del alcance del código)

La skill también recomienda cosas que dependen de tus cuentas externas, no del sitio — no las hice porque no tengo acceso:
- Reclamar/optimizar **Google Business Profile** (32% del peso del local pack, el factor #1).
- Reclamar **Bing Places** (alimenta a ChatGPT/Copilot/Alexa) y **Apple Business Connect**.
- Estrategia de **reseñas** (10+ reseñas es el umbral donde empiezan a pesar).
- Citaciones en directorios (Yelp, BBB) — poco relevantes para Colombia, pero el equivalente local sería perfiles en bodas.com.co / matrimonio.com.co.

Si en algún momento quieres, te guío paso a paso para configurar el Google Business Profile — es probablemente el siguiente paso de mayor impacto para las búsquedas de marca y "cerca de mí".

## 9. Versión en inglés (i18n)

- **Español sin cambios de URL**: todas las URLs históricas (`/`, `/portafolio`, `/contacto`, `/fotografo-bodas-*`) siguen exactamente igual — no se pierde posicionamiento. El español es el idioma por defecto y el `x-default`.
- **Inglés bajo `/en`** con slugs traducidos: `/en`, `/en/portfolio`, `/en/contact`, `/en/wedding-photographer-[municipio]`, más una landing solo en inglés para parejas extranjeras: `/en/destination-wedding-photographer-colombia`.
- **hreflang recíproco** (`es`, `en`, `x-default`) en cada página y en `sitemap.xml`; canonical propio por idioma. Mapa de rutas único en `src/i18n/routes.ts`.
- **Misma regla de indexación en ambos idiomas**: un municipio en `noindex` en español también lo está en inglés.
- **Idioma automático** (`src/proxy.ts` + `src/i18n/negotiate.ts`): si el navegador prefiere inglés y la persona no ha elegido idioma, una URL en español redirige (307, temporal) a su equivalente en inglés. Nunca redirige a bots ni URLs `/en`; la elección manual (selector en el menú y el footer) se guarda en la cookie `NEXT_LOCALE` y manda sobre el navegador.
- **Textos**: interfaz en `src/i18n/dictionaries/`; contenido de la Sabana y regiones en `src/data/en/locations-sabana.en.ts`; datos de municipios fase 2/3 en `src/data/en/town-facts.en.ts`; generador en inglés en `src/lib/locationContent.en.ts`.

### Ronda 3 — activada

Sasaima, Guatavita, Silvania, Arbeláez, Tunja, Sogamoso y Restrepo pasan a `indexable: true` (en ambos idiomas) a pedido del cliente.

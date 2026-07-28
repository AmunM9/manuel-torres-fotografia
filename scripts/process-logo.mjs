/**
 * Procesa el logo de marca (monograma "M") y genera los assets del sitio:
 *  - public/logo-monogram.png          silueta tinta con FONDO TRANSPARENTE
 *  - src/app/icon.png                  favicon 512x512 (monograma sobre marfil)
 *  - src/app/apple-icon.png            apple touch icon 180x180
 *
 * El origen es un JPEG negro sobre blanco a sangre (el trazo de la M toca los
 * cuatro bordes, no hay margen que recortar). La transparencia se obtiene
 * usando la luminancia invertida como canal alfa: negro → opaco, blanco →
 * transparente, con bordes suaves (antialias preservado).
 *
 * Como el origen es JPEG (con pérdida), antes de usar esa luminancia como alfa
 * se estira con `linear()` para limpiar el ruido de compresión: todo lo más
 * claro que ~92% de blanco queda 100% transparente y todo lo más oscuro que
 * ~12% queda 100% opaco. Sin eso quedaría un halo gris alrededor del trazo.
 *
 * Uso:  node scripts/process-logo.mjs
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SRC = "Recursos/Logo-2.jpg";
const INK = { r: 23, g: 20, b: 15 }; // --color-ink
const MARFIL = { r: 250, g: 247, b: 242 }; // --color-bg

// Estiramiento del alfa para limpiar el ruido del JPEG (ver nota de arriba).
const ALPHA_FLOOR = 20; // por debajo de esto (sobre blanco) → transparente
const ALPHA_CEIL = 235; // por encima de esto → opaco
const ALPHA_SCALE = 255 / (ALPHA_CEIL - ALPHA_FLOOR);

/** Convierte un original negro-sobre-blanco en una silueta tinta con alfa. */
async function inkWithAlpha(buffer) {
  const { width, height } = await sharp(buffer).metadata();
  const alpha = await sharp(buffer)
    .greyscale()
    .negate() // tinta → claro, fondo → oscuro
    .linear(ALPHA_SCALE, -ALPHA_FLOOR * ALPHA_SCALE)
    .toColourspace("b-w")
    .raw()
    .toBuffer();

  return sharp({ create: { width, height, channels: 3, background: INK } })
    .joinChannel(alpha, { raw: { width, height, channels: 1 } })
    .png()
    .toBuffer();
}

async function run() {
  await mkdir("public", { recursive: true });

  // 1) Monograma transparente. El original ya viene a sangre, así que no se
  //    recorta nada: recortar más mutilaría el trazo.
  const mono = await inkWithAlpha(await sharp(SRC).png().toBuffer());
  await sharp(mono).toFile("public/logo-monogram.png");

  // 2) Favicon: monograma centrado sobre un cuadrado marfil con aire alrededor.
  const meta = await sharp(mono).metadata();
  const pad = Math.round(Math.max(meta.width, meta.height) * 0.18);
  const side = Math.max(meta.width, meta.height) + pad * 2;
  const square = await sharp({
    create: { width: side, height: side, channels: 4, background: { ...MARFIL, alpha: 1 } },
  })
    .composite([{ input: mono, gravity: "center" }])
    .png()
    .toBuffer();

  await sharp(square).resize(512, 512).png().toFile("src/app/icon.png");
  await sharp(square).resize(180, 180).png().toFile("src/app/apple-icon.png");

  console.log(`✓ monograma ${meta.width}x${meta.height} + favicons generados`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

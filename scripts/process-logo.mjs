/**
 * Procesa Recursos/Logo.png (negro sobre blanco, sin alfa) y genera versiones
 * con FONDO TRANSPARENTE y color tinta (#17140f):
 *  - public/logo-wordmark.png  (logo completo)
 *  - public/logo-monogram.png  (solo el monograma "M.")
 *  - src/app/icon.png, src/app/apple-icon.png (favicon: monograma sobre marfil)
 *
 * La transparencia se obtiene usando la luminancia invertida como canal alfa:
 * el negro del logo → opaco, el blanco del fondo → transparente (bordes suaves).
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SRC = "Recursos/Logo.png";
const INK = { r: 23, g: 20, b: 15 };
const MARFIL = { r: 250, g: 247, b: 242 };

/** Convierte un buffer negro-sobre-blanco en una silueta tinta con alfa. */
async function inkWithAlpha(buffer) {
  const { width, height } = await sharp(buffer).metadata();
  const alpha = await sharp(buffer)
    .greyscale()
    .negate()
    .toColourspace("b-w")
    .raw()
    .toBuffer();
  return sharp({
    create: { width, height, channels: 3, background: INK },
  })
    .joinChannel(alpha, { raw: { width, height, channels: 1 } })
    .png()
    .toBuffer();
}

async function run() {
  await mkdir("public", { recursive: true });

  // 1) Wordmark completo recortado → tinta transparente
  const wordmarkTrim = await sharp(SRC).trim({ threshold: 10 }).png().toBuffer();
  const wordmark = await inkWithAlpha(wordmarkTrim);
  await sharp(wordmark).toFile("public/logo-wordmark.png");

  // 2) Monograma: recorta zona izquierda, recorta márgenes → tinta transparente
  const monoRegion = await sharp(SRC)
    .extract({ left: 0, top: 180, width: 920, height: 720 })
    .png()
    .toBuffer();
  const monoTrim = await sharp(monoRegion).trim({ threshold: 10 }).png().toBuffer();
  const mono = await inkWithAlpha(monoTrim);
  await sharp(mono).toFile("public/logo-monogram.png");

  // 3) Favicon: monograma centrado sobre cuadrado marfil con padding
  const meta = await sharp(mono).metadata();
  const pad = Math.round(Math.max(meta.width, meta.height) * 0.22);
  const side = Math.max(meta.width, meta.height) + pad * 2;
  const square = await sharp({
    create: { width: side, height: side, channels: 4, background: { ...MARFIL, alpha: 1 } },
  })
    .composite([{ input: mono, gravity: "center" }])
    .png()
    .toBuffer();

  await sharp(square).resize(512, 512).png().toFile("src/app/icon.png");
  await sharp(square).resize(180, 180).png().toFile("src/app/apple-icon.png");

  console.log("✓ logo transparente. monograma:", meta.width, "x", meta.height);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

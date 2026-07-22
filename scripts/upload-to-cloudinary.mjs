/**
 * Subida única a Cloudinary + generación del manifiesto src/data/weddings.json.
 * Uso:  node scripts/upload-to-cloudinary.mjs
 * Lee credenciales de .env.local (nunca se commitea).
 */
import "dotenv/config";
import { config as loadEnv } from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { readdir, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

loadEnv({ path: ".env.local" });

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const ROOT = "manuel-torres";
const RESOURCES = "Recursos";

const WEDDINGS = [
  { slug: "paola-andres", dir: "Paola & Andrés", title: "Paola & Andrés", location: "" },
  { slug: "paula-victor", dir: "Paula & Victor", title: "Paula & Victor", location: "" },
  { slug: "sofia-diego", dir: "Sofía & Diego", title: "Sofía & Diego", location: "" },
];

/** ordena _MAN6098.jpg de forma numérica ascendente */
const byNumber = (a, b) => {
  const n = (s) => parseInt(s.replace(/\D/g, ""), 10) || 0;
  return n(a) - n(b);
};

async function pool(items, size, worker) {
  const results = [];
  let i = 0;
  const runners = Array.from({ length: size }, async () => {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await worker(items[idx], idx);
    }
  });
  await Promise.all(runners);
  return results;
}

async function uploadOne(filePath, folder) {
  const res = await cloudinary.uploader.upload(filePath, {
    folder,
    use_filename: true,
    unique_filename: false,
    overwrite: false,
    resource_type: "image",
  });
  return { id: res.public_id, w: res.width, h: res.height };
}

async function run() {
  const weddings = [];

  for (const w of WEDDINGS) {
    const dir = path.join(RESOURCES, w.dir);
    const files = (await readdir(dir))
      .filter((f) => /\.jpe?g$/i.test(f))
      .sort(byNumber);

    console.log(`\n▲ ${w.title} — ${files.length} fotos`);
    const folder = `${ROOT}/${w.slug}`;

    const photos = await pool(files, 5, async (file, idx) => {
      const p = await uploadOne(path.join(dir, file), folder);
      process.stdout.write(`  ${idx + 1}/${files.length}\r`);
      return p;
    });

    weddings.push({
      slug: w.slug,
      title: w.title,
      location: w.location,
      cover: photos[0].id,
      photos,
    });
    console.log(`  ✓ ${photos.length} subidas`);
  }

  // Foto personal para "Sobre mí"
  console.log("\n▲ Foto personal");
  const personal = await uploadOne(
    path.join(RESOURCES, "Foto Personal.jpeg"),
    `${ROOT}/site`,
  );
  console.log(`  ✓ ${personal.id}`);

  const manifest = {
    generatedAt: new Date().toISOString(),
    site: { personal },
    weddings,
  };

  await mkdir("src/data", { recursive: true });
  await writeFile(
    "src/data/weddings.json",
    JSON.stringify(manifest, null, 2) + "\n",
  );
  console.log("\n✅ Manifiesto escrito en src/data/weddings.json");
}

run().catch((err) => {
  console.error("\n✗ Error:", err.message);
  process.exit(1);
});

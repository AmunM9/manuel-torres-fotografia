# Manuel Torres · Fotografía de bodas

Sitio de portafolio construido con **Next.js (App Router) + Tailwind CSS v4**, imágenes servidas por **Cloudinary** y desplegado en **Vercel**.

Estética: minimalista tipo Apple / LunaUI — tipografía redondeada (Quicksand + Nunito Sans), paleta marfil cálido, fotos con esquinas suaves y proporciones áureas. La fotografía manda; el texto acompaña.

## Estructura

- `/` — Landing (hero, un vistazo, sobre mí, bodas reales, contacto)
- `/portafolio` — Las 3 bodas
- `/portafolio/[slug]` — Galería masonry + lightbox (abrir y navegar una a una)

## Desarrollo

```bash
npm install
npm run dev
```

Requiere `.env.local` (copia desde `.env.example`).

## Variables de entorno

```bash
cp .env.example .env.local
```

Variables necesarias:

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...   # público
CLOUDINARY_API_KEY=...                  # solo servidor / script de subida
CLOUDINARY_API_SECRET=...               # solo servidor / script de subida — nunca NEXT_PUBLIC_*
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
```

> `.env.local` y el resto de `.env*` están en `.gitignore`. No subas credenciales al repo.

## Fotos (Cloudinary)

Las fotos ya están subidas. Para volver a subir desde `Recursos/`:

```bash
node scripts/upload-to-cloudinary.mjs   # sube y regenera src/data/weddings.json
```

El manifiesto `src/data/weddings.json` es la fuente de datos de la app (public_id + dimensiones).

## Personalización rápida

- **Textos, redes, dominio:** `src/lib/site.ts`
- **Portadas de cada boda:** `COVER_OVERRIDES` en `src/lib/weddings.ts`
- **Foto del hero / destacada:** `HERO_ID` en `src/app/page.tsx` y `FEATURED_ID` en `src/components/home/Featured.tsx`
- **Colores / tipografía / radios:** `src/app/globals.css`
- **Logo:** `node scripts/process-logo.mjs` (recorta el logo y genera favicon)

## Deploy en Vercel

1. Sube el repo a GitHub e impórtalo en Vercel (o `vercel` con la CLI).
2. En **Settings → Environment Variables** añade las 4 variables de arriba.
3. Deploy. Actualiza `NEXT_PUBLIC_SITE_URL` con el dominio final (para OG y sitemap).

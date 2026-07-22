/**
 * Configuración global del sitio — una sola fuente de verdad.
 * Edita aquí textos, redes y la URL de producción.
 */
const whatsappNumber = "573112204004"; // Colombia (+57) 311 220 4004
const whatsappMessage =
  "Hola Manuel, vi tu portafolio web y me gustaría más información sobre tu fotografía de bodas.";

export const SITE = {
  name: "Manuel Torres",
  // Cambiar por el dominio real tras el deploy en Vercel.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.manueltorres.com.co",
  description:
    "Fotografía de bodas editorial y cinematográfica. Historias reales contadas con luz, emoción y detalle.",
  // Frase secundaria — el texto acompaña, la foto manda.
  tagline: "Guardo para siempre lo que dura un instante.",
  bookingNote: "Tomando reservas para 2026 / 27",
  instagram: "https://www.instagram.com/manueltorresfotografia",
  instagramHandle: "@manueltorresfotografia",
  whatsapp: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
} as const;

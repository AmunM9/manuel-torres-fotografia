/** Textos de interfaz en español (idioma por defecto del sitio). */
export const es = {
  meta: {
    brandTitle: "Manuel Torres · Fotógrafo de Bodas en Bogotá, Colombia",
    description:
      "Fotógrafo de bodas en Bogotá, Colombia, con un estilo editorial y cinematográfico. Historias reales contadas con luz, emoción y detalle, en Bogotá, la Sabana y toda Cundinamarca.",
    keywords: [
      "fotógrafo de bodas Bogotá",
      "fotógrafo de bodas Colombia",
      "Manuel Torres fotógrafo",
      "Manuel Torres fotografía",
      "fotografía de bodas Bogotá",
      "fotógrafo de bodas Cundinamarca",
    ],
    ogAlt: "Manuel Torres · Fotografía de bodas",
  },
  site: {
    bookingNote: "Tomando reservas para 2026 / 27",
    whatsappMessage:
      "Hola Manuel, vi tu portafolio web y me gustaría más información sobre tu fotografía de bodas.",
    jobTitle: "Fotógrafo de bodas y eventos sociales",
  },
  nav: {
    home: "Principal",
    portfolio: "Portafolio",
    contact: "Contacto",
    homeAria: "Manuel Torres — inicio",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    language: "Idioma",
  },
  footer: {
    tagline: "Fotógrafo de bodas en Bogotá y Cundinamarca.",
    rights: "Fotografía de bodas",
  },
  hero: {
    pill: "Fotografía de bodas",
    titleA: "Guardo para siempre",
    titleB: "lo que dura",
    titleAccent: "un instante",
    ctaPortfolio: "Ver portafolio",
    ctaContact: "Escríbeme",
    photoAlt: "Fotografía de boda por Manuel Torres",
  },
  glimpse: {
    eyebrow: "Un vistazo a mi trabajo",
    title: "Momentos que permanecen",
  },
  about: {
    pill: "Sobre mí",
    title: "Soy Manuel Torres",
    p1: "Soy fotógrafo de bodas y eventos sociales con más de cinco años de experiencia. Busco imágenes elegantes y pulcras, capaces de contar una historia por sí solas.",
    p2: "Me gusta acompañar cada celebración sin interrumpirla, para que lo que quede en las fotografías sea justo lo que se vivió: auténtico, cuidado y lleno de emoción.",
    portraitAlt: "Manuel Torres, fotógrafo de bodas",
  },
  featured: {
    title: "Bodas reales, historias verdaderas",
    text: "Cada boda es un universo propio lleno de emociones y detalles irrepetibles. Descúbrelas en el portafolio.",
    cta: "Ver portafolio",
  },
  portfolio: {
    metaTitle: "Portafolio",
    metaDescription:
      "Bodas reales fotografiadas por Manuel Torres. Historias verdaderas contadas con un enfoque editorial.",
    pill: "Bodas reales",
    title: "Portafolio",
    intro: "Cada boda es un universo propio. Historias verdaderas, guardadas en imágenes.",
    photos: (n: number) => `${n} fotografías`,
    weddingOf: (title: string) => `Boda de ${title}`,
    weddingDescription: (title: string) =>
      `Boda de ${title} — fotografía de bodas por Manuel Torres.`,
  },
  contact: {
    metaTitle: "Contacto",
    metaDescription: (note: string) => `Escríbeme para tu boda. ${note}.`,
    pill: "Contacto",
    title: "Cuéntame tu historia",
    text: (note: string) =>
      `${note}. Escríbeme y hablemos de tu boda: fechas, lugar y todo lo que imaginas.`,
    whatsappSub: "Respuesta rápida",
  },
  gallery: {
    open: (i: number, n: number) => `Abrir foto ${i} de ${n}`,
    photoAlt: (title: string, i: number) => `${title} — fotografía ${i}`,
  },
  location: {
    metaTitle: (name: string) => `Fotógrafo de Bodas en ${name} | Manuel Torres Fotografía`,
    h1: (name: string) => `Fotógrafo de Bodas en ${name}`,
    portfolioEyebrow: "Portafolio",
    portfolioTitle: (name: string) => `Bodas reales, en el mismo estilo que llevo a ${name}`,
    ownPhotos: (name: string) => `Estas son fotografías tomadas en bodas reales en ${name}.`,
    noOwnPhotos: (name: string) =>
      `Todavía no tengo fotografías propias tomadas específicamente en ${name}. Estas son bodas reales de mi portafolio en la región — el mismo estilo, luz y cuidado que llevaría a tu boda ahí.`,
    galleryTitle: (name: string) => `Fotografía de bodas cerca de ${name}`,
    contactEyebrow: "Contacto",
    contactTitle: (name: string) => `Cuéntame de tu boda en ${name}`,
    nearby: (name: string) => `También sirvo bodas cerca de ${name}`,
    fullPortfolio: "Ver portafolio completo",
    allInRegion: (region: string) => `Todos los municipios de ${region}`,
    serviceType: "Fotografía de bodas y eventos sociales",
  },
  region: {
    pill: "Fotógrafo de bodas",
    count: (n: number) => `${n} municipio${n === 1 ? "" : "s"}`,
    distance: (km: number) => `~${km} km de Bogotá`,
    otherRegions: "Otras zonas",
    portfolio: "Ver portafolio",
  },
  notFound: {
    title: "Página no encontrada",
    text: "La página que buscas no existe o cambió de dirección.",
    cta: "Volver al inicio",
  },
};

export type Dictionary = typeof es;

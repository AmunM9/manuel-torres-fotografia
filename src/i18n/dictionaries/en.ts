import type { Dictionary } from "./es";

/** Interface copy in English (served under /en). */
export const en: Dictionary = {
  meta: {
    brandTitle: "Manuel Torres · Wedding Photographer in Bogotá, Colombia",
    description:
      "Wedding photographer based in Bogotá, Colombia, with an editorial, cinematic style. Real stories told through light, emotion and detail — in Bogotá, the Sabana, Cundinamarca and destination weddings across Colombia.",
    keywords: [
      "wedding photographer Bogota",
      "wedding photographer Colombia",
      "destination wedding photographer Colombia",
      "Colombia destination wedding",
      "Bogota wedding photography",
      "Villa de Leyva wedding photographer",
      "Manuel Torres photographer",
    ],
    ogAlt: "Manuel Torres · Wedding Photography",
  },
  site: {
    bookingNote: "Now booking 2026 / 27",
    whatsappMessage:
      "Hi Manuel, I saw your portfolio online and would love more information about your wedding photography.",
    jobTitle: "Wedding and social event photographer",
  },
  nav: {
    home: "Home",
    portfolio: "Portfolio",
    contact: "Contact",
    homeAria: "Manuel Torres — home",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
  },
  footer: {
    tagline: "Wedding photographer in Bogotá and across Colombia.",
    rights: "Wedding Photography",
  },
  hero: {
    pill: "Wedding photography",
    titleA: "I keep forever",
    titleB: "what lasts",
    titleAccent: "only a moment",
    ctaPortfolio: "View portfolio",
    ctaContact: "Get in touch",
    photoAlt: "Wedding photograph by Manuel Torres",
  },
  glimpse: {
    eyebrow: "A glimpse of my work",
    title: "Moments that stay",
  },
  about: {
    pill: "About me",
    title: "I'm Manuel Torres",
    p1: "I'm a wedding and social event photographer with more than five years of experience. I look for elegant, clean images that can tell a story on their own.",
    p2: "I like to be part of each celebration without interrupting it, so that what remains in the photographs is exactly what was lived: authentic, thoughtful and full of emotion.",
    portraitAlt: "Manuel Torres, wedding photographer",
  },
  featured: {
    title: "Real weddings, true stories",
    text: "Every wedding is a world of its own, full of emotions and details that never happen twice. Discover them in the portfolio.",
    cta: "View portfolio",
  },
  portfolio: {
    metaTitle: "Portfolio",
    metaDescription:
      "Real weddings photographed by Manuel Torres in Colombia. True stories told with an editorial approach.",
    pill: "Real weddings",
    title: "Portfolio",
    intro: "Every wedding is a world of its own. True stories, kept in images.",
    photos: (n: number) => `${n} photographs`,
    weddingOf: (title: string) => `${title}'s wedding`,
    weddingDescription: (title: string) =>
      `${title}'s wedding — wedding photography by Manuel Torres in Colombia.`,
  },
  contact: {
    metaTitle: "Contact",
    metaDescription: (note: string) =>
      `Get in touch about your wedding in Colombia. ${note}.`,
    pill: "Contact",
    title: "Tell me your story",
    text: (note: string) =>
      `${note}. Write to me and let's talk about your wedding: dates, venue and everything you have in mind. I'm happy to talk in English.`,
    whatsappSub: "Quick reply",
  },
  gallery: {
    open: (i: number, n: number) => `Open photo ${i} of ${n}`,
    photoAlt: (title: string, i: number) => `${title} — photograph ${i}`,
  },
  location: {
    metaTitle: (name: string) => `Wedding Photographer in ${name}, Colombia`,
    h1: (name: string) => `Wedding Photographer in ${name}`,
    portfolioEyebrow: "Portfolio",
    portfolioTitle: (name: string) => `Real weddings, in the same style I'd bring to ${name}`,
    ownPhotos: (name: string) => `These photographs were taken at real weddings in ${name}.`,
    noOwnPhotos: (name: string) =>
      `I don't yet have photographs taken specifically in ${name}. These are real weddings from my portfolio in the region — the same style, light and care I'd bring to your wedding there.`,
    galleryTitle: (name: string) => `Wedding photography near ${name}`,
    contactEyebrow: "Contact",
    contactTitle: (name: string) => `Tell me about your wedding in ${name}`,
    nearby: (name: string) => `I also photograph weddings near ${name}`,
    fullPortfolio: "View full portfolio",
    allInRegion: (region: string) => `All towns in ${region}`,
    serviceType: "Wedding and social event photography",
  },
  region: {
    pill: "Wedding photographer",
    count: (n: number) => `${n} town${n === 1 ? "" : "s"}`,
    distance: (km: number) => `~${km} km from Bogotá`,
    otherRegions: "Other areas",
    portfolio: "View portfolio",
  },
  notFound: {
    title: "Page not found",
    text: "The page you're looking for doesn't exist or has moved.",
    cta: "Back to home",
  },
};

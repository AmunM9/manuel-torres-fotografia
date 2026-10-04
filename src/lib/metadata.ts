import type { Metadata } from "next";
import { OG_LOCALE, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { alternatesFor, localePath, type Route } from "@/i18n/routes";
import { SITE } from "@/lib/site";

/** Metadata base de cada layout raíz (título de marca, OG, idioma). */
export function rootMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale).meta;
  const other: Locale = locale === "es" ? "en" : "es";
  return {
    metadataBase: new URL(SITE.url),
    title: { default: t.brandTitle, template: `%s · ${SITE.name}` },
    description: t.description,
    keywords: t.keywords,
    openGraph: {
      type: "website",
      locale: OG_LOCALE[locale],
      alternateLocale: [OG_LOCALE[other]],
      url: localePath(locale, { kind: "home" }),
      siteName: SITE.name,
      title: t.brandTitle,
      description: t.description,
    },
    twitter: { card: "summary_large_image", title: t.brandTitle, description: t.description },
  };
}

/** Metadata de una página: título/descr. + canonical y hreflang recíproco. */
export function pageMetadata(
  locale: Locale,
  route: Route,
  fields: { title?: string | { absolute: string }; description?: string; robots?: Metadata["robots"]; openGraph?: Metadata["openGraph"] },
): Metadata {
  const alternates = alternatesFor(locale, route);
  const ogTitle = typeof fields.title === "object" ? fields.title.absolute : fields.title;
  return {
    title: fields.title,
    description: fields.description,
    alternates,
    robots: fields.robots,
    openGraph: {
      type: "website",
      locale: OG_LOCALE[locale],
      url: alternates.canonical as string,
      title: ogTitle,
      description: fields.description,
      ...fields.openGraph,
    },
  };
}

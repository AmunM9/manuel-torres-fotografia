import type { Locale } from "@/i18n/config";
import { es, type Dictionary } from "@/i18n/dictionaries/es";
import { en } from "@/i18n/dictionaries/en";

const DICTIONARIES: Record<Locale, Dictionary> = { es, en };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}

export type { Dictionary };

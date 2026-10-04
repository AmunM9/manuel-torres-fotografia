import { brandImage, OG_SIZE } from "@/lib/og/brandImage";
import { getDictionary } from "@/i18n/dictionaries";

export const alt = getDictionary("es").meta.ogAlt;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return brandImage({
    title: "Fotografía de bodas",
    subtitle: "Historias reales, contadas con luz y emoción.",
  });
}

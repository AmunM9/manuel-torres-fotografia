import { Gallery } from "@/components/gallery/Gallery";
import { Reveal } from "@/components/ui/Reveal";
import { glimpsePhotos } from "@/lib/weddings";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function Glimpse({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).glimpse;
  const photos = glimpsePhotos();
  return (
    <section className="shell mt-[var(--space-section)]">
      <Reveal className="mb-8 flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 className="display mt-3 text-[clamp(1.9rem,1rem+3vw,3.2rem)]">
            {t.title}
          </h2>
        </div>
      </Reveal>
      <Reveal>
        <Gallery
          photos={photos}
          title="Manuel Torres"
          locale={locale}
          hideOnMobile={["manuel-torres/paola-andres/_MAN4986"]}
        />
      </Reveal>
    </section>
  );
}

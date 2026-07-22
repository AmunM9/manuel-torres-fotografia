import { Gallery } from "@/components/gallery/Gallery";
import { Reveal } from "@/components/ui/Reveal";
import { glimpsePhotos } from "@/lib/weddings";

export function Glimpse() {
  const photos = glimpsePhotos();
  return (
    <section className="shell mt-[var(--space-section)]">
      <Reveal className="mb-8 flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Un vistazo a mi trabajo</p>
          <h2 className="display mt-3 text-[clamp(1.9rem,1rem+3vw,3.2rem)]">
            Momentos que permanecen
          </h2>
        </div>
      </Reveal>
      <Reveal>
        <Gallery
          photos={photos}
          title="Manuel Torres"
          hideOnMobile={["manuel-torres/paola-andres/_MAN4986"]}
        />
      </Reveal>
    </section>
  );
}

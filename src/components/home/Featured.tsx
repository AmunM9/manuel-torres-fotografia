import Link from "next/link";
import { CloudPhoto } from "@/components/ui/CloudPhoto";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowIcon } from "@/components/ui/icons";
import { photoById } from "@/lib/weddings";

const FEATURED_ID = "manuel-torres/paola-andres/_MAN7548";

export function Featured() {
  const photo = photoById(FEATURED_ID);
  return (
    <section className="shell mt-[var(--space-section)]">
      <Reveal>
        <div className="relative overflow-hidden rounded-card">
          <CloudPhoto
            photo={photo}
            alt="Bodas reales, historias verdaderas"
            aspect="16/10"
            rounded={false}
            sizes="(max-width: 1536px) 100vw, 1400px"
          />
          {/* scrim para legibilidad */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/25 to-transparent"
          />
          <div className="absolute inset-x-0 bottom-0 p-7 sm:p-12 lg:p-16">
            <div className="max-w-xl text-bg">
              <h2 className="display text-[clamp(1.9rem,1rem+3.4vw,3.6rem)]">
                Bodas reales, historias verdaderas
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-bg/85">
                Cada boda es un universo propio lleno de emociones y detalles
                irrepetibles. Descúbrelas en el portafolio.
              </p>
              <Link
                href="/portafolio"
                className="group mt-7 inline-flex items-center gap-2 rounded-full bg-bg px-6 py-3 font-display text-sm font-semibold text-ink transition-colors hover:bg-accent hover:text-bg"
              >
                Ver portafolio
                <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

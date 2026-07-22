import { HeroCarousel } from "@/components/home/HeroCarousel";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { SITE } from "@/lib/site";
import type { Photo } from "@/lib/weddings";

export function Hero({ photos }: { photos: Photo[] }) {
  return (
    <section className="shell relative pt-10 pb-6 sm:pt-16 lg:pt-20">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Texto — la parte áurea menor */}
        <div className="order-2 lg:order-1 lg:col-span-5">
          <Pill>Fotografía de bodas</Pill>
          <h1 className="display mt-6 text-[clamp(2.2rem,1rem+4.6vw,4.4rem)]">
            Guardo para siempre
            <br className="hidden sm:block" /> lo que dura{" "}
            <span className="text-accent italic">un instante</span>.
          </h1>
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted">
            {SITE.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="/portafolio">Ver portafolio</Button>
            <Button href="/contacto" variant="ghost" withArrow={false}>
              Escríbeme
            </Button>
          </div>
          <p className="eyebrow mt-8">{SITE.bookingNote}</p>
        </div>

        {/* Foto — protagonista */}
        <div className="relative order-1 lg:order-2 lg:col-span-7">
          {/* circunferencia decorativa */}
          <div
            aria-hidden
            className="absolute -right-6 -top-10 -z-10 hidden aspect-square w-56 rounded-full border border-accent/25 lg:block"
          />
          <HeroCarousel photos={photos} />
        </div>
      </div>
    </section>
  );
}

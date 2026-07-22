import type { Metadata } from "next";
import { weddings } from "@/lib/weddings";
import { WeddingCard } from "@/components/portfolio/WeddingCard";
import { Reveal } from "@/components/ui/Reveal";
import { Pill } from "@/components/ui/Pill";

export const metadata: Metadata = {
  title: "Portafolio",
  description:
    "Bodas reales fotografiadas por Manuel Torres. Historias verdaderas contadas con un enfoque editorial.",
};

export default function PortfolioPage() {
  return (
    <div className="shell pt-16 pb-8 sm:pt-24">
      <header className="max-w-3xl">
        <Reveal>
          <Pill>Bodas reales</Pill>
        </Reveal>
        <Reveal as="h1" delay={80} className="display mt-6 text-[clamp(2.6rem,1rem+7vw,6rem)]">
          Portafolio
        </Reveal>
        <Reveal as="p" delay={140} className="mt-6 max-w-md text-muted text-lg leading-relaxed">
          Cada boda es un universo propio. Historias verdaderas, guardadas en
          imágenes.
        </Reveal>
      </header>

      <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 sm:mt-20 lg:grid-cols-3">
        {weddings.map((w, i) => (
          <Reveal
            key={w.slug}
            delay={i * 90}
            /* leve desfase editorial en la columna central (desktop) */
            className={i === 1 ? "lg:mt-16" : ""}
          >
            <WeddingCard wedding={w} priority={i === 0} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

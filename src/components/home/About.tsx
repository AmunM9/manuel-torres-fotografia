import { CloudPhoto } from "@/components/ui/CloudPhoto";
import { Reveal } from "@/components/ui/Reveal";
import { Pill } from "@/components/ui/Pill";
import { personalPhoto } from "@/lib/weddings";

/**
 * Sobre mí. NOTA: el texto es un placeholder de tono/filosofía (sin datos
 * biográficos inventados). Manuel puede editarlo libremente.
 */
export function About() {
  return (
    <section className="border-t border-line mt-[var(--space-section)]">
      <div className="shell grid items-center gap-10 pt-14 sm:pt-20 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <div className="relative mx-auto w-56 max-w-full lg:mx-0 lg:w-full">
            <div
              aria-hidden
              className="absolute -left-6 -bottom-6 -z-10 hidden aspect-square w-24 rounded-full border border-accent/25 lg:block"
            />
            <CloudPhoto
              photo={personalPhoto}
              alt="Manuel Torres, fotógrafo de bodas"
              aspect="4/5"
              sizes="(max-width: 1024px) 224px, 22vw"
            />
          </div>
        </Reveal>

        <Reveal delay={100} className="lg:col-span-8">
          <Pill>Sobre mí</Pill>
          <h2 className="display mt-6 text-[clamp(1.9rem,1rem+3vw,3.4rem)]">
            Soy Manuel Torres
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
            <p>
              Soy fotógrafo de bodas y eventos sociales con más de cinco años de
              experiencia. Busco imágenes elegantes y pulcras, capaces de contar
              una historia por sí solas.
            </p>
            <p>
              Me gusta acompañar cada celebración sin interrumpirla, para que lo
              que quede en las fotografías sea justo lo que se vivió: auténtico,
              cuidado y lleno de emoción.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

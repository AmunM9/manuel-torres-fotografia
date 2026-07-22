import type { Metadata } from "next";
import { CloudPhoto } from "@/components/ui/CloudPhoto";
import { Reveal } from "@/components/ui/Reveal";
import { Pill } from "@/components/ui/Pill";
import { ContactLinks } from "@/components/ui/ContactLinks";
import { SITE } from "@/lib/site";
import { personalPhoto } from "@/lib/weddings";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Escríbeme para tu boda. " + SITE.bookingNote + ".",
};

export default function ContactPage() {
  return (
    <div className="shell py-16 sm:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        {/* Retrato */}
        <Reveal className="lg:col-span-5">
          <div className="relative">
            <div
              aria-hidden
              className="absolute -right-7 -top-8 -z-10 hidden aspect-square w-40 rounded-full border border-accent/25 lg:block"
            />
            <CloudPhoto
              photo={personalPhoto}
              alt="Manuel Torres, fotógrafo de bodas"
              aspect="4/5"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
          </div>
        </Reveal>

        {/* Contenido */}
        <Reveal delay={100} className="lg:col-span-7">
          <Pill>Contacto</Pill>
          <h1 className="display mt-6 text-[clamp(2.4rem,1rem+4.5vw,4.4rem)]">
            Cuéntame tu historia
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            {SITE.bookingNote}. Escríbeme y hablemos de tu boda: fechas, lugar y
            todo lo que imaginas.
          </p>

          <ContactLinks className="mt-9 max-w-xl" />
        </Reveal>
      </div>
    </div>
  );
}

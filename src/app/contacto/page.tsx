import type { Metadata } from "next";
import Link from "next/link";
import { CloudPhoto } from "@/components/ui/CloudPhoto";
import { Reveal } from "@/components/ui/Reveal";
import { Pill } from "@/components/ui/Pill";
import { InstagramIcon, WhatsappIcon, ArrowIcon } from "@/components/ui/icons";
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

          <div className="mt-9 flex max-w-xl flex-col gap-4 sm:flex-row">
            <ContactLink
              href={SITE.whatsapp}
              label="WhatsApp"
              sub="Respuesta rápida"
              icon={<WhatsappIcon className="h-6 w-6" />}
            />
            <ContactLink
              href={SITE.instagram}
              label="Instagram"
              sub={SITE.instagramHandle}
              icon={<InstagramIcon className="h-6 w-6" />}
            />
          </div>
        </Reveal>
      </div>
    </div>
  );
}

interface ContactLinkProps {
  href: string;
  label: string;
  sub: string;
  icon: React.ReactNode;
}

function ContactLink({ href, label, sub, icon }: ContactLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-1 items-center gap-4 rounded-card border border-line bg-surface/50 p-5 transition-all duration-300 hover:border-ink hover:bg-surface"
    >
      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink text-bg transition-colors group-hover:bg-accent">
        {icon}
      </span>
      <span className="flex-1 text-left">
        <span className="block font-display font-semibold text-ink">{label}</span>
        <span className="block text-sm text-muted">{sub}</span>
      </span>
      <ArrowIcon className="h-5 w-5 text-faint transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ink" />
    </Link>
  );
}

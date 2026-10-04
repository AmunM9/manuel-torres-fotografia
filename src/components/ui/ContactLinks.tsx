import Link from "next/link";
import { SITE, whatsappUrl } from "@/lib/site";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { InstagramIcon, WhatsappIcon, ArrowIcon } from "@/components/ui/icons";

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

interface ContactLinksProps {
  className?: string;
  locale: Locale;
}

/** Par de botones WhatsApp + Instagram, reutilizado en Contacto y en cada página de ubicación. */
export function ContactLinks({ className = "", locale }: ContactLinksProps) {
  return (
    <div className={`flex flex-col gap-4 sm:flex-row ${className}`}>
      <ContactLink
        href={whatsappUrl(locale)}
        label="WhatsApp"
        sub={getDictionary(locale).contact.whatsappSub}
        icon={<WhatsappIcon className="h-6 w-6" />}
      />
      <ContactLink
        href={SITE.instagram}
        label="Instagram"
        sub={SITE.instagramHandle}
        icon={<InstagramIcon className="h-6 w-6" />}
      />
    </div>
  );
}

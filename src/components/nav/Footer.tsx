import Link from "next/link";
import Image from "next/image";
import monogram from "../../../public/logo-monogram.png";
import { SITE } from "@/lib/site";
import { InstagramIcon, WhatsappIcon } from "@/components/ui/icons";

export function Footer() {
  return (
    <footer className="border-t border-line mt-[var(--space-section)]">
      <div className="shell py-14 flex flex-col md:flex-row gap-10 md:items-end md:justify-between">
        <div>
          <Link
            href="/"
            className="flex items-center gap-2.5 mb-5"
            aria-label="Manuel Torres — inicio"
          >
            <Image
              src={monogram}
              alt=""
              height={30}
              className="h-7 w-auto"
            />
            <span className="font-display font-semibold tracking-[0.24em] text-[0.82rem] uppercase">
              Manuel Torres
            </span>
          </Link>
          <p className="font-display text-sm text-muted max-w-xs">
            Fotografía de bodas.{" "}
            <span className="text-ink">{SITE.bookingNote}.</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-ink hover:text-bg hover:border-ink"
          >
            <InstagramIcon className="h-[18px] w-[18px]" />
          </Link>
          <Link
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-ink hover:text-bg hover:border-ink"
          >
            <WhatsappIcon className="h-[19px] w-[19px]" />
          </Link>
        </div>
      </div>

      <div className="shell pb-8">
        <p className="text-xs text-faint font-display tracking-wide">
          © {new Date().getFullYear()} Manuel Torres · Fotografía de bodas
        </p>
      </div>
    </footer>
  );
}

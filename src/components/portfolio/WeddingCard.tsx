import Link from "next/link";
import { CloudPhoto } from "@/components/ui/CloudPhoto";
import type { Wedding } from "@/lib/weddings";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath } from "@/i18n/routes";


interface WeddingCardProps {
  wedding: Wedding;
  priority?: boolean;
  locale: Locale;
  sizes?: string;
}

export function WeddingCard({ wedding, priority, sizes, locale }: WeddingCardProps) {
  const t = getDictionary(locale).portfolio;
  return (
    <Link href={localePath(locale, { kind: "wedding", slug: wedding.slug })} className="group block">
      <div className="photo-hover overflow-hidden rounded-card">
        <CloudPhoto
          photo={{ id: wedding.cover, w: 1996, h: 3000 }}
          alt={t.weddingOf(wedding.title)}
          aspect="4/5"
          sizes={sizes ?? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
          priority={priority}
          rounded={false}
        />
      </div>
      <div className="mt-4 text-center">
        <h3 className="display text-xl sm:text-2xl transition-colors group-hover:text-accent">
          {wedding.title}
        </h3>
        <p className="eyebrow mt-1.5">{t.photos(wedding.photos.length)}</p>
      </div>
    </Link>
  );
}

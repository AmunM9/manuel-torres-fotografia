import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getWedding, weddings } from "@/lib/weddings";
import { cldUrl } from "@/lib/cloudinary";
import { Gallery } from "@/components/gallery/Gallery";
import { Reveal } from "@/components/ui/Reveal";
import { Pill } from "@/components/ui/Pill";
import { ArrowIcon } from "@/components/ui/icons";

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return weddings.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const wedding = getWedding(slug);
  if (!wedding) return {};
  const title = wedding.title;
  const ogImage = cldUrl(wedding.cover, 1200);
  return {
    title,
    description: `Boda de ${wedding.title} — fotografía de bodas por Manuel Torres.`,
    openGraph: {
      title,
      images: [{ url: ogImage, width: 1200, height: 1500 }],
    },
  };
}

export default async function WeddingPage({ params }: Params) {
  const { slug } = await params;
  const wedding = getWedding(slug);
  if (!wedding) notFound();

  return (
    <div className="shell pt-14 pb-4 sm:pt-20">
      <Reveal className="text-center">
        <Link
          href="/portafolio"
          className="eyebrow inline-flex items-center gap-2 transition-colors hover:text-ink"
        >
          <ArrowIcon className="h-3.5 w-3.5 rotate-180" />
          Portafolio
        </Link>
        <h1 className="display mt-5 text-[clamp(2.6rem,1rem+8vw,7rem)]">
          {wedding.title}
        </h1>
        <div className="mt-5 flex justify-center">
          <Pill>{wedding.photos.length} fotografías</Pill>
        </div>
      </Reveal>

      <div className="mt-12 sm:mt-16">
        <Gallery photos={wedding.photos} title={wedding.title} />
      </div>
    </div>
  );
}

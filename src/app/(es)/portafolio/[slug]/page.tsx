import type { Metadata } from "next";
import { WeddingView, weddingMetadata, weddingStaticParams } from "@/views/wedding";

interface Params {
  params: Promise<{ slug: string }>;
}

export const generateStaticParams = weddingStaticParams;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  return weddingMetadata("es", slug);
}

export default async function WeddingPage({ params }: Params) {
  const { slug } = await params;
  return <WeddingView locale="es" slug={slug} />;
}

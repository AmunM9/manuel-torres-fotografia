import type { Metadata } from "next";
import { LocationView, locationMetadata, locationStaticParams } from "@/views/location";

interface Params {
  params: Promise<{ fullslug: string }>;
}

export function generateStaticParams() {
  return locationStaticParams("en");
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { fullslug } = await params;
  return locationMetadata("en", fullslug);
}

export default async function LocationOrRegionPage({ params }: Params) {
  const { fullslug } = await params;
  return <LocationView locale="en" fullslug={fullslug} />;
}

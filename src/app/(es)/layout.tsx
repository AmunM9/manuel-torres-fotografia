import type { Metadata } from "next";
import "../globals.css";
import { SiteShell } from "@/components/layout/SiteShell";
import { rootMetadata } from "@/lib/metadata";

export const metadata: Metadata = rootMetadata("es");

export default function SpanishRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteShell locale="es">{children}</SiteShell>;
}

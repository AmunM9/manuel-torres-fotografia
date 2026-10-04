import type { Metadata } from "next";
import "../globals.css";
import { SiteShell } from "@/components/layout/SiteShell";
import { rootMetadata } from "@/lib/metadata";

export const metadata: Metadata = rootMetadata("en");

export default function EnglishRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteShell locale="en">{children}</SiteShell>;
}

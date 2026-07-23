import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Quicksand, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/nav/Footer";
import { SITE } from "@/lib/site";
import { siteJsonLd } from "@/lib/schema";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

const BRAND_TITLE = `${SITE.name} · Fotógrafo de Bodas en Bogotá, Colombia`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: BRAND_TITLE,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "fotógrafo de bodas Bogotá",
    "fotógrafo de bodas Colombia",
    "Manuel Torres fotógrafo",
    "Manuel Torres fotografía",
    "fotografía de bodas Bogotá",
    "fotógrafo de bodas Cundinamarca",
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE.url,
    siteName: SITE.name,
    title: BRAND_TITLE,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND_TITLE,
    description: SITE.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${quicksand.variable} ${nunitoSans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-bg text-ink">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd()) }}
        />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

import { PortfolioView, portfolioMetadata } from "@/views/portfolio";

export const metadata = portfolioMetadata("es");

export default function PortfolioPage() {
  return <PortfolioView locale="es" />;
}
